// Post-build step for the GitHub Pages static site.
//
// vite.config.ghpages.ts produces a plain client bundle whose index.spa.html
// only contains an empty <div id="root"> plus the built <script>/<link>
// tags. This script renders each known route to real HTML (via the Node SSR
// bundle built from vite.config.ghpages.ssr.ts) and writes a fully-formed
// static index.html per route, so crawlers get actual content without
// running JS.
//
// The app's root route (src/routes/__root.tsx) defines a `shellComponent`
// that renders the *entire* document (<html><head>...<body>...</body></html>),
// matching how TanStack Start's real SSR entry works — so renderToString()
// here already returns a complete HTML document, not a fragment to inject
// into a div. <Scripts /> inside that shell has no build-manifest knowledge
// in this bypassed context, so it renders no asset tags — we splice in the
// <script>/<link> tags Vite already generated in index.spa.html ourselves.
//
// Run order (see package.json "build:ghpages"):
//   1. vite build --config vite.config.ghpages.ts       -> dist-ghpages/
//   2. vite build --config vite.config.ghpages.ssr.ts   -> dist-ghpages-ssr/
//   3. node scripts/prerender-ghpages.mjs                -> rewrites dist-ghpages/

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, "..");
const distDir = path.join(projectRoot, "dist-ghpages");
const ssrDir = path.join(projectRoot, "dist-ghpages-ssr");
const templatePath = path.join(distDir, "index.spa.html");

// Route list is derived from src/content/articles.json (+ the English
// counterpart, articles.en.json) instead of being hand-maintained here —
// adding a new article to either manifest is enough to get it prerendered,
// no edit to this file needed.
// Title/description come from each route's own head() config (rendered via
// <HeadContent /> inside the SSR output) — no override needed here.
async function buildRoutes() {
  const manifestPath = path.join(projectRoot, "src", "content", "articles.json");
  const articles = JSON.parse(await readFile(manifestPath, "utf-8"));
  const manifestPathEn = path.join(projectRoot, "src", "content", "articles.en.json");
  const articlesEn = JSON.parse(await readFile(manifestPathEn, "utf-8"));

  return [
    { path: "/", outFile: "index.html" },
    { path: "/encoding-test", outFile: "encoding-test/index.html" },
    { path: "/cikkek", outFile: "cikkek/index.html" },
    { path: "/penzugyi-onvedelem", outFile: "penzugyi-onvedelem/index.html" },
    ...articles.map((a) => ({
      path: `/cikkek/${a.slug}`,
      outFile: `cikkek/${a.slug}/index.html`,
    })),
    { path: "/en", outFile: "en/index.html" },
    { path: "/en/articles", outFile: "en/articles/index.html" },
    ...articlesEn.map((a) => ({
      path: `/en/articles/${a.slug}`,
      outFile: `en/articles/${a.slug}/index.html`,
    })),
  ];
}

async function main() {
  const ROUTES = await buildRoutes();
  const { renderPage } = await import(
    // Dynamic import() requires a file:// URL on Windows (a bare "C:\..."
    // path throws ERR_UNSUPPORTED_ESM_URL_SCHEME under the default ESM loader).
    pathToFileURL(path.join(ssrDir, "entry-prerender.js")).href
  );

  // The module <script> tag needs splicing in — <Scripts/> has no build
  // manifest in this bypassed context. The local stylesheet <link>'s href
  // also needs correcting: __root.tsx's head() `links` config renders its
  // own <link> via <HeadContent/>, but the client build (vite.config.ghpages.ts)
  // and this SSR build (vite.config.ghpages.ssr.ts) are two independent
  // Tailwind compilations whose content hashes for styles.css can differ —
  // observed in practice as a stale hash baked into the SSR output pointing
  // at a CSS file that doesn't exist in dist-ghpages/ (404 on the live site).
  // We only patch the href value in place (not the whole tag): the SSR
  // <Asset> render has no `crossorigin` attribute, and swapping in Vite's
  // own manifest tag (which does carry `crossorigin`) creates a *different*
  // hydration mismatch — the client's own <Asset> re-render also omits it.
  const template = await readFile(templatePath, "utf-8");
  const scriptTag = template.match(/<script type="module"[^>]*><\/script>/)?.[0];
  if (!scriptTag) {
    throw new Error(
      "Could not find the built <script> tag in index.spa.html — did the Vite output shape change?",
    );
  }
  const cssHref = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*\/?>/)?.[1];
  if (!cssHref) {
    throw new Error(
      "Could not find the built local stylesheet <link> in index.spa.html — did the Vite output shape change?",
    );
  }
  const ssrCssHrefPattern = /(<link rel="stylesheet"[^>]*href=")\/assets\/[^"]+\.css("[^>]*\/?>)/;

  for (const route of ROUTES) {
    const appHtml = await renderPage(route.path);
    const withCorrectCss = ssrCssHrefPattern.test(appHtml)
      ? appHtml.replace(ssrCssHrefPattern, `$1${cssHref}$2`)
      : appHtml.replace("</head>", `<link rel="stylesheet" href="${cssHref}"></head>`);
    const withAssets = withCorrectCss.replace("</body>", `${scriptTag}</body>`);
    const page = `<!doctype html>\n${withAssets}\n`;

    const outPath = path.join(distDir, route.outFile);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, page, "utf-8");
    console.log(`prerendered ${route.path} -> dist-ghpages/${route.outFile}`);
  }

  // index.spa.html itself was only a template; the real entry points are
  // the per-route files written above. Remove it so it doesn't ship as dead
  // weight (and so it can't shadow dist-ghpages/index.html).
  await rm(templatePath, { force: true });
  await rm(ssrDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
