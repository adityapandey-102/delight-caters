import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/motion";

export type TileData = {
  theme: "dark" | "light";
  kicker?: string;
  title: string;
  /** Gold words after the title. */
  accent?: string;
  body: string;
  links: { label: string; href: string; primary?: boolean }[];
  image: { src: string; alt: string };
  /** Logo shown above the title (transparent PNG). */
  logo?: { src: string; width: number; height: number; alt: string } | null;
};

function TileLink({ link, dark }: { link: TileData["links"][number]; dark: boolean }) {
  const cls = link.primary ? (dark ? "btn-gold" : "btn-onyx") + " !py-2 !px-4 !text-[14px]" : `link-more ${dark ? "on-dark" : ""}`;
  return link.href.startsWith("/") ? (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={cls}>
      {link.label}
    </a>
  );
}

/**
 * One Apple-homepage tile: the name, one line and two links centred at the
 * top, the photograph filling the tile behind a fade in the tile's own tone.
 * `size="half"` is the two-up grid version.
 */
export function Tile({ tile, size = "full" }: { tile: TileData; size?: "full" | "half" }) {
  const dark = tile.theme === "dark";
  const full = size === "full";
  return (
    <article
      className={`group relative isolate overflow-hidden ${dark ? "bg-black text-cream" : "bg-wall-lit text-ink"} ${
        full ? "h-[min(92vh,760px)] min-h-[560px]" : "h-[min(118vw,600px)] md:h-[580px]"
      }`}
    >
      <Image
        src={tile.image.src}
        alt={tile.image.alt}
        fill
        sizes={full ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.28,0.11,0.32,1)] group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 -z-10 h-[62%] bg-linear-to-b ${dark ? "from-black/85 via-black/45 to-transparent" : "from-white/95 via-white/65 to-transparent"}`}
      />
      <Reveal y={24} className={`relative mx-auto px-6 text-center ${full ? "max-w-[820px] pt-14 md:pt-16" : "max-w-[520px] pt-11 md:pt-12"}`}>
        {tile.logo ? (
          <Image
            src={tile.logo.src}
            alt={tile.logo.alt}
            width={tile.logo.width}
            height={tile.logo.height}
            sizes="220px"
            className={`mx-auto mb-4 h-auto w-auto object-contain ${full ? "max-h-12 max-w-[220px]" : "max-h-10 max-w-[180px]"} ${
              dark ? "[filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.6))]" : ""
            }`}
          />
        ) : (
          tile.kicker && <p className={`eyebrow justify-center ${dark ? "on-dark" : ""}`}>{tile.kicker}</p>
        )}
        <h2 className={`display mt-1.5 ${dark ? "on-dark" : ""} ${full ? "text-[clamp(2.5rem,5.6vw,3.9rem)]" : "text-[clamp(2.1rem,4vw,2.75rem)]"}`}>
          {tile.title}
          {tile.accent && (
            <>
              {" "}
              <span className="display-italic">{tile.accent}</span>
            </>
          )}
        </h2>
        <p className={`mx-auto mt-3 max-w-[40ch] leading-[1.4] ${full ? "text-[clamp(1.05rem,1.6vw,1.35rem)]" : "text-[17px]"} ${dark ? "text-cream/85" : "text-body"}`}>
          {tile.body}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {tile.links.map((l) => (
            <TileLink key={l.label} link={l} dark={dark} />
          ))}
        </div>
      </Reveal>
    </article>
  );
}

/** Two-up tiles with Apple's 12px gutters. */
export function TileGrid({ tiles }: { tiles: TileData[] }) {
  return (
    <div className="grid gap-3 px-3 md:grid-cols-2">
      {tiles.map((t) => (
        <Tile key={t.title} tile={t} size="half" />
      ))}
    </div>
  );
}
