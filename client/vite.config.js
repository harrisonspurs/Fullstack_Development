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
        index: resolve(__dirname, "index.html"),
        import: resolve(__dirname, "import.html"),
        guide: resolve(__dirname, "guide.html"),
        about: resolve(__dirname, "about.html"),
      },
    },
  },
});

