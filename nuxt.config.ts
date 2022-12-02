// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      baseURL: process.env.APP_BASE_URL || 'https://63735c53348e9472990a3d1a.mockapi.io/',
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
});
