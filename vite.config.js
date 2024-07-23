import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },
    manifest: {
        short_name: 'Vue PWA',
        name: 'Vue PWA',
        icons: [
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#5f9ea0',
        background_color: '#5f9ea0'
      ,
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /.*\.vue$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'vue-cache',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Tage
            },
          },
        },
        {
          urlPattern: /.*\.js$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'js-cache',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Tage
            },
          },
        },
        {
          urlPattern: /.*\.css$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'css-cache',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Tage
            },
          },
        },
        {
          urlPattern: /.*\.(png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 24 * 60 * 60, // 60 Tage
            },
          },
        },
      ]
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})