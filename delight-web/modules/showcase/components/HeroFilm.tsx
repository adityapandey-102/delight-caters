"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

type Action = { label: string; href: string };

/**
 * The opening film (after Apple's product heroes): a black stage, the name and
 * a short line centred at the top, two pills — then a photograph that starts
 * inset with rounded corners and opens to full bleed as you scroll into it.
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
}) {
  const root = useRef<HTMLElement>(null);

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
    <section ref={root} className="relative overflow-hidden bg-black text-cream">
      <div className="mx-auto max-w-[980px] px-6 pb-14 pt-[calc(var(--header-h)+3.5rem)] text-center md:pb-20 md:pt-[calc(var(--header-h)+5.5rem)]">
        <p data-copy className="eyebrow on-dark justify-center text-[15px] md:text-[17px]">
          {kicker}
        </p>
        <h1 data-copy className="display on-dark mt-3 text-[clamp(2.9rem,8.4vw,6.6rem)] leading-[1]">
          {title} <span className="display-italic">{accent}</span>
          <br className="hidden sm:block" /> {rest}
        </h1>
        <p data-copy className="mx-auto mt-6 max-w-[36ch] text-[clamp(1.05rem,1.7vw,1.4rem)] font-normal leading-[1.45] text-cream-muted">
          {body}
        </p>
        <div data-copy className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={primary.href} className="btn-gold shine">
            {primary.label}
          </a>
          <Link href={secondary.href} className="btn-ghost-dark">
            {secondary.label}
          </Link>
        </div>
      </div>

      <div data-frame className="relative h-[min(78vh,820px)] min-h-[420px] overflow-hidden will-change-[clip-path]">
        <div data-photo className="absolute inset-0 will-change-transform">
          <Image src={image.src} alt={image.alt} fill preload sizes="100vw" quality={85} className="object-cover" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
        {caption && (
          <p className="absolute bottom-6 left-1/2 w-full max-w-[1080px] -translate-x-1/2 px-6 text-[13px] text-white/75 md:bottom-9">{caption}</p>
        )}
      </div>
    </section>
  );
}
