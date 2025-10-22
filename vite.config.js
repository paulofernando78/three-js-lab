import { defineConfig } from "vite";
import path from "path";

export default defineConfig ({
  server: {
    historyApiFallback: true, // permite SPA routing com history API
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./public/assets"),
      "@css": path.resolve(__dirname, "./src/css"),
      "@js": path.resolve(__dirname, "./src/js"),
      "@components": path.resolve(__dirname, "./src/js/components"),
      "@utils": path.resolve(__dirname, "./src/js/utils"),
    },
  },
});
