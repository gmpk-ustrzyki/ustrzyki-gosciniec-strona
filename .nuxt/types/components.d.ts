
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'Address': typeof import("../../app/components/Address.vue")['default']
  'BookingFilter': typeof import("../../app/components/BookingFilter.vue")['default']
  'Email': typeof import("../../app/components/Email.vue")['default']
  'FacebookFeed': typeof import("../../app/components/FacebookFeed.vue")['default']
  'FallingLeaves': typeof import("../../app/components/FallingLeaves.vue")['default']
  'ListImage': typeof import("../../app/components/ListImage.vue")['default']
  'Logo': typeof import("../../app/components/Logo.vue")['default']
  'NavLink': typeof import("../../app/components/NavLink.vue")['default']
  'Phone': typeof import("../../app/components/Phone.vue")['default']
  'SectionsAboutUs': typeof import("../../app/components/sections/AboutUs.vue")['default']
  'SectionsHero': typeof import("../../app/components/sections/Hero.vue")['default']
  'SectionsKontakt': typeof import("../../app/components/sections/Kontakt.vue")['default']
  'SectionsMap': typeof import("../../app/components/sections/Map.vue")['default']
  'SectionsNavigation': typeof import("../../app/components/sections/Navigation.vue")['default']
  'SectionsOptions': typeof import("../../app/components/sections/Options.vue")['default']
  'SectionsReviews': typeof import("../../app/components/sections/Reviews.vue")['default']
  'SectionsTrailsMap': typeof import("../../app/components/sections/TrailsMap.vue")['default']
  'SectionsUdogodnienia': typeof import("../../app/components/sections/Udogodnienia.vue")['default']
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
  'NuxtPicture': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyAddress': LazyComponent<typeof import("../../app/components/Address.vue")['default']>
  'LazyBookingFilter': LazyComponent<typeof import("../../app/components/BookingFilter.vue")['default']>
  'LazyEmail': LazyComponent<typeof import("../../app/components/Email.vue")['default']>
  'LazyFacebookFeed': LazyComponent<typeof import("../../app/components/FacebookFeed.vue")['default']>
  'LazyFallingLeaves': LazyComponent<typeof import("../../app/components/FallingLeaves.vue")['default']>
  'LazyListImage': LazyComponent<typeof import("../../app/components/ListImage.vue")['default']>
  'LazyLogo': LazyComponent<typeof import("../../app/components/Logo.vue")['default']>
  'LazyNavLink': LazyComponent<typeof import("../../app/components/NavLink.vue")['default']>
  'LazyPhone': LazyComponent<typeof import("../../app/components/Phone.vue")['default']>
  'LazySectionsAboutUs': LazyComponent<typeof import("../../app/components/sections/AboutUs.vue")['default']>
  'LazySectionsHero': LazyComponent<typeof import("../../app/components/sections/Hero.vue")['default']>
  'LazySectionsKontakt': LazyComponent<typeof import("../../app/components/sections/Kontakt.vue")['default']>
  'LazySectionsMap': LazyComponent<typeof import("../../app/components/sections/Map.vue")['default']>
  'LazySectionsNavigation': LazyComponent<typeof import("../../app/components/sections/Navigation.vue")['default']>
  'LazySectionsOptions': LazyComponent<typeof import("../../app/components/sections/Options.vue")['default']>
  'LazySectionsReviews': LazyComponent<typeof import("../../app/components/sections/Reviews.vue")['default']>
  'LazySectionsTrailsMap': LazyComponent<typeof import("../../app/components/sections/TrailsMap.vue")['default']>
  'LazySectionsUdogodnienia': LazyComponent<typeof import("../../app/components/sections/Udogodnienia.vue")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
