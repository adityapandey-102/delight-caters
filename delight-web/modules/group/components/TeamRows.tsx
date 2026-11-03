"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { team, type TeamMember } from "@/lib/content/group";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * The team, one person to a row, in the client's order. The co-founder's row
 * is set larger; the rest alternate sides. Each row plays one entrance as it
 * scrolls in — the portrait wipes open from the foot while the photograph
 * settles from a slight zoom, a gold line draws across, the name rises out of
 * a mask, then the role and the words. Portraits stay whole in their frames
 * (no scroll drift). Reduced motion shows everything at rest.
 */
export function TeamRows() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 78%", once: true } });
        tl.fromTo(row.querySelector("[data-frame]"), { clipPath: "inset(100% 0% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "expo.out" })
          .fromTo(row.querySelector("[data-photo]"), { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0)
          .fromTo(row.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut" }, 0.25)
          .fromTo(row.querySelector("[data-name]"), { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "expo.out" }, 0.35)
          .fromTo(row.querySelectorAll("[data-fade]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.6);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="px-5 pb-16 sm:px-8 md:pb-24 lg:px-12 lg:pb-[8vh]">
      <ol className="mx-auto w-full max-w-[1200px]">
        {team.map((m, i) => (
          <Row key={m.name} member={m} lead={i === 0} flip={i % 2 === 0} />
        ))}
      </ol>
    </div>
  );
}

function Row({ member: m, lead, flip }: { member: TeamMember; lead: boolean; flip: boolean }) {
  return (
    <li
      data-row
      className={`grid items-center gap-8 py-12 md:gap-14 md:py-16 lg:py-20 ${
        lead ? "md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : "md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]"
      }`}
    >
      {/* The portrait: multiplied onto a stone tile so the different shoots read as one set (the tile colour sits on the zooming layer, which isolates the blend) */}
      <div className={flip ? "md:order-last" : ""}>
        <div data-frame className={`relative mx-auto overflow-hidden rounded-[28px] bg-wall-warm ${lead ? "aspect-[4/5] max-w-[540px]" : "aspect-[4/5] max-w-[400px]"}`}>
          <div data-photo className="absolute inset-0 bg-wall-warm">
            <Image
              src={m.photo.src}
              alt={`${m.name}, ${m.role}`}
              fill
              preload={lead}
              sizes={lead ? "(min-width: 768px) 540px, 100vw" : "(min-width: 768px) 400px, 100vw"}
              className="object-cover mix-blend-multiply"
              style={{ objectPosition: m.photo.focus }}
            />
          </div>
        </div>
      </div>

      <div>
        <span data-rule aria-hidden className="block h-px w-24 origin-left bg-gold/60" />
        <div className="mt-6 overflow-hidden pb-1">
          <h2 data-name className={`display ${lead ? "text-[clamp(3rem,6.4vw,5.6rem)]" : "text-[clamp(2.3rem,4.2vw,3.6rem)]"} leading-[1]`}>
            {m.name}
          </h2>
        </div>
        <p data-fade className={`display-italic mt-3 ${lead ? "text-[clamp(1.5rem,2.4vw,2rem)]" : "text-[clamp(1.25rem,1.8vw,1.55rem)]"}`}>
          {m.role}
        </p>
        <p data-fade className={`mt-5 max-w-[46ch] leading-[1.7] text-muted ${lead ? "text-[17px] md:text-[19px]" : "text-[16px] md:text-[17px]"}`}>
          {m.bio}
        </p>
      </div>
    </li>
  );
}
