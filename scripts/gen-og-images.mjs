#!/usr/bin/env node
/**
 * One 1200x630 share card per page -> public/og/<slug>.jpg.
 *
 * Only 22 of 63 pages had an og:image, and the 19 blog ones were 470 KB -
 * 1.2 MB PNGs: over WhatsApp's ~300 KB preview limit, so a shared link showed
 * no image at all. Every page now gets a branded card: its own hero image,
 * its H1, the logo and the doctor/location line, as a JPEG well under 300 KB.
 *
 * Rendered with Playwright (real fonts, real CSS) and compressed with sharp.
 * Assets are served from public/ through a routed fake origin, so no server
 * is needed.
 *
 *   npm run gen:og                 # all pages, skipping cards already on disk
 *   npm run gen:og -- --force      # rebuild all
 *   npm run gen:og -- --slug home  # one page
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { ASSETS, CONTACT, DOCTOR, SEO } from '../src/config/site.ts'
import { pages } from '../src/seo/pages.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(root, 'public')
const outDir = path.join(pub, ASSETS.ogCardDir)
const { width: W, height: H } = ASSETS.ogImageSize

const argv = process.argv.slice(2)
const force = argv.includes('--force')
const only = argv.includes('--slug') ? argv[argv.indexOf('--slug') + 1] : null

/** Pages whose best image is not at a conventional path. */
const IMAGE_FOR = {
  home: 'hero.webp',
  'dr-sandeep-mahapatra-hair-transplant-surgeon': 'about-doctor.webp',
  'best-hair-transplant-surgeon-in-bangalore-lp': 'about-doctor.webp',
  'contact-us': 'insights/clinic.webp',
  'hair-conditions-we-treat': 'insights/clinic.webp',
  'image-gallery': 'gallery/hair-transplant.webp',
  'video-gallery': 'video-poster.jpeg',
  'media-coverage': 'media/happiest-health-2026-08-full.webp',
  'hair-transplant-for-men-in-bangalore': 'services/men.webp',
  'unshaven-hair-transplant': 'services/unshaven.webp',
  'our-blogs': 'insights/grafts.webp',
}

function imageFor(slug) {
  const candidates = [
    IMAGE_FOR[slug],
    `treatments/${slug}/hero.webp`,
    `blog/${slug}-hero.webp`,
    `blog/${slug}.webp`,
  ].filter(Boolean)
  return candidates.find((c) => fs.existsSync(path.join(pub, c))) ?? 'hero.webp'
}

/** The card headline: the page's H1, else its title without the brand suffix. */
function headline(page) {
  const text = page.h1 ?? page.title
  return text.replace(/\s*[|–-]\s*Neo Follicle.*$/i, '').trim()
}

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function cardHtml(page) {
  const text = headline(page)
  // Scale the headline so long H1s still fit three lines.
  const size = text.length > 70 ? 50 : text.length > 45 ? 58 : 66
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="/fonts/fonts.css">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; font-family: Inter, sans-serif; }
  .card { position: relative; width: 100%; height: 100%; background: #0d1b2e; }
  /* Photo in the right-hand panel, solid brand navy behind the text: blog
     heroes are text-heavy infographics that would fight an overlaid headline. */
  .bg { position: absolute; top: 0; right: 0; width: 56%; height: 100%; object-fit: cover; object-position: center 30%; }
  .shade { position: absolute; inset: 0;
    background: linear-gradient(90deg, #0d1b2e 0%, #0d1b2e 44%, rgba(13,27,46,.55) 60%, rgba(13,27,46,0) 78%); }
  .content { position: absolute; left: 64px; top: 56px; bottom: 56px; width: 700px;
    display: flex; flex-direction: column; justify-content: space-between; }
  .logo { background: #fff; border-radius: 14px; padding: 12px 18px; align-self: flex-start; }
  .logo img { height: 52px; display: block; }
  h1 { font-family: Manrope, sans-serif; font-weight: 800; color: #fff; font-size: ${size}px;
    line-height: 1.08; letter-spacing: -0.02em;
    display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .bar { width: 72px; height: 6px; background: ${ASSETS.themeColor}; border-radius: 3px; margin-bottom: 22px; }
  .meta { color: rgba(255,255,255,.88); font-size: 24px; line-height: 1.4; }
  .meta b { color: #fff; font-weight: 600; }
  .url { color: #9dbcf2; font-size: 22px; font-weight: 600; margin-top: 6px; }
</style></head><body><div class="card">
  <img class="bg" src="/${imageFor(page.slug)}">
  <div class="shade"></div>
  <div class="content">
    <div class="logo"><img src="/logo.svg"></div>
    <div><div class="bar"></div><h1>${esc(text)}</h1></div>
    <div>
      <div class="meta"><b>${esc(DOCTOR.name)}</b> · ${esc(DOCTOR.qualificationsLine)}</div>
      <div class="meta">${esc(CONTACT.localities[0])}, ${esc(CONTACT.address.addressLocality)} · ${esc(CONTACT.phoneDisplay.replace(/\s*-\s*/, ' '))}</div>
      <div class="url">${new URL(SEO.origin).host}</div>
    </div>
  </div>
</div></body></html>`
}

const TYPES = { '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png' }
const HOST = 'http://og.local'

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
const tab = await ctx.newPage()
let current = ''
await tab.route(`${HOST}/**`, (route) => {
  const url = new URL(route.request().url())
  if (url.pathname === '/card') return route.fulfill({ contentType: 'text/html', body: current })
  const file = path.join(pub, decodeURIComponent(url.pathname))
  if (!file.startsWith(pub) || !fs.existsSync(file)) return route.fulfill({ status: 404, body: '' })
  return route.fulfill({ contentType: TYPES[path.extname(file)] ?? 'application/octet-stream', body: fs.readFileSync(file) })
})

let made = 0, skipped = 0
for (const page of pages) {
  if (only && page.slug !== only) continue
  const out = path.join(outDir, `${page.slug}.jpg`)
  if (!force && !only && fs.existsSync(out)) { skipped++; continue }
  current = cardHtml(page)
  await tab.goto(`${HOST}/card`, { waitUntil: 'load' })
  await tab.evaluate(() => document.fonts.ready)
  const png = await tab.screenshot({ type: 'png' })
  await sharp(png).jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' }).toFile(out)
  const kb = Math.round(fs.statSync(out).size / 1024)
  if (kb > 300) throw new Error(`${page.slug}.jpg is ${kb} KB -- over the 300 KB WhatsApp preview limit`)
  made++
}
await browser.close()

console.log(`gen-og: ${made} cards written, ${skipped} already present -> public${ASSETS.ogCardDir}`)
