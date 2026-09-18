// Blog image pipeline -- turns the backup's WordPress originals into web assets.
//
// Re-runnable, and it wipes public/blog/ first: nothing in there is hand-edited.
// Edit the backup or this script, then `npm run gen:blogimg`.
//
// The backup holds only the WordPress *originals* (neofollicle-seo-backup/media/
// files/wp-content/uploads/YYYY/MM/) -- all PNG/JPEG, 28 KB to 1.2 MB each. None
// of the `-WxH` responsive variants referenced by the captured srcset were ever
// downloaded, so every size the new site serves is generated here. No encoder is
// installed on the platform either (sips cannot write webp), hence sharp.
//
// Three kinds of output, following the conventions the hand-made assets already
// set (public/insights/*.webp is 1200x628 at 83-112 KB):
//
//   public/blog/<slug>.webp        1200x628   listing card + related-posts card
//   public/blog/<slug>-hero.webp   1600 wide  detail page featured image
//   public/blog/body/<name>.webp              in-article images
//
// Body images keep the size the old markup asked for: a `-150x150` src is a
// cropped avatar and stays 150px square; everything else is capped at 860px,
// the widest the 70% article column ever renders.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { backup, bodyImagePath, requestedSize, resolveUpload, root } from './blog-assets.mjs'

const outDir = path.join(root, 'public/blog')

const CARD = { width: 1200, height: 628, quality: 78 }
const HERO = { width: 1600, quality: 80 }
const BODY_MAX = 860
const BODY_QUALITY = 78

const posts = JSON.parse(fs.readFileSync(path.join(backup, 'site-level/wp-rest/posts.json'), 'utf8'))
const media = JSON.parse(fs.readFileSync(path.join(backup, 'media/manifest.json'), 'utf8'))
const mediaById = new Map(media.map((m) => [m.id, m]))

const written = []
async function write(servedPath, pipeline) {
  const file = path.join(root, 'public', servedPath.replace(/^\//, ''))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const { size } = await pipeline.toFile(file)
  written.push({ file: servedPath, size })
}

fs.rmSync(outDir, { recursive: true, force: true })

/* ---- featured images: one card crop + one hero per post -------------------- */
for (const post of posts) {
  const item = mediaById.get(post.featured_media)
  if (!item) throw new Error(`${post.slug}: featured_media ${post.featured_media} not in manifest`)
  const src = resolveUpload(item.source_url)

  await write(
    `/blog/${post.slug}.webp`,
    sharp(src).resize(CARD.width, CARD.height, { fit: 'cover', position: 'centre' }).webp({ quality: CARD.quality }),
  )
  await write(
    `/blog/${post.slug}-hero.webp`,
    sharp(src).resize(HERO.width, null, { withoutEnlargement: true }).webp({ quality: HERO.quality }),
  )
}

/* ---- in-article images ----------------------------------------------------- */
const bodySrcs = new Set()
for (const post of posts) {
  for (const m of post.content.rendered.matchAll(/<img[^>]+src="([^"]+)"/g)) bodySrcs.add(m[1])
}

for (const src of [...bodySrcs].sort()) {
  const asked = requestedSize(src)
  const pipeline = sharp(resolveUpload(src))

  if (asked && asked.width === asked.height) {
    // A square request is a crop, not a scale -- these are the author avatars.
    pipeline.resize(asked.width, asked.height, { fit: 'cover', position: 'centre' })
  } else {
    pipeline.resize(Math.min(asked?.width ?? BODY_MAX, BODY_MAX), null, { withoutEnlargement: true })
  }

  await write(bodyImagePath(src), pipeline.webp({ quality: BODY_QUALITY }))
}

/* ---- report ---------------------------------------------------------------- */
const total = written.reduce((n, w) => n + w.size, 0)
const kb = (n) => `${(n / 1024).toFixed(0)} KB`

console.log(`gen-blog-images: ${written.length} files -> public/blog/ (${kb(total)} total)`)
console.log(`                 ${posts.length} cards, ${posts.length} heroes, ${bodySrcs.size} body images`)
console.log('                 largest:')
for (const w of [...written].sort((a, b) => b.size - a.size).slice(0, 5)) {
  console.log(`                   ${kb(w.size).padStart(7)}  ${w.file}`)
}
