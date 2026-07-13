const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    householdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Household',
      default: null,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Education', 'Rent', 'Groceries', 'Other'],
        message: 'Invalid category',
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description must be 200 characters or less'],
      default: '',
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ userId: 1, category: 1 });
expenseSchema.index({ householdId: 1, date: -1 });
expenseSchema.index({ householdId: 1, category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);