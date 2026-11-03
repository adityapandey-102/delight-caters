import type { Metadata } from "next";
import { company, hero, marqueeWords, welcome } from "@/lib/content/site";
import { BrandHero } from "@/modules/brand/components/BrandHero";
import Marquee from "@/modules/home/components/Marquee";
import ImpactDiagram from "@/modules/home/components/ImpactDiagram";
import Cuisines from "@/modules/home/components/Cuisines";
import Nutrition from "@/modules/home/components/Nutrition";
import CtaBand from "@/modules/home/components/CtaBand";
import GoogleReviews from "@/modules/home/components/GoogleReviews";
import { Gallery } from "@/modules/gallery/components/Gallery";
import { Location } from "@/modules/brand/components/Location";
import { reviewsBySlug } from "@/lib/content/reviews";
import { offersFor } from "@/lib/content/offers";
import { OffersSection } from "@/modules/showcase/components/OffersSection";
import { contact, cuisines, reels, services, social } from "@/lib/content/site";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { instagramAccount } from "@/modules/brand/components/SocialTiles";
import { JsonLd } from "@/components/seo/JsonLd";
import { abs, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const photos = [
  ...services.map((s) => ({ src: s.image, alt: s.imageAlt })),
  ...cuisines.filter((c) => !c.image.includes("fusion") && !c.image.includes("south-indian")).map((c) => ({ src: c.image, alt: c.imageAlt })),
  { src: "/images/nutrition.webp", alt: "Fresh, healthy bowls" },
];

export const metadata: Metadata = pageMetadata({
  title: "Delight Caterers — wedding and event catering in Bengaluru",
  description:
    "Bengaluru catering for weddings, corporate and institutional events: curated menus, consistent quality and professional service from Delight Caterers.",
  path: "/eatry/delight-caterers",
  image: { src: hero.image, alt: hero.imageAlt },
});

/** Delight Caterers for search engines, from the same facts the page prints. */
const CATERER_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: company.name,
    slogan: company.tagline,
    description: welcome.paragraphs[0],
    url: abs("/eatry/delight-caterers"),
    image: abs(hero.image),
    logo: abs("/brand/logo-gold.png"),
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: { "@type": "PostalAddress", streetAddress: `${contact.address.street}, ${contact.address.road}`, addressLocality: contact.address.locality, addressRegion: contact.address.region, postalCode: contact.address.postalCode, addressCountry: "IN" },
    hasMap: contact.mapsUrl,
    areaServed: { "@type": "City", name: company.city },
    sameAs: [social.instagram.href, social.linkedin.href],
    parentOrganization: { "@type": "Organization", name: "Zyra Group", url: abs("/") },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catering services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.body } })),
    },
  },
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Zyra Food & Beverages", path: "/eatry" },
    { name: company.name, path: "/eatry/delight-caterers" },
  ]),
];

/** Delight Caterers, condensed from its own site into one page of the group. */
export default function DelightCaterersPage() {
  return (
    <>
      <JsonLd data={CATERER_JSON_LD} />
      <BrandHero
        eyebrow={`Zyra Food & Beverages · ${company.name} · ${company.tagline}`}
        lines={hero.lines}
        tagline="Hunasamaranahalli, Bengaluru"
        body={hero.body}
        image={{ src: hero.image, alt: hero.imageAlt }}
        logo={{ src: "/brand/logo-gold.png", width: 1200, height: 634, alt: company.name }}
        primary={{ label: hero.primaryCta, href: "#enquiry" }}
        secondary={{ label: hero.secondaryCta, href: "/contact" }}
      />
      <OffersSection eyebrow="What's on" title="Offers at Delight Caterers." items={offersFor({ slug: "delight-caterers" })} />
      <ReelsSection eyebrow={`${company.name} on Instagram`} title={["Watch &", "savour."]} reels={reels} brand={company.name} instagram={instagramAccount(social.instagram.href)} />
      <Marquee words={marqueeWords} />
      <ImpactDiagram />
      <Cuisines id="cuisines" />
      <Nutrition />
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-[5vh]">
        <div className="mx-auto w-full max-w-[1280px]">
          <Gallery photos={photos} title="A taste of our tables." eyebrow={company.name} />
        </div>
      </section>
      <GoogleReviews data={reviewsBySlug["delight-caterers"]} title={["In their", "own words."]} eyebrow="Delight Caterers · Google reviews" />
      <Location name={company.name} address={contact.address.full} mapsUrl={contact.mapsUrl} phone={{ display: contact.phoneDisplay, href: contact.phoneHref }} />
      <CtaBand label="Book a consultation" />
    </>
  );
}
