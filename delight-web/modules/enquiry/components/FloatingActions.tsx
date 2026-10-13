"use client";

import { useSyncExternalStore } from "react";
import { contact, hero, whatsappHref } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";

/* Shown once the visitor has scrolled past ~60% of the first screen. */
function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
const pastFold = () => window.scrollY > window.innerHeight * 0.6;
const serverPastFold = () => false;

/**
 * While browsing, WhatsApp (and on phones "Plan Your Event") stay in reach.
 * 640px and up, where the header already shows "Plan Your Event": just a round
 * WhatsApp button, bottom right, with a label on hover. Phones: one floating
 * pill bar (Plan Your Event, call, WhatsApp) above the home indicator. "Plan
 * Your Event" is an a[href="#enquiry"], so it opens the enquiry popup. Sits
 * under the mobile menu (z-40) and the header (z-50).
 */
export function FloatingActions() {
  const shown = useSyncExternalStore(subscribe, pastFold, serverPastFold);
  const motion = `transition-[opacity,translate] duration-500 ease-out-expo ${
    shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
  }`;

  return (
    <div inert={!shown} className="print:hidden">
      {/* Tablets and up */}
      <div className={`fixed bottom-6 right-6 z-30 hidden sm:block lg:bottom-8 lg:right-8 ${motion}`}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green text-gold-light shadow-[0_18px_40px_-14px_rgba(1,30,14,0.6)] ring-1 ring-gold-light/40 transition-[translate,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-green-deep hover:ring-gold-light/70"
        >
          <Icon name="whatsapp" size={25} />
          {/* A quiet label that slides out on hover / keyboard focus */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-green-deep px-4 py-2 text-[12.5px] font-medium tracking-[0.02em] text-cream opacity-0 shadow-[0_14px_30px_-14px_rgba(1,30,14,0.7)] ring-1 ring-gold-light/30 transition-[opacity,translate] duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          >
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Phones */}
      <div
        className={`fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-30 sm:hidden ${motion}`}
      >
        <div className="green-velvet flex items-center gap-1.5 rounded-full p-1.5 shadow-[0_20px_44px_-16px_rgba(1,30,14,0.75)] ring-1 ring-gold-light/30">
          <a href="#enquiry" className="btn-gold shine min-h-11 flex-1 px-4 py-0 text-[13.5px]">
            <Icon name="sparkle" size={15} />
            {hero.primaryCta}
          </a>
          <a
            href={contact.phoneHref}
            aria-label={`Call ${contact.phoneDisplay}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gold-light ring-1 ring-gold-light/30 transition-colors active:bg-gold-light/15"
          >
            <Icon name="phone" size={18} />
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gold-light ring-1 ring-gold-light/30 transition-colors active:bg-gold-light/15"
          >
            <Icon name="whatsapp" size={19} />
          </a>
        </div>
      </div>
    </div>
  );
}
