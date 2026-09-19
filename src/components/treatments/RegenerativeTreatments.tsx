import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Square } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 3, "Regenerative Treatments".
 *
 * The doc's own layout note: this band "combines the existing messaging from
 * PRP, GFC, QR678, Exosome, Stem Cell ... without removing individual treatment
 * pages. Each treatment becomes a premium mini-section." So every card here
 * carries the outbound link to that treatment's own page -- this section, not
 * TreatmentCategories, is where those five URLs are emitted. See the header
 * note in TreatmentCategories.tsx for why.
 *
 * Design ported from the Folixa reference, about page section 5 -- Elementor
 * container `0f28367` and its grid `9325843`: bordered cards at 1px `line`,
 * radius 8px, padding 2rem, with the FIRST cell filled `accent` and the rest
 * `surface`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css;
 * the visual target is folixa-design-reference/pages/about/sections/05-*.png.
 * Same object DoctorExpertise.tsx carries on the about page.
 *
 * Copy is verbatim from the content doc -- the five names and their bullets,
 * nothing more.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from the reference:
 *
 *   - Three columns, not the reference's two, so five cards fill two rows
 *     rather than running three deep.
 *   - EVERY CARD GETS A "LEARN MORE". FLAGGED FOR CLIENT REVIEW. The doc writes
 *     "CTA: Learn More" under PRP only, and gives the other four no CTA line.
 *     Four cards that dead-end beside one that does not would read as an
 *     oversight, and all five destination pages exist. The doc's own wording is
 *     kept rather than an authored alternative.
 *   - NO IMAGERY. public/ holds a photograph for PRP only (/gallery/gfc-prp.webp,
 *     already spent on this page in SECTION 2) and none at all for GFC, QR678,
 *     Exosome or Stem Cell. One illustrated card among five would unbalance the
 *     row, so the band runs on type and the kit's `CheckCircle` bullet.
 *     FLAGGED FOR CLIENT REVIEW.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:hover:transform-none'

/**
 * SECTION 3, verbatim, in the doc's order. Targets are the live treatment pages
 * -- every path here is in src/seo/pages.ts and carries its trailing slash,
 * which is load-bearing (see SEO.trailingSlash in config/site.ts).
 */
const TREATMENTS = [
  {
    name: 'PRP',
    to: '/best-prp-hair-treatment-in-bangalore/',
    points: [
      'Uses your own platelet-rich plasma.',
      'Supports weak follicles.',
      'Suitable for early thinning.',
    ],
  },
  {
    name: 'GFC',
    to: '/gfc-hair-treatment-in-bangalore/',
    points: ['Concentrated growth factors.', 'Personalized treatment planning.'],
  },
  {
    name: 'QR678',
    to: '/qr678-hair-treatment-in-bangalore/',
    points: ['Peptide-based solution.', 'Suitable for selected thinning cases.'],
  },
  {
    name: 'Exosome Therapy',
    to: '/exosome-hair-treatment-in-bangalore/',
    points: ['Regenerative treatment.', 'Growth-factor signaling.'],
  },
  {
    name: 'Stem Cell Therapy',
    to: '/stem-cell-therapy-for-hair-loss-in-bangalore/',
    points: ['Advanced regenerative approach.', 'Designed around follicle health.'],
  },
]

export default function RegenerativeTreatments() {
  return (
    <section
      id="regenerative"
      className="scroll-mt-24 bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y"
    >
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* The 5px gap is Elementor's icon-list default. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Regenerative Treatments
          </p>
          {/*
            The doc marks this heading `#`. Only the hero may carry the h1, so
            it is an <h2> -- the same call DoctorPhilosophy made for SECTION 4.
          */}
          <h2 className="text-balance font-head text-h2 text-secondary lg:max-w-[760px]">
            Strengthen Living Hair Follicles Before They Weaken Further
          </h2>
        </Reveal>

        <ul className="grid gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {TREATMENTS.map(({ name, to, points }, i) => (
            <Reveal key={name} as="li" delay={i * 100}>
              <Link
                to={to}
                className={`group flex h-full flex-col gap-4 rounded border border-line p-8 ${FLOAT} ${
                  i === 0 ? 'bg-accent' : 'bg-surface'
                }`}
              >
                <h3 className="font-head text-h4 text-secondary">{name}</h3>

                <ul className="flex flex-col gap-2">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body">
                      <CheckCircle className="mt-[5px] h-4 w-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* The doc's own CTA wording. The arrow is the kit's, not the
                    doc's, and is decorative -- the link text carries the name. */}
                <span className="mt-auto flex items-center gap-2 pt-2 font-head text-h6 text-primary">
                  Learn More
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
