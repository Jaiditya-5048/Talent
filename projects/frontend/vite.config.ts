import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// @ alias points to /src for cleaner imports like "@/components/Button"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    port: 5175,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // this makes @/ map to src/
    },
  },
});
