import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { highlightCode } from "@/lib/shiki";

/**
 * Custom MDX components for rendering content with editorial styling.
 */
export function getMDXComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="text-4xl md:text-5xl font-bold tracking-tight mt-12 mb-4"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="text-3xl md:text-4xl font-semibold tracking-tight mt-10 mb-3"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-2xl font-semibold tracking-tight mt-8 mb-2"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-body leading-relaxed mb-6 text-muted-foreground"
        {...props}
      />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/")) {
        return (
          <Link
            href={href}
            className="underline underline-offset-4 hover:text-foreground transition-colors"
            {...props}
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => (
      <Image
        src={src || ""}
        alt={alt || "Content image"}
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-lg my-8 w-full h-auto"
        style={{ width: "100%", height: "auto" }}
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-foreground/20 pl-6 my-8 italic text-muted-foreground"
        {...props}
      />
    ),
    code: ({ className, children, ...props }) => {
      // Inline code (no language class)
      if (!className) {
        return (
          <code
            className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-brand"
            {...props}
          >
            {children}
          </code>
        );
      }
      // Code inside pre blocks — will be handled by pre
      return (
        <code className={`${className} block`} {...props}>
          {children}
        </code>
      );
    },
    pre: async ({ children, ...props }) => {
      const codeElement = children as React.ReactElement<{
        className?: string;
        children?: string;
      }>;
      const className = codeElement?.props?.className || "";
      const code = codeElement?.props?.children || "";
      const lang = className.replace("language-", "") || "text";

      try {
        const html = await highlightCode(
          typeof code === "string" ? code.trim() : String(code).trim(),
          lang,
        );
        return (
          <div className="relative group my-8 rounded-xl overflow-hidden border border-border/50">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-black/5 dark:bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              {lang !== "text" && (
                <span className="ml-auto text-[11px] text-muted-foreground/60 font-mono">
                  {lang}
                </span>
              )}
            </div>
            <div
              tabIndex={0}
              className="p-5 overflow-x-auto text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        );
      } catch {
        // Fallback if highlighting fails
        return (
          <div className="relative group my-8 rounded-xl overflow-hidden border border-border/50 bg-[#0a0a0a] dark:bg-[#0a0a0a]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-black/5 dark:bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
            </div>
            <pre
              tabIndex={0}
              className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-[#e4e4e7]"
              {...props}
            >
              {children}
            </pre>
          </div>
        );
      }
    },
    ul: (props) => (
      <ul
        className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground"
        {...props}
      />
    ),
    hr: () => <hr className="border-border/50 my-12" />,
    table: (props) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-border/50">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    thead: (props) => (
      <thead className="bg-muted/50 border-b border-border/50" {...props} />
    ),
    th: (props) => (
      <th
        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-4 py-3 text-muted-foreground border-t border-border/30"
        {...props}
      />
    ),
    tr: (props) => (
      <tr className="transition-colors hover:bg-muted/30" {...props} />
    ),
    strong: (props) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    li: (props) => <li className="text-muted-foreground" {...props} />,
  };
}
