import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import CursorGlow from "@/components/ui/CursorGlow";
import { SITE_URL } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Debmalyo Barman | Digital Architect & Futurist",
  description: "Futuristic Portfolio of a Full Stack Developer & AI Enthusiast specializing in high-performance web systems and immersive digital experiences.",
  keywords: ["Debmalyo Barman", "Full Stack Developer", "Next.js Developer", "Portfolio", "AI Enthusiast", "Web Architect"],
  authors: [{ name: "Debmalyo Barman" }],
  creator: "Debmalyo Barman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Debmalyo Barman | Portfolio",
    description: "Futuristic Portfolio of a Full Stack Developer & AI Enthusiast",
    siteName: "Debmalyo Barman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debmalyo Barman | Portfolio",
    description: "Futuristic Portfolio of a Full Stack Developer & AI Enthusiast",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

import SmoothScroll from "@/components/ui/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <body suppressHydrationWarning className="relative selection:bg-cyan-500/30 selection:text-cyan-200">

        {/* Keyboard users skip the fixed nav straight to content */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-500 focus:text-black focus:font-bold"
        >
          Skip to content
        </a>

        <SmoothScroll>
          {/* Advanced Background Layers */}
          <div className="bg-mesh" />
          <div className="bg-aurora" />
          <div className="bg-grid" />
          <div className="bg-noise" />

          {/* Interactive Elements */}
          <CursorGlow />

          {/* Main Content */}
          <div className="relative z-10 min-h-screen">
            {children}
          </div>
        </SmoothScroll>
        
      </body>
    </html>
  );
}