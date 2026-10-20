import Image from "next/image";
import Link from "next/link";
import { asHighlights, type Offer } from "@/lib/content/offers";
import { Reveal } from "@/components/ui/motion";
import { Highlights } from "./Highlights";

/**
 * The marketing section for a category or an outlet: its offers, events and
 * collaborations (from lib/content/offers). Three or more run as the
 * Highlights carousel; one or two sit side by side as large cards.
 */
export function OffersSection({ title, eyebrow, items, id = "offers" }: { title: string; eyebrow?: string; items: Offer[]; id?: string }) {
  if (!items.length) return null;
  if (items.length >= 3)
    return (
      <div id={id} className="scroll-mt-[120px]">
        <Highlights title={title} items={asHighlights(items)} />
      </div>
    );

  return (
    <section id={id} className="scroll-mt-[120px] bg-wall px-3 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1080px] px-3">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display mt-2 text-[clamp(2.2rem,5vw,3.5rem)]">{title}</h2>
      </div>
      <Reveal stagger className={`mx-auto mt-10 grid w-full max-w-[1080px] gap-4 md:mt-12 ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
        {items.map((o) => (
          <article key={o.id} className="group relative isolate aspect-[4/5] overflow-hidden rounded-[28px] bg-black sm:aspect-[16/11]">
            <Image
              src={o.image.src}
              alt={o.image.alt}
              fill
              sizes="(min-width: 768px) 540px, 100vw"
              className="-z-20 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.28,0.11,0.32,1)] group-hover:scale-[1.04]"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/15 to-black/55" />
            <div className="p-7 md:p-9">
              <p className="text-[13px] font-semibold text-gold-light">
                {o.kind} · {o.dates}
              </p>
              <h3 className="mt-2 max-w-[18ch] font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">{o.title}</h3>
              <p className="mt-3 max-w-[38ch] text-[15.5px] leading-[1.45] text-white/80">{o.summary}</p>
            </div>
            <div className="absolute bottom-7 left-7 md:bottom-9 md:left-9">
              {o.cta.href.startsWith("/") ? (
                <Link href={o.cta.href} className="btn-gold shine !px-4 !py-2 !text-[14px]">
                  {o.cta.label}
                </Link>
              ) : (
                <a href={o.cta.href} className="btn-gold shine !px-4 !py-2 !text-[14px]">
                  {o.cta.label}
                </a>
              )}
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
