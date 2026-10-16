import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { BUCKETS, listArticles, type ArticleBucket } from "@/lib/articles";

export const Route = createFileRoute("/resources/")({
  validateSearch: (search: Record<string, unknown>) => {
    const bucket = search.bucket;
    return {
      bucket: BUCKETS.includes(bucket as ArticleBucket) ? (bucket as ArticleBucket) : undefined,
    };
  },
  component: ResourcesIndex,
});

function ResourcesIndex() {
  const { bucket } = Route.useSearch();
  const navigate = useNavigate();
  const articles = listArticles().filter((article) => !bucket || article.bucket === bucket);

  function setBucket(next?: ArticleBucket) {
    navigate({
      to: "/resources",
      search: next ? { bucket: next } : {},
    });
  }

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

        <div className="mt-8 flex flex-wrap gap-2">
          <FilterChip active={!bucket} onClick={() => setBucket()} label="All" />
          {BUCKETS.map((item) => (
            <FilterChip
              key={item}
              active={bucket === item}
              onClick={() => setBucket(item)}
              label={labelFor(item)}
            />
          ))}
        </div>

        <ul className="mt-10 space-y-8">
          {articles.map((article) => (
            <li key={article.slug} className="border-b border-line pb-8">
              <p className="text-xs tracking-widest text-soft uppercase">
                {article.date} · {labelFor(article.bucket)}
              </p>
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

        {articles.length === 0 && (
          <p className="mt-10 text-muted">No notes in this bucket yet.</p>
        )}
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

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm ${
        active
          ? "border-ink bg-ink text-cream"
          : "border-line text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function labelFor(bucket: ArticleBucket) {
  if (bucket === "sourcing") return "Sourcing";
  if (bucket === "policy") return "Policy";
  return "Macro";
}
