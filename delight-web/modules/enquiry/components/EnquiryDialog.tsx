"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { contact, whatsappHref } from "@/lib/content/site";
import { outletForPath } from "@/lib/content/outlets";
import { group } from "@/lib/content/group";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Icon } from "@/components/ui/Icon";
import { lockScroll, unlockScroll } from "@/components/shell/SmoothScroll";
import { EnquiryForm } from "./EnquiryForm";


/**
 * The enquiry popup: a native <dialog> (styles: .enquiry-dialog in
 * globals.css) opened by every enquiry link ("Book a consultation", "Book a stay", …) — any
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
  /** On an outlet's page, the form starts with that outlet chosen. */
  const outlet = outletForPath(pathname);

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
      if (shownThisLoad || path.current.startsWith("/contact")) return;
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
      <div className="relative rounded-[24px] bg-white shadow-[0_50px_100px_-40px_rgba(22,24,27,0.55)] ring-1 ring-line ring-inset md:grid md:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">

        {/* The photograph, with the mark and the tagline (md and up). It fills
            exactly the form's height, so the popup is only as tall as the form. */}
        <div aria-hidden className="relative hidden overflow-hidden rounded-l-[24px] md:block">
          <div className="absolute inset-0">
            <Image src="/media/sterling-plaza/lobby.webp" alt="" fill sizes="(min-width: 768px) 620px, 1px" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
              <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="60px" className="h-14 w-auto" />
              <p className="mt-4 font-display text-[2.2rem] leading-none tracking-[-0.01em] text-white">{group.tagline}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/75">{group.name} · Bengaluru</p>
            </div>
          </div>
        </div>

        {/* The form */}
        <div className="relative px-5 pb-5 pt-5 sm:px-8 sm:pb-6 sm:pt-7 md:px-9 md:pt-8">
          {/* Stays in reach while the panel scrolls on a phone */}
          <div className="pointer-events-none sticky top-3 z-20 -mb-11 flex justify-end">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className="glass-icon pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          <Eyebrow className="mb-3">Get in touch</Eyebrow>
          <EnquiryForm
            key={`${formKey}-${outlet?.slug ?? "any"}`}
            tone="light"
            titleId={titleId}
            idPrefix="dialog-enquiry"
            adaptive
            defaultOutlet={outlet?.slug}
            compact
            intro="Tell us who you’d like to reach and a little about what you need — we’ll pick it up on WhatsApp."
            onSent={() => {
              sent.current = true;
            }}
          />

          <div className="mt-4 hidden flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line pt-3 text-[13.5px] sm:flex">
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
            >
              <Icon name="phone" size={16} className="text-gold-deep" /> or call {contact.phoneDisplay}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline"
            >
              <Icon name="whatsapp" size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
