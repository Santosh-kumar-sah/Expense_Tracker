import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { EmptyState } from '../components/EmptyState';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseItem } from '../components/ExpenseItem';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { useExpense } from '../context/ExpenseContext';
import type { Category, Expense } from '../types';

const categories: Array<Category | ''> = ['', 'Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Education', 'Rent', 'Groceries', 'Other'];

export const Expenses = (): JSX.Element => {
  const { user } = useAuth();
  const { expenses, filters, pagination, loading, setFilters, setPage, createExpense, updateExpense, deleteExpense } = useExpense();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Expense | null>(null);

  const visibleFilters = useMemo(() => filters, [filters]);

  const submitExpense = async (values: { amount: number; category: Category; description: string; date: string; householdId: string | null }): Promise<void> => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, values);
    } else {
      await createExpense(values);
    }
    setEditingExpense(null);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeUp">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[1fr,1fr,1fr,auto]">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={visibleFilters.search} onChange={(event) => setFilters({ ...visibleFilters, search: event.target.value })} placeholder="Search description" className="w-full bg-transparent text-sm outline-none" />
          </label>
          <select value={visibleFilters.category} onChange={(event) => setFilters({ ...visibleFilters, category: event.target.value as Category | '' })} className="rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900">
            {categories.map((category) => (
              <option key={category || 'all'} value={category}>
                {category || 'All categories'}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input type="date" value={visibleFilters.startDate} onChange={(event) => setFilters({ ...visibleFilters, startDate: event.target.value })} className="rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
            <input type="date" value={visibleFilters.endDate} onChange={(event) => setFilters({ ...visibleFilters, endDate: event.target.value })} className="rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
          </div>
          <button type="button" onClick={() => { setEditingExpense(null); setModalOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" />
            Add Expense
          </button>
        </div>
      </div>

      {loading ? <Loader label="Loading expenses" className="min-h-[40vh]" /> : expenses.length === 0 ? <EmptyState icon={<SlidersHorizontal className="h-6 w-6" />} title="No matching expenses" description="Try widening your filters or add a new expense to populate the list." actionLabel="Add Expense" onAction={() => setModalOpen(true)} /> : <div className="space-y-3">{expenses.map((expense) => <ExpenseItem key={expense._id} expense={expense} onEdit={(item) => { setEditingExpense(item); setModalOpen(true); }} onDelete={setConfirmDelete} />)}</div>}

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">Page {pagination.page} of {pagination.pages}</p>
        <div className="flex gap-2">
          <button type="button" disabled={pagination.page <= 1} onClick={() => setPage(pagination.page - 1)} className="rounded-xl border border-slate-200 px-3 py-2 font-semibold disabled:opacity-40 dark:border-slate-700">
            Previous
          </button>
          <button type="button" disabled={pagination.page >= pagination.pages} onClick={() => setPage(pagination.page + 1)} className="rounded-xl border border-slate-200 px-3 py-2 font-semibold disabled:opacity-40 dark:border-slate-700">
            Next
          </button>
        </div>
      </div>

      <ExpenseForm
        key={modalOpen ? (editingExpense?._id || 'new') : 'closed'}
        isOpen={modalOpen}
        initialExpense={editingExpense}
        defaultHouseholdId={user?.householdId ?? null}
        onClose={() => { setModalOpen(false); setEditingExpense(null); }}
        onSubmit={submitExpense}
      />

      {confirmDelete ? (
        <ConfirmDialog
          title="Delete expense?"
          message={`This will permanently remove ${confirmDelete.description || 'the selected expense'}.`}
          confirmLabel="Delete"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={async () => {
            await deleteExpense(confirmDelete._id);
            setConfirmDelete(null);
          }}
        />
      ) : null}
    </div>
  );
};