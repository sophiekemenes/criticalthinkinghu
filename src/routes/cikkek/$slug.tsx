import { Children, cloneElement, isValidElement, type ComponentType, type ComponentPropsWithoutRef, type ReactElement } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getArticleBySlug } from "@/content/articles";
import { SelfCheckArticle } from "@/components/site/articles/SelfCheckArticle";
import { ArticleLayout } from "@/components/site/articles/ArticleLayout";

// Slug -> egyedi komponens leképezés a "custom": true manifest-bejegyzésekhez
// (nem prózai, saját layoutú cikkek). Új ilyen cikknél: komponens a
// src/components/site/articles/ alá, manifestben "custom": true, és egy
// új sor ide.
const customArticleComponents: Record<string, ComponentType> = {
  "self-check-ai": SelfCheckArticle,
};

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

// Markdown-ban egy önálló sorban álló kép mindig <p>-be csomagolva jön a
// react-markdown-tól — de a <figure> blokk-elem, <p>-n belül érvénytelen
// HTML lenne (a böngésző a parse-oláskor lezárná előtte a <p>-t, ami SSR/CSR
// hidratáció-eltérést okozna). Ezért a <p>-t magát cseréljük <figure>-re,
// amikor az egyetlen gyereke egy kép — a <figcaption> az alt szöveget adja
// vissza, ami így látható képaláírás is lesz, nem csak accessibility-adat.
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

function ArticlePage() {
  const article = Route.useLoaderData();

  if (article.custom) {
    const CustomArticle = customArticleComponents[article.slug];
    return CustomArticle ? <CustomArticle /> : null;
  }

  const body = articleBodies[`/src/content/articles/${article.slug}.md`];

  return (
    <ArticleLayout
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
