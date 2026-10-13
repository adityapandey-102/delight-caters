import { approach } from "@/lib/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import TouchActive from "./TouchActive";
import { pad, splitTitle } from "./text";

const EYEBROW = "Why Delight Caters";
const ICONS: IconName[] = ["sparkle", "chef", "leaf"];

/**
 * "Our Unique Approach": three pillars, each with a gold numeral, an icon
 * medallion and a hairline that runs out to full width. They lift on hover;
 * on touch screens they light up as they cross the middle of the screen.
 * Sits on the plain wall (no band of its own, so no seam against the plaster).
 * `className` adds classes to the section, e.g. extra spacing.
 */
export default function Approach({ className = "" }: { className?: string }) {
  const [line1, line2] = splitTitle(approach.title, 2);

  return (
    <section className={`relative px-5 py-24 sm:px-8 md:py-32 lg:px-12 ${className}`}>
      <div className="relative mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionHead eyebrow={EYEBROW} line1={line1} line2={line2} align="center" />
        </Reveal>

        <TouchActive>
          <Reveal as="ol" stagger className="mx-auto mt-16 grid max-w-3xl gap-5 md:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-7">
            {approach.items.map((item, i) => (
              <li
                key={item.title}
                data-touch
                className="group relative flex flex-col rounded-[12px] border border-line bg-wall-lit/45 px-7 pb-10 pt-8 transition-[translate,background-color,border-color,box-shadow] duration-700 ease-out-expo hover:-translate-y-1.5 hover:border-gold/50 hover:bg-wall-lit hover:shadow-[0_40px_70px_-45px_rgba(1,43,21,0.45)] data-[active=true]:-translate-y-1 data-[active=true]:border-gold/50 data-[active=true]:bg-wall-lit md:flex-row md:gap-10 md:px-10 md:py-10 lg:flex-col lg:gap-0 lg:px-9 lg:pb-12 lg:pt-10"
              >
                {/* Numeral and medallion: a row on phones and desktop, a column beside the text on tablets */}
                <div className="flex items-start justify-between gap-4 md:w-28 md:shrink-0 md:flex-col md:justify-start md:gap-6 lg:w-auto lg:flex-row lg:justify-between">
                  <span aria-hidden className="gold-text font-display text-[4rem] font-semibold leading-[0.9] lining-nums lg:text-[4.4rem]">
                    {pad(i + 1)}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-deep transition-colors duration-500 group-hover:border-green group-hover:bg-green group-hover:text-gold-light group-data-[active=true]:border-green group-data-[active=true]:bg-green group-data-[active=true]:text-gold-light"
                  >
                    <Icon name={ICONS[i % ICONS.length]} size={22} />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div aria-hidden className="relative mt-9 h-px bg-line md:mt-3 lg:mt-9">
                    <span className="absolute inset-y-0 left-0 w-10 bg-gold transition-[width] duration-700 ease-out-expo group-hover:w-full group-data-[active=true]:w-full" />
                  </div>

                  <h3 className="mt-7 font-display text-[1.75rem] font-semibold leading-[1.1] text-green lg:text-[1.85rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-body">{item.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </TouchActive>
      </div>
    </section>
  );
}
