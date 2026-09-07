# Component Specs — Folixa → Vite + Tailwind

Site-wide widget counts across all 18 pages. Build these once as components; everything else on
the site is composition.

| Widget | Uses | Rebuild as |
|---|---|---|
| `heading` | 559 | plain `h1`–`h6` (typography is already global) |
| `text-editor` | 232 | prose block |
| `icon-box` | **144** | `<IconBox>` — the workhorse card |
| `image` | 78 | `<img>` with `rounded` + `duration-300` |
| `button` | 48 | `<Button>` — one style site-wide |
| `divider` | 40 | `<hr>` |
| `icon-list` | 39 | `<IconList>` |
| `metform` | 19 | native `<form>` |
| `ekit-nav-menu` | 17 | `<Header>` + off-canvas |
| `counter` | 8 | `<Counter>` |
| `jkit_post_list` / `jkit_post_block` | 10 | `<PostCard>` |
| `nested-accordion` | 5 | `<details>` |
| `jkit_testimonials` | 1 | `<TestimonialSlider>` |
| `jkit_portfolio_gallery` | 2 | `<Gallery>` (before/after results) |

---

## Layout primitives

**Container** — `max-width: 1240px`, horizontal padding `1.25rem` at every breakpoint.

**Section rhythm** — vertical padding and inner gap both step down one notch per breakpoint:

| | padding-y | gap | padding-x |
|---|---|---|---|
| desktop | `5rem` | `4rem` | `1.25rem` |
| ≤1024px | `4rem` | `3rem` | `1.25rem` |
| ≤767px  | `3rem` | `2rem` | `1.25rem` |

```html
<section class="py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
  <div class="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
```

**Section backgrounds alternate** between `base` (`#FFFFFF`), `surface` (`#F8FAFC`) and
`line` (`#E5E7EB`) to separate bands. There are no shadows anywhere — every `box-shadow` in the
kit resolves to `rgba(0,0,0,0)`. Separation is done with background steps and hairline borders.

---

## Button

One style site-wide; the kit defines it and no page overrides it.

```html
<a class="inline-flex items-center justify-center min-h-10
          rounded bg-primary px-6 py-4 font-head text-button text-base
          transition-colors duration-300 hover:bg-primary-dark">
  Contact Us
</a>
```

- background `#3E74D9`, hover `#1A4FB2`, text `#FFFFFF`
- radius `0.5rem`, padding `1rem 1.5rem`, `elementor-size-sm` → `min-height: 40px`
- type: Manrope 500, `1.125rem`, line-height `1em`, letter-spacing `-0.01em`

## Icon box — the workhorse (144 uses)

```html
<div class="flex flex-col gap-4">
  <span class="text-primary"><!-- 24-32px inline SVG --></span>
  <h5 class="font-head text-h5 text-secondary">Title</h5>
  <p class="font-body text-body text-body">Description copy.</p>
</div>
```

Icon sits above the text (`elementor-position-block-start`) on both desktop and mobile.
Icons are `primary` blue; on tinted cards they sit on an `accent` (`#E2ECFF`) rounded backdrop.

## Counter (8 uses)

Prefix + animated number + suffix, counting `0 → data-to-value` over **2000ms** on scroll-in.

```html
<div>
  <div class="font-body text-body">Happy People Worldwide</div>
  <div class="font-head text-h2 text-secondary">
    <span>Trusted by </span><span data-count-to="10">0</span><span>K +</span>
  </div>
</div>
```

Replace `jquery-numerator` with an `IntersectionObserver` + `requestAnimationFrame` count-up.

## Accordion / FAQ (5 uses)

Native `<details>` reproduces it exactly. Chevron is `jki-angle-down-solid` / `jki-angle-up-solid`
— use one SVG and rotate it with `group-open:rotate-180`.

```html
<details class="group border-b border-line py-4">
  <summary class="flex cursor-pointer items-center justify-between font-head text-h5 text-secondary">
    Question<svg class="transition-transform duration-300 group-open:rotate-180">…</svg>
  </summary>
  <p class="pt-3 font-body text-body text-body">Answer.</p>
</details>
```

## Results gallery (`jkit_portfolio_gallery`, 2 uses)

Not a grid — a **hover-reveal tabbed panel**. Four labelled tabs sit in a row
(`FUE Transplant`, `FUT Transplant`, `Beard Transplant`, `Hairline Design`); each has a matching
full-width panel carrying a `background-image` via `data-background`. Every panel is
`visibility: hidden` except `.current-item`, and hovering a tab swaps which is current.

Worth knowing for two reasons: it looks like a gallery in a screenshot but behaves like tabs, and
a static capture of it is blank unless the active panel is force-revealed (the screenshot script
does this deliberately — see `tools/07-screenshots.mjs`).

```html
<div class="group/gallery relative">
  <div class="flex">   <!-- tabs -->
    <button class="flex-1 h-[585px] text-base font-head text-h4 peer/0">FUE Transplant</button>
    …
  </div>
  <!-- panels: absolutely stacked, only the active one visible -->
  <div class="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300"></div>
</div>
```

Tab labels are white, so they are only legible over the panel image — keep a scrim
(`overlay`, `#00000033`) behind them.

## Card hover

Cards and images use `float`: `transition-transform duration-300 ease-out hover:-translate-y-2`.
A few use `grow`: `hover:scale-110`. Every `img` carries `rounded` and `duration-300` from the kit.

## Form (Metform → native)

Drop Metform and React entirely; the forms are a contact form and an appointment form.

```html
<input class="w-full rounded border border-line bg-base px-4 py-3
              font-body text-body text-body
              placeholder:text-body/60 focus:border-primary focus:outline-none" />
```

## Header

Sticky top bar, `min-height: 91px`, `padding: 1.25rem`, bottom border `#FFFFFF33`, logo width
`150px`. Mobile uses an ElementsKit off-canvas panel — rebuild as a `translate-x` drawer with a
single `aria-expanded` toggle and a `fas_bars` SVG trigger.

## Icons — 40 unique glyphs total

Three icon fonts are loaded but the site needs only 40 distinct glyphs — **and all 40 have been
extracted as real SVG** into `assets/icons/svg/`:

- **12 Font Awesome** — Elementor already inlines these as SVG (`fas_sun`, `fas_spa`, `fas_plus`,
  `fas_quote-left`, `fas_bars`, `far_check-circle`, `fab_facebook`, `fab_instagram`,
  `fab_linkedin`, `fab_x-twitter`, `fas_circle`, `fas_square`)
- **27 jkiticon** — recovered from the IcoMoon SVG font (social, phone, envelope, shield,
  chevrons, arrows, eye, check-circle, activity, rocket, dna, clock, medicine, headset…)
- **1 ekiticons** — `icon-down-arrow1`, the chevron, 51 uses

Drop Font Awesome, jkiticon and ekiticons entirely — three webfonts removed, no visual change.
Regenerate with `tools/12-extract-glyphs.py`.
