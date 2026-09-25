#!/usr/bin/env node
/**
 * Writes one static HTML file per route, plus robots.txt, the sitemaps and
 * llms.txt / llms-full.txt.
 *
 * Runs after `vite build` (client shell -> dist/index.html) and
 * `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 *
 * Output shape is deliberate: dist/<path>/index.html, so /some-slug/ resolves
 * WITH its trailing slash on Netlify, Vercel, Cloudflare Pages and Apache alike.
 * The trailing-slash canonical is P0-PRESERVE -- see reports/seo-audit.md s6.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parse } from 'node-html-parser'
import { ANALYTICS, ASSETS, BRAND, CONTACT, DOCTOR, SEO, STATS } from '../src/config/site.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const schemaDir = path.join(root, 'src', 'seo', 'schema')

// entry-server re-exports `pages`, so the prerender and the app read the same
// records -- there is no second copy of the SEO data to drift.
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const { render, pages, headerNav } = ssr

const ORIGIN = SEO.origin

/**
 * The client chunks a split route needs, from the Vite manifest.
 *
 * The blog posts are code-split (src/routeView.tsx), so their page chunk is
 * fetched rather than bundled into the entry. Without a preload the browser
 * cannot discover it until the entry chunk has parsed and run, which serialises
 * two round trips on the exact pages that carry the most content.
 *
 * Returns [] for the 40 eager routes, which have no chunk of their own.
 */
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite/manifest.json'), 'utf8'))

function splitChunksFor(slug) {
  const entry = manifest[`src/pages/${slug}.tsx`]
  if (!entry) return []
  // The page chunk plus whatever it pulls in that is not already in the entry.
  return [entry.file, ...(entry.imports ?? []).map((key) => manifest[key]?.file)]
    .filter(Boolean)
    .filter((file) => file !== manifest['index.html']?.file)
    .map((file) => `/${file}`)
}

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const meta = (name, content) =>
  content ? `    <meta name="${name}" content="${esc(content)}" />\n` : ''
const prop = (property, content) =>
  content ? `    <meta property="${property}" content="${esc(content)}" />\n` : ''

/** Pages that are "about the place" -- they carry the geo.* meta tags. */
const GEO_PAGES = new Set(['/', '/contact-us/', DOCTOR.path])

/**
 * Google Tag Manager, as the live site loaded it on every page. Only in the
 * prerendered output -- `npm run dev` stays tag-free.
 */
const gtmHead = `    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ANALYTICS.gtmId}');</script>\n`
const gtmBody = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${ANALYTICS.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`

/** Icons + manifest. Files come from scripts/gen-icons.mjs. */
const iconLinks =
  `    <link rel="icon" href="/favicon.ico" sizes="32x32" />\n` +
  `    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />\n` +
  `    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />\n` +
  `    <link rel="manifest" href="/site.webmanifest" />\n` +
  `    <meta name="theme-color" content="${ASSETS.themeColor}" />\n`

/**
 * Builds the <head> for one page. Tag order mirrors the captured raw.html:
 * title, robots, description, og:*, twitter:*, canonical, icons, JSON-LD.
 */
function buildHead(page) {
  let h = ''
  h += `    <title>${esc(page.title)}</title>\n`
  h += meta('robots', page.robots)
  h += meta('description', page.description)

  h += prop('og:title', page.og.title)
  h += prop('og:type', page.og.type)
  h += prop('og:description', page.og.description)
  h += prop('og:url', page.og.url)
  h += prop('og:locale', page.og.locale)
  h += prop('og:site_name', page.og.siteName)
  h += prop('og:image', page.og.image)
  h += prop('og:image:type', 'image/jpeg')
  h += prop('og:image:width', page.og.imageWidth)
  h += prop('og:image:height', page.og.imageHeight)
  h += prop('og:image:alt', page.og.imageAlt)

  h += meta('twitter:card', page.twitter.card)
  h += meta('twitter:title', page.twitter.title)
  h += meta('twitter:description', page.twitter.description)
  h += meta('twitter:image', page.twitter.image)
  h += meta('twitter:image:alt', page.og.imageAlt)

  if (GEO_PAGES.has(page.path)) {
    const { latitude, longitude } = CONTACT.geo
    h += meta('geo.region', CONTACT.isoRegion)
    h += meta('geo.placename', `${CONTACT.address.addressLocality}, ${CONTACT.address.addressRegion}`)
    h += meta('geo.position', `${latitude};${longitude}`)
    h += meta('ICBM', `${latitude}, ${longitude}`)
  }

  // The 6 noindex landing pages carry no canonical tag. Absence is the
  // captured state -- do not synthesise one.
  if (page.canonical) {
    h += `    <link rel="canonical" href="${esc(page.canonical)}" />\n`
  }

  h += iconLinks

  // Split routes (the blog posts) fetch their page chunk before hydrating --
  // see src/routeView.tsx. Preloading it here puts that request in flight with
  // the entry chunk instead of after it.
  for (const href of splitChunksFor(page.slug)) {
    h += `    <link rel="modulepreload" href="${esc(href)}" crossorigin />\n`
  }

  // JSON-LD, verbatim from the backup. This is the site's most valuable and
  // most fragile SEO asset -- 14 FAQPages / 82 questions among the 59 graphs.
  const graph = JSON.parse(fs.readFileSync(path.join(schemaDir, `${page.slug}.json`), 'utf8'))
  for (const block of graph) {
    h += `    <script type="application/ld+json">${JSON.stringify(block)}</script>\n`
  }

  h += gtmHead
  return h
}

function writeHtml(routePath, html) {
  const rel = routePath === '/' ? 'index.html' : path.join(routePath.replace(/^\/|\/$/g, ''), 'index.html')
  const file = path.join(dist, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  return rel
}

const raw = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!raw.includes('<!--ssr-outlet-->') || !raw.includes('<!--seo-head-->')) {
  throw new Error('dist/index.html is missing <!--ssr-outlet--> or <!--seo-head--> markers')
}
// Drop the shell's placeholder <title>; every page supplies its own. The GTM
// noscript must be the first thing in <body>.
const shell = raw
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/<body([^>]*)>/, `<body$1>\n    ${gtmBody}`)

/** Splice one page's head and body into the built shell. */
const compose = (head, body) =>
  shell.replace('<!--seo-head-->', head.trimEnd()).replace('<!--ssr-outlet-->', body)

/** The rendered <main> of every page, kept for the sitemaps and llms-full.txt. */
const mains = new Map()

let count = 0
for (const page of pages) {
  const body = await render(page.path)
  writeHtml(page.path, compose(buildHead(page), body))
  mains.set(page.slug, parse(body).querySelector('main'))
  count++
}

// 404 fallback, rendered through the catch-all route.
fs.writeFileSync(
  path.join(dist, '404.html'),
  compose(
    `    <title>Page Not Found</title>\n    <meta name="robots" content="noindex, follow" />\n${iconLinks}${gtmHead}`,
    await render('/__not-found__'),
  ),
)

// --- robots.txt -----------------------------------------------------------
// The Sitemap directive carries over (P0). The /wp-admin/ rules are dropped --
// they are meaningless off WordPress. Search disallows are kept.
//
// The AI crawlers are named explicitly, with the same rules: a crawler obeys
// only the most specific group that matches it, so each group repeats them.
// Naming them is a statement of intent -- the clinic WANTS to be cited by
// answer engines -- and makes it a one-line change to opt any of them out.
const RULES = ['Disallow: /?s=', 'Disallow: /page/*/?s=', 'Disallow: /search/']
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended']
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  [
    ['User-agent: *', ...RULES].join('\n'),
    [...AI_BOTS.map((b) => `User-agent: ${b}`), 'Allow: /', ...RULES].join('\n'),
    `Sitemap: ${ORIGIN}/sitemap.xml`,
  ].join('\n\n') + '\n',
)

// --- sitemaps -------------------------------------------------------------
// sitemap.xml stays the index Search Console already knows. The category
// sitemap is gone: its one URL (/category/uncategorized/) is now noindex.
// Each <url> lists the content images in that page's <main> (Google's image
// sitemap extension), so the before/after and treatment photos are discoverable.
const xmlEsc = (s) => esc(s).replaceAll("'", '&apos;')

function imagesOf(slug) {
  const main = mains.get(slug)
  if (!main) return []
  const urls = main
    .querySelectorAll('img')
    .map((img) => img.getAttribute('src'))
    .filter((src) => src && !src.startsWith('data:') && !src.endsWith('.svg'))
    .map((src) => new URL(src, `${ORIGIN}/`).href)
    .filter((u) => u.startsWith(ORIGIN))
  return [...new Set(urls)].slice(0, 1000)
}

const urlset = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map((p) => {
    const images = imagesOf(p.slug)
      .map((u) => `\n\t\t<image:image>\n\t\t\t<image:loc>${xmlEsc(u)}</image:loc>\n\t\t</image:image>`)
      .join('')
    return `\t<url>\n\t\t<loc>${ORIGIN}${p.path}</loc>${p.lastmod ? `\n\t\t<lastmod>${p.lastmod}</lastmod>` : ''}${images}\n\t</url>`
  })
  .join('\n')}
</urlset>
`

const inSitemap = pages.filter((p) => p.inSitemap)
const byType = (t) => inSitemap.filter((p) => p.type === t)
if (byType('category').length) throw new Error('category pages in the sitemap -- add a category sitemap back')

fs.writeFileSync(path.join(dist, 'sitemap-post-type-page.xml'), urlset(byType('page')))
fs.writeFileSync(path.join(dist, 'sitemap-post-type-post.xml'), urlset(byType('post')))
const newest = (list) => list.map((p) => p.lastmod).filter(Boolean).sort().at(-1)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<sitemap>\n\t\t<loc>${ORIGIN}/sitemap-post-type-post.xml</loc>\n\t\t<lastmod>${newest(byType('post'))}</lastmod>\n\t</sitemap>
\t<sitemap>\n\t\t<loc>${ORIGIN}/sitemap-post-type-page.xml</loc>\n\t\t<lastmod>${newest(byType('page'))}</lastmod>\n\t</sitemap>
</sitemapindex>
`,
)

// --- llms.txt ---------------------------------------------------------------
// https://llmstxt.org -- a Markdown map of the site for LLMs and answer
// engines: who the clinic is, the facts people ask about (location, hours,
// doctor, contact), then every indexable page grouped the way the header menu
// groups it, each with its meta description.
const hours = `${CONTACT.openingHoursDisplay}; ${CONTACT.closedDayDisplay}`
const statLine = STATS.slice(0, 4).map((s) => `${s.value} ${s.label.toLowerCase()}`).join(', ')
const llmsHeader = `# ${BRAND.legalName}

> ${BRAND.description}

- Location: ${CONTACT.addressLines.join(' ').replace(/,\s*,/g, ',')}, India
- Map: ${CONTACT.gbpUrl ?? CONTACT.mapUrl}
- Phone / WhatsApp: ${CONTACT.phoneDisplay.replace(/\s*-\s*/, ' ')} (${CONTACT.whatsapp})
- Email: ${CONTACT.email}
- Hours: ${hours}
- Languages: ${CONTACT.languages.join(', ')}
- Lead surgeon: ${DOCTOR.name}, ${DOCTOR.qualificationsLine} -- ${DOCTOR.roleLine}; ${DOCTOR.credentials.find((c) => /DHI/.test(c.name))?.name ?? ''} (${DOCTOR.credentials.find((c) => /DHI/.test(c.name))?.issuer ?? ''}); ${DOCTOR.yearsOfExperience}+ years' experience
- Track record: ${statLine}
- Book a consultation: ${ORIGIN}/contact-us/
`

const indexable = pages.filter((p) => p.inSitemap)
const sectionOf = new Map()
for (const item of headerNav) {
  if (item.kind !== 'dropdown') continue
  for (const col of item.columns) {
    for (const link of col.links) if (!sectionOf.has(link.to)) sectionOf.set(link.to, col.title ?? item.label)
  }
}
const CLINIC = 'Clinic, Doctor and Contact'
for (const p of ['/', DOCTOR.path, '/contact-us/', '/hair-conditions-we-treat/', '/media-coverage/']) sectionOf.set(p, CLINIC)
sectionOf.set('/nft-brochure/', CLINIC)
// The hub page for the treatments column -- linked from the footer, not the menu.
sectionOf.set('/hair-loss-treatment-in-bangalore/', 'Hair Loss Treatments')

const sections = new Map([[CLINIC, []]])
for (const page of indexable) {
  const name = page.type === 'post' ? 'Guides and Articles' : (sectionOf.get(page.path) ?? 'Other Pages')
  if (!sections.has(name)) sections.set(name, [])
  sections.get(name).push(page)
}
// Optional (per the spec: skippable when context is short) goes last.
const order = [...sections.keys()].sort((a, b) => (a === 'Other Pages') - (b === 'Other Pages'))
const line = (p) => `- [${p.h1 ?? p.title}](${ORIGIN}${p.path}): ${p.description}`
const llms =
  llmsHeader +
  order
    .map((name) => `\n## ${name === 'Other Pages' ? 'Optional' : name}\n\n${sections.get(name).map(line).join('\n')}\n`)
    .join('') +
  `\n## Full text\n\n- [llms-full.txt](${ORIGIN}/llms-full.txt): the text of every page above in one file\n`
fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

// llms-full.txt: the same header, then the readable text of each indexable
// page's <main> as light Markdown -- headings and list items kept, so an LLM
// sees the page's structure, not a run-on string.
const SKIP = new Set(['script', 'style', 'noscript', 'svg', 'iframe', 'form', 'button', 'img', 'video', 'picture'])
const BLOCK = new Set(['p', 'div', 'section', 'article', 'header', 'footer', 'aside', 'ul', 'ol', 'table', 'tr', 'figure', 'figcaption', 'blockquote', 'details', 'summary', 'dl', 'dt', 'dd', 'br'])

/** A node's children as one line of text. */
const flat = (node) => node.childNodes.map(toMarkdown).join('').replace(/\s+/g, ' ').trim()

function toMarkdown(node) {
  if (node.nodeType === 3) return node.text
  if (node.nodeType !== 1) return ''
  const tag = node.rawTagName?.toLowerCase()
  if (SKIP.has(tag) || node.getAttribute?.('aria-hidden') === 'true') return ''
  const h = /^h([1-4])$/.exec(tag)
  if (h) {
    const t = flat(node)
    return t ? `\n\n${'#'.repeat(Number(h[1]) + 1)} ${t}\n\n` : ''
  }
  if (tag === 'li') {
    // Card grids put an <h4> inside each item; in a list it is just the label.
    const t = flat(node).replace(/(^|\s)#{2,5} /g, '$1')
    return t ? `\n- ${t}` : ''
  }
  const inner = node.childNodes.map(toMarkdown).join('')
  if (BLOCK.has(tag)) return `\n${inner}\n`
  return ` ${inner} `
}

function mainText(slug) {
  const main = mains.get(slug)
  if (!main) return ''
  return toMarkdown(main)
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
fs.writeFileSync(
  path.join(dist, 'llms-full.txt'),
  llmsHeader +
    indexable
      .map((p) => `\n---\n\n# ${p.h1 ?? p.title}\n\nURL: ${ORIGIN}${p.path}\n\n${mainText(p.slug)}\n`)
      .join(''),
)

// The manifest is a build input for this script, not something to deploy.
fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true })

console.log(`prerender: ${count} pages -> dist/**/index.html`)
console.log(`           404.html, robots.txt, 3 sitemaps, llms.txt, llms-full.txt`)
console.log(`           sitemap: ${byType('page').length} page + ${byType('post').length} post = ${inSitemap.length}`)
