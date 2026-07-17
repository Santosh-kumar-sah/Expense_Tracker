import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ icon, title, description, actionLabel, onAction }: EmptyStateProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-panel rounded-2xl border border-dashed border-slate-300/40 p-10 text-center dark:border-slate-600/30"
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl glass-panel-subtle text-slate-500 dark:text-slate-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {actionLabel && onAction ? (
        <motion.button
          type="button"
          onClick={onAction}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glass-button mt-6 inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
        >
          {actionLabel}
        </motion.button>
      ) : null}
    </motion.div>
  );
};