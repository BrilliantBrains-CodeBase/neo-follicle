import Reveal from '../Reveal'

/**
 * Content doc SECTION 6, "Our Clinical Approach".
 *
 * Design ported from Process.tsx, which is the Folixa reference's home section
 * 6 -- Elementor container `09ebf3b`, cards `df408ef` (step 1, tinted) and
 * `cfa2976`. The step-card geometry, the ghosted aria-hidden numerals and the
 * `line`/`accent` chip treatment are all reused from it so the two numbered
 * sequences on this site read as the same component.
 *
 * Copy is verbatim from the content doc: the lead-in, the four numbered items
 * with the doc's own full stops, and the closing line. The doc's trailing note
 * ("This section improves user trust while preserving the original
 * diagnostic-first messaging") is an instruction to the builder, not copy, and
 * is not rendered.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from Process.tsx:
 *
 *   - The four steps sit beside a photograph rather than each carrying their
 *     own image band. The doc supplies one usable image for this section, not
 *     four, and repeating it across the cards would be worse than not using it.
 *   - No icon chip. Process's five steps are actions with matching glyphs
 *     (Headset, Eye, Dna); these four are things the clinic looks at, and
 *     icons.tsx has nothing that distinguishes "your scalp health" from
 *     "donor availability". The ghost numeral carries the card alone. Same
 *     reasoning as the icon note in DoctorExpertise.
 *   - The steps are a vertical <ol>, not a swipeable track. Four one-line
 *     items stack in less height than a carousel needs, and the mobile track
 *     in carousel.ts exists for cards with images and body copy.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** SECTION 6, verbatim, full stops included. */
const STEPS = [
  'Your hair loss pattern.',
  'Your scalp health.',
  'Donor availability.',
  'Long-term goals.',
]

export default function DoctorApproach() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance font-head text-h2 lg:max-w-[660px]">Our Clinical Approach</h2>

          <p className="text-body lg:max-w-[534px]">
            Instead of explaining procedures immediately, we begin by understanding:
          </p>
        </Reveal>

        <div className="flex flex-col gap-gap-sm md:flex-row md:gap-8">
          <Reveal className="md:w-2/5">
            {/* FLAGGED FOR CLIENT REVIEW -- stock, not Neo Follicle. See the
                image-provenance note in DoctorPhilosophy. */}
            <img
              src="/about/approach.webp"
              alt="A gloved clinician marking a planned hairline on a patient's scalp."
              width={1200}
              height={800}
              loading="lazy"
              className="h-full min-h-[240px] w-full rounded object-cover"
            />
          </Reveal>

          <ol className="flex flex-col gap-gap-sm md:w-3/5 md:gap-4">
            {STEPS.map((item, i) => (
              <Reveal
                key={item}
                as="li"
                delay={i * 100}
                className={`flex items-center justify-between gap-4 rounded border border-overlay p-5 md:p-6 ${FLOAT} ${
                  i === 0 ? 'bg-accent' : 'bg-base'
                }`}
              >
                <span className="font-head text-h5 text-secondary">{item}</span>
                {/* The <ol> already carries the sequence, so the numeral is
                    decorative -- same call Process.tsx made. */}
                <span aria-hidden="true" className="font-head text-h4 text-primary/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="text-center">
          <p className="text-body">
            Only after that do we recommend the most suitable treatment.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
