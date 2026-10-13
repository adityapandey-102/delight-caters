"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Hover states for touch screens. On devices without hover, every descendant
 * matching `selector` gets data-active="true" while it crosses the middle of
 * the viewport, so cards that light up under the mouse also light up as a
 * phone scrolls past them. Style with `group-data-[active=true]:`.
 */
export default function TouchActive({
  children,
  as: Tag = "div",
  className = "",
  selector = "[data-touch]",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  selector?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.target as HTMLElement).dataset.active = e.isIntersecting ? "true" : "false";
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [selector]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
