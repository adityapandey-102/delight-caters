"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";

type Cta = { label: string; href: string; external?: boolean };

/**
 * The hero for a product-led brand (Bombay Kulfi): a clean two-column stage on
 * warm off-white with little on it — the logo, the name and its line, one
 * sentence, two actions and, quietly underneath, what sets the brand apart. On
 * the right, either the photograph with its location on a glass chip, or —
 * when `cutouts` are given — three product cut-outs floating on the page
 * itself, each set at its own angle and bobbing and swaying on a loop out of
 * step with the others, over a contact shadow that shrinks as it lifts, and
 * leaning toward the pointer. On phones the products come first, right under
 * the header. One screen on desktop.
 */

type Cutout = { src: string; alt: string; width: number; height: number };

/** Where each of the three cut-outs floats: back-left, front-centre, back-right. */
const STAGE = [
  { box: "left-[2%] bottom-[24%] w-[38%]", z: "z-10", tilt: "-12deg", sway: "-3deg", depth: "10px", float: "4.6s", delay: "-1.6s" },
  { box: "left-1/2 bottom-[8%] w-[44%] -translate-x-1/2", z: "z-20", tilt: "5deg", sway: "2.5deg", depth: "22px", float: "4.2s", delay: "0s" },
  { box: "right-[3%] bottom-[22%] w-[30%]", z: "z-10", tilt: "13deg", sway: "3deg", depth: "14px", float: "5s", delay: "-3s" },
] as const;
export function SpotlightHero({
  name,
  tagline,
  body,
  badge,
  logo,
  image,
  location,
  primary,
  secondary,
  cutouts,
}: {
  name: string;
  tagline?: string;
  body?: string;
  badge?: string;
  logo?: { src: string; width: number; height: number; alt: string } | null;
  image: { src: string; alt: string };
  location?: string;
  primary?: Cta;
  secondary?: Cta;
  /** Transparent product cut-outs (three: back-left, front-centre, back-right). */
  cutouts?: Cutout[];
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const trio = cutouts && cutouts.length >= 3 ? cutouts.slice(0, 3) : null;

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-s]", { opacity: 0, y: 24, duration: 1.1, ease: "power3.out", stagger: 0.07, delay: 0.1 });
      gsap.from("[data-s-photo]", { opacity: 0, y: 40, scale: 0.97, duration: 1.4, ease: "power3.out", delay: 0.3 });
      gsap.from("[data-s-cut]", { opacity: 0, y: 90, scale: 0.7, rotate: (i) => [-14, 6, 14][i] ?? 0, duration: 1.3, ease: "back.out(1.5)", stagger: 0.14, delay: 0.45 });
    }, el);

    // The cut-outs lean toward the pointer (fine pointers only).
    const st = stage.current;
    if (!st || !window.matchMedia("(pointer: fine)").matches) return () => ctx.revert();
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const b = st.getBoundingClientRect();
      const px = ((e.clientX - b.left) / b.width) * 2 - 1;
      const py = ((e.clientY - b.top) / b.height) * 2 - 1;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        st.style.setProperty("--px", Math.max(-1, Math.min(1, px)).toFixed(3));
        st.style.setProperty("--py", Math.max(-1, Math.min(1, py)).toFixed(3));
      });
    };
    const onLeave = () => {
      st.style.setProperty("--px", "0");
      st.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, []);

  const button = (cta: Cta, cls: string) => {
    const inner = (
      <>
        {cta.label}
        <Arrow />
      </>
    );
    if (cta.external)
      return (
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    if (!cta.href.startsWith("/"))
      return (
        <a href={cta.href} className={cls}>
          {inner}
        </a>
      );
    return (
      <Link href={cta.href} className={cls}>
        {inner}
      </Link>
    );
  };

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden px-5 pb-14 pt-[calc(var(--header-h)+var(--ribbon-h)+1rem)] text-ink sm:px-8 md:pb-20 lg:flex lg:h-screen lg:min-h-[680px] lg:items-center lg:px-12 lg:pb-[5vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+3vh)]"
      style={{ background: "linear-gradient(180deg, #f8f6f2, #f1eee8)" }}
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="text-center lg:text-left">
          {logo && (
            <Image
              data-s
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="200px"
              preload
              className="mx-auto h-auto max-h-16 w-auto object-contain [filter:drop-shadow(0_6px_16px_rgba(120,60,10,0.18))] lg:mx-0 lg:max-h-[min(5rem,9vh)]"
            />
          )}

          <h1 data-s className="display mt-6 text-[clamp(3rem,7vw,6.2rem)] leading-[0.95] lg:mt-[3.5vh] lg:text-[min(6.2rem,11vh)]">
            {name}
          </h1>
          {tagline && (
            <p data-s className="display-italic mt-3 font-display text-[clamp(1.5rem,2.6vw,2.3rem)] font-medium leading-[1.15] tracking-[-0.01em] !text-[#b4440f]">
              {tagline}
            </p>
          )}
          {body && (
            <p data-s className="mx-auto mt-5 max-w-[30rem] text-[16px] leading-[1.6] text-body md:text-[17.5px] lg:mx-0 lg:mt-[3vh]">
              {body}
            </p>
          )}

          {(primary || secondary) && (
            <div data-s className="mt-8 flex flex-col items-center gap-3 min-[420px]:flex-row min-[420px]:justify-center lg:mt-[4.5vh] lg:justify-start">
              {primary && button(primary, "group btn-onyx shine")}
              {secondary && button(secondary, "group btn-ghost")}
            </div>
          )}

          {/* What sets the brand apart, said quietly under the actions */}
          {badge && (
            <p data-s className="mt-7 inline-flex items-center gap-2 text-[13.5px] text-muted lg:mt-[4vh]">
              <Icon name="star" size={14} className="text-gold-deep" />
              {badge}
            </p>
          )}
        </div>

        {trio ? (
          <div className="relative order-first mx-auto w-full max-w-[460px] lg:order-none lg:max-w-none">
            <div ref={stage} className="relative aspect-[5/4] w-full lg:aspect-auto lg:h-[calc(100vh-var(--header-h)-var(--ribbon-h)-14vh)] lg:max-h-[680px]">
              {trio.map((c, i) => {
                const p = STAGE[i];
                return (
                  <div
                    key={c.src}
                    className={`cutout absolute ${p.box} ${p.z}`}
                    style={{ "--tilt": p.tilt, "--depth": p.depth } as React.CSSProperties}
                  >
                    <div data-s-cut>
                      <div className="cutout-float" style={{ "--float": p.float, "--delay": p.delay, "--sway": p.sway } as React.CSSProperties}>
                        <Image
                          src={c.src}
                          alt={c.alt}
                          width={c.width}
                          height={c.height}
                          preload={i === 1}
                          sizes="(min-width: 1024px) 300px, 45vw"
                          className="h-auto w-full [filter:drop-shadow(0_24px_28px_rgba(120,45,5,0.28))]"
                        />
                      </div>
                      {/* A contact shadow that softens as the product lifts */}
                      <div
                        aria-hidden
                        className="cutout-shadow mx-auto mt-[4%] h-4 w-[64%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(90,40,10,0.4),transparent)]"
                        style={{ "--float": p.float, "--delay": p.delay } as React.CSSProperties}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
        <div data-s-photo className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] shadow-[0_60px_100px_-50px_rgba(120,60,10,0.45)] ring-1 ring-black/5 lg:aspect-auto lg:h-[calc(100vh-var(--header-h)-var(--ribbon-h)-12vh)] lg:max-h-[700px]">
            <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 520px, 90vw" className="object-cover" />
            {location && (
              <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-2 text-[13px] font-medium text-white ring-1 ring-white/15 backdrop-blur-md">
                <Icon name="pin" size={14} className="text-gold-light" />
                {location}
              </p>
            )}
          </div>
          {/* A soft glow under the photograph, in the brand's orange */}
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(234,88,12,0.35),transparent)] blur-2xl" />
        </div>
        )}
      </div>
    </section>
  );
}
