import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
  experimental: {
    integrations: true,
  },
  integrations: [
    react(),
    webmanifest({
      name: "Periodic Notifier", // required
      short_name: "Periodic Notifier",
      description: "Um simples app para notificar de tempos em tempos",
      start_url: "/",
      theme_color: "#333",
      background_color: "#FFF",
      display: "standalone",
    }),
  ],
});
