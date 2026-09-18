import { Link } from 'react-router-dom'
import { postSummaryBySlug } from '../content'
import { ArrowRight, Square } from './icons'
import Reveal from './Reveal'

/**
 * Three related posts, closing the detail page.
 *
 * AN ADDITION TO THE REFERENCE, not a port. The Folixa single post has no
 * related-posts block (nor an author box, prev/next nav or comments). This
 * exists for one reason, recorded in
 * neofollicle-seo-backup/reports/seo-audit.md section 7:
 *
 *   "Blog posts are also thinly linked (most have 1-2 inbound). Contextual
 *    links from the service pages into the related posts would push equity
 *    into that content."
 *
 * 12 of the 19 posts had 2 or fewer inbound internal links, and the listing
 * shows 12 at a time (see our-blogs.tsx), so without this the newest seven
 * posts would be reachable only by paging. Relatedness is computed at build
 * time in scripts/gen-posts.mjs from shared articleSection and keywords -- the
 * only topical signal the old site has, since WordPress had exactly one
 * category and no tags.
 *
 * Visually it reuses the reference's own vocabulary rather than inventing any:
 * the square eyebrow and centred h2 from the archive header, on the `surface`
 * band the archive CTA sits on, with cards in the 3-up arrangement Insights
 * already established on the home page.
 */

export default function RelatedPosts({ slugs }: { slugs: string[] }) {
  const posts = slugs.map((slug) => postSummaryBySlug[slug]).filter(Boolean)
  if (posts.length === 0) return null

  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Keep Reading
          </p>
          <h2 className="text-balance font-head text-h2 text-secondary md:max-w-[492px] lg:max-w-[656px]">
            Related Hair Transplant Guides
          </h2>
        </Reveal>

        <ul className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
          {posts.map((post, i) => (
            <Reveal key={post.slug} as="li" delay={i * 100}>
              <Link to={post.path} className="group flex h-full flex-col">
                <img
                  src={post.card.src}
                  alt={post.card.alt}
                  width={post.card.width}
                  height={post.card.height}
                  loading="lazy"
                  className="aspect-[1200/628] w-full shrink-0 rounded object-cover"
                />
                <h3 className="mt-4 font-head text-h5 text-secondary transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-4 text-body">{post.excerpt}</p>
                <span className="mt-auto block pt-4">
                  <span className="inline-flex items-center border-b border-primary pb-[2px] font-head text-button text-primary transition-colors group-hover:text-secondary">
                    Read More
                    <ArrowRight className="ml-4 h-4 w-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
