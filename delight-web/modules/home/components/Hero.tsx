"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { hero, company } from "@/lib/content/site";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Full-bleed photograph behind the type, shown clear. Readability comes from
 * a transparent green shadow behind the copy and soft shadows on the type and
 * buttons, not from washing the photo out. The plate slowly pushes in as the
 * section scrolls, and the copy lifts away (desktop); phones get the entrance only.
 */
export default function Hero() {
  const track = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = track.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set("[data-h-line] > span, [data-h-fade]", { opacity: 1, yPercent: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo("[data-h-fade='eyebrow']", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1 }, 0.1)
        .fromTo(
          "[data-h-line] > span",
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.35, stagger: 0.11 },
          0.15,
        )
        .fromTo("[data-h-fade='rule']", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 1.2 }, 0.6)
        .fromTo("[data-h-fade='sub']", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.7)
        .fromTo("[data-h-fade='cta']", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.85)
        .fromTo(bg.current, { scale: 1.14, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, ease: "power3.out" }, 0);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 } })
          .to(bg.current, { scale: 1.16, ease: "none" }, 0)
          .to(copy.current, { yPercent: -28, opacity: 0, ease: "none" }, 0);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={track} className="relative h-auto md:h-[190vh]">
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden md:sticky md:top-0 md:h-screen">
        {/* Background plate */}
        <div className="absolute inset-0 -z-10">
          <div ref={bg} className="relative h-full w-full will-change-transform">
            <Image src={hero.image} alt="" fill preload sizes="100vw" quality={85} className="object-cover" />
          </div>
          {/* No wash over the photograph: a transparent green shadow sits only behind
              the copy, plus a light darkening at the top so the header reads. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(240px 150px at 92px 44px, rgba(1,20,10,0.62), rgba(1,20,10,0) 100%), radial-gradient(62% 52% at 50% 54%, rgba(1,30,14,0.58) 0%, rgba(1,30,14,0.34) 48%, rgba(1,30,14,0) 78%), linear-gradient(to bottom, rgba(1,20,10,0.55) 0%, rgba(1,20,10,0) 20%), linear-gradient(to top, rgba(1,20,10,0.5) 0%, rgba(1,20,10,0) 32%)",
            }}
          />
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-5 pb-14 pt-[calc(var(--header-h)+6vh)] sm:px-8 md:pb-16">
          <div ref={copy} className="mx-auto w-full max-w-[1280px] text-center">
            <p data-h-fade="eyebrow" className="eyebrow on-dark justify-center opacity-0 [text-shadow:0_1px_10px_rgba(0,0,0,0.55)]">
              {hero.eyebrow}
            </p>

            <h1 className="display on-dark mx-auto mt-7 max-w-[19ch] text-[clamp(2.7rem,7.6vw,6rem)] leading-[0.96] [text-shadow:0_2px_24px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.3)]">
              {hero.lines.map((line, i) => (
                <span key={line} data-h-line className="block overflow-hidden pb-[0.06em]">
                  <span className={`block will-change-transform ${i === 1 ? "display-italic" : ""}`} style={{ opacity: 0 }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div data-h-fade="rule" className="mx-auto mt-8 flex max-w-xs items-center gap-4 opacity-0" aria-hidden>
              <span className="gold-rule flex-1" />
              <span className="font-script text-[22px] leading-none text-gold-light [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">{company.tagline}</span>
              <span className="gold-rule flex-1" />
            </div>

            <p data-h-fade="sub" className="mx-auto mt-7 max-w-[62ch] text-[15.5px] leading-[1.8] text-cream opacity-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-[16px]">
              {hero.body}
            </p>

            <div data-h-fade="cta" className="mt-10 flex flex-col items-stretch justify-center gap-3 opacity-0 min-[420px]:flex-row min-[420px]:items-center">
              <a href="#enquiry" className="group btn-gold shine shadow-[0_16px_36px_-12px_rgba(0,0,0,0.55)]">
                {hero.primaryCta}
                <Arrow />
              </a>
              <Link href="/contact-us" className="group btn-ghost-dark bg-green-ink/60 text-cream shadow-[0_16px_36px_-14px_rgba(0,0,0,0.55)] hover:bg-green-ink/80">
                {hero.secondaryCta}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
          <span className="relative block h-12 w-px overflow-hidden bg-cream/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_ease-in-out_infinite] bg-gold-light" />
          </span>
        </div>
      </section>
    </div>
  );
}
