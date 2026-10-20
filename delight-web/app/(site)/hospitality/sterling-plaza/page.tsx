import type { Metadata } from "next";
import { sterlingPlaza } from "@/lib/content/hospitality";
import { VenuePage } from "@/modules/brand/components/VenuePage";

export const metadata: Metadata = {
  title: `${sterlingPlaza.name} — ${sterlingPlaza.kind}`,
  description: sterlingPlaza.intro[0],
  openGraph: { images: [sterlingPlaza.hero.src] },
};

export default function Page() {
  return <VenuePage venue={sterlingPlaza} />;
}
