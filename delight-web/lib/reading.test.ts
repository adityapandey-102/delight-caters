import { describe, expect, it } from "vitest";
import { readingSeconds } from "./reading";

const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

describe("readingSeconds", () => {
  it("gives a short line the floor", () => {
    expect(readingSeconds("Offer · Book now")).toBe(3.5);
  });
  it("reads the headline fully and skims the body", () => {
    // 1 + 17 × 0.15 + 17 × 0.06 — a typical offer card
    expect(readingSeconds(words(17), words(17))).toBe(4.6);
  });
  it("never holds a card past the ceiling", () => {
    expect(readingSeconds(words(80), words(80))).toBe(5);
  });
});
