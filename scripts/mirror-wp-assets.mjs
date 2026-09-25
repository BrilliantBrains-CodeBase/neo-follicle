#!/usr/bin/env node
/**
 * Copies every /wp-content/uploads/ image the SEO layer references into
 * public/wp-content/, at the SAME path.
 *
 * The JSON-LD graphs and og:image tags point at WordPress upload URLs -- the
 * clinic logo, the reception photo, the doctor's portrait, the 19 blog
 * featured images. Those URLs die the moment the domain stops serving
 * WordPress. Keeping them at their original path (rather than renaming into
 * /brand/ or /blog/) means the image URLs Google has already indexed keep
 * resolving, and the captured graphs need no URL rewrite.
 *
 * URLs that were ALREADY 404 on the live site are not mirrored; gen-seo maps
 * them to a working image (BROKEN_IMAGE_MAP in scripts/seo/entity-graph.mjs).
 *
 * Run while the WordPress site is still live:  npm run mirror:wp
 * Idempotent -- files already on disk are skipped.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEO } from '../src/config/site.ts'
import { BROKEN_IMAGE_MAP } from './seo/entity-graph.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

const sources = [
  path.join(root, 'neofollicle-seo-backup', '01-SEO-MASTER.csv'),
  path.join(root, 'src', 'config', 'site.ts'),
  ...fs.readdirSync(path.join(root, 'neofollicle-seo-backup', 'pages')).map((slug) =>
    path.join(root, 'neofollicle-seo-backup', 'pages', slug, 'schema.jsonld'),
  ),
  ...fs.readdirSync(path.join(root, 'content', 'seo')).map((f) => path.join(root, 'content', 'seo', f)),
].filter((f) => fs.existsSync(f) && fs.statSync(f).isFile())

const re = new RegExp(`${SEO.origin.replace(/[.]/g, '\\.')}/wp-content/uploads/[^"'\\s,)]+`, 'g')
const urls = new Set()
for (const file of sources) {
  for (const m of fs.readFileSync(file, 'utf8').matchAll(re)) urls.add(m[0])
}

let fetched = 0, skipped = 0, broken = 0
for (const url of [...urls].sort()) {
  if (BROKEN_IMAGE_MAP[url]) { broken++; continue }
  const dest = path.join(publicDir, decodeURIComponent(new URL(url).pathname))
  if (fs.existsSync(dest)) { skipped++; continue }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url} -- add it to BROKEN_IMAGE_MAP`)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
  fetched++
}

console.log(`mirror-wp: ${urls.size} referenced, ${fetched} fetched, ${skipped} already present, ${broken} mapped (dead upstream)`)
