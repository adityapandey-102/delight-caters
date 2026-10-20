# delight-web — Zyra Group website

Group site for **Zyra Group** — *An Unforgettable Experience*: Delight Hospitality
(Sterling Inn, Sterling Plaza, Olive) and Delight Eatry (Bombay Kulfi, Aero Bites,
Delight Caterers). Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · GSAP.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Checks: `npm run typecheck` · `npm run lint` · `npm run test:unit`

## Pages

| URL | Page |
| --- | --- |
| `/` | Hero with finder, brand strip, "four ways in" diagram, featured stays, facts, reels, team, call to action |
| `/about` | Story, vision · mission · values, leadership & team |
| `/hospitality` | Hotels index + reels |
| `/hospitality/{sterling-inn, sterling-plaza, olive}` | Hotel listings |
| `/eatry` | Food brands as listings + reels |
| `/eatry/{bombay-kulfi, aero-bites}` | Brand listings |
| `/eatry/delight-caterers` | Catering (the former Delight Caterers site, condensed) |
| `/contact` | All contacts + enquiry form |

Old `/about-us`, `/service`, `/contact-us` redirect. The enquiry popup opens from any
`#enquiry` link and once per page load after three screens of scrolling; it sends the
enquiry to WhatsApp.

## Content

All copy lives in `lib/content/` — `group.ts`, `hospitality.ts`, `eatry.ts`,
`showcase.ts` (listings, finder, diagram), `site.ts` (Delight Caterers). No pricing
anywhere; missing details are marked placeholders. Photos are optimised copies in
`public/media`; raw client files stay in `resources/` (not shipped).

## Before launch

Real details for Olive, Bombay Kulfi and Aero Bites; team names and photos; Google
reviews; the group's own domain (`group.domain`).
