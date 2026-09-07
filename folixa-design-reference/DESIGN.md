# Folixa — Design System

The complete design reference for rebuilding **neofollicletransplant.com** in Vite + Tailwind.

Everything here was extracted from the live theme at <https://preview.raddito.net/folixa/> and is
traceable to a source file. Nothing is estimated by eye. Ready-to-use tokens are in
[`tokens/tailwind.config.js`](tokens/tailwind.config.js).

> **The theme is not Tailwind.** Folixa is WordPress + Elementor 4.2.4 (`hello-elementor`,
> `jeg-elementor-kit`, `elementskit-lite`, `metform`). Its design system lives in an Elementor
> Global Kit — `wp-content/uploads/sites/226/elementor/css/post-6.css`, archived verbatim as
> [`tokens/globals-raw.css`](tokens/globals-raw.css). That file is the source of truth for every
> value below; this document is its translation.

---

## 1. Brand character

A clinical, trust-first aesthetic. One blue does all the work against a near-black/white base.
**Flat** — every `box-shadow` in the kit resolves to `rgba(0,0,0,0)`; depth comes from background
steps and hairline borders, never shadow. Corners are consistently soft (`0.5rem`). Type is
Manrope with tight negative tracking, which is what gives it the modern-medical feel.

---

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `primary` | `#3E74D9` | Brand blue. Buttons, links, icons, active states. |
| `primary-dark` | `#1A4FB2` | Button and link hover. |
| `secondary` | `#1A1A1A` | All headings h1–h6. |
| `body` | `#444444` | Body copy — the kit's default text color. |
| `accent` | `#E2ECFF` | Pale blue tint. Chips, soft fills, icon backdrops. |
| `surface` | `#F8FAFC` | Off-white alternating section background. |
| `line` | `#E5E7EB` | Hairline borders, dividers, card outlines. |
| `base` | `#FFFFFF` | Page ground, button text, cards. |
| `overlay` | `#00000033` | Black 20% — image scrims. |

Sections alternate between `base`, `surface` and `line` to separate bands. The header's bottom
border is `#FFFFFF33` (white 20%), because it sits over a dark hero.

**Contrast check:** `body` `#444444` on `base` gives 9.7:1 and `secondary` `#1A1A1A` gives 17.4:1 —
both comfortably AAA. But `primary` `#3E74D9` on white is **3.9:1**, which passes AA for large text
and UI only, *not* for body-size text. Use `primary` for headings, buttons and icons; never for
small body copy. White on `primary` is 4.5:1 — AA-compliant for the button, but keep button text
at its specified `1.125rem`.

---

## 3. Typography

Two families. **Manrope** for everything structural, **Inter** for reading.
Roboto is enqueued by the theme but never used — do not load it.

Weights actually needed: **Manrope 500, 600, 700** · **Inter 400**. Self-hostable woff2 files are
in [`assets/fonts/`](assets/fonts/) — four faces instead of the theme's 54.

| Token | Family / weight | Size | Line height | Tracking |
|---|---|---|---|---|
| `h1` | Manrope 700 | `clamp(2.5rem, 1.8rem + 2.25vw, 4rem)` | 1.1em | -0.03em |
| `h2` | Manrope 700 | `clamp(2rem, 1.5rem + 2vw, 3.3rem)` | 1.2em | -0.03em |
| `h3` | Manrope 600 | `clamp(1.6rem, 1.2rem + 1.5vw, 2.5rem)` | 1.2em | -0.03em |
| `h4` | Manrope 600 | `clamp(1.4rem, 1.1rem + 1vw, 1.8rem)` | 1.2em | -0.03em |
| `h5` | Manrope 600 | `clamp(1.2rem, 1rem + 0.6vw, 1.35rem)` | 1.2em | -0.02em |
| `h6` | Manrope 500 | `clamp(1.05rem, 0.95rem + 0.4vw, 1.125rem)` | 1.2em | -0.02em |
| `button` | Manrope 500 | `1.125rem` | 1em | -0.01em |
| `body` | Inter 400 | `1rem` | 1.5em | 0 |
| `body-lg` | Inter 400 | `1.125rem` | 1.5em | 0 |

`h1` and `h2` are `text-transform: capitalize`; the rest are `none`.

**The scale is already fluid.** Every heading uses `clamp()`, so type resizes continuously with
the viewport and needs **no responsive variants** — `text-h2` alone is correct at every width.
Elementor repeats identical values in its tablet and mobile media queries, which are redundant.

---

## 4. Layout and rhythm

- **Container** `max-width: 1240px`, horizontal padding `1.25rem` at every breakpoint.
- **Breakpoints** — Elementor works in max-width: tablet `≤1024px`, mobile `≤767px`.
  The Tailwind config inverts these to `md: 768px`, `lg: 1025px`, `xl: 1240px`.

Section padding and inner gap step down together, one notch per breakpoint:

| | padding-y | gap | padding-x |
|---|---|---|---|
| desktop | `5rem` | `4rem` | `1.25rem` |
| ≤1024px | `4rem` | `3rem` | `1.25rem` |
| ≤767px | `3rem` | `2rem` | `1.25rem` |

Radius: `4px` · **`0.5rem` (the default, 164 uses)** · `1rem` · `100px` (pills).
Every `img` gets `border-radius: 0.5rem` and `transition-duration: 0.3s` from the kit.
Widget spacing default is `20px`.

---

## 5. Motion

The whole system is **one entrance animation and two hover effects** — see
[`reports/animations.md`](reports/animations.md) for the full map.

```css
@keyframes fadeInUp {           /* 272 uses, duration 1.25s */
  from { opacity: 0; transform: translate3d(0, 100%, 0); }
  to   { opacity: 1; transform: none; }
}
```

Stagger delays used: 100 / 200 / 300 / 400 / 500ms. Note the travel is **100% of the element's own
height**, not a fixed offset — substituting `40px` changes the feel.

Hover: `float` (31 uses) `translateY(-8px)` over `.3s ease-out`; `grow` (3 uses) `scale(1.1)`.

Folixa ships no `prefers-reduced-motion` handling. Add it — see `reports/animations.md`.

---

## 6. Components

Full specs with markup in [`reports/components.md`](reports/components.md). Twelve components
cover the entire site; `icon-box` alone accounts for 144 of the widget instances.

The button is a single style site-wide — `bg-primary`, hover `bg-primary-dark`, white text,
radius `0.5rem`, padding `1rem 1.5rem`, min-height `40px`. No secondary or ghost variant exists.

---

## 7. Icons

**40 unique glyphs** across three loaded icon fonts — a tiny set for the visual weight it carries.

**All 40 have been recovered as real SVG** and are in [`assets/icons/svg/`](assets/icons/svg/):

- **12 Font Awesome** — Elementor already inlines these as SVG in the page HTML.
- **27 jkiticon** — extracted from the IcoMoon SVG font `jkiticon.svg`. Note the CSS maps most
  classes (every `-light` variant) to a codepoint whose `glyph-name` is unrelated to the class
  name, so the mapping must go through the codepoint, not the glyph name.
- **1 ekiticons** (`icon-down-arrow1`, the chevron, 51 uses) — extracted from the binary
  `elementskit.woff` with fontTools.

These are the original outlines, not lookalikes. Ship them inline and drop all three webfonts —
Font Awesome, jkiticon and ekiticons — with no visual change.

---

## 8. Page structure

Per-page section maps, with resolved CSS for each section, are in `pages/<slug>/sections.json`,
and each section has a matching desktop crop in `pages/<slug>/sections/`. The homepage is the
richest at 14 sections:

| # | Section | Key widgets |
|---|---|---|
| 1 | header | ekit-nav-menu, image (logo), button |
| 2 | hero — *Natural hair restoration that looks real* | heading, counter, divider, button |
| 3 | about intro — *From advanced procedures…* | icon-box, counter, icon-list, button |
| 4 | treatments grid — *Hair restoration treatments* | icon-box, heading, icon-list, button |
| 5 | clinic trust — *A clinic built on results* | image, icon-list, text-editor, heading |
| 6 | treatment process | icon-box, heading, icon-list |
| 7 | testimonials — *Tailored hair regrowth solutions* | jkit_testimonials (tiny-slider) |
| 8 | results gallery — *Real results…* | jkit_portfolio_gallery (hover-reveal tabs) |
| 9 | divider band | divider |
| 10 | FAQ — *Answers about hair* | nested-accordion, heading |
| 11 | CTA — *Start your journey today* | heading, text-editor, button |
| 12 | blog teasers — *Helpful guides…* | jkit_post_block |
| 13 | footer | icon-box, image, heading, divider |
| 14 | newsletter form | metform (mf-email, mf-button) |

**Section counts come from the post-JS DOM**, not the server HTML: the shared template (Elementor
id 551) is mounted by React and ships in `raw.html` as JSX-style `className=`, which no HTML
parser reads as a class. Parsing `raw.html` under-counts containers by one on most pages.

All 7 blog posts share one 4-section template — build `single-post` once.

---

## 9. What the rebuild drops

jQuery, Elementor frontend JS, ElementsKit, Metform + React, tiny-slider, magnific-popup,
jquery-numerator, and three icon webfonts — replaced by native `<details>`, `<dialog>`, a small
`IntersectionObserver`, and inline SVG. The 60 stylesheets in `assets/css/` collapse to one
Tailwind build.

---

## Provenance

| Claim | Source |
|---|---|
| Colors, type, radius, container | `tokens/globals-raw.css` (Elementor Global Kit `post-6.css`) |
| Section rhythm | per-page `post-<id>.css`, sampled at all three breakpoints |
| Animation keyframes and timing | `fadeInUp.min.css`, `e-animation-float.min.css`, `frontend.min.css` |
| Widget and icon counts | `reports/motion-icons.json` — all 18 pages |
| Page structure | `pages/<slug>/sections.json` |
| Completeness | `reports/verification.md` |
