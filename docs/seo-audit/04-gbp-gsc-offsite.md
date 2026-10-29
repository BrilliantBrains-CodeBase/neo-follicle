# 04 · Google Business Profile, Search Console and off-site

No code. Brilliant Brains can make the GBP and Search Console changes through Ryze
(both are connected); every GBP change below needs the clinic's approval first,
because it changes what the clinic says about itself. The facts in §1 were read
from the verified profile through the GBP API on 29 Oct 2026 — nothing was
changed.

## 1. Google Business Profile — "Neo Follicle Hair Transplant" (Marathahalli)

**Why it matters most:** in 90 days the profile drove **769 calls, 1,644 direction
requests and 440 website clicks** from 34,656 impressions, and the local pack
(position 2–3) outranks the website (~10) on head terms.

| # | Item | Today | Change to |
|---|---|---|---|
| 1 | Website URL | `https://www.neofollicletransplant.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb` | `https://neofollicletransplant.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb` — the apex host, so there is no redirect hop. UTMs unchanged so GA4 history continues. |
| 2 | Services under the *Surgeon* category | "Plastic Surgeon", "Cosmetic Surgeon", "Cosmetologist", "Hair Transplant Surgeon" | **Remove "Plastic Surgeon" and "Cosmetic Surgeon"** unless a doctor with an MCh/DNB in Plastic Surgery practises here: in India those words are read as that specialty, and the listed doctor is MBBS, MD (Dermatology). Keep "Hair Transplant Surgeon". [CLINIC TO CONFIRM] |
| 3 | Other services | "Cosmetic Surgery", "Laser hair reduction", "Skin Care", "Chemical Treatment", "Microbalding" (sic) | Keep only what this clinic offers; Derma Solutions services belong on its own profile. Fix "Microbalding" → "Microblading" if offered. Is **FUT** (listed) offered? The site describes FUE, DHI and NFT only. [CLINIC TO CONFIRM] |
| 4 | "in Bangalore, **Kochi**, India" | In 8 service names | Remove "Kochi" unless a Kochi clinic operates. The website covers Bangalore only. |
| 5 | Self-claims in service names | "Best Trichologist in Bangalore, Kochi, India"; "Best hair transplant surgeon in Bangalore, Kochi, India" | "Cosmetic hair replacement"; "Hair transplant surgeon — Dr. Sandeep Mahapatra" |
| 6 | Claims in service descriptions | "one of the leading & best trichologist", "one of the best hair transplant surgeon in India", "100% natural human virgin hair", "100% natural looking hair", "no side effects" (PRP, laser), "a permanent and natural way" (beard, eyebrow), "US FDA approved cold beam laser", "the best possible hair graft survival", "Unlike other… does not leave… stitches" | The rewrites in §1.1, following [05-compliance.md](05-compliance.md) |
| 7 | Profile description | "Established in 2015… using the best and most advanced hair treatment technologies…" | §1.1 draft |
| 8 | Experience figures | Service text: "more than 12 years… over 3000 hair transplants". Website and `llms.txt`: "20+ years… 10,000+". Profile: "Established in 2015" | One verified set of figures everywhere. Clinic-since-2015 and doctor's-20-years can both be true — say which is which. [CLINIC TO CONFIRM] |
| 9 | Hours | 10:00–19:30, closed Tue | Website, schema and `llms.txt` say 10:00–19:00. Pick one. If GBP is right, change `CONTACT.openingHours` and `openingHoursDisplay` in `src/config/site.ts` and rebuild. [CLINIC TO CONFIRM] |
| 10 | Google-suggested edits | The API reports `hasGoogleUpdated: true` | Open the profile and accept or reject Google's pending edits, so the listing says what the clinic decides. |
| 11 | Unreplied reviews | 9 of the latest 25, including one 3★ | Reply within 48 h. Never add medical details or confirm someone is a patient beyond what they wrote. |
| 12 | Off-topic reviews | Some describe Derma Solutions procedures | Ask those patients to review the Derma Solutions profile. |
| 13 | Posts | — | One a week: a consented result, an FAQ answer or a doctor tip, linking the matching page with `utm_campaign=gmb_post`. |
| 14 | NeoSculpt Whitefield | Mentioned in reviews | At launch: its own verified GBP, location page and NAP (implementation step 12). "hair transplant whitefield" already gets 65 impr @ 9.4. |

### 1.1 Draft rewrites (for the clinic's approval)

**Profile description:** "Neo Follicle Hair Transplant is a doctor-led hair restoration clinic in
Marathahalli, Bangalore, established in 2015. Treatment plans are made by Dr. Sandeep Mahapatra
(MBBS, MD Dermatology, certified DHI specialist): FUE and DHI hair transplants, beard and eyebrow
restoration, and non-surgical options including PRP, GFC and scalp micropigmentation. Every plan
starts with a scalp and donor assessment, and results vary from person to person."

**Hair transplant surgeon — Dr. Sandeep Mahapatra:** "Dr. Sandeep Mahapatra (MBBS, MD Dermatology,
certified DHI specialist) plans and leads hair transplants at Neo Follicle, using the clinic's NFT
approach to FUE and direct implantation. He has [CLINIC TO CONFIRM: years] years of experience in
hair restoration and has trained hair transplant surgeons in India and abroad."

**FUE hair transplant:** "Follicles are moved one by one from the donor area to thinning areas,
with the hairline designed around your face and future hair loss. Planning is done by an MD
dermatologist. Graft count and cost are confirmed after a scalp and donor assessment."

**Beard / eyebrow restoration:** "Hair follicles, usually from the back of the scalp, are placed
to restore a missing, thin or scarred beard (or eyebrows). Transplanted hair keeps growing like
your own and can be trimmed and styled. Suitability is decided at a consultation."

**PRP:** "Platelet-rich plasma uses growth factors from your own blood to support weak hair
follicles. It is planned by our dermatologists, usually as a course of sessions, and can be
combined with a transplant. Side effects are usually mild and short-lived; your doctor will
explain what to expect."

**Laser therapy (LLLT):** "A non-surgical treatment that uses low-energy light on the scalp to
support thinning hair, usually alongside medical treatment or PRP. The number of sessions is
decided after a scalp assessment." (Name the device and its clearance only if the clinic can
show it.)

**Cosmetic hair replacement:** "A non-surgical option for advanced hair loss: a custom human-hair
system matched to your hair's colour, texture and density, and styled to suit you."

## 2. Search Console (`sc-domain:neofollicletransplant.com`)

**Remove the stale sitemaps** (Sitemaps → ⋮ → Remove sitemap). Keep only
`https://neofollicletransplant.com/sitemap.xml`.

| Sitemap | Last submitted | Issue |
|---|---|---|
| `https://www.neofollicletransplant.com/sitemap.xml` | 2025-06-09 | Duplicate on the www host |
| `https://www.neofollicletransplant.com/sitemap-taxonomy-category.xml` | 2025-05-26 | 1 error, www host |
| `https://www.neofollicletransplant.com/sitemap-post-type-post.xml` | 2025-05-26 | www host |
| `https://www.neofollicletransplant.com/sitemap-post-type-page.xml` | 2025-05-26 | www host |
| `http://www.neofollicletransplant.com/post_tag-sitemap.xml` | 2017-12-13 | 1 error, Yoast era (now 301s to `/sitemap.xml`) |
| `http://www.neofollicletransplant.com/sitemap_index.xml` | 2017-12-09 | 1 error, Yoast era (now 301s to `/sitemap.xml`) |

**After the deploy:** URL Inspection → Request indexing for `/`,
`/hair-transplant-cost-in-bangalore/`, `/gfc-hair-treatment-in-bangalore/`,
`/exosome-hair-treatment-in-bangalore/`, `/beard-transplant-in-bangalore/`,
`/unshaven-hair-transplant/`, `/eyebrow-restoration-in-bangalore/`,
`/failed-hair-transplant-repair-in-bangalore/`, `/scalp-micropigmentation-in-bangalore/`,
`/best-prp-hair-treatment-in-bangalore/`
(new titles) and one treatment page to confirm the FAQ enhancement appears.

**Connect Google Ads to Ryze.** It is the only major source not connected; paid and organic
should be read together for cost and FUE terms.

## 3. Off-site authority (next 90 days)

| Action | Why |
|---|---|
| Keep Practo, Justdial, Apollo 24/7, KiviHealth and DocIndia consistent (name, address, phone, hours, years) | They are in the schema `sameAs`; inconsistent NAP weakens local ranking |
| 2–3 earned features (Deccan Herald, The Hindu MetroPlus, Bangalore Mirror health pages) | A competitor ranks with a Deccan Herald feature; `/media-coverage/` collects these |
| Doctor-authored articles on dermatology or health portals | Builds the Physician entity for "dr sandeep mahapatra" (pos 18.1; another doctor shares the name) |
| One YouTube short per service page (explainer or consented result), embedded on that page | 288 Organic Video sessions in 90 days |
