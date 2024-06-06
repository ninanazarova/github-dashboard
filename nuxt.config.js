import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  mode: 'spa',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
  },
  loading: { color: '#fff' },
  css: [
    { lang: 'css', src: 'assets/style/main.css' },
    { lang: 'css', src: 'public/fonts/montserrat.css' },
  ],
  modules: ['@pinia/nuxt', 'nuxt-viewport'],
  pinia: {
    autoImports: ['defineStore'],
  },
  build: {
    extend(config, ctx) {},
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
});
