import Image from "next/image";
import type { ReactNode } from "react";
import { company, eventExperience } from "@/lib/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

/** The venue names, set in green with a gold underline wherever they appear. */
function emphasise(text: string, names: readonly string[]): ReactNode[] {
  const escaped = names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${escaped.join("|")})`, "g")).map((part, i) =>
    names.includes(part) ? (
      <strong key={i} className="font-semibold text-green-ink underline decoration-gold/60 decoration-1 underline-offset-[5px]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

/** "A Complete Event Experience" → ["A Complete", "Event Experience"]. */
function halves(title: string): [string, string] {
  const words = title.split(" ");
  const half = Math.floor(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}

/*
 * The bento. venue-3 (270×187) and venue-5 (342×232) are tiny originals, so
 * they only ever get the small tiles (about 200×150 at most) and stay sharp;
 * the big tiles go to the 1600–1800px photographs. Desktop is six columns:
 *   [ venue-4  4×3 ][ venue-2 2×2 ]
 *   [              ][ v-3 ][ v-5  ]
 *   [ venue-1 2×2 ][ venue-6  4×2  ]
 * Phones: two columns, the large ones full width.
 */
const TILES: { index: number; className: string; sizes: string; framed?: boolean }[] = [
  { index: 3, className: "col-span-2 aspect-[3/2] md:col-span-4 md:row-span-3", sizes: "(min-width: 1280px) 850px, (min-width: 768px) 64vw, 92vw", framed: true },
  { index: 1, className: "aspect-[4/3] md:col-span-2 md:row-span-2", sizes: "(min-width: 1280px) 420px, (min-width: 768px) 32vw, 46vw" },
  { index: 2, className: "aspect-[4/3]", sizes: "(min-width: 1280px) 200px, (min-width: 768px) 16vw, 46vw" },
  { index: 4, className: "aspect-[4/3]", sizes: "(min-width: 1280px) 200px, (min-width: 768px) 16vw, 46vw" },
  { index: 0, className: "aspect-[4/3] md:col-span-2 md:row-span-2", sizes: "(min-width: 1280px) 420px, (min-width: 768px) 32vw, 46vw" },
  { index: 5, className: "col-span-2 aspect-[3/2] md:col-span-4 md:row-span-2", sizes: "(min-width: 1280px) 850px, (min-width: 768px) 64vw, 92vw", framed: true },
];

/**
 * "A Complete Event Experience": the two paragraphs (the three venues picked
 * out), then the venues as a bento gallery with a slow zoom on hover.
 */
export function EventExperience() {
  const [line1, line2] = halves(eventExperience.title);

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div aria-hidden className="wall-sun" />
      <div className="relative z-[4] mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionHead
            eyebrow={company.parent}
            line1={line1}
            line2={line2}
            body={
              <div className="space-y-5">
                {eventExperience.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{emphasise(p, eventExperience.venues)}</p>
                ))}
              </div>
            }
          />
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:mt-20 md:grid-cols-6 md:auto-rows-[clamp(88px,10.5vw,148px)]"
        >
          {TILES.map((tile) => {
            const img = eventExperience.images[tile.index];
            return (
              <figure
                key={img.src}
                className={`zoom relative overflow-hidden rounded-2xl bg-wall-shade shadow-[0_30px_60px_-40px_rgba(1,43,21,0.6)] md:aspect-auto ${
                  tile.framed ? "gold-frame md:rounded-[24px]" : ""
                } ${tile.className}`}
              >
                <Image src={img.src} alt={img.alt} fill sizes={tile.sizes} className="object-cover" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-green-ink/25 via-transparent to-transparent" />
              </figure>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
