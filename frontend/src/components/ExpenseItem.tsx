import { Pencil, Trash2 } from 'lucide-react';
import type { Expense } from '../types';
import { CategoryBadge } from './CategoryBadge';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export const ExpenseItem = ({ expense, onEdit, onDelete }: ExpenseItemProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <CategoryBadge category={expense.category} />
          <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(expense.date).toLocaleDateString()}</span>
        </div>
        <p className="font-semibold text-slate-900 dark:text-white">{expense.description || 'No description provided'}</p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p className="text-lg font-bold tabular-nums text-slate-900 dark:text-white">₹{expense.amount.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onEdit(expense)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button type="button" onClick={() => onDelete(expense)} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};