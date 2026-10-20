import type { Reel } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import ReelRow from "@/modules/home/components/ReelRow";

/** A compact "watch" band: a centred heading over the auto-playing reel row (see ReelRow). */
export function ReelsSection({ eyebrow, title, reels }: { eyebrow: string; title: readonly [string, string]; reels: Reel[] }) {
  if (!reels.length) return null;
  return (
    <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-[5vh] lg:[--reel-h:min(483px,calc(100vh-330px))]">
      <div aria-hidden className="wall-lit absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,transparent,#000_6rem,#000_calc(100%-6rem),transparent)]" />
      <div className="relative mx-auto w-full max-w-[1280px]">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)]">
            {title[0]} <span className="display-italic">{title[1]}</span>
          </h2>
        </Reveal>
        <Reveal className="mt-10 md:mt-12 lg:mt-[3.5vh]">
          <ReelRow reels={reels} />
        </Reveal>
      </div>
    </section>
  );
}
