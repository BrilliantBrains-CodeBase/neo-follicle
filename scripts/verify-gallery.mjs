// Gate for /image-gallery/ and /video-gallery/.
//
// A separate script rather than an extension of verify-treatments.mjs, which is
// keyed on Object.keys(TREATMENT_IMAGES) and whose orphan scan is hard-wired to
// walking public/treatments/<slug>/. Bending it to cover two pages with a
// different asset layout would make both jobs worse. The pass/fail/report shape
// is copied verbatim so the console output stays one house style.
//
// Two checks here exist because verify-treatments.mjs would get them wrong:
//
//   - the reference scan collects href= as well as src=. Every full-size
//     derivative appears ONLY as a tile anchor's href, so an src-only sweep
//     would report all 82 of them as orphans.
//   - internal link resolution accepts a file under public/ as well as a route.
//     verify-treatments check 5 special-cases only /assets/, so the 82 tile
//     anchors would all read as dangling.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { GALLERY_SECTIONS, VIDEO_SECTIONS } from './gallery-assets.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const pub = path.join(root, 'public')

const SLUGS = ['image-gallery', 'video-gallery']

const results = []
const pass = (c) => results.push({ c, ok: true })
const fail = (c, d) => results.push({ c, ok: false, d })

function report() {
  console.log('')
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.c}${r.ok ? '' : `\n      ${r.d}`}`)
  const failed = results.filter((r) => !r.ok).length
  console.log(`\n  ${results.length - failed}/${results.length} checks passed\n`)
  return failed
}

const routes = new Set(
  [...fs.readFileSync(path.join(root, 'src/routes.tsx'), 'utf8').matchAll(/path: '([^']+)'/g)].map((m) => m[1]),
)

/* ---- 1. prerendered ---------------------------------------------------------- */
const docs = new Map()
const missing = []
for (const slug of SLUGS) {
  const file = path.join(dist, slug, 'index.html')
  if (!fs.existsSync(file)) missing.push(slug)
  else docs.set(slug, fs.readFileSync(file, 'utf8'))
}
missing.length
  ? fail('both gallery pages prerendered', `missing: ${missing.join(', ')}`)
  : pass('both gallery pages prerendered')
if (missing.length) process.exit(report() ? 1 : 0)

const count = (html, re) => (html.match(re) ?? []).length

/* ---- 2. headings ------------------------------------------------------------- */
const headingBad = []
for (const [slug, html] of docs) {
  const h1 = count(html, /<h1[\s>]/g)
  const h2 = count(html, /<h2[\s>]/g)
  if (h1 !== 1) headingBad.push(`${slug}: ${h1} <h1> (PagePlaceholder still rendering?)`)
  if (h2 < 2) headingBad.push(`${slug}: only ${h2} <h2> -- sections did not render`)
}
headingBad.length
  ? fail('exactly one <h1> and real sections per page', headingBad.join('\n      '))
  : pass('exactly one <h1> per page, sections rendered')

/* ---- 3. no component-emitted JSON-LD ----------------------------------------- */
const ldBad = []
for (const [slug, html] of docs) {
  const n = count(html, /application\/ld\+json/g)
  if (n !== 1) ldBad.push(`${slug}: ${n} blocks`)
}
ldBad.length
  ? fail('one JSON-LD block per page (none from components)', ldBad.join(', '))
  : pass('one JSON-LD block per page -- none emitted from a component')

/* ---- 4/5. images: referenced exist, generated are referenced ------------------ */
// src=, href= and CSS background-image url(...) -- PageBanner renders its cover
// as a background, so an src-only sweep would miss a broken banner.
const REF = /(?:src|srcSet|href)="(\/[^"]+\.(?:webp|png|jpe?g|svg))"|background-image:\s*url\(&#39;(\/[^&]+)&#39;\)|background-image:\s*url\('(\/[^']+)'\)/g

const referenced = new Set()
const broken = []
for (const [slug, html] of docs) {
  for (const m of html.matchAll(REF)) {
    const src = m[1] ?? m[2] ?? m[3]
    if (!src) continue
    referenced.add(src)
    if (!fs.existsSync(path.join(pub, src.replace(/^\//, '')))) broken.push(`${slug}: ${src}`)
  }
}
broken.length
  ? fail('every referenced image exists in public/', [...new Set(broken)].join('\n      '))
  : pass(`every referenced image exists in public/ (${referenced.size} unique)`)

const onDisk = []
for (const dir of ['image-gallery', 'video-gallery']) {
  const base = path.join(pub, dir)
  if (!fs.existsSync(base)) continue
  const walk = (d) => {
    for (const f of fs.readdirSync(d)) {
      const full = path.join(d, f)
      if (fs.statSync(full).isDirectory()) walk(full)
      else if (f.endsWith('.webp')) onDisk.push(`/${path.relative(pub, full)}`)
    }
  }
  walk(base)
}
const orphans = onDisk.filter((f) => !referenced.has(f))
orphans.length
  ? fail('no orphaned generated images', `${orphans.length}: ${orphans.slice(0, 8).join(', ')}`)
  : pass(`no orphaned generated images -- all ${onDisk.length} generated files are used`)

/* ---- 6. chip anchors resolve to a real id ------------------------------------ */
const danglingHash = []
for (const [slug, html] of docs) {
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(m[1])) danglingHash.push(`${slug}: #${m[1]}`)
  }
}
danglingHash.length
  ? fail('every in-page anchor resolves to an id', danglingHash.join('\n      '))
  : pass('every in-page anchor resolves to an id in the same document')

/* ---- 7. schema hasPart ids exist in the DOM ---------------------------------- */
// The contract that makes the anchored-section structure enforceable rather
// than aspirational: the graph promises these fragments, the page must have them.
const schemaBad = []
for (const slug of SLUGS) {
  const graph = JSON.parse(fs.readFileSync(path.join(root, 'src/seo/schema', `${slug}.json`), 'utf8'))
  const fragments = graph
    .flatMap((b) => b['@graph'] ?? [])
    .filter((n) => /Gallery/.test(String(n['@type'])))
    .flatMap((n) => n.hasPart ?? [])
    .map((p) => String(p['@id']).split('#')[1])
    .filter(Boolean)
  const html = docs.get(slug)
  for (const f of fragments) {
    if (!html.includes(`id="${f}"`)) schemaBad.push(`${slug}: graph declares #${f}, page has no such id`)
  }
}
schemaBad.length
  ? fail('schema hasPart anchors exist in the page', schemaBad.join('\n      '))
  : pass('every schema hasPart anchor exists as a section id')

/* ---- 8. alt text: present, sized, and not the captured junk ------------------ */
// The whole point of authoring 82 alts. If a capture alt is ever pasted back
// into gallery-assets.mjs this is what catches it.
// Scoped to the IMAGE gallery. A video tile's alt is its YouTube title, and
// real titles legitimately begin "NFT ..." and "Failed Hair Transplant Repair
// ..." -- running these patterns over them only produces false failures.
const JUNK = /^(nft |female \(\d|r\d bf \d|exosome before after|scalp micropigmentation before after|failed hair t|8[234]$)/i
const altBad = []
for (const [slug, html] of docs) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''
  for (const m of main.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0]
    const alt = tag.match(/\salt="([^"]*)"/)?.[1]
    const w = tag.match(/\swidth="(\d+)"/)?.[1]
    const h = tag.match(/\sheight="(\d+)"/)?.[1]
    const src = tag.match(/\ssrc="([^"]*)"/)?.[1] ?? '?'
    if (!alt) altBad.push(`${slug}: empty alt on ${src}`)
    else if (slug === 'image-gallery' && JUNK.test(alt)) {
      altBad.push(`${slug}: captured junk alt "${alt}" on ${src}`)
    }
    if (!w || !h || w === '0' || h === '0') altBad.push(`${slug}: missing width/height on ${src}`)
  }
}
altBad.length
  ? fail('every image has authored alt text and intrinsic dimensions', altBad.slice(0, 8).join('\n      '))
  : pass('every in-body image has authored alt text and real width/height')

/* ---- 9. internal links ------------------------------------------------------- */
const dangling = new Set()
for (const [slug, html] of docs) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''
  for (const m of main.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1]
    if (routes.has(href)) continue
    if (href.startsWith('/assets/')) continue
    if (fs.existsSync(path.join(pub, href.replace(/^\//, '')))) continue
    dangling.add(`${slug}: ${href}`)
  }
}
dangling.size
  ? fail('every in-body internal link resolves', [...dangling].join('\n      '))
  : pass('every in-body internal link resolves to a route or a file in public/')

/* ---- 10. no stubs, no leaked review flags ------------------------------------ */
const stubs = []
for (const [slug, html] of docs) {
  if (html.includes('Content pending')) stubs.push(`${slug}: PagePlaceholder text still rendered`)
  if (/<h2[^>]*>\s*<\/h2>/.test(html)) stubs.push(`${slug}: empty <h2>`)
  if (/FLAGGED FOR CLIENT REVIEW/i.test(html)) stubs.push(`${slug}: internal review flag leaked into the page`)
}
stubs.length
  ? fail('no stub text and no leaked review flags', stubs.join('\n      '))
  : pass('no stub text, no empty headings, no leaked review flags')

/* ---- 11. the facade contract: no third-party frame in static HTML ------------ */
const frames = []
for (const [slug, html] of docs) {
  const n = count(html, /<iframe[\s>]/g)
  if (n > 0) frames.push(`${slug}: ${n} <iframe> in the prerendered HTML`)
}
frames.length
  ? fail('no <iframe> ships in the static HTML', frames.join(', '))
  : pass('no <iframe> in either page -- nothing contacts YouTube before a click')

/* ---- 12. every tile carries a real title ------------------------------------- */
const videoIds = VIDEO_SECTIONS.flatMap((s) => s.ids)
const html = docs.get('video-gallery')
const posters = new Set(
  [...html.matchAll(/src="(\/video-gallery\/[^"]+\.webp)"/g)].map((m) => m[1]),
)
const titleBad = []
if (posters.size !== videoIds.length) {
  titleBad.push(`${posters.size} posters rendered, expected ${videoIds.length}`)
}
for (const m of html.matchAll(/<img\b[^>]*src="\/video-gallery\/([^"]+)\.webp"[^>]*>/g)) {
  const alt = m[0].match(/\salt="([^"]*)"/)?.[1] ?? ''
  if (!alt) titleBad.push(`${m[1]}: poster has no alt`)
  else if (alt === m[1]) titleBad.push(`${m[1]}: title is the bare video id`)
}
titleBad.length
  ? fail('every video tile has a real title', titleBad.slice(0, 8).join('\n      '))
  : pass(`all ${videoIds.length} video tiles carry a real title from oEmbed`)

/* ---- 13. the manifest and the page agree ------------------------------------- */
const expectedTiles = GALLERY_SECTIONS.reduce((a, s) => a + s.images.length, 0)
// UNIQUE paths, not occurrences: React 19 emits its own
// <link rel="preload" as="image"> for every loading="eager" <img>, so the first
// row of the first section legitimately appears twice in the document.
const renderedTiles = new Set(
  [...docs.get('image-gallery').matchAll(/"(\/image-gallery\/[^"]+-thumb\.webp)"/g)].map((m) => m[1]),
).size
renderedTiles === expectedTiles
  ? pass(`all ${expectedTiles} manifest images rendered`)
  : fail('every manifest image is rendered', `manifest has ${expectedTiles}, page renders ${renderedTiles}`)

process.exit(report() ? 1 : 0)
