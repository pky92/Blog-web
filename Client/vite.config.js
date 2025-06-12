import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'tailwindcss/version.js': 'tailwindcss/package.json', // Redirect to a valid file
    },
  },
  build: {
    rollupOptions: {
      external: ['tailwindcss/version.js'], // Exclude from Rollup build
    },
  },
});
