// Path rules shared by gen-blog-images.mjs and gen-posts.mjs.
//
// These two scripts have to agree exactly on where a blog image lands, or the
// generated <img src> points at a file that was never written. The rules live
// here so there is one definition of each.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const backup = path.join(root, 'neofollicle-seo-backup')
export const uploads = path.join(backup, 'media/files')

export const ORIGIN = 'https://neofollicletransplant.com'

/** Strip the live origin from a captured URL. */
export function toRelative(url) {
  return url.startsWith(ORIGIN) ? url.slice(ORIGIN.length) : url
}

/**
 * A captured image src -> the original file on disk.
 *
 * The backup downloaded only WordPress originals, so the `-WxH` responsive
 * variants that appear throughout the captured markup have no file of their
 * own. Stripping the suffix finds the original they were cut from.
 */
export function resolveUpload(src) {
  const rel = toRelative(src)
  const stripped = rel.replace(/-\d+x\d+(\.\w+)$/, '$1')
  for (const candidate of [rel, stripped]) {
    const abs = path.join(uploads, candidate)
    if (fs.existsSync(abs)) return abs
  }
  throw new Error(`no file on disk for ${src} (tried ${rel} and ${stripped})`)
}

/** The render size the old markup asked for, from a `-WxH` suffix. */
export function requestedSize(src) {
  const m = src.match(/-(\d+)x(\d+)\.\w+$/)
  return m ? { width: Number(m[1]), height: Number(m[2]) } : null
}

/** Served path for an in-article image. */
export function bodyImagePath(src) {
  const name = path
    .basename(toRelative(src))
    .replace(/-\d+x\d+(?=\.\w+$)/, '')
    .replace(/\.\w+$/, '.webp')
  return `/blog/body/${name}`
}

/** Served path for a post's listing-card image. */
export function cardImagePath(slug) {
  return `/blog/${slug}.webp`
}

/** Served path for a post's detail-page featured image. */
export function heroImagePath(slug) {
  return `/blog/${slug}-hero.webp`
}
