/** Working principles — each one backed by something on the CV. */
export const principles = [
  {
    title: "Typed contracts, end to end",
    body: "Client and server share Zod schemas, so a mismatch fails at compile time, not in production.",
  },
  {
    title: "Tested before trusted",
    body: "Vitest, Supertest and GitHub Actions run on every change, alongside a dependency audit.",
  },
  {
    title: "Built for real constraints",
    body: "An image classifier tuned to run on free-tier hosting without running out of memory.",
  },
] as const;
