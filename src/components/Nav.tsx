"use client";

import { ArchMark } from "./ArchMark";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-40"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-5 transition-all duration-500 ${
          scrolled
            ? "mt-3 rounded-full border border-ink/5 bg-cream/80 px-6 py-3 shadow-[0_8px_40px_rgba(26,20,16,0.06)] backdrop-blur-xl"
            : ""
        }`}
        style={{ maxWidth: scrolled ? "56rem" : undefined }}
      >
        <a href="#top" className="flex items-center gap-2.5 text-ink">
          <ArchMark className="h-6 w-6 text-orange" color="currentColor" />
          <span className="text-[15px] font-semibold tracking-tight">
            $SOLE
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] text-ink-muted sm:flex">
          <a href="#product" className="transition-colors hover:text-ink">
            Product
          </a>
          <a href="#features" className="transition-colors hover:text-ink">
            Features
          </a>
          <a href="#manifesto" className="transition-colors hover:text-ink">
            Manifesto
          </a>
          <a href="#specs" className="transition-colors hover:text-ink">
            Specs
          </a>
        </nav>

        <a href="#buy" className="btn-primary !px-5 !py-2.5 text-[13px]">
          Buy $SOLE
        </a>
      </div>
    </motion.header>
  );
}
