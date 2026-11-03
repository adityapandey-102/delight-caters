import type { Metadata } from "next";
import { group } from "@/lib/content/group";
import type { Venue } from "@/lib/content/types";

/** The site's social card, used when a page has no photograph of its own. */
export const defaultOgImage = { src: "/media/refined/home-hero.webp", alt: "A long dining table laid with flowers and glassware for a celebration" };

/** An absolute URL on the group's domain. */
export const abs = (path: string) => `${group.domain}${path === "/" ? "" : path}`;

type PageSeo = {
  /** Page title; the root template adds " · Zyra Group". */
  title: string;
  description: string;
  /** Path on the site, e.g. "/eatry/aero-bites". */
  path: string;
  image: { src: string; alt: string };
};

/** Title, description, canonical, Open Graph and Twitter for one page (a page's openGraph replaces the root's, so it repeats type, locale and site name). */
export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
  const card = title.includes(group.name) ? title : `${title} · ${group.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: group.name,
      locale: "en_IN",
      title: card,
      description,
      url: path,
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title: card, description, images: [{ url: image.src, alt: image.alt }] },
  };
}

/** A brand page's metadata: its own hero photograph, its own path under its division. */
export function venueMetadata(venue: Venue, { title, description }: { title: string; description: string }): Metadata {
  return pageMetadata({ title, description, path: venuePath(venue), image: venue.hero });
}

export const venuePath = (venue: Venue) => `/${venue.division === "eatry" ? "eatry" : "hospitality"}/${venue.slug}`;

/** Home > division > page, for search-result breadcrumbs. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

/** "…, Hunasamaranahalli, Bengaluru, Karnataka 562157" as a PostalAddress; falls back to the plain string. */
export function postalAddress(address: string) {
  const m = address.match(/^(.*?),?\s*Bengaluru,\s*Karnataka\s+(\d{6})$/);
  if (!m) return address;
  return { "@type": "PostalAddress", streetAddress: m[1], addressLocality: "Bengaluru", addressRegion: "Karnataka", postalCode: m[2], addressCountry: "IN" };
}

const toPath = (src: string) => (src.startsWith("http") ? src : abs(src));

/**
 * Hotels and Aero Bites as schema.org entities, built only from the venue
 * record. Bombay Kulfi becomes one IceCreamShop per outlet. No ratings or
 * reviews: the review sets are samples.
 */
export function venueJsonLd(venue: Venue) {
  const url = abs(venuePath(venue));
  const base = {
    "@context": "https://schema.org",
    name: venue.name,
    description: venue.intro[0],
    url,
    image: toPath(venue.hero.src),
    ...(venue.logo ? { logo: toPath(venue.logo.src) } : {}),
    ...(venue.contact.phone ? { telephone: venue.contact.phone.display } : {}),
    ...(venue.contact.email ? { email: venue.contact.email } : {}),
    ...(venue.contact.mapsUrl ? { hasMap: venue.contact.mapsUrl } : {}),
    ...(venue.contact.instagram ? { sameAs: [venue.contact.instagram] } : {}),
    parentOrganization: { "@type": "Organization", name: group.name, url: abs("/") },
  };

  if (venue.division === "hospitality") {
    const stars = venue.facts.find((f) => f.label === "Category")?.value.match(/^(\d)-star/)?.[1];
    return {
      ...base,
      "@type": "Hotel",
      ...(venue.contact.address ? { address: postalAddress(venue.contact.address) } : {}),
      ...(stars ? { starRating: { "@type": "Rating", ratingValue: stars } } : {}),
      amenityFeature: venue.highlights.map((h) => ({ "@type": "LocationFeatureSpecification", name: h.label, value: true })),
    };
  }

  if (venue.contact.locations?.length) {
    return venue.contact.locations.map((o) => ({
      ...base,
      "@type": "IceCreamShop",
      name: `${venue.name}, ${o.name}`,
      brand: { "@type": "Brand", name: venue.name },
      address: { "@type": "PostalAddress", streetAddress: [o.name, o.area].filter(Boolean).join(", "), addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
      ...(o.mapsUrl ? { hasMap: o.mapsUrl } : {}),
    }));
  }

  const cuisine = venue.facts.find((f) => f.label === "Cuisine")?.value.split("·").map((s) => s.trim());
  return {
    ...base,
    "@type": "Restaurant",
    ...(venue.contact.address ? { address: postalAddress(venue.contact.address) } : {}),
    ...(cuisine ? { servesCuisine: cuisine } : {}),
  };
}

const DIVISION_TRAIL = {
  hospitality: { name: "Zyra Hospitality", path: "/hospitality" },
  eatry: { name: "Zyra Food & Beverages", path: "/eatry" },
} as const;

/** Everything a brand page adds to the document: the business itself and its breadcrumb trail. */
export function venueSeo(venue: Venue) {
  return [
    ...[venueJsonLd(venue)].flat(),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, DIVISION_TRAIL[venue.division], { name: venue.name, path: venuePath(venue) }]),
  ];
}
