/**
 * Ensures the site remains Wardogs-only (cheatsforwardogs.net) in source and built HTML.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const failures = []

const SKIP_FILES = new Set([
  'verify-single-game.mjs',
  'verify-seo.mjs',
  'verify-redirects.mjs',
  'generate-sitemaps.mjs',
  '_redirects',
])

const SKIP_SCRIPT_PATHS = /^scripts\/(verify-|generate-sitemaps|prepare-wardogs-media|fetch-wardogs)/

/** Legacy template paths — allowed only in redirect rules, not in page HTML/TSX. */
const REDIRECT_ONLY = /the-isle|buyislecheats|abi-cheats|dayz-cheats|tarkov|warzone|arena.breakout/i

const FORBIDDEN = [
  /the\s+isle/i,
  /buyislecheats/i,
  /the-isle-cheats/i,
  /evrima/i,
  /\btarkov/i,
  /warzonecheats/i,
  /dayz-cheats/i,
  /arena\s+breakout/i,
  /escape\s+from\s+tarkov/i,
  /assets-prd\.ignimgs\.com/i,
  /cdn\.cosmocheats\.com/i,
  /376210\/The_Isle/i,
  /novaxware/i,
]

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.git') continue
    const p = join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (/\.(tsx?|astro|html|css|json|xml|txt|md)$/.test(ent.name)) out.push(p)
  }
  return out
}

function scanFile(file, label) {
  if (SKIP_FILES.has(file.split(/[/\\]/).pop() ?? '')) return
  const rel = relative(root, file).replaceAll('\\', '/')
  if (rel === 'public/_redirects') return
  if (SKIP_SCRIPT_PATHS.test(rel)) return

  const text = readFileSync(file, 'utf8')
  for (const re of FORBIDDEN) {
    if (re.test(text)) {
      failures.push(`${label} ${rel}: matched ${re}`)
    }
  }
}

for (const file of walk(join(root, 'src'))) scanFile(file, 'src')
for (const file of walk(join(root, 'public'))) scanFile(file, 'public')
for (const file of walk(join(root, 'scripts'))) scanFile(file, 'scripts')

if (existsSync(dist)) {
  for (const file of walk(dist)) {
    if (!file.endsWith('.html')) continue
    const html = readFileSync(file, 'utf8')
    for (const re of FORBIDDEN) {
      if (re.test(html)) {
        failures.push(`dist ${relative(dist, file)}: matched ${re}`)
      }
    }
    if (REDIRECT_ONLY.test(html) && !html.includes('cheatsforwardogs.net')) {
      failures.push(`dist ${relative(dist, file)}: legacy game slug in HTML`)
    }
  }
}

const siteTs = readFileSync(join(root, 'src', 'data', 'site.ts'), 'utf8')
if (!siteTs.includes('cheatsforwardogs.net')) {
  failures.push('site.ts must use cheatsforwardogs.net')
}
if (!siteTs.includes('Wardogs Cheats')) {
  failures.push('site.ts must use Wardogs Cheats brand')
}
if (!siteTs.includes('does not sell cheats for other games')) {
  failures.push('site.ts must declare single-game Wardogs focus')
}

const gamesTs = readFileSync(join(root, 'src', 'data', 'games.ts'), 'utf8')
const gameCount = (gamesTs.match(/slug:\s*['"]/g) || []).length
if (gameCount !== 1) failures.push(`games.ts must list exactly one game (found ${gameCount})`)

if (failures.length) {
  throw new Error(`Single-game verification failed:\n- ${failures.join('\n- ')}`)
}

console.log('Single-game verification passed (Wardogs / cheatsforwardogs.net only)')
