/**
 * $SOLE Dodgeball visual system
 * Arch brand adapted for pixel arcade (cream · orange · indigo).
 * Not a soft SaaS UI — hard edges, pixel type in-game.
 */

export const SOLE_DODGEBALL = {
  name: "SOLE Dodgeball",
  tagline: "No bridges. No wraps. Just support.",
  modes: [
    {
      id: "1v1",
      label: "1v1",
      players: 2,
      status: "live" as const,
      blurb: "Head-to-head. First to 3 hits wins.",
    },
    {
      id: "2v2",
      label: "2v2",
      players: 4,
      status: "soon" as const,
      blurb: "Squad support. Coming soon.",
    },
    {
      id: "3v3",
      label: "3v3",
      players: 6,
      status: "soon" as const,
      blurb: "Bracket energy. Coming soon.",
    },
    {
      id: "4v4",
      label: "4v4",
      players: 8,
      status: "soon" as const,
      blurb: "Full court chaos. Coming soon.",
    },
    {
      id: "ffa",
      label: "FFA",
      players: 12,
      status: "soon" as const,
      blurb: "Last man standing. 2–12 players. Coming soon.",
    },
  ],
  entry: {
    /** Mock entry for v0 — wallet later */
    costLabel: "INSERT SUPPORT",
    costSats: 500,
  },
  /** Live arcade cabinet (CoinUp) deep-link target path on this site */
  playPath: "/esports/dodgeball/",
  coinupCabinetId: "sole-dodgeball",
} as const;

/** Arch-adapted arcade palette */
export const arcadeColors = {
  cream: "#F3EFD7",
  creamDeep: "#E8E2C8",
  orange: "#EC641D",
  orangeHot: "#FF7A35",
  orangeDeep: "#C44F12",
  indigo: "#1A1630",
  indigoMid: "#241F3D",
  indigoSoft: "#2E2850",
  ink: "#1A1410",
  inkMuted: "#5C5348",
  white: "#FFFFFF",
  courtLine: "#F3EFD7",
  ball: "#EC641D",
  p1: "#EC641D",
  p2: "#F3EFD7",
  hit: "#FF7A35",
} as const;
