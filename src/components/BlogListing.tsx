import { useRef, useState } from 'react'
import { postSummaries } from '../content'
import BlogCta from './BlogCta'
import PageBanner from './PageBanner'
import PostCard from './PostCard'
import PostPager from './PostPager'
import Reveal from './Reveal'
import { Square } from './icons'

/**
 * The blog listing, shared by /our-blogs/ and /category/uncategorized/.
 *
 * Design ported from the Folixa reference blog archive, Elementor template
 * post-31 (folixa-design-reference/pages/blog/). Values resolved from
 * .../assets/css/uploads__sites__226__elementor__css__post-31.css. Visual
 * targets are folixa-design-reference/pages/blog/screenshot-desktop.png and
 * .../sections/03-helpful-guides-for-hair-transplant-patients.png.
 *
 *   banner    PageBanner, with the archive's own 5rem padding
 *   header    the square eyebrow + a centred h2 held to 656px desktop /
 *             492px tablet, so it wraps where the reference wraps it
 *   grid      2 columns from 768px up, 1 below; column and row gaps
 *             40px desktop / 32px tablet and mobile
 *   pager     two accent pills, see PostPager
 *   closing   the flat dark CTA card, see BlogCta
 *
 * PAGING IS CLIENT STATE, AND THAT IS A CONSTRAINT, NOT A PREFERENCE.
 * The old site paged at 12 per page to /our-blogs/page/2/. That URL is not in
 * neofollicle-seo-backup/01-SEO-MASTER.csv, and scripts/verify-seo.mjs check 9
 * fails the build on any sitemap URL the CSV does not list, so a second URL
 * cannot be introduced here. The consequence is real and worth being explicit
 * about: the prerendered HTML contains only the first 12 cards, so the other
 * seven posts get no crawlable link from this page. RecentPosts and
 * RelatedPosts on every detail page are what carry them -- see audit section 7,
 * which found 12 of 19 posts with 2 or fewer inbound links. Net internal links
 * go up.
 *
 * Copy: the h2 is the reference's own section heading, which the client content
 * doc also uses for the home page teaser (see Insights). Card copy is each
 * post's real WordPress excerpt -- published site copy, nothing invented.
 */

const PER_PAGE = 12

type BlogListingProps = {
  /** The page's <h1>. Differs between the two routes that use this. */
  heading: string
  /** Banner breadcrumb leaf. */
  crumb: string
  /** Set false on the category duplicate, which showed the same 12 with no pager. */
  paged?: boolean
}

export default function BlogListing({ heading, crumb, paged = true }: BlogListingProps) {
  const [page, setPage] = useState(1)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const pageCount = paged ? Math.ceil(postSummaries.length / PER_PAGE) : 1
  const shown = paged ? postSummaries.slice((page - 1) * PER_PAGE, page * PER_PAGE) : postSummaries.slice(0, PER_PAGE)

  function goTo(next: number) {
    setPage(next)
    // Without this the visitor presses Next at the bottom of the list and the
    // content silently changes somewhere above them.
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    headingRef.current?.focus()
  }

  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: crumb }]}
        title={heading}
        // A clinic photograph, matching what the reference banner shows. It is
        // client-supplied (see Hero, which records that Folixa's own
        // Blog-Banner-1.webp is licensed theme stock and must not be used).
        // Shared with the home hero for now because it is the only theatre
        // scene in public/ -- worth a dedicated photo if the client has one.
        image="/hero.webp"
      />

      <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
        <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
              <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
              Latest Insights
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-balance font-head text-h2 text-secondary outline-none md:max-w-[492px] lg:max-w-[656px]"
            >
              Helpful Guides for Hair Transplant Patients
            </h2>
          </Reveal>

          <ul className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {shown.map((post, i) => (
              <Reveal key={post.slug} as="li" delay={(i % 2) * 100}>
                <PostCard post={post} eager={page === 1 && i < 2} />
              </Reveal>
            ))}
          </ul>

          {paged && <PostPager page={page} pageCount={pageCount} onChange={goTo} />}
        </div>
      </section>

      <BlogCta />
    </>
  )
}
