import Image from "next/image";
import Link from "next/link";
import { hospitality } from "@/lib/content/hospitality";
import { eatry } from "@/lib/content/eatry";
import { reels as catererReels } from "@/lib/content/site";
import { featureTiles, gridTiles, homeHero, storySteps } from "@/lib/content/home";
import { asHighlights, offers } from "@/lib/content/offers";
import { HeroFilm } from "@/modules/showcase/components/HeroFilm";
import { Tile, TileGrid } from "@/modules/showcase/components/Tile";
import { Highlights } from "@/modules/showcase/components/Highlights";
import { StickyStory } from "@/modules/showcase/components/StickyStory";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { Reveal } from "@/components/ui/motion";

const reels = [catererReels[0], eatry.reels[0], catererReels[1], hospitality.reels[0]];

/**
 * Zyra Group home, told the Apple way and catering first: the opening film,
 * then straight to what's on now (the highlights — marketing gets the first
 * scroll), the films, full-width tiles for the two divisions, the brand grid
 * (Caterers, Kulfi, Aero Bites, then the hotels), the four ways in as a pinned
 * story — and one clear invitation to close. Off-white throughout.
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

      {/* The close: a warm, light card between the black story and the footer */}
      <section className="bg-wall-lit px-3 pb-16 pt-3 md:pb-24 lg:py-[5vh]">
        <Reveal className="relative isolate mx-auto w-full max-w-[1280px] overflow-hidden rounded-[32px] px-6 py-20 text-center ring-1 ring-gold/25 md:py-28 lg:py-[8vh]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(216,180,111,0.35), transparent 70%), radial-gradient(50% 60% at 100% 100%, rgba(194,154,85,0.16), transparent 70%), linear-gradient(180deg, #fbf7ef, #f4ecdc)" }}
          />
          <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="44px" className="mx-auto h-11 w-auto" />
          <p className="eyebrow mt-6 justify-center">Stays · Tables · Celebrations</p>
          <h2 className="display mx-auto mt-3 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.2rem)]">
            Let&rsquo;s make it <span className="display-italic">unforgettable.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.55] text-body">
            Tell us who you&rsquo;d like to reach — a hotel, a table or a celebration — and we&rsquo;ll take it from there.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <a href="#enquiry" className="btn-onyx shine">
              Enquire now
            </a>
            <Link href="/contact" className="link-more">
              Contact us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
