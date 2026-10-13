import { approach } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import TouchActive from "./TouchActive";
import { pad, splitTitle } from "./text";

const EYEBROW = "Why Delight Caters";
const ICONS: IconName[] = ["sparkle", "chef", "leaf"];

/**
 * "Our Unique Approach", kept compact: the heading on the left and the three
 * pillars in one refined panel, divided by gold hairlines rather than three
 * heavy cards. A pillar lights on hover (icon fills green, a gold line runs
 * along its top); on touch screens as it crosses the middle of the screen.
 * `className` adds classes to the section.
 */
export default function Approach({ className = "" }: { className?: string }) {
  const [line1, line2] = splitTitle(approach.title, 2);

  return (
    <section className={`relative px-5 py-16 sm:px-8 md:py-20 lg:px-12 ${className}`}>
      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2.25fr)] lg:gap-14">
        <Reveal className="text-center lg:text-left">
          <Eyebrow className="justify-center lg:justify-start">{EYEBROW}</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            <span className="block">{line1}</span>
            <span className="display-italic block">{line2}</span>
          </h2>
          <span aria-hidden className="gold-rule mx-auto mt-6 block w-36 lg:mx-0" />
        </Reveal>

        <TouchActive>
          <Reveal
            as="ol"
            stagger
            className="grid overflow-hidden rounded-[18px] border border-gold/30 bg-wall-lit/70 shadow-[0_30px_60px_-44px_rgba(1,43,21,0.45)] backdrop-blur-sm md:grid-cols-3"
          >
            {approach.items.map((item, i) => (
              <li
                key={item.title}
                data-touch
                className="group relative px-6 py-7 transition-colors duration-500 hover:bg-wall-lit data-[active=true]:bg-wall-lit sm:px-7 md:py-8 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-gold/25 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0"
              >
                {/* gold line that runs along the top of the lit pillar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-linear-to-r from-gold via-gold-light to-gold transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
                />
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-deep transition-colors duration-500 group-hover:border-green group-hover:bg-green group-hover:text-gold-light group-data-[active=true]:border-green group-data-[active=true]:bg-green group-data-[active=true]:text-gold-light"
                  >
                    <Icon name={ICONS[i % ICONS.length]} size={19} />
                  </span>
                  <span aria-hidden className="text-[11px] font-semibold tracking-[0.24em] text-gold-deep lining-nums">
                    {pad(i + 1)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.45rem] font-semibold leading-[1.15] text-green">{item.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.7] text-body">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </TouchActive>
      </div>
    </section>
  );
}
