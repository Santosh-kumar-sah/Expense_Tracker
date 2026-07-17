const express = require('express');
const rateLimit = require('express-rate-limit');
const { protect } = require('../middleware/authMiddleware');
const { getInsights, refreshInsights, chat } = require('../controllers/aiController');

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(aiLimiter);
router.get('/insights', protect, getInsights);
router.post('/insights/refresh', protect, refreshInsights);
router.post('/chat', protect, chat);

module.exports = router;