import type { IconName } from "@/components/ui/Icon";

/** A photograph from public/media. */
export type Photo = { src: string; alt: string };

/** One of the group's businesses — a hotel or a food brand — as the shared brand-page template renders it. */
export type Venue = {
  slug: string;
  division: "hospitality" | "eatry";
  name: string;
  /** Short category line, e.g. "Hotel · Bengaluru Airport". */
  kind: string;
  tagline: string;
  /** Logo on a light background (null: the name is set in type instead). */
  logo: { src: string; width: number; height: number } | null;
  /** Logo that reads on the dark hero, if different. */
  logoOnDark?: { src: string; width: number; height: number };
  hero: Photo;
  /** Show the hero photo as a framed print (for portrait or small photos). */
  heroInset?: boolean;
  /** A short claim shown as a badge on the hero (e.g. the master franchise). */
  heroBadge?: string;
  /** The hero's line, when it should differ from the first intro paragraph. */
  heroBody?: string;
  intro: string[];
  /** Quick facts beside the intro. */
  facts: { label: string; value: string }[];
  highlights: { icon: IconName; label: string }[];
  /** Up to three feature panels: rooms, dining, events… */
  spaces: { title: string; body: string; image: Photo }[];
  gallery: Photo[];
  reels?: { caption: string; poster: string; video: string; href: string }[];
  faqs?: { q: string; a: string }[];
  contact: {
    address?: string;
    phone?: { display: string; href: string };
    email?: string;
    mapsUrl?: string;
    /** What the embedded map searches for, when the name alone would pin the wrong place. */
    mapQuery?: string;
    instagram?: string;
  };
  /** Primary call to action: a booking engine, or the enquiry popup ("#enquiry"). */
  cta: { label: string; href: string; external?: boolean };
};
