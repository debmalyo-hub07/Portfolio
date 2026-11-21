/** Architecture schematics drawn on each project's detail sheet. Grid: 3 columns × 3 rows. */
export interface SchematicNode {
  id: string;
  label: string;
  sub?: string;
  col: 0 | 1 | 2;
  row: 0 | 1 | 2;
  highlight?: boolean;
}
export interface Schematic {
  nodes: SchematicNode[];
  edges: [string, string][];
  /** Dimension-style callout attached to a node. */
  callout?: { node: string; value: string; label: string };
}

export const schematics: Record<string, Schematic> = {
  kingside: {
    nodes: [
      { id: "import", label: "Game import", sub: "Lichess, Chess.com, PGN", col: 0, row: 0 },
      { id: "device", label: "Device storage", sub: "Games, insights, settings", col: 0, row: 2 },
      { id: "app", label: "Kingside app", sub: "Next.js, in the browser", col: 1, row: 1 },
      {
        id: "engine",
        label: "Stockfish 19",
        sub: "Runs in the browser",
        col: 2,
        row: 0,
        highlight: true,
      },
      { id: "api", label: "API service", sub: "Vercel, MongoDB Atlas", col: 2, row: 2 },
    ],
    edges: [
      ["import", "app"],
      ["app", "device"],
      ["app", "engine"],
      ["app", "api"],
    ],
  },
  fixmycity: {
    nodes: [
      { id: "citizen", label: "Citizen app", sub: "React, mobile-first", col: 0, row: 0 },
      { id: "admin", label: "Admin dashboard", sub: "Department routing", col: 0, row: 2 },
      { id: "api", label: "API", sub: "Express, JWT, rate limits", col: 1, row: 1 },
      { id: "db", label: "MongoDB", sub: "Reports, activity logs", col: 2, row: 0 },
      {
        id: "ml",
        label: "ML service",
        sub: "EfficientNetV2S, WASM",
        col: 2,
        row: 2,
        highlight: true,
      },
    ],
    edges: [
      ["citizen", "api"],
      ["admin", "api"],
      ["api", "db"],
      ["api", "ml"],
    ],
    callout: { node: "ml", value: "0.975", label: "F1 score" },
  },
  portfolio: {
    nodes: [
      { id: "content", label: "Typed content", sub: "Zod, checked at build", col: 0, row: 0 },
      { id: "cv", label: "CV drop-in", sub: "public/resume", col: 0, row: 2 },
      {
        id: "build",
        label: "Next.js build",
        sub: "Static, prerendered",
        col: 1,
        row: 1,
        highlight: true,
      },
      { id: "edge", label: "Vercel", sub: "Edge network", col: 2, row: 0 },
      { id: "browser", label: "Browser", sub: "three.js, GSAP, Lenis", col: 2, row: 2 },
    ],
    edges: [
      ["content", "build"],
      ["cv", "build"],
      ["build", "edge"],
      ["edge", "browser"],
    ],
  },
};
