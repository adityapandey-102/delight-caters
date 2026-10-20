import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/motion";

type Account = { brand: string; handle: string; href: string };

/**
 * Never miss one: the group's Instagram accounts, and WhatsApp for offers sent
 * straight to the phone — the page's closing invitation.
 */
export function FollowStrip({ accounts, whatsapp }: { accounts: Account[]; whatsapp: string }) {
  return (
    <section className="bg-black px-6 py-16 text-cream md:py-24 lg:py-[8vh]">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal className="text-center">
          <p className="eyebrow on-dark justify-center">Stay in the loop</p>
          <h2 className="display on-dark mx-auto mt-3 max-w-[18ch] text-[clamp(2.3rem,5vw,3.8rem)]">
            Never miss <span className="display-italic">an offer.</span>
          </h2>
        </Reveal>
        <Reveal stagger as="ul" className="mt-10 grid gap-3 md:grid-cols-3 lg:mt-[5vh]">
          {accounts.map((a) => (
            <li key={a.handle}>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 rounded-[22px] bg-white/[0.06] p-5 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.1] hover:ring-gold-light/40"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold-pale via-gold to-gold-deep text-onyx-ink">
                  <Icon name="instagram" size={21} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-[19px] font-semibold tracking-[-0.025em] text-white">@{a.handle}</span>
                  <span className="block truncate text-[13.5px] text-white/60">{a.brand}</span>
                </span>
                <span aria-hidden className="ml-auto text-[20px] text-gold-light transition-transform duration-300 group-hover:translate-x-1">
                  ›
                </span>
                <span className="sr-only"> (opens Instagram in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-4 rounded-[22px] bg-gold-light p-5 text-onyx-ink transition-colors duration-500 hover:bg-gold-pale"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-onyx-ink text-gold-light">
                <Icon name="whatsapp" size={21} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[19px] font-semibold tracking-[-0.025em]">Offers on WhatsApp</span>
                <span className="block text-[13.5px] text-onyx-ink/70">Ask us to send you what&rsquo;s on</span>
              </span>
              <span aria-hidden className="ml-auto text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                ›
              </span>
            </a>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
