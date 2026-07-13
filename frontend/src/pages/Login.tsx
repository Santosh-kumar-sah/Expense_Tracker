import { Eye, EyeOff, Mail, LockKeyhole } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const Login = (): JSX.Element => {
  const { login, loading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
      const nextPath = (location.state as { from?: Location } | null)?.from?.pathname ?? '/dashboard';
      navigate(nextPath, { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(61,104,245,0.14),_transparent_36%),linear-gradient(180deg,_#f8fafc,_#eef2ff)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_transparent_36%),linear-gradient(180deg,_#020617,_#0f172a)]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <div className="w-full rounded-3xl border border-white/50 bg-white/80 p-8 shadow-card backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">ExpenseIQ</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Sign in to your dashboard</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Track spending, budgets, and insights in one place.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Email</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <Mail className="h-4 w-4 text-slate-400" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full bg-transparent text-slate-900 outline-none dark:text-white" placeholder="you@example.com" />
              </div>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} className="w-full bg-transparent text-slate-900 outline-none dark:text-white" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>
            {(authError || null) ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{authError}</p> : null}
            <button type="submit" disabled={submitting || loading} className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            New here? <Link to="/signup" className="font-semibold text-primary">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};