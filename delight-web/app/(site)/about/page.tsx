import type { Metadata } from "next";
import { group } from "@/lib/content/group";
import { BrandHero } from "@/modules/brand/components/BrandHero";
import { StorySection } from "@/modules/group/components/StorySection";
import { VisionValues } from "@/modules/group/components/VisionValues";
import { TeamGrid } from "@/modules/group/components/TeamGrid";
import CtaBand from "@/modules/home/components/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description: group.story.paragraphs[0],
};

/** The group: its story, what guides it, and the people behind it. */
export default function AboutPage() {
  return (
    <>
      <BrandHero
        eyebrow={`${group.name} · About`}
        lines={group.story.title}
        body={group.story.paragraphs[0]}
        tagline={group.tagline}
        image={{ src: "/media/sterling-plaza/lobby.webp", alt: "The lobby at Sterling Plaza" }}
        primary={{ label: "Meet the team", href: "#team" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
      <StorySection />
      <VisionValues />
      <TeamGrid />
      <CtaBand />
    </>
  );
}
