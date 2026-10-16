import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { listArticles } from "@/lib/articles";
import { pageMeta } from "@/lib/seo";

const TITLE = "Sourza — Resources";
const DESCRIPTION =
  "Practical notes on India to Gulf machined parts: how a brief is written, why the plant stays the exporter, and what the corridor actually looks like.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: pageMeta(TITLE, DESCRIPTION),
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const articles = listArticles();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "Request an introduction" }} />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
          Resources
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
          Knowledge center
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Short notes from the desk on how specified parts move from a requirement to a
          decision. One piece every couple of days.
        </p>

        <ul className="mt-12 space-y-8">
          {articles.map((article) => (
            <li key={article.slug} className="border-b border-line pb-8">
              <p className="text-xs tracking-widest text-soft uppercase">{article.date}</p>
              <h2 className="mt-2 font-display text-2xl text-ink-deep md:text-3xl">
                <Link
                  to="/resources/$slug"
                  params={{ slug: article.slug }}
                  className="hover:text-gold-deep"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{article.summary}</p>
              <Link
                to="/resources/$slug"
                params={{ slug: article.slug }}
                className="mt-3 inline-flex text-sm text-gold-deep"
              >
                Read more
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <img src="/sourza-logo.svg" alt="" className="h-6 w-auto" />
            <p className="mt-3 text-lg leading-snug text-muted md:text-xl">
              Indian plants. Gulf buyers. Specified parts.
            </p>
          </div>
          <a href="/privacy" className="text-sm text-muted hover:text-ink">
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}
