#!/usr/bin/env node
/**
 * Writes one static HTML file per route, plus robots.txt and the four sitemaps.
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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const schemaDir = path.join(root, 'src', 'seo', 'schema')

// entry-server re-exports `pages`, so the prerender and the app read the same
// records -- there is no second copy of the SEO data to drift.
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const { render, pages } = ssr

// Keep in sync with SEO.origin in src/config/site.ts. Node ESM scripts cannot
// import the .ts config without a loader, so this copy stays for now.
const ORIGIN = 'https://neofollicletransplant.com'

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

  h += meta('twitter:card', page.twitter.card)
  h += meta('twitter:title', page.twitter.title)

  // The 6 noindex landing pages carry no canonical tag. Absence is the
  // captured state -- do not synthesise one.
  if (page.canonical) {
    h += `    <link rel="canonical" href="${esc(page.canonical)}" />\n`
  }

  h += `    <link rel="icon" href="/favicon.svg" sizes="32x32" />\n`
  h += `    <link rel="icon" href="/favicon.svg" sizes="192x192" />\n`
  h += `    <link rel="apple-touch-icon" href="/favicon.svg" />\n`

  // JSON-LD, verbatim from the backup. This is the site's most valuable and
  // most fragile SEO asset -- 14 FAQPages / 82 questions among the 59 graphs.
  const graph = JSON.parse(fs.readFileSync(path.join(schemaDir, `${page.slug}.json`), 'utf8'))
  for (const block of graph) {
    h += `    <script type="application/ld+json">${JSON.stringify(block)}</script>\n`
  }

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
// Drop the shell's placeholder <title>; every page supplies its own.
const shell = raw.replace(/\s*<title>[\s\S]*?<\/title>/, '')

/** Splice one page's head and body into the built shell. */
const compose = (head, body) =>
  shell.replace('<!--seo-head-->', head.trimEnd()).replace('<!--ssr-outlet-->', body)

let count = 0
for (const page of pages) {
  writeHtml(page.path, compose(buildHead(page), render(page.path)))
  count++
}

// 404 fallback, rendered through the catch-all route.
fs.writeFileSync(
  path.join(dist, '404.html'),
  compose(
    `    <title>Page Not Found</title>\n    <meta name="robots" content="noindex, follow" />`,
    render('/__not-found__'),
  ),
)

// --- robots.txt -----------------------------------------------------------
// The Sitemap directive carries over (P0). The /wp-admin/ rules are dropped --
// they are meaningless off WordPress. Search disallows are kept.
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *
Disallow: /?s=
Disallow: /page/*/?s=
Disallow: /search/

Sitemap: ${ORIGIN}/sitemap.xml
`,
)

// --- sitemaps -------------------------------------------------------------
// Same four-file structure as the original. The <?xml-stylesheet?> line is
// dropped: it pointed at a Slim SEO plugin path that no longer exists.
const urlset = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (p) =>
      `\t<url>\n\t\t<loc>${ORIGIN}${p.path}</loc>${p.lastmod ? `\n\t\t<lastmod>${p.lastmod}</lastmod>` : ''}\n\t</url>`,
  )
  .join('\n')}
</urlset>
`

const inSitemap = pages.filter((p) => p.inSitemap)
const byType = (t) => inSitemap.filter((p) => p.type === t)

fs.writeFileSync(path.join(dist, 'sitemap-post-type-page.xml'), urlset(byType('page')))
fs.writeFileSync(path.join(dist, 'sitemap-post-type-post.xml'), urlset(byType('post')))
fs.writeFileSync(path.join(dist, 'sitemap-taxonomy-category.xml'), urlset(byType('category')))
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<sitemap>\n\t\t<loc>${ORIGIN}/sitemap-post-type-post.xml</loc>\n\t</sitemap>
\t<sitemap>\n\t\t<loc>${ORIGIN}/sitemap-post-type-page.xml</loc>\n\t</sitemap>
\t<sitemap>\n\t\t<loc>${ORIGIN}/sitemap-taxonomy-category.xml</loc>\n\t</sitemap>
</sitemapindex>
`,
)

console.log(`prerender: ${count} pages -> dist/**/index.html`)
console.log(`           404.html, robots.txt, 4 sitemaps`)
console.log(`           sitemap: ${byType('page').length} page + ${byType('post').length} post + ${byType('category').length} category = ${inSitemap.length}`)
