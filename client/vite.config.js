import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/notes": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        bypass(req) {
          if (req.url.endsWith(".html")) {
            return req.url;
          }
        },
      },
      "/dashboard-summary": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/tasks": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        bypass(req) {
          if (req.url.endsWith(".html")) {
            return req.url;
          }
        },
      },
    },
  },
});
