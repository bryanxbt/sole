"use client";

import { motion } from "framer-motion";
import { FloatingInsole } from "../FloatingInsole";
import { SoleMark } from "../SoleBrand";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cream px-6 pb-24 pt-24"
    >
      {/* Full-bleed Sole mark — primary background brand */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <SoleMark className="h-[min(140vw,920px)] w-[min(140vw,920px)] opacity-[0.09] sm:opacity-[0.11]" />
      </div>

      {/* Soft radial glow behind product */}
      <div
        className="pointer-events-none absolute left-1/2 top-[48%] h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/[0.06] blur-3xl"
        aria-hidden
      />

      {/* Corner accents */}
      <div className="pointer-events-none absolute left-6 top-24 h-12 w-12 border-l border-t border-orange/20 sm:left-10 sm:top-28" />
      <div className="pointer-events-none absolute bottom-16 right-6 h-12 w-12 border-b border-r border-orange/20 sm:bottom-20 sm:right-10" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Compact brand line — not the hero feature */}
        <motion.div
          className="mb-2 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-[clamp(1.75rem,4.5vw,2.35rem)] font-normal leading-none tracking-tight text-orange">
            $SOLE
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-orange/80 sm:text-[11px]">
            Arch Support
          </p>
        </motion.div>

        {/* Product stage — the feature */}
        <motion.div
          className="relative mt-4 flex w-full items-center justify-center sm:mt-6"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.15, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Secondary mark behind product for depth */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <SoleMark className="h-[min(78vw,440px)] w-[min(78vw,440px)] opacity-[0.16]" />
          </div>
          <div className="relative z-10 py-2">
            <FloatingInsole size={440} priority rotateOnScroll float />
          </div>
        </motion.div>

        <motion.div
          className="mt-6 max-w-md space-y-2 sm:mt-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[clamp(1.05rem,2.2vw,1.25rem)] font-medium leading-snug tracking-tight text-ink">
            Every Arch needs a Sole.
          </p>
          <p className="text-[14px] leading-relaxed text-ink-muted">
            The community token providing Arch Support.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#buy" className="btn-primary min-w-[150px] !py-3 text-[13px]">
            Buy $SOLE
          </a>
          <a href="#manifesto" className="btn-ghost min-w-[150px] !py-3 text-[13px]">
            Read the Manifesto
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink-muted/60">
          Scroll
        </span>
        <motion.div
          className="h-7 w-px bg-gradient-to-b from-orange/50 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
