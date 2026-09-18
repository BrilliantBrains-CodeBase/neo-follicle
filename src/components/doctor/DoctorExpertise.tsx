import { Link } from 'react-router-dom'
import { ArrowRight, Square } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 5, "Areas of Expertise".
 * Layout line in the doc: "Icon Grid".
 *
 * Design ported from the Folixa reference, about page section 5 -- Elementor
 * container `0f28367` and its grid `9325843`: bordered cards at 1px `line`,
 * radius 8px, padding 2rem, with the FIRST cell filled `accent` and the rest
 * `surface`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css;
 * the visual target is folixa-design-reference/pages/about/sections/05-*.png.
 *
 * Copy is verbatim from the content doc -- the nine labels, nothing more. The
 * doc gives no description under any of them and none is invented here.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from the reference:
 *
 *   - Three columns, not the reference's two. Nine one-line labels in a 2-up
 *     grid runs five rows deep for no gain.
 *   - Every cell is a link to the service page for that procedure. The doc
 *     lists them as plain labels, but all nine pages exist and this page is
 *     the site's second-most linked-to; an expertise list that does not reach
 *     them wastes the strongest internal-linking slot on the page.
 *   - NO ICONS, despite the doc's "Icon Grid" layout line. FLAGGED FOR CLIENT
 *     REVIEW. icons.tsx carries 26 glyphs and none of them distinguishes a
 *     beard transplant from an eyebrow restoration, or PRP from GFC from
 *     QR678 from Exosome Therapy. Assigning nine near-arbitrary medical marks
 *     would decorate the grid while telling the reader something untrue about
 *     what each procedure is. The kit's `Square` eyebrow mark and a trailing
 *     arrow carry the card instead. Nine procedure glyphs drawn for these
 *     specific treatments would be the right fix if the client wants them.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/**
 * SECTION 5, verbatim, in the doc's order. Targets are the live service pages
 * -- every path here is in src/seo/pages.ts and carries its trailing slash,
 * which is load-bearing (see SEO.trailingSlash in config/site.ts).
 */
const AREAS = [
  { label: 'Hair Transplant', to: '/best-hair-transplant-in-bangalore/' },
  { label: 'Female Hair Transplant', to: '/female-hair-transplant-in-bangalore/' },
  { label: 'Beard Transplant', to: '/beard-transplant-in-bangalore/' },
  { label: 'Eyebrow Restoration', to: '/eyebrow-restoration-in-bangalore/' },
  { label: 'PRP', to: '/best-prp-hair-treatment-in-bangalore/' },
  { label: 'GFC', to: '/gfc-hair-treatment-in-bangalore/' },
  { label: 'QR678', to: '/qr678-hair-treatment-in-bangalore/' },
  { label: 'Exosome Therapy', to: '/exosome-hair-treatment-in-bangalore/' },
  { label: 'Failed Hair Transplant Repair', to: '/failed-hair-transplant-repair-in-bangalore/' },
]

export default function DoctorExpertise() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/*
          The doc's own section title is the heading. No eyebrow line above it:
          this section supplies no second heading, and an eyebrow here would
          have to be authored. Same call in DoctorApproach and
          DoctorDifference; the sections that do carry an eyebrow
          (DoctorPhilosophy, DoctorReach) are the ones where the doc gives both
          a section title and a heading under it.
        */}
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance font-head text-h2 lg:max-w-[660px]">Areas of Expertise</h2>
        </Reveal>

        <ul className="grid gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {AREAS.map(({ label, to }, i) => (
            <Reveal key={label} as="li" delay={i * 100}>
              <Link
                to={to}
                className={`flex h-full items-center justify-between gap-4 rounded border border-line p-8 ${FLOAT} ${
                  i === 0 ? 'bg-accent' : 'bg-surface'
                }`}
              >
                <span className="flex items-start gap-3">
                  <Square className="mt-[7px] h-[14px] w-[14px] shrink-0 text-primary" />
                  <span className="font-head text-h5 text-secondary">{label}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
