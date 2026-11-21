"use client";

import type Lenis from "lenis";

export const PALETTE_OPEN_EVENT = "palette:open";
const HEADER_OFFSET = -64;

let lenis: Lenis | null = null;
export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

export function openPalette(): void {
  window.dispatchEvent(new Event(PALETTE_OPEN_EVENT));
}

/** Freeze/unfreeze smooth scroll (e.g. while a modal owns the wheel). */
export function pauseScroll(paused: boolean): void {
  if (paused) lenis?.stop();
  else lenis?.start();
}

export function scrollToSection(id: string): void {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) {
    // Not on the home page (e.g. a case study): go home to that sheet.
    location.assign(id === "top" ? "/" : `/#${id}`);
    return;
  }
  if (lenis) {
    lenis.scrollTo(id === "top" ? 0 : el, {
      offset: id === "top" ? 0 : HEADER_OFFSET,
      duration: 1.2,
    });
  } else {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
  // Move focus for keyboard / screen-reader users without a second scroll jump.
  if (el instanceof HTMLElement && el !== document.body) {
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
}

export function triggerDownload(href: string, filename: string): void {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const noop = () => () => {};
/** Platform shortcut label, hydration-safe via useSyncExternalStore. */
export const kbdStore = {
  subscribe: noop,
  getSnapshot: () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K"),
  getServerSnapshot: () => "Ctrl K",
};
