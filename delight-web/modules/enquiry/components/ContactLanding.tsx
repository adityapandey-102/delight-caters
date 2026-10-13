import Link from "next/link";
import { company, contact, contactPage, services, servicesTitle, whatsappHref, type Service } from "@/lib/content/site";
import { Eyebrow, Section } from "@/components/ui/SectionHead";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/motion";
import { EnquiryForm } from "./EnquiryForm";

/** Roman first half, gold italic second half. */
function halves(title: string): [string, string] {
  const words = title.split(" ");
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}

const DETAILS: { label: string; value: string; href: string; icon: IconName; external?: boolean }[] = [
  { label: "Call / WhatsApp", value: contact.phoneDisplay, href: contact.phoneHref, icon: "phone" },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: "mail" },
  { label: "Location", value: contact.locationShort, href: contact.mapsUrl, icon: "pin", external: true },
];

const OCCASION_ICONS: Record<Service["key"], IconName> = {
  corporate: "briefcase",
  event: "glass",
  wedding: "rings",
  casual: "party",
};

/**
 * The Contact Us page, after needleye's enquiry landing in green velvet and
 * gold: the heading and the form in the first view (on phones the form comes
 * straight after the words, the contact details after it), then where to find
 * us with the map, then the four occasions. Server-rendered; the form is the
 * only client code.
 */
export function ContactLanding() {
  const [line1, line2] = halves(contactPage.title);

  return (
    <>
      {/* ---------------- Hero: the words, the form, the details ---------------- */}
      <section className="green-velvet overflow-hidden">
        <div aria-hidden className="grain" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-48 top-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(231,199,97,0.13),transparent)]"
        />
        <div aria-hidden className="gold-hairline absolute inset-x-0 bottom-0 opacity-60" />

        <div className="relative mx-auto grid w-full max-w-[1280px] gap-x-10 gap-y-12 px-5 pb-20 pt-[calc(var(--header-h)+2.5rem)] sm:px-8 md:pt-[calc(var(--header-h)+4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:px-12 lg:pb-28 xl:grid-cols-[minmax(0,1fr)_minmax(0,35rem)] xl:gap-x-16">
          <div className="lg:col-start-1 lg:row-start-1 lg:pt-6">
            <Eyebrow onDark>{contactPage.eyebrow}</Eyebrow>
            <h1 className="display on-dark mt-6 text-[clamp(2.7rem,7vw,5.4rem)] leading-[0.96] lg:text-[clamp(3.3rem,5.4vw,5.4rem)]">
              <span className="block">{line1}</span>
              <span className="display-italic block">{line2}</span>
            </h1>
            <div aria-hidden className="gold-hairline mt-8 w-40" />
            <p className="mt-7 max-w-[46ch] text-[16px] leading-[1.8] text-cream-muted">{contactPage.body}</p>
          </div>

          <div id="enquiry-form" className="scroll-mt-28 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="wall-lit relative rounded-[28px] px-5 pb-7 pt-8 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.75)] ring-1 ring-gold-light/50 sm:p-9 lg:p-10">
              <div aria-hidden className="gold-hairline absolute inset-x-10 top-0 h-[2px]" />
              <EnquiryForm tone="light" idPrefix="contact-enquiry" heading={["Tell us about", "your event"]} />
            </div>
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-end">
            <h2 className="font-display text-[1.9rem] font-semibold leading-tight text-cream">{contactPage.detailsTitle}</h2>
            <p className="mt-2 text-[15px] leading-[1.7] text-cream-muted">{contactPage.detailsBody}</p>
            <ul className="mt-6 max-w-lg divide-y divide-gold-light/15 border-y border-gold-light/15">
              {DETAILS.map((d) => (
                <li key={d.label} className="flex items-center gap-3">
                  <a
                    href={d.href}
                    {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-w-0 flex-1 items-center gap-4 py-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-gold-light ring-1 ring-gold-light/35 transition-colors duration-300 group-hover:bg-gold-light group-hover:text-green-ink">
                      <Icon name={d.icon} size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-gold-light/80">{d.label}</span>
                      <span className="mt-0.5 block truncate font-display text-[1.35rem] font-semibold leading-snug text-cream transition-colors group-hover:text-gold-light sm:text-[1.5rem]">
                        {d.value}
                      </span>
                    </span>
                  </a>
                  {d.icon === "phone" && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-light/10 text-gold-light ring-1 ring-gold-light/35 transition-colors hover:bg-gold-light hover:text-green-ink"
                    >
                      <Icon name="whatsapp" size={19} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Visit: the address, the hours, the map ---------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>Visit Us</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.3rem,5vw,3.8rem)]">
              <span className="block">Find us on</span>
              <span className="display-italic block">the airport road</span>
            </h2>
            <div aria-hidden className="gold-rule mt-8 w-44" />

            <div className="mt-10 space-y-7">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green text-gold-light">
                  <Icon name="pin" size={18} />
                </span>
                <div>
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">Address</h3>
                  <address className="mt-1.5 max-w-sm text-[15.5px] not-italic leading-[1.75] text-ink">
                    <span className="block font-semibold text-green">{company.name}</span>
                    {contact.address.full}
                  </address>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green text-gold-light">
                  <Icon name="clock" size={18} />
                </span>
                <div>
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">Hours</h3>
                  <p className="mt-1.5 text-[15.5px] leading-[1.75] text-ink">{contact.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-green group">
                Get directions <Arrow />
              </a>
              <a href={contact.phoneHref} className="btn-ghost">
                <Icon name="phone" size={16} /> {contact.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="gold-frame relative h-full min-h-[320px] overflow-hidden rounded-[28px] bg-wall-shade shadow-[0_40px_80px_-40px_rgba(1,43,21,0.45)] ring-1 ring-line sm:min-h-[420px]">
              <iframe
                src={contact.mapsEmbedUrl}
                title={`Map: ${company.name}, ${contact.address.locality}, ${contact.address.region}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.12)_saturate(0.92)]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- The four occasions ---------------- */}
      <section className="wall-warm relative overflow-hidden px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div aria-hidden className="gold-hairline absolute inset-x-0 top-0" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <div className="text-center">
            <Eyebrow>{servicesTitle}</Eyebrow>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-0">
            {services.map((s, i) => (
              <li key={s.key} className="relative">
                {i > 0 && <span aria-hidden className="absolute -left-1 top-7 hidden h-2 w-2 rotate-45 bg-gold lg:block" />}
                <Link href="/service" className="group flex flex-col items-center gap-4 px-2 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-gold-light shadow-[0_14px_30px_-14px_rgba(1,43,21,0.7)] ring-4 ring-gold-light/20 transition-[translate] duration-500 ease-out-expo group-hover:-translate-y-1">
                    <Icon name={OCCASION_ICONS[s.key]} size={22} />
                  </span>
                  <span className="text-[10.5px] font-medium tracking-[0.24em] text-gold-deep">0{i + 1}</span>
                  <span className="font-display text-[1.4rem] font-semibold leading-tight text-green transition-colors group-hover:text-gold-deep sm:text-[1.75rem]">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
