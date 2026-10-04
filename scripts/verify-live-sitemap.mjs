/**
 * Post-deploy check: production sitemap must return plain XML Google Search Console can parse.
 * Usage: npm run verify:live-sitemap
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const siteTs = readFileSync(join(root, 'src', 'data', 'site.ts'), 'utf8')
const siteUrlMatch = siteTs.match(/export const SITE_URL = '([^']+)'/)
const SITE = (process.env.SITE_URL || siteUrlMatch?.[1] || 'https://cheatforwardogs.net').replace(
  /\/$/,
  '',
)
const HOST = SITE.replace(/^https:\/\//, '')

const failures = []
const warnings = []

function fail(msg) {
  failures.push(msg)
}

function warn(msg) {
  warnings.push(msg)
}

function assertXmlSitemap(body, label) {
  if (!body.trimStart().startsWith('<?xml')) fail(`${label}: body is not XML`)
  if (body.charCodeAt(0) === 0xfeff) fail(`${label}: UTF-8 BOM breaks XML parsers (remove BOM)`)
  if (body.includes('<html') || body.includes('<!DOCTYPE html')) {
    fail(`${label}: body looks like HTML (check Worker/_headers overrides)`)
  }
  if (body.includes('<?xml-stylesheet')) fail(`${label}: must not use xml-stylesheet (GSC parse errors)`)
  if (body.includes('<sitemapindex')) fail(`${label}: must be a urlset, not a sitemap index`)
  if (!body.includes(HOST)) fail(`${label}: missing loc URLs for ${HOST}`)
  if (body.includes('cheatsforwardogs.net')) {
    fail(`${label}: still lists legacy cheatsforwardogs.net URLs`)
  }
  if (body.includes('<changefreq>') || body.includes('<priority>')) {
    warn(`${label}: changefreq/priority are optional; plain loc+lastmod is preferred for GSC`)
  }

  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (locs.length < 10) fail(`${label}: expected many <loc> entries, found ${locs.length}`)
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE}/`) && loc !== `${SITE}/`) {
      fail(`${label}: unexpected loc ${loc}`)
    }
  }
  const blocks = body.match(/<url>[\s\S]*?<\/url>/g) || []
  if (blocks.length !== locs.length) {
    fail(`${label}: malformed <url> blocks (${blocks.length} blocks, ${locs.length} locs)`)
  }
}

async function checkSitemapXml() {
  const url = `${SITE}/sitemap.xml`
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
    redirect: 'follow',
  })
  if (res.status !== 200) fail(`${url}: expected HTTP 200, got ${res.status}`)
  const type = res.headers.get('content-type') || ''
  if (!type.toLowerCase().includes('xml')) {
    fail(`${url}: Content-Type must include xml (got ${type || 'none'})`)
  }
  assertXmlSitemap(await res.text(), url)
}

async function checkSitemapRedirect() {
  const url = `${SITE}/sitemap`
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
    redirect: 'manual',
  })
  if (res.status !== 301 && res.status !== 308) {
    fail(`${url}: expected 301 to /sitemap.xml, got ${res.status}`)
  }
  const location = res.headers.get('location') || ''
  if (!location.includes('/sitemap.xml')) {
    fail(`${url}: Location must point to /sitemap.xml (got ${location || 'none'})`)
  }
}

async function checkRobots() {
  const res = await fetch(`${SITE}/robots.txt`, { redirect: 'follow' })
  if (!res.ok) fail(`robots.txt: HTTP ${res.status}`)
  const body = await res.text()
  if (!body.includes(`Sitemap: ${SITE}/sitemap.xml`)) {
    fail('robots.txt must declare Sitemap: .../sitemap.xml')
  }
  if (/Sitemap:\s*https:\/\/cheatforwardogs\.net\/sitemap\s*$/m.test(body)) {
    fail('robots.txt must not declare extensionless /sitemap')
  }
}

async function checkLegacyHost() {
  const legacy = 'https://cheatsforwardogs.net/sitemap.xml'
  try {
    const res = await fetch(legacy, { redirect: 'manual' })
    const body = res.status === 200 ? await res.text() : ''
    if (body.includes('cheatsforwardogs.net') && body.includes('<loc>')) {
      warn(
        `${legacy} still serves an old sitemap — point cheatsforwardogs.net at this Pages project or add Bulk Redirects`,
      )
    }
  } catch {
    /* legacy host may be offline */
  }
}

try {
  await checkSitemapXml()
  await checkSitemapRedirect()
  await checkRobots()
  await checkLegacyHost()
} catch (err) {
  fail(err.message || String(err))
}

if (warnings.length) {
  for (const w of warnings) console.warn(`WARN: ${w}`)
}

if (failures.length) {
  throw new Error(`Live sitemap verification failed:\n- ${failures.join('\n- ')}`)
}

console.log(`Live sitemap OK: submit ${SITE}/sitemap.xml in Search Console (cheatforwardogs.net property)`)
