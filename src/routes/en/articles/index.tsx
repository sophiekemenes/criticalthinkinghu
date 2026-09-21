import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EnHeader } from "@/components/site/EnHeader";
import { EnFooter } from "@/components/site/EnFooter";
import { FadeUp } from "@/components/site/FadeUp";
import { getAllArticlesEn } from "@/content/articles.en";

export const Route = createFileRoute("/en/articles/")({
  head: () => ({
    meta: [
      { title: "Articles — criticalthinking.hu" },
      {
        name: "description",
        content: "Essays on the 3 Mental Firewalls: attention, interpretation, decision — critical thinking in a world shaped by AI.",
      },
    ],
  }),
  component: ArticlesIndexEn,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function ArticlesIndexEn() {
  const articles = useMemo(() => getAllArticlesEn(), []);
  const years = useMemo(
    () => Array.from(new Set(articles.map((a) => new Date(a.date).getFullYear()))).sort((a, b) => b - a),
    [articles],
  );
  const [yearFilter, setYearFilter] = useState<number | "all">("all");

  const visible = yearFilter === "all" ? articles : articles.filter((a) => new Date(a.date).getFullYear() === yearFilter);

  return (
    <main className="bg-background text-foreground antialiased">
      <EnHeader />

      <section className="pt-36 pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">Articles</p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6 text-balance">
              Essays on the{" "}
              <span className="accent-mark">3 Mental Firewalls.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-ink-soft leading-relaxed mb-4 max-w-2xl">
              Attention, interpretation, decision — critical thinking in a world that
              keeps trying to decide for us.
            </p>
          </FadeUp>
          <FadeUp delay={0.11}>
            <p className="text-sm text-ink-soft/70 leading-relaxed mb-12 max-w-2xl">
              The full English site is still coming together — these are translations
              of the Hungarian articles, published as they're ready.
            </p>
          </FadeUp>

          {years.length > 1 && (
            <FadeUp delay={0.12}>
              <div className="flex flex-wrap gap-2 mb-10">
                <button
                  onClick={() => setYearFilter("all")}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    yearFilter === "all"
                      ? "bg-ink text-cream border-ink"
                      : "border-border/60 text-ink-soft hover:border-coral hover:text-coral"
                  }`}
                >
                  All
                </button>
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYearFilter(y)}
                    className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                      yearFilter === y
                        ? "bg-ink text-cream border-ink"
                        : "border-border/60 text-ink-soft hover:border-coral hover:text-coral"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </FadeUp>
          )}

          <div className="space-y-6">
            {visible.map((article, i) => (
              <FadeUp key={article.slug} delay={0.1 + i * 0.05}>
                <Link
                  to="/en/articles/$slug"
                  params={{ slug: article.slug }}
                  className="group block rounded-2xl border border-border/60 bg-card p-7 md:p-8 hover:border-coral/50 transition-colors"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-coral-deep mb-3">
                    {formatDate(article.date)}
                  </p>
                  <h2 className="font-display text-2xl mb-2 group-hover:text-coral-deep transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-ink-soft leading-relaxed mb-4">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm text-coral-deep font-medium">
                    Read
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <EnFooter />
    </main>
  );
}
