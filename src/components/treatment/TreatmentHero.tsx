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

export default function TreatmentHero({ hero }: { hero: TreatmentPageData['hero'] }) {
  const badges = hero.badges ?? []

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
          Right column -- 35% tablet, 38% desktop. The row is `align-items:
          stretch` by default, so this column matches the left column's height
          and the `h-full` below resolves against it. That is what stops the
          photograph floating in dead space.

          A 650x450 source (18 of the 20 pages) covering a ~450x440 box
          upscales about 1.2x. Imperceptible on a photograph, and the same
          trade DoctorHero already makes with the portrait.
        */}
        <div className="relative w-full md:w-[35%] lg:w-[38%]">
          <div className={`relative isolate h-full min-h-[280px] overflow-hidden rounded ${RISE} lg:min-h-[440px]`}>
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              // Still the LCP element on every treatment page.
              fetchPriority="high"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            />
            {/* The reference's ::before overlay, at its --overlay-opacity:0.75.
                Its own layer rather than a gradient on the image node, so the
                photograph can be swapped without retuning anything. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#02010100_35%,#1A1A1A_100%)] opacity-75"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
