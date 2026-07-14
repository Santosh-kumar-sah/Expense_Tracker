import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, BadgeDollarSign, BrainCircuit, ChartColumn, ShieldCheck, Users2 } from 'lucide-react';
import { LandingSection } from '../components/landing/LandingSection';
import { ScrollProgress } from '../components/landing/ScrollProgress';
import { DashboardPreview } from '../components/landing/DashboardPreview';

const sectionIds = ['hero', 'problem', 'features', 'ai', 'family', 'stats', 'cta'];

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

  const stats = useMemo(() => [
    { label: 'Users trust ExpenseIQ', value: '12k+' },
    { label: 'Categories tracked', value: '10' },
    { label: 'Budget alerts caught early', value: '98%' },
  ], []);

  return (
    <div className="landing-shell min-h-screen overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(5,150,105,0.14),_transparent_32%),linear-gradient(180deg,_#020617,_#0f172a_40%,_#111827_100%)] text-white snap-y snap-mandatory">
      <ScrollProgress sections={sectionIds} activeSection={activeSection} onJump={(index) => document.getElementById(sectionIds[index])?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' })} />

      <LandingSection id="hero">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:min-h-[calc(100vh-8rem)]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">ExpenseIQ for modern households</p>
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">Fintech-grade expense tracking that feels calm, clear, and in control.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">See what you spent, what is drifting, and what your household should watch next. ExpenseIQ keeps personal and family money in one premium workspace.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:translate-y-[-1px]">Get Started Free <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10">Log In</Link>
            </div>
          </div>
          <DashboardPreview />
        </div>
      </LandingSection>

      <LandingSection id="problem" className="bg-white/2">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[
            ['Manual tracking', 'Spreadsheets blur the story when spend changes fast.'],
            ['No family visibility', 'Household costs stay fragmented across people and cards.'],
            ['No early warnings', 'You see overspend after it happens, not before.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold text-amber-300">Problem</p>
              <h2 className="mt-3 text-2xl font-bold text-white">{title}</h2>
              <p className="mt-3 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </LandingSection>

      <LandingSection id="features">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              [ChartColumn, 'Smart Dashboard', 'Live charts, budget pressure, and clarity at a glance.'],
              [BrainCircuit, 'AI Assistant', 'Natural-language logging and quick monthly summaries.'],
              [Users2, 'Family Planning', 'Shared budgets, invite codes, and member-level views.'],
              [ShieldCheck, 'Budget Alerts', 'Under, nearing, and exceeded states in one visual system.'],
            ].map(([Icon, title, body]) => (
              <div key={title as string} className="rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6">
                <Icon className="h-6 w-6 text-emerald-400" />
                <h3 className="mt-4 text-xl font-bold text-white">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body as string}</p>
              </div>
            ))}
          </div>
        </div>
      </LandingSection>

      <LandingSection id="ai">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm font-semibold text-emerald-300">AI Assistant</p>
            <div className="mt-6 space-y-4 text-sm text-slate-200">
              <div className="max-w-md rounded-2xl bg-white/5 p-4">“Add ₹450 for lunch today.”</div>
              <div className="ml-auto max-w-md rounded-2xl bg-emerald-500/15 p-4 text-emerald-100">Logged lunch expense for ₹450 and updated your budget view.</div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black text-white">Speak naturally. ExpenseIQ turns requests into real actions.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">Every write goes through the same validation path as manual entry, so the assistant is helpful without bypassing your rules.</p>
          </div>
        </div>
      </LandingSection>

      <LandingSection id="family">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-black text-white">Built for the household, not just the individual.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">Track family spend, shared budgets, and member pressure in one place with a clean personal/family toggle.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between text-sm text-slate-300"><span>Shared budget ring</span><span>₹82k / ₹100k</span></div>
            <div className="mt-4 h-40 rounded-full border-8 border-emerald-400/35 p-4">
              <div className="flex h-full items-center justify-center rounded-full bg-slate-950 text-center text-white">3 members · 1 budget</div>
            </div>
          </div>
        </div>
      </LandingSection>

      <LandingSection id="stats">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
                <p className="text-4xl font-black tabular-nums text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </LandingSection>

      <LandingSection id="cta">
        <div className="mx-auto max-w-4xl text-center">
          <BadgeDollarSign className="mx-auto h-10 w-10 text-emerald-300" />
          <h2 className="mt-6 text-4xl font-black text-white">Start with a clean dashboard, then add family and AI when you need them.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950">Get Started Free</Link>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white">Log In</Link>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.28em] text-slate-400">ExpenseIQ · premium expense intelligence</p>
        </div>
      </LandingSection>
    </div>
  );
};