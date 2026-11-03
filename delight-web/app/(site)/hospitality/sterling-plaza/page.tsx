import type { Metadata } from "next";
import { sterlingPlaza } from "@/lib/content/hospitality";
import { VenuePage } from "@/modules/brand/components/VenuePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { venueMetadata, venueSeo } from "@/lib/seo";

export const metadata: Metadata = venueMetadata(sterlingPlaza, {
  title: "Sterling Plaza — 4-star hotel near Bengaluru Airport",
  description:
    "Sterling Plaza is a 4-star hotel about twenty minutes from Bangalore Airport, with Deluxe rooms, suites with kitchenettes, and meeting rooms and event spaces for corporate stays.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={venueSeo(sterlingPlaza)} />
      <VenuePage venue={sterlingPlaza} />
    </>
  );
}
