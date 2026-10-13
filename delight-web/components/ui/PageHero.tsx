import Image from "next/image";
import { Eyebrow } from "./SectionHead";
import { LineReveal, Reveal } from "./motion";

/**
 * The opening of every inner page, a sibling of the home hero: a full-bleed
 * photograph shown as it is, with a soft dark-green "transparent shadow"
 * behind the words only, and cream display type (gold italic second line)
 * with a soft text shadow, and a lozenge rule. Clears the fixed header; about 70svh on desktop, compact
 * on phones. Server-rendered; only the line reveal runs on the client.
 */
export function PageHero({
  eyebrow,
  lines,
  body,
  image,
  imageAlt,
  as = "h1",
}: {
  eyebrow: string;
  /** The heading: a green roman line, then (optional) a gold italic line. */
  lines: readonly [string, string?];
  body?: string;
  image: string;
  imageAlt: string;
  as?: "h1" | "h2";
}) {
  const headingLines = lines.filter((l): l is string => Boolean(l));

  return (
    <section className="relative isolate flex overflow-hidden lg:min-h-[70svh] lg:items-center">
      {/* The photograph, shown as it is. Only its last few rem fade out (a
          mask) into the page's plaster, so there's no seam below. */}
      <div className="absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,#000_calc(100%-4rem),transparent)] md:mask-[linear-gradient(to_bottom,#000_calc(100%-6rem),transparent)]">
        <Image src={image} alt={imageAlt} fill preload sizes="100vw" quality={85} className="object-cover object-center" />
        {/* A light shade under the fixed header so the logo and nav read */}
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-[rgba(1,30,14,0.5)] to-transparent" />
        {/* The "transparent shadow": dark green behind the words only */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,30,14,0.3)_0%,rgba(1,30,14,0.58)_40%,rgba(1,30,14,0.5)_75%,rgba(1,30,14,0.2)_100%)] lg:bg-[radial-gradient(ellipse_62%_75%_at_22%_56%,rgba(1,30,14,0.62)_0%,rgba(1,30,14,0.38)_45%,transparent_78%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 pb-16 pt-[calc(var(--header-h)+2.75rem)] sm:px-8 md:pb-24 md:pt-[calc(var(--header-h)+4.5rem)] lg:px-12 lg:pb-28">
        <div className="max-w-[40rem]">
          <Eyebrow onDark className="[text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            {eyebrow}
          </Eyebrow>
          <LineReveal
            as={as}
            lines={headingLines}
            italicFrom={1}
            start="top 98%"
            className="display on-dark mt-6 text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.96] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]"
          />
          <div className="gold-rule mt-8 w-44 opacity-90 sm:w-56" aria-hidden />
          {body && (
            <Reveal delay={0.25} y={18}>
              <p className="mt-7 max-w-[52ch] text-[15.5px] leading-[1.8] text-cream/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:text-[16.5px]">{body}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
