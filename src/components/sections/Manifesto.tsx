"use client";

import { Reveal, RevealStagger, RevealItem } from "../Reveal";

const lines = [
  "Nobody notices",
  "the foundation.",
  "",
  "Nobody celebrates",
  "the beams.",
  "",
  "Nobody applauds",
  "the concrete.",
  "",
  "Yet without support—",
  "",
  "nothing stands.",
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-cream px-6 py-32 sm:py-44"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-16">
          <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-orange">
            Manifesto
          </p>
        </Reveal>

        <RevealStagger stagger={0.08} className="space-y-1">
          {lines.map((line, i) =>
            line === "" ? (
              <div key={`gap-${i}`} className="h-5 sm:h-7" />
            ) : (
              <RevealItem key={`${line}-${i}`}>
                <p
                  className={`text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[1.15] tracking-tight ${
                    line === "nothing stands." || line === "Yet without support—"
                      ? "text-ink"
                      : "text-ink/85"
                  }`}
                >
                  {line}
                </p>
              </RevealItem>
            )
          )}
        </RevealStagger>

        <Reveal delay={0.2} className="mt-16 sm:mt-20">
          <p className="text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[1.15] tracking-tight text-orange">
            Every Arch
          </p>
          <p className="mt-1 text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[1.15] tracking-tight text-orange">
            needs a Sole.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
