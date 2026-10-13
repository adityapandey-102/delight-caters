import Image from "next/image";
import { cuisinesIntro, services } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/motion";

/** "Corporate Catering" → "Corporate" roman, "Catering" gold italic; one word stays roman. */
function ServiceTitle({ title }: { title: string }) {
  const words = title.split(" ");
  if (words.length === 1) return <>{title}</>;
  return (
    <>
      {words.slice(0, -1).join(" ")} <span className="display-italic">{words[words.length - 1]}</span>
    </>
  );
}

/**
 * The four services as alternating rows: a gold-framed photograph with its
 * numeral, and beside it the title, the line about it, its four occasions as
 * a checklist, and "Enquire Now" (opens the enquiry popup).
 */
export function ServiceList() {
  return (
    <section aria-label="Our services" className="relative px-5 pb-24 pt-10 sm:px-8 md:pb-32 md:pt-14 lg:px-12">
      <div className="mx-auto w-full max-w-[1280px] space-y-24 md:space-y-32">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          const numeral = String(i + 1).padStart(2, "0");
          return (
            <article key={s.key} id={s.key} className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={`relative ${flip ? "lg:order-2" : ""}`}>
                <div
                  aria-hidden
                  className={`absolute -bottom-4 top-8 rounded-[32px] bg-wall-warm sm:-bottom-6 ${flip ? "-right-3 left-8 sm:-right-6 sm:left-12" : "-left-3 right-8 sm:-left-6 sm:right-12"}`}
                />
                <div className="gold-frame zoom relative aspect-[4/3] overflow-hidden rounded-[28px] bg-wall-shade shadow-[0_50px_90px_-45px_rgba(1,43,21,0.55)] sm:aspect-[3/2]">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 92vw" className="object-cover" />
                </div>
              </Reveal>

              <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                <div aria-hidden className="flex items-center gap-5">
                  <span className="gold-text font-display text-[3.6rem] font-semibold leading-[1.1] lining-nums sm:text-[4.4rem]">{numeral}</span>
                  <span className="h-px w-20 bg-linear-to-r from-gold to-transparent" />
                </div>
                <h2 className="display mt-5 text-[clamp(2.4rem,4.8vw,3.8rem)]">
                  <ServiceTitle title={s.title} />
                </h2>
                <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.8] text-body">{s.body}</p>

                <ul className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3.5 border-b border-line py-3.5 text-[15px] text-ink">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green text-gold-light">
                        <Icon name="check" size={14} strokeWidth={2} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a href="#enquiry" className="btn-green group mt-9">
                  {cuisinesIntro.cta} <Arrow />
                </a>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
