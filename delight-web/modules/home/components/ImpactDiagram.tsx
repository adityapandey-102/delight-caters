"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { services, servicesTitle, type Service } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";

/**
 * "Catering For Every Occasion" as a live diagram that fits one screen: the
 * four services are the four lobes of a diamond around a hub.
 *
 * Like a carousel (without sliding), one service is in focus at a time and
 * the focus moves on by itself while the section is on screen: its lobe lifts
 * with the photograph rising inside it, the hub names it, its card comes
 * forward and its progress bar fills. Hover (or keyboard focus) holds the
 * focus where the pointer is; a tap or click jumps to a service and pauses
 * the walk for a few seconds.
 *
 * Phones: diamond over one compact card. Tablets: diamond beside the card.
 * Wide screens (1280px+): all four cards in the corners, the focused one lit.
 */

/** One lobe of the diamond and its card. */
export type DiagramItem = {
  key: string;
  title: string;
  /** Short label inside the lobe. */
  short: string;
  body: string;
  items: string[];
  image: string;
  imageAlt: string;
  icon: IconName;
  /** Where the card's link goes (default: the enquiry popup). */
  href?: string;
  cta?: string;
};

type Quadrant = DiagramItem & {
  n: string;
  /** Lobe fill and the ink that sits on it. */
  fill: string;
  ink: string;
  tint: string;
  /** Corner the card occupies on desktop. */
  corner: "tl" | "tr" | "bl" | "br";
};

/** Lobe looks by position: charcoal and gold, alternating round the diamond. */
const LOOK: Pick<Quadrant, "fill" | "ink" | "tint" | "corner">[] = [
  { fill: "linear-gradient(135deg, #fdfcfa 0%, #f3f0ea 60%, #e9e5de 100%)", ink: "#7d6240", tint: "rgba(22,24,27,0.2)", corner: "tl" },
  { fill: "linear-gradient(135deg, #ebe7e0 0%, #ddd6ca 55%, #cfc6b7 100%)", ink: "#46433e", tint: "rgba(140,106,44,0.18)", corner: "tr" },
  { fill: "linear-gradient(135deg, #fdfcfa 0%, #f3f0ea 55%, #e9e5de 100%)", ink: "#7d6240", tint: "rgba(22,24,27,0.2)", corner: "br" },
  { fill: "linear-gradient(135deg, #ebe7e0 0%, #ddd6ca 50%, #cfc6b7 100%)", ink: "#46433e", tint: "rgba(169,129,58,0.18)", corner: "bl" },
];

const CATERING_ICONS: Record<Service["key"], IconName> = { corporate: "briefcase", event: "glass", wedding: "rings", casual: "party" };
const CATERING_SHORT: Record<Service["key"], string> = { corporate: "Corporate", event: "Events", wedding: "Wedding", casual: "Casual" };
const CATERING: DiagramItem[] = services.map((s) => ({ ...s, short: CATERING_SHORT[s.key], icon: CATERING_ICONS[s.key] }));

const LOBE_RADIUS = ["22px 5px 5px 5px", "5px 22px 5px 5px", "5px 5px 5px 22px", "5px 5px 22px 5px"];
/** Label sits a little toward each lobe's outer point, clear of the hub. */
const LABEL_POS = [
  { left: "44%", top: "44%" },
  { left: "56%", top: "44%" },
  { left: "44%", top: "56%" },
  { left: "56%", top: "56%" },
];

const CORNER: Record<Quadrant["corner"], string> = {
  tl: "xl:col-start-1 xl:row-start-1",
  tr: "xl:col-start-3 xl:row-start-1",
  bl: "xl:col-start-1 xl:row-start-2",
  br: "xl:col-start-3 xl:row-start-2",
};

const AUTO_MS = 3600;
/** How long a tap/click holds the focus before the walk carries on. */
const HOLD_MS = 9000;

export default function ImpactDiagram({
  items = CATERING,
  eyebrow = "Our Services",
  title = ["Catering For", "Every Occasion"],
  label = servicesTitle,
  id = "services",
}: {
  items?: DiagramItem[];
  eyebrow?: string;
  title?: readonly [string, string];
  label?: string;
  id?: string;
} = {}) {
  const QUADRANTS: Quadrant[] = items.slice(0, 4).map((it, i) => ({ ...it, ...LOOK[i], n: `0${i + 1}` }));
  const byKey = (k: string) => QUADRANTS.find((q) => q.key === k)!;
  const keys = useMemo(() => items.slice(0, 4).map((it) => it.key), [items]);
  /** The diamond is the 2×2 grid turned 45°: grid tl → top lobe, tr → right, br → bottom, bl → left. */
  const GRID_ORDER: Quadrant[] = [QUADRANTS[0], QUADRANTS[1], QUADRANTS[3], QUADRANTS[2]];

  const root = useRef<HTMLElement>(null);
  /** The service in focus — always one, moved on by the timer. */
  const [active, setActive] = useState<string>(items[0].key);
  /** Mouse/keyboard preview; overrides `active` while set. */
  const [hover, setHover] = useState<string | null>(null);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** Bumped whenever the walk restarts, so the progress bar restarts with it. */
  const [cycle, setCycle] = useState(0);
  const holdTimer = useRef<number | undefined>(undefined);

  const shown = hover ?? active;
  const shownQ = byKey(shown);
  const shownIdx = QUADRANTS.findIndex((x) => x.key === shown);
  const running = visible && !reduced && !hover && !held;

  const select = useCallback((key: string) => {
    setActive(key);
    setHeld(true);
    window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => {
      setHeld(false);
      setCycle((c) => c + 1);
    }, HOLD_MS);
  }, []);

  const mouseOnly = (fn: () => void) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") fn();
  };
  const leave = () => {
    setHover(null);
    setCycle((c) => c + 1);
  };

  /* Walk to the next service while on screen and not held. */
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      setActive((cur) => keys[(keys.indexOf(cur) + 1) % keys.length]);
    }, AUTO_MS);
    return () => window.clearTimeout(t);
  }, [running, active, cycle, keys]);

  useEffect(() => {
    // Read once on mount (client only), so the server render stays static.
    const reduce = prefersReducedMotion();
    const el = root.current;
    const io = el
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.45 })
      : null;
    if (el && io) io.observe(el);
    const id = window.setTimeout(() => setReduced(reduce), 0);
    return () => {
      io?.disconnect();
      window.clearTimeout(id);
      window.clearTimeout(holdTimer.current);
    };
  }, []);

  /* Entrance: lobes swing in from their corners, the hub pops, cards rise. */
  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set("[data-q], [data-hub], [data-block]", { opacity: 1, scale: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", once: true } });
      tl.fromTo(
        "[data-q]",
        {
          opacity: 0,
          scale: 0.32,
          rotate: (i: number) => [-24, 24, -24, 24][i % 4],
          x: (i: number) => [-70, 70, -70, 70][i % 4],
          y: (i: number) => [-70, -70, 70, 70][i % 4],
          transformOrigin: "center center",
        },
        { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0, duration: 1.2, ease: "back.out(1.6)", stagger: 0.1 },
        0,
      );
      tl.fromTo("[data-hub]", { opacity: 0, scale: 0.45, rotate: -12 }, { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(2)" }, 0.4);
      tl.fromTo("[data-block]", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.5);

      // Slow counter-rotation of the diamond as the section passes (tablets and up).
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.fromTo(
          "[data-diamond]",
          { rotate: -4 },
          { rotate: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.1 } },
        );
      });
      gsap.to("[data-hub-ring]", { scale: 1.12, opacity: 0.2, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id={id}
      aria-label={label}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-[88px] pt-[calc(var(--header-h)+0.5rem)] sm:px-8 md:pb-8 lg:px-12"
    >
      <div aria-hidden className="wall-sun" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        {/* heading — compact so the whole diagram fits one screen */}
        <div className="text-center">
          <Eyebrow className="justify-center max-md:[@media(max-height:700px)]:hidden">{eyebrow}</Eyebrow>
          <h2 className="display mt-2 text-[clamp(1.75rem,4.2vw,3.1rem)] md:mt-4">
            {title[0]} <span className="display-italic max-md:block">{title[1]}</span>
          </h2>
        </div>

        <div
          className="mt-3 grid grid-cols-1 items-center gap-3 md:mt-8 md:grid-cols-[auto_1fr] md:gap-10 xl:grid-cols-[1fr_auto_1fr] xl:gap-x-10 xl:gap-y-6"
          onPointerLeave={mouseOnly(leave)}
        >
          {/* ---------- diamond + progress ---------- */}
          <div className="mx-auto flex flex-col items-center md:col-start-1 md:row-start-1 xl:col-start-2 xl:row-span-2 xl:row-start-1">
            <div data-diamond className="relative aspect-square w-[min(64vw,28svh,270px)] max-md:my-3 md:w-[min(44vw,44svh,400px)] xl:w-[min(380px,48svh)]">
              <div className="absolute inset-[9%] rotate-45">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1.5 md:gap-2">
                  {GRID_ORDER.map((q, i) => {
                    const on = shown === q.key;
                    return (
                      <div key={q.key} data-q className="relative">
                        <button
                          type="button"
                          onPointerEnter={mouseOnly(() => setHover(q.key))}
                          onFocus={() => setHover(q.key)}
                          onBlur={() => setHover(null)}
                          onClick={() => select(q.key)}
                          aria-label={`${q.title} — ${q.n} of 04`}
                          aria-pressed={on}
                          aria-controls={`svc-card-${q.key}`}
                          className="absolute inset-0 overflow-hidden outline-none transition-[transform,opacity,filter,box-shadow] duration-700 ease-out-expo focus-visible:ring-2 focus-visible:ring-gold-light"
                          style={{
                            background: q.fill,
                            borderRadius: LOBE_RADIUS[i],
                            opacity: on ? 1 : 0.5,
                            filter: on ? "none" : "saturate(0.6)",
                            transform: on ? "scale(1.07)" : "scale(1)",
                            zIndex: on ? 2 : 1,
                            boxShadow: on
                              ? "0 0 0 2px rgba(216,180,111,0.95), 0 26px 50px -18px rgba(18,20,16,0.65)"
                              : "inset 0 0 0 1px rgba(216,180,111,0.35)",
                          }}
                        >
                          {/* The photograph rises inside the lobe in focus (counter-rotated to stand upright). */}
                          <span
                            aria-hidden
                            className="absolute left-1/2 top-1/2 block h-[150%] w-[150%] transition-[opacity,transform] duration-[900ms] ease-out-expo"
                            style={{ opacity: on ? 1 : 0, transform: `translate(-50%,-50%) rotate(-45deg) scale(${on ? 1 : 1.25})` }}
                          >
                            <Image src={q.image} alt="" fill sizes="240px" className="object-cover" />
                            <span className="absolute inset-0" style={{ background: q.tint }} />
                          </span>
                          <span
                            className="absolute whitespace-nowrap text-center font-semibold uppercase transition-transform duration-700 ease-out-expo"
                            style={{
                              ...LABEL_POS[i],
                              color: on ? "#f7efe2" : q.ink,
                              fontSize: "clamp(8px,2.2vw,10.5px)",
                              letterSpacing: "0.18em",
                              transform: `translate(-50%,-50%) rotate(-45deg) scale(${on ? 1.08 : 1})`,
                              textShadow: on ? "0 1px 2px rgba(0,0,0,0.85), 0 2px 12px rgba(0,0,0,0.6)" : "none",
                            }}
                          >
                            <span className="block font-display text-[1.9em] leading-none tracking-normal lining-nums opacity-80">{q.n}</span>
                            <span className="mt-1 block">{q.short}</span>
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* hub */}
              <div
                data-hub
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-wall-lit text-center shadow-[0_22px_60px_-18px_rgba(18,20,16,0.45)]"
              >
                <span data-hub-ring aria-hidden className="absolute inset-0 rounded-full border border-gold" />
                <span aria-hidden className="absolute inset-[6%] rounded-full border border-gold/30" />
                <div key={shown} className="flex flex-col items-center px-2 animate-[hub-in_0.6s_var(--ease-out-expo)_both]">
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-gold-deep lining-nums md:text-[9px]">{shownQ.n} / 04</span>
                  <span className="mt-1 font-display text-[clamp(0.9rem,2.6vw,1.35rem)] font-semibold leading-[1.02] text-onyx">{shownQ.title}</span>
                </div>
              </div>
            </div>

            {/* Progress: one bar per service, the one in focus filling like a carousel's timer. */}
            <div className="mt-3 grid w-full max-w-[340px] grid-cols-4 gap-2 md:mt-8" aria-label="Services">
              {QUADRANTS.map((q, i) => {
                const on = shown === q.key;
                return (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => select(q.key)}
                    aria-pressed={on}
                    aria-controls={`svc-card-${q.key}`}
                    className="group flex min-h-11 flex-col justify-center gap-1.5 text-left"
                  >
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] lining-nums transition-colors duration-500 ${on ? "text-onyx" : "text-faint group-hover:text-muted"}`}>
                      <span className="sm:hidden">{q.n}</span>
                      <span className="hidden whitespace-nowrap sm:inline">{q.short}</span>
                    </span>
                    <span className="relative block h-[3px] overflow-hidden rounded-full bg-line">
                      <span
                        key={on ? `${q.key}-${cycle}-${active}` : q.key}
                        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gold"
                        style={on && running ? { animation: `progress-fill ${AUTO_MS}ms linear both` } : { transform: `scaleX(${on || i < shownIdx ? 1 : 0})` }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------- cards: one at a time below xl, all four in the corners at xl ---------- */}
          <div className="grid md:col-start-2 md:row-start-1 xl:contents">
            {QUADRANTS.map((q) => {
              const on = shown === q.key;
              const leftSide = q.corner === "tl" || q.corner === "bl";
              return (
                <div
                  key={q.key}
                  id={`svc-card-${q.key}`}
                  className={`col-start-1 row-start-1 transition-[opacity,transform,visibility] duration-700 ease-out-expo ${CORNER[q.corner]} ${
                    on ? "xl:opacity-100" : "max-xl:pointer-events-none max-xl:invisible max-xl:translate-y-3 max-xl:opacity-0 xl:scale-[0.97]"
                  } ${on ? (leftSide ? "xl:-translate-x-1.5" : "xl:translate-x-1.5") : ""}`}
                >
                  <article
                    data-block
                    onPointerEnter={mouseOnly(() => setHover(q.key))}
                    onClick={() => select(q.key)}
                    className={`relative isolate mx-auto flex max-w-xl flex-col overflow-hidden rounded-[22px] border p-4 text-cream [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow,filter] duration-700 ease-out-expo sm:p-6 xl:max-w-[410px] xl:cursor-pointer xl:p-5 ${
                      leftSide ? "xl:ml-auto xl:items-end xl:text-right" : "xl:mr-auto xl:items-start xl:text-left"
                    } ${
                      on
                        ? "border-gold-light/70 shadow-[0_30px_60px_-30px_rgba(18,20,16,0.7)]"
                        : "border-white/20 xl:[filter:saturate(0.5)_brightness(0.82)] xl:hover:[filter:none]"
                    }`}
                  >
                    {/* The service photograph behind the card, under a dark-green tint so the cream type reads. */}
                    <div aria-hidden className="absolute inset-0 -z-10">
                      <Image
                        src={q.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 55vw, 410px"
                        className={`object-cover transition-transform duration-[1400ms] ease-out-expo ${on ? "scale-105" : "scale-100"}`}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(${leftSide ? "255deg" : "105deg"}, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.06) 100%), linear-gradient(to top, rgba(0,0,0,0.28), transparent 45%)`,
                        }}
                      />
                    </div>
                    <div className={`flex items-center gap-3 ${leftSide ? "xl:flex-row-reverse" : ""}`}>
                      <span
                        aria-hidden
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                          on ? "bg-white text-ink shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)]" : "bg-black/35 text-gold-light ring-1 ring-gold-light/50 backdrop-blur-sm"
                        }`}
                      >
                        <Icon name={q.icon} size={18} />
                      </span>
                      <h3 className="whitespace-nowrap font-display text-[1.45rem] font-semibold leading-none tracking-tight text-cream [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_3px_18px_rgba(0,0,0,0.6)] sm:text-[1.75rem]">{q.title}</h3>
                    </div>
                    <div className={`mt-3 flex items-center gap-3 ${leftSide ? "xl:flex-row-reverse" : ""}`}>
                      <span aria-hidden className={`block h-px bg-gold-light transition-[width] duration-700 ease-out-expo ${on ? "w-20" : "w-10"}`} />
                      <span className="text-[10px] font-medium tracking-[0.2em] text-gold-light/80 lining-nums">{q.n}/04</span>
                    </div>
                    <p className="mt-2.5 text-[14px] font-medium leading-[1.6] text-cream sm:text-[14.5px] max-md:[@media(max-height:680px)]:hidden xl:[@media(max-height:780px)]:hidden">{q.body}</p>
                    <ul className={`mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1 ${leftSide ? "xl:justify-items-end" : ""}`}>
                      {q.items.map((item) => (
                        <li key={item} className={`flex items-center gap-2 text-[13.5px] font-medium text-cream ${leftSide ? "xl:flex-row-reverse" : ""}`}>
                          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-light" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href={q.href ?? "#enquiry"} className="group mt-2 inline-flex min-h-11 items-center gap-2 text-[13.5px] font-semibold text-gold-light max-md:hidden xl:min-h-9">
                      {q.cta ?? "Enquire Now"}
                      <Arrow />
                    </a>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
