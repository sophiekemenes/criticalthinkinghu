import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// Stand-alone client-side entry for static hosting (e.g. GitHub Pages).
// TanStack Start normally renders on the server; on GH Pages there is no
// server, so we mount the router directly in the browser. The static HTML
// itself is produced at build time by scripts/prerender-ghpages.mjs using
// the same route-resolution logic (see src/entry-prerender.tsx) — so here we
// hydrate onto that markup rather than blind-rendering, to avoid a flash of
// empty content and hydration mismatches.
//
// No manual history setup needed: when createRouter() runs in a browser
// (not SSR) without an explicit `history` option, TanStack Router already
// defaults to a real createBrowserHistory() reading window.location — which
// both correctly resolves deep links (e.g. after the 404.html SPA fallback
// serves "/" for an unprerendered path) *and*, unlike createMemoryHistory,
// keeps the address bar/back-forward/bookmarking in sync with in-app
// <Link> navigation. An earlier version of this file manually overrode
// this with createMemoryHistory(), which silently broke exactly that sync
// once a second real route (the /cikkek/self-check-ai article) existed.
const router = getRouter();

// The root route's shellComponent (src/routes/__root.tsx) renders the whole
// document (<html><head>...<body>...</body></html>) — same as
// entry-prerender.tsx's renderToString() output. So there is no separate
// "#root" div to target: we hydrate against `document` itself, which is the
// React API for a component tree whose root element is <html>.
await router.load();

hydrateRoot(
  document,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
