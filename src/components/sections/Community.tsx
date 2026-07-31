"use client";

import { AssetImage } from "../AssetImage";
import { Reveal, RevealStagger, RevealItem } from "../Reveal";
import { SoleMark } from "../SoleBrand";

const cards = [
  {
    label: "Builders",
    blurb: "Shipping on Arch",
    image: "/images/pepe-builders.jpg",
    crop: "object-[50%_20%]",
  },
  {
    label: "Validators",
    blurb: "Securing the network",
    image: "/images/pepe-validators.jpg",
    crop: "object-[50%_18%]",
  },
  {
    label: "Creators",
    blurb: "Making culture",
    image: "/images/pepe-creators.jpg",
    crop: "object-[50%_18%]",
  },
  {
    label: "Traders",
    blurb: "Providing support",
    image: "/images/pepe-traders.jpg",
    crop: "object-[50%_15%]",
  },
  {
    label: "Believers",
    blurb: "Holding the foundation",
    image: "/images/pepe-believers.jpg",
    crop: "object-[50%_18%]",
  },
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
          <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-muted">
            Arch Pepe in every role — one character, full Arch Support.
          </p>
        </Reveal>

        <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 sm:gap-5">
          {cards.map((card) => (
            <RevealItem key={card.label}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-cream-deep">
                <div className="absolute inset-0">
                  <AssetImage
                    src={card.image}
                    alt={`Arch Pepe — ${card.label}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${card.crop}`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
                <div className="absolute left-3 top-3 opacity-90">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 backdrop-blur-sm">
                    <SoleMark className="h-4 w-4" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[1.05rem] font-semibold tracking-tight text-white">
                    {card.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-white/65">{card.blurb}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
