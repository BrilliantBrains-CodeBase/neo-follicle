// Legal page pipeline -- turns the backup's captured privacy-policy and
// terms-of-use bodies into typed `Block[]` modules under src/content/legal/.
//
// WHY A GENERATOR AND NOT HAND-TRANSCRIPTION. These two pages are 1,530 and
// 1,011 words of LEGAL text that is ported verbatim -- a dropped clause or a
// mistyped statute reference is a real problem, not a typo. Parsing the
// capture removes the chance of one. Re-run it and the output is identical;
// hand-typing it twice would not be.
//
// WHY NOT gen-posts.mjs. That script's parser is tuned to the 19 WordPress
// post bodies and is asserted against them by scripts/verify-posts.mjs. These
// pages come from Breakdance (`.bde-rich-text`), not the WordPress editor, so
// they need their own container lookup -- and widening the post parser to
// cover them would put 19 verified bodies at risk to serve 2 unverified ones.
// The `Block`/`Inline` OUTPUT type is shared, which is the part that matters:
// src/components/PostProse.tsx renders both, so the legal pages get the same
// .post-prose typography with no new CSS.
//
//   node scripts/gen-legal.mjs
//
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'node-html-parser'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const backup = path.join(root, 'neofollicle-seo-backup/pages')
const outDir = path.join(root, 'src/content/legal')

const SLUGS = ['privacy-policy', 'terms-of-use']

/** WordPress leaves its entities encoded in the capture. */
function decode(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&hellip;|&#8230;/g, '…')
    .replace(/ /g, ' ')
}

/**
 * Absolute links back to the live origin become router paths, so the rebuilt
 * site does not send a visitor off to the old WordPress install. Anything on
 * another host is left alone and rendered as an external link.
 */
const ORIGIN = 'https://neofollicletransplant.com'
function rewriteHref(href) {
  if (!href) return null
  const trimmed = href.trim()
  if (trimmed.startsWith(`${ORIGIN}/`) || trimmed === ORIGIN) {
    const p = trimmed.slice(ORIGIN.length) || '/'
    return p.endsWith('/') ? p : `${p}/`
  }
  return trimmed
}

/** Collapse adjacent text runs so the output has no needless nodes. */
function merge(nodes) {
  const out = []
  for (const n of nodes) {
    const last = out[out.length - 1]
    if (n.t === 'text' && last && last.t === 'text') last.v += n.v
    else out.push(n)
  }
  return out.filter((n) => n.t !== 'text' || n.v.trim() !== '' || n.v === ' ')
}

/** Inline runs. The same closed union the posts use -- see src/content/types.ts. */
function inlines(node) {
  const out = []
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      out.push({ t: 'text', v: decode(child.rawText) })
      continue
    }
    if (child.nodeType !== 1) continue
    const tag = child.tagName?.toLowerCase()
    if (tag === 'br') {
      out.push({ t: 'br' })
    } else if (tag === 'strong' || tag === 'b') {
      out.push({ t: 'strong', c: merge(inlines(child)) })
    } else if (tag === 'a') {
      const href = rewriteHref(child.getAttribute('href'))
      // An anchor with no usable href is not a link; keep its text.
      if (href) out.push({ t: 'a', href, c: merge(inlines(child)) })
      else out.push(...inlines(child))
    } else {
      // em/span/u and friends carry no meaning here -- unwrap to their text.
      out.push(...inlines(child))
    }
  }
  return out
}

const clean = (ins) => {
  const m = merge(ins)
  // Trim the outer whitespace the builder's markup leaves behind.
  if (m.length && m[0].t === 'text') m[0].v = m[0].v.replace(/^\s+/, '')
  if (m.length && m[m.length - 1].t === 'text') {
    m[m.length - 1].v = m[m.length - 1].v.replace(/\s+$/, '')
  }
  return m.filter((n) => !(n.t === 'text' && n.v === ''))
}

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

/** One capture's body -> Block[]. Throws on any element the union cannot hold. */
function parseBody(slug) {
  const html = fs.readFileSync(path.join(backup, slug, 'rendered.html'), 'utf8')
  const doc = parse(html)

  /*
    SCOPE BY SECTION, NOT BY WIDGET CLASS.

    Breakdance splits the body across two widget types: `.bde-rich-text` holds
    the policy itself, and `.bde-text` holds the standalone "Effective Date:
    01-01-2025" line. Reading only `.bde-rich-text` silently dropped that date
    -- on a legal document, the one line that says what the rest governs.

    But `.bde-text` is ALSO what the site-wide footer chrome uses: the
    disclaimer, the clinic blurb, the address, the copyright and the
    "Designed & Maintained By" credit, five widgets that appear on all 60
    captures and are already rendered by src/components/Footer.tsx.

    The boundary is the SECTION. The date and the policy share one
    `section.bde-section`; every footer widget sits in a different one. So:
    find the section holding the first rich-text block, and take that section's
    content widgets in document order. Nothing outside it is this page's body.
  */
  const first = doc.querySelector('.bde-rich-text')
  if (!first) throw new Error(`${slug}: no .bde-rich-text container found`)

  let section = first
  while (section.parentNode && !(section.getAttribute('class') || '').includes('bde-section')) {
    section = section.parentNode
  }
  if (!(section.getAttribute('class') || '').includes('bde-section')) {
    throw new Error(`${slug}: rich text is not inside a .bde-section`)
  }

  const containers = section.querySelectorAll('.bde-rich-text, .bde-text')
  if (!containers.length) throw new Error(`${slug}: content section holds no widgets`)

  const blocks = []
  for (const container of containers) {
    /*
      A `.bde-text` widget is a single run of text in a bare <div> -- its child
      is a <b>, not a <p> -- so it becomes one paragraph. Only `.bde-rich-text`
      carries real block structure worth walking.
    */
    if (!(container.getAttribute('class') || '').includes('bde-rich-text')) {
      const c = clean(inlines(container))
      if (c.length) blocks.push({ t: 'p', c })
      continue
    }

    for (const el of container.childNodes) {
      if (el.nodeType !== 1) continue
      const tag = el.tagName.toLowerCase()

      if (tag === 'p') {
        const c = clean(inlines(el))
        if (c.length) blocks.push({ t: 'p', c })
      } else if (/^h[1-6]$/.test(tag)) {
        const c = clean(inlines(el))
        if (!c.length) continue
        // The page <h1> is PageBanner's, not the body's. A captured body h1
        // steps down to h2 so the page keeps exactly one h1.
        const raw = Number(tag[1])
        const level = Math.min(4, Math.max(2, raw === 1 ? 2 : raw))
        blocks.push({ t: 'h', level, id: slugify(el.text.trim()), c })
      } else if (tag === 'ul' || tag === 'ol') {
        const items = el
          .querySelectorAll(':scope > li')
          .map((li) => clean(inlines(li)))
          .filter((c) => c.length)
        if (items.length) blocks.push({ t: 'list', ordered: tag === 'ol', items })
      } else if (tag === 'hr') {
        blocks.push({ t: 'hr' })
      } else if (tag === 'table') {
        const rows = el.querySelectorAll('tr')
        if (!rows.length) continue
        const head = rows[0].querySelectorAll('th,td').map((c) => clean(inlines(c)))
        const body = rows.slice(1).map((r) => r.querySelectorAll('th,td').map((c) => clean(inlines(c))))
        blocks.push({ t: 'table', head, rows: body })
      } else if (el.text.trim()) {
        // Loud, not silent: an unhandled element that carries text would
        // otherwise vanish from a legal document.
        throw new Error(`${slug}: unhandled <${tag}> carrying text: ${el.text.trim().slice(0, 80)}`)
      }
    }
  }
  return blocks
}

const pascal = (s) => s.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())

fs.mkdirSync(outDir, { recursive: true })

const written = []
for (const slug of SLUGS) {
  const blocks = parseBody(slug)
  const words = blocks
    .flatMap(function walk(b) {
      if (b.t === 'p' || b.t === 'h') return b.c
      if (b.t === 'list') return b.items.flat()
      if (b.t === 'table') return [...b.head.flat(), ...b.rows.flat(2)]
      return []
    })
    .flatMap(function text(i) {
      if (i.t === 'text') return i.v
      if (i.t === 'strong' || i.t === 'a') return i.c.map(text).flat()
      return []
    })
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

  const file = path.join(outDir, `${slug}.ts`)
  fs.writeFileSync(
    file,
    `// GENERATED by scripts/gen-legal.mjs. Do not edit by hand.
// Regenerate with: node scripts/gen-legal.mjs
//
// Source: neofollicle-seo-backup/pages/${slug}/rendered.html
// This is the live site's legal text, ported VERBATIM. Do not reword it here --
// fix the capture or the parser, then regenerate.
import type { Block } from '../types'

/** ${words} words, ${blocks.length} blocks. */
const ${pascal(slug)}: Block[] = ${JSON.stringify(blocks, null, 2)}

export default ${pascal(slug)}
`,
  )
  written.push(`${slug} (${blocks.length} blocks, ${words} words)`)
}

console.log(`gen-legal: ${written.length} modules -> src/content/legal/`)
written.forEach((w) => console.log(`           ${w}`))
