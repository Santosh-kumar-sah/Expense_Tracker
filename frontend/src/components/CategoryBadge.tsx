import type { Category } from '../types';

interface CategoryBadgeProps {
  category: Category;
}

const badgeClasses: Record<Category, string> = {
  Food: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200',
  Travel: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  Bills: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  Shopping: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200',
  Health: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
  Entertainment: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  Education: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200',
  Rent: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
  Groceries: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
  Other: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export const CategoryBadge = ({ category }: CategoryBadgeProps): JSX.Element => {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses[category]}`}>{category}</span>;
};