"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, initGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis owns the scroll position, so `overflow: hidden` on the document does
 * NOT stop the page moving — Lenis keeps translating it. Anything that needs a
 * scroll lock (the mobile menu) must call `lockScroll` / `unlockScroll`.
 */
let instance: Lenis | null = null;
let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    instance?.stop();
    document.documentElement.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    instance?.start();
    document.documentElement.style.overflow = "";
  }
}

/** Smoothly scrolls to an element through Lenis when it's running. */
export function scrollToElement(el: HTMLElement, offset = -96) {
  if (instance) instance.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);

  // New route: jump to top, drop any stale lock, and re-measure every trigger.
  useEffect(() => {
    locks = 0;
    document.documentElement.style.overflow = "";
    instance?.start();
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
