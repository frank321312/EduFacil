import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'url-validator',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            decodeURI(req.url); // Intenta decodificar para verificar la URL
            next(); // La URL es válida, continúa
          } catch (error) {
            console.error("Error: URL malformada detectada:", req.url);
            res.statusCode = 400;
            res.writeHead(302, { Location: '/url-invalido' });
            res.end()
          }
        });
      },
    },
    react()
  ],
});