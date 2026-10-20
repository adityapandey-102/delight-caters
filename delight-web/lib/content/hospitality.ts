import type { Venue } from "./types";

/**
 * Delight Hospitality — the group's hotels near Kempegowda International
 * Airport. Facts and copy from sterlinginnhotels.com (incl. /sterling-plaza)
 * and delighthospitality.in, lightly corrected for grammar; photographs from
 * the hotels' brochures; reel captions from their Instagram posts. Room rates
 * and offers from the old sites are deliberately not used.
 */

export const hospitality = {
  name: "Delight Hospitality",
  slug: "hospitality",
  eyebrow: "Hotels near Bengaluru Airport",
  title: ["Stays that feel", "effortlessly right"] as const,
  intro: [
    "Delight Hospitality is a growing hospitality business built on quality, trust and a commitment to excellence. Each of our hotels has its own identity — all guided by one shared vision.",
    "Located near Kempegowda International Airport, our hotels offer a blend of luxury, comfort and value: 85 well-equipped rooms across the Sterling hotels, including suites with kitchenettes, high-speed internet, banquet halls and conference facilities.",
  ],
  hero: { src: "/media/sterling-plaza/lobby.webp", alt: "The double-height lobby at Sterling Plaza" },
  facilities: [
    { icon: "plane", label: "Close to the airport" },
    { icon: "car", label: "Airport pickup" },
    { icon: "wifi", label: "Free high-speed Wi-Fi" },
    { icon: "users", label: "Conference & banquet halls" },
    { icon: "coffee", label: "Café & in-house dining" },
    { icon: "shield", label: "Secured parking" },
  ] as const,
  reels: [
    { caption: "Some stays are simply effortless", poster: "/media/hospitality/plaza-effortless.webp", video: "/media/hospitality/plaza-effortless.mp4", href: "/hospitality/sterling-plaza" },
    { caption: "A little luxury, a little calm", poster: "/media/hospitality/olive-calm.webp", video: "/media/hospitality/olive-calm.mp4", href: "/hospitality/olive" },
    { caption: "You found your little escape in Bengaluru", poster: "/media/hospitality/plaza-escape.webp", video: "/media/hospitality/plaza-escape.mp4", href: "/hospitality/sterling-plaza" },
    { caption: "Your room is ready — unwind", poster: "/media/hospitality/olive-reel.webp", video: "/media/hospitality/olive-reel.mp4", href: "/hospitality/olive" },
  ],
};

const sterlingReservations = "Reservations@sterlinginnhotels.com";
const sterlingPhone = { display: "+91 77958 96731", href: "tel:+917795896731" };

export const sterlingInn: Venue = {
  slug: "sterling-inn",
  division: "hospitality",
  name: "Sterling Inn",
  kind: "3-star hotel · Bengaluru Airport",
  tagline: "Where luxury meets serenity",
  logo: { src: "/brand/sterling-inn.png", width: 341, height: 43 },
  hero: { src: "/media/sterling-inn/room.webp", alt: "A standard room at Sterling Inn" },
  intro: [
    "Sterling Inn offers comfortable, convenient accommodation close to all the popular hubs around Kempegowda International Airport — large rooms with up-to-date facilities and friendly staff, for business and leisure travellers alike.",
    "With free Wi-Fi, a premium lounge and fully equipped conference facilities, Sterling Inn has it all. Meals are served from the hotel's own kitchen, parking is complimentary and privacy is kept to a high standard — a perfect choice for a quiet, comfortable stay.",
  ],
  facts: [
    { label: "Category", value: "3-star hotel" },
    { label: "Guest rating", value: "4.8 average · 269 reviews" },
    { label: "Location", value: "Kempegowda International Airport Road" },
    { label: "Ideal for", value: "Business stays, conferences, family functions" },
  ],
  highlights: [
    { icon: "plane", label: "Close to the airport" },
    { icon: "car", label: "Airport pickup" },
    { icon: "wifi", label: "Free Wi-Fi" },
    { icon: "gym", label: "Gym" },
    { icon: "users", label: "Meeting room" },
    { icon: "shield", label: "Secured parking" },
    { icon: "coffee", label: "Café" },
    { icon: "key", label: "Early check-in & check-out" },
  ],
  spaces: [
    { title: "Rooms", body: "Spacious, quiet rooms with modern comforts, for a short stopover or a longer business stay.", image: { src: "/media/sterling-inn/twin.webp", alt: "Twin room at Sterling Inn" } },
    { title: "Dining", body: "Pleasant meals from the hotel's own kitchen, served when you need them.", image: { src: "/media/sterling-inn/dining.webp", alt: "Dining at Sterling Inn" } },
    { title: "Conference", body: "A fully equipped hall for meetings, conferences and family functions.", image: { src: "/media/sterling-inn/hall.webp", alt: "Conference hall at Sterling Inn" } },
  ],
  gallery: [
    { src: "/media/sterling-inn/facade.webp", alt: "Sterling Inn at night" },
    { src: "/media/sterling-inn/reception.webp", alt: "Reception at Sterling Inn" },
    { src: "/media/sterling-inn/lounge.webp", alt: "Lounge at Sterling Inn" },
    { src: "/media/sterling-inn/room-2.webp", alt: "A room at Sterling Inn" },
    { src: "/media/sterling-inn/room-3.webp", alt: "A double room at Sterling Inn" },
    { src: "/media/sterling-inn/room-4.webp", alt: "A room with a view at Sterling Inn" },
    { src: "/media/sterling-inn/twin.webp", alt: "Twin room at Sterling Inn" },
    { src: "/media/sterling-inn/room-5.webp", alt: "A spacious room at Sterling Inn" },
    { src: "/media/sterling-inn/bath.webp", alt: "Bathroom at Sterling Inn" },
    { src: "/media/sterling-inn/amenities.webp", alt: "In-room amenities at Sterling Inn" },
    { src: "/media/sterling-inn/hall.webp", alt: "Conference hall at Sterling Inn" },
    { src: "/media/sterling-inn/dining.webp", alt: "Breakfast at Sterling Inn" },
    { src: "/media/sterling-inn/corridor.webp", alt: "Corridor at Sterling Inn" },
  ],
  contact: {
    address: "48, 49 2nd Cross, Kempegowda International Airport Road, Chandramouleshwara Layout, Hunasamaranahalli, Bengaluru, Karnataka 562157",
    phone: sterlingPhone,
    email: sterlingReservations,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sterling+Inn+Hunasamaranahalli+Bengaluru+562157",
    instagram: "https://www.instagram.com/sterling_inn/",
  },
  cta: { label: "Book your stay", href: "https://bookmystay.io/rooms/37695", external: true },
};

export const sterlingPlaza: Venue = {
  slug: "sterling-plaza",
  division: "hospitality",
  name: "Sterling Plaza",
  kind: "4-star hotel · Bengaluru Airport",
  tagline: "Unparalleled luxury near the airport",
  logo: { src: "/brand/sterling-plaza.png", width: 376, height: 46 },
  hero: { src: "/media/sterling-plaza/lobby.webp", alt: "The lobby at Sterling Plaza" },
  intro: [
    "A perfect blend of luxury and comfort, with spacious Deluxe and Suite rooms. Whether you're here for business or leisure, enjoy modern amenities, elegant interiors and personalised service designed to make your stay unforgettable.",
    "Sterling Plaza welcomes business and leisure travellers alike — about twenty minutes' drive from Bangalore Airport, with meeting rooms and event spaces for corporate meetings and conferences.",
  ],
  facts: [
    { label: "Category", value: "4-star hotel" },
    { label: "Rooms", value: "Deluxe & Suite (with kitchenettes)" },
    { label: "Airport", value: "About 20 minutes' drive" },
    { label: "Ideal for", value: "Corporate stays, conferences, families" },
  ],
  highlights: [
    { icon: "plane", label: "Airport shuttle" },
    { icon: "wifi", label: "Free high-speed Wi-Fi" },
    { icon: "gym", label: "Gym" },
    { icon: "users", label: "Meeting rooms" },
    { icon: "coffee", label: "Café & dining" },
    { icon: "shield", label: "Ample secured parking" },
    { icon: "bed", label: "Deluxe & Suite rooms" },
    { icon: "briefcase", label: "Corporate packages" },
  ],
  spaces: [
    { title: "Deluxe & Suite rooms", body: "Elegant interiors, generous space, and suites with their own living area and kitchenette.", image: { src: "/media/sterling-plaza/room.webp", alt: "Room at Sterling Plaza" } },
    { title: "Suites", body: "Suites with their own living area and kitchenette — made for longer stays.", image: { src: "/media/sterling-plaza/suite.webp", alt: "Suite living room at Sterling Plaza" } },
    { title: "Conference room", body: "Meeting rooms and event spaces for corporate meetings, conferences and business events.", image: { src: "/media/sterling-plaza/conference.webp", alt: "Conference room at Sterling Plaza" } },
  ],
  gallery: [
    { src: "/media/sterling-plaza/facade.webp", alt: "Sterling Plaza from the street" },
    { src: "/media/sterling-plaza/lobby-lounge.webp", alt: "Lobby lounge at Sterling Plaza" },
    { src: "/media/sterling-plaza/deluxe.webp", alt: "Deluxe room at Sterling Plaza" },
    { src: "/media/sterling-plaza/room-2.webp", alt: "A room at Sterling Plaza" },
    { src: "/media/sterling-plaza/room-3.webp", alt: "A double room at Sterling Plaza" },
    { src: "/media/sterling-plaza/suite-room.webp", alt: "Suite bedroom at Sterling Plaza" },
    { src: "/media/sterling-plaza/suite-lounge.webp", alt: "Suite lounge at Sterling Plaza" },
    { src: "/media/sterling-plaza/suite-kitchen.webp", alt: "Suite kitchenette at Sterling Plaza" },
    { src: "/media/sterling-plaza/dining.webp", alt: "Dining at Sterling Plaza" },
    { src: "/media/sterling-plaza/cafe.webp", alt: "The café at Sterling Plaza" },
    { src: "/media/sterling-plaza/workspace.webp", alt: "Business corner at Sterling Plaza" },
    { src: "/media/sterling-plaza/conference-2.webp", alt: "Conference room at Sterling Plaza" },
    { src: "/media/sterling-plaza/corridor.webp", alt: "Corridor at Sterling Plaza" },
  ],
  reels: [
    { caption: "Some stays are simply effortless", poster: "/media/hospitality/plaza-effortless.webp", video: "/media/hospitality/plaza-effortless.mp4", href: "/hospitality/sterling-plaza" },
    { caption: "You found your little escape in Bengaluru", poster: "/media/hospitality/plaza-escape.webp", video: "/media/hospitality/plaza-escape.mp4", href: "/hospitality/sterling-plaza" },
    { caption: "Settle in at Sterling Plaza", poster: "/media/hospitality/plaza-reel.webp", video: "/media/hospitality/plaza-reel.mp4", href: "/hospitality/sterling-plaza" },
  ],
  faqs: [
    { q: "Is it suited to business or leisure?", a: "Both — Sterling Plaza caters for business and leisure travellers, with comfort and professional services together." },
    { q: "Is there Wi-Fi?", a: "Yes, complimentary high-speed wireless internet for every guest." },
    { q: "Do you offer an airport shuttle?", a: "Yes, an airport shuttle gets you to and from Bangalore Airport conveniently." },
    { q: "Can the hotel host meetings or events?", a: "Yes — meeting rooms and event spaces for corporate meetings, conferences and other business events." },
    { q: "Is there parking?", a: "Yes, ample parking for every guest." },
  ],
  contact: {
    address: "Site no. 130, Khata no. 11, 4th Cross, Chandramouleshwara Layout, KIA Road, Hunasamaranahalli, Bengaluru, Karnataka 562157",
    phone: sterlingPhone,
    email: sterlingReservations,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sterling+Plaza+Hunasamaranahalli+Bengaluru+562157",
    instagram: "https://www.instagram.com/sterling_inn/",
  },
  cta: { label: "Book your stay", href: "https://bookingengine.maximojo.com/?hid=IN-6c45818f-9c86-453f-b3d6-1051fe67a688", external: true },
};

export const olive: Venue = {
  slug: "olive",
  division: "hospitality",
  name: "Olive",
  kind: "Hotel · Bengaluru Airport",
  tagline: "A little luxury, a little calm",
  logo: { src: "/brand/olive.png", width: 217, height: 70 },
  logoOnDark: { src: "/brand/olive-light.png", width: 217, height: 70 },
  hero: { src: "/media/olive/lobby.webp", alt: "The lobby at Olive" },
  intro: [
    "A stay that feels more like home — from slow mornings and cosy rooms to good food and thoughtful spaces. Every arrival at Olive begins with a warm welcome, and it's the little moments that make your stay.",
    "A little room for comfort, a little space to unwind, and everything you need to feel at ease: a stay designed for slowing down, settling in and enjoying the little things.",
  ],
  facts: [
    { label: "Category", value: "Hotel" },
    { label: "Location", value: "Near Bengaluru Airport" },
    { label: "Spaces", value: "Rooms, restaurant, banquet hall" },
    { label: "Ideal for", value: "Short stays, families, celebrations" },
  ],
  highlights: [
    { icon: "bed", label: "Double & twin rooms" },
    { icon: "cutlery", label: "In-house restaurant" },
    { icon: "party", label: "Banquet hall" },
    { icon: "coffee", label: "Tea & coffee in every room" },
    { icon: "wifi", label: "Wi-Fi" },
    { icon: "plane", label: "Close to the airport" },
  ],
  spaces: [
    { title: "Rooms", body: "Bright, calm rooms with warm wood, soft linen and everything within reach.", image: { src: "/media/olive/room.webp", alt: "Room at Olive" } },
    { title: "Restaurant", body: "Good food in a relaxed, sunlit dining room.", image: { src: "/media/olive/restaurant.webp", alt: "Restaurant at Olive" } },
    { title: "Banquet hall", body: "An elegant hall for celebrations, functions and gatherings.", image: { src: "/media/olive/banquet.webp", alt: "Banquet hall at Olive" } },
  ],
  gallery: [
    { src: "/media/olive/facade.webp", alt: "Olive hotel" },
    { src: "/media/olive/lounge.webp", alt: "Lounge at Olive" },
    { src: "/media/olive/corridor.webp", alt: "Corridor at Olive" },
    { src: "/media/olive/room-2.webp", alt: "A room at Olive" },
    { src: "/media/olive/room-3.webp", alt: "A double room at Olive" },
    { src: "/media/olive/room-4.webp", alt: "A bright room at Olive" },
    { src: "/media/olive/twin.webp", alt: "Twin room at Olive" },
    { src: "/media/olive/twin-2.webp", alt: "Twin beds at Olive" },
    { src: "/media/olive/bath.webp", alt: "Bathroom at Olive" },
    { src: "/media/olive/amenities.webp", alt: "In-room amenities at Olive" },
    { src: "/media/olive/restaurant-2.webp", alt: "Restaurant at Olive" },
    { src: "/media/olive/banquet-2.webp", alt: "Banquet hall at Olive" },
    { src: "/media/olive/banquet-3.webp", alt: "Banquet seating at Olive" },
    { src: "/media/olive/banquet-4.webp", alt: "The banquet hall dressed for an event" },
  ],
  reels: [
    { caption: "A little luxury, a little calm", poster: "/media/hospitality/olive-calm.webp", video: "/media/hospitality/olive-calm.mp4", href: "/hospitality/olive" },
    { caption: "Every arrival begins with a warm welcome", poster: "/media/hospitality/olive-welcome.webp", video: "/media/hospitality/olive-welcome.mp4", href: "/hospitality/olive" },
    { caption: "Your room is ready — unwind", poster: "/media/hospitality/olive-reel.webp", video: "/media/hospitality/olive-reel.mp4", href: "/hospitality/olive" },
  ],
  contact: {
    // DUMMY — Olive's exact address, phone and booking link to be shared by the client.
    address: "Near Kempegowda International Airport, Hunasamaranahalli, Bengaluru, Karnataka 562157",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Olive+Hotel+Bengaluru+Airport",
    mapQuery: "Hunasamaranahalli, Bengaluru, Karnataka 562157",
  },
  cta: { label: "Enquire about a stay", href: "#enquiry" },
};

export const hotels = [sterlingInn, sterlingPlaza, olive];
