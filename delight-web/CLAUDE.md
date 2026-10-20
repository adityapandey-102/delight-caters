@AGENTS.md

# Zyra Group — website (delight-web)

Group site for Zyra Group ("An Unforgettable Experience"): Delight Hospitality
(Sterling Inn, Sterling Plaza, Olive) and Delight Eatry (Bombay Kulfi, Aero
Bites, Delight Caterers). The former single-brand Delight Caterers site is
frozen on branch `old-design-of-delight-caters`. Workflow: `../docs/WORKFLOW.md`;
handoff/progress: `../docs/STATUS.md`. Phase 2 (marketing admin for
offers, leads, customer login, subscriptions) is not started — backlog in STATUS.md.

## Structure (mirrors needleye-web)

- `app/(site)/…` — public pages: `/`, `/about`, `/hospitality[/sterling-inn|
  sterling-plaza|olive]`, `/eatry[/bombay-kulfi|aero-bites|delight-caterers]`,
  `/contact`. Old `/about-us`, `/service`, `/contact-us` redirect (next.config.ts).
  Phase 2 adds `(app)` / `(auth)` groups.
- `modules/<feature>/components` — `brand` (VenuePage template, heroes, cards),
  `group` (home/about sections, team), `contact`, `enquiry` (form, popup),
  `home` (Delight Caterers sections, reused on its page).
- `components/ui` — shared primitives; `components/shell` — header, footer,
  smooth scroll.
- `lib/content/` — all copy: `group.ts` (Zyra, nav, team), `hospitality.ts`,
  `eatry.ts` (one `Venue` record per brand → `modules/brand/VenuePage`), `site.ts`
  (Delight Caterers, verbatim). Never invent copy or numbers; **no pricing**;
  missing data = marked placeholder. Raw client media lives in `resources/`
  (git-ignored); only optimised copies go to `public/media/`.

## Design system

Paper plaster wall on every page (grain + mottle), ink (#1e211d) dark bands and
footer, gold accent — after residences.loamhouse.com.au: large light Cormorant
Garamond headlines with gold italic accents, DM Sans body. Every page opens with
`BrandHero` (full-bleed photo, transparent brand logo, line-by-line headline,
gold tagline rule, scroll push-in; `inset` for small/portrait photos; `slides`
runs campaigns on the hero). Brand pages (`modules/brand/VenuePage`) are told in
numbered chapters: story + visit card, offer, spaces, `Gallery` (lightbox),
`Location` (Google map), Google reviews (`lib/content/reviews.ts`, SAMPLE), FAQ,
reels. Buttons are glass pills (`.btn-gold|onyx|ghost|ghost-dark`, round
`.glass-icon[-dark]`); add `.shine` only to attention buttons (forms, "Plan
your event", the page's main CTA). Marketing (apple-design branch): ONE list, `lib/content/offers.ts`, feeds the
ribbon under the nav on every page (`PromoRibbon`), the home highlights, and
`OffersSection` on Hospitality, Eatry, every outlet page and Delight Caterers. The caterers' diamond (`ImpactDiagram`) and index
(`Cuisines`) take content props. Missing data = realistic DUMMY content, flagged
only in code comments. Tokens/classes: `app/globals.css` (`@layer components`).
Project skills: `../.claude/skills` (provenance in `SOURCES.md`).

## Rules

- Next 16.4 with Cache Components: no `Date.now()` / `new Date()` /
  `Math.random()` during server render. `next/image`: `preload` (not
  `priority`) for above-the-fold, qualities allowlist `[75, 85]`.
- GSAP in `useEffect` with `gsap.context` + `ctx.revert()`, always honour
  `prefersReducedMotion()`. Lenis owns scrolling: overlays must call
  `lockScroll` / `unlockScroll` from `components/shell/SmoothScroll`.
- Mobile first: check 360px and 1440px; no horizontal overflow.
- Keep it simple — no state libraries or abstractions the site doesn't need.

## Checks before calling something done

`npm run typecheck` · `npm run lint` · `npm run test:unit` · `npm run build`
