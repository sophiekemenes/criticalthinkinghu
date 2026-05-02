import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// Stand-alone client-side entry for static hosting (e.g. GitHub Pages).
// TanStack Start normally renders on the server; on GH Pages there is no
// server, so we mount the router directly in the browser.
const router = getRouter();

// Use the current location as the initial route so deep links work after
// the 404.html SPA fallback redirects back to "/".
if (typeof window !== "undefined") {
  const path = window.location.pathname + window.location.search + window.location.hash;
  router.history = createMemoryHistory({ initialEntries: [path || "/"] }) as never;
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root element not found");

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
