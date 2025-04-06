// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  nitro: {
    devProxy: {
      "/api/": {
        target: "http://localhost:3333", // Backend
        changeOrigin: true,
      },
    },
  },
  compatibilityDate: '2024-11-01',
  pages: true,
  css: ['.assets/css/main.css','vuetify/styles'],
  build: {
    transpile: ['vuetify']
  },
  runtimeConfig: {
    public: {
      baseURL:   'http://localhost:3000',
      apiUrl: import.meta.env.URL_API
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/content'
  ]
})