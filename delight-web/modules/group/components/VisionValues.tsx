import { group } from "@/lib/content/group";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

/**
 * "What guides us." — the vision and mission set as two large statements side
 * by side on the old site's plaster, then the four values in a quiet row.
 */
export function VisionValues() {
  const statements = [group.vision, group.mission];
  return (
    <section className="relative px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[8vh]">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <Eyebrow>What guides us</Eyebrow>
        </Reveal>

        <div className="texture-plaster mt-6 grid overflow-hidden rounded-[28px] bg-wall-lit ring-1 ring-line md:grid-cols-2 lg:mt-[3vh]">
          {statements.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className={`px-7 py-10 md:px-12 md:py-14 ${i === 1 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
              <h2 className="text-[14px] font-semibold text-gold-deep">{s.title}</h2>
              <p className="mt-5 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-medium leading-[1.2] tracking-[-0.01em] text-ink">{s.lead}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="ul" stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-[6vh] lg:grid-cols-4">
          {group.values.map((v) => (
            <li key={v.title} className="border-t border-gold/40 pt-5">
              <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.01em] text-ink">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">{v.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
