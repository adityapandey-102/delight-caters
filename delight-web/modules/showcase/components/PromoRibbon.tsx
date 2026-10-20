"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Offer } from "@/lib/content/offers";
import { readingSeconds } from "@/lib/reading";

/**
 * The marketing ribbon — Apple's announcement strip, made to run. It lives in
 * the global nav, under the bar, on every page: one offer, event or
 * collaboration at a time, each held just long enough to read before it
 * slides up to the next. Hover or focus pauses it; the arrows step by hand.
 */
export function PromoRibbon({ items, tone = "dark" }: { items: Offer[]; tone?: "dark" | "light" }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const light = tone === "light";
  const current = n ? i % n : 0;
  const ms = n ? readingSeconds(`${items[current].kind} ${items[current].brand} ${items[current].line} ${items[current].cta.label}`) * 1000 : 0;

  useEffect(() => {
    if (paused || n < 2) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearTimeout(t);
  }, [i, paused, n, ms]);

  if (!n) return null;
  const step = (d: number) => setI((v) => (v + d + n) % n);
  const arrow = `hidden h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors sm:flex ${
    light ? "text-muted hover:bg-black/5 hover:text-ink" : "text-white/55 hover:bg-white/10 hover:text-white"
  }`;

  return (
    <div
      role="region"
      aria-roledescription="announcements"
      aria-label="Offers, events and collaborations"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`relative border-t transition-colors duration-500 ${light ? "border-black/[0.06]" : "border-white/10"}`}
    >
      <div className="relative mx-auto flex h-[var(--ribbon-h)] w-full max-w-[1080px] items-center px-2 sm:px-4">
        <button type="button" onClick={() => step(-1)} aria-label="Previous announcement" className={arrow}>
          <Chevron dir="left" />
        </button>

        <div className="relative h-full min-w-0 flex-1 overflow-hidden" aria-live={paused ? "polite" : "off"}>
          {items.map((p, idx) => {
            const on = idx === current;
            const previous = idx === (current - 1 + n) % n;
            const linkCls = `link-more shrink-0 !text-[12.5px] sm:!text-[13px] ${light ? "" : "on-dark"}`;
            return (
              <div
                key={p.id}
                inert={!on}
                aria-hidden={!on}
                className={`absolute inset-0 flex items-center justify-center gap-2.5 px-2 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.28,0.11,0.32,1)] motion-reduce:transition-none ${
                  on ? "translate-y-0 opacity-100" : previous ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
                }`}
              >
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                    light ? "bg-gold/10 text-gold-deep ring-gold/35" : "bg-gold-light/15 text-gold-light ring-gold-light/30"
                  }`}
                >
                  {p.kind}
                </span>
                <p className={`min-w-0 truncate text-[12.5px] sm:text-[13px] ${light ? "text-body" : "text-white/85"}`}>
                  <span className={`hidden font-semibold sm:inline ${light ? "text-ink" : "text-white"}`}>{p.brand} · </span>
                  {p.line}
                </p>
                {p.cta.href.startsWith("/") ? (
                  <Link href={p.cta.href} className={linkCls}>
                    {p.cta.label}
                  </Link>
                ) : (
                  <a href={p.cta.href} className={linkCls}>
                    {p.cta.label}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={() => step(1)} aria-label="Next announcement" className={arrow}>
          <Chevron dir="right" />
        </button>
      </div>

      {/* The current message's timer: a hairline that fills along the bottom */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <span
          key={`${current}-${paused}`}
          className={`block h-full origin-left ${light ? "bg-gold" : "bg-gold-light/70"}`}
          style={{ animation: `progress-fill ${ms}ms linear both`, animationPlayState: paused ? "paused" : "running" }}
        />
      </span>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path d={dir === "left" ? "M7.5 2.5 4 6l3.5 3.5" : "M4.5 2.5 8 6 4.5 9.5"} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
