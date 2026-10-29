# 06 · Measurement: baselines and what to check

Targets are planning estimates, not promises: healthcare SEO moves over weeks and
depends on competitors. Each one names the step that drives it.

## Baselines (captured 29 Oct 2026)

| Metric | Baseline | Source |
|---|---|---|
| Organic clicks, last 28 d | **394** (30,631 impr, CTR 1.29%, pos 9.1) | GSC, 29 Sep–27 Oct |
| Organic clicks, 90 d | 1,710 (158,527 impr, CTR 1.08%, pos 7.8); mobile 1,199 | GSC, 29 Jul–27 Oct |
| "hair transplant bangalore" → `/` | pos **10.0**, 3,640 impr | GSC 90 d |
| "hair transplant cost in bangalore" → cost page | pos **20.7**, 523 impr | GSC 90 d |
| "gfc hair treatment" → GFC page | pos 3.4, CTR **0.41%** | GSC 90 d |
| "exosomes hair treatment price" → exosome page | pos 4.7, CTR 0.60% | GSC 90 d |
| FUE page | 76 impr, pos **25.6** | GSC 90 d |
| GA4 key events, 90 d | **1** | GA4 382048767 |
| GA4 organic sessions, 90 d | 2,630 | GA4 |
| GBP calls / directions / website clicks, 90 d | 769 / 1,644 / 440 | GBP |
| Lighthouse mobile, live site (home / cost) | 40 / 42; LCP 11.4 s / 11.8 s | Lighthouse 12 |
| Lighthouse mobile, same server, main vs this branch | see [reports/lighthouse-2026-10-29.md](reports/lighthouse-2026-10-29.md) | Lighthouse 12, median of 3 |
| Ryze Technical Audit | Health 92 · Speed 72 · LLM 100 · SEO 95 · 1 issue (25 pages) | Ryze |
| Pages wider than a 412px phone | 14 of 65 | Playwright scan |

## After deploy

**Day 1** (engineer + Brilliant Brains)
- `npm run verify:live`: 0 fail.
- GTM Preview: one `generate_lead`, `click_to_call`, `whatsapp_click` per action (after step 3).
- Google Ads: Call conversions should fall to roughly half the old daily rate (the duplicate tag
  is gone) while real calls in the GBP/phone records do not change. Annotate the date.

**Day 7**
- GA4 `generate_lead` count vs rows in the Apps Script lead sheet: within ±10%. A bigger gap
  means a form path that does not call `trackLead()`.
- Search Console → Pages: `http://` and `www.` URLs moving to "Page with redirect".
- Rich Results Test on two treatment pages: FAQ detected, no errors. (Google shows FAQ rich
  results only for some authoritative health sites, so the main payoff is answers that AI search
  and Google can lift, not a SERP feature.)

**Day 28** (field data catches up)
- Ryze Technical Audit: 0 issues; Page Speed ≥ 80.
- PageSpeed Insights field LCP (mobile, origin) ≤ 2.5 s.
- GSC CTR on the 10 retitled pages vs the 28 days before deploy.

## 90-day targets

| Metric | 30 days | 90 days | Driven by |
|---|---|---|---|
| Ryze Technical Audit | 0 issues; Page Speed ≥ 80 | Health ≥ 97 | This PR |
| GA4 lead tracking | `generate_lead` within ±10% of the lead sheet | Cost per lead by channel visible | This PR + steps 3–4 |
| GFC CTR on "gfc hair treatment" | ≥ 1.5% | ≥ 3% | New title + FAQPage; price (step 9) |
| Cost page, "hair transplant cost in bangalore" | ≤ pos 15 | ≤ pos 8 | Step 9 |
| FUE page, "fue hair transplant in bangalore" | Indexed as a service page | ≤ pos 12 | Step 8 |
| Homepage, "hair transplant bangalore" | ≤ pos 9 | ≤ pos 7 | This PR, step 7 |
| Organic clicks, 28 d | 450+ | 550–650 | All |

## Weekly dashboard (Brilliant Brains, through Ryze)

1. **Leads:** GA4 `generate_lead`, `click_to_call`, `whatsapp_click` by
   `sessionDefaultChannelGroup` and landing page; GBP calls and directions.
2. **Rankings:** GSC position and CTR for the queries in the baseline table, plus top movers.
3. **Health:** `npm run verify:live`, Ryze audit, PageSpeed home and cost.
4. **Reconciliation:** GA4 `generate_lead` vs the lead sheet.

**Annotate every deploy date** in GA4 and Google Ads. Without dates, ranking and conversion
changes cannot be attributed.
