const DEFAULT_BASE_URL = 'https://63735c53348e9472990a3d1a.mockapi.io/';

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      baseURL: process.env.APP_BASE_URL || DEFAULT_BASE_URL,
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
});
