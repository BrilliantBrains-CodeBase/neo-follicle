# SEO, speed and tracking audit — October 2026

Prepared by Brilliant Brains for neofollicletransplant.com, from the Ryze AI
Technical Audit, Search Console, GA4, Google Business Profile, Lighthouse and
a full crawl of the built site. Everything that can be done in code is in this
branch (`seo/ryze-audit-fixes`). Everything else is listed below as a manual
step, with the person who has to do it.

| Doc | What's in it |
|---|---|
| [01-findings.md](01-findings.md) | The evidence: what was wrong, how we know, and which commit fixes it |
| [02-implementation-guide.md](02-implementation-guide.md) | Deploy, verify, roll back; the numbered steps that come after this PR |
| [03-content-briefs.md](03-content-briefs.md) | FUE service page, cost page with prices, and six money-page briefs |
| [04-gbp-gsc-offsite.md](04-gbp-gsc-offsite.md) | Google Business Profile, Search Console and off-site actions |
| [05-compliance.md](05-compliance.md) | Healthcare-claims rules, what was reworded, what needs sign-off |
| [06-measurement.md](06-measurement.md) | Baselines and what to check at 7, 28 and 90 days |
| [gtm/](gtm/README.md) | GTM import file + Google Ads trigger fix (15 minutes, after deploy) |
| [reports/](reports/) | Lighthouse before/after, Apache test log |

## Results, measured on this branch (Lighthouse 12 mobile, median of 3 runs)

See [reports/lighthouse-2026-10-29.md](reports/lighthouse-2026-10-29.md) for
every page and run. Both builds served by the same Apache 2.4 with their own
`.htaccess`, so the "before" includes the live compression bug.

| Page | Perf before → after | LCP before → after | FCP before → after | TBT before → after | Bytes before → after | A11y before → after |
|---|---|---|---|---|---|---|
| Home `/` | 60 → **87** | 9.7 s → **3.7 s** | 5.8 s → 2.1 s | 93 → 94 ms | 1828 → 523 KB | 96 → 100 |
| Cost page `/hair-transplant-cost-in-bangalore/` | 61 → **89** | 7.5 s → **3.1 s** | 5.9 s → 2.6 s | 71 → 67 ms | 1281 → 343 KB | 96 → 100 |
| GFC (treatment) `/gfc-hair-treatment-in-bangalore/` | 61 → **85** | 8.0 s → **3.6 s** | 5.3 s → 2.7 s | 73 → 73 ms | 1426 → 480 KB | 96 → 100 |
| Doctor `/dr-sandeep-mahapatra-hair-transplant-surgeon/` | 61 → **88** | 8.0 s → **3.3 s** | 5.5 s → 2.6 s | 92 → 53 ms | 1394 → 394 KB | 96 → 100 |
| Blog post `/how-many-grafts-do-i-need-for-hair-transplant/` | 61 → **88** | 9.0 s → **3.3 s** | 5.8 s → 2.7 s | 58 → 48 ms | 1532 → 401 KB | 96 → 100 |
| Contact `/contact-us/` | 61 → **90** | 7.8 s → **3.0 s** | 6.0 s → 2.6 s | 63 → 49 ms | 1903 → 878 KB | 96 → 100 |

Beyond Lighthouse:

- **Lead tracking.** GA4 recorded 1 key event in 90 days. The site now pushes
  `nf_generate_lead`, `nf_click_to_call`, `nf_whatsapp_click`,
  `nf_directions_click` and `nf_email_click` to the dataLayer; the GTM import
  turns them into GA4 events (manual step 6).
- **Duplicate hosts and 404s.** `http://` and `www.` now 301 to the https apex in
  one hop; 16 retired, mistyped or Yoast-era URLs 301 to live pages.
- **Schema.** 37 FAQPage graphs / 234 questions (main: 17 / 100); the GBP cid
  URL is now `hasMap` and in `sameAs`.
- **Mobile layout.** 14 pages scrolled sideways on a phone; none do now, at
  412, 360 or 320px.
- **Ryze "images missing alt text" (25 pages).** No `<img>` without alt, and the
  34 decorative `<img alt="">` on main are gone (CSS backgrounds or real alt).

## How to review this PR

```bash
npm ci
npm run build && npm run typecheck
npm run verify                 # 29 checks on dist/ (was 24)
npm run verify:posts && npm run verify:treatments && npm run verify:gallery && npm run verify:media
npm run preview                # click through home, a treatment page, a blog post, contact
```

Commits are one concern each and can be reverted on their own. The ones most
worth a careful read:

| Commit | Why it deserves attention |
|---|---|
| `server: canonical https apex host…` | Redirect rules. Tested on Apache 2.4.58, including hosts without mod_brotli or mod_headers ([reports/htaccess-apache-test.txt](reports/htaccess-apache-test.txt)). If the host is behind a TLS-terminating proxy/CDN, swap the `%{HTTPS}` condition as the comment says. |
| `analytics: GA4 lead/call/WhatsApp events…` | GTM now loads immediately for ad clicks and conversion pages, and on first interaction (or 3.5 s) for everyone else. |
| `perf: code-split every route except home` | Hydration was tested on 8 templates: same H1 node, 0 replaced nodes. |
| `a11y: text contrast…` | Primary blue moves from #3E74D9 to #3C72D7 (2/255 per channel) to pass WCAG AA. Brand owner may want to know. |
| `content: reword 5 FAQ answers…`, `content: two "painless" headings…` | Medical copy. **Needs the clinic's sign-off before merge** (05-compliance.md §3). |

## Before merge: needs the clinic

- [ ] **Medical sign-off** on the 5 reworded FAQ answers, 2 step headings and
      the QR678 regulatory line (05-compliance.md §3).
- [ ] **Brand OK** on the 2/255 primary-blue change (optional).

## After deploy (numbered as in 02-implementation-guide.md)

| Step | What | Who | Time | Doc |
|---|---|---|---|---|
| 2 | `npm run verify:live` against production | Engineer | 2 min | 02 §2 |
| 3 | Import the GTM container; mark 3 GA4 key events | Brilliant Brains | 10 min | gtm/README.md |
| 4 | Delete the duplicate Google Ads Call tag; move Call and WhatsApp to the new triggers | Brilliant Brains | 10 min | gtm/README.md §2 |
| 5 | Search Console: remove 6 stale sitemaps; request indexing for changed pages | Brilliant Brains | 10 min | 04 §2 |
| 6 | GBP: apex website URL; rewrite claims; "Plastic Surgeon" / "Cosmetic Surgeon" services; "Kochi" in 8 service names; one set of hours (GBP 7:30 PM, site 7:00 PM) and experience figures (GBP "12 years / 3,000", site "20+ years / 10,000+") | Clinic approves, BB edits | 30 min | 04 §1 |

## Decisions that unlock the next round of code

| Decision | Unlocks | Doc |
|---|---|---|
| Price ranges the clinic will honour (per graft, per session) | Cost page table and price FAQs (step 9), indexing the cost calculator (step 11) | 03 §2, 05 §4 |
| Merge `/best-hair-transplant-in-bangalore/` into the homepage? | Ends the head-term cannibalisation (step 7) | 02 step 7 |
| Approve the FUE service page brief | A real FUE page (step 8) | 03 §1 |
| Keep "Best" in the `/best-hair-transplant-in-bangalore/` title? | Compliance (the one claim the verifier still allows) | 05 §2 |
