import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";

export type InstagramAccount = { handle: string; href: string };
type Photo = { src: string; alt: string };

/** "@sterling_inn" from https://www.instagram.com/sterling_inn/ */
export const instagramAccount = (href?: string): InstagramAccount | undefined => {
  const handle = href?.match(/instagram\.com\/([^/?#]+)/)?.[1];
  return href && handle ? { handle, href } : undefined;
};

const TILE = "relative block aspect-[10/16] overflow-hidden rounded-2xl";

/**
 * Fills an empty reel slot: a follow card for the brand's Instagram — the
 * handle, a line on what they post, three small photographs and the button.
 */
export function FollowTile({ account, brand, photos }: { account: InstagramAccount; brand: string; photos: Photo[] }) {
  return (
    <a
      href={account.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow ${brand} on Instagram (opens in a new tab)`}
      className={`${TILE} group flex flex-col justify-between bg-wall-cream p-6 text-ink ring-1 ring-line transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 hover:ring-gold-light/60`}
    >
      <div>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-wall-warm text-gold-deep ring-1 ring-line">
          <Icon name="instagram" size={22} />
        </span>
        <p className="mt-6 text-[13px] font-semibold text-gold-deep">On Instagram</p>
        <p className="mt-1 break-words font-display text-[clamp(1.4rem,2vw,1.75rem)] font-semibold leading-tight tracking-[-0.01em]">@{account.handle}</p>
        <p className="mt-3 text-[14px] leading-[1.5] text-muted">Reels, offers and the stories behind {brand} — first on Instagram.</p>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {photos.slice(0, 3).map((p) => (
            <span key={p.src} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={p.src} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </span>
          ))}
        </div>
      )}

      <span className="btn-gold shine w-full !py-2.5 !text-[14px]">
        Follow us
        <Arrow />
      </span>
    </a>
  );
}

/** Fills an empty reel slot with a photograph of the place, linking on to more. */
export function PhotoTile({ photo, href, label, external }: { photo: Photo; href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${TILE} group bg-wall-warm ring-1 ring-gold-light/15 transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 hover:ring-gold-light/50`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 300px, 72vw" className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      {external && (
        <span aria-hidden className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/25 backdrop-blur-sm">
          <Icon name="instagram" size={16} />
        </span>
      )}
      <span className="absolute inset-x-5 bottom-6 text-center">
        <span className="block text-[15px] font-medium leading-snug text-white">{photo.alt}</span>
        <span className="link-more on-dark mt-1.5 justify-center !text-[13px]">{label}</span>
      </span>
    </a>
  );
}
