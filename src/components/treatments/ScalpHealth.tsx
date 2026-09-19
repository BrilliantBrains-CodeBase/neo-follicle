import { Link } from 'react-router-dom'
import { ArrowRight, Square } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 5, "Scalp Health Treatments".
 * The doc's layout line: "Cards: Dandruff, Alopecia, LLLT, Scalp
 * Micropigmentation."
 *
 * Design ported from the Folixa reference, treatments page section 5 --
 * Elementor container `c81ab70` and its four `icon-box` widgets (`7bda8bc`,
 * `d2db99f`, `3ae54bc`, `49090e3`). Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-23.css;
 * the visual target is
 * folixa-design-reference/pages/treatments/sections/05-internationally-accredited.png.
 *
 * The 100ms stagger below is the reference's own: those four widgets carry
 * `_animation: fadeInUp` with `_animation_delay` 0, 100, 200 and 300. Reveal's
 * `delay` prop is Elementor's `_animation_delay` -- see Reveal.tsx.
 *
 * Copy is verbatim from the content doc: the heading and the four labels. The
 * doc supplies no description under any of them and none is invented here.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Two deliberate departures from the reference:
 *
 *   - NO ICONS, despite the reference's widget being an icon-box, and NO
 *     IMAGERY -- public/ holds no photograph for dandruff, alopecia, laser
 *     therapy or micropigmentation. Same reasoning DoctorExpertise.tsx and
 *     SurgicalTreatments.tsx record: there is no glyph in icons.tsx that
 *     honestly distinguishes these four, and a near-arbitrary medical mark
 *     would decorate the card while misinforming the reader. FLAGGED FOR
 *     CLIENT REVIEW.
 *   - Each card is a link. The doc lists them as plain labels, but all four
 *     pages exist and this is the only band on the page that reaches them.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:hover:transform-none'

/**
 * SECTION 5, verbatim, in the doc's order. Targets are the live treatment pages
 * -- every path here is in src/seo/pages.ts and carries its trailing slash,
 * which is load-bearing (see SEO.trailingSlash in config/site.ts).
 *
 * The doc writes "LLLT". The label is expanded to "Low Level Laser Therapy"
 * because the abbreviation alone is not a link a reader can act on, and that
 * is the destination page's own title in src/seo/pages.ts. FLAGGED FOR CLIENT
 * REVIEW -- it is the one word on this page that is not the doc's.
 */
const SCALP = [
  { label: 'Dandruff', to: '/dandruff-treatment-in-bangalore/' },
  { label: 'Alopecia', to: '/alopecia-areata-treatment-in-bangalore/' },
  { label: 'Low Level Laser Therapy', to: '/low-level-laser-therapy/' },
  { label: 'Scalp Micropigmentation', to: '/scalp-micropigmentation-in-bangalore/' },
]

export default function ScalpHealth() {
  return (
    <section
      id="scalp-health"
      className="scroll-mt-24 bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y"
    >
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* The 5px gap is Elementor's icon-list default. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Scalp Health Treatments
          </p>
          <h2 className="text-balance font-head text-h2 text-secondary lg:max-w-[660px]">
            Healthy Hair Begins with a Healthy Scalp
          </h2>
        </Reveal>

        {/*
          The reference's row is four abreast on desktop and wraps at its
          tablet band; `lg:grid-cols-4` / `md:grid-cols-2` is that shape.

          Padding drops to 1.25rem at `lg` rather than widening. Four cards
          across the 1240px container leaves roughly 212px of content box at
          2rem padding, and "Scalp Micropigmentation" wraps to two lines and
          pushes its arrow flush to the border there. Process.tsx records the
          same call for the same reason: a narrower card keeps the reference's
          mobile padding on desktop instead of the wider desktop step.
        */}
        <ul className="grid gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {SCALP.map(({ label, to }, i) => (
            <Reveal key={label} as="li" delay={i * 100}>
              <Link
                to={to}
                className={`group flex h-full items-center justify-between gap-4 rounded border border-line p-8 lg:p-5 ${FLOAT} ${
                  i === 0 ? 'bg-accent' : 'bg-surface'
                }`}
              >
                <span className="flex items-start gap-3">
                  <Square className="mt-[7px] h-[14px] w-[14px] shrink-0 text-primary" />
                  <span className="font-head text-h5 text-secondary">{label}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
