import Reveal from '../Reveal'
import { SCROLLER, SLIDE } from '../carousel'
import type { GalleryImage } from '../../content/gallery/types'

/**
 * One gallery section's image grid.
 *
 * Extends the `Results` grid in treatment/sections.tsx -- same SCROLLER/SLIDE
 * track, same Reveal stagger, same lazy <img> -- with two additions the
 * gallery needs.
 *
 * 1. EVERY TILE IS AN ANCHOR to its own full-size WebP. That is what makes the
 *    page work with JavaScript off, and it is also what puts the -full.webp
 *    files in the prerendered HTML so verify-gallery.mjs's orphan check can see
 *    them. The lightbox merely intercepts the click.
 *
 * 2. NO SHARED ASPECT BOX. The 82 sources run 650x450, 1280x1280, 1024x1024 and
 *    512x512. Forcing one ratio would mean object-cover (which crops a
 *    before/after composite in half -- the exact thing the image pipeline
 *    exists to prevent) or object-contain (which letterboxes the 28 square
 *    ones). So tiles keep their intrinsic ratio and rows are top-aligned with
 *    `items-start`. The capture's order already groups landscape before square
 *    within a section, so most rows come out uniform anyway.
 *
 * The Reveal delay is `(i % 3) * 100`, NOT `i * 100`. sections.tsx can use the
 * latter because it renders at most five images; the first section here has
 * thirty-three, and the last tile would carry a 3.3 second delay and read as
 * broken. Modulo the column count staggers each row instead.
 */

type Props = {
  images: GalleryImage[]
  /** Included in each tile's accessible name, e.g. "... - 3 of 15". */
  sectionHeading: string
  /** Omitted when the grid is not interactive (no JS has mounted yet). */
  onOpen?: (index: number) => void
  /** The first section's first row is above the fold. */
  eager?: boolean
}

export default function GalleryGrid({ images, sectionHeading, onOpen, eager = false }: Props) {
  return (
    <ul className={`${SCROLLER} items-start gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3`}>
      {images.map((image, i) => (
        <Reveal as="li" key={image.thumb.src} delay={(i % 3) * 100} className={SLIDE}>
          <figure className="flex flex-col gap-2">
            <a
              href={image.full.src}
              // The anchor's own text would otherwise be empty; the <img> alt
              // names it, and this adds where it sits in the set.
              aria-label={`${image.alt} - ${sectionHeading}, image ${i + 1} of ${images.length}`}
              onClick={(e) => {
                if (!onOpen) return
                // Leave modified and non-primary clicks to the browser, so
                // "open image in new tab" still works.
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
                e.preventDefault()
                onOpen(i)
              }}
              className="group block overflow-hidden rounded border border-line"
            >
              <img
                src={image.thumb.src}
                alt={image.alt}
                width={image.thumb.width}
                height={image.thumb.height}
                loading={eager && i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />
            </a>
            {/* Only the failed-repair set carries one. It is visible on the
                page, not just in alt text, because the caveat is about what
                the photograph IS -- see content/gallery/types.ts. */}
            {image.caption && (
              <figcaption className="text-body">{image.caption}</figcaption>
            )}
          </figure>
        </Reveal>
      ))}
    </ul>
  )
}
