import { ArrowRight, BadgeDollarSign, CalendarDays, PieChart as PieChartIcon, RefreshCw, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExpense } from '../context/ExpenseContext';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { MonthlyBarChart } from '../components/charts/MonthlyBarChart';
import { StatCard } from '../components/StatCard';
import { Loader } from '../components/Loader';
import { LiquidBlobLoader } from '../components/LiquidBlobLoader';
import { CategoryBadge } from '../components/CategoryBadge';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export const Dashboard = (): JSX.Element => {
  const { user } = useAuth();
  const { analytics, aiInsight, loading, refreshAnalytics, scope } = useExpense();

  if (loading || !analytics || !user) {
    return <Loader label="Loading dashboard" className="min-h-[60vh]" />;
  }

  const budgetStatus = analytics.budgetStatus;
  const alertTone =
    budgetStatus.state === 'exceeded' ? 'rose' : budgetStatus.state === 'nearing' ? 'amber' : 'emerald';
  const topCategory =
    analytics.topCategoryThisMonth?.category ?? analytics.categoryBreakdown[0]?.category ?? 'None';
  const fastestGrowing = analytics.fastestGrowingCategory;
  const visibleAlert = budgetStatus.state !== 'under' || analytics.categoryAlerts.length > 0;

  const statusCopy =
    budgetStatus.state === 'exceeded'
      ? `Budget exceeded by ${currencyFormatter.format(Math.abs(budgetStatus.remaining))}`
      : budgetStatus.state === 'nearing'
      ? `Nearing your budget — ${budgetStatus.usedPercent}% used`
      : 'You are on track this month';

  const budgetProgress = Math.min(100, budgetStatus.usedPercent);
  const progressTone: 'rose' | 'amber' | 'emerald' =
    alertTone === 'rose' ? 'rose' : alertTone === 'amber' ? 'amber' : 'emerald';

  const categoryInsightChips = useMemo(() => {
    const chips = [
      {
        label: 'Top this month',
        value: `${topCategory} · ${analytics.topCategoryThisMonth?.percentOfTotal ?? 0}%`,
      },
    ];
    if (fastestGrowing) {
      chips.push({
        label: 'Fastest growing',
        value: `${fastestGrowing.category} +${fastestGrowing.monthOverMonthChange ?? 0}% vs last month`,
      });
    }
    return chips;
  }, [analytics.topCategoryThisMonth, fastestGrowing, topCategory]);

  const refreshLabel = scope === 'household' ? 'Family view' : 'Personal view';

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      {/* Budget alert banner */}
      {visibleAlert ? (
        <motion.div
          variants={item}
          className={`glass-panel rounded-2xl px-4 py-3 text-sm font-semibold ${
            alertTone === 'rose'
              ? 'border-rose-300/40 text-rose-700 dark:text-rose-200'
              : alertTone === 'amber'
              ? 'border-amber-300/40 text-amber-800 dark:text-amber-200'
              : 'border-emerald-300/40 text-emerald-700 dark:text-emerald-200'
          }`}
        >
          {statusCopy}
          <button
            type="button"
            onClick={() => void refreshAnalytics()}
            className="ml-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-current opacity-80 hover:opacity-100 transition-opacity"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </motion.div>
      ) : null}

      {/* Stat cards — Phase 1 glass + Phase 2 tilt + Phase 3 liquid fill */}
      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Spent"
          value={currencyFormatter.format(analytics.totalSpent)}
          icon={<BadgeDollarSign className="h-5 w-5" />}
        />
        <StatCard
          title="This Month"
          value={currencyFormatter.format(analytics.currentMonthSpent)}
          icon={<CalendarDays className="h-5 w-5" />}
          accentClassName={alertTone === 'rose' ? 'text-rose-600' : 'text-accent'}
          helperText={statusCopy}
          progress={budgetProgress}
          progressTone={progressTone}
        />
        <StatCard
          title="Top Category"
          value={topCategory}
          icon={<PieChartIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Budget Remaining"
          value={currencyFormatter.format(budgetStatus.remaining)}
          icon={<TrendingUp className="h-5 w-5" />}
          accentClassName={
            alertTone === 'rose' ? 'text-rose-600' : alertTone === 'amber' ? 'text-amber-600' : 'text-emerald-600'
          }
          helperText={statusCopy}
        />
        <StatCard
          title="Average Monthly Spend"
          value={currencyFormatter.format(analytics.averageMonthlySpend)}
          icon={<BadgeDollarSign className="h-5 w-5" />}
        />
      </motion.div>

      {/* Insight chips */}
      <motion.div variants={item} className="flex flex-wrap gap-3">
        {categoryInsightChips.map((chip) => (
          <div
            key={chip.label}
            className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2 text-sm text-slate-700 dark:text-slate-200"
          >
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{chip.label}</span>
            <span className="font-semibold">{chip.value}</span>
          </div>
        ))}
        <div className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2 text-sm text-slate-700 dark:text-slate-200">
          {refreshLabel}
        </div>
      </motion.div>

      {/* Charts — kept solid for data clarity (no glass) */}
      <motion.div variants={item} className="grid gap-6 xl:grid-cols-2">
        <MonthlyBarChart data={analytics.monthlySpending} />
        <CategoryPieChart data={analytics.categoryBreakdown} />
      </motion.div>

      {/* Category alerts */}
      {analytics.categoryAlerts.length > 0 ? (
        <motion.div variants={item} className="flex flex-wrap gap-3">
          {analytics.categoryAlerts.map((alert) => (
            <span
              key={`${alert.category}-${alert.type}`}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                alert.type === 'exceeded'
                  ? 'bg-rose-50/70 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200'
                  : 'bg-amber-50/70 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200'
              }`}
            >
              {alert.category} {alert.type === 'exceeded' ? 'exceeded' : 'near'} category budget
            </span>
          ))}
        </motion.div>
      ) : null}

      {/* AI Insights — glass panel + LiquidBlobLoader for loading state */}
      {aiInsight ? (
        <motion.div variants={item} className="glass-panel rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">AI Insights</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Cached monthly summary</p>
            </div>
            <button
              type="button"
              onClick={() => void refreshAnalytics()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/50 glass-panel-subtle px-3 py-2 text-sm font-semibold text-slate-700 transition hover:shadow-glass dark:text-slate-200"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>

          {/* Subtle caustic-light ambient overlay inside the AI panel */}
          <div className="relative overflow-hidden rounded-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 30%, rgba(5,150,105,1), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(99,102,241,1), transparent 60%)',
                filter: 'blur(24px)',
              }}
            />
            <p className="relative z-10 text-sm leading-7 text-slate-700 dark:text-slate-300">{aiInsight.summary}</p>
          </div>

          {aiInsight.tips.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {aiInsight.tips.map((tip) => (
                <span
                  key={tip}
                  className="rounded-full bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-sm dark:bg-emerald-500/15 dark:text-emerald-200"
                >
                  {tip}
                </span>
              ))}
            </div>
          ) : null}
        </motion.div>
      ) : loading ? (
        <motion.div variants={item} className="glass-panel flex items-center justify-center rounded-2xl p-10">
          <LiquidBlobLoader label="Generating AI insights…" />
        </motion.div>
      ) : null}

      {/* Recent Transactions — solid surface (no glass for dense list) */}
      <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Transactions</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your latest five expenses</p>
          </div>
          <Link
            to="/expenses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {analytics.recentTransactions.map((expense) => (
            <div
              key={expense._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800"
            >
              <div>
                <div className="flex items-center gap-3">
                  <CategoryBadge category={expense.category} />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                  {expense.description || 'Untitled expense'}
                </p>
              </div>
              <p className="font-bold tabular-nums text-slate-900 dark:text-white">
                {currencyFormatter.format(expense.amount)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};