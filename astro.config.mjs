import { defineConfig } from 'astro/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

const rootDir = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), solidJs()],
  site: 'https://robertonazareth.dev/',
  output: 'static',
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
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'pt-pt'],
    routing: {
      prefixDefaultLocale: true,
    },
    fallback: {
      'pt-pt': 'pt-br',
    },
  },
});
