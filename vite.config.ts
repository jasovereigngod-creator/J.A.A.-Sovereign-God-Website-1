import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const rootDir = typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : path.resolve();

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          about: path.resolve(rootDir, 'about.html'),
          services: path.resolve(rootDir, 'services.html'),
          equipment: path.resolve(rootDir, 'equipment.html'),
          training: path.resolve(rootDir, 'training.html'),
          sitemap: path.resolve(rootDir, 'sitemap.html'),
          contact: path.resolve(rootDir, 'contact.html'),
          faq: path.resolve(rootDir, 'faq.html'),
          privacy: path.resolve(rootDir, 'privacy.html'),
          terms: path.resolve(rootDir, 'terms.html'),
          accessibility: path.resolve(rootDir, 'accessibility.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
