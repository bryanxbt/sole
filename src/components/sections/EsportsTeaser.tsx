"use client";

import { motion } from "framer-motion";
import { AssetImage } from "../AssetImage";
import { SoleMark } from "../SoleBrand";
import { withBase } from "@/lib/paths";

export function EsportsTeaser() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream px-6 pb-24 pt-28">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <SoleMark className="h-[min(120vw,800px)] w-[min(120vw,800px)] opacity-[0.06]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="mb-10 text-center sm:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-orange">
            E-Sports
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-normal leading-none tracking-tight text-orange">
            $SOLE Dodgeball
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            A teaser. Average Pepes. Maximum Arch Support.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-lg"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="overflow-hidden rounded-[1.25rem] bg-cream-deep/40 p-2 shadow-[0_24px_80px_rgba(26,20,16,0.12)] sm:p-3 sm:rounded-[1.5rem]">
            <AssetImage
              src="/images/sole-dodgeball-poster.jpg"
              alt="$SOLE Dodgeball — Arch Support. No bridges. No wraps. Just support."
              width={1023}
              height={1537}
              priority
              className="h-auto w-full rounded-[0.85rem] object-cover sm:rounded-[1.1rem]"
            />
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-sm space-y-3 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-orange">
            Coming soon
          </p>
          <p className="text-[clamp(1.15rem,2.5vw,1.4rem)] font-medium leading-snug tracking-tight text-ink">
            No bridges.
            <br />
            No wraps.
            <br />
            Just support.
          </p>
          <p className="pt-2 text-[14px] text-ink-muted">
            Official $SOLE e-sports — more brackets, more drama, more Arch.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href={withBase("/#buy")} className="btn-primary min-w-[160px]">
            Buy $SOLE
          </a>
          <a href={withBase("/")} className="btn-ghost min-w-[160px]">
            Back to product
          </a>
        </motion.div>
      </div>
    </section>
  );
}
