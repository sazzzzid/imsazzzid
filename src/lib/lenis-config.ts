import type { LenisOptions } from "lenis";

/** Editorial ease-out for in-page anchor navigation */
export function scrollEaseOut(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export const lenisDefaultEasing = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.09,
  duration: 1.35,
  easing: lenisDefaultEasing,
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.08,
  touchMultiplier: 1.15,
  wheelMultiplier: 0.95,
  autoRaf: true,
  anchors: {
    duration: 1.35,
    easing: scrollEaseOut,
  },
};

export const LENIS_SCROLL_TO_OPTIONS = {
  offset: 0,
  programmatic: true,
  duration: 1.35,
  easing: scrollEaseOut,
} as const;
