/**
 * SECTION 1 on every brief -- the treatment hero.
 *
 * WHY THIS IS NOT THE REFERENCE'S TREATMENT-DETAILS HERO ANY MORE.
 *
 * It used to be a port of Elementor container `0b1a014` on
 * pages/treatments-details/: a white, container-width 50/50 split, image right,
 * a stacked stat card absolutely positioned over its bottom-left corner. That
 * slot in the reference holds a NINETEEN-character <h2> ("FUE Hair
 * Transplant"), because the reference puts the <h1> in a separate full-bleed
 * banner widget above it.
 *
 * This site has no banner widget, so the same geometry was carrying a 37-78
 * character <h1> plus up to three paragraphs, and it broke in four ways:
 * `items-center` stranded a 311px image against a ~900px text column, leaving
 * the top right empty; half of a 1240px container gives the h1 about 17
 * characters per line, so it wrapped to four; the lede ran at `text-body-lg`
 * with no measure cap; and the badge card covered the photograph on the pages
 * that have four badges.
 *
 * So it is now the hero this SITE already uses. Hero.tsx (home) and
 * DoctorHero.tsx are both an inset rounded card on `secondary`, an asymmetric
 * 60/40 split, a lede capped at `max-w-*` in `text-body`, and a trust strip
 * under a hairline. The geometry below is DoctorHero's, which is the
 * reference's own hero card (container `1dd62f8`, card `4436131`) already
 * translated once. Three heroes, one language.
 *
 * Neither of those heroes uses `container`. The card spans the viewport minus
 * the `lg:px-10` inset, which is WIDER than the 1240px container -- at 1440 the
 * left column is ~696px rather than ~590px, and that alone takes the longest
 * h1 from four lines to three.
 *
 * Departures worth recording:
 *
 *   - It carries the page's <h1>, where Hero and DoctorHero carry the home and
 *     doctor ones. PagePlaceholder is dropped from every treatment page file
 *     for the same reason: it renders seoFor(slug).h1 and would emit a second.
 *   - The badges are a trust strip, not the reference's floating stat card.
 *     The reference animates a "98% Success Rate" counter; the briefs give
 *     plain claims ("Same-Day Procedure", "Doctor-Led Planning"), and inventing
 *     a statistic to fill the widget would be worse than rendering the copy.
 *     As a strip they also stop covering the photograph.
 *   - `px-0 md:px-5 lg:px-10`, Hero.tsx's inset, NOT DoctorHero's
 *     `pb-0 md:pb-5 lg:pb-10`. That variant exists only because a saturated
 *     `primary` band follows it; a `surface` section follows this one.
 *
 * Above the fold, so `animate-fadeInUp` directly rather than Reveal -- Reveal
 * no-ops on anything already on screen at mount (see its top-of-viewport
 * guard), which is why both other heroes make the same call.
 */
import type { TreatmentPageData } from '../../content/treatments/types'
import { Square } from '../icons'
import { CtaRow } from './shell'

const RISE = 'animate-fadeInUp motion-reduce:animate-none'

/**
 * How near to square a source must be to be shown WHOLE rather than cropped.
 *
 * The image column stretches to the height of the text beside it and covers
 * that box. Right for a landscape photograph, which loses nothing that matters
 * to a centre crop. Wrong for the client's illustration set: 19 of the pages'
 * heroes are 1:1 pictures whose key content -- a vial label, a "BANGALORE" sign,
 * a before/after inset -- sits at the RIGHT EDGE. The box is 450px wide and
 * 460-660px tall, so a square covering it shows only 68-97% of its width, and
 * the crop took exactly those pieces ("STEM CELLS" became "STEM", "BANGALORE"
 * became "BANGALOR", the QR678 label was cut mid-word).
 *
 * So a near-square source is not cropped: it gets a square box and is centred
 * against the text. That is the `items-center` stranding the docblock above
 * retired -- but that was a 311px image against a ~900px column, and this is a
 * 450px one against 500-660, which reads as a framed picture on the dark card
 * rather than dead space. Anything less square keeps the stretch-and-cover.
 */
const WHOLE_MIN = 0.87
const WHOLE_MAX = 1.15

export default function TreatmentHero({ hero }: { hero: TreatmentPageData['hero'] }) {
  const badges = hero.badges ?? []
  const ratio = hero.image.width / hero.image.height
  const whole = ratio >= WHOLE_MIN && ratio <= WHOLE_MAX

  return (
    <section className="px-0 md:px-5 lg:px-10">
      <div className="relative isolate flex flex-wrap justify-between gap-gap-tablet overflow-hidden rounded-none bg-secondary px-gutter py-16 md:flex-nowrap md:rounded-lg lg:gap-gap lg:p-20">
        {/* Left column -- 60% tablet, 58% desktop, full width on mobile. */}
        <div className="flex w-full flex-col gap-4 md:w-[60%] lg:w-[58%]">
          {/* Eyebrow. The 15px is a hard override in the reference, not a token. */}
          <p className={`flex items-start gap-2 font-head text-[15px] font-medium leading-[1.2em] tracking-[-0.02em] text-accent ${RISE}`}>
            <Square className="mt-[2px] h-[14px] w-[14px] shrink-0" />
            {hero.eyebrow}
          </p>

          {/*
            No `capitalize`, though the reference's global h1 carries it.
            src/index.css does not apply it, and these headings are not title
            case -- it would render "Hair Transplant In Bangalore For
            International Patients". Same call Hero.tsx and DoctorHero made.
          */}
          <h1 className={`text-balance font-head text-h1 text-white ${RISE}`}>{hero.h1}</h1>

          {/*
            Capped measure at `text-body`, not `text-body-lg`. DoctorHero uses
            620px for two paragraphs, Hero 543px for one; the type allows at
            most two here, so 620px is the right one to match.
          */}
          <div className={`mt-1 flex max-w-[620px] flex-col gap-4 ${RISE}`}>
            {hero.lede.map((line) => (
              <p key={line} className="text-body text-white/90">
                {line}
              </p>
            ))}
          </div>

          <div className={`mt-3 ${RISE} lg:mt-6`}>
            <CtaRow ctas={hero.ctas} dark />
          </div>

          {badges.length > 0 && (
            <div className={`mt-4 w-full ${RISE}`}>
              <div className="h-px w-full bg-white/20" />
              {/*
                At most four badges, so they wrap to two lines at the narrowest
                width and need none of Hero's marquee machinery. The separator
                TRAILS its item rather than leading the next, so a wrap leaves
                the dot at the end of a line instead of orphaning it at the
                start of the following one -- DoctorHero's reasoning.
              */}
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-head text-h6 text-white">
                {badges.map((badge, i) => (
                  <span key={badge} className="flex items-center gap-x-3 whitespace-nowrap">
                    {badge}
                    {i < badges.length - 1 ? <span aria-hidden="true">·</span> : null}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        {/*
          Right column -- 35% tablet, 38% desktop. For a landscape photograph the
          row is `align-items: stretch`, so this column matches the left column's
          height and the `h-full` below resolves against it; that is what stops
          the photograph floating in dead space. A 650x450 source covering a
          ~450x440 box upscales about 1.2x -- imperceptible on a photograph, and
          the same trade DoctorHero makes with the portrait. Only dandruff and the
          conditions index are still on one.

          A near-square source (see WHOLE_MIN) is not stretched: it takes a
          square box, is centred on the row, and is NOT put under the gradient.
          The gradient is the reference's ::before overlay, which darkens the
          lower 65% of the photograph so text can sit over it. Nothing sits over
          this image, so on an illustration it only dimmed the labels and signs
          the picture is there to show.
        */}
        <div className={`relative w-full md:w-[35%] lg:w-[38%] ${whole ? 'md:self-center' : ''}`}>
          <div
            className={`relative isolate overflow-hidden rounded ${RISE} ${
              whole ? 'aspect-square' : 'h-full min-h-[280px] lg:min-h-[440px]'
            }`}
          >
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              // Still the LCP element on every treatment page.
              fetchPriority="high"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            />
            {!whole && (
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#02010100_35%,#1A1A1A_100%)] opacity-75"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
