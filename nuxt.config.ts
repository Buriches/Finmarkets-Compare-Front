export default defineNuxtConfig({
  $development: {
    modules: ['nuxt-icon', '@pinia/nuxt'],

  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/index.scss" as *;'
        }
      }
    }
  },
  serverMiddleware: [
    {
      path: '/static',
      handler: '~/static',
    },
  ],
  modules: ['nuxt-icon', '@pinia/nuxt'],
  router: {}
})