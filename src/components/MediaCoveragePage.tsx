import { useState } from 'react'
import type { ReactNode } from 'react'
import { MEDIA_COVERAGE } from '../content/media/coverage'
import type { MediaItem } from '../content/media/types'
import type { GalleryImage } from '../content/gallery/types'
import { seoFor } from '../seo/pages'
import BlogCta from './BlogCta'
import { ArrowUpRight } from './icons'
import Lightbox from './Lightbox'
import PageBanner from './PageBanner'
import Reveal from './Reveal'
import { Section } from './treatment/shell'

/**
 * /media-coverage/ -- third-party coverage of Dr Sandeep Mahapatra.
 *
 * The "Media" half of the "Media and Blogs" section. It began as a band on
 * /our-blogs/ and was moved out to its own URL so the header dropdown can
 * offer Blogs and In the Press as two destinations; /our-blogs/ is the blog
 * listing again.
 *
 * Structured as ImageGalleryPage is -- PageBanner carrying the h1, then the
 * content, then a CTA -- and src/pages/media-coverage.tsx is the three-line
 * wrapper, deliberately without the gen-pages marker so the script leaves it
 * alone.
 *
 * Data is src/content/media/coverage.ts: 27 placements from the May-August 2026
 * coverage report, rendered as 18 entries because ten of them are one ANI
 * release that ten outlets ran. That file's docblock has the reasoning.
 *
 * A LIST, NOT A CARD GRID. Sixteen of the eighteen entries are links to other
 * people's articles and have no image; a card grid would be sixteen empty
 * boxes. What there is to show is publication, date and headline, so the row is
 * exactly that, separated by the hairline rule `.post-prose li` and RecentPosts
 * already use. One list language on the page.
 *
 * The h1 comes from the generated PageSeo record, not a literal, so the page
 * and its <title>/canonical cannot drift. The record itself is authored in
 * content/seo/media-coverage.json -- the supported route for a page that
 * postdates the WordPress capture, which dutexome established.
 */

/** Rows read as one list, so the divider is the same rule a prose list uses. */
const ROW = 'flex flex-col gap-2 border-b border-[#DDDDDDB3] py-5 first:pt-0 last:border-0 last:pb-0'

const META = 'flex flex-wrap items-center gap-x-3 gap-y-1 text-body'

/**
 * One meta item after the first, carrying its own leading separator.
 *
 * The separator has to travel with the item that follows it: rendered as a
 * standalone flex child it wraps independently, and at 390px that strands a
 * dangling "|" at the end of the first line.
 */
function Meta({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-x-3">
      <span aria-hidden="true" className="text-line">
        |
      </span>
      {children}
    </span>
  )
}

const TITLE =
  'font-head text-h5 text-secondary transition-colors group-hover:text-primary group-focus-visible:text-primary'

/** The syndication outlets. Small, `accent`-filled, so they read as a set. */
const OUTLET =
  'inline-flex items-center gap-1 rounded-pill bg-accent px-3 py-1 font-head text-[0.875rem] text-secondary transition-colors hover:bg-primary hover:text-base'

const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })
const DAY = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

/** Newest-first groups, keyed by the month label they render under. */
function byMonth(items: MediaItem[]) {
  const groups: Array<{ label: string; items: MediaItem[] }> = []
  for (const item of items) {
    const label = MONTH.format(new Date(item.date))
    const last = groups[groups.length - 1]
    if (last?.label === label) last.items.push(item)
    else groups.push({ label, items: [item] })
  }
  return groups
}

export default function MediaCoveragePage() {
  // Every clipping across the whole band, so arrowing in the lightbox walks all
  // of them rather than stopping at a month boundary. Owned here and not in the
  // row for the reason ImageGalleryPage gives: the set is page-level state.
  const clippings: GalleryImage[] = MEDIA_COVERAGE.flatMap((item) => (item.clipping ? [item.clipping] : []))
  const [open, setOpen] = useState<number | null>(null)

  const groups = byMonth(MEDIA_COVERAGE)
  const outbound = MEDIA_COVERAGE.reduce(
    (n, item) => n + (item.href ? 1 : 0) + (item.syndicatedTo?.length ?? 0),
    0,
  )

  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Media Coverage' }]}
        title={seoFor('media-coverage').h1 ?? 'Dr. Sandeep Mahapatra in the Media'}
        image="/hero.webp"
      >
        {/* `text-line` against the 0.7 scrim, as ImageGalleryPage's lede does
            -- the default body grey does not read on it. */}
        <p className="max-w-[70ch] text-balance text-body-lg text-line">
          Expert commentary, authored articles and press coverage across {outbound} placements in
          national and regional publications.
        </p>
      </PageBanner>

      <Section ground="base" id="media-coverage">
        <div className="flex flex-col gap-gap-mobile md:gap-gap-tablet">
          {groups.map((group, g) => (
            <Reveal key={group.label} delay={g * 100} className="flex flex-col gap-4">
              <h3 className="font-head text-h5 text-primary">{group.label}</h3>

              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li key={`${item.publication}-${item.date}-${item.title}`} className={ROW}>
                    <p className={META}>
                      <span className="font-head text-secondary">{item.publication}</span>
                      <Meta>
                        <time dateTime={item.date}>{DAY.format(new Date(item.date))}</time>
                      </Meta>
                      <Meta>{item.kind}</Meta>
                    </p>

                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-2 text-balance"
                      >
                        <span className={TITLE}>{item.title}</span>
                        <ArrowUpRight className="mt-[0.35em] h-4 w-4 shrink-0 text-primary" />
                      </a>
                    ) : (
                      <p className="font-head text-h5 text-secondary">{item.title}</p>
                    )}

                    {item.syndicatedTo && (
                      <>
                        <p className="text-body">
                          Also carried by {item.syndicatedTo.length} outlets:
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {item.syndicatedTo.map((outlet) => (
                            <li key={outlet.href}>
                              <a href={outlet.href} target="_blank" rel="noopener noreferrer" className={OUTLET}>
                                {outlet.name}
                                <ArrowUpRight className="h-3 w-3 shrink-0" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {item.clipping && (
                      <ClippingThumb
                        image={item.clipping}
                        onOpen={() => setOpen(clippings.indexOf(item.clipping as GalleryImage))}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {open !== null && clippings[open] && (
          <Lightbox
            images={clippings}
            index={open}
            sectionHeading="Print coverage"
            onClose={() => setOpen(null)}
            onIndex={(next) => setOpen(next)}
          />
        )}
      </Section>

      <BlogCta />
    </>
  )
}

/**
 * A print clipping's tile.
 *
 * A real anchor to the full-size file, which the lightbox intercepts -- the
 * same arrangement GalleryGrid uses, so the clippings stay viewable with
 * JavaScript off. Modified and non-primary clicks fall through to the browser.
 */
function ClippingThumb({ image, onOpen }: { image: GalleryImage; onOpen: () => void }) {
  return (
    <a
      href={image.full.src}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        onOpen()
      }}
      className="group mt-1 flex w-full max-w-[260px] flex-col gap-2"
    >
      <span className="overflow-hidden rounded border border-line">
        <img
          src={image.thumb.src}
          alt={image.alt}
          width={image.thumb.width}
          height={image.thumb.height}
          loading="lazy"
          className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </span>
      <span className="inline-flex items-center gap-1 font-head text-button text-primary transition-colors group-hover:text-secondary">
        View the clipping
        <ArrowUpRight className="h-4 w-4 shrink-0" />
      </span>
    </a>
  )
}
