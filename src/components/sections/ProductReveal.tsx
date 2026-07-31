"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealStagger, RevealItem } from "../Reveal";
import { FloatingInsole } from "../FloatingInsole";

export function ProductReveal() {
  return (
    <section
      id="product"
      className="relative overflow-hidden bg-cream-soft px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Introducing
          </p>
          <h2 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-tight text-ink">
            Arch Support<span className="text-orange">™</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto mt-16 flex justify-center sm:mt-20">
          <div className="relative">
            <FloatingInsole size={440} float rotateOnScroll />
          </div>
        </Reveal>

        <RevealStagger className="mx-auto mt-16 grid max-w-3xl gap-8 text-center sm:mt-20 sm:grid-cols-3 sm:gap-6">
          {[
            "Built for believers.",
            "Designed for builders.",
            "Engineered for Arch.",
          ].map((line) => (
            <RevealItem key={line}>
              <p className="text-[clamp(1.15rem,2vw,1.35rem)] font-medium leading-snug tracking-tight text-ink">
                {line}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-cream">
      {/* Adaptive Support */}
      <FeatureBlock
        eyebrow="Adaptive Support™"
        title={
          <>
            Supports every step
            <br />
            of your Bitcoin journey.
          </>
        }
        body={
          <>
            No bridges.
            <br />
            No wraps.
            <br />
            Just support.
          </>
        }
        image="/images/macro.jpg"
        imageAlt="Adaptive Support macro detail"
        reverse={false}
      />

      {/* Native Comfort */}
      <FeatureBlock
        eyebrow="Native Comfort™"
        title={
          <>
            Built directly
            <br />
            on Bitcoin.
          </>
        }
        body={
          <>
            Because comfort shouldn&apos;t
            <br />
            require wrapping.
          </>
        }
        image="/images/exploded.jpg"
        imageAlt="Native Comfort exploded layers — Heel, Foam, Arch"
        reverse
        captions={["Heel", "Foam", "Arch"]}
      />

      {/* Pump Technology */}
      <PumpFeature />

      {/* Builder Grade */}
      <BuilderGrade />
    </section>
  );
}

function FeatureBlock({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  reverse,
  captions,
}: {
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  captions?: string[];
}) {
  return (
    <div className="border-t border-ink/5 px-6 py-24 sm:py-32">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-orange">
              {eyebrow}
            </p>
            <h3 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-ink">
              {title}
            </h3>
            <p className="mt-6 text-[clamp(1.05rem,1.8vw,1.25rem)] leading-relaxed text-ink-muted">
              {body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-cream-deep/60 p-4 sm:p-8">
            <Image
              src={image}
              alt={imageAlt}
              width={900}
              height={900}
              className="w-full rounded-[1.25rem] object-cover"
            />
          </div>
          {captions && (
            <div className="mt-5 flex justify-center gap-8 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted">
              {captions.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}

function PumpFeature() {
  return (
    <div className="relative overflow-hidden border-t border-ink/5 bg-indigo px-6 py-28 text-cream sm:py-36">
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-orange">
            Pump Technology™
          </p>
          <h3 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
            Optimized for maximum
            <br />
            Arch Support.
          </h3>
          <p className="mt-6 max-w-md text-[1.1rem] leading-relaxed text-cream/60">
            The insole slides in. The chart begins pumping. Support scales with
            conviction.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative flex flex-col items-center">
          <FloatingInsole size={320} float />
          {/* Chart silhouette */}
          <div className="mt-6 w-full max-w-sm">
            <svg viewBox="0 0 320 80" className="w-full text-orange" fill="none">
              <path
                d="M0 70 C40 68, 50 55, 80 50 S120 48, 150 35 S200 20, 230 18 S280 8, 320 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M0 70 C40 68, 50 55, 80 50 S120 48, 150 35 S200 20, 230 18 S280 8, 320 4 L320 80 L0 80 Z"
                fill="url(#pumpGrad)"
                opacity="0.35"
              />
              <defs>
                <linearGradient id="pumpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function BuilderGrade() {
  const roles = [
    "Developers",
    "Validators",
    "Creators",
    "Collectors",
    "Degens",
  ];

  return (
    <div className="border-t border-ink/5 bg-cream-soft px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-orange">
            Builder Grade™
          </p>
          <h3 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-ink">
            For everyone building Arch.
          </h3>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-md">
          <div className="overflow-hidden rounded-[2rem] bg-cream-deep/50 p-6">
            <Image
              src="/images/macro.jpg"
              alt="Builder Grade macro photography"
              width={700}
              height={700}
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <RevealStagger className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {roles.map((role) => (
            <RevealItem key={role}>
              <span className="text-[clamp(1.1rem,2vw,1.35rem)] font-medium tracking-tight text-ink">
                {role}
                <span className="text-orange">.</span>
              </span>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.2} className="mt-10">
          <p className="text-ink-muted">Everyone building Arch.</p>
        </Reveal>
      </div>
    </div>
  );
}
