import type { FaqItem } from '../data/faqs'
import {
  OG_IMAGE,
  PRODUCT_PLANS,
  PRODUCT_SCHEMA_DESCRIPTION,
  SEO_REGIONS,
  ANTI_CHEAT_NAME,
  ORGANIZATION_ALTERNATE_NAMES,
  SITE_ABOUT,
  SITE_NAME,
  SITE_PURPOSE,
  SITE_URL,
  absoluteUrl,
  type PageSeo,
} from '../data/site'
import { getReviewsAggregate, REVIEWS } from '../data/reviews'
import type { GameStatus } from '../data/games'
import { WD_HOME_VIDEO, PAGE_MEDIA } from '../data/media'

export const PRODUCT_ID = `${SITE_URL}/#product`

function absoluteAsset(src: string) {
  return src.startsWith('http') ? src : `${SITE_URL}${src.startsWith('/') ? src : `/${src}`}`
}

function planOffer(url: string, availability: string, plan: (typeof PRODUCT_PLANS)[number]) {
  return {
    '@type': 'Offer',
    url,
    availability,
    name: plan.label,
    sku: plan.id,
    price: plan.priceUsd,
    priceCurrency: 'USD',
    priceValidUntil: '2027-12-31',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': `${SITE_URL}/#organization` },
  }
}

function baseOffer(url: string, availability: string) {
  return {
    '@type': 'AggregateOffer',
    url,
    availability,
    lowPrice: PRODUCT_PLANS[0].priceUsd,
    highPrice: PRODUCT_PLANS[1].priceUsd,
    priceCurrency: 'USD',
    offerCount: String(PRODUCT_PLANS.length),
    offers: PRODUCT_PLANS.map((plan) => planOffer(url, availability, plan)),
  }
}

export function siteIdentityGraph() {
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [...ORGANIZATION_ALTERNATE_NAMES],
      url: SITE_URL,
      description: SITE_PURPOSE,
      knowsAbout: [...SITE_ABOUT],
      brand: { '@type': 'Brand', name: SITE_NAME },
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      image: absoluteAsset(OG_IMAGE),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_PURPOSE,
      inLanguage: 'en',
      about: {
        '@type': 'Thing',
        name: 'Wardogs Cheats',
        description: SITE_PURPOSE,
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ]
}

export function webPageNode(seo: PageSeo) {
  const img = seo.image || OG_IMAGE
  const page = {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(seo.path)}#webpage`,
    url: absoluteUrl(seo.path),
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  } as Record<string, unknown>
  const hasVisibleImage =
    ['/', '/wardogs-cheats', '/forums'].includes(seo.path) || seo.path.startsWith('/forums/')
  const hasOgImage = Boolean(seo.image)
  if (hasVisibleImage || hasOgImage) {
    page.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: absoluteAsset(img),
      width: 1200,
      height: 630,
      caption: seo.imageAlt || seo.title,
    }
    page.image = absoluteAsset(img)
  }
  return page
}

export function productCoreJsonLd() {
  return {
    '@type': 'Product',
    '@id': PRODUCT_ID,
    name: 'Wardogs Cheats',
    alternateName: ['Wardogs Cheats', 'wardogs cheats'],
    description: PRODUCT_SCHEMA_DESCRIPTION,
    url: `${SITE_URL}/wardogs-cheats`,
    image: [
      absoluteAsset('/og/wardogs-cheats.jpg'),
      absoluteAsset('/og/home.jpg'),
      absoluteAsset(PAGE_MEDIA.product.image),
      absoluteAsset(PAGE_MEDIA.home.image),
    ],
    brand: { '@type': 'Brand', name: SITE_NAME },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    category: 'PC game software',
    offers: baseOffer(`${SITE_URL}/wardogs-cheats`, 'https://schema.org/InStock'),
    subjectOf: {
      '@type': 'VideoObject',
      name: WD_HOME_VIDEO.title,
      description: WD_HOME_VIDEO.caption,
      thumbnailUrl: absoluteAsset(WD_HOME_VIDEO.poster),
      contentUrl: absoluteAsset(WD_HOME_VIDEO.src),
      uploadDate: '2026-09-16',
      inLanguage: 'en',
    },
  }
}

export function productDetailJsonLd(status: GameStatus) {
  const availability =
    status === 'Active' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
  return {
    ...productCoreJsonLd(),
    url: `${SITE_URL}/wardogs-cheats`,
    image: absoluteAsset(PAGE_MEDIA.product.image),
    about: {
      '@type': 'VideoGame',
      name: 'Wardogs',
      alternateName: ['Wardogs'],
      gamePlatform: 'PC',
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Platform', value: 'Windows PC' },
      {
        '@type': 'PropertyValue',
        name: 'Features',
        value: 'Aimbot, player ESP, vehicle ESP, 2D radar, no recoil, no spread, configs',
      },
      {
        '@type': 'PropertyValue',
        name: 'Clients',
        value: 'Steam',
      },
      { '@type': 'PropertyValue', name: 'Anti-cheat', value: ANTI_CHEAT_NAME },
      { '@type': 'PropertyValue', name: 'Status', value: status },
    ],
    offers: baseOffer(`${SITE_URL}/wardogs-cheats`, availability),
  }
}

export function productReviewsJsonLd() {
  const aggregate = getReviewsAggregate()
  return {
    ...productCoreJsonLd(),
    url: `${SITE_URL}/wardogs-cheats`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregate.ratingValue,
      reviewCount: aggregate.reviewCount,
      bestRating: aggregate.bestRating,
      worstRating: aggregate.worstRating,
    },
    review: REVIEWS.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      datePublished: review.datePublished,
      reviewBody: review.body,
      name: `Review by ${review.author}`,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(review.rating),
        bestRating: '5',
        worstRating: '1',
      },
      itemReviewed: { '@id': PRODUCT_ID },
    })),
  }
}

export function buildPageJsonLd(seo: PageSeo, extra: unknown[] = []) {
  const cleaned = extra.filter((node) => {
    if (!node || typeof node !== 'object') return true
    const t = (node as { '@type'?: string })['@type']
    return t !== 'WebSite' && t !== 'Organization'
  })
  return {
    '@context': 'https://schema.org',
    '@graph': [...siteIdentityGraph(), webPageNode(seo), ...cleaned],
  }
}

export function faqPageJsonLd(items: FaqItem[], pageUrl?: string) {
  return {
    '@type': 'FAQPage',
    ...(pageUrl ? { '@id': `${pageUrl}#faq`, url: pageUrl } : {}),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export { SEO_REGIONS, absoluteUrl, OG_IMAGE, SITE_NAME, SITE_URL }
