"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { aboutStory, company, contact, contactPage, whatsappHref } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Icon } from "@/components/ui/Icon";
import { lockScroll, unlockScroll } from "@/components/shell/SmoothScroll";
import { EnquiryForm } from "./EnquiryForm";

/** "Let's plan your perfect event" → ["Let's plan your", "perfect event"]: roman over gold italic. */
function splitTitle(title: string): [string, string] {
  const words = title.split(" ");
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}

const HEADING = splitTitle(contactPage.title);

/**
 * The enquiry popup: a native <dialog> (styles: .enquiry-dialog in
 * globals.css) opened by every "Plan Your Event" link — any
 * a[href="#enquiry"] on any page. showModal keeps focus inside and makes the
 * page inert; Esc, the close button and a click on the backdrop close it.
 * Lenis is paused while it's open (data-lenis-prevent lets the panel itself
 * scroll). It also opens by itself on every fresh page load, once the visitor
 * has scrolled three screens (not on the contact page, which has the form
 * inline); after it has been shown, it waits for the next reload.
 * Mounted once, in the site layout.
 */

/** Screens scrolled before the popup offers itself. */
const AUTO_AFTER_SCREENS = 3;
/** Module state lives for one page load: a reload resets it, client navigation doesn't. */
let shownThisLoad = false;

export function EnquiryDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const pathname = usePathname();
  // After a completed send, the next opening starts with a fresh form; a
  // half-filled one survives an accidental close.
  const [formKey, setFormKey] = useState(0);
  const sent = useRef(false);
  const path = useRef(pathname);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    let locked = false;
    let downOnBackdrop = false;

    const open = () => {
      if (dlg.open || typeof dlg.showModal !== "function") return;
      dlg.showModal();
      shownThisLoad = true;
      if (!locked) {
        lockScroll();
        locked = true;
      }
    };
    const release = () => {
      if (locked) {
        unlockScroll();
        locked = false;
      }
    };
    const onClose = () => {
      release();
      if (sent.current) {
        sent.current = false;
        setFormKey((k) => k + 1);
      }
    };

    const onDocumentClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href="#enquiry"]');
      if (!link) return;
      e.preventDefault();
      open();
    };
    // Only a press that starts AND ends on the backdrop closes it — not a text
    // selection dragged out of a field.
    const onPointerDown = (e: PointerEvent) => {
      downOnBackdrop = e.target === dlg;
    };
    const onDialogClick = (e: MouseEvent) => {
      if (downOnBackdrop && e.target === dlg) dlg.close();
      downOnBackdrop = false;
    };

    // Third screen: offer the form once per visit.
    const onScroll = () => {
      if (shownThisLoad || path.current.startsWith("/contact-us")) return;
      if (window.scrollY > window.innerHeight * AUTO_AFTER_SCREENS) open();
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    dlg.addEventListener("pointerdown", onPointerDown);
    dlg.addEventListener("click", onDialogClick);
    dlg.addEventListener("close", onClose);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("scroll", onScroll);
      dlg.removeEventListener("pointerdown", onPointerDown);
      dlg.removeEventListener("click", onDialogClick);
      dlg.removeEventListener("close", onClose);
      if (dlg.open) dlg.close();
      release();
    };
  }, []);

  // A new page (e.g. the back button) shouldn't arrive with the popup still up.
  useEffect(() => {
    path.current = pathname;
    if (ref.current?.open) ref.current.close();
  }, [pathname]);

  return (
    <dialog ref={ref} id="enquiry" aria-labelledby={titleId} className="enquiry-dialog" data-lenis-prevent>
      <div className="green-velvet rounded-[24px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.85)] ring-1 ring-gold-light/35 ring-inset md:grid md:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
        <div aria-hidden className="grain rounded-[24px]" />
        <div aria-hidden className="gold-hairline absolute inset-x-0 top-0 z-10 h-[2px]" />

        {/* The photograph, with the mark and the tagline (md and up). It fills
            exactly the form's height, so the popup is only as tall as the form. */}
        <div aria-hidden className="relative hidden overflow-hidden rounded-l-[24px] md:block">
          <div className="absolute inset-0">
            <Image src={aboutStory.image} alt="" fill sizes="(min-width: 768px) 620px, 1px" className="object-cover object-[center_40%]" />
            <div className="absolute inset-0 bg-linear-to-t from-green-ink via-green-ink/40 to-green-ink/5" />
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
              <Image src="/brand/logo-gold.png" alt="" width={1200} height={634} sizes="160px" className="h-16 w-auto object-contain lg:h-20" />
              <div className="gold-hairline mt-6 w-28 opacity-80" />
              <p className="mt-5 font-script text-[34px] leading-none text-gold-light">{company.tagline}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.26em] text-cream/70">
                {company.name} · {company.city}
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-gold-light/40 to-transparent" />
        </div>

        {/* The form */}
        <div className="relative px-5 pb-5 pt-5 sm:px-8 sm:pb-6 sm:pt-7 md:px-9 md:pt-8">
          {/* Stays in reach while the panel scrolls on a phone */}
          <div className="pointer-events-none sticky top-3 z-20 -mb-11 flex justify-end">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-green-deep/80 text-cream/80 ring-1 ring-gold-light/30 backdrop-blur transition-colors hover:bg-green-deep hover:text-gold-light"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          <Eyebrow onDark className="mb-3">
            Plan Your Event
          </Eyebrow>
          <EnquiryForm
            key={formKey}
            tone="dark"
            titleId={titleId}
            idPrefix="dialog-enquiry"
            heading={HEADING}
            compact
            intro={contactPage.body}
            onSent={() => {
              sent.current = true;
            }}
          />

          <div className="mt-4 hidden flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-gold-light/15 pt-3 text-[13.5px] sm:flex">
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 text-cream/70 transition-colors hover:text-gold-light"
            >
              <Icon name="phone" size={16} className="text-gold-light" /> or call {contact.phoneDisplay}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-light underline-offset-4 hover:underline"
            >
              <Icon name="whatsapp" size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
