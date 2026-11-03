import type { Division } from "@/modules/showcase/components/DivisionCarousel";
import type { StoryStep } from "@/modules/showcase/components/StickyStory";
import { bombayKulfi, kulfiOutletNames } from "./eatry";

/**
 * The home page (apple-design branch). Catering comes first everywhere (the
 * client's lead business): Delight Caterers, then Bombay Kulfi, then Aero
 * Bites, then the hotels. Photographs under /media/dummy are DUMMY stock
 * images (Unsplash License — free to use, no attribution needed) standing in
 * until the group shoots its own; replace before launch.
 */

const D = (name: string) => `/media/dummy/${name}.webp`;

export const homeHero = {
  kicker: "Catering, kulfi, dining and stays in Bengaluru",
  title: "Feasts that",
  accent: "people remember.",
  rest: "",
  body: "A catering house trusted with Bengaluru's biggest days, the city's favourite kulfi, an all‑day restaurant and three hotels by the airport — one family, one standard of care.",
  // From Delight Caterers' own words: the house's promises, not numbers.
  promises: ["Recipes passed down through generations", "Spices ground in-house", "Every detail, handled by one team"],
  primary: { label: "Enquire now", href: "#enquiry" },
  secondary: { label: "Explore catering", href: "/eatry/delight-caterers" },
  image: { src: "/media/refined/home-hero.webp", alt: "A long dining table laid with flowers and glassware for a celebration" },
  motto: { line: "An unforgettable experience.", by: "Zyra Group · Bengaluru" },
};

/**
 * The two division tiles (catering first): each carries its brands in turn.
 */
export const divisions: Division[] = [
  {
    key: "eatry",
    name: "Zyra Food & Beverages",
    explore: { label: "Explore all eateries", href: "/eatry" },
    brands: [
      {
        name: "Delight Caterers",
        title: "Every occasion,",
        accent: "beautifully served.",
        body: "Weddings, corporate days and house parties — eight cuisines, cooked fresh and served with care.",
        image: { src: D("buffet"), alt: "A catered buffet laid out for guests" },
        primary: { label: "Book a consultation", href: "#enquiry" },
        secondary: { label: "Learn more", href: "/eatry/delight-caterers" },
      },
      {
        name: "Bombay Kulfi",
        title: "Kulfi, the way",
        accent: "Bombay makes it.",
        body: "Made with A2 milk, served with mojitos, boba and momos — at five outlets across Bengaluru.",
        image: { src: "/media/real/kulfi-sitaphal.webp", alt: "A cup of sitaphal ice cream and a sitaphal shake on a pile of custard apples" },
        // The products whole, on the brand's green, rather than a cropped landscape photograph.
        stage: {
          backdrop: "radial-gradient(120% 90% at 50% 100%, #5f9a74 0%, #2d5b43 55%, #1f3f2f 100%)",
          cutouts: bombayKulfi.heroCutouts ?? [],
        },
        primary: { label: "Find an outlet", href: "/eatry/bombay-kulfi" },
        secondary: { label: "Learn more", href: "/eatry/bombay-kulfi" },
      },
      {
        name: "Aero Bites",
        title: "A table,",
        accent: "any time of day.",
        body: "An all-day restaurant on the airport road, for travellers, families and teams.",
        image: { src: "/media/refined/aero-hero.webp", alt: "Plates of pizza and grilled dishes with fresh juice at Aero Bites" },
        primary: { label: "Reserve a table", href: "#enquiry" },
        secondary: { label: "Learn more", href: "/eatry/aero-bites" },
      },
    ],
  },
  {
    key: "hospitality",
    name: "Zyra Hospitality",
    explore: { label: "Explore all hotels", href: "/hospitality" },
    brands: [
      {
        name: "Sterling Plaza",
        title: "Land. Check in.",
        accent: "Exhale.",
        body: "Four-star comfort with suites and kitchenettes, minutes from Kempegowda International Airport.",
        image: { src: "/media/real/plaza-room-terracotta.webp", alt: "A Sterling Plaza deluxe room with a large window and terracotta tones" },
        primary: { label: "Book a stay", href: "/hospitality/sterling-plaza" },
        secondary: { label: "Learn more", href: "/hospitality/sterling-plaza" },
      },
      {
        name: "Sterling Inn",
        title: "Easy rooms,",
        accent: "by the runway.",
        body: "Rated 4.8 by 269 guests on Google — a café, a gym and a short drive to the airport.",
        image: { src: "/media/real/inn-room-bed.webp", alt: "A king room at Sterling Inn" },
        primary: { label: "Book a stay", href: "/hospitality/sterling-inn" },
        secondary: { label: "Learn more", href: "/hospitality/sterling-inn" },
      },
      {
        name: "Olive",
        title: "Quiet rooms,",
        accent: "a hall for the big day.",
        body: "Twin and double rooms, a restaurant and a banquet hall near the airport.",
        image: { src: "/media/real/olive-room-double.webp", alt: "A double room at Olive with sage green walls" },
        primary: { label: "Enquire", href: "#enquiry" },
        secondary: { label: "Learn more", href: "/hospitality/olive" },
      },
    ],
  },
];

/** "One family. Four ways in." — catering first. */
export const storySteps: StoryStep[] = [
  {
    kicker: "Celebrate",
    title: "The big day, handled.",
    body: "Delight Caterers plans and serves weddings, corporate events and house parties — eight cuisines, one dependable team.",
    image: { src: "/media/catering/thali-brass.webp", alt: "A brass thali of dal, curries, biryani, naan, paneer and sweets" },
    link: { label: "Book a consultation", href: "/eatry/delight-caterers" },
  },
  {
    kicker: "Treats",
    title: "Something sweet, all over the city.",
    body: `Kulfi made with A2 milk, with mojitos, boba and momos — at ${kulfiOutletNames}.`,
    image: { src: "/media/real/kulfi-kesar-pista.webp", alt: "A tub of Kesar Pista kulfi beside squares of paan ice cream" },
    link: { label: "Visit Bombay Kulfi", href: "/eatry/bombay-kulfi" },
  },
  {
    kicker: "Dine",
    title: "A table, any time of day.",
    body: "Aero Bites serves North Indian and coastal plates from breakfast to late dinner, for travellers, families and teams.",
    image: { src: "/media/real/aero-spread.webp", alt: "Dal, chicken biryani, butter chicken, naan and raita at Aero Bites" },
    link: { label: "See Aero Bites", href: "/eatry/aero-bites" },
  },
  {
    kicker: "Stay",
    title: "Rest, right by the runway.",
    body: "Sterling Plaza, Sterling Inn and Olive sit minutes from Kempegowda International Airport — early flights, late landings, long meetings.",
    image: { src: "/media/real/plaza-room-teal.webp", alt: "A Sterling Plaza room with a teal accent wall" },
    link: { label: "Explore our hotels", href: "/hospitality" },
  },
];
