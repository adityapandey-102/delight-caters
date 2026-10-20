"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

type Photo = { src: string; alt: string };

/**
 * The About page's hero, set like the opening of a magazine feature: a large
 * left-aligned statement, the story in two short columns under a hairline,
 * then three photographs of different sizes that drift at different speeds.
 * On desktop it is one screen: the words on the left, the photographs as a
 * collage on the right.
 */
export function EditorialHero({
  kicker,
  title,
  accent,
  lead,
  aside,
  primary,
  secondary,
  photos,
}: {
  kicker: string;
  title: string;
  accent: string;
  lead: string;
  aside: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  photos: [Photo, Photo, Photo];
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-e]", { opacity: 0, y: 28, duration: 1.15, ease: "power3.out", stagger: 0.08, delay: 0.1 });
      // The drift belongs to the stacked layout; the desktop collage holds still inside its screen.
      gsap.matchMedia().add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-e-drift]").forEach((p) => {
          gsap.fromTo(p, { y: Number(p.dataset.eDrift) }, { y: -Number(p.dataset.eDrift), ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: 0.6 } });
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden bg-wall-lit pb-16 md:pb-24 lg:pb-0">
      <div className="lg:mx-auto lg:grid lg:h-screen lg:min-h-[640px] lg:max-w-[1320px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:px-6 lg:pb-[4vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+2vh)]">
      <div className="mx-auto w-full max-w-[1180px] px-6 pt-[calc(var(--header-h)+var(--ribbon-h)+3.5rem)] md:pt-[calc(var(--header-h)+var(--ribbon-h)+5.5rem)] lg:max-w-none lg:px-0 lg:pt-0">
        <p data-e className="eyebrow">
          {kicker}
        </p>
        <h1 data-e className="display mt-4 max-w-[13ch] text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] tracking-[-0.045em] lg:text-[min(6rem,9.5vh,5.4vw)]">
          {title} <span className="display-italic">{accent}</span>
        </h1>

        <div data-e className="mt-12 grid gap-8 border-t border-black/[0.08] pt-8 md:grid-cols-2 md:gap-14 lg:mt-[4vh] lg:grid-cols-1 lg:gap-[2.5vh] lg:pt-[3vh]">
          <p className="text-[19px] leading-[1.55] text-ink md:text-[21px] lg:text-[min(21px,2.5vh)]">{lead}</p>
          <div>
            <p className="text-[16px] leading-[1.65] text-muted md:text-[17px]">{aside}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 lg:mt-[3vh]">
              <a href={primary.href} className="btn-onyx">
                {primary.label}
              </a>
              <Link href={secondary.href} className="link-more">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-[1320px] grid-cols-12 items-start gap-3 px-3 md:mt-20 lg:mt-0 lg:h-[calc(100vh-var(--header-h)-var(--ribbon-h)-8vh)] lg:min-h-[480px] lg:grid-cols-2 lg:grid-rows-[1.15fr_1fr] lg:items-stretch lg:px-0">
        <div data-e-drift="20" className="relative col-span-12 aspect-[16/10] overflow-hidden rounded-[26px] md:col-span-7 lg:col-span-2 lg:aspect-auto">
          <Image src={photos[0].src} alt={photos[0].alt} fill preload sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
        </div>
        <div data-e-drift="50" className="relative col-span-7 aspect-[4/5] overflow-hidden rounded-[26px] md:col-span-3 md:mt-24 lg:col-span-1 lg:mt-0 lg:aspect-auto">
          <Image src={photos[1].src} alt={photos[1].alt} fill sizes="(min-width: 768px) 25vw, 58vw" className="object-cover" />
        </div>
        <div data-e-drift="80" className="relative col-span-5 aspect-[3/4] overflow-hidden rounded-[26px] md:col-span-2 md:mt-8 lg:col-span-1 lg:mt-0 lg:aspect-auto">
          <Image src={photos[2].src} alt={photos[2].alt} fill sizes="(min-width: 768px) 17vw, 42vw" className="object-cover" />
        </div>
      </div>
      </div>
    </section>
  );
}
