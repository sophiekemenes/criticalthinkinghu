import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// Stand-alone client-side entry for static hosting (e.g. GitHub Pages).
// TanStack Start normally renders on the server; on GH Pages there is no
// server, so we mount the router directly in the browser. The static HTML
// itself is produced at build time by scripts/prerender-ghpages.mjs using
// the same route-resolution logic (see src/entry-prerender.tsx) — so here we
// hydrate onto that markup rather than blind-rendering, to avoid a flash of
// empty content and hydration mismatches.
const router = getRouter();

// Use the current location as the initial route so deep links work after
// the 404.html SPA fallback redirects back to "/".
if (typeof window !== "undefined") {
  const path = window.location.pathname + window.location.search + window.location.hash;
  // router.update() (not a raw `router.history = ...` assignment) so the
  // router's init logic actually re-derives latestLocation/stores from the
  // new history — matches the same call used in entry-prerender.tsx.
  router.update({ history: createMemoryHistory({ initialEntries: [path || "/"] }) as never });
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root element not found");

await router.load();

hydrateRoot(
  rootEl,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
