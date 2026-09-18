import { Link } from 'react-router-dom'
import { postSummaries } from '../content'

/**
 * The sidebar's Recent Posts card.
 *
 * Design ported from the Folixa reference single post -- Elementor card
 * `4fcf455` wrapping the `jkit_post_list` widget `637c767`, four items with no
 * thumbnails. Values from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-33.css:
 *
 *   card    surface #F8FAFC, 1px overlay #00000033, radius 0.5rem, padding 1.5rem
 *   heading h4 token, secondary
 *   title   Inter 600 at 1.125rem / 1.5em, body colour -- the only place in the
 *           whole kit that uses Inter semibold, so it is set explicitly here
 *           rather than reached for through a token
 *   bullet  14px dark dot, 8px gap
 *   item    20px bottom padding; the whole row goes primary on hover at 0.4s
 *
 * This card is also load-bearing for internal linking, not just decoration.
 * neofollicle-seo-backup/reports/seo-audit.md section 7 found 12 of 19 posts
 * with 2 or fewer inbound links, and the listing pages only 12 posts at a time
 * (see our-blogs.tsx), so these four links plus RelatedPosts are what keeps
 * every post reachable.
 */

type RecentPostsProps = {
  /** The post being read, so it does not link to itself. */
  exclude?: string
  limit?: number
}

export default function RecentPosts({ exclude, limit = 4 }: RecentPostsProps) {
  const recent = postSummaries.filter((post) => post.slug !== exclude).slice(0, limit)

  return (
    <section className="rounded-lg border border-overlay bg-surface p-6">
      <h2 className="font-head text-h4 text-secondary">Recent Posts</h2>
      <ul className="mt-4">
        {recent.map((post) => (
          <li key={post.slug} className="border-b border-overlay/40 last:border-0">
            <Link
              to={post.path}
              className="group flex items-start gap-2 py-4 transition-colors duration-[400ms] hover:text-primary"
            >
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-[6px] w-[6px] shrink-0 rounded-full bg-secondary transition-colors duration-300 group-hover:bg-primary"
              />
              <span className="font-body text-body-lg font-semibold leading-[1.5] text-body transition-colors duration-[400ms] group-hover:text-primary">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
