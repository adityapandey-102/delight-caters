"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui/Arrow";
import type { Campaign } from "@/lib/content/campaigns";

const TURN_MS = 6000;

export function Campaigns({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: readonly [string, string];
  items: Campaign[];
}) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const inView = useRef(false);
  const paused = useRef(false);
  const elapsed = useRef(0);

  const select = useCallback((i: number) => {
    elapsed.current = 0;
    setActive(i);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    bars.current.forEach((b, i) => {
      if (b) b.style.transform = `scaleX(${i === active && reduced ? 1 : 0})`;
    });
    if (reduced || items.length < 2) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (inView.current && !paused.current && !document.hidden) {
        elapsed.current += dt;
      }
      const p = Math.min(elapsed.current / TURN_MS, 1);
      const bar = bars.current[active];
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        elapsed.current = 0;
        setActive((a) => (a + 1) % items.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, items.length]);

  const current = items[active];
  if (!current) return null;
  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  const ctaInner = (
    <>
      <span>{current.cta.label}</span>
      <Arrow />
    </>
  );
  const ctaClass = "btn-gold shine group mt-6 inline-flex";

  return (
    <section
      ref={sectionRef}
      className="onyx-velvet relative overflow-hidden"
      aria-label={eyebrow}
    >
      <div aria-hidden className="grain" />
      <div className="relative px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <p className="eyebrow on-dark">{eyebrow}</p>
          <h2 className="display on-dark mt-4 text-[clamp(2.4rem,5vw,4.4rem)]">
            {title[0]} <span className="display-italic">{title[1]}</span>
          </h2>

          <div
            className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-onyx-ink sm:aspect-[16/10]">
              {items.map((c, i) => {
                const on = i === active;
                return (
                  <Image
                    key={c.id}
                    src={c.image.src}
                    alt={on ? c.image.alt : ""}
                    aria-hidden={!on}
                    fill
                    sizes="(min-width: 1280px) 740px, (min-width: 1024px) 60vw, 100vw"
                    className={`object-cover ${on ? "opacity-100" : "opacity-0"} ${
                      on && !reduced ? "scale-110" : "scale-100"
                    }`}
                    style={{
                      transition: `opacity 1000ms ease-out, transform ${
                        on && !reduced ? 8000 : 1000
                      }ms ease-out`,
                    }}
                  />
                );
              })}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <div key={current.id} aria-live="polite">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold-light">
                    {current.kind}
                    <span className="mx-2 text-cream-muted">·</span>
                    <span className="text-cream">{current.brand}</span>
                  </p>
                  <h3 className="font-display mt-3 text-[1.9rem] leading-[1.05] text-cream sm:text-[2.4rem]">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-sm text-gold-pale">{current.dates}</p>
                  <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-cream-muted sm:text-[0.95rem]">
                    {current.summary}
                  </p>
                  {current.cta.href.startsWith("/") ? (
                    <Link href={current.cta.href} className={ctaClass}>
                      {ctaInner}
                    </Link>
                  ) : (
                    <a href={current.cta.href} className={ctaClass}>
                      {ctaInner}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:snap-none lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {items.map((c, i) => {
                const on = i === active;
                return (
                  <li
                    key={c.id}
                    className="min-w-[72%] snap-start sm:min-w-[45%] lg:min-w-0 lg:flex-1"
                  >
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={on}
                      className={`relative flex h-full w-full flex-col justify-center overflow-hidden rounded-xl border border-l-2 px-5 py-4 text-left transition-colors duration-500 ${
                        on
                          ? "border-line border-l-gold-light bg-cream/[0.06]"
                          : "border-line border-l-transparent hover:bg-cream/[0.03]"
                      }`}
                    >
                      <span className="text-[0.68rem] uppercase tracking-[0.2em] text-gold-light">
                        {c.kind} <span className="text-cream-muted">· {c.dates}</span>
                      </span>
                      <span
                        className={`font-display mt-1.5 text-[1.3rem] leading-tight lg:text-[1.45rem] ${
                          on ? "text-cream" : "text-cream-muted"
                        }`}
                      >
                        {c.title}
                      </span>
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-cream/10">
                        <span
                          ref={(el) => {
                            bars.current[i] = el;
                          }}
                          className="block h-full origin-left bg-gold-light"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
