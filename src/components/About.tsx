import { Link } from 'react-router-dom'
import Counter from './Counter'
import { CheckCircle, Square, Sun } from './icons'
import { DOCTOR } from '../config/site'

/**
 * Home about / doctor section.
 *
 * Design ported from the Folixa reference, home section 3 -- Elementor
 * container `4f487a0` and its children. Every value below is resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css
 * and folixa-design-reference/tokens/globals-raw.css; the visual target is
 * folixa-design-reference/pages/home/sections/03-from-advanced-hair-restoration-procedures-to.png.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 2. Nothing here is authored. The one editorial act is splitting the
 * doc's single BODY paragraph across the reference's three text slots at
 * existing sentence boundaries: sentences 1-2 and 3 become the two paragraphs,
 * and the final sentence ("The goal is an honest plan...") becomes the photo
 * card's overlaid line. No words are added, dropped or reordered.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed. Same as Hero.
 *
 * Five deliberate departures from the reference:
 *
 *   - A third band is added. The reference has no slot for the doc's DOCTOR
 *     CREDENTIALS block, so it is built as a 4-up icon list under a hairline --
 *     the kit's own icon-row pattern (containers b1e2ddb, 09ebf3b). Four long
 *     medical lines over a photo scrim would fail on contrast, and stacking
 *     them in the right column would push the photo card unreasonably tall.
 *   - Card backgrounds are <img>, not CSS background-image, so they get
 *     loading="lazy" and intrinsic dimensions. Same call as Hero. alt is empty
 *     on both -- they are decorative and the surrounding copy carries the
 *     meaning.
 *   - The photo card's line is a <p> styled text-h4, not the reference's <h4>.
 *     A pull-quote should not enter the outline under a single h1 (content doc
 *     recommendation 1). Same call Hero made for its video card title.
 *   - The section heading is an <h2>. Hero owns the page's only h1.
 *   - The reference's `fas_sun` mark is kept for fidelity even though it is
 *     decorative theme dressing with no medical meaning. See the note on `Sun`
 *     in icons.tsx. FLAGGED FOR CLIENT REVIEW.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` throughout -- same call as Hero.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** Shared by both photo cards: image, gradient scrim, content above both. */
const PHOTO_CARD = 'relative isolate flex flex-col overflow-hidden'

/**
 * DOCTOR CREDENTIALS BLOCK, verbatim from the content doc SECTION 2.
 *
 * Deliberately NOT assembled from DOCTOR.credentials / .awards / .memberships
 * in config/site.ts -- that data is transcribed from the indexed JSON-LD and
 * says something different. Most visibly, config's ISHRS entry carries no
 * "Gold Member" qualifier and the doc's does. CONFLICT, UNRESOLVED: the doc is
 * the client's own copy for this page and wins here, but the schema graph is
 * what Google has already read, so do not reconcile either side without the
 * client confirming which is current. Same call Hero made for TRUST_STRIP.
 */
const CREDENTIALS = [
  'MBBS, MD (Dermatology, Venereology and Leprosy), Gold Medalist',
  'Senior Consultant Dermatologist, Cosmetic Expert and Hair Transplant Surgeon',
  'Member: ISHRS (Gold Member), IAHRS, ACSI, IADVL, ISD',
  'Founder and Director, Neo Follicle Hair Transplant Clinic, Marathahalli, Bangalore',
]

export default function About() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/* Band 1 -- eyebrow left, heading right (container 62474f9). */}
        <div className="flex flex-wrap items-start justify-between gap-gap-sm">
          <p className="flex items-start gap-2 font-head text-h6 text-secondary animate-fadeInUp motion-reduce:animate-none">
            <Square className="mt-[5px] h-[14px] w-[14px] shrink-0 text-primary" />
            ABOUT THE CLINIC
          </p>

          {/*
            The reference caps this at 680px desktop / 495px tablet and pulls
            16px off the top and bottom to cancel the heading's line-box
            leading. text-h4 is what typography token 6cd0e45 resolves to --
            the heading reads small for its role, but that is the reference.
          */}
          <h2 className="my-[-16px] max-w-full font-head text-h4 text-[#444444DB] animate-fadeInUp motion-reduce:animate-none md:max-w-[495px] lg:max-w-[680px]">
            A Hair Transplant Clinic <span className="text-secondary">Built Around a Dermatologist</span>
          </h2>
        </div>

        {/* Band 2 -- photo card | stats, copy and CTA (container f1d9ed6). */}
        <div className="flex flex-col gap-gap-sm md:gap-gap-tablet lg:flex-row lg:justify-between lg:gap-gap">
          {/* Left, container 3daaa1e. Stretches to the right column at lg. */}
          <div
            className={`${PHOTO_CARD} min-h-[320px] justify-end rounded p-gutter animate-fadeInUp motion-reduce:animate-none md:min-h-[450px] md:p-8 lg:w-1/2`}
          >
            {/*
              TODO: /about-doctor.webp is folixa-design-reference's licensed
              theme stock (About-banner-Video-2.webp). Replace with a Neo
              Follicle photo of Dr. Sandeep before launch. Note it is a wide
              1240x550 crop filling a roughly portrait slot, so object-cover
              crops it hard -- shoot or crop the replacement taller. Higher-res
              real candidates already exist at
              neofollicle-seo-backup/media/files/wp-content/uploads/2025/05/Dr-Sandeep-Mahapatra-11.jpeg.
            */}
            <img
              src="/about-doctor.webp"
              alt=""
              width={1240}
              height={550}
              loading="lazy"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            />
            {/* The reference's ::before overlay, at its --overlay-opacity:0.75. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#02010100_0%,#1261AC_100%)] opacity-75"
            />

            {/* icon-box 34f35c4 -- wrapper gap 24px, icon 40px in `accent`. */}
            <div className="flex flex-col gap-6">
              <Sun className="h-10 w-10 text-accent" />
              <p className="font-head text-h4 text-white">
                The goal is an honest plan and a result that still looks natural in ten years.
              </p>
            </div>
          </div>

          {/* Right, container b89e6d6. */}
          <div className="flex flex-col gap-gap-sm md:gap-8 lg:w-1/2">
            {/* Stat card pair, container af32bd6. */}
            <div className="flex flex-wrap gap-gap-sm md:gap-8">
              {/*
                Grey card 9498dbf. Its fill is token ef3ace8 = `line` (#E5E7EB),
                NOT `surface` -- the two are close enough to confuse by eye.
              */}
              <div className="flex min-w-[220px] flex-1 flex-col justify-between gap-4 rounded bg-line p-6 animate-fadeInUp motion-reduce:animate-none">
                {/*
                  Centred because .elementor-counter-number-wrapper is
                  `display:flex; text-align:center` with flex-grow:1 on the
                  prefix and suffix, which centres the whole number block. The
                  photo card below does not need it -- its container sets
                  align-items:flex-start, so that counter is content-width.
                */}
                <Counter
                  to={20}
                  suffix="+ Years"
                  numberClassName="text-center font-head text-h2 text-secondary"
                />
                <p className="text-center text-body">Dermatology and hair transplant surgery.</p>
              </div>

              {/*
                Photo card 572a68a. Its counter is flex-direction:column-reverse,
                so the number sits above the label -- hence `reverse`.
              */}
              <div
                className={`${PHOTO_CARD} min-h-[200px] min-w-[220px] flex-1 items-start justify-end rounded p-4 animate-fadeInUp motion-reduce:animate-none`}
              >
                {/* TODO: theme stock (PRP-scalp-treatment-in-dermatology-or-hair-clinic.webp). Replace before launch. */}
                <img
                  src="/about-stat.webp"
                  alt=""
                  width={1200}
                  height={629}
                  loading="lazy"
                  className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#02010100_0%,#1A4FB2_100%)] opacity-70"
                />

                <Counter
                  to={10000}
                  suffix="+ Transplants"
                  label="Over 6,000,000 follicles placed."
                  reverse
                  className="flex flex-col gap-gap-xs"
                  numberClassName="font-head text-h4 text-white"
                  labelClassName="text-[14px] leading-[1.3em] text-accent"
                />
              </div>
            </div>

            {/* Copy and CTA, container 5d6aaec. */}
            <div className="flex flex-col items-start gap-6 animate-fadeInUp motion-reduce:animate-none">
              <div className="flex flex-col gap-4 pr-5">
                <p className="text-body">
                  Most hair loss is a medical problem before it is a cosmetic one. That is why Neo
                  Follicle is led by Dr. Sandeep Mahapatra, MBBS, MD (Dermatology) and a gold
                  medalist, who brings dermatology, hair restoration surgery and hairline design
                  together in one clinic.
                </p>
                <p className="text-body">
                  He personally evaluates your scalp, identifies why you are losing hair, and
                  decides whether you need a transplant, a non-surgical treatment or a combination,
                  before anything is booked.
                </p>
              </div>

              <Link
                to={DOCTOR.path}
                className={`inline-flex w-full items-center justify-center rounded bg-secondary p-4 font-head text-button text-white duration-500 hover:bg-primary-dark md:w-auto ${FLOAT}`}
              >
                Meet Dr. Sandeep Mahapatra →
              </Link>
            </div>
          </div>
        </div>

        {/* Band 3 -- credentials. No reference counterpart; see header comment. */}
        <ul className="grid gap-gap-sm border-t border-line pt-8 md:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
