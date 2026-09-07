# Motion System — Folixa

Everything below was read out of the theme's own CSS and `data-settings` attributes across all
18 pages. Counts are site-wide totals.

## The headline: the motion system is tiny

Folixa looks animated, but it only uses **one entrance animation and two hover effects**. There is
no scroll-jacking, no parallax, no reveal library. This is very cheap to reproduce faithfully.

| Effect | Uses | Mechanism in Folixa |
|---|---|---|
| `fadeInUp` entrance | **272** | Elementor IntersectionObserver adds `.animated fadeInUp` |
| `float` hover | 31 | pure CSS transition |
| `grow` hover | 3 | pure CSS transition |

### `fadeInUp` — the only entrance animation

Verbatim from `elementor/assets/lib/animations/styles/fadeInUp.min.css`:

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translate3d(0, 100%, 0); }
  to   { opacity: 1; transform: none; }
}
```

- **Duration** `1.25s` (Elementor's `.animated { animation-duration: 1.25s }`)
- **Delays used on the site**: `100ms` ×20, `200ms` ×27, `300ms` ×9, `400ms` ×4, `500ms` ×2 —
  applied to stagger items within a row (cards, list items).
- Note the travel is `translate3d(0, 100%, 0)` — **100% of the element's own height**, not a fixed
  offset. Tall elements travel further than short ones. Substituting a flat `40px` changes the feel.

**How Elementor gates it:** the element ships with class `elementor-invisible` (`opacity: 0`) and
the animation class is added only when it scrolls into view. This is exactly the trap that makes
naive screenshots come out blank.

### `float` and `grow` hovers

```css
.elementor-animation-float { transition: transform .3s ease-out; }
.elementor-animation-float:hover,
.elementor-animation-float:focus,
.elementor-animation-float:active { transform: translateY(-8px); }
```

`grow` is the same transition with `transform: scale(1.1)`. Both are applied to cards and icons.

## Other interactive behaviour

| Behaviour | Folixa mechanism | Notes |
|---|---|---|
| Testimonial + gallery carousels | `tiny-slider` | 1 testimonial slider, 2 portfolio galleries |
| Stat counters | `jquery-numerator` | 8 counters, count-up on scroll into view |
| FAQ accordion | Elementor `nested-accordion` | 5 instances |
| Lightbox | `magnific-popup` | image/video gallery |
| Mobile menu | ElementsKit off-canvas | `header-offcanvas.js` |
| Global image hover | kit-level `transition-duration: 0.3s` on every `img` | |

## Rebuild map — Vite + Tailwind

The config in `tokens/tailwind.config.js` already carries the corrected keyframe.

| Folixa | Replace with | Saves |
|---|---|---|
| Elementor observer + `fadeInUp` | ~15-line `IntersectionObserver` toggling `animate-fadeInUp`, staggered by `style="animation-delay"` | Elementor frontend JS |
| `elementor-animation-float` | `transition-transform duration-300 ease-out hover:-translate-y-2` | — |
| `elementor-animation-grow` | `transition-transform duration-300 ease-out hover:scale-110` | — |
| `tiny-slider` | Embla (~10 KB) or a CSS scroll-snap track | tiny-slider + jQuery |
| `jquery-numerator` counters | small `IntersectionObserver` count-up | jQuery |
| `nested-accordion` | native `<details>/<summary>` + Tailwind | Elementor widget CSS |
| `magnific-popup` | native `<dialog>` | jQuery plugin |
| ElementsKit off-canvas | Tailwind `translate-x` panel + one `aria-expanded` toggle | ElementsKit JS/CSS |

**Net effect:** the rebuild drops jQuery, Elementor frontend, ElementsKit, Metform and all three
icon fonts, while reproducing the motion exactly.

### Accessibility gap to close

Folixa ships no `prefers-reduced-motion` handling — all 272 entrances run regardless. Add:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fadeInUp { animation: none; opacity: 1; transform: none; }
}
```
