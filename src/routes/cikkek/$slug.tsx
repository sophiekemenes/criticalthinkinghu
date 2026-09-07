import { createFileRoute, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getArticleBySlug } from "@/content/articles";
import { SelfCheckArticle } from "@/components/site/articles/SelfCheckArticle";
import { ArticleLayout } from "@/components/site/articles/ArticleLayout";

// Nyers markdown-törzsek build-time betöltése — az "as: 'raw'" glob-opció
// helyett a Vite 5+ ajánlott "?raw" query-formáját használjuk.
const articleBodies = import.meta.glob("/src/content/articles/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const Route = createFileRoute("/cikkek/$slug")({
  head: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) return { meta: [{ title: "Cikk nem található — criticalthinking.hu" }] };
    return {
      meta: [
        { title: `${article.title} — criticalthinking.hu` },
        { name: "description", content: article.description },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-ink-soft">
      Ez a cikk nem található.
    </div>
  ),
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return article;
  },
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" });
}

function ArticlePage() {
  const article = Route.useLoaderData();

  if (article.custom) {
    return <SelfCheckArticle />;
  }

  const body = articleBodies[`/src/content/articles/${article.slug}.md`];

  return (
    <ArticleLayout
      title={article.title}
      subtitle={article.subtitle}
      dateLabel={formatDate(article.date)}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {body ?? ""}
      </ReactMarkdown>
    </ArticleLayout>
  );
}
