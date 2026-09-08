/**
 * Mobile card tracks.
 *
 * tailwind.config.js replaces Tailwind's default screens with `md: 768px` /
 * `lg: 1025px` and defines no `sm:`, so every width from 320 to 767 shares one
 * unprefixed layout. In the ported sections that layout is a single-column
 * grid, which turns Services' six 320px cards into ~2000px of scrolling.
 *
 * Below `md` those grids become horizontal scroll-snap tracks instead. Native
 * scroll rather than a transform carousel, for three reasons: it is a real
 * finger swipe with iOS momentum, it costs no JavaScript, and it leaves every
 * card in the prerendered HTML -- which scripts/verify-seo.mjs requires (see
 * Reveal.tsx's note: nothing may depend on JS to become visible).
 *
 * From `md` up the caller's own grid takes over and nothing changes.
 */

/**
 * The bare track: a snap row below `md`, released back to normal flow above it.
 * Most callers want `SCROLLER` instead -- this one leaves the display alone.
 *
 * Three values here are load-bearing:
 *
 *   - `-mx-gutter ... px-gutter` bleeds the track through the `container`'s
 *     1.25rem padding so a card can peek at the viewport edge, and
 *     `scroll-px-gutter` makes `snap-start` land the next card at the gutter
 *     rather than flush against the screen.
 *   - `SCROLLER`'s `md:grid` beats the base `flex`: both are display utilities,
 *     and Tailwind emits the `md:` variant after the unprefixed rule.
 *   - `overflow-y-hidden` is not optional. Per spec, `overflow-x: auto` against
 *     an `overflow-y: visible` computes the y axis to `auto`, so the fadeInUp
 *     keyframe (translate3d(0, 100%, 0), tailwind.config.js) would push cards
 *     below the box mid-animation and pop a transient vertical scrollbar.
 *     Clipping y makes the entrance read as a rise from the bottom edge.
 *     `py-2` then leaves room inside that clip for focus rings and the kit's
 *     -8px hover lift.
 */
export const TRACK =
  '-mx-gutter flex snap-x snap-mandatory scroll-px-gutter overflow-x-auto overflow-y-hidden ' +
  'px-gutter py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ' +
  'md:mx-0 md:snap-none md:overflow-visible md:px-0 md:py-0'

/**
 * `TRACK` plus the display swap back to a grid at `md`. This is what a section
 * whose desktop layout is a grid wants.
 *
 * The two are split because WhyNeoFollicle's track stays flex at every width --
 * its desktop mechanic is a translateX measured against a flex track's own
 * width. It could not just append `md:flex` to this, because Tailwind emits
 * `flex` before `grid` within a variant, so `md:grid` would win regardless of
 * the order the classes are written in.
 */
export const SCROLLER = `${TRACK} md:grid`

/**
 * One item in that track. The 85% is the affordance: it leaves the next card
 * visibly cut off at the edge, which is what tells a thumb the row scrolls.
 */
export const SLIDE = 'w-[85%] shrink-0 snap-start md:w-auto'
