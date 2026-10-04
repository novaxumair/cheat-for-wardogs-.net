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

const paths = ['/sitemap.xml', '/sitemap']
const failures = []

function fail(msg) {
  failures.push(msg)
}

async function checkPath(path) {
  const url = `${SITE}${path}`
  let res
  try {
    res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
      redirect: 'follow',
    })
  } catch (err) {
    fail(`${url}: fetch failed (${err.message})`)
    return
  }

  if (res.status !== 200) fail(`${url}: expected HTTP 200, got ${res.status}`)

  const type = res.headers.get('content-type') || ''
  if (!type.toLowerCase().includes('application/xml')) {
    fail(`${url}: Content-Type must be application/xml (got ${type || 'none'})`)
  }

  const body = await res.text()
  if (!body.trimStart().startsWith('<?xml')) fail(`${url}: body is not XML`)
  if (body.includes('<html') || body.includes('<!DOCTYPE html')) {
    fail(`${url}: body looks like HTML (check Worker/_headers overrides)`)
  }
  if (body.includes('<?xml-stylesheet')) fail(`${url}: must not use xml-stylesheet (GSC parse errors)`)
  if (body.includes('<sitemapindex')) fail(`${url}: must be a urlset, not a sitemap index`)
  if (!body.includes(HOST)) {
    fail(`${url}: missing loc URLs for ${HOST}`)
  }
  if (body.includes('cheatsforwardogs.net')) {
    fail(`${url}: still lists legacy cheatsforwardogs.net URLs`)
  }

  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (locs.length < 10) fail(`${url}: expected many <loc> entries, found ${locs.length}`)
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE}/`) && loc !== `${SITE}/`) {
      fail(`${url}: unexpected loc ${loc}`)
    }
  }
}

for (const path of paths) {
  await checkPath(path)
}

if (failures.length) {
  throw new Error(`Live sitemap verification failed:\n- ${failures.join('\n- ')}`)
}

console.log(`Live sitemap OK at ${SITE}/sitemap.xml (${paths.length} URLs checked)`)
