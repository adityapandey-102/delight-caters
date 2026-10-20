"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

type Action = { label: string; href: string };

/**
 * The opening film (after Apple's product heroes) on a clean white stage: the
 * name and a short line centred under the nav and its marketing ribbon, two
 * pills — then a photograph that starts inset with rounded corners and opens
 * to full bleed as you scroll into it.
 */
export function HeroFilm({
  kicker,
  title,
  accent,
  rest,
  body,
  primary,
  secondary,
  image,
  caption,
  facts = [],
}: {
  kicker: string;
  /** Headline as three parts: lead, the gold accent word(s), and the rest. */
  title: string;
  accent: string;
  rest: string;
  body: string;
  primary: Action;
  secondary: Action;
  image: { src: string; alt: string };
  caption?: string;
  /** A few short proof points under the buttons. */
  facts?: { value: string; label: string }[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el) return;
    const frame = el.querySelector<HTMLElement>("[data-frame]");
    const photo = el.querySelector<HTMLElement>("[data-photo]");
    const copy = el.querySelectorAll<HTMLElement>("[data-copy]");
    if (!frame || !photo) return;
    if (prefersReducedMotion()) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      gsap.from(copy, { opacity: 0, y: 28, duration: 1.2, ease: "power3.out", stagger: 0.09, delay: 0.25 });
      gsap.from(frame, { opacity: 0, y: 60, duration: 1.4, ease: "power3.out", delay: 0.5 });
      gsap.fromTo(
        frame,
        { clipPath: `inset(0% ${mobile ? 4 : 10}% 0% ${mobile ? 4 : 10}% round ${mobile ? 22 : 36}px)` },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top 85%", end: "top 8%", scrub: 0.6 },
        },
      );
      gsap.fromTo(photo, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative overflow-hidden bg-wall-lit text-ink">
      {/* Screen one: the words (on desktop the spacing follows the screen height, so it always fits) */}
      <section className="mx-auto max-w-[920px] px-6 pb-14 pt-[calc(var(--header-h)+var(--ribbon-h)+3rem)] text-center md:pb-20 md:pt-[calc(var(--header-h)+var(--ribbon-h)+4.5rem)] lg:pb-[7vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+6vh)]">
        {/* The house badge: the Zyra mark in a small ink disc, then the name */}
        <p data-copy className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.07] bg-white py-1 pl-1 pr-4 text-[13px] text-body shadow-[0_6px_20px_-12px_rgba(18,20,16,0.35)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-onyx">
            <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="16px" className="h-4 w-auto" />
          </span>
          <span className="font-medium text-ink">{kicker}</span>
          <span aria-hidden className="h-3 w-px bg-black/15" />
          <span>Bengaluru</span>
        </p>

        <h1 data-copy className="display mt-8 text-[clamp(2.7rem,6.6vw,5.4rem)] font-medium lg:mt-[4vh] lg:text-[min(5.4rem,10.5vh)] leading-[1.02] tracking-[-0.04em]">
          {title} <span className="display-italic gold-shimmer">{accent}</span>
          <br /> {rest}
        </h1>

        <p data-copy className="mx-auto mt-6 max-w-[34rem] text-balance lg:mt-[3vh] text-[17px] leading-[1.55] text-muted md:text-[19px]">
          {body}
        </p>

        <div data-copy className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 lg:mt-[4vh]">
          <a href={primary.href} className="btn-onyx shine !px-6">
            {primary.label}
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="-mr-1">
              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <Link href={secondary.href} className="link-more">
            {secondary.label}
          </Link>
        </div>

        {/* Quiet proof, under a hairline */}
        <ul data-copy className="mx-auto mt-12 flex max-w-[40rem] lg:mt-[5vh] lg:pt-[2.5vh] flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-black/[0.07] pt-6 text-[13px] text-muted">
          {facts.map((f, i) => (
            <li key={f.label} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden className="hidden h-1 w-1 rounded-full bg-gold/60 sm:block" />}
              <span>
                <span className="font-semibold text-ink">{f.value}</span> {f.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Screen two: the photograph, opening to full bleed — one screen tall on desktop */}
      <section aria-label={image.alt} data-frame className="relative h-[min(78vh,820px)] min-h-[420px] overflow-hidden will-change-[clip-path] lg:h-[calc(100vh-var(--header-h))]">
        <div data-photo className="absolute inset-0 will-change-transform">
          <Image src={image.src} alt={image.alt} fill preload sizes="100vw" quality={85} className="object-cover brightness-[1.12] saturate-[1.05]" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
        {caption && (
          <p className="absolute bottom-6 left-1/2 w-full max-w-[1080px] -translate-x-1/2 px-6 text-[13px] text-white/75 md:bottom-9">{caption}</p>
        )}
      </section>
    </div>
  );
}
