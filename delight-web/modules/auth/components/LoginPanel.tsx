"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * DUMMY sign-in (phase 2 preview). One form, two audiences: Customer (the
 * default) and Team. The choice lives in the URL hash — /login#customer,
 * /login#team (#user also means customer) — so either can be linked to
 * directly. Nothing is authenticated yet: submitting says the portal opens
 * with phase 2.
 */

type Who = "customer" | "team";

const fromHash = (hash: string): Who => (hash.replace("#", "").toLowerCase() === "team" ? "team" : "customer");

const COPY = {
  customer: {
    title: ["Welcome", "back."],
    line: "Sign in to see your bookings, meal plans and subscriptions.",
    idLabel: "Mobile number or email",
    idPlaceholder: "98765 43210 or you@email.com",
    idType: "text",
    idAuto: "username",
    button: "Sign in",
  },
  team: {
    title: ["Team", "sign-in."],
    line: "For Zyra staff, managers and consultants.",
    idLabel: "Employee ID",
    idPlaceholder: "e.g. ZG-1024",
    idType: "text",
    idAuto: "username",
    button: "Sign in to the team portal",
  },
} as const;

export function LoginPanel() {
  const [who, setWho] = useState<Who>("customer");
  const [sent, setSent] = useState(false);
  const pid = useId();

  // Follow the hash: on arrival, and when the visitor (or a link) changes it.
  useEffect(() => {
    const sync = () => {
      setWho(fromHash(window.location.hash));
      setSent(false);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (next: Who) => {
    if (next === who) return;
    history.replaceState(null, "", `#${next}`);
    setWho(next);
    setSent(false);
  };

  const c = COPY[who];
  const field =
    "block min-h-12 w-full rounded-xl border border-line bg-wall/60 px-4 py-3 text-base text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-faint hover:border-onyx/35 focus:border-onyx focus:bg-wall-lit focus:ring-4 focus:ring-onyx/15";

  return (
    <div className="w-full max-w-[440px]">
      {/* Customer first, and the default */}
      <div role="tablist" aria-label="Sign in as" className="grid grid-cols-2 gap-1 rounded-full bg-black/[0.05] p-1">
        {(["customer", "team"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            id={`${pid}-${k}`}
            aria-selected={who === k}
            aria-controls={`${pid}-panel`}
            onClick={() => choose(k)}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-full text-[14.5px] font-medium transition-[background-color,color,box-shadow] duration-300 ${
              who === k ? "bg-white text-ink shadow-[0_8px_20px_-12px_rgba(18,20,16,0.55)]" : "text-muted hover:text-ink"
            }`}
          >
            <Icon name={k === "customer" ? "heart" : "briefcase"} size={16} />
            {k === "customer" ? "Customer" : "Team"}
          </button>
        ))}
      </div>

      <div id={`${pid}-panel`} role="tabpanel" aria-labelledby={`${pid}-${who}`} key={who} className="mt-8 animate-[flyout-in_0.5s_cubic-bezier(0.28,0.11,0.32,1)_both]">
        <h1 className="display text-[clamp(2.4rem,5vw,3.4rem)]">
          {c.title[0]} <span className="display-italic">{c.title[1]}</span>
        </h1>
        <p className="mt-3 text-[16px] leading-[1.55] text-muted">{c.line}</p>

        {sent ? (
          <div role="status" className="mt-8 rounded-[22px] border border-gold/30 bg-gold/[0.07] p-6">
            <p className="flex items-center gap-2 font-display text-[19px] font-semibold tracking-[-0.01em] text-ink">
              <Icon name="sparkle" size={17} className="text-gold-deep" />
              {who === "customer" ? "Customer accounts are coming soon" : "The team portal is coming soon"}
            </p>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-body">
              {who === "customer"
                ? "This is a preview of sign-in. Until accounts open, our team will help with bookings and plans on WhatsApp."
                : "This is a preview of the staff sign-in — it opens with the new dashboards."}
            </p>
            <button type="button" onClick={() => setSent(false)} className="link-more mt-4 !text-[14.5px]">
              Back to sign-in
            </button>
          </div>
        ) : (
          <form
            className="mt-8 grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label htmlFor={`${pid}-id`} className="mb-2 block text-[13px] font-medium text-onyx-ink/80">
                {c.idLabel}
              </label>
              <input id={`${pid}-id`} name="id" type={c.idType} autoComplete={c.idAuto} required placeholder={c.idPlaceholder} className={field} />
            </div>
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <label htmlFor={`${pid}-pw`} className="block text-[13px] font-medium text-onyx-ink/80">
                  Password
                </label>
                <a href={who === "customer" ? "#customer" : "#team"} onClick={(e) => (e.preventDefault(), setSent(true))} className="text-[13px] text-gold-deep hover:underline">
                  Forgot password?
                </a>
              </div>
              <input id={`${pid}-pw`} name="password" type="password" autoComplete="current-password" required placeholder="Your password" className={field} />
            </div>
            <label className="flex items-center gap-2.5 text-[14px] text-body">
              <input type="checkbox" name="remember" className="h-4 w-4 accent-[#1d1d1f]" />
              Keep me signed in
            </label>
            <button type="submit" className="btn-onyx shine min-h-12 w-full text-[15px]">
              {c.button}
            </button>
          </form>
        )}

        <p className="mt-8 border-t border-line pt-6 text-[14px] leading-[1.6] text-muted">
          {who === "customer" ? (
            <>
              New to Zyra?{" "}
              <a href="#enquiry" className="font-medium text-ink underline-offset-4 hover:underline">
                Send us an enquiry
              </a>{" "}
              and we&rsquo;ll set you up.
            </>
          ) : (
            <>
              Not on the team?{" "}
              <Link href="/login#customer" onClick={() => choose("customer")} className="font-medium text-ink underline-offset-4 hover:underline">
                Customer sign-in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
