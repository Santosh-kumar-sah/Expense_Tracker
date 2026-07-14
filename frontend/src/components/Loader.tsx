import type { HTMLAttributes } from 'react';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
}

export const Loader = ({ label = 'Loading', className = '' }: LoaderProps): JSX.Element => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`.trim()} role="status" aria-live="polite">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
};