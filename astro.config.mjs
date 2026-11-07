import { defineConfig } from "astro/config";

export default defineConfig({
  // The Vercel address for now; change to the Live Sexy Now domain once it is bought.
  site: "https://jody-website.vercel.app",
  build: { format: "directory" },
});
