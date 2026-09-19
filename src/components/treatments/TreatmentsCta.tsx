import { Link } from 'react-router-dom'
import { WhatsAppIcon } from '../icons'
import Reveal from '../Reveal'
import { CONTACT } from '../../config/site'

/**
 * Content doc SECTION 9, "Final CTA".
 *
 * Design ported from the Folixa reference, treatments page section 6 --
 * Elementor container `3b61b8d` with its heading `4f6eb4a`, text-editor
 * `03e1ec5` and button `94b68e3`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-23.css;
 * the visual target is
 * folixa-design-reference/pages/treatments/sections/06-start-your-hair-restoration-journey-today.png.
 * The reference container is a centred column at `--align-items:center`,
 * `--gap:4rem` and `--padding-top:5rem` -- the `gap-gap` / `py-section-y` pair,
 * stepping to 3rem/4rem at tablet and 2rem/3rem at mobile, which is exactly
 * what the `-tablet` and `-mobile` spacing tokens carry.
 *
 * Copy is verbatim from the content doc: the heading, the paragraph and the
 * three button labels.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from the reference:
 *
 *   - The ground is `surface`, not the reference's `019d18d` (#FFFFFF). The
 *     band immediately above this one (TreatmentJourney) is already `base`, and
 *     two white sections running together would lose the division the
 *     reference gets for free from its own neighbours.
 *   - Three buttons, not the reference's one, because the doc names three.
 *   - The doc marks its heading `#`. Only the hero may carry the h1, so this is
 *     an <h2> -- the same call DoctorPhilosophy made for SECTION 4 and
 *     RegenerativeTreatments for SECTION 3.
 *
 * LINK TARGETS. The doc names all three buttons but supplies a destination for
 * none of them.
 *   - "Book Consultation" -> /contact-us/, the site's conversion page, which is
 *     where headerCta in src/config/nav.ts already points.
 *   - "WhatsApp" -> CONTACT.whatsapp, the clinic's own number.
 *   - "AI Hair Analysis" -> /hair-assessment/. FLAGGED FOR CLIENT REVIEW. The
 *     other candidate, /ai-hair-transplant-cost-calculator/, is a COST tool and
 *     is one of the six `noindex` landing pages in src/seo/pages.ts; sending
 *     the page's final call to action to a noindex page would waste it.
 *     /hair-assessment/ is the assessment the button actually names.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** All three buttons share the kit's single geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full items-center justify-center gap-2 rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

export default function TreatmentsCta() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-balance font-head text-h2 text-secondary lg:max-w-[760px]">
            Find the Right Hair Restoration Treatment for You
          </h2>

          <p className="max-w-[620px] text-body text-body">
            Whether you need a hair transplant or a non-surgical solution like PRP, GFC, QR678, or
            Exosome Therapy, every treatment begins with an expert consultation.
          </p>

          <div className="mt-2 flex w-full flex-wrap justify-center gap-gap-sm md:w-auto">
            <Link
              to="/contact-us/"
              className={`${BUTTON} bg-primary text-white hover:bg-primary-dark`}
            >
              Book Consultation &rarr;
            </Link>

            {/* External host, so an <a> rather than a router Link. */}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BUTTON} border border-line bg-base text-secondary hover:border-primary hover:text-primary`}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>

            <Link
              to="/hair-assessment/"
              className={`${BUTTON} border border-line bg-base text-secondary hover:border-primary hover:text-primary`}
            >
              AI Hair Analysis
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
