import type { Metadata } from "next";
import { company, services, welcome } from "@/lib/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { StoryIntro } from "@/modules/about/components/StoryIntro";
import { MissionVision } from "@/modules/about/components/MissionVision";
import Approach from "@/modules/home/components/Approach";
import CtaBand from "@/modules/home/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: welcome.paragraphs[0],
};

/** "Welcome to Delight Caterers" → ["Welcome to", "Delight Caterers"]. */
const lead = welcome.title.replace(company.name, "").trim();
const wedding = services.find((s) => s.key === "wedding")!;

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" lines={[lead, company.name]} body={welcome.paragraphs[0]} image={wedding.image} imageAlt={wedding.imageAlt} />
      <StoryIntro />
      <MissionVision />
      <Approach />
      <CtaBand />
    </>
  );
}
