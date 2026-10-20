import Image from "next/image";
import Link from "next/link";

const BRANDS = [
  { name: "Sterling Inn", href: "/hospitality/sterling-inn", logo: { src: "/brand/sterling-inn.png", w: 341, h: 43 } },
  { name: "Sterling Plaza", href: "/hospitality/sterling-plaza", logo: { src: "/brand/sterling-plaza.png", w: 376, h: 46 } },
  { name: "Olive", href: "/hospitality/olive", logo: { src: "/brand/olive.png", w: 217, h: 70 } },
  { name: "Bombay Kulfi", href: "/eatry/bombay-kulfi", logo: { src: "/brand/bombay-kulfi.png", w: 226, h: 129 } },
  { name: "Aero Bites", href: "/eatry/aero-bites", logo: null },
  { name: "Delight Caterers", href: "/eatry/delight-caterers", logo: { src: "/brand/logo-gold.png", w: 1200, h: 634 } },
];

/** The group's six brands as a slow, endless strip of logos on cream seals (pauses on hover). */
export function BrandStrip() {
  const run = [...BRANDS, ...BRANDS];
  return (
    <div className="relative overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="gold-hairline absolute inset-x-0 top-0 opacity-60" />
      <div className="gold-hairline absolute inset-x-0 bottom-0 opacity-60" />
      <ul className="marquee-track flex w-max items-center gap-5 [--dur:48s]">
        {run.map((b, i) => (
          <li key={i} aria-hidden={i >= BRANDS.length}>
            <Link
              href={b.href}
              tabIndex={i >= BRANDS.length ? -1 : undefined}
              aria-label={b.name}
              className="flex h-20 w-48 items-center justify-center rounded-2xl border border-gold/25 bg-wall-lit/80 px-6 shadow-[0_14px_30px_-22px_rgba(18,20,16,0.5)] transition-colors hover:border-gold/60"
            >
              {b.logo ? (
                <Image src={b.logo.src} alt="" width={b.logo.w} height={b.logo.h} sizes="150px" className="max-h-11 w-auto object-contain" />
              ) : (
                <span className="font-display text-[1.5rem] font-semibold tracking-tight text-onyx">{b.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
