import type { Metadata } from "next";
import { hospitality } from "@/lib/content/hospitality";
import { offersFor } from "@/lib/content/offers";
import { hotelIndex } from "@/lib/content/showcase";
import { BrandHero } from "@/modules/brand/components/BrandHero";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { OffersSection } from "@/modules/showcase/components/OffersSection";
import Cuisines from "@/modules/home/components/Cuisines";
import CtaBand from "@/modules/home/components/CtaBand";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Delight Hospitality — Hotels near Bengaluru Airport",
  description: hospitality.intro[1],
};

/** Delight Hospitality: the division, its hotels (an index beside a large photograph), its offers and events, and its reels. */
export default function HospitalityPage() {
  return (
    <>
      <BrandHero
        eyebrow={hospitality.name}
        lines={hospitality.title}
        tagline={hospitality.eyebrow}
        body={hospitality.intro[0]}
        image={{ src: "/media/sterling-plaza/lobby-lounge.webp", alt: "The lobby lounge at Sterling Plaza" }}
        primary={{ label: "Choose your stay", href: "#hotels" }}
        secondary={{ label: "Contact reservations", href: "/contact" }}
      />
      <ul className="relative mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-x-6 gap-y-4 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:grid-cols-6 lg:px-12">
        {hospitality.facilities.map((f) => (
          <li key={f.label} className="flex items-center gap-3 text-[13.5px] text-body">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/45 text-gold-deep">
              <Icon name={f.icon} size={16} />
            </span>
            {f.label}
          </li>
        ))}
      </ul>
      <div id="hotels" className="scroll-mt-20">
        <Cuisines content={hotelIndex} />
      </div>
      <OffersSection title="Offers & events at our hotels." items={offersFor({ division: "hospitality" })} />
      <ReelsSection eyebrow={hospitality.name} title={["Stay", "a little longer"]} reels={hospitality.reels} />
      <CtaBand />
    </>
  );
}
