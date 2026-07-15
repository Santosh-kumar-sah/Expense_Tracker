interface ScrollProgressProps {
  sections: string[];
  activeSection: number;
  onJump: (index: number) => void;
}

export const ScrollProgress = ({ sections, activeSection, onJump }: ScrollProgressProps): JSX.Element => {
  return (
    <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {sections.map((section, index) => (
        <button
          key={section}
          type="button"
          onClick={() => onJump(index)}
          className={`h-3 w-3 rounded-full border transition ${activeSection === index ? 'scale-110 bg-slate-100 border-emerald-500' : 'border-slate-500 bg-slate-800/30'}`}
          aria-label={`Jump to ${section}`}
        />
      ))}
    </div>
  );
};