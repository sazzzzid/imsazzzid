"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";
import { getFooterNav } from "@/config/navigation";

const socialLinks = [
  { name: "GitHub", href: siteConfig.links.github },
  { name: "LinkedIn", href: siteConfig.links.linkedin },
  { name: "Instagram", href: siteConfig.links.instagram },
  { name: "npm", href: siteConfig.links.npm },
  { name: "Email", href: `mailto:${siteConfig.links.email}` },
] as const;

const linkClass =
  "focus-ring hover:text-foreground transition-colors duration-200 rounded-sm";

function Dot() {
  return (
    <span className="text-muted-foreground/30 select-none" aria-hidden="true">
      ·
    </span>
  );
}

export function Footer({ hasBlogPosts }: { hasBlogPosts: boolean }) {
  const year = new Date().getFullYear();
  const pageLinks = getFooterNav(hasBlogPosts).filter(
    (item) => item.href !== "/",
  );

  return (
    <footer className="mt-auto border-t border-border/40">
      <Reveal variant="fade-up">
        <div className="container-editorial py-6 md:py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] tracking-wide text-muted-foreground/70">
              &copy; {year}{" "}
              <Link href="/" className={`${linkClass} text-foreground/60`}>
                {siteConfig.name}
              </Link>
            </p>

            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] tracking-wide text-muted-foreground/70"
            >
              {pageLinks.map((item, i) => (
                <span key={item.href} className="inline-flex items-center gap-2.5">
                  {i > 0 && <Dot />}
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass}>
                      {item.title}
                    </Link>
                  )}
                </span>
              ))}
              <Dot />
              {socialLinks.map((link, i) => (
                <span key={link.name} className="inline-flex items-center gap-2.5">
                  {i > 0 && <Dot />}
                  <a
                    href={link.href}
                    target={
                      link.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className={linkClass}
                  >
                    {link.name}
                  </a>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
