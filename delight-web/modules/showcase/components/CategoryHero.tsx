"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

export type CategoryOutlet = { href: string; name: string; note: string; image: { src: string; alt: string } };

/**
 * A division's hero, after Apple's category pages: on white, the name and
 * one line side by side, then the division's outlets as three photo cards —
 * the place, its name and a note, a click away. One screen on desktop.
 */
export function CategoryHero({
  kicker,
  title,
  accent,
  body,
  outlets,
}: {
  kicker: string;
  title: string;
  accent: string;
  body: string;
  outlets: CategoryOutlet[];
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-c]", { opacity: 0, y: 24, duration: 1.1, ease: "power3.out", stagger: 0.07, delay: 0.1 });
      gsap.from("[data-c-card]", { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.35 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-wall-lit pb-14 md:pb-20 lg:flex lg:h-screen lg:min-h-[640px] lg:flex-col lg:justify-center lg:pb-[5vh]">
      <div className="mx-auto w-full max-w-[1180px] px-6 pt-[calc(var(--header-h)+var(--ribbon-h)+3.5rem)] md:pt-[calc(var(--header-h)+var(--ribbon-h)+5rem)] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+3vh)]">
        <p data-c className="eyebrow">
          {kicker}
        </p>
        <div className="mt-3 grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <h1 data-c className="display text-[clamp(2.7rem,6vw,5rem)] font-medium tracking-[-0.01em] lg:text-[min(5rem,9.5vh)]">
            {title} <span className="display-italic">{accent}</span>
          </h1>
          <p data-c className="max-w-[34rem] pb-1 text-[17px] leading-[1.55] text-muted md:text-[19px]">
            {body}
          </p>
        </div>

        <ul className="no-scrollbar -mx-6 mt-10 flex snap-x gap-4 overflow-x-auto px-6 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:mt-[5vh]">
          {outlets.map((o) => (
            <li key={o.href} data-c-card className="w-[80%] shrink-0 snap-start sm:w-[46%] md:w-auto">
              <Link href={o.href} className="group block">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[24px] bg-wall-warm shadow-[0_24px_50px_-34px_rgba(18,20,16,0.5)] lg:aspect-auto lg:h-[clamp(180px,calc(100vh-560px),360px)]">
                  <Image src={o.image.src} alt={o.image.alt} fill preload sizes="(min-width: 768px) 380px, 80vw" className="object-cover transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.05]" />
                </span>
                <span className="mt-4 flex items-start justify-between gap-4 px-1">
                  <span className="min-w-0">
                    <span className="block font-display text-[21px] font-semibold tracking-[-0.01em] text-ink">{o.name}</span>
                    <span className="mt-0.5 block truncate text-[14px] text-muted">{o.note}</span>
                  </span>
                  <span className="link-more mt-1 shrink-0 !text-[14px]">Explore</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
