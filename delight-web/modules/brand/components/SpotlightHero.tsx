"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";

type Cta = { label: string; href: string; external?: boolean };

/**
 * The hero for a brand with a portrait photograph (Bombay Kulfi): a clean,
 * two-column stage on warm off-white, lit softly in the brand's own orange —
 * the logo, a badge for what sets the brand apart, the name and its line, two
 * actions and three facts in a tidy row on the left; the photograph standing
 * on the right with its location on a glass chip. One screen on desktop.
 */
export function SpotlightHero({
  eyebrow,
  name,
  tagline,
  body,
  badge,
  logo,
  image,
  location,
  facts = [],
  primary,
  secondary,
}: {
  eyebrow: string;
  name: string;
  tagline?: string;
  body?: string;
  badge?: string;
  logo?: { src: string; width: number; height: number; alt: string } | null;
  image: { src: string; alt: string };
  location?: string;
  facts?: { label: string; value: string }[];
  primary?: Cta;
  secondary?: Cta;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-s]", { opacity: 0, y: 24, duration: 1.1, ease: "power3.out", stagger: 0.07, delay: 0.1 });
      gsap.from("[data-s-photo]", { opacity: 0, y: 40, scale: 0.97, duration: 1.4, ease: "power3.out", delay: 0.3 });
    }, el);
    return () => ctx.revert();
  }, []);

  const button = (cta: Cta, cls: string) => {
    const inner = (
      <>
        {cta.label}
        <Arrow />
      </>
    );
    if (cta.external)
      return (
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    if (!cta.href.startsWith("/"))
      return (
        <a href={cta.href} className={cls}>
          {inner}
        </a>
      );
    return (
      <Link href={cta.href} className={cls}>
        {inner}
      </Link>
    );
  };

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden px-5 pb-14 pt-[calc(var(--header-h)+var(--ribbon-h)+2.5rem)] text-ink sm:px-8 md:pb-20 lg:flex lg:h-screen lg:min-h-[680px] lg:items-center lg:px-12 lg:pb-[5vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+3vh)]"
      style={{
        background:
          "radial-gradient(45% 55% at 85% 45%, rgba(234,88,12,0.07), transparent 70%), linear-gradient(180deg, #f8f6f2, #f1eee8)",
      }}
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          {logo && (
            <Image
              data-s
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="200px"
              preload
              className="h-auto max-h-20 w-auto object-contain [filter:drop-shadow(0_6px_16px_rgba(120,60,10,0.18))] lg:max-h-[min(5.5rem,10vh)]"
            />
          )}

          {badge && (
            <p
              data-s
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-wall-lit py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-ink ring-1 ring-line lg:mt-[3.5vh]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-wall-warm text-gold-deep">
                <Icon name="star" size={13} />
              </span>
              {badge}
            </p>
          )}

          <p data-s className="mt-6 text-[13.5px] font-medium text-muted lg:mt-[3vh]">
            {eyebrow}
          </p>
          <h1 data-s className="display mt-2 text-[clamp(3rem,7vw,6rem)] leading-[0.98] lg:text-[min(6rem,10.5vh)]">
            {name}
          </h1>
          {tagline && (
            <p data-s className="display-italic mt-2 font-display text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium leading-[1.15] tracking-[-0.01em] !text-[#b4440f]">
              {tagline}
            </p>
          )}
          {body && (
            <p data-s className="mt-5 max-w-[36rem] text-[16px] leading-[1.6] text-body md:text-[17px] lg:mt-[2.5vh]">
              {body}
            </p>
          )}

          {(primary || secondary) && (
            <div data-s className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center lg:mt-[4vh]">
              {primary && button(primary, "group btn-onyx shine")}
              {secondary && button(secondary, "group btn-ghost")}
            </div>
          )}

          {facts.length > 0 && (
            <dl data-s className="mt-10 grid max-w-[38rem] grid-cols-1 divide-black/10 border-t border-black/10 sm:grid-cols-3 sm:divide-x lg:mt-[5vh]">
              {facts.slice(0, 3).map((f, i) => (
                <div key={f.label} className={`py-4 sm:py-5 ${i === 0 ? "sm:pr-5" : "sm:px-5"}`}>
                  <dt className="text-[12px] text-muted">{f.label}</dt>
                  <dd className="mt-1 text-[14.5px] font-medium leading-snug text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div data-s-photo className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] shadow-[0_60px_100px_-50px_rgba(120,60,10,0.45)] ring-1 ring-black/5 lg:aspect-auto lg:h-[calc(100vh-var(--header-h)-var(--ribbon-h)-12vh)] lg:max-h-[700px]">
            <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 520px, 90vw" className="object-cover" />
            {location && (
              <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-2 text-[13px] font-medium text-white ring-1 ring-white/15 backdrop-blur-md">
                <Icon name="pin" size={14} className="text-gold-light" />
                {location}
              </p>
            )}
          </div>
          {/* A soft glow under the photograph, in the brand's orange */}
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(234,88,12,0.35),transparent)] blur-2xl" />
        </div>
      </div>
    </section>
  );
}
