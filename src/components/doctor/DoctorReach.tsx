import { Link } from 'react-router-dom'
import { ArrowRight, Square } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 7, "Patients Beyond Bangalore".
 *
 * Design ported from the Folixa reference, about page section 3's outlined
 * chip row -- Elementor container `2a60553` with chips `0d62364`: border 1px
 * `secondary`, radius 100px (the `pill` token), padding 0.5rem 1rem. Values
 * resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css.
 * Five place names are exactly what that chip row is for.
 *
 * Copy is verbatim from the content doc. The one authored string is the link
 * label at the foot of the section -- see the departure note below.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Two deliberate departures:
 *
 *   - This section takes the doc's section title as its eyebrow and its `###`
 *     line as the <h2>, because unlike SECTIONS 5, 6 and 8 the doc supplies
 *     both. The `###` is promoted to <h2>, not rendered as <h3>: DoctorHero
 *     owns the page's only <h1>, so section headings are <h2>.
 *   - A link to /hair-transplant-india-international-patients/ is added, with
 *     an authored label. FLAGGED FOR CLIENT REVIEW. The doc lists the five
 *     regions and stops; that page exists, is in the sitemap, and is the
 *     obvious next step for the reader this section is addressed to. The label
 *     states the destination's subject and makes no claim of its own.
 *   - No image. The doc supplies eight and only four are publishable (see the
 *     provenance note in DoctorPhilosophy); none of the four depicts anything
 *     international, and a stock clinic photograph here would illustrate
 *     nothing.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** SECTION 7, verbatim, in the doc's order. */
const REGIONS = ['USA', 'UK', 'Europe', 'Australia', 'Gulf Countries']

export default function DoctorReach() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col items-center gap-gap-mobile text-center md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4">
          {/* The 5px gap is Elementor's icon-list default. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Patients Beyond Bangalore
          </p>

          <h2 className="text-balance font-head text-h2 lg:max-w-[660px]">
            Trusted by Patients Across India &amp; Around the World
          </h2>

          <p className="text-body lg:max-w-[534px]">Neo Follicle has welcomed patients from:</p>
        </Reveal>

        <Reveal>
          <ul className="flex flex-wrap justify-center gap-3">
            {REGIONS.map((region) => (
              <li
                key={region}
                className="rounded-pill border border-secondary px-4 py-2 font-head text-h6 text-secondary"
              >
                {region}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="flex flex-col items-center gap-6">
          <p className="text-body lg:max-w-[534px]">
            Many begin with a virtual consultation before planning their visit.
          </p>

          <Link
            to="/hair-transplant-india-international-patients/"
            className={`inline-flex items-center gap-2 rounded border border-secondary p-4 font-head text-button text-secondary duration-500 hover:border-primary-dark hover:text-primary-dark ${FLOAT}`}
          >
            Hair Transplant for International Patients
            <ArrowRight className="h-5 w-5 shrink-0" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
