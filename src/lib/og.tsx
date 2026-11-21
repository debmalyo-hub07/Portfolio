import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  paper: "#f5f0e4",
  glow: "#fffaea",
  ink: "#252c38",
  ink2: "#4b5361",
  ink3: "#666e7a",
  line: "#3e5e8d",
  accent: "#ba6818",
  grid: "rgba(62,94,141,0.09)",
};

const dir = join(process.cwd(), "src/assets/og");
export async function ogFonts() {
  const [display, sans, sansMed, mono] = await Promise.all([
    readFile(join(dir, "bricolage-grotesque-latin-700-normal.woff")),
    readFile(join(dir, "ibm-plex-sans-latin-400-normal.woff")),
    readFile(join(dir, "ibm-plex-sans-latin-500-normal.woff")),
    readFile(join(dir, "ibm-plex-mono-latin-400-normal.woff")),
  ]);
  return [
    { name: "Bricolage", data: display, weight: 700 as const, style: "normal" as const },
    { name: "Plex", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Plex", data: sansMed, weight: 500 as const, style: "normal" as const },
    { name: "PlexMono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/** Isometric layer stack, same motif as the hero (static SVG for the preview card). */
function Layers() {
  const W = 400;
  const cx = W / 2;
  const diamond = (cy: number, k: number) => {
    const w = 160 * k;
    const h = 80 * k;
    return `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`;
  };
  const ys = [95, 165, 235, 305];
  return (
    <svg width={W} height={400} viewBox={`0 0 ${W} 400`}>
      {ys.map((y) => (
        <polygon key={y} points={diamond(y, 1)} fill="none" stroke={C.line} strokeWidth={1.6} />
      ))}
      {ys.map((y) => (
        <polygon
          key={`i${y}`}
          points={diamond(y, 0.62)}
          fill="none"
          stroke={C.line}
          strokeWidth={1}
        />
      ))}
      <line x1={cx - 50} y1={95} x2={cx + 20} y2={235} stroke={C.line} strokeWidth={1} />
      <line x1={cx + 60} y1={165} x2={cx - 10} y2={305} stroke={C.line} strokeWidth={1} />
      <rect x={cx - 56} y={89} width={12} height={12} fill={C.accent} />
      <rect x={cx + 54} y={159} width={12} height={12} fill={C.accent} />
      <rect x={cx + 14} y={229} width={12} height={12} fill={C.accent} />
    </svg>
  );
}

interface CardProps {
  kicker: string;
  title: string;
  subtitle: string;
  cells: [string, string][];
}

/** Link-preview card styled as a drawing sheet: grid, title, title-block strip. */
export function OgCard({ kicker, title, subtitle, cells }: CardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: C.paper,
        backgroundImage: `radial-gradient(circle at 85% 0%, ${C.glow} 0%, rgba(245,240,228,0) 55%), linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        padding: 56,
        color: C.ink,
        fontFamily: "Plex",
      }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 24 }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: C.ink3 }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                border: `2px solid ${C.ink}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "PlexMono",
                fontSize: 14,
                color: C.ink,
                position: "relative",
              }}
            >
              DB
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 9,
                  height: 9,
                  backgroundColor: C.accent,
                }}
              />
            </div>
            {kicker}
          </div>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: title.length > 14 ? 104 : 128,
              lineHeight: 0.9,
              letterSpacing: -3,
              marginTop: 40,
            }}
          >
            {title}
          </div>
          <div
            style={{ fontSize: 32, lineHeight: 1.3, color: C.ink2, marginTop: 28, maxWidth: 620 }}
          >
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Layers />
        </div>
      </div>
      <div style={{ display: "flex", border: `1.5px solid ${C.line}`, marginTop: 8 }}>
        {cells.map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "12px 18px",
              borderLeft: i === 0 ? "none" : `1.5px solid ${C.line}`,
            }}
          >
            <div style={{ fontSize: 16, color: C.ink3 }}>{k}</div>
            <div style={{ fontSize: 22, fontWeight: 500, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
