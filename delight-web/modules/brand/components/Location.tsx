import { Reveal } from "@/components/ui/motion";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";

/** "Find us." — the address, directions and phone beside an embedded Google map. */
export function Location({
  n,
  name,
  address,
  mapsUrl,
  phone,
  query,
  id = "location",
}: {
  n?: number;
  name: string;
  address?: string;
  mapsUrl?: string;
  phone?: { display: string; href: string };
  query?: string;
  id?: string;
}) {
  const q = encodeURIComponent(query ?? `${name}, ${address ?? "Bengaluru"}`);
  return (
    <section id={id} className="relative scroll-mt-[120px] px-5 pb-16 sm:px-8 md:pb-24 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <p className="flex items-center gap-3 border-t border-line pt-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted">
          {n !== undefined && (
            <>
              <span className="text-gold-deep lining-nums">{String(n).padStart(2, "0")}</span>
              <span aria-hidden>/</span>
            </>
          )}
          Location
        </p>
        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
          <div className="flex flex-col">
            <h2 className="display text-[clamp(2.4rem,4.6vw,3.8rem)]">
              Find <span className="display-italic">us.</span>
            </h2>
            {address && <p className="mt-6 max-w-[40ch] text-[16px] leading-[1.75] text-body">{address}</p>}
            <div className="mt-7 flex flex-wrap gap-3">
              {mapsUrl && (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-onyx group">
                  Get directions <Arrow />
                </a>
              )}
              {phone && (
                <a href={phone.href} className="btn-ghost group">
                  <Icon name="phone" size={14} /> {phone.display}
                </a>
              )}
            </div>
          </div>
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-[22px] border border-line bg-wall-warm shadow-[0_30px_60px_-40px_rgba(18,20,16,0.55)] lg:min-h-[400px]">
            <iframe
              title={`Map: ${name}`}
              src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:grayscale(0.35)_contrast(1.05)]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
