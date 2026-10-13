import Hero from "@/modules/home/components/Hero";
import Marquee from "@/modules/home/components/Marquee";
import ImpactDiagram from "@/modules/home/components/ImpactDiagram";
import Welcome from "@/modules/home/components/Welcome";
import Cuisines from "@/modules/home/components/Cuisines";
import Nutrition from "@/modules/home/components/Nutrition";
import Approach from "@/modules/home/components/Approach";
import WatchAndSavour from "@/modules/home/components/WatchAndSavour";
import GoogleReviews from "@/modules/home/components/GoogleReviews";
import Faq from "@/modules/home/components/Faq";
import CtaBand from "@/modules/home/components/CtaBand";
import { marqueeWords } from "@/lib/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee words={marqueeWords} />
      <ImpactDiagram />
      <Welcome />
      <Cuisines id="cuisines" />
      <Nutrition />
      <Approach />
      <WatchAndSavour />
      <GoogleReviews />
      <Faq />
      <CtaBand />
    </>
  );
}
