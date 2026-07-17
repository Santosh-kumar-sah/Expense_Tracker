const mongoose = require('mongoose');

const aiInsightSchema = new mongoose.Schema(
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
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Summary must be 500 characters or less'],
    },
    tips: {
      type: [String],
      default: [],
    },
    refreshedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

aiInsightSchema.index({ userId: 1, householdId: 1 }, { unique: true });

module.exports = mongoose.model('AIInsight', aiInsightSchema);