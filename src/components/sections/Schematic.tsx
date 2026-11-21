import type { Schematic as SchematicData, SchematicNode } from "@/content/schematics";

const W = 640;
const H = 420;
const BOX_W = 170;
const BOX_H = 68;
const colX = (c: number) => 20 + c * ((W - 40 - BOX_W) / 2);
const rowY = (r: number) => 24 + r * ((H - 48 - BOX_H) / 2);

interface Edge {
  d: string;
  /** Arrow tip and direction (unit vector) at the target end. */
  tip: [number, number];
  dir: [number, number];
}

function arrowHead([x, y]: [number, number], [dx, dy]: [number, number]): string {
  const len = 8;
  const half = 4;
  const bx = x - dx * len;
  const by = y - dy * len;
  return `M${x} ${y} L${bx - dy * half} ${by + dx * half} L${bx + dy * half} ${by - dx * half} Z`;
}

function edgePath(a: SchematicNode, b: SchematicNode): Edge {
  const ax = colX(a.col);
  const ay = rowY(a.row);
  const bx = colX(b.col);
  const by = rowY(b.row);
  if (a.col === b.col) {
    const x = ax + BOX_W / 2;
    const [y1, y2] = a.row < b.row ? [ay + BOX_H, by] : [ay, by + BOX_H];
    return { d: `M${x} ${y1} V${y2}`, tip: [x, y2], dir: [0, y2 > y1 ? 1 : -1] };
  }
  const x1 = a.col < b.col ? ax + BOX_W : ax;
  const x2 = a.col < b.col ? bx : bx + BOX_W;
  const y1 = ay + BOX_H / 2;
  const y2 = by + BOX_H / 2;
  const mid = (x1 + x2) / 2;
  return { d: `M${x1} ${y1} H${mid} V${y2} H${x2}`, tip: [x2, y2], dir: [x2 > x1 ? 1 : -1, 0] };
}

/** Architecture schematic as an SVG drawing. Paths carry data-draw for the scroll timeline. */
export function Schematic({ data, title }: { data: SchematicData; title: string }) {
  const byId = new Map(data.nodes.map((n) => [n.id, n]));
  const callNode = data.callout ? byId.get(data.callout.node) : undefined;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Architecture of ${title}`}
    >
      {data.edges.map(([from, to]) => {
        const a = byId.get(from);
        const b = byId.get(to);
        if (!a || !b) return null;
        const e = edgePath(a, b);
        return (
          <g key={`${from}-${to}`}>
            <path data-draw="edge" d={e.d} fill="none" className="stroke-line" strokeWidth="1.25" />
            <path data-arrow d={arrowHead(e.tip, e.dir)} className="fill-line" />
          </g>
        );
      })}

      {data.nodes.map((n) => {
        const x = colX(n.col);
        const y = rowY(n.row);
        return (
          <g key={n.id} data-node>
            <rect
              data-draw="box"
              x={x}
              y={y}
              width={BOX_W}
              height={BOX_H}
              fill="none"
              className={n.highlight ? "stroke-accent" : "stroke-line"}
              strokeWidth={n.highlight ? 1.75 : 1.25}
            />
            <text x={x + 14} y={y + 28} className="fill-ink font-sans text-[15px] font-semibold">
              {n.label}
            </text>
            {n.sub && (
              <text x={x + 14} y={y + 50} className="fill-ink-3 font-sans text-[12px]">
                {n.sub}
              </text>
            )}
          </g>
        );
      })}

      {data.callout &&
        callNode &&
        (() => {
          const cx = colX(callNode.col) + BOX_W / 2;
          const y = rowY(callNode.row);
          return (
            <g data-callout>
              <path
                data-draw="callout"
                d={`M${cx} ${y} V${y - 34} H${cx + 30}`}
                fill="none"
                className="stroke-accent"
                strokeWidth="1.25"
              />
              <text
                x={cx + 36}
                y={y - 28}
                className="fill-accent-text font-mono text-[18px] font-medium"
              >
                {data.callout.value}
              </text>
              <text x={cx + 36} y={y - 12} className="fill-ink-3 font-sans text-[11px]">
                {data.callout.label}
              </text>
            </g>
          );
        })()}
    </svg>
  );
}
