// Responsive copies of the site-wide photographs and the logo.
//
//   npm run gen:siteimg            writes any copy that is missing
//   npm run gen:siteimg -- --force rewrites all of them
//
// Every output lands in public/img/ and is committed, like the rest of
// public/. The sets are referenced from src/config/images.ts (hero, logo)
// and from the components named below; `npm run verify` fails if a srcset
// or image-set candidate in the built HTML/CSS is missing from dist/.
//
// Why each exists (Oct 2026 audit, Lighthouse mobile):
//   hero        Hero.tsx and every PageBanner. Phones were sent the 1672px
//               / 126 KB original for a ~412px box.
//   about-*     About.tsx portrait and stat card.
//   footer-bg   .nf-cta-bg texture (src/index.css) behind the footer and
//               the CTA bands -- on every page.
//   logo        logo.svg is a 108 KB wrapper around two embedded 752px PNGs,
//               and React preloads it on every page ahead of the hero. These
//               are the same pixels for 1x/2x/3x screens.
//               logo.svg itself stays: the OG card generator renders it.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = (p) => path.join(root, 'public', p)
const force = process.argv.includes('--force')

const SETS = [
  { src: 'hero.webp', name: 'hero', widths: [640, 960, 1280, 1672], quality: 72 },
  { src: 'about-doctor.webp', name: 'about-doctor', widths: [480, 720, 1095], quality: 74 },
  { src: 'about-stat.webp', name: 'about-stat', widths: [480, 800, 1200], quality: 74 },
  { src: 'footer-bg.webp', name: 'footer-bg', widths: [768, 1536], quality: 70 },
  // Lossy WebP with full-quality alpha. Widths are multiples of 24 so every
  // copy keeps logo.svg's exact 8:3 aspect (200x75): the header renders it
  // h-auto, and a 300x113 copy made the header 0.25px taller and moved every
  // section below it by a pixel. 192/384/576 serve the 1x/2x/3x densities.
  { src: 'logo.svg', name: 'logo', widths: [192, 384, 576], quality: 90, svgWidth: 200 },
]

let written = 0
let skipped = 0
for (const set of SETS) {
  for (const width of set.widths) {
    const out = pub(`img/${set.name}-${width}.webp`)
    if (!force && fs.existsSync(out)) {
      skipped++
      continue
    }
    // An SVG is rasterised at the density that yields `width` directly, so the
    // embedded bitmaps are resampled once rather than twice.
    const input = set.svgWidth ? sharp(pub(set.src), { density: (72 * width * 4) / set.svgWidth }) : sharp(pub(set.src))
    const { size } = await input
      .resize({ width, withoutEnlargement: !set.svgWidth })
      .webp({ quality: set.quality, alphaQuality: 100, effort: 6 })
      .toFile(out)
    console.log(`  ${(size / 1024).toFixed(1).padStart(6)} KB  /img/${set.name}-${width}.webp`)
    written++
  }
}
console.log(`gen-site-images: ${written} written, ${skipped} already present${force ? '' : ' (use --force to rewrite)'}`)
