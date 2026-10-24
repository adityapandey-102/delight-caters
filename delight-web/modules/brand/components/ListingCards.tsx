import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/motion";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";
import { ImageReveal } from "@/components/ui/ImageReveal";

export type Listing = {
  href: string;
  name: string;
  kind: string;
  location: string;
  image: { src: string; alt: string };
  /** Short facts shown as chips, like a property's beds and baths. */
  specs: string[];
  logo?: { src: string; width: number; height: number } | null;
};

/** Businesses as property listings: photo with the brand's logo chip, name, location, spec chips and a link. */
export function ListingCards({ items }: { items: Listing[] }) {
  return (
    <Reveal as="ul" stagger className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="group block">
            <ImageReveal className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[min(300px,calc(100vh-560px))] rounded-[18px] bg-wall-warm shadow-[0_30px_60px_-40px_rgba(18,20,16,0.6)]">
              <Image
                src={l.image.src}
                alt={l.image.alt}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1100ms] ease-out-expo group-hover:scale-[1.04]"
              />
              {l.logo && (
                <span className="absolute left-3 top-3 flex rounded-[10px] bg-white px-3 py-2 shadow-[0_8px_20px_-10px_rgba(22,24,27,0.45)]">
                  <Image src={l.logo.src} alt="" width={l.logo.width} height={l.logo.height} sizes="110px" className="h-5 w-auto" />
                </span>
              )}
            </ImageReveal>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{l.kind}</p>
                <h3 className="mt-1.5 font-display text-[2.1rem] leading-none tracking-[-0.01em] text-ink">{l.name}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-[13.5px] text-muted">
                  <Icon name="pin" size={14} /> {l.location}
                </p>
              </div>
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink group-hover:bg-wall-warm group-hover:text-ink group-hover:text-white">
                <Arrow />
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
              {l.specs.map((s) => (
                <li key={s} className="rounded-full border border-line bg-wall-lit/80 px-3 py-1 text-[12.5px] font-medium text-body">
                  {s}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </Reveal>
  );
}
