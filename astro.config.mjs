import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
const rootDir = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '@': rootDir
      }
    },
    server: {
      hmr: {
        host: 'localhost'
      }
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula-soft'
    }
  },
  site: 'https://robertonazareth.dev/'
});