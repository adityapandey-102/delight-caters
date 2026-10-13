import { missionVision } from "@/lib/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/motion";

/** "Our Mission & Vision" → ["Our Mission", "& Vision"]. */
function splitAtAmpersand(title: string): [string, string?] {
  const i = title.indexOf(" & ");
  return i > 0 ? [title.slice(0, i), title.slice(i + 1)] : [title];
}

/** "Our Mission" → "Our" roman, "Mission" gold italic. */
function CardTitle({ title, onDark }: { title: string; onDark?: boolean }) {
  const [first, ...rest] = title.split(" ");
  return (
    <h3 className={`display mt-8 text-[clamp(2.1rem,3.6vw,2.9rem)] ${onDark ? "on-dark" : ""}`}>
      {first} {rest.length > 0 && <span className="display-italic">{rest.join(" ")}</span>}
    </h3>
  );
}

const NUMERAL =
  "gold-text pointer-events-none absolute right-6 top-3 font-display text-[5.5rem] font-semibold leading-[1.1] lining-nums sm:right-8 sm:text-[8rem]";
const ICON_RING = "flex h-14 w-14 items-center justify-center rounded-full";

/**
 * Mission & Vision: the centred head, then two cards side by side — the
 * mission in green velvet, the vision on the lit wall — each with its glyph
 * and a gold numeral.
 */
export function MissionVision() {
  const [line1, line2] = splitAtAmpersand(missionVision.title);
  const cards: { key: string; title: string; body: string; icon: IconName; dark: boolean }[] = [
    { key: "mission", ...missionVision.mission, icon: "heart", dark: true },
    { key: "vision", ...missionVision.vision, icon: "sparkle", dark: false },
  ];

  return (
    <section className="relative isolate overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      {/* The warm band fades in and out through a mask, onto the page plaster: no seams. */}
      <div
        aria-hidden
        className="wall-warm absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,transparent,#000_9rem,#000_calc(100%-9rem),transparent)]"
      >
        <div className="wall-sun" />
      </div>
      <div className="relative mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionHead align="center" eyebrow={missionVision.eyebrow} line1={line1} line2={line2} body={missionVision.body} />
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 lg:gap-8">
          {cards.map((c, i) =>
            c.dark ? (
              <article
                key={c.key}
                className="green-velvet overflow-hidden rounded-[28px] p-8 shadow-[0_50px_90px_-45px_rgba(1,30,14,0.75)] ring-1 ring-gold-light/25 sm:p-10 lg:p-12"
              >
                <div aria-hidden className="grain" />
                <div aria-hidden className="gold-hairline absolute inset-x-10 top-0" />
                <span aria-hidden className={NUMERAL}>
                  0{i + 1}
                </span>
                <div className="relative">
                  <span className={`${ICON_RING} text-gold-light ring-1 ring-gold-light/40`}>
                    <Icon name={c.icon} size={24} />
                  </span>
                  <CardTitle title={c.title} onDark />
                  <div aria-hidden className="gold-hairline mt-6 w-24" />
                  <p className="mt-6 text-[15.5px] leading-[1.85] text-cream-muted">{c.body}</p>
                </div>
              </article>
            ) : (
              <article
                key={c.key}
                className="wall-lit relative overflow-hidden rounded-[28px] p-8 shadow-[0_40px_80px_-50px_rgba(1,43,21,0.45)] ring-1 ring-line sm:p-10 lg:p-12"
              >
                <span aria-hidden className={NUMERAL}>
                  0{i + 1}
                </span>
                <div className="relative">
                  <span className={`${ICON_RING} bg-green text-gold-light shadow-[0_14px_30px_-14px_rgba(1,43,21,0.7)]`}>
                    <Icon name={c.icon} size={24} />
                  </span>
                  <CardTitle title={c.title} />
                  <div aria-hidden className="gold-rule mt-6 w-28" />
                  <p className="mt-6 text-[15.5px] leading-[1.85] text-body">{c.body}</p>
                </div>
              </article>
            ),
          )}
        </Reveal>
      </div>
    </section>
  );
}
