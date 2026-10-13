import Image from "next/image";
import { company, contact, contactPage, hero, whatsappHref } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";
import Parallax from "./Parallax";
import { NEW_TAB, splitTitle } from "./text";

const PHOTO = "/images/cuisine-north-indian-alt.webp";
const WHATSAPP = "WhatsApp";

/**
 * The closing call to action, used on every page above the green footer: a
 * warm wall band holding a photo-backed green card — "Let's plan your
 * perfect event", with Plan Your Event, a call button and WhatsApp.
 */
export default function CtaBand() {
  const [line1, line2] = splitTitle(contactPage.title, 3);

  return (
    <section className="relative isolate overflow-hidden px-5 py-20 sm:px-8 md:py-28 lg:px-12">
      <div aria-hidden className="wall-warm absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,transparent,#000_7rem,#000_calc(100%-7rem),transparent)]" />
      <div aria-hidden className="wall-sun -z-10 mask-[linear-gradient(to_bottom,transparent,#000_7rem,#000_calc(100%-7rem),transparent)]" />

      <Reveal className="relative mx-auto w-full max-w-[1280px]">
        <div className="gold-frame isolate overflow-hidden rounded-[22px] bg-green-ink shadow-[0_60px_110px_-55px_rgba(1,43,21,0.8)] md:rounded-[28px]">
          <div aria-hidden className="absolute inset-0 -z-10">
            <Parallax amount={5}>
              <Image src={PHOTO} alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover object-[72%_50%]" />
            </Parallax>
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-green-ink/80 md:bg-transparent md:bg-linear-to-r md:from-green-ink md:from-30% md:via-green-ink/75 md:via-55% md:to-green-ink/5"
          />
          <div aria-hidden className="grain" />

          <div className="relative px-7 py-16 sm:px-12 sm:py-20 md:px-16 lg:px-20 lg:py-24">
            <div className="max-w-2xl">
              <Eyebrow onDark>{contactPage.eyebrow}</Eyebrow>
              <h2 className="display on-dark mt-6 text-[clamp(2.5rem,5.8vw,4.8rem)]">
                <span className="block">{line1}</span>
                <span className="display-italic block">{line2}</span>
              </h2>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a href="#enquiry" className="btn-gold shine group">
                  {hero.primaryCta} <Arrow />
                </a>
                <a href={contact.phoneHref} className="btn-ghost-dark">
                  <Icon name="phone" size={16} />
                  {contact.phoneDisplay}
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
                  <Icon name="whatsapp" size={16} />
                  {WHATSAPP}
                  <span className="sr-only">{NEW_TAB}</span>
                </a>
              </div>

              <p className="mt-12 font-script text-[2rem] leading-none text-gold-light/85">{company.tagline}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
