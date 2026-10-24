"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";

type Cta = { label: string; href: string; external?: boolean };

/**
 * The outlet hero — the way the great hotel sites open: the photograph fills
 * the screen, and the brand sits low and to the left (logo, name, its line,
 * where it is, two actions). The plate eases in from a zoom and pushes in as you scroll.
 * (Portrait photographs use SpotlightHero instead.)
 */
export function BrandHero({
  eyebrow,
  lines,
  tagline,
  body,
  image,
  logo,
  primary,
  secondary,
}: {
  eyebrow: string;
  lines: readonly [string, string?];
  /** Where it is — shown with a pin. */
  tagline?: string;
  body?: string;
  image: { src: string; alt: string };
  logo?: { src: string; width: number; height: number; alt: string } | null;
  primary?: Cta;
  secondary?: Cta;
  /** Accepted for older callers; the hero no longer shows a facts card. */
  facts?: { label: string; value: string }[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(plate.current, { scale: 1.14 }, { scale: 1, duration: 2.2 }, 0)
        .from("[data-h]", { opacity: 0, y: 26, duration: 1.1, stagger: 0.08 }, 0.2);
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 } })
          .to(plate.current, { scale: 1.1, ease: "none" }, 0)
          .to(copy.current, { y: -60, opacity: 0.2, ease: "none" }, 0);
      });
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
    <div ref={track} className="relative">
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-onyx-ink md:min-h-[min(100vh,920px)]">
        <div className="absolute inset-0 -z-10">
          <div ref={plate} className="relative h-full w-full will-change-transform">
            <Image src={image.src} alt={image.alt} fill preload sizes="100vw" quality={85} className="object-cover" />
          </div>
          {/* Light at the top for the nav, depth at the foot and down the left for the words */}
          <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/45 via-black/5 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[75%] bg-linear-to-t from-black/85 via-black/45 to-transparent" />
          <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[65%] bg-linear-to-r from-black/50 via-black/20 to-transparent md:block" />
        </div>

        <div ref={copy} className="relative px-5 pb-10 pt-[calc(var(--header-h)+var(--ribbon-h)+3rem)] sm:px-8 md:pb-14 lg:px-12 lg:pb-[6vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+3vh)]">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[44rem]">
              {logo && (
                <Image
                  data-h
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="260px"
                  className="mb-7 h-auto max-h-16 w-auto lg:mb-[3vh] lg:max-h-[min(4rem,8vh)] max-w-[min(240px,60vw)] object-contain object-left [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.55))_drop-shadow(0_10px_26px_rgba(0,0,0,0.45))]"
                />
              )}
              <p data-h className="text-[13px] font-medium text-gold-light md:text-[14px]">
                {eyebrow}
              </p>
              <h1 data-h className="display on-dark mt-3 text-[clamp(2.9rem,7vw,6rem)] leading-[0.98] lg:text-[min(6rem,10vh)]">
                {lines[0]}
              </h1>
              {lines[1] && (
                <p data-h className="display-italic mt-3 font-display text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.01em] !text-[#e3d3b4]">
                  {lines[1]}
                </p>
              )}
              {tagline && (
                <p data-h className="mt-5 flex items-center gap-2 text-[14px] text-white/75">
                  <Icon name="pin" size={15} className="text-gold-light" /> {tagline}
                </p>
              )}
              {body && (
                <p data-h className="mt-4 line-clamp-4 max-w-[38rem] text-[16px] leading-[1.6] text-white/80 md:line-clamp-none md:text-[17px]">
                  {body}
                </p>
              )}
              {(primary || secondary) && (
                <div data-h className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center lg:mt-[4vh]">
                  {primary && button(primary, "group btn-gold shine")}
                  {secondary && button(secondary, "group btn-ghost-dark")}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
