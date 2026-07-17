const asyncHandler = require('express-async-handler');
const AIInsight = require('../models/AIInsight');
const Expense = require('../models/Expense');
const Household = require('../models/Household');
const { parseIntent, generateInsight } = require('../services/openRouterService');

const getScopeFilter = async (user) => {
  if (user.householdId) {
    return { householdId: user.householdId };
  }
  return { userId: user._id };
};

const getCachedInsight = async (user) => {
  const filter = { userId: user._id, householdId: user.householdId || null };
  return AIInsight.findOne(filter).sort({ refreshedAt: -1 });
};

const getInsights = asyncHandler(async (req, res) => {
  const insight = await getCachedInsight(req.user);
  res.json({ insight });
});

const refreshInsights = asyncHandler(async (req, res) => {
  const filter = await getScopeFilter(req.user);
  const [currentMonth, totalSpent] = await Promise.all([
    Expense.aggregate([
      { $match: { ...filter, date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Expense.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
  ]);

  const current = currentMonth[0]?.total || 0;
  const total = totalSpent[0]?.total || 0;
  const generated = await generateInsight({
    summary: `You spent ${current.toFixed(2)} this month and ${total.toFixed(2)} overall. Keep the higher categories in check.`,
    totals: { current, total },
  });
  const summary = generated.summary || `You spent ${current.toFixed(2)} this month and ${total.toFixed(2)} overall. Keep the higher categories in check.`;
  const tips = Array.isArray(generated.tips) && generated.tips.length > 0 ? generated.tips.slice(0, 2) : ['Review your top 2 categories weekly.', 'Set category budgets for recurring costs.'];

  const insight = await AIInsight.findOneAndUpdate(
    { userId: req.user._id, householdId: req.user.householdId || null },
    { summary, tips, refreshedAt: new Date() },
    { upsert: true, new: true }
  );

  res.json({ insight });
});

const chat = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const filter = await getScopeFilter(req.user);
  const parsed = await parseIntent({
    message,
    context: { scope: req.user.householdId ? 'household' : 'personal' },
  });

  if (parsed.intent === 'create_expense') {
    const expense = await Expense.create({
      userId: req.user._id,
      householdId: req.user.householdId || null,
      amount: parsed.amount,
      category: parsed.category || 'Other',
      description: parsed.description || message,
      date: parsed.date || new Date(),
    });

    res.json({ reply: parsed.reply || `Logged ${parsed.amount} under ${expense.category}.`, action: 'create_expense', data: expense });
    return;
  }

  const total = await Expense.aggregate([{ $match: filter }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
  res.json({ reply: parsed.reply || `Your current spend is ${Number(total[0]?.total || 0).toFixed(2)}.`, action: 'query_spend', data: { total: total[0]?.total || 0 } });
});

module.exports = {
  getInsights,
  refreshInsights,
  chat,
};