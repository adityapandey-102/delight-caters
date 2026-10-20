/** DUMMY campaigns — replace with real events and tie-ups. */
export type Campaign = {
  id: string;
  kind: "Event" | "Tie-up" | "Season" | "Launch";
  brand: string;
  title: string;
  dates: string;
  summary: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
};

export const groupCampaigns: Campaign[] = [
  {
    id: "navratri-olive",
    kind: "Event",
    brand: "Olive",
    title: "Navratri Evenings at Olive",
    dates: "Oct 2026",
    summary:
      "Nine festive nights of garba-inspired gatherings, a vegetarian thali spread and live music in the Olive banquet.",
    image: { src: "/media/olive/banquet.webp", alt: "Olive banquet hall set for a festive evening" },
    cta: { label: "Reserve an evening", href: "#enquiry" },
  },
  {
    id: "corporate-long-stay",
    kind: "Tie-up",
    brand: "Sterling Inn",
    title: "Corporate Long-Stay Programme",
    dates: "Ongoing · 2026",
    summary:
      "A dedicated stay programme for airport-area companies, with flexible terms, meals on request and a single point of contact.",
    image: { src: "/media/sterling-inn/room.webp", alt: "Comfortable guest room at Sterling Inn" },
    cta: { label: "Talk to our team", href: "#enquiry" },
  },
  {
    id: "wedding-tastings",
    kind: "Season",
    brand: "Delight Caterers",
    title: "Wedding-Season Tastings",
    dates: "Weekends · Nov–Dec 2026",
    summary:
      "Sit down with our chefs, sample signature menus and plan every course of your celebration before the season begins.",
    image: { src: "/images/svc-wedding.webp", alt: "Wedding feast laid out by Delight Caterers" },
    cta: { label: "Book a tasting", href: "/eatry/delight-caterers" },
  },
  {
    id: "kulfi-of-the-month",
    kind: "Launch",
    brand: "Bombay Kulfi",
    title: "Kulfi of the Month: Guava Chilli",
    dates: "Oct 2026",
    summary:
      "A sweet, tangy and gently spiced kulfi inspired by Bengaluru street flavours, served at our Commercial Street counter.",
    image: { src: "/media/bombay-kulfi/guava-kulfi.webp", alt: "Guava chilli kulfi at Bombay Kulfi" },
    cta: { label: "Visit Bombay Kulfi", href: "/eatry/bombay-kulfi" },
  },
];

export const hospitalityCampaigns: Campaign[] = [
  {
    id: "conference-season-plaza",
    kind: "Season",
    brand: "Sterling Plaza",
    title: "Conference Season at Sterling Plaza",
    dates: "Sep–Dec 2026",
    summary:
      "Boardroom-ready spaces, seamless AV and tailored catering for offsites, product launches and annual meets near the airport.",
    image: { src: "/media/sterling-plaza/conference.webp", alt: "Conference hall at Sterling Plaza" },
    cta: { label: "Plan your event", href: "#enquiry" },
  },
  {
    id: "navratri-olive-hospitality",
    kind: "Event",
    brand: "Olive",
    title: "Navratri Evenings at Olive",
    dates: "Oct 2026",
    summary:
      "Festive dinners and cultural evenings in an elegant setting, with a vegetarian menu crafted for the season.",
    image: { src: "/media/olive/restaurant.webp", alt: "Olive restaurant dining room" },
    cta: { label: "Explore Olive", href: "/hospitality/olive" },
  },
  {
    id: "airport-corporate-tieup",
    kind: "Tie-up",
    brand: "Sterling Plaza",
    title: "Airport-Area Corporate Tie-ups",
    dates: "Ongoing · 2026",
    summary:
      "Partner programmes for companies around Kempegowda airport covering stays, meetings and hosted dinners under one roof.",
    image: { src: "/media/sterling-plaza/lobby-lounge.webp", alt: "Lobby lounge at Sterling Plaza" },
    cta: { label: "Become a partner", href: "#enquiry" },
  },
];

export const eatryCampaigns: Campaign[] = [
  {
    id: "aero-bites-launch",
    kind: "Launch",
    brand: "Aero Bites",
    title: "Aero Bites Launch Evening",
    dates: "Nov 2026",
    summary:
      "An opening evening of chef-led tasting plates and signature bites, made for travellers and neighbours alike.",
    image: { src: "/images/cuisine-continental.webp", alt: "Continental plate from Aero Bites" },
    cta: { label: "Discover Aero Bites", href: "/eatry/aero-bites" },
  },
  {
    id: "kulfi-guava-chilli",
    kind: "Season",
    brand: "Bombay Kulfi",
    title: "Kulfi of the Month: Guava Chilli",
    dates: "Oct 2026",
    summary:
      "Our monthly small-batch kulfi returns with a guava and chilli twist, paired with a chilled mojito.",
    image: { src: "/media/bombay-kulfi/mojito.webp", alt: "Mojito served at Bombay Kulfi" },
    cta: { label: "Visit Bombay Kulfi", href: "/eatry/bombay-kulfi" },
  },
  {
    id: "corporate-catering-tieup",
    kind: "Tie-up",
    brand: "Delight Caterers",
    title: "Corporate Catering Partnerships",
    dates: "Ongoing · 2026",
    summary:
      "Daily meal service, leadership lunches and event buffets for offices, with menus curated around your team.",
    image: { src: "/images/svc-corporate.webp", alt: "Corporate catering spread by Delight Caterers" },
    cta: { label: "Start a conversation", href: "/eatry/delight-caterers" },
  },
];
