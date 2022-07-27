import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const rootDir = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    partytown({      
      config: {
        // Adds dataLayer.push as a forwarding-event.
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
  },
});