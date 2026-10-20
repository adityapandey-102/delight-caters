import type { Metadata } from "next";
import { offers, offersFor } from "@/lib/content/offers";
import { hospitality } from "@/lib/content/hospitality";
import { eatry } from "@/lib/content/eatry";
import { contact, reels as catererReels } from "@/lib/content/site";
import { accounts, foodPosts, hotelPosts } from "@/lib/content/social";
import { OffersHero } from "@/modules/offers/components/OffersHero";
import { OffersBoard } from "@/modules/offers/components/OffersBoard";
import { PostsWall } from "@/modules/offers/components/PostsWall";
import { FollowStrip } from "@/modules/offers/components/FollowStrip";
import { ReelsSection } from "@/modules/brand/components/ReelsSection";
import { instagramAccount } from "@/modules/brand/components/SocialTiles";

export const metadata: Metadata = {
  title: "Offers & events",
  description: "Offers, events and collaborations across Zyra Group — Sterling Inn, Sterling Plaza, Olive, Bombay Kulfi, Aero Bites and Delight Caterers — with our latest reels and posts.",
};

const featured = offers.find((o) => o.featured) ?? offers[0];
const offersWhatsApp = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent("Hi Zyra, please send me your latest offers and events.")}`;

/**
 * Offers & events — the group's marketing in one place: this month's lead
 * offer, every offer by business, the reels, the social feed, and ways to
 * hear about the next one. Each section is one desktop screen.
 */
export default function OffersPage() {
  return (
    <>
      <OffersHero
        featured={featured}
        jumps={[
          { label: "All offers", href: "#all-offers" },
          { label: "Stays on film", href: "#reels-stays" },
          { label: "From our feed", href: "#posts" },
          { label: "Food on film", href: "#reels-food" },
          { label: "Follow us", href: "#follow" },
        ]}
      />

      <OffersBoard
        tabs={[
          { key: "hotels", label: "Hotels", items: offersFor({ division: "hospitality" }) },
          { key: "food", label: "Food & drink", items: offersFor({ division: "eatry" }) },
        ]}
      />

      <ReelsSection id="reels-stays" eyebrow="Delight Hospitality" title={["Stays", "on film."]} reels={hospitality.reels} instagram={instagramAccount(accounts[0].href)} />

      <PostsWall
        feeds={[
          { key: "food", label: "Food & drink", posts: foodPosts },
          { key: "hotels", label: "Hotels", posts: hotelPosts },
        ]}
      />

      <ReelsSection id="reels-food" eyebrow="Bombay Kulfi · Delight Caterers" title={["Food", "on film."]} reels={[eatry.reels[0], catererReels[1], eatry.reels[1], catererReels[0]]} />

      <div id="follow" className="scroll-mt-[60px]">
        <FollowStrip accounts={accounts} whatsapp={offersWhatsApp} />
      </div>
    </>
  );
}
