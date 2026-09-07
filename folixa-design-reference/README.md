# Folixa — Design Reference

A complete capture of the **Folixa** Elementor Template Kit
(<https://preview.raddito.net/folixa/>), the chosen visual design for the
neofollicletransplant.com rebuild.

**Two references feed the rebuild.** This one supplies *form* — layout, color, type, motion.
`../neofollicle-seo-backup/` supplies *content and SEO* — every title, meta tag, JSON-LD graph and
URL that must carry over. Neither is a substitute for the other.

## Start here

| File | What it is |
|---|---|
| [`DESIGN.md`](DESIGN.md) | **The design system.** Colors, type, rhythm, motion, components — written to be handed to a developer or an agent as the sole design input. |
| [`00-INVENTORY.md`](00-INVENTORY.md) | All 18 URLs with section, widget and screenshot counts |
| [`tokens/tailwind.config.js`](tokens/tailwind.config.js) | Drop straight into the Vite project |
| [`reports/components.md`](reports/components.md) | The ~12 components that cover the whole site |
| [`reports/animations.md`](reports/animations.md) | Motion inventory + what to drop |
| [`reports/verification.md`](reports/verification.md) | Proof the capture is complete |

## The one thing to know

**Folixa is not a Tailwind site.** It is WordPress + Elementor 4.2.4 (`hello-elementor`,
`jeg-elementor-kit`, `elementskit-lite`, `metform`). Its design system lives in an Elementor
**Global Kit** — a set of CSS custom properties in
`wp-content/uploads/sites/226/elementor/css/post-6.css`, archived verbatim as
`tokens/globals-raw.css`.

That turned out to be an advantage: the Global Kit is a machine-readable design system, so the
tokens in `tokens/` are a *translation* of exact values rather than a reverse-engineering of
compiled classes. Every value in `DESIGN.md` traces to a source file.

## Layout

```
DESIGN.md                    the design system
00-INVENTORY.md              all 18 URLs
tokens/
  tailwind.config.js         Elementor globals -> Tailwind theme
  tokens.css                 the same tokens as CSS custom properties
  tokens.json                machine-readable
  globals-raw.css            Elementor Global Kit, verbatim (source of truth)
pages/<slug>/
  raw.html                   server HTML - authoritative for meta + JSON-LD
  rendered.html              post-JavaScript DOM (Firecrawl)
  content.md                 clean readable copy
  body-text.txt              plain text, for diffing after the rebuild
  meta.json                  title / meta / og / link-rel
  schema.jsonld              JSON-LD graph (where present)
  headings.json              h1-h6 outline in document order
  images.json                every <img> with alt, dimensions, srcset
  links.json                 internal vs external
  sections.json              ordered section anatomy with resolved CSS
  elementor.json             widget tree
  screenshot-desktop.png     full-page 1440px
  screenshot-mobile.png      full-page 390px
  sections/NN-<name>.png     per-section desktop crops
assets/
  images/                    theme media, in original /uploads/ paths
  fonts/                     Manrope + Inter woff2, self-hostable
  icons/                     icon-font CSS + 12 extracted Font Awesome SVGs
  css/                       all 60 stylesheets
reports/                     motion, components, verification, raw logs
tools/                       the capture scripts, re-runnable end to end
```

## How this was captured

- **Elementor renders server-side**, so `raw.html` is a complete document — it is authoritative
  for meta tags and JSON-LD. Firecrawl supplied `rendered.html` and clean markdown on top.
- **Firecrawl's `metadata.description` was not trusted.** It returns body text on pages lacking a
  real meta tag, which would silently corrupt the record. Meta is parsed from `raw.html`.
- **Screenshots defeat two traps.** Elementor holds animated elements at `opacity: 0` via
  `.elementor-invisible` until they scroll into view (272 elements site-wide), and most images are
  `loading="lazy"`. The capture script force-loads images, scroll-primes the page, then releases
  the animation gate — otherwise long screenshots come out with blank bands. It targets Elementor's
  own classes rather than a blanket `* { opacity: 1 }`, which would also reveal off-canvas menus
  meant to stay hidden.
- **Sections carry their own CSS.** Each entry in `sections.json` has the declarations that target
  it, resolved across the page's `post-<id>.css` plus the header (`1741`), footer (`1736`) and
  shared (`551`) templates — so a section is rebuildable from that entry alone.
- **Assets were cross-referenced** from the WordPress REST manifest *and* every URL referenced in
  the HTML, which catches files the REST API alone misses.

## Re-running

```bash
tools/01-inventory.sh      # enumerate URLs + media from the WP REST API
tools/02-fetch-raw.sh      # raw.html for all 18 URLs
tools/03-firecrawl.sh      # rendered DOM + markdown (needs an authenticated firecrawl CLI)
tools/05-css.sh            # all stylesheets
tools/06-assets.sh         # images, fonts, icon CSS
.venv/bin/python tools/04-extract.py       # meta, outline, links, section anatomy
.venv/bin/python tools/08-tokens.py        # tokens.json / tokens.css / tailwind.config.js
.venv/bin/python tools/10-motion-icons.py  # motion + icon inventory, extracts FA SVGs
node tools/07-screenshots.mjs              # long screenshots + section crops
.venv/bin/python tools/11-inventory-md.py  # 00-INVENTORY.md
.venv/bin/python tools/09-verify.py        # reports/verification.md
```

Requires: `firecrawl` CLI (authenticated), Node with `playwright`, and the local `.venv`
(`beautifulsoup4`, `lxml`, `pillow`).

## Known gaps

- The Google Maps embed on `contact` renders blank in screenshots — a third-party iframe, not part
  of the theme's own design.
- All 40 icons were recovered as SVG into `assets/icons/svg/` — 12 inlined by Elementor, 27 pulled
  from the jkiticon IcoMoon SVG font, 1 from `elementskit.woff` via fontTools. No icon needs
  redrawing.
- Images are the theme's stock photography — reference for crop ratio and composition only, to be
  replaced with real NeoFollicle imagery.
