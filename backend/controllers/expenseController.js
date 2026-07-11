const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');
const User = require('../models/User');

const expenseSelect = 'amount category description date createdAt updatedAt userId';

const buildFilter = (userId, query) => {
  const filter = { userId };

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
  const { amount, category, description, date } = req.body;

  const expense = await Expense.create({
    userId: req.user._id,
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

  const { amount, category, description, date } = req.body;

  if (amount !== undefined) expense.amount = amount;
  if (category !== undefined) expense.category = category;
  if (description !== undefined) expense.description = description;
  if (date !== undefined) expense.date = date;

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

  const [expenseSummary, user, currentMonthTotals] = await Promise.all([
    Expense.aggregate([
      { $match: { userId } },
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
        },
      },
    ]),
    User.findById(userId).select('monthlyBudget'),
    Expense.aggregate([
      { $match: { userId, date: { $gte: startOfCurrentMonth, $lte: now } } },
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

  const categoryBreakdown = (expenseSummary[0]?.categoryBreakdown || []).map((item) => ({
    category: item._id,
    total: item.total,
    count: item.count,
  }));

  res.json({
    totalSpent,
    monthlySpending,
    categoryBreakdown,
    recentTransactions: expenseSummary[0]?.recentTransactions || [],
    monthlyBudget: user?.monthlyBudget || 0,
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