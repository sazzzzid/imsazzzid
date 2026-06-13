export interface NavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface HomeSection {
  id: string;
  label: string;
}

const allSiteNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/work", description: "Selected projects" },
  { title: "Blog", href: "/blog", description: "Thoughts & writings" },
  { title: "About", href: "/about", description: "Background & story" },
  { title: "Contact", href: "/contact", description: "Get in touch" },
];

const allFooterNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/work" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

const allHomeSections: HomeSection[] = [
  { id: "hero", label: "Top" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "impact", label: "Impact" },
  { id: "why", label: "Why" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export function getSiteNav(hasBlogPosts: boolean): NavItem[] {
  if (hasBlogPosts) return allSiteNav;
  return allSiteNav.filter((item) => item.href !== "/blog");
}

export function getFooterNav(hasBlogPosts: boolean): NavItem[] {
  if (hasBlogPosts) return allFooterNav;
  return allFooterNav.filter((item) => item.href !== "/blog");
}

export function getHomeSections(hasBlogPosts: boolean): HomeSection[] {
  if (hasBlogPosts) return allHomeSections;
  return allHomeSections.filter((section) => section.id !== "writing");
}

export function isHashHref(href: string): boolean {
  return href.startsWith("#") || href.startsWith("/#");
}

export function resolveHomeSectionHref(
  sectionId: string,
  pathname: string,
): string {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}

export function getSectionIdFromHref(href: string): string | null {
  if (href.startsWith("#")) return href.slice(1);
  if (href.startsWith("/#")) return href.slice(2);
  return null;
}

/** Whether a nav item should appear active for the current pathname */
export function isNavItemActive(href: string, pathname: string): boolean {
  if (isHashHref(href)) return false;
  if (href === "/") return pathname === "/";
  if (href === "/work" || href === "/blog") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href;
}
