import Image from "next/image";
import Link from "next/link";
import type { Offer } from "@/lib/content/offers";
import { Reveal } from "@/components/ui/motion";

/**
 * The Offers page opens like a shop window: on white, the promise and the
 * ways in (jump links) on the left, and on the right this month's lead offer
 * as a large card — one screen on desktop.
 */
export function OffersHero({ featured, jumps }: { featured: Offer; jumps: { label: string; href: string }[] }) {
  const cta = featured.cta;
  return (
    <section className="bg-wall-lit px-6 pb-14 pt-[calc(var(--header-h)+var(--ribbon-h)+3rem)] md:pb-20 lg:flex lg:h-screen lg:min-h-[640px] lg:items-center lg:pb-[5vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+3vh)]">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <Reveal>
          <p className="eyebrow">Offers & events</p>
          <h1 className="display mt-4 text-[clamp(2.8rem,6.4vw,5.6rem)] font-medium leading-[1] tracking-[-0.045em] lg:text-[min(5.6rem,10vh)]">
            What&rsquo;s on <span className="display-italic">at Zyra.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.55] text-muted md:text-[19px]">
            Every offer, event and collaboration across our hotels, restaurants and kitchens — plus the reels and posts behind them, in one place.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {jumps.map((j) => (
              <li key={j.href}>
                <a
                  href={j.href}
                  className="inline-flex items-center rounded-full border border-black/[0.08] bg-wall px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="group relative isolate aspect-[4/5] overflow-hidden rounded-[30px] bg-black shadow-[0_40px_80px_-40px_rgba(18,20,16,0.55)] lg:aspect-auto lg:h-[calc(100vh-var(--header-h)-var(--ribbon-h)-12vh)] lg:max-h-[700px]">
            <Image src={featured.image.src} alt={featured.image.alt} fill preload sizes="(min-width: 1024px) 560px, 100vw" className="-z-20 object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.04]" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/25 to-black/20" />
            <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-ink backdrop-blur-sm md:left-8 md:top-8">This month</span>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[13px] font-semibold text-gold-light">
                {featured.kind} · {featured.brand} · {featured.dates}
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">{featured.title}</h2>
              <p className="mt-3 max-w-[34ch] text-[15.5px] leading-[1.5] text-white/80">{featured.summary}</p>
              {cta.href.startsWith("/") ? (
                <Link href={cta.href} className="btn-gold shine mt-6">
                  {cta.label}
                </Link>
              ) : (
                <a href={cta.href} className="btn-gold shine mt-6">
                  {cta.label}
                </a>
              )}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
