# Wardogs Cheats (cheatforwardogs.net)

Static Astro site for **Wardogs Cheats** on Windows PC — aimbot, ESP, vehicle tracking, 2D radar, and loader status. Single-game only; Cloudflare Pages / Workers ready.

SEO targets **Wardogs cheats**, **wardogs anti cheat**, **Wardogs ESP**, **Wardogs aimbot**, and related Wardogs PC keywords on `https://cheatforwardogs.net`.

## Commands

- `npm run dev` — local dev (port 5174)
- `npm run build` — production build + sitemap + SEO + single-game checks
- `npm run generate:forums` — regenerate intel threads (`scripts/generate-wardogs-forums.mjs`)
- `npm run prepare:media` — rebuild gameplay WebP assets
- `npm run fetch:game-cover` — refresh hosted WARDOGS key art

Set `SITE_URL=https://cheatforwardogs.net` when generating sitemaps outside the default build.

After deploy, run `npm run verify:live-sitemap`. In [Google Search Console](https://search.google.com/search-console), use a **cheatforwardogs.net** property and submit only **`https://cheatforwardogs.net/sitemap.xml`** (delete older entries such as `/sitemap` or any `cheatsforwardogs.net` URL).

## Cloudflare Pages (Git)

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Build output | `dist` (also set in `wrangler.toml`) |
| **Deploy command** | **Leave empty** (recommended), `npm run deploy:pages`, or `npx wrangler deploy` (shimmed to Pages deploy after `npm ci`) |

Optional standalone Worker: `npm run deploy:worker` (see `wrangler.worker.toml`).

**Domain redirects:** `public/_redirects` supports **path-only** rules. Point `cheatsforwardogs.net` and `www.cheatforwardogs.net` at this Pages project in the dashboard, then add **Bulk Redirects** (or DNS + custom domains) for apex/`www` and the legacy `cheatsforwardogs.net` hostnames.
