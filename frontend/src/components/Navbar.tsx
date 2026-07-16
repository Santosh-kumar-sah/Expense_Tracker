import { Menu, MoonStar, RefreshCw, Shield, SunMedium, UserCircle2, Users2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExpense } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

interface NavbarProps {
  title: string;
  onMenuClick: () => void;
}

export const Navbar = ({ title, onMenuClick }: NavbarProps): JSX.Element => {
  const { user, logout } = useAuth();
  const { lastRefreshedAt, refreshAnalytics, scope, setScope } = useExpense();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    try {
      await refreshAnalytics();
    } finally {
      setRefreshing(false);
    }
  };

  const updatedLabel = lastRefreshedAt
    ? `Updated ${Math.max(0, Math.round((Date.now() - new Date(lastRefreshedAt).getTime()) / 60000))}m ago`
    : 'Not updated yet';

  return (
    <header className="sticky top-0 z-20 glass-panel-subtle px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200/50 p-2 text-slate-600 backdrop-blur-sm transition hover:bg-white/30 lg:hidden dark:border-slate-700/50 dark:text-slate-300 dark:hover:bg-white/5"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Performance-focused expense tracking</p>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          {/* Scope toggle */}
          {user?.householdId ? (
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/50 glass-panel-subtle p-1 sm:flex">
              <button
                type="button"
                onClick={() => setScope('personal')}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  scope === 'personal'
                    ? 'bg-slate-900/80 text-white backdrop-blur-sm dark:bg-white/15 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Shield className="h-4 w-4" />
                Personal
              </button>
              <button
                type="button"
                onClick={() => setScope('household')}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  scope === 'household'
                    ? 'bg-slate-900/80 text-white backdrop-blur-sm dark:bg-white/15 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Users2 className="h-4 w-4" />
                Family
              </button>
            </div>
          ) : null}

          {/* Refresh button */}
          <button
            type="button"
            onClick={() => void handleRefresh()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200/50 glass-panel-subtle px-3 py-2 text-sm font-semibold text-slate-700 transition hover:shadow-glass dark:text-slate-200"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200/50 glass-panel-subtle p-2 text-slate-600 transition hover:scale-[1.06] hover:shadow-glass dark:text-slate-300"
          >
            {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </button>

          {/* User menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((c) => !c)}
            className="flex items-center gap-2 rounded-xl border border-slate-200/50 glass-panel-subtle px-3 py-2 text-sm font-semibold text-slate-700 transition hover:shadow-glass dark:text-slate-200"
          >
            <UserCircle2 className="h-5 w-5" />
            {user?.name ?? 'Account'}
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                key="user-menu"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute right-0 top-12 w-52 glass-panel rounded-2xl p-2"
              >
                <p className="px-3 py-2 text-xs uppercase tracking-wide text-slate-400">Signed in as</p>
                <p className="px-3 pb-2 text-sm font-semibold text-slate-900 dark:text-white">{user?.email}</p>
                <p className="px-3 pb-2 text-xs text-slate-500 dark:text-slate-400">{updatedLabel}</p>
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50/60 dark:hover:bg-rose-950/30"
                >
                  Logout
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};