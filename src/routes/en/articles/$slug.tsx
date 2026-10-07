import { Children, cloneElement, isValidElement, type ComponentType, type ComponentPropsWithoutRef, type ReactElement } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getArticleEnBySlug } from "@/content/articles.en";
import { SelfCheckArticleEn } from "@/components/site/articles/SelfCheckArticleEn";
import { ArticleLayout } from "@/components/site/articles/ArticleLayout";

// English mirror of src/routes/cikkek/$slug.tsx — see that file for the
// reasoning behind the <p>-vs-<figure> image handling and the manifest-driven
// custom-component dispatch. Kept as a separate route (not a lang param on
// the same one) because it reads from a different manifest / md folder and
// needs its own prerender entry.
const SITE_URL = "https://www.criticalthinking.hu";

const customArticleComponentsEn: Record<string, ComponentType> = {
  "3-signs-ai-thinking-for-you": SelfCheckArticleEn,
};

const articleBodiesEn = import.meta.glob("/src/content/articles-en/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const Route = createFileRoute("/en/articles/$slug")({
  head: ({ params }) => {
    const article = getArticleEnBySlug(params.slug);
    if (!article) return { meta: [{ title: "Article not found — criticalthinking.hu" }] };
    // Social sharing tags, same approach as the Hungarian route (see
    // src/routes/cikkek/$slug.tsx): per-article og:/twitter: tags override the
    // generic root ones, and the image URL must be absolute.
    const url = `${SITE_URL}/en/articles/${article.slug}/`;
    const image = article.image ? `${SITE_URL}${article.image}` : undefined;
    return {
      meta: [
        { title: `${article.title} — criticalthinking.hu` },
        { name: "description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
        ...(image
          ? [
              { property: "og:image", content: image },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
              ...(article.imageAlt
                ? [{ property: "og:image:alt", content: article.imageAlt }]
                : []),
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: ArticlePageEn,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-ink-soft">
      This article could not be found.
    </div>
  ),
  loader: ({ params }) => {
    const article = getArticleEnBySlug(params.slug);
    if (!article) throw notFound();
    return article;
  },
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function MarkdownParagraph({ children, ...props }: ComponentPropsWithoutRef<"p">) {
  const items = Children.toArray(children);
  const onlyChild = items.length === 1 ? items[0] : null;
  if (isValidElement(onlyChild) && onlyChild.type === "img") {
    const img = onlyChild as ReactElement<ComponentPropsWithoutRef<"img">>;
    return (
      <figure>
        {cloneElement(img, { loading: "lazy" })}
        {img.props.alt && <figcaption>{img.props.alt}</figcaption>}
      </figure>
    );
  }
  return <p {...props}>{children}</p>;
}

function ArticlePageEn() {
  const article = Route.useLoaderData();

  if (article.custom) {
    const CustomArticle = customArticleComponentsEn[article.slug];
    return CustomArticle ? <CustomArticle /> : null;
  }

  const body = articleBodiesEn[`/src/content/articles-en/${article.slug}.md`];

  return (
    <ArticleLayout
      lang="en"
      title={article.title}
      subtitle={article.subtitle}
      dateLabel={formatDate(article.date)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{ p: MarkdownParagraph }}
      >
        {body ?? ""}
      </ReactMarkdown>
    </ArticleLayout>
  );
}
