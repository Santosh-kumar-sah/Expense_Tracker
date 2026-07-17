const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Household = require('../models/Household');
const User = require('../models/User');

const buildInviteCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

const serializeHousehold = (household) => ({
  _id: household._id,
  name: household.name,
  ownerId: household.ownerId,
  members: household.members,
  sharedMonthlyBudget: household.sharedMonthlyBudget,
  categoryBudgets: Object.fromEntries(household.categoryBudgets || []),
  inviteCode: household.inviteCode,
  createdAt: household.createdAt,
  updatedAt: household.updatedAt,
});

const createHousehold = asyncHandler(async (req, res) => {
  const { name, sharedMonthlyBudget = 0 } = req.body;
  const inviteCode = buildInviteCode();

  const household = await Household.create({
    name,
    ownerId: req.user._id,
    members: [req.user._id],
    sharedMonthlyBudget,
    inviteCode,
  });

  req.user.householdId = household._id;
  req.user.role = 'owner';
  await req.user.save();

  res.status(201).json(serializeHousehold(household));
});

const joinHousehold = asyncHandler(async (req, res) => {
  const { inviteCode } = req.body;
  const household = await Household.findOne({ inviteCode: String(inviteCode || '').toUpperCase() });

  if (!household) {
    res.status(404);
    throw new Error('Invite code not found');
  }

  if (!household.members.some((memberId) => String(memberId) === String(req.user._id))) {
    household.members.push(req.user._id);
    await household.save();
  }

  req.user.householdId = household._id;
  req.user.role = 'member';
  await req.user.save();

  res.json(serializeHousehold(household));
});

const getHousehold = asyncHandler(async (req, res) => {
  if (!req.user.householdId) {
    res.json(null);
    return;
  }

  const household = await Household.findById(req.user.householdId);
  res.json(serializeHousehold(household));
});

const updateHouseholdBudgets = asyncHandler(async (req, res) => {
  const household = await Household.findById(req.user.householdId);

  if (!household || String(household.ownerId) !== String(req.user._id)) {
    res.status(403);
    throw new Error('Only the owner can update household budgets');
  }

  const { sharedMonthlyBudget, categoryBudgets } = req.body;
  if (sharedMonthlyBudget !== undefined) {
    household.sharedMonthlyBudget = sharedMonthlyBudget;
  }

  if (categoryBudgets) {
    household.categoryBudgets = categoryBudgets;
  }

  await household.save();
  res.json(serializeHousehold(household));
});

const removeMember = asyncHandler(async (req, res) => {
  const household = await Household.findById(req.user.householdId);

  if (!household || String(household.ownerId) !== String(req.user._id)) {
    res.status(403);
    throw new Error('Only the owner can remove members');
  }

  const memberId = req.params.memberId;
  household.members = household.members.filter((item) => String(item) !== String(memberId));
  await household.save();

  await User.updateOne({ _id: memberId }, { $set: { householdId: null, role: null } });
  res.json({ message: 'Member removed' });
});

module.exports = {
  createHousehold,
  joinHousehold,
  getHousehold,
  updateHouseholdBudgets,
  removeMember,
};