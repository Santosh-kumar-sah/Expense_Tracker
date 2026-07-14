import { BarChart3, Home, LayoutDashboard, Wallet, Users2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`;

export const Sidebar = ({ isOpen, onClose }: SidebarProps): JSX.Element => {
  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-5 transition-transform dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex h-full flex-col gap-8">
          <div className="flex items-center justify-between lg:justify-start">
            <div>
              <p className="text-lg font-black tracking-tight text-slate-900 dark:text-white">ExpenseIQ</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Expense intelligence</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 p-2 text-slate-500 lg:hidden dark:border-slate-800 dark:text-slate-300">
              <span className="sr-only">Close navigation</span>
              ×
            </button>
          </div>
          <nav className="space-y-2">
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
          <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <BarChart3 className="h-4 w-4 text-emerald-600" />
              Smart budgeting
            </div>
            Track spend by month, category, and budget pressure in one view.
          </div>
        </div>
      </aside>
      {isOpen ? <button type="button" aria-label="Close overlay" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={onClose} /> : null}
    </>
  );
};