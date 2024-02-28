import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "autoUpdate",

  manifest: {
    name: 'Chat-box',
    short_name: 'Chat-box',
    description: 'My messaging app',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: './public/chat-logo1.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      }
    ]
  }
})],
  server: {
    port: 3000,
    open: false,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
