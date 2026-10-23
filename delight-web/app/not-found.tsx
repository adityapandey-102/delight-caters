import Link from "next/link";
import Image from "next/image";
import { group } from "@/lib/content/group";

/** Any unknown URL: the mark, a short apology and the way back. */
export default function NotFound() {
  return (
    <main className="relative flex bg-wall-cream min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Image src="/brand/zyra-mark.png" alt={group.name} width={291} height={363} sizes="90px" className="relative h-24 w-auto" />
      <p className="eyebrow relative mt-10 justify-center">Page not found</p>
      <h1 className="display relative mt-5 text-[clamp(2.4rem,7vw,4rem)]">
        This table <span className="display-italic">isn&rsquo;t set.</span>
      </h1>
      <p className="relative mt-5 max-w-md text-[15.5px] leading-[1.8] text-muted">
        The page you were looking for has moved or no longer exists.
      </p>
      <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-gold shine">
          Back to home
        </Link>
        <Link href="/contact" className="btn-ghost">
          Contact us
        </Link>
      </div>
    </main>
  );
}
