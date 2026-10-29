## Summary

Fixes from the October 2026 SEO / speed / tracking audit (Ryze AI Technical Audit + Search Console, GA4, GBP, GTM, Lighthouse and a full crawl). Everything that can be done in code is here, one concern per commit; everything that needs the clinic, GTM, GA4, GBP or Search Console is written up in **`docs/seo-audit/README.md`** with the exact steps.

`main` and the live site are untouched until this is merged and deployed.

## Results (Lighthouse 12 mobile, same Apache server, median of 3 runs)

| Page | Perf before → after | LCP before → after | FCP before → after | TBT before → after | Bytes before → after | A11y before → after |
|---|---|---|---|---|---|---|
| Home `/` | 60 → **87** | 9.7 s → **3.7 s** | 5.8 s → 2.1 s | 93 → 94 ms | 1828 → 523 KB | 96 → 100 |
| Cost page `/hair-transplant-cost-in-bangalore/` | 61 → **89** | 7.5 s → **3.1 s** | 5.9 s → 2.6 s | 71 → 67 ms | 1281 → 343 KB | 96 → 100 |
| GFC (treatment) `/gfc-hair-treatment-in-bangalore/` | 61 → **85** | 8.0 s → **3.6 s** | 5.3 s → 2.7 s | 73 → 73 ms | 1426 → 480 KB | 96 → 100 |
| Doctor `/dr-sandeep-mahapatra-hair-transplant-surgeon/` | 61 → **88** | 8.0 s → **3.3 s** | 5.5 s → 2.6 s | 92 → 53 ms | 1394 → 394 KB | 96 → 100 |
| Blog post `/how-many-grafts-do-i-need-for-hair-transplant/` | 61 → **88** | 9.0 s → **3.3 s** | 5.8 s → 2.7 s | 58 → 48 ms | 1532 → 401 KB | 96 → 100 |
| Contact `/contact-us/` | 61 → **90** | 7.8 s → **3.0 s** | 6.0 s → 2.6 s | 63 → 49 ms | 1903 → 878 KB | 96 → 100 |

Third parties were blocked in every run, so this compares the site's own code and assets (details and every run: `docs/seo-audit/reports/lighthouse-2026-10-29.md`). On the live site, TBT before was 1.7–2.2 s, mostly GTM, which now loads after first interaction for non-ad visits.

Also:
- **Ryze "images missing alt text" (25 pages):** no `<img>` without alt; the 34 decorative `<img alt="">` on main are gone.
- **FAQ schema:** 17 → 37 FAQPage graphs, 100 → 234 questions, checked question-for-question against the visible FAQ.
- **Mobile layout:** 14 pages were wider than a 412px phone; 0 now at 412/360/320px.
- **Lead tracking:** the site now pushes lead / call / WhatsApp / directions / email events to the dataLayer (GA4 had 1 key event in 90 days).

## What changed

| Area | Commits |
|---|---|
| **Server** (`public/.htaccess`) | One 301 from `http://` and `www.` to the https apex (query kept); JS compression (`text/javascript` was missing — the 714 KB bundle went out uncompressed); cache headers per file type; UTF-8 charset; 16 legacy/mistyped/Yoast URLs → 301 |
| **Tracking** | `src/analytics/track.ts` (dataLayer events, no PII); GTM loads immediately for ad clicks (`gclid`/`gbraid`/`wbraid`/`_gcl_*`) and conversion pages, otherwise on first interaction or 3.5 s; GTM import file + Ads fix in `docs/seo-audit/gtm/` |
| **Speed** | Hero text/image no longer start at opacity 0; every route except home code-split (entry 714 → 487 KB); responsive images for hero, page banners, logo (108 KB SVG → 3–8 KB), blog heroes and cards, treatment heroes, footer texture; rupee-only font subset (85 KB → 1.2 KB) |
| **SEO** | FAQPage JSON-LD for treatment pages; titles/descriptions for 10 pages from Search Console evidence; SEO `h1` overrides so share cards and `llms.txt` stop saying "Best…"; `robots.txt` is now a real file (`public/robots.txt`); verified GBP cid URL as `hasMap` / `sameAs` / directions link |
| **Accessibility** | Primary #3E74D9 → #3C72D7 (white text 4.46 → 4.59:1, WCAG AA); stat-band labels, sticky-bar label, form notes; label-in-name on the calculator link |
| **Compliance** | 5 FAQ answers and 2 headings reworded (absolute medical claims); `npm run verify` now fails on unreviewed claim words in titles/descriptions/share-card text |
| **Tooling** | `verify-seo.mjs`: 23 → 29 checks (FAQ parity, robots per RFC 9309, every srcset/CSS url() resolves, claims); `scripts/verify-live.mjs` post-deploy checker; `scripts/gen-site-images.mjs`; srcset copies from `gen-blog-images` / `gen-treatment-images` (existing files came out byte-identical) |
| **Docs** | `docs/seo-audit/` — findings, implementation guide, content briefs, GBP/GSC actions, compliance, measurement, reports |

## How it was tested

- `npm run build`, `npm run typecheck`, `npm run verify` (29/29), `verify:posts`, `verify:treatments`, `verify:gallery`, `verify:media` — all pass.
- `.htaccess` on Apache 2.4.58, plus a host without `mod_brotli` (serves gzip) and one without `mod_headers`/`mod_deflate` (still 200, no 500): `docs/seo-audit/reports/htaccess-apache-test.txt`.
- `npm run verify:live` against that server: 17 pass, 1 warn (cost page has no ₹ figure yet), 0 fail. Against the same server serving `main`: 7 fail.
- Visual diff vs `main` (Playwright, 412px and 1440px): ≤ 0.03% of pixels on home, doctor, treatment and contact; the rest is photo resampling from the new srcsets. Intended changes: stat labels white, 14 pages no longer overflow.
- Hydration on 8 templates after the code split: same H1 node, 0 replaced nodes; mobile menu and client navigation work.
- GTM loader in a browser: immediate (≈0.05 s) for paid / cookie / thank-you / LP visits; on tap, or 3.8 s with no interaction, for organic.

## Before merge — needs the clinic

- [ ] **Medical sign-off** on the 5 reworded FAQ answers and 2 headings, and the QR678 regulatory status (`docs/seo-audit/05-compliance.md` §3). Each is marked "Pending medical sign-off" in code.
- [ ] Optional: brand OK on the 2/255 primary-blue change.

## After deploy (no code)

1. Upload **all** of `dist/`, including `dist/.htaccess` (some FTP clients skip dotfiles). If the site is behind a TLS-terminating CDN, see the comment on the canonical-host rule.
2. `npm run verify:live` → 0 fail.
3. GTM: import `docs/seo-audit/gtm/GTM-NCJCP6NZ_ga4-lead-events_MERGE-IMPORT.json`, mark 3 GA4 key events.
4. Google Ads: **two Call conversion tags fire on the same `tel:` click** (calls are double-counted). Delete one; move Call and WhatsApp to the new triggers (`docs/seo-audit/gtm/README.md` §2).
5. Search Console: remove 6 stale sitemaps; request indexing for the retitled pages.
6. GBP (clinic approves): website URL to the apex; "Plastic Surgeon" / "Cosmetic Surgeon" services; "Kochi" in 8 service names; claim rewrites; hours (GBP 7:30 PM vs site 7:00 PM) and experience figures.

## Not in this PR (each needs a decision first)

- Price ranges for the cost page and calculator; merging the cost blog into the cost page (rule ready in `.htaccess`, commented).
- Merging `/best-hair-transplant-in-bangalore/` into `/` (it ranks 49–62 for the terms the homepage ranks ~10 for; rule ready, commented).
- A real FUE service page; content expansion for beard, unshaven, failed repair, GFC, exosome (briefs in `docs/seo-audit/03-content-briefs.md`).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01YAS4K8TYZWagrCV1BDsuMY
