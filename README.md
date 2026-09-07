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
npm run gen:seo    # backup -> src/seo/pages.ts + src/seo/schema/*.json
npm run gen:pages  # src/seo/pages.ts -> src/pages/*.tsx + src/routes.tsx
```

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

It also emits `robots.txt` and the same four-file sitemap structure as the original
(index + page + post + category), preserving every `lastmod`.

## What is preserved exactly

`npm run verify` asserts all of this against the backup on every build:

- 59 HTML files at their exact paths
- `<title>` and `<meta name="description">` byte-for-byte
- canonical present on 53, **absent** on the 6 landing pages (that is their captured state)
- `noindex` retained on all 6 ad landing pages
- JSON-LD deep-equal to the capture, 14 FAQPages / 82 questions intact
- sitemaps list exactly the 53 indexable URLs and none of the 6 noindex ones
- every header/footer link resolves to a real route

## Known deviations from the original

Three, all deliberate:

1. **`contact-us` and `hair-conditions-we-treat` are linked from the footer.** Both were
   orphaned on the live site — `contact-us` is the conversion page, is in the sitemap, is
   declared `ContactPage` in JSON-LD, and had *zero* inbound internal links because every CTA
   used an on-page `#contact` anchor. This is the top P1 item in `reports/seo-audit.md` §7.
   Marked in `src/config/nav.ts`; delete two lines to restore the original footer.
2. **`robots.txt` drops the `/wp-admin/` rules.** Meaningless off WordPress. The `Sitemap:`
   directive and the search disallows carry over.
3. **Sitemaps drop the `<?xml-stylesheet?>` line.** It pointed at a Slim SEO plugin path that
   no longer exists.

## Still outstanding

Ported as-is, deliberately, so the port itself stays verifiable. Fix in a later pass:

- **38 meta descriptions need rewriting** — 36 Slim SEO body dumps (most begin `Home » …` and
  truncate mid-word) plus 2 empty. Find them with `pages.filter(p => p.needsRewrite)`.
- **6 image URLs 404** on the live site; two of them break the `Physician` entity image in
  structured data. `reports/seo-audit.md` §3.
- **29 pages reuse one `@id` for two nodes**, making the graph ambiguous. §4.
- **18 titles exceed 60 characters** and will truncate in SERPs. §2.
- `sample-page`, `maintenance-page` and `category/uncategorized` are WordPress defaults that
  are indexable but worthless. Kept for now; the audit recommends dropping them.
