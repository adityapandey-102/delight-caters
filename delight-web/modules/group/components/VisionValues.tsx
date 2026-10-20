import { group } from "@/lib/content/group";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

/** Vision and mission cards, then the four values in a compact panel. */
export function VisionValues() {
  const cards = [group.vision, group.mission];
  return (
    <section className="relative px-5 pb-14 sm:px-8 md:pb-20 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="h-full rounded-[18px] border border-gold/30 bg-wall-lit/80 p-6 shadow-[0_30px_60px_-44px_rgba(18,20,16,0.45)] md:p-8">
                <Eyebrow>{c.title}</Eyebrow>
                <p className="display mt-4 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15]">{c.lead}</p>
                <p className="mt-4 text-[15px] leading-[1.75] text-body">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="relative mt-5 overflow-hidden rounded-[22px] border border-line bg-wall-warm px-6 py-8 md:mt-6 md:px-10 md:py-10">
            <ul className="relative grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
              {group.values.map((v) => (
                <li key={v.title}>
                  <span aria-hidden className="gold-hairline mb-3 block w-10" />
                  <h3 className="font-display text-[1.8rem] leading-none tracking-[-0.02em] text-ink">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-body">{v.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
