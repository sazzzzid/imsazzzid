"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { LENIS_OPTIONS } from "@/lib/lenis-config";
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

function LenisScrollController({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLenis((lenis) => {
    lenisRef.current = lenis;
  });

  const scrollToSection = useCallback((id: string) => {
    scrollToElement(id, lenisRef.current);
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

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  const scrollToSection = useCallback((id: string) => {
    scrollToElement(id, null);
  }, []);

  if (reducedMotion) {
    return (
      <ScrollContext.Provider value={{ scrollToSection }}>
        {children}
      </ScrollContext.Provider>
    );
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisScrollController>{children}</LenisScrollController>
    </ReactLenis>
  );
}
