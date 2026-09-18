import { CheckCircle } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 8, "Why Neo Follicle Stands Apart".
 * Layout line in the doc: "Dark background".
 *
 * Design ported from the Folixa reference, about page section 5's bordered
 * icon-box grid -- Elementor container `0f28367`, grid `9325843`: radius 8px,
 * padding 2rem, 1px border. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css.
 * The dark treatment is the reference's own, taken from the middle panel of
 * the about page's three-card mosaic (`secondary` ground, white text) and from
 * its CTA card, which is the only other near-black band in the kit.
 *
 * Copy is verbatim from the content doc -- the six labels, nothing more. The
 * doc gives no description under any of them and none is invented here, which
 * is why these are labels on a ground rather than icon-boxes with body copy.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Two deliberate departures from the reference:
 *
 *   - The grid is 3-up, not the reference's 2-up. Six one-line labels in two
 *     columns runs three rows of very wide, very empty cards.
 *   - The cards carry `CheckCircle` rather than a distinct glyph each. It is
 *     the one mark that means the same thing on all six ("this is included"),
 *     where six different medical glyphs would imply six different kinds of
 *     thing. Same reasoning as the icon note in DoctorExpertise. About.tsx
 *     uses CheckCircle the same way for its credentials row.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white`.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** SECTION 8, verbatim, in the doc's order. */
const POINTS = [
  'Doctor-Led Planning',
  'Natural Hairlines',
  'Advanced NFT Implanters',
  'Medical & Surgical Options',
  'Personalized Treatment Plans',
  'Safe & Affordable Care',
]

export default function DoctorDifference() {
  return (
    <section className="bg-secondary py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance font-head text-h2 text-white lg:max-w-[660px]">
            Why Neo Follicle Stands Apart
          </h2>
        </Reveal>

        <ul className="grid gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal
              key={point}
              as="li"
              delay={i * 100}
              className={`flex h-full items-start gap-3 rounded border border-white/10 bg-white/5 p-8 ${FLOAT}`}
            >
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <span className="font-head text-h5 text-white">{point}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
