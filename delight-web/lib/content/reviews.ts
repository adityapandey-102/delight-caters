/**
 * SAMPLE reviews — replace with genuine Google reviews before launch
 * (publishing invented reviews as real is misleading).
 */

export type ReviewSet = {
  rating: number | null;
  count: number | null;
  profileUrl: string;
  isSample: boolean;
  items: { name: string; meta: string; text: string }[];
};

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${q}`;

export const reviewsBySlug: Record<string, ReviewSet> = {
  "sterling-inn": {
    rating: 4.8,
    count: 269,
    profileUrl: maps("Sterling+Inn+Hunasamaranahalli+Bengaluru"),
    isSample: true,
    items: [
      { name: "Rohit S.", meta: "Business traveller · Sep 2026", text: "Had a 6 am flight and the airport pickup was right on time. Check-out was quick and the room was spotless." },
      { name: "Anita M.", meta: "Stayed with family · Aug 2026", text: "Quiet, clean rooms and a very friendly front desk. The breakfast spread had plenty of South Indian options." },
      { name: "Karthik R.", meta: "Business traveller · Sep 2026", text: "Used the conference hall for a half-day team meeting. Projector, seating and tea service were all well handled." },
      { name: "Meera N.", meta: "Layover stay · Jul 2026", text: "Ideal for an overnight layover. Short drive to the airport, comfortable bed and a good night's sleep before an early flight." },
      { name: "Vikram D.", meta: "Business traveller · Oct 2026", text: "Staff arranged a late check-in without fuss. Rooms are well kept and the Wi-Fi was reliable for work calls." },
    ],
  },
  "sterling-plaza": {
    rating: null,
    count: null,
    profileUrl: maps("Sterling+Plaza+Hunasamaranahalli+Bengaluru"),
    isSample: true,
    items: [
      { name: "Sandeep K.", meta: "Business traveller · Sep 2026", text: "Booked for an early morning flight. The airport transfer was smooth and the room was clean and cool." },
      { name: "Divya P.", meta: "Stayed with family · Aug 2026", text: "Spacious rooms and helpful staff. Breakfast had a good mix of hot dishes and fresh fruit." },
      { name: "Arjun V.", meta: "Business traveller · Oct 2026", text: "The meeting room worked well for our client review. Service was prompt and the setup was tidy." },
      { name: "Lakshmi T.", meta: "Layover stay · Jul 2026", text: "Perfect stop between flights. Quick check-in, quiet corridors and a comfortable bed." },
      { name: "Nikhil B.", meta: "Business traveller · Sep 2026", text: "Reception sorted a late checkout for me without any trouble. Would stay again on my next Bengaluru trip." },
    ],
  },
  olive: {
    rating: null,
    count: null,
    profileUrl: maps("Olive+Hotel+Hunasamaranahalli+Bengaluru"),
    isSample: true,
    items: [
      { name: "Pooja H.", meta: "Event guest · Sep 2026", text: "We held a family function in the banquet hall. The space was elegant and the team looked after every detail." },
      { name: "Suresh G.", meta: "Diner · Aug 2026", text: "The restaurant serves a lovely range of dishes. Everything arrived hot and the service was attentive." },
      { name: "Neha J.", meta: "Stayed with family · Oct 2026", text: "Calm, comfortable rooms that felt like a real break from the airport rush. Beds were very comfortable." },
      { name: "Aditya L.", meta: "Business traveller · Jul 2026", text: "Good base for a short work trip. Rooms were clean, quiet and the staff were courteous." },
      { name: "Kavya S.", meta: "Event guest · Sep 2026", text: "Attended a wedding reception here. The decor, seating and food counters were well organised." },
    ],
  },
  "bombay-kulfi": {
    rating: null,
    count: null,
    profileUrl: maps("Bombay+Kulfi+Bengaluru"),
    isSample: true,
    items: [
      { name: "Rahul M.", meta: "Dessert lover · Sep 2026", text: "The kulfi is made with A2 milk and you can taste the difference. Creamy, rich and not overly sweet." },
      { name: "Shruti A.", meta: "Shopping stop · Aug 2026", text: "A perfect break in the middle of a shopping day. The mojitos were cold and refreshing." },
      { name: "Imran Q.", meta: "With friends · Oct 2026", text: "The momos were hot and juicy, and the kulfi to finish was the best part of the evening." },
      { name: "Priya D.", meta: "With family · Jul 2026", text: "Kids loved the kulfi flavours. Friendly counter staff and quick service even on a busy weekend." },
      { name: "Gaurav T.", meta: "Dessert lover · Sep 2026", text: "Tried the mango and pista kulfi. Smooth texture, real flavour, and an easy stop on the way home." },
    ],
  },
  "aero-bites": {
    rating: null,
    count: null,
    profileUrl: maps("Aero+Bites+Airport+Road+Bengaluru"),
    isSample: true,
    items: [
      { name: "Manoj R.", meta: "Traveller · Sep 2026", text: "Open when I landed late and still hungry. Hot food, quick service and a relaxed place to sit." },
      { name: "Sneha K.", meta: "Diner · Aug 2026", text: "All-day dining on the airport road is a lifesaver. The menu has something for everyone." },
      { name: "Faisal A.", meta: "Business traveller · Oct 2026", text: "Had a working breakfast here before a flight. Fresh, filling and served fast." },
      { name: "Deepa V.", meta: "With family · Jul 2026", text: "Stopped for lunch on the way to the airport. Generous portions and polite staff." },
      { name: "Harish N.", meta: "Diner · Sep 2026", text: "Reliable for a coffee and a snack at any hour. Clean tables and a quiet corner to wait in." },
    ],
  },
  "delight-caterers": {
    rating: null,
    count: null,
    profileUrl: maps("Delight+Caterers+Bengaluru"),
    isSample: true,
    items: [
      { name: "Ramesh P.", meta: "Wedding client · Sep 2026", text: "Delight handled our wedding lunch for over 400 guests. The food was fresh and service never lagged." },
      { name: "Anjali C.", meta: "Corporate client · Aug 2026", text: "We use them for weekly corporate lunches. Always on time, and the menu rotates so nobody gets bored." },
      { name: "Tarun B.", meta: "Family function · Oct 2026", text: "They helped us shape the menu around our guests' tastes. Every dish came out hot and well presented." },
      { name: "Swati R.", meta: "Corporate client · Jul 2026", text: "Our annual meet was catered smoothly. The team was polite, organised and cleaned up promptly." },
      { name: "Ganesh K.", meta: "Wedding client · Sep 2026", text: "Great variety across the menu and flexible with our requests. Guests are still talking about the food." },
    ],
  },
};
