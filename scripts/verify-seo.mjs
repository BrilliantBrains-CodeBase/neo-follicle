#!/usr/bin/env node
/**
 * Checks the prerendered dist/ against its sources and the SEO rules.
 *
 * This is the safety net for the whole migration. Every value is recomputed
 * from the ORIGINAL inputs -- the WordPress capture, content/seo/overrides.json,
 * the authored content/seo records -- rather than read back from the generated
 * src/seo/pages.ts, so a bug in gen-seo cannot hide itself.
 *
 *   A. carried over:  every URL exists; title/description/robots/canonical are
 *                     the capture's unless overridden; every captured JSON-LD
 *                     node survives; FAQ coverage intact.
 *   B. rules:         indexable titles <= 60 and descriptions 70-160; share
 *                     cards exist at 1200x630; one graph per page with no
 *                     duplicate @id; no dead image or search URLs.
 *   C. site files:    sitemaps, robots.txt, llms.txt, manifest and icons.
 *
 * Run after `npm run build`. Exits non-zero on any failure.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { SEO } from '../src/config/site.ts'
import { BROKEN_IMAGE_MAP } from './seo/entity-graph.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const backup = path.join(root, 'neofollicle-seo-backup')
const authoredDir = path.join(root, 'content', 'seo')
const ORIGIN = SEO.origin

if (!fs.existsSync(dist)) {
  console.error('dist/ not found -- run `npm run build` first.')
  process.exit(1)
}

/* ---- the same CSV parser gen-seo uses, so both read the source identically -- */
function parseCsv(text) {
  const rows = []
  let row = [], field = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++ } else inQuotes = false }
      else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c === '\r') { /* skip */ }
    else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  const header = rows.shift()
  return rows.filter(r => r.length === header.length)
    .map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])))
}

const rows = parseCsv(fs.readFileSync(path.join(backup, '01-SEO-MASTER.csv'), 'utf8'))
const authored = fs.readdirSync(authoredDir)
  .filter((file) => file.endsWith('.json') && file !== 'overrides.json')
  .sort()
  .map((file) => JSON.parse(fs.readFileSync(path.join(authoredDir, file), 'utf8')))
const overrides = JSON.parse(fs.readFileSync(path.join(authoredDir, 'overrides.json'), 'utf8'))

/**
 * The expected record for every page, built from the sources: capture row or
 * authored record, then its override.
 */
const expected = [
  ...rows.map((r) => ({
    slug: r.slug,
    path: (r.url.startsWith(ORIGIN) ? r.url.slice(ORIGIN.length) : r.url) || '/',
    title: r.title,
    description: r.meta_description,
    robots: r.robots,
    canonical: r.canonical || null,
    inSitemap: r.sitemap_included === 'True',
    captured: path.join(backup, 'pages', r.slug, 'schema.jsonld'),
  })),
  ...authored.map(({ seo }) => ({ ...seo, captured: null })),
].map((p) => {
  const o = overrides[p.slug] ?? {}
  return {
    ...p,
    title: o.title ?? p.title,
    description: o.description ?? p.description,
    robots: o.robots ?? p.robots,
    inSitemap: o.inSitemap ?? p.inSitemap,
  }
})
const indexable = expected.filter((p) => p.inSitemap)

const unesc = (s) =>
  s.replaceAll('&quot;', '"').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&')
const pick = (html, re) => { const m = html.match(re); return m ? unesc(m[1]) : null }

const results = []
const fail = (check, detail) => results.push({ check, ok: false, detail })
const pass = (check) => results.push({ check, ok: true })
const check = (label, problems, okLabel = label) =>
  problems.length ? fail(label, problems.slice(0, 8).join('\n      ')) : pass(okLabel)

const distFileFor = (p) => (p === '/' ? path.join(dist, 'index.html') : path.join(dist, p.replace(/^\/|\/$/g, ''), 'index.html'))
const distFileForUrl = (url) => path.join(dist, decodeURIComponent(new URL(url).pathname))

/* ==== A. carried over ====================================================== */

const missing = expected.filter((p) => !fs.existsSync(distFileFor(p.path))).map((p) => p.slug)
check(`${expected.length} HTML files exist`, missing.map((s) => `missing: ${s}`),
  `${expected.length} HTML files exist at their exact paths`)
if (missing.length) { report(); process.exit(1) }

const docs = new Map(expected.map((p) => [p.slug, fs.readFileSync(distFileFor(p.path), 'utf8')]))

const RE = {
  title: /<title>([\s\S]*?)<\/title>/,
  description: /<meta name="description" content="([^"]*)"/,
  robots: /<meta name="robots" content="([^"]*)"/,
  canonical: /<link rel="canonical" href="([^"]*)"/,
  ogImage: /<meta property="og:image" content="([^"]*)"/,
  twitterImage: /<meta name="twitter:image" content="([^"]*)"/,
  ogLocale: /<meta property="og:locale" content="([^"]*)"/,
}

for (const field of ['title', 'description', 'robots', 'canonical']) {
  const bad = expected
    .filter((p) => pick(docs.get(p.slug), RE[field]) !== p[field])
    .map((p) => `${p.slug}: expected ${JSON.stringify(p[field])}, got ${JSON.stringify(pick(docs.get(p.slug), RE[field]))}`)
  check(`${field} matches capture + overrides`, bad,
    `${field} matches capture + overrides on all ${expected.length}`)
}

const lpNoindex = expected.filter((p) => p.captured && !p.inSitemap && !p.canonical)
check('noindex kept on the ad landing pages',
  lpNoindex.filter((p) => !pick(docs.get(p.slug), RE.robots)?.includes('noindex')).map((p) => p.slug),
  `noindex kept on all ${lpNoindex.length} ad/utility landing pages`)

check('indexable pages carry a self-referencing canonical',
  indexable.filter((p) => pick(docs.get(p.slug), RE.canonical) !== `${ORIGIN}${p.path}`).map((p) => p.slug),
  `all ${indexable.length} indexable pages carry a self-referencing, trailing-slash canonical`)

/* JSON-LD: parse, and every captured page-specific node still present by @id. */
const ldRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
const graphs = new Map()
const ldBad = []
for (const p of expected) {
  try {
    graphs.set(p.slug, [...docs.get(p.slug).matchAll(ldRe)].map((m) => JSON.parse(m[1])))
  } catch (e) {
    ldBad.push(`${p.slug}: unparseable JSON-LD (${e.message})`)
  }
}
check('JSON-LD parses on every page', ldBad)

const ENTITY = new RegExp(`^${ORIGIN}/(#(website|organization|clinic|medicalclinic|medical-clinic|searchaction|dr-sandeep-mahapatra)|dr-sandeep-mahapatra-hair-transplant-surgeon/#physician)$`)
const lost = []
for (const p of expected) {
  const source = p.captured ? JSON.parse(fs.readFileSync(p.captured, 'utf8')) : authored.find((a) => a.seo.slug === p.slug).schema
  const have = new Set((graphs.get(p.slug)?.[0]?.['@graph'] ?? []).map((n) => n['@id']))
  for (const node of source.flatMap((b) => b['@graph'] ?? [b])) {
    const id = node['@id']
    if (id && !ENTITY.test(id) && !have.has(id)) lost.push(`${p.slug}: lost ${id}`)
  }
}
check('every captured page-specific JSON-LD node survives', lost,
  'every captured and authored page-specific JSON-LD node survives normalisation')

let faqPages = 0, faqQuestions = 0
for (const g of graphs.values()) {
  for (const node of g[0]?.['@graph'] ?? []) {
    if ([].concat(node['@type'] ?? []).includes('FAQPage')) {
      faqPages++
      faqQuestions += (node.mainEntity ?? []).length
    }
  }
}
faqPages === 15 && faqQuestions === 90
  ? pass('15 FAQPage graphs present, 90 questions total')
  : fail('15 FAQPage graphs / 90 questions', `got ${faqPages} FAQPages, ${faqQuestions} questions`)

/* ==== B. rules ============================================================== */

check('indexable titles are <= 60 characters',
  indexable.filter((p) => p.title.length > 60).map((p) => `${p.slug}: ${p.title.length} chars`),
  `all ${indexable.length} indexable titles are <= 60 characters`)

check('indexable descriptions are 70-160 characters',
  indexable.filter((p) => p.description.length < 70 || p.description.length > 160)
    .map((p) => `${p.slug}: ${p.description.length} chars`),
  `all ${indexable.length} indexable descriptions are 70-160 characters`)

const cardBad = []
for (const p of expected) {
  const html = docs.get(p.slug)
  const og = pick(html, RE.ogImage)
  if (!og) { cardBad.push(`${p.slug}: no og:image`); continue }
  if (pick(html, RE.twitterImage) !== og) cardBad.push(`${p.slug}: twitter:image differs from og:image`)
  if (pick(html, RE.ogLocale) !== SEO.locale) cardBad.push(`${p.slug}: og:locale is not ${SEO.locale}`)
  const file = distFileForUrl(og)
  if (!fs.existsSync(file)) { cardBad.push(`${p.slug}: ${og} not in dist`); continue }
  const { width, height } = await sharp(file).metadata()
  if (width !== 1200 || height !== 630) cardBad.push(`${p.slug}: card is ${width}x${height}`)
  if (fs.statSync(file).size > 300 * 1024) cardBad.push(`${p.slug}: card over 300 KB`)
}
check('every page has a 1200x630 share card', cardBad,
  `all ${expected.length} pages have a 1200x630 og/twitter card under 300 KB, og:locale ${SEO.locale}`)

const graphBad = []
for (const [slug, g] of graphs) {
  if (g.length !== 1) graphBad.push(`${slug}: ${g.length} JSON-LD blocks`)
  const counts = new Map()
  for (const n of g[0]?.['@graph'] ?? []) if (n['@id']) counts.set(n['@id'], (counts.get(n['@id']) ?? 0) + 1)
  for (const [id, c] of counts) if (c > 1) graphBad.push(`${slug}: ${id} defined ${c}x`)
  for (const id of [`${ORIGIN}/#clinic`, `${ORIGIN}/#organization`, `${ORIGIN}/#website`]) {
    if (!counts.has(id)) graphBad.push(`${slug}: missing ${id}`)
  }
}
check('one graph per page, no duplicate @id, site entities present', graphBad,
  `all ${graphs.size} pages: one @graph, no duplicate @id, #website/#organization/#clinic present`)

// Every same-origin image URL in any page's head must be served by dist/ --
// this is what catches a wp-content image that was never mirrored.
const urlBad = new Set()
const imageUrl = /(https:\/\/neofollicletransplant\.com\/[^"\s]+\.(?:png|jpe?g|webp|svg))"/g
for (const [slug, html] of docs) {
  const head = html.slice(0, html.indexOf('</head>'))
  for (const m of head.matchAll(imageUrl)) {
    const u = unesc(m[1])
    if (!fs.existsSync(distFileForUrl(u))) urlBad.add(`${slug}: ${u}`)
  }
  for (const dead of Object.keys(BROKEN_IMAGE_MAP)) if (head.includes(dead)) urlBad.add(`${slug}: dead ${dead}`)
  if (head.includes('search_term_string')) urlBad.add(`${slug}: WordPress SearchAction`)
}
check('every image URL in the head and JSON-LD is served by dist/', [...urlBad],
  'every same-origin image URL in the head and JSON-LD is served by dist/ (incl. mirrored wp-content)')

/* ==== C. site files ========================================================= */

/* every nav link resolves to a real route */
const routePaths = new Set(expected.map((p) => p.path))
const home = docs.get('home')
const chrome = [
  ...(home.match(/<header[\s\S]*?<\/header>/) ?? []),
  ...(home.match(/<footer[\s\S]*?<\/footer>/) ?? []),
].join('')
const internal = [...chrome.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1])
const dangling = [...new Set(internal.filter((h) => !routePaths.has(h) && !h.startsWith('/assets/') && !/\.(svg|ico|png|webmanifest)$/.test(h)))]
check('every header/footer link resolves to a route', dangling.map((d) => `dangling: ${d}`),
  `all ${new Set(internal).size} unique header/footer links resolve to real routes`)

const childSitemaps = ['sitemap-post-type-page.xml', 'sitemap-post-type-post.xml']
const sitemapXml = childSitemaps.map((f) => fs.readFileSync(path.join(dist, f), 'utf8')).join('\n')
const sitemapUrls = [...sitemapXml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const expectedSitemap = indexable.map((p) => `${ORIGIN}${p.path}`)
check(`sitemaps list exactly the ${expectedSitemap.length} indexable URLs`, [
  ...expectedSitemap.filter((u) => !sitemapUrls.includes(u)).map((u) => `missing ${u}`),
  ...sitemapUrls.filter((u) => !expectedSitemap.includes(u)).map((u) => `extra ${u}`),
], `sitemaps list exactly the ${expectedSitemap.length} indexable URLs`)

const noLastmod = [...sitemapXml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?!\s*<lastmod>)/g)].map((m) => m[1])
check('every sitemap URL has a lastmod', noLastmod)

const imageLocs = [...sitemapXml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => unesc(m[1]))
check('every sitemap image is served by dist/',
  imageLocs.filter((u) => !fs.existsSync(distFileForUrl(u))).map((u) => `missing ${u}`),
  `all ${imageLocs.length} sitemap image entries are served by dist/`)

const index = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
const indexed = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
check('sitemap.xml indexes every child sitemap', [
  ...childSitemaps.filter((f) => !indexed.includes(`${ORIGIN}/${f}`)).map((f) => `not indexed ${f}`),
  ...indexed.filter((u) => !fs.existsSync(path.join(dist, new URL(u).pathname))).map((u) => `missing ${u}`),
])

fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').includes(`Sitemap: ${ORIGIN}/sitemap.xml`)
  ? pass('robots.txt carries the Sitemap directive')
  : fail('robots.txt carries the Sitemap directive', 'directive missing')

const llms = fs.readFileSync(path.join(dist, 'llms.txt'), 'utf8')
const llmsLinks = new Set([...llms.matchAll(/\]\((https:[^)]+)\)/g)].map((m) => m[1]))
check('llms.txt links every indexable page and nothing else', [
  ...expectedSitemap.filter((u) => !llmsLinks.has(u)).map((u) => `missing ${u}`),
  ...[...llmsLinks].filter((u) => !expectedSitemap.includes(u) && !u.endsWith('/llms-full.txt')).map((u) => `extra ${u}`),
  ...(fs.existsSync(path.join(dist, 'llms-full.txt')) ? [] : ['llms-full.txt missing']),
], `llms.txt links all ${expectedSitemap.length} indexable pages; llms-full.txt present`)

const siteFiles = ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'site.webmanifest']
check('icons and manifest are in dist', siteFiles.filter((f) => !fs.existsSync(path.join(dist, f))).map((f) => `missing ${f}`),
  `icons and web manifest present (${siteFiles.length} files)`)

/* ---- report ---------------------------------------------------------------- */
function report() {
  console.log('')
  for (const r of results) {
    console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.check}`)
    if (!r.ok) console.log(`      ${r.detail}`)
  }
  const failed = results.filter((r) => !r.ok).length
  console.log(`\n  ${results.length - failed}/${results.length} checks passed\n`)
  return failed
}

process.exit(report() === 0 ? 0 : 1)
