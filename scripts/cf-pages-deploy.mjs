/**
 * Cloudflare Pages deploy (use instead of bare `wrangler deploy`).
 * Dashboard: leave deploy command empty (recommended), or set to `npm run deploy:pages`.
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const project =
  process.env.CF_PAGES_PROJECT_NAME ||
  process.env.WRANGLER_PAGES_PROJECT ||
  'cheatsforwardogs'

if (!existsSync(dist)) {
  console.error('cf-pages-deploy: dist/ missing — run npm run build first')
  process.exit(1)
}

const branch = process.env.CF_PAGES_BRANCH || process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7)
const args = [
  'wrangler',
  'pages',
  'deploy',
  'dist',
  `--project-name=${project}`,
  '--commit-dirty=true',
]
if (branch) args.push(`--branch=${branch}`)

console.log(`Pages deploy → ${project} (${dist})`)
execSync(args.join(' '), { stdio: 'inherit', cwd: root, env: process.env })
