"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { scrollToSection } from "@/lib/site-actions";
import { cn } from "@/lib/utils";

interface Props {
  sheets: { id: string; label: string }[];
}

/**
 * Wide screens only: a vertical scale in the left margin. It fills as you read through the
 * drawing set and names the current sheet. Clicking a tick jumps to that sheet.
 */
export function ProgressRail({ sheets }: Props) {
  const fill = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    });
    // Active sheet = the one crossing the viewport centre line.
    const els = sheets
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      ctx.revert();
      io.disconnect();
    };
  }, [sheets]);

  return (
    <nav
      aria-label="Sheet progress"
      className={cn(
        "fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 transition-opacity duration-300 min-[1360px]:block",
      )}
    >
      <div className="relative flex flex-col gap-5 py-1 pl-5">
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-rule" />
        <span
          ref={fill}
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent"
        />
        {sheets.map((s, i) => (
          <a
            key={s.id}
            href={s.id === "home" ? "#top" : `#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(s.id === "home" ? "top" : s.id);
            }}
            aria-current={active === s.id ? "location" : undefined}
            className={cn(
              "group relative flex items-center gap-2 text-xs transition-colors",
              active === s.id ? "text-ink" : "text-ink-3 hover:text-ink",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 -left-5 h-px -translate-y-1/2 bg-current transition-all",
                active === s.id ? "w-3" : "w-1.5",
              )}
            />
            <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
            <span
              className={cn(
                "transition-opacity",
                active === s.id ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              )}
            >
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
