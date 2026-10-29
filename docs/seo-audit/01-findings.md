# 01 · Findings — neofollicletransplant.com

**Audit date:** 29 Oct 2026 · **Prepared by:** Brilliant Brains
**Sources:** Ryze AI Technical Audit; Google Search Console (`sc-domain:neofollicletransplant.com`);
GA4 property `382048767`; Google Business Profile "Neo Follicle Hair Transplant" (Marathahalli,
read through its API); live GTM container `GTM-NCJCP6NZ`; a crawl of all 54 sitemap URLs;
Lighthouse 12 mobile; live SERP checks; a local Apache 2.4 build of `main` and of this branch.
**Period:** 90 days, 29 Jul – 27 Oct 2026, unless stated.

The last column says where each finding is handled: a commit on this branch, or a manual step
in [02-implementation-guide.md](02-implementation-guide.md).

---

## 0. Summary

Ryze scores the site 92/100 and flags one notice (alt text on 25 pages). The technical base is
good — prerendered HTML, rich schema, `llms.txt`, AI crawlers allowed — but six problems cost leads.

| # | Problem | Evidence | Handled by |
|---|---|---|---|
| 1 | **Lead tracking was broken** | GA4 logged **1 key event** in 90 days over **16,790 sessions**. GTM had no GA4 event tags and the code never pushed to the dataLayer. Google Ads counted every call **twice** (two tags on the same `tel:` click). | `analytics:` commit + manual steps 2–3 ([gtm/](gtm/README.md)) |
| 2 | **Mobile speed was poor** | Live Lighthouse mobile **40–45**, LCP **11.1–11.8 s**. The 714 KB JS bundle went out **uncompressed**; the hero H1 started invisible (fade-in), so LCP render delay was 10.5 s. | `server:`, `perf(LCP)`, `perf:` code-split, `perf(images)`, `perf(fonts)` |
| 3 | **Duplicate hosts** | `http://` and `https://www.` both answered **200**. The GBP website link points at `www` with UTMs. | `server:` commit + manual step 5 |
| 4 | **Money pages thin and competing** | Service pages 579–1,426 words vs blogs 2,041–5,363. `/best-hair-transplant-in-bangalore/` ranks **49–62** for the terms the homepage ranks ~**10–11** for. There is **no FUE service page**. | Decisions + [03-content-briefs.md](03-content-briefs.md) |
| 5 | **Price-intent pages show no prices** | "exosomes hair treatment price" ranks **4.7** on 1,821 impressions; no page shows a ₹ figure. Competitors ranking for cost terms all publish ranges. | Clinic decision → [03 §2](03-content-briefs.md) |
| 6 | **FAQs without markup** | 20 treatment pages showed visible FAQs with no `FAQPage`. | `seo: FAQPage JSON-LD…` (17 → 37 FAQPage graphs, 100 → 234 questions) |

The Ryze alt-text notice came from one shared component: `/footer-bg.webp` rendered as a
decorative `<img alt="">` on 24 pages, plus 6 homepage images with empty alt. Main had **34**
`<img alt="">` across the site; this branch has **0**, and no `<img>` without alt.

---

## 1. Search Console (90 days)

**Totals:** 1,710 clicks · 158,527 impressions · CTR 1.08% · position 7.8
**Devices:** mobile 1,199 clicks / 107,786 impr (pos 6.1) · desktop 496 / 49,891 (pos 11.5)
**Last 28 days (29 Sep – 27 Oct):** 394 clicks · 30,631 impr · CTR 1.29% · pos 9.1

### 1.1 Priority pages

| Page | Clicks | Impr. | CTR | Pos | Diagnosis | Handled by |
|---|---:|---:|---:|---:|---|---|
| `/` | 438 | 32,036 | 1.37% | 8.9 | Head terms at ~10–11; title led with "Direct Hair Transplant Clinic", not the query | New title (`seo: titles…`) |
| `/gfc-hair-treatment-in-bangalore/` | 74 | 13,549 | 0.55% | 6.1 | Ranks 3.2–3.4 for "gfc (hair) treatment" with CTR 0.14–0.41% | New title + FAQPage; price → 03 §6 |
| `/exosome-hair-treatment-in-bangalore/` | 79 | 11,973 | 0.66% | 11.7 | Price intent ("…price" 1,821 impr @ 4.7); no price | New title; price → 03 §7 |
| `/dr-sandeep-mahapatra-hair-transplant-surgeon/` | 101 | 8,966 | 1.13% | 7.4 | "dr sandeep mahapatra" @ 18.1; another doctor shares the name | Physician entity already in schema; off-site → 04 §3 |
| `/eyebrow-restoration-in-bangalore/` | 29 | 8,763 | 0.33% | 3.0 | Impressions are image results for "eyebrow"; "eyebrow transplant in bangalore" @ 20.0 | New title |
| `/best-hair-transplant-in-bangalore/` | 15 | 6,620 | 0.23% | 22.6 | **Cannibalises the homepage** (§1.2) | Decision → step 7 |
| `/unshaven-hair-transplant/` | 61 | 4,374 | 1.39% | 20.5 | Thin | New title; brief 03 §4 |
| `/hair-transplant-cost-in-bangalore/` | 11 | 3,310 | 0.33% | 14.9 | "hair transplant cost in bangalore" @ 20.7; competes with a blog post; no prices | New title; step 9 + 03 §2 |
| `/beard-transplant-in-bangalore/` | 22 | 2,735 | 0.80% | 10.8 | Thinnest service page | New title; brief 03 §3 |
| `/failed-hair-transplant-repair-in-bangalore/` | 4 | 1,438 | 0.28% | 6.3 | High intent, thin | New title; brief 03 §5 |
| `/fue-hair-transplant-bangalore/` | 0 | 76 | 0.00% | 25.6 | Core service filed as a blog post | Step 8 + 03 §1 |

The GBP-attributed URL (`www…/?utm_source=google&utm_medium=organic&utm_campaign=gmb`) took 334
clicks at position 3.9: the local pack, where the clinic already wins.

### 1.2 Head-term cannibalisation (query × page)

| Query | `/` | `/best-hair-transplant-in-bangalore/` |
|---|---|---|
| hair transplant bangalore | 3,640 impr · pos 10.0 | 240 impr · pos 61.9 |
| best hair transplant in bangalore | 1,678 impr · pos 10.8 | 282 impr · pos 49.4 |
| best hair transplant clinic in bangalore | 734 impr · pos 10.7 | 160 impr · pos 54.1 |
| fue hair transplant in bangalore | 33 impr · pos 13.1 | 20 impr · pos 67.8 |

---

## 2. Technical findings

| Check (live, 29 Oct 2026) | Result | Handled by |
|---|---|---|
| `http://neofollicletransplant.com/` | 200, no redirect | `server:` — one 301 to https apex, query kept |
| `https://www.neofollicletransplant.com/` | 200, byte-identical to apex | `server:` |
| Entry JS (714 KB) | **No `Content-Encoding`**: the filter listed `application/javascript`, Apache serves `text/javascript` | `server:` — brotli + gzip fallback; entry now 487 KB raw / ~118 KB br after the code split |
| Images, fonts | No `Cache-Control` | `server:` — fonts 1 y immutable, images 30 d |
| `robots.txt`, sitemaps, `llms.txt` | No `Cache-Control`; `text/plain` with no charset (mojibake in `llms.txt`) | `server: UTF-8 charset…` |
| `robots.txt` in the repo | Did not exist as a file (generated inside `prerender.mjs`) | `seo: robots.txt becomes a real file` |
| Legacy URLs Google has seen | 11 return 404; 2 Yoast sitemap files | `server:` — 301s, tested |
| Landing pages (`*-lp`, `/thank-you*`, `/hair-assessment/`) | `noindex, follow` ✔ | Kept; verify asserts it |
| `/ai-hair-transplant-cost-calculator/` | `noindex` | Kept until 05 §4 is done |
| GSC sitemaps | 7 registered; **6 stale** (www host, 2017 Yoast) | Manual step 4 |
| Mobile layout | **14 pages wider than a 412px screen** (long reference URLs, one table) | `fix(mobile):` — 0 pages at 412/360/320px |
| Accessibility | Lighthouse a11y 96 on every template (white on #3E74D9 is 4.46:1) | `a11y:` — 100 |

### 2.1 Speed

Live Lighthouse mobile before: `/` 40 (LCP 11.4 s, TBT 2,240 ms) · `/best-hair-transplant-in-bangalore/`
45 · `/hair-transplant-cost-in-bangalore/` 42. Ryze's Page Speed 72 is Chrome field data.

Root causes, largest first, and the fix for each:

| Cause | Fix |
|---|---|
| Uncompressed JS (≈515 KiB, 2.1–2.6 s) | `.htaccess` compression covers `text/javascript` |
| Hero text and image started at opacity 0 (LCP render delay 10.5 s on the cost page) | Removed `animate-fadeInUp` from above-the-fold hero elements on 4 hero components |
| One 714 KB entry bundle for every page | Every route except home is a lazy chunk; entry 714 → 487 KB raw |
| GTM: 1,468 ms main-thread, loaded first on every visit | Loaded at once for ad-attributable visits and conversion pages; on first interaction or 3.5 s otherwise |
| Hero 1672px (126 KB) for a 412px phone; page banners used it as a CSS background | srcset 640–1672; banners are an `<img>` with a responsive preload |
| Logo: 108 KB SVG wrapping two PNGs, preloaded on every page | 3–8 KB WebP at 1x/2x/3x |
| Blog heroes 1600px (68–251 KB), cards 1200px, treatment heroes 1200px, all for ~300–380px slots | srcset copies (blog 640/960, cards 480/768, treatment 640) |
| Footer texture: phones took the 1536px / 102 KB file (every page) | 768px below 768px viewports |
| One "₹" pulled the 85 KB Inter latin-ext font on the homepage | 1.2 KB rupee-only subset |

Measured A/B (same server, Lighthouse median of 3): [reports/lighthouse-2026-10-29.md](reports/lighthouse-2026-10-29.md).

---

## 3. Measurement

| Item | Finding | Handled by |
|---|---|---|
| GA4 key events (90 d) | **1** (`thank_you_page`). No lead, call or WhatsApp events | `analytics:` + gtm/README.md |
| GA4 sessions by channel (90 d) | Cross-network 9,387 · Paid Search 2,657 · Organic Search 2,630 · Direct 1,271 · Organic Video 288 · Unassigned 280 · Organic Social 159 · AI Assistant 56 · Referral 56 · Paid Other 6 | Baseline (06) |
| GTM | GA4 config tag + Ads conversion tags only; **two Call conversion tags fire on the same click** | gtm/README.md §2 |
| Lead form | POSTs to Apps Script, then navigates to the thank-you page; no dataLayer push | `trackLead()` on success |
| GBP (90 d) | 34,656 profile impressions · **769 calls** · **1,644 direction requests** · 440 website clicks · 500 reviews, 4.8★ | Baseline (06) |

---

## 4. Google Business Profile (read through the API, 29 Oct 2026)

| Item | Finding | Handled by |
|---|---|---|
| Place | Verified; Place ID `ChIJ58kfnkMTrjsRmln7SdXU_hI`; `maps?cid=1368765349301541274` | `seo(local):` — the site now links the cid URL (`hasMap`, `sameAs`, directions) |
| Website URL | `https://www.neofollicletransplant.com/?utm_…` (www host) | Manual step 5 |
| Categories | Primary *Hair transplantation clinic*; additional *Surgeon*, *Dermatologist*, *Hair replacement service* | Review in 04 §1 |
| Services listed under *Surgeon* | **"Plastic Surgeon"**, **"Cosmetic Surgeon"**, "Cosmetologist", "Hair Transplant Surgeon"; plus "Cosmetic Surgery", "Laser hair reduction", "Skin Care" under the clinic | 04 §1 — in India "plastic surgeon" is read as a surgeon with an MCh/DNB in Plastic Surgery; the doctor's listed qualification is MBBS, MD (Dermatology), so these labels can mislead patients |
| Service descriptions | "Best trichologist", "one of the best hair transplant surgeon in India", "100% natural human virgin hair", "100% natural looking hair", "no side effects" (PRP, laser), "permanent and natural way" (beard, eyebrow), "US FDA approved cold beam laser", "best possible graft survival" | 04 §1 rewrites; 05 rules |
| "Bangalore, **Kochi**, India" | In 8 service names | Remove unless a Kochi clinic operates |
| Profile description | "Established in 2015… using the best and most advanced…" | 04 §1 rewrite |
| Experience figures | GBP: "more than 12 years… over 3000 hair transplants". Site and `llms.txt`: "20+ years… 10,000+" | Clinic: one verified figure everywhere |
| Hours | GBP 10:00–19:30, closed Tue. Site, schema and `llms.txt` 10:00–19:00, closed Tue | Clinic: one source of truth, then update `CONTACT.openingHours` |
| Google-suggested edits | `hasGoogleUpdated: true` — Google has pending changes to the listing | Review in the GBP dashboard |
| Reviews | 9 of the latest 25 unreplied, including one 3★; some describe Derma Solutions procedures | 04 §1 |
| New location | Reviews mention **NeoSculpt Whitefield**; "hair transplant whitefield" gets 65 impr @ 9.4 | Separate GBP + location page at launch |

---

## 5. Competitive snapshot (live SERP, 29 Oct 2026)

| Pattern among ranking pages | Neo Follicle |
|---|---|
| Hospital authority (Manipal) and aggregators (WhatClinic, ClinicSpots, Bajaj Finserv Health, Pristyn Care) dominate generic terms | Local pack strong (pos 2–3), organic ~10 |
| Cost pages publish per-graft ranges and tables (Venkat Center, Pristyn Care, ClinicSpots) | No ₹ figure on any page |
| Graft calculators as lead magnets (Eugenix) | Has an AI calculator, `noindex` |
| Dedicated FUE and DHI service pages | FUE exists only as a blog post |
| Third-party press (Deccan Herald feature for Assure Clinic) | `/media-coverage/` exists; use it for links |
