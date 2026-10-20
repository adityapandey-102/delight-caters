import { group } from "@/lib/content/group";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

/** "What guides us." — vision and mission side by side, then the four values, numbered. */
export function VisionValues() {
  const cards = [group.vision, group.mission];
  return (
    <section className="relative px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[8vh]">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <Eyebrow>What guides us</Eyebrow>
          <h2 className="display mt-2 text-[clamp(2.2rem,5vw,3.5rem)]">
            Vision, mission <span className="display-italic">& values.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-[4vh]">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="h-full rounded-[24px] border border-line bg-wall-lit p-6 md:p-8">
                <p className="text-[13px] font-semibold text-gold-deep">{c.title}</p>
                <p className="mt-3 font-display text-[clamp(1.45rem,2.3vw,1.9rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">{c.lead}</p>
                <p className="mt-3 text-[15.5px] leading-[1.65] text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="ul" stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {group.values.map((v, i) => (
            <li key={v.title} className="rounded-[24px] border border-line bg-wall-lit p-6">
              <span className="display-italic font-display text-[15px] font-semibold lining-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.025em] text-ink">{v.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">{v.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
