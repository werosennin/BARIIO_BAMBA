import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Barrio Bamba — Vite config
// `npm run dev`     → servidor de desarrollo (con recarga en vivo)
// `npm run build`   → genera dist/index.html EN UN SOLO ARCHIVO autocontenido
//                     (todo el CSS/JS/logo incrustado) que se abre con doble clic,
//                     sin necesidad de servidor (file://).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    // Incrusta también las imágenes (logo) como data-URI dentro del HTML.
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    assetsDir: '.',
  },
  server: { port: 5173, open: true },
});
