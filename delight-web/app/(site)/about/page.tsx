import type { Metadata } from "next";
import { group } from "@/lib/content/group";
import { pageMetadata } from "@/lib/seo";
import { EditorialHero } from "@/modules/showcase/components/EditorialHero";
import { VisionValues } from "@/modules/group/components/VisionValues";
import { TeamTeaser } from "@/modules/group/components/TeamTeaser";
import CtaBand from "@/modules/home/components/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "About us — hospitality and food in Bengaluru",
  description:
    "Zyra Group is a family of hospitality and food businesses in Bengaluru — Delight Caterers, Bombay Kulfi, Aero Bites and three hotels near the airport — built on quality, trust and excellence.",
  path: "/about",
  image: { src: "/media/refined/caterers-hero.webp", alt: "A server plating a dish at a long table laid by Delight Caterers" },
});

/** The group: its story (told in the hero over its own rooms, tables and kulfi), what guides it, and the way to meet its people. */
export default function AboutPage() {
  return (
    <>
      <EditorialHero
        kicker={`About ${group.name}`}
        title={`${group.story.title[0]}`}
        accent={`${group.story.title[1]}.`}
        lead={group.story.paragraphs[0]}
        aside={group.story.paragraphs[1]}
        primary={{ label: "Meet the team", href: "/team" }}
        secondary={{ label: "Contact us", href: "/contact" }}
        photos={[
          { src: "/media/refined/caterers-hero.webp", alt: "A server plating a dish at a long table laid by Delight Caterers" },
          { src: "/media/real/plaza-room-terracotta.webp", alt: "A deluxe room at Sterling Plaza" },
          { src: "/media/real/kulfi-kesar-pista.webp", alt: "Kesar pista kulfi and paan ice cream from Bombay Kulfi" },
        ]}
      />
      <VisionValues />
      <TeamTeaser />
      <CtaBand />
    </>
  );
}
