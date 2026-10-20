# Zyra Group site — lean development workflow (token-efficient)

> Adopted 2026-10-20, adapted from `HOK/docs/WORKFLOW.md`. In the Delight Caterers
> build, three long-lived parallel agents (resumed again and again, re-reading
> shared files and screenshots) burned most of the token budget. Quality bar
> unchanged; waste removed.

## Rules

1. **The main session works alone by default**, milestone by milestone
   (milestones live in `docs/STATUS.md`). A helper agent only for a truly
   independent chunk (one page module with no shared files), at most **2 at a
   time**, on **Sonnet**. The main session (Opus) plans and reviews.
2. **Fresh, short-lived agents.** One agent = one bounded task, then it ends.
   Never resume a finished agent for new work.
3. **Brief, not exploration.** ≤20-line brief: goal, exact files, the data type
   it renders (`lib/content/types.ts`), acceptance criteria, "read only these files".
4. **Shared files belong to the main session**: `app/globals.css`,
   `lib/content/*`, `components/shell/*`, `components/ui/*`, `next.config.ts`,
   route layouts, README, STATUS. Agents build inside their own `modules/<area>/`.
5. **Verify once per milestone.** During work: typecheck + lint on touched files.
   At milestone end: one full run (lint, typecheck, unit tests, build) and one
   visual pass. Screenshots only when a visual question needs answering —
   images are expensive; prefer measuring (overflow, heights) by script.
6. **Reports ≤10 lines**: outcome, files changed, checks with counts, blockers.
7. **Content rules**: copy comes from the client's sites/resources (no invented
   facts or numbers); **no pricing anywhere**; missing data = clearly marked
   placeholder (`placeholder` / `isPlaceholder` in the content files).
8. **Media**: raw client files stay in `delight-web/resources/` (not shipped,
   git-ignored). Only optimised WebP/MP4 copies go to `public/media/`. Scan
   downloaded files (Defender + MP4 structure) before use.
9. **Handoff = `docs/STATUS.md`**, updated at each milestone end. A new session
   reads STATUS.md + `delight-web/CLAUDE.md` and nothing else to resume.
10. **The main session stays lean**: no polling, short replies, no re-reading big
    files it already knows; `/compact` or a new session between milestones.

## Branches

- `old-design-of-delight-caters` — the single-brand Delight Caterers site, frozen.
- `main` — the Zyra Group site, built on top of it.
