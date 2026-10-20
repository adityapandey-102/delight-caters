"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { group, nav } from "@/lib/content/group";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";
import { lockScroll, unlockScroll } from "./SmoothScroll";

type NavItem = (typeof nav)[number];
type Parent = Extract<NavItem, { children: readonly unknown[] }>;
const hasChildren = (item: NavItem): item is Parent => "children" in item;

/**
 * Fixed, fully transparent bar: the Zyra mark on the left, a glass pill nav in
 * the centre — Hospitality and Eatry open a panel of their brands — and "Plan
 * Your Event" on the right. Every item carries its own soft shadow so it reads
 * over photographs and the cream alike. Phones get a full-screen onyx sheet
 * with the brands grouped under their division.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** Transparent over the dark heroes; once the page moves, the light treatment and a soft cream fade behind the bar. */
  const [scrolled, setScrolled] = useState(false);
  const solid = scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [menu, setMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  // Close the sheet and any panel whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const openMenu = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const closeMenuSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 160);
  };

  const pill = solid
    ? "border-white/70 bg-wall-lit/80 shadow-[0_10px_30px_-10px_rgba(18,20,16,0.35),0_2px_6px_-2px_rgba(18,20,16,0.15)]"
    : "border-white/15 bg-onyx-ink/35 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]";
  const itemTone = (current: boolean) =>
    current
      ? solid
        ? "bg-onyx text-gold-pale"
        : "bg-gold-light text-onyx-ink"
      : solid
        ? "text-body hover:text-onyx"
        : "text-cream/85 hover:text-gold-light";

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_[data-panel]]:pointer-events-auto">
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-[calc(var(--header-h)+32px)] bg-linear-to-b from-wall via-wall/90 to-wall/0 transition-opacity duration-500 ${scrolled && !open ? "opacity-100" : "opacity-0"}`}
        />
        <div className="relative mx-auto flex h-[var(--header-h)] w-full max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-10">
          {/* The Zyra mark and wordmark — shadow only, no plate behind them. */}
          <Link
            href="/"
            aria-label={`${group.name} — home`}
            className={`group relative z-10 flex items-center gap-2.5 transition-[filter] duration-500 ${
              solid || open
                ? "[filter:drop-shadow(0_1px_0_rgba(255,255,255,0.7))_drop-shadow(0_1px_1.5px_rgba(80,45,0,0.5))_drop-shadow(0_6px_14px_rgba(18,20,16,0.2))]"
                : "[filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.85))_drop-shadow(0_2px_8px_rgba(0,0,0,0.55))]"
            }`}
          >
            <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} loading="eager" sizes="40px" className="h-10 w-auto sm:h-11" />
            <Image src="/brand/zyra-word.png" alt={group.shortName} width={698} height={187} loading="eager" sizes="110px" className="h-[22px] w-auto sm:h-6" />
          </Link>

          <nav
            aria-label="Main"
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border p-1 backdrop-blur-xl transition-colors duration-500 lg:flex ${pill}`}
          >
            {nav.map((item) => {
              const current = isActive(item.href);
              if (!hasChildren(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`rounded-full px-4 py-1.5 text-[12.5px] font-medium tracking-[0.04em] transition-colors duration-300 ${itemTone(current)}`}
                  >
                    {item.label}
                  </Link>
                );
              }
              const shown = menu === item.label;
              return (
                <div key={item.href} className="relative" onPointerEnter={() => openMenu(item.label)} onPointerLeave={closeMenuSoon}>
                  <button
                    type="button"
                    aria-expanded={shown}
                    aria-controls={`panel-${item.label}`}
                    onClick={() => (shown ? setMenu(null) : openMenu(item.label))}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12.5px] font-medium tracking-[0.04em] transition-colors duration-300 ${itemTone(current)}`}
                  >
                    {item.label}
                    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-300 ${shown ? "rotate-180" : ""}`}>
                      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* The division's brands */}
                  <div
                    id={`panel-${item.label}`}
                    data-panel
                    className={`absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-3 transition-[opacity,translate,visibility] duration-300 ease-out-expo ${
                      shown ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-wall-lit shadow-[0_30px_60px_-28px_rgba(18,20,16,0.45)]">
                      <div className="relative p-2">
                        <Link href={item.href} className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-wall-warm">
                          <span>
                            <span className="block text-[1.05rem] font-semibold leading-tight tracking-tight text-ink">Delight {item.label}</span>
                            <span className="mt-0.5 block text-[12.5px] text-muted">{item.blurb}</span>
                          </span>
                          <Arrow className="text-gold-deep" />
                        </Link>
                        <div aria-hidden className="gold-hairline mx-4 my-1 opacity-40" />
                        <ul>
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                aria-current={pathname === c.href ? "page" : undefined}
                                className="flex items-baseline justify-between gap-4 rounded-xl px-4 py-2.5 transition-colors hover:bg-wall-warm aria-[current=page]:bg-wall-warm"
                              >
                                <span className="text-[14.5px] font-medium text-ink">{c.label}</span>
                                <span className="text-[12px] text-muted">{c.note}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2.5">
            <a
              href="#enquiry"
              className="btn-gold shine hidden !px-5 !py-2.5 !text-[12.5px] !shadow-[0_10px_26px_-8px_rgba(70,40,0,0.55),0_2px_6px_-2px_rgba(14,16,12,0.3)] sm:inline-flex"
            >
              Plan Your Event
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 transition-colors duration-500 md:backdrop-blur-xl lg:hidden ${
                open
                  ? "bg-gold-light text-onyx-ink ring-gold-light"
                  : solid
                    ? "bg-onyx text-gold-pale shadow-[0_10px_26px_-10px_rgba(18,20,16,0.6)] ring-onyx"
                    : "bg-onyx-ink/70 text-cream shadow-[0_10px_26px_-12px_rgba(0,0,0,0.5)] ring-white/20 md:bg-onyx-ink/40"
              }`}
            >
              <span aria-hidden className="relative block h-2.5 w-[18px]">
                <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-400 ease-out-expo ${open ? "top-[4.5px] rotate-45" : "top-0"}`} />
                <span
                  className={`absolute h-[1.5px] rounded-full bg-current transition-all duration-400 ease-out-expo ${
                    open ? "left-0 top-[4.5px] w-full -rotate-45" : "right-0 top-[9px] w-3/5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`onyx-velvet fixed inset-0 z-40 overflow-y-auto transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div aria-hidden className="grain" />
        <div className="relative flex min-h-full flex-col px-7 pb-10 pt-[calc(var(--header-h)+1.5rem)]">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <div
                key={item.href}
                className="border-b border-gold-light/15 py-3.5 transition-all duration-500"
                style={{ transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0, transitionDelay: `${90 + i * 55}ms` }}
              >
                <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4">
                  <span className="text-[10px] font-medium tracking-[0.24em] text-gold-light/70">0{i + 1}</span>
                  <span className={`font-display text-[2rem] font-semibold leading-tight ${isActive(item.href) ? "text-gold-light" : "text-cream"}`}>
                    {hasChildren(item) ? `Delight ${item.label}` : item.label}
                  </span>
                </Link>
                {hasChildren(item) && (
                  <ul className="mt-2 grid gap-1 pl-9">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-10 items-center justify-between gap-3 text-[15px] ${pathname === c.href ? "text-gold-light" : "text-cream/80"}`}
                        >
                          {c.label}
                          <span className="text-[11.5px] text-cream-muted/70">{c.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <a href="#enquiry" onClick={() => setOpen(false)} className="btn-gold shine w-full">
              Plan Your Event
            </a>
            <p className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] uppercase tracking-[0.24em] text-gold-light/70">
              <Icon name="sparkle" size={12} /> {group.tagline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
