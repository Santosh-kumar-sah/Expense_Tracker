export type Category =
  | 'Food'
  | 'Travel'
  | 'Bills'
  | 'Shopping'
  | 'Health'
  | 'Entertainment'
  | 'Education'
  | 'Rent'
  | 'Groceries'
  | 'Other';

export interface User {
  _id: string;
  name: string;
  email: string;
  monthlyBudget: number;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  _id: string;
  userId: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlySpendingItem {
  label: string;
  total: number;
}

export interface CategoryBreakdownItem {
  category: Category;
  total: number;
  count: number;
}

export interface AnalyticsResponse {
  totalSpent: number;
  monthlySpending: MonthlySpendingItem[];
  categoryBreakdown: CategoryBreakdownItem[];
  recentTransactions: Expense[];
  monthlyBudget: number;
  currentMonthSpent: number;
}

export interface PaginationState {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

export interface ExpenseFilters {
  category: Category | '';
  search: string;
  startDate: string;
  endDate: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthResponse {
  user: User;
}

export interface MeResponse extends User {}

export interface ExpenseListResponse {
  expenses: Expense[];
  page: number;
  pages: number;
  total: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface BudgetPayload {
  monthlyBudget: number;
}

export interface ExpensePayload {
  amount: number;
  category: Category;
  description?: string;
  date: string;
}

export interface UpdateExpensePayload extends Partial<ExpensePayload> {}

export interface NormalizedError {
  message: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateBudget: (monthlyBudget: number) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface ExpenseContextType {
  expenses: Expense[];
  analytics: AnalyticsResponse | null;
  filters: ExpenseFilters;
  pagination: PaginationState;
  loading: boolean;
  refreshExpenses: () => Promise<void>;
  refreshAnalytics: () => Promise<void>;
  setFilters: (filters: ExpenseFilters) => void;
  setPage: (page: number) => void;
  createExpense: (payload: ExpensePayload) => Promise<void>;
  updateExpense: (expenseId: string, payload: UpdateExpensePayload) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
}