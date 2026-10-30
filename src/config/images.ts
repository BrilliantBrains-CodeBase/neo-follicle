/**
 * Responsive image sets used in more than one component.
 *
 * The files are generated: site photographs and the logo by
 * scripts/gen-site-images.mjs (npm run gen:siteimg), blog heroes by
 * scripts/gen-blog-images.mjs. `npm run verify` fails if any srcset
 * candidate referenced by the built pages is missing from dist/.
 */

/** The theatre photograph: the home hero and every PageBanner. */
export const HERO_PHOTO = {
  /** The original upload. Still served, for old links and image search. */
  original: '/hero.webp',
  src: '/img/hero-960.webp',
  srcSet: '/img/hero-640.webp 640w, /img/hero-960.webp 960w, /img/hero-1280.webp 1280w, /img/hero-1672.webp 1672w',
  width: 1672,
  height: 941,
  alt: "Hair transplant procedure at Neo Follicle, Bangalore: a surgeon wearing magnifying loupes places grafts on a patient's scalp while an assistant watches",
} as const

/**
 * The logo as raster for 1x/2x/3x screens. logo.svg is a 108 KB wrapper around
 * embedded PNGs, so the "vector" gained nothing. Every copy is exactly 8:3,
 * like the SVG, so h-auto layouts do not move.
 */
export const LOGO = {
  src: '/img/logo-384.webp',
  srcSet: '/img/logo-192.webp 1x, /img/logo-384.webp 2x, /img/logo-576.webp 3x',
} as const

/** Mirror HERO_SRCSET_WIDTHS / CARD_SRCSET_WIDTHS in scripts/gen-blog-images.mjs. */
const BLOG_HERO_WIDTHS = [640, 960]
const BLOG_CARD_WIDTHS = [480, 768]

/** srcset for a blog card (1200x628 original plus its 480/768 copies). */
export function blogCardSrcSet(src: string, width: number): string {
  const base = src.replace(/\.webp$/, '')
  return [...BLOG_CARD_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`), `${src} ${width}w`].join(', ')
}

/** srcset for a blog post's featured image: the generated copies plus the original. */
export function blogHeroSrcSet(src: string, width: number): string {
  const base = src.replace(/\.webp$/, '')
  return [
    ...BLOG_HERO_WIDTHS.filter((w) => w < width).map((w) => `${base}-${w}.webp ${w}w`),
    `${src} ${width}w`,
  ].join(', ')
}

/** Mirrors HERO_SMALL in scripts/gen-treatment-images.mjs. */
const TREATMENT_HERO_SMALL = 640

/** srcset for a treatment hero: the 640px copy (made for any hero wider than that) plus the original. */
export function treatmentHeroSrcSet(src: string, width: number): string | undefined {
  if (width <= TREATMENT_HERO_SMALL) return undefined
  return `${src.replace(/\.webp$/, '')}-${TREATMENT_HERO_SMALL}.webp ${TREATMENT_HERO_SMALL}w, ${src} ${width}w`
}
