import axios, { AxiosError, AxiosInstance } from 'axios';
import type {
  AnalyticsResponse,
  ApiResponse,
  AuthResponse,
  BudgetPayload,
  Expense,
  ExpenseFilters,
  ExpenseListResponse,
  ExpensePayload,
  LoginPayload,
  MeResponse,
  RegisterPayload,
  UpdateExpensePayload,
} from '../types';

const apiBaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

const api: AxiosInstance = axios.create({
  baseURL: `${apiBaseURL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const normalizedMessage = error.response?.data?.message ?? error.message ?? 'Unexpected error';
    return Promise.reject(new Error(normalizedMessage));
  }
);

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<MeResponse>('/auth/register', payload);
  return { user: response.data };
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<MeResponse>('/auth/login', payload);
  return { user: response.data };
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>('/auth/logout');
  return response.data;
};

export const me = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>('/auth/me');
  return response.data;
};

export const updateBudget = async (payload: BudgetPayload): Promise<MeResponse> => {
  const response = await api.put<MeResponse>('/auth/budget', payload);
  return response.data;
};

export const getExpenses = async (
  filters: ExpenseFilters,
  page: number,
  limit: number
): Promise<ExpenseListResponse> => {
  const response = await api.get<ExpenseListResponse>('/expenses', {
    params: {
      ...filters,
      page,
      limit,
    },
  });
  return response.data;
};

export const createExpense = async (payload: ExpensePayload): Promise<Expense> => {
  const response = await api.post<Expense>('/expenses', payload);
  return response.data;
};

export const updateExpense = async (expenseId: string, payload: UpdateExpensePayload): Promise<Expense> => {
  const response = await api.put<Expense>(`/expenses/${expenseId}`, payload);
  return response.data;
};

export const deleteExpense = async (expenseId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/expenses/${expenseId}`);
  return response.data;
};

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await api.get<AnalyticsResponse>('/expenses/analytics');
  return response.data;
};

export type { AxiosInstance } from 'axios';