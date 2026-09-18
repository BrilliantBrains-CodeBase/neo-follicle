// Copy fidelity gate for the blog.
//
// The 19 post bodies are the old site's published copy, which the SEO audit
// marks P0-PRESERVE. gen-posts.mjs reshapes that HTML into a block tree, so this
// proves the reshaping lost nothing: the text content of each parsed tree must
// equal the text content of the source `content.rendered`, word for word.
//
// It also checks the structural counts (paragraphs, headings, lists, tables,
// images, embeds, separators) against the source, so a dropped table or a
// swallowed image fails here rather than in review.
//
// Run with `npm run verify:posts`. Exits non-zero on any divergence.
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'node-html-parser'
import { backup, root } from './blog-assets.mjs'

const posts = JSON.parse(fs.readFileSync(path.join(backup, 'site-level/wp-rest/posts.json'), 'utf8'))
const postsDir = path.join(root, 'src/content/posts')
const schemaDir = path.join(root, 'src/seo/schema')

/**
 * The FAQ questions a post's captured JSON-LD declares, or null if it has no
 * FAQPage node (6 of the 19 never got one -- see the audit).
 *
 * This is an independent check on src/content/faq.ts. That helper segments the
 * FAQ out of a flat block list by scanning from the FAQ h2 to the next h2, and
 * getting it wrong is silent: 13 posts have h3s outside their FAQ section, so a
 * looser rule would quietly turn mid-article headings into accordion items.
 * The schema files are generated from the backup and are never touched by
 * rendering work, so they make a good oracle.
 *
 * `mainEntity[].name` is the body h3 with any leading "N. " removed -- the old
 * site's own generator treated those prefixes as presentational.
 */
function declaredFaqQuestions(slug) {
  const graph = JSON.parse(fs.readFileSync(path.join(schemaDir, `${slug}.json`), 'utf8')).flatMap(
    (block) => block['@graph'] ?? [block],
  )
  const faq = graph.find((n) => [].concat(n['@type'] ?? []).includes('FAQPage'))
  return faq ? faq.mainEntity.map((q) => stripNumber(q.name)) : null
}

const stripNumber = (s) => s.replace(/^\d+\.\s*/, '').replace(/\s+/g, ' ').trim()

const norm = (s) => s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim()

/**
 * node-html-parser's `.text` concatenates sibling elements with nothing between
 * them, so `<td>A</td><td>B</td>` reads as "AB". Insert the separators the
 * rendered page would show before taking the text, otherwise every post with a
 * table or a list looks like a mismatch.
 */
const withSeparators = (html) =>
  html.replace(/<br\s*\/?>/g, ' ').replace(/<\/(td|th|li|p|h[1-6])>/g, ' </$1>')

const sourceText = (html) => parse(withSeparators(html)).text

const inlineText = (c) =>
  c.map((n) => (n.t === 'text' ? n.v : n.t === 'br' ? ' ' : n.c ? inlineText(n.c) : '')).join('')

function treeText(blocks) {
  return blocks
    .map((b) => {
      if (b.t === 'p' || b.t === 'h') return inlineText(b.c)
      if (b.t === 'list') return b.items.map(inlineText).join(' ')
      if (b.t === 'table') return [...b.head, ...b.rows.flat()].map(inlineText).join(' ')
      return ''
    })
    .join(' ')
}

/** Read the record straight out of the generated module, without a TS loader. */
function readPost(slug) {
  const src = fs.readFileSync(path.join(postsDir, `${slug}.ts`), 'utf8')
  const m = src.match(/const post: Post = ([\s\S]*?)\n\nexport default post/)
  if (!m) throw new Error(`${slug}: could not read the generated record`)
  return JSON.parse(m[1])
}

// Once the site has been built, check the rendered page too -- not just the
// data. This is what proves the whole chain: captured HTML -> block tree ->
// React -> prerendered HTML, with the copy intact at the far end.
const dist = path.join(root, 'dist')
const checkDist = fs.existsSync(dist)

let failures = 0
const fail = (slug, msg) => {
  failures++
  console.log(`  FAIL  ${slug}\n        ${msg}`)
}

for (const wp of posts) {
  const slug = wp.slug
  const post = readPost(slug)
  const doc = parse(wp.content.rendered)

  /* ---- text, word for word ---- */
  const source = norm(sourceText(wp.content.rendered))
  const parsed = norm(treeText(post.body))
  if (source !== parsed) {
    const a = source.split(' ')
    const b = parsed.split(' ')
    const i = a.findIndex((w, n) => w !== b[n])
    fail(
      slug,
      `text diverges at word ${i} of ${a.length}\n` +
        `        source: ...${a.slice(Math.max(0, i - 8), i + 8).join(' ')}...\n` +
        `        parsed: ...${b.slice(Math.max(0, i - 8), i + 8).join(' ')}...`,
    )
    continue
  }

  /* ---- structural counts ---- */
  const counted = (t) => post.body.filter((b) => b.t === t).length
  const expected = {
    p: doc.querySelectorAll(':scope > p').length,
    h: doc.querySelectorAll(':scope > h2, :scope > h3, :scope > h4').length,
    list: doc.querySelectorAll(':scope > ul, :scope > ol').length,
    hr: doc.querySelectorAll(':scope > hr').length,
    table: doc.querySelectorAll('table').length,
    gallery: doc.querySelectorAll('.wp-block-gallery').length,
    embed: doc.querySelectorAll('iframe').length,
  }
  const galleryImages = post.body.filter((b) => b.t === 'gallery').reduce((n, b) => n + b.images.length, 0)
  const actual = {
    // Empty paragraphs carry no content and are dropped, so this is a floor.
    p: counted('p'),
    h: counted('h'),
    list: counted('list'),
    hr: counted('hr'),
    table: counted('table'),
    gallery: counted('gallery'),
    embed: counted('embed'),
  }
  const imgTotal = counted('img') + galleryImages
  const expectedImgs = doc.querySelectorAll('img').length

  const problems = []
  for (const [k, want] of Object.entries(expected)) {
    if (k === 'p' ? actual.p > want : actual[k] !== want) {
      problems.push(`${k}: source ${want}, parsed ${actual[k]}`)
    }
  }
  if (imgTotal !== expectedImgs) problems.push(`img: source ${expectedImgs}, parsed ${imgTotal}`)

  /* ---- generated assets exist ---- */
  for (const image of [post.card, post.hero]) {
    if (!fs.existsSync(path.join(root, 'public', image.src.replace(/^\//, '')))) {
      problems.push(`missing asset ${image.src} -- run npm run gen:blogimg`)
    }
  }
  for (const block of post.body) {
    const images = block.t === 'img' ? [block.image] : block.t === 'gallery' ? block.images : []
    for (const image of images) {
      if (!fs.existsSync(path.join(root, 'public', image.src.replace(/^\//, '')))) {
        problems.push(`missing asset ${image.src} -- run npm run gen:blogimg`)
      }
    }
  }

  /* ---- anchors are unique, and every TOC entry resolves ---- */
  const ids = post.body.filter((b) => b.t === 'h').map((b) => b.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length) problems.push(`duplicate heading ids: ${[...new Set(dupes)].join(', ')}`)
  for (const entry of post.toc) {
    if (!ids.includes(entry.id)) problems.push(`toc entry ${entry.id} has no heading`)
  }

  /* ---- the prerendered page carries the article ---- */
  if (checkDist) {
    const file = path.join(dist, slug, 'index.html')
    if (!fs.existsSync(file)) {
      problems.push(`no prerendered page at dist/${slug}/index.html`)
    } else {
      const page = parse(withSeparators(fs.readFileSync(file, 'utf8')))
      const prose = page.querySelector('.post-prose')
      if (!prose) {
        problems.push('prerendered page has no .post-prose -- did it render a Suspense fallback?')
      } else if (norm(prose.text) !== parsed) {
        problems.push('prerendered prose does not match the parsed body')
      }
      if (!page.querySelector('h1')) problems.push('prerendered page has no h1')

      /* ---- the FAQ section rendered as the shared accordion ---- */
      if (prose) {
        const summaries = prose.querySelectorAll('summary')
        if (summaries.length === 0) {
          problems.push('no FAQ accordion rendered -- every post has a FAQ section')
        }

        const names = [...new Set(prose.querySelectorAll('details').map((d) => d.getAttribute('name')))]
        if (names.length > 1 || (names[0] && names[0] !== 'post-faq')) {
          problems.push(`FAQ details name(s): ${names.join(', ')}, expected only "post-faq"`)
        }

        const declared = declaredFaqQuestions(slug)
        if (declared) {
          const rendered = summaries.map((s) => stripNumber(s.querySelector('h3')?.text ?? ''))
          if (declared.length !== rendered.length) {
            problems.push(`JSON-LD declares ${declared.length} FAQ questions, accordion rendered ${rendered.length}`)
          } else {
            const i = declared.findIndex((q, n) => q !== rendered[n])
            if (i !== -1) {
              problems.push(`FAQ question ${i + 1} is "${rendered[i]}", JSON-LD says "${declared[i]}"`)
            }
          }
        }
      }
    }
  }

  if (problems.length) fail(slug, problems.join('\n        '))
  else console.log(`  ok    ${slug.padEnd(54)} ${source.split(' ').length} words, ${post.body.length} blocks`)
}

console.log()
if (failures) {
  console.log(`verify-posts: ${failures} of ${posts.length} posts FAILED`)
  process.exit(1)
}
console.log(`verify-posts: all ${posts.length} posts match the captured copy word for word`)
console.log(
  checkDist
    ? '              and the prerendered pages carry that copy through to the HTML,\n              with each FAQ accordion matching its captured JSON-LD question set'
    : '              (no dist/ yet -- run npm run build to check the rendered pages too)',
)
