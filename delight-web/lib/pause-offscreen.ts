/**
 * Infinite CSS loops (marquees, floating cut-outs, the gold sweep) keep the compositor busy even when
 * they are far off-screen. This tags them `.is-offscreen` (CSS pauses them) while they are out of view.
 * Returns a cleanup function.
 */
const LOOPS = ".marquee-track, .cutout-float, .cutout-shadow, .gold-accent, .shine";

export function pauseOffscreenLoops() {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting)),
    { rootMargin: "120px 0px" },
  );
  document.querySelectorAll(LOOPS).forEach((el) => io.observe(el));
  return () => io.disconnect();
}
