import { ArrowRight, BadgeDollarSign, CalendarDays, PieChart as PieChartIcon, RefreshCw, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExpense } from '../context/ExpenseContext';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { MonthlyBarChart } from '../components/charts/MonthlyBarChart';
import { StatCard } from '../components/StatCard';
import { Loader } from '../components/Loader';
import { CategoryBadge } from '../components/CategoryBadge';
import { useMemo } from 'react';

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

export const Dashboard = (): JSX.Element => {
  const { user } = useAuth();
  const { analytics, aiInsight, loading, refreshAnalytics, scope } = useExpense();

  if (loading || !analytics || !user) {
    return <Loader label="Loading dashboard" className="min-h-[60vh]" />;
  }

  const budgetStatus = analytics.budgetStatus;
  const alertTone = budgetStatus.state === 'exceeded' ? 'rose' : budgetStatus.state === 'nearing' ? 'amber' : 'emerald';
  const topCategory = analytics.topCategoryThisMonth?.category ?? analytics.categoryBreakdown[0]?.category ?? 'None';
  const fastestGrowing = analytics.fastestGrowingCategory;
  const visibleAlert = budgetStatus.state !== 'under' || analytics.categoryAlerts.length > 0;

  const statusCopy = budgetStatus.state === 'exceeded'
    ? `Budget exceeded by ${currencyFormatter.format(Math.abs(budgetStatus.remaining))}`
    : budgetStatus.state === 'nearing'
      ? `Nearing your budget - ${budgetStatus.usedPercent}% used`
      : 'You are on track this month';

  const categoryInsightChips = useMemo(() => {
    const chips = [
      { label: 'Top this month', value: `${topCategory} · ${analytics.topCategoryThisMonth?.percentOfTotal ?? 0}%` },
    ];

    if (fastestGrowing) {
      chips.push({ label: 'Fastest growing', value: `${fastestGrowing.category} +${fastestGrowing.monthOverMonthChange ?? 0}% vs last month` });
    }

    return chips;
  }, [analytics.topCategoryThisMonth, fastestGrowing, topCategory]);

  const refreshLabel = scope === 'household' ? 'Family view' : 'Personal view';

  return (
    <div className="space-y-6 animate-fadeUp">
      {visibleAlert ? (
        <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${alertTone === 'rose' ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200' : alertTone === 'amber' ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200' : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200'}`}>
          {statusCopy}
          <button type="button" onClick={() => void refreshAnalytics()} className="ml-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-current opacity-80">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Spent" value={currencyFormatter.format(analytics.totalSpent)} icon={<BadgeDollarSign className="h-5 w-5" />} />
        <StatCard title="This Month" value={currencyFormatter.format(analytics.currentMonthSpent)} icon={<CalendarDays className="h-5 w-5" />} accentClassName={alertTone === 'rose' ? 'text-rose-600' : 'text-accent'} helperText={statusCopy} />
        <StatCard title="Top Category" value={topCategory} icon={<PieChartIcon className="h-5 w-5" />} />
        <StatCard title="Budget Remaining" value={currencyFormatter.format(budgetStatus.remaining)} icon={<TrendingUp className="h-5 w-5" />} accentClassName={alertTone === 'rose' ? 'text-rose-600' : alertTone === 'amber' ? 'text-amber-600' : 'text-emerald-600'} helperText={statusCopy} />
        <StatCard title="Average Monthly Spend" value={currencyFormatter.format(analytics.averageMonthlySpend)} icon={<BadgeDollarSign className="h-5 w-5" />} />
      </div>

      <div className="flex flex-wrap gap-3">
        {categoryInsightChips.map((chip) => (
          <div key={chip.label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-card dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{chip.label}</span>
            <span className="font-semibold">{chip.value}</span>
          </div>
        ))}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-card dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">{refreshLabel}</div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <MonthlyBarChart data={analytics.monthlySpending} />
        <CategoryPieChart data={analytics.categoryBreakdown} />
      </div>

      {analytics.categoryAlerts.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {analytics.categoryAlerts.map((alert) => (
            <span key={`${alert.category}-${alert.type}`} className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${alert.type === 'exceeded' ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200' : 'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200'}`}>
              {alert.category} {alert.type === 'exceeded' ? 'exceeded' : 'near'} category budget
            </span>
          ))}
        </div>
      ) : null}

      {aiInsight ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">AI Insights</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Cached monthly summary</p>
            </div>
            <button type="button" onClick={() => void refreshAnalytics()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
          <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{aiInsight.summary}</p>
          {aiInsight.tips.length > 0 ? <div className="mt-4 flex flex-wrap gap-2">{aiInsight.tips.map((tip) => <span key={tip} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">{tip}</span>)}</div> : null}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Transactions</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your latest five expenses</p>
          </div>
          <Link to="/expenses" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {analytics.recentTransactions.map((expense) => (
            <div key={expense._id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <CategoryBadge category={expense.category} />
                  <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">{expense.description || 'Untitled expense'}</p>
              </div>
              <p className="font-bold tabular-nums text-slate-900 dark:text-white">{currencyFormatter.format(expense.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};