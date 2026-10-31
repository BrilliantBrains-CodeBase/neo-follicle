import type { PostSummary } from '../content/types'

/**
 * Topics for the /our-blogs/ filter chips and the label on each card.
 *
 * A post's topic comes from its category (set in content/posts/<slug>.json
 * for new posts), so a new post lands in a sensible filter with no edit here.
 * TOPIC_BY_SLUG overrides that for posts whose category is too broad -- e.g.
 * the recovery timeline is category "Hair Transplant" but belongs under
 * Recovery. LABEL_BY_SLUG only changes the chip text on one card.
 */
export const BLOG_TOPICS = ['Hair Loss', 'Hair Transplant', 'Treatments', 'Recovery'] as const
export type BlogTopic = (typeof BLOG_TOPICS)[number]

const TOPIC_BY_SLUG: Record<string, BlogTopic> = {
  'hair-transplant-recovery-timeline': 'Recovery',
  'is-hair-transplant-painful': 'Recovery',
  'how-to-stop-hair-fall-causes-treatments': 'Hair Loss',
}

const LABEL_BY_SLUG: Record<string, string> = {
  'how-to-choose-the-best-hair-transplant-clinic-bangalore': 'Clinic Selection',
}

export function topicFor(post: Pick<PostSummary, 'slug' | 'category'>): BlogTopic {
  const pinned = TOPIC_BY_SLUG[post.slug]
  if (pinned) return pinned
  const c = post.category.toLowerCase()
  if (c.includes('treatment')) return 'Treatments'
  if (c.includes('hair loss')) return 'Hair Loss'
  return 'Hair Transplant'
}

export function topicLabelFor(post: Pick<PostSummary, 'slug' | 'category'>): string {
  return LABEL_BY_SLUG[post.slug] ?? topicFor(post)
}
