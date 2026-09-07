# Verification

Capture of <https://preview.raddito.net/folixa/> — 18 URLs (11 pages + 7 blog posts).

- PASS — all 18 pages carry all 12 required files
- PASS — 36 screenshots checked, none blank or near-uniform
- PASS — all 9 colors trace to globals-raw.css
- PASS — all 9 typography tokens resolved
- PASS — section counts match raw HTML on every page
- PASS — 426 image files on disk (426 of 426 URLs returned 200)
- PASS — 13 self-hostable woff2 files (Manrope + Inter)
- PASS — 40 icon glyphs extracted as standalone SVG (Font Awesome inline + jkiticon SVG font + ekiticons WOFF)
- PASS — 60 stylesheets archived
- PASS — 122 per-section desktop crops for 122 sections

**All checks passed.**

## Known gaps

- The Google Maps embed on `contact` renders blank in screenshots — third-party iframe, not part of the theme's own design.
- All 40 icons were recovered as SVG into `assets/icons/svg/`, so no icon needs redrawing.
- Images are the theme's stock photography — reference for crop ratio and composition only.
