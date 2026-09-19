import { Link } from 'react-router-dom'
import { ArrowRight, Square } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 4, "Surgical Treatments" / "Permanent Hair Restoration".
 *
 * The doc's own layout note: "Introduce: Hair Transplant, Female Hair
 * Transplant, Beard, Eyebrow, Failed Repair. Each links to its dedicated page."
 * So this band, not TreatmentCategories, is where those five URLs are emitted
 * -- see the header note in TreatmentCategories.tsx for why.
 *
 * Design ported from the Folixa reference, treatments page section 3 --
 * Elementor container `3be4476` and its six `icon-box` widgets (`0588348`,
 * `466e126`, `39b405e`, `4232fed`, `3d700b1`, `dbbb1aa`). Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-23.css;
 * the visual target is
 * folixa-design-reference/pages/treatments/sections/03-hair-restoration-treatments.png.
 * The reference's own container is `--gap:4rem` over the `019d18d` (#FFFFFF)
 * ground at `--padding-top:5rem`, which is the `base` / `py-section-y` pair.
 *
 * Copy is verbatim from the content doc: the five names, and nothing else. The
 * doc supplies NO description under any of them here -- the one-liners belong
 * to SECTION 2 and are rendered there. None is invented to fill the card.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Two deliberate departures from the reference:
 *
 *   - NO PHOTOGRAPHS, although public/services/ holds one for each of these
 *     five. They are already spent in SECTION 2, four screens above, and
 *     showing the same six images twice on one page reads as a mistake rather
 *     than a system. The reference's own section here is an icon-box row with
 *     no imagery, so this matches it. Distinct photography for this band would
 *     be the right fix. FLAGGED FOR CLIENT REVIEW.
 *   - NO ICONS, despite the reference's widget being an icon-box. icons.tsx
 *     carries 28 glyphs and none of them distinguishes a beard transplant from
 *     an eyebrow restoration; assigning near-arbitrary medical marks would
 *     decorate the row while telling the reader something untrue. The kit's
 *     `Square` eyebrow mark and a trailing arrow carry the card instead --
 *     the same call, for the same reason, that DoctorExpertise.tsx records.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:hover:transform-none'

/**
 * SECTION 4, verbatim, in the doc's order. Targets are the live service pages
 * -- every path here is in src/seo/pages.ts and carries its trailing slash,
 * which is load-bearing (see SEO.trailingSlash in config/site.ts).
 */
const SURGICAL = [
  { label: 'Hair Transplant', to: '/best-hair-transplant-in-bangalore/' },
  { label: 'Female Hair Transplant', to: '/female-hair-transplant-in-bangalore/' },
  { label: 'Beard Transplant', to: '/beard-transplant-in-bangalore/' },
  { label: 'Eyebrow Restoration', to: '/eyebrow-restoration-in-bangalore/' },
  { label: 'Failed Hair Transplant Repair', to: '/failed-hair-transplant-repair-in-bangalore/' },
]

export default function SurgicalTreatments() {
  return (
    <section
      id="surgical"
      className="scroll-mt-24 bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y"
    >
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* The 5px gap is Elementor's icon-list default. The eyebrow is the
              doc's own section title, the h2 its heading -- the doc supplies
              both here, so neither is authored. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Surgical Treatments
          </p>
          <h2 className="text-balance font-head text-h2 text-secondary lg:max-w-[660px]">
            Permanent Hair Restoration
          </h2>
        </Reveal>

        <ul className="grid gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {SURGICAL.map(({ label, to }, i) => (
            <Reveal key={label} as="li" delay={i * 100}>
              <Link
                to={to}
                className={`group flex h-full items-center justify-between gap-4 rounded border border-line p-8 ${FLOAT} ${
                  i === 0 ? 'bg-accent' : 'bg-base'
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
