"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useScroll, useTransform } from "@/components/motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import {
  getSiteNav,
  getSectionIdFromHref,
  isHashHref,
  isNavItemActive,
} from "@/config/navigation";
import { useScrollContext } from "@/components/providers/smooth-scroll";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { editorialEase } from "@/lib/motion-presets";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { scrollToElement } from "@/lib/scroll";

const navLinkClass =
  "focus-ring rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 min-h-11 inline-flex items-center";

export function SiteNav({ hasBlogPosts }: { hasBlogPosts: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrollContext = useScrollContext();
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 4px 24px rgba(0,0,0,0.03)", "0 8px 32px rgba(0,0,0,0.08)"],
  );
  const siteNav = getSiteNav(hasBlogPosts);

  const handleSectionNavigate = (sectionId: string) => {
    setOpen(false);

    if (scrollContext) {
      scrollContext.scrollToSection(sectionId);
    } else {
      scrollToElement(sectionId);
    }
  };

  const renderNavLink = (
    title: string,
    href: string,
    onNavigate?: () => void,
  ) => {
    const isActive = isNavItemActive(href, pathname);

    if (isHashHref(href)) {
      const sectionId = getSectionIdFromHref(href);
      if (!sectionId) return null;

      return (
        <button
          key={href}
          type="button"
          onClick={() => {
            handleSectionNavigate(sectionId);
            onNavigate?.();
          }}
          className={cn(
            navLinkClass,
            "w-full justify-start lg:w-auto",
            isActive
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          )}
        >
          {title}
        </button>
      );
    }

    return (
      <Link
        key={href}
        href={href}
        onClick={onNavigate}
        className={cn(
          navLinkClass,
          "w-full justify-start lg:w-auto",
          isActive
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
      >
        {title}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={reducedMotion ? false : { opacity: 0, y: -10 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          reducedMotion ? undefined : { duration: 0.5, delay: 0.2, ease: editorialEase }
        }
        style={reducedMotion ? undefined : { boxShadow: navShadow }}
        className="hidden lg:flex fixed top-5 left-5 z-50 items-center gap-1 px-2 py-2 rounded-full bg-background/60 backdrop-blur-xl border border-border shadow-lg shadow-black/5 transition-[background,backdrop-filter] duration-300"
        aria-label="Main navigation"
      >
        {siteNav.map((item) => renderNavLink(item.title, item.href))}
      </motion.nav>

      <nav
        className="lg:hidden fixed top-5 left-5 z-50 flex items-center gap-2"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="focus-ring rounded-full px-3 py-2 min-h-11 inline-flex items-center text-sm font-semibold bg-background/60 backdrop-blur-xl border border-border shadow-lg shadow-black/5"
        >
          {siteConfig.name}
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="focus-ring rounded-full size-11 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/5"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-2 pt-2">
              {siteNav.map((item) =>
                renderNavLink(item.title, item.href, () => setOpen(false)),
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
