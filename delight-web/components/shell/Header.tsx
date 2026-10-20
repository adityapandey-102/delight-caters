"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { group, nav } from "@/lib/content/group";
import { offersForPath } from "@/lib/content/offers";
import { PromoRibbon } from "@/modules/showcase/components/PromoRibbon";
import { lockScroll, unlockScroll } from "./SmoothScroll";

type NavItem = (typeof nav)[number];
type Parent = Extract<NavItem, { children: readonly unknown[] }>;
const hasChildren = (item: NavItem): item is Parent => "children" in item;

const desktopItems = nav.filter((i) => i.href !== "/");
const divisions = nav.filter(hasChildren);
/** Sections the bar should read as dark glass over. */
const DARK_SURFACES = "[data-nav-dark], .bg-black, .bg-onyx-ink, .onyx-velvet";

/**
 * Apple-style global nav: a slim glass bar (dark over the opening film, light
 * once the page moves), the logo as home, evenly spaced links, and a
 * full-width flyout for each division — big links to its brands, then quick
 * actions — that blurs the page beneath. Under the bar runs the marketing
 * ribbon (offers for the section in view first); it shows at the top of every
 * page and folds away once you scroll. Phones get a light full-screen sheet.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** True while the bar sits over a dark section (black films, photo heroes) — the bar turns dark glass there, as Apple's does. */
  const [overDark, setOverDark] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menu, setMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const promoItems = useMemo(() => offersForPath(pathname), [pathname]);

  useEffect(() => {
    let frame = 0;
    const probe = () => {
      frame = 0;
      setAtTop(window.scrollY < 120);
      // Look just below the whole header (bar + ribbon) at what the page shows there.
      const y = (headerRef.current?.getBoundingClientRect().bottom ?? 52) + 4;
      const el = document.elementFromPoint(24, y);
      if (!el || el.closest("dialog")) return; // an open popup: keep the tone of the page behind it
      setOverDark(!!el.closest(DARK_SURFACES));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(probe);
    };
    probe();
    const settle = [300, 1200].map((ms) => window.setTimeout(probe, ms)); // after fonts and images settle
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("close", onScroll, true); // a dialog closing reveals the page again
    return () => {
      document.removeEventListener("close", onScroll, true);
      cancelAnimationFrame(frame);
      settle.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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

  // Close the sheet and any flyout whenever the route changes.
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
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  };

  const light = !overDark || !!menu || open;
  const active = divisions.find((d) => d.label === menu);

  return (
    <>
      {/* The page dims and blurs beneath an open flyout (Apple's curtain). */}
      <div
        aria-hidden
        className={`fixed inset-0 z-40 hidden bg-[rgba(232,232,230,0.4)] backdrop-blur-[18px] transition-opacity duration-500 lg:block ${
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50" onPointerLeave={closeMenuSoon}>
        <div
          className={`relative transition-colors duration-500 ${
            light
              ? "bg-[rgba(250,250,248,0.8)] text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)]"
              : "bg-[rgba(18,18,19,0.42)] text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]"
          } backdrop-blur-2xl backdrop-saturate-[1.8]`}
        >
          <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1080px] items-center justify-between gap-6 px-5">
            <Link href="/" aria-label={`${group.name} — home`} className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80" onPointerEnter={closeMenuSoon}>
              <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} loading="eager" sizes="28px" className="h-[26px] w-auto" />
              <Image
                src="/brand/zyra-word.png"
                alt={group.shortName}
                width={698}
                height={187}
                loading="eager"
                sizes="64px"
                className="h-[14px] w-auto"
              />
            </Link>

            <nav aria-label="Main" className="hidden flex-1 items-center justify-center lg:flex">
              <ul className="flex items-center gap-1">
                {desktopItems.map((item) => {
                  const current = isActive(item.href);
                  const base = `block rounded-full px-3.5 py-1.5 text-[12.5px] tracking-[-0.005em] transition-opacity duration-300 ${
                    current ? "opacity-100 font-medium" : "opacity-75 hover:opacity-100"
                  }`;
                  if (!hasChildren(item))
                    return (
                      <li key={item.href} onPointerEnter={closeMenuSoon}>
                        <Link href={item.href} aria-current={current ? "page" : undefined} className={`${base} ${item.href === "/offers" ? "inline-flex items-center gap-1.5" : ""}`}>
                          {item.label}
                          {item.href === "/offers" && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />}
                        </Link>
                      </li>
                    );
                  return (
                    <li key={item.href} onPointerEnter={() => openMenu(item.label)}>
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        aria-expanded={menu === item.label}
                        aria-controls="nav-flyout"
                        onFocus={() => openMenu(item.label)}
                        className={base}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2" onPointerEnter={closeMenuSoon}>
              <a href="#enquiry" className="btn-gold shine hidden !px-3.5 !py-1.5 !text-[12.5px] sm:inline-flex">
                Plan your event
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              >
                <span aria-hidden className="relative block h-2.5 w-[17px]">
                  <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-400 ease-out-expo ${open ? "top-[4.5px] rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-400 ease-out-expo ${open ? "top-[4.5px] -rotate-45" : "top-[9px]"}`} />
                </span>
              </button>
            </div>
          </div>

          {/* The marketing ribbon: shown at the top of the page, folded away on scroll */}
          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] ${
              atTop && !menu && !open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <PromoRibbon items={promoItems} tone={light ? "light" : "dark"} />
            </div>
          </div>

          {/* Flyout: one panel that grows open under the bar */}
          <div
            id="nav-flyout"
            onPointerEnter={() => menu && openMenu(menu)}
            className={`hidden overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] lg:grid ${
              menu ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0">
              {active && (
                <div key={active.label} className="mx-auto grid w-full max-w-[1080px] grid-cols-[1.4fr_1fr_1fr] gap-10 px-5 pb-14 pt-8">
                  <FlyoutColumn title={`Explore Delight ${active.label}`} delay={0}>
                    {active.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block py-1 font-display text-[24px] font-semibold tracking-[-0.025em] text-ink transition-colors hover:text-gold-deep">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href={active.href} className="mt-1 block py-1 font-display text-[24px] font-semibold tracking-[-0.025em] text-muted transition-colors hover:text-gold-deep">
                        {active.label === "Hospitality" ? "All hotels" : "All of Eatry"}
                      </Link>
                    </li>
                  </FlyoutColumn>
                  <FlyoutColumn title="At a glance" delay={60}>
                    {active.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block py-1.5 text-[12.5px] font-medium text-body transition-colors hover:text-gold-deep">
                          {c.label} <span className="font-normal text-muted">· {c.note}</span>
                        </Link>
                      </li>
                    ))}
                  </FlyoutColumn>
                  <FlyoutColumn title="Plan" delay={120}>
                    <li>
                      <a href="#enquiry" onClick={() => setMenu(null)} className="block py-1.5 text-[12.5px] font-medium text-body hover:text-gold-deep">
                        Plan your event
                      </a>
                    </li>
                    <li>
                      <Link href="/contact" className="block py-1.5 text-[12.5px] font-medium text-body hover:text-gold-deep">
                        Contact the group
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="block py-1.5 text-[12.5px] font-medium text-body hover:text-gold-deep">
                        About Zyra
                      </Link>
                    </li>
                  </FlyoutColumn>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Phones: a light full-screen sheet */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-[rgba(250,250,248,0.97)] backdrop-blur-2xl transition-opacity duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-8 pb-10 pt-[calc(var(--header-h)+1.25rem)]">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <div
                key={item.href}
                className="transition-all duration-500 ease-out-expo"
                style={{ transform: open ? "none" : "translateY(-8px)", opacity: open ? 1 : 0, transitionDelay: `${60 + i * 40}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-1.5 font-display text-[28px] font-semibold tracking-[-0.03em] ${isActive(item.href) ? "text-gold-deep" : "text-ink"}`}
                >
                  {hasChildren(item) ? `Delight ${item.label}` : item.label}
                </Link>
                {hasChildren(item) && (
                  <ul className="mb-3 mt-1 grid gap-0.5">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-10 items-center justify-between gap-3 text-[17px] ${pathname === c.href ? "text-gold-deep" : "text-body"}`}
                        >
                          {c.label}
                          <span className="text-[13px] text-muted">{c.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <a href="#enquiry" onClick={() => setOpen(false)} className="btn-onyx shine w-full">
              Plan your event
            </a>
            <p className="mt-5 text-center text-[13px] text-muted">{group.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function FlyoutColumn({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <div className="animate-[flyout-in_0.5s_cubic-bezier(0.28,0.11,0.32,1)_both]" style={{ animationDelay: `${delay}ms` }}>
      <p className="text-[12px] text-muted">{title}</p>
      <ul className="mt-3">{children}</ul>
    </div>
  );
}
