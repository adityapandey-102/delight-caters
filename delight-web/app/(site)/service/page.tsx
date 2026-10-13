import type { Metadata } from "next";
import { services, servicesTitle, welcome } from "@/lib/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceList } from "@/modules/services/components/ServiceList";
import { EventExperience } from "@/modules/services/components/EventExperience";
import Cuisines from "@/modules/home/components/Cuisines";
import CtaBand from "@/modules/home/components/CtaBand";

export const metadata: Metadata = {
  title: "Service",
  description: `${servicesTitle}: ${services.map((s) => s.title).join(", ")} in Bengaluru. ${welcome.paragraphs[1]}`,
};

/** "Catering For Every Occasion" → ["Catering For", "Every Occasion"]. */
const words = servicesTitle.split(" ");
const lines = [words.slice(0, 2).join(" "), words.slice(2).join(" ")] as const;
const event = services.find((s) => s.key === "event")!;

/** Same order as the old Service page: occasions, cuisines, then the venues. */
export default function ServicePage() {
  return (
    <>
      <PageHero eyebrow="Our Services" lines={lines} body={welcome.paragraphs[1]} image={event.image} imageAlt={event.imageAlt} />
      <ServiceList />
      <Cuisines id="cuisines" />
      <EventExperience />
      <CtaBand />
    </>
  );
}
