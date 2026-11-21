"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useScrollScene } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Part {
  item: number;
  name: string;
  usedIn: string[];
}
interface Layer {
  id: string;
  label: string;
  note: string;
  parts: Part[];
}
interface ProjectRef {
  slug: string;
  title: string;
}

/** Deterministic scatter so the "noise" is the same on every visit. */
function scatter(i: number) {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return { x: (r(1) - 0.5) * 220, y: 60 + r(2) * 140, rotate: (r(3) - 0.5) * 24 };
}

function Marker({ index, className }: { index: number; className?: string }) {
  // One shape per project (not just colour): filled square, hollow square, diamond.
  if (index === 0)
    return <span aria-hidden="true" className={cn("inline-block size-2.5 bg-accent", className)} />;
  if (index === 1)
    return (
      <span
        aria-hidden="true"
        className={cn("inline-block size-2.5 border-[1.5px] border-line", className)}
      />
    );
  return (
    <span aria-hidden="true" className={cn("inline-block size-2 rotate-45 bg-line", className)} />
  );
}

/**
 * Parts tray. The stack is sorted into the hero's system layers. As each layer scrolls in,
 * its parts fly in from scattered positions and settle into the grid: noise becoming order,
 * the same story as the hero. A filter shows which parts each project actually used.
 */
export function Skills({
  layers,
  projects,
  total,
}: {
  layers: Layer[];
  projects: ProjectRef[];
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string | null>(null);

  useScrollScene(ref, (root, { desktop }) => {
    root.querySelectorAll<HTMLElement>("[data-layer]").forEach((layer) => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", layer);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: layer,
          start: "top 92%",
          end: desktop ? "top 40%" : "top 55%",
          scrub: 0.8,
        },
      });
      tl.fromTo(
        layer.querySelector("[data-layer-rule]"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 0.6 },
        0,
      );
      tiles.forEach((t, i) => {
        const s = scatter(Number(t.dataset.item ?? i));
        tl.fromTo(
          t,
          { x: desktop ? s.x : s.x * 0.4, y: s.y, rotate: s.rotate, opacity: 0 },
          { x: 0, y: 0, rotate: 0, opacity: 1, ease: "power3.out", duration: 1 },
          i * 0.06,
        );
      });
    });
  });

  const counts = new Map(
    projects.map((p) => [
      p.slug,
      layers.flatMap((l) => l.parts).filter((x) => x.usedIn.includes(p.slug)).length,
    ]),
  );
  const active = projects.find((p) => p.slug === filter);

  return (
    <div ref={ref} className="overflow-x-clip">
      {/* Filter + legend */}
      <div className="flex flex-col gap-4 border-y border-rule py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink-2">
          {active ? (
            <>
              <span className="font-medium text-ink">{counts.get(active.slug)}</span> of {total}{" "}
              parts used in{" "}
              <Link href={`/work/${active.slug}`} className="redline font-medium text-ink">
                {active.title}
              </Link>
              .
            </>
          ) : (
            <>
              {total} parts in {layers.length} layers. Show where they were used:
            </>
          )}
        </p>
        <div role="group" aria-label="Filter parts by project" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={filter === null}
            onClick={() => setFilter(null)}
            className={cn(
              "h-9 rounded-full border px-4 text-sm transition-colors",
              filter === null
                ? "border-ink bg-ink text-paper"
                : "border-rule text-ink-2 hover:border-ink hover:text-ink",
            )}
          >
            All parts
          </button>
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={filter === p.slug}
              onClick={() => setFilter(filter === p.slug ? null : p.slug)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                filter === p.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-rule text-ink-2 hover:border-ink hover:text-ink",
              )}
            >
              <Marker index={i} />
              {p.title}
              <span className="font-mono text-xs opacity-70">{counts.get(p.slug)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {layers.map((l) => (
          <section
            key={l.id}
            data-layer
            aria-labelledby={`layer-${l.id}`}
            className="grid gap-5 py-10 md:grid-cols-[13rem_1fr] md:gap-10"
          >
            <header>
              <div data-layer-rule aria-hidden="true" className="mb-4 h-px origin-left bg-line" />
              <h3 id={`layer-${l.id}`} className="type-condensed text-4xl leading-none">
                {l.label}
              </h3>
              <p className="mt-2 text-sm text-ink-3">{l.note}</p>
            </header>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {l.parts.map((p) => {
                const dim = filter !== null && !p.usedIn.includes(filter);
                const hit = filter !== null && p.usedIn.includes(filter);
                const used = projects.filter((x) => p.usedIn.includes(x.slug));
                return (
                  <li key={p.name} data-tile data-item={p.item}>
                    <div
                      className={cn(
                        "flex h-28 flex-col justify-between border p-3.5 transition-[opacity,border-color,background-color] duration-300 print:h-auto print:gap-2",
                        hit ? "border-accent bg-paper-2" : "border-line/35",
                        dim && "opacity-25",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[11px] text-ink-3">
                          {String(p.item).padStart(2, "0")}
                        </span>
                        {used.length > 0 && (
                          <span
                            className="flex gap-1"
                            title={`Used in ${used.map((u) => u.title).join(" and ")}`}
                          >
                            {projects.map((x, i) =>
                              p.usedIn.includes(x.slug) ? <Marker key={x.slug} index={i} /> : null,
                            )}
                          </span>
                        )}
                      </div>
                      <span className="leading-tight font-medium">
                        {p.name}
                        {used.length > 0 && (
                          <span className="sr-only">
                            , used in {used.map((u) => u.title).join(" and ")}
                          </span>
                        )}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
