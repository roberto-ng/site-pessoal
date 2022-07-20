import { defineConfig } from 'astro/config';

import partytown from "@astrojs/partytown";

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
});