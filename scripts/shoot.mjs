// Screenshot + layout audit for the prerendered site.
//
// This exists because the treatment pages shipped fully verified and never
// actually looked at -- every gate passed while the hero was visibly broken.
// Structural checks cannot see proportion, overflow or overlap; this can.
//
//   node scripts/shoot.mjs                     # all treatment pages, 3 widths
//   node scripts/shoot.mjs --slug home         # one page
//   node scripts/shoot.mjs --full              # full-page, not just the fold
//   node scripts/shoot.mjs --out /tmp/shots
//   node scripts/shoot.mjs --slug X --section "Before & After"   # one section
//
// Serves dist/ itself, so it audits exactly what prerender.mjs emitted.
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { TREATMENT_IMAGES } from './treatment-assets.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const argv = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`)
  return i === -1 ? fallback : argv[i + 1]
}
const has = (name) => argv.includes(`--${name}`)

const outDir = path.resolve(flag('out', path.join(root, '.shots')))
const only = flag('slug', null)
const fullPage = has('full')
// Substring of a section's <h2>. Captures that section alone.
const section = flag('section', null)

// `maxH1Lines` is a wrap budget, not a style rule. `text-h1` is a fluid clamp
// whose FLOOR is 2.5rem, so a 40px headline in a ~350px mobile column is about
// ten characters a line and a 70-character h1 genuinely needs six. The budgets
// below are calibrated against the two heroes already accepted -- DoctorHero
// runs four lines at every width -- so they flag a layout fault, not long copy.
const WIDTHS = [
  { name: 'desktop', width: 1440, height: 900, maxH1Lines: 5 },
  { name: 'tablet', width: 900, height: 1000, maxH1Lines: 5 },
  { name: 'mobile', width: 390, height: 844, maxH1Lines: 6 },
]

const slugs = only ? [only] : Object.keys(TREATMENT_IMAGES)

/* ---- static server over dist/ ---------------------------------------------- */
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' }

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(dist, url)
  if (!path.extname(file)) file = path.join(file, 'index.html')
  if (!file.startsWith(dist) || !fs.existsSync(file)) { res.writeHead(404).end('not found'); return }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(0, r))
const origin = `http://localhost:${server.address().port}`

/* ---- audit ------------------------------------------------------------------ */
fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const findings = []
let shots = 0

for (const slug of slugs) {
  for (const vp of WIDTHS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    })
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

    await page.goto(`${origin}/${slug === 'home' ? '' : `${slug}/`}`, { waitUntil: 'networkidle' })
    // Settle the entrance animations before measuring or shooting.
    await page.waitForTimeout(1400)

    if (section) {
      // Scroll the target INTO VIEW rather than jumping to the page bottom.
      // Reveal only un-hides on intersection and disconnects after firing, so
      // a jump straight past a mid-page section leaves its observers unfired
      // and the whole thing screenshots blank. Learned the hard way.
      const el = (
        await page.evaluateHandle(
          (h) => [...document.querySelectorAll('section')].find((s) => s.querySelector('h2')?.textContent.includes(h)),
          section,
        )
      ).asElement()
      if (!el) { console.log(`  ${slug}@${vp.name}: no section matching ${section}`); await page.close(); continue }
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(1600)
      const file = path.join(outDir, `${slug}-${vp.name}-section.png`)
      await el.screenshot({ path: file })
      shots++
      console.log(`  ${slug}@${vp.name}`.padEnd(54) + `section -> ${path.basename(file)}`)
      await page.close()
      continue
    }

    const m = await page.evaluate(() => {
      const doc = document.documentElement
      const hero = document.querySelector('main section')
      const r = (el) => (el ? el.getBoundingClientRect() : null)
      const h1 = document.querySelector('h1')
      const img = hero?.querySelector('img')
      const lh = h1 ? parseFloat(getComputedStyle(h1).lineHeight) : 0
      return {
        overflow: doc.scrollWidth - doc.clientWidth,
        heroH: Math.round(r(hero)?.height ?? 0),
        h1Lines: h1 && lh ? Math.round(r(h1).height / lh) : 0,
        h1Size: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : 0,
        imgH: Math.round(r(img)?.height ?? 0),
        imgW: Math.round(r(img)?.width ?? 0),
        // Text column vs image column height gap -- the defect that started this.
        colGap: (() => {
          const cols = hero ? [...hero.querySelectorAll(':scope > div > div')] : []
          if (cols.length < 2) return 0
          return Math.round(Math.abs(r(cols[0]).height - r(cols[1]).height))
        })(),
      }
    })

    const tag = `${slug}@${vp.name}`
    if (m.overflow > 0) findings.push(`${tag}: horizontal overflow ${m.overflow}px`)
    if (m.h1Lines > vp.maxH1Lines) findings.push(`${tag}: h1 wraps to ${m.h1Lines} lines`)
    if (errors.length) findings.push(`${tag}: console/page error -- ${errors[0]}`)
    if (vp.name === 'desktop' && m.colGap > 260) {
      findings.push(`${tag}: hero columns differ by ${m.colGap}px`)
    }

    await page.screenshot({ path: path.join(outDir, `${slug}-${vp.name}.png`), fullPage })
    shots++
    console.log(
      `  ${tag.padEnd(52)} h1 ${String(m.h1Lines).padStart(2)}L/${m.h1Size}px  ` +
        `hero ${String(m.heroH).padStart(4)}px  img ${m.imgW}x${m.imgH}  Δcol ${m.colGap}px` +
        (m.overflow > 0 ? `  OVERFLOW ${m.overflow}px` : ''),
    )
    await page.close()
  }
}

await browser.close()
server.close()

console.log(`\nshoot: ${shots} screenshots -> ${path.relative(root, outDir)}/`)
if (findings.length) {
  console.log(`\n  ${findings.length} finding(s):`)
  for (const f of findings) console.log(`    ${f}`)
  process.exit(1)
}
console.log('  no layout findings')
