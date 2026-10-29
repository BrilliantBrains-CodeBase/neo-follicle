# GTM: GA4 lead events + Google Ads trigger fixes

The site now pushes these events (`src/analytics/track.ts`). GTM needs tags for them.

| dataLayer event | GA4 event (tag in the import) | GA4 key event? |
|---|---|---|
| `nf_generate_lead` (form_id, service, page_path) | `generate_lead` | **Yes**: primary |
| `nf_click_to_call` (link_location, link_text, page_path) | `click_to_call` | **Yes** |
| `nf_whatsapp_click` (link_location, link_url, page_path) | `whatsapp_click` | **Yes** |
| `nf_directions_click` | `get_directions` | No |
| `nf_email_click` | `email_click` | No |

## 1. Import the GA4 tags (5 min)

GTM → Admin → **Import Container** → `GTM-NCJCP6NZ_ga4-lead-events_MERGE-IMPORT.json` → New workspace → **Merge → Rename conflicting**. This adds 5 GA4 event tags, 5 custom-event triggers and 7 variables, and touches nothing that exists. Preview → submit a test lead, tap Call and WhatsApp → each GA4 tag fires once → Publish.

Then in GA4 (property 382048767, stream `G-60VM8Z9GGR`): Admin → Events → **Mark as key event** for `generate_lead`, `click_to_call`, `whatsapp_click`. Add event-scoped custom dimensions `form_id`, `service`, `link_location`.

## 2. Fix the Google Ads conversion triggers (10 min, recommended)

What the live container does today (read from `gtm.js?id=GTM-NCJCP6NZ`, 29 Oct 2026):

| Ads conversion (AW-17634982192) | Label | Fires on |
|---|---|---|
| Call | `ti5hCIvx0vYbELDygdlB` | **Two tags**: GTM link click with URL contains `tel`, *and* a second tag on URL contains `tel:`. **Both fire on every tap, so call conversions are very likely counted twice.** |
| WhatsApp | `DYyBCNGtkOscELDygdlB` | GTM link click, URL contains `wa.me/919731207940` |
| Lead (form) | `fO60COqigrQcELDygdlB` | Page view (`gtm.js`) where the URL contains `thank-you` |

Steps:
1. **Call:** keep one of the two Call tags and delete the duplicate. Change its trigger from the link-click trigger to **`CE - nf_click_to_call`** (created by the import).
2. **WhatsApp:** change its trigger to **`CE - nf_whatsapp_click`**.
3. **Lead:** leave it as is. Thank-you pages load GTM immediately (`scripts/prerender.mjs`).
4. Preview, then publish. Annotate the date in Google Ads: call conversions should drop (the duplicate is gone) while true calls stay the same.

Why: GTM's link-click listener only exists once GTM has loaded. `scripts/prerender.mjs` already loads GTM **immediately** for every ad-attributable visit (a gclid/gbraid/wbraid in the URL, a `_gcl_*` Ads cookie, thank-you and LP pages), so paid tracking works as before even without step 2. Step 2 makes it robust in every case, because the `nf_*` events are queued in `dataLayer` from the first tap and processed whenever GTM boots.

**Do not** also import the GA4 key events into Google Ads as primary conversions, or conversions get counted twice. Import them as secondary (observation) if wanted.

## 3. Container hygiene

The container is ~488 KB (16 tags, including a paused one). Delete paused and retired tags. Every KB removed is parsed on every page.
