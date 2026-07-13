import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { login as loginRequest, logout as logoutRequest, me, register as registerRequest, updateBudget as updateBudgetRequest } from '../services/api';
import type { AuthContextType, LoginPayload, RegisterPayload, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const refreshUser = async (): Promise<void> => {
    try {
      setLoading(true);
      const currentUser = await me();
      setUser(currentUser);
      setAuthError(null);
    } catch (error) {
      setUser(null);
      setAuthError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const login = async (payload: LoginPayload): Promise<void> => {
    const response = await loginRequest(payload);
    setUser(response.user);
    toast.success(`Welcome back, ${response.user.name}`);
  };

  const register = async (payload: RegisterPayload): Promise<void> => {
    const response = await registerRequest(payload);
    setUser(response.user);
    toast.success(`Account created for ${response.user.name}`);
  };

  const logout = async (): Promise<void> => {
    await logoutRequest();
    setUser(null);
    toast.success('Logged out');
  };

  const updateBudget = async (monthlyBudget: number): Promise<void> => {
    const updatedUser = await updateBudgetRequest({ monthlyBudget });
    setUser(updatedUser);
    toast.success('Budget updated');
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      authError,
      login,
      register,
      logout,
      updateBudget,
      refreshUser,
    }),
    [user, loading, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};