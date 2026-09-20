import type { ReactElement } from 'react'
import Counter from './Counter'

/**
 * The counter band -- a `primary` ground, a centred heading, and a row of
 * count-up figures.
 *
 * Design ported from the Folixa reference, about page section 7 -- Elementor
 * container `3e10463`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css
 * and folixa-design-reference/tokens/globals-raw.css; the visual target is
 * folixa-design-reference/pages/about/sections/07-*.png. `primary` ground,
 * numbers at the h2 token in white, labels in `line` grey at 16px.
 *
 * Extracted from DoctorStats, which was the first consumer and is now a thin
 * wrapper over this. CredibilityBar is the second. The two differ only in
 * heading, figures and label styling -- everything below is shared, including
 * the responsive reasoning, which is the reason this is a component and not
 * copied markup.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Four deliberate departures from the reference:
 *
 *   - Five counters, not four, so the row is a grid rather than the
 *     reference's `justify-content: space-between`. It is 5-up only from `xl`
 *     (1240), 3-up from `md`, and 2-up below. The 5-up band does NOT come in
 *     at `lg` the way the rest of the doctor page's grids do: five equal tracks
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
 *   - The band carries a section title as a centred <h2>; the reference's
 *     counter row has no heading at all. Five bare figures under a hero read
 *     as a continuation of it rather than as their own section. `heading` is
 *     therefore required, not optional.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white`.
 */

export type StatFigure = {
  /** The value to count to. Rendered with a "+" suffix. */
  to: number
  /** The counter-title under the figure. Doubles as the list key. */
  label: string
  /**
   * Optional glyph above the figure, from icons.tsx. Decorative -- every one
   * of them carries aria-hidden, because the label already says what the
   * figure counts and the icon would only repeat it to a screen reader.
   */
  icon?: (props: { className?: string }) => ReactElement
}

/**
 * DoctorStats' original label styling, kept as the default so that band's
 * markup is unchanged by the extraction. CredibilityBar overrides it.
 */
const DEFAULT_LABEL = 'font-head text-[16px] font-medium leading-[1.3em] text-line'

/**
 * Hairlines between the five cells, at `xl` only -- that is the one width where
 * the grid is a single row, so `:not(:first-child)` lands on exactly the four
 * internal seams. At 3-up and 2-up the rows wrap and the same rule would draw a
 * line down the left of whichever figure happened to start a row.
 *
 * Drawn as a ::before in the gap rather than as a border on the cell, and this
 * is load-bearing, not fussiness. A border needs padding to sit off the text,
 * and padding comes out of the track: `xl:px-6` would leave a 224px track only
 * 176px of content, and "6,000,000+" at the h3 clamp wants ~200px -- the exact
 * overflow StatBand's header explains the `xl:grid-cols-5` choice to avoid.
 * A ::before at -10px (half of the 20px `gap-gap-sm`) consumes no track at all
 * and centres itself in the gap.
 */
const DIVIDERS =
  "xl:[&>li]:relative " +
  "xl:[&>li:not(:first-child)]:before:absolute xl:[&>li:not(:first-child)]:before:content-[''] " +
  'xl:[&>li:not(:first-child)]:before:-left-[10px] xl:[&>li:not(:first-child)]:before:top-1 ' +
  'xl:[&>li:not(:first-child)]:before:bottom-1 xl:[&>li:not(:first-child)]:before:w-px ' +
  'xl:[&>li:not(:first-child)]:before:bg-white/25'

type StatBandProps = {
  heading: string
  figures: readonly StatFigure[]
  labelClassName?: string
  /** Hairlines between the cells at `xl`. Off by default -- DoctorStats has none. */
  dividers?: boolean
}

export default function StatBand({
  heading,
  figures,
  labelClassName = DEFAULT_LABEL,
  dividers = false,
}: StatBandProps) {
  return (
    <section className="bg-primary py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/* White on `primary` is the one place a heading is not `secondary`. */}
        <h2 className="text-balance text-center font-head text-h2 text-white">{heading}</h2>

        <ul
          className={[
            'grid grid-cols-2 gap-gap-mobile md:grid-cols-3 md:gap-8 xl:grid-cols-5 xl:gap-gap-sm',
            dividers ? DIVIDERS : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {figures.map(({ to, label, icon: Icon }) => (
            // Without an icon the <li> carries no class at all, which is what
            // DoctorStats rendered before icons existed -- that band's markup
            // is unchanged by this prop.
            <li key={label} className={Icon ? 'flex flex-col items-center gap-3' : undefined}>
              {Icon ? <Icon className="h-7 w-7 shrink-0 text-accent md:h-8 md:w-8" /> : null}
              <Counter
                to={to}
                suffix="+"
                label={label}
                reverse
                className="flex flex-col gap-gap-xs text-center"
                numberClassName="font-head text-h4 text-white md:text-h3"
                labelClassName={labelClassName}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
