import type { Metadata } from "next";
import Image from "next/image";
import { group } from "@/lib/content/group";
import { LoginPanel } from "@/modules/auth/components/LoginPanel";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Zyra Group — customers and team.",
  robots: { index: false, follow: false },
};

/**
 * DUMMY sign-in page (phase 2 preview): the photograph and the house mark on
 * one side, the Customer / Team form on the other. /login#customer (default)
 * and /login#team pick the form.
 */
export default function LoginPage() {
  return (
    <section className="bg-wall-lit lg:grid lg:min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div data-nav-dark className="relative hidden overflow-hidden bg-black lg:block">
        <Image src="/media/sterling-plaza/lobby.webp" alt="" fill preload sizes="50vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <Image src="/brand/zyra-mark.png" alt="" width={291} height={363} sizes="56px" className="h-14 w-auto" />
          <p className="mt-5 font-display text-[clamp(2rem,3vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{group.tagline}</p>
          <p className="mt-3 max-w-[30rem] text-[15.5px] leading-[1.6] text-white/75">
            One account for your stays, your tables and your celebrations across Delight Hospitality and Delight Eatry.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 pb-16 pt-[calc(var(--header-h)+var(--ribbon-h)+3rem)] sm:px-8 lg:px-16 lg:pb-[6vh] lg:pt-[calc(var(--header-h)+var(--ribbon-h)+4vh)]">
        <LoginPanel />
      </div>
    </section>
  );
}
