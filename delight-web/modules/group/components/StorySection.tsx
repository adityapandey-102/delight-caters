import Image from "next/image";
import { group } from "@/lib/content/group";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";

/** The group story beside a photograph. */
export function StorySection() {
  const { story } = group;
  return (
    <section className="relative px-5 py-14 sm:px-8 md:py-20 lg:px-12">
      <div aria-hidden className="wall-sun" />
      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2rem,3.8vw,3rem)]">
            {story.title[0]} <span className="display-italic">{story.title[1]}</span>
          </h2>
          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.8] text-body">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-gold/30 bg-onyx-ink shadow-[0_30px_60px_-40px_rgba(18,20,16,0.55)] lg:aspect-[5/4]">
            <Image
              src="/media/olive/lounge.webp"
              alt="The lounge at Olive"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
