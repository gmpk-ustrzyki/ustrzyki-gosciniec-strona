// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64x64.png?v=2' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=2' }
      ]
    }
  }
})