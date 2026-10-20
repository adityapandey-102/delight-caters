"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Offer } from "@/lib/content/offers";

type Tab = { key: string; label: string; items: Offer[] };

/**
 * Every offer, sorted into tabs (hotels / food & drink). Each tab is a grid of
 * wide cards — photo on the left, the details on the right — sized so a whole
 * tab fits one desktop screen. Switching tabs fades the cards in.
 */
export function OffersBoard({ tabs }: { tabs: Tab[] }) {
  const [tab, setTab] = useState(tabs[0]?.key);
  const current = tabs.find((t) => t.key === tab) ?? tabs[0];
  if (!current) return null;

  return (
    <section id="all-offers" className="scroll-mt-[120px] bg-wall px-6 py-16 md:py-24 lg:py-[6vh]">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[clamp(2.2rem,5vw,3.5rem)]">
            Every offer, <span className="display-italic">one place.</span>
          </h2>
          <div role="tablist" aria-label="Offers by business" className="flex gap-1 self-start rounded-full bg-black/[0.05] p-1 md:self-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={t.key === current.key}
                aria-controls="offers-panel"
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300 ${
                  t.key === current.key ? "bg-white text-ink shadow-[0_6px_16px_-10px_rgba(18,20,16,0.5)]" : "text-muted hover:text-ink"
                }`}
              >
                {t.label} <span className="text-faint">{t.items.length}</span>
              </button>
            ))}
          </div>
        </div>

        <ul id="offers-panel" role="tabpanel" key={current.key} className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-[4vh]">
          {current.items.map((o, i) => (
            <li key={o.id} className="animate-[flyout-in_0.6s_cubic-bezier(0.28,0.11,0.32,1)_both]" style={{ animationDelay: `${i * 60}ms` }}>
              <article className="group grid h-full grid-cols-[42%_1fr] overflow-hidden rounded-[24px] border border-black/[0.06] bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-36px_rgba(18,20,16,0.45)] lg:h-[calc((100vh-330px)/3)] lg:min-h-[150px]">
                <div className="relative min-h-[170px] overflow-hidden">
                  <Image src={o.image.src} alt={o.image.alt} fill sizes="(min-width: 768px) 240px, 42vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]" />
                </div>
                <div className="flex min-w-0 flex-col justify-center p-5 lg:p-[2vh_1.4rem]">
                  <p className="text-[12.5px] font-semibold text-gold-deep">
                    {o.kind} · {o.brand}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(1.15rem,1.6vw,1.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">{o.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[14px] leading-[1.45] text-muted">{o.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12.5px] text-faint">{o.dates}</span>
                    {o.cta.href.startsWith("/") ? (
                      <Link href={o.cta.href} className="link-more !text-[14px]">
                        {o.cta.label}
                      </Link>
                    ) : (
                      <a href={o.cta.href} className="link-more !text-[14px]">
                        {o.cta.label}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
