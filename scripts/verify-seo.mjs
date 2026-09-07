#!/usr/bin/env node
/**
 * Diffs the prerendered dist/ output against the original backup.
 *
 * This is the safety net for the whole migration: it asserts that what a
 * crawler receives is byte-for-byte what the live WordPress site served, for
 * every field marked PRESERVE in reports/seo-audit.md.
 *
 * Run after `npm run build`. Exits non-zero on any failure.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const backup = path.join(root, 'neofollicle-seo-backup')
const ORIGIN = 'https://neofollicletransplant.com'

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

const unesc = (s) =>
  s.replaceAll('&quot;', '"').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&')

const pick = (html, re) => { const m = html.match(re); return m ? unesc(m[1]) : null }

const results = []
const fail = (check, detail) => results.push({ check, ok: false, detail })
const pass = (check) => results.push({ check, ok: true })

function distFileFor(url) {
  const p = url.startsWith(ORIGIN) ? url.slice(ORIGIN.length) : url
  return p === '/' ? path.join(dist, 'index.html')
    : path.join(dist, p.replace(/^\/|\/$/g, ''), 'index.html')
}

/* ---- 1. every file exists -------------------------------------------------- */
const missing = rows.filter(r => !fs.existsSync(distFileFor(r.url))).map(r => r.slug)
missing.length
  ? fail(`${rows.length} HTML files exist`, `missing: ${missing.join(', ')}`)
  : pass(`${rows.length} HTML files exist at their exact paths`)
if (missing.length) { report(); process.exit(1) }

const docs = new Map(rows.map(r => [r.slug, fs.readFileSync(distFileFor(r.url), 'utf8')]))

/* ---- 2/3. title + description byte-for-byte -------------------------------- */
for (const [field, re, csvKey] of [
  ['title', /<title>([\s\S]*?)<\/title>/, 'title'],
  ['description', /<meta name="description" content="([^"]*)"/, 'meta_description'],
]) {
  const bad = rows.filter(r => (pick(docs.get(r.slug), re) ?? '') !== r[csvKey])
    .map(r => `${r.slug}: got ${JSON.stringify(pick(docs.get(r.slug), re))}`)
  bad.length
    ? fail(`${field} matches the capture on all ${rows.length}`, bad.slice(0, 5).join('\n      '))
    : pass(`${field} matches the capture byte-for-byte on all ${rows.length}`)
}

/* ---- 4. canonical: present on 53, absent on the 6 noindex LPs -------------- */
const canonRe = /<link rel="canonical" href="([^"]*)"/
const canonBad = rows.filter(r => (pick(docs.get(r.slug), canonRe) ?? '') !== r.canonical)
  .map(r => `${r.slug}: expected ${JSON.stringify(r.canonical)}, got ${JSON.stringify(pick(docs.get(r.slug), canonRe))}`)
canonBad.length
  ? fail('canonical matches (and is absent on the 6 LPs)', canonBad.slice(0, 5).join('\n      '))
  : pass(`canonical matches on all ${rows.length} -- present on ${rows.filter(r => r.canonical).length}, absent on ${rows.filter(r => !r.canonical).length}`)

/* ---- 5. robots, esp. noindex on the 6 ad landing pages --------------------- */
const robotsRe = /<meta name="robots" content="([^"]*)"/
const robotsBad = rows.filter(r => pick(docs.get(r.slug), robotsRe) !== r.robots).map(r => r.slug)
const noindexKept = rows.filter(r => r.sitemap_included === 'False')
  .filter(r => (pick(docs.get(r.slug), robotsRe) ?? '').includes('noindex')).length
robotsBad.length
  ? fail('robots matches on all pages', `mismatched: ${robotsBad.join(', ')}`)
  : pass(`robots matches on all ${rows.length}; noindex retained on ${noindexKept}/6 ad landing pages`)

/* ---- 6. JSON-LD deep-equals the captured graph ----------------------------- */
const canon = (v) => {
  if (Array.isArray(v)) return v.map(canon)
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.keys(v).sort().map(k => [k, canon(v[k])]))
  }
  return v
}
const ldRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
const ldBad = []
let faqPages = 0, faqQuestions = 0

for (const r of rows) {
  const html = docs.get(r.slug)
  const blocks = [...html.matchAll(ldRe)].map(m => m[1])
  let parsed
  try { parsed = blocks.map(b => JSON.parse(b)) }
  catch (e) { ldBad.push(`${r.slug}: unparseable JSON-LD (${e.message})`); continue }

  const expected = JSON.parse(fs.readFileSync(path.join(backup, 'pages', r.slug, 'schema.jsonld'), 'utf8'))
  if (JSON.stringify(canon(parsed)) !== JSON.stringify(canon(expected))) {
    ldBad.push(`${r.slug}: graph differs from the capture`)
    continue
  }

  for (const block of parsed) {
    for (const node of block['@graph'] ?? []) {
      const types = [].concat(node['@type'] ?? [])
      if (types.includes('FAQPage')) {
        faqPages++
        faqQuestions += (node.mainEntity ?? []).length
      }
    }
  }
}
ldBad.length
  ? fail('JSON-LD deep-equals the capture on all pages', ldBad.slice(0, 5).join('\n      '))
  : pass(`JSON-LD deep-equals the capture on all ${rows.length} pages`)

/* ---- 7. FAQ rich-result coverage ------------------------------------------- */
faqPages === 14 && faqQuestions === 82
  ? pass('14 FAQPage graphs present, 82 questions total')
  : fail('14 FAQPage graphs / 82 questions', `got ${faqPages} FAQPages, ${faqQuestions} questions`)

/* ---- 8. every nav link resolves to a real route ---------------------------- */
const routePaths = new Set(rows.map(r => (r.url.startsWith(ORIGIN) ? r.url.slice(ORIGIN.length) : r.url) || '/'))
const home = docs.get('home')
const chrome = [
  ...(home.match(/<header[\s\S]*?<\/header>/) ?? []),
  ...(home.match(/<footer[\s\S]*?<\/footer>/) ?? []),
].join('')
const internal = [...chrome.matchAll(/href="(\/[^"]*)"/g)].map(m => m[1])
const dangling = [...new Set(internal.filter(h => !routePaths.has(h) && !h.startsWith('/assets/') && h !== '/favicon.svg' && h !== '/logo.svg'))]
dangling.length
  ? fail('every header/footer link resolves to a route', `dangling: ${dangling.join(', ')}`)
  : pass(`all ${new Set(internal).size} unique header/footer links resolve to real routes`)

/* ---- 9. sitemaps + robots.txt ---------------------------------------------- */
const sitemapUrls = ['sitemap-post-type-page.xml', 'sitemap-post-type-post.xml', 'sitemap-taxonomy-category.xml']
  .flatMap(f => [...fs.readFileSync(path.join(dist, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]))
const expectedSitemap = rows.filter(r => r.sitemap_included === 'True').map(r => r.url)
const sitemapDiff = [
  ...expectedSitemap.filter(u => !sitemapUrls.includes(u)).map(u => `missing ${u}`),
  ...sitemapUrls.filter(u => !expectedSitemap.includes(u)).map(u => `extra ${u}`),
]
sitemapDiff.length
  ? fail('sitemaps list exactly the 53 indexable URLs', sitemapDiff.slice(0, 5).join('\n      '))
  : pass(`sitemaps list exactly the ${expectedSitemap.length} indexable URLs, and none of the 6 noindex pages`)

fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').includes(`Sitemap: ${ORIGIN}/sitemap.xml`)
  ? pass('robots.txt carries the Sitemap directive')
  : fail('robots.txt carries the Sitemap directive', 'directive missing')

/* ---- report ---------------------------------------------------------------- */
function report() {
  console.log('')
  for (const r of results) {
    console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.check}`)
    if (!r.ok) console.log(`      ${r.detail}`)
  }
  const failed = results.filter(r => !r.ok).length
  console.log(`\n  ${results.length - failed}/${results.length} checks passed\n`)
  return failed
}

process.exit(report() === 0 ? 0 : 1)
