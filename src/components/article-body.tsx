import type { ReactNode } from "react";

/**
 * Renders an article body. Each entry is one block:
 * - "## Heading" -> <h2>
 * - anything else -> <p>, with inline [text](url) turned into links.
 * Text is rendered as React text nodes (never as HTML), so nothing in the
 * copy can inject markup. Plain strings render exactly as a bare <p>.
 */
const LINK = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
const SITE = /^https?:\/\/(www\.)?sourza\.com(?=\/|#|$)/i;

function safeHref(raw: string): { href: string; external: boolean } | null {
  const url = raw.trim();
  if (SITE.test(url)) return { href: url.replace(SITE, "") || "/", external: false };
  if (/^https?:\/\//i.test(url)) return { href: url, external: true };
  if (url.startsWith("/") && !url.startsWith("//")) return { href: url, external: false };
  if (url.startsWith("#")) return { href: url, external: false };
  return null; // javascript:, data:, protocol-relative, etc. are dropped to text
}

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(LINK)) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const target = safeHref(m[2]);
    if (!target) {
      out.push(m[1]);
    } else {
      out.push(
        <a
          key={i++}
          href={target.href}
          className="text-gold-deep underline underline-offset-2 hover:text-ink"
          {...(target.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {m[1]}
        </a>,
      );
    }
    last = start + m[0].length;
  }
  if (last === 0) return [text];
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function ArticleBody({ blocks }: { blocks: string[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.startsWith("## ") ? (
          <h2
            key={index}
            className="!mt-10 font-display text-2xl leading-snug text-ink-deep md:text-3xl"
          >
            {inline(block.slice(3).trim())}
          </h2>
        ) : (
          <p key={index}>{inline(block)}</p>
        ),
      )}
    </>
  );
}
