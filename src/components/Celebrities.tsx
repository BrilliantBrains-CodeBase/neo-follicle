import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { ArrowRight, Square } from './icons'
import { LP_CELEBRITIES } from '../content/lp/shared'

/**
 * Home celebrity section -- the first half of SECTION 10, Social Proof
 * (Celebrity + Testimonials).
 *
 * Design ported from the Folixa reference, home section 7 -- Elementor
 * container `d162ca4`, its header `7478523`/`0d2080b`, its row `1bf4ba5`, the
 * image container `62e57e9` and the card container `353251a`. Every value below
 * is resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css
 * with globals from folixa-design-reference/tokens/globals-raw.css.
 *
 * THE REFERENCE IS A TESTIMONIAL SLIDER; THIS IS NOT. The reference rotates the
 * CARD against a fixed photo. Here the card is constant and the PHOTOS rotate,
 * because the content is a list of five named actors rather than a list of
 * quotes. The shell, the two columns and their geometry are the reference's and
 * unchanged; only the contents and the direction of the rotation differ.
 *
 * READ THIS BEFORE TRUSTING THE SECTION SCREENSHOT.
 * folixa-design-reference/pages/home/sections/07-tailored-hair-regrowth-solutions.png
 * shows the card floating at ~40% width on the right with a large EMPTY area
 * beside it. The card is right; the empty area is not. `62e57e9` carries a
 * lazy-loaded background-image that had not painted when the page was captured.
 * Because it is a container background and not a widget, it is also absent from
 * pages/home/sections.json, which lists only three widgets for this section
 * (icon-list, heading, jkit_testimonials).
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
 * to the container's right edge and it laps ~60px over the image. Change any
 * one of the three and the composition collapses.
 *
 * The card's `md:my-[50px]` and the image's `md:self-stretch` are one
 * mechanism: a flex line's cross size is the largest OUTER cross size among its
 * items, margins included, and the stretch makes the photo fill whatever that
 * comes to. With this card's short copy the card no longer drives the line --
 * the image's own `md:min-h-[500px]` does -- so the card floats centred with a
 * generous inset. That is the reference's original proportion, where a 400px
 * card sat inside a 500px image.
 *
 * At <=767 the row wraps (`--flex-wrap-mobile:wrap`) and the children stack in
 * normal DOM order -- image first, then card. Not reversed.
 *
 * Copy is from content/home-page/Neo-Follicle-Website-Content.md SECTION 10.
 * The heading is verbatim. The card's paragraph drops the doc's opening
 * sentence -- "When appearance is part of the job, discretion and natural
 * results matter." -- so that it holds a tight block beside the photos; nothing
 * is reworded and all five names are kept, so restoring that sentence is a
 * paste away.
 *
 * Departures from the reference:
 *
 *   - The card is constant and the images rotate, not the other way round.
 *   - No quote glyph and no avatar / name / role bio. Both belonged to the
 *     testimonial the card used to carry.
 *   - The eyebrow reads "Celebrity Clients". The doc gives this section no
 *     eyebrow label and the reference's own word was "Testimonials", which no
 *     longer describes the section -- so this wording is OURS, not the
 *     client's. FLAGGED FOR CLIENT REVIEW.
 *   - The heading is an <h2>. Hero owns the page's only h1 (the doc's final
 *     recommendation 1).
 *   - The h2 is capped at 820px rather than `0531ae2`'s 500px, which suits
 *     "Tailored Hair Regrowth Solutions" (32 chars) and breaks ours (56) over
 *     four lines. At 820px it holds two lines across the desktop range.
 *   - Autoplay pauses on hover, on focus-within and while the tab is hidden.
 *     The reference sets `autoplay_hover_pause:false`, which leaves no pause
 *     mechanism (WCAG 2.2.2). Same call WhyNeoFollicle makes for its row.
 *
 * The widget's `::before` (`backdrop-filter: blur(16px)`, `background-color:
 * inherit`) is deliberately skipped: it sits behind an opaque `accent` card and
 * has no visible effect.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` -- same call as the other sections.
 */

/**
 * TODO -- SECTION 10's TESTIMONIAL HALF STILL NEEDS A HOME.
 *
 * This section used to carry the doc's three patient testimonials. They are not
 * rendered anywhere on the site any more. Kept verbatim here so the loss is
 * visible in the diff rather than silent;
 * content/home-page/Neo-Follicle-Website-Content.md SECTION 10 remains the
 * source of truth.
 *
 *   Puneeth Kartik, Hair Transplant
 *   "It has been 17 days since my hair transplant at Neo Follicle. A
 *   comfortable procedure, highly skilled staff, minimal pain and excellent
 *   post-operative care. Dr. Sandeep was very cooperative while designing my
 *   hairline, and my implanted hair is already growing like normal hair."
 *
 *   Hari Prasad, NFT Transplant
 *   "Three months after my NFT hair transplant, the transplanted areas show
 *   noticeable growth. The procedure went smoothly and the facility is
 *   excellent. No pain, no swelling, no side effects, at a fair price for
 *   Bangalore."
 *
 *   Mohammad Jasim Akhter, Body + Scalp
 *   "I had grade 7 baldness with a very weak donor area, and other doctors
 *   refused my case. Dr. Sandeep accepted it and did the surgery from both
 *   scalp and beard. Sixty percent coverage in the first session, with a really
 *   good result."
 *
 * Whichever section takes them: no star ratings and no Review /
 * AggregateRating JSON-LD. The doc forbids both -- SECTION 10 ("do not invent
 * reviews or ratings") and final recommendation 2 ("Add AggregateRating only
 * with a real, countable source. Never fabricate").
 */

/** The reference slider's `autoplay_speed` in pages/home/rendered.html. */
const AUTOPLAY_MS = 3500

/**
 * The kit's scrim for type over a photograph, with one change: the ramp starts
 * at 50% rather than Services.tsx's 0%. Both stops are the kit's own colours.
 *
 * Services can start its gradient at the top because its photos are backdrops
 * behind a title. Here the photograph IS the content -- it is the only place a
 * visitor sees the actor -- and a full-height ramp greys out the face. Starting
 * halfway leaves the subject untouched and darkens only the band the caption
 * sits in, which is all the contrast the caption needs.
 */
const SCRIM = 'bg-[linear-gradient(180deg,#02010100_50%,#1A1A1A_100%)]'

/** The track's own transition, matching WhyNeoFollicle's row. */
const DURATION_MS = 500

/**
 * The five Sandalwood names, reused wholesale from src/content/lp/shared.ts --
 * same people, same photographs, same alt text as the two landing pages and
 * /celebrity-hair-transplant/ already use. Do not add a local copy: that set
 * points at the images generated for the treatment page, and
 * `npm run verify:treatments` check 6 (no orphaned generated images) depends on
 * there being exactly one source for them.
 *
 * The `LP_` prefix is a misnomer now that the home page renders this too. Worth
 * renaming to a neutral export, but that is churn in a file two landing pages
 * share, so it is left alone here.
 *
 * TODO: these are publicity photographs of real, identifiable public figures on
 * a commercial medical page that asserts they are clinic clients. The claim is
 * the clinic's own (doc SECTION 10), but WRITTEN PERMISSION TO USE EACH
 * LIKENESS must be confirmed before launch. FLAGGED FOR CLIENT REVIEW.
 *
 * Five, not six. The brief names Bhuvann Ponnannaa as a sixth and no photograph
 * of him was ever captured -- see the note in
 * src/content/treatments/celebrity-hair-transplant.ts. A sixth, unidentified
 * photo (`unnamed-4.webp`) arrived with the client's latest image drop and may
 * be him, but "may be" is not enough to put a face under a name in a section
 * that asserts these people chose Neo Follicle. Confirm with the client, then
 * add him to LP_CELEBRITIES and every surface picks him up at once.
 *
 * Each photograph carries the person's name and role as visible text, and the
 * alt text names them as well. That duplication is deliberate and is what the
 * treatment page's `people` grid already does with this same data: the visible
 * text is selectable and indexable, while the alt keeps the photograph itself
 * findable in image search (content doc recommendation 6). Both name the person
 * and stop there -- they really are these actors, so naming them is accurate,
 * but neither may imply a procedure or a result.
 */
const CELEBRITIES = LP_CELEBRITIES

/**
 * The arrow chip, from the reference widget's `tns-controls`: white fill,
 * `secondary` glyph, 6px/16px padding on a 4px radius, inverting on hover.
 */
const ARROW =
  'grid place-items-center rounded-sm bg-base px-4 py-[6px] text-secondary transition-colors hover:bg-secondary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

export default function Celebrities() {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)

  const count = CELEBRITIES.length

  useEffect(() => setMounted(true), [])

  /*
   * Reduced motion is handled differently here than in the other sections, on
   * purpose. Their rule (reports/animations.md) is to replace an animation with
   * its end state, which for a three-card text carousel means showing all three
   * at once. Five stacked 500px photographs is not an end state -- it is a
   * 2,500px column. So instead: no autoplay, and the track jumps rather than
   * slides. Nothing moves on its own, nothing animates, and every photo is
   * still reachable through the arrows.
   */
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

  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/* Header 7478523 > 0d2080b -- centred at every width. */}
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* icon-list f7f4ef3 -- 14px mark in `primary`, label in `secondary`. */}
          <p className="flex items-start gap-2 font-head text-h6 text-secondary">
            <Square className="mt-[3px] h-[14px] w-[14px] shrink-0 text-primary" />
            Celebrity Clients
          </p>
          {/* 820px, not the reference's 500px -- see the heading departure above. */}
          <h2 className="max-w-full font-head text-h2 text-secondary lg:max-w-[820px]">
            Sandalwood Stars and 10,000+ Patients Trust Neo Follicle
          </h2>
        </Reveal>

        {/*
          Row 1bf4ba5. See THE OVERLAP in the header comment before touching the
          widths, the negative margin or the justify/align pair.
        */}
        <div
          className="flex flex-row flex-wrap items-center justify-between gap-6 md:flex-nowrap md:gap-0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={() => setHovered(false)}
        >
          {/* Image column 62e57e9 -- this is what rotates. */}
          <Reveal className="w-full md:w-[65%] md:self-stretch">
            {/* Reveal takes no aria props, so the region sits inside it. */}
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Kannada film actors who have chosen Neo Follicle"
              className="relative h-full overflow-hidden rounded"
            >
              {/*
                One flex track translated by whole slides, NOT conditional
                rendering: all five photographs stay in the prerendered HTML, so
                they are crawlable and the section still reads with JavaScript
                off (the first actor visible, arrows inert).
              */}
              <div
                className="flex h-full items-stretch"
                style={{
                  transform: `translateX(-${index * 100}%)`,
                  transition: reduced ? undefined : `transform ${DURATION_MS}ms ease-out`,
                }}
              >
                {CELEBRITIES.map((person, i) => (
                  <div
                    key={person.name}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    className="relative w-full shrink-0"
                  >
                    <img
                      src={person.image.src}
                      alt={person.image.alt}
                      width={person.image.width}
                      height={person.image.height}
                      loading="lazy"
                      className="h-full min-h-[250px] w-full object-cover object-center md:min-h-[500px]"
                    />

                    {/* Services.tsx's scrim, verbatim -- the kit's one pattern
                        for setting type over a photograph. */}
                    <div aria-hidden="true" className={`absolute inset-0 ${SCRIM}`} />

                    {/*
                      The name is rendered as real text rather than left to the
                      alt, so it is visible, selectable and indexable. The alt
                      still carries name and role too: that is what the
                      treatment page's `people` grid does with this same data,
                      and it keeps the photograph itself findable in image
                      search (content doc recommendation 6).
                    */}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-8">
                      <p className="font-head text-h4 text-white">{person.name}</p>
                      <p className="text-body text-line">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* The reference's `tns-liveregion`, kept for screen readers. */}
              <p aria-live="polite" className="sr-only">
                {`Slide ${index + 1} of ${count}`}
              </p>
            </div>
          </Reveal>

          {/* Card container 353251a -- constant copy; the widget carries z-index:10. */}
          <Reveal
            delay={200}
            className="relative z-10 w-full md:my-[50px] md:-ml-[100px] md:w-[50%] lg:w-[40%]"
          >
            <div className="flex flex-col gap-8 rounded-lg border border-white/20 bg-accent p-[30px] md:p-8 lg:p-10">
              <p className="text-body-lg text-body">
                Several Kannada film industry names have chosen Neo Follicle for their hair
                restoration, including Sri Murali, Prem, Rakshith Gowda, Sharan and RJ Mayuraa
                Raghavendra.
              </p>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous actor"
                  className={ARROW}
                >
                  {/* Only the right glyph was captured; the pair is symmetric. */}
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next actor"
                  className={ARROW}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
