import type { Reel } from "@/lib/content/site";
import { Reveal } from "@/components/ui/motion";
import { Icon } from "@/components/ui/Icon";
import ReelRow from "@/modules/home/components/ReelRow";
import { FollowTile, PhotoTile, type InstagramAccount } from "./SocialTiles";

const SLOTS = 4;
type Photo = { src: string; alt: string };

/**
 * The "watch" band — a warm off-white strip placed high on the page, right after
 * the offers: the heading on the left, "Follow @handle" on the right, then the
 * auto-playing reels (see ReelRow). The row always holds four tiles: where a
 * brand has fewer reels, the free slots become photographs of the place and,
 * last, a follow card for its Instagram — so a short row never looks empty.
 */
export function ReelsSection({
  eyebrow,
  title,
  reels,
  brand,
  instagram,
  photos = [],
  photoHref,
  id = "watch",
}: {
  eyebrow: string;
  title: readonly [string, string];
  reels: Reel[];
  brand?: string;
  instagram?: InstagramAccount;
  /** Photographs for free slots (and the follow card's thumbnails). */
  photos?: Photo[];
  /** Where a photo tile leads when there's no Instagram (e.g. "#gallery"). */
  photoHref?: string;
  id?: string;
}) {
  const free = Math.max(0, SLOTS - reels.length);
  const follow = free > 0 && instagram && brand;
  const photoSlots = free - (follow ? 1 : 0);
  // Photos not used as reel posters, so the fillers show something new.
  const fresh = photos.filter((p) => !reels.some((r) => r.poster === p.src));
  const extras = [
    ...fresh.slice(0, photoSlots).map((p) => (
      <PhotoTile
        key={p.src}
        photo={p}
        href={instagram?.href ?? photoHref ?? "#gallery"}
        external={Boolean(instagram)}
        label={instagram ? "More on Instagram" : "See the gallery"}
      />
    )),
    ...(follow ? [<FollowTile key="follow" account={instagram} brand={brand} photos={fresh.slice(photoSlots, photoSlots + 3)} />] : []),
  ];
  if (!reels.length && !extras.length) return null;

  return (
    <section
      id={id}
      className="relative isolate scroll-mt-[120px] overflow-hidden bg-wall-cream px-5 py-16 text-ink sm:px-8 md:py-24 lg:px-12 lg:py-[5vh] lg:[--reel-h:min(483px,calc(100vh-300px))]"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(216,180,111,0.22),transparent_70%),radial-gradient(50%_50%_at_100%_100%,rgba(216,180,111,0.12),transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-[1280px]">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display mt-2 text-[clamp(2.1rem,4.6vw,3.6rem)]">
              {title[0]} <span className="display-italic">{title[1]}</span>
            </h2>
          </div>
          {instagram && (
            <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start !py-2.5 sm:self-auto">
              <Icon name="instagram" size={16} />@{instagram.handle}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </Reveal>
        <Reveal className="mt-10 md:mt-12 lg:mt-[3.5vh]">
          <ReelRow reels={reels} extras={extras} />
        </Reveal>
      </div>
    </section>
  );
}
