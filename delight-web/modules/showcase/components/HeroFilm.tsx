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
 * to full bleed as you scroll into it, with the group's
 * motto set large across its centre, rising in as the photograph opens.
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
  motto,
  promises = [],
}: {
  /** A quiet line above the headline (what the group does, catering first). */
  kicker?: string;
  /** Headline as three parts: lead, the gold accent word(s), and the rest. */
  title: string;
  accent: string;
  rest: string;
  body: string;
  primary: Action;
  secondary: Action;
  image: { src: string; alt: string };
  /** The motto set on the photograph, signed by whoever it belongs to. */
  motto?: { line: string; by: string };
  /** The house's promises, set like the fine print on a menu card under the buttons. */
  promises?: string[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el) return;
    const frame = el.querySelector<HTMLElement>("[data-frame]");
    const photo = el.querySelector<HTMLElement>("[data-photo]");
    const copy = el.querySelectorAll<HTMLElement>("[data-copy]");
    const sign = el.querySelectorAll<HTMLElement>("[data-motto]");
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
      if (sign.length) {
        gsap.from(sign, { opacity: 0, y: 36, duration: 1.2, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: frame, start: "top 45%" } });
      }
      gsap.fromTo(photo, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="texture-plaster relative overflow-hidden bg-wall  text-ink">
      {/* Screen one: the words (on desktop the spacing follows the screen height, so it always fits) */}
      <section
        className="relative isolate px-6 pb-14 pt-[calc(var(--header-h)+var(--ribbon-h)+3rem)] text-center md:pb-20 md:pt-[calc(var(--header-h)+var(--ribbon-h)+4.5rem)] lg:pb-[5vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+4.5vh)]"
      >
        <div className="mx-auto max-w-[960px]">
          {kicker && (
            <p data-copy className="mx-auto flex max-w-max items-center gap-4 text-[12.5px] font-medium tracking-[0.14em] text-gold-deep md:text-[13px]">
              <span aria-hidden className="h-px w-10 bg-linear-to-r from-transparent to-gold/70" />
              {kicker}
              <span aria-hidden className="h-px w-10 bg-linear-to-l from-transparent to-gold/70" />
            </p>
          )}

          <h1 data-copy className="display mt-6 text-[clamp(3.3rem,8.6vw,7.4rem)] leading-[0.96] lg:mt-[3vh] lg:text-[min(7.2rem,11.5vh)]">
            {title} <span className="display-italic gold-accent pr-[0.06em]">{accent}</span>
            {rest && (
              <>
                <br /> {rest}
              </>
            )}
          </h1>

          <p data-copy className="mx-auto mt-6 max-w-[36rem] text-balance text-[17px] leading-[1.6] text-body md:text-[19px] lg:mt-[2.5vh]">
            {body}
          </p>

          <div data-copy className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 lg:mt-[3.5vh]">
            <a href={primary.href} className="btn-onyx btn-goldleaf shine !px-7">
              {primary.label}
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="-mr-1">
                <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link href={secondary.href} className="link-more">
              {secondary.label}
            </Link>
          </div>

          {/* The house's promises, like the fine print on a menu card, each marked with the gold leaf */}
          {promises.length > 0 && (
            <div data-copy className="mt-12 lg:mt-[5vh]">
              <span aria-hidden className="mx-auto block h-px w-48 bg-linear-to-r from-transparent via-gold/55 to-transparent" />
              <ul className="mx-auto mt-7 flex max-w-[60rem] flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 lg:mt-[3vh]">
                {promises.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 font-display text-[1.2rem] italic leading-tight text-ink/85 md:text-[1.35rem]">
                    <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="16px" className="h-4 w-auto shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Screen two: the photograph, opening to full bleed — one screen tall on desktop */}
      <section aria-label={image.alt} data-frame className="relative h-[min(78vh,820px)] min-h-[420px] overflow-hidden will-change-[clip-path] lg:h-[calc(100vh-var(--header-h))]">
        <div data-photo className="absolute inset-0 will-change-transform">
          <Image src={image.src} alt={image.alt} fill preload sizes="100vw" quality={85} className="object-cover brightness-[1.12] saturate-[1.05]" />
        </div>
        {motto && (
          <>
            <div aria-hidden className="absolute inset-0 bg-black/25" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_48%,rgba(0,0,0,0.45),transparent)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-[4vh] text-center">
              <Image data-motto src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="64px" className="h-12 w-auto md:h-16" />
              <p data-motto className="display-italic mt-5 max-w-[12ch] text-[clamp(3.4rem,10vw,9rem)] leading-[0.95] text-cream md:mt-7">
                {motto.line}
              </p>
              <p data-motto className="mt-6 flex items-center gap-4 text-[14px] font-medium tracking-[0.12em] text-cream/85 md:mt-8 md:text-[15px]">
                <span aria-hidden className="h-px w-12 bg-linear-to-r from-transparent to-cream/60" />
                {motto.by}
                <span aria-hidden className="h-px w-12 bg-linear-to-l from-transparent to-cream/60" />
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
