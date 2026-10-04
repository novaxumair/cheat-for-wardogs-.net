/**
 * Single sitemap at /sitemap.xml ? every indexed page URL + image entries.
 * One urlset only (never a sitemap index). 404 is excluded.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const pagesDir = join(root, 'src', 'pages')
const SITE = (process.env.SITE_URL || 'https://cheatforwardogs.net').replace(/\/$/, '')
const TODAY = new Date().toLocaleDateString('en-CA')

const HERO_FULL = '/media/wd-hero-full.webp'
const COVER = '/media/wd-cover.webp'
const BOX = '/media/wd-screenshot-8.webp'
const ESP = '/media/wd-screenshot-5.webp'
const MENU = '/media/wd-menu.webp'
const SHOT = (n) => `/media/wd-screenshot-${n}.webp`
const VIDEO_THUMB = '/media/wd-video-thumb.jpg'
const PREVIEW_VIDEO = '/videos/hero.webm'
const OG_DEFAULT = '/og/wardogs-cheats.jpg'

const ALL_SITE_IMAGES = [
  HERO_FULL,
  COVER,
  BOX,
  ESP,
  MENU,
  ...Array.from({ length: 10 }, (_, i) => SHOT(i + 1)),
  VIDEO_THUMB,
  '/og/home.jpg',
  '/og/wardogs-cheats.jpg',
  '/og/forums.jpg',
  '/og/reviews.jpg',
  '/og/faq.jpg',
  '/og/support.jpg',
  '/og/privacy.jpg',
  '/og/terms.jpg',
  '/og/refunds.jpg',
]

const FORUM_IMAGES = {
  'features-list': COVER,
  hotkeys: MENU,
  'complete-setup': HERO_FULL,
  'disable-antivirus': SHOT(3),
  'load-status-checklist': COVER,
  'aimbot-settings': MENU,
  'esp-wallhack-guide': ESP,
  'game-patch-status': COVER,
  'windows-setup': HERO_FULL,
  'combat-assist-settings': ESP,
  'loader-errors': SHOT(7),
  'vehicle-esp-first': BOX,
  'radar-recommended-config': MENU,
}

const PAGE_META = {
  '/': { priority: '1.0', changefreq: 'daily' },
  '/wardogs-cheats': { priority: '0.9', changefreq: 'weekly' },
  '/forums': { priority: '0.85', changefreq: 'weekly' },
  '/reviews': { priority: '0.8', changefreq: 'weekly' },
  '/faq': { priority: '0.75', changefreq: 'monthly' },
  '/support': { priority: '0.75', changefreq: 'weekly' },
  '/privacy': { priority: '0.4', changefreq: 'yearly' },
  '/terms': { priority: '0.4', changefreq: 'yearly' },
  '/refunds': { priority: '0.45', changefreq: 'yearly' },
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** Keep captions ASCII-safe for maximum crawler compatibility. */
function asciiSafe(value) {
  return String(value)
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '')
}

function siteUrl(path) {
  return !path || path === '/' ? `${SITE}/` : `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function loadGames() {
  const src = readFileSync(join(dataDir, 'games.ts'), 'utf8')
  return [...src.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g)].map(
    (match) => ({ slug: match[1], name: match[2] }),
  )
}

function loadForums() {
  const src = readFileSync(join(dataDir, 'blogs.ts'), 'utf8')
  const jsonMatch = src.match(
    /export const BLOGS: BlogPost\[\] = (\[[\s\S]*?\n\])\s*\n\s*export function getBlog/,
  )
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1])
  }
  const pattern =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*excerpt:\s*['"]([^'"]+)['"],\s*metaTitle:\s*['"]([^'"]+)['"],\s*metaDescription:\s*['"]([^'"]+)['"],[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"]/g
  return [...src.matchAll(pattern)].map((match) => ({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    metaTitle: match[4],
    metaDescription: match[5],
    date: match[6],
  }))
}

function loadStaticRoutes() {
  return readdirSync(pagesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.astro') && entry.name !== '404.astro')
    .map((entry) => (entry.name === 'index.astro' ? '/' : `/${entry.name.slice(0, -6)}`))
}

function imageBlock({ src, title, caption }) {
  return `    <image:image>
      <image:loc>${escapeXml(siteUrl(src))}</image:loc>
      <image:title>${escapeXml(asciiSafe(title))}</image:title>
      <image:caption>${escapeXml(asciiSafe(caption))}</image:caption>
    </image:image>`
}

function videoBlock({ thumb, title, description, content }) {
  return `    <video:video>
      <video:thumbnail_loc>${escapeXml(siteUrl(thumb))}</video:thumbnail_loc>
      <video:title>${escapeXml(asciiSafe(title))}</video:title>
      <video:description>${escapeXml(asciiSafe(description))}</video:description>
      <video:content_loc>${escapeXml(siteUrl(content))}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`
}

/** Minimal urlset entries — loc + lastmod only (best GSC compatibility on Cloudflare Pages). */
function urlEntry({ path, lastmod = TODAY }) {
  const url = siteUrl(path)
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
}

function imagesForPath(path, games, forums) {
  if (path === '/') {
    return [
      {
        src: '/og/home.jpg',
        title: 'Wardogs Cheats Open Graph',
        caption: 'Primary social and search preview for the homepage.',
      },
      {
        src: HERO_FULL,
        title: 'Wardogs Cheats Hero',
        caption: 'Hero artwork for Wardogs aimbot, ESP, and radar on PC.',
      },
      {
        src: COVER,
        title: 'Wardogs Cheats Product Cover',
        caption: 'Product cover used on checkout and product previews.',
      },
      {
        src: VIDEO_THUMB,
        title: 'Wardogs Cheats Preview Thumbnail',
        caption: 'Video thumbnail for the self-hosted product preview.',
      },
      {
        src: BOX,
        title: 'Wardogs ESP Gameplay Screenshot',
        caption: 'Steam gameplay with player ESP overlays on cheatforwardogs.net.',
      },
    ]
  }

  const game = games.find((g) => path === `/${g.slug}-cheats`)
  if (game) {
    return [
      {
        src: '/og/wardogs-cheats.jpg',
        title: 'Wardogs Cheats Open Graph',
        caption: 'Google and social preview for the Wardogs Cheats product page.',
      },
      {
        src: COVER,
        title: 'Wardogs aimbot ESP Product Artwork',
        caption: 'Product features, compatibility, status and price before checkout.',
      },
      {
        src: HERO_FULL,
        title: `${game.name} Cheats Product Hero`,
        caption: `Hero artwork for ${game.name} Aimbot, ESP and radar hack product details.`,
      },
      {
        src: MENU,
        title: `${game.name} Cheats Menu Preview`,
        caption: `Menu and Aimbot settings preview for ${game.name} cheats.`,
      },
      {
        src: ESP,
        title: `${game.name} ESP Gameplay`,
        caption: `Player ESP and wallhack preview for ${game.name}.`,
      },
      {
        src: VIDEO_THUMB,
        title: 'Wardogs Cheats Preview Thumbnail',
        caption: 'Thumbnail for the Wardogs Cheats preview video.',
      },
    ]
  }

  if (path === '/forums') {
    return [
      {
        src: '/og/forums.jpg',
        title: 'Wardogs Cheats Forums Open Graph',
        caption: 'Google preview image for the Wardogs Cheats guides index.',
      },
      {
        src: MENU,
        title: 'Wardogs Cheats Forum Artwork',
        caption: 'Artwork reference for Wardogs setup and feature guides.',
      },
    ]
  }

  if (path.startsWith('/forums/')) {
    const slug = path.slice('/forums/'.length)
    const forum = forums.find((f) => f.slug === slug)
    return [
      {
        src: `/og/forums-${slug}.jpg`,
        title: `${forum?.title || slug} Open Graph`,
        caption:
          forum?.metaDescription ||
          `Google preview image for ${forum?.title || slug} on cheatforwardogs.net.`,
      },
      {
        src: FORUM_IMAGES[slug] || MENU,
        title: `${forum?.title || slug} Artwork`,
        caption:
          forum?.excerpt ||
          `Visible Wardogs Cheats guide artwork for ${forum?.title || slug}.`,
      },
    ]
  }

  if (path === '/reviews') {
    return [
      {
        src: '/og/reviews.jpg',
        title: 'Wardogs Cheats Reviews Open Graph',
        caption: 'Google preview image for Wardogs Cheats reviews.',
      },
    ]
  }
  if (path === '/faq') {
    return [
      {
        src: '/og/faq.jpg',
        title: 'Wardogs Cheats FAQ Open Graph',
        caption: 'Google preview image for the Wardogs Cheats FAQ.',
      },
    ]
  }
  if (path === '/support') {
    return [
      {
        src: '/og/support.jpg',
        title: 'Wardogs Cheats Support Open Graph',
        caption: 'Google preview image for Wardogs Cheats support.',
      },
    ]
  }
  if (path === '/privacy') {
    return [
      {
        src: '/og/privacy.jpg',
        title: 'Wardogs Cheats Privacy Policy',
        caption: 'Privacy policy preview for cheatforwardogs.net orders and support.',
      },
    ]
  }
  if (path === '/terms') {
    return [
      {
        src: '/og/terms.jpg',
        title: 'Wardogs Cheats Terms of Use',
        caption: 'License terms preview for Wardogs Cheats.',
      },
    ]
  }
  if (path === '/refunds') {
    return [
      {
        src: '/og/refunds.jpg',
        title: 'Wardogs Cheats Refund Policy',
        caption: 'Refund rules preview for digital Wardogs Cheats licenses.',
      },
    ]
  }

  return [{ src: OG_DEFAULT, title: 'Wardogs Cheats', caption: 'Wardogs Cheats page artwork.' }]
}

function videosForPath(path) {
  if (path === '/wardogs-cheats') {
    return [
      {
        thumb: VIDEO_THUMB,
        title: 'Wardogs Cheats Aimbot and ESP Preview',
        description:
          'Self-hosted Wardogs Cheats preview showing Aimbot, ESP menu and survival gameplay visuals on PC.',
        content: PREVIEW_VIDEO,
      },
    ]
  }
  return []
}

function collectAllPaths(games, forums, staticRoutes) {
  const paths = new Set([
    ...staticRoutes,
    ...games.map((game) => `/${game.slug}-cheats`),
    ...forums.map((forum) => `/forums/${forum.slug}`),
  ])
  // Never index error page
  paths.delete('/404')
  return [...paths]
}

function sectionLabel(path) {
  if (path === '/') return 'Homepage'
  if (path.endsWith('-cheats')) return 'Product'
  if (path === '/forums') return 'Forums index'
  if (path.startsWith('/forums/')) return 'Forum threads'
  if (path === '/reviews' || path === '/faq' || path === '/support') return 'Trust and support'
  return 'Legal and policies'
}

function buildSitemap(games, forums, allPaths) {
  const forumByPath = new Map(forums.map((f) => [`/forums/${f.slug}`, f]))

  const sorted = [...allPaths].sort((a, b) => {
    const rank = (path) => {
      if (path === '/') return 0
      if (path.endsWith('-cheats')) return 1
      if (path === '/forums') return 2
      if (path.startsWith('/forums/')) return 3
      if (path === '/reviews') return 4
      if (path === '/faq') return 5
      if (path === '/support') return 6
      return 10
    }
    const diff = rank(a) - rank(b)
    return diff !== 0 ? diff : a.localeCompare(b)
  })

  const chunks = []
  for (const path of sorted) {
    const forum = forumByPath.get(path)
    chunks.push(urlEntry({ path, lastmod: forum?.date || TODAY }))
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks.join('\n')}
</urlset>
`
}

function validate(games, forums, allPaths, sitemap) {
  const errors = []
  if (forums.some((forum) => ['instructions', 'how-to-load'].includes(forum.slug))) {
    errors.push('Retired forum slug remains indexed')
  }
  for (const game of games) {
    const page = join(pagesDir, `${game.slug}-cheats.astro`)
    if (!existsSync(page)) errors.push(`Product route has no page file: /${game.slug}-cheats`)
  }
  if (forums.length && !existsSync(join(pagesDir, 'forums', '[slug].astro'))) {
    errors.push('Forum routes have no dynamic page file: src/pages/forums/[slug].astro')
  }
  for (const image of ALL_SITE_IMAGES) {
    const diskPath = join(publicDir, image.replace(/^\//, ''))
    if (!existsSync(diskPath)) errors.push(`Missing image asset on disk: ${image}`)
  }
  for (const forum of forums) {
    const og = join(publicDir, 'og', `forums-${forum.slug}.jpg`)
    if (!existsSync(og)) errors.push(`Missing forum OG image: /og/forums-${forum.slug}.jpg`)
  }

  const expectedUrls = new Set(allPaths.map(siteUrl))
  const pageLocs = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const url of expectedUrls) {
    if (!pageLocs.includes(url)) errors.push(`Missing URL: ${url}`)
  }
  for (const url of pageLocs) {
    if (!expectedUrls.has(url)) errors.push(`Unexpected URL: ${url}`)
  }
  if (new Set(pageLocs).size !== pageLocs.length) errors.push('sitemap.xml contains duplicate page URLs')
  if (sitemap.includes('<?xml-stylesheet')) {
    errors.push('sitemap must not use xml-stylesheet (Google Search Console parse failures on Cloudflare)')
  }
  if (sitemap.includes('<video:') || sitemap.includes('xmlns:image=') || sitemap.includes('<image:')) {
    errors.push('sitemap must be a plain urlset (no image/video extensions for GSC)')
  }
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if (sitemap.includes('xmlns:xhtml=')) {
    errors.push('Remove xhtml namespace from sitemap (single-locale site; hreflang lives on HTML pages)')
  }
  if ((sitemap.match(/<urlset[\s>]/g) || []).length !== 1) {
    errors.push('sitemap.xml must contain exactly one <urlset>')
  }
  if (urlBlocks.length !== expectedUrls.size) {
    errors.push(`Expected ${expectedUrls.size} <url> entries, found ${urlBlocks.length}`)
  }
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
    if (!block.includes('<lastmod>')) {
      errors.push(`URL missing lastmod: ${loc}`)
    }
  }
  if (/Tarkov|tarkovcheats|EFT Reaper|Warzone|warzonecheats|Ricochet/i.test(sitemap)) {
    errors.push('Sitemap still contains legacy Tarkov/Warzone labels')
  }
  if (!sitemap.includes('cheatforwardogs.net')) {
    errors.push('Sitemap must target cheatforwardogs.net')
  }
  if (/tarkovcheats|warzonecheats|buywardogscheat\.com|zadeyo|arena breakout/i.test(sitemap)) {
    errors.push('Sitemap contains legacy or third-party branding')
  }
  if (/[^\x09\x0A\x0D\x20-\x7E]/.test(sitemap.replace(/https?:\/\//g, ''))) {
    // Allow non-ascii only inside https URLs if any; captions should be ascii.
  }
  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

const SITEMAP_FUNCTION_SOURCE = `/**
 * Auto-generated by scripts/generate-sitemaps.mjs — do not edit.
 * Serves sitemap XML with fixed headers (Google Search Console / Cloudflare Pages).
 */
const SITEMAP_XML = __SITEMAP_JSON__;

function serveSitemap() {
  return new Response(SITEMAP_XML, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function onRequest() {
  return serveSitemap();
}

export async function onRequestGet() {
  return serveSitemap();
}
`

function writeSitemapFunctions(sitemap) {
  const functionsDir = join(root, 'functions')
  mkdirSync(functionsDir, { recursive: true })
  const source = SITEMAP_FUNCTION_SOURCE.replace('__SITEMAP_JSON__', JSON.stringify(sitemap))
  for (const name of ['sitemap.js', 'sitemap.xml.js']) {
    writeFileSync(join(functionsDir, name), source, 'utf8')
  }
}

function copyFunctionsToDist(functionsDir) {
  const distDir = join(root, 'dist')
  if (!existsSync(distDir)) return
  const distFunctions = join(distDir, 'functions')
  mkdirSync(distFunctions, { recursive: true })
  for (const name of ['sitemap.js', 'sitemap.xml.js']) {
    cpSync(join(functionsDir, name), join(distFunctions, name))
  }
}

function writeRoutesConfig() {
  // Static sitemap in dist/ + public/_headers (Google Search Console). Do not route
  // /sitemap through Functions — wrangler pages deploy dist often omits repo-root /functions.
  const routes = {
    version: 1,
    include: [],
    exclude: [],
  }
  const json = `${JSON.stringify(routes, null, 2)}\n`
  writeFileSync(join(publicDir, '_routes.json'), json, 'utf8')
  const distDir = join(root, 'dist')
  if (existsSync(distDir)) {
    writeFileSync(join(distDir, '_routes.json'), json, 'utf8')
  }
}

function main() {
  const games = loadGames()
  const forums = loadForums()
  const staticRoutes = loadStaticRoutes()
  const allPaths = collectAllPaths(games, forums, staticRoutes)
  const sitemap = buildSitemap(games, forums, allPaths)
  validate(games, forums, allPaths, sitemap)

  const sitemapPaths = [
    join(publicDir, 'sitemap.xml'),
    join(publicDir, 'sitemap'),
    ...(existsSync(join(root, 'dist'))
      ? [join(root, 'dist', 'sitemap.xml'), join(root, 'dist', 'sitemap')]
      : []),
  ]
  for (const path of sitemapPaths) {
    writeFileSync(path, sitemap, 'utf8')
  }
  const functionsDir = join(root, 'functions')
  writeSitemapFunctions(sitemap)
  copyFunctionsToDist(functionsDir)
  writeRoutesConfig()
  const distDir = join(root, 'dist')
  writeFileSync(
    join(publicDir, 'robots.txt'),
    [
      'User-agent: Googlebot',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: Google-InspectionTool',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: Bingbot',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: *',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      'Disallow: /404',
      'Disallow: /404.html',
      '',
      `Sitemap: ${siteUrl('/sitemap')}`,
      `Sitemap: ${siteUrl('/sitemap.xml')}`,
      '',
    ].join('\n'),
    'utf8',
  )
  if (existsSync(distDir)) {
    writeFileSync(join(distDir, 'robots.txt'), readFileSync(join(publicDir, 'robots.txt'), 'utf8'), 'utf8')
  }

  for (const name of [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
    'sitemap-index.xml',
    'sitemap_index.xml',
  ]) {
    for (const dir of [publicDir, join(root, 'dist')]) {
      const path = join(dir, name)
      if (existsSync(path)) unlinkSync(path)
    }
  }

  console.log(
    `Sitemap OK: ${allPaths.length} pages at ${siteUrl('/sitemap')} (+ Pages Functions + static mirror)`,
  )
  console.log(
    `GSC: delete old sitemap entry, then submit ${siteUrl('/sitemap')} after deploy completes.`,
  )
}

main()
