// Standalone Vite SPA build for GitHub Pages.
// Bypasses the TanStack Start (SSR/Worker) plugin and emits a plain
// static index.html + JS/CSS bundle that GH Pages can serve as-is.
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
    outDir: "dist-ghpages",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.spa.html"),
    },
  },
  base: "/",
});
