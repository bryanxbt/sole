import type { Metadata } from "next";
import Link from "next/link";
import { DodgeballGame } from "@/game/dodgeball/DodgeballGame";

export const metadata: Metadata = {
  title: "SOLE Dodgeball — Play 1v1 | $SOLE E-Sports",
  description:
    "Live 1v1 Sole Dodgeball. Arch-branded pixel arcade. No bridges. No wraps. Just support.",
};

export default function DodgeballPlayPage() {
  return (
    <div className="db-page">
      <div className="db-page-nav">
        {/* Next.js Link already applies basePath — do not wrap withBase() */}
        <Link href="/esports/" className="db-nav-link">
          ← E-SPORTS
        </Link>
        <Link href="/" className="db-nav-link">
          $SOLE
        </Link>
      </div>
      <DodgeballGame source="sole" />
    </div>
  );
}
