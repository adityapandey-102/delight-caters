import Image from "next/image";
import { aboutStory, company } from "@/lib/content/site";
import { Eyebrow, Section } from "@/components/ui/SectionHead";
import { LineReveal, Reveal } from "@/components/ui/motion";

/** "More Than a Meal, It's an Experience" → ["More Than a Meal,", "It's an Experience"]. */
function splitAtComma(title: string): string[] {
  const i = title.indexOf(", ");
  return i > 0 ? [title.slice(0, i + 1), title.slice(i + 2)] : [title];
}

/**
 * "Our Promise": the portrait in a gold frame (with an offset gold outline
 * and the script tagline on a green tab), beside the story — the first
 * paragraph set large in the display face, the rest as body copy.
 */
export function StoryIntro() {
  const [lead, ...rest] = aboutStory.paragraphs;

  return (
    <Section>
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -bottom-4 -left-3 right-8 top-10 rounded-[32px] border border-gold/45 sm:-bottom-6 sm:-left-6 sm:right-12"
          />
          <div className="gold-frame zoom relative aspect-[4/5] overflow-hidden rounded-[28px] bg-wall-shade shadow-[0_50px_90px_-45px_rgba(1,43,21,0.6)]">
            <Image
              src={aboutStory.image}
              alt={aboutStory.imageAlt}
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 448px, 92vw"
              className="object-cover object-[center_38%]"
            />
          </div>
          <div className="green-velvet absolute -right-2 bottom-6 rounded-2xl px-4 py-3 shadow-[0_24px_50px_-20px_rgba(1,30,14,0.7)] ring-1 ring-gold-light/35 sm:-right-8 sm:bottom-10 sm:px-6 sm:py-5">
            <p className="font-script text-[22px] leading-none text-gold-light sm:text-[32px]">{company.tagline}</p>
            <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.24em] text-cream/70 sm:mt-2.5 sm:text-[10px]">{company.name}</p>
          </div>
        </Reveal>

        <div>
          <Eyebrow>{aboutStory.eyebrow}</Eyebrow>
          <LineReveal
            lines={splitAtComma(aboutStory.title)}
            italicFrom={1}
            className="display mt-6 text-[clamp(2.4rem,5.2vw,4.2rem)]"
          />
          <div aria-hidden className="gold-rule mt-8 w-44" />
          <Reveal stagger className="mt-9 space-y-5">
            <p className="font-display text-[1.45rem] font-medium leading-[1.45] text-green-ink sm:text-[1.65rem]">{lead}</p>
            {rest.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-[60ch] text-[15.5px] leading-[1.85] text-body">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
