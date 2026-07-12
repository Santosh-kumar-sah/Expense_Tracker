import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Expenses } from './pages/Expenses';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const App = (): JSX.Element => {
  const { user, loading } = useAuth();

  if (loading && !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading ExpenseIQ…</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout title="Dashboard" />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
};