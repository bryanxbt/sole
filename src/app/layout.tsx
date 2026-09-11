import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { withBase } from "@/lib/paths";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Closest widely available stand-in for brand “Gascogne” serif wordmarks */
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://bryanxbt.github.io/sole";
/** Origin only — withBase() already prefixes /sole. Using siteUrl here doubled the path. */
const siteOrigin = "https://bryanxbt.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "$SOLE — Arch Support",
  description:
    "Every Arch needs a Sole. The unofficial community token providing Arch Support on Arch Network.",
  openGraph: {
    title: "$SOLE — Arch Support",
    description:
      "Every Arch needs a Sole. The community token providing Arch Support.",
    url: siteUrl,
    images: [withBase("/images/brand/wordmark-lockup-full.png")],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$SOLE — Arch Support",
    description: "Every Arch needs a Sole.",
    images: [withBase("/images/brand/wordmark-lockup-full.png")],
  },
  icons: {
    icon: withBase("/images/sole-mark.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
