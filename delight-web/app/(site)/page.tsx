import Image from "next/image";
import Link from "next/link";
import { hospitality } from "@/lib/content/hospitality";
import { eatry } from "@/lib/content/eatry";
import { reels as catererReels } from "@/lib/content/site";
import { divisions, homeHero, storySteps } from "@/lib/content/home";
import { asHighlights, offers } from "@/lib/content/offers";
import { HeroFilm } from "@/modules/showcase/components/HeroFilm";
import { DivisionCarousel } from "@/modules/showcase/components/DivisionCarousel";
import { Highlights } from "@/modules/showcase/components/Highlights";
import { StickyStory } from "@/modules/showcase/components/StickyStory";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { CtaCard } from "@/modules/home/components/CtaBand";

const reels = [catererReels[0], eatry.reels[0], catererReels[1], hospitality.reels[0]];

/**
 * Zyra Group home, told the Apple way and catering first: the opening film,
 * then straight to what's on now (the highlights — marketing gets the first
 * scroll), the films, the two divisions as full-width photo tiles that carry
 * their brands in turn (Eatry first: Caterers, Kulfi, Aero Bites; then the hotels),
 * the four ways in as a pinned story — and the home's own invitation on the
 * closing card the brand pages use, set compact. Off-white throughout.
 */
export default function HomePage() {
  return (
    <>
      <HeroFilm {...homeHero} />
      <Highlights title="Get the highlights." items={asHighlights(offers.filter((o) => o.featured))} />
      <ReelsSection eyebrow="Watch" title={["Inside the", "group."]} reels={reels} />

      <div className="space-y-3 bg-wall-lit px-3 pt-3">
        {divisions.map((d) => (
          <DivisionCarousel key={d.key} division={d} />
        ))}
      </div>

      <StickyStory title="One family." accent="Four ways in." steps={storySteps} />

      {/* The close: the home's own invitation, on the closing card the brand pages use, set compact */}
      <CtaCard photo="/media/refined/close-celebration.webp" compact>
        <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="56px" className="h-12 w-auto md:h-14" />
        <h2 className="display mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)]">
          <span className="block">Let&rsquo;s make it</span>
          <span className="display-italic block">unforgettable.</span>
        </h2>
        <p className="mt-4 max-w-[34ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.55] text-body">
          Tell us about the day — a stay, a table or a celebration — and we&rsquo;ll take it from there.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
          <a href="#enquiry" className="btn-onyx btn-goldleaf shine">
            Enquire now
          </a>
          <Link href="/contact" className="link-more">
            Contact us
          </Link>
        </div>
      </CtaCard>
    </>
  );
}
