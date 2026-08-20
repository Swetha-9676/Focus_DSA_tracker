import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  base: "./",

  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "manifest.json", dest: "." },
        { src: "background.js", dest: "." },
        { src: "contentScript.js", dest: "." },
        { src: "src/analytics/**/*", dest: "src/analytics" },

        // Copy icons to dist/icons
        { src: "icons/*.png", dest: "." },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        dashboard: resolve(__dirname, "dashboard.html"),
      },
    },
  },
});