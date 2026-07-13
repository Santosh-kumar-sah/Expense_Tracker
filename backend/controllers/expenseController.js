const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');
const User = require('../models/User');
const Household = require('../models/Household');

const expenseSelect = 'amount category description date createdAt updatedAt userId';

const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Education', 'Rent', 'Groceries', 'Other'];

const buildFilter = (userId, query, householdId = null) => {
  const scope = query.scope === 'household' && householdId ? { householdId } : { userId };
  const filter = { ...scope };

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.description = { $regex: query.search, $options: 'i' };
  }

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) {
      filter.date.$gte = new Date(query.startDate);
    }
    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      filter.date.$lte = endDate;
    }
  }

  return filter;
};

const getBudgetContext = async (user) => {
  if (user?.householdId) {
    const household = await Household.findById(user.householdId).populate('members', 'name email');
    if (household) {
      const categoryBudgets = household.categoryBudgets instanceof Map
        ? Object.fromEntries(household.categoryBudgets.entries())
        : household.categoryBudgets || {};

      return {
        budget: household.sharedMonthlyBudget || 0,
        categoryBudgets,
        householdId: household._id,
        memberIds: household.members.map((member) => String(member._id || member)),
        memberNames: new Map(
          household.members.map((member) => [String(member._id || member), member.name || member.email || 'Member'])
        ),
      };
    }
  }

  return {
    budget: user?.monthlyBudget || 0,
    categoryBudgets: {},
    householdId: null,
    memberIds: [String(user?._id)],
    memberNames: new Map([[String(user?._id), user?.name || 'You']]),
  };
};

const listExpenses = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 8, 1), 100);
  const skip = (page - 1) * limit;
  const filter = buildFilter(req.user._id, req.query);

  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(expenseSelect),
    Expense.countDocuments(filter),
  ]);

  res.json({
    expenses,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

const createExpense = asyncHandler(async (req, res) => {
  const { amount, category, description, date, householdId } = req.body;

  if (householdId && String(req.user.householdId || '') !== String(householdId)) {
    res.status(403);
    throw new Error('Not allowed to create expenses in another household');
  }

  const expense = await Expense.create({
    userId: req.user._id,
    householdId: householdId || req.user.householdId || null,
    amount,
    category,
    description,
    date,
  });

  res.status(201).json(expense);
});

const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  if (String(expense.userId) !== String(req.user._id)) {
    res.status(403);
    throw new Error('Not allowed to modify this expense');
  }

  const { amount, category, description, date, householdId } = req.body;

  if (amount !== undefined) expense.amount = amount;
  if (category !== undefined) expense.category = category;
  if (description !== undefined) expense.description = description;
  if (date !== undefined) expense.date = date;
  if (householdId !== undefined) expense.householdId = householdId;

  const updatedExpense = await expense.save();
  res.json(updatedExpense);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  if (String(expense.userId) !== String(req.user._id)) {
    res.status(403);
    throw new Error('Not allowed to delete this expense');
  }

  await expense.deleteOne();
  res.json({ message: 'Expense deleted' });
});

const getAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfTwelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const budgetContext = await getBudgetContext(req.user);
  const useHouseholdScope = req.query.scope === 'household' && Boolean(budgetContext.householdId);
  const scopeMatch = useHouseholdScope ? { householdId: budgetContext.householdId } : { userId };

  const [expenseSummary, user, currentMonthTotals] = await Promise.all([
    Expense.aggregate([
      { $match: scopeMatch },
      {
        $facet: {
          totalSpent: [{ $group: { _id: null, total: { $sum: '$amount' } } }],
          monthlySpending: [
            { $match: { date: { $gte: startOfTwelveMonthsAgo, $lte: now } } },
            {
              $group: {
                _id: {
                  year: { $year: '$date' },
                  month: { $month: '$date' },
                },
                total: { $sum: '$amount' },
              },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
          ],
          categoryBreakdown: [
            {
              $group: {
                _id: '$category',
                total: { $sum: '$amount' },
                count: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          recentTransactions: [
            { $sort: { date: -1, createdAt: -1 } },
            { $limit: 5 },
          ],
          memberBreakdown: budgetContext.householdId
            ? [
                {
                  $group: {
                    _id: '$userId',
                    total: { $sum: '$amount' },
                  },
                },
                { $sort: { total: -1 } },
              ]
            : [],
        },
      },
    ]),
    User.findById(userId).select('monthlyBudget'),
    Expense.aggregate([
      { $match: { ...scopeMatch, date: { $gte: startOfCurrentMonth, $lte: now } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
  ]);

  const totalSpent = expenseSummary[0]?.totalSpent?.[0]?.total || 0;
  const monthlyMap = new Map(
    expenseSummary[0]?.monthlySpending?.map((item) => [
      `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      item.total,
    ]) || []
  );

  const monthlySpending = Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - (11 - index), 1);
    const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`;
    return {
      label: monthDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      total: monthlyMap.get(monthKey) || 0,
    };
  });

  const categoryBreakdownRaw = expenseSummary[0]?.categoryBreakdown || [];
  const categoryBreakdown = categoryBreakdownRaw.map((item) => ({
    category: item._id,
    total: item.total,
    count: item.count,
    percentOfTotal: totalSpent > 0 ? Number(((item.total / totalSpent) * 100).toFixed(1)) : 0,
  }));

  const currentMonthCategorySpend = await Expense.aggregate([
    { $match: { ...scopeMatch, date: { $gte: startOfCurrentMonth, $lte: now } } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $sort: { total: -1 } },
  ]);

  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  const previousMonthCategorySpend = await Expense.aggregate([
    { $match: { ...scopeMatch, date: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
  ]);

  const previousMonthTotals = new Map(previousMonthCategorySpend.map((item) => [item._id, item.total]));
  const categoryInsights = currentMonthCategorySpend.map((item) => {
    const previousTotal = previousMonthTotals.get(item._id) || 0;
    const monthOverMonthChange = previousTotal > 0 ? Number((((item.total - previousTotal) / previousTotal) * 100).toFixed(1)) : null;
    return {
      category: item._id,
      total: item.total,
      percentOfTotal: totalSpent > 0 ? Number(((item.total / totalSpent) * 100).toFixed(1)) : 0,
      monthOverMonthChange,
    };
  });

  const topCategoryThisMonth = categoryInsights[0] || null;
  const fastestGrowingCategory = [...categoryInsights]
    .filter((item) => typeof item.monthOverMonthChange === 'number')
    .sort((a, b) => (b.monthOverMonthChange || 0) - (a.monthOverMonthChange || 0))[0] || null;

  const monthlyTotals = monthlySpending.map((item) => item.total);
  const averageMonthlySpend = monthlyTotals.length > 0 ? Number((monthlyTotals.reduce((sum, value) => sum + value, 0) / monthlyTotals.length).toFixed(2)) : 0;

  const budget = budgetContext.budget || user?.monthlyBudget || 0;
  const usedPercent = budget > 0 ? (currentMonthTotals?.[0]?.total || 0) / budget : 0;
  const budgetStatus = {
    state: usedPercent > 1 ? 'exceeded' : usedPercent >= 0.8 ? 'nearing' : 'under',
    usedPercent: Number((usedPercent * 100).toFixed(1)),
    budget,
    spent: currentMonthTotals?.[0]?.total || 0,
    remaining: budget - (currentMonthTotals?.[0]?.total || 0),
  };

  const categoryAlerts = Object.entries(budgetContext.categoryBudgets || {})
    .map(([category, limit]) => {
      const spent = currentMonthCategorySpend.find((item) => item._id === category)?.total || 0;
      const used = limit > 0 ? spent / limit : 0;
      if (used < 0.8) return null;
      return {
        category,
        type: used > 1 ? 'exceeded' : 'nearing',
        message: `${category} is ${used > 1 ? 'over' : 'near'} its budget`,
        budget: limit,
        spent,
      };
    })
    .filter(Boolean);

  res.json({
    totalSpent,
    monthlySpending,
    categoryBreakdown,
    categoryAlerts,
    budgetStatus,
    averageMonthlySpend,
    topCategoryThisMonth,
    fastestGrowingCategory,
    householdMemberBreakdown: budgetContext.householdId
      ? (expenseSummary[0]?.memberBreakdown || []).map((item) => ({
          userId: String(item._id),
          name: budgetContext.memberNames.get(String(item._id)) || 'Member',
          total: item.total,
        }))
      : [],
    recentTransactions: expenseSummary[0]?.recentTransactions || [],
    monthlyBudget: budget,
    currentMonthSpent: currentMonthTotals?.[0]?.total || 0,
  });
});

module.exports = {
  listExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getAnalytics,
};