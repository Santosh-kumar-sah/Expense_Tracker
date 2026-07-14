export const DashboardPreview = (): JSX.Element => {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-4 shadow-2xl shadow-slate-950/20 dark:border-slate-800">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-4 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Budget</p>
          <p className="mt-3 text-3xl font-black tabular-nums">₹42,450</p>
        </div>
        <div className="rounded-2xl bg-slate-900 p-4 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Alerts</p>
          <p className="mt-3 text-3xl font-black tabular-nums">2 near</p>
        </div>
        <div className="rounded-2xl bg-slate-900 p-4 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-sky-300">AI</p>
          <p className="mt-3 text-sm text-slate-300">“Lunch logged. Travel is up 18%.”</p>
        </div>
      </div>
      <div className="mt-4 h-52 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.22),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,1),_rgba(15,23,42,0.88))] p-4">
        <div className="h-full rounded-[1.25rem] border border-white/10 bg-white/5 backdrop-blur" />
      </div>
    </div>
  );
};