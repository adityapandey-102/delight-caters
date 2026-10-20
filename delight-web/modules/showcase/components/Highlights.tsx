"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { readingSeconds } from "@/lib/reading";

export type Highlight = {
  image: { src: string; alt: string };
  kicker: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
};

const EASE = "cubic-bezier(0.28,0.11,0.32,1)";

/**
 * "Get the highlights." — the marketing carousel on the home page and in every
 * category and outlet. Large cards snap one at a time: the card in view comes
 * forward while its neighbours recede, its photograph slowly pushes in, and
 * the caption rises line by line. Each card stays only as long as it takes to
 * read (see readingSeconds); the active dot fills as its timer. Pauses
 * off-screen, on hover or focus, and for reduced motion; arrow keys step.
 */
export function Highlights({ title, eyebrow, items, theme = "light" }: { title: string; eyebrow?: string; items: Highlight[]; theme?: "light" | "dark" }) {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const programmatic = useRef(false);
  const dark = theme === "dark";
  const many = items.length > 1;
  const seconds = items.map((h) => readingSeconds(`${h.kicker} ${h.title} ${h.cta?.label ?? ""}`, h.body));

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !prefersReducedMotion()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const t = track.current;
    const card = t?.children[i] as HTMLElement | undefined;
    if (!t || !card) return;
    programmatic.current = true;
    t.scrollTo({ left: card.offsetLeft - t.offsetLeft - parseFloat(getComputedStyle(t).paddingLeft), behavior: "smooth" });
    setIndex(i);
    window.setTimeout(() => (programmatic.current = false), 700);
  };
  const step = (d: number) => go((index + d + items.length) % items.length);

  // When the visitor swipes, follow them.
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let timer: number | undefined;
    const onScroll = () => {
      if (programmatic.current) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const cards = Array.from(t.children) as HTMLElement[];
        const pad = parseFloat(getComputedStyle(t).paddingLeft);
        let best = 0;
        cards.forEach((c, i) => {
          if (Math.abs(c.offsetLeft - t.offsetLeft - pad - t.scrollLeft) < Math.abs(cards[best].offsetLeft - t.offsetLeft - pad - t.scrollLeft)) best = i;
        });
        setIndex(best);
      }, 90);
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (!many) return;
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    step(e.key === "ArrowRight" ? 1 : -1);
  };

  const running = many && playing && visible && !hover;

  return (
    <section ref={root} className={`py-20 md:py-28 ${dark ? "bg-black text-cream" : "bg-wall"}`} aria-roledescription="carousel" aria-label={title}>
      <div className="mx-auto w-full max-w-[1080px] px-6">
        {eyebrow && <p className={`eyebrow ${dark ? "on-dark" : ""}`}>{eyebrow}</p>}
        <h2 className={`display text-[clamp(2.2rem,5vw,3.5rem)] ${eyebrow ? "mt-2" : ""} ${dark ? "on-dark" : ""}`}>{title}</h2>
      </div>

      <div
        ref={track}
        tabIndex={many ? 0 : -1}
        onKeyDown={onKey}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.5rem,calc((100vw-1080px)/2+1.5rem))] scroll-px-[max(1.5rem,calc((100vw-1080px)/2+1.5rem))] outline-none md:mt-12"
      >
        {items.map((h, i) => {
          const on = i === index;
          const rise = (delay: number) => ({
            transition: `opacity 0.8s ${EASE} ${on ? delay : 0}ms, transform 0.8s ${EASE} ${on ? delay : 0}ms`,
          });
          const riseCls = on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0";
          return (
            <article
              key={h.title}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              onClick={on ? undefined : () => go(i)}
              className={`relative aspect-[4/5] ${on ? "" : "cursor-pointer"} w-[min(86vw,1032px)] shrink-0 snap-start overflow-hidden rounded-[28px] bg-black transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.28,0.11,0.32,1)] sm:aspect-[16/10] md:aspect-[16/9] ${
                on ? "scale-100 opacity-100" : "scale-[0.94] opacity-45"
              }`}
            >
              {/* The photograph pushes in slowly while its card is showing */}
              <Image
                src={h.image.src}
                alt={h.image.alt}
                fill
                sizes="(min-width: 1100px) 1032px, 86vw"
                className={`object-cover ease-out ${on ? "scale-100" : "scale-[1.08]"}`}
                style={{ transitionProperty: "transform", transitionDuration: on ? `${seconds[i] + 1}s` : "0.9s" }}
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/65 via-black/10 to-black/45" />
              <div className="relative max-w-[30rem] p-7 md:p-11">
                <p className={`text-[13px] font-semibold text-gold-light md:text-[14px] ${riseCls}`} style={rise(150)}>
                  {h.kicker}
                </p>
                <h3 className={`mt-2 font-display text-[clamp(1.6rem,3vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white ${riseCls}`} style={rise(260)}>
                  {h.title}
                </h3>
                {h.body && (
                  <p className={`mt-3 hidden text-[16px] leading-[1.45] text-white/80 sm:block ${riseCls}`} style={rise(380)}>
                    {h.body}
                  </p>
                )}
              </div>
              {h.cta && (
                <div className={`absolute bottom-6 left-7 md:bottom-9 md:left-11 ${riseCls}`} style={rise(500)}>
                  {h.cta.href.startsWith("/") ? (
                    <Link href={h.cta.href} className="btn-gold shine !px-4 !py-2 !text-[14px]">
                      {h.cta.label}
                    </Link>
                  ) : (
                    <a href={h.cta.href} className="btn-gold shine !px-4 !py-2 !text-[14px]">
                      {h.cta.label}
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Control pill: dots (the active one is a timer) + play / pause */}
      {many && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className={`flex h-14 items-center gap-2.5 rounded-full px-6 backdrop-blur-xl ${dark ? "bg-white/12" : "bg-black/[0.06]"}`}>
            {items.map((h, i) => (
              <button
                key={h.title}
                type="button"
                aria-label={`Show ${h.title}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] ${
                  i === index ? `w-12 ${dark ? "bg-white/30" : "bg-black/15"}` : `w-2 ${dark ? "bg-white/45 hover:bg-white/70" : "bg-black/30 hover:bg-black/50"}`
                }`}
              >
                {i === index && (
                  <span
                    key={index}
                    onAnimationEnd={() => step(1)}
                    className={`absolute inset-y-0 left-0 w-full origin-left rounded-full ${dark ? "bg-white" : "bg-ink"}`}
                    style={{ animation: `progress-fill ${seconds[i]}s linear both`, animationPlayState: running ? "running" : "paused" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className={`flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-xl transition-colors ${dark ? "bg-white/12 text-white hover:bg-white/20" : "bg-black/[0.06] text-ink hover:bg-black/10"}`}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
                <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M3.5 1.8v10.4a.6.6 0 0 0 .9.5l8.3-5.2a.6.6 0 0 0 0-1L4.4 1.3a.6.6 0 0 0-.9.5Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
