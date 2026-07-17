/**
 * AmbientBackground — fixed, full-viewport gradient mesh layer.
 * Rendered behind all content. Makes backdrop-filter: blur() visually meaningful.
 * Very low opacity, GPU-composited (transform only), never animates layout props.
 */
export const AmbientBackground = (): JSX.Element => {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
};
