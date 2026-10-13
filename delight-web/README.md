# delight-web

The Delight Caterers website — a ground-up rebuild of the WordPress site at
[delightcaters.in](https://delightcaters.in) in Next.js, Tailwind CSS and
TypeScript. All copy is carried over word for word from the old site.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (every page is prerendered static)
npm start
```

Checks: `npm run typecheck` · `npm run lint` · `npm run test:unit`

Requires Node 20+.

## Pages

| URL | What's on it |
| --- | --- |
| `/` | Hero · occasions marquee · "Catering For Every Occasion" diagram · Welcome · Cuisines · Nutrition & Wellness · Our Unique Approach · Watch & Savour (reels) · Google reviews · FAQ · call to action |
| `/about-us` | Our Promise · Mission & Vision · Our Unique Approach |
| `/service` | The four occasions · Cuisines · A Complete Event Experience (venues) |
| `/contact-us` | Enquiry form (sends to WhatsApp) · contact details · map |

Behaviour worth knowing:

- A branded loader (gold mark with a shine, progress line, parting green
  curtain) shows on every fresh page load; moving between pages doesn't replay it.
- The enquiry popup opens by itself on every fresh page load once the visitor
  has scrolled three screens (never on `/contact-us`, which has the form inline).
- The reels play one after another while on screen, up to 15 s each; hover
  (desktop) or swipe/tap (phones) picks one. Sound is on by default and starts
  from the visitor's first tap, click or key press (browser autoplay rules).
- Phones use native scrolling; smooth scrolling and parallax are desktop-only.

The URLs match the old site, so existing links and search results keep working.
"Plan Your Event" / "Enquire Now" anywhere on the site opens the enquiry popup
(any link to `#enquiry`). The form builds the same WhatsApp message the old site
sent and opens `wa.me/919187918179`.

## Where things live

```
app/(site)/            pages (same slugs as the old site) + site layout
app/globals.css        design tokens and component classes
lib/content/site.ts    ALL copy, contact details, links — edit text here
modules/home/          homepage sections
modules/about/         About page sections
modules/services/      Service page sections
modules/enquiry/       enquiry form, popup, floating buttons, WhatsApp message
components/shell/      header, footer, smooth scrolling
components/ui/         shared primitives (headings, icons, motion, page hero)
public/images/         site photos (converted to WebP from the old site)
public/brand/          gold logo, app icon
public/textures/       seamless plaster texture
```

The layout mirrors `needleye-web` (`app/(group)` routes, `modules/<feature>`,
`components/ui`), so phase 2 — leads, customer login and meal subscriptions,
with a separate `delight-api` — can slot in beside it.

## Design system

Colours are sampled from the brand itself and used in a 50 / 30 / 20 split:

| Share | Colour | Source | Used for |
| --- | --- | --- | --- |
| 50% | Wall `#EFE2CC` / `#E7D0AF` + plaster texture | the sunlit wall in the "Happy Navratri" post | page backgrounds, warm bands |
| 30% | Green `#014923` | the round logo's background | headings, hero/section bands, footer |
| 20% | Gold `#BF983B` / `#E7C761` / `#8A5A12` | the gold mark | eyebrows, buttons, hairlines, icons, italic headings |

Type: Cormorant Garamond (display), Jost (text), Pinyon Script (the
"Taste of Tradition" tagline only).

## Before launch — placeholders to replace

1. **Google reviews** (`googleReviews` in `lib/content/site.ts`): replace the
   placeholder cards with genuine reviews from the Google Business Profile,
   fill `rating` and `count`, and set `isPlaceholder: false`.
2. **Reel links**: the four reels (`public/instagram-videos/`, listed in
   `reels` in `lib/content/site.ts`) open the Instagram profile; set each
   `href` to the reel's own permalink when known.
3. **Domain**: `company.domain` is used for metadata, the sitemap and
   structured data.
