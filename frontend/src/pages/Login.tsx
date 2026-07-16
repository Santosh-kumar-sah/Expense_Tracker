import { Eye, EyeOff, Mail, LockKeyhole } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

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

  const inputClass =
    'w-full bg-transparent text-slate-900 outline-none dark:text-white placeholder:text-slate-400';

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(61,104,245,0.14),_transparent_36%),linear-gradient(180deg,_#f8fafc,_#eef2ff)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_transparent_36%),linear-gradient(180deg,_#020617,_#0f172a)]">
      {/* Ambient blobs */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-blob ambient-blob-a" />
        <div className="ambient-blob ambient-blob-b" />
        <div className="ambient-blob ambient-blob-c" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="glass-panel-lg w-full rounded-3xl p-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                Expense<span className="text-slate-900 dark:text-white">IQ</span>
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Sign in to your dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Track spending, budgets, and insights in one place.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Email</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/60 glass-panel-subtle px-4 py-3 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                  <Mail className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/60 glass-panel-subtle px-4 py-3 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                  <LockKeyhole className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((c) => !c)}
                    className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              {/* Error */}
              {authError ? (
                <p className="rounded-xl border border-rose-200/60 glass-panel-subtle px-4 py-3 text-sm font-medium text-rose-700 dark:text-rose-300">
                  {authError}
                </p>
              ) : null}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitting || loading}
                whileHover={{ scale: submitting || loading ? 1 : 1.01 }}
                whileTap={{ scale: submitting || loading ? 1 : 0.98 }}
                className="glass-button w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Signing in…' : 'Sign In'}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              New here?{' '}
              <Link to="/signup" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};