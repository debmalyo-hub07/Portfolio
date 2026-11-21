"use client";

import { useEffect, useRef } from "react";

interface Props {
  layers: readonly { name: string; detail: string }[];
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroCanvas({ layers }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = box.current;
    const hero = container?.closest("section");
    // Phones get the lightweight SVG drawing below; WebGL only on tablet/desktop widths.
    if (!container || !hero || !matchMedia("(min-width: 768px)").matches || !hasWebGL()) return;
    let handle: { dispose(): void } | undefined;
    let cancelled = false;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Load three.js and compile shaders after the page is idle, so the name (LCP) paints first.
    const boot = () =>
      import("./blueprint-scene").then(({ createBlueprintScene }) => {
        if (cancelled) return;
        handle = createBlueprintScene({
          container,
          labels: labelRefs.current,
          scrollTarget: hero,
          reducedMotion,
        });
      });
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(boot, { timeout: 1500 });
    return () => {
      cancelled = true;
      cic(id);
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={box} data-hero-canvas className="pointer-events-none absolute inset-0" aria-hidden="true">
      <StaticDrawing layers={layers} />
      {layers.map((l, i) => (
        <div
          key={l.name}
          ref={(el) => {
            if (el) labelRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 z-10 hidden opacity-0 will-change-transform md:block"
        >
          <div className="flex items-start gap-2 pl-2">
            <span className="mt-[0.55em] h-px w-6 bg-line" />
            <div className="leading-tight">
              <p className="text-sm font-medium text-ink">{l.name}</p>
              <p className="text-xs whitespace-nowrap text-ink-3">{l.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Phone version: the same layered drawing as plain SVG, drawn in with CSS (no three.js download). */
function StaticDrawing({ layers }: Props) {
  const cx = 150;
  const ys = [70, 125, 180, 235];
  const d = (cy: number, k: number) => {
    const w = 110 * k;
    const h = 55 * k;
    return `M${cx} ${cy - h} L${cx + w} ${cy} L${cx} ${cy + h} L${cx - w} ${cy} Z`;
  };
  return (
    <svg viewBox="0 0 390 300" className="absolute inset-0 m-auto h-full w-full max-w-md md:hidden">
      {ys.map((y, i) => (
        <g key={y} className="draw-in" style={{ "--d": `${i * 140}ms` } as React.CSSProperties}>
          <path d={d(y, 1)} pathLength={1} fill="none" className="stroke-line" strokeWidth="1.2" />
          <path
            d={d(y, 0.6)}
            pathLength={1}
            fill="none"
            className="stroke-line"
            strokeWidth="0.8"
          />
          <path
            d={`M${cx + 110} ${y} H${cx + 132}`}
            pathLength={1}
            className="stroke-line"
            strokeWidth="1"
          />
        </g>
      ))}
      <path
        d={`M${cx - 30} 70 L${cx + 20} 180`}
        pathLength={1}
        className="draw-in stroke-line"
        strokeWidth="0.8"
        style={{ "--d": "700ms" } as React.CSSProperties}
      />
      <path
        d={`M${cx + 40} 125 L${cx - 10} 235`}
        pathLength={1}
        className="draw-in stroke-line"
        strokeWidth="0.8"
        style={{ "--d": "800ms" } as React.CSSProperties}
      />
      {[
        [cx - 34, 66],
        [cx + 36, 121],
        [cx + 16, 176],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="8"
          height="8"
          className="fade-late fill-accent"
          style={{ "--d": "1100ms" } as React.CSSProperties}
        />
      ))}
      {layers.map((l, i) => (
        <g
          key={l.name}
          className="fade-late"
          style={{ "--d": `${900 + i * 100}ms` } as React.CSSProperties}
        >
          <text x={cx + 138} y={ys[i] + 2} className="fill-ink font-sans text-[12px] font-medium">
            {l.name}
          </text>
          <text x={cx + 138} y={ys[i] + 17} className="fill-ink-3 font-sans text-[9px]">
            {l.detail.split(",")[0]}
          </text>
        </g>
      ))}
    </svg>
  );
}
