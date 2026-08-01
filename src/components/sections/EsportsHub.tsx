"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AssetImage } from "../AssetImage";
import { SoleMark } from "../SoleBrand";
import { SOLE_DODGEBALL } from "@/lib/esports/brand";
import { withBase } from "@/lib/paths";

/** $SOLE E-Sports portal — Sole Dodgeball hub + mode roadmap */
export function EsportsHub() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream px-6 pb-24 pt-28">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <SoleMark className="h-[min(120vw,800px)] w-[min(120vw,800px)] opacity-[0.06]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="mb-10 text-center sm:mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-orange">
            E-Sports · CoinUp Arcade Cabinet
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-normal leading-none tracking-tight text-orange">
            {SOLE_DODGEBALL.name}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted">
            {SOLE_DODGEBALL.tagline} Live rounds for 2–12 players — starting with{" "}
            <strong className="text-ink">1v1</strong>. Same insert-to-play energy as
            the arcade floor.
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="overflow-hidden rounded-[1.25rem] bg-cream-deep/40 p-2 shadow-[0_24px_80px_rgba(26,20,16,0.12)] sm:p-3">
              <AssetImage
                src="/images/sole-dodgeball-poster.jpg"
                alt="$SOLE Dodgeball — Arch Support"
                width={1023}
                height={1537}
                priority
                className="h-auto w-full rounded-[0.85rem] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-orange">
                Modes
              </p>
              <ul className="mt-4 space-y-3">
                {SOLE_DODGEBALL.modes.map((mode) => (
                  <li
                    key={mode.id}
                    className="flex items-start justify-between gap-4 border-b border-ink/10 pb-3"
                  >
                    <div>
                      <p className="font-medium text-ink">
                        {mode.label}
                        {mode.status === "live" && (
                          <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-orange">
                            Live
                          </span>
                        )}
                        {mode.status === "soon" && (
                          <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                            Soon
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-[13px] text-ink-muted">{mode.blurb}</p>
                    </div>
                    <span className="shrink-0 text-[12px] text-ink-muted">
                      {mode.players}p
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href={withBase(SOLE_DODGEBALL.playPath)}
                className="btn-primary flex min-h-[48px] w-full items-center justify-center"
              >
                Play 1v1 · {SOLE_DODGEBALL.entry.costLabel}
              </Link>
              <a
                href="https://bryanxbt.github.io/coinup/"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost flex min-h-[48px] w-full items-center justify-center"
              >
                Open CoinUp Arcade
              </a>
              <p className="text-center text-[12px] text-ink-muted">
                Also playable from the{" "}
                <span className="font-medium text-ink">SOLE Dodgeball</span> cabinet
                on the CoinUp floor.
              </p>
            </div>

            <div className="rounded-2xl bg-indigo px-5 py-5 text-cream">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-orange">
                How it plays
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-4 text-[14px] leading-relaxed text-cream/85">
                <li>Enter from this portal or the arcade cabinet</li>
                <li>Insert support / find an opponent (or practice vs Arch-Bot)</li>
                <li>Stay on your half · throw · dodge · first to 3 hits</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
