import { blogPath } from './blog-paths'
import { CHECKOUT_URL as SITE_CHECKOUT_URL } from './site'

/** Official Wardogs destinations for factual game context. */
export const OFFICIAL_GAME_LINKS = [
  {
    label: 'WARDOGS on Steam',
    href: 'https://store.steampowered.com/app/1867240/WARDOGS/',
    description: 'Official PC store page',
  },
] as const

/** Primary internal routes for crawl equity. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Overview, intel, and checkout' },
  {
    label: 'Store',
    to: '/wardogs-cheats',
    description: 'Aimbot, ESP, radar, and Wardogs plans',
  },
  {
    label: 'Intel hub',
    to: '/forums',
    description: 'Setup guides — aimbot, ESP, radar, load, status',
  },
  {
    label: 'Reviews',
    to: '/reviews',
    description: 'Buyer reviews and ratings',
  },
  {
    label: 'FAQ',
    to: '/faq',
    description: 'Frequently asked questions',
  },
  {
    label: 'Support',
    to: '/support',
    description: 'Discord, delivery, and loader help',
  },
  {
    label: 'Privacy policy',
    to: '/privacy',
    description: 'Order data and site privacy',
  },
  {
    label: 'Terms of use',
    to: '/terms',
    description: 'License rules and risk disclaimer',
  },
  {
    label: 'Refund policy',
    to: '/refunds',
    description: 'When digital license refunds apply',
  },
] as const

export const SITE_GUIDE_LINKS = [
  { label: 'Features checklist', to: blogPath('features-list') },
  { label: 'Player ESP setup', to: blogPath('esp-wallhack-guide') },
  { label: 'Aimbot tuning', to: blogPath('aimbot-settings') },
  { label: 'Vehicle ESP', to: blogPath('vehicle-esp-first') },
  { label: 'Radar config', to: blogPath('radar-recommended-config') },
  { label: 'Complete setup', to: blogPath('complete-setup') },
  { label: 'Windows setup', to: blogPath('windows-setup') },
  { label: 'Antivirus exclusions', to: blogPath('disable-antivirus') },
  { label: 'After a game patch', to: blogPath('game-patch-status') },
  { label: 'Loader errors', to: blogPath('loader-errors') },
  { label: 'Pre-load checklist', to: blogPath('load-status-checklist') },
  { label: 'Buy safely guide', to: blogPath('buy-wardogs-cheats-safely') },
  { label: 'Lifetime license', to: blogPath('wardogs-cheats-lifetime') },
  { label: 'Anti-cheat & status', to: blogPath('game-patch-status') },
] as const

/** Outbound checkout (all Get / buy CTAs). */
export const CHECKOUT_OUTBOUND = SITE_CHECKOUT_URL

export const CHECKOUT_URL = SITE_CHECKOUT_URL

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_OUTBOUND
}

export const CHECKOUT_REL = 'nofollow noopener noreferrer'
