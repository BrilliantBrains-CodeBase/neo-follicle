#!/usr/bin/env node
/**
 * Post-deploy checks against the LIVE site (verify-seo.mjs checks dist/;
 * this checks what the server actually sends).
 *
 *   npm run verify:live                                   # https://neofollicletransplant.com
 *   npm run verify:live -- --only host,legacy,compression,cache
 *   BASE=https://staging.example.com npm run verify:live  # host checks skipped
 *
 * Testing a non-production server with the host checks on (as done for the
 * Apache test in docs/seo-audit/reports/): set HTTP_BASE and WWW_BASE too, e.g.
 *   BASE=https://neofollicletransplant.com:8443 \
 *   HTTP_BASE=http://neofollicletransplant.com:8080 \
 *   WWW_BASE=https://www.neofollicletransplant.com:8443 \
 *   NODE_TLS_REJECT_UNAUTHORIZED=0 npm run verify:live
 *
 * Groups: host, legacy, compression, cache, charset, robots, pages, gtm, content
 * Exit code 1 on any FAIL. WARN is information and never fails the run.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ANALYTICS, SEO } from '../src/config/site.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PROD = SEO.origin
const BASE = (process.env.BASE || PROD).replace(/\/$/, '')
const isProd = BASE === PROD
const HTTP_BASE = process.env.HTTP_BASE || (isProd ? PROD.replace(/^https:/, 'http:') : null)
const WWW_BASE = process.env.WWW_BASE || (isProd ? PROD.replace('://', '://www.') : null)

const onlyArg = process.argv.find((a) => a.startsWith('--only'))
const only = onlyArg
  ? new Set((onlyArg.includes('=') ? onlyArg.split('=')[1] : process.argv[process.argv.indexOf(onlyArg) + 1] ?? '').split(','))
  : null
const run = (group) => !only || only.has(group)

const results = []
const pass = (group, msg) => results.push({ level: 'PASS', group, msg })
const warn = (group, msg, detail = []) => results.push({ level: 'WARN', group, msg, detail })
const fail = (group, msg, detail = []) => results.push({ level: 'FAIL', group, msg, detail })
const check = (group, label, problems, okLabel = label) =>
  problems.length ? fail(group, label, problems) : pass(group, okLabel)

async function get(url, { method = 'GET', headers = {} } = {}) {
  const res = await fetch(url, { method, redirect: 'manual', headers: { 'user-agent': 'nf-verify-live/1.0', ...headers } })
  const body = method === 'HEAD' ? '' : await res.text()
  return { status: res.status, headers: res.headers, body, location: res.headers.get('location') }
}

/** Runs `fn` over `items`, `n` at a time. */
async function pool(items, n, fn) {
  const out = []
  let i = 0
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx])
    }
  }))
  return out
}

const toBase = (url) => (url.startsWith(PROD) ? BASE + url.slice(PROD.length) : url)
const unesc = (s) => s.replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&')

const home = await get(`${BASE}/`, { headers: { 'accept-encoding': 'br, gzip' } })
if (home.status !== 200) {
  console.error(`${BASE}/ answered ${home.status}; nothing else is worth checking.`)
  process.exit(1)
}

/* ---- host: one canonical https apex, one hop, query kept ------------------ */
if (run('host')) {
  if (!HTTP_BASE || !WWW_BASE) {
    warn('host', `skipped: ${BASE} is not ${PROD} (set HTTP_BASE and WWW_BASE to test a server's host rules)`)
  } else {
    const cases = [
      [`${HTTP_BASE}/`, `${PROD}/`],
      [`${WWW_BASE}/contact-us/?utm_source=google&utm_medium=organic&utm_campaign=gmb`,
        `${PROD}/contact-us/?utm_source=google&utm_medium=organic&utm_campaign=gmb`],
      [`${HTTP_BASE.replace('://', '://www.')}/beard-transplant-in-bangalore/`, `${PROD}/beard-transplant-in-bangalore/`],
    ]
    const bad = []
    for (const [from, to] of cases) {
      try {
        const r = await get(from)
        if (r.status !== 301 || r.location !== to) bad.push(`${from} -> ${r.status} ${r.location ?? ''} (want 301 ${to})`)
      } catch (e) {
        bad.push(`${from}: ${e.cause?.code ?? e.message}`)
      }
    }
    check('host', 'http:// and www. 301 to the https apex in one hop, query kept', bad)
    const hsts = home.headers.get('strict-transport-security')
    if (hsts) pass('host', `HSTS on https: ${hsts}`)
    else fail('host', 'HSTS header missing on https')
  }
}

/* ---- legacy: every live RewriteRule in public/.htaccess -------------------- */
if (run('legacy')) {
  const rules = fs.readFileSync(path.join(root, 'public/.htaccess'), 'utf8').split('\n')
    .map((l) => l.trim().match(/^RewriteRule \^([^\s]+?)(\/\?)?\$ (\/\S*) \[R=301/))
    .filter(Boolean)
    .map(([, pattern, slash, target]) => ({ path: `/${pattern.replaceAll('\\.', '.')}${slash ? '/' : ''}`, target }))
    .filter((r) => !/[()[\]|*+?^$\\]/.test(r.path))
  const bad = []
  await pool(rules, 6, async (r) => {
    const res = await get(BASE + r.path)
    const got = res.location ? new URL(res.location, BASE).pathname : null
    if (res.status !== 301 || got !== r.target) bad.push(`${r.path} -> ${res.status} ${got ?? ''} (want 301 ${r.target})`)
    else {
      const t = await get(BASE + r.target, { method: 'HEAD' })
      if (t.status !== 200) bad.push(`${r.path} -> ${r.target}, which answers ${t.status}`)
    }
  })
  check('legacy', `${rules.length} legacy URLs 301 to a live page`, bad, `all ${rules.length} legacy URLs 301 to a page that answers 200`)
}

/* ---- compression ----------------------------------------------------------- */
const assetUrls = [...home.body.matchAll(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1])
if (run('compression')) {
  const bad = []
  const enc = home.headers.get('content-encoding')
  if (!/^(br|gzip)$/.test(enc ?? '')) bad.push(`/ (HTML): content-encoding ${enc ?? 'none'}`)
  for (const u of [...new Set(assetUrls)].slice(0, 4)) {
    const r = await get(BASE + u, { method: 'HEAD', headers: { 'accept-encoding': 'br, gzip' } })
    const e = r.headers.get('content-encoding')
    if (!/^(br|gzip)$/.test(e ?? '')) bad.push(`${u}: content-encoding ${e ?? 'none'}`)
  }
  check('compression', 'HTML, JS and CSS are served compressed', bad, `HTML + ${Math.min(assetUrls.length, 4)} JS/CSS files compressed (${enc})`)
}

/* ---- cache ----------------------------------------------------------------- */
if (run('cache')) {
  const fontsCss = await get(`${BASE}/fonts/fonts.css`)
  // Quotes around a url() are optional in CSS; accept both.
  const font = fontsCss.body.match(/url\(\s*['"]?(\/fonts\/[^'")]+\.woff2)['"]?\s*\)/)?.[1]
  const cases = [
    [assetUrls.find((u) => u.endsWith('.js')), /max-age=31536000/, /immutable/],
    [font, /max-age=31536000/, /immutable/],
    ['/img/hero-960.webp', /max-age=(\d{6,})/],
    ['/', /no-cache/],
    ['/contact-us/', /no-cache/],
    ['/robots.txt', /max-age=3600/],
    ['/sitemap.xml', /max-age=3600/],
  ]
  const bad = []
  for (const [u, ...want] of cases) {
    if (!u) { bad.push('could not find a JS asset or font URL to test'); continue }
    const cc = (await get(BASE + u, { method: 'HEAD' })).headers.get('cache-control') ?? ''
    if (!want.every((re) => re.test(cc))) bad.push(`${u}: "${cc || 'no Cache-Control'}"`)
  }
  check('cache', 'Cache-Control per file type', bad, `Cache-Control right on ${cases.length} file types (assets/fonts 1y immutable, images 30d, HTML no-cache, crawler files 1h)`)
}

/* ---- charset --------------------------------------------------------------- */
if (run('charset')) {
  const bad = []
  for (const u of ['/llms.txt', '/robots.txt']) {
    const r = await get(BASE + u)
    const ct = r.headers.get('content-type') ?? ''
    if (!/charset=utf-8/i.test(ct)) bad.push(`${u}: content-type "${ct}"`)
    if (r.body.includes('�')) bad.push(`${u}: body contains U+FFFD (mis-encoded)`)
  }
  check('charset', 'text files declare UTF-8', bad, 'llms.txt and robots.txt are served as UTF-8')
}

/* ---- robots ---------------------------------------------------------------- */
if (run('robots')) {
  const live = (await get(`${BASE}/robots.txt`)).body.replace(/\r\n/g, '\n').trim()
  // Normalise both sides: a Windows checkout (core.autocrlf) has CRLF locally.
  const repo = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8').replace(/\r\n/g, '\n').trim()
  if (live === repo) pass('robots', 'live robots.txt is byte-identical to public/robots.txt')
  else fail('robots', 'live robots.txt differs from public/robots.txt (stale deploy, or a host/CDN rewrote it)')
  if (live.includes(`Sitemap: ${PROD}/sitemap.xml`)) pass('robots', 'robots.txt carries the Sitemap directive')
  else fail('robots', 'robots.txt Sitemap directive missing')
}

/* ---- pages: every sitemap URL ----------------------------------------------- */
if (run('pages')) {
  const index = (await get(`${BASE}/sitemap.xml`)).body
  const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const urls = []
  for (const c of children) {
    const xml = (await get(toBase(c))).body
    urls.push(...[...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => unesc(m[1])))
  }
  const problems = { status: [], canonical: [], title: [], description: [], jsonld: [], faq: [], alt: [] }
  const decorative = []
  await pool(urls, 6, async (url) => {
    const r = await get(toBase(url))
    const p = new URL(url).pathname
    if (r.status !== 200) { problems.status.push(`${p}: ${r.status} ${r.location ?? ''}`); return }
    const h = r.body
    const canonical = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
    if (canonical !== url) problems.canonical.push(`${p}: ${canonical ?? 'none'}`)
    // Same thresholds as verify-seo.mjs.
    const title = unesc(h.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '')
    if (!title || title.length > 60) problems.title.push(`${p}: ${title.length} chars`)
    const desc = unesc(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '')
    if (desc.length < 70 || desc.length > 160) problems.description.push(`${p}: ${desc.length} chars`)
    const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    let graph = ''
    try { graph = blocks.map((b) => JSON.stringify(JSON.parse(b[1]))).join('') } catch { problems.jsonld.push(`${p}: does not parse`) }
    if (!blocks.length) problems.jsonld.push(`${p}: no JSON-LD`)
    // Any accordion with "faq" in its name: faq-<slug>, post-faq, home-faq.
    if (/<details[^>]*\sname="[^"]*faq[^"]*"/.test(h) && !graph.includes('"FAQPage"')) problems.faq.push(`${p}: visible FAQ, no FAQPage`)
    for (const tag of h.match(/<img\b[^>]*>/g) ?? []) {
      // (?:^|\s) so data-alt= or imagealt= do not count as an alt attribute.
      const alt = tag.match(/(?:^|\s)alt="([^"]*)"/)
      if (!alt) problems.alt.push(`${p}: ${tag.slice(0, 90)}`)
      else if (alt[1] === '') decorative.push(`${p}: ${tag.match(/\ssrc="([^"]+)"/)?.[1] ?? tag.slice(0, 60)}`)
    }
  })
  const n = urls.length
  check('pages', 'every sitemap URL answers 200 without a redirect', problems.status, `all ${n} sitemap URLs answer 200`)
  check('pages', 'every page has a self-referencing canonical', problems.canonical, `all ${n} canonicals self-reference`)
  check('pages', 'titles <= 60 characters', problems.title, `all ${n} titles <= 60 characters`)
  check('pages', 'descriptions 70-160 characters', problems.description, `all ${n} descriptions 70-160 characters`)
  check('pages', 'JSON-LD present and parses', problems.jsonld, `JSON-LD parses on all ${n} pages`)
  check('pages', 'every visible FAQ carries FAQPage', problems.faq, 'every page with a visible FAQ carries FAQPage')
  check('pages', 'every <img> has an alt attribute', problems.alt, `every <img> on ${n} pages has an alt attribute`)
  // Decorative images correctly use alt="", but SEO crawlers (Ryze included)
  // report them as "missing alt", so they are listed rather than failed.
  if (decorative.length) warn('pages', `${decorative.length} <img alt=""> (decorative; some audit tools count these as missing)`, decorative.slice(0, 10))
  else pass('pages', 'no <img alt=""> left for audit tools to flag')
}

/* ---- gtm ------------------------------------------------------------------- */
if (run('gtm')) {
  const h = home.body
  const bad = []
  if (!h.includes(ANALYTICS.gtmId)) bad.push(`container ${ANALYTICS.gtmId} not referenced on /`)
  // The stock GTM snippet loads at once on every visit; the loader in
  // scripts/prerender.mjs replaced it. Its signature means a stale deploy.
  if (/\(function\(w,d,s,l,i\)\{/.test(h)) bad.push('the old synchronous GTM snippet is still on / (stale build?)')
  if (!/gclid\|gbraid\|wbraid/.test(h)) bad.push('the conditional loader (immediate for ad clicks) is not on /')
  const ty = await get(`${BASE}/thank-you/`)
  if (ty.status === 200 && !/thank-you\|nft-brochure-thank-you/.test(ty.body)) bad.push('/thank-you/ does not carry the loader that fires GTM immediately')
  check('gtm', 'GTM is the conditional loader from this repo', bad, 'GTM loader present: immediate for ad-attributable visits and conversion pages, deferred otherwise')
}

/* ---- content: things that need the clinic, reported not failed ------------- */
if (run('content')) {
  const cost = await get(`${BASE}/hair-transplant-cost-in-bangalore/`)
  const hasPrice = /₹\s?\d/.test(cost.body.replace(/<script[\s\S]*?<\/script>/g, ''))
  if (hasPrice) pass('content', 'the cost page shows at least one ₹ figure')
  else warn('content', 'the cost page shows no ₹ figure yet (price ranges pending the clinic; docs/seo-audit/03-content-briefs.md s2)')
}

/* ---- report ---------------------------------------------------------------- */
console.log(`\nverify-live: ${BASE}${isProd ? '' : `  (not production; canonical origin ${PROD})`}\n`)
for (const r of results) {
  console.log(`  ${r.level.padEnd(4)}  [${r.group}] ${r.msg}`)
  for (const d of (r.detail ?? []).slice(0, 10)) console.log(`          ${d}`)
}
const failed = results.filter((r) => r.level === 'FAIL').length
const warned = results.filter((r) => r.level === 'WARN').length
console.log(`\n  ${results.length - failed - warned} pass, ${warned} warn, ${failed} fail\n`)
process.exit(failed ? 1 : 0)
