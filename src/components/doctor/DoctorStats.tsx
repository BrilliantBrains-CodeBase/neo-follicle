import Counter from '../Counter'

/**
 * The credibility band -- content doc SECTION 2, "The Numbers That Built Our
 * Reputation".
 *
 * Design ported from the Folixa reference, about page section 7 -- Elementor
 * container `3e10463`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css
 * and folixa-design-reference/tokens/globals-raw.css; the visual target is
 * folixa-design-reference/pages/about/sections/07-*.png. `primary` ground,
 * numbers at the h2 token in white, labels in `line` grey at 16px.
 *
 * Counter.tsx's header names this band as its intended second consumer: "the
 * content doc's Credibility Bar needs five more".
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from the reference:
 *
 *   - Five counters, not four, so the row is a grid rather than the
 *     reference's `justify-content: space-between`. It is 5-up only from `xl`
 *     (1240), 3-up from `md`, and 2-up below. The 5-up band does NOT come in
 *     at `lg` the way the rest of this page's grids do: five equal tracks
 *     inside the 1025-1239 band are ~181px and the longest figure needs ~188,
 *     so the number would spill its cell. 1240 is the first width where the
 *     container reaches its 1240px cap and the tracks clear it.
 *   - The figures are `text-h3`, not the reference's `text-h2`. Folixa's
 *     longest counter value is "15K+"; ours is "6,000,000+", which at the h2
 *     clamp wants 270-288px on desktop against a ~200px track and overflowed
 *     at 375, 768 and 1025. h3 is the largest token the longest of these five
 *     figures fits in at every width from `md` up, and it also keeps the
 *     band's numbers below the section's own h2 rather than level with it.
 *     Below `md` it steps down again to h4: the 2-up tracks are ~124px at a
 *     320px viewport and the h3 clamp bottoms out at 1.6rem, which still
 *     wants ~136.
 *   - No BG-Shape.webp network-pattern overlay. It is theme dressing at 0.025
 *     opacity over a flat blue; the asset is licensed stock and invisible at
 *     that weight on the `primary` ground.
 *   - The band carries the doc's section title as a centred <h2>; the
 *     reference's counter row has no heading at all. Five bare figures under
 *     the hero read as a continuation of it rather than as their own section.
 *
 * The doc writes the fourth figure as "6 Million+". It is rendered 6,000,000+
 * to match the live site and STATS in config/site.ts, on the authority of the
 * doc's own SEO note on this section: "These numbers remain unchanged because
 * they're existing trust signals from the current website."
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white`.
 */

/** SECTION 2, verbatim. Labels are the doc's, not STATS' longer wording. */
const FIGURES = [
  { to: 20, label: 'Years of Experience' },
  { to: 10000, label: 'Hair Transplants' },
  { to: 500, label: 'International Patients' },
  { to: 6000000, label: 'Hair Follicles Transplanted' },
  { to: 100000, label: 'PRP Sessions' },
]

export default function DoctorStats() {
  return (
    <section className="bg-primary py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/* White on `primary` is the one place a heading is not `secondary`. */}
        <h2 className="text-balance text-center font-head text-h2 text-white">
          The Numbers That Built Our Reputation
        </h2>

        <ul className="grid grid-cols-2 gap-gap-mobile md:grid-cols-3 md:gap-8 xl:grid-cols-5 xl:gap-gap-sm">
          {FIGURES.map(({ to, label }) => (
            <li key={label}>
              <Counter
                to={to}
                suffix="+"
                label={label}
                reverse
                className="flex flex-col gap-gap-xs text-center"
                numberClassName="font-head text-h4 text-white md:text-h3"
                labelClassName="font-head text-[16px] font-medium leading-[1.3em] text-line"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
