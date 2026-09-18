/**
 * Pins an element clear of the sticky header.
 *
 * The offset is derived from Header.tsx: the bar is `sticky top-0`, its inner
 * row is `min-h-[91px]` with `py-gutter` (1.25rem) around a 56px logo -- so 96px
 * of content box -- plus a 1px bottom border, and it never shrinks on scroll.
 * 97px, then 2rem of breathing room.
 *
 * `lg:` only. Below that the page's two-column layouts stack, where pinning one
 * column would just cover the other.
 *
 * Sticky is easy to break from a distance, so wherever this is used, three
 * things have to hold:
 *
 *   - the parent flex row needs `lg:items-start`. A stretched flex item is as
 *     tall as the row, which leaves sticky no room to travel.
 *   - the row must be taller than the pinned column, which is what sticky
 *     travels through.
 *   - `Reveal` must sit INSIDE the pinned node, never on it. `animate-fadeInUp`
 *     carries a transform, and a transformed element becomes the containing
 *     block for any sticky descendant, so the two cannot share a node.
 *
 * Used by CommonQuestions (the home FAQ's left column) and BlogPost (the post
 * sidebar). A class string in a .ts module is scanned by Tailwind the same as
 * one in .tsx -- carousel.ts is the existing precedent.
 */
export const STICKY_BELOW_HEADER = 'lg:sticky lg:top-[calc(97px_+_2rem)]'

/**
 * Caps a pinned column at the screen and lets it scroll internally if its
 * content is taller.
 *
 * When the content fits, no scrollbar is created and the column behaves as a
 * plain sticky one. When it does not -- the post sidebar runs about 1000px
 * against roughly 770px of space at 1440x900 -- this is what keeps the bottom
 * of the column reachable instead of clipped off the screen.
 *
 * `dvh` rather than `vh` so a collapsing mobile browser toolbar cannot make the
 * column taller than the viewport. `overscroll-contain` stops a wheel gesture
 * inside the column from chaining into the page once it bottoms out.
 */
export const STICKY_SCROLLABLE = 'lg:max-h-[calc(100dvh-97px-4rem)] lg:overflow-y-auto lg:overscroll-contain'
