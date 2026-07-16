import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export const DashboardPreview = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = (): void => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel rounded-[2rem] p-4"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <div className="grid gap-4 sm:grid-cols-3" style={{ transform: 'translateZ(6px)' }}>
        <div className="glass-panel-subtle rounded-2xl p-4 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Budget</p>
          <p className="mt-3 text-3xl font-black tabular-nums">₹42,450</p>
        </div>
        <div className="glass-panel-subtle rounded-2xl p-4 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Alerts</p>
          <p className="mt-3 text-3xl font-black tabular-nums">2 near</p>
        </div>
        <div className="glass-panel-subtle rounded-2xl p-4 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-sky-300">AI</p>
          <p className="mt-3 text-sm text-slate-300">"Lunch logged. Travel is up 18%."</p>
        </div>
      </div>

      <div
        className="mt-4 h-52 rounded-[1.5rem] p-4"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(16,185,129,0.22), transparent 35%), linear-gradient(180deg, rgba(15,23,42,0.85), rgba(15,23,42,0.70))',
          transform: 'translateZ(3px)',
        }}
      >
        <div className="flex h-full items-end gap-2 px-2 pb-2">
          {[35, 55, 40, 70, 48, 82, 60].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-emerald-400/40"
              style={{ height: `${h}%`, transition: `height 0.6s ease ${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};