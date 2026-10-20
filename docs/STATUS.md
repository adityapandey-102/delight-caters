# STATUS — Zyra Group website (delight-web)

Handoff file (see the lean workflow: one main session, verify once per milestone).
A new session reads this + `delight-web/CLAUDE.md` and nothing else to resume.

## Context (2026-10-20)

- The single-brand Delight Caterers site is preserved on branch
  `old-design-of-delight-caters` (commit `f73a8ac`, "0.2"). `main` continues from it.
- New brief: the site becomes **Zyra Group** ("An Unforgettable Experience"), parent of
  - **Delight Hospitality** — Sterling Inn, Sterling Plaza, Olive (hotels near Bengaluru airport)
  - **Delight Eatry** — Bombay Kulfi (master franchise, Commercial Street), Aero Bites (restaurant), Delight Caterers
- Rules from the client: no pricing anywhere (skip priced images), no olive/green brand colour,
  short pages, premium/luxury feel, reuse existing components, dummy content where data is missing
  (team photos, Aero Bites), a Team section.

## Information architecture

| URL | Page |
| --- | --- |
| `/` | Group home |
| `/about` | Story, vision/mission/values, leadership & team (`#team`) |
| `/hospitality` | Delight Hospitality overview |
| `/hospitality/{sterling-inn,sterling-plaza,olive}` | Hotel pages (shared template) |
| `/eatry` | Delight Eatry overview |
| `/eatry/{bombay-kulfi,aero-bites}` | Brand pages (shared template) |
| `/eatry/delight-caterers` | Catering, condensed from the old site |
| `/contact` | All businesses' contacts + enquiry |

Old URLs `/about-us`, `/service`, `/contact-us` redirect (308) to `/about`, `/eatry/delight-caterers`, `/contact`.

## Sources

- delighthospitality.in — profile, values, vision, mission (rest of that site is placeholder).
- sterlinginnhotels.com (+ `/sterling-plaza`) — descriptions, facilities, addresses, phone/emails, socials,
  booking-engine links, Plaza FAQs, "4.8 average · 269 reviews". Prices deliberately not used.
- `delight-web/resources/` (moved out of `public/`, scanned clean by Defender) — logos, hotel brochures
  (photos extracted), social posts and reels.
- Not found publicly: Aero Bites (no listing), Olive address/contacts, group contacts, team → dummy, marked `isPlaceholder`.

## Milestones

- [x] M1 Foundation: palette (green → onyx), Zyra + brand logos (matted from the sheet), media pipeline
      (`public/media`, 16 MB), content files (`lib/content/{group,hospitality,eatry,types}.ts`), routes, nav with
      division dropdowns, redirects, footer, loader (Zyra mark)
- [x] M2 Group home (hero, brand strip, divisions, facts, reels, team preview) + About (story, vision/values, team)
- [x] M3 Hospitality overview + Sterling Inn / Sterling Plaza / Olive (shared `VenuePage` template)
- [x] M4 Eatry overview + Bombay Kulfi + Aero Bites (placeholder) + Delight Caterers (condensed old site)
- [x] M5 Contact (directory + enquiry), checks: lint ✓ typecheck ✓ 37 unit ✓ build ✓ (16 static routes),
      11 routes × 2 widths: 0 errors, 0 overflow, 1 h1 each; old URLs redirect
- [x] M6 Light redesign (client feedback 2026-10-20): paper/stone/charcoal + Zyra gold, Cormorant + DM Sans
      (after residences.loamhouse.com.au), light heroes with line-reveal headline and image reveal, home finder,
      property-style listing cards, hotel/brand pages as listings (mosaic + sticky visit card), caterers' diamond
      and index reused (home "four ways", hospitality hotel index); hi-res photos from sterlinginnhotels.com,
      clean frames from Bombay Kulfi reels; skills installed (see .claude/skills/SOURCES.md)
- [x] M7 Client feedback: back to the textured cream/onyx/gold look; every page gets the full-bleed cinematic
      hero (BrandHero); campaigns ("Events & tie-ups") on Home, Hospitality, Eatry (built by a Sonnet helper);
      dummy content instead of placeholders (Aero Bites, team, Olive); shorter home (facts band + team preview dropped)
- [x] M8 Client feedback: Loam House palette (ink #1e211d / paper #f1eee7 / chalk, gold accent) replaces the
      dark brown; transparent brand logos on heroes; home hero runs the campaigns as slides (glass campaign card +
      slim glass finder); outlet pages told in numbered chapters with an interactive gallery + lightbox
      (`modules/gallery`), a Google map (`Location`, `contact.mapQuery` where the name pins the wrong place) and
      Google reviews (`lib/content/reviews.ts` — SAMPLE, replace before launch); property reels per hotel; every
      button is a glass pill (`.btn-*`, round `.glass-icon[-dark]`), with a light sweep (`.shine`) on the
      attention buttons (enquiry submit, Plan your event, page CTAs). Checks: lint ✓ typecheck ✓ 37 unit ✓ build ✓,
      11 routes × 2 widths 200 / 0 overflow / 1 h1
- [x] Branch `apple-design` (try-out for the client, `main` untouched): Apple's design sense in Zyra's colours —
      Inter / Inter Tight, gold gradient accent words, clean surfaces (no plaster), black "film" sections, sentence-
      case glass pills, adaptive glass global nav with full-width flyouts, Apple-style footer; home rebuilt from
      `modules/showcase` (HeroFilm scroll-open hero, Tile / TileGrid, Highlights carousel, StickyStory, BigNumbers);
      outlet pages get a sticky LocalNav. Home photos are DUMMY Unsplash stock (`public/media/dummy`, list in
      `lib/content/home.ts`)
  - Client round on the branch: home hero on white; no loading screen; marketing ribbon in the nav on every
    page (offers of the section in view first, folds away on scroll); an offers section on every category and
    outlet page — all from one list, `lib/content/offers.ts` (DUMMY, no prices)
- [ ] Next: client review; replace DUMMY content (offers, Aero Bites, team, Olive contacts) and SAMPLE reviews with real data

## Phase 2 backlog (recorded, not yet planned)

Phase 2 is planned in detail only after phase 1 ships (client's instruction). Items so far:

1. **Marketing admin — offers, campaigns and the top ribbon** (requested 2026-10-20). Staff update offers,
   events and collaborations from an admin panel instead of code:
   - one record per offer — the fields of `Offer` in `lib/content/offers.ts` (kind, outlet, title, ribbon
     line, summary, dates, image, button label + link, featured) become the database schema;
   - choose where each one shows: the ribbon under the nav (every page), home highlights, its division's
     "Offers & events" section, its outlet's "Offers at …" section;
   - start / end dates so offers appear and expire on their own; drafts, ordering / pinning, image upload;
   - publishing refreshes the public pages straight away (on-demand revalidation), no redeploy.
   Ready for it: every marketing surface already reads that one list through `offersFor()` /
   `offersForPath()` — swapping the file for a database query is the only change the public site needs.
2. Leads → customers: consultation enquiries become customer accounts with a login.
3. Meal subscriptions: days remaining, pause a single meal or a date range; 500 meals/day kitchen capacity.
4. Dashboards for admin, manager and consultant roles (same admin panel as 1).

## Open questions for the client

- Division names: "Delight Hospitality" / "Delight Eatry" used (as on the old sites and resources folder).
- Aero Hotel (aerohotelblr.in) appears on the old Sterling site — include as a 4th hotel?
- Group phone/email/address, Olive address/phone, Aero Bites details, team names/photos.
