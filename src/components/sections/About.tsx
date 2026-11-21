"use client";

import { Fragment, useRef } from "react";
import { gsap, SplitText, useScrollScene } from "@/lib/gsap";

interface Props {
  statement: string[];
  principles: readonly { title: string; body: string }[];
}

/** "[phrase]" → marker-highlighted span. */
function renderMarked(text: string) {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith("[") ? (
      <span key={i} data-mark className="marker">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/**
 * Brief: each paragraph is paired with the principle it proves. As a row arrives, its lines
 * rise out of a mask, the key phrase is marked, and a leader line draws out to the note.
 * No pinning: the page keeps moving at the reader's pace.
 */
export function About({ statement, principles }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(ref, (root) => {
    root.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
      const para = row.querySelector<HTMLElement>("[data-para]");
      if (!para) return;
      const split = SplitText.create(para, {
        type: "lines",
        mask: "lines",
        linesClass: "about-line",
        aria: "none", // lines keep whole words; no aria-label on <p> (prohibited)
      });
      const marks = row.querySelectorAll<HTMLElement>("[data-mark]");
      // Scrubbed: plays forward on the way down, rewinds on the way up (same as Skills / sheet rules).
      const tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: "top 88%", end: "top 38%", scrub: 0.6 },
      });
      tl.from(split.lines, { yPercent: 105, duration: 1.1, ease: "expo.out", stagger: 0.09 });
      tl.fromTo(
        marks,
        { "--mark": "0%" },
        { "--mark": "100%", duration: 0.7, ease: "power2.inOut" },
        "-=0.55",
      );
      tl.fromTo(
        row.querySelector("[data-leader]"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" },
        "<",
      );
      tl.from(
        row.querySelectorAll("[data-note-text]"),
        { opacity: 0, x: -14, duration: 0.7, ease: "expo.out", stagger: 0.08 },
        "-=0.25",
      );
    });
  });

  return (
    <div ref={ref} className="space-y-16 md:space-y-24">
      {statement.map((p, i) => {
        const principle = principles[i];
        return (
          <div
            key={p}
            data-row
            className="grid gap-6 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:items-start md:gap-10"
          >
            <p
              data-para
              className="font-display text-[clamp(1.6rem,2.7vw,2.6rem)] leading-[1.16] font-[420] tracking-[-0.012em] text-ink"
            >
              {renderMarked(p)}
            </p>
            {principle && (
              <aside
                aria-label="Principle"
                className="grid grid-cols-[3.5rem_1fr] items-start gap-3 md:pt-3"
              >
                <svg
                  viewBox="0 0 56 24"
                  className="mt-1 h-6 w-14 overflow-visible text-accent"
                  aria-hidden="true"
                >
                  <path
                    data-leader
                    d="M0 22 L18 2 H56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="0" cy="22" r="2.5" fill="currentColor" />
                </svg>
                <div>
                  <h3 data-note-text className="font-sans text-base font-semibold tracking-normal">
                    {principle.title}
                  </h3>
                  <p data-note-text className="mt-1 text-sm leading-relaxed text-ink-2">
                    {principle.body}
                  </p>
                </div>
              </aside>
            )}
          </div>
        );
      })}
    </div>
  );
}
