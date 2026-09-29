import { WD_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://cheatsforwardogs.net'
export const SITE_NAME = 'Wardogs Cheats'
export const SITE_HOST = 'cheatsforwardogs.net'

export const SITE_LOCALE = 'en'
export const SITE_MARKET = 'Worldwide'
export const GAME_NAME = 'Wardogs'
export const ANTI_CHEAT_NAME = 'Elytra Anti-Cheat'
export const CHECKOUT_URL =
  'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fwardogs'

/** Stable site identity — Organization, WebSite, and about copy (not per-route). */
export const SITE_PURPOSE =
  'Wardogs Cheats is a single-game site focused on Wardogs aimbot, ESP, radar, and related PC tools. The site is dedicated to Wardogs only and does not sell cheats for other games.'

/** Site-wide subject terms for schema knowsAbout (max 6). */
export const SITE_ABOUT = [
  'Wardogs cheats',
  'Wardogs',
  'Wardogs ESP',
  'Wardogs aimbot',
  'Wardogs radar',
  'Wardogs cheat setup',
] as const

/** Legitimate brand variants only — not a meta keyword list. */
export const ORGANIZATION_ALTERNATE_NAMES = [
  'Wardogs Cheats',
  'Wardogs cheats',
  'cheatsforwardogs',
  'cheatsforwardogs.net',
] as const

/**
 * Short intent-specific terms per main route (3–6 each). Not rendered as meta keywords.
 */
export const SEO_ROUTE_INTENTS = {
  home: ['Wardogs cheats', 'wardogs cheats', 'Wardogs aimbot', 'Wardogs ESP', 'wardogs anti cheat'],
  product: ['wardogs cheats', 'Wardogs features', 'Wardogs store', 'Wardogs setup'],
  featuresHub: ['Wardogs cheat features', 'Wardogs aimbot', 'Wardogs vehicle ESP'],
  reviews: ['Wardogs Cheats reviews', 'Wardogs buyer feedback'],
  forums: ['Wardogs intel', 'wardogs cheats', 'wardogs anti cheat', 'Wardogs setup'],
  faq: ['Wardogs Cheats FAQ', 'Wardogs setup questions'],
} as const

/** Product JSON-LD description (features + delivery — distinct from SITE_PURPOSE). */
export const PRODUCT_SCHEMA_DESCRIPTION =
  'Windows PC menu for Wardogs with aimbot, player ESP, vehicle ESP, 2D radar, no recoil, no spread, full bright, custom crosshair, configs, and digital license delivery.'

/** Offer price shown on product schema + purchase UI (lowest plan). */
export const PRODUCT_PRICE_USD = '35'

export const PRODUCT_LIFETIME_PRICE_USD = '150'

export const PRODUCT_PLANS = [
  { id: 'monthly', label: 'Monthly', priceUsd: PRODUCT_PRICE_USD, duration: 'P30D' },
  {
    id: 'lifetime',
    label: 'Lifetime',
    priceUsd: PRODUCT_LIFETIME_PRICE_USD,
    duration: 'P99Y',
  },
] as const

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'English' },
] as const

export const OG_IMAGE = WD_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  image?: string
  imageAlt?: string
  robots?: string
}

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SEO = {
  home: {
    title: 'Wardogs Cheats | Aimbot, ESP and Radar',
    description:
      'Buy Wardogs cheats for Windows PC. Aimbot, player ESP, vehicle ESP, radar, no recoil, no spread, and full bright with advanced visual options and config system.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'Wardogs cheats gameplay with aimbot, player ESP, vehicle ESP, and radar on PC',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'Wardogs Intel | Wardogs Cheats',
    description:
      'Wardogs intel hub featuring guides, cheat features, aimbot settings, ESP customization, radar configuration, visual enhancements, and setup information.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'Wardogs ESP and radar gameplay screenshot from intel guides',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'Wardogs Cheats Reviews | Buyer Feedback',
    description:
      'Read Wardogs cheats reviews from users covering aimbot performance, ESP features, radar functionality, vehicle tracking, and overall experience.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'Wardogs cheats review screenshot with ESP and radar overlays',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'Wardogs FAQ | Wardogs Cheats',
    description:
      'Frequently asked questions about Wardogs cheats covering aimbot, ESP, radar, visual settings, configs, setup, and support.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'Wardogs player ESP overlay screenshot from FAQ',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'Wardogs Support | Wardogs Cheats',
    description:
      'Get support for Wardogs cheats on Discord including loader setup, configuration help, troubleshooting, and feature guidance after purchase.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'Wardogs cheat support and loader help',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'Wardogs Store | Wardogs Cheats',
    description:
      'Wardogs store for premium cheats. Get access to aimbot, ESP, radar, vehicle tracking, recoil control, and configuration profiles with instant delivery.',
    path: '/wardogs-cheats',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'Wardogs store page showing aimbot, ESP, vehicle tracking, and radar modules',
    robots: INDEX_ROBOTS,
  },
  features: {
    title: 'Wardogs Features | Wardogs Cheats',
    description:
      'Wardogs features include aimbot with prediction, visible check, smooth aim, player ESP, vehicle ESP, 2D radar, no recoil, no spread, full bright, and custom crosshair.',
    path: '/forums/features-list',
    ogType: 'article',
    image: PAGE_OG.forums,
    imageAlt: 'Wardogs cheat feature list with aimbot and ESP modules',
    robots: INDEX_ROBOTS,
  },
  setup: {
    title: 'Wardogs Setup | Wardogs Cheats',
    description:
      'Learn how Wardogs cheats work, configure aimbot, ESP, radar, and visual settings, and optimize your setup on Windows PC.',
    path: '/forums/complete-setup',
    ogType: 'article',
    image: PAGE_OG.forums,
    imageAlt: 'Wardogs cheat setup guide on Windows PC',
    robots: INDEX_ROBOTS,
  },
  status: {
    title: 'Wardogs Status | Wardogs Cheats',
    description:
      'Check the current status for Wardogs cheats. Stay updated on maintenance, updates, and feature availability before you load.',
    path: '/forums/load-status-checklist',
    ogType: 'article',
    image: PAGE_OG.forums,
    imageAlt: 'Wardogs loader status checklist before launch',
    robots: INDEX_ROBOTS,
  },
  preview: {
    title: 'Wardogs Preview | Wardogs Cheats',
    description:
      'Preview Wardogs cheats in action with aimbot, player ESP, vehicle ESP, radar, and visual enhancements before you checkout.',
    path: '/wardogs-cheats',
    ogType: 'website',
    image: PAGE_OG.product,
    imageAlt: 'Wardogs cheats preview with ESP, aimbot, and radar gameplay',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Wardogs Cheats',
  h2Features: 'Wardogs Cheats Features',
  h2HowItWorks: 'How Wardogs Cheats Work',
  h2Reviews: 'Wardogs Cheats Reviews',
  h2Forums: 'Wardogs Intel',
  h2Faq: 'Wardogs Cheats FAQ',
  h2Access: 'Ready when you are',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
