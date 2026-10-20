"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "@/components/ui/Arrow";

type Cta = { label: string; href: string; external?: boolean };

/** A campaign shown on the hero: its photo becomes the background while it runs. */
export type HeroSlide = { image: { src: string; alt: string }; kind: string; title: string; dates: string; cta: { label: string; href: string } };

const SLIDE_MS = 7000;

/**
 * The hero for every page — the full-bleed photograph of the original home
 * page, made richer: the plate eases in from a deep zoom, the headline rises
 * line by line in large editorial serif, a gold rule draws out under it with
 * the tagline, and on desktop the photo pushes in while the copy lifts away as
 * you scroll. A transparent dark shadow sits only behind the words.
 *
 * `inset` is for photographs too small or too tall to fill the screen: they
 * become a framed print on the right, over a soft, darkened wash of themselves.
 * `children` float at the foot of the hero (the home page's finder).
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
  inset = false,
  tall = false,
  slides,
  children,
}: {
  eyebrow: string;
  lines: readonly [string, string?];
  tagline?: string;
  body?: string;
  image: { src: string; alt: string };
  logo?: { src: string; width: number; height: number; alt: string } | null;
  primary?: Cta;
  secondary?: Cta;
  inset?: boolean;
  /** The home page: a full screen and a longer scroll-through. */
  tall?: boolean;
  /** Campaigns to run on the hero (home page): backgrounds crossfade, a glass card names the one showing. */
  slides?: HeroSlide[];
  children?: ReactNode;
}) {
  const [slide, setSlide] = useState(0);
  const hasSlides = Boolean(slides?.length);
  useEffect(() => {
    if (!slides?.length || prefersReducedMotion()) return;
    const t = window.setTimeout(() => setSlide((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [slide, slides]);
  const track = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = track.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll("[data-h-line] > span, [data-h-fade]"), { opacity: 1, yPercent: 0, y: 0, scaleX: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(plate.current, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4, ease: "power3.out" }, 0)
        .fromTo("[data-h-fade='eyebrow']", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1 }, 0.2)
        .fromTo("[data-h-line] > span", { yPercent: 115, opacity: 0, rotate: 2 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 1.5, stagger: 0.12 }, 0.25)
        .fromTo("[data-h-fade='rule']", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 1.3 }, 0.75)
        .fromTo("[data-h-fade='sub']", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.85)
        .fromTo("[data-h-fade='cta']", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 1)
        .fromTo("[data-h-fade='foot']", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2 }, 1.1);

      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 } })
          .to(plate.current, { scale: 1.14, ease: "none" }, 0)
          .to(copy.current, { yPercent: -22, opacity: 0, ease: "none" }, 0);
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

  const shadow =
    "linear-gradient(to bottom, rgba(10,12,9,0.6) 0%, rgba(10,12,9,0) 22%), radial-gradient(70% 55% at 50% 52%, rgba(14,16,12,0.62) 0%, rgba(14,16,12,0.34) 50%, rgba(14,16,12,0) 80%), linear-gradient(to top, rgba(10,12,9,0.6) 0%, rgba(10,12,9,0) 34%)";

  return (
    <div ref={track} className={`relative ${tall ? "md:h-[165vh]" : "md:h-[128vh]"}`}>
      <section
        className={`relative isolate flex flex-col overflow-hidden bg-onyx-ink md:sticky md:top-0 md:h-screen ${tall ? "min-h-[100svh]" : "min-h-[92svh]"}`}
      >
        <div className="absolute inset-0 -z-10">
          <div ref={plate} className="relative h-full w-full will-change-transform">
            {hasSlides ? (
              slides!.map((sl, i) => (
                <div key={sl.image.src} aria-hidden={i !== slide} className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${i === slide ? "opacity-100" : "opacity-0"}`}>
                  <Image
                    src={sl.image.src}
                    alt={i === slide ? sl.image.alt : ""}
                    fill
                    preload={i === 0}
                    sizes="100vw"
                    quality={85}
                    className={`object-cover transition-transform duration-[9000ms] ease-out motion-reduce:transition-none ${i === slide ? "scale-110" : "scale-100"}`}
                  />
                </div>
              ))
            ) : inset ? (
              <Image src={image.src} alt="" fill preload sizes="40vw" className="scale-125 object-cover opacity-55 blur-2xl" />
            ) : (
              <Image src={image.src} alt={image.alt} fill preload sizes="100vw" quality={85} className="object-cover" />
            )}
          </div>
          <div aria-hidden className="absolute inset-0" style={{ background: shadow }} />
          <div aria-hidden className="grain" />
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center px-5 pb-14 pt-[calc(var(--header-h)+5vh)] sm:px-8 md:pb-20 lg:px-12 ${children || hasSlides ? "md:pb-52 lg:pb-40" : ""}`}
        >
          <div
            ref={copy}
            className={`mx-auto grid w-full max-w-[1280px] items-center gap-10 ${inset ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : ""}`}
          >
            <div className={inset ? "text-center lg:text-left" : "text-center"}>
              {logo && (
                <div data-h-fade="eyebrow" className={`mb-8 flex w-fit opacity-0 ${inset ? "mx-auto lg:mx-0" : "mx-auto"}`}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    sizes="320px"
                    className="h-auto max-h-24 w-auto max-w-[min(300px,70vw)] object-contain [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.55))_drop-shadow(0_10px_30px_rgba(0,0,0,0.45))]"
                  />
                </div>
              )}
              <p
                data-h-fade="eyebrow"
                className={`eyebrow on-dark opacity-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.7),0_2px_14px_rgba(0,0,0,0.6)] ${inset ? "justify-center lg:justify-start" : "justify-center"}`}
              >
                {eyebrow}
              </p>

              <h1
                className={`display on-dark mt-6 text-[clamp(3.2rem,8.6vw,8.4rem)] font-light leading-[0.86] [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] ${inset ? "mx-auto lg:mx-0" : "mx-auto"} max-w-[14ch]`}
              >
                {lines.map((line, i) =>
                  line ? (
                    <span key={line} data-h-line className="block overflow-hidden pb-[0.08em]">
                      <span
                        className={`block origin-left will-change-transform ${i === 1 ? `display-italic ${line.length > 16 ? "text-[0.62em] leading-[0.98]" : ""}` : ""}`}
                        style={{ opacity: 0 }}
                      >
                        {line}
                      </span>
                    </span>
                  ) : null,
                )}
              </h1>

              {tagline && (
                <div
                  data-h-fade="rule"
                  aria-hidden
                  className={`mt-8 flex max-w-sm items-center gap-4 opacity-0 [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.6))] ${inset ? "mx-auto lg:mx-0" : "mx-auto"}`}
                >
                  <span className="gold-rule flex-1" />
                  <span className="whitespace-nowrap text-[10.5px] font-medium uppercase tracking-[0.3em] text-gold-light">{tagline}</span>
                  <span className="gold-rule flex-1" />
                </div>
              )}

              {body && (
                <p
                  data-h-fade="sub"
                  className={`mt-7 max-w-[58ch] text-[15.5px] leading-[1.8] text-cream opacity-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.7),0_2px_16px_rgba(0,0,0,0.55)] sm:text-[16.5px] ${inset ? "mx-auto lg:mx-0" : "mx-auto"}`}
                >
                  {body}
                </p>
              )}

              {(primary || secondary) && (
                <div
                  data-h-fade="cta"
                  className={`mt-9 flex flex-col items-stretch gap-3 opacity-0 min-[420px]:flex-row min-[420px]:items-center ${inset ? "justify-center lg:justify-start" : "justify-center"}`}
                >
                  {primary && button(primary, "group btn-gold shine !shadow-[0_2px_4px_rgba(0,0,0,0.25),0_18px_40px_-12px_rgba(0,0,0,0.7)]")}
                  {secondary &&
                    button(
                      secondary,
                      "group btn-ghost-dark bg-onyx-ink/55 text-cream shadow-[0_2px_4px_rgba(0,0,0,0.25),0_18px_40px_-14px_rgba(0,0,0,0.65)] backdrop-blur-md hover:bg-onyx-ink/80",
                    )}
                </div>
              )}
            </div>

            {inset && (
              <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[24px] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.9)] ring-1 ring-gold-light/30 lg:block">
                <Image src={image.src} alt={image.alt} fill preload sizes="420px" className="object-cover" />
                <span aria-hidden className="absolute inset-3 rounded-[18px] border border-gold-light/50" />
              </div>
            )}
          </div>
        </div>

        {(children || hasSlides) && (
          <div data-h-fade="foot" className="relative px-5 pb-6 opacity-0 sm:px-8 md:absolute md:inset-x-0 md:bottom-0 md:pb-8 lg:px-12">
            <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 lg:flex-row lg:items-end">
              {hasSlides && <CampaignCard slides={slides!} active={slide} onPick={setSlide} />}
              {children && <div className="min-w-0 flex-1">{children}</div>}
            </div>
          </div>
        )}

        {/* Scroll cue */}
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center ${children ? "" : "md:flex"}`}>
          <span className="relative block h-12 w-px overflow-hidden bg-cream/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_ease-in-out_infinite] bg-gold-light" />
          </span>
        </div>
      </section>
    </div>
  );
}

/** The running campaign, on glass: kind and dates, title, its action, and a progress line per campaign. */
function CampaignCard({ slides, active, onPick }: { slides: HeroSlide[]; active: number; onPick: (i: number) => void }) {
  const c = slides[active];
  const isPage = c.cta.href.startsWith("/");
  return (
    <div className="w-full shrink-0 rounded-[18px] border border-white/20 bg-white/10 p-4 text-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl lg:w-[380px]" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light">
          {c.kind} · {c.dates}
        </p>
        <div className="flex gap-1.5" role="tablist" aria-label="Campaigns">
          {slides.map((sl, i) => (
            <button
              key={sl.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={sl.title}
              onClick={() => onPick(i)}
              className="relative h-6 w-6"
            >
              <span className={`absolute left-1/2 top-1/2 h-[3px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white/30 transition-all duration-500 ${i === active ? "w-6" : "w-2.5"}`}>
                {i === active && <span key={active} className="absolute inset-0 origin-left animate-[progress-fill_7s_linear_both] bg-gold-light motion-reduce:animate-none" />}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p key={c.title} className="mt-2 font-display text-[1.6rem] leading-[1.02] tracking-[-0.02em] animate-[hub-in_0.7s_var(--ease-out-expo)_both]">
        {c.title}
      </p>
      {isPage ? (
        <Link href={c.cta.href} className="group mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 hover:text-gold-light">
          {c.cta.label} <Arrow />
        </Link>
      ) : (
        <a href={c.cta.href} className="group mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 hover:text-gold-light">
          {c.cta.label} <Arrow />
        </a>
      )}
    </div>
  );
}
