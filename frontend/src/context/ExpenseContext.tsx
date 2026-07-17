import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import {
  createExpense as createExpenseRequest,
  deleteExpense as deleteExpenseRequest,
  getAiInsights,
  getAnalytics,
  getExpenses,
  updateExpense as updateExpenseRequest,
} from '../services/api';
import type { AIInsight, AnalyticsResponse, Expense, ExpenseContextType, ExpenseFilters, ExpensePayload, PaginationState, UpdateExpensePayload } from '../types';

const defaultFilters: ExpenseFilters = {
  category: '',
  search: '',
  startDate: '',
  endDate: '',
};

const defaultPagination: PaginationState = {
  page: 1,
  pages: 1,
  total: 0,
  limit: 8,
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps): JSX.Element => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [scope, setScope] = useState<'personal' | 'household'>('personal');
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<ExpenseFilters>(defaultFilters);
  const [pagination, setPagination] = useState<PaginationState>(defaultPagination);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshExpenses = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getExpenses(filters, pagination.page, pagination.limit, scope);
      setExpenses(response.expenses);
      setPagination((current: PaginationState) => ({
        ...current,
        page: response.page,
        pages: response.pages,
        total: response.total,
      }));
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = async (): Promise<void> => {
    const [analyticsResponse, aiResponse] = await Promise.all([getAnalytics(scope), getAiInsights()]);
    setAnalytics(analyticsResponse);
    setAiInsight(aiResponse.insight);
    setLastRefreshedAt(new Date().toISOString());
  };

  const refreshAll = async (): Promise<void> => {
    await Promise.all([refreshExpenses(), refreshAnalytics()]);
  };

  useEffect(() => {
    void refreshExpenses();
    void refreshAnalytics();
  }, [filters, pagination.page, pagination.limit, scope]);

  const setFilters = (nextFilters: ExpenseFilters): void => {
    setPagination((current: PaginationState) => ({ ...current, page: 1 }));
    setFiltersState(nextFilters);
  };

  const setPage = (page: number): void => {
    setPagination((current: PaginationState) => ({ ...current, page }));
  };

  const createExpense = async (payload: ExpensePayload): Promise<void> => {
    await createExpenseRequest(payload);
    toast.success('Expense created');
    await refreshAll();
  };

  const updateExpense = async (expenseId: string, payload: UpdateExpensePayload): Promise<void> => {
    await updateExpenseRequest(expenseId, payload);
    toast.success('Expense updated');
    await refreshAll();
  };

  const deleteExpense = async (expenseId: string): Promise<void> => {
    await deleteExpenseRequest(expenseId);
    toast.success('Expense deleted');
    await refreshAll();
  };

  const value = useMemo<ExpenseContextType>(
    () => ({
      expenses,
      analytics,
      aiInsight,
      scope,
      lastRefreshedAt,
      filters,
      pagination,
      loading,
      refreshExpenses,
      refreshAnalytics,
      refreshAll,
      setScope,
      setFilters,
      setPage,
      createExpense,
      updateExpense,
      deleteExpense,
    }),
    [expenses, analytics, aiInsight, scope, lastRefreshedAt, filters, pagination, loading]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpense = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};