# Verification Report

_Run 2026-09-03 15:40_

## Artifact completeness

Expected **10 artifacts** for each of **59 URLs** = 590 files.

**PASS** — every URL has all 10 artifacts, none zero-byte.


## Structured data

**PASS** — all 59 `schema.jsonld` files parse as valid JSON.

## Screenshots

- Captured: **118** / 118
- Widths: [390, 409, 1440] (desktop 1440 / mobile 390)
- Tallest: 44,723px
- Suspected blank/short: **2**
  - `pages/hair-assessment/screenshot-desktop.png` 1440x900 5854B
  - `pages/hair-assessment/screenshot-mobile.png` 390x844 2743B

## Media

- Download list: **300** URLs
- Retrieved OK: **294**
- Files on disk: **294**
- Failed (genuine 404s, see audit §3): **6**
  - `404|76919|https://neofollicletransplant.com/wp-content/uploads/2025/03/Hair-loss-treatment-before-after.jpeg`
  - `404|77015|https://neofollicletransplant.com/wp-content/uploads/2025/03/GFC-Hair-Treatment-Successful-Result-in-Bangalore-300x208.jpg`
  - `404|76907|https://neofollicletransplant.com/wp-content/uploads/2025/03/noun-experience-7640630-FFF2F2.svg`
  - `404|76967|https://neofollicletransplant.com/wp-content/uploads/2025/05/Dr-Sandeep-Mahapatra-Hair-Transplant-Surgeon.jpeg`
  - `404|76867|https://neofollicletransplant.com/wp-content/uploads/2025/05/Dr-Sandeep-Mahapatra.jpg`
  - `404|76935|https://neofollicletransplant.com/wp-content/uploads/2026/06/the-norwood-scale-stages-of-hair-loss.png`

## Known anomalies (verified real, not capture failures)

- **`hair-transplant-for-receding-hairline` (mobile)** — one `<a>` element extends ~19px past the
  390px viewport. Verified on an unmodified page load, so this is a real (minor) mobile layout nit;
  the document itself does not scroll horizontally. Every other page measures `scrollWidth == innerWidth`
  at both breakpoints — **the site has no horizontal-overflow problem.**
- **`hair-assessment`** — both screenshots are blank and its markdown is 48 bytes. The page is a
  Landbot chatbot shell: its entire `<body>` contains **47 characters** of HTML and the widget is
  injected by third-party JavaScript that never renders. Confirmed independently by direct `curl`
  and by Firecrawl. It is `noindex`, so there is no SEO impact — but there is no content to migrate.
  Its `<title>` is also doubled (`... Neo Follicle Hair TransplantLandbot | Convert a Landing Page`)
  because the Landbot embed injects a second `<title>` tag.
- **Google Maps iframes** render as grey boxes in screenshots (third-party embed, not site content).
- **3 of 289 media records** are counted by the WordPress API but never returned by it, across
  repeated passes with different orderings. All *referenced* assets were captured.


## Archive size

- Total: **467 MB**

## Fidelity spot-check

| Page | Title in archive | Canonical | JSON-LD |
|---|---|---|---|
| `home` | Direct Hair Transplant Clinic in Bangalore | Neo Follicle | trailing-slash OK | 1 block |
| `best-hair-transplant-in-bangalore` | Best Hair Transplant in Bangalore | Neo Follicle Clinic | trailing-slash OK | 1 block |
| `contact-us` | Contact Us – Neo Follicle Hair Transplant | trailing-slash OK | 1 block |
