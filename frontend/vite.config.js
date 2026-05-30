import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",

    globals: true,   // IMPORTANT

    setupFiles: "./src/setupTests.js",

    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",        // IMPORTANT: keep Playwright out
    ],
  },
});