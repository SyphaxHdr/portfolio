// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://syphaxhdr.github.io',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
});
