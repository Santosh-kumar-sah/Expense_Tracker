import { BarChart3, Home, LayoutDashboard, Wallet, Users2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-slate-900/80 text-white shadow-glass backdrop-blur-sm dark:bg-white/10 dark:text-white'
      : 'text-slate-600 hover:bg-white/40 hover:backdrop-blur-sm dark:text-slate-300 dark:hover:bg-white/5'
  }`;

export const Sidebar = ({ isOpen, onClose }: SidebarProps): JSX.Element => {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 glass-panel-subtle p-5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center justify-between lg:justify-start">
            <div>
              <p className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Expense<span className="text-emerald-500">IQ</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Expense intelligence</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200/50 p-2 text-slate-500 backdrop-blur-sm lg:hidden dark:border-slate-700/50 dark:text-slate-300"
            >
              <span className="sr-only">Close navigation</span>×
            </button>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            <NavLink to="/dashboard" className={navLinkClass} onClick={onClose}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink to="/expenses" className={navLinkClass} onClick={onClose}>
              <Wallet className="h-4 w-4" />
              Expenses
            </NavLink>
            <NavLink to="/family" className={navLinkClass} onClick={onClose}>
              <Users2 className="h-4 w-4" />
              Family
            </NavLink>
            <NavLink to="/" className={navLinkClass} onClick={onClose}>
              <Home className="h-4 w-4" />
              Marketing
            </NavLink>
          </nav>

          {/* Bottom info card — glass treatment */}
          <div className="mt-auto glass-panel rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              Smart budgeting
            </div>
            Track spend by month, category, and budget pressure in one view.
          </div>
        </div>
      </aside>

      {/* Overlay backdrop */}
      <AnimatePresence>
        {isOpen ? (
          <motion.button
            key="overlay"
            type="button"
            aria-label="Close overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};