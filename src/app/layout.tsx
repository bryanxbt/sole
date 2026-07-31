import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "$SOLE — Arch Support",
  description:
    "Every Arch needs a Sole. The unofficial community token providing Arch Support on Arch Network.",
  openGraph: {
    title: "$SOLE — Arch Support",
    description:
      "Every Arch needs a Sole. The community token providing Arch Support.",
    images: ["/images/sole-hero.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$SOLE — Arch Support",
    description: "Every Arch needs a Sole.",
    images: ["/images/sole-hero.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
