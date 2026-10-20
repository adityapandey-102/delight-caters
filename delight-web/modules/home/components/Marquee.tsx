/**
 * The occasions Delight caters for, gliding past between gold hairlines.
 * Pure CSS (.marquee-track): the run is rendered twice and moves half its
 * length, so it loops seamlessly. Alternate words take the gold italic.
 */
export default function Marquee({
  words,
  duration = 52,
  className = "",
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const run = [...words, ...words];

  return (
    <div className={`relative flex overflow-hidden py-7 sm:py-8 ${className}`} aria-hidden="true">
      <div className="gold-hairline absolute inset-x-0 top-0 opacity-70" />
      <div className="gold-hairline absolute inset-x-0 bottom-0 opacity-70" />
      <div className="marquee-track flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12" style={{ ["--dur" as string]: `${duration}s` }}>
        {run.map((w, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10 sm:gap-12">
            <span
              className={`font-display text-[1.7rem] tracking-tight sm:text-[2.1rem] ${
                i % 2 === 0 ? "font-medium text-onyx/85" : "font-medium italic text-gold-deep"
              }`}
            >
              {w}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
