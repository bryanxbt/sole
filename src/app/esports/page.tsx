import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/FinalCTA";
import { EsportsTeaser } from "@/components/sections/EsportsTeaser";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "$SOLE Dodgeball — E-Sports | Arch Support",
  description:
    "A teaser for $SOLE Dodgeball. No bridges. No wraps. Just support.",
  openGraph: {
    title: "$SOLE Dodgeball — E-Sports",
    description: "No bridges. No wraps. Just support.",
    images: [withBase("/images/sole-dodgeball-poster.jpg")],
  },
};

export default function EsportsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <EsportsTeaser />
      </main>
      <Footer />
    </>
  );
}
