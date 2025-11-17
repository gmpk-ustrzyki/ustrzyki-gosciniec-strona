
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


export const Address: typeof import("../app/components/Address.vue")['default']
export const BookingFilter: typeof import("../app/components/BookingFilter.vue")['default']
export const Email: typeof import("../app/components/Email.vue")['default']
export const FacebookFeed: typeof import("../app/components/FacebookFeed.vue")['default']
export const FallingLeaves: typeof import("../app/components/FallingLeaves.vue")['default']
export const ListImage: typeof import("../app/components/ListImage.vue")['default']
export const Logo: typeof import("../app/components/Logo.vue")['default']
export const NavLink: typeof import("../app/components/NavLink.vue")['default']
export const Phone: typeof import("../app/components/Phone.vue")['default']
export const SectionsAboutUs: typeof import("../app/components/sections/AboutUs.vue")['default']
export const SectionsHero: typeof import("../app/components/sections/Hero.vue")['default']
export const SectionsKontakt: typeof import("../app/components/sections/Kontakt.vue")['default']
export const SectionsMap: typeof import("../app/components/sections/Map.vue")['default']
export const SectionsNavigation: typeof import("../app/components/sections/Navigation.vue")['default']
export const SectionsOptions: typeof import("../app/components/sections/Options.vue")['default']
export const SectionsReviews: typeof import("../app/components/sections/Reviews.vue")['default']
export const SectionsTrailsMap: typeof import("../app/components/sections/TrailsMap.vue")['default']
export const SectionsUdogodnienia: typeof import("../app/components/sections/Udogodnienia.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAddress: LazyComponent<typeof import("../app/components/Address.vue")['default']>
export const LazyBookingFilter: LazyComponent<typeof import("../app/components/BookingFilter.vue")['default']>
export const LazyEmail: LazyComponent<typeof import("../app/components/Email.vue")['default']>
export const LazyFacebookFeed: LazyComponent<typeof import("../app/components/FacebookFeed.vue")['default']>
export const LazyFallingLeaves: LazyComponent<typeof import("../app/components/FallingLeaves.vue")['default']>
export const LazyListImage: LazyComponent<typeof import("../app/components/ListImage.vue")['default']>
export const LazyLogo: LazyComponent<typeof import("../app/components/Logo.vue")['default']>
export const LazyNavLink: LazyComponent<typeof import("../app/components/NavLink.vue")['default']>
export const LazyPhone: LazyComponent<typeof import("../app/components/Phone.vue")['default']>
export const LazySectionsAboutUs: LazyComponent<typeof import("../app/components/sections/AboutUs.vue")['default']>
export const LazySectionsHero: LazyComponent<typeof import("../app/components/sections/Hero.vue")['default']>
export const LazySectionsKontakt: LazyComponent<typeof import("../app/components/sections/Kontakt.vue")['default']>
export const LazySectionsMap: LazyComponent<typeof import("../app/components/sections/Map.vue")['default']>
export const LazySectionsNavigation: LazyComponent<typeof import("../app/components/sections/Navigation.vue")['default']>
export const LazySectionsOptions: LazyComponent<typeof import("../app/components/sections/Options.vue")['default']>
export const LazySectionsReviews: LazyComponent<typeof import("../app/components/sections/Reviews.vue")['default']>
export const LazySectionsTrailsMap: LazyComponent<typeof import("../app/components/sections/TrailsMap.vue")['default']>
export const LazySectionsUdogodnienia: LazyComponent<typeof import("../app/components/sections/Udogodnienia.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
