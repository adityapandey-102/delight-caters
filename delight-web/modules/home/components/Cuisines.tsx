"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cuisines, cuisinesIntro, type Cuisine } from "@/lib/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import SnapRow from "./SnapRow";
import { pad, splitTitle } from "./text";

const EYEBROW = "A Culinary Journey";

/**
 * Photos too small to fill the desktop frame (intrinsic px). They're shown at
 * no more than their own size, floating on a blurred wash of themselves,
 * instead of being blown up. Add an entry if a new photo is under ~800px wide.
 */
const SMALL: Record<string, { w: number; h: number }> = {
  "/images/cuisine-fusion.webp": { w: 310, h: 282 },
  "/images/cuisine-south-indian.webp": { w: 612, h: 399 },
};

/**
 * "Cuisines we offer". Desktop: a menu-style index of the eight cuisines
 * beside a large gold-framed plate — hovering, focusing or tapping a name
 * crossfades its photograph and description in (an ARIA tablist; arrow keys
 * move through it). Phones and tablets: a scroll-snap carousel of cards, each
 * with the full description and "Enquire Now".
 */
export default function Cuisines({ id, headingAs = "h2" }: { id?: string; headingAs?: "h1" | "h2" }) {
  const [line1, line2] = splitTitle(cuisinesIntro.title, 1);
  const [active, setActive] = useState(0);
  // Panel photos other than the first load once the visitor reaches for the list.
  const [warm, setWarm] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = cuisines.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (active + 1) % cuisines.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (active - 1 + cuisines.length) % cuisines.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id={id} className="relative isolate overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      {/* The warm band fades in and out through a mask, so the page's own plaster shows at the edges — no seam. */}
      <div aria-hidden className="wall-warm absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,transparent,#000_9rem,#000_calc(100%-9rem),transparent)]" />
      <div className="relative mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionHead eyebrow={EYEBROW} line1={line1} line2={line2} body={cuisinesIntro.body} as={headingAs} />
        </Reveal>

        {/* Desktop: the index and the plate */}
        <Reveal className="mt-16 hidden gap-14 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:mt-20 xl:gap-20">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={cuisinesIntro.title}
            onKeyDown={onKeyDown}
            onPointerEnter={() => setWarm(true)}
            onFocus={() => setWarm(true)}
            className="flex flex-col border-t border-line"
          >
            {cuisines.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex min-h-[64px] w-full flex-1 items-center gap-5 border-b border-line py-3 text-left"
                >
                  <span
                    aria-hidden
                    className={`w-7 shrink-0 text-[11px] font-medium tracking-[0.2em] transition-colors duration-500 ${
                      on ? "text-gold-deep" : "text-muted"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`font-display text-[clamp(1.45rem,2.1vw,1.95rem)] font-semibold leading-[1.1] transition-colors duration-500 ${
                      on ? "text-green" : "text-muted group-hover:text-green"
                    }`}
                  >
                    {c.title}
                  </span>
                  <span
                    aria-hidden
                    className={`ml-auto text-gold-deep transition-all duration-500 ease-out-expo ${
                      on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                    }`}
                  >
                    <Arrow />
                  </span>
                  <span
                    aria-hidden
                    className={`absolute -bottom-px left-0 h-px bg-gold transition-[width] duration-700 ease-out-expo ${
                      on ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="grid">
            {cuisines.map((c, i) => {
              const on = i === active;
              return (
                <div
                  key={c.title}
                  role="tabpanel"
                  id={`${uid}-panel-${i}`}
                  aria-labelledby={`${uid}-tab-${i}`}
                  inert={!on}
                  className={`[grid-area:1/1] ${on ? "z-10" : "pointer-events-none"}`}
                >
                  <div
                    className={`gold-frame relative aspect-[16/10] overflow-hidden rounded-[6px] bg-green-ink shadow-[0_50px_90px_-45px_rgba(1,43,21,0.6)] transition-opacity duration-[900ms] ease-out-expo ${
                      on ? "opacity-100" : "opacity-0 delay-300"
                    }`}
                  >
                    {(warm || i === active) && <Plate cuisine={c} on={on} />}
                  </div>

                  <div
                    className={`mt-9 grid grid-cols-[auto_minmax(0,1fr)] gap-x-7 transition-[opacity,translate] ease-out-expo ${
                      on ? "translate-y-0 opacity-100 delay-150 duration-700" : "translate-y-2 opacity-0 duration-200"
                    }`}
                  >
                    <span aria-hidden className="gold-text pt-0.5 font-display text-[3rem] font-semibold leading-none lining-nums">
                      {pad(i + 1)}
                    </span>
                    <div>
                      <h3 className="font-display text-[2rem] font-semibold leading-[1.1] text-green">{c.title}</h3>
                      <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.8] text-body">{c.body}</p>
                      <a href="#enquiry" className="btn-green group mt-7">
                        {cuisinesIntro.cta} <Arrow />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Phones and tablets: the carousel */}
        <Reveal className="mt-14 lg:hidden">
          <SnapRow label={cuisinesIntro.title} controls>
            {cuisines.map((c, i) => (
              <article
                key={c.title}
                className="flex w-[84vw] max-w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-line bg-wall-lit shadow-[0_18px_34px_-24px_rgba(1,43,21,0.45)] sm:w-[58vw] sm:max-w-none md:w-[44vw]"
              >
                <div className="gold-frame relative aspect-[4/3] overflow-hidden bg-green-ink">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(min-width: 768px) 44vw, (min-width: 640px) 58vw, 84vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7">
                  <span aria-hidden className="text-[11px] font-medium tracking-[0.2em] text-gold-deep">
                    {pad(i + 1)} / {pad(cuisines.length)}
                  </span>
                  <h3 className="mt-2 font-display text-[1.7rem] font-semibold leading-[1.1] text-green">{c.title}</h3>
                  <p className="mb-6 mt-3 text-[15px] leading-[1.75] text-body">{c.body}</p>
                  <a href="#enquiry" className="btn-green group mt-auto self-start px-6">
                    {cuisinesIntro.cta} <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </SnapRow>
        </Reveal>
      </div>
    </section>
  );
}

/** The desktop plate: the photograph filling the frame, or a small one floated on a wash of itself. */
function Plate({ cuisine, on }: { cuisine: Cuisine; on: boolean }) {
  const small = SMALL[cuisine.image];
  const motion = `transition-transform duration-[1400ms] ease-out-expo ${on ? "scale-100" : "scale-[1.06]"}`;

  if (!small) {
    return (
      <Image
        src={cuisine.image}
        alt={cuisine.imageAlt}
        fill
        sizes="(min-width: 1280px) 700px, 52vw"
        className={`object-cover ${motion}`}
      />
    );
  }

  return (
    <>
      <Image src={cuisine.image} alt="" fill sizes="128px" className="scale-125 object-cover opacity-80 blur-2xl" />
      <div aria-hidden className="absolute inset-0 bg-green-ink/35" />
      {/* Never taller than 76% of the frame, nor larger than the file itself. */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[3px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-gold-light/60 ${motion}`}
        style={{ height: `min(76%, ${small.h}px)`, aspectRatio: `${small.w} / ${small.h}` }}
      >
        <Image src={cuisine.image} alt={cuisine.imageAlt} fill sizes={`${small.w}px`} className="object-cover" />
      </div>
    </>
  );
}
