"use client";

import Link from "next/link";
import { useRef, ViewTransition } from "react";
import { Icon } from "@/components/ui/Icon";
import { Schematic } from "@/components/sections/Schematic";
import type { Schematic as SchematicData } from "@/content/schematics";
import type { Project } from "@/lib/schema";
import { gsap, useScrollScene } from "@/lib/gsap";

interface Props {
  projects: (Project & { schematic?: SchematicData })[];
}

const STICK_TOP = 96; // px below the header where a sheet settles
const PEEK = 20; // each later sheet settles a little lower, so earlier sheet edges peek out

/**
 * Detail drawings laid on the table one over another. Desktop: each sheet is sticky; as the
 * next one slides up over it, the one underneath recedes (scales back, dims). Scroll direction
 * and motion direction stay the same, so nothing feels hijacked. Mobile: a plain stack.
 */
export function Work({ projects }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(ref, (root, { desktop }) => {
    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
    cards.forEach((card, i) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 72%", toggleActions: "play none none reverse" },
      });
      tl.fromTo(
        card.querySelectorAll("[data-draw]"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.1, ease: "power2.inOut", stagger: 0.07 },
      );
      tl.fromTo(
        card.querySelectorAll("[data-arrow]"),
        { opacity: 0 },
        { opacity: 1, duration: 0.3, stagger: 0.07 },
        "<0.8",
      );
      tl.fromTo(
        card.querySelectorAll("svg text"),
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.03 },
        "<-0.4",
      );
      tl.fromTo(
        card.querySelectorAll("[data-info]"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 },
        "<",
      );

      const next = cards[i + 1];
      if (desktop && next) {
        gsap.to(card.querySelector("[data-sheet-face]"), {
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: `top ${STICK_TOP + (i + 1) * PEEK}px`,
            scrub: true,
          },
        });
      }
    });
  });

  return (
    <div ref={ref} className="flex flex-col gap-10 md:gap-[18vh]">
      {projects.map((p, i) => (
        <article
          key={p.slug}
          id={`project-${p.slug}`}
          data-card
          aria-labelledby={`project-${p.slug}-title`}
          className="scroll-mt-24 md:sticky"
          style={{ top: `${STICK_TOP + i * PEEK}px` }}
        >
          <div
            data-sheet-face
            className="flex origin-top flex-col border border-line/50 bg-paper shadow-[0_-1px_0_var(--rule),0_30px_60px_-40px_rgb(14_27_61/0.45)] md:min-h-[min(38rem,calc(100dvh-9rem))]"
          >
            <div className="grid flex-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div className="bg-grid flex items-center border-b border-line/30 p-5 md:border-r md:border-b-0 md:p-8">
                {p.schematic && (
                  <ViewTransition name={`project-drawing-${p.slug}`} share="morph" default="none">
                    <div className="w-full">
                      <Schematic data={p.schematic} title={p.title} />
                    </div>
                  </ViewTransition>
                )}
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <p data-info className="text-sm text-ink-3">
                  {p.context ?? p.tagline}
                </p>
                <h3
                  id={`project-${p.slug}-title`}
                  data-info
                  className="type-condensed mt-2 text-6xl leading-[0.9]"
                >
                  <ViewTransition name={`project-title-${p.slug}`} share="morph" default="none">
                    <span className="inline-block">{p.title}</span>
                  </ViewTransition>
                </h3>
                <p data-info className="mt-4 text-ink-2">
                  {p.summary}
                </p>
                {p.highlights.length > 0 && (
                  <dl data-info className="mt-6 grid grid-cols-3 gap-4 border-t border-rule pt-4">
                    {p.highlights.map((h) => (
                      <div key={h.label}>
                        <dt className="text-xs text-ink-3">{h.label}</dt>
                        <dd className="mt-1 font-mono text-lg">{h.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p data-info className="mt-6 text-sm text-ink-3">
                  {p.stack.join(", ")}
                </p>
                <div data-info className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <Link
                    href={`/work/${p.slug}`}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper"
                  >
                    Read the case study
                    <Icon
                      name="arrowUpRight"
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/30 px-5 text-sm font-medium transition-colors hover:border-ink"
                    >
                      Open live site
                      <span className="sr-only">(opens {p.title} in a new tab)</span>
                    </a>
                  ) : p.slug === "portfolio" ? (
                    <span className="text-sm text-ink-2">You&apos;re looking at it.</span>
                  ) : null}
                </div>
              </div>
            </div>
            <dl
              data-info
              className="grid grid-cols-2 border-t border-line/50 text-sm md:grid-cols-4"
            >
              {[
                [
                  "Drawing",
                  `${String(i + 1).padStart(2, "0")} of ${String(projects.length).padStart(2, "0")}`,
                ],
                ["Role", p.role],
                ["Team", p.team ? "Team project" : "Solo"],
                ["Year", String(p.year)],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="border-line/50 px-4 py-3 odd:border-r md:border-r md:last:border-r-0"
                >
                  <dt className="text-xs text-ink-3">{k}</dt>
                  <dd className="mt-0.5 truncate font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}
