# neofollicletransplant.com — rebuild

Vite + React + TypeScript + Tailwind. All 59 URLs from the live WordPress site are wired
as routes with their SEO layer ported verbatim. **Page bodies are placeholders** — content
and design are the next pass.

## Commands

```bash
npm install
npm run dev        # dev server on :5173
npm run build      # client bundle -> SSR bundle -> prerender 59 static pages
npm run verify     # diff dist/ against the SEO backup (run after build)
npm run typecheck
```

Regenerators (only needed if the backup changes):

```bash
npm run gen:seo    # backup + content/seo + site.ts -> src/seo/pages.ts + src/seo/schema/*.json
npm run gen:og     # src/seo/pages.ts -> public/og/<slug>.jpg share cards (--force to rebuild all)
npm run gen:icons  # public/favicon.svg -> favicon.ico, apple-touch-icon, manifest icons
npm run gen:pages  # src/seo/pages.ts -> src/pages/*.tsx + src/routes.tsx
npm run mirror:wp  # copy referenced /wp-content/uploads/ images into public/ (while WP is live)
```

After changing a title, H1 or hero image, run `gen:seo` then `gen:og -- --slug <slug>`.

## The two reference captures

| Directory | Supplies |
|---|---|
| `neofollicle-seo-backup/` | Content and SEO — every title, meta tag, JSON-LD graph and URL that must carry over. |
| `folixa-design-reference/` | Form — layout, color, type, motion. `tokens/tailwind.config.js` is copied to the repo root unchanged. |

Neither is a substitute for the other. Both stay out of the build (`tsconfig` includes only
`src`, and Tailwind's `content` glob only scans `./index.html` and `./src`).

## Why it prerenders

The site's most valuable asset is its search surface: 53 indexable URLs with self-referencing
trailing-slash canonicals, 6 deliberately `noindex` ad landing pages, and **59 JSON-LD graphs
containing 14 FAQPages / 82 questions**. A client-rendered SPA would hand a crawler an empty
`<head>` on first byte and lose all of it.

`scripts/prerender.mjs` renders each route to `dist/<path>/index.html`, so `/some-slug/`
resolves **with its trailing slash** on Netlify, Vercel, Cloudflare Pages and Apache alike.
The `<head>` — title, robots, description, og, canonical, icons, JSON-LD — is composed from
`src/seo/pages.ts` and `src/seo/schema/<slug>.json` and written into the served bytes.

It also emits `sitemap.xml` (index) + page/post child sitemaps with image entries,
and `llms.txt` / `llms-full.txt`. `robots.txt` is a plain file, `public/robots.txt`,
which Vite copies into `dist/`; the build fails if its `Sitemap:` line does not
point at `SEO.origin`.

## Where SEO data lives

| What | Source |
|---|---|
| NAP, hours, geo, doctor, socials, GBP link | `src/config/site.ts` |
| Site-wide JSON-LD (#website, #organization, #clinic, #physician) | built from site.ts by `scripts/seo/entity-graph.mjs` |
| Rewritten titles / descriptions / robots / SEO h1 | `content/seo/overrides.json` |
| Crawler rules (`robots.txt`) | `public/robots.txt` |
| Server: canonical host, 301s, caching, compression | `public/.htaccess` |
| Pages authored after the capture | `content/seo/<slug>.json` |
| Everything else per page | `neofollicle-seo-backup/` |

`gen-seo` normalises every graph: one `@graph` per page, the config-built entities
in place of WordPress's 60 per-page copies, duplicate `@id`s merged, the dead
`?s=` SearchAction dropped, and five image URLs that were already 404 on the live
site swapped for working ones.

## What `npm run verify` asserts

- 65 HTML files at their exact paths
- title, description, robots, canonical = capture + `overrides.json`, byte-for-byte
- every indexable page: self-referencing trailing-slash canonical, title ≤ 60,
  description 70–160, a 1200×630 share card under 300 KB
- noindex kept on all 6 ad landing pages, which still carry **no** canonical
- every captured page-specific JSON-LD node survives; every visible FAQ is marked
  up question for question (37 FAQPages / 234 questions)
- one graph per page, no duplicate `@id`, every same-origin image URL served by dist/
- sitemaps = exactly the indexable URLs, all with `lastmod`; llms.txt links the same set
- every header/footer link resolves to a real route
- `robots.txt`, parsed per RFC 9309 for Googlebot, Bingbot and every AI crawler it
  names: all 65 pages fetchable (noindex ones too, so the noindex is seen), every
  script/style/font/image in `dist/` fetchable, old WordPress search URLs blocked

## Deliberate deviations from the original

1. **`contact-us` and `hair-conditions-we-treat` are linked from the footer** (they
   were orphaned). Marked in `src/config/nav.ts`.
2. **`robots.txt` drops the `/wp-admin/` rules** and names the AI crawlers explicitly
   (see the comments in `public/robots.txt`).
3. **WordPress images are served from `public/wp-content/` at their original paths**,
   so indexed image URLs survive the cutover.
4. **`sample-page`, `maintenance-page`, `category/uncategorized` and
   `nft-brochure-thank-you` are `noindex`** and out of the sitemap. Redirect the
   first three at the host once it is chosen.
5. **The Cochin (Maradu) Practo listing is out of `sameAs`**; the site describes
   the Bangalore clinic only. Social URLs lose their tracking parameters.
6. **GTM (`GTM-NCJCP6NZ`) is Google's standard snippet, written in `index.html`**:
   the script first in `<head>`, the `<noscript>` first in `<body>`. It loads on
   every visit, and Search Console can verify ownership through it. The build
   and `npm run verify` fail if it goes missing or moves. To change the
   container, edit both `index.html` and `ANALYTICS.gtmId` in `src/config/site.ts`.
   See `docs/seo-audit/gtm/README.md`.

## Still outstanding

- **Google Business Profile URL** -- done Oct 2026: `CONTACT.gbpUrl` is the cid URL
  read from the verified profile, so it is `hasMap`, in `sameAs`, and on every
  "Get directions" link.
- **Host redirects** for the retired WordPress URLs -- done Oct 2026 in
  `public/.htaccess` (Apache). Port them if the host changes.
- Everything that needs the clinic, Google Tag Manager, GA4, GBP or Search
  Console rather than code: `docs/seo-audit/README.md`.
