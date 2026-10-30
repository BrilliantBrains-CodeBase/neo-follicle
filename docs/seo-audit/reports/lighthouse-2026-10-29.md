# Lighthouse mobile — main vs seo/ryze-audit-fixes

`main` measured 29 Oct 2026; the branch re-measured 30 Oct 2026 at its final commit.

**Setup.** Both builds were made with `npm run build` from the same repo and served
by the same Apache 2.4.58, each with its own `public/.htaccess` (so "before" includes the
live compression bug: the 714 KB entry bundle went out uncompressed). Lighthouse 12.8.2,
mobile form factor, default simulated throttling (150 ms RTT, 1.6 Mbps, 4× CPU).
Three runs per page per build; the table shows the **median**. Lighthouse's simulated
throttling varies run to run (home on the branch: 85, 96, 95), hence three runs.

**Third parties were blocked in every run** (googletagmanager.com, google-analytics.com,
doubleclick.net, facebook) so the numbers compare the site's own code and assets. That is
why "before" TBT is low here: on the live site TBT was 1,700–2,240 ms, most of it GTM, which
this branch now loads after first interaction for non-ad visits.

These are lab numbers on a local server (TTFB near zero, then simulated). The live site
adds real network latency, so absolute values on PageSpeed Insights will differ; the
before → after gap is the point. Field data (CrUX, Ryze's Page Speed) lags about 28 days.

| Page | Perf before → after | LCP before → after | FCP before → after | TBT before → after | Bytes before → after | A11y before → after |
|---|---|---|---|---|---|---|
| Home `/` | 60 → **95** | 9.7 s → **2.5 s** | 5.8 s → 2.1 s | 93 → 101 ms | 1828 → 522 KB | 96 → 100 |
| Cost page `/hair-transplant-cost-in-bangalore/` | 61 → **90** | 7.5 s → **3.1 s** | 5.9 s → 2.6 s | 71 → 60 ms | 1281 → 343 KB | 96 → 100 |
| GFC (treatment) `/gfc-hair-treatment-in-bangalore/` | 61 → **85** | 8.0 s → **3.7 s** | 5.3 s → 2.7 s | 73 → 105 ms | 1426 → 480 KB | 96 → 100 |
| Doctor `/dr-sandeep-mahapatra-hair-transplant-surgeon/` | 61 → **89** | 8.0 s → **3.3 s** | 5.5 s → 2.6 s | 92 → 51 ms | 1394 → 394 KB | 96 → 100 |
| Blog post `/how-many-grafts-do-i-need-for-hair-transplant/` | 61 → **89** | 9.0 s → **3.2 s** | 5.8 s → 2.7 s | 58 → 32 ms | 1532 → 401 KB | 96 → 100 |
| Contact `/contact-us/` | 61 → **90** | 7.8 s → **3.0 s** | 6.0 s → 2.7 s | 63 → 61 ms | 1903 → 878 KB | 96 → 100 |

## Every run (Performance score; LCP in seconds)

| Page | main perf | branch perf | main LCP | branch LCP |
|---|---|---|---|---|
| `/` | 60 / 59 / 60 | 85 / 96 / 95 | 9.9 / 9.7 / 8.3 | 3.7 / 2.4 / 2.5 |
| `/hair-transplant-cost-in-bangalore/` | 61 / 61 / 63 | 89 / 90 / 90 | 7.4 / 7.5 / 7.5 | 3.1 / 3.0 / 3.1 |
| `/gfc-hair-treatment-in-bangalore/` | 62 / 61 / 61 | 85 / 84 / 85 | 8.0 / 7.9 / 8.0 | 3.7 / 3.7 / 3.6 |
| `/dr-sandeep-mahapatra-hair-transplant-surgeon/` | 61 / 61 / 61 | 88 / 89 / 92 | 8.0 / 8.2 / 8.0 | 3.3 / 3.3 / 3.3 |
| `/how-many-grafts-do-i-need-for-hair-transplant/` | 61 / 61 / 60 | 87 / 89 / 89 | 9.0 / 9.0 / 9.0 | 3.3 / 3.2 / 3.2 |
| `/contact-us/` | 60 / 61 / 62 | 88 / 93 / 90 | 7.8 / 7.9 / 7.8 | 3.2 / 2.7 / 3.0 |

## What moved the numbers

| Change | Effect seen in the runs |
|---|---|
| `.htaccess` compresses `text/javascript` | Entry JS 714 KB → ~118 KB on the wire (br) |
| Code-split every route but home | Entry 714 KB → 487 KB raw |
| Hero text/image no longer start at opacity 0 | LCP render delay no longer waits for an animation |
| Responsive images (hero, banners, logo, blog, cards, treatment heroes, footer texture) | Page weight down 66–74% (contact 54%: it keeps the Google Maps embed) |
| Rupee-only font subset | 85 KB less on the homepage |
| Contrast + label fixes | Accessibility 96 → 100 on every page tested; axe-core over all 65 pages: 1,926 → 60 violations (the 60 are aria-hidden decorative numerals) |

## Remaining opportunities (not in this PR)

- **FCP ~2.6 s in the lab** is now mostly the simulated network for HTML → CSS → entry JS.
  Inlining critical CSS (e.g. Beasties at prerender time) would remove one round trip.
- **Contact page** loads the Google Maps embed (~400 KB of third-party JS) when it nears
  the viewport. A static map image with "Open in Google Maps" would remove it.
- **Treatment-page LCP is the H1 text**, which waits on the entry JS in Lantern's model.
