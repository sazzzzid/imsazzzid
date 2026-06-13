"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import type Lenis from "lenis";
import { scrollToElement } from "@/lib/scroll";

interface ScrollContextValue {
  scrollToSection: (id: string) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext() {
  return useContext(ScrollContext);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToSection = useCallback((id: string) => {
    scrollToElement(id, lenisRef.current);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return;

    let lenis: Lenis | null = null;
    let rafId: number;
    let cancelled = false;

    void import("lenis").then(({ default: LenisConstructor }) => {
      if (cancelled) return;

      lenis = new LenisConstructor({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) {
        if (attempts++ < 30) requestAnimationFrame(tryScroll);
        return;
      }
      scrollToElement(id, lenisRef.current);
    };

    requestAnimationFrame(tryScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}
