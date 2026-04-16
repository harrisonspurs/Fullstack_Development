import { defineConfig } from "vite";

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
});

