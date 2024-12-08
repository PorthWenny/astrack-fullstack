import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // change according to server setup
    proxy: {
      "/api": "http://localhost:6969",
    },
  },
});
