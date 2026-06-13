import { siteConfig } from "@/config/site";

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
      siteConfig.links.npm,
      siteConfig.links.website,
      "https://visualjs.in",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.author.location,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  slug,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  slug: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    datePublished: publishedAt,
    ...(updatedAt && { dateModified: updatedAt }),
    url: `${siteConfig.url}/blog/${slug}`,
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function SoftwareJsonLd({
  name,
  description,
  url,
  applicationCategory,
}: {
  name: string;
  description: string;
  url?: string;
  applicationCategory?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    ...(url && { url }),
    ...(applicationCategory && { applicationCategory }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
