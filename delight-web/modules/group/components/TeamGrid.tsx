import { team } from "@/lib/content/group";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

function initials(name: string) {
  return name
    .replace(/^Dt\.\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** Elegant stand-in portrait: gold silhouette on a stone tile, with initials. */
function Portrait({ name }: { name: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] border border-line bg-wall-warm">
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" role="img" aria-label={`Portrait placeholder for ${name}`}>
        <g className="text-gold" fill="currentColor">
          <circle cx="100" cy="98" r="34" opacity="0.28" />
          <path d="M34 250c0-48 30-78 66-78s66 30 66 78z" opacity="0.28" />
        </g>
        <circle cx="100" cy="98" r="34" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold" opacity="0.6" />
        <path d="M34 250c0-48 30-78 66-78s66 30 66 78" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold" opacity="0.6" />
        <text x="100" y="108" textAnchor="middle" className="fill-gold-deep font-display" fontSize="30" fontWeight="600">
          {initials(name)}
        </text>
      </svg>
    </div>
  );
}

/**
 * Leadership & team. Pass `limit` to show only the first few (e.g. on the home page).
 * On desktop each person is a compact row card (portrait beside the name), so
 * the whole team sits in one screen.
 */
export function TeamGrid({ limit }: { limit?: number }) {
  const members = typeof limit === "number" ? team.slice(0, limit) : team;
  return (
    <section id="team" className="relative scroll-mt-24 px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[7vh]">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <Eyebrow>The people</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2rem,3.8vw,3rem)]">
            Leadership <span className="display-italic">& team</span>
          </h2>
        </Reveal>
        <Reveal as="ul" stagger className="mt-8 grid grid-cols-2 gap-4 md:mt-10 lg:mt-[4vh] lg:grid-cols-4 lg:gap-4">
          {members.map((m, i) => (
            <li key={`${m.name}-${i}`} className="lg:flex lg:items-center lg:gap-4 lg:rounded-[20px] lg:border lg:border-line lg:bg-wall-lit lg:p-3">
              <div className="lg:w-[clamp(72px,12vh,108px)] lg:shrink-0">
                <Portrait name={m.name} />
              </div>
              <div className="min-w-0">
              <h3 className="mt-3 lg:mt-0 font-display text-[1.15rem] font-semibold leading-tight text-onyx">{m.name}</h3>
              <p className="mt-1 text-[13.5px] leading-snug text-body">{m.role}</p>
              <p className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{m.unit}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
