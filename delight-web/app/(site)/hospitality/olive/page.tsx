import type { Metadata } from "next";
import { olive } from "@/lib/content/hospitality";
import { VenuePage } from "@/modules/brand/components/VenuePage";

export const metadata: Metadata = {
  title: `${olive.name} — ${olive.kind}`,
  description: olive.intro[0],
  openGraph: { images: [olive.hero.src] },
};

export default function Page() {
  return <VenuePage venue={olive} />;
}
