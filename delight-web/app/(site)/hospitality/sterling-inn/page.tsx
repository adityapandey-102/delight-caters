import type { Metadata } from "next";
import { sterlingInn } from "@/lib/content/hospitality";
import { VenuePage } from "@/modules/brand/components/VenuePage";

export const metadata: Metadata = {
  title: `${sterlingInn.name} — ${sterlingInn.kind}`,
  description: sterlingInn.intro[0],
  openGraph: { images: [sterlingInn.hero.src] },
};

export default function Page() {
  return <VenuePage venue={sterlingInn} />;
}
