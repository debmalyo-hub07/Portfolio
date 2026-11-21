"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useScrollScene } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  label: string;
  note: string;
  number: number;
  total: number;
  children?: ReactNode;
  /** Rendered outside the max-width container (e.g. horizontal tracks). */
  bleed?: ReactNode;
  className?: string;
}

/**
 * Every section is a sheet of the same drawing set: same header, same rule, same marks.
 * On scroll the sheet title lifts in and the header rule is drawn across.
 */
export function Sheet({ id, label, note, number, total, children, bleed, className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (root) => {
    const title = root.querySelector<HTMLElement>("[data-sheet-title]");
    const rule = root.querySelector<HTMLElement>("[data-sheet-rule]");
    const meta = root.querySelectorAll<HTMLElement>("[data-sheet-meta]");
    if (title) {
      const split = SplitText.create(title, { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 1,
        ease: "expo.out",
        stagger: 0.035,
        scrollTrigger: { trigger: root, start: "top 78%", toggleActions: "play none none reverse" },
      });
    }
    if (rule) {
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 85%", end: "top 30%", scrub: true },
        },
      );
    }
    gsap.from(meta, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: root, start: "top 78%", toggleActions: "play none none reverse" },
    });
  });

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      data-sheet={number}
      className={cn("relative scroll-mt-16 border-b border-rule outline-none", className)}
    >
      <div className="relative mx-auto max-w-6xl px-4 pt-20 sm:px-8 sm:pt-28">
        <Registration className="top-0 left-4 -translate-x-1/2 -translate-y-1/2 sm:left-8" />
        <Registration className="top-0 right-4 translate-x-1/2 -translate-y-1/2 sm:right-8" />
        <header>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-sm text-ink-3">
            <span data-sheet-meta className="font-mono">
              Sheet {number} of {total}
            </span>
            <span data-sheet-meta>{note}</span>
          </div>
          <h2
            id={`${id}-title`}
            data-sheet-title
            className="type-condensed mt-3 text-[clamp(4rem,12vw,9.5rem)] leading-[0.82] tracking-[-0.03em]"
          >
            {label}
          </h2>
          <div data-sheet-rule aria-hidden="true" className="mt-6 h-px origin-left bg-line" />
        </header>
        {children && <div className="pt-14 pb-24 sm:pb-32">{children}</div>}
      </div>
      {bleed}
    </section>
  );
}

function Registration({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`absolute size-5 text-line ${className}`}
    >
      <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
