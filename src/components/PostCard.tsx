import { Link } from 'react-router-dom'
import { blogCardSrcSet } from '../config/images'
import { topicLabelFor } from '../config/blogTopics'
import { ArrowRight } from './icons'
import type { PostSummary } from '../content/types'

/**
 * One blog card on /our-blogs/: a white card with the featured image on top,
 * then a topic chip, the title, a two-line excerpt and "Read guide".
 *
 * The image keeps its own 1200:628 shape rather than a fixed-height crop:
 * every featured image is an infographic with words set into it, and cropping
 * would cut them. The excerpt is clamped to two lines visually; the full text
 * stays in the HTML. The whole card is one link, so the title is its name.
 */

type PostCardProps = {
  post: PostSummary
  /** Set when the image is above the fold, so the first row is not lazy. */
  eager?: boolean
}

export default function PostCard({ post, eager = false }: PostCardProps) {
  return (
    <Link
      to={post.path}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-base shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_rgba(16,24,40,0.06)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_32px_rgba(16,24,40,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="overflow-hidden bg-surface">
        <img
          src={post.card.src}
          srcSet={blogCardSrcSet(post.card.src, post.card.width)}
          sizes="(min-width: 1025px) 380px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 40px)"
          alt={post.card.alt}
          width={post.card.width}
          height={post.card.height}
          loading={eager ? 'eager' : 'lazy'}
          className="aspect-[1200/628] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <span className="self-start rounded-pill bg-accent px-3 py-1 text-[0.8125rem] font-medium leading-5 text-primary-dark">
          {topicLabelFor(post)}
        </span>
        <h3 className="mt-3 font-head text-h5 font-bold text-secondary transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-body">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 font-head text-[1rem] font-semibold text-primary">
          Read guide
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
