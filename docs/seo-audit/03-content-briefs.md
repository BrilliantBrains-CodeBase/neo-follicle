# 03 · Content briefs for the money pages

Every brief is built from Search Console queries (90 days to 27 Oct 2026), the live page, and what ranking competitors do. None of this is in the PR: each needs the clinic's facts and a doctor's review first.

**Medical review rule:** every answer below marked ✍️ DRAFT must be reviewed and approved by Dr. Sandeep Mahapatra's team before publishing. Items marked [CLINIC TO CONFIRM] need a fact only the clinic has. Follow the wording rules in [05-compliance.md](05-compliance.md); `npm run verify` fails on unreviewed claim words in titles and descriptions.

Why this matters: the service pages run 579–1,426 words and their FAQ answers average 7–28 words ("Suitability depends on your consultation."). Search engines and AI answer engines can't rank or quote an answer that doesn't answer. The blog posts on the same site are 2,000–5,000 words and well written, so the team already has the expertise. It just isn't on the pages that convert.

---

## §1 FUE Hair Transplant in Bangalore: convert blog → service page

**URL:** `/fue-hair-transplant-bangalore/` (keep the slug) · **type:** `post` → `page`
**Today:** blog post "The Complete Guide to FUE Hair Transplant", 3,858 words, 76 impressions @ pos 25.6, no FAQ schema.
**Demand evidence:** "fue hair transplant in bangalore" is split across `/` (@13.1), `/unshaven-hair-transplant/` (@12.0) and `/best-hair-transplant-in-bangalore/` (@67.8). Nobody owns it. GBP shows "fue hair transplant" (103 impressions). FUE is listed as a GBP service but has no landing page.
**Title / meta / H1:** set in `content/seo/overrides.json` (`title`, `description`, `h1`), then `npm run gen:seo`.

**Outline (keep the existing guide body and wrap it in the service template):**
1. **Hero:** H1 "FUE Hair Transplant in Bangalore", one-line promise (doctor-planned, natural hairline), CTA buttons (Book assessment · WhatsApp photos). Use `TreatmentHero`; it already renders without a fade-in on the LCP elements.
2. **Is FUE right for you?** Hair loss stage, donor density, age, expectations. Link `/how-many-grafts-do-i-need-for-hair-transplant/`.
3. **FUE vs DHI vs unshaven FUE: what we recommend and when.** A 3-row table. Link `/fue-vs-direct-hair-implantation/` and `/unshaven-hair-transplant/`.
4. **How we plan your grafts.** Use the clinic's own figures from the homepage infographic (hairline and frontal zone 1,200–2,500 grafts; crown 800–1,500). CTA to the AI cost calculator.
5. **FUE cost in Bangalore:** the price table from step 9 (same data as the cost page), what's included, link to the cost page.
6. **Procedure day, step by step** (existing content).
7. **Recovery week by week** (existing). Link `/hair-transplant-recovery-timeline/`.
8. **FUE results:** before/after gallery with month labels, consented patients only.
9. **Who performs your FUE:** doctor-led planning and implantation, the team, credentials. Link the doctor page.
10. **FAQs (8–10)** from real queries: cost per graft · how many grafts in one session · does it leave scars (honest answer: tiny dot scars that are usually not visible with short hair) · pain and anaesthesia · back to work · FUE for women · unshaven option · long-term results.
11. **Lead form** with its own `formId` (e.g. `fue`), so GA4's `generate_lead` reports this page separately.

**Internal links in:** add to the "Hair Transplant Services" nav menu, the homepage services grid, the cost page and the unshaven page.

---

## §2 Hair Transplant Cost in Bangalore: merge + price table

**URL:** `/hair-transplant-cost-in-bangalore/` · merge in `/hair-transplant-cost-bangalore-what-decides-price/`, then 301 (implementation step 9; the rule is already in `public/.htaccess`, commented out).
**Today:** 622 words, 3 FAQ answers averaging 7 words, no ₹ figure. Ranks @20.7 for "hair transplant cost in bangalore" (523 impr) and @15.6 for "hair transplant cost bangalore" (166). The blog on the same topic splits the signals.
**Demand evidence (GBP searches, Jul–Oct):** "hair transplant cost" 965 · "hair transplant cost in bangalore 2026" 187 · "hair transplant cost in bangalore" 136 · "hair plantation cost" 82 · "cost of hair transplant in bangalore" 79 · "how much cost for hair transplant in bangalore" 61 · "hair transplant in bangalore price list" 31 · "hair transplant cost per graft in bangalore" 17.
**What ranking competitors show:** per-graft ranges and tiers (Venkat Center), per-graft tables by technique (Pristyn Care), min/avg/max (ClinicSpots, Bajaj Finserv Health), a graft calculator (Eugenix).

**Outline:**
1. H1 "Hair Transplant Cost in Bangalore (2026): Per-Graft Price and What Changes It"
2. **Price range table** (a small component reading one prices module, so the cost page, FUE page, FAQ answers and calculator cannot disagree) plus "What's included" [CLINIC TO CONFIRM: consultation, procedure, medicines, PRP sessions?, follow-ups]
3. **Cost by graft count.** Worked examples for 1,500 / 2,500 / 3,500 / 4,500 grafts, computed in code from the per-graft min/max (the query "4500 grafts hair transplant cost" exists, @7.7)
4. **What changes your total:** hair loss grade, donor quality, technique (FUE / DHI / unshaven), one or two sessions, add-on therapies. Move these sections from the blog.
5. **Why the cheapest quote can cost more:** doctor-led vs technician-led, inflated graft counts, donor over-harvesting. Link `/unethical-practices-in-hair-transplantation/`.
6. **Payment options / EMI** [CLINIC TO CONFIRM; delete the section if none]
7. **Get your estimate:** AI cost calculator + "WhatsApp us 3 photos" CTA
8. **FAQs.** Expand to these ✍️ DRAFTS:

> **Why isn't there one fixed price?**
> Because no two scalps need the same work. The price mainly depends on how many grafts you need, which comes from your hair loss stage and the area to cover, and on how much healthy donor hair you have. The technique (FUE, DHI or unshaven FUE) and whether you need one or two sessions also change the total. We confirm your graft count and final price after examining your scalp and donor area.

> **How many grafts will I need?**
> It depends on the area and the density you want. As a guide, restoring the hairline and frontal zone often needs about 1,200–2,500 grafts, and the crown about 800–1,500. Your doctor measures your scalp at the consultation, and you can get a first estimate from our AI cost calculator.

> **Does a higher graft count always mean better results?**
> No. More grafts only help if your donor area can safely supply them and they're placed at the right angle and density. Taking too many can leave the back of the scalp visibly thin. A good plan balances coverage today with donor hair you may need later.

> **How much does a 4,500-graft hair transplant cost?**
> At ₹{min}–₹{max} per graft, 4,500 grafts works out to roughly ₹{4500×min}–₹{4500×max} before GST. Cases this large are sometimes split into two sessions for graft safety, and your doctor will tell you whether that applies to you. *(Engineer: render from the prices module; hide the question until prices exist.)*

> **Is GST included? Is the consultation charged?** [CLINIC TO CONFIRM]

---

## §3 Beard Transplant in Bangalore

**Today:** 579 words (the thinnest service page). @10.7 for "beard transplant in bangalore" (312 impr), @13.6 for "beard transplant" (387). "beard transplant cost in bangalore" is a cost-intent gap (page @44.7).
**Add:** price table · a graft-planning section (moustache / goatee / cheeks / full beard) · a recovery timeline · consented result photos labelled by month · 6–8 FAQs.

✍️ **DRAFT FAQ answers** (replace the current 7-word answers):

> **Will the beard grow naturally?**
> Yes. A beard transplant moves hair follicles, usually from the back of the scalp, into the beard area. They keep growing like your own hair, so you can trim, shave and style them. Scalp hair can be slightly finer than beard hair, which is why we match donor hair and implantation angle carefully.

> **Can scars in the beard area be treated?**
> Often, yes. Grafts can be placed into many stable scars from injury, acne or past surgery to help camouflage them. Whether a scar can hold grafts depends on its thickness and blood supply, so your doctor checks it at the consultation.

> **How long before I see results?**
> Transplanted hairs usually shed in the first few weeks, which is expected. New growth typically starts at around 3–4 months, density builds between 6 and 9 months, and the final result is usually visible at around 12 months.

> **How many grafts does a beard transplant need?** [DOCTOR TO CONFIRM typical ranges for moustache / goatee / full beard]

> **When can I go back to work?** [DOCTOR TO CONFIRM; typical guidance: desk work in 2–3 days, no shaving the area for about 10 days]

---

## §4 Unshaven (No-Shave) FUE

**Today:** 667 words. @19.2 for "unshaven hair transplant" (235 impr), @11.1 for "unshaven fue hair transplant" (79), @56.3 for "no shave fue hair transplant" (76). "can we do hair transplant without shaving head" (61 impr @7.2) is a question the page should answer word for word.
**Add:** an H2 "Can you do a hair transplant without shaving your head?" · who qualifies · typical graft limits per sitting [DOCTOR TO CONFIRM] · cost (usually higher per graft) · results · 6 FAQs.

✍️ **DRAFT FAQ answers:**

> **Does everyone qualify for an unshaven transplant?**
> No. It suits people who need a smaller number of grafts, usually to refine the hairline or temples, and who have hair long enough to cover the donor area. Larger sessions or advanced hair loss usually need a shaved or partly shaved donor area. Your doctor checks your graft needs, donor density and hair length before recommending it.

> **Will recovery be less noticeable?**
> Usually, yes. Your existing hair covers the donor and recipient areas from day one, so most people return to work without obvious signs. Aftercare is the same as a standard transplant: protect the grafts, wash as instructed, and avoid strenuous exercise for as long as your doctor advises.

> **Will results differ from a regular transplant?**
> The grafts grow the same way. The difference is how many can be moved in one sitting: extracting between longer hairs takes more time, so sessions are usually smaller. If you need a lot of coverage, standard FUE may be the better choice.

---

## §5 Failed Hair Transplant Repair

**Today:** 609 words. 1,438 impr @6.3, CTR 0.28%. High-value patients who already distrust clinics. The blog `/why-hair-transplants-fail/` gets 903 impressions with 0 clicks, so link the two pages both ways.
**Add:** common failure patterns (unnatural hairline, low density, donor over-harvesting, poor graft survival) · how a repair is assessed · what repair can and can't do (honest limits) · consented before/after photos · 6 FAQs.

✍️ **DRAFT FAQ answers:**

> **Can every failed transplant be corrected?**
> Not always. What's possible depends mostly on how much healthy donor hair remains and on what was done before. Many cases can be improved by refining the hairline, adding density, or camouflaging donor scarring, sometimes with scalp micropigmentation. Your doctor will tell you honestly what can and can't be achieved after examining your scalp.

> **Will I always need more grafts?**
> Not necessarily. Some repairs mainly involve removing or re-angling poorly placed grafts, or treating the donor area, rather than adding many new ones. The plan depends on your examination.

> **How is my donor area protected?**
> We first check how much donor hair is left and how thin it already is. We extract only what can be taken safely, and spread extraction out so the back of the scalp doesn't look patchy. Protecting what remains comes before adding density.

---

## §6 GFC Hair Treatment (CTR fix)

**Today:** ranks 3.2–3.4 for "gfc treatment" and "gfc hair treatment" (3,094 impr combined) but CTR is 0.14–0.41%. Searchers also want "gfc before and after" (237) and "gfc results after 3 sessions" (227, @1.1).
**Add:** price per session (the step 9 price table) · an H2 "GFC results after 3 sessions" with consented before/after photos labelled by session · number of sessions and interval [DOCTOR TO CONFIRM]. The FAQs are already strong (10, averaging 28 words) and now carry FAQPage schema (this PR); the new title targets the CTR gap.

## §7 Exosome Hair Treatment

**Today:** @4.7 for "exosomes hair treatment price" (1,821 impr) but @34 for "exosomes hair treatment" (901). Price intent dominates.
**Add:** price per session · an honest "What the research shows so far" section (evidence is emerging and long-term data is limited; doctor-written, which builds trust and keeps you compliant) · a comparison table with PRP and GFC linking `/gfc-vs-exosome-vs-qr678-hair-treatment/` · result photos.

## §8 Homepage (head terms)

**Today:** organic @10.0 for "hair transplant bangalore" (3,640 impr), @10.8 for "best hair transplant in bangalore" (1,678), @11.4 for "hair transplant in bangalore" (1,584). The local pack already ranks 2–3.
**Add / strengthen:**
- A "Hair transplant cost in Bangalore" summary block with the price range and a link to the cost page
- An FUE / DHI / unshaven services row linking each service page
- Verifiable trust facts (years, procedures, credentials, the **same** figures as GBP; see [04 §1](04-gbp-gsc-offsite.md))
- The Google rating shown as text with a link to the Google reviews. **Do not** add `AggregateRating` schema for the clinic on its own site: Google treats it as self-serving and ignores it.
- After the step 7 consolidation, the homepage is the single target for "hair transplant in Bangalore" queries.

---

## Measuring content impact

For each page, record in Search Console before publishing, then again at 28 and 56 days: impressions, clicks, CTR and average position for the queries listed above. Annotate the publish date in GA4.
