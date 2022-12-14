import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  css: [
    '@/assets/style/normalize.css',
    '@/assets/style/main.scss',
  ],
})
