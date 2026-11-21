"use client";

import { useRef } from "react";
import type { Education } from "@/lib/schema";
import { gsap, useScrollScene } from "@/lib/gsap";

/**
 * Education measured on one dimension line. The axis and year ticks are drawn with scroll,
 * then each span is dimensioned (arrow to arrow) and its note appears.
 * Desktop: horizontal scale. Mobile: vertical list along a drawn line.
 */
export function Journey({ items }: { items: Education[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = Math.min(...items.map((e) => e.start ?? e.end));
  const last = Math.max(...items.map((e) => e.end));
  const years = Array.from({ length: last - first + 1 }, (_, i) => first + i);
  const pct = (y: number) => ((y - first) / (last - first)) * 100;
  const ordered = [...items].sort((a, b) => (a.start ?? a.end) - (b.start ?? b.end));

  useScrollScene(ref, (root, { desktop }) => {
    const tl = gsap.timeline({
      scrollTrigger: desktop
        ? { trigger: root, start: "top 70%", end: "bottom 60%", scrub: 0.6 }
        : { trigger: root, start: "top 80%", end: "bottom 70%", scrub: 0.6 },
    });
    if (desktop) {
      tl.fromTo("[data-axis]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 });
      tl.fromTo("[data-tick]", { scaleY: 0 }, { scaleY: 1, stagger: 0.08, duration: 0.2 }, 0.1);
      gsap.utils.toArray<HTMLElement>("[data-span]", root).forEach((s, i) => {
        tl.fromTo(
          s.querySelector("[data-dim]"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 0.5 },
          0.5 + i * 0.35,
        );
        tl.fromTo(
          s.querySelectorAll("[data-span-text]"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35 },
          ">-0.15",
        );
      });
    } else {
      tl.fromTo("[data-vaxis]", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 1 });
      tl.fromTo(
        "[data-vitem]",
        { opacity: 0, x: 12 },
        { opacity: 1, x: 0, stagger: 0.25, duration: 0.3 },
        0.1,
      );
    }
  });

  return (
    <div ref={ref}>
      {/* Desktop scale */}
      <div className="relative hidden md:block" aria-hidden="true">
        <div className="relative h-14">
          <div data-axis className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />
          {years.map((y) => (
            <div
              key={y}
              className="absolute bottom-0 -translate-x-1/2"
              style={{ left: `${pct(y)}%` }}
            >
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-ink-3">
                {y}
              </span>
              <div data-tick className="h-3 w-px origin-bottom bg-line" />
            </div>
          ))}
        </div>
        <div className="relative mt-6" style={{ height: `${ordered.length * 7.5}rem` }}>
          {ordered.map((e, i) => {
            const s = e.start ?? e.end;
            const left = pct(s);
            const width = Math.max(pct(e.end) - left, 0);
            const alignRight = left > 55;
            return (
              <div
                key={e.id}
                data-span
                className="absolute"
                style={{
                  top: `${i * 7.5}rem`,
                  left: `${left}%`,
                  width: width ? `${width}%` : "auto",
                }}
              >
                {width > 0 ? (
                  <div data-dim className="relative h-3 origin-left">
                    <span className="absolute top-0 left-0 h-3 w-px bg-accent" />
                    <span className="absolute top-1/2 right-0 left-0 h-px bg-accent" />
                    <span className="absolute top-0 right-0 h-3 w-px bg-accent" />
                  </div>
                ) : (
                  <div
                    data-dim
                    className="size-3 -translate-x-1/2 rotate-45 border border-accent"
                  />
                )}
                <div className={`mt-3 w-max max-w-md ${alignRight ? "ml-auto text-right" : ""}`}>
                  <p data-span-text className="font-sans text-lg font-semibold">
                    {e.qualification}
                    {e.field && <span className="font-normal text-ink-2">, {e.field}</span>}
                  </p>
                  <p data-span-text className="text-sm text-ink-2">
                    {e.institution}
                  </p>
                  <p data-span-text className="mt-1 text-sm text-ink-3">
                    {e.scores.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible list (also the mobile layout). */}
      <ol className="relative space-y-10 pl-8 md:sr-only">
        <span
          data-vaxis
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-1 w-px origin-top bg-line"
        />
        {[...ordered].reverse().map((e) => (
          <li key={e.id} data-vitem className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[1.9rem] size-2.5 rotate-45 border border-accent bg-paper"
            />
            <p className="font-mono text-sm text-ink-3">
              {e.start ? `${e.start}–${e.end}` : e.end}
            </p>
            <h3 className="mt-1 font-sans text-lg font-semibold tracking-normal">
              {e.qualification}
              {e.field && <span className="font-normal text-ink-2">, {e.field}</span>}
            </h3>
            <p className="text-ink-2">{e.institution}</p>
            <p className="text-sm text-ink-3">{e.board}</p>
            <p className="mt-1 text-sm text-ink-2">{e.scores.join(", ")}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
