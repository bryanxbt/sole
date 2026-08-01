import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/FinalCTA";
import { EsportsHub } from "@/components/sections/EsportsHub";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "$SOLE Dodgeball — E-Sports | Arch Support",
  description:
    "SOLE Dodgeball: live 1v1 now. 2v2, 3v3, 4v4, and FFA coming. No bridges. No wraps. Just support.",
  openGraph: {
    title: "$SOLE Dodgeball — E-Sports",
    description: "Live 1v1 dodgeball. Arch-branded pixel arcade.",
    images: [withBase("/images/sole-dodgeball-poster.jpg")],
  },
};

export default function EsportsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <EsportsHub />
      </main>
      <Footer />
    </>
  );
}
