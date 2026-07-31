"use client";

import { Reveal } from "../Reveal";
import { SoleMark } from "../SoleBrand";

const specs = [
  { label: "Ticker", value: "SOLE" },
  { label: "Category", value: "Community Token" },
  { label: "Compatibility", value: "Arch Network" },
  { label: "Support Level", value: "Maximum" },
  { label: "Weight", value: "Weightless" },
  { label: "Utility", value: "Arch Support" },
];

export function Specs() {
  return (
    <section id="specs" className="bg-indigo px-6 py-28 text-cream sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-14 text-center sm:mb-20">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange shadow-[0_8px_24px_rgba(236,100,29,0.35)]">
            <SoleMark className="h-8 w-8" color="#F3EFD7" />
          </div>
          <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-orange">
            Product Specifications
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-tight">
            The details.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[1.75rem] border border-cream/10 bg-indigo-mid/50 px-6 sm:px-10">
            {specs.map((row) => (
              <div key={row.label} className="spec-row">
                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-cream/40">
                  {row.label}
                </p>
                <p className="text-[clamp(1.15rem,2.5vw,1.5rem)] font-semibold tracking-tight text-cream">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
