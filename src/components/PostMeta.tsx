import { DOCTOR } from '../config/site'
import type { Post } from '../content/types'

/**
 * The four-pair post meta card -- Written by / Category / Published / Time to Read.
 *
 * Design ported from the Folixa reference single post, which has TWO of these
 * and shows exactly one at a time:
 *
 *   `840678b`  elementor-hidden-tablet + -mobile  -> top of the sidebar, desktop
 *   `609c0b7`  elementor-hidden-desktop           -> under the featured image
 *
 * That is why this takes a `variant` rather than being placed once: the box has
 * to move, not just reflow, because on desktop it belongs to the sidebar and
 * below desktop the sidebar is under the whole article. Values from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-33.css:
 *
 *   shell    surface #F8FAFC, 1px overlay #00000033, radius 0.5rem, padding 1.5rem
 *   desktop  one column, 2rem between pairs
 *   tablet   four across at 1fr 1fr 1.5fr 1fr -- the wider third column is for
 *            the date, which is the longest value
 *   mobile   back to one column, 1.25rem gap
 *   label    body token; value the h6 token, rendered as a <h6> in the source
 *
 * Deliberate departure: the values are <dd>/<dt> rather than the reference's
 * <h6>. Four <h6> elements per post would put non-headings into the document
 * outline; a description list is what this actually is.
 */

const SHELL = 'rounded-lg border border-overlay bg-surface p-6'
const PAIR = 'flex flex-col gap-gap-xs'
const LABEL = 'text-body'
const VALUE = 'font-head text-h6 text-secondary'

/** "17 June 2026" -- the reference's format, and unambiguous internationally. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

type PostMetaProps = {
  post: Post
  /** `inline` sits in the article and hides at `lg`; `sidebar` is the reverse. */
  variant: 'inline' | 'sidebar'
}

export default function PostMeta({ post, variant }: PostMetaProps) {
  const layout =
    variant === 'inline'
      ? 'grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr_1.5fr_1fr] md:items-start md:gap-6 lg:hidden'
      : 'hidden lg:grid lg:grid-cols-1 lg:gap-8'

  const pairs = [
    { label: 'Written by', value: DOCTOR.name },
    { label: 'Category', value: post.category },
    { label: 'Published', value: formatDate(post.datePublished) },
    { label: 'Time to Read', value: `${post.readingMinutes} minutes` },
  ]

  return (
    <dl className={`${SHELL} ${layout}`}>
      {pairs.map(({ label, value }) => (
        <div key={label} className={PAIR}>
          <dt className={LABEL}>{label}</dt>
          <dd className={VALUE}>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
