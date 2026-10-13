import type { ReactNode } from "react";

export function Eyebrow({ children, className = "", onDark = false }: { children: ReactNode; className?: string; onDark?: boolean }) {
  return <span className={`eyebrow ${onDark ? "on-dark" : ""} ${className}`}>{children}</span>;
}

/**
 * The section header used throughout: a gold eyebrow, a two-line display
 * heading (green roman over gold italic), and an optional body column on the
 * right. `onDark` swaps to cream over gold for the green bands.
 */
export function SectionHead({
  eyebrow,
  line1,
  line2,
  body,
  className = "",
  size = "lg",
  onDark = false,
  align = "split",
  as: Tag = "h2",
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  body?: ReactNode;
  className?: string;
  size?: "lg" | "md";
  onDark?: boolean;
  /** "split": heading left, body right (desktop). "center": stacked and centred. */
  align?: "split" | "center";
  as?: "h1" | "h2";
}) {
  const scale = size === "lg" ? "text-[clamp(2.4rem,5.6vw,4.4rem)]" : "text-[clamp(2rem,4.4vw,3.4rem)]";
  const bodyTone = onDark ? "text-cream-muted" : "text-body";

  if (align === "center") {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className}`}>
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        <Tag className={`display mt-6 ${onDark ? "on-dark" : ""} ${scale}`}>
          <span className="block">{line1}</span>
          {line2 && <span className="display-italic block">{line2}</span>}
        </Tag>
        {body && <div className={`mx-auto mt-7 max-w-2xl text-[15.5px] leading-[1.8] ${bodyTone}`}>{body}</div>}
      </div>
    );
  }

  return (
    <div className={`grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 ${className}`}>
      <div>
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        <Tag className={`display mt-6 ${onDark ? "on-dark" : ""} ${scale}`}>
          <span className="block">{line1}</span>
          {line2 && <span className="display-italic block">{line2}</span>}
        </Tag>
      </div>
      {body && (
        <div className="flex items-start lg:pt-16">
          <div className={`max-w-xl text-[15.5px] leading-[1.8] ${bodyTone}`}>{body}</div>
        </div>
      )}
    </div>
  );
}

/** Standard section padding and the 1280px content column. */
export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative px-5 py-24 sm:px-8 md:py-32 lg:px-12 ${className}`}>
      <div className="relative mx-auto w-full max-w-[1280px]">{children}</div>
    </section>
  );
}
