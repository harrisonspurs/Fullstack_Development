import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    proxy: {
      "/getSessions": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/addSession": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/pages/index.html"),
        import: resolve(__dirname, "src/pages/import.html"),
        guide: resolve(__dirname, "src/pages/guide.html"),
        about: resolve(__dirname, "src/pages/about.html"),
      },
    },
  },
});

