import { Link } from 'react-router-dom'
import { Phone } from '../icons'
import { CONTACT } from '../../config/site'

/**
 * Content doc SECTION 9, the closing call to action.
 *
 * Design ported from the Folixa reference, about page section 9 -- Elementor
 * container `13b042c` and its inner card `01f5e72`: min-height 550px (500
 * tablet / 450 mobile), radius 8px, padding 20px, centred column, background
 * photograph under a `secondary` overlay at opacity 0.8. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css;
 * the visual target is folixa-design-reference/pages/about/sections/09-*.png.
 * The same block closes the reference's treatments, treatments-details and
 * testimonials pages -- it is the kit's universal page-closer.
 *
 * Copy is verbatim from the content doc, including all three button labels.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from the reference:
 *
 *   - Three buttons, not the reference's one. The doc lists three, and the
 *     third is a phone number. Only the first carries the filled `primary`
 *     treatment; the kit has no secondary or ghost variant (DESIGN.md 6), so
 *     the other two are outlined in white, which is what Hero.tsx does for its
 *     second button on a dark ground.
 *   - The heading is an <h2>. The doc marks it `#`, as it also does SECTIONS 1
 *     and 4. Only DoctorHero may carry the page's h1.
 *   - The background is an <img loading="lazy">, not a CSS background-image,
 *     so it gets intrinsic dimensions. alt is empty -- it is decorative and
 *     the heading carries the meaning. Same call About.tsx and Hero.tsx made.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white`.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** The kit's single button geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full items-center justify-center gap-2 rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

export default function DoctorCta() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container">
        <div className="relative isolate flex min-h-[450px] flex-col items-center justify-center gap-6 overflow-hidden rounded p-5 text-center md:min-h-[500px] lg:min-h-[550px]">
          {/*
            /footer-bg.webp is the clinic photograph the footer already uses.
            Shared rather than spending one of the four publishable About
            images here -- see the provenance note in DoctorPhilosophy.
          */}
          <img
            src="/footer-bg.webp"
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
          {/* The reference's overlay: `secondary` at --overlay-opacity:0.8. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-secondary opacity-80" />

          <h2 className="text-balance font-head text-h2 text-white animate-fadeInUp motion-reduce:animate-none lg:max-w-[760px]">
            Start Your Hair Restoration Journey with Expert Guidance
          </h2>

          <p className="text-body text-white/90 animate-fadeInUp motion-reduce:animate-none lg:max-w-[600px]">
            Book a personalized consultation with Dr. Sandeep Mahapatra and receive a treatment plan
            designed around your scalp, hair loss pattern, and long-term goals.
          </p>

          <div className="mt-2 flex w-full flex-wrap justify-center gap-gap-sm animate-fadeInUp motion-reduce:animate-none md:w-auto">
            <Link
              to="/contact-us/"
              className={`${BUTTON} bg-primary text-white hover:bg-white hover:text-secondary`}
            >
              Book Appointment →
            </Link>
            <Link
              to="/hair-assessment/"
              className={`${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`}
            >
              AI Hair Analysis →
            </Link>
            {/* tel: is not a route, so an <a> rather than a router Link. */}
            <a
              href={CONTACT.phoneHref}
              className={`${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`}
            >
              <Phone className="h-5 w-5" />
              Call +91 97312 07940
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
