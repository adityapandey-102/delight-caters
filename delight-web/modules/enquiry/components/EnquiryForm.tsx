"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { genericHeading, outletBySlug, outlets, type OutletSlug } from "@/lib/content/outlets";
import { emptyEnquiry, enquiryFields, validateEnquiry, type Enquiry, type EnquiryErrors, type EnquiryField, type EnquiryValues } from "../lib/enquirySchema";
import { whatsappEnquiryUrl } from "../lib/whatsapp";

type Tone = "light" | "dark";

const TONES = {
  light: {
    title: "text-onyx",
    sub: "text-muted",
    label: "text-onyx-ink/80",
    field: "bg-wall/60 placeholder:text-faint focus:bg-wall-lit",
    border: "border-line hover:border-onyx/35 focus:border-onyx focus:ring-onyx/15",
    text: "text-ink",
    invalid: "border-[#b4472f] focus:border-[#b4472f] focus:ring-[#b4472f]/15",
    error: "text-[#9b2c1f]",
    chip: "border-line bg-wall/60 text-body hover:border-onyx/35 has-checked:border-ink has-checked:bg-wall-warm has-checked:text-ink",
    chipNote: "text-muted group-has-checked:text-body",
    group: "text-muted",
    button: "btn-onyx shine",
    helper: "text-muted",
    done: { badge: "bg-wall-warm text-gold-deep ring-1 ring-line", note: "text-body", link: "text-onyx" },
  },
  dark: {
    title: "on-dark",
    sub: "text-cream-muted",
    label: "text-gold-light/85",
    field: "bg-white/5 placeholder:text-cream/40 focus:bg-white/8 [color-scheme:dark]",
    border: "border-gold-light/25 hover:border-gold-light/45 focus:border-gold-light focus:ring-gold-light/20",
    text: "text-cream",
    invalid: "border-[#f0a08c] focus:border-[#f0a08c] focus:ring-[#f0a08c]/20",
    error: "text-[#f6bfae]",
    chip: "border-gold-light/25 bg-white/5 text-cream/85 hover:border-gold-light/45 has-checked:border-gold-light has-checked:bg-gold-light has-checked:text-onyx-ink",
    chipNote: "text-cream/50 group-has-checked:text-onyx-ink/60",
    group: "text-cream/55",
    button: "btn-gold shine",
    helper: "text-cream/55",
    done: { badge: "bg-gold-light/15 text-gold-light ring-1 ring-gold-light/40", note: "text-cream-muted", link: "text-gold-light" },
  },
} as const;

const divisions = [...new Set(outlets.map((o) => o.division))];

/**
 * The enquiry form: name, phone, which outlet to reach, and optional details.
 * It checks the details in the browser, then opens WhatsApp with them typed in
 * and says thank you. The heading (with `adaptive`) and the button follow the
 * outlet chosen — "Book a consultation" for Delight Caterers, "Book a stay"
 * for the hotels, "Reserve a table" for Aero Bites.
 */
export function EnquiryForm({
  tone = "light",
  titleId,
  idPrefix,
  adaptive = false,
  intro,
  onSent,
  compact = false,
  defaultOutlet,
}: {
  tone?: Tone;
  /** Put on whichever heading is showing (the form's, or "Thank you!") — e.g. for a dialog's aria-labelledby. */
  titleId?: string;
  /** Keeps ids unique when two forms share a page. */
  idPrefix?: string;
  /** Show a heading that changes with the outlet chosen. */
  adaptive?: boolean;
  intro?: ReactNode;
  /** Called once WhatsApp has been opened (the dialog uses it to start fresh next time). */
  onSent?: () => void;
  /** Tighter spacing, so the whole form fits the popup without scrolling. */
  compact?: boolean;
  /** Preselect the outlet whose page the visitor is on. */
  defaultOutlet?: OutletSlug;
}) {
  const t = TONES[tone];
  const autoId = useId();
  const pid = idPrefix ?? `enq${autoId}`;
  const id = (field: string) => `${pid}-${field}`;
  const headingId = titleId ?? id("title");

  const [values, setValues] = useState<EnquiryValues>({ ...emptyEnquiry, outlet: defaultOutlet ?? "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const chosen = outletBySlug(values.outlet);
  const heading = chosen?.heading ?? genericHeading;
  const action = chosen?.action ?? "Send enquiry";

  function set(field: EnquiryField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  /**
   * Sends the enquiry. Today that means WhatsApp, with the message pre-filled.
   * Phase 2: POST it to delight-api first, so every enquiry is also kept as a lead.
   */
  function submitEnquiry(enquiry: Enquiry) {
    const url = whatsappEnquiryUrl(enquiry);
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
    onSent?.();
    requestAnimationFrame(() => doneRef.current?.focus());
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateEnquiry(values);
    if (!result.success) {
      setErrors(result.errors);
      const first = enquiryFields.find((f) => result.errors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    submitEnquiry(result.data);
  }

  function reset() {
    setValues({ ...emptyEnquiry, outlet: defaultOutlet ?? "" });
    setErrors({});
    setSentUrl(null);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus());
  }

  if (sentUrl) {
    return (
      <div role="status" className="py-4 text-center sm:py-8">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${t.done.badge}`}>
          <Icon name="check" size={30} strokeWidth={1.8} />
        </div>
        <h2 ref={doneRef} id={headingId} tabIndex={-1} className={`display mt-6 text-[2.5rem] outline-none ${t.title}`}>
          Thank you!
        </h2>
        <p className={`mx-auto mt-4 max-w-sm text-[15px] leading-[1.75] ${t.done.note}`}>
          WhatsApp has opened in a new tab with your details filled in. Press <strong className="font-semibold">Send</strong> there and
          {chosen ? ` the ${chosen.name} team` : " our team"} will get back to you.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className={`text-[13px] ${t.helper}`}>WhatsApp didn&rsquo;t open?</p>
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={`${t.button} min-h-12`}>
            <Icon name="whatsapp" size={18} /> Open WhatsApp
          </a>
          <button type="button" onClick={reset} className={`min-h-11 px-3 text-[13px] font-semibold underline-offset-4 hover:underline ${t.done.link}`}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const fieldClass = (field: EnquiryField) =>
    `block w-full ${compact ? "min-h-11 py-2.5" : "min-h-12 py-3"} rounded-xl border px-4 text-base outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:ring-4 ${t.field} ${t.text} ${
      errors[field] ? t.invalid : t.border
    }`;
  const labelClass = `mb-2 block text-[13px] font-medium ${t.label}`;
  const describe = (field: EnquiryField) => (errors[field] ? id(`${field}-error`) : undefined);
  const errorText = (field: EnquiryField) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className={`mt-1.5 text-[13px] leading-snug ${t.error}`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby={adaptive ? headingId : undefined} className="@container">
      {adaptive && (
        <div className={compact ? "mb-5" : "mb-7"}>
          <h2 id={headingId} key={heading.join(" ")} className={`display animate-[flyout-in_0.5s_cubic-bezier(0.28,0.11,0.32,1)_both] ${compact ? "text-[clamp(1.8rem,5vw,2.4rem)]" : "text-[clamp(2rem,6vw,2.75rem)]"} ${t.title}`}>
            {heading[0]} <span className="display-italic">{heading[1]}</span>
          </h2>
          {intro && <p className={`${compact ? "mt-2 text-[14px] leading-[1.55] max-sm:hidden" : "mt-3 text-[15px] leading-[1.65]"} ${t.sub}`}>{intro}</p>}
        </div>
      )}

      <div className={`grid gap-x-3 ${compact ? "gap-y-4" : "gap-y-5"} @md:grid-cols-2`}>
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Your name
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            placeholder="Enter your name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={fieldClass("name")}
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor={id("phone")} className={labelClass}>
            Phone number
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={18}
            placeholder="10-digit mobile number"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            className={fieldClass("phone")}
          />
          {errorText("phone")}
        </div>

        <fieldset aria-invalid={!!errors.outlet} aria-describedby={describe("outlet")} className="min-w-0 @md:col-span-2">
          <legend className={labelClass}>Who would you like to reach?</legend>
          <div className="grid gap-3 @lg:grid-cols-2">
            {divisions.map((d) => (
              <div key={d}>
                <p className={`mb-1.5 text-[12px] ${t.group}`}>{d}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {outlets
                    .filter((o) => o.division === d)
                    .map((o) => (
                      <label
                        key={o.slug}
                        className={`group relative flex min-h-[3.25rem] cursor-pointer flex-col justify-center rounded-xl border px-2.5 py-1.5 text-left transition-[background-color,border-color,color,box-shadow] duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold ${t.chip} ${
                          errors.outlet ? t.invalid : ""
                        }`}
                      >
                        <input type="radio" name="outlet" value={o.slug} checked={values.outlet === o.slug} onChange={() => set("outlet", o.slug)} className="sr-only" />
                        <span className="text-[13.5px] font-semibold leading-tight">{o.name}</span>
                        <span className={`mt-0.5 hidden truncate text-[11.5px] leading-tight @sm:block ${t.chipNote}`}>{o.note}</span>
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
          {errorText("outlet")}
        </fieldset>

        <div className="@md:col-span-2">
          <label htmlFor={id("message")} className={labelClass}>
            Additional details <span className="font-normal opacity-70">(optional)</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={compact ? 2 : 3}
            maxLength={1000}
            placeholder={chosen?.slug === "delight-caterers" ? "Occasion, date, guest count, cuisine…" : "Dates, number of guests, anything we should know…"}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={describe("message")}
            className={`${fieldClass("message")} ${compact ? "min-h-16" : "min-h-24"} resize-y`}
          />
          {errorText("message")}
        </div>
      </div>

      <button type="submit" className={`${t.button} ${compact ? "mt-5 min-h-12" : "mt-7 min-h-13"} w-full text-[15px]`}>
        <Icon name="whatsapp" size={19} />
        {action}
      </button>
      <p className={`mt-3 text-center text-[12.5px] leading-snug ${t.helper}`}>You&rsquo;ll continue on WhatsApp with your details filled in</p>
    </form>
  );
}
