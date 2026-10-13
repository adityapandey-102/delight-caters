import Link from "next/link";
import Image from "next/image";
import { company, contact } from "@/lib/content/site";

/** Any unknown URL: the mark, a short apology and the way back. */
export default function NotFound() {
  return (
    <main className="green-velvet relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="grain" />
      <Image src="/brand/logo-gold.png" alt={company.name} width={1200} height={634} sizes="220px" className="relative h-28 w-auto" />
      <p className="eyebrow on-dark relative mt-10 justify-center">Page not found</p>
      <h1 className="display on-dark relative mt-5 text-[clamp(2.4rem,7vw,4rem)]">
        This table <span className="display-italic">isn&rsquo;t set.</span>
      </h1>
      <p className="relative mt-5 max-w-md text-[15.5px] leading-[1.8] text-cream-muted">
        The page you were looking for has moved or no longer exists.
      </p>
      <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-gold shine">
          Back to home
        </Link>
        <a href={contact.phoneHref} className="btn-ghost-dark">
          Call {contact.phoneDisplay}
        </a>
      </div>
    </main>
  );
}
