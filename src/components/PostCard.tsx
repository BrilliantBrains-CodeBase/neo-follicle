import { Link } from 'react-router-dom'
import { ArrowRight } from './icons'
import type { PostSummary } from '../content/types'

/**
 * One blog card.
 *
 * Design ported from the Folixa reference blog archive -- the `jkit_post_block`
 * widget `b2b038c` in `postblock-type-1`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-31.css
 * and .../plugins__jeg-elementor-kit__assets__css__elements__main.css. Visual
 * target is
 * folixa-design-reference/pages/blog/sections/03-helpful-guides-for-hair-transplant-patients.png.
 *
 * The widget's own settings are definitive about what the card shows:
 * `sg_content_element_order: "title,excerpt,read"`, with
 * `sg_content_category_enable`, `sg_content_meta_enable` and
 * `sg_content_comment_enable` all off. So there is no category chip, no date,
 * no author and no read time here -- those belong to the detail page. The
 * reference's excerpt is truncated at 15 words; ours uses each post's real
 * WordPress excerpt, which is hand-written for exactly this slot.
 *
 * Layout, which changes shape twice:
 *
 *   >= 1025px  image left at 50%, text right with 24px of padding, and the
 *              text block vertically centred against the image
 *   768-1024   image on top, text below
 *   <= 767px   same, one column
 *
 * Deliberate departure: the image keeps its own 1.91:1 aspect rather than the
 * reference's fixed-height crop box (270 / 220 / 190px). At the 2-up column
 * width the image half is ~300px, so a 270px-tall box is very nearly square and
 * crops these wide banners to about half their width. That is survivable for
 * Folixa's photographs and not for ours: every featured image here is an
 * infographic with type set into it, and cropping cuts the words in half.
 * Insights.tsx made the same call for the same images on the home page and
 * documents the same reason.
 *
 * The Read More affordance is a text link with a 1px rule under it, not a
 * filled button -- the reference overrides the kit's default blue pill with
 * `background-color: #FFFFFF`. On hover the text and arrow go to `secondary`
 * while the rule stays `primary`. Insights uses the same treatment; the class
 * string is duplicated rather than shared because the two differ in gap.
 */

const READ_MORE =
  'inline-flex items-center border-b border-primary pb-[2px] font-head text-button text-primary transition-colors group-hover:text-secondary'

type PostCardProps = {
  post: PostSummary
  /** Set when the image is above the fold, so the first row is not lazy. */
  eager?: boolean
}

export default function PostCard({ post, eager = false }: PostCardProps) {
  return (
    <Link to={post.path} className="group block lg:flex lg:items-center">
      <img
        src={post.card.src}
        alt={post.card.alt}
        width={post.card.width}
        height={post.card.height}
        loading={eager ? 'eager' : 'lazy'}
        // `w-full` is right below `lg`, where the card is a plain block. At `lg`
        // it must be overridden: `width: 100%` on a flex item that also refuses
        // to shrink claims the whole card and squeezes the text to nothing.
        className="aspect-[1200/628] w-full rounded object-cover lg:w-1/2 lg:shrink-0"
      />

      <div className="mt-4 lg:mt-0 lg:min-w-0 lg:flex-1 lg:pl-6">
        <h3 className="font-head text-h4 text-secondary transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-4 text-body">{post.excerpt}</p>
        <span className="mt-6 block">
          <span className={READ_MORE}>
            Read More
            <ArrowRight className="ml-4 h-4 w-4" />
          </span>
        </span>
      </div>
    </Link>
  )
}
