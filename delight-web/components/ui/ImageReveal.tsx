"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A photograph that opens up as it arrives: the frame widens from a slight
 * inset while the image inside eases out of a gentle zoom. Runs once, when the
 * frame first comes into view. `className` styles the frame (size, radius).
 */
export function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = frame.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } })
        .fromTo(el, { clipPath: "inset(7% 5% 7% 5% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.6, ease: "power4.out" }, 0)
        .fromTo(inner.current, { scale: 1.14 }, { scale: 1, duration: 2, ease: "power3.out" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={frame} className={className}>
      <div ref={inner} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
