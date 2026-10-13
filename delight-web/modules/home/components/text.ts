/** "01", "02"… for the numbered lists. */
export const pad = (n: number) => String(n).padStart(2, "0");

/** Splits a title after `n` words, for the two-line (green roman / gold italic) display headings. */
export function splitTitle(title: string, n: number): [string, string] {
  const words = title.split(" ");
  return [words.slice(0, n).join(" "), words.slice(n).join(" ")];
}

/** Screen-reader note for links that open in a new tab. */
export const NEW_TAB = " (opens in a new tab)";
