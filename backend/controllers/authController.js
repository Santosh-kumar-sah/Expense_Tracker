const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken, getCookieOptions } = require('../utils/generateToken');

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  monthlyBudget: user.monthlyBudget,
  householdId: user.householdId || null,
  role: user.role || null,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'member',
  });

  const token = generateToken(res, user._id, req);
  res.status(201).json({ ...sanitizeUser(user), token });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(res, user._id, req);
  res.json({ ...sanitizeUser(user), token });
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = getCookieOptions(req);
  res.cookie('token', '', {
    ...options,
    expires: new Date(0),
  });

  res.json({ message: 'Logged out successfully' });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(sanitizeUser(req.user));
});

const updateBudget = asyncHandler(async (req, res) => {
  const { monthlyBudget } = req.body;

  if (monthlyBudget === undefined || monthlyBudget === null || Number.isNaN(Number(monthlyBudget))) {
    res.status(400);
    throw new Error('A valid budget amount is required');
  }

  const budgetValue = Number(monthlyBudget);
  if (budgetValue < 0) {
    res.status(400);
    throw new Error('Budget cannot be negative');
  }

  req.user.monthlyBudget = budgetValue;
  const updatedUser = await req.user.save();

  res.json(sanitizeUser(updatedUser));
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateBudget,
};