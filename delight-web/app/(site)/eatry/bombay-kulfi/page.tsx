import type { Metadata } from "next";
import { bombayKulfi } from "@/lib/content/eatry";
import { VenuePage } from "@/modules/brand/components/VenuePage";

export const metadata: Metadata = {
  title: `${bombayKulfi.name} — ${bombayKulfi.kind}`,
  description: bombayKulfi.intro[0],
  openGraph: { images: [bombayKulfi.hero.src] },
};

export default function Page() {
  return <VenuePage venue={bombayKulfi} />;
}
