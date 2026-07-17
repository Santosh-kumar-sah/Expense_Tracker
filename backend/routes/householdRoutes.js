const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createHousehold,
  joinHousehold,
  getHousehold,
  updateHouseholdBudgets,
  removeMember,
} = require('../controllers/householdController');

const router = express.Router();

router.get('/me', protect, getHousehold);
router.post('/', protect, createHousehold);
router.post('/join', protect, joinHousehold);
router.put('/budgets', protect, updateHouseholdBudgets);
router.delete('/:memberId', protect, removeMember);

module.exports = router;