"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useScrollScene } from "@/lib/gsap";

/** Case-study choreography: title rises, schematic draws, sections ink in as they arrive. */
export function CaseStudyMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(ref, (root) => {
    // Title is the LCP element: leave it painted immediately, animate the supporting meta only.
    gsap.from("[data-case-meta]", { opacity: 0, duration: 0.8, delay: 0.4, stagger: 0.08 });
    const drawing = root.querySelector("[data-case-drawing]");
    if (drawing) {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(
        drawing.querySelectorAll("[data-draw]"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.2, ease: "power2.inOut", stagger: 0.08 },
      );
      tl.fromTo(
        drawing.querySelectorAll("[data-arrow]"),
        { opacity: 0 },
        { opacity: 1, duration: 0.3, stagger: 0.07 },
        "<0.9",
      );
      tl.fromTo(
        drawing.querySelectorAll("svg text"),
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.03 },
        "<-0.5",
      );
    }
    gsap.utils.toArray<HTMLElement>("[data-case-block]", root).forEach((b) => {
      gsap.from(b.querySelectorAll("[data-ink]"), {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: b, start: "top 80%", toggleActions: "play none none reverse" },
      });
      const rule = b.querySelector("[data-rule]");
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: b, start: "top 88%", end: "top 50%", scrub: true },
          },
        );
      }
    });
  });

  return <div ref={ref}>{children}</div>;
}
