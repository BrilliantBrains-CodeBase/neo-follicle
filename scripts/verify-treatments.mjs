// Gate for the ten treatment pages.
//
// verify-seo.mjs checks the HEAD -- title, description, canonical, JSON-LD. It
// says nothing about the body, and these ten pages are all body. This checks
// the things that would actually ship broken:
//
//   1. exactly one <h1> per page (PagePlaceholder emits seoFor(slug).h1, so a
//      page that still renders it would have two)
//   2. exactly one JSON-LD block, i.e. none emitted from a component --
//      verify-seo check 6 would catch a WRONG graph, but a component block on
//      a page whose graph happens to match would slip through
//   3. every image the page references exists in public/
//   4. every generated image is referenced by some page (no orphans left
//      behind by an edit to treatment-assets.mjs)
//   5. every internal href resolves to a real route, trailing slash included
//   6. no section rendered empty, and no stub text survived
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TREATMENT_IMAGES } from './treatment-assets.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const pub = path.join(root, 'public')

const SLUGS = Object.keys(TREATMENT_IMAGES)

const results = []
const pass = (c) => results.push({ c, ok: true })
const fail = (c, d) => results.push({ c, ok: false, d })

const routes = new Set(
  [...fs.readFileSync(path.join(root, 'src/routes.tsx'), 'utf8').matchAll(/path: '([^']+)'/g)].map((m) => m[1]),
)

const docs = new Map()
const missingPages = []
for (const slug of SLUGS) {
  const file = path.join(dist, slug, 'index.html')
  if (!fs.existsSync(file)) missingPages.push(slug)
  else docs.set(slug, fs.readFileSync(file, 'utf8'))
}
missingPages.length
  ? fail(`${SLUGS.length} treatment pages prerendered`, `missing: ${missingPages.join(', ')}`)
  : pass(`${SLUGS.length} treatment pages prerendered`)
if (missingPages.length) { report(); process.exit(1) }

/* ---- 1. one h1 ------------------------------------------------------------- */
const h1s = [...docs].map(([slug, html]) => [slug, (html.match(/<h1[\s>]/g) ?? []).length])
const badH1 = h1s.filter(([, n]) => n !== 1).map(([slug, n]) => `${slug}: ${n}`)
badH1.length
  ? fail('exactly one <h1> per page', badH1.join(', '))
  : pass(`exactly one <h1> on each of the ${SLUGS.length}`)

/* ---- 1b. the hero is the site's hero card ---------------------------------- */
// Sections are siblings, never nested, so the hero is everything from the first
// <section to the second. Guards against a regression to the retired white,
// container-width 50/50 shell, whose h1 wrapped to four lines and whose image
// floated in dead space.
const heroOf = (html) => {
  const start = html.indexOf('<section')
  const next = html.indexOf('<section', start + 1)
  return html.slice(start, next === -1 ? undefined : next)
}
const heroBad = []
let stripsSeen = 0
for (const [slug, html] of docs) {
  const hero = heroOf(html)
  if (!hero.includes('bg-secondary')) heroBad.push(`${slug}: hero is not the dark inset card`)
  if (hero.includes('lg:w-1/2')) heroBad.push(`${slug}: hero reverted to the 50/50 split`)
  if (!/fetchpriority="high"/i.test(hero)) heroBad.push(`${slug}: hero image lost fetchPriority`)
  if ((hero.match(/<h1[\s>]/g) ?? []).length !== 1) heroBad.push(`${slug}: hero does not own the h1`)
  // The trust strip's hairline. Absent on the pages with no badges
  // (hair-transplant-cost-in-bangalore); never more than one.
  const strips = (hero.match(/bg-white\/20/g) ?? []).length
  if (strips > 1) heroBad.push(`${slug}: ${strips} trust-strip hairlines`)
  stripsSeen += strips
}
heroBad.length
  ? fail('every hero is the site hero card', heroBad.slice(0, 6).join('\n      '))
  : pass(`every hero is the dark inset card, owns the h1 and keeps fetchPriority (${stripsSeen}/${SLUGS.length} carry a trust strip)`)

/* ---- 2. no component-emitted JSON-LD --------------------------------------- */
const ld = [...docs].map(([slug, html]) => [slug, (html.match(/application\/ld\+json/g) ?? []).length])
const badLd = ld.filter(([, n]) => n !== 1).map(([slug, n]) => `${slug}: ${n} blocks`)
badLd.length
  ? fail('one JSON-LD block per page (none from components)', badLd.join(', '))
  : pass('one JSON-LD block per page -- no component emitted its own')

/* ---- 3/4. images ----------------------------------------------------------- */
const referenced = new Set()
const brokenImgs = []
for (const [slug, html] of docs) {
  for (const m of html.matchAll(/(?:src|srcSet)="(\/[^"]+\.(?:webp|png|jpe?g|svg))"/g)) {
    const src = m[1]
    if (src.startsWith('/treatments/')) referenced.add(src)
    if (!fs.existsSync(path.join(pub, src.replace(/^\//, '')))) brokenImgs.push(`${slug}: ${src}`)
  }
}
brokenImgs.length
  ? fail('every referenced image exists in public/', [...new Set(brokenImgs)].join('\n      '))
  : pass(`every referenced image exists in public/ (${referenced.size} treatment images used)`)

const onDisk = new Set()
for (const slug of fs.readdirSync(path.join(pub, 'treatments'))) {
  const dir = path.join(pub, 'treatments', slug)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const f of fs.readdirSync(dir)) onDisk.add(`/treatments/${slug}/${f}`)
}
const orphans = [...onDisk].filter((f) => f.endsWith('.webp') && !referenced.has(f))
orphans.length
  ? fail('no orphaned generated images', orphans.join(', '))
  : pass('no orphaned generated images -- every file gen-treatment-images wrote is used')

/* ---- 5. internal links ----------------------------------------------------- */
const dangling = new Set()
for (const [slug, html] of docs) {
  // Only the <main> -- header/footer links are verify-seo's check 8.
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''
  for (const m of main.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (!routes.has(m[1]) && !m[1].startsWith('/assets/')) dangling.add(`${slug}: ${m[1]}`)
  }
}
dangling.size
  ? fail('every in-body internal link resolves to a route', [...dangling].join('\n      '))
  : pass('every in-body internal link resolves to a route, trailing slash included')

/* ---- 6. no empty sections, no stub text ------------------------------------ */
const stubs = []
for (const [slug, html] of docs) {
  if (html.includes('Content pending')) stubs.push(`${slug}: PagePlaceholder text still rendered`)
  if (/<h2[^>]*>\s*<\/h2>/.test(html)) stubs.push(`${slug}: empty <h2>`)
  if (/FLAGGED FOR CLIENT REVIEW/i.test(html)) stubs.push(`${slug}: internal review flag leaked into the page`)
  const h2 = (html.match(/<h2[\s>]/g) ?? []).length
  if (h2 < 2) stubs.push(`${slug}: only ${h2} <h2> -- sections did not render`)
}
stubs.length
  ? fail('no stub text and no empty sections', stubs.join('\n      '))
  : pass('no stub text, no empty headings, no leaked review flags')

/* ---- report ---------------------------------------------------------------- */
function report() {
  console.log('')
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.c}${r.ok ? '' : `\n      ${r.d}`}`)
  const failed = results.filter((r) => !r.ok).length
  console.log(`\n  ${results.length - failed}/${results.length} checks passed\n`)
  return failed
}
process.exit(report() ? 1 : 0)
