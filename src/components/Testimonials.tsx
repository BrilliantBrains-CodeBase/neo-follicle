import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { ArrowRight, QuoteLeft, Square } from './icons'

/**
 * Home social-proof section -- SECTION 10, Social Proof (Celebrity + Testimonials).
 *
 * Design ported from the Folixa reference, home section 7 -- Elementor
 * container `d162ca4`, its header `7478523`/`0d2080b`, its row `1bf4ba5`, the
 * image container `62e57e9`, the card container `353251a` and the
 * `jkit_testimonials` widget `4494175` inside it. Every value below is resolved
 * from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css
 * with globals from folixa-design-reference/tokens/globals-raw.css.
 *
 * READ THIS BEFORE TRUSTING THE SECTION SCREENSHOT.
 * folixa-design-reference/pages/home/sections/07-tailored-hair-regrowth-solutions.png
 * shows the card floating at ~40% width on the right with a large EMPTY area
 * beside it. The card is right; the empty area is not. `62e57e9` carries a
 * lazy-loaded background-image that had not painted when the page was captured.
 * Because it is a container background and not a widget, it is also absent from
 * pages/home/sections.json, which lists only three widgets for this section
 * (icon-list, heading, jkit_testimonials). The real composition is an image on
 * the left with the card lapping over its right edge.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed. Same call as
 * Hero, About, Services and WhyNeoFollicle.
 *
 * THE OVERLAP. `1bf4ba5` is `flex-direction:row; justify-content:space-between;
 * align-items:center; gap:0`. The image is `width:65%`, the card `width:40%`
 * (50% in the tablet band) with `margin-left:-100px`. At the 1240px container
 * that is 806 + 496 - 100 = 1202 < 1240, so space-between pushes the card flush
 * to the container's right edge and it laps ~62px over the image; align-items
 * centres the 400px-min card against the 500px image for a ~50px inset top and
 * bottom. Change any one of the three and the composition collapses.
 *
 * At <=767 the row wraps (`--flex-wrap-mobile:wrap`) and the children stack in
 * normal DOM order -- image first, then card. Not reversed.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 10.
 *
 * Departures from the reference:
 *
 *   - A body paragraph is added under the h2. The reference's header is only
 *     eyebrow + heading, but the doc's SECTION 10 BODY (the Sandalwood
 *     celebrity paragraph) is the section's central trust claim and has nowhere
 *     else to go on the page.
 *   - The heading is an <h2>. Hero owns the page's only h1 (the doc's final
 *     recommendation 1).
 *   - Autoplay pauses on hover, on focus-within and while the tab is hidden.
 *     The reference sets `autoplay_hover_pause:false`, which slides away a
 *     testimonial you are halfway through and leaves no pause mechanism
 *     (WCAG 2.2.2). Same call WhyNeoFollicle makes for its row.
 *   - The card is a flex column with the bio row on `mt-auto`; the reference's
 *     `.testimonial-box` is block flow, which under `min-height` leaves the
 *     slack BELOW the bio so it never lines up with the arrows.
 *   - On mobile the arrows get their own band below the bio rather than sharing
 *     its line, which the reference only gets away with because its placeholder
 *     names are as short as "Ryan K." -- see the card below.
 *   - Avatars carry alt="" and position-based filenames -- see the TODO below.
 *
 * The widget's `::before` (`backdrop-filter: blur(16px)`, `background-color:
 * inherit`) is deliberately skipped: it sits behind an opaque `accent` card and
 * has no visible effect.
 *
 * NOT BUILT, deliberately: no star ratings and no Review / AggregateRating
 * JSON-LD. The reference renders its `rating-stars` <ul> empty, and the content
 * doc forbids both -- SECTION 10 ("do not invent reviews or ratings") and final
 * recommendation 2 ("Add AggregateRating only with a real, countable source.
 * Never fabricate"). Do not add either without a real, countable source.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` -- same call as the other sections.
 */

/** The widget's `autoplay_speed` in pages/home/rendered.html data-settings. */
const AUTOPLAY_MS = 3500

/** The track's own transition, matching WhyNeoFollicle's row. */
const DURATION_MS = 500

type Testimonial = {
  name: string
  role: string
  quote: string
  avatar: string
}

/**
 * SECTION 10's three testimonials, verbatim. The doc's curly quotation marks
 * around each quote are delimiters, not content, so they are dropped -- the
 * QuoteLeft glyph is this card's quotation mark and the reference renders no
 * inline marks. No word inside a quote is added, dropped or reordered.
 *
 * TODO: the avatars are licensed theme stock carried over from the reference
 * slider. Unlike the stock in Hero, Services and About -- which is decorative
 * and claims nothing -- these sit beside the names of REAL, IDENTIFIABLE Neo
 * Follicle patients, which on a medical (YMYL) page reads as a fabricated
 * review. That cuts against the doc's own SECTION 10 note ("All testimonials
 * are drawn from the clinic's own records... do not invent reviews") and its
 * final recommendation 8 ("Only real proof"). Before launch: replace with
 * photographs these patients have consented to, or drop the avatar slot
 * entirely. FLAGGED FOR CLIENT REVIEW.
 *
 * Until then the files are named by POSITION, never by patient, and alt is
 * empty -- a populated alt would assert that the face is the patient, which is
 * exactly the claim we cannot make. The name in the adjacent <strong> carries
 * the meaning, so the image is decorative. Same decorative-alt reasoning
 * About.tsx documents for its card backgrounds.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Puneeth Kartik',
    role: 'Hair Transplant',
    quote:
      'It has been 17 days since my hair transplant at Neo Follicle. A comfortable procedure, highly skilled staff, minimal pain and excellent post-operative care. Dr. Sandeep was very cooperative while designing my hairline, and my implanted hair is already growing like normal hair.',
    avatar: '/testimonials/avatar-1.png',
  },
  {
    name: 'Hari Prasad',
    role: 'NFT Transplant',
    quote:
      'Three months after my NFT hair transplant, the transplanted areas show noticeable growth. The procedure went smoothly and the facility is excellent. No pain, no swelling, no side effects, at a fair price for Bangalore.',
    avatar: '/testimonials/avatar-2.png',
  },
  {
    name: 'Mohammad Jasim Akhter',
    role: 'Body + Scalp',
    quote:
      'I had grade 7 baldness with a very weak donor area, and other doctors refused my case. Dr. Sandeep accepted it and did the surgery from both scalp and beard. Sixty percent coverage in the first session, with a really good result.',
    avatar: '/testimonials/avatar-3.png',
  },
]

/**
 * The arrow chip, from the widget's `tns-controls`: white fill, `secondary`
 * glyph, 6px/16px padding on a 4px radius, inverting on hover.
 */
const ARROW =
  'grid place-items-center rounded-sm bg-base px-4 py-[6px] text-secondary transition-colors hover:bg-secondary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

/**
 * One `.testimonial-box`.
 *
 * `reserveArrows` keeps a long name clear of the arrow chips, which overlay the
 * card's bottom-right. The static reduced-motion stack has no arrows, so it
 * gets the full width back.
 */
function Card({ item, reserveArrows }: { item: Testimonial; reserveArrows: boolean }) {
  return (
    <div
      className={`relative flex min-h-[450px] flex-col rounded-lg border border-white/20 bg-accent px-[30px] pt-0 md:px-5 md:pb-[50px] md:pt-[10px] lg:min-h-[400px] lg:px-10 lg:pb-10 ${
        // Mobile buys the arrows their own band; with no arrows the card keeps
        // the reference's own 30px.
        reserveArrows ? 'pb-[92px]' : 'pb-[30px]'
      }`}
    >
      <QuoteLeft className="absolute left-[30px] top-[30px] h-12 w-12 text-body md:left-10 md:top-10" />

      {/*
        The reference nests the quote as `.comment-content > p`, and the WRAPPER
        carries `margin: 30px 0` (the base style-2 rule) on top of the p's own
        `margin: -6px 0 32px` and `padding: 80px 0 32px` (70px top at <=767).
        Both elements are flattened into this one <p>, so those margins are
        summed: top 30 - 6 = 24px (`mt-6`), bottom 32 + 30 = 62px.

        Getting that wrapper margin wrong is what makes the glyph and the first
        line collide -- without it the text starts 30px higher and crosses the
        48px glyph at <=767. With it, the reference's own paddings are correct
        at every width and need no adjustment.
      */}
      <p className="mb-[62px] mt-6 border-b border-black/20 pb-8 pt-[70px] font-head text-[1.25rem] font-normal leading-[1.5em] text-secondary md:pt-20">
        {item.quote}
      </p>

      {/*
        The arrows share this line only from 768px up. Below that the card is
        too narrow to give up 120px -- "Mohammad Jasim Akhter" wraps to three
        lines against the chips -- so mobile buys them their own band via the
        `pb-[92px]` above and the bio keeps the full width. The reference only
        avoids this because its placeholder names are as short as "Ryan K.".
      */}
      <div className={`mt-auto flex items-center gap-4 ${reserveArrows ? 'md:pr-[120px]' : ''}`}>
        <img
          src={item.avatar}
          alt=""
          width={75}
          height={75}
          loading="lazy"
          className="h-[60px] w-[60px] shrink-0 rounded-full object-cover"
        />
        <div>
          <strong className="mb-1 block font-head text-h6 text-secondary">{item.name}</strong>
          <p className="text-[0.875rem] leading-[1.43em] tracking-[0.02em] text-body">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)

  const count = TESTIMONIALS.length

  useEffect(() => setMounted(true), [])

  // The kit's reduced-motion rule (reports/animations.md): replace an animation
  // with its end state, never a shorter one. Here that means the carousel
  // collapses to the static stack rendered below -- every quote at once, in
  // order, which is what a 1-up carousel eventually shows you anyway.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  const running = mounted && !reduced && !hovered && !tabHidden

  useEffect(() => {
    if (!running) return
    // `index` is in the dependency list on purpose: advancing by arrow restarts
    // the full dwell rather than inheriting whatever was left of the last tick.
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [running, index, count])

  const go = (next: number) => setIndex(((next % count) + count) % count)

  /**
   * The image column `62e57e9`. An <img> rather than the reference's CSS
   * background, so it gets loading="lazy" and intrinsic dimensions -- same call
   * Hero, Services and About make. The asset is 806x500, exactly the 65% x
   * 500px slot, so object-cover has nothing to crop at desktop.
   *
   * `md:self-stretch` here and `md:my-[50px]` on the card container below are
   * one mechanism, and the reason is copy length. The reference pins this image
   * to `min-height:500px` and centres a 400px card against it, so the card
   * floats with a 50px inset top and bottom -- which works because its
   * placeholder quotes run about 20 words. The doc's run 40-45, making the card
   * 521px at desktop and 528px in the tablet band, taller than the image, so
   * that inset cannot fall out of the two fixed heights the way it does there.
   *
   * So it is stated directly instead. A flex line's cross size is the largest
   * OUTER cross size among its items, margins included: the card's 50px margins
   * make its outer height 621px, which sets the line, and this stretch makes
   * the photo fill it. The card then centres at exactly 50px from each edge --
   * the reference's geometry, holding at any quote length. The 500px minimum
   * stays as the floor for a future quote short enough not to drive the line.
   * The quotes are verbatim and cannot be trimmed to fit.
   *
   * TODO: licensed theme stock (Testimonials.webp). Replace with Neo Follicle
   * photography before launch. It shows a hairline being marked during a
   * procedure, so it claims no before/after result for the patient quoted
   * beside it -- keep that property in any replacement. alt is empty: the image
   * is decorative and the card carries the meaning.
   */
  const image = (
    <Reveal className="relative w-full overflow-hidden rounded md:w-[65%] md:self-stretch">
      <img
        src="/testimonials.webp"
        alt=""
        width={806}
        height={500}
        loading="lazy"
        className="h-full min-h-[250px] w-full object-cover object-center md:min-h-[500px]"
      />
    </Reveal>
  )

  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/* Header 7478523 > 0d2080b -- centred at every width. */}
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* icon-list f7f4ef3 -- 14px mark in `primary`, label in `secondary`. */}
          <p className="flex items-start gap-2 font-head text-h6 text-secondary">
            <Square className="mt-[3px] h-[14px] w-[14px] shrink-0 text-primary" />
            Testimonials
          </p>
          <h2 className="max-w-full font-head text-h2 text-secondary lg:max-w-[500px]">
            Sandalwood Stars and 10,000+ Patients Trust Neo Follicle
          </h2>
          <p className="max-w-[720px] text-body-lg text-body">
            When appearance is part of the job, discretion and natural results matter. Several
            Kannada film industry names have chosen Neo Follicle for their hair restoration,
            including Sri Murali, Prem, Rakshith Gowda, Sharan and RJ Mayuraa Raghavendra.
          </p>
        </Reveal>

        {reduced ? (
          // The end state: image, then every testimonial at once, nothing
          // moving and nothing to steer. No overlap -- it only reads as one
          // composition when a single card sits against the image.
          <div className="flex flex-col gap-6">
            {image}
            {TESTIMONIALS.map((item) => (
              <Card key={item.name} item={item} reserveArrows={false} />
            ))}
          </div>
        ) : (
          // Row 1bf4ba5. See THE OVERLAP in the header comment before touching
          // the widths, the negative margin or the justify/align pair.
          <div
            className="flex flex-row flex-wrap items-center justify-between gap-6 md:flex-nowrap md:gap-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={() => setHovered(false)}
          >
            {image}

            {/* Card container 353251a -- the widget carries z-index:10. */}
            <Reveal
              delay={200}
              className="relative z-10 w-full md:my-[50px] md:-ml-[100px] md:w-[50%] lg:w-[40%]"
            >
              <div
                role="region"
                aria-roledescription="carousel"
                aria-label="Patient testimonials"
                className="relative overflow-hidden rounded-lg"
              >
                {/*
                  One flex track translated by whole slides, NOT conditional
                  rendering: all three quotes stay in the prerendered HTML, so
                  they are crawlable and the section still reads with JavaScript
                  off (slide 1 visible, arrows inert). Slides stretch to the
                  tallest, so the card height does not jump between quotes.
                */}
                <div
                  className="flex items-stretch transition-transform ease-out"
                  style={{
                    transform: `translateX(-${index * 100}%)`,
                    transitionDuration: `${DURATION_MS}ms`,
                  }}
                >
                  {TESTIMONIALS.map((item, i) => (
                    <div
                      key={item.name}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${count}`}
                      className="w-full shrink-0"
                    >
                      <Card item={item} reserveArrows />
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-5 right-5 z-10 flex gap-4 lg:bottom-12 lg:right-10">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    aria-label="Previous testimonial"
                    className={ARROW}
                  >
                    {/* Only the right glyph was captured; the pair is symmetric. */}
                    <ArrowRight className="h-5 w-5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    aria-label="Next testimonial"
                    className={ARROW}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {/* The reference's `tns-liveregion`, kept for screen readers. */}
                <p aria-live="polite" className="sr-only">
                  {`Slide ${index + 1} of ${count}`}
                </p>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
