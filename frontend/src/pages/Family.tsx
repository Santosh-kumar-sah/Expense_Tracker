import { motion } from 'framer-motion';
import { Users2 } from 'lucide-react';

export const Family = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl p-8 text-center"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl glass-panel-subtle">
        <Users2 className="h-7 w-7 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Family planning</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Household budgets and member breakdown will appear here.
      </p>
    </motion.div>
  );
};