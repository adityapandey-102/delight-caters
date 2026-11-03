import type { Metadata } from "next";
import { bombayKulfi, kulfiOutletNames } from "@/lib/content/eatry";
import { VenuePage } from "@/modules/brand/components/VenuePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { venueMetadata, venueSeo } from "@/lib/seo";

export const metadata: Metadata = venueMetadata(bombayKulfi, {
  title: "Bombay Kulfi — kulfi and ice cream outlets in Bengaluru",
  description: `Kulfi made with A2 milk, shakes, boba and street food at five Bombay Kulfi outlets in Bengaluru: ${kulfiOutletNames}.`,
});

export default function Page() {
  return (
    <>
      <JsonLd data={venueSeo(bombayKulfi)} />
      <VenuePage venue={bombayKulfi} />
    </>
  );
}
