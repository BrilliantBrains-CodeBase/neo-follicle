# Structured Data Index

Every one of the **59 pages** carries exactly one `<script type="application/ld+json">` block containing a `@graph`.
All 59 blocks **parse as valid JSON**.

This is the single most valuable and most fragile SEO asset on the site — the homepage graph alone is 17 nodes / 26 KB.
It is emitted server-side, so it is preserved in `pages/<slug>/schema.jsonld` (pretty-printed) and in `raw.html`.

## Type coverage

| Type | Pages |
|---|---|
| `ContactPage` | 59 |
| `ContactPoint` | 59 |
| `LocalBusiness` | 59 |
| `MedicalClinic` | 59 |
| `Organization` | 59 |
| `Person` | 59 |
| `Physician` | 59 |
| `SearchAction` | 59 |
| `Service` | 59 |
| `WebSite` | 59 |
| `BreadcrumbList` | 58 |
| `ReadAction` | 57 |
| `WebPage` | 57 |
| `MedicalWebPage` | 30 |
| `ImageObject` | 20 |
| `Article` | 19 |
| `FAQPage` | 14 |
| `BlogPosting` | 14 |
| `MedicalTherapy` | 8 |
| `ItemList` | 5 |
| `MedicalCondition` | 5 |
| `MedicalProcedure` | 5 |
| `CollectionPage` | 4 |
| `AboutPage` | 1 |
| `ProfilePage` | 1 |
| `OfferCatalog` | 1 |
| `ImageGallery` | 1 |
| `VideoGallery` | 1 |

## FAQPage coverage — 14 pages, 82 questions

Rich-result eligible. Every question/answer pair must survive the rebuild verbatim.

| Page | Questions |
|---|---|
| `donor-area-planning-hair-transplant` | 8 |
| `female-hair-loss` | 4 |
| `fue-vs-direct-hair-implantation` | 4 |
| `hair-transplant-for-receding-hairline` | 4 |
| `hair-transplant-india-international-patients` | 8 |
| `hair-transplant-myths-vs-facts` | 12 |
| `hair-transplant-recovery-timeline` | 10 |
| `home` | 8 |
| `how-many-grafts-do-i-need-for-hair-transplant` | 4 |
| `how-to-choose-the-best-hair-transplant-clinic-bangalore` | 4 |
| `is-hair-transplant-painful` | 4 |
| `is-hair-transplant-permanent` | 4 |
| `male-pattern-hair-loss` | 4 |
| `natural-hairline-design-hair-transplants` | 4 |
