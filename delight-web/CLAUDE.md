@AGENTS.md

# Delight Caterers — website (delight-web)

Public marketing site for Delight Caterers (Bengaluru), replacing the old
WordPress site at delightcaters.in. Phase 1 = this website. Phase 2 (lead
management, customer login, meal-subscription management) will follow the
needleye-pilot architecture: this Next.js app + a separate `delight-api`
(Express + Drizzle + Supabase Postgres) beside it. **Do not start phase 2
work until asked.**

## Structure (mirrors needleye-web)

- `app/(site)/…` — public pages (Home, `/about-us`, `/service`, `/contact-us`
  — same slugs as the old site). Phase 2 adds `(app)` / `(auth)` groups.
- `modules/<feature>/{components,lib}` — feature code (`home`, `about`,
  `services`, `enquiry`).
- `components/ui` — shared primitives; `components/shell` — header, footer,
  smooth scroll.
- `lib/content/site.ts` — **every word on the site**, verbatim from the old
  site. Change copy there, never in components. Never invent copy, numbers
  or reviews.

## Design system

Colours sampled from the brand: logo green `#014923`, gold from the mark,
and the plaster wall of the brand's Instagram post. Split 50 / 30 / 20 —
wall / green / gold. Tokens and component classes live in `app/globals.css`
(component classes are inside `@layer components` so Tailwind utilities on
the same element always win — keep it that way).

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
