/**
 * WaveDivider — animated SVG sine-wave section divider.
 * Replaces hard straight edges between landing page sections.
 * SVG path animates slowly with CSS (no JS per frame).
 */
interface WaveDividerProps {
  flip?: boolean;
  color?: string;
  className?: string;
}

export const WaveDivider = ({
  flip = false,
  color = 'rgba(255,255,255,0.03)',
  className = '',
}: WaveDividerProps): JSX.Element => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      style={{ height: '48px' }}
    >
      <svg
        viewBox="0 0 1200 48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0,24 C200,0 400,48 600,24 C800,0 1000,48 1200,24 L1200,48 L0,48 Z"
          fill={color}
          style={{ animation: 'waveShift 8s ease-in-out infinite alternate' }}
        />
      </svg>

      <style>{`
        @keyframes waveShift {
          0%   { d: path("M0,24 C200,0 400,48 600,24 C800,0 1000,48 1200,24 L1200,48 L0,48 Z"); }
          100% { d: path("M0,24 C200,48 400,0 600,24 C800,48 1000,0 1200,24 L1200,48 L0,48 Z"); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-path { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
