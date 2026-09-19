/**
 * Data shapes for /image-gallery/ and /video-gallery/.
 *
 * Same idea as src/content/treatments/types.ts -- the page is data and the
 * renderer is generic -- but deliberately NOT TreatmentPageData. That type
 * carries a hero with badges, an FAQ and a seven-way tagged union of section
 * kinds, none of which is an anchored media grid. A gallery page is one shape
 * repeated N times, so it gets its own smaller type.
 *
 * The split between this file and the two *.generated.ts modules beside it is
 * the load-bearing part: media entries are GENERATED from
 * scripts/gallery-assets.mjs, and prose is AUTHORED in image-gallery.ts /
 * video-gallery.ts. Nothing hand-writes a src or a dimension, and nothing
 * generated contains a sentence a human wrote.
 */

import type { Cta } from '../treatments/types'

/**
 * One rendered file.
 *
 * `width`/`height` are REQUIRED, as on TreatmentImage, so every <img> can
 * reserve its box before the file lands. Unlike the treatment modules -- which
 * hard-code 650x450 because every treatment source happens to be that size --
 * these come from the generator, because the 82 gallery sources run 650x450,
 * 1280x1280, 1024x1024 and 512x512.
 */
export type Derivative = { src: string; width: number; height: number }

export type GalleryImage = {
  /** The grid tile: 600w, q72. */
  thumb: Derivative
  /**
   * The lightbox target, <=1200w q78 -- and the tile anchor's href, which is
   * what makes the grid a working gallery with JavaScript off.
   */
  full: Derivative
  /**
   * Authored in scripts/gallery-assets.mjs. Never the captured WordPress alt:
   * verify-gallery.mjs fails the build on the junk patterns ("Nft ht ba 13",
   * "Female (10)", "82").
   */
  alt: string
  /**
   * Rendered as a visible <figcaption>, in the grid and in the lightbox.
   *
   * Only used where a photograph needs a caveat stated in front of the patient
   * rather than only in alt text -- the failed-repair set, whose images are
   * other clinics' work shown before correction. At full size the burned-in
   * caption dominates and alt text is invisible to a sighted visitor, so the
   * caveat has to be on the page.
   */
  caption?: string
}

export type GallerySection = {
  /**
   * MUST equal the fragment of the matching hasPart @id in
   * src/seo/schema/image-gallery.json. verify-gallery.mjs asserts it.
   */
  id: string
  /** Jump-nav label. Shorter than `heading`, which is often a full sentence. */
  label: string
  /** The section's <h2>, verbatim from the capture. */
  heading: string
  /** The section's <h3>. Scalp micro-pigmentation has none. */
  subheading?: string
  lede?: string
}

export type ImageGalleryData = {
  h1: string
  lede: string
  sections: GallerySection[]
  /** Kept visible under the grid, as on the home page's TreatmentGallery. */
  disclaimer: string
  cta: { heading: string; body: string; ctas: Cta[] }
}

export type VideoItem = {
  /** YouTube video id. */
  id: string
  /**
   * The video's real title, from oEmbed. This is the tile's ONLY accessible
   * name -- it is the anchor's text, the poster's alt and the iframe's title --
   * so it is never empty.
   */
  title: string
  /** Local WebP derivative of the YouTube still. */
  poster: Derivative
}

export type VideoSection = {
  /** As GallerySection.id, against src/seo/schema/video-gallery.json. */
  id: string
  label: string
  heading: string
  lede?: string
}

export type VideoGalleryData = {
  h1: string
  /** "Watch. Learn. Decide with Confidence." -- the capture's <h3>. */
  subheading: string
  lede: string
  sections: VideoSection[]
  channelUrl: string
  cta: { heading: string; body: string; ctas: Cta[] }
}
