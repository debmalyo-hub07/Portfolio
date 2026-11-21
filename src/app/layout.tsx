import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { fontVariables } from "@/lib/fonts";
import { navSections, resumeLink } from "@/lib/site-config";
import { themeInitScript } from "@/lib/theme";
import { SITE_URL } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";

const siteTitle = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: siteTitle, template: `%s | ${profile.name}` },
  description: profile.positioning,
  applicationName: `${profile.name} portfolio`,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Full-stack engineer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Machine learning",
    "Kolkata",
    "India",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} portfolio`,
    title: siteTitle,
    description: profile.positioning,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: profile.positioning },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e4" },
    { media: "(prefers-color-scheme: dark)", color: "#192431" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contact } = profile;
  return (
    <html lang="en" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top" className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header
          name={profile.name}
          sections={navSections}
          resume={resumeLink}
          contact={{ email: contact.email, linkedin: contact.linkedin, whatsapp: contact.whatsapp }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <SmoothScroll />
        {/* Vercel serves these scripts only on its own hosting; skip elsewhere to avoid 404s. */}
        {process.env.VERCEL && <Analytics />}
        {process.env.VERCEL && <SpeedInsights />}
        <CommandPalette
          config={{
            sections: navSections,
            projects: projects.map((p) => ({ slug: p.slug, title: p.title })),
            email: contact.email,
            phone: contact.phone,
            linkedin: contact.linkedin,
            whatsapp: contact.whatsapp,
            resume: resumeLink,
          }}
        />
      </body>
    </html>
  );
}
