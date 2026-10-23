import type { TileData } from "@/modules/showcase/components/Tile";
import type { StoryStep } from "@/modules/showcase/components/StickyStory";

/**
 * The home page (apple-design branch). Catering comes first everywhere (the
 * client's lead business): Delight Caterers, then Bombay Kulfi, then Aero
 * Bites, then the hotels. Photographs under /media/dummy are DUMMY stock
 * images (Unsplash License — free to use, no attribution needed) standing in
 * until the group shoots its own; replace before launch.
 */

const D = (name: string) => `/media/dummy/${name}.webp`;

export const homeHero = {
  kicker: "Catering · Kulfi · Dining · Stays",
  title: "An",
  accent: "unforgettable",
  rest: "experience.",
  body: "A catering house trusted with Bengaluru's biggest days, the city's favourite kulfi, an all‑day restaurant and three hotels by the airport — one family, one standard of care.",
  facts: [
    { value: "8", label: "cuisines, catered fresh" },
    { value: "6", label: "brands, one family" },
    { value: "4.8★", label: "Sterling Inn on Google" },
  ],
  primary: { label: "Enquire now", href: "#enquiry" },
  secondary: { label: "Explore catering", href: "/eatry/delight-caterers" },
  image: { src: D("event-table"), alt: "A long table laid with flowers and glassware for a celebration" },
  caption: "Delight Caterers · tables set for the season",
};

export const featureTiles: TileData[] = [
  {
    theme: "light",
    kicker: "Delight Caterers",
    title: "Feasts that",
    accent: "people remember.",
    body: "Weddings, corporate days and house parties — eight cuisines, cooked fresh and served with care.",
    links: [
      { label: "Book a consultation", href: "#enquiry", primary: true },
      { label: "Learn more", href: "/eatry/delight-caterers" },
    ],
    image: { src: D("buffet"), alt: "A catered buffet laid out for guests" },
  },
  {
    theme: "light",
    kicker: "Delight Hospitality",
    title: "Land. Check in.",
    accent: "Exhale.",
    body: "Three hotels minutes from Kempegowda International Airport — for one night, one week or one big meeting.",
    links: [
      { label: "Explore our hotels", href: "/hospitality", primary: true },
      { label: "Sterling Plaza", href: "/hospitality/sterling-plaza" },
    ],
    image: { src: D("room-suite"), alt: "A calm hotel suite with warm light" },
  },
];

/** The brand grid: Delight Eatry first (Caterers, Kulfi, Aero Bites), then the hotels. */
export const gridTiles: TileData[] = [
  {
    theme: "light",
    title: "Delight Caterers",
    body: "Weddings, corporate events and celebrations — menus, service and setup, handled.",
    links: [
      { label: "Book a consultation", href: "#enquiry", primary: true },
      { label: "Learn more", href: "/eatry/delight-caterers" },
    ],
    image: { src: D("banquet"), alt: "A banquet hall set for a celebration" },
  },
  {
    theme: "light",
    title: "Bombay Kulfi",
    body: "Kulfi made with A2 milk, mojitos and boba — on Commercial Street.",
    links: [
      { label: "Visit us", href: "/eatry/bombay-kulfi", primary: true },
      { label: "See the menu", href: "/eatry/bombay-kulfi" },
    ],
    image: { src: D("cone"), alt: "An ice cream cone held against a sunny wall" },
  },
  {
    theme: "light",
    title: "Aero Bites",
    body: "An all-day restaurant on the airport road. Come hungry.",
    links: [
      { label: "Reserve a table", href: "#enquiry", primary: true },
      { label: "Learn more", href: "/eatry/aero-bites" },
    ],
    image: { src: D("restaurant"), alt: "A restaurant dining room in the evening" },
  },
  {
    theme: "light",
    title: "Sterling Plaza",
    body: "Four-star comfort, suites with kitchenettes, minutes from the airport.",
    links: [
      { label: "Book a stay", href: "/hospitality/sterling-plaza", primary: true },
      { label: "Learn more", href: "/hospitality/sterling-plaza" },
    ],
    image: { src: "/media/sterling-plaza/lobby.webp", alt: "The lobby at Sterling Plaza" },
    logo: null,
  },
  {
    theme: "light",
    title: "Sterling Inn",
    body: "Rated 4.8 by 269 guests. Easy rooms, a café and a gym.",
    links: [
      { label: "Book a stay", href: "/hospitality/sterling-inn", primary: true },
      { label: "Learn more", href: "/hospitality/sterling-inn" },
    ],
    image: { src: D("room-classic"), alt: "A bright, classic hotel room" },
  },
  {
    theme: "light",
    title: "Olive",
    body: "Twin and double rooms, a restaurant and a banquet hall near the airport.",
    links: [
      { label: "Enquire", href: "#enquiry", primary: true },
      { label: "Learn more", href: "/hospitality/olive" },
    ],
    image: { src: D("room-warm"), alt: "A warmly lit hotel room" },
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
    title: "Something sweet on Commercial Street.",
    body: "Bombay Kulfi pours its kulfi from A2 milk, and pairs it with mojitos, boba and momos.",
    image: { src: D("cones"), alt: "Colourful ice cream cones" },
    link: { label: "Visit Bombay Kulfi", href: "/eatry/bombay-kulfi" },
  },
  {
    kicker: "Dine",
    title: "A table, any time of day.",
    body: "Aero Bites serves North Indian and coastal plates from breakfast to late dinner, for travellers, families and teams.",
    image: { src: D("fine-dining"), alt: "A plated dish at a restaurant table" },
    link: { label: "See Aero Bites", href: "/eatry/aero-bites" },
  },
  {
    kicker: "Stay",
    title: "Rest, right by the runway.",
    body: "Sterling Plaza, Sterling Inn and Olive sit minutes from Kempegowda International Airport — early flights, late landings, long meetings.",
    image: { src: D("room-modern"), alt: "A modern hotel room" },
    link: { label: "Explore our hotels", href: "/hospitality" },
  },
];
