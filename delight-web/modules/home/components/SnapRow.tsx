"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "@/components/ui/Arrow";
import { pad } from "./text";

/**
 * Horizontal scroll-snap row for phones and tablets. It bleeds to the screen
 * edges (negative margin + matching padding, so the first card lines up with
 * the column) and lets the next card peek in. Optional counter, progress
 * hairline and previous / next buttons. Lenis is told to leave sideways
 * gestures to the browser. Children set their own width and `snap-start`.
 */
export default function SnapRow({
  children,
  label,
  controls = false,
  className = "",
}: {
  children: ReactNode;
  /** Names the carousel for assistive tech, e.g. "Cuisines". */
  label: string;
  controls?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [index, setIndex] = useState(0);

  const step = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    return first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  useEffect(() => {
    const el = track.current;
    if (!el || !controls) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = step();
        if (!s) return;
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
        setIndex(atEnd ? count - 1 : Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / s))));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [controls, count]);

  const go = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * step(), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      <div
        ref={track}
        data-lenis-prevent-horizontal
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-10 pt-1 sm:-mx-8 sm:gap-5 sm:scroll-px-8 sm:px-8"
      >
        {children}
      </div>

      {controls && count > 1 && (
        <div className="-mt-2 flex items-center gap-6">
          <span aria-hidden className="font-display text-[17px] font-semibold lining-nums tabular-nums text-onyx">
            {pad(index + 1)} <span className="text-faint">/ {pad(count)}</span>
          </span>
          <span aria-hidden className="relative h-px flex-1 bg-onyx/15">
            <span
              className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-500 ease-out-expo"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            />
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous"
              className="glass-icon flex h-11 w-11 items-center justify-center rounded-full disabled:pointer-events-none disabled:opacity-35"
            >
              <Arrow className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === count - 1}
              aria-label="Next"
              className="glass-icon flex h-11 w-11 items-center justify-center rounded-full disabled:pointer-events-none disabled:opacity-35"
            >
              <Arrow />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
