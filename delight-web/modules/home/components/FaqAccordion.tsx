"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { pad } from "./text";

/**
 * Numbered single-open accordion. Each question is a button inside an h3
 * (aria-expanded / aria-controls); each answer a labelled region whose height
 * eases open via grid-template-rows 0fr → 1fr. Closed answers are inert, so
 * they're skipped by keyboard and screen readers.
 */
export default function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: readonly { q: string; a: string }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-4 py-6 text-left sm:gap-7 sm:py-7"
              >
                <span
                  aria-hidden
                  className={`w-8 shrink-0 pt-1 font-display text-[1.3rem] font-medium italic leading-none lining-nums transition-colors duration-500 ${
                    isOpen ? "text-gold-deep" : "text-muted group-hover:text-gold-deep"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                <span
                  className={`flex-1 font-display text-[1.4rem] font-semibold leading-[1.2] transition-colors duration-500 sm:text-[1.6rem] ${
                    isOpen ? "text-onyx" : "text-ink group-hover:text-onyx"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[rotate,background-color,border-color,color] duration-500 ease-out-expo ${
                    isOpen
                      ? "rotate-45 border-ink bg-transparent text-ink"
                      : "border-gold/50 text-gold-deep group-hover:border-onyx group-hover:text-onyx"
                  }`}
                >
                  <Icon name="plus" size={16} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-600 ease-out-expo ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 pl-12 text-[15.5px] leading-[1.8] text-body sm:pl-[3.75rem] sm:pr-16">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
