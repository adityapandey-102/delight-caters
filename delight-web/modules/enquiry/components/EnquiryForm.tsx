"use client";

import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { eventTypes, foodTypes } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";
import {
  emptyEnquiry,
  enquiryFields,
  localIsoDate,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "../lib/enquirySchema";
import { whatsappEnquiryUrl } from "../lib/whatsapp";

type Tone = "light" | "dark";

/* Today's date, read only in the browser (the server snapshot is empty), so
   the date picker can't offer days that have passed. */
const noSubscribe = () => () => {};
const readToday = () => localIsoDate(new Date());
const serverToday = () => "";

const TONES = {
  light: {
    title: "text-onyx",
    sub: "text-muted",
    label: "text-onyx-ink/80",
    field: "bg-wall/60 placeholder:text-faint focus:bg-wall-lit [&_option]:text-ink",
    border: "border-line hover:border-onyx/35 focus:border-onyx focus:ring-onyx/15",
    text: "text-ink",
    textEmpty: "text-faint",
    invalid: "border-[#b4472f] focus:border-[#b4472f] focus:ring-[#b4472f]/15",
    error: "text-[#9b2c1f]",
    chevron: "text-onyx/70",
    pills: "bg-wall/60",
    pillsBorder: "border-line",
    pill: "text-body hover:text-onyx has-checked:bg-onyx has-checked:text-gold-pale has-checked:shadow-[0_8px_18px_-10px_rgba(18,20,16,0.7)]",
    button: "btn-onyx shine",
    helper: "text-muted",
    done: { badge: "bg-onyx text-gold-light", note: "text-body", link: "text-onyx" },
  },
  dark: {
    title: "on-dark",
    sub: "text-cream-muted",
    label: "text-gold-light/85",
    field: "bg-white/5 placeholder:text-cream/40 focus:bg-white/8 [color-scheme:dark] [&_option]:bg-onyx-deep [&_option]:text-cream",
    border: "border-gold-light/25 hover:border-gold-light/45 focus:border-gold-light focus:ring-gold-light/20",
    text: "text-cream",
    textEmpty: "text-cream/45",
    invalid: "border-[#f0a08c] focus:border-[#f0a08c] focus:ring-[#f0a08c]/20",
    error: "text-[#f6bfae]",
    chevron: "text-gold-light/80",
    pills: "bg-white/5",
    pillsBorder: "border-gold-light/25",
    pill: "text-cream/80 hover:text-cream has-checked:bg-linear-to-r has-checked:from-[#a87f26] has-checked:via-gold-light has-checked:to-gold has-checked:text-onyx-ink",
    button: "btn-gold shine",
    helper: "text-cream/55",
    done: { badge: "bg-gold-light/15 text-gold-light ring-1 ring-gold-light/40", note: "text-cream-muted", link: "text-gold-light" },
  },
} as const;

/**
 * The enquiry form, with the old site's fields and words. It checks the
 * details in the browser, then opens WhatsApp with them typed in (the old
 * site's message, word for word) and says thank you. `tone="dark"` sits on
 * green velvet (the popup); `light` on a lit card (the contact page).
 */
export function EnquiryForm({
  tone = "light",
  titleId,
  idPrefix,
  heading,
  intro,
  onSent,
  compact = false,
}: {
  tone?: Tone;
  /** Put on whichever heading is showing (the form's, or "Thank you!") — e.g. for a dialog's aria-labelledby. */
  titleId?: string;
  /** Keeps ids unique when two forms share a page. */
  idPrefix?: string;
  /** Optional heading over the fields: a roman line and a gold italic line. */
  heading?: readonly [string, string?];
  intro?: ReactNode;
  /** Called once WhatsApp has been opened (the dialog uses it to start fresh next time). */
  onSent?: () => void;
  /** Tighter spacing and a smaller heading, so the whole form fits the popup without scrolling. */
  compact?: boolean;
}) {
  const t = TONES[tone];
  const autoId = useId();
  const pid = idPrefix ?? `enq${autoId}`;
  const id = (field: string) => `${pid}-${field}`;
  const headingId = titleId ?? id("title");

  const today = useSyncExternalStore(noSubscribe, readToday, serverToday);
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

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
    // With "noopener" the browser returns null either way, so the thank-you
    // note always carries a link in case a popup blocker stopped it.
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
    onSent?.();
    requestAnimationFrame(() => doneRef.current?.focus());
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateEnquiry(values, { today: localIsoDate(new Date()) });
    if (!result.success) {
      setErrors(result.errors);
      // Take the visitor to the first thing that needs fixing; its message is read out with it.
      const first = enquiryFields.find((f) => result.errors[f]);
      if (first) {
        const target = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
        target?.focus();
      }
      return;
    }
    setErrors({});
    submitEnquiry(result.data);
  }

  function reset() {
    setValues(emptyEnquiry);
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
          our team will get back to you.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className={`text-[13px] ${t.helper}`}>WhatsApp didn&rsquo;t open?</p>
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={`${t.button} min-h-12`}>
            <Icon name="whatsapp" size={18} /> Open WhatsApp
          </a>
          <button
            type="button"
            onClick={reset}
            className={`min-h-11 px-3 text-[13px] font-semibold underline-offset-4 hover:underline ${t.done.link}`}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  /** `empty` greys the text of a select or date that still shows its placeholder. */
  const fieldClass = (field: EnquiryField, empty = false) =>
    `block w-full ${compact ? "min-h-11 py-2.5" : "min-h-12 py-3"} rounded-xl border px-4 text-base outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:ring-4 ${t.field} ${
      empty ? t.textEmpty : t.text
    } ${errors[field] ? t.invalid : t.border}`;
  const labelClass = `mb-2 block text-[11.5px] font-medium uppercase tracking-[0.16em] ${t.label}`;
  const describe = (field: EnquiryField) => (errors[field] ? id(`${field}-error`) : undefined);
  const errorText = (field: EnquiryField) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className={`mt-1.5 text-[13px] leading-snug ${t.error}`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby={heading ? headingId : undefined} className="@container">
      {heading && (
        <div className={compact ? "mb-4" : "mb-7"}>
          <h2 id={headingId} className={`display ${compact ? "text-[clamp(1.7rem,5vw,2.2rem)]" : "text-[clamp(2rem,6vw,2.75rem)]"} ${t.title}`}>
            <span className="block">{heading[0]}</span>
            {heading[1] && <span className="display-italic block">{heading[1]}</span>}
          </h2>
          {intro && <p className={`${compact ? "mt-2 text-[13.5px] leading-[1.6] max-sm:hidden" : "mt-3 text-[14.5px] leading-[1.7]"} ${t.sub}`}>{intro}</p>}
        </div>
      )}

      <div className={`grid ${compact ? "grid-cols-2 gap-x-3 gap-y-3" : "gap-x-4 gap-y-5 @md:grid-cols-2"}`}>
        <div className={compact ? "@max-md:col-span-2" : undefined}>
          <label htmlFor={id("name")} className={labelClass}>
            Your Name
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

        <div className={compact ? "@max-md:col-span-2" : undefined}>
          <label htmlFor={id("phone")} className={labelClass}>
            Phone Number
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={18}
            placeholder="Enter your number"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            className={fieldClass("phone")}
          />
          {errorText("phone")}
        </div>

        <div className={compact ? "@max-md:col-span-2" : undefined}>
          <label htmlFor={id("eventType")} className={labelClass}>
            Event Type
          </label>
          <div className="relative">
            <select
              id={id("eventType")}
              name="eventType"
              value={values.eventType}
              onChange={(e) => set("eventType", e.target.value)}
              aria-invalid={!!errors.eventType}
              aria-describedby={describe("eventType")}
              className={`${fieldClass("eventType", !values.eventType)} appearance-none pr-11`}
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 ${t.chevron}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 7.5l5 5 5-5" />
            </svg>
          </div>
          {errorText("eventType")}
        </div>

        <div>
          <label htmlFor={id("eventDate")} className={labelClass}>
            Date of Event
          </label>
          <input
            id={id("eventDate")}
            name="eventDate"
            type="date"
            min={today || undefined}
            value={values.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
            aria-invalid={!!errors.eventDate}
            aria-describedby={describe("eventDate")}
            className={`${fieldClass("eventDate", !values.eventDate)} appearance-none [&::-webkit-date-and-time-value]:text-left`}
          />
          {errorText("eventDate")}
        </div>

        <div>
          <label htmlFor={id("guests")} className={labelClass}>
            Number of Guests
          </label>
          <input
            id={id("guests")}
            name="guests"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={8}
            placeholder="e.g. 100"
            value={values.guests}
            onChange={(e) => set("guests", e.target.value)}
            aria-invalid={!!errors.guests}
            aria-describedby={describe("guests")}
            className={fieldClass("guests")}
          />
          {errorText("guests")}
        </div>

        <fieldset
          role="radiogroup"
          aria-labelledby={id("foodType-label")}
          aria-invalid={!!errors.foodType}
          aria-describedby={describe("foodType")}
          className={`min-w-0 ${compact ? "@max-md:col-span-2" : ""}`}
        >
          <legend id={id("foodType-label")} className={labelClass}>
            Veg / Non-Veg
          </legend>
          <div
            className={`flex min-h-12 gap-1 rounded-full border p-1 ${t.pills} ${errors.foodType ? t.invalid : t.pillsBorder}`}
          >
            {foodTypes.map((type) => (
              <label
                key={type}
                className={`relative flex min-h-10 flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-1 text-[14px] font-medium transition-[background-color,color,box-shadow] duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold ${t.pill}`}
              >
                <input
                  type="radio"
                  name="foodType"
                  value={type}
                  checked={values.foodType === type}
                  onChange={() => set("foodType", type)}
                  className="sr-only"
                />
                {type}
              </label>
            ))}
          </div>
          {errorText("foodType")}
        </fieldset>

        <div className={compact ? "col-span-2" : "@md:col-span-2"}>
          <label htmlFor={id("message")} className={labelClass}>
            Additional Details (optional)
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={compact ? 2 : 3}
            maxLength={1000}
            placeholder="Any specific cuisine, budget, or requirements..."
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={describe("message")}
            className={`${fieldClass("message")} ${compact ? "min-h-16" : "min-h-24"} resize-y`}
          />
          {errorText("message")}
        </div>
      </div>

      <button type="submit" className={`${t.button} ${compact ? "mt-5 min-h-12" : "mt-7 min-h-13"} w-full text-[14.5px]`}>
        <Icon name="whatsapp" size={19} />
        Send Enquiry on WhatsApp
      </button>
      <p className={`mt-3 text-center text-[12.5px] leading-snug ${t.helper}`}>
        You&rsquo;ll be redirected to WhatsApp with your details pre-filled
      </p>
    </form>
  );
}
