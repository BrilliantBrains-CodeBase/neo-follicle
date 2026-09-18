import { Link } from 'react-router-dom'
import { headerCta } from '../config/nav'
import Reveal from './Reveal'

/**
 * The dark inset CTA card that closes the blog listing.
 *
 * Design ported from the Folixa reference blog archive -- Elementor band
 * `b0fa067` with the inner card `5c34270`. Values from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-31.css.
 * Visual target is
 * folixa-design-reference/pages/blog/sections/04-start-your-hair-restoration-journey-today.png.
 *
 *   band   surface #F8FAFC, padding 5rem / 4rem / 3rem
 *   card   flat secondary #1A1A1A -- no photo, no texture
 *          min-height 450 / 400 / 450px, radius 8px
 *   h2     white, global h2 token
 *   body   line #E5E7EB
 *   button primary, inverting to accent fill with secondary text on hover,
 *          at the reference's slower 0.5s
 *
 * The button is full-width on mobile, matching every other CTA on the site.
 * Copy is authored: the reference's own wording is theme filler and the client
 * content doc has no section for the blog archive. It makes no outcome claim
 * and mirrors the language the home page CTA already uses.
 * FLAGGED FOR CLIENT REVIEW -- same precedent Process and CommonQuestions set.
 */

export default function BlogCta() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container">
        <Reveal className="flex min-h-[450px] flex-col items-center justify-center gap-4 rounded bg-secondary p-5 text-center md:min-h-[400px] lg:min-h-[450px]">
          <h2 className="text-balance font-head text-h2 text-base md:max-w-[640px]">
            Start Your Hair Restoration Journey Today
          </h2>
          <p className="text-pretty text-body-lg text-line md:max-w-[560px]">
            Every case is different. A consultation with Dr Sandeep Mahapatra confirms what is causing
            your hair loss and which treatment actually fits it.
          </p>
          <Link
            to={headerCta.to}
            className="mt-4 inline-flex w-full items-center justify-center rounded bg-primary p-4 font-head text-button text-base transition-colors duration-500 hover:bg-accent hover:text-secondary md:w-auto"
          >
            {headerCta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
