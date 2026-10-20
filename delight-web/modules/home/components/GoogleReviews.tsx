import { googleReviews } from "@/lib/content/site";
import type { ReviewSet } from "@/lib/content/reviews";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import { NEW_TAB } from "./text";

const UI = {
  panel: "Google Reviews",
  preview: "Sample reviews — live Google reviews coming soon",
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
 * Google reviews, kept compact on a green velvet band: the heading and a
 * small summary (G mark, stars, the rating and count once filled in, the
 * profile link) on the left; the review cards glide past on the right and
 * pause under the pointer. While the content is a placeholder the summary
 * says so; nothing here invents a rating or a word of review.
 */
const defaultData: ReviewSet = {
  rating: googleReviews.rating,
  count: googleReviews.count,
  profileUrl: googleReviews.profileUrl,
  isSample: googleReviews.isPlaceholder,
  items: googleReviews.reviews,
};

export default function GoogleReviews({
  data = defaultData,
  title = ["Words from", "our guests"],
  eyebrow = "Google Reviews",
}: {
  data?: ReviewSet;
  title?: readonly [string, string];
  eyebrow?: string;
}) {
  const { rating, count, isSample, profileUrl, items: reviews } = data;
  const run = [...reviews, ...reviews];

  return (
    <section className="onyx-velvet overflow-hidden px-5 py-16 sm:px-8 md:py-20 lg:px-12">
      <div aria-hidden className="grain" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-12">
        <Reveal>
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h2 className="display on-dark mt-4 text-[clamp(2rem,4vw,3rem)]">
            <span className="block">{title[0]}</span>
            <span className="display-italic block">{title[1]}</span>
          </h2>

          <div className="mt-6 flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
              <GoogleG className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                {rating !== null && (
                  <span className="gold-text font-display text-[1.9rem] font-semibold leading-none lining-nums">{rating.toFixed(1)}</span>
                )}
                <Stars rating={rating ?? undefined} size={16} gold="var(--color-gold-light)" />
              </div>
              <p className="mt-1 text-[12.5px] text-cream-muted">{count !== null ? UI.count(count) : UI.panel}</p>
            </div>
          </div>

          {isSample &&<p className="mt-4 text-[12px] italic leading-snug text-gold-pale/80">{UI.preview}</p>}

          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark group mt-6 !px-5 !py-2.5 !text-[12.5px]">
            {UI.seeAll}
            <span className="sr-only">{NEW_TAB}</span>
            <Arrow />
          </a>
        </Reveal>

        {reviews.length > 0 && (
          <Reveal className="relative -mx-5 overflow-hidden sm:-mx-8 lg:mx-0 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            {/* Two copies glide by half their length, so the loop is seamless; the copy is hidden from screen readers. */}
            <ul className="marquee-track flex w-max gap-4 py-3 [--dur:60s] sm:gap-5" aria-label={eyebrow}>
              {run.map((r, i) => (
                <li key={i} aria-hidden={i >= reviews.length} className="w-[272px] shrink-0 sm:w-[300px]">
                  <figure className="flex h-full flex-col rounded-2xl bg-wall-lit p-5 text-ink shadow-[0_24px_44px_-30px_rgba(0,0,0,0.7)]">
                    <div className="flex items-center justify-between gap-4">
                      <Stars size={13} />
                      <GoogleG className="h-4 w-4" />
                    </div>
                    <blockquote className="mt-3.5 line-clamp-4 flex-1 text-[14px] leading-[1.6] text-body">{r.text}</blockquote>
                    <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-onyx font-display text-[0.95rem] font-semibold text-gold-light"
                      >
                        {initials(r.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13.5px] font-semibold text-ink">{r.name}</span>
                        <span className="block text-[11.5px] text-muted">{r.meta}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
