// Treatment image pipeline -- turns the backup's WordPress originals into the
// assets the ten treatment pages serve.
//
// Re-runnable, and it wipes public/treatments/ first: nothing in there is
// hand-edited. Edit scripts/treatment-assets.mjs or this file, then
// `npm run gen:treatmentimg`.
//
// Modelled on gen-blog-images.mjs, with one deliberate difference: these are
// never cropped and never upscaled.
//
// Almost every source is 650x450 -- the size the old site's own pipeline cut --
// and most of them are BEFORE/AFTER PAIRS composited side by side in a single
// file. A `fit: 'cover'` crop of a 650x450 pair to some other aspect ratio
// silently cuts off one half of the comparison, which is worse than serving a
// slightly odd ratio. So the rule here is: transcode to WebP at native size,
// capped at MAX_WIDTH, `withoutEnlargement`. 650x450 (1.44:1) also happens to
// sit close to Folixa's 588x395 treatment-hero ratio (1.49:1), so the native
// size fits the template it is going into.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { resolveUpload, root } from './blog-assets.mjs'
import { TREATMENT_IMAGES, treatmentImagePath } from './treatment-assets.mjs'

const outDir = path.join(root, 'public/treatments')

const MAX_WIDTH = 1200
const QUALITY = 78

const written = []
async function write(servedPath, src) {
  const file = path.join(root, 'public', servedPath.replace(/^\//, ''))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const { size, width, height } = await sharp(src)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(file)
  written.push({ file: servedPath, size, width, height })
  return { width, height }
}

fs.rmSync(outDir, { recursive: true, force: true })

// Served path -> intrinsic size, so the data modules can carry real width/height
// on every <img> instead of a guess. Emitted as JSON for src/content/treatments/.
const sizes = {}
let flagged = 0

for (const [slug, set] of Object.entries(TREATMENT_IMAGES)) {
  if (set.review) flagged++

  const one = async (name, entry) => {
    const served = treatmentImagePath(slug, name)
    sizes[served] = await write(served, resolveUpload(`/${entry.from}`))
  }

  await one('hero', set.hero)
  for (const [i, entry] of (set.results ?? []).entries()) await one(`result-${i + 1}`, entry)
  // `sections` is for a photograph that illustrates a band rather than a
  // result -- a checklist's `image`, say. Several of the non-surgical pages
  // have exactly two usable originals in their capture, and without this the
  // second one could not be served at all: verify-treatments.mjs check 4 fails
  // on any generated file no page references, so an unused key is not an option.
  for (const [i, entry] of (set.sections ?? []).entries()) await one(`section-${i + 1}`, entry)
  for (const entry of set.people ?? []) {
    await one(entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), entry)
  }
}

fs.writeFileSync(path.join(outDir, 'sizes.json'), `${JSON.stringify(sizes, null, 2)}\n`)

/* ---- report ---------------------------------------------------------------- */
const total = written.reduce((n, w) => n + w.size, 0)
const kb = (n) => `${(n / 1024).toFixed(0)} KB`

console.log(`gen-treatment-images: ${written.length} files -> public/treatments/ (${kb(total)} total)`)
console.log(`                      ${Object.keys(TREATMENT_IMAGES).length} treatments, ${flagged} flagged for client review`)
console.log('                      largest:')
for (const w of [...written].sort((a, b) => b.size - a.size).slice(0, 5)) {
  console.log(`                        ${kb(w.size).padStart(7)}  ${w.width}x${w.height}  ${w.file}`)
}
