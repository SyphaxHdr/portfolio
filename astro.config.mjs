// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://syphaxhdr.github.io',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
  fonts: [
    {
      name: 'Instrument Sans',
      cssVariable: '--font-instrument-sans',
      provider: fontProviders.fontsource(),
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      provider: fontProviders.fontsource(),
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.fontsource(),
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
});
