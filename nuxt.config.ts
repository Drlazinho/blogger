// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  runtimeConfig: {
    privateKey: 'secretKey',
    country_key_secret: process.env.COUNTRY_KEY,
    public: {
      API_URL: process.env.API_URL,
      API_BASE_URL: process.env.API_BASE_URL
    }
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt']
})