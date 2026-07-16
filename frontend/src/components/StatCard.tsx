import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  accentClassName?: string;
  helperText?: string;
  progress?: number; // 0–100, enables liquid-fill bar
  progressTone?: 'emerald' | 'amber' | 'rose';
}

export const StatCard = ({
  title,
  value,
  icon,
  accentClassName = 'text-primary',
  helperText,
  progress,
  progressTone = 'emerald',
}: StatCardProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 22, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = (): void => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const progressColors = {
    emerald: { bar: 'bg-emerald-500', glow: 'shadow-glow-emerald' },
    amber:   { bar: 'bg-amber-500',   glow: 'shadow-glow-amber' },
    rose:    { bar: 'bg-rose-500',     glow: '' },
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={shouldReduceMotion ? { y: -2 } : {}}
      className="tilt-card cursor-default"
    >
      <div className="glass-panel tilt-card-inner rounded-2xl p-5 transition-shadow duration-300 hover:shadow-glass-lg">
        <div className="flex items-start justify-between gap-4">
          {/* Text content — deeper Z layer */}
          <div className="tilt-depth-1 flex-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-slate-900 dark:text-white tilt-depth-2">
              {value}
            </p>
            {helperText ? (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
            ) : null}
          </div>

          {/* Icon — highest Z layer */}
          <div
            className={`tilt-depth-3 rounded-2xl bg-slate-100/80 p-3 backdrop-blur-sm dark:bg-slate-800/60 ${accentClassName}`}
          >
            {icon}
          </div>
        </div>

        {/* Liquid-fill progress bar */}
        {typeof progress === 'number' ? (
          <div className="mt-4">
            <div className="liquid-fill-bar h-2 w-full bg-slate-200/60 dark:bg-slate-700/60">
              <motion.div
                className={`h-full rounded-full ${progressColors[progressTone].bar} ${progressColors[progressTone].glow}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};