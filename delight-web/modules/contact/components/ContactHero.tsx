import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/motion";

type Way = { icon: IconName; title: string; line: string; href: string; external?: boolean };

/**
 * The Contact page's hero is the help desk itself: a short promise on white,
 * then the three quickest ways to reach us as cards — no photograph to scroll
 * past before you can call.
 */
export function ContactHero({ kicker, title, accent, body, ways }: { kicker: string; title: string; accent: string; body: string; ways: Way[] }) {
  return (
    <section className="bg-wall-lit pb-14 md:pb-20 lg:pb-[4vh]">
      <div className="mx-auto w-full max-w-[1080px] px-6 pt-[calc(var(--header-h)+var(--ribbon-h)+3.5rem)] text-center md:pt-[calc(var(--header-h)+var(--ribbon-h)+5rem)] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+4vh)]">
        <Reveal>
          <p className="eyebrow justify-center">{kicker}</p>
          <h1 className="display mx-auto mt-4 max-w-[16ch] text-[clamp(2.7rem,6vw,4.8rem)] font-medium tracking-[-0.01em] lg:text-[min(4.8rem,9vh)]">
            {title} <span className="display-italic">{accent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[36rem] text-balance text-[17px] leading-[1.55] text-muted md:text-[19px]">{body}</p>
        </Reveal>

        <Reveal stagger as="ul" className="mt-12 grid gap-3 text-left sm:grid-cols-3 lg:mt-[3.5vh]">
          {ways.map((w) => (
            <li key={w.title}>
              <a
                href={w.href}
                {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col rounded-[24px] border border-black/[0.06] bg-wall p-6 transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(18,20,16,0.35)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-light/30 text-gold-deep">
                  <Icon name={w.icon} size={19} />
                </span>
                <span className="mt-6 block font-display text-[21px] lg:mt-[2.5vh] font-semibold tracking-[-0.01em] text-ink">{w.title}</span>
                <span className="mt-1 block text-[15px] text-muted">{w.line}</span>
                <span className="link-more mt-5 !text-[15px]">{w.external ? "Open WhatsApp" : w.href.startsWith("tel:") ? "Call now" : "Start"}</span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
