"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";

export function WhyIBuild() {
  return (
    <section id="why" className="section-gap border-t border-border/50">
      <div className="container-editorial max-w-3xl space-y-6">
        <SectionHeader
          label="Why I Build"
          title="I did not start with code. I started with questions."
        />

        <Stagger className="space-y-6">
          <StaggerItem>
            <p className="text-body-lg text-muted-foreground/80">
              I build developer tools and open-source SDKs to remove friction in
              everyday workflows. Each project is a chance to make complex systems
              simpler for the people who depend on them.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-body text-muted-foreground/80">
              Principles, experience, and the longer story are on the About page.
            </p>
          </StaggerItem>
          <StaggerItem>
            <Reveal variant="scale" delay={0.1}>
              <Link
                href="/about"
                className="focus-ring group inline-flex items-center gap-2 min-h-11 px-1 text-sm font-medium text-foreground/80 hover:text-brand transition-colors rounded-lg"
              >
                Read the full story on About
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
