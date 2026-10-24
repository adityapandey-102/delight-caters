"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/components/shell/SmoothScroll";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

type Photo = { src: string; alt: string };

/** Repeating rhythm of tile shapes (all share one height). */
const RATIOS = ["16 / 10", "4 / 5", "1 / 1", "4 / 5", "16 / 10", "1 / 1"] as const;
const SIZES = [
  "(min-width: 768px) 52vh, 80vw",
  "(min-width: 768px) 42vh, 62vw",
  "(min-width: 768px) 52vh, 62vw",
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={dir === "prev" ? "rotate-180" : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Gallery({
  photos,
  title = "Gallery",
  eyebrow,
}: {
  photos: Photo[];
  title?: string;
  eyebrow?: string;
}) {
  const total = photos.length;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shiftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageImgRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0, id: -1 });
  const swipe = useRef<{ x: number; id: number } | null>(null);

  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  /* ---------- scroll: progress, counter, parallax ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      const ratio = max > 0 ? el.scrollLeft / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.max(0.02, ratio)})`;

      // active tile = closest to the left edge (last tile once at the end)
      let best = 0;
      if (max > 0 && el.scrollLeft >= max - 4) best = total - 1;
      else {
        let min = Infinity;
        tileRefs.current.forEach((t, i) => {
          if (!t) return;
          const d = Math.abs(t.offsetLeft - el.scrollLeft);
          if (d < min) {
            min = d;
            best = i;
          }
        });
      }
      setActive(best);

      if (reduced) return;
      const vw = window.innerWidth;
      tileRefs.current.forEach((t, i) => {
        const s = shiftRefs.current[i];
        if (!t || !s) return;
        const r = t.getBoundingClientRect();
        if (r.right < -100 || r.left > vw + 100) return;
        const c = r.left + r.width / 2;
        const shift = Math.max(-28, Math.min(28, ((vw / 2 - c) / vw) * 56));
        s.style.transform = `translate3d(${shift.toFixed(1)}px,0,0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  /* ---------- entrance ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || prefersReducedMotion()) return;
    initGsap();
    const ctx = gsap.context(() => {
      gsap.from(tileRefs.current.filter(Boolean), {
        y: 56,
        opacity: 0,
        duration: 1.1,
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [total]);

  /* ---------- track navigation ---------- */
  const goTo = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      const t = tileRefs.current[Math.max(0, Math.min(total - 1, i))];
      if (!el || !t) return;
      el.scrollTo({ left: t.offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [total],
  );

  /* ---------- mouse drag-to-scroll ---------- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scrollerRef.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
      el.setPointerCapture(d.id);
    }
    el.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    const el = scrollerRef.current;
    if (!d.down) return;
    d.down = false;
    if (d.moved && el) {
      el.style.scrollSnapType = "";
      el.style.cursor = "";
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  /* ---------- lightbox ---------- */
  const isOpen = openIdx !== null;
  useEffect(() => {
    if (!isOpen) return;
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) dlg.showModal();
    lockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  useEffect(() => {
    if (openIdx === null) return;
    thumbRefs.current[openIdx]?.scrollIntoView({ block: "nearest", inline: "center" });
    const node = stageImgRef.current;
    if (node && !prefersReducedMotion()) {
      gsap.fromTo(node, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.6, overwrite: true });
    }
  }, [openIdx]);

  const open = (i: number, btn: HTMLButtonElement) => {
    lastTrigger.current = btn;
    setOpenIdx(i);
  };
  const step = (dir: 1 | -1) =>
    setOpenIdx((i) => (i === null ? i : (i + dir + total) % total));
  const closeDialog = () => dialogRef.current?.close();
  const onDialogClose = () => {
    const idx = openIdx;
    setOpenIdx(null);
    const btn = (idx !== null && tileRefs.current[idx]) || lastTrigger.current;
    btn?.focus({ preventScroll: true });
  };
  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  };
  const onStageDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, id: e.pointerId };
  };
  const onStageUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  if (!total) return null;
  const current = openIdx !== null ? photos[openIdx] : null;
  const btnCls =
    "glass-icon grid h-11 w-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
  const lbBtn =
    "glass-icon-dark grid h-11 w-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light";

  return (
    <section aria-label={title} className="relative">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4rem)]">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted [font-variant-numeric:lining-nums]" aria-live="polite">
            {pad(active + 1)} / {pad(total)}
          </p>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous photos" className={btnCls} onClick={() => goTo(active - 1)}>
              <Arrow dir="prev" />
            </button>
            <button type="button" aria-label="Next photos" className={btnCls} onClick={() => goTo(active + 1)}>
              <Arrow dir="next" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        data-lenis-prevent-horizontal
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar relative mr-[calc(50%-50vw)] flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pr-[calc(50vw-50%)] md:cursor-grab"
      >
        {photos.map((p, i) => {
          const ratio = RATIOS[i % RATIOS.length];
          const tall = ratio === "4 / 5";
          return (
            <button
              key={p.src + i}
              ref={(n) => {
                tileRefs.current[i] = n;
              }}
              type="button"
              aria-label={`Open photo ${i + 1}: ${p.alt}`}
              onClick={(e) => open(i, e.currentTarget)}
              style={{ aspectRatio: ratio }}
              className={`group relative h-[clamp(260px,52vh,520px)] lg:h-[clamp(240px,calc(100vh-410px),520px)] shrink-0 snap-start overflow-hidden rounded-[18px] bg-onyx-ink text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold max-md:h-auto ${
                tall ? "max-md:w-[62vw]" : "max-md:w-[78vw]"
              }`}
            >
              <div
                ref={(n) => {
                  shiftRefs.current[i] = n;
                }}
                className="absolute inset-y-0 -inset-x-7 will-change-transform"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  draggable={false}
                  sizes={SIZES[i % SIZES.length]}
                  className="select-none object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex h-2/5 items-end bg-gradient-to-t from-onyx-ink/80 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span className="translate-y-3 text-sm text-cream transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {p.alt}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 h-px w-full bg-line" aria-hidden="true">
        <div ref={progressRef} className="h-px origin-left bg-gold" style={{ transform: "scaleX(0.02)" }} />
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`${title} photo viewer`}
        onClose={onDialogClose}
        onKeyDown={onDialogKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-cream backdrop:bg-[rgba(18,20,16,0.94)]"
      >
        {current && openIdx !== null ? (
          <div className="flex h-dvh w-screen flex-col bg-[rgba(18,20,16,0.94)]">
            <div className="flex items-center justify-between px-5 pt-5 md:px-10 md:pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-cream/70 [font-variant-numeric:lining-nums]">
                {pad(openIdx + 1)} / {pad(total)}
              </p>
              <button type="button" aria-label="Close viewer" className={lbBtn} onClick={closeDialog} autoFocus>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center gap-4 px-4 md:px-10"
              onPointerDown={onStageDown}
              onPointerUp={onStageUp}
              style={{ touchAction: "pan-y" }}
            >
              <button type="button" aria-label="Previous photo" className={`${lbBtn} max-md:hidden`} onClick={() => step(-1)}>
                <Arrow dir="prev" />
              </button>
              <div ref={stageImgRef} className="relative h-full max-h-[88vh] min-w-0 flex-1">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  draggable={false}
                  className="select-none object-contain"
                />
              </div>
              <button type="button" aria-label="Next photo" className={`${lbBtn} max-md:hidden`} onClick={() => step(1)}>
                <Arrow dir="next" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 px-5 pt-4 md:px-10">
              <p className="min-w-0 truncate text-sm text-cream/80">{current.alt}</p>
              <div className="flex gap-2 md:hidden">
                <button type="button" aria-label="Previous photo" className={lbBtn} onClick={() => step(-1)}>
                  <Arrow dir="prev" />
                </button>
                <button type="button" aria-label="Next photo" className={lbBtn} onClick={() => step(1)}>
                  <Arrow dir="next" />
                </button>
              </div>
            </div>

            <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4 md:justify-center md:px-10 md:pb-8">
              {photos.map((p, i) => (
                <button
                  key={p.src + i}
                  ref={(n) => {
                    thumbRefs.current[i] = n;
                  }}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === openIdx}
                  onClick={() => setOpenIdx(i)}
                  className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md outline-2 outline-offset-2 transition-opacity duration-300 ${
                    i === openIdx ? "opacity-100 outline outline-[#d2ab68]" : "opacity-50 outline-transparent hover:opacity-90"
                  }`}
                >
                  <Image src={p.src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

export default Gallery;
