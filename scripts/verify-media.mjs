// Press coverage gate.
//
// src/content/media/coverage.ts is the first hand-authored content module on
// the site -- everything else under src/content/ is generated from the capture,
// and a generator cannot paste the same URL in twice or forget an alt. This
// data will also grow every month, by hand, which is exactly the shape of thing
// that rots quietly. So it gets a gate.
//
// Run with `npm run verify:media`. Exits non-zero on any failure.
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'node-html-parser'
import { root } from './blog-assets.mjs'

const coverageFile = path.join(root, 'src/content/media/coverage.ts')
const generatedFile = path.join(root, 'src/content/media/clippings.generated.ts')
const dist = path.join(root, 'dist')

const src = fs.readFileSync(coverageFile, 'utf8')

let failures = 0
const fail = (msg) => {
  failures++
  console.log(`  FAIL  ${msg}`)
}
const pass = (msg) => console.log(`  ok    ${msg}`)

/* ---- read the entries without a TS loader ---------------------------------- */
// The module is authored, not generated, so it cannot be JSON.parse'd like the
// post records. Entries are matched on their `date:` key, which every one has.
const entries = [...src.matchAll(/\n  \{\n([\s\S]*?)\n  \},/g)].map((m) => m[1])
const field = (block, key) => block.match(new RegExp(`\\b${key}: (?:'([^']*)'|"([^"]*)")`))?.slice(1).find(Boolean)

// An entry is a block with a `date`; the SYNDICATION outlets are {name, href}
// objects that the same brace pattern would otherwise sweep up.
const items = entries
  .filter((block) => /(^|\n)    date: '/.test(block))
  .map((block) => ({
  block,
  date: field(block, 'date'),
  publication: field(block, 'publication'),
  title: block.match(/\n    title:\s*([\s\S]*?),\n/)?.[1]?.trim(),
  href: field(block, 'href'),
  hasClipping: /\n    clipping: \{/.test(block),
  syndicated: /syndicatedTo: SYNDICATION/.test(block),
}))

const allHrefs = [...src.matchAll(/href: '([^']+)'/g)].map((m) => m[1])
const outletCount = (src.match(/const SYNDICATION: MediaOutlet\[\] = \[([\s\S]*?)\n\]/)?.[1].match(/name:/g) ?? []).length

console.log(`verify-media: ${items.length} entries, ${allHrefs.length} outbound links`)

/* ---- 1. every entry links or has a clipping -------------------------------- */
const orphan = items.filter((i) => !i.href && !i.hasClipping)
orphan.length
  ? fail(`${orphan.length} entr(ies) with neither href nor clipping: ${orphan.map((i) => i.publication).join(', ')}`)
  : pass('every entry either links out or carries a print clipping')

/* ---- 2. links are absolute https and unique -------------------------------- */
const notHttps = allHrefs.filter((h) => !h.startsWith('https://'))
notHttps.length ? fail(`${notHttps.length} non-https href(s): ${notHttps[0]}`) : pass('all hrefs are absolute https')

const dupes = allHrefs.filter((h, i) => allHrefs.indexOf(h) !== i)
dupes.length
  ? fail(`${new Set(dupes).size} duplicate URL(s), first: ${dupes[0]}`)
  : pass(`all ${allHrefs.length} URLs are distinct`)

/* ---- 3. clipping assets exist, and nothing generated is orphaned ------------ */
const generated = [...fs.readFileSync(generatedFile, 'utf8').matchAll(/src: '([^']+)'/g)].map((m) => m[1])
const missing = generated.filter((s) => !fs.existsSync(path.join(root, 'public', s.replace(/^\//, ''))))
missing.length
  ? fail(`${missing.length} generated asset(s) not on disk -- run npm run gen:mediaimg`)
  : pass(`all ${generated.length} clipping derivatives exist under public/media/`)

const clippingKeys = [...src.matchAll(/CLIPPINGS\['([^']+)'\]/g)].map((m) => m[1])
const generatedKeys = [...fs.readFileSync(generatedFile, 'utf8').matchAll(/\n  '([^']+)': \{/g)].map((m) => m[1])
const unused = generatedKeys.filter((k) => !clippingKeys.includes(k))
unused.length
  ? fail(`${unused.length} clipping(s) generated but never referenced: ${unused.join(', ')}`)
  : pass(`all ${generatedKeys.length} clippings are referenced by an entry`)

/* ---- 4. clippings are described -------------------------------------------- */
// The eSanje scan is a Kannada newspaper page. Without a caption it is a
// decorative image to most visitors, so caption is required, not just alt.
const undescribed = items.filter((i) => i.hasClipping && !(/\n      alt:/.test(i.block) && /\n      caption:/.test(i.block)))
undescribed.length
  ? fail(`${undescribed.length} clipping(s) missing alt or caption`)
  : pass('every clipping carries both alt and caption')

/* ---- 5/6. the prerendered page, once there is one -------------------------- */
if (!fs.existsSync(path.join(dist, 'media-coverage', 'index.html'))) {
  console.log('\n  (no dist/ yet -- run npm run build to check the rendered page too)')
} else {
  const page = parse(fs.readFileSync(path.join(dist, 'media-coverage', 'index.html'), 'utf8'))
  const band = page.querySelector('#media-coverage')

  if (!band) {
    fail('dist/media-coverage/index.html has no #media-coverage section')
  } else {
    const links = band.querySelectorAll('a[href^="https://"]')
    links.length === allHrefs.length
      ? pass(`the band renders all ${allHrefs.length} outbound links`)
      : fail(`the band renders ${links.length} outbound links, expected ${allHrefs.length}`)

    const unsafe = links.filter(
      (a) => a.getAttribute('target') !== '_blank' || !(a.getAttribute('rel') ?? '').includes('noopener'),
    )
    unsafe.length
      ? fail(`${unsafe.length} outbound link(s) missing target="_blank" or rel="noopener"`)
      : pass('every outbound link opens in a new tab with rel="noopener"')

    const text = band.text.replace(/\s+/g, ' ')
    const absent = items.filter((i) => {
      const title = i.title?.replace(/^["']|["'],?$/g, '').replace(/\\'/g, "'")
      return title && !text.includes(title.replace(/\s+/g, ' '))
    })
    absent.length
      ? fail(`${absent.length} entry title(s) not in the prerendered band, first: ${absent[0].publication}`)
      : pass(`all ${items.length} entry titles are in the prerendered HTML`)

    const outlets = band.querySelectorAll('a[href^="https://"]').length - items.filter((i) => i.href).length
    outlets === outletCount
      ? pass(`the syndication renders all ${outletCount} outlet links`)
      : fail(`syndication rendered ${outlets} outlet links, expected ${outletCount}`)
  }

  // The coverage moved OFF the blog listing when it got its own URL. If it
  // reappears there, something re-added the band rather than linking to it.
  for (const [label, rel] of [
    ['/our-blogs/', ['our-blogs', 'index.html']],
    ['/category/uncategorized/', ['category', 'uncategorized', 'index.html']],
  ]) {
    const file = path.join(dist, ...rel)
    if (!fs.existsSync(file)) continue
    parse(fs.readFileSync(file, 'utf8')).querySelector('#media-coverage')
      ? fail(`${label} renders the press list; it belongs on /media-coverage/ only`)
      : pass(`${label} correctly carries no press list`)
  }

  // Exactly one <h1>, from the banner -- PagePlaceholder would have added a second.
  const h1s = page.querySelectorAll('h1')
  h1s.length === 1
    ? pass(`/media-coverage/ has one h1: "${h1s[0].text.trim()}"`)
    : fail(`/media-coverage/ has ${h1s.length} h1 elements, expected 1`)

  // The header dropdown must reach it, or the page is an orphan.
  const home = parse(fs.readFileSync(path.join(dist, 'index.html'), 'utf8'))
  const chrome = [home.querySelector('header'), home.querySelector('footer')]
    .filter(Boolean)
    .map((el) => el.outerHTML)
    .join('')
  chrome.includes('href="/media-coverage/"')
    ? pass('/media-coverage/ is linked from the site chrome')
    : fail('/media-coverage/ is not linked from the header or footer')
}

console.log()
if (failures) {
  console.log(`verify-media: ${failures} check(s) FAILED`)
  process.exit(1)
}
console.log('verify-media: all checks passed')
