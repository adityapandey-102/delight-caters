"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";

export type FinderTab = {
  label: string;
  icon: IconName;
  href: string;
  links: { label: string; note: string; href: string }[];
};

/**
 * The home hero's finder, as one slim glass bar: choose stay, dine, treats or
 * celebrate on the left; the matching places appear as chips on the right,
 * with "View all" at the end. Wraps to two rows on phones.
 */
export function Finder({ tabs }: { tabs: FinderTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className="flex flex-col gap-2 rounded-[18px] border border-white/20 bg-white/10 p-2 text-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl md:flex-row md:items-center">
      <div role="tablist" aria-label="What are you looking for?" className="grid shrink-0 grid-cols-4 gap-1 rounded-[13px] bg-black/25 p-1 md:flex">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="finder-panel"
            onClick={() => setActive(i)}
            className={`flex min-h-10 items-center justify-center gap-1.5 rounded-[10px] px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 md:px-3.5 ${
              i === active ? "bg-wall-lit text-ink" : "text-white/80 hover:text-white"
            }`}
          >
            <Icon name={t.icon} size={14} className="hidden sm:block" />
            {t.label}
          </button>
        ))}
      </div>

      <div id="finder-panel" role="tabpanel" className="flex min-w-0 flex-1 items-center gap-2">
        <ul className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto" data-lenis-prevent-horizontal>
          {tab.links.map((l) => (
            <li key={l.href + l.label} className="shrink-0">
              <Link
                href={l.href}
                className="flex min-h-10 items-center gap-2 rounded-full border border-white/25 px-4 text-[13px] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <span className="font-medium">{l.label}</span>
                <span className="hidden text-white/60 sm:inline">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={tab.href} className="group flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-wall-lit px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-light">
          View all <Arrow />
        </Link>
      </div>
    </div>
  );
}
