"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A photograph drifting slowly inside its frame as the page scrolls. Fills the
 * nearest positioned ancestor with 10% to spare above and below, and travels
 * `amount` percent of its own height each way (keep it at 8 or less).
 */
export default function Parallax({ children, amount = 6 }: { children: ReactNode; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Tablets and up only: on phones the photo simply sits still (smoother scrolling).
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className="absolute inset-x-0 -top-[10%] -bottom-[10%] will-change-transform">
      {children}
    </div>
  );
}
