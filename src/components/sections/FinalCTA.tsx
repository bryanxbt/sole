"use client";

import Image from "next/image";
import { Reveal } from "../Reveal";
import { FloatingInsole } from "../FloatingInsole";
import { SoleMark } from "../SoleBrand";

export function FinalCTA() {
  return (
    <section
      id="buy"
      className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden bg-cream px-6 py-32"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <SoleMark className="h-[min(80vw,560px)] w-[min(80vw,560px)] opacity-[0.08]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal>
          <FloatingInsole size={280} float />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.08] tracking-tight text-ink">
            Support the Arch.
          </h2>
          <p className="mt-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal tracking-tight text-orange">
            Step into $SOLE.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <a
            href="https://arch.network"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-light text-[1.05rem]"
          >
            Buy Now
          </a>
          <p className="mt-5 text-[13px] text-ink-muted">
            Link your preferred market when ready.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-cream-soft px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3 text-ink-muted">
          <SoleMark className="h-7 w-7" />
          <span className="text-[13px]">
            $SOLE · Unofficial community token for Arch Network
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-ink/10">
            <Image
              src="/images/arch-pepe.jpg"
              alt="Arch Pepe"
              fill
              className="object-cover object-[50%_20%]"
              sizes="36px"
            />
          </div>
          <p className="text-[12px] text-ink-muted/70">
            Not affiliated with Arch Network. Built with support.
          </p>
        </div>
      </div>
    </footer>
  );
}
