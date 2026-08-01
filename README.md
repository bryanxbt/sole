# $SOLE — Arch Support

Every Arch needs a Sole.

Premium landing page for **$SOLE**, the unofficial community token providing Arch Support on [Arch Network](https://arch.network). Designed to feel like Apple launched orthopedic insoles — until the punchline lands mid-scroll.

## Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Framer Motion** (scroll reveals, floating product)
- **GSAP** (available for deeper scroll choreography)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Brand

| Token | Value |
|-------|--------|
| Cream | `#f5ede0` |
| Orange | `#e85a1c` |
| Indigo | `#1a1630` |

Product art lives in `public/images/`.

## E-Sports — SOLE Dodgeball

- Hub: [`/esports/`](./src/app/esports/page.tsx)
- Play 1v1: [`/esports/dodgeball/`](./src/app/esports/dodgeball/page.tsx)
- Modes roadmap: 1v1 (live), 2v2 / 3v3 / 4v4 / FFA (soon)
- Also linked from the **CoinUp** arcade cabinet `sole-dodgeball`

## Notes

- Buy CTA currently links to Arch Network — swap for your market / DEX URL when ready.
- Not affiliated with Arch Network. Community project.
