import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface LandingSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const LandingSection = ({ id, children, className = '' }: LandingSectionProps): JSX.Element => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`landing-page-section min-h-screen snap-start px-6 py-16 sm:px-8 lg:px-12 ${className}`.trim()}
      initial={{ opacity: 0, y: 40, rotateX: shouldReduceMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};