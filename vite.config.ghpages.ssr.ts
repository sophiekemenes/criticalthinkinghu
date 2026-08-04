// Node-targeted SSR build used only to produce the prerender bundle for the
// GitHub Pages static build (see scripts/prerender-ghpages.mjs). Kept as a
// separate config from vite.config.ghpages.ts so the SSR entry point doesn't
// clash with the client build's rollupOptions.input (index.spa.html).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-ghpages-ssr",
    emptyOutDir: true,
    ssr: path.resolve(__dirname, "./src/entry-prerender.tsx"),
    rollupOptions: {
      output: {
        entryFileNames: "entry-prerender.js",
      },
    },
  },
  ssr: {
    target: "node",
  },
});
