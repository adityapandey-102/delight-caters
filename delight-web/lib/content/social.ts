/**
 * Posts from the group's social feeds (from delight-web/resources, optimised
 * into public/media/social). Posts that show prices were left out, by brief.
 */

export type Post = { src: string; width: number; height: number; alt: string; brand: string; href: string };

const STERLING_IG = "https://www.instagram.com/sterling_inn/";
const hotel = (n: number, alt: string, brand: string, href = STERLING_IG): Post => ({
  src: `/media/social/hotels-${String(n).padStart(2, "0")}.webp`,
  width: 900,
  height: 1125,
  alt,
  brand,
  href,
});
const food = (n: number, alt: string, width = 720, height = 1268): Post => ({
  src: `/media/social/food-${String(n).padStart(2, "0")}.webp`,
  width,
  height,
  alt,
  brand: "Bombay Kulfi",
  href: "/eatry/bombay-kulfi",
});

export const hotelPosts: Post[] = [
  hotel(1, "Olive Hotel — the lobby", "Olive", "/hospitality/olive"),
  hotel(2, "Discover your escape with us", "Sterling Plaza"),
  hotel(3, "Stay. Unwind. Repeat.", "Sterling Plaza"),
  hotel(4, "Where luxury meets comfort", "Sterling Plaza"),
  hotel(5, "Better sleep, cosy rooms", "Sterling Plaza"),
  hotel(6, "A space to sit back and unwind", "Sterling Plaza"),
  hotel(7, "Ready for your next stay?", "Sterling Plaza"),
  hotel(8, "When comfort meets luxury", "Sterling Plaza"),
];

export const foodPosts: Post[] = [
  food(1, "It's a brand new day for momos", 900, 900),
  food(2, "It's a brand new day for a mojito", 900, 900),
  food(3, "Feel the drip — the cheese toast", 900, 1143),
  food(4, "Boba, all the way down", 900, 1139),
  food(5, "Noodles you can't put down", 900, 1134),
  food(6, "Guava chilli kulfi slice"),
  food(7, "Pav bhaji, freshly mashed"),
  food(8, "Vada pav, the street-food legend"),
  food(9, "Mint mojito boba"),
  food(10, "Chilli garlic noodles"),
  food(11, "A scoop of happiness"),
  food(12, "Momos are always a good idea"),
];

/** The group's Instagram accounts that are public today. */
export const accounts = [
  { brand: "Sterling Inn & Sterling Plaza", handle: "sterling_inn", href: STERLING_IG },
  { brand: "Delight Caterers", handle: "delightcaterersblr", href: "https://www.instagram.com/delightcaterersblr" },
];
