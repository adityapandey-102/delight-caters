import type { TileData } from "@/modules/showcase/components/Tile";
import type { StoryStep } from "@/modules/showcase/components/StickyStory";

/**
 * The home page (apple-design branch). Photographs under /media/dummy are
 * DUMMY stock images (Unsplash License — free to use, no attribution needed)
 * standing in until the group shoots its own; replace before launch.
 */

const D = (name: string) => `/media/dummy/${name}.webp`;

export const homeHero = {
  kicker: "Zyra Group",
  title: "An",
  accent: "unforgettable",
  rest: "experience.",
  body: "Three hotels by Bengaluru Airport, the city's favourite kulfi, an all-day restaurant and a catering house. One family, one standard of care.",
  primary: { label: "Plan your event", href: "#enquiry" },
  secondary: { label: "Find a stay", href: "/hospitality" },
  image: { src: D("hotel-night"), alt: "A hotel lit up at dusk" },
  caption: "Delight Hospitality · Delight Eatry · Bengaluru",
};

export const featureTiles: TileData[] = [
  {
    theme: "dark",
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
  {
    theme: "light",
    kicker: "Delight Caterers",
    title: "Feasts that",
    accent: "people remember.",
    body: "Weddings, corporate days and house parties — eight cuisines, cooked fresh and served with care.",
    links: [
      { label: "Plan a celebration", href: "#enquiry", primary: true },
      { label: "Learn more", href: "/eatry/delight-caterers" },
    ],
    image: { src: D("buffet"), alt: "A catered buffet laid out for guests" },
  },
];

export const gridTiles: TileData[] = [
  {
    theme: "dark",
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
    title: "Sterling Inn",
    body: "Rated 4.8 by 269 guests. Easy rooms, a café and a gym.",
    links: [
      { label: "Book a stay", href: "/hospitality/sterling-inn", primary: true },
      { label: "Learn more", href: "/hospitality/sterling-inn" },
    ],
    image: { src: D("room-classic"), alt: "A bright, classic hotel room" },
  },
  {
    theme: "dark",
    title: "Aero Bites",
    body: "An all-day restaurant on the airport road. Come hungry.",
    links: [
      { label: "Reserve a table", href: "#enquiry", primary: true },
      { label: "Learn more", href: "/eatry/aero-bites" },
    ],
    image: { src: D("restaurant"), alt: "A restaurant dining room in the evening" },
  },
  {
    theme: "dark",
    title: "Olive",
    body: "Twin and double rooms, a restaurant and a banquet hall near the airport.",
    links: [
      { label: "Enquire", href: "#enquiry", primary: true },
      { label: "Learn more", href: "/hospitality/olive" },
    ],
    image: { src: D("room-warm"), alt: "A warmly lit hotel room" },
  },
  {
    theme: "dark",
    title: "Banquets & events",
    body: "Halls, menus and a team who has done this a thousand times.",
    links: [
      { label: "Plan your event", href: "#enquiry", primary: true },
      { label: "See Olive's hall", href: "/hospitality/olive" },
    ],
    image: { src: D("banquet"), alt: "A banquet hall under chandeliers" },
  },
];

export const storySteps: StoryStep[] = [
  {
    kicker: "Stay",
    title: "Rest, right by the runway.",
    body: "Sterling Plaza, Sterling Inn and Olive sit minutes from Kempegowda International Airport — early flights, late landings, long meetings.",
    image: { src: D("room-modern"), alt: "A modern hotel room" },
    link: { label: "Explore our hotels", href: "/hospitality" },
  },
  {
    kicker: "Dine",
    title: "A table, any time of day.",
    body: "Aero Bites serves North Indian and coastal plates from breakfast to late dinner, for travellers, families and teams.",
    image: { src: D("fine-dining"), alt: "A plated dish at a restaurant table" },
    link: { label: "See Aero Bites", href: "/eatry/aero-bites" },
  },
  {
    kicker: "Treats",
    title: "Something sweet on Commercial Street.",
    body: "Bombay Kulfi pours its kulfi from A2 milk, and pairs it with mojitos, boba and momos.",
    image: { src: D("cones"), alt: "Colourful ice cream cones" },
    link: { label: "Visit Bombay Kulfi", href: "/eatry/bombay-kulfi" },
  },
  {
    kicker: "Celebrate",
    title: "The big day, handled.",
    body: "Delight Caterers plans and serves weddings, corporate events and house parties — eight cuisines, one dependable team.",
    image: { src: D("thali"), alt: "A thali of Indian dishes" },
    link: { label: "Plan a celebration", href: "/eatry/delight-caterers" },
  },
];
