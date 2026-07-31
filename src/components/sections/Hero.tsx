"use client";

import { motion } from "framer-motion";
import { AssetImage } from "../AssetImage";
import { FloatingInsole } from "../FloatingInsole";
import { SoleMark } from "../SoleBrand";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cream px-6 pb-20 pt-28"
    >
      {/* Corner geometric accents */}
      <div className="pointer-events-none absolute left-6 top-24 h-16 w-16 border-l border-t border-orange/25 sm:left-10 sm:top-28" />
      <div className="pointer-events-none absolute bottom-16 right-6 h-16 w-16 border-b border-r border-orange/25 sm:bottom-20 sm:right-10" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Official $SOLE · ARCH SUPPORT lockup */}
        <motion.div
          className="w-full max-w-2xl px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <AssetImage
            src="/images/brand/wordmark-lockup-full.png"
            alt="$SOLE Arch Support"
            width={1200}
            height={520}
            priority
            className="mx-auto h-auto w-full max-w-[min(92vw,640px)] object-contain"
          />
        </motion.div>

        <motion.p
          className="mt-6 max-w-md text-[clamp(1.15rem,2.4vw,1.5rem)] font-medium leading-snug tracking-tight text-ink"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Every Arch needs a Sole.
        </motion.p>

        <motion.p
          className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-muted"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          The community token providing Arch Support.
        </motion.p>

        {/* Product stage: cutout sole floating over Sole mark */}
        <motion.div
          className="relative my-8 flex w-full max-w-xl items-center justify-center sm:my-12"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <SoleMark
              className="h-[min(90vw,520px)] w-[min(90vw,520px)] opacity-[0.14]"
            />
          </div>
          <div className="relative z-10">
            <FloatingInsole size={360} priority rotateOnScroll float />
          </div>
        </motion.div>

        <motion.p
          className="mb-8 text-[15px] font-medium tracking-wide text-ink/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          Step into $SOLE
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#buy" className="btn-primary min-w-[160px]">
            Buy $SOLE
          </a>
          <a href="#manifesto" className="btn-ghost min-w-[160px]">
            Read the Manifesto
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink-muted/70">
          Scroll
        </span>
        <motion.div
          className="h-8 w-px bg-gradient-to-b from-orange/60 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
