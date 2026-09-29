/**
 * Builds public/media from Cursor assets (images_1 … images_N).
 * Preserves native resolution; WebP/JPEG at high quality only (no aggressive downscale).
 */
import { copyFile, mkdir, readdir, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const assetsDir =
  process.env.WARDOGS_ASSETS_DIR ??
  join(
    process.env.USERPROFILE ?? '',
    '.cursor/projects/c-Users-Bader-Desktop-test-cheats-for-wardogs-net/assets',
  )
const mediaDir = join(root, 'public', 'media')
const brandDir = join(root, 'public', 'brand')

const WEBP_OPTS = { quality: 95, effort: 6, smartSubsample: false }
const JPEG_OPTS = { quality: 94, mozjpeg: true }

/** Max width for hero/cover only — never upscale. */
const HERO_MAX_W = 2560
const COVER_MAX_W = 1920

await mkdir(mediaDir, { recursive: true })

const allFiles = await readdir(assetsDir)
const shots = allFiles
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  .map((f) => {
    const m = f.match(/images_(\d+)-/)
    if (!m) return null
    return { n: parseInt(m[1], 10), f }
  })
  .filter(Boolean)
  .sort((a, b) => a.n - b.n)

if (shots.length === 0) {
  console.error('No images_N assets found in', assetsDir)
  process.exit(1)
}

const pick = (n) => join(assetsDir, shots.find((x) => x.n === n)?.f ?? shots[0].f)

async function toWebp(src, out, resizeMaxW) {
  let pipe = sharp(src)
  if (resizeMaxW) {
    const meta = await sharp(src).metadata()
    if (meta.width && meta.width > resizeMaxW) {
      pipe = pipe.resize(resizeMaxW, null, { fit: 'inside', withoutEnlargement: true })
    }
  }
  await pipe.webp(WEBP_OPTS).toFile(out)
}

for (const { n, f } of shots) {
  await toWebp(join(assetsDir, f), join(mediaDir, `wd-screenshot-${n}.webp`))
}

const SCREENSHOT_COUNT = 10
const written = new Set(shots.map((s) => s.n))
for (let n = 1; n <= SCREENSHOT_COUNT; n++) {
  if (written.has(n)) continue
  const donorN = n === 9 ? 8 : (written.has(8) ? 8 : shots[0].n)
  const donor = join(mediaDir, `wd-screenshot-${donorN}.webp`)
  const out = join(mediaDir, `wd-screenshot-${n}.webp`)
  await copyFile(donor, out)
  console.warn(`Filled wd-screenshot-${n}.webp (no images_${n} asset) from`, donor)
}

await mkdir(brandDir, { recursive: true })

// Hero banner + product cover (best wide frames)
await toWebp(pick(6), join(mediaDir, 'wd-hero-full.webp'), HERO_MAX_W)
await toWebp(pick(4), join(mediaDir, 'wd-cover.webp'), COVER_MAX_W)
// Store card art: IGN key art — run `npm run fetch:game-cover` (do not overwrite with screenshots).
await sharp(pick(1))
  .resize(COVER_MAX_W, null, { fit: 'inside', withoutEnlargement: true })
  .jpeg(JPEG_OPTS)
  .toFile(join(mediaDir, 'wd-video-thumb.jpg'))
await toWebp(pick(10), join(mediaDir, 'wd-menu.webp'))

const legacyNames = new Set([
  'wd-home-art.webp',
  'wd-tactical-art.webp',
  'wd-control-art.webp',
  'wd-home-art.jpg',
  'wd-tactical-art.jpg',
  'wd-control-art.jpg',
  ...Array.from({ length: 20 }, (_, i) => `wd-screenshot-${i + 11}.webp`),
])
for (const f of await readdir(mediaDir)) {
  if (f.startsWith('isle-') || legacyNames.has(f)) {
    try {
      await unlink(join(mediaDir, f))
    } catch {
      /* already gone */
    }
  }
}

console.log(
  `Prepared ${shots.length} Wardogs screenshots + hero/cover/thumb/menu in public/media (q=${WEBP_OPTS.quality})`,
)
