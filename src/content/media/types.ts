import type { GalleryImage } from '../gallery/types'

/**
 * Third-party coverage of Dr Sandeep Mahapatra, rendered as the "In the Press"
 * band on /our-blogs/ -- the page the nav calls "Media and Blogs".
 *
 * THE FIRST AUTHORED CONTENT MODULE. Everything else under src/content/ is
 * derived from neofollicle-seo-backup/ by a generator: the posts, the legal
 * pages, the galleries. This is not. The coverage report has no counterpart in
 * the WordPress capture, so ./coverage.ts is written by hand and there is no
 * `npm run gen:` for it. Only the two print clippings are generated, by
 * scripts/gen-media-images.mjs, and only because dimensions must be measured
 * rather than guessed.
 */

/** The coverage report's own taxonomy, kept verbatim so the two can be diffed. */
export type MediaKind =
  | 'Authored Article'
  | 'Exclusive Article'
  | 'Press Coverage'
  | 'Expert Commentary'
  | 'Expert Interview'
  | 'Feature'
  | 'Podcast'
  | 'Trend Story'

export type MediaOutlet = { name: string; href: string }

export type MediaItem = {
  /**
   * ISO date. For a syndicated item this is the earliest date it ran -- the
   * ten outlets carrying the ANI release span 22 to 24 June.
   */
  date: string
  /** The lead publication, or the wire service for a syndicated item. */
  publication: string
  kind: MediaKind
  /** The publication's own headline, not a rewrite. */
  title: string
  /**
   * The article. Absent only on print-only items, which must carry a
   * `clipping` instead -- scripts/verify-media.mjs asserts one or the other.
   */
  href?: string
  /**
   * The other outlets that ran the same release. Rendering ten identical
   * headlines as ten rows reads as padding; one headline over ten outlet
   * chips reads as reach, which is what the syndication actually bought.
   */
  syndicatedTo?: MediaOutlet[]
  /**
   * A scan of the printed page.
   *
   * Shaped as GalleryImage so src/components/Lightbox.tsx takes it unmodified
   * -- that component brings a focus trap, keyboard handling, swipe and scroll
   * lock, none of which is worth reimplementing for two images. The
   * derivatives come from ./clippings.generated.ts; `alt` and `caption` are
   * authored here.
   */
  clipping?: GalleryImage
}
