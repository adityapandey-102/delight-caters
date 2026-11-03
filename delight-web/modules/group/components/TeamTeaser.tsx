import Image from "next/image";
import Link from "next/link";
import { team, type TeamMember } from "@/lib/content/group";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

/**
 * A portrait on a warm stone tile. The photographs come from different
 * shoots (white, cream and grey backdrops); multiplying them onto the tile
 * turns the light backdrops the tile's colour, so the six read as one set.
 */
function Portrait({ member, sizes, className = "" }: { member: TeamMember; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-wall-warm ${className}`}>
      <Image
        src={member.photo.src}
        alt={`${member.name}, ${member.role}`}
        fill
        sizes={sizes}
        className="object-cover mix-blend-multiply"
        style={{ objectPosition: member.photo.focus }}
      />
    </div>
  );
}

/** On the About page: a row of the team's portraits and the way to meet them. */
export function TeamTeaser() {
  return (
    <section className="px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[7vh]">
      <Reveal className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-8 rounded-[28px] bg-wall-warm/60 px-7 py-10 ring-1 ring-line md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <div>
          <Eyebrow>Our team</Eyebrow>
          <h2 className="display mt-3 text-[clamp(2rem,3.6vw,3rem)]">
            The people behind <span className="display-italic">every welcome.</span>
          </h2>
          <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.6] text-muted">
            Meet the founder, managers, chef and specialists who run Zyra&rsquo;s hotels, kitchens and brands.
          </p>
          <Link href="/team" className="btn-onyx mt-7">
            Check out our team
          </Link>
        </div>
        <ul className="flex -space-x-4" aria-hidden>
          {team.map((m) => (
            <li key={m.name}>
              <Portrait member={m} sizes="96px" className="h-20 w-20 rounded-full ring-4 ring-wall-lit md:h-24 md:w-24" />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
