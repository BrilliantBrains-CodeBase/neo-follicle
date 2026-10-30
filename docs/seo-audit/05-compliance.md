# 05 · Healthcare claims: rules, what changed, what needs sign-off

Neo Follicle is a medical practice. Google and Meta ad policies, the NMC's professional-conduct
rules for doctors, the Drugs and Magic Remedies (Objectionable Advertisements) Act and ASCI's
healthcare guidelines all penalise exaggerated claims. The rules below apply to every title,
meta description, H1, alt text, FAQ answer, GBP description and ad.

> A practical marketing checklist, not legal advice. For anything borderline, ask the clinic's
> legal or medical-ethics advisor.

## 1. Never write

| Don't | Why | Write instead |
|---|---|---|
| "Best", "No. 1", "#1", "top", "leading" about the clinic or doctor | Unverifiable superlatives | "Doctor-led", "dermatologist-planned", or the fact ("MD Dermatology, certified DHI specialist") |
| "100% natural", "100% success", "guaranteed" | Outcome guarantees | "Natural-looking results planned around your hairline"; "results vary" |
| "Permanent results" as a promise | Native hair keeps thinning; transplanted hair is long-lasting, not guaranteed | "Transplanted follicles typically keep growing long-term" + explain native hair loss |
| "No side effects", "painless", "scarless", "no scars", "completely safe" | Untrue as absolutes | "Usually comfortable"; "tiny dot scars that are usually not visible"; "side effects are usually mild and short-lived" |
| "FDA approved" without naming what was cleared, by whom | Often wrong (the US FDA does not approve products for India; India's regulator is CDSCO) | Name the device or drug, the regulator and the indication — or drop it |
| A specialty title the doctor does not hold ("plastic surgeon") | Misleads patients | The qualification held: MBBS, MD (Dermatology) |
| Unconsented patient photos or names | Privacy and consent | Written consent for every before/after |
| "Starting at ₹X" bait | Misleading | A real from–to range + "final quote after assessment" |

## 2. Where the site stands after this PR

**Enforced in code.** `npm run verify` now fails if any page's `<title>`, meta description or
share-card text (og:image:alt) — the noindex Google Ads landing pages included — contains best,
No. 1 / number 1, #1, top-rated, "top <surgeon|clinic|doctor…>", "leading <clinic|surgeon…>",
guaranteed, 100% / 100 percent, permanent, painless / pain-free, scarless / scar-free, no scars,
no / zero side effects, no risk / risk-free, completely safe, FDA-approved or cure — unless the
line is in `CLAIM_ALLOW` in `scripts/verify-seo.mjs` with the reason. Body copy is not scanned
(it is full of legitimate negations such as "no ethical surgeon promises 100% growth"); it was
reviewed by hand (§3). Exceptions today:

| Page | Term | Why it is allowed |
|---|---|---|
| `/best-hair-transplant-in-bangalore/` | "Best" in the title | **Open decision.** The title matches the query people type ("best hair transplant in bangalore", 1,678 impr to the homepage). Options: keep it; change to "Hair Transplant in Bangalore \| FUE, DHI & NFT – Neo Follicle"; or resolve it by consolidating the page into `/` (implementation step 7). The clinic decides. |
| `/how-to-choose-the-best-hair-transplant-clinic-bangalore/` | "best" | The reader choosing, not a claim |
| `/fue-vs-direct-hair-implantation/` | "best" | "…which technique may suit you best" |
| `/prp-vs-gfc-for-hair-loss/` | "Best" | "Which Is Best for You?" |
| `/is-hair-transplant-permanent/` | "Permanent" | The question the post answers; the description hedges ("can last") |
| `/best-hair-transplant-clinic-lp/` (noindex, Google Ads) | "Best" in title and H1 | **Open decision**, with the Ads team: the headline mirrors the ad keyword for message match. Options: keep; or "Hair Transplant Clinic in Bangalore — Doctor-Led FUE & DHI". |
| `/best-hair-transplant-surgeon-in-bangalore-lp/` (noindex, Google Ads) | "Top Hair Transplant Surgeon" | **Open decision**, same as above. Option: "Hair Transplant Surgeon in Bangalore — Dr. Sandeep Mahapatra, MD Dermatology". |

**Changed in this PR:**

- 12 share cards, `og:image:alt`, breadcrumbs and `llms.txt` links no longer say "Best…"
  (`seo: stop share cards…`). Dutexome's visible H1 dropped "Best".
- The new titles and descriptions for 10 pages contain no claim words.
- The LLLT meta description said "painless" → "comfortable".
- FAQ answers, step headings, benefit cards and homepage FAQ answers reworded (§3) —
  **need sign-off**.
- The homepage FAQPage schema was the old WordPress FAQ (8 questions not on the page, one
  being "Why is Neo Follicle Transplant considered the Best Hair Transplant Clinic in
  Bangalore?"). It is now built from the visible FAQ, so the schema says exactly what the page says.
- The homepage FAQ said "Open 10 am to 8 pm, all days" (the clinic is closed on Tuesday); it
  now reads the site's hours setting.

**Still on the site, for review (not changed, because the blog copy is checked word-for-word
against the WordPress capture by `npm run verify:posts`, so edits there are deliberate):**

- "Where applicable, we use US-FDA approved technologies" on
  `/hair-transplant-india-international-patients/` — name the cleared device or drop it.
- "US-FDA approved for androgenetic alopecia" (minoxidil) and "for male pattern hair loss"
  (finasteride) on `/medical-treatments-for-hair-loss/` are specific and accurate — fine.
- `/fue-vs-direct-hair-implantation/` quotes "scarless" and "painless" as what *other* clinics
  claim — fine.
- Slugs containing "best" stay: changing URLs costs more ranking than it buys.
- A video on the site is titled "Hairline Marking | Hair Transplant in Bangalore | Best Hair
  Transplant Surgeon India" — that is the YouTube video's own title. Rename it on YouTube and the
  site follows on the next `npm run gen:videogallery`.

**On the Google Business Profile** (04 §1): "best trichologist", "one of the best hair transplant
surgeon in India", "100% natural…", "no side effects", "a permanent and natural way", "US FDA
approved cold beam laser", "best possible graft survival", and the "Plastic Surgeon" / "Cosmetic
Surgeon" services. These are the most visible claims the clinic makes — the profile gets more
views than the website.

## 3. FAQ answers reworded in this PR — medical sign-off needed before merge

Each is marked in code with "Reworded Oct 2026 … Pending medical sign-off".

| Page | Before | After |
|---|---|---|
| PRP (`best-prp-hair-treatment-in-bangalore.ts`) | "Yes, it's completely safe… no risk of allergies or side effects." | "PRP is generally well tolerated. It is prepared from your own blood, so allergic reactions are rare. Mild tenderness, redness or swelling at the injection sites is common and usually settles within a day or two. Your doctor confirms that PRP suits you before treatment." |
| GFC (`gfc-hair-treatment-in-bangalore.ts`) | "Yes, it's completely safe… There are no allergic reactions…" | "GFC is generally well tolerated because it is prepared from your own blood, so allergic reactions are rare. The most common effects are slight redness or tenderness at the injection sites, which usually fade within a few hours. Your doctor reviews your health history before recommending it." |
| Medical tourism (`hair-transplant-medical-tourism-in-bangalore.ts`) | "Yes, transplanted hair is permanent, natural, and grows for life." | "Transplanted follicles are taken from areas that are usually resistant to hair loss, so they typically keep growing long-term. Your existing, non-transplanted hair can still thin over time, so we also guide you on scalp care and, where needed, medical treatment to protect it." |
| LLLT (`low-level-laser-therapy.ts`) | "Not at all! The treatment is completely painless." | "Most people find it comfortable. You may feel a mild warmth or tingling on the scalp during the session. There are no needles, and you can return to your normal day straight afterwards." |
| QR678 (`qr678-hair-treatment-in-bangalore.ts`) | "Yes! It's clinically tested, FDA-approved in India, and US-patented… no reported long-term side effects." | "QR678 is a patented, clinically tested peptide formulation, and it is generally well tolerated. Mild redness or tenderness at the injection sites can occur and usually settles quickly. Your doctor reviews your health history and explains the expected benefits and risks before you start." **[CLINIC TO CONFIRM the product's actual regulatory status before adding any approval claim back.]** |

Two step headings, same review:

| Page | Before | After |
|---|---|---|
| LLLT, "How it works" step 3 | "Gentle, Painless Stimulation" | "Gentle, Comfortable Stimulation" (the body already said "comfortable") |
| Hair conditions we treat, "Why choose us" | "Safe, Painless, and Affordable" | "Comfortable, Doctor-Planned and Affordable" |

Found by the independent review in the built pages, same review:

| Page | Before | After |
|---|---|---|
| Hair conditions we treat, "State-of-the-Art Implanters" | "…for scar-free precision." | "…for precise, minimally visible extraction." |
| Hair conditions we treat | "Natural & Permanent Results — Our hair restoration procedures ensure a fuller, thicker, and undetectable hairline with lasting effects." | "Natural-Looking, Long-Lasting Results — Hairlines are designed to look natural and fuller, using donor hair that usually keeps growing long-term." |
| PRP, benefits | "Safe and non-allergic — Uses your own blood, so there is no risk of rejection." | "Made from your own blood — Prepared from your own blood, so allergic reactions are rare." |
| GFC, benefits | "…so there is no risk of an allergic reaction." | "…so allergic reactions are rare." |
| Homepage FAQ, "Is a hair transplant safe…?" | "…it is a safe day-care procedure." | "…it is generally a safe day-care procedure." |
| Homepage FAQ, "Are the results permanent and natural?" | "…taken from permanent donor zones and continue to grow for life." | "…taken from donor areas that are usually resistant to hair loss, so they typically keep growing long-term. … Your existing hair can still thin, so we also guide you on protecting it." |
| Cost landing page FAQ (noindex) | "advanced scarless techniques (like NFT)" | "minimally invasive techniques (like NFT)" |

The FAQPage schema is built from the same text, so it updates with the page.

## 4. Before indexing the AI cost calculator

`/ai-hair-transplant-cost-calculator/` stays `noindex` until:

- [ ] It shows an **estimate range** with "not a medical diagnosis / final quote after assessment"
- [ ] It promises no outcome ("you will get X density")
- [ ] Any photo upload is covered by the privacy policy, with a consent line beside the upload
- [ ] Its prices come from the same module as the cost page (implementation step 9)

## 5. Schema rules

- `Offer` / price schema only with real prices the clinic honours.
- No `AggregateRating` or `Review` schema for the clinic on its own site (Google treats it as
  self-serving). Show the Google rating as text with a link instead.
- `FAQPage` must match the visible FAQ exactly — `npm run verify` checks this question for question.
- Physician identifiers (registration number, `sameAs`) only from verified sources.
