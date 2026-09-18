import PageBanner from './PageBanner'
import PostMeta from './PostMeta'
import PostProse from './PostProse'
import RecentPosts from './RecentPosts'
import RelatedPosts from './RelatedPosts'
import ShareRow from './ShareRow'
import SidebarCta from './SidebarCta'
import Reveal from './Reveal'
import { STICKY_BELOW_HEADER, STICKY_SCROLLABLE } from './sticky'
import type { Post } from '../content/types'

/**
 * The blog post detail page.
 *
 * One component behind all 19 post routes. scripts/gen-pages.mjs emits a small
 * delegate per slug that imports that post's record and renders it here, so the
 * route table stays generated and the layout lives in exactly one place.
 *
 * The record is a prop rather than a slug lookup on purpose. A registry keyed by
 * slug would have to import all 19 records, which put all 19 article bodies into
 * one shared chunk -- so opening any post downloaded every post. Importing the
 * record in the page file keeps each body in that page's own chunk.
 *
 * Design ported from the Folixa reference single post, Elementor template
 * post-33 (folixa-design-reference/pages/single-post/). Values resolved from
 * .../assets/css/uploads__sites__226__elementor__css__post-33.css. Visual
 * targets are
 * folixa-design-reference/pages/single-post/screenshot-desktop.png and
 * .../sections/03-sam-altman.png.
 *
 * Layout, Elementor section `8d6a027`:
 *
 *   >= 1025px  row, main column 70% / sidebar 30%, 4rem gap
 *   <= 1024px  one column, sidebar below the article; 3rem then 2rem gap
 *
 * Main column children stack at 24px, sidebar cards at 32px.
 *
 * The <head> for this page -- title, description, canonical and the whole
 * JSON-LD graph including the BlogPosting and FAQPage nodes -- is NOT set here.
 * It is injected at build time by scripts/prerender.mjs from the PageSeo record
 * and src/seo/schema/<slug>.json, both generated from the backup. See
 * PagePlaceholder for the same arrangement. Nothing in React touches <head>.
 *
 * The featured image is NOT in the banner. The reference puts it as the first
 * widget of the body column and a separate photo behind the banner, and that
 * separation matters more here than it does there: these featured images are
 * infographics with the post's own title set into the artwork, so using one as
 * the banner background prints the title twice, once in the photo and once as
 * the h1. One clinic photograph behind every post banner instead -- which is
 * also what the reference does, with a single detail-banner.webp across all
 * seven of its posts.
 *
 * Deliberate departures from the reference, beyond the banner photo:
 *
 *   - RelatedPosts is added. See its docblock: audit section 7, thin inbound
 *     linking on 12 of 19 posts.
 *   - The Blog Summary lede is rendered. The reference has no equivalent, but
 *     every captured post opens with one and it is the post's own abstract.
 *   - No in-post CTA banner. The reference drops one mid-article; none of the
 *     19 bodies has an in-body CTA and the block tree carries no marker for
 *     where one would go. SidebarCta and the existing StickyActionBar cover it.
 *   - No table of contents. The reference's widget was a dead client-side stub
 *     that captured as "There are no headings in this document". post.toc is
 *     generated and ready if one is wanted later.
 *   - No comments and no author box. Absent from the reference, and all 19
 *     posts had comments closed.
 */

/**
 * The banner photograph, shared with the listing.
 *
 * Folixa's own detail-banner.webp is licensed theme stock -- see the rule Hero
 * records at its /hero.webp call site -- and this is the only high-resolution
 * theatre photograph in public/. Behind a 0.7 scrim it reads as a consistent
 * treatment across the blog rather than a repeated hero. A dedicated blog photo
 * from the client would be better; this is the honest stand-in until there is
 * one. FLAGGED FOR CLIENT REVIEW.
 */
const BANNER = '/hero.webp'

export default function BlogPost({ post }: { post: Post }) {
  return (
    <>
      <PageBanner
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/our-blogs/' },
          { label: post.title },
        ]}
        title={post.title}
        image={BANNER}
      />

      <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
        <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:flex-row lg:items-start lg:gap-gap">
          <article className="flex flex-col gap-6 lg:w-[70%]">
            <img
              src={post.hero.src}
              alt={post.hero.alt}
              width={post.hero.width}
              height={post.hero.height}
              className="w-full rounded"
            />

            {/* Tablet and mobile only. The desktop copy lives at the top of the
                sidebar -- see PostMeta. */}
            <PostMeta post={post} variant="inline" />

            {post.summary && (
              <p className="text-pretty text-body-lg text-secondary">
                <strong className="font-head">Blog Summary:</strong> {post.summary}
              </p>
            )}

            <PostProse blocks={post.body} />

            <ShareRow path={post.path} title={post.title} />
          </article>

          {/*
            The sticky sidebar. Posts run 2,400 to 4,500 words, so without this
            the meta card, the four Recent Posts links and the booking CTA are
            gone after the first screen and never come back.

            STICKY_BELOW_HEADER's docblock lists the three things that have to
            hold for it to work; all three already do here, and each is easy to
            undo by accident:

              - `lg:items-start` is on the row above.
              - the row is far taller than this column -- the shortest article
                is 2,400 words against three cards.
              - Reveal is on the cards INSIDE this node, never on the aside
                itself, because a transform would make it the containing block
                for the sticky.

            STICKY_SCROLLABLE is what makes the column's own height safe: the
            three cards come to roughly 1000px, which fits under the header at
            1080p but not at 1440x900. Where it fits there is no scrollbar at
            all; where it does not, the CTA stays reachable.
          */}
          <aside className={`flex flex-col gap-8 lg:w-[30%] ${STICKY_BELOW_HEADER} ${STICKY_SCROLLABLE}`}>
            <PostMeta post={post} variant="sidebar" />
            <Reveal>
              <RecentPosts exclude={post.slug} />
            </Reveal>
            <Reveal delay={100}>
              <SidebarCta />
            </Reveal>
          </aside>
        </div>
      </section>

      <RelatedPosts slugs={post.related} />
    </>
  )
}
