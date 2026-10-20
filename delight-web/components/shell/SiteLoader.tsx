"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { group } from "@/lib/content/group";

const MIN_MS = 1100;
const MAX_MS = 3200;

/**
 * The opening curtain, on every fresh page load (client navigation inside the
 * site doesn't remount it). The gold mark rises out of a soft blur with a
 * shine sweeping across it; a gold line fills with a percentage beneath; then
 * the content fades and the green curtain parts — the top half lifts, the
 * bottom half drops — onto the page. It lifts once the page has loaded (at
 * least MIN_MS, at most MAX_MS); a CSS-only fallback lifts it even if
 * JavaScript never runs.
 */
export default function SiteLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"loading" | "lifting" | "gone">("loading");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let loaded = document.readyState === "complete";
    let shown = 0;
    let raf = 0;
    let lifted = false;
    const timers: number[] = [];

    const lift = () => {
      if (lifted) return;
      lifted = true;
      setPct(100);
      timers.push(window.setTimeout(() => setPhase("lifting"), reduce ? 0 : 320));
      timers.push(window.setTimeout(() => setPhase("gone"), reduce ? 300 : 1500));
    };

    // The count eases toward 90% while the page loads, then runs to 100% once it has.
    const tick = (now: number) => {
      const elapsed = now - start;
      const target = loaded ? 100 : Math.min(90, 90 * (1 - Math.exp(-elapsed / 900)));
      shown += (target - shown) * 0.12;
      setPct(Math.min(100, Math.round(shown)));
      if ((loaded && elapsed >= MIN_MS && shown > 99) || elapsed >= MAX_MS) return lift();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div ref={ref} className={`site-loader ${phase === "lifting" ? "is-lifting" : ""}`} role="status" aria-label={`${group.name} — loading`}>
      <div aria-hidden className="site-loader__panel site-loader__panel--top onyx-velvet">
      </div>
      <div aria-hidden className="site-loader__panel site-loader__panel--bottom onyx-velvet">
      </div>

      <div aria-hidden className="site-loader__inner">
        <div className="site-loader__mark">
          <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="120px" loading="eager" className="site-loader__logo" />
          <span className="site-loader__shine" />
        </div>
        <Image src="/brand/zyra-word.png" alt="" width={698} height={187} sizes="220px" loading="eager" className="site-loader__word" />

        <div className="site-loader__rule">
          <span className="site-loader__pip" />
          <span className="site-loader__track">
            <span className="site-loader__fill" style={{ transform: `scaleX(${pct / 100})` }} />
          </span>
          <span className="site-loader__pip" />
        </div>

        <div className="site-loader__meta">
          <span className="site-loader__tagline">{group.tagline}</span>
          <span className="site-loader__pct lining-nums">{String(pct).padStart(2, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
