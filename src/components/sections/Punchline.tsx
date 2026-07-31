"use client";

import { Reveal } from "../Reveal";

export function Punchline() {
  return (
    <section className="relative overflow-hidden bg-indigo px-6 py-32 text-cream sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange/50 to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal y={20}>
          <p className="text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-none tracking-tight">
            Wait...
          </p>
        </Reveal>

        <Reveal delay={0.2} y={24}>
          <p className="mt-4 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-none tracking-tight text-orange">
            It&apos;s a token.
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-14 space-y-5">
          <p className="text-[clamp(1.1rem,2.2vw,1.4rem)] font-medium leading-relaxed text-cream/90">
            The unofficial community token providing
            <br className="hidden sm:block" /> Arch Support.
          </p>
          <div className="mx-auto mt-10 max-w-sm space-y-3 text-[1.05rem] leading-relaxed text-cream/55">
            <p>Support the builders.</p>
            <p>Support the validators.</p>
            <p>Support the ecosystem.</p>
            <p className="pt-2 font-medium text-cream/85">Support the Arch.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
