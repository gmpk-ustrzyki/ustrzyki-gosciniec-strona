// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image'],

  app: {
    head: {
      title: 'Pokoje w gościńcu, Domek na wynajem, Noclegi w Bieszczadach',
      meta: [
        { name: 'title', content: 'Pokoje w gościńcu, Domek na wynajem, Noclegi w Bieszczadach' },
        { name: 'description', content: 'Gościniec pod Małym Królem – przytulny pensjonat w sercu Bieszczadów z pięknym widokiem na góry. Idealne miejsce na spokojny wypoczynek i górskie wędrówki.' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ustrzyki-nocleg.pl/' },
        { property: 'og:title', content: 'Pokoje w gościńcu, Domek na wynajem, Noclegi w Bieszczadach' },
        { property: 'og:description', content: 'Gościniec pod Małym Królem – przytulny pensjonat w sercu Bieszczadów z pięknym widokiem na góry. Idealne miejsce na spokojny wypoczynek i górskie wędrówki.' },
        { property: 'og:image', content: 'https://ustrzyki-nocleg.pl/metazdj.png' },

        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://ustrzyki-nocleg.pl/' },
        { property: 'twitter:title', content: 'Pokoje w gościńcu, Domek na wynajem, Noclegi w Bieszczadach' },
        { property: 'twitter:description', content: 'Gościniec pod Małym Królem – przytulny pensjonat w sercu Bieszczadów z pięknym widokiem na góry. Idealne miejsce na spokojny wypoczynek i górskie wędrówki.' },
        { property: 'twitter:image', content: 'https://ustrzyki-nocleg.pl/metazdj.png' }
      ],
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