import raw from "./articles.json";

// Egyetlen forrás az összes cikk metaadatához — ez hajtja a /cikkek listát,
// a dinamikus /cikkek/$slug route-ot, a főoldali "legújabb cikk" CTA-t és
// a GH Pages prerender-script route-generálását (lásd scripts/prerender-ghpages.mjs).
// Új cikk hozzáadásához: 1 db .md fájl a src/content/articles/ alá (kivéve
// "custom": true bejegyzéseknél, azoknak saját komponensük van) + 1 bejegyzés
// ebben a JSON-ban. Nincs több kézi route-fájl vagy ROUTES-bővítés.
export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  excerpt: string;
  date: string; // ISO, pl. "2026-09-07"
  categories: string[];
  /** Ha true, a cikknek saját, egyedi komponense van (lásd src/components/site/articles/),
   * nem a markdown-alapú ArticleLayout rendereli. */
  custom?: boolean;
}

const articles = raw as Article[];

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getLatestArticle(): Article {
  return getAllArticles()[0];
}
