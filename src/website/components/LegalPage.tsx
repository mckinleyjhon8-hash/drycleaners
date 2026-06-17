import type { ReactNode } from "react";

export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] }
  | { node: ReactNode };

export default function LegalPage({
  title,
  updated,
  blocks,
}: {
  title: string;
  updated: string;
  blocks: Block[];
}) {
  return (
    <>
      <section className="bg-navy pb-14 pt-36 sm:pb-16 sm:pt-40">
        <div className="container-luxe">
          <p className="eyebrow mb-4 text-gold">Legal</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-cream/60">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-luxe">
          <div className="legal-prose mx-auto max-w-3xl text-charcoal/80">
            {blocks.map((b, i) => {
              if ("h" in b) return <h2 key={i}>{b.h}</h2>;
              if ("p" in b) return <p key={i}>{b.p}</p>;
              if ("ul" in b)
                return (
                  <ul key={i}>
                    {b.ul.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              return <div key={i}>{b.node}</div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
