import { defineConfig } from "astro/config";

export default defineConfig({
  // Change to the new site's real address.
  site: "https://example.com",
  build: { format: "directory" },
});
