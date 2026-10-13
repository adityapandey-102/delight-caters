"use client";

import { Fragment, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ Reveal */

/** Fades its content (or, with `stagger`, each direct child) up into place once, on scroll. */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
  delay = 0,
  y = 30,
  start = "top 84%",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: boolean;
  delay?: number;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------- LineReveal */

/**
 * Display headings rise line-by-line from behind a mask. Each line is passed
 * separately so the roman/italic pairing stays intact.
 */
export function LineReveal({
  lines,
  as: Tag = "h2",
  className = "",
  italicFrom,
  start = "top 86%",
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Index from which lines render as gold serif italic. */
  italicFrom?: number;
  start?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll<HTMLElement>("[data-line] > span");
    if (!inner.length) return;

    if (prefersReducedMotion()) {
      gsap.set(inner, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.25,
          delay,
          ease: "power4.out",
          stagger: 0.11,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [lines, start, delay]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line + i} data-line className="block overflow-hidden pb-[0.06em]">
          <span
            className={`block will-change-transform ${italicFrom !== undefined && i >= italicFrom ? "display-italic" : ""}`}
            style={{ opacity: 0 }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------- WordReveal */

/**
 * Statement text: every word starts blurred and pale, then sharpens and
 * darkens as the section scrubs through the viewport. `accent` words take the
 * green, `italic` words the gold serif italic.
 */
export type StatementWord = { text: string; tone?: "plain" | "accent" | "italic" };

export function WordReveal({ lines, className = "" }: { lines: StatementWord[][]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>(".word"));
    if (!words.length) return;

    if (prefersReducedMotion()) {
      words.forEach((w) => {
        w.style.filter = "none";
        w.style.opacity = "1";
        w.style.color = w.dataset.target ?? "";
      });
      return;
    }

    // Phones: no blur (an animated filter on every word is costly on mobile GPUs) — words fade and darken only.
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) words.forEach((w) => (w.style.filter = "none"));

    const ctx = gsap.context(() => {
      gsap.to(words, {
        ...(mobile ? {} : { filter: "blur(0px)" }),
        opacity: 1,
        color: (i: number) => words[i].dataset.target ?? "var(--color-ink)",
        ease: "none",
        stagger: 0.5,
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 60%", scrub: 0.6 },
      });
    }, el);

    return () => ctx.revert();
  }, [lines]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((w, wi) => (
            // The space sits between the inline-block words, not inside them, or the browser drops it.
            <Fragment key={`${li}-${wi}`}>
              <span
                className={`word ${w.tone === "italic" ? "font-display italic" : ""}`}
                data-target={
                  w.tone === "accent" ? "var(--color-green)" : w.tone === "italic" ? "var(--color-gold-deep)" : "var(--color-ink)"
                }
              >
                {w.text}
              </span>
              {wi < line.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- Counter */

export function Counter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;
    const format = (n: number) => prefix + Math.round(n).toLocaleString("en-IN") + suffix;

    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 2.1,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
