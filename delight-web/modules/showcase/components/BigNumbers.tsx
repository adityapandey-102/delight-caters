import { Counter, Reveal } from "@/components/ui/motion";

/** "By the numbers" — Apple-style oversized figures in gold, each over a short line. */
export function BigNumbers({ title, items }: { title: string; items: { value: string; label: string }[] }) {
  return (
    <section className="bg-wall-lit py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1080px] px-6">
        <h2 className="display max-w-[16ch] text-[clamp(2.2rem,5vw,3.5rem)]">{title}</h2>
        <Reveal as="dl" stagger className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {items.map((it) => {
            const n = Number(it.value);
            return (
              <div key={it.label}>
                <dd className="display-italic font-display text-[clamp(3.6rem,8vw,6rem)] font-semibold leading-none tracking-[-0.05em] lining-nums">
                  {Number.isInteger(n) ? <Counter value={n} /> : it.value}
                </dd>
                <dt className="mt-3 max-w-[18ch] text-[15px] leading-[1.4] text-body md:text-[17px]">{it.label}</dt>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
