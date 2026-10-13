import { contact, faqIntro, faqs } from "@/lib/content/site";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/motion";
import { Arrow } from "@/components/ui/Arrow";
import { Icon } from "@/components/ui/Icon";
import FaqAccordion from "./FaqAccordion";
import { splitTitle } from "./text";

const EYEBROW = "Questions & Answers";

/**
 * Frequently Asked Questions, laid out as Webberbiz does it: the heading, the
 * intro and a "Need more information?" box in a left column that stays put on
 * desktop, and the numbered accordion (01–06) on the right.
 */
export default function Faq() {
  const [line1, line2] = splitTitle(faqIntro.title, 2);

  return (
    <section className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="relative mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
          <Reveal>
            <Eyebrow>{EYEBROW}</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.3rem,4.8vw,3.8rem)]">
              <span className="block">{line1}</span>
              <span className="display-italic block">{line2}</span>
            </h2>
            <p className="mt-7 max-w-md text-[15.5px] leading-[1.8] text-body">{faqIntro.body}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <div className="relative overflow-hidden rounded-[14px] border border-line bg-wall-lit p-7 shadow-[0_30px_60px_-45px_rgba(1,43,21,0.45)] sm:p-8">
              <div aria-hidden className="gold-hairline absolute inset-x-0 top-0" />
              <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-green">{faqIntro.contactTitle}</h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-body">{faqIntro.contactBody}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#enquiry" className="btn-green group">
                  {faqIntro.contactCta} <Arrow />
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2.5 text-[14.5px] font-semibold text-green transition-colors hover:text-gold-deep"
                >
                  <Icon name="phone" size={16} className="text-gold-deep" />
                  <span className="ulink">{contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <FaqAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
