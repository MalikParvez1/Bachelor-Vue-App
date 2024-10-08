import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        short_name: 'Vue PWA',
        name: 'Vue PWA',
        icons: [
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#5f9ea0',
        background_color: '#5f9ea0',
      },
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin || url.pathname.endsWith('.png'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images',
            },
          },
        ],
      }
    }),
  ],
});
