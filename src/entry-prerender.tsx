import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { getRouter } from "./router";

// Node-side render used only at GitHub Pages build time (see
// scripts/prerender-ghpages.mjs). Resolves the route tree for a given path
// and returns the fully rendered HTML string, so the static index.html
// shipped to GitHub Pages contains real content instead of an empty
// <div id="root">.
export async function renderPage(path: string): Promise<string> {
  const router = getRouter();
  // Use router.update() (not a raw `router.history = ...` assignment) so the
  // router's own init logic runs — that's what actually creates
  // router.stores from the new history/location. A bare property assignment
  // skips that and router.load() throws (stores stays undefined).
  router.update({ history: createMemoryHistory({ initialEntries: [path] }) as never });
  await router.load();
  return renderToString(<RouterProvider router={router} />);
}
