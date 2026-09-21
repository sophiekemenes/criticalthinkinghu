import raw from "./articles.en.json";
import type { Article } from "./articles";

// English counterpart of articles.ts / articles.json — kept as a parallel
// manifest (not a locale field on the same records) because HU and EN
// articles can go live independently and even carry different slugs
// (English titles get proper English URLs instead of transliterated
// Hungarian ones). See src/routes/en/ for the routes that consume this.
const articlesEn = raw as Article[];

export function getAllArticlesEn(): Article[] {
  return [...articlesEn].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getArticleEnBySlug(slug: string): Article | undefined {
  return articlesEn.find((a) => a.slug === slug);
}
