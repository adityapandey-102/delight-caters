import type { Metadata } from "next";
import { group, team } from "@/lib/content/group";
import { pageMetadata } from "@/lib/seo";
import { TeamRows } from "@/modules/group/components/TeamRows";
import CtaBand from "@/modules/home/components/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Our team — leaders in hospitality and food",
  description: `The people who lead ${group.name}'s hotels, kitchens and brands in Bengaluru: our co-founder, general manager, director of sales, executive chef, nutritionist and marketing head.`,
  path: "/team",
  image: { src: team[0].photo.src, alt: `${team[0].name}, ${team[0].role} of ${group.name}` },
});

/** The team: a short, centred introduction, then everyone in the client's order, one to a row. */
export default function TeamPage() {
  return (
    <>
      <section className="texture-plaster px-5 pb-12 pt-[calc(var(--header-h)+var(--ribbon-h)+4rem)] text-center sm:px-8 md:pb-16 lg:px-12 lg:pt-[calc(var(--header-h)+var(--ribbon-h)+9vh)]">
        <p className="text-[14px] font-semibold text-gold-deep">Our team</p>
        <h1 className="display mx-auto mt-4 max-w-[16ch] text-[clamp(2.8rem,6.5vw,5.4rem)] leading-[0.98]">
          The people behind <span className="display-italic">every welcome.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[40rem] text-[17px] leading-[1.6] text-muted md:text-[18px]">
          From the founder&rsquo;s vision to the chef&rsquo;s kitchen, these are the people who set the standard for every stay, every table and every celebration at {group.name}.
        </p>
      </section>
      <TeamRows />
      <CtaBand />
    </>
  );
}
