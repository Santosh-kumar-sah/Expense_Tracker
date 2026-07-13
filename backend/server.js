require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const aiRoutes = require('./routes/aiRoutes');
const householdRoutes = require('./routes/householdRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 5000;

connectDB().catch((error) => {
  console.error('Database connection failed:', error.message);
  process.exit(1);
});

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/households', householdRoutes);
app.use('/api/ai', aiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`ExpenseIQ backend running on port ${port}`);
});