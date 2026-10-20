import Link from "next/link";
import { group } from "@/lib/content/group";
import { hospitality } from "@/lib/content/hospitality";
import { eatry } from "@/lib/content/eatry";
import { groupCampaigns } from "@/lib/content/campaigns";
import { experiences, finderTabs, hotelListings } from "@/lib/content/showcase";
import { BrandHero } from "@/modules/brand/components/BrandHero";
import { ListingCards } from "@/modules/brand/components/ListingCards";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { Finder } from "@/modules/group/components/Finder";
import { BrandStrip } from "@/modules/group/components/BrandStrip";
import ImpactDiagram from "@/modules/home/components/ImpactDiagram";
import CtaBand from "@/modules/home/components/CtaBand";
import { Eyebrow } from "@/components/ui/SectionHead";
import { LineReveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";

const reels = [hospitality.reels[0], eatry.reels[0], hospitality.reels[1], eatry.reels[2]];

/** Zyra Group: find what you're after, the four ways in, what's on now, featured stays, a glimpse — then plan. */
export default function HomePage() {
  return (
    <>
      <BrandHero
        tall
        eyebrow={group.hero.eyebrow}
        lines={group.hero.lines}
        tagline={group.tagline}
        body={group.hero.body}
        image={{ src: "/media/olive/lobby.webp", alt: "The lobby at Olive" }}
        slides={groupCampaigns.map((c) => ({ image: c.image, kind: c.kind, title: c.title, dates: c.dates, cta: c.cta }))}
      >
        <Finder tabs={finderTabs} />
      </BrandHero>
      <BrandStrip />
      <ImpactDiagram items={experiences} eyebrow="One group, four ways in" title={["Stay, dine,", "treat & celebrate"]} label="Ways to experience Zyra" id="experiences" />

      <section className="relative px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div aria-hidden className="wall-sun" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Featured stays</Eyebrow>
              <LineReveal lines={["Hotels near", "Bengaluru Airport"]} italicFrom={1} className="display mt-5 text-[clamp(2.8rem,6vw,5.4rem)]" />
            </div>
            <Link href="/hospitality" className="btn-ghost group self-start md:self-auto">
              All hotels <Arrow />
            </Link>
          </div>
          <div className="mt-10">
            <ListingCards items={hotelListings} />
          </div>
        </div>
      </section>

      <ReelsSection eyebrow="Inside the group" title={["Stay, savour", "& celebrate"]} reels={reels} />
      <CtaBand />
    </>
  );
}
