import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Sheet not found", robots: { index: false } };

/** 404 as a drawing: the sheet frame is there, the drawing isn't. */
export default function NotFound() {
  return (
    <section className="bg-grid border-b border-rule">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-12 px-4 py-20 sm:px-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-sm text-ink-3">Error 404</p>
          <h1 className="type-condensed mt-3 text-[clamp(4rem,12vw,9rem)] leading-[0.85] tracking-[-0.03em]">
            Sheet not found
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-2">
            This page isn&apos;t part of the drawing set. The link may be old, or the address may
            have a typo.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper"
            >
              Back to the cover
            </Link>
            <Link
              href="/#work"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/30 px-6 text-sm font-medium transition-colors hover:border-ink"
            >
              See the work <Icon name="arrowUpRight" className="size-4" />
            </Link>
          </div>
        </div>

        {/* Empty layer stack: outlines only, with a dashed gap where the missing sheet should be. */}
        <svg
          viewBox="0 0 400 360"
          className="w-full max-w-md justify-self-center"
          aria-hidden="true"
        >
          {[90, 160, 230].map((y, i) => (
            <g key={y} className="draw-in" style={{ "--d": `${i * 160}ms` } as React.CSSProperties}>
              <path
                d={`M200 ${y - 70} L340 ${y} L200 ${y + 70} L60 ${y} Z`}
                pathLength={1}
                fill="none"
                className="stroke-line"
                strokeWidth="1.3"
                style={i === 1 ? { strokeDasharray: "0.02 0.015", animation: "none" } : undefined}
              />
            </g>
          ))}
          <rect
            x="194"
            y="154"
            width="12"
            height="12"
            className="fade-late fill-accent"
            style={{ "--d": "900ms" } as React.CSSProperties}
          />
          <text
            x="352"
            y="164"
            className="fade-late fill-ink-3 font-mono text-[12px]"
            style={{ "--d": "1000ms" } as React.CSSProperties}
          >
            missing
          </text>
        </svg>
      </div>
    </section>
  );
}
