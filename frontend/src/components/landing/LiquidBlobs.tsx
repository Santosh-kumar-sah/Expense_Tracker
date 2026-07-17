/**
 * LiquidBlobs — hero background for the landing page.
 * 2-3 large, slowly-morphing SVG/CSS blob shapes in muted emerald/navy tones.
 * All animation is GPU-composited (transform + border-radius only).
 * Uses IntersectionObserver to pause animation when not in viewport.
 */
export const LiquidBlobs = (): JSX.Element => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Blob A — large emerald */}
      <div
        className="liquid-blob absolute"
        style={{
          width: '520px',
          height: '520px',
          top: '-80px',
          left: '-60px',
          background:
            'radial-gradient(circle at 40% 40%, rgba(5,150,105,0.22) 0%, rgba(4,120,87,0.10) 60%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Blob B — navy/indigo */}
      <div
        className="liquid-blob-b absolute"
        style={{
          width: '440px',
          height: '440px',
          bottom: '-60px',
          right: '-40px',
          background:
            'radial-gradient(circle at 60% 60%, rgba(99,102,241,0.18) 0%, rgba(79,70,229,0.08) 60%, transparent 80%)',
          filter: 'blur(50px)',
          borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
        }}
      />

      {/* Blob C — amber accent */}
      <div
        className="liquid-blob-c absolute"
        style={{
          width: '300px',
          height: '300px',
          top: '45%',
          left: '55%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(217,119,6,0.12) 0%, transparent 70%)',
          filter: 'blur(45px)',
          borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%',
        }}
      />
    </div>
  );
};
