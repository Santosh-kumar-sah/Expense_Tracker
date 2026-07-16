import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion, motion } from 'framer-motion';
import { ArrowRight, BadgeDollarSign, BrainCircuit, ChartColumn, ShieldCheck, Users2 } from 'lucide-react';
import { LandingSection } from '../components/landing/LandingSection';
import { ScrollProgress } from '../components/landing/ScrollProgress';
import { DashboardPreview } from '../components/landing/DashboardPreview';
import { LiquidBlobs } from '../components/landing/LiquidBlobs';
import { WaveDivider } from '../components/landing/WaveDivider';

const sectionIds = ['hero', 'problem', 'features', 'ai', 'family', 'stats', 'cta'];

interface FeatureCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

const FeatureCard = ({ Icon, title, body }: FeatureCardProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(4px)`;
  };

  const handleMouseLeave = (): void => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel rounded-[1.75rem] p-6 transition-transform duration-300 ease-out hover:shadow-glass-lg"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease' }}
    >
      <div style={{ transform: 'translateZ(8px)' }}>
        <Icon className="h-6 w-6 text-emerald-400" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-white" style={{ transform: 'translateZ(6px)' }}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-300" style={{ transform: 'translateZ(4px)' }}>
        {body}
      </p>
    </div>
  );
};

export const Home = (): JSX.Element => {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const index = sectionIds.indexOf(visible.target.id);
          if (index >= 0) setActiveSection(index);
        }
      },
      { threshold: 0.45 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Users trust ExpenseIQ', value: '12k+' },
      { label: 'Categories tracked', value: '10' },
      { label: 'Budget alerts caught early', value: '98%' },
    ],
    []
  );

  return (
    <div className="landing-shell relative min-h-screen overflow-y-auto text-white snap-y snap-mandatory"
      style={{
        background: 'radial-gradient(circle at top left, rgba(5,150,105,0.14), transparent 32%), linear-gradient(180deg, #020617, #0f172a 40%, #111827 100%)',
      }}
    >
      {/* Ambient background for landing — denser than dashboard */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
        <div className="ambient-blob ambient-blob-a" style={{ width: '800px', height: '800px', opacity: 0.7 }} />
        <div className="ambient-blob ambient-blob-b" style={{ width: '700px', height: '700px', opacity: 0.5 }} />
        <div className="ambient-blob ambient-blob-c" style={{ width: '500px', height: '500px', opacity: 0.4 }} />
      </div>

      <ScrollProgress
        sections={sectionIds}
        activeSection={activeSection}
        onJump={(index) =>
          document.getElementById(sectionIds[index])?.scrollIntoView({
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
            block: 'start',
          })
        }
      />

      {/* ── HERO ── */}
      <LandingSection id="hero">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:min-h-[calc(100vh-8rem)]">
          {/* Liquid blobs behind hero content */}
          <LiquidBlobs />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200 backdrop-blur-sm"
            >
              ExpenseIQ for modern households
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Fintech-grade expense tracking that feels{' '}
              <span className="text-emerald-400">calm</span>,{' '}
              <span className="text-amber-300">clear</span>, and in control.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
            >
              See what you spent, what is drifting, and what your household should watch next. ExpenseIQ keeps personal
              and family money in one premium workspace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/signup"
                className="glass-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="glass-button-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition hover:shadow-glass"
              >
                Log In
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </LandingSection>

      <WaveDivider color="rgba(255,255,255,0.025)" />

      {/* ── PROBLEM ── */}
      <LandingSection id="problem" className="bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[
            ['Manual tracking', 'Spreadsheets blur the story when spend changes fast.'],
            ['No family visibility', 'Household costs stay fragmented across people and cards.'],
            ['No early warnings', 'You see overspend after it happens, not before.'],
          ].map(([title, body]) => (
            <div
              key={title}
              className="glass-panel rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg"
            >
              <p className="text-sm font-semibold text-amber-300">Problem</p>
              <h2 className="mt-3 text-2xl font-bold text-white">{title}</h2>
              <p className="mt-3 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </LandingSection>

      <WaveDivider flip color="rgba(255,255,255,0.02)" />

      {/* ── FEATURES ── */}
      <LandingSection id="features">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
            What you get
          </p>
          <h2 className="mb-10 text-center text-4xl font-black text-white">
            Everything you need to stay ahead.
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" style={{ perspective: '1200px' }}>
            {[
              [ChartColumn, 'Smart Dashboard', 'Live charts, budget pressure, and clarity at a glance.'],
              [BrainCircuit, 'AI Assistant', 'Natural-language logging and quick monthly summaries.'],
              [Users2, 'Family Planning', 'Shared budgets, invite codes, and member-level views.'],
              [ShieldCheck, 'Budget Alerts', 'Under, nearing, and exceeded states in one visual system.'],
            ].map(([Icon, title, body]) => (
              <FeatureCard
                key={title as string}
                Icon={Icon as React.ComponentType<{ className?: string }>}
                title={title as string}
                body={body as string}
              />
            ))}
          </div>
        </div>
      </LandingSection>

      <WaveDivider color="rgba(255,255,255,0.025)" />

      {/* ── AI ── */}
      <LandingSection id="ai">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-sm font-semibold text-emerald-300">AI Assistant</p>
            {/* Caustic-light background inside AI panel */}
            <div className="relative mt-6 space-y-4 text-sm text-slate-200">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  background: 'radial-gradient(ellipse at 30% 50%, rgba(5,150,105,1), transparent 50%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="relative glass-panel-subtle max-w-md rounded-2xl p-4">
                "Add ₹450 for lunch today."
              </div>
              <div className="relative ml-auto glass-panel-subtle max-w-md rounded-2xl border border-emerald-500/20 p-4 text-emerald-100">
                Logged lunch expense for ₹450 and updated your budget view.
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black text-white">
              Speak naturally. ExpenseIQ turns requests into real actions.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Every write goes through the same validation path as manual entry, so the assistant is helpful without
              bypassing your rules.
            </p>
          </div>
        </div>
      </LandingSection>

      <WaveDivider flip color="rgba(255,255,255,0.02)" />

      {/* ── FAMILY ── */}
      <LandingSection id="family">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-black text-white">
              Built for the household, not just the individual.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Track family spend, shared budgets, and member pressure in one place with a clean personal/family toggle.
            </p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Shared budget ring</span>
              <span>₹82k / ₹100k</span>
            </div>
            <div className="mt-4 h-40 rounded-full border-8 border-emerald-400/35 p-4">
              <div className="flex h-full items-center justify-center rounded-full bg-slate-950/60 text-center text-white backdrop-blur-sm">
                3 members · 1 budget
              </div>
            </div>
            {/* Liquid-fill bar showing family budget usage */}
            <div className="mt-4">
              <div className="liquid-fill-bar h-2 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-emerald-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '82%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">82% of shared monthly budget used</p>
            </div>
          </div>
        </div>
      </LandingSection>

      <WaveDivider color="rgba(255,255,255,0.025)" />

      {/* ── STATS ── */}
      <LandingSection id="stats">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-[1.5rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg"
              >
                <p className="text-4xl font-black tabular-nums text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </LandingSection>

      <WaveDivider flip color="rgba(255,255,255,0.02)" />

      {/* ── CTA ── */}
      <LandingSection id="cta">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl glass-panel">
            <BadgeDollarSign className="h-8 w-8 text-emerald-300" />
          </div>
          <h2 className="mt-6 text-4xl font-black text-white">
            Start with a clean dashboard, then add family and AI when you need them.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="glass-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="glass-button-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
            >
              Log In
            </Link>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.28em] text-slate-400">
            ExpenseIQ · premium expense intelligence
          </p>
        </div>
      </LandingSection>
    </div>
  );
};