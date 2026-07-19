# 🧊 ExpenseIQ — Advanced Visual & AI-Powered Personal Finance SaaS

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/OpenRouter_AI-FF5722?style=for-the-badge&logo=google-gemini&logoColor=white" alt="OpenRouter AI" />
</p>

---

## 🎯 Overview

ExpenseIQ is a premium, tactile, next-generation personal finance tracking platform built using the **MERN** stack (MongoDB, Express, React, Node.js). 

Combining advanced modern UI designs (**Glassmorphism, 3D tilt effects, ambient glow spaces**) with a **Google Gemini-powered AI Assistant** integrated via OpenRouter, ExpenseIQ makes tracking expenditures and querying your budget feel responsive, interactive, and alive.

---

## ✨ Features

### 🎨 1. Premium Visual Layer & Liquid Motion
*   **Tactile Glassmorphism**: Interactive panels with frosted glass backgrounds, dynamic borders, and real-time backdrop blur matching the light and dark theme context.
*   **3D Parallax & Depth**: Advanced card-tilt physics powered by `react-parallax-tilt` and spring-based animations.
*   **GPU-Composited Blob Animations**: Smooth ambient liquid blobs morphing in the background, fully paused when off-screen to guarantee maximum performance.
*   **Smooth Layout Transitions**: Fluid page entries and state transitions engineered using `framer-motion`.

### 🤖 2. Conversational AI Assistant
*   **Intent Recognition**: Powered by Google Gemini via **OpenRouter**, classifying prompts dynamically to perform tasks (e.g., adding expenses) or query trends.
*   **Budget & Trend Queries**: Directly ask the AI queries like *"How much have I spent on food this month?"* or *"What is my current monthly budget?"*.
*   **Automated Expense Logging**: Describe your purchase naturally (*"Add 120 rupees for coffee"*), and the AI will extract the amount, categorize it, write the description, log it into the database, and trigger a real-time UI refresh.

### 🔒 3. Robust Cookie-Based Security
*   **HTTP-Only JWT Authentication**: Tokens are stored strictly in `httpOnly` secure cookies to prevent XSS-based session highjacking.
*   **Cross-Origin Cookie Support**: Secure CORS setup allows Vercel (frontend) and Render (backend) domains to securely transmit session credentials.

---

## 📂 Project Architecture

```
expense-tracker/
├── backend/
│   ├── config/             # DB connections and environment setups
│   ├── controllers/        # Logical controllers (Auth, AI, Expenses, Household)
│   ├── middleware/         # Cookie parse, rate limits, CORS configurations, error handlers
│   ├── models/             # Mongoose schemas (User, Expense, Household)
│   ├── routes/             # REST API entry routes
│   └── services/           # OpenRouter API client & intent parsers
└── frontend/
    ├── src/
    │   ├── components/     # UI elements (AI Drawer, Glass Cards, Dynamic Forms)
    │   ├── context/        # React Context stores (AuthContext, ExpenseContext)
    │   ├── pages/          # Layout views (Dashboard, Expenses, Analytics, Login/Register)
    │   └── services/       # Axios API layer configured for withCredentials
```

---

## 🚀 Local Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance (Local or Atlas)
*   OpenRouter API Key (for the conversational AI features)

---

### Step 1: Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create your configuration environment file:
   ```bash
   cp .env.example .env
   ```
4. Configure the variables in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/expenseiq
   JWT_SECRET=your_super_secret_jwt_string
   CLIENT_URL=http://localhost:5173
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=google/gemini-2.5-flash
   ```
5. Start the backend developer server:
   ```bash
   npm run dev
   ```

---

### Step 2: Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file:
   ```bash
   cp .env.example .env
   ```
4. Set the API address in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
5. Launch the React+Vite developer application:
   ```bash
   npm run dev
   ```

---

## ☁️ Cloud Deployment Checklist

### 1. MongoDB Atlas
1. Create a cluster and set up a database user.
2. In network access, add Render's outbound IPs (or `0.0.0.0/0` temporarily for setup verification).
3. Copy the cluster connection string to your backend's `MONGO_URI`.

### 2. Render (Backend Web Service)
1. Select the root folder and configure `backend/` as the subfolder.
2. Use **Build Command**: `npm install`.
3. Use **Start Command**: `npm start`.
4. Add environment variables:
   *   `NODE_ENV` = `production`
   *   `CLIENT_URL` = `https://your-frontend.vercel.app`
   *   `JWT_SECRET` = (secure random string)
   *   `MONGO_URI` = (your Atlas connection URL)
   *   `OPENROUTER_API_KEY` = (your OpenRouter Key)
   *   `OPENROUTER_MODEL` = `google/gemini-2.5-flash`

> [!NOTE]
> Since Render's free tier spins down web services after periods of inactivity, the first dashboard loading phase can take up to 50 seconds to complete while the backend boots up.

### 3. Vercel (Frontend Hosting)
1. Create a project pointing to your repository and target the `frontend/` directory.
2. Set the build configuration:
   *   **Build Command**: `tsc -b && vite build`
   *   **Output Directory**: `dist`
3. Add the environment variable:
   *   `VITE_API_URL` = `https://your-backend.onrender.com`

---

## 🔒 Security & CORS Notes
For Cross-Origin Authentication (Vercel frontend communicating with Render backend) to work correctly:
*   The backend CORS configuration must set `credentials: true` and specify a single origin matching the `CLIENT_URL` exactly.
*   The generated JWT cookies are configured with `SameSite=None` and `Secure` to satisfy cross-origin requirements in modern web browsers.
*   The frontend client must explicitly send `withCredentials: true` in all API requests.