// Video gallery pipeline -- resolves what the capture could not.
//
// The old page embedded 45 YouTube videos through a lite-youtube component and
// every one of them carries title="". So the capture gives us ids and nothing
// else: no titles, no descriptions, no thumbnails on disk. A tile built from an
// id alone would be a link with no accessible name and an <img> with no alt.
//
// This script fills both gaps ONCE, at author time, and writes the result to
// src/content/gallery/video-gallery.generated.ts, which is COMMITTED. That is
// the point: `npm run build` must never need the network or YouTube to be up.
// Re-run this by hand (`npm run gen:videogallery`) when the video set changes.
//
// Two network steps per video:
//
//   1. TITLE, from the public oEmbed endpoint. No API key, no quota.
//   2. POSTER. YouTube serves several thumbnail tiers and not every video has
//      every tier, so this walks maxresdefault -> sddefault -> hqdefault and
//      records which one answered. At the time of writing all 45 have maxres,
//      but a video swapped out later may not, and a 404 would otherwise ship a
//      broken tile.
//
// The poster is then re-encoded to a local WebP under public/video-gallery/.
// Three reasons, in order of weight: the page stays first-party until someone
// actually clicks play, so no visitor's IP reaches YouTube on page load; 45
// maxres JPEGs at 60-90KB is ~3MB against ~1.1MB as WebP; and a local file has
// real intrinsic dimensions, which a remote URL does not. maxres is exactly
// 16:9 so `aspect-video` with object-cover crops nothing.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { root } from './blog-assets.mjs'
import { VIDEO_SECTIONS, videoPosterPath } from './gallery-assets.mjs'

/**
 * Video ids embedded in blog posts, which are NOT part of VIDEO_SECTIONS.
 *
 * PostProse used to point straight at YouTube's remote hqdefault.jpg. That is
 * the 480x360 4:3 tier, so after `aspect-video` + object-cover crops it back to
 * 16:9 the real picture is 480x270 -- upscaled about 1.7x in an ~830px prose
 * column. Beside /video-gallery/, whose posters come from the 1280x720 maxres
 * tier, it read as the wrong thumbnail.
 *
 * Worse for one of them: that crop assumes hqdefault is letterboxed and takes
 * 45px off each edge to remove the bars. G9tFWishCwU's hqdefault has NO bars,
 * so it lost 12.5% of the actual picture.
 *
 * SCANNED, not listed, so adding a video to a post cannot leave its poster
 * ungenerated. Six of the ten are already in VIDEO_SECTIONS and cost nothing
 * extra; this only adds the remainder.
 *
 * This lives here rather than in gallery-assets.mjs because that module is
 * pure data with no imports -- a filesystem scan is generator behaviour.
 */
function postVideoIds() {
  const dir = path.join(root, 'src/content/posts')
  const ids = new Set()
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
    const src = fs.readFileSync(path.join(dir, file), 'utf8')
    for (const m of src.matchAll(/"provider":\s*"youtube",[\s\S]{0,300}?"videoId":\s*"([^"]+)"/g)) {
      ids.add(m[1])
    }
  }
  return [...ids].sort()
}

const outDir = path.join(root, 'public/video-gallery')
const contentFile = path.join(root, 'src/content/gallery/video-gallery.generated.ts')

const POSTER = { width: 640, quality: 75 }
const TIERS = ['maxresdefault', 'sddefault', 'hqdefault']

async function title(id) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`oembed ${res.status} for ${id}`)
  const json = await res.json()
  if (!json.title) throw new Error(`oembed returned no title for ${id}`)
  return json.title
}

async function poster(id) {
  for (const tier of TIERS) {
    const res = await fetch(`https://i.ytimg.com/vi/${id}/${tier}.jpg`)
    if (!res.ok) continue
    const buf = Buffer.from(await res.arrayBuffer())
    // A missing tier can still answer 200 with YouTube's 120x90 grey
    // placeholder, so check the real dimensions rather than the status.
    const meta = await sharp(buf).metadata()
    if (meta.width < 480) continue
    return { buf, tier }
  }
  throw new Error(`no usable thumbnail for ${id}`)
}

fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })

const bySection = {}
const tiers = {}
let bytes = 0

for (const section of VIDEO_SECTIONS) {
  const items = []
  for (const id of section.ids) {
    const [name, shot] = await Promise.all([title(id), poster(id)])
    const served = videoPosterPath(id)
    const out = await sharp(shot.buf)
      .resize(POSTER.width, null, { withoutEnlargement: true })
      .webp({ quality: POSTER.quality })
      .toFile(path.join(root, 'public', served.replace(/^\//, '')))
    bytes += out.size
    tiers[shot.tier] = (tiers[shot.tier] ?? 0) + 1
    items.push({ id, title: name, poster: { src: served, width: out.width, height: out.height } })
    process.stdout.write('.')
  }
  bySection[section.id] = items
}

/*
  The post-only ids. Titles are not fetched: PostProse carries its own
  captured title and verify-posts.mjs compares it word for word against the
  capture, so an oEmbed title here would be the wrong source.
*/
const galleryIds = new Set(VIDEO_SECTIONS.flatMap((s) => s.ids))
const extra = postVideoIds().filter((id) => !galleryIds.has(id))
for (const id of extra) {
  const shot = await poster(id)
  const out = await sharp(shot.buf)
    .resize(POSTER.width, null, { withoutEnlargement: true })
    .webp({ quality: POSTER.quality })
    .toFile(path.join(root, 'public', videoPosterPath(id).replace(/^\//, '')))
  bytes += out.size
  tiers[shot.tier] = (tiers[shot.tier] ?? 0) + 1
  process.stdout.write('.')
}
process.stdout.write('\n')

const body = Object.entries(bySection)
  .map(([id, items]) => {
    const rows = items
      .map(
        (v) =>
          `    {\n      id: '${v.id}',\n      title: ${JSON.stringify(v.title)},\n` +
          `      poster: { src: '${v.poster.src}', width: ${v.poster.width}, height: ${v.poster.height} },\n    },`,
      )
      .join('\n')
    return `  '${id}': [\n${rows}\n  ],`
  })
  .join('\n')

fs.mkdirSync(path.dirname(contentFile), { recursive: true })
fs.writeFileSync(
  contentFile,
  `// GENERATED by scripts/gen-video-gallery.mjs. Do not edit by hand.\n` +
    `//\n` +
    `// Titles come from YouTube's oEmbed endpoint and posters are local WebP\n` +
    `// derivatives of the YouTube still. Committed so the build never needs the\n` +
    `// network. Regenerate with \`npm run gen:videogallery\`.\n` +
    `import type { VideoItem } from './types'\n\n` +
    `export const GALLERY_VIDEOS: Record<string, VideoItem[]> = {\n${body}\n}\n`,
)

const n = Object.values(bySection).flat().length
console.log(`\ngen-video-gallery: ${n} gallery videos + ${extra.length} blog-only, ${n + extra.length} posters, ${(bytes / 1024 / 1024).toFixed(1)}MB`)
if (extra.length) console.log(`  blog-only posters: ${extra.join(', ')}`)
console.log(`  thumbnail tiers used: ${Object.entries(tiers).map(([t, c]) => `${t} x${c}`).join(', ')}`)
console.log(`  -> ${path.relative(root, contentFile)}`)
