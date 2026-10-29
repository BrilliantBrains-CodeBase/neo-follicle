# Work in progress — paused 29 Oct 2026, 19:2x IST

Delete this `_wip/` folder before the PR is merged.

## Done and committed on `seo/ryze-audit-fixes`
All code changes, both verifiers, the docs set, and three follow-up commits
from the independent review (FAQPage sync with the visible FAQ, remaining
absolute claims + homepage hours, accessible text shade + label-in-name).
`npm run build`, `typecheck`, `verify` (29/29), `verify:posts`,
`verify:treatments`, `verify:gallery`, `verify:media` all pass at HEAD.

## Left to do (est. 45–60 min)
1. Docs corrections from the review (~20 min)
   - 01-findings.md: step numbers (GTM = steps 3–4, GSC = 5, GBP = 6);
     "no ₹ figure on any page" is wrong — the homepage FAQ publishes
     ₹60–₹100 per graft; FAQPage totals now 17 → 43 graphs / 100 → 263.
   - README.md: GTM import is step 3 (not 6); "revert on their own" —
     09cd626 and 6708f3b depend on each other; FAQ/axe numbers.
   - 02: rollback note (above); step 7.4 file list add
     src/content/treatments/hair-conditions-we-treat.ts and
     hair-transplant-for-men-in-bangalore.ts.
   - 03 §1: visible H1 of a treatment-template page comes from
     src/content/treatments/*.ts; overrides.json `h1` only sets the SEO h1.
   - 04 §1 item 9 / 05: homepage FAQ hours now come from CONTACT; LP
     headlines "Best"/"Top" listed as an Ads decision; homepage FAQPage
     rebuilt; YouTube video title "Best Hair Transplant Surgeon India".
   - 05 §3: add the new rewrites (hair conditions ×2, PRP/GFC cards, home
     FAQ ×2, cost LP).
   - a11y commit e363908 said "every page"; ee7c97f completes it — say so.
2. Rupee font subsets: content-hash the filenames (immutable cache) (~5 min).
3. Re-measure (~15 min): Lighthouse a11y on 6 templates, visual diff for
   the text shade, verify-live on Apache; refresh reports/.
4. Final PR description (draft: pr-description-draft.md), delete `_wip/`,
   push, open the PR via the REST API (~10 min).
