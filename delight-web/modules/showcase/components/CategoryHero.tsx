"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

export type CategoryOutlet = { href: string; name: string; note: string; image: { src: string; alt: string } };

/**
 * A division's hero, after Apple's category pages: on white, the name and
 * one line side by side, then a row of the division's outlets — a thumbnail,
 * the name and a note each, a click away — and a wide photograph that rises
 * and settles as you scroll.
 */
export function CategoryHero({
  kicker,
  title,
  accent,
  body,
  outlets,
  image,
}: {
  kicker: string;
  title: string;
  accent: string;
  body: string;
  outlets: CategoryOutlet[];
  image: { src: string; alt: string };
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-c]", { opacity: 0, y: 24, duration: 1.1, ease: "power3.out", stagger: 0.07, delay: 0.1 });
      gsap.from("[data-c-card]", { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.35 });
      gsap.fromTo("[data-c-photo]", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-c-frame]", start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-wall-lit pb-3">
      <div className="mx-auto w-full max-w-[1180px] px-6 pt-[calc(var(--header-h)+var(--ribbon-h)+3.5rem)] md:pt-[calc(var(--header-h)+var(--ribbon-h)+5rem)]">
        <p data-c className="eyebrow">
          {kicker}
        </p>
        <div className="mt-3 grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <h1 data-c className="display text-[clamp(2.7rem,6vw,5rem)] font-medium tracking-[-0.04em]">
            {title} <span className="display-italic">{accent}</span>
          </h1>
          <p data-c className="max-w-[34rem] pb-1 text-[17px] leading-[1.55] text-muted md:text-[19px]">
            {body}
          </p>
        </div>

        <ul className="no-scrollbar -mx-6 mt-10 flex snap-x gap-3 overflow-x-auto px-6 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {outlets.map((o) => (
            <li key={o.href} data-c-card className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
              <Link
                href={o.href}
                className="group flex items-center gap-4 rounded-[22px] border border-black/[0.06] bg-wall p-2.5 pr-5 transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(18,20,16,0.35)]"
              >
                <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[16px]">
                  <Image src={o.image.src} alt="" fill sizes="72px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">{o.name}</span>
                  <span className="mt-0.5 block truncate text-[13px] text-muted">{o.note}</span>
                </span>
                <span aria-hidden className="text-[20px] text-gold-deep transition-transform duration-300 group-hover:translate-x-1">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div data-c-frame className="mt-12 px-3 md:mt-16">
        <div className="relative h-[min(62vh,640px)] min-h-[300px] overflow-hidden rounded-[28px]">
          <div data-c-photo className="absolute inset-0">
            <Image src={image.src} alt={image.alt} fill preload sizes="100vw" quality={85} className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
