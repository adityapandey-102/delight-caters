import type { Metadata } from "next";
import { olive } from "@/lib/content/hospitality";
import { VenuePage } from "@/modules/brand/components/VenuePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { venueMetadata, venueSeo } from "@/lib/seo";

export const metadata: Metadata = venueMetadata(olive, {
  title: "Olive — hotel near Bengaluru Airport",
  description:
    "Olive is a hotel near Bengaluru Airport with calm, cosy rooms, a sunlit restaurant and an elegant banquet hall for celebrations, functions and gatherings.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={venueSeo(olive)} />
      <VenuePage venue={olive} />
    </>
  );
}
