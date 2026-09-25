#!/usr/bin/env node
/**
 * Raster icons + web manifest from public/favicon.svg.
 *
 * The site only shipped an SVG favicon, which iOS home screens, older
 * browsers, and Google's search-result favicon crawler (it wants a square
 * raster, multiple of 48px) all ignore. Writes to public/:
 *
 *   favicon.ico            32x32 (PNG-in-ICO), the /favicon.ico every UA probes
 *   apple-touch-icon.png   180x180 on white, iOS home screen
 *   icon-192.png, icon-512.png, icon-maskable-512.png   manifest icons
 *   site.webmanifest
 *
 * Run: npm run gen:icons
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { ASSETS, BRAND } from '../src/config/site.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(root, 'public')
const svg = fs.readFileSync(path.join(pub, 'favicon.svg'))

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

/** The mark at `size`, optionally inset by `pad` px on a solid background. */
async function icon(size, { pad = 0, background = null } = {}) {
  const inner = await sharp(svg, { density: 384 }).resize(size - pad * 2, size - pad * 2).png().toBuffer()
  return sharp({
    create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: inner, top: pad, left: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** A single-image ICO whose payload is a PNG (supported by every browser since IE Vista-era). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // image count
  const entry = Buffer.alloc(16)
  entry.writeUInt8(size >= 256 ? 0 : size, 0)
  entry.writeUInt8(size >= 256 ? 0 : size, 1)
  entry.writeUInt8(0, 2) // palette
  entry.writeUInt8(0, 3) // reserved
  entry.writeUInt16LE(1, 4) // colour planes
  entry.writeUInt16LE(32, 6) // bits per pixel
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(6 + 16, 12) // offset
  return Buffer.concat([header, entry, png])
}

fs.writeFileSync(path.join(pub, 'favicon.ico'), pngToIco(await icon(32), 32))
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), await icon(180, { pad: 14, background: WHITE }))
fs.writeFileSync(path.join(pub, 'icon-192.png'), await icon(192))
fs.writeFileSync(path.join(pub, 'icon-512.png'), await icon(512))
// Maskable icons are cropped to a circle/squircle by the OS: keep the mark in
// the central 80% safe zone.
fs.writeFileSync(path.join(pub, 'icon-maskable-512.png'), await icon(512, { pad: 52, background: WHITE }))

const manifest = {
  name: BRAND.legalName,
  short_name: BRAND.shortName,
  description: BRAND.description,
  start_url: '/',
  scope: '/',
  display: 'browser',
  background_color: '#ffffff',
  theme_color: ASSETS.themeColor,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}
fs.writeFileSync(path.join(pub, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`)

console.log('gen-icons: favicon.ico, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png, site.webmanifest')
