import { company, welcome } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal, WordReveal, type StatementWord } from "@/components/ui/motion";
import { splitTitle } from "./text";

/** Phrases in the opening statement set in green (accent) or gold serif italic. Styling only — the words are verbatim. */
const MARKS: { phrase: string; tone: "accent" | "italic" }[] = [
  { phrase: "Delight Caterers", tone: "accent" },
  { phrase: "exceptional food and hospitality experiences", tone: "italic" },
];

const bare = (w: string) => w.replace(/[^a-z0-9-]/gi, "").toLowerCase();

/** One paragraph as WordReveal words, with the marked phrases toned. */
function toWords(text: string): StatementWord[] {
  const words = text.split(" ");
  const tones: StatementWord["tone"][] = words.map(() => "plain");
  for (const { phrase, tone } of MARKS) {
    const p = phrase.split(" ").map(bare);
    for (let i = 0; i + p.length <= words.length; i++) {
      if (p.every((w, j) => bare(words[i + j]) === w)) {
        for (let j = 0; j < p.length; j++) tones[i + j] = tone;
        break;
      }
    }
  }
  return words.map((w, i) => ({ text: w, tone: tones[i] }));
}

/**
 * The editorial opening: the heading and the script tagline on the left, the
 * first paragraph as a large statement whose words sharpen as it scrolls
 * through, and the other two paragraphs set as body text beneath a hairline.
 * The page's own wall, with sunlight falling across it.
 */
export default function Welcome() {
  const [line1, line2] = splitTitle(welcome.title, 2);
  const [statement, ...rest] = welcome.paragraphs;

  const tagline = (
    <div className="max-w-[270px]">
      <p className="font-script text-[2.15rem] leading-none text-gold-deep">{company.tagline}</p>
      <div aria-hidden className="gold-rule mt-5" />
    </div>
  );

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div aria-hidden className="wall-sun mask-[linear-gradient(to_bottom,transparent,#000_9rem,#000_calc(100%-9rem),transparent)]" />

      <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow>
            {company.parent} · {company.city}
          </Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.5rem,5.4vw,4.3rem)]">
            <span className="block">{line1}</span>
            <span className="display-italic block">{line2}</span>
          </h2>
          <div className="mt-12 hidden lg:block">{tagline}</div>
        </Reveal>

        <div className="lg:col-span-8 lg:pt-16">
          <WordReveal
            lines={[toWords(statement)]}
            className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.32] tracking-[-0.01em]"
          />

          <div aria-hidden className="gold-hairline mt-12 md:mt-16" />

          <Reveal stagger className="mt-10 grid gap-6 md:grid-cols-2 md:gap-12">
            {rest.map((p) => (
              <p key={p.slice(0, 24)} className="text-[15.5px] leading-[1.85] text-body">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-14 lg:hidden">{tagline}</Reveal>
        </div>
      </div>
    </section>
  );
}
