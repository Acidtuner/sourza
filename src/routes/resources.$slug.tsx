import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import {
  getAdjacentArticles,
  getArticle,
  getRelatedArticles,
  readingTime,
  type ArticleBucket,
} from "@/lib/articles";
import { articleJsonLd, articleMeta, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return {
      article,
      related: getRelatedArticles(params.slug),
      adjacent: getAdjacentArticles(params.slug),
      minutes: readingTime(article),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { article } = loaderData;
    const path = `/resources/${article.slug}`;
    const title = `Sourza — ${article.title}`;
    return {
      meta: articleMeta(
        title,
        article.summary,
        path,
        article.date,
        article.updated ?? article.date,
      ),
      links: [canonicalLink(path)],
      scripts: [jsonLdScript(articleJsonLd(article))],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/resources", label: "Resources" }} />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <h1 className="font-display text-4xl text-ink-deep">Not found</h1>
        <p className="mt-4 text-muted">That note is not on the desk.</p>
        <Link to="/resources" className="mt-6 inline-flex text-gold-deep">
          Back to resources
        </Link>
      </main>
    </div>
  ),
});

function ArticlePage() {
  const { article, related, adjacent, minutes } = Route.useLoaderData();

  async function copyLink() {
    if (typeof window === "undefined") return;
    await navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "Request an introduction" }} />
      <main className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article>
            <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
              <Link to="/resources" className="hover:text-ink">
                Resources
              </Link>
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-soft">
              <span>{article.date}</span>
              <span>{minutes} min read</span>
              <span className="uppercase tracking-widest">{labelFor(article.bucket)}</span>
              <button type="button" onClick={copyLink} className="text-gold-deep hover:text-ink">
                Copy link
              </button>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-muted">{article.summary}</p>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink">
              {article.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 border-t border-line pt-8">
              <p className="text-lg leading-relaxed text-muted">
                If you have a part that needs a plant, tell us what you need made.
              </p>
              <a
                href="/#introduction"
                className="mt-4 inline-flex min-h-11 items-center text-gold-deep hover:text-ink"
              >
                Request an introduction
              </a>
            </div>

            <div className="mt-10 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
              {adjacent.prev ? (
                <Link
                  to="/resources/$slug"
                  params={{ slug: adjacent.prev.slug }}
                  className="block rounded-lg border border-line p-4 hover:border-ink"
                >
                  <p className="text-xs uppercase tracking-widest text-soft">Previous</p>
                  <p className="mt-1 font-display text-lg text-ink-deep">{adjacent.prev.title}</p>
                </Link>
              ) : (
                <div />
              )}
              {adjacent.next && (
                <Link
                  to="/resources/$slug"
                  params={{ slug: adjacent.next.slug }}
                  className="block rounded-lg border border-line p-4 text-right hover:border-ink sm:text-right"
                >
                  <p className="text-xs uppercase tracking-widest text-soft">Next</p>
                  <p className="mt-1 font-display text-lg text-ink-deep">{adjacent.next.title}</p>
                </Link>
              )}
            </div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-xl text-gold">More from the desk</h2>
            {related.length === 0 ? (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                More notes are on the way. One piece every couple of days.
              </p>
            ) : (
              <ul className="mt-4 space-y-5">
                {related.map((item) => (
                  <li key={item.slug}>
                    <p className="text-xs uppercase tracking-widest text-soft">
                      {item.date} · {labelFor(item.bucket)}
                    </p>
                    <Link
                      to="/resources/$slug"
                      params={{ slug: item.slug }}
                      className="mt-1 block font-display text-lg text-ink-deep hover:text-gold-deep"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.summary}</p>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
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

function labelFor(bucket: ArticleBucket) {
  if (bucket === "sourcing") return "Sourcing";
  if (bucket === "policy") return "Policy";
  return "Macro";
}
