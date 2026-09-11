import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Exposes to local network so Android phone can connect immediately
    port: 5173,
    allowedHosts: true, // Allows public tunnels like localhost.run, pinggy, ngrok
  },
});
