import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { WhyIBuild } from "@/components/sections/why-i-build";
import { SelectedWork } from "@/components/sections/selected-work";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Impact } from "@/components/sections/impact";
import { FeaturedPosts } from "@/components/sections/featured-posts";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getFeaturedProjects, getFeaturedPosts, getPrimaryFeaturedProject } from "@/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const featuredPosts = getFeaturedPosts();
  const primaryFeaturedSlug = getPrimaryFeaturedProject(featuredProjects)?.slug;

  return (
    <>
      <HeroSection projects={featuredProjects.slice(0, 3)} />
      <SelectedWork
        projects={featuredProjects}
        primaryFeaturedSlug={primaryFeaturedSlug}
      />
      <ExperienceTimeline showAboutCta />
      <Impact />
      <WhyIBuild />
      <FeaturedPosts posts={featuredPosts} />
      <ContactCTA />
    </>
  );
}
