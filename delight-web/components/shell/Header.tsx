"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, contact, nav, whatsappHref } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";
import { lockScroll, unlockScroll } from "./SmoothScroll";

/**
 * Fixed bar: the gold mark on the left, a pill nav in the centre, and "Plan
 * Your Event" on the right. Transparent over the hero, then the wall with a
 * blur once the page moves. Phones get a full-screen green sheet.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Close the sheet whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid && !open ? "bg-wall/85 shadow-[0_10px_30px_-24px_rgba(1,43,21,0.5)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-10">
          <Link href="/" className="group relative z-10 flex items-center" aria-label={`${company.name} — home`}>
            <Image
              src="/brand/logo-gold.png"
              alt={company.name}
              width={1200}
              height={634}
              loading="eager"
              sizes="100px"
              className={`h-10 w-auto object-contain transition-[opacity,filter] duration-500 group-hover:opacity-85 sm:h-11 ${
                solid || open ? "drop-shadow-[0_2px_6px_rgba(107,69,7,0.25)]" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]"
              }`}
            />
          </Link>

          {/* Slim pill nav: dark glass over the hero photographs, cream once the page moves. */}
          <nav
            aria-label="Main"
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border p-1 backdrop-blur-xl transition-colors duration-500 lg:flex ${
              solid ? "border-line bg-wall-lit/75" : "border-white/15 bg-green-ink/35"
            }`}
          >
            {nav.map((item) => {
              const current = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-full px-4 py-1.5 text-[12.5px] font-medium tracking-[0.04em] transition-colors duration-300 ${
                    current
                      ? solid
                        ? "bg-green text-gold-pale"
                        : "bg-gold-light text-green-ink"
                      : solid
                        ? "text-body hover:text-green"
                        : "text-cream/85 hover:text-gold-light"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2.5">
            <a href="#enquiry" className="btn-gold shine hidden !px-5 !py-2.5 !text-[12.5px] sm:inline-flex">
              Plan Your Event
            </a>

            {/* Mobile menu: a labelled pill; its two lines fold into a cross when open. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`flex h-10 items-center gap-2.5 rounded-full pl-3.5 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] ring-1 backdrop-blur-xl transition-colors duration-500 lg:hidden ${
                open
                  ? "bg-gold-light text-green-ink ring-gold-light"
                  : solid
                    ? "bg-green text-gold-pale ring-green"
                    : "bg-green-ink/40 text-cream ring-white/20"
              }`}
            >
              <span aria-hidden className="relative block h-2.5 w-[18px]">
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-400 ease-out-expo ${
                    open ? "top-[4.5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] rounded-full bg-current transition-all duration-400 ease-out-expo ${
                    open ? "left-0 top-[4.5px] w-full -rotate-45" : "right-0 top-[9px] w-3/5"
                  }`}
                />
              </span>
              <span className="w-[38px] text-left">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`green-velvet fixed inset-0 z-40 overflow-y-auto transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div aria-hidden className="grain" />
        <div className="relative flex min-h-full flex-col px-7 pb-10 pt-[calc(var(--header-h)+2rem)]">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-gold-light/15 py-4 transition-all duration-500"
                style={{
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transitionDelay: `${90 + i * 55}ms`,
                }}
              >
                <span className="text-[10px] font-medium tracking-[0.24em] text-gold-light/70">0{i + 1}</span>
                <span className={`font-display text-4xl font-semibold ${isActive(item.href) ? "text-gold-light" : "text-cream"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <a href="#enquiry" onClick={() => setOpen(false)} className="btn-gold shine w-full">
              Plan Your Event
            </a>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={contact.phoneHref} className="btn-ghost-dark !px-4">
                <Icon name="phone" size={16} /> Call
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark !px-4">
                <Icon name="whatsapp" size={16} /> WhatsApp
              </a>
            </div>
            <p className="mt-8 text-center font-script text-2xl text-gold-light/80">{company.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
}
