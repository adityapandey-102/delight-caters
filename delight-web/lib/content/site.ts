/**
 * Every word and fact on the site, in one place.
 *
 * The copy is taken verbatim from the previous WordPress site
 * (delightcaters.in — Home, About Us, Service, Contact Us, fetched 13 Oct 2026).
 * Where the old site wrote "Delight Caters" and where the logo says "Delight
 * Caterers", both are kept as written. Change words here, not in components.
 */

/* ------------------------------------------------------------------ brand */

export const company = {
  name: "Delight Caterers",
  /** As the old site's copy and copyright line write it. */
  shortName: "Delight Caters",
  parent: "Delight Hospitality",
  tagline: "Taste of Tradition",
  city: "Bengaluru",
  domain: "https://delightcaters.in",
  copyright: "© 2026 Delight Caters. All rights reserved.",
} as const;

export const contact = {
  phoneDisplay: "+91 91879 18179",
  phoneHref: "tel:+919187918179",
  /** wa.me wants digits only, with the country code. */
  whatsappNumber: "919187918179",
  whatsappGreeting: "Hi Delight Caters, I'm interested in your catering services. Please share more details.",
  email: "info@delightcaters.in",
  hours: "9 AM – 10 PM (All Day)",
  address: {
    street: "8/1, Hunsemaranahalli, Next to Indian Oil Petrol Pump",
    road: "New Kempegowda International Airport Road",
    locality: "Hunasamaranahalli",
    region: "Karnataka",
    postalCode: "562157",
    /** One line, exactly as the old footer printed it. */
    full: "8/1, Hunsemaranahalli, Next to Indian Oil Petrol Pump, New Kempegowda International Airport Road, Hunasamaranahalli, Karnataka 562157",
  },
  /** Short form used on the old contact page. */
  locationShort: "Bangalore, Karnataka",
  /**
   * Hunasamaranahalli on the airport road (NH44). Replace with the Google
   * Business Profile link once the listing is confirmed, for an exact pin.
   */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hunasamaranahalli%2C%20Bengaluru%2C%20Karnataka%20562157",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Hunasamaranahalli%2C%20Bengaluru%2C%20Karnataka%20562157&z=14&output=embed",
} as const;

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappGreeting)}`;

export const social = {
  instagram: { label: "@delightcaterersblr", href: "https://www.instagram.com/delightcaterersblr" },
  linkedin: { label: "Delight Caterers", href: "https://www.linkedin.com/company/delight-caterers-blr/" },
} as const;

/** Same slugs as the old WordPress site, so existing links and search results keep working. */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Service", href: "/service" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

/* -------------------------------------------------------------- home: hero */

export const hero = {
  eyebrow: "Delight Caters.",
  /** "More than catering we create Experience", set over two lines. */
  lines: ["More than catering,", "we create Experience"],
  body: "Recipes passed down through generations. Spices ground in-house. Flavours that stay with your guests long after the celebration is over. We take care of every part of your catering, so you can truly be present at your own event.",
  primaryCta: "Book a consultation",
  secondaryCta: "Get in Touch",
  image: "/media/refined/caterers-hero.webp",
  imageAlt: "A server plating a dish at a long table laid with flowers, candles and glassware",
} as const;

export const marqueeWords = [
  "Weddings",
  "Corporate Catering",
  "Hi-Teas",
  "Sangeet & Reception",
  "Annual Day Celebrations",
  "House Parties",
  "Product Launches",
  "Nutrition & Wellness",
];

/* ---------------------------------------------------------------- welcome */

export const welcome = {
  title: "Welcome to Delight Caterers",
  paragraphs: [
    "Delight Caterers is a Bengaluru-based catering company under Delight Hospitality, delivering exceptional food and hospitality experiences across corporate, institutional, wedding, and special events.",
    "From everyday institutional requirements to large-scale corporate engagements and celebrations, we offer thoughtfully curated menus, consistent quality, and professional service tailored to every occasion.",
    "With a commitment to excellence in food, presentation, and service, we strive to make every gathering a truly memorable experience.",
  ],
} as const;

/* --------------------------------------------------------------- services */

export type Service = {
  key: "corporate" | "event" | "wedding" | "casual";
  title: string;
  body: string;
  items: string[];
  image: string;
  imageAlt: string;
};

export const servicesTitle = "Catering For Every Occasion";

export const services: Service[] = [
  {
    key: "corporate",
    title: "Corporate Catering",
    body: "Reliable office catering for meetings, employee meals, and everyday corporate needs.",
    items: ["Office Lunch Catering", "Conference", "Hi-Teas", "Employee Meal Services"],
    image: "/images/svc-corporate.webp",
    imageAlt: "Corporate Catering",
  },
  {
    key: "event",
    title: "Event Catering",
    body: "Full-service catering for annual functions, product launches, and large business events.",
    items: ["Annual Day Celebrations", "Industrial Catering", "Wedding Catering", "Product Launches"],
    image: "/images/svc-event.webp",
    imageAlt: "Event Catering",
  },
  {
    key: "wedding",
    title: "Wedding",
    body: "Elegant wedding catering with custom menus for every ceremony and celebration.",
    items: ["Engagement", "Haldi", "Sangeet", "Reception"],
    image: "/images/svc-wedding.webp",
    imageAlt: "Wedding",
  },
  {
    key: "casual",
    title: "Casual Event",
    body: "Easy, relaxed catering for house parties, get-togethers, and small gatherings.",
    items: ["House Parties", "Birthday", "Bachelor Party", "Small Gatherings"],
    image: "/images/svc-casual.webp",
    imageAlt: "Casual Event",
  },
];

/* --------------------------------------------------------------- cuisines */

export type Cuisine = { title: string; body: string; image: string; imageAlt: string };

export const cuisinesIntro = {
  title: "Cuisines we offer",
  body: "At Delight Caters, we bring you an unforgettable culinary journey with our wide range of cuisines, perfect for weddings, corporate events, private parties, and outdoor catering in Bangalore. Our expert chefs combine fresh ingredients, authentic recipes, and impeccable presentation to delight your guests.",
  cta: "Enquire Now",
} as const;

export const cuisines: Cuisine[] = [
  {
    title: "North Indian",
    body: "Experience the richness of North Indian catering in Bangalore, from creamy paneer butter masala and aromatic biryanis to tandoor-baked breads. Ideal for royal wedding menus, festive spreads, and premium events.",
    image: "/images/cuisine-north-indian.webp",
    imageAlt: "North Indian",
  },
  {
    title: "South Indian",
    body: "Celebrate tradition with fluffy idlis, crisp dosas, tangy sambar, and coconut chutneys. Our South Indian catering is perfect for temple weddings, cultural events, and traditional celebrations.",
    image: "/images/cuisine-south-indian.webp",
    imageAlt: "South Indian",
  },
  {
    title: "Asian & Oriental",
    body: "From wok-tossed noodles to sushi rolls and dim sum, our Asian catering menus add an exotic twist to your celebrations. A hit for modern weddings and themed events.",
    image: "/images/cuisine-asian.webp",
    imageAlt: "Asian & Oriental",
  },
  {
    title: "Coastal & Seafood Specialties",
    body: "Fresh catches cooked with coastal spices, prawn curry, fish fry, crab masala. A favourite among seafood catering lovers in Bangalore for beach-themed parties, outdoor gatherings, and special occasions.",
    image: "/images/cuisine-coastal.webp",
    imageAlt: "Coastal & Seafood Specialties",
  },
  {
    title: "Fusion & Modern Indian",
    body: "Innovative dishes that blend Indian spices with global flavours. Great for couples and hosts seeking a unique wedding menu in Bangalore.",
    image: "/images/cuisine-fusion.webp",
    imageAlt: "Fusion & Modern Indian",
  },
  {
    title: "Continental",
    body: "Elegant and versatile — pastas, grilled meats, garden-fresh salads, and artisan breads. Perfect for corporate catering in Bangalore, cocktail receptions, and international-themed weddings.",
    image: "/images/cuisine-continental.webp",
    imageAlt: "Continental",
  },
  {
    title: "Mediterranean",
    body: "Healthy yet flavourful — hummus, falafel, grilled kebabs, and fresh salads. Popular for wellness retreats, gourmet buffets, and luxury events.",
    image: "/images/cuisine-mediterranean.webp",
    imageAlt: "Mediterranean",
  },
  {
    title: "Desserts & Patisserie",
    body: "End your celebration on a sweet note with our dessert catering — from traditional Indian mithai to gourmet cakes, pastries, and plated desserts. Our dessert catering ensures every event ends on a sweet note.",
    image: "/images/cuisine-desserts.webp",
    imageAlt: "Desserts & Patisserie",
  },
];

/* -------------------------------------------------------------- nutrition */

export const nutrition = {
  title: "Personalized Nutrition & Wellness",
  paragraphs: [
    "Delight Caters provides personalized nutrition and wellness support to help employees make healthier everyday food choices.",
    "We offer monthly subscription plans that include personalized dietary guidance and ongoing nutrition support, making professional wellness guidance simple and accessible for employees.",
  ],
  /** The middle paragraph, split so the dietitian's name can be set in bold. */
  lead: {
    before: "Our nutrition guidance is led by ",
    name: "Dt. Radhika Rani",
    after: ", Registered Dietitian with 14+ years of clinical experience, offering evidence-based nutrition plans tailored to individual needs and goals.",
  },
  dietitian: { name: "Dt. Radhika Rani", role: "Registered Dietitian", experience: "14+ years of clinical experience" },
  cta: "Contact Us",
  image: "/images/nutrition.webp",
  imageAlt: "Personalized Nutrition & Wellness",
} as const;

/* --------------------------------------------------------------- approach */

export const approach = {
  title: "Our Unique Approach",
  items: [
    {
      title: "Exquisite Personalized Service",
      body: "At Delight Caters, we collaborate with you to curate a menu that reflects your preferences, aligns with your budget, and embodies your style.",
    },
    {
      title: "Dedicated Team of Experts",
      body: "Our dedicated team comprises culinary artists, service staff, and beverage connoisseurs who are devoted to ensuring that your event is nothing short of extraordinary.",
    },
    {
      title: "Uncompromising Quality",
      body: "We prioritize locally sourced, premium ingredients to deliver a culinary experience that is unparalleled in taste and freshness.",
    },
  ],
} as const;

/* -------------------------------------------------------------------- faq */

export const faqIntro = {
  title: "Frequently Asked Questions",
  body: "Everything you need to know about our catering services, menus, events and the experience we create for every occasion.",
  contactTitle: "Need more information?",
  contactBody: "Speak with our catering team today.",
  contactCta: "Contact Us",
} as const;

export const faqs = [
  {
    q: "What type of events do you cater?",
    a: "We provide catering services for weddings, corporate events, private parties, birthdays, engagements, social gatherings and special celebrations.",
  },
  {
    q: "Can you customise the menu?",
    a: "Yes. Our menus can be customised according to your preferences, event requirements, guest count and style of celebration.",
  },
  {
    q: "Do you provide vegetarian options?",
    a: "Absolutely. We offer a wide range of vegetarian dishes and can create a complete vegetarian menu based on your requirements.",
  },
  {
    q: "How early should I book catering?",
    a: "We recommend booking as early as possible, especially for weddings and large events, so we can plan your menu and arrangements perfectly.",
  },
  {
    q: "Do you provide complete event catering?",
    a: "Yes. From menu planning and food preparation to presentation and service, our team can provide complete catering support for your event.",
  },
  {
    q: "How can I get a catering quote?",
    a: "Simply get in touch with our team and share your event date, location, guest count and catering requirements. We will help you with the right package and quotation.",
  },
] as const;

/* ------------------------------------------------------------------ about */

export const aboutStory = {
  eyebrow: "Our Promise",
  title: "More Than a Meal, It's an Experience",
  paragraphs: [
    "Every event we cater is built around three things: a memorable experience, thoughtfully prepared cuisine, and the satisfaction of every guest at the table.",
    "Our menus span a wide range of cuisines — from classic Indian favourites to global flavours — each one prepared with fresh ingredients and genuine care.",
    "What matters most to us is how your guests feel by the end of the meal. That focus on satisfaction, on every plate and every event, is what shapes everything we do.",
  ],
  image: "/images/about-story.webp",
  imageAlt: "Delight Caters catering setup",
} as const;

export const missionVision = {
  eyebrow: "What Drives Us",
  title: "Our Mission & Vision",
  body: "Every event we cater is guided by two simple ideas — why we do what we do, and where we want to take it.",
  mission: {
    title: "Our Mission",
    body: "To bring fresh, thoughtfully prepared food to every celebration we serve — using quality ingredients and careful preparation — so our guests taste care in every bite, and hosts can be fully present at their own event.",
  },
  vision: {
    title: "Our Vision",
    body: "To become Bangalore's most trusted name in catering — known not just for the range of cuisines we offer, but for the consistency, personal attention, and impeccable presentation.",
  },
} as const;

/* ---------------------------------------------------------------- venues */

export const eventExperience = {
  title: "A Complete Event Experience",
  paragraphs: [
    "At Delight Hospitality, we make it easy to plan your event your way. Choose a venue that suits your occasion, and our catering team will take care of the food and service. If you don't have a venue yet, we can help with that too.",
    "We have three hospitality venues near Bangalore Airport — Hofen Sterling Plaza, Echo Sterling Inn, and Olive — giving you convenient options for stays, meetings, celebrations, and events. With our own banquet hall, you can bring your stay, conference, seminar, and catering together under one roof, making event planning simple, seamless, and hassle-free.",
  ],
  venues: ["Hofen Sterling Plaza", "Echo Sterling Inn", "Olive"],
  images: [
    { src: "/images/venue-1.webp", alt: "Delight Hospitality venue" },
    { src: "/images/venue-2.webp", alt: "Delight Hospitality venue" },
    { src: "/images/venue-3.webp", alt: "Delight Hospitality venue" },
    { src: "/images/venue-4.webp", alt: "Delight Hospitality venue" },
    { src: "/images/venue-5.webp", alt: "Delight Hospitality venue" },
    { src: "/images/venue-6.webp", alt: "Delight Hospitality venue" },
  ],
} as const;

/* ---------------------------------------------------------------- contact */

export const contactPage = {
  eyebrow: "Get In Touch",
  title: "Let's make it unforgettable",
  body: "Fill in a few quick details below and we'll send your enquiry straight to WhatsApp — get a personalised quote in minutes.",
  detailsTitle: "Contact Details",
  detailsBody: "Prefer to reach out directly? Here's how you can find us.",
} as const;

export const eventTypes = ["Wedding", "Birthday", "Function", "Corporate Event", "Other"] as const;
export const foodTypes = ["Veg", "Non-Veg", "Both"] as const;

/* ----------------------------------------------------------------- reels */

/**
 * Watch & Savour — @delightcaterersblr reels, self-hosted (Instagram's own
 * 720×1280 MP4s, checked clean before adding). Captions are the first line of
 * each Instagram caption. `poster` is a still from the reel. Set `href` to a
 * reel's own permalink (https://www.instagram.com/reel/<id>/) when known;
 * until then cards open the profile.
 */
export type Reel = { caption: string; poster: string; video?: string; href: string };

export const reels: Reel[] = [
  {
    caption: "From the presentation to the flavours",
    poster: "/images/reels/reel-corporate.webp",
    video: "/instagram-videos/reel-corporate.mp4",
    href: social.instagram.href,
  },
  {
    caption: "Some flavours don't need a filter",
    poster: "/images/reels/reel-flavours.webp",
    video: "/instagram-videos/reel-flavours.mp4",
    href: social.instagram.href,
  },
  {
    caption: "Some moments don't need a reason",
    poster: "/images/reels/reel-moments.webp",
    video: "/instagram-videos/reel-moments.mp4",
    href: social.instagram.href,
  },
  {
    caption: "When our food speaks for itself",
    poster: "/images/reels/reel-ganesha.webp",
    video: "/instagram-videos/reel-ganesha.mp4",
    href: social.instagram.href,
  },
];

/* ------------------------------------------------- placeholders (to replace) */

/**
 * PLACEHOLDER — Google reviews. These are layout stand-ins, not real reviews:
 * replace with genuine reviews from the Google Business Profile (or wire the
 * Places API) before launch. While `isPlaceholder` is true the section labels
 * itself as a preview and shows no rating number.
 */
export const googleReviews = {
  isPlaceholder: true,
  /** Fill in from the Google Business Profile, e.g. 4.9 */
  rating: null as number | null,
  /** e.g. 128 */
  count: null as number | null,
  profileUrl: contact.mapsUrl,
  reviews: [
    { name: "Reviewer name", meta: "Google review", text: "A genuine guest review from Google will appear here — replace this card with the reviewer's words, name and date." },
    { name: "Reviewer name", meta: "Google review", text: "A genuine guest review from Google will appear here — replace this card with the reviewer's words, name and date." },
    { name: "Reviewer name", meta: "Google review", text: "A genuine guest review from Google will appear here — replace this card with the reviewer's words, name and date." },
    { name: "Reviewer name", meta: "Google review", text: "A genuine guest review from Google will appear here — replace this card with the reviewer's words, name and date." },
    { name: "Reviewer name", meta: "Google review", text: "A genuine guest review from Google will appear here — replace this card with the reviewer's words, name and date." },
    { name: "Reviewer name", meta: "Google review", text: "A genuine guest review from Google will appear here — replace this card with the reviewer's words, name and date." },
  ],
};
