import Reveal from '../Reveal'

/**
 * A gallery section's heading block: h2 and h3 held left, lede beside them.
 *
 * WHY THIS IS NOT shell.tsx's SectionHead. That component's docblock records
 * the reference's own rule -- centre a heading when a full-width card grid
 * follows and anchors it -- and for the treatment pages that is right, because
 * their heads are one line and an optional short lede.
 *
 * These are not. Every gallery section carries an h2, an h3 AND a lede, all
 * three P0-PRESERVE copy from the capture, and stacking three centred blocks
 * put a wall of prose between a visitor and the photographs they came for --
 * on eight sections. The rule assumes a short head, and that does not hold.
 *
 * So the head becomes the two-column row the reference uses elsewhere
 * (`623ca65`, quoted in Split's docblock): title block left, supporting copy
 * right, both left-aligned.
 *
 * MEASURED, at 1440, h2 top to grid top, centred -> two-column:
 *
 *   image gallery   259px -> 199px average (-23%), worst section 369 -> 229
 *   video gallery   307px -> 248px average (-19%), worst section 432 -> 355
 *   whole document  15196 -> 14711px, and 9372 -> 9135px
 *
 * Worth stating plainly because it is less than it looks: the lede column is
 * about the same width as the centred lede's own `max-w-[534px]` cap, so it
 * wraps to a similar number of lines. The saving is the two stacked rows that
 * disappear, not the paragraph getting shorter. The visible gain is larger than
 * the percentage suggests, because what is removed sits directly above the
 * images.
 *
 * The grid below stays at full container width, which is the part worth
 * protecting: narrowing it to fit a sticky Split column would cost the tiles
 * about a third of their size.
 *
 * `lg:` only. Below that the columns stack, which is the same call Split makes
 * and for the same reason: two columns in a phone's width is one narrow column
 * twice.
 *
 * SECTIONS WITHOUT A LEDE do not split. Three of the twelve have none ("Scalp
 * Micro-Pigmentation Results", "Hair Transplant Journeys", "Hair Transplant
 * Testimonials Videos"), and a lone heading pinned to the left half with an
 * empty right half reads as a layout fault rather than a choice.
 */
export default function GallerySectionHead({
  heading,
  subheading,
  lede,
}: {
  heading: string
  /**
   * The capture ran an h2/h3 pair on every section -- "Beard Transplant
   * Results" over "From Patchy to Powerful Beards". Both are the client's copy.
   */
  subheading?: string
  lede?: string
}) {
  const title = (
    <div className="flex flex-col gap-3">
      <h2 className="text-balance font-head text-h2">{heading}</h2>
      {subheading && <h3 className="text-balance font-head text-h5 text-primary">{subheading}</h3>}
    </div>
  )

  if (!lede) {
    return (
      <Reveal className="flex flex-col text-left lg:max-w-[820px]">{title}</Reveal>
    )
  }

  return (
    /*
     * 6/5 rather than an even split: the h2 is `text-h2` and the lede is
     * `text-body`, so equal columns would wrap the heading harder than the
     * paragraph beside it. `items-start` top-aligns them, which holds up across
     * twelve sections whose ledes run from one line to six -- `items-end` reads
     * better when the lede is short and pushes the heading down the page when
     * it is not.
     */
    <Reveal className="grid gap-4 text-left lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start lg:gap-gap">
      {title}
      <p className="text-body lg:pt-2">{lede}</p>
    </Reveal>
  )
}
