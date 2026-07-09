# ExpenseIQ

ExpenseIQ is a MERN expense tracking SaaS with httpOnly JWT auth cookies, per-user expense ownership, budget tracking, analytics dashboards, and a dark-mode React + TypeScript frontend.

## Local Setup

### 1. Backend

1. Install dependencies in `backend/`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`.
4. Run `npm run dev` from `backend/`.

### 2. Frontend

1. Install dependencies in `frontend/`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Set `VITE_API_URL` to the backend URL.
4. Run `npm run dev` from `frontend/`.

## Environment Variables

### Backend

- `PORT` - server port
- `NODE_ENV` - development or production
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - long random signing secret
- `CLIENT_URL` - frontend origin for CORS cookies

### Frontend

- `VITE_API_URL` - backend base URL, for example `http://localhost:5000`

## Deployment

### MongoDB Atlas

1. Create a cluster.
2. Add a database user.
3. Copy the connection string into `MONGO_URI`.
4. Allow the Render IPs or use `0.0.0.0/0` during initial testing.

### Render Backend

1. Create a Web Service from the `backend/` folder.
2. Set build command to `npm install`.
3. Set start command to `npm start`.
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV=production`.

### Vercel Frontend

1. Create a Vercel project from the `frontend/` folder.
2. Set `VITE_API_URL` to the Render backend URL.
3. Ensure the backend `CLIENT_URL` matches the Vercel origin.
4. Keep cookies credentialed with `withCredentials: true` and `cors({ credentials: true, origin: CLIENT_URL })`.

## Notes

- Auth uses httpOnly JWT cookies, not localStorage.
- Expense routes are ownership-checked by `userId`.
- The dashboard analytics endpoint aggregates lifetime totals, monthly spending, category breakdowns, recent transactions, and monthly budget.