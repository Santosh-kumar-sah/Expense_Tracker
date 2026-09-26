# 🧊 ExpenseIQ — Next-Gen AI-Powered Financial Intelligence Platform

<p align="center">
  <a href="https://expa-rosy.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://expense-tracker-dm7t.onrender.com/api/health" target="_blank">
    <img src="https://img.shields.io/badge/API_Status-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="API Status" />
  </a>
  <img src="https://img.shields.io/badge/React_18-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="React & TS" />
  <img src="https://img.shields.io/badge/TailwindCSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/OpenRouter-Gemini_2.5_Flash-FF5722?style=for-the-badge&logo=google-gemini&logoColor=white" alt="OpenRouter Gemini" />
</p>

---

## 🌟 Introduction

**ExpenseIQ** is a modern, high-performance personal & household financial management SaaS. Crafted with next-generation visual design paradigms (**Glassmorphism, 3D Parallax Tilt, GPU-accelerated liquid motion**) and powered by **Google Gemini via OpenRouter**, ExpenseIQ turns everyday expense tracking into a fluid, intelligent experience.

Whether you're tracking daily coffee runs, setting household budgets with family members, or asking an autonomous AI assistant to analyze your spending trends, ExpenseIQ gives you absolute financial clarity without the clutter of spreadsheets.

🔗 **Live Application:** [https://expa-rosy.vercel.app](https://expa-rosy.vercel.app)  
📡 **Live Backend API:** [https://expense-tracker-dm7t.onrender.com](https://expense-tracker-dm7t.onrender.com)

---

## ⚡ Core Features

### 🤖 1. Autonomous AI Financial Assistant
* **Natural Language Logging:** Simply type *"Add ₹150 for coffee"* or *"Spent 1200 on groceries today"* — the AI automatically classifies the category, extracts the date and amount, creates the record, and immediately refreshes your charts.
* **Instant Spend Insights:** Ask questions like *"What is my total spent this month?"* or *"Where am I spending the most?"* to receive contextual breakdowns.
* **Cost & Token Optimized:** Integrates strict `max_tokens` budgeting with robust regex-based JSON extraction, ensuring ultra-fast responses without hitting token credit limits.

### 🎨 2. Advanced 3D & Glassmorphic UI
* **Tactile Glassmorphism:** Layered frosted glass panels (`backdrop-filter`) with reactive dark/light mode shading, subtle borders, and glowing accents.
* **Interactive 3D Depth & Tilt:** Stat cards and preview components react to mouse movement using spring-physics tilt transformations.
* **Ambient Morphing Mesh Blobs:** Smooth GPU-composited ambient blobs run seamlessly in the background without layout shifts or performance bottlenecks.
* **Non-Overlapping Responsive Modals:** Dynamically bounded modals (`max-h-[92vh]` + scrollable overflow bounds) ensure form fields and amount inputs never get cut off on any screen resolution.

### 📊 3. Deep Analytics & Budgeting
* **Dynamic Budget Status:** Real-time budget pressure gauges showing `Under`, `Nearing`, and `Exceeded` alerts.
* **Interactive Data Visualizations:** Monthly spending bars and category breakdown pie charts built with Recharts.
* **Month-over-Month Velocity:** Automatically detects your fastest-growing expenditure categories and alerts you before overspending occurs.

### 👨‍👩‍👧‍👦 4. Family & Household Mode
* **Unified Household Budgeting:** Create or join family groups via invite codes.
* **Shared Pool vs. Personal View:** Toggle between personal transactions and pooled household expenses with a single click.
* **Member Spend Transparency:** See how expenses are distributed across household members in real-time.

### 🔐 5. Robust Dual-Layer Security
* **Dual-Authentication Architecture:** Combines `httpOnly` secure cross-site cookies with an automatic `Authorization: Bearer <token>` fallback in `localStorage` for uninterrupted cross-domain communication between Vercel and Render.
* **Dynamic CORS Protection:** Dynamic regex origin verification supporting primary domains and all Vercel preview environments (`*.vercel.app`).
* **Rate Limiting & Encryption:** Express API rate limiting against brute force attacks and bcrypt password hashing with salt rounds.

---

## 🏗️ Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│               Frontend (Vercel)                        │
│  React 18 • TypeScript • TailwindCSS • Framer Motion   │
│  Dual-Auth Interceptors (Cookie + Bearer) • Recharts   │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / REST API
┌───────────────────────────▼────────────────────────────┐
│               Backend (Render)                         │
│  Node.js • Express • CORS • Helmet • Rate-Limiting     │
│  Cookie-Parser • JWT Middleware • Mongoose Models      │
└─────────────┬───────────────────────────┬──────────────┘
              │                           │
┌─────────────▼─────────────┐   ┌─────────▼──────────────┐
│     MongoDB Atlas         │   │   OpenRouter AI        │
│  Users • Expenses         │   │   Google Gemini        │
│  Households • AI Insights │   │   2.5 Flash Model      │
└───────────────────────────┘   └────────────────────────┘
```

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18, Vite 7, TypeScript 5.8 |
| **Styling & Motion** | Tailwind CSS 3.4, Framer Motion 11, Lucide React |
| **Visual Effects** | Glassmorphism CSS System, Spring-physics 3D Card Tilt |
| **Backend Runtime** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose 8 |
| **AI Integration** | OpenRouter API (`google/gemini-2.5-flash`) |
| **Security** | JSON Web Tokens (JWT), httpOnly Cookies, bcryptjs |
| **Hosting** | Vercel (Frontend), Render (Backend Web Service) |

---

## 📁 Repository Structure

```
ExpenseTracker/
├── backend/
│   ├── config/             # Database connection (MongoDB Atlas)
│   ├── controllers/        # Business logic (Auth, Expenses, Household, AI)
│   ├── middleware/         # Auth protection, error handlers, rate-limiters
│   ├── models/             # Mongoose Schemas (User, Expense, Household, AIInsight)
│   ├── routes/             # Express API endpoints
│   ├── services/           # OpenRouter LLM integration & prompt engineering
│   ├── utils/              # JWT generator & cross-site cookie helpers
│   ├── server.js           # Server entry point & CORS configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # StatCard, Sidebar, Navbar, ExpenseForm, AI Assistant Drawer
│   │   ├── context/        # AuthContext, ExpenseContext, ThemeContext
│   │   ├── pages/          # Home (Landing), Dashboard, Expenses, Family, Login, Signup
│   │   ├── services/       # Axios client with automatic Bearer token interceptor
│   │   ├── types/          # Strict TypeScript interfaces & definitions
│   │   ├── App.tsx         # Route definitions & protected route guards
│   │   ├── index.css       # Custom Glassmorphic design tokens & liquid keyframes
│   │   └── main.tsx
│   ├── tailwind.config.js  # Extended design tokens & backdrop blur utilities
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)
* **MongoDB** (Local instance or free MongoDB Atlas URI)
* **OpenRouter API Key** ([Get one here](https://openrouter.ai))

---

### 1. Clone the Repository
```bash
git clone https://github.com/Santosh-kumar-sah/exp.git
cd exp
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=google/gemini-2.5-flash
```

Start the backend development server:
```bash
npm run dev
```
Backend will run at: `http://localhost:5000`

---

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```
Frontend will run at: `http://localhost:5173`

---

## 📡 API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Sign in & receive session token | No |
| `POST` | `/api/auth/logout` | Clear credentials and log out | Yes |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `PUT` | `/api/auth/budget` | Update user monthly budget limit | Yes |

### 💰 Expenses (`/api/expenses`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/expenses` | Paginated & filtered expense listing | Yes |
| `POST` | `/api/expenses` | Create a new expense entry | Yes |
| `PUT` | `/api/expenses/:id` | Update an existing expense | Yes |
| `DELETE` | `/api/expenses/:id` | Permanently delete an expense | Yes |
| `GET` | `/api/expenses/analytics` | Aggregate 12-month metrics & category totals | Yes |

### 🤖 AI Assistant (`/api/ai`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/ai/chat` | Send natural language prompt to AI | Yes |
| `GET` | `/api/ai/insights` | Fetch cached monthly financial summary | Yes |
| `POST` | `/api/ai/insights/refresh` | Force recalculate AI insights | Yes |

### 👨‍👩‍👧‍👦 Households (`/api/households`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/households/me` | Retrieve user's active household | Yes |
| `POST` | `/api/households` | Create a new household group | Yes |
| `POST` | `/api/households/join` | Join household via unique invite code | Yes |
| `PUT` | `/api/households/budgets` | Update shared category & monthly budgets | Yes |

---

## 🌐 Production Deployment Guide

### Deploying the Backend on Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository and set the **Root Directory** to `backend`.
3. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
4. Configure the Environment Variables:
   * `NODE_ENV` = `production`
   * `PORT` = `5000`
   * `MONGO_URI` = `<Your MongoDB Atlas connection URI>`
   * `JWT_SECRET` = `<Secure random string>`
   * `CLIENT_URL` = `https://expa-rosy.vercel.app`
   * `OPENROUTER_API_KEY` = `<Your OpenRouter API Key>`
   * `OPENROUTER_MODEL` = `google/gemini-2.5-flash`

### Deploying the Frontend on Vercel
1. Import the repository onto [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend`.
3. Set **Framework Preset** to `Vite`.
4. Add the Environment Variable:
   * `VITE_API_URL` = `https://expense-tracker-dm7t.onrender.com`
5. Click **Deploy**.

---

## 🛡️ License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute for personal or commercial projects.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/Santosh-kumar-sah" target="_blank">Santosh Kumar Sah</a>
</p>