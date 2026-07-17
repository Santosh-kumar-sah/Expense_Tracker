/**
 * LiquidBlobLoader — used for AI insight loading states specifically.
 * A blob that squishes/stretches in a loop, like water settling in a glass.
 * Keep the plain spinner (Loader.tsx) for quick data fetches.
 */
interface LiquidBlobLoaderProps {
  label?: string;
  size?: number;
}

export const LiquidBlobLoader = ({
  label = 'Generating insights…',
  size = 40,
}: LiquidBlobLoaderProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
      <div
        className="blob-loader"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
};
