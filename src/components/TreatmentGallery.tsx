import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Square } from './icons'

/**
 * Home treatment gallery -- SECTION 9, Results (Before & After).
 *
 * Design ported from the Folixa reference, home section 8 -- Elementor
 * container `c5e604c`, its heading block `af7a15b` and its
 * `jkit_portfolio_gallery` widget `977bd37` inside `bf653f9`. The widget's own
 * rules come from
 * folixa-design-reference/assets/css/plugins__jeg-elementor-kit__assets__css__elements__main.css
 * and are overridden in
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css;
 * the visual target is
 * folixa-design-reference/pages/home/sections/08-real-results-from-hair-restoration-treatments.png.
 *
 * The widget is an image accordion: one rounded band, N full-height label
 * columns overlaid on a single cover-sized photo, and hovering a column
 * cross-fades that column's photo in behind all of them. Resolved values:
 *
 *   .row-item        flex 0 0 100%/N, height 65vh desktop / 55vh tablet /
 *                    25vh mobile, border-right 1px rgba(255,255,255,.3),
 *                    dropped on the last item in each row; .current-item gets
 *                    a rgba(0,0,0,.1) tint.
 *   .row-item-info   padding 40px 10px 40px 20px, text-align center, and an
 *                    :after panel that grows height 0 -> 100% in white behind
 *                    the label on hover, over 400ms.
 *   .info-title      global typography `6cd0e45`, which resolves to exactly
 *                    the `text-h4` token; colour `019d18d` = #FFFFFF, going to
 *                    `secondary` on hover.
 *   .image-item      absolute inset-0, object-fit cover, inactive
 *                    scale(1.1)/opacity 0, active scale(1)/opacity 1, 700ms.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed. Same call as
 * Hero, About and Services.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 9 -- the heading, the subhead, the six RESULT TABS and the
 * disclaimer, which the doc marks "keep visible". The eyebrow word "Treatment
 * Gallery" is the reference's own label for this section; it makes no claim.
 *
 * Seven deliberate departures from the reference:
 *
 *   - Six columns, not four. The doc's RESULT TABS list has six entries. They
 *     run 6-across on desktop AND tablet, dropping to 2-across x 3 rows on
 *     mobile -- the reference likewise only changes its column count at mobile.
 *     Six columns are narrower than the reference's four, so the label steps
 *     down from the reference's `text-h4` (kept at `xl:`, the design width,
 *     which is where its screenshot was taken) through `text-h5` and `text-h6`
 *     as the columns narrow. At the reference's own size "Female Restoration"
 *     overflows a sixth of the container below 1240px. `min-w-0` on the column
 *     is what stops a too-wide label wrapping the whole row instead.
 *   - Mobile column height is 20vh, not the reference's 25vh. Three rows at
 *     25vh would make the band 75vh tall and strongly portrait, which no
 *     landscape before/after survives being cover-cropped into. 3 x 20vh sits
 *     close to the reference's own 2 x 25vh band, so the proportion is nearer
 *     the reference than the literal value would be.
 *   - Click, focus and keyboard activation are added alongside the reference's
 *     hover-only switching (its `on-hover` class). Hover-only is unreachable on
 *     touch and by keyboard. This is NOT the ARIA tabs pattern: there are no
 *     per-tab panels, only one shared image layer, so the columns are
 *     aria-pressed buttons in a labelled group.
 *   - A subhead is rendered. The reference section has none; the doc supplies
 *     one, so it sits in the heading block at `text-body-lg`.
 *   - The disclaimer block and the CTA are added. The doc requires both and
 *     the reference has a slot for neither.
 *   - No `capitalize` on the h2, unlike Hero and the kit's h1/h2 global. Our
 *     heading is "Before and After: Real Hair Restoration Journeys" and CSS
 *     `capitalize` would render "Before And After", altering the client's copy
 *     on screen.
 *   - Scrims are added behind the labels. See LABEL_SCRIM and CELL_SCRIM
 *     below: the reference does not need them, our photographs do.
 *   - Images are <img> layers, not CSS background-image, so they get
 *     loading="lazy", decoding="async" and intrinsic dimensions. Same call as
 *     About and Services. All six keep real alt text rather than being
 *     aria-hidden when inactive, so the prerendered HTML carries six
 *     keyword-aware alts (the doc's final recommendation 6).
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` -- same call as Hero, About,
 * Services and Footer.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:hover:transform-none'

/** The kit's single button geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full shrink-0 items-center justify-center rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

/**
 * Legibility scrim behind the labels, in the two shapes the layout needs below.
 *
 * The reference needs none: its four stock photos are all mid-tone pink, so
 * white labels read cleanly on them. Ours are real clinical photographs and
 * several are full-bleed composites with pale scalp and skin exactly where the
 * labels sit, where white-on-white is unreadable. Both variants are scoped to
 * the label area alone, so the photo below is untouched and the scrim is close
 * to invisible on the reference's own kind of imagery.
 */
const SCRIM_GRADIENT = 'bg-[linear-gradient(180deg,#000000A6_0%,#00000000_100%)]'

/**
 * From `md:` up the six labels are one row across the top of the band, so a
 * single gradient over the band's top ~192px covers all of them and leaves the
 * photo below untouched.
 */
const LABEL_SCRIM = `pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-48 md:block ${SCRIM_GRADIENT}`

/**
 * Below `md:` the labels tile 2-across x 3 rows down the whole band, so a
 * top-of-band gradient would only cover the first row. Each label cell carries
 * its own instead. It sits before the white hover panel in the DOM so that
 * panel, at the same -z-10, still paints over it.
 */
const CELL_SCRIM = `absolute inset-x-0 top-0 -z-10 h-full md:hidden ${SCRIM_GRADIENT}`

/**
 * SECTION 9's RESULT TABS, verbatim, mapped to the live site's own gallery
 * categories (neofollicle-seo-backup/pages/image-gallery/raw.html).
 *
 * Every photo is a REAL Neo Follicle before/after, not stock -- so unlike
 * /hero.webp and the /services/ set these carry no replace-before-launch TODO.
 * Each source is a self-contained 650x450 composite whose patient photos sit
 * inside a #24363F frame with "Before"/"After" burned in, so each one is padded
 * onto a 1600x1200 canvas in that same #24363F before conversion: the padding
 * is invisible, and it is what stops the reference's object-cover crop from
 * slicing the captions off at any viewport height. Do not re-export these from
 * the 650x450 originals without repeating that step.
 *
 * Note the live site files named `female*.png` (no `-1` suffix) sit under its
 * BEARD heading and only `female-*-1.png` under Female Hair Restoration -- the
 * mapping below follows the rendered gallery, not the filenames.
 *
 * THREE THINGS FLAGGED FOR CLIENT REVIEW:
 *
 *   1. The Failed Repair tab has no genuine repair result to show. All three
 *      assets on the live gallery (Failed-Hair-Transplant-1/2/3) are photos of
 *      pre-repair damage from OTHER clinics, with captions burned in
 *      ("Unnatural hairlines, very low density, doll's hair appearance",
 *      "Visible Scars. Pluggy Appearance"). Under a heading reading "Real Hair
 *      Restoration Journeys" that risks being read as our outcome, so the alt
 *      text below says plainly that it is the state before corrective work.
 *      Ask the client for a real repair before/after.
 *   2. Several hair-transplant composites carry "NEO FOLLICLE ... BHUBANESWAR"
 *      clinic signage while this site is the Marathahalli, Bangalore clinic.
 *   3. Most composites carry burned-in eye bars; the eyebrow and GFC/PRP ones
 *      do not. Confirm patient consent for the unmasked images.
 */
const CATEGORIES = [
  {
    label: 'Hair Transplant',
    img: '/gallery/hair-transplant.webp',
    alt: 'Hair transplant before and after: a receding frontal hairline and thinning crown, then restored density and a rebuilt hairline.',
  },
  {
    label: 'Beard Transplant',
    img: '/gallery/beard.webp',
    alt: 'Beard transplant before and after: a patchy jawline marked out for grafting, then an even, full beard.',
  },
  {
    label: 'Female Restoration',
    img: '/gallery/female.webp',
    alt: 'Female hair restoration before and after: diffuse thinning across the crown, then denser coverage over the same area.',
  },
  {
    label: 'Eyebrow',
    img: '/gallery/eyebrow.webp',
    alt: 'Eyebrow restoration before and after: sparse, over-plucked brows, then a rebuilt brow line with natural hair angle.',
  },
  {
    label: 'Failed Repair',
    img: '/gallery/repair.webp',
    alt: 'A hair transplant performed elsewhere, shown before corrective work: an unnatural hairline with very low density.',
  },
  {
    label: 'GFC & PRP',
    img: '/gallery/gfc-prp.webp',
    alt: 'GFC and PRP therapy before and after: a widening centre parting, then thicker hair along the same parting.',
  },
]

export default function TreatmentGallery() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/* Heading block `af7a15b` -- 600px, gap 1rem, left-aligned. */}
        <div className="flex flex-col gap-4 animate-fadeInUp motion-reduce:animate-none md:max-w-[600px]">
          {/* On this white ground the mark is `primary` and the label `secondary`. */}
          <p className="flex items-start gap-2 font-head text-h6 text-secondary">
            <Square className="mt-[5px] h-[14px] w-[14px] shrink-0 text-primary" />
            Treatment Gallery
          </p>
          <h2 className="font-head text-h2 text-secondary">
            Before and After: Real Hair Restoration Journeys
          </h2>
          <p className="text-body-lg text-body">
            Browse outcomes by procedure. Individual results vary with age, baldness grade, donor
            availability, scalp condition and aftercare.
          </p>
        </div>

        {/*
          The band -- `bf653f9` (overflow hidden, radius 0.5rem) wrapping the
          widget's .portfolio-gallery-container. Its height comes from the label
          row, exactly as the reference's does. The ground is #24363F, which is
          the composites' own frame colour, so the padded canvas is seamless.
        */}
        <div className="relative isolate overflow-hidden rounded bg-[#24363F] animate-fadeInUp motion-reduce:animate-none">
          {CATEGORIES.map((category, i) => (
            <img
              key={category.img}
              src={category.img}
              alt={category.alt}
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-700 ease-out motion-reduce:transition-none ${
                i === active
                  ? 'scale-100 opacity-100'
                  : 'scale-110 opacity-0 motion-reduce:scale-100'
              }`}
            />
          ))}

          {/* Paints over the images: same -z-10, later in the DOM. */}
          <div aria-hidden="true" className={LABEL_SCRIM} />

          {/*
            `.row-items` -- flex-wrap, so six columns run 6-across from `md:` up
            and fall to 2-across x 3 rows below it. The right-hand hairline is
            dropped on the last item of each row, which is every 2nd on mobile
            and only the 6th from `md:` up.
          */}
          <div
            role="group"
            aria-label="Choose a result category"
            className="relative flex flex-wrap [&>*:nth-child(2n)]:border-r-0 md:[&>*:nth-child(2n)]:border-r md:[&>*:nth-child(6n)]:border-r-0"
          >
            {CATEGORIES.map((category, i) => (
              <button
                key={category.label}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex h-[20vh] min-w-0 basis-1/2 flex-col border-r border-white/30 transition-all duration-[400ms] md:h-[55vh] md:basis-1/6 lg:h-[65vh]"
              >
                {/* `.row-item.current-item:before` */}
                {i === active && (
                  <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
                )}

                {/* `.row-item-info` and its growing white `:after` panel. */}
                <span className="relative isolate block overflow-hidden px-2 py-10 text-center xl:pl-5 xl:pr-[10px]">
                  <span aria-hidden="true" className={CELL_SCRIM} />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 h-0 bg-white transition-all duration-[400ms] group-hover:h-full motion-reduce:transition-none"
                  />
                  <span className="font-head text-h4 text-white transition-colors duration-[400ms] group-hover:text-secondary md:text-h6 lg:text-h5 xl:text-h4">
                    {category.label}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The doc's disclaimer, which it marks "keep visible", plus its CTA. */}
        <div className="flex flex-col gap-gap-sm md:flex-row md:items-center md:justify-between">
          <p className="rounded border border-line bg-surface p-5 text-body md:max-w-[720px]">
            Before and after images are shared for patient education and to show treatment
            possibilities. A consultation is required to understand what result is realistic for
            your case.
          </p>
          <Link
            to="/image-gallery/"
            className={`${BUTTON} bg-primary text-white hover:bg-primary-dark`}
          >
            View the Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  )
}
