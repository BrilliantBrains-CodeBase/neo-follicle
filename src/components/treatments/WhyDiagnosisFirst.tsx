import { CheckCircle } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 7, "Why Diagnosis Comes First".
 *
 * The doc's note on this section: it "preserves the original message that every
 * patient is evaluated based on" the five criteria below -- so the list is a
 * ported signal from the live site, not new copy, and none of the five may be
 * dropped or reworded.
 *
 * Design ported from the Folixa reference's dark band -- the about page's
 * `secondary` ground section, Elementor container `3e10463`'s sibling
 * treatment, resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css.
 * The geometry is the reference's two-column split: copy left, media right,
 * `--gap:4rem` at `--padding-top:5rem`, which is the `gap-gap` /
 * `py-section-y` pair. Same dark treatment DoctorHero's card uses.
 *
 * Copy is verbatim from the content doc. Nothing here is authored -- there is
 * no subhead under the h2 because the doc supplies none, and inventing one for
 * a section whose whole point is diagnostic caution would be the wrong place
 * to start.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Two deliberate departures:
 *
 *   - The band is full-bleed `secondary` rather than an inset rounded card.
 *     It sits between two light sections and is the page's only dark stop; the
 *     full-width ground is what makes it read as a division rather than as
 *     another card in a run of cards.
 *   - The photograph is /why/diagnosis.webp, which the HOME page also uses
 *     (WhyNeoFollicle's "Dermatologist-Led Diagnosis" card). It is the only
 *     asset in public/ that depicts the diagnostic consultation this section
 *     argues for, and it appears nowhere else on THIS page. Re-used
 *     deliberately rather than substituted with something off-topic; distinct
 *     photography would be the right fix. FLAGGED FOR CLIENT REVIEW.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white`.
 */

/** SECTION 7's evaluation criteria, verbatim, in the doc's order. */
const CRITERIA = [
  'Hair loss pattern',
  'Donor strength',
  'Scalp health',
  'Medical history',
  'Long-term goals',
]

export default function WhyDiagnosisFirst() {
  return (
    <section className="bg-secondary py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col items-center gap-gap-mobile md:flex-row md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex w-full flex-col gap-4 md:w-1/2">
          {/*
            The doc's own section title is the heading, with no eyebrow above
            it -- the doc supplies no second heading here, so an eyebrow would
            have to be authored. Same call DoctorExpertise.tsx records.

            No `capitalize`, though the reference's global h2 carries it; it is
            dropped for consistency with every sibling section.
          */}
          <h2 className="text-balance font-head text-h2 text-white">Why Diagnosis Comes First</h2>

          <p className="mt-1 text-body text-white/90">
            Every patient is evaluated based on:
          </p>

          <ul className="mt-2 flex flex-col gap-3">
            {CRITERIA.map((item, i) => (
              <Reveal key={item} as="li" delay={i * 100} className="flex items-start gap-3">
                <CheckCircle className="mt-[5px] h-5 w-5 shrink-0 text-primary" />
                <span className="font-head text-h5 text-white">{item}</span>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="w-full md:w-1/2">
          {/* FLAGGED FOR CLIENT REVIEW -- shared with the home page's
              WhyNeoFollicle card. See the header note. */}
          <img
            src="/why/diagnosis.webp"
            alt="A dermatologist at a consulting desk showing a patient a tablet with a scalp trichoscopy comparison."
            width={1200}
            height={800}
            loading="lazy"
            className="h-full max-h-[460px] w-full rounded object-cover"
          />
        </Reveal>
      </div>
    </section>
  )
}
