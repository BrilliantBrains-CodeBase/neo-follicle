// Blog content pipeline -- parses the 19 captured blog posts into typed block
// trees under src/content/.
//
// Re-runnable and deterministic: same inputs, byte-identical outputs. Nothing
// under src/content/posts/ or src/content/index.ts is hand-edited -- edit the
// backup or this script, then `npm run gen:posts`.
//
// Inputs, all already on disk:
//
//   site-level/wp-rest/posts.json   the 19 records. `content.rendered` is clean
//                                   Gutenberg body HTML with no nav/header/
//                                   footer/TOC noise -- the right input, unlike
//                                   content.md or raw.html which need stripping.
//   media/manifest.json             featured_media id -> url / alt / dimensions
//   pages/<slug>/schema.jsonld      BlogPosting: real datePublished (the *page*
//                                   displayed the modified date), articleSection,
//                                   keywords
//
// Why a block tree and not raw HTML: the copy is P0-PRESERVE, so it must survive
// verbatim, but injecting it as HTML would leave the markup unstyled and
// unchecked. Parsing to a closed union means an unrecognised element throws here
// rather than vanishing silently in the browser. BLOCK_TAGS / INLINE_TAGS below
// are that allowlist.
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'node-html-parser'
import {
  backup,
  bodyImagePath,
  cardImagePath,
  heroImagePath,
  ORIGIN,
  requestedSize,
  resolveUpload,
  root,
  toRelative,
} from './blog-assets.mjs'

const outDir = path.join(root, 'src/content')
const postsDir = path.join(outDir, 'posts')

/* ---- overrides -------------------------------------------------------------
 * Each of these is a defect in the captured content, documented in
 * neofollicle-seo-backup/reports/seo-audit.md. They are corrected here rather
 * than replicated. Fixing them in the backup instead would be cleaner; until
 * then these maps are the record of what was wrong. */

// The 5 newest posts never got hand-authored schema, so they carry a plain
// Article node with articleSection: ["Uncategorized"] instead of a BlogPosting.
// WordPress itself only ever had one category, so there is no taxonomy to read;
// these are the labels the posts would have carried.
const CATEGORY_OVERRIDES = {
  'why-hair-transplants-fail': 'Hair Transplant Safety',
  'medical-treatments-for-hair-loss': 'Hair Loss Treatment',
  'unethical-practices-in-hair-transplantation': 'Patient Education',
  'fue-hair-transplant-bangalore': 'FUE Hair Transplant',
  'gfc-vs-exosome-vs-qr678-hair-treatment': 'Hair Loss Treatment',
}

// female-hair-loss's Blog Summary is the wrong post's text -- copy-pasted from
// hair-transplant-india-international-patients. Its schema description is right.
const SUMMARY_OVERRIDES = {
  'female-hair-loss':
    'Female hair loss is common, medically understandable, and often controllable once the root cause is diagnosed. Widening part lines, PCOS, thyroid imbalance, stress and nutritional deficiencies all present differently. At Neo Follicle Hair Transplant Clinic in Bangalore, Dr Sandeep Mahapatra diagnoses before treating.',
}

// Three anchors link to a raw image file in /wp-content/uploads/ instead of the
// post they meant to point at -- the author pasted the image URL. Each one's
// `title` attribute names the intended target unambiguously, so they are
// repointed by upload filename. This repairs three internal links rather than
// shipping links to a bare PNG.
const LINK_REPOINTS = {
  'PRP-Vs-GFC-Treatment-Which-is-the-one-for-you.png': '/prp-vs-gfc-for-hair-loss/',
  'How-many-grafts-do-I-need-for-hair-transplant.png': '/how-many-grafts-do-i-need-for-hair-transplant/',
}

// The 12 gallery images in female-hair-loss were uploaded with filename alt text
// ("Female (2)" ... "Female (12)"). Audit section 5 flags this; descriptive alt
// text is a cheap win, so the file's own name maps to real copy here.
const ALT_OVERRIDES = {
  'female-2-1.png': 'Female hair loss patient before and after hair restoration treatment',
  'female-3-1.png': 'Widening part line before and after female hair loss treatment',
  'female-4-1.png': 'Female pattern hair loss density improvement after treatment',
  'female-5-1.png': 'Female patient crown density before and after treatment',
  'female-6-1.png': 'Female hairline restoration before and after result',
  'female-7-1.png': 'Diffuse female hair thinning before and after treatment',
  'female-8-1.png': 'Female mid-scalp density before and after treatment',
  'female-9-1.png': 'Female hair loss treatment result at the parting line',
  'female-10-1.png': 'Female patient hair density improvement after PRP and GFC therapy',
  'female-11.png': 'Female hair transplant before and after result',
  'female-12-1.png': 'Female temple and hairline restoration before and after',
  'female-12.png': 'Female hair restoration outcome before and after treatment',
}

/* ---- inputs ----------------------------------------------------------------- */

const posts = JSON.parse(fs.readFileSync(path.join(backup, 'site-level/wp-rest/posts.json'), 'utf8'))
const media = JSON.parse(fs.readFileSync(path.join(backup, 'media/manifest.json'), 'utf8'))
const mediaById = new Map(media.map((m) => [m.id, m]))

// Route paths come from the generated SEO records, so a post can never link to a
// path that is not a real route. Parsed the same way gen-pages.mjs does it.
const seoTs = fs.readFileSync(path.join(root, 'src/seo/pages.ts'), 'utf8')
const seoMatch = seoTs.match(/export const pages: PageSeo\[\] = (\[[\s\S]*?\n\])\n\nexport const pageBySlug/)
if (!seoMatch) throw new Error('could not parse src/seo/pages.ts -- did gen-seo.mjs change shape?')
const seoPages = JSON.parse(seoMatch[1])
const seoBySlug = new Map(seoPages.map((p) => [p.slug, p]))
const routePaths = new Set(seoPages.map((p) => p.path))

/* ---- helpers ---------------------------------------------------------------- */

/**
 * WordPress `sanitize_title`, as far as these headings exercise it. Apostrophes
 * are dropped rather than turned into a dash ("Bangalore's" -> "bangalores");
 * every other run of non-alphanumerics collapses to one dash. Verified against
 * all 23 anchors in the captured female-hair-loss table of contents.
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['‘’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function decode(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
}

/** Internal links lose the origin; everything else passes through unchanged. */
function rewriteHref(href, slug) {
  if (!href.startsWith(ORIGIN)) return href
  const rel = toRelative(href) || '/'
  const [pathname, hash] = rel.split('#')
  const repoint = LINK_REPOINTS[path.basename(pathname)]
  if (repoint) return repoint
  if (!routePaths.has(pathname)) {
    throw new Error(`${slug}: internal link ${href} has no matching route (${pathname})`)
  }
  return hash ? `${pathname}#${hash}` : pathname
}

const INLINE_TAGS = new Set(['strong', 'a', 'br', 'span'])

/** Inline children of a block element -> an Inline[]. */
function inlines(node, slug) {
  const out = []
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const v = decode(child.rawText)
      if (v) out.push({ t: 'text', v })
      continue
    }
    if (child.nodeType !== 1) continue

    const tag = child.rawTagName.toLowerCase()
    if (!INLINE_TAGS.has(tag)) throw new Error(`${slug}: unexpected inline <${tag}>`)

    switch (tag) {
      case 'br':
        out.push({ t: 'br' })
        break
      case 'strong':
        out.push({ t: 'strong', c: inlines(child, slug) })
        break
      case 'a': {
        const link = { t: 'a', href: rewriteHref(child.getAttribute('href') ?? '', slug) }
        const title = child.getAttribute('title')
        if (title) link.title = decode(title)
        link.c = inlines(child, slug)
        out.push(link)
        break
      }
      case 'span':
        // Six empty `bppb-heading-anchor-N` markers left by the old table-of-
        // contents plugin. Unwrap: this site generates its own heading ids.
        out.push(...inlines(child, slug))
        break
    }
  }
  return merge(out)
}

/** Collapse adjacent text runs so the output is stable and minimal. */
function merge(nodes) {
  const out = []
  for (const n of nodes) {
    const prev = out[out.length - 1]
    if (n.t === 'text' && prev?.t === 'text') prev.v += n.v
    else out.push(n)
  }
  return out
}

/**
 * Inline content of a block, with only the block's outer edges trimmed.
 *
 * Trimming nested runs would be wrong: the old copy routinely puts the space
 * that separates a link from the next word *inside* the anchor, as in
 * `<strong><a>Hair transplant </a></strong>is one of...`.
 */
function blockInlines(node, slug) {
  const out = inlines(node, slug)
  if (out[0]?.t === 'text') out[0].v = out[0].v.replace(/^\s+/, '')
  const last = out[out.length - 1]
  if (last?.t === 'text') {
    last.v = last.v.replace(/\s+$/, '')
    if (!last.v) out.pop()
  }
  return out
}

function image(img, slug) {
  const src = img.getAttribute('src')
  resolveUpload(src) // throws if gen-blog-images.mjs will not have written it
  const name = path.basename(toRelative(src))
  const asked = requestedSize(src)
  return {
    src: bodyImagePath(src),
    alt: ALT_OVERRIDES[name] ?? decode(img.getAttribute('alt') ?? ''),
    width: asked?.width ?? Number(img.getAttribute('width')),
    height: asked?.height ?? Number(img.getAttribute('height')),
  }
}

function cells(row, slug) {
  return row.childNodes
    .filter((c) => c.nodeType === 1)
    .map((c) => blockInlines(c, slug))
}

/* ---- the block parser ------------------------------------------------------- */

function parseBody(html, slug) {
  const blocks = []
  let h2Count = 0
  const h3Ids = new Map()

  for (const node of parse(html).childNodes) {
    if (node.nodeType === 3) {
      if (node.rawText.trim()) throw new Error(`${slug}: stray top-level text "${node.rawText.trim()}"`)
      continue
    }
    if (node.nodeType !== 1) continue

    const tag = node.rawTagName.toLowerCase()
    const classes = node.classNames ?? ''

    switch (tag) {
      case 'p': {
        const block = { t: 'p', c: blockInlines(node, slug) }
        if (classes.includes('has-small-font-size')) block.small = true
        if (block.c.length) blocks.push(block)
        break
      }

      case 'h2':
      case 'h3':
      case 'h4': {
        const level = Number(tag[1])
        const c = blockInlines(node, slug)
        const text = node.text.trim()
        let id
        if (level === 2) {
          // Preserve the old anchors: slug plus the heading's h2 ordinal, which
          // is what the captured table of contents linked to.
          id = `${slugify(text)}-${++h2Count}`
        } else {
          const base = slugify(text)
          const n = (h3Ids.get(base) ?? 0) + 1
          h3Ids.set(base, n)
          id = n === 1 ? base : `${base}-${n}`
        }
        blocks.push({ t: 'h', level, id, c })
        break
      }

      case 'ul':
      case 'ol': {
        const block = {
          t: 'list',
          ordered: tag === 'ol',
          items: node
            .querySelectorAll(':scope > li')
            .map((li) => blockInlines(li, slug))
            .filter((c) => c.length),
        }
        if (classes.includes('has-small-font-size')) block.small = true
        blocks.push(block)
        break
      }

      case 'hr':
        blocks.push({ t: 'hr' })
        break

      case 'div':
      case 'figure': {
        if (classes.includes('wp-block-gallery')) {
          blocks.push({
            t: 'gallery',
            images: node.querySelectorAll('img').map((img) => image(img, slug)),
          })
        } else if (classes.includes('wp-block-image')) {
          const img = node.querySelector('img')
          if (!img) throw new Error(`${slug}: wp-block-image with no <img>`)
          const block = { t: 'img', image: image(img, slug) }
          // `is-style-rounded` with a square thumbnail is the author portrait.
          if (classes.includes('is-style-rounded')) block.avatar = true
          blocks.push(block)
        } else if (classes.includes('wp-block-table')) {
          const table = node.querySelector('table')
          const rows = table.querySelectorAll('tr')
          // Some tables use <thead>, others put <th> in the first tbody row.
          const headRow = rows.find((r) => r.querySelector('th'))
          blocks.push({
            t: 'table',
            head: headRow ? cells(headRow, slug) : [],
            rows: rows.filter((r) => r !== headRow).map((r) => cells(r, slug)),
          })
        } else if (classes.includes('wp-block-embed')) {
          const iframe = node.querySelector('iframe')
          const src = iframe?.getAttribute('src') ?? ''
          const id = src.match(/youtube\.com\/embed\/([\w-]+)/)?.[1]
          if (!id) throw new Error(`${slug}: embed is not a YouTube video (${src})`)
          blocks.push({
            t: 'embed',
            provider: 'youtube',
            videoId: id,
            title: decode(iframe.getAttribute('title') ?? ''),
          })
        } else {
          throw new Error(`${slug}: unhandled <${tag} class="${classes}">`)
        }
        break
      }

      default:
        throw new Error(`${slug}: unhandled top-level <${tag} class="${classes}">`)
    }
  }

  return blocks
}

/* ---- per-post assembly ------------------------------------------------------ */

function articleNode(slug) {
  const graph = JSON.parse(fs.readFileSync(path.join(backup, `pages/${slug}/schema.jsonld`), 'utf8'))
  const nodes = graph.flatMap((block) => block['@graph'] ?? [block])
  const typeOf = (n) => [].concat(n['@type'] ?? [])
  return (
    nodes.find((n) => typeOf(n).includes('BlogPosting')) ??
    nodes.find((n) => typeOf(n).includes('Article')) ??
    {}
  )
}

function plainText(blocks) {
  const fromInlines = (c) => c.map((n) => (n.t === 'text' ? n.v : n.c ? fromInlines(n.c) : '')).join('')
  return blocks
    .map((b) => {
      if (b.t === 'p' || b.t === 'h') return fromInlines(b.c)
      if (b.t === 'list') return b.items.map(fromInlines).join(' ')
      if (b.t === 'table') return [...b.head, ...b.rows.flat()].map(fromInlines).join(' ')
      return ''
    })
    .join(' ')
}

const records = posts.map((wp) => {
  const slug = wp.slug
  const seo = seoBySlug.get(slug)
  if (!seo) throw new Error(`${slug}: no PageSeo record -- is it missing from 01-SEO-MASTER.csv?`)
  if (seo.type !== 'post') throw new Error(`${slug}: PageSeo says type "${seo.type}", expected "post"`)

  const article = articleNode(slug)
  const featured = mediaById.get(wp.featured_media)
  if (!featured) throw new Error(`${slug}: featured_media ${wp.featured_media} not in media manifest`)

  const body = parseBody(wp.content.rendered, slug)
  const words = plainText(body).split(/\s+/).filter(Boolean).length

  const sections = [].concat(article.articleSection ?? [])
  const category = CATEGORY_OVERRIDES[slug] ?? sections.find((s) => s !== 'Uncategorized') ?? 'Hair Transplant'

  const alt = decode(featured.alt_text || '')
  const dims = { width: featured.width, height: featured.height }

  return {
    slug,
    path: seo.path,
    title: decode(wp.title.rendered),
    excerpt: decode(wp.excerpt.rendered.replace(/<[^>]+>/g, '')).trim(),
    summary: SUMMARY_OVERRIDES[slug] ?? wp.meta_box?.blog_summary?.trim() ?? '',
    category,
    datePublished: article.datePublished ?? wp.date,
    dateModified: article.dateModified ?? wp.modified,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    card: { src: cardImagePath(slug), alt, width: 1200, height: 628 },
    hero: { src: heroImagePath(slug), alt, width: Math.min(dims.width, 1600), height: Math.round((Math.min(dims.width, 1600) / dims.width) * dims.height) },
    toc: body.filter((b) => b.t === 'h' && b.level === 2).map((b) => ({ id: b.id, text: plainText([b]) })),
    body,
    sections,
    keywords: [].concat(article.keywords ?? []),
  }
})

records.sort((a, b) => b.datePublished.localeCompare(a.datePublished))

/* ---- related posts ---------------------------------------------------------- */
// The old site had no taxonomy to read -- every post sat in "Uncategorized" with
// no tags. articleSection and keywords from the JSON-LD are the only topical
// signal, so relatedness is the overlap between them, newest first on a tie.
// This block is an addition to the Folixa design, justified by audit section 7:
// 12 of 19 posts had 2 or fewer inbound internal links.
for (const post of records) {
  const mine = new Set([...post.sections, ...post.keywords].map((s) => s.toLowerCase()))
  post.related = records
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({
      slug: other.slug,
      score: [...other.sections, ...other.keywords].filter((s) => mine.has(s.toLowerCase())).length,
      date: other.datePublished,
    }))
    .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date))
    .slice(0, 3)
    .map((r) => r.slug)
}

/* ---- emit ------------------------------------------------------------------- */

const HEADER = `// GENERATED by scripts/gen-posts.mjs from neofollicle-seo-backup/. Do not edit by hand.
// Regenerate with: npm run gen:posts
`

const pascal = (s) =>
  s
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('')

fs.rmSync(postsDir, { recursive: true, force: true })
fs.mkdirSync(postsDir, { recursive: true })

for (const post of records) {
  const { sections, keywords, ...rest } = post
  fs.writeFileSync(
    path.join(postsDir, `${post.slug}.ts`),
    `${HEADER}//
// Source: neofollicle-seo-backup/site-level/wp-rest/posts.json (content.rendered)
//         + pages/${post.slug}/schema.jsonld + media/manifest.json
import type { Post } from '../types'

const post: Post = ${JSON.stringify(rest, null, 2)}

export default post
`,
  )
}

const summaryKeys = ['slug', 'path', 'title', 'excerpt', 'summary', 'category', 'datePublished', 'dateModified', 'readingMinutes', 'card', 'hero']
const summaries = records.map((post) => Object.fromEntries(summaryKeys.map((k) => [k, post[k]])))

fs.writeFileSync(
  path.join(outDir, 'index.ts'),
  `${HEADER}//
// The listing page's data source: every post field except the body, so importing
// it costs a few KB rather than the whole corpus. Newest first, matching the
// order the old /our-blogs/ page listed them in.
import type { PostSummary } from './types'

export const postSummaries: PostSummary[] = ${JSON.stringify(summaries, null, 2)}

export const postSummaryBySlug: Record<string, PostSummary> = Object.fromEntries(
  postSummaries.map((p) => [p.slug, p]),
)
`,
)

/* ---- report ----------------------------------------------------------------- */
const blockCount = records.reduce((n, p) => n + p.body.length, 0)
const bytes = fs.readdirSync(postsDir).reduce((n, f) => n + fs.statSync(path.join(postsDir, f)).size, 0)
console.log(`gen-posts: ${records.length} posts, ${blockCount} blocks -> src/content/posts/ (${(bytes / 1024).toFixed(0)} KB)`)
console.log(`           ${records.length} summaries -> src/content/index.ts`)
for (const p of records) {
  console.log(
    `           ${p.slug.padEnd(54)} ${String(p.body.length).padStart(3)} blocks  ${String(p.readingMinutes).padStart(2)} min  ${p.category}`,
  )
}
