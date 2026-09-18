import { Link } from 'react-router-dom'

/**
 * The inset rounded page-title banner.
 *
 * Design ported from the Folixa reference, which uses this same object on the
 * blog archive, the single post and every interior page -- Elementor wrapper
 * `2a4a685` with card `2d7c617` on the archive, wrapper `d8762f5` with card
 * `0c0ef04` on the post. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-31.css
 * and .../post-33.css. Visual targets are
 * folixa-design-reference/pages/blog/sections/02-blog-archive.png and
 * .../pages/single-post/sections/02-common-mistakes-to-avoid-after-hair.png.
 *
 *   wrapper side padding   40px desktop / 20px tablet / 0 mobile
 *   card min-height        500 / 400 / 300px
 *   card radius            1rem, dropping to 0 at mobile so it goes full-bleed
 *   scrim                  secondary #1A1A1A at 0.7 over a cover photo
 *   breadcrumb             #E5E7EB with word-spacing 4px, links #E2ECFF
 *   h1                     clamp(2.5rem, 1.8rem + 2.5vw, 4.5rem), #F8FAFC
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed. Same call as
 * Hero, About, Services and CommonQuestions.
 *
 * Deliberate departures from the reference:
 *
 *   - The h1 is NOT the `text-h1` token. The reference overrides the global h1
 *     on these banners with its own larger clamp, so the token is bypassed here
 *     exactly as it is there.
 *
 *   - `capitalize` is dropped. Folixa's banner copy is lowercase source text
 *     leaning on the transform; ours is real title-case content, and
 *     capitalising "FUE" or "PRP vs GFC" would mangle it. Same call Hero made.
 *
 *   - The breadcrumb is a real <nav>/<ol> rather than the reference's
 *     free-text editor widget, so it is navigable. The `//` separators are
 *     decorative and hidden from assistive tech.
 *
 *   - The photo is client-supplied, never Folixa's `Blog-Banner-1.webp` or
 *     `detail-banner.webp`, which are licensed theme stock. Same rule Hero
 *     records at its /hero.webp call site.
 */

export type Crumb = { label: string; to?: string }

type PageBannerProps = {
  crumbs: Crumb[]
  title: string
  /** Served path of the cover photo. */
  image: string
  /** Rendered under the title, as on the detail page's lede. */
  children?: React.ReactNode
}

export default function PageBanner({ crumbs, title, image, children }: PageBannerProps) {
  return (
    <div className="px-0 md:px-5 lg:px-10">
      <div
        className="relative isolate flex min-h-[300px] flex-col items-center justify-center gap-4 overflow-hidden bg-secondary bg-cover bg-center bg-no-repeat px-gutter py-12 text-center md:min-h-[400px] md:rounded-lg lg:min-h-[500px]"
        style={{ backgroundImage: `url('${image}')` }}
      >
        {/* The 0.7 scrim. Its own layer rather than a gradient, so the photo
            underneath can be swapped without retuning the text contrast. */}
        <div className="absolute inset-0 -z-10 bg-secondary/70" aria-hidden="true" />

        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center gap-x-2 text-line [word-spacing:4px]">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-x-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-line/70">
                    //
                  </span>
                )}
                {crumb.to ? (
                  <Link to={crumb.to} className="text-accent transition-colors hover:text-base">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="text-balance font-head text-[clamp(2.5rem,1.8rem+2.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-surface">
          {title}
        </h1>

        {children}
      </div>
    </div>
  )
}
