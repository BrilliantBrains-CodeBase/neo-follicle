import { Link } from 'react-router-dom'
import { Square, WhatsAppIcon } from '../icons'
import { CONTACT } from '../../config/site'

/**
 * Treatments overview hero -- the page's only <h1>.
 *
 * Content doc SECTION 1. Layout line in the doc: "Full-screen hero".
 *
 * Design ported from the Folixa reference, home section 2 -- Elementor
 * container `1dd62f8`, card `4436131` -- by way of DoctorHero.tsx, which is the
 * same object: the rounded full-bleed card on `secondary`, the eyebrow, the
 * button pair and the trailing rule. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * THE H1 IS THE CAPTURED SEO H1, NOT THE DOC'S. FLAGGED FOR CLIENT REVIEW.
 * The doc's heading is "Complete Hair Restoration Treatments in Bangalore".
 * src/seo/pages.ts carries this page's live H1 as "Advanced Hair Loss Treatment
 * in Bangalore for Men and Women", and this URL ranks on it today -- the whole
 * reason the page was built on the existing slug rather than the doc's
 * suggested /hair-loss-treatments-bangalore. scripts/verify-seo.mjs does NOT
 * assert h1 (see the note in home.tsx), so this is a one-line swap if the
 * client prefers the doc's wording. The doc's line is not discarded: it is the
 * eyebrow above.
 *
 * Three deliberate departures from the reference:
 *
 *   - NO RIGHT-HAND IMAGE, so the card is a single LEFT-ALIGNED column rather
 *     than DoctorHero's 60/40 split. FLAGGED FOR CLIENT REVIEW. The doc asks for a
 *     full-screen hero but supplies no publishable photograph for it -- its own
 *     images are third-party stock (their captions name Esthetic Hair Mexico,
 *     HairBro, I-LAND TOWER CLINIC, Pena Plastic Surgery). Every existing
 *     asset in public/ is spent further down this same page, and reusing one
 *     here would show the same photograph twice within a screen of scrolling.
 *     A clinic photograph of the treatment rooms is the right fix.
 *   - "Explore Treatments" is an in-page anchor to SECTION 2. The doc names the
 *     button but gives it no target, and the section it would send a reader to
 *     is directly below. FLAGGED FOR CLIENT REVIEW.
 *   - The second button is WhatsApp rather than the doc's pair alone, matching
 *     DoctorHero and StickyActionBar. It is the clinic's primary enquiry
 *     channel and is already in CONTACT.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` throughout -- same call as Hero.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** Both buttons share the kit's single geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full items-center justify-center gap-2 rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

export default function TreatmentsHero() {
  return (
    <section className="px-0 md:px-5 lg:px-10">
      {/*
        LEFT-ALIGNED, not centred. This was a centred column, which set the tone
        for the whole page being centred; the reference's own treatment hero
        (`0b1a014`) and DoctorHero both run their copy left. The measure is
        clamped so the lede does not run past a readable line length on desktop.
      */}
      <div className="relative isolate flex flex-col items-start gap-4 overflow-hidden rounded-none bg-secondary px-gutter py-16 md:rounded-lg lg:p-20">
        {/* Eyebrow. The 15px is a hard override in the reference, not a token.
            The line is the content doc's own SECTION 1 heading -- see above. */}
        <p className="flex items-center gap-2 font-head text-[15px] font-medium leading-[1.2em] tracking-[-0.02em] text-accent animate-fadeInUp motion-reduce:animate-none">
          <Square className="h-[14px] w-[14px] shrink-0" />
          Complete Hair Restoration Treatments in Bangalore
        </p>

        {/*
          No `capitalize`, though the reference's global h1 carries it. Our copy
          is already correctly cased and the transform would render "For Men And
          Women". Same call Hero.tsx and DoctorHero.tsx made.
        */}
        <h1 className="text-balance font-head text-h1 text-white animate-fadeInUp motion-reduce:animate-none lg:max-w-[16ch]">
          Advanced Hair Loss Treatment in Bangalore for Men and Women
        </h1>

        {/* SECTION 1's body paragraph, verbatim. */}
        <p className="mt-1 max-w-[68ch] text-body text-white/90 animate-fadeInUp motion-reduce:animate-none">
          Whether you&rsquo;re experiencing early hair thinning, a receding hairline, bald patches,
          beard gaps, or female pattern hair loss, Neo Follicle offers both surgical and
          non-surgical treatments designed around your individual diagnosis&mdash;not a
          one-size-fits-all solution.
        </p>

        <div className="mt-3 flex w-full flex-wrap gap-gap-sm animate-fadeInUp motion-reduce:animate-none md:w-auto lg:mt-6">
          <Link
            to="/contact-us/"
            className={`${BUTTON} bg-primary text-white hover:bg-white hover:text-secondary`}
          >
            Book Consultation &rarr;
          </Link>
          {/* In-page anchor, so a plain <a> -- a router Link to a hash on the
              current route would push a history entry for a scroll. */}
          <a
            href="#treatments"
            className={`${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`}
          >
            Explore Treatments
          </a>
          {/* External host, so an <a> rather than a router Link. */}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
