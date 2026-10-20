import type { Metadata } from "next";
import { eatry } from "@/lib/content/eatry";
import { offersFor } from "@/lib/content/offers";
import { eatryListings } from "@/lib/content/showcase";
import { BrandHero } from "@/modules/brand/components/BrandHero";
import { ListingCards } from "@/modules/brand/components/ListingCards";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { OffersSection } from "@/modules/showcase/components/OffersSection";
import CtaBand from "@/modules/home/components/CtaBand";
import { Eyebrow } from "@/components/ui/SectionHead";
import { LineReveal } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Delight Eatry — Bombay Kulfi, Aero Bites & Delight Caterers",
  description: eatry.intro[0],
};

/** Delight Eatry: the division, its three food businesses, its offers and events, and the reels. */
export default function EatryPage() {
  return (
    <>
      <BrandHero
        eyebrow={eatry.name}
        lines={eatry.title}
        tagline={eatry.eyebrow}
        body={eatry.intro[0]}
        image={{ src: "/images/cuisine-north-indian.webp", alt: "A North Indian spread" }}
        primary={{ label: "Our brands", href: "#brands" }}
        secondary={{ label: "Plan Your Event", href: "#enquiry" }}
      />
      <section id="brands" className="relative scroll-mt-20 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div aria-hidden className="wall-sun" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <Eyebrow>Our brands</Eyebrow>
          <LineReveal lines={["Cool, crispy", "& celebratory"]} italicFrom={1} className="display mt-5 text-[clamp(2.8rem,6vw,5.4rem)]" />
          <div className="mt-10">
            <ListingCards items={eatryListings} />
          </div>
        </div>
      </section>
      <OffersSection title="Offers & events around the table." items={offersFor({ division: "eatry" })} />
      <ReelsSection eyebrow="Bombay Kulfi" title={["Watch &", "crave"]} reels={eatry.reels} />
      <CtaBand />
    </>
  );
}
