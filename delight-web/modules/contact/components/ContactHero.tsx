import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/motion";

type Way = { icon: IconName; title: string; line: string; href: string; external?: boolean };
type Photo = { src: string; alt: string };

/**
 * The Contact page's hero is the help desk itself: a short promise and the
 * three quickest ways to reach us on the left, and on the right a collage of
 * the group's own tables, rooms and kulfi, so you see who you're reaching.
 * On phones the ways come first and the collage follows.
 */
export function ContactHero({ kicker, title, accent, body, ways, photos }: { kicker: string; title: string; accent: string; body: string; ways: Way[]; photos: [Photo, Photo, Photo] }) {
  return (
    <section className="texture-plaster pb-14 md:pb-20 lg:pb-[6vh]">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 pt-[calc(var(--header-h)+var(--ribbon-h)+3.5rem)] md:pt-[calc(var(--header-h)+var(--ribbon-h)+5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:px-12 lg:pt-[calc(var(--header-h)+var(--ribbon-h)+6vh)]">
        <div>
          <Reveal>
            <p className="eyebrow">{kicker}</p>
            <h1 className="display mt-4 max-w-[14ch] text-[clamp(2.7rem,6vw,4.8rem)] font-medium tracking-[-0.01em] lg:text-[min(4.8rem,9vh)]">
              {title} <span className="display-italic">{accent}</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.55] text-muted md:text-[19px]">{body}</p>
          </Reveal>

          <Reveal stagger as="ul" className="mt-10 space-y-3 lg:mt-[4vh]">
            {ways.map((w) => (
              <li key={w.title}>
                <a
                  href={w.href}
                  {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 rounded-[20px] border border-black/[0.06] bg-wall-lit/90 p-4 pr-6 transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(18,20,16,0.35)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-wall-warm text-gold-deep ring-1 ring-line">
                    <Icon name={w.icon} size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[20px] font-semibold leading-tight tracking-[-0.01em] text-ink">{w.title}</span>
                    <span className="mt-0.5 block text-[14.5px] text-muted">{w.line}</span>
                  </span>
                  <span className="link-more hidden shrink-0 !text-[14px] sm:inline-flex">{w.external ? "Open WhatsApp" : w.href.startsWith("tel:") ? "Call now" : "Start"}</span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>

        {/* The collage: one tall photograph beside two stacked ones */}
        <Reveal delay={0.15} className="grid h-[min(78vh,640px)] min-h-[420px] grid-cols-[1.15fr_1fr] grid-rows-2 gap-3">
          {photos.map((p, i) => (
            <div key={p.src} className={`relative overflow-hidden rounded-[24px] bg-wall-warm ${i === 0 ? "row-span-2" : ""}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 340px, 50vw" className="object-cover" preload={i === 0} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
