const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Household name is required'],
      trim: true,
      maxlength: [80, 'Household name must be 80 characters or less'],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    sharedMonthlyBudget: {
      type: Number,
      default: 0,
      min: [0, 'Budget cannot be negative'],
    },
    categoryBudgets: {
      type: Map,
      of: Number,
      default: {},
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Household', householdSchema);