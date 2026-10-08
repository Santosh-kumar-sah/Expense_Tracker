# 🧊 ExpenseIQ — Next-Gen AI-Powered Financial Intelligence Platform

<p align="center">
  <a href="https://expa-rosy.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://expense-tracker-dm7t.onrender.com/api/health" target="_blank">
    <img src="https://img.shields.io/badge/API_Status-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="API Status" />
  </a>
  <a href="https://github.com/Santosh-kumar-sah/Expense_Tracker" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_18-TypeScript_5.8-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="React & TS" />
  <img src="https://img.shields.io/badge/TailwindCSS_3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion_11-black?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express_4-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas_8-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/OpenRouter-Gemini_2.5_Flash-FF5722?style=flat-square&logo=google-gemini&logoColor=white" alt="OpenRouter Gemini" />
</p>

---

## 📑 Table of Contents

- [🌟 Introduction](#-introduction)
- [⚡ Key Features](#-key-features)
  - [1. Autonomous AI Financial Assistant](#1-autonomous-ai-financial-assistant)
  - [2. Advanced 3D & Glassmorphic UI](#2-advanced-3d--glassmorphic-ui)
  - [3. Deep Analytics & Budget Velocity](#3-deep-analytics--budget-velocity)
  - [4. Family & Household Collaboration](#4-family--household-collaboration)
  - [5. Resilient Dual-Layer Security](#5-resilient-dual-layer-security)
- [🏗️ System Architecture](#️-system-architecture)
- [💻 Tech Stack Overview](#-tech-stack-overview)
- [📁 Project Structure](#-project-structure)
- [🚀 Local Development Setup](#-local-development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Environment Variables](#environment-variables)
- [📡 API Documentation](#-api-documentation)
- [🗄️ Database Schema Reference](#️-database-schema-reference)
- [🌐 Production Deployment Guide](#-production-deployment-guide)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [🤝 Contributing](#-contributing)
- [🛡️ License & Author](#️-license--author)

---

## 🌟 Introduction

**ExpenseIQ** is a full-stack, AI-augmented personal and household financial intelligence platform designed to replace tedious manual spreadsheets with an intuitive, fluid, and intelligent experience.

Built with cutting-edge design paradigms (**frosted glassmorphism, spring-physics 3D parallax tilt, and GPU-composited fluid mesh blobs**) and powered by **Google Gemini via OpenRouter**, ExpenseIQ allows users to log transactions through conversational natural language, collaborate with family members in real-time shared budget pools, and uncover actionable spending patterns through interactive visualizations.

- 🌐 **Live Web Application:** [https://expa-rosy.vercel.app](https://expa-rosy.vercel.app)
- 📡 **Live Production API:** [https://expense-tracker-dm7t.onrender.com](https://expense-tracker-dm7t.onrender.com)
- 🩺 **API Health Check:** [https://expense-tracker-dm7t.onrender.com/api/health](https://expense-tracker-dm7t.onrender.com/api/health)

---

## ⚡ Key Features

### 1. Autonomous AI Financial Assistant
- **Natural Language Expense Ingestion:** Input plain English/informal phrases like *"Paid 1200 for groceries today"* or *"Bought coffee for 150"*. The AI parses the amount, assigns standard categories (Food, Transportation, Shopping, Utilities, Entertainment, Health, Education, Other), records the transaction, and instantly updates charts without requiring page reload.
- **Conversational Spend Insights:** Ask questions such as *"How much did I spend this week?"* or *"What is my largest expense category?"* for real-time breakdowns.
- **Token-Optimized Fallbacks:** Enforces tight token limits, low inference temperature (`0.2`), and safe JSON regex extraction to prevent model hallucinations and keep API usage lightweight.

### 2. Advanced 3D & Glassmorphic UI
- **Layered Frosted Glass Panels:** Crafted using CSS backdrop blur filters (`backdrop-blur-md`), translucent borders, and ambient light/dark theme adaptation.
- **Spring-Physics 3D Card Tilt:** Interactive metric cards powered by `react-parallax-tilt` dynamically react to mouse movements with realistic depth and perspective.
- **GPU-Accelerated Fluid Blobs:** Organic morphing background gradient blobs animate smoothly without triggering layout shifts or performance bottlenecks.
- **Safe Responsive Modals:** Modal dialogs utilize dynamic height constraints (`max-h-[92vh]`) and internal scroll containers to prevent action buttons and inputs from being clipped on mobile displays.

### 3. Deep Analytics & Budget Velocity
- **Visual Trends with Recharts:** Interactive monthly spending bar charts and category distribution pie charts.
- **Dynamic Threshold Alerts:** Real-time visual progress bars calculate spending velocity against your monthly limits:
  - 🟢 **Under Budget** (`< 75%`)
  - 🟡 **Nearing Limit** (`75% - 99%`)
  - 🔴 **Exceeded Budget** (`≥ 100%`)
- **Category Run-Rate Detection:** Highlights fastest-growing expenditure categories month-over-month.

### 4. Family & Household Collaboration
- **Unified Household Ledger:** Create a household group or join an existing one using an 8-character unique alphanumeric invite code.
- **Single-Click Perspective Switch:** Seamlessly toggle between your **Personal Expenses** and the **Household Shared Pool**.
- **Transparent Member Distribution:** Track contributions and spending per member to keep shared living or family finances transparent.

### 5. Resilient Dual-Layer Security
- **Dual-Token Authentication:** Combines secure `httpOnly` cookies with automatic `Authorization: Bearer <token>` fallback in `localStorage` to ensure seamless API authentication across different domains (Vercel frontend + Render backend).
- **Dynamic CORS Policy:** Dynamic regex origin verification whitelist supporting local development, custom domains, and Vercel branch/preview deployments (`*.vercel.app`).
- **Production Hardening:** Protected by `helmet` HTTP headers, `express-rate-limit` request throttling, and salted `bcryptjs` password hashing.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client Layer (Vercel)                           │
│   React 18  •  TypeScript 5.8  •  Tailwind CSS  •  Framer Motion       │
│   Axios Interceptor (Cookie + Bearer Fallback)  •  Recharts UI         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / RESTful API
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Server Layer (Render)                           │
│   Node.js  •  Express 4  •  Helmet  •  Rate Limiter  •  CORS Engine     │
│   JWT Auth Middleware  •  Cookie-Parser  •  Mongoose ODM Controllers   │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│        Database (MongoDB Atlas)      │  │      AI Engine (OpenRouter)   │
│   Collections:                       │  │   Google Gemini 2.5 Flash     │
│   • Users                            │  │   • Intent Parsing            │
│   • Expenses                         │  │   • Natural Language Parsing  │
│   • Households                       │  │   • Spending Summarization    │
│   • AIInsights                       │  │   • Fast JSON Recovery        │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

---

## 💻 Tech Stack Overview

| Category | Technology | Version | Description / Purpose |
|---|---|---|---|
| **Frontend Framework** | [React](https://react.dev/) | `^18.3.1` | Component-based UI library |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.8.3` | Type-safe enterprise JavaScript |
| **Bundler & Tooling** | [Vite](https://vitejs.dev/) | `^7.0.4` | Ultra-fast frontend development server & build tool |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.10` | Utility-first responsive CSS framework |
| **Motion & Physics** | [Framer Motion](https://www.framer.com/motion/) | `^11.13.1` | Production-grade motion and transitions |
| **3D Effects** | [react-parallax-tilt](https://www.npmjs.com/package/react-parallax-tilt) | `^1.7.333` | Interactive mouse-driven card parallax tilt |
| **Charts** | [Recharts](https://recharts.org/) | `^3.1.2` | Composable SVG chart rendering |
| **Icons** | [Lucide React](https://lucide.dev/) | `^0.539.0` | Crisp modern SVG icon set |
| **Backend Runtime** | [Node.js](https://nodejs.org/) | `v18+` | Asynchronous event-driven JavaScript runtime |
| **Web Framework** | [Express](https://expressjs.com/) | `^4.21.2` | Fast, unopinionated REST API framework |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) | `Mongoose ^8.5.3` | Cloud NoSQL document database |
| **AI LLM Gateway** | [OpenRouter](https://openrouter.ai/) | `Gemini 2.5 Flash` | Model routing & conversational inference |
| **Security** | `bcryptjs`, `jsonwebtoken`, `helmet` | Latest | Password hashing, stateless tokens & security headers |
| **Hosting** | Vercel (Frontend) & Render (Backend) | Cloud | Serverless frontend & automated web service deployment |

---

## 📁 Project Structure

```
ExpenseTracker/
├── package.json                 # Monorepo root scripts (dev:backend, dev:frontend)
├── backend/
│   ├── config/
│   │   └── db.js                # MongoDB Atlas connection lifecycle & logging
│   ├── controllers/
│   │   ├── authController.js    # Register, login, logout, profile & budget update
│   │   ├── expenseController.js # CRUD, pagination, filtering, 12-month analytics
│   │   ├── householdController.js # Household creation, invite-code joins, budgets
│   │   └── aiController.js      # Natural language parser & cached AI insights
│   ├── middleware/
│   │   ├── authMiddleware.js    # Cookie & Bearer JWT validation guard
│   │   └── errorMiddleware.js   # 404 handler & central error formatting
│   ├── models/
│   │   ├── User.js              # User model with bcrypt password hashing
│   │   ├── Expense.js           # Expense model with household & user indexing
│   │   ├── Household.js         # Group schema with unique invite codes
│   │   └── AIInsight.js         # Cached month-level AI analytical summaries
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth
│   │   ├── expenseRoutes.js     # /api/expenses
│   │   ├── householdRoutes.js   # /api/households
│   │   └── aiRoutes.js          # /api/ai
│   ├── services/
│   │   └── openRouterService.js # OpenRouter API client, prompt engineering & regex parser
│   ├── utils/
│   │   └── generateToken.js     # JWT creation & cross-site cookie payload config
│   ├── server.js                # Express app entrypoint, CORS & rate-limiting
│   └── package.json             # Backend dependencies & scripts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/          # Category pie chart & monthly expense bar charts
│   │   │   ├── landing/         # Marketing hero, feature showcases & CTA sections
│   │   │   ├── AiAssistantDrawer.tsx # Floating interactive AI natural language drawer
│   │   │   ├── AmbientBackground.tsx # Liquid gradient mesh background
│   │   │   ├── ConfirmDialog.tsx     # Accessible glassmorphic confirmation modal
│   │   │   ├── DashboardLayout.tsx   # Authenticated shell layout (Navbar + Sidebar)
│   │   │   ├── ExpenseForm.tsx       # Expense creation/edit form with category picker
│   │   │   ├── ExpenseItem.tsx       # Expense list row item with actions
│   │   │   ├── LiquidBlobLoader.tsx  # Smooth animated SVG loading state
│   │   │   ├── Navbar.tsx            # Header with household switcher & profile menu
│   │   │   ├── Sidebar.tsx           # Navigation sidebar with collapse support
│   │   │   └── StatCard.tsx          # 3D parallax tilt financial metric card
│   │   ├── context/
│   │   │   ├── AuthContext.tsx       # User state, login, register, token synchronization
│   │   │   ├── ExpenseContext.tsx    # Expense list state, filter state, pagination
│   │   │   └── ThemeContext.tsx      # Dark / light theme management
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx         # Primary financial overview, charts & quick actions
│   │   │   ├── Expenses.tsx          # Filterable, searchable, paginated expense ledger
│   │   │   ├── Family.tsx            # Household management, member list & invite codes
│   │   │   ├── Home.tsx              # Landing page
│   │   │   ├── Login.tsx             # Authentication sign-in page
│   │   │   └── Signup.tsx            # Registration page
│   │   ├── services/
│   │   │   └── api.ts                # Axios instance with credentials & Bearer fallback
│   │   ├── types/
│   │   │   └── index.ts              # Global TypeScript interfaces
│   │   ├── App.tsx                   # React Router route tree & ProtectedRoute wrapper
│   │   ├── index.css                 # Custom utility classes & animations
│   │   └── main.tsx                  # Application entry point
│   ├── tailwind.config.js            # Custom color palettes, blur tokens & keyframes
│   ├── vite.config.ts                # Vite configuration
│   └── package.json                  # Frontend dependencies & scripts
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
Make sure you have installed:
- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0` (or `yarn` / `pnpm`)
- **MongoDB Atlas** account (or a local running MongoDB server instance)
- **OpenRouter API Key** ([openrouter.ai](https://openrouter.ai))

---

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/Santosh-kumar-sah/Expense_Tracker.git
cd Expense_Tracker
```

#### 2. Root Monorepo Setup (Optional Shortcut)
Install dependencies across both packages or run workspace scripts directly:
```bash
# Run backend development server from root:
npm run dev:backend

# Run frontend development server from root:
npm run dev:frontend
```

---

#### 3. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/expenseiq?retryWrites=true&w=majority
   JWT_SECRET=super_secret_jwt_key_change_in_production_123456
   CLIENT_URL=http://localhost:5173
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   OPENROUTER_MODEL=google/gemini-2.5-flash
   ```

3. Start the backend with hot reload:
   ```bash
   npm run dev
   ```
   > The backend server will be running on `http://localhost:5000`.

---

#### 4. Frontend Setup
1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env` file in `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. Start Vite dev server:
   ```bash
   npm run dev
   ```
   > The frontend application will be running on `http://localhost:5173`.

---

### Environment Variables

#### Backend (`backend/.env`)
| Variable | Required | Default | Description |
|---|:---:|---|---|
| `PORT` | Optional | `5000` | Port on which the Express server listens |
| `NODE_ENV` | Optional | `development` | Environment mode (`development` or `production`) |
| `MONGO_URI` | **Yes** | — | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | **Yes** | — | Secret key used to sign and verify JWT tokens |
| `CLIENT_URL` | **Yes** | `http://localhost:5173` | Allowed frontend origin for CORS policies |
| `OPENROUTER_API_KEY` | **Yes** | — | API key from OpenRouter to run LLM completions |
| `OPENROUTER_MODEL` | Optional | `google/gemini-2.5-flash` | LLM model identifier for inference |

#### Frontend (`frontend/.env`)
| Variable | Required | Default | Description |
|---|:---:|---|---|
| `VITE_API_URL` | **Yes** | `http://localhost:5000` | Base URL pointing to the running backend API |

---

## 📡 API Documentation

### Base URL: `/api`

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/auth/register` | Register a new user (`name`, `email`, `password`) | No |
| `POST` | `/api/auth/login` | Log in with credentials and receive JWT + Cookie | No |
| `POST` | `/api/auth/logout` | Clear auth cookies and invalidate session | Yes |
| `GET` | `/api/auth/me` | Retrieve the authenticated user's profile | Yes |
| `PUT` | `/api/auth/budget` | Update monthly personal budget limit | Yes |

### 💰 Expenses (`/api/expenses`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/expenses` | List expenses (with pagination, date filters & category search) | Yes |
| `POST` | `/api/expenses` | Create a new transaction | Yes |
| `PUT` | `/api/expenses/:id` | Update an existing transaction | Yes |
| `DELETE` | `/api/expenses/:id` | Delete an expense entry | Yes |
| `GET` | `/api/expenses/analytics` | Fetch 12-month metrics, velocity, and category aggregations | Yes |

### 🤖 AI Assistant (`/api/ai`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/ai/chat` | Send a natural language prompt to parse an expense or query spend | Yes |
| `GET` | `/api/ai/insights` | Fetch cached monthly financial summary and tips | Yes |
| `POST` | `/api/ai/insights/refresh` | Force re-calculation of AI monthly insights | Yes |

### 👨‍👩‍👧‍👦 Households (`/api/households`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/households/me` | Fetch active household details and member roster | Yes |
| `POST` | `/api/households` | Create a new household group | Yes |
| `POST` | `/api/households/join` | Join an existing household using an 8-character invite code | Yes |
| `PUT` | `/api/households/budgets` | Update shared category-specific budgets | Yes |

### 🩺 Health Check (`/api/health`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/health` | Service uptime and heartbeat check (`{"status": "ok"}`) | No |

---

### Example API Payloads

#### 1. AI Natural Language Chat (`POST /api/ai/chat`)
**Request:**
```json
{
  "message": "Spent 850 on grocery shopping at supermarket"
}
```
**Response:**
```json
{
  "intent": "log_expense",
  "reply": "Logged an expense of ₹850.00 under Food & Dining.",
  "expense": {
    "title": "Grocery shopping at supermarket",
    "amount": 850,
    "category": "Food",
    "date": "2026-10-08T00:00:00.000Z"
  }
}
```

#### 2. Create Expense (`POST /api/expenses`)
**Request:**
```json
{
  "title": "Monthly Internet Bill",
  "amount": 1299,
  "category": "Utilities",
  "date": "2026-10-01",
  "isHousehold": false,
  "notes": "Fiber 300 Mbps"
}
```
**Response:**
```json
{
  "_id": "6704eb89e4b0123456789abc",
  "user": "6704ea28e4b0987654321fed",
  "title": "Monthly Internet Bill",
  "amount": 1299,
  "category": "Utilities",
  "date": "2026-10-01T00:00:00.000Z",
  "isHousehold": false,
  "createdAt": "2026-10-08T09:15:20.100Z"
}
```

---

## 🗄️ Database Schema Reference

The MongoDB Atlas database comprises four primary collections:

1. **`User`**
   - `name`: String (Required)
   - `email`: String (Required, Unique, Lowercase)
   - `password`: String (Bcrypt salted hash)
   - `monthlyBudget`: Number (Default: 0)
   - `household`: ObjectId ref to `Household` (Optional)

2. **`Expense`**
   - `user`: ObjectId ref to `User` (Indexed)
   - `title`: String (Required, Trimmed)
   - `amount`: Number (Required, Min: 0.01)
   - `category`: Enum (`Food`, `Transportation`, `Shopping`, `Utilities`, `Entertainment`, `Health`, `Education`, `Other`)
   - `date`: Date (Default: `Date.now`)
   - `isHousehold`: Boolean (Default: `false`)
   - `household`: ObjectId ref to `Household` (Indexed)
   - `notes`: String (Max 500 chars)

3. **`Household`**
   - `name`: String (Required)
   - `inviteCode`: String (Unique, 8-char uppercase string, Indexed)
   - `creator`: ObjectId ref to `User`
   - `members`: Array of ObjectIds ref to `User`
   - `monthlyBudget`: Number (Default: 0)
   - `categoryBudgets`: Map of Numbers

4. **`AIInsight`**
   - `user`: ObjectId ref to `User` (Indexed)
   - `month`: String (`YYYY-MM`, Indexed)
   - `summary`: String (Generated natural language review)
   - `categoryBreakdown`: Array of category stats
   - `tips`: Array of Strings
   - `riskLevel`: Enum (`Low`, `Moderate`, `High`)

---

## 🌐 Production Deployment Guide

### Deploying Backend on Render
1. Create a new **Web Service** on [Render Dashboard](https://dashboard.render.com).
2. Connect your GitHub repository `Santosh-kumar-sah/Expense_Tracker`.
3. Set **Root Directory** to `backend`.
4. Configure Build & Start commands:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment Variables**, provide:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGO_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `<your-secure-random-secret>`
   - `CLIENT_URL` = `https://expa-rosy.vercel.app`
   - `OPENROUTER_API_KEY` = `<your-openrouter-key>`
   - `OPENROUTER_MODEL` = `google/gemini-2.5-flash`

---

### Deploying Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `frontend`.
3. Select **Framework Preset**: `Vite`.
4. Set Build Settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Under **Environment Variables**, provide:
   - `VITE_API_URL` = `https://expense-tracker-dm7t.onrender.com`
6. Click **Deploy**.

> **Note on Cross-Domain Cookies:** In modern browsers, third-party cookies across differing domains (`vercel.app` and `onrender.com`) may face strict SameSite restrictions. ExpenseIQ solves this gracefully by returning the JWT in both an `httpOnly` cookie and the response body JSON. The frontend Axios interceptor automatically attaches `Authorization: Bearer <token>` from `localStorage` whenever credentials are not accepted via cookies.

---

## 🗺️ Future Roadmap

- [ ] **Receipt OCR Scanning:** Upload receipt photos to automatically extract items, tax, and amounts using Vision AI.
- [ ] **Multi-Currency & Real-Time FX:** Support multi-currency tracking with automated exchange rate conversion.
- [ ] **Export Reports:** One-click financial statement exports in formatted CSV, Excel, and PDF formats.
- [ ] **Recurring Subscriptions Tracker:** Automated detection and scheduled notifications for recurring bills and subscriptions.
- [ ] **Progressive Web App (PWA):** Offline logging capability with background sync when reconnected.

---

## 🤝 Contributing

Contributions, feature suggestions, and bug reports are welcome!

1. **Fork the Repository**
2. **Create your Feature Branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your Changes:**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push to the Branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 🛡️ License & Author

Distributed under the **MIT License**. See `LICENSE` for details.

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/Santosh-kumar-sah" target="_blank"><b>Santosh Kumar Sah</b></a>
</p>