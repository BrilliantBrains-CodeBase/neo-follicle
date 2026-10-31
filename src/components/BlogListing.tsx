import { useState } from 'react'
import { postSummaries } from '../content'
import { BLOG_TOPICS, topicFor, type BlogTopic } from '../config/blogTopics'
import BlogCta from './BlogCta'
import PageBanner from './PageBanner'
import PostCard from './PostCard'
import Reveal from './Reveal'
import { Square } from './icons'

/**
 * The blog listing, shared by /our-blogs/ and /category/uncategorized/.
 *
 *   banner    PageBanner
 *   header    the square eyebrow + a centred h2
 *   filters   topic chips (All Guides + BLOG_TOPICS), see config/blogTopics
 *   grid      3 columns from 1025px, 2 from 768px, 1 below
 *   closing   the dark CTA card, see BlogCta
 *
 * EVERY POST IS IN THE PRERENDERED HTML. The page used to show 12 per page
 * with client-side paging, so the other posts had no crawlable link from the
 * listing. Now all of them render, and the chips only filter what is already
 * there: the server output is the "All Guides" state, so crawlers see every
 * card and there is still exactly one URL.
 *
 * Copy: the h2 is the reference's own section heading. Card copy is each
 * post's real excerpt -- published site copy, nothing invented.
 */

const ALL = 'All Guides'
type Filter = typeof ALL | BlogTopic

type BlogListingProps = {
  /** The page's <h1>. Differs between the two routes that use this. */
  heading: string
  /** Banner breadcrumb leaf. */
  crumb: string
  /** Set false on the category duplicate, which shows 12 cards and no filters. */
  paged?: boolean
}

export default function BlogListing({ heading, crumb, paged = true }: BlogListingProps) {
  const [filter, setFilter] = useState<Filter>(ALL)

  const all = paged ? postSummaries : postSummaries.slice(0, 12)
  // Only offer chips that have posts behind them.
  const filters: Filter[] = [ALL, ...BLOG_TOPICS.filter((t) => all.some((p) => topicFor(p) === t))]
  const shown = filter === ALL ? all : all.filter((p) => topicFor(p) === filter)

  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: crumb }]}
        title={heading}
        // A clinic photograph, matching what the reference banner shows. It is
        // client-supplied (see Hero, which records that Folixa's own
        // Blog-Banner-1.webp is licensed theme stock and must not be used).
        image="/hero.webp"
      />

      <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
        <div className="container flex flex-col gap-8 lg:gap-10">
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
              <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
              Latest Insights
            </p>
            <h2 className="text-balance font-head text-h2 text-secondary md:max-w-[492px] lg:max-w-[656px]">
              Helpful Guides for Hair Transplant Patients
            </h2>
          </Reveal>

          {paged && (
            <div
              role="group"
              aria-label="Filter guides by topic"
              // Scrolls sideways on narrow phones rather than wrapping into a block.
              className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {filters.map((f) => {
                const active = f === filter
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f)}
                    className={`shrink-0 whitespace-nowrap rounded-pill border px-5 py-2 font-head text-[0.9375rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      active
                        ? 'border-primary bg-primary text-white shadow-[0_4px_12px_rgba(60,114,215,0.3)]'
                        : 'border-line bg-base text-secondary hover:border-primary hover:text-primary'
                    }`}
                  >
                    {f}
                  </button>
                )
              })}
            </div>
          )}

          <p className="sr-only" aria-live="polite">
            {filter === ALL ? `Showing all ${shown.length} guides` : `Showing ${shown.length} ${filter} guides`}
          </p>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {shown.map((post, i) => (
              <Reveal key={post.slug} as="li" delay={(i % 3) * 80} className="h-full">
                <PostCard post={post} eager={i < 3} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <BlogCta />
    </>
  )
}
