/**
 * How long a rotating message stays up: long enough for a person to read it,
 * no longer. A beat for the eye to land, the headline words at ~400 words a
 * minute, the supporting line at skim speed (people read the title and glance
 * at the rest) — held between a floor and a ceiling.
 */
export function readingSeconds(headline: string, body = ""): number {
  const count = (s: string) => s.split(/\s+/).filter(Boolean).length;
  const seconds = 1 + count(headline) * 0.15 + count(body) * 0.06;
  return Math.round(Math.min(5, Math.max(3.5, seconds)) * 10) / 10;
}
