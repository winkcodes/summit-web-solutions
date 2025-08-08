// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://summitweb.solutions',
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: ['localhost'],
    remotePatterns: [{ protocol: 'https' }],
  },
  compressHTML: true,
});
