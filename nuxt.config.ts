// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  debug: true,
  build: {
    transpile: ['trpc-nuxt'],
  },
  css: ['vue-final-modal/style.css'],
  modules: ['@nuxtjs/tailwindcss', // [
  //   '@nuxtjs/eslint-module',
  //   {
  //     // EsLint options
  //   }
  // ]
  [
    '@nuxtjs/i18n', {
      vueI18n: './i18n.config.ts'
    }
  ], '@pinia/nuxt'],
});
