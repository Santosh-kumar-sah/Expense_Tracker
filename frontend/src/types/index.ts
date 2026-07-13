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
  householdId?: string | null;
  role?: 'owner' | 'member';
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  _id: string;
  userId: string;
  householdId?: string | null;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryAlert {
  category: Category;
  type: 'under' | 'nearing' | 'exceeded';
  message: string;
  budget?: number;
  spent?: number;
}

export interface BudgetStatus {
  state: 'under' | 'nearing' | 'exceeded';
  usedPercent: number;
  budget: number;
  spent: number;
  remaining: number;
}

export interface MonthlySpendingItem {
  label: string;
  total: number;
}

export interface CategoryBreakdownItem {
  category: Category;
  total: number;
  count: number;
  percentOfTotal: number;
}

export interface CategoryInsight {
  category: Category;
  total: number;
  percentOfTotal: number;
  monthOverMonthChange?: number;
}

export interface HouseholdMemberBreakdown {
  userId: string;
  name: string;
  total: number;
}

export interface AIInsight {
  _id?: string;
  userId: string;
  householdId?: string | null;
  summary: string;
  tips: string[];
  refreshedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Household {
  _id: string;
  name: string;
  ownerId: string;
  members: string[];
  sharedMonthlyBudget: number;
  categoryBudgets?: Partial<Record<Category, number>>;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsResponse {
  totalSpent: number;
  monthlySpending: MonthlySpendingItem[];
  categoryBreakdown: CategoryBreakdownItem[];
  categoryAlerts: CategoryAlert[];
  budgetStatus: BudgetStatus;
  averageMonthlySpend: number;
  topCategoryThisMonth?: CategoryInsight | null;
  fastestGrowingCategory?: CategoryInsight | null;
  householdMemberBreakdown?: HouseholdMemberBreakdown[];
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
  householdId?: string | null;
}

export interface UpdateExpensePayload extends Partial<ExpensePayload> {}

export interface HouseholdPayload {
  name: string;
  sharedMonthlyBudget?: number;
}

export interface HouseholdUpdatePayload {
  sharedMonthlyBudget?: number;
  categoryBudgets?: Partial<Record<Category, number>>;
}

export interface AIChatPayload {
  message: string;
  scope?: 'personal' | 'household';
}

export interface AIChatResponse {
  reply: string;
  action?: string | null;
  data?: unknown;
}

export interface AIInsightResponse {
  insight: AIInsight;
}

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
  aiInsight: AIInsight | null;
  scope: 'personal' | 'household';
  lastRefreshedAt: string | null;
  filters: ExpenseFilters;
  pagination: PaginationState;
  loading: boolean;
  refreshExpenses: () => Promise<void>;
  refreshAnalytics: () => Promise<void>;
  refreshAll: () => Promise<void>;
  setScope: (scope: 'personal' | 'household') => void;
  setFilters: (filters: ExpenseFilters) => void;
  setPage: (page: number) => void;
  createExpense: (payload: ExpensePayload) => Promise<void>;
  updateExpense: (expenseId: string, payload: UpdateExpensePayload) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
}

export interface AiInsightState {
  summary: string;
  tips: string[];
  updatedAt?: string;
}