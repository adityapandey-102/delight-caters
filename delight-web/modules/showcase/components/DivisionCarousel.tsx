"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Action = { label: string; href: string };

export type DivisionBrand = {
  name: string;
  title: string;
  /** Gold words after the title. */
  accent: string;
  body: string;
  image: { src: string; alt: string };
  primary: Action;
  secondary: Action;
};

export type Division = {
  key: string;
  name: string;
  /** The way into the whole division, shown on every slide. */
  explore: Action;
  brands: DivisionBrand[];
};

/** Seconds each brand holds the tile before the next one takes over. */
const HOLD_S = 4.5;
const EASE = "cubic-bezier(0.28,0.11,0.32,1)";

function ActionLink({ action, primary }: { action: Action; primary?: boolean }) {
  const cls = primary ? "btn-gold !py-2 !px-4 !text-[14px]" : "link-more on-dark text-cream";
  return action.href.startsWith("/") ? (
    <Link href={action.href} className={cls}>
      {action.label}
    </Link>
  ) : (
    <a href={action.href} className={cls}>
      {action.label}
    </a>
  );
}

/**
 * A division as one full-width photo tile that carries each of its brands in
 * turn: every brand is a slide of its own (photograph, name, line and links)
 * on a track that glides sideways to the next, the photo easing in as it
 * lands. A pill at the foot names every brand — the active one with a timer
 * under it, any one a tap away — with a pause button, beside a link to the
 * whole division, and the track follows a swipe on touch. It keeps running
 * under the pointer; it stops when paused, when off-screen and for reduced
 * motion.
 */
export function DivisionCarousel({ division }: { division: Division }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const count = division.brands.length;
  const swipe = useRef<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    setStill(prefersReducedMotion());
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused && !still && count > 1;
  const pick = (i: number) => setActive((i + count) % count);

  return (
    <article
      ref={root}
      aria-roledescription="carousel"
      aria-label={division.name}
      className="relative h-[min(92vh,760px)] min-h-[560px] overflow-hidden bg-black text-cream"
    >
      {/* The track: one slide per brand, gliding sideways */}
      <div
        className="flex h-full touch-pan-y"
        style={{ transform: `translate3d(${-active * 100}%,0,0)`, transition: `transform 0.9s ${EASE}` }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") swipe.current = e.clientX;
        }}
        onPointerUp={(e) => {
          const from = swipe.current;
          swipe.current = null;
          if (from === null || Math.abs(e.clientX - from) < 50) return;
          pick(active + (e.clientX < from ? 1 : -1));
        }}
        onPointerCancel={() => (swipe.current = null)}
      >
        {division.brands.map((b, i) => {
          const on = i === active;
          return (
            <div
              key={b.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${b.name}`}
              aria-hidden={!on}
              inert={!on}
              className="relative isolate h-full w-full shrink-0 overflow-hidden"
            >
              <Image
                src={b.image.src}
                alt={b.image.alt}
                fill
                sizes="100vw"
                className={`-z-20 object-cover ${on ? "scale-100" : "scale-[1.08]"}`}
                style={{ transition: `transform ${on ? HOLD_S + 1.5 : 1.1}s ${EASE}` }}
              />
              <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-linear-to-b from-black/85 via-black/50 to-transparent" />

              <div className="relative mx-auto max-w-[820px] px-6 pt-14 text-center md:pt-16">
                <p className="eyebrow on-dark justify-center">{b.name}</p>
                <h2 className="display on-dark mt-1.5 text-[clamp(2.5rem,5.6vw,3.9rem)]">
                  {b.title} <span className="display-italic">{b.accent}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-[40ch] text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.4] text-cream/85">{b.body}</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  <ActionLink action={b.primary} primary />
                  <ActionLink action={b.secondary} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Every brand by name (the active one carries the timer); pause, and the way into the whole division */}
      <div className="absolute inset-x-0 bottom-24 flex flex-col-reverse items-center justify-center gap-3 px-3 md:bottom-8 md:flex-row md:px-4">
        {count > 1 && (
          <div role="tablist" aria-label={`${division.name} brands`} className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-black/35 p-1 ring-1 ring-white/15 backdrop-blur-md">
            {division.brands.map((b, i) => {
              const on = i === active;
              return (
                <button
                  key={b.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(i)}
                  className={`relative shrink-0 overflow-hidden whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-medium transition-colors duration-300 md:px-4 md:text-[13px] ${
                    on ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {b.name}
                  {on && (
                    <span aria-hidden className="absolute inset-x-3 bottom-1 h-px overflow-hidden md:inset-x-4">
                      <span
                        key={active}
                        onAnimationEnd={() => pick(active + 1)}
                        className="block h-full w-full origin-left bg-gold-light"
                        style={{ animation: `progress-fill ${HOLD_S}s linear both`, animationPlayState: running ? "running" : "paused" }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        <div className="flex items-center gap-2">
          {count > 1 && !still && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? `Play ${division.name} slideshow` : `Pause ${division.name} slideshow`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-black/50"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor">
                {paused ? <path d="M4 2.5v9l7.5-4.5z" /> : <path d="M3.5 2.5h2.5v9H3.5zM8 2.5h2.5v9H8z" />}
              </svg>
            </button>
          )}
          <Link href={division.explore.href} className="btn-ghost-dark !px-5 !py-2.5 !text-[12.5px]">
            {division.explore.label}
          </Link>
        </div>
      </div>
    </article>
  );
}
