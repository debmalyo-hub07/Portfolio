import "./globals.css";
import { Outfit, Syne } from "next/font/google";
import ParticlesBg from "@/components/ui/ParticlesBg";
import CursorGlow from "@/components/ui/CursorGlow";
import FloatingLogos from "@/components/ui/FloatingLogos";

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

export const metadata = {
  title: "Debmalyo Barman | Digital Architect & Futurist",
  description: "Futuristic Portfolio of a Full Stack Developer & AI Enthusiast specializing in high-performance web systems and immersive digital experiences.",
  keywords: ["Debmalyo Barman", "Full Stack Developer", "Next.js Developer", "Portfolio", "AI Enthusiast", "Web Architect"],
  authors: [{ name: "Debmalyo Barman" }],
  creator: "Debmalyo Barman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/debmalyo-hub07",
    title: "Debmalyo Barman | Portfolio",
    description: "Futuristic Portfolio of a Full Stack Developer & AI Enthusiast",
    siteName: "Debmalyo Barman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debmalyo Barman | Portfolio",
    description: "Futuristic Portfolio of a Full Stack Developer & AI Enthusiast",
    creator: "@debmalyo_hub07",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        
        <SmoothScroll>
          {/* Advanced Background Layers */}
          <div className="bg-mesh" />
          <div className="bg-grid" />
          
          {/* Interactive Elements */}
          <FloatingLogos />
          <ParticlesBg />
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