import type { Metadata } from "next";
import { aeroBites } from "@/lib/content/eatry";
import { VenuePage } from "@/modules/brand/components/VenuePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { venueMetadata, venueSeo } from "@/lib/seo";

export const metadata: Metadata = venueMetadata(aeroBites, {
  title: "Aero Bites — restaurant on Bengaluru Airport Road",
  description:
    "Aero Bites is an all-day restaurant on Bengaluru's airport road serving North Indian classics, coastal favourites and modern plates, for travellers, families and teams.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={venueSeo(aeroBites)} />
      <VenuePage venue={aeroBites} />
    </>
  );
}
