// Pure geometry generator for the particle-morph protagonist.
// Produces six chapter target buffers (positions + colors) the morph hook
// lerps between. Deterministic (seeded RNG) so every build is identical.

import * as THREE from "three";

export interface ChapterTargets {
  positions: Float32Array[]; // length 6, each Float32Array(count * 3)
  colors: Float32Array[]; // length 6, each Float32Array(count * 3), rgb 0..1
}

// --- deterministic RNG (mulberry32) -------------------------------------
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Brand palette (matches globals.css tokens)
const CYAN = new THREE.Color("#00f0ff");
const FUCHSIA = new THREE.Color("#ff00ff");
const EMERALD = new THREE.Color("#00ff88");
const VIOLET = new THREE.Color("#a855f7");

const RADIUS = 1.6;

// Even point distribution on a sphere (fibonacci spiral).
function fibonacciSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // 1..-1
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
}

// Torus surface points.
function torus(count: number, R: number, r: number, rng: () => number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rng() * Math.PI * 2;
    const v = rng() * Math.PI * 2;
    out[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    out[i * 3 + 1] = r * Math.sin(v);
    out[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
  }
  return out;
}

// Ascending double-helix constellation.
function helix(count: number, rng: () => number): Float32Array {
  const out = new Float32Array(count * 3);
  const turns = 5;
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const strand = i % 2 === 0 ? 0 : Math.PI; // two strands
    const angle = t * Math.PI * 2 * turns + strand;
    const radius = 1.15 + (rng() - 0.5) * 0.25;
    out[i * 3] = Math.cos(angle) * radius;
    out[i * 3 + 1] = (t - 0.5) * 3.6; // y in [-1.8, 1.8]
    out[i * 3 + 2] = Math.sin(angle) * radius;
  }
  return out;
}

// Three offset spherical clusters (skill triad).
function threeClusters(count: number, rng: () => number): Float32Array {
  const out = new Float32Array(count * 3);
  const centers = [
    [-1.7, 0, 0],
    [0, 0, 0],
    [1.7, 0, 0],
  ];
  const per = Math.ceil(count / 3);
  for (let i = 0; i < count; i++) {
    const c = centers[Math.min(2, Math.floor(i / per))];
    // random point in a small sphere
    const u = rng();
    const v = rng();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const rad = 0.75 * Math.cbrt(rng());
    out[i * 3] = c[0] + rad * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = c[1] + rad * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = c[2] + rad * Math.cos(phi);
  }
  return out;
}

// Scattered shards in a box with a slight shell bias.
function scatter(count: number, rng: () => number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const shell = rng() > 0.5;
    if (shell) {
      // point on a jittered sphere shell
      const u = rng();
      const v = rng();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const rad = 1.9 + (rng() - 0.5) * 0.6;
      out[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      out[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      out[i * 3 + 2] = rad * Math.cos(phi);
    } else {
      out[i * 3] = (rng() - 0.5) * 4;
      out[i * 3 + 1] = (rng() - 0.5) * 4;
      out[i * 3 + 2] = (rng() - 0.5) * 4;
    }
  }
  return out;
}

// --- color helpers ------------------------------------------------------
function gradientColors(
  count: number,
  positions: Float32Array,
  a: THREE.Color,
  b: THREE.Color,
): Float32Array {
  const out = new Float32Array(count * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < count; i++) {
    // blend by normalized y
    const t = (positions[i * 3 + 1] / RADIUS + 1) / 2;
    tmp.copy(a).lerp(b, THREE.MathUtils.clamp(t, 0, 1));
    out[i * 3] = tmp.r;
    out[i * 3 + 1] = tmp.g;
    out[i * 3 + 2] = tmp.b;
  }
  return out;
}

function solidColor(count: number, color: THREE.Color): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    out[i * 3] = color.r;
    out[i * 3 + 1] = color.g;
    out[i * 3 + 2] = color.b;
  }
  return out;
}

function triadClusterColors(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const per = Math.ceil(count / 3);
  const cols = [CYAN, FUCHSIA, EMERALD];
  for (let i = 0; i < count; i++) {
    const c = cols[Math.min(2, Math.floor(i / per))];
    out[i * 3] = c.r;
    out[i * 3 + 1] = c.g;
    out[i * 3 + 2] = c.b;
  }
  return out;
}

/**
 * Build all six chapter targets for `count` particles.
 * Index → chapter: 0 home, 1 about, 2 education, 3 skills, 4 projects, 5 contact.
 */
export function buildTargets(count: number): ChapterTargets {
  const rng = mulberry32(0x5eed);

  const home = fibonacciSphere(count, RADIUS);
  const about = torus(count, 1.3, 0.45, rng);
  const education = helix(count, rng);
  const skills = threeClusters(count, rng);
  const projects = scatter(count, rng);
  const contact = fibonacciSphere(count, RADIUS); // reassembly = full circle

  const positions = [home, about, education, skills, projects, contact];

  const colors = [
    gradientColors(count, home, CYAN, FUCHSIA),
    gradientColors(count, about, FUCHSIA, VIOLET),
    solidColor(count, CYAN),
    triadClusterColors(count),
    gradientColors(count, projects, FUCHSIA, EMERALD),
    gradientColors(count, contact, CYAN, FUCHSIA),
  ];

  return { positions, colors };
}
