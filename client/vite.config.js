import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "chat-box",
        short_name: "chat-box",
        description: "My messaging app",
        theme_color: "#ffffff",
        icons: [
          {
            src: "./chat-logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./chat-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./chat-logo.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: false,
    proxy: {
      "/subscriptions": {
        target: `wss://localhost:${process.env.PORT || 3001}/graphql`,
        changeOrigin: true,
        secure: false,
      },
      "/graphql": {
        target: `http://localhost:${process.env.PORT || 3001}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Production-specific configuration
  build: {
    // Options for production build
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Enables automatic code splitting
      },
    },
  },
  optimizeDeps: {
    include: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/fontawesome-free",
      "@fortawesome/react-fontawesome",
    ],
  },
});
