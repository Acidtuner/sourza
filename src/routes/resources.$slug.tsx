import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { getArticle } from "@/lib/articles";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: pageMeta(
      `Sourza — ${loaderData.article.title}`,
      loaderData.article.summary,
    ),
  }),
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
  const { article } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader action={{ href: "/#introduction", label: "Request an introduction" }} />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-medium tracking-widest text-gold-deep uppercase">
          <Link to="/resources" className="hover:text-ink">
            Resources
          </Link>
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink-deep md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-soft">{article.date}</p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{article.summary}</p>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-12 text-sm text-soft">
          Written from the desk. The plant stays the exporter.
        </p>
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
