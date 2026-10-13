"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Reel } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";
import { NEW_TAB } from "./text";

/** Longest a reel plays before the next one takes over (the Ganesha reel runs a minute). */
const MAX_CLIP_S = 15;
/** After the visitor touches the row, stop auto-scrolling it for this long. */
const TOUCH_QUIET_MS = 7000;

/**
 * The reels play one at a time, in order, while the row is on screen — like a
 * carousel's autoplay. Hovering a card (mouse) plays that reel instead and the
 * walk carries on from it afterwards. On touch screens a tap on a resting card
 * plays it; a tap on the playing card opens it on Instagram. Muted by default
 * (browsers only autoplay silently); the playing card has a sound toggle.
 * Visitors who prefer reduced motion get still posters.
 */
export default function ReelRow({ reels }: { reels: Reel[] }) {
  const row = useRef<HTMLUListElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const lastTouch = useRef(0);
  const pointerType = useRef<string>("mouse");
  /** The reel whose turn already ended — the cap and "ended" can both fire. */
  const done = useRef(-1);

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [muted, setMuted] = useState(true);
  /** How far the playing reel has got, tagged with which reel it belongs to. */
  const [progress, setProgress] = useState({ i: -1, p: 0 });

  const playing = hovered ?? active;
  const live = inView && !reduced;

  const next = useCallback(() => setActive((i) => (i + 1) % reels.length), [reels.length]);

  useEffect(() => {
    const el = row.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setReduced(reduce), 0);
    const io = el ? new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 }) : null;
    if (el && io) io.observe(el);
    return () => {
      window.clearTimeout(id);
      io?.disconnect();
    };
  }, []);

  /* Play exactly one video; every other one rests on its poster. */
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === playing && live) {
        v.muted = muted;
        v.play().catch(() => {
          // Autoplay with sound refused: fall back to muted.
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
      } else {
        v.pause();
      }
    });
  }, [playing, live, muted]);

  /* A reel taking its turn in the walk starts from the top. */
  useEffect(() => {
    const v = videos.current[active];
    if (v) v.currentTime = 0;
    done.current = -1;
  }, [active]);

  /* Phones/tablets: keep the playing card in view inside the scrolling row. */
  useEffect(() => {
    const el = row.current;
    const card = el?.children[active] as HTMLElement | undefined;
    if (!el || !card || !inView || hovered !== null) return;
    if (el.scrollWidth <= el.clientWidth + 4) return; // grid layout, nothing to scroll
    if (Date.now() - lastTouch.current < TOUCH_QUIET_MS) return;
    el.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
  }, [active, inView, hovered]);

  const onTime = (i: number) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (i !== playing) return;
    const v = e.currentTarget;
    const end = Math.min(v.duration || MAX_CLIP_S, MAX_CLIP_S);
    setProgress({ i, p: Math.min(1, v.currentTime / end) });
    if (v.currentTime >= end) finish(i, v);
  };

  const finish = (i: number, v: HTMLVideoElement) => {
    if (hovered === i) {
      v.currentTime = 0; // a hovered reel loops while the pointer stays on it
      v.play().catch(() => {});
    } else if (done.current !== i) {
      done.current = i;
      v.pause();
      next();
    }
  };

  return (
    <ul
      ref={row}
      data-lenis-prevent-horizontal
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
        if (e.pointerType !== "mouse") lastTouch.current = Date.now();
      }}
      onScroll={() => {
        if (pointerType.current !== "mouse") lastTouch.current = Date.now();
      }}
      className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-6 pt-2 sm:-mx-8 sm:gap-5 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0"
    >
      {reels.map((reel, i) => {
        const on = i === playing && live;
        return (
          <li key={reel.caption} className="w-[72vw] max-w-[320px] shrink-0 snap-start sm:w-[44vw] md:w-[34vw] lg:w-auto lg:max-w-none">
            <div
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse" && !reduced) setHovered(i);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse" || hovered !== i) return;
                setHovered(null);
                setActive(i); // carry on the walk from the reel just watched
              }}
              className={`group relative aspect-[10/16] overflow-hidden rounded-2xl bg-green-ink shadow-[0_26px_50px_-34px_rgba(1,43,21,0.6)] transition-[translate,box-shadow] duration-700 ease-out-expo ${
                on
                  ? "-translate-y-2 shadow-[0_40px_70px_-34px_rgba(1,43,21,0.75)] ring-2 ring-gold-light/80"
                  : "ring-1 ring-gold-light/15"
              }`}
            >
              {reel.video ? (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={reel.video}
                  poster={reel.poster}
                  muted
                  playsInline
                  preload={i === playing ? "auto" : "none"}
                  onTimeUpdate={onTime(i)}
                  onEnded={(e) => finish(i, e.currentTarget)}
                  aria-hidden
                  tabIndex={-1}
                  className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1100ms] ease-out-expo ${
                    on ? "scale-[1.03]" : "brightness-[0.82] saturate-[0.85]"
                  }`}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- poster-only fallback, same file the video would use
                <img src={reel.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}

              {/* progress of the reel that's playing */}
              <span aria-hidden className="absolute inset-x-4 top-4 h-[3px] overflow-hidden rounded-full bg-white/25">
                <span
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gold-light transition-transform duration-300 ease-linear"
                  style={{ transform: `scaleX(${on && progress.i === i ? progress.p : 0})` }}
                />
              </span>

              {/* resting cards show a play mark */}
              <span
                aria-hidden
                className={`absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 pl-0.5 text-white ring-1 ring-gold-light/90 backdrop-blur-sm transition-[opacity,scale] duration-500 ease-out-expo ${
                  on ? "scale-75 opacity-0" : "opacity-100"
                }`}
              >
                <Icon name="play" size={18} />
              </span>

              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/75 via-black/30 to-transparent" />
              <span className="pointer-events-none absolute inset-x-5 bottom-6 text-center text-[15px] font-medium leading-snug tracking-[0.01em] text-white">
                {reel.caption}
              </span>

              {/* The whole card opens the reel on Instagram (on touch, the first tap plays it). */}
              <a
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${reel.caption} — watch on Instagram${NEW_TAB}`}
                onClick={(e) => {
                  if (pointerType.current !== "mouse" && i !== playing && !reduced) {
                    e.preventDefault();
                    lastTouch.current = Date.now();
                    setActive(i);
                  }
                }}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-offset-[-3px]"
              />

              {/* sound toggle on the reel that's playing */}
              {reel.video && (
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Turn sound on" : "Turn sound off"}
                  aria-pressed={!muted}
                  className={`absolute right-3 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/25 backdrop-blur-sm transition-opacity duration-500 hover:bg-black/55 ${
                    on ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  tabIndex={on ? 0 : -1}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                    {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />}
                  </svg>
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
