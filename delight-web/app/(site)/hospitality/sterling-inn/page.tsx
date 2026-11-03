import type { Metadata } from "next";
import { sterlingInn } from "@/lib/content/hospitality";
import { VenuePage } from "@/modules/brand/components/VenuePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { venueMetadata, venueSeo } from "@/lib/seo";

export const metadata: Metadata = venueMetadata(sterlingInn, {
  title: "Sterling Inn — 3-star hotel near Bengaluru Airport",
  description:
    "Sterling Inn is a 3-star hotel near Kempegowda International Airport, Bengaluru: large rooms, free Wi-Fi, a premium lounge, conference facilities and complimentary parking.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={venueSeo(sterlingInn)} />
      <VenuePage venue={sterlingInn} />
    </>
  );
}
