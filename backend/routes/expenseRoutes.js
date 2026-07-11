const express = require('express');
const {
  listExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getAnalytics,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/analytics', protect, getAnalytics);
router.route('/').get(protect, listExpenses).post(protect, createExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;