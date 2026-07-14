import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  accentClassName?: string;
  helperText?: string;
}

export const StatCard = ({ title, value, icon, accentClassName = 'text-primary', helperText }: StatCardProps): JSX.Element => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-slate-900 dark:text-white">{value}</p>
          {helperText ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helperText}</p> : null}
        </div>
        <div className={`rounded-2xl bg-slate-100 p-3 dark:bg-slate-800 ${accentClassName}`.trim()}>{icon}</div>
      </div>
    </div>
  );
};