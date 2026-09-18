/**
 * Previous / Next for the blog listing.
 *
 * Design ported from the Folixa reference blog archive, whose `jkit_post_block`
 * runs `pagination_mode: nextprev` -- two centred pills rather than numbered
 * pages. Values from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-31.css:
 *
 *   fill      accent #E2ECFF, radius 8px, padding 10px 20px, gap 10px
 *   hover     primary #3E74D9 with white text
 *   disabled  the same accent fill at 50% opacity
 *
 * The reference pages over ajax. This is client state instead: the site is
 * prerendered and scripts/verify-seo.mjs fails on any URL absent from
 * 01-SEO-MASTER.csv, and `/our-blogs/page/2/` is not in it -- so a second URL
 * cannot exist. See the note in our-blogs.tsx on what that costs and how the
 * detail pages make it back.
 *
 * Paging moves focus to the grid heading, otherwise a keyboard or screen-reader
 * visitor presses Next and is left at the bottom of a list that silently
 * changed above them.
 */

const PILL =
  'rounded bg-accent px-5 py-2.5 font-head text-button text-secondary transition-colors duration-300 hover:bg-primary hover:text-base disabled:pointer-events-none disabled:opacity-50 disabled:hover:bg-accent disabled:hover:text-secondary'

type PostPagerProps = {
  /** 1-based. */
  page: number
  pageCount: number
  onChange: (page: number) => void
}

export default function PostPager({ page, pageCount, onChange }: PostPagerProps) {
  if (pageCount < 2) return null

  return (
    <nav className="flex justify-center gap-2.5" aria-label="Blog pages">
      <button type="button" className={PILL} disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <button type="button" className={PILL} disabled={page === pageCount} onClick={() => onChange(page + 1)}>
        Next
      </button>
      <p className="sr-only" aria-live="polite">
        Page {page} of {pageCount}
      </p>
    </nav>
  )
}
