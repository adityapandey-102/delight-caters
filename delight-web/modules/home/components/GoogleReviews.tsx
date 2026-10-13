import { googleReviews } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import { NEW_TAB } from "./text";

const UI = {
  eyebrow: "Google Reviews",
  title: { roman: "Words from", italic: "our guests" },
  panel: "Google Reviews",
  preview: "Preview — genuine Google reviews will appear here",
  seeAll: "See all reviews on Google",
  count: (n: number) => `${n.toLocaleString("en-IN")} reviews`,
  rated: (r: number) => `Rated ${r} out of 5 on Google`,
};

/** Google's four-colour "G". */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

const STAR = "M12 2.5l2.9 6.06 6.6.9-4.8 4.6 1.2 6.56L12 17.5l-5.9 3.12 1.2-6.56-4.8-4.6 6.6-.9L12 2.5Z";

/** Five gold stars; with `rating`, the gold is clipped to the score over a faint row. */
function Stars({
  rating,
  size = 16,
  gold = "var(--color-gold)",
  track = "rgba(231,199,97,0.25)",
}: {
  rating?: number;
  size?: number;
  gold?: string;
  track?: string;
}) {
  const row = (fill: string) => (
    <span className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill={fill} aria-hidden>
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );

  if (rating === undefined) return <span aria-hidden>{row(gold)}</span>;

  return (
    <span role="img" aria-label={UI.rated(rating)} className="relative inline-flex">
      {row(track)}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(Math.min(5, Math.max(0, rating)) / 5) * 100}%` }}>
        {row(gold)}
      </span>
    </span>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

/**
 * Google reviews on a green velvet band: the heading beside a summary panel
 * (the G mark, stars, the rating and count once they're filled in, and a link
 * to the profile), then the review cards — three columns on desktop, a
 * scroll-snap row on phones. While the content is a placeholder the panel
 * says so; nothing here invents a rating or a word of review.
 */
export default function GoogleReviews() {
  const { rating, count, isPlaceholder, profileUrl, reviews } = googleReviews;

  return (
    <section className="green-velvet overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div aria-hidden className="grain" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:gap-16">
          <Reveal>
            <Eyebrow onDark>{UI.eyebrow}</Eyebrow>
            <h2 className="display on-dark mt-6 text-[clamp(2.4rem,5.6vw,4.4rem)]">
              <span className="block">{UI.title.roman}</span>
              <span className="display-italic block">{UI.title.italic}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="max-w-lg lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl border border-gold-light/25 bg-green-ink/45 p-7 backdrop-blur-sm sm:p-8">
              <div aria-hidden className="gold-hairline absolute inset-x-0 top-0" />
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
                  <GoogleG className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[15px] font-medium text-cream">{UI.panel}</p>
                  {count !== null && <p className="mt-0.5 text-[13px] text-cream-muted">{UI.count(count)}</p>}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                {rating !== null && (
                  <span className="gold-text font-display text-[3.4rem] font-semibold leading-none lining-nums">{rating.toFixed(1)}</span>
                )}
                <Stars rating={rating ?? undefined} size={20} gold="var(--color-gold-light)" />
              </div>

              {isPlaceholder && (
                <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-dashed border-gold-light/40 px-4 py-2.5 text-[12.5px] leading-snug text-gold-pale">
                  <span aria-hidden className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" />
                  {UI.preview}
                </p>
              )}

              <div>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark group mt-7">
                  {UI.seeAll}
                  <span className="sr-only">{NEW_TAB}</span>
                  <Arrow />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {reviews.length > 0 && (
          <div data-lenis-prevent-horizontal className="mt-14 md:mt-16">
            <Reveal
              as="ul"
              stagger
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-4 sm:-mx-8 sm:gap-5 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {reviews.map((r, i) => (
                <li key={`${i}-${r.name}`} className="w-[84vw] max-w-[380px] shrink-0 snap-start sm:w-[58vw] md:w-[44vw] lg:w-auto lg:max-w-none">
                  <figure className="flex h-full flex-col rounded-2xl bg-wall-lit p-7 text-ink shadow-[0_34px_60px_-36px_rgba(0,0,0,0.7)] sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <Stars size={15} />
                      <GoogleG className="h-5 w-5" />
                    </div>
                    <blockquote className="mt-6 flex-1 font-display text-[1.2rem] font-medium leading-[1.55] text-ink">{r.text}</blockquote>
                    <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green font-display text-[1.05rem] font-semibold tracking-wide text-gold-light"
                      >
                        {initials(r.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[14.5px] font-semibold text-ink">{r.name}</span>
                        <span className="block text-[12.5px] text-muted">{r.meta}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
