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
    server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' from the path if needed
      },
    },
  },
});
