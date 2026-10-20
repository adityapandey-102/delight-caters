import Link from "next/link";
import { groupFacts } from "@/lib/content/group";
import { hospitality } from "@/lib/content/hospitality";
import { eatry } from "@/lib/content/eatry";
import { featureTiles, gridTiles, homeHero, storySteps } from "@/lib/content/home";
import { asHighlights, offers } from "@/lib/content/offers";
import { HeroFilm } from "@/modules/showcase/components/HeroFilm";
import { Tile, TileGrid } from "@/modules/showcase/components/Tile";
import { Highlights } from "@/modules/showcase/components/Highlights";
import { StickyStory } from "@/modules/showcase/components/StickyStory";
import { BigNumbers } from "@/modules/showcase/components/BigNumbers";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { Reveal } from "@/components/ui/motion";

const reels = [hospitality.reels[0], eatry.reels[0], hospitality.reels[1], eatry.reels[2]];

/**
 * Zyra Group home, told the Apple way: the opening film, then straight to
 * what's on now (the highlights — marketing gets the first scroll), full-width
 * tiles for the two divisions, the two-up brand grid, the four ways in as a
 * pinned story, the numbers, the films — and one clear invitation to close.
 */
export default function HomePage() {
  return (
    <>
      <HeroFilm {...homeHero} />
      <Highlights title="Get the highlights." items={asHighlights(offers.filter((o) => o.featured))} />
      <ReelsSection eyebrow="Watch" title={["Inside the", "group."]} reels={reels} />

      <div className="space-y-3 bg-wall-lit pt-3">
        {featureTiles.map((t) => (
          <div key={t.title} className="px-3">
            <Tile tile={t} />
          </div>
        ))}
        <TileGrid tiles={gridTiles} />
      </div>

      <StickyStory title="One family." accent="Four ways in." steps={storySteps} />
      <BigNumbers title="Zyra, by the numbers." items={groupFacts} />

      <section className="bg-black px-6 py-28 text-center text-cream md:py-40">
        <Reveal>
          <p className="eyebrow on-dark justify-center">Weddings · Conferences · Stays</p>
          <h2 className="display on-dark mx-auto mt-4 max-w-[16ch] text-[clamp(2.8rem,7vw,5.6rem)]">
            Let&rsquo;s plan something <span className="display-italic">unforgettable.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-[clamp(1.05rem,1.6vw,1.3rem)] text-cream-muted">
            Tell us the date and the guest count. We&rsquo;ll bring the rooms, the food and the people.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#enquiry" className="btn-gold shine">
              Plan your event
            </a>
            <Link href="/contact" className="btn-ghost-dark">
              Contact us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
