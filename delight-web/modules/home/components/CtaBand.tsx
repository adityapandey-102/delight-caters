import Image from "next/image";
import { company, contact, contactPage, whatsappHref } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";
import Parallax from "./Parallax";
import { NEW_TAB, splitTitle } from "./text";

const PHOTO = "/images/cuisine-north-indian-alt.webp";
const WHATSAPP = "WhatsApp";

/**
 * The closing call to action, used on every page above the footer: a warm
 * off-white card with the photograph fading in on the right — "Let's plan your
 * perfect event", with the page's enquiry button, a call button and WhatsApp.
 */
export default function CtaBand({ label = "Enquire now" }: { label?: string }) {
  const [line1, line2] = splitTitle(contactPage.title, 3);

  return (
    <section className="relative isolate overflow-hidden px-5 py-20 sm:px-8 md:py-28 lg:px-12 lg:py-[6vh]">
      <div aria-hidden className="wall-warm absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,transparent,#000_7rem,#000_calc(100%-7rem),transparent)]" />
      <div aria-hidden className="wall-sun -z-10 mask-[linear-gradient(to_bottom,transparent,#000_7rem,#000_calc(100%-7rem),transparent)]" />

      <Reveal className="relative mx-auto w-full max-w-[1280px]">
        <div className="gold-frame isolate overflow-hidden rounded-[22px] bg-wall-cream shadow-[0_60px_110px_-60px_rgba(18,20,16,0.45)] md:rounded-[28px]">
          <div aria-hidden className="absolute inset-0 -z-10">
            <Parallax amount={5}>
              <Image src={PHOTO} alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover object-[72%_50%]" />
            </Parallax>
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-wall-cream/92 md:bg-transparent md:bg-linear-to-r md:from-wall-cream md:from-40% md:via-wall-cream/60 md:via-[52%] md:to-transparent md:to-[62%]"
          />

          <div
            aria-hidden
            className="absolute inset-y-0 left-0 -z-10 w-full [background-image:var(--plaster-grain),var(--plaster-mottle)] [background-size:220px_220px,768px_768px] md:w-[62%] md:[mask-image:linear-gradient(90deg,#000_65%,transparent)]"
          />
          <div className="relative px-7 py-16 sm:px-12 sm:py-20 md:px-16 lg:px-20 lg:py-[9vh]">
            <div className="max-w-2xl">
              <Eyebrow>{contactPage.eyebrow}</Eyebrow>
              <h2 className="display mt-6 text-[clamp(2.5rem,5.8vw,4.8rem)]">
                <span className="block">{line1}</span>
                <span className="display-italic block">{line2}</span>
              </h2>

              <div className="mt-10 flex flex-col gap-3 sm:max-w-[30rem] sm:flex-row sm:flex-wrap sm:items-center">
                <a href="#enquiry" className="btn-onyx shine group">
                  {label} <Arrow />
                </a>
                <a href={contact.phoneHref} className="btn-ghost bg-wall-lit/80">
                  <Icon name="phone" size={16} />
                  {contact.phoneDisplay}
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost bg-wall-lit/80">
                  <Icon name="whatsapp" size={16} />
                  {WHATSAPP}
                  <span className="sr-only">{NEW_TAB}</span>
                </a>
              </div>

              <p className="mt-12 font-script text-[2rem] leading-none text-gold-deep">{company.tagline}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
