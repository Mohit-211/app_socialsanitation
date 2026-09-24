import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // The API's CORS allow-list rejects http://localhost:3000 with a 500;
    // 5173 is allowed.
    port: 5173,
  },
  resolve: {
    tsconfigPaths: true,
  },
});
