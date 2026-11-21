import localFont from "next/font/local";

/** Display: Bricolage Grotesque (variable wght 200–800, wdth 75–100) — technical lettering feel. */
export const fontDisplay = localFont({
  src: "../assets/fonts/bricolage-grotesque-latin-wdth-normal.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

/** Text: IBM Plex Sans — engineering heritage, calm at body sizes. */
export const fontSans = localFont({
  src: [
    {
      path: "../assets/fonts/ibm-plex-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ibm-plex-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/ibm-plex-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-plex-sans",
  display: "swap",
});

/** Mono: IBM Plex Mono — only for real data (coordinates, file meta, code). */
export const fontMono = localFont({
  src: [
    {
      path: "../assets/fonts/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = [fontDisplay.variable, fontSans.variable, fontMono.variable].join(" ");
