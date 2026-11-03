"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers ScrollTrigger once and sets the site's default easing. */
export function initGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  registered = true;
  return gsap;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Phones, tablets and anything touch-first: no scroll-scrubbed effects, lighter entrances. */
export const MOBILE_QUERY = "(max-width: 767px), (pointer: coarse)";
/** The complement, for `gsap.matchMedia()`: scroll-scrubbed parallax and similar effects live here. */
export const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

export const isTouchOrSmall = () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

export { gsap, ScrollTrigger };
