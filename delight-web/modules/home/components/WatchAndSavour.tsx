import { reels, social } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";
import ReelRow from "./ReelRow";
import { NEW_TAB } from "./text";

const TITLE = { roman: "Watch &", italic: "Savour" };
const FOLLOW = "Follow us on Instagram";

/**
 * Watch & Savour, after smoor.in's "Watch & Shop": a centred heading, then
 * four tall rounded reel cards with the caption in white over a soft
 * gradient. The reels (lib/content/site.ts → `reels`, files in
 * public/instagram-videos) play one after another; hover plays one directly.
 * Desktop: four columns. Phones and tablets: a scroll-snap row that follows
 * the reel that's playing.
 */
export default function WatchAndSavour() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12 lg:py-[5vh] lg:[--reel-h:min(483px,calc(100vh-400px))]">
      <div aria-hidden className="wall-lit absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,transparent,#000_9rem,#000_calc(100%-9rem),transparent)]" />
      <div className="relative mx-auto w-full max-w-[1280px]">
        <Reveal className="text-center">
          <Eyebrow>{social.instagram.label}</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,5.6vw,4.4rem)] lg:mt-3 lg:text-[min(4.4rem,7vh)]">
            {TITLE.roman} <span className="display-italic">{TITLE.italic}</span>
          </h2>
        </Reveal>

        <Reveal className="mt-14 md:mt-16 lg:mt-[3vh]">
          <ReelRow reels={reels} />
        </Reveal>

        <Reveal className="mt-10 text-center md:mt-12 lg:mt-[2vh]">
          <a href={social.instagram.href} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
            <Icon name="instagram" size={17} className="text-gold-deep" />
            {FOLLOW}
            <span className="sr-only">{NEW_TAB}</span>
            <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
