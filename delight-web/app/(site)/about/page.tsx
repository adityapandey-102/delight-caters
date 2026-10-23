import type { Metadata } from "next";
import { group } from "@/lib/content/group";
import { EditorialHero } from "@/modules/showcase/components/EditorialHero";
import { VisionValues } from "@/modules/group/components/VisionValues";
import { TeamGrid } from "@/modules/group/components/TeamGrid";
import CtaBand from "@/modules/home/components/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description: group.story.paragraphs[0],
};

/** The group: its story (told in the hero), what guides it, and the people behind it. */
export default function AboutPage() {
  return (
    <>
      <EditorialHero
        kicker={`About ${group.name}`}
        title={`${group.story.title[0]}`}
        accent={`${group.story.title[1]}.`}
        lead={group.story.paragraphs[0]}
        aside={group.story.paragraphs[1]}
        primary={{ label: "Meet the team", href: "#team" }}
        secondary={{ label: "Contact us", href: "/contact" }}
        photos={[
          { src: "/images/svc-wedding.webp", alt: "A wedding spread by Delight Caterers" },
          { src: "/media/bombay-kulfi/storefront.webp", alt: "Bombay Kulfi on Commercial Street" },
          { src: "/media/sterling-plaza/lobby.webp", alt: "The lobby at Sterling Plaza" },
        ]}
      />
      <VisionValues />
      <TeamGrid />
      <CtaBand />
    </>
  );
}
