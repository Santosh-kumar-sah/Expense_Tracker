import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from './Loader';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader label="Verifying session" className="min-h-screen" />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};