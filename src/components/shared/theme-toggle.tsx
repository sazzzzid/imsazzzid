"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "@/components/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase, instantTransition } from "@/lib/motion-presets";
import {
  applyDarkMode,
  getDarkModeSnapshot,
  notifyThemeChange,
  subscribeToTheme,
} from "@/lib/theme";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const reducedMotion = useReducedMotion();
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getDarkModeSnapshot,
    () => true,
  );

  const toggle = useCallback(() => {
    const next = !getDarkModeSnapshot();
    applyDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    notifyThemeChange();
  }, []);

  return (
    <motion.button
      initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
      animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={
        reducedMotion
          ? instantTransition
          : { duration: 0.5, delay: 0.5, ease: editorialEase }
      }
      onClick={toggle}
      className={cn(
        "focus-ring fixed fixed-top-safe fixed-right-safe z-50 p-2.5 min-h-11 min-w-11 rounded-full bg-background/60 backdrop-blur-xl border border-border shadow-lg shadow-black/5 hover:border-foreground/20 transition-all duration-300 group flex items-center justify-center",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {reducedMotion ? (
        isDark ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: editorialEase }}
            >
              <SunIcon />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: editorialEase }}
            >
              <MoonIcon />
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </motion.button>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-300 group-hover:text-amber-200 transition-colors"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-slate-700 group-hover:text-slate-900 transition-colors"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
