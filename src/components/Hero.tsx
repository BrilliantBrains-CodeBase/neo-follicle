import { Link } from 'react-router-dom'
import { Play, Square } from './icons'

/**
 * Home hero.
 *
 * Design ported from the Folixa reference, home section 2 -- Elementor
 * container `1dd62f8` and its card `4436131`. Every value below is resolved
 * from folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css;
 * the visual target is
 * folixa-design-reference/pages/home/sections/02-natural-hair-restoration-that-looks-real.png.
 *
 * The video card poster is the clinic reception photo from
 * neofollicle-seo-backup/media (2025/04/NFT-Clinic-Reception.jpeg). A
 * before/after still was tried first and rejected: its labels are illegible
 * at 224px and its white ground swallowed the play mark.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 1, EXCEPT the video card's title and caption, which are authored --
 * the doc has no hero video. Both describe what /video-gallery/ contains and
 * make no outcome claim. FLAGGED FOR CLIENT REVIEW.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Four deliberate departures from the reference:
 *
 *   - The background is an <img fetchPriority="high">, not a CSS
 *     background-image. It is the LCP element, and the content doc's final
 *     recommendation 6 asks for hero image performance. alt is empty because
 *     it is decorative -- the h1 carries the meaning.
 *   - No `capitalize` on the h1. Folixa's copy is already title case; ours is
 *     not, and the transform would render "In Bangalore". The doc requires the
 *     h1 exactly as written.
 *   - The reference pairs its counter with three overlapping stock headshots.
 *     They are theme stock, not Neo Follicle patients, and implying patient
 *     identity on a medical page is not acceptable. Dropped; the divider and
 *     the strip's position, weight and colour are kept.
 *   - The video card's title is a <span>, not the reference's <h4>. A hero
 *     card label should not enter the outline under a single h1 (doc
 *     recommendation 1).
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` throughout -- same call as Footer.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** Both buttons share the kit's single geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full items-center justify-center rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

/**
 * HERO TRUST STRIP, verbatim from the content doc SECTION 1. Deliberately NOT
 * sourced from STATS in config/site.ts -- that wording differs slightly
 * ("Years of Experience", "Hair Transplants Performed") and the doc states
 * these figures are the clinic's stated record and must not be altered.
 */
const TRUST_STRIP = [
  '20+ Years Experience',
  '10,000+ Hair Transplants',
  '500+ International Patients',
  'Dermatologist-Led',
]

/**
 * One pass of the strip. `md:contents` dissolves the wrapper above `md` so the
 * items become direct children of the <p> and wrap with it; below that it is a
 * real flex row, which is the thing the marquee translates.
 *
 * Pausing is bound to the <p>'s `group`, so hovering or tabbing into either
 * pass stops both -- half a marquee moving would tear the seam apart.
 */
const PASS =
  'flex shrink-0 items-center gap-x-3 animate-marquee ' +
  'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] ' +
  'motion-reduce:animate-none md:contents md:animate-none'

function TrustStrip() {
  return (
    <>
      {TRUST_STRIP.map((item, i) => (
        <span key={item} className="flex items-center gap-x-3 whitespace-nowrap">
          {item}
          <span
            aria-hidden="true"
            className={i === TRUST_STRIP.length - 1 ? 'md:hidden' : undefined}
          >
            ·
          </span>
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  return (
    <section className="px-0 md:px-5 lg:px-10">
      <div className="relative isolate flex min-h-[90vh] flex-wrap justify-between gap-gap-tablet overflow-hidden rounded-none px-gutter py-16 md:flex-nowrap md:rounded-lg lg:min-h-[95vh] lg:gap-gap lg:p-20">
        {/*
          /hero.webp is client-supplied (Homepage/Home Page Banner/Home Page
          Banner.png), replacing folixa-design-reference's licensed theme stock.
          A graft-placement shot, so it is on-topic where the stock was not.
          alt stays empty -- it is decorative and the h1 carries the meaning.
        */}
        <img
          src="/hero.webp"
          alt=""
          width={1672}
          height={941}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-left-top"
        />
        {/* The reference's ::before overlay, at its --overlay-opacity:0.75. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#000000_0%,#0000001A_100%)] opacity-75"
        />

        {/* Left column -- 60% desktop, 65% tablet, full width on mobile. */}
        <div className="flex w-full flex-col justify-between gap-12 md:w-[65%] md:gap-4 lg:w-[60%]">
          <div className="flex flex-col gap-4 pt-4 animate-fadeInUp motion-reduce:animate-none">
            {/* Eyebrow. The 15px is a hard override in the reference, not a token. */}
            <p className="flex items-start gap-2 font-head text-[15px] font-medium leading-[1.2em] tracking-[-0.02em] text-accent">
              <Square className="mt-[2px] h-[14px] w-[14px] shrink-0" />
              Neo Follicle Hair Transplant Clinic, Marathahalli, Bangalore
            </p>

            {/* The reference splits the heading into #FFFFFFE6 and pure white. */}
            <h1 className="font-head text-h1 text-white/90">
              Natural-Looking Hair Transplant{' '}
              <span className="text-white">in Bangalore</span>
            </h1>

            <p className="mt-1 max-w-[543px] text-body text-white">
              Neo Follicle is a doctor-led hair transplant and hair loss clinic in Marathahalli,
              Bangalore. Dr. Sandeep Mahapatra, senior dermatologist and hair transplant surgeon,
              diagnoses and designs each treatment around the cause of your hair loss.
            </p>

            <div className="mt-3 flex flex-wrap gap-gap-sm md:mt-4 lg:mt-6">
              <Link
                to="/contact-us/"
                className={`${BUTTON} bg-primary text-white hover:bg-white hover:text-secondary`}
              >
                Book a Hair Consultation →
              </Link>
              <Link
                to="/hair-assessment/"
                className={`${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`}
              >
                Get Your AI Hair Analysis &amp; Cost Estimate →
              </Link>
            </div>
          </div>

          <div className="w-full animate-fadeInUp motion-reduce:animate-none">
            <div className="py-[7px]">
              <div className="h-px w-full bg-white/20" />
            </div>
            {/*
              Below `md` these four items used to wrap to four full lines, which
              cost the hero ~90px and pushed the CTAs toward the fold. They run
              as a one-line marquee there instead.

              Two passes of the same four stats, both translating -100% of their
              own width together: when pass one has fully exited left, pass two
              is exactly where pass one began, so the loop has no seam. Pass two
              exists only to fill that gap and is aria-hidden, so the strip is
              announced once.

              It does mean the prerendered HTML carries each stat string twice,
              which WhyNeoFollicle deliberately avoids by building its duplicate
              set on the client. The call is different here: Hero holds the LCP
              image and is the one section with no hooks at all, and adding
              mount state to it to save ~90 bytes of aria-hidden text would risk
              a hydration flicker on the most performance-critical element on
              the site. The duplicate is decorative, hidden from assistive tech,
              and gone entirely above `md`.

              From `md` up there is nothing to scroll: the animation stops, pass
              two is dropped, and pass one goes `display: contents` so its four
              items wrap directly in the <p> as they always did. The separator
              trails its item rather than leading the next, so a wrap leaves the
              dot at the end of a line instead of orphaning it at the start of
              the following one -- which is also why the last item's dot is
              dropped there but kept on the marquee, where it spaces the seam.
            */}
            <p className="group -mx-gutter mt-3 flex items-center gap-x-3 overflow-hidden px-gutter font-head text-h6 text-white [scrollbar-width:none] motion-reduce:overflow-x-auto [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:gap-y-1 md:overflow-visible md:px-0">
              <span className={PASS}>
                <TrustStrip />
              </span>
              {/*
                The duplicate is decorative. It is also pointless once the
                animation is off, so `md` and reduced motion both drop it --
                and reduced motion hands the <p> its scrollbar back above, so
                the four stats stay reachable rather than clipped.
              */}
              <span aria-hidden="true" className={`${PASS} md:hidden motion-reduce:hidden`}>
                <TrustStrip />
              </span>
            </p>
          </div>
        </div>

        {/*
          Right column -- 40% desktop, 35% tablet, hidden on mobile.

          The card is a secondary link to /video-gallery/ that cost ~350px of a
          hero the visitor has to scroll past to reach the CTAs. It is hidden
          with CSS rather than dropped from the tree, so the prerendered HTML
          still carries the link and its poster for crawlers.
        */}
        <div className="hidden w-full flex-col items-end justify-end md:flex md:w-[35%] lg:w-[40%]">
          <Link
            to="/video-gallery/"
            className={`flex w-full flex-col gap-4 rounded border border-white/10 bg-[#D6D6D61A] p-3 backdrop-blur-[4px] duration-300 animate-fadeInUp motion-reduce:animate-none lg:w-[250px] ${FLOAT}`}
          >
            <span className="relative block">
              <img
                src="/video-poster.jpeg"
                alt="Reception at Neo Follicle Hair Transplant Clinic, Marathahalli, Bangalore"
                width={1600}
                height={1200}
                loading="lazy"
                className="aspect-video w-full rounded-sm object-cover"
              />
              {/*
                Not in the reference, which could rely on a controlled dark
                thumbnail. The play mark is #B3C8FA and vanishes on a light
                photo, so the scrim keeps it legible whatever image is dropped
                in here later.
              */}
              <span className="absolute inset-0 flex items-center justify-center rounded-sm bg-black/20">
                <Play className="h-8 w-8 text-[#B3C8FA]" />
              </span>
            </span>

            <span className="font-head text-h5 text-white">See Real Patient Videos</span>
            <span className="-mt-1 max-w-[270px] text-[14px] leading-[1.5em] text-line">
              Procedure walk-throughs and patient stories from the clinic.
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
