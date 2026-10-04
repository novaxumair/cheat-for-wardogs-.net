/**
 * Downloads IGN og:image key art for WARDOGS (first-party hosted copy — no hotlink in HTML).
 * Source: https://www.ign.com/games/wardogs
 */
import { writeFileSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const IGN_COVER =
  'https://assets-prd.ignimgs.com/2026/02/06/wardogs-1770339684950.jpg'
const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const mediaDir = join(root, 'public', 'media')
const brandDir = join(root, 'public', 'brand')

await mkdir(mediaDir, { recursive: true })
await mkdir(brandDir, { recursive: true })

const res = await fetch(IGN_COVER, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; cheatforwardogs.net asset script)' },
})
if (!res.ok) throw new Error(`IGN download failed: ${res.status}`)
const buf = Buffer.from(await res.arrayBuffer())
writeFileSync(join(brandDir, 'wardogs-ign-cover.jpg'), buf)

await sharp(buf)
  .resize(1440, 1440, { fit: 'cover', position: 'centre' })
  .webp({ quality: 95, effort: 6, smartSubsample: false })
  .toFile(join(mediaDir, 'wd-game-cover.webp'))

console.log('Saved public/brand/wardogs-ign-cover.jpg and public/media/wd-game-cover.webp')
