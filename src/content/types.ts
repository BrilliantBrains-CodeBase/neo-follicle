/**
 * The shape of a blog post after `scripts/gen-posts.mjs` has parsed it.
 *
 * Post bodies are the old WordPress site's published copy, which is P0-PRESERVE
 * (see neofollicle-seo-backup/reports/seo-audit.md). Rather than inject raw HTML,
 * the generator parses each body into this block tree and `src/components/
 * PostProse.tsx` renders it with real components -- so every construct the old
 * site used is accounted for in the type system, and an unrecognised tag fails
 * the build instead of silently disappearing.
 *
 * The block and inline unions are closed, and deliberately so: a census of all
 * 19 bodies found exactly these elements and nothing else.
 */

/** Inline runs. The census found only these four inside p/li/td/h2-h4. */
export type Inline =
  | { t: 'text'; v: string }
  | { t: 'strong'; c: Inline[] }
  | { t: 'a'; href: string; title?: string; c: Inline[] }
  | { t: 'br' }

export type PostImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type Block =
  /** `small` marks `has-small-font-size`, which the old site used for the reference list. */
  | { t: 'p'; c: Inline[]; small?: true }
  | { t: 'h'; level: 2 | 3 | 4; id: string; c: Inline[] }
  | { t: 'list'; ordered: boolean; small?: true; items: Inline[][] }
  | { t: 'hr' }
  /** `avatar` is the author portrait block (`wp-block-image is-style-rounded`). */
  | { t: 'img'; image: PostImage; avatar?: true }
  | { t: 'gallery'; images: PostImage[] }
  | { t: 'table'; head: Inline[][]; rows: Inline[][][] }
  | { t: 'embed'; provider: 'youtube'; videoId: string; title: string }

/** One entry per h2, using the same anchor ids the old site's TOC linked to. */
export type PostTocEntry = { id: string; text: string }

/** Everything the listing page needs -- a post record minus its body. */
export type PostSummary = {
  slug: string
  /** Route path, trailing slash preserved. Matches the PageSeo record. */
  path: string
  /** The rendered `<h1>`. Deliberately differs from the SEO `<title>`. */
  title: string
  /** The old listing card's copy, from the WordPress excerpt. */
  excerpt: string
  /** The "Blog Summary" lede the old detail page opened with. */
  summary: string
  /** Display category. `articleSection[0]`, overridden where that said "Uncategorized". */
  category: string
  datePublished: string
  dateModified: string
  readingMinutes: number
  card: PostImage
  hero: PostImage
}

export type Post = PostSummary & {
  toc: PostTocEntry[]
  /** Three slugs, scored at build time on shared articleSection and keywords. */
  related: string[]
  body: Block[]
}
