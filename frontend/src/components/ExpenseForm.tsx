import { useEffect, useState } from 'react';
import type { Category, Expense } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export interface ExpenseFormValues {
  amount: number | '';
  category: Category;
  description: string;
  date: string;
  householdId: string | null;
}

interface ExpenseFormProps {
  isOpen: boolean;
  initialExpense?: Expense | null;
  defaultHouseholdId?: string | null;
  onClose: () => void;
  onSubmit: (values: { amount: number; category: Category; description: string; date: string; householdId: string | null }) => void;
}

const categories: Category[] = ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Education', 'Rent', 'Groceries', 'Other'];

const inputClass =
  'w-full rounded-xl border border-slate-200/60 bg-white/50 px-4 py-3 text-slate-900 outline-none backdrop-blur-sm transition focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 dark:border-slate-700/50 dark:bg-slate-900/50 dark:text-white dark:focus:border-emerald-400/60';

export const ExpenseForm = ({
  isOpen,
  initialExpense,
  defaultHouseholdId = null,
  onClose,
  onSubmit,
}: ExpenseFormProps): JSX.Element | null => {
  const [values, setValues] = useState<ExpenseFormValues>({
    amount: initialExpense?.amount ?? '',
    category: initialExpense?.category ?? 'Food',
    description: initialExpense?.description ?? '',
    date: initialExpense?.date
      ? new Date(initialExpense.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    householdId: initialExpense?.householdId ?? defaultHouseholdId,
  });

  useEffect(() => {
    setValues({
      amount: initialExpense?.amount ?? '',
      category: initialExpense?.category ?? 'Food',
      description: initialExpense?.description ?? '',
      date: initialExpense?.date
        ? new Date(initialExpense.date).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      householdId: initialExpense?.householdId ?? defaultHouseholdId,
    });
  }, [defaultHouseholdId, initialExpense, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="expense-form-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(2, 6, 23, 0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            key="expense-form-panel"
            initial={{ opacity: 0, scale: 0.94, rotateX: 8, y: 10, transformPerspective: 800 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.40, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel-lg w-full max-w-lg rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {initialExpense ? 'Edit Expense' : 'Add Expense'}
            </h3>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                onSubmit({
                  ...values,
                  amount: values.amount === '' ? 0 : Number(values.amount),
                });
              }}
            >
              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={values.amount}
                  onChange={(e) => setValues((c) => ({ ...c, amount: e.target.value === '' ? '' : Number(e.target.value) }))}
                  className={inputClass}
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Category</label>
                <select
                  value={values.category}
                  onChange={(e) => setValues((c) => ({ ...c, category: e.target.value as Category }))}
                  className={inputClass}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Date</label>
                <input
                  type="date"
                  value={values.date}
                  onChange={(e) => setValues((c) => ({ ...c, date: e.target.value }))}
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
                <textarea
                  maxLength={200}
                  value={values.description}
                  onChange={(e) => setValues((c) => ({ ...c, description: e.target.value }))}
                  className={`${inputClass} min-h-28`}
                />
              </div>

              {/* Scope toggle */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200/50 glass-panel-subtle px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Expense scope</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Choose personal or family for this entry</p>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setValues((c) => ({ ...c, householdId: c.householdId ? null : defaultHouseholdId }))}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    values.householdId
                      ? 'bg-emerald-600/90 text-white shadow-glow-emerald backdrop-blur-sm'
                      : 'bg-slate-100/70 text-slate-700 backdrop-blur-sm dark:bg-slate-800/60 dark:text-slate-200'
                  }`}
                >
                  {values.householdId ? 'Family' : 'Personal'}
                </motion.button>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200/60 glass-panel-subtle px-4 py-2 text-sm font-semibold text-slate-700 transition hover:shadow-glass dark:text-slate-200"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-button rounded-xl px-4 py-2 text-sm font-semibold text-white"
                >
                  Save Expense
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};