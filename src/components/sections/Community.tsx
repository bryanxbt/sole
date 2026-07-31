"use client";

import { Reveal, RevealStagger, RevealItem } from "../Reveal";
import { ArchShape } from "../ArchMark";

const cards = [
  { label: "Builders", hue: "from-orange/25 to-cream-deep" },
  { label: "Validators", hue: "from-indigo-soft/30 to-cream-deep" },
  { label: "Creators", hue: "from-orange/15 to-indigo/10" },
  { label: "Traders", hue: "from-cream-deep to-orange/20" },
  { label: "Believers", hue: "from-indigo/15 to-orange/25" },
];

export function Community() {
  return (
    <section className="bg-cream-soft px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center sm:mb-20">
          <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-orange">
            Community
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-ink">
            Who it supports
          </h2>
        </Reveal>

        <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 sm:gap-5">
          {cards.map((card) => (
            <RevealItem key={card.label}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-cream-deep">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.hue}`}
                />
                <div className="absolute inset-0 flex items-center justify-center text-orange">
                  <ArchShape
                    className="h-[70%] w-[70%] transition-transform duration-700 group-hover:scale-105"
                    opacity={0.35}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/40 to-transparent p-5 pt-16">
                  <p className="text-[1.05rem] font-semibold tracking-tight text-white">
                    {card.label}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
