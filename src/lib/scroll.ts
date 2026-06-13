import { LENIS_SCROLL_TO_OPTIONS } from "@/lib/lenis-config";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type LenisLike = {
  scrollTo: (
    target: HTMLElement | number,
    options?: { offset?: number; programmatic?: boolean },
  ) => void;
};

export function scrollToElement(id: string, lenis?: LenisLike | null) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, LENIS_SCROLL_TO_OPTIONS);
    return;
  }

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

export function getVisibleHomeSections(hasBlogPosts: boolean) {
  return getHomeSectionIds(hasBlogPosts).filter(
    (id) => id === "hero" || document.getElementById(id),
  );
}

function getHomeSectionIds(hasBlogPosts: boolean) {
  const sections = ["hero", "work", "experience", "impact", "why", "contact"];
  if (hasBlogPosts) sections.splice(4, 0, "writing");
  return sections;
}
