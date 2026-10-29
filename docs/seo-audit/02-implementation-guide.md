# 02 · Implementation guide

Steps 1–2 are the engineer's. Steps 3–6 need no code. Steps 7–12 each need a
decision or content from the clinic first, then a small code change described here.

---

## 1. Deploy (engineer)

```bash
git checkout seo/ryze-audit-fixes   # or main, once merged
npm ci
npm run build                       # vite build + SSR build + prerender
npm run verify                      # must print 29/29
```

Upload **all of `dist/`**, including the dotfile `dist/.htaccess`. Some FTP and
cPanel file-manager uploads skip dotfiles by default; if `.htaccess` is missing,
none of the redirects, compression or cache rules apply and `verify:live` fails
on the `host`, `compression` and `cache` groups.

What the server needs: Apache 2.4 with `mod_rewrite` (redirects), `mod_headers`
(cache and security headers) and `mod_deflate` or `mod_brotli` (compression).
Every block is guarded with `<IfModule>`, so a missing module disables that block
instead of returning 500. Tested on Apache 2.4.58, including a host without
`mod_brotli` (serves gzip) and one without `mod_headers`/`mod_deflate` (still 200):
[reports/htaccess-apache-test.txt](reports/htaccess-apache-test.txt).

**If the site sits behind a CDN or proxy that terminates TLS** (Cloudflare and
similar), Apache sees plain HTTP and the canonical-host rule would loop. Swap
`RewriteCond %{HTTPS} !=on` for `RewriteCond %{HTTP:X-Forwarded-Proto} !https`,
as the comment in `.htaccess` says.

## 2. Verify the live site (engineer, 2 minutes)

```bash
npm run verify:live
```

It checks what the server actually sends: one-hop 301s from `http://` and `www.`
(query string kept), all 16 legacy redirects, compression, `Cache-Control` per
file type, UTF-8 charset, that the live `robots.txt` matches `public/robots.txt`,
and for every sitemap URL: 200 without redirect, self canonical, title and
description length, JSON-LD parses, FAQPage where a FAQ is visible, alt on every
`<img>`. It exits 1 on any FAIL. Expected today: 0 fail, 1 warn (the cost page has
no ₹ figure yet — step 9).

Then, by hand:

- [ ] PageSpeed Insights (mobile) on `/` and `/hair-transplant-cost-in-bangalore/`.
      Field data (and Ryze's Page Speed) lags about 28 days.
- [ ] Rich Results Test on `/gfc-hair-treatment-in-bangalore/`: FAQ detected.
- [ ] Submit a test lead on `/contact-us/` → thank-you page → row in the Apps
      Script sheet. In GTM Preview (after step 3) `nf_generate_lead` appears once.
- [ ] Tap Call and WhatsApp on a phone; both still open the dialler / WhatsApp.

## Rollback

- Whole release: redeploy the previous `dist/`.
- One change: `git revert <commit>`; every commit on this branch is one concern.
  The two that depend on each other are `perf(images)` (generates the files) and
  the `verify-seo` srcset check it adds, which live in the same commit.
- Server only: restore the previous `.htaccess`. A 500 right after deploy means
  the host disallows something in it (`AllowOverride`); the error log names the
  directive.

---

## 3. Steps after this PR

| # | Step | Owner | Needs first |
|---|---|---|---|
| 3 | Import the GTM container, publish, mark `generate_lead`, `click_to_call`, `whatsapp_click` as GA4 key events | Brilliant Brains | Step 1 live |
| 4 | Google Ads: delete the duplicate Call tag; move Call and WhatsApp to `CE - nf_click_to_call` / `CE - nf_whatsapp_click` | Brilliant Brains | Step 3 |
| 5 | Search Console: remove 6 stale sitemaps; request indexing for changed pages | Brilliant Brains | Step 1 |
| 6 | GBP: apex website URL; rewrite claims; remove "Plastic Surgeon"/"Cosmetic Surgeon" and "Kochi" unless true; align hours and experience figures | Clinic approves, BB edits | — |
| 7 | Consolidate `/best-hair-transplant-in-bangalore/` into `/` | Engineer | Clinic decision; step 8 done |
| 8 | Turn `/fue-hair-transplant-bangalore/` into a service page | Engineer + writer | Brief 03 §1 approved |
| 9 | Prices on the cost page; merge the cost blog into it | Engineer + writer | Clinic price ranges |
| 10 | Expand beard, unshaven, failed-repair, GFC, exosome pages | Writer, doctor review | Briefs 03 §3–7 |
| 11 | Index the AI cost calculator | Engineer | 05 §4 checklist; step 9 prices |
| 12 | NeoSculpt Whitefield location page + separate GBP | Clinic + engineer | Opening date |

Steps 3–6 are written up in [gtm/README.md](gtm/README.md) and
[04-gbp-gsc-offsite.md](04-gbp-gsc-offsite.md).

### Step 7 — consolidate `/best-hair-transplant-in-bangalore/` into `/`

**Why:** the page ranks 49–62 for the same head terms the homepage ranks ~10 for
(01 §1.2). Two pages with the same H1 split the signal; neither wins.
**Risk:** the page has 6,620 impressions and 15 clicks in 90 days, so little is
lost; expect a 2–6 week wobble on the homepage while Google merges them.

1. Do step 8 first, so service links have a better target than the homepage.
2. Move anything unique on the page (FAQ answers, the NFT technique section) into
   the homepage or the FUE page.
3. `content/seo/overrides.json`:
   `"best-hair-transplant-in-bangalore": { "inSitemap": false, "robots": "noindex, follow" }`,
   then `npm run gen:seo`.
4. Repoint internal links. Today they are in `src/config/nav.ts`,
   `src/components/Services.tsx`, `src/components/doctor/DoctorExpertise.tsx`,
   `src/components/treatments/SurgicalTreatments.tsx`,
   `src/components/treatments/TreatmentCategories.tsx` and 18 blog posts under
   `src/content/posts/` (`git grep -l /best-hair-transplant-in-bangalore/ src`).
5. Uncomment in `public/.htaccess`:
   `RewriteRule ^best-hair-transplant-in-bangalore/?$ / [R=301,L]`
6. `npm run build && npm run verify`, deploy, `npm run verify:live -- --only legacy,pages`.
7. Google Ads: check no ad group still uses the old URL as a final URL.

### Step 8 — FUE service page

Brief: [03 §1](03-content-briefs.md). The slug stays `/fue-hair-transplant-bangalore/`.
Build it from the treatment-page template (`src/content/treatments/*.ts` +
`TreatmentPage`), so it gets the hero, FAQ, FAQPage schema and lead form for free.
Change its `type` from `post` to `page` in the SEO record, keep the existing guide
text as the body, and add it to the "Hair Transplant Services" nav.

### Step 9 — prices and one cost page

1. The clinic supplies ranges it will honour: per graft (FUE, DHI, unshaven), per
   session (PRP, GFC, exosome), and what is included. Ranges, not "starting at".
2. Add a price table and the price FAQs from [03 §2](03-content-briefs.md) to
   `/hair-transplant-cost-in-bangalore/`. Render graft-count examples from the
   ranges in code so the page, FAQ and calculator never disagree.
3. Move the unique sections of `/hair-transplant-cost-bangalore-what-decides-price/`
   into the cost page; set that slug to `inSitemap: false` in `overrides.json`;
   repoint its links; uncomment
   `RewriteRule ^hair-transplant-cost-bangalore-what-decides-price/?$ /hair-transplant-cost-in-bangalore/ [R=301,L]`.
4. `Offer` schema only with real prices (05 §5).

### Step 11 — index the AI cost calculator

Only after the 05 §4 checklist passes. Then in `content/seo/overrides.json` set its
`robots` to the indexable default and `inSitemap: true`, run `npm run gen:seo`, and
check `npm run verify` (the claims check will read its title and description).
