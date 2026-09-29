/**
 * Builds 1200x630 OG JPEGs and per-forum OG images from first-party screenshots.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')

mkdirSync(ogDir, { recursive: true })

const gameCover = join(mediaDir, 'wd-game-cover.webp')
const cover = existsSync(gameCover) ? gameCover : join(mediaDir, 'wd-cover.webp')
const hero = join(mediaDir, 'wd-hero-full.webp')
const menu = join(mediaDir, 'wd-menu.webp')
const shot = (n) => join(mediaDir, `wd-screenshot-${n}.webp`)

async function ogFrom(src, outName, title) {
  const input = existsSync(src) ? src : cover
  await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(ogDir, outName))
  return title
}

const pages = [
  ['home.jpg', hero, 'Wardogs Cheats'],
  ['wardogs-cheats.jpg', cover, 'Wardogs Store'],
  ['forums.jpg', shot(4), 'Wardogs Intel'],
  ['reviews.jpg', shot(2), 'Wardogs Cheats Reviews'],
  ['faq.jpg', shot(8), 'Wardogs FAQ'],
  ['support.jpg', shot(6), 'Wardogs Support'],
  ['privacy.jpg', menu, 'Privacy Policy'],
  ['terms.jpg', menu, 'Terms of Use'],
  ['refunds.jpg', menu, 'Refund Policy'],
]

for (const [name, src, title] of pages) {
  await ogFrom(src, name, title)
}

const blogsSrc = readFileSync(join(root, 'src', 'data', 'blogs.ts'), 'utf8')
const jsonMatch = blogsSrc.match(
  /export const BLOGS: BlogPost\[\] = (\[[\s\S]*?\n\])\s*\n\s*export function getBlog/,
)
const forums = jsonMatch ? JSON.parse(jsonMatch[1]) : []

for (const forum of forums) {
  let h = 0
  for (let i = 0; i < forum.slug.length; i++) h = (h * 31 + forum.slug.charCodeAt(i)) >>> 0
  const n = 1 + (h % 10)
  const src = shot(n)
  await ogFrom(src, `forums-${forum.slug}.jpg`, forum.title)
}

const keep = new Set(pages.map(([name]) => name))
for (const forum of forums) keep.add(`forums-${forum.slug}.jpg`)

let removed = 0
for (const f of readdirSync(ogDir)) {
  if (!f.endsWith('.jpg') || keep.has(f)) continue
  unlinkSync(join(ogDir, f))
  removed++
}

console.log(`OG images: ${pages.length} pages + ${forums.length} forum threads (${removed} stale removed)`)
