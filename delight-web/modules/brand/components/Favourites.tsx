import Image from "next/image";
import type { Venue } from "@/lib/content/types";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

/** "Our favourites." — a brand's signature products as three photographs, each named with one line under it. */
export function Favourites({ brand, items }: { brand: string; items: NonNullable<Venue["favourites"]> }) {
  return (
    <section id="favourites" className="scroll-mt-[120px] px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[7vh]">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <Eyebrow>{brand}</Eyebrow>
          <h2 className="display mt-3 text-[clamp(2.2rem,4.6vw,3.6rem)]">
            Our <span className="display-italic">favourites.</span>
          </h2>
        </Reveal>
        <Reveal as="ul" stagger className="mt-8 grid gap-6 md:grid-cols-3 lg:mt-[4vh]">
          {items.map((it) => (
            <li key={it.name} className="group">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-wall-warm">
                <Image
                  src={it.image.src}
                  alt={it.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-5 font-display text-[1.6rem] font-semibold leading-tight text-ink">{it.name}</h3>
              <p className="mt-1.5 max-w-[34ch] text-[15px] leading-[1.6] text-muted">{it.line}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
