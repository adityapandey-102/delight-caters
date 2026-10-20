"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Post } from "@/lib/content/social";

type Feed = { key: string; label: string; posts: Post[] };

/**
 * "From our feed." — the brands' social posts as one long strip at their own
 * shapes (square, portrait, story), in tabs per feed. Drag, swipe or use the
 * arrows; every post opens on the brand's Instagram or its page. One screen
 * tall on desktop.
 */
export function PostsWall({ feeds }: { feeds: Feed[] }) {
  const [feed, setFeed] = useState(feeds[0]?.key);
  const track = useRef<HTMLUListElement>(null);
  const current = feeds.find((f) => f.key === feed) ?? feeds[0];
  if (!current) return null;

  const scrollBy = (dir: number) => {
    const t = track.current;
    if (t) t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: "smooth" });
  };
  const choose = (key: string) => {
    setFeed(key);
    track.current?.scrollTo({ left: 0 });
  };

  return (
    <section id="posts" className="scroll-mt-[120px] overflow-hidden bg-wall-lit py-16 md:py-24 lg:py-[6vh]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">On social</p>
          <h2 className="display mt-2 text-[clamp(2.2rem,5vw,3.5rem)]">
            From our <span className="display-italic">feed.</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div role="tablist" aria-label="Feeds" className="flex gap-1 rounded-full bg-black/[0.05] p-1">
            {feeds.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={f.key === current.key}
                aria-controls="posts-track"
                onClick={() => choose(f.key)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300 ${
                  f.key === current.key ? "bg-white text-ink shadow-[0_6px_16px_-10px_rgba(18,20,16,0.5)]" : "text-muted hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Earlier posts" className="glass-icon hidden h-11 w-11 items-center justify-center rounded-full md:flex">
            <Chevron dir="left" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="More posts" className="glass-icon hidden h-11 w-11 items-center justify-center rounded-full md:flex">
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <ul
        id="posts-track"
        ref={track}
        key={current.key}
        role="tabpanel"
        className="no-scrollbar mt-10 flex snap-x gap-3 overflow-x-auto px-[max(1.5rem,calc((100vw-1180px)/2+1.5rem))] scroll-px-[max(1.5rem,calc((100vw-1180px)/2+1.5rem))] lg:mt-[4vh]"
      >
        {current.posts.map((p, i) => {
          const external = !p.href.startsWith("/");
          return (
            <li key={p.src} className="shrink-0 snap-start animate-[flyout-in_0.6s_cubic-bezier(0.28,0.11,0.32,1)_both]" style={{ animationDelay: `${Math.min(i, 6) * 50}ms` }}>
              <a
                href={p.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative block h-[min(62vh,460px)] overflow-hidden rounded-[22px] bg-onyx-ink lg:h-[calc(100vh-330px)] lg:max-h-[620px]"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
              >
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 420px, 70vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between gap-3 bg-linear-to-t from-black/80 to-transparent p-4 pt-12 text-white opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="min-w-0">
                    <span className="block text-[12px] font-semibold text-gold-light">{p.brand}</span>
                    <span className="block truncate text-[14px] font-medium">{p.alt}</span>
                  </span>
                  <span className="shrink-0 text-[13px] text-white/80">{external ? "Instagram ↗" : "Visit ›"}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path d={dir === "left" ? "M8.5 3 4.5 7l4 4" : "M5.5 3l4 4-4 4"} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
