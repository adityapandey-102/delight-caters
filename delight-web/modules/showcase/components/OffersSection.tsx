import { asHighlights, type Offer } from "@/lib/content/offers";
import { Highlights } from "./Highlights";

/**
 * The marketing section for a category or an outlet: its offers, events and
 * collaborations (from lib/content/offers), in the same Highlights carousel
 * the home page uses — placed straight after the hero.
 */
export function OffersSection({ title, eyebrow, items, id = "offers" }: { title: string; eyebrow?: string; items: Offer[]; id?: string }) {
  if (!items.length) return null;
  return (
    <div id={id} className="scroll-mt-[120px]">
      <Highlights title={title} eyebrow={eyebrow} items={asHighlights(items)} />
    </div>
  );
}
