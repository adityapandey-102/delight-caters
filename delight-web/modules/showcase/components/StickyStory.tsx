"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type StoryStep = {
  kicker: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
  link: { label: string; href: string };
};

/**
 * Apple's pinned scroll story: on large screens a photograph holds still on
 * one side while the steps scroll past on the other — the step in the middle
 * of the screen lights up and the photograph crossfades to match. Phones read
 * it as a simple stack, each step with its own photograph.
 */
export function StickyStory({ title, accent, steps }: { title: string; accent: string; steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section data-scroll-story className="bg-black text-cream">
      <div className="mx-auto w-full max-w-[1080px] px-6 pt-24 md:pt-32">
        <h2 className="display on-dark max-w-[14ch] text-[clamp(2.6rem,6.4vw,5rem)]">
          {title} <span className="display-italic">{accent}</span>
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-[1080px] gap-10 px-6 pb-24 pt-12 md:pb-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          {steps.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              className={`py-10 transition-opacity duration-700 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-0 ${i === active ? "lg:opacity-100" : "lg:opacity-30"}`}
            >
              <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-[22px] lg:hidden">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <p className="text-[15px] font-semibold text-gold-light">{s.kicker}</p>
              <h3 className="mt-2 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">{s.title}</h3>
              <p className="mt-4 max-w-[38ch] text-[17px] leading-[1.5] text-cream-muted md:text-[19px]">{s.body}</p>
              <Link href={s.link.href} className="link-more on-dark mt-5">
                {s.link.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+6vh)] aspect-[4/5] max-h-[calc(100vh-var(--header-h)-12vh)] w-full overflow-hidden rounded-[32px] bg-onyx-soft">
            {steps.map((s, i) => (
              <Image
                key={s.image.src}
                src={s.image.src}
                alt={i === active ? s.image.alt : ""}
                fill
                sizes="(min-width: 1080px) 560px, 50vw"
                className={`object-cover transition-[opacity,transform] duration-[1.1s] ease-[cubic-bezier(0.28,0.11,0.32,1)] ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                }`}
              />
            ))}
            <div aria-hidden className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-6">
              {steps.map((s, i) => (
                <span key={s.title} className={`h-1.5 rounded-full bg-white transition-all duration-500 ${i === active ? "w-6 opacity-100" : "w-1.5 opacity-50"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
