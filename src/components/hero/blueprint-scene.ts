/**
 * Hero WebGL scene: "Every system starts as noise. I draw the lines."
 * Scattered strokes (noise) assemble into an isometric, layered architecture drawing.
 * Scroll explodes the layers apart (exploded-view drawing). Pointer orbits gently.
 * Lazy-loaded (dynamic import) so three.js stays out of the initial bundle.
 */
import {
  BufferGeometry,
  Color,
  ColorManagement,
  Float32BufferAttribute,
  Group,
  LineSegments,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

// Raw ShaderMaterials output colours as-is, so keep CSS hex values unconverted (no sRGB→linear).
ColorManagement.enabled = false;

export interface SceneOptions {
  container: HTMLElement;
  /** One element per layer (top → bottom); positioned + faded by the scene. */
  labels: HTMLElement[];
  /** Element whose scroll position drives the exploded view. */
  scrollTarget: HTMLElement;
  reducedMotion: boolean;
}

export interface SceneHandle {
  dispose(): void;
}

const LAYERS = 4;
const SIZE = 2.2;
const ASSEMBLE_SECONDS = 2.6;
const PROGRESS_END = 1.75;

/** Deterministic PRNG so the drawing is identical on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Rect {
  x0: number;
  z0: number;
  x1: number;
  z1: number;
}

/** Recursively split the layer into module rectangles (like a floor plan of components). */
function splitRects(rand: () => number, r: Rect, depth: number, out: Rect[]) {
  const w = r.x1 - r.x0;
  const d = r.z1 - r.z0;
  if (depth === 0 || (w < 0.7 && d < 0.7) || (depth < 2 && rand() < 0.3)) {
    out.push(r);
    return;
  }
  const vertical = w > d ? true : w < d ? false : rand() > 0.5;
  const t = 0.35 + rand() * 0.3;
  if (vertical) {
    const x = r.x0 + w * t;
    splitRects(rand, { ...r, x1: x }, depth - 1, out);
    splitRects(rand, { ...r, x0: x }, depth - 1, out);
  } else {
    const z = r.z0 + d * t;
    splitRects(rand, { ...r, z1: z }, depth - 1, out);
    splitRects(rand, { ...r, z0: z }, depth - 1, out);
  }
}

interface Buffers {
  pos: number[];
  start: number[];
  delay: number[];
  layer: number[];
}

const newBuffers = (): Buffers => ({ pos: [], start: [], delay: [], layer: [] });

function randomInSphere(rand: () => number, radius: number): [number, number, number] {
  const u = rand() * 2 - 1;
  const phi = rand() * Math.PI * 2;
  const r = radius * Math.cbrt(rand());
  const s = Math.sqrt(1 - u * u);
  return [r * s * Math.cos(phi), r * u * 0.8, r * s * Math.sin(phi)];
}

function pushVertex(
  b: Buffers,
  rand: () => number,
  x: number,
  z: number,
  layer: number,
  delay: number,
) {
  b.pos.push(x, 0, z);
  b.start.push(...randomInSphere(rand, 3.2));
  b.delay.push(delay);
  b.layer.push(layer);
}

function buildGeometry() {
  const rand = mulberry32(25031); // SIH problem statement id — a quiet nod.
  const lines = newBuffers();
  const links = newBuffers();
  const nodes = newBuffers();
  const accent: number[] = [];
  const h = SIZE / 2;
  const centers: [number, number][][] = [];

  for (let l = 0; l < LAYERS; l++) {
    const base = l * 0.12;
    const seg = (x0: number, z0: number, x1: number, z1: number, d: number) => {
      pushVertex(lines, rand, x0, z0, l, d + rand() * 0.08);
      pushVertex(lines, rand, x1, z1, l, d + rand() * 0.08);
    };
    // Layer outline + corner registration ticks.
    seg(-h, -h, h, -h, base);
    seg(h, -h, h, h, base);
    seg(h, h, -h, h, base);
    seg(-h, h, -h, -h, base);
    const tick = 0.12;
    for (const [cx, cz] of [
      [-h, -h],
      [h, -h],
      [h, h],
      [-h, h],
    ] as const) {
      seg(cx - Math.sign(cx) * tick, cz, cx + Math.sign(cx) * tick * 0.6, cz, base + 0.05);
    }
    // Modules.
    const rects: Rect[] = [];
    const inset = 0.14;
    splitRects(rand, { x0: -h + inset, z0: -h + inset, x1: h - inset, z1: h - inset }, 2, rects);
    const layerCenters: [number, number][] = [];
    for (const r of rects) {
      const g = 0.05;
      const d = base + 0.15 + rand() * 0.35;
      seg(r.x0 + g, r.z0 + g, r.x1 - g, r.z0 + g, d);
      seg(r.x1 - g, r.z0 + g, r.x1 - g, r.z1 - g, d);
      seg(r.x1 - g, r.z1 - g, r.x0 + g, r.z1 - g, d);
      seg(r.x0 + g, r.z1 - g, r.x0 + g, r.z0 + g, d);
      const c: [number, number] = [(r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2];
      layerCenters.push(c);
      pushVertex(nodes, rand, c[0], c[1], l, d + 0.25);
      accent.push(0);
    }
    centers.push(layerCenters);
  }

  // Dependencies: connect each module to the nearest module in the layer below.
  for (let l = 0; l < LAYERS - 1; l++) {
    for (const [x, z] of centers[l]) {
      if (rand() < 0.35) continue;
      let best = centers[l + 1][0];
      let bd = Infinity;
      for (const c of centers[l + 1]) {
        const dd = (c[0] - x) ** 2 + (c[1] - z) ** 2;
        if (dd < bd) {
          bd = dd;
          best = c;
        }
      }
      const d = 0.75 + l * 0.12 + rand() * 0.2;
      pushVertex(links, rand, x, z, l, d);
      pushVertex(links, rand, best[0], best[1], l + 1, d);
    }
  }

  // One highlighted node per layer: the "redline" marks.
  let offset = 0;
  for (let l = 0; l < LAYERS; l++) {
    const n = centers[l].length;
    accent[offset + Math.floor(rand() * n)] = 1;
    offset += n;
  }

  const toGeo = (b: Buffers) => {
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(b.pos, 3));
    g.setAttribute("aStart", new Float32BufferAttribute(b.start, 3));
    g.setAttribute("aDelay", new Float32BufferAttribute(b.delay, 1));
    g.setAttribute("aLayer", new Float32BufferAttribute(b.layer, 1));
    return g;
  };
  const nodeGeo = toGeo(nodes);
  nodeGeo.setAttribute("aAccent", new Float32BufferAttribute(accent, 1));
  return { lineGeo: toGeo(lines), linkGeo: toGeo(links), nodeGeo };
}

const VERT_COMMON = /* glsl */ `
  uniform float uProgress;
  uniform float uGap;
  uniform float uTime;
  attribute vec3 aStart;
  attribute float aDelay;
  attribute float aLayer;
  varying float vT;
  vec3 placed() {
    float t = clamp((uProgress - aDelay) / 0.6, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 4.0);
    vT = t;
    vec3 target = position;
    target.y = (${((LAYERS - 1) / 2).toFixed(2)} - aLayer) * uGap;
    vec3 drift = vec3(
      sin(uTime * 0.7 + aDelay * 31.0),
      cos(uTime * 0.6 + aDelay * 17.0),
      sin(uTime * 0.5 + aDelay * 23.0)
    ) * 0.12 * (1.0 - t);
    return mix(aStart + drift, target, t);
  }
`;

function lineMaterial(opacity: number) {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uProgress: { value: 0 },
      uGap: { value: 0.8 },
      uTime: { value: 0 },
      uColor: { value: new Color() },
      uOpacity: { value: opacity },
    },
    vertexShader: /* glsl */ `
      ${VERT_COMMON}
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(placed(), 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vT;
      void main() {
        gl_FragColor = vec4(uColor, uOpacity * mix(0.18, 1.0, vT));
      }
    `,
  });
}

function nodeMaterial(pixelRatio: number) {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uProgress: { value: 0 },
      uGap: { value: 0.8 },
      uTime: { value: 0 },
      uColor: { value: new Color() },
      uAccent: { value: new Color() },
      uSize: { value: 5 * pixelRatio },
    },
    vertexShader: /* glsl */ `
      ${VERT_COMMON}
      uniform float uSize;
      attribute float aAccent;
      varying float vAccent;
      void main() {
        vAccent = aAccent;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(placed(), 1.0);
        float pulse = aAccent * (0.5 + 0.5 * sin(uTime * 2.2 + aDelay * 9.0));
        gl_PointSize = uSize * (0.6 + 0.4 * vT) * (1.0 + aAccent * 0.6 + pulse * 0.35);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform vec3 uAccent;
      varying float vT;
      varying float vAccent;
      void main() {
        // Square drafting dot with a hollow centre for regular nodes.
        vec2 p = abs(gl_PointCoord - 0.5);
        float edge = max(p.x, p.y);
        float hollow = step(0.28, edge);
        float a = mix(hollow, 1.0, vAccent);
        if (a < 0.5) discard;
        gl_FragColor = vec4(mix(uColor, uAccent, vAccent), mix(0.25, 1.0, vT));
      }
    `,
  });
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  return {
    line: new Color(cs.getPropertyValue("--line").trim() || "#37588a"),
    accent: new Color(cs.getPropertyValue("--accent").trim() || "#cb7e00"),
  };
}

export function createBlueprintScene({
  container,
  labels,
  scrollTarget,
  reducedMotion,
}: SceneOptions): SceneHandle {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block";
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(10, 8.2, 10);
  camera.lookAt(0, 0, 0);

  const { lineGeo, linkGeo, nodeGeo } = buildGeometry();
  const lineMat = lineMaterial(0.95);
  const linkMat = lineMaterial(0.45);
  const nodeMat = nodeMaterial(pixelRatio);
  const mats = [lineMat, linkMat, nodeMat];

  const group = new Group();
  group.add(
    new LineSegments(lineGeo, lineMat),
    new LineSegments(linkGeo, linkMat),
    new Points(nodeGeo, nodeMat),
  );
  scene.add(group);

  const applyColors = () => {
    const { line, accent } = readColors();
    lineMat.uniforms.uColor.value.copy(line);
    linkMat.uniforms.uColor.value.copy(line);
    nodeMat.uniforms.uColor.value.copy(line);
    nodeMat.uniforms.uAccent.value.copy(accent);
  };
  applyColors();

  // Layer label anchors: front-right corner of each layer outline.
  const anchor = new Vector3();
  const h = SIZE / 2;

  let width = 1;
  let height = 1;
  const resize = () => {
    width = Math.max(1, container.clientWidth);
    height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const view = 5.6; // world units visible vertically
    // Shift the drawing left of centre so the layer labels have room on the right.
    const shift = view * aspect * (aspect < 0.9 ? 0.27 : 0.13);
    camera.left = (-view * aspect) / 2 + shift;
    camera.right = (view * aspect) / 2 + shift;
    camera.top = view / 2;
    camera.bottom = -view / 2;
    camera.zoom = aspect < 0.9 ? 1.25 : 1;
    camera.updateProjectionMatrix();
    if (!running) frame(performance.now());
  };

  // Pointer orbit (smoothed).
  let targetRx = 0;
  let targetRy = 0;
  let rx = 0;
  let ry = 0;
  const onPointer = (e: PointerEvent) => {
    targetRy = (e.clientX / window.innerWidth - 0.5) * 0.5;
    targetRx = (e.clientY / window.innerHeight - 0.5) * 0.18;
  };

  let progress = reducedMotion ? PROGRESS_END : 0;
  let gap = 0.8;
  const startAt = performance.now();
  const t0 = performance.now();
  let last = t0;
  let raf = 0;
  let running = false;
  let visible = true;

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const time = (now - t0) / 1000;

    if (!reducedMotion)
      // Wall-clock based so slow devices finish on time instead of crawling.
      progress = Math.min(
        PROGRESS_END,
        ((now - startAt) / 1000) * (PROGRESS_END / ASSEMBLE_SECONDS),
      );

    // Exploded view: 0 at top of hero → 1 once the hero has scrolled ~70% away.
    const rect = scrollTarget.getBoundingClientRect();
    const scrolled = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * 0.7)));
    const targetGap = 0.8 + scrolled * 0.55;
    gap = reducedMotion ? targetGap : gap + (targetGap - gap) * Math.min(1, dt * 6);

    rx += (targetRx - rx) * Math.min(1, dt * 3);
    ry += (targetRy - ry) * Math.min(1, dt * 3);
    const sway = reducedMotion ? 0 : Math.sin(time * 0.18) * 0.06;
    group.rotation.set(rx, ry + sway, 0);

    for (const m of mats) {
      m.uniforms.uProgress.value = progress;
      m.uniforms.uGap.value = gap;
      m.uniforms.uTime.value = reducedMotion ? 0 : time;
    }

    renderer.render(scene, camera);

    // Labels track their layer.
    group.updateMatrixWorld();
    const labelAlpha = Math.min(1, Math.max(0, (progress - 1.35) / 0.35));
    labels.forEach((el, i) => {
      anchor
        .set(h, ((LAYERS - 1) / 2 - i) * gap, -h)
        .applyMatrix4(group.matrixWorld)
        .project(camera);
      const x = (anchor.x * 0.5 + 0.5) * width;
      const y = (-anchor.y * 0.5 + 0.5) * height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = String(labelAlpha);
    });
  }

  const loop = (now: number) => {
    frame(now);
    raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (running || reducedMotion || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  io.observe(container);

  const onVisibility = () => (document.hidden ? stop() : start());
  const onTheme = () => {
    applyColors();
    if (!running) frame(performance.now());
  };
  const onScrollStatic = () => {
    if (reducedMotion) frame(performance.now());
  };

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("themechange", onTheme);
  window.addEventListener("scroll", onScrollStatic, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  if (reducedMotion) frame(performance.now());
  else start();

  return {
    dispose() {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("themechange", onTheme);
      window.removeEventListener("scroll", onScrollStatic);
      document.removeEventListener("visibilitychange", onVisibility);
      lineGeo.dispose();
      linkGeo.dispose();
      nodeGeo.dispose();
      mats.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
