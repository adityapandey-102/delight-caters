import Image from "next/image";
import { nutrition } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";
import Parallax from "./Parallax";
import { splitTitle } from "./text";

const EYEBROW = "Employee Wellness";

/**
 * Personalized Nutrition & Wellness, on a warm off-white band: a gold-framed
 * portrait with the dietitian's credential card laid over its corner, and the
 * copy verbatim — the dietitian's name set in bold — ending on "Contact Us".
 */
export default function Nutrition() {
  const [line1, line2] = splitTitle(nutrition.title, 1);
  const { dietitian, lead, paragraphs } = nutrition;
  // "14+ years of clinical experience" → a gold "14+" over the rest of the line.
  const [, years = "", experience = dietitian.experience] = dietitian.experience.match(/^(\S+)\s+(.*)$/) ?? [];

  return (
    <section className="overflow-hidden bg-wall-cream px-5 py-24 sm:px-8 md:py-32 lg:flex lg:min-h-[100svh] lg:items-center lg:px-12 lg:pb-14 lg:pt-[calc(var(--header-h)+1.5rem)]">

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-[500px] md:mx-0">
          <div className="gold-frame relative aspect-[3/4] overflow-hidden rounded-[6px] lg:aspect-auto lg:h-[min(76svh,620px)] bg-wall-warm shadow-[0_60px_100px_-50px_rgba(18,20,16,0.35)]">
            <Parallax>
              <Image
                src={nutrition.image}
                alt={nutrition.imageAlt}
                fill
                sizes="(min-width: 1280px) 500px, (min-width: 768px) 42vw, (min-width: 540px) 500px, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>

          {/* The dietitian */}
          <div className="relative z-10 mx-4 -mt-16 rounded-[10px] border border-gold/45 bg-wall-lit p-6 text-ink shadow-[0_34px_70px_-30px_rgba(0,0,0,0.65)] sm:mx-10 md:mx-0 md:-mt-12 lg:absolute lg:-bottom-10 lg:-right-14 lg:mt-0 lg:w-[300px]">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-light/25 text-gold-deep ring-1 ring-gold/60 ring-offset-2 ring-offset-wall-lit">
                <Icon name="leaf" size={22} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[1.5rem] font-semibold leading-tight text-onyx">{dietitian.name}</p>
                <p className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.24em] text-gold-deep">{dietitian.role}</p>
              </div>
            </div>
            <div aria-hidden className="gold-hairline my-5" />
            <p className="flex items-center gap-3.5">
              {years && <span className="gold-text font-display text-[2.6rem] font-semibold leading-none lining-nums">{years}</span>}
              <span className="text-[13.5px] leading-snug text-body">{experience}</span>
            </p>
          </div>
        </Reveal>

        <Reveal>
          <Eyebrow onDark>{EYEBROW}</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,5.2vw,4.3rem)] lg:mt-4 lg:text-[clamp(2.4rem,3.8vw,3.6rem)]">
            <span className="block">{line1}</span>
            <span className="display-italic block">{line2}</span>
          </h2>
          <div aria-hidden className="gold-hairline mt-9 w-28 lg:mt-6" />

          <div className="mt-9 max-w-xl space-y-5 text-[15.5px] leading-[1.85] text-muted lg:mt-6 lg:space-y-4 lg:leading-[1.75]">
            <p className="text-[17px] leading-[1.75] text-ink">{paragraphs[0]}</p>
            <p>
              {lead.before}
              <strong className="font-semibold text-gold-deep">{lead.name}</strong>
              {lead.after}
            </p>
            <p>{paragraphs[1]}</p>
          </div>

          <a href="#enquiry" className="btn-gold shine group mt-10 lg:mt-7">
            {nutrition.cta} <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
