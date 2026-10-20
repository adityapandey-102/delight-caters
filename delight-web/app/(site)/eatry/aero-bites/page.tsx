import type { Metadata } from "next";
import { aeroBites } from "@/lib/content/eatry";
import { VenuePage } from "@/modules/brand/components/VenuePage";

export const metadata: Metadata = {
  title: `${aeroBites.name} — ${aeroBites.kind}`,
  description: aeroBites.intro[0],
  openGraph: { images: [aeroBites.hero.src] },
};

export default function Page() {
  return <VenuePage venue={aeroBites} />;
}
