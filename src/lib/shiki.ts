import { codeToHtml } from "shiki";

const highlightCache = new Map<string, string>();

export async function highlightCode(
  code: string,
  lang: string = "text",
): Promise<string> {
  const key = `${lang}:${code}`;
  const cached = highlightCache.get(key);
  if (cached) return cached;

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  highlightCache.set(key, html);
  return html;
}
