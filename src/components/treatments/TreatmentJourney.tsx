import Reveal from '../Reveal'

/**
 * Content doc SECTION 8, "Treatment Journey".
 * The doc's layout line, verbatim: "Folixa-style vertical timeline."
 *
 * Design ported from the Folixa reference, home section 6 -- Elementor
 * container `09ebf3b` and its step cards `df408ef` (step 1, tinted `accent`)
 * and `cfa2976` (the rest, `base`). Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css;
 * the visual target is
 * folixa-design-reference/pages/home/sections/06-treatment-process.png. That is
 * the same object Process.tsx carries on the home page, and the ghosted step
 * numeral below is Process's.
 *
 * Copy is verbatim from the content doc: six stage names, and nothing else. The
 * doc supplies NO description under any of them -- unlike the home page's
 * SECTION 6, which gives each step a sentence. None is invented here; a stage
 * named "Recovery" with an authored paragraph under it would be this page
 * making a clinical claim the client did not write.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from the reference:
 *
 *   - VERTICAL, not the reference's horizontal 4-up grid, because the doc asks
 *     for a vertical timeline by name. The connecting rule and the numbered
 *     nodes are what carry the sequence that the reference carried by reading
 *     order; the numerals themselves are `aria-hidden`, since the <ol> already
 *     announces the order.
 *   - Six stages, not the reference's four. The doc's journey has six and none
 *     may be dropped.
 *   - NO PHOTOGRAPHS, although Process.tsx gives each of its five home-page
 *     stages one. public/process/ holds exactly five images and this journey
 *     has six stages -- there is no asset for "Long-Term Guidance" -- so five
 *     illustrated rows above one bare row would read as a missing file rather
 *     than a design. The band runs without imagery until a sixth exists.
 *     FLAGGED FOR CLIENT REVIEW.
 */

/** SECTION 8's six stages, verbatim, in the doc's order. */
const STAGES = [
  'Consultation',
  'Diagnosis',
  'Treatment Planning',
  'Procedure',
  'Recovery',
  'Long-Term Guidance',
]

export default function TreatmentJourney() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      {/*
        Two-column: heading held left, the timeline filling the rest. It was a
        760px rail centred under a centred heading -- six short labels in the
        middle of an otherwise empty band. Left column is sticky from `lg`, the
        same geometry as Split in src/components/treatment/shell.tsx.
      */}
      <div className="container grid gap-gap-mobile md:gap-gap-tablet lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-gap">
        {/*
          The doc's own section title is the heading. No eyebrow line above it:
          the doc supplies no second heading for this section, so an eyebrow
          would have to be authored. Same call DoctorExpertise.tsx records.
        */}
        <Reveal className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-head text-h2 text-secondary">Treatment Journey</h2>
        </Reveal>

        {/*
          The rail. `relative` on the <ol> anchors the continuous rule; each
          row's node sits on top of it. The rule is inset by half the node's
          width so it runs through their centres, and it is `aria-hidden`
          because it carries no information the list does not.
        */}
        <ol className="relative flex w-full flex-col">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[27px] top-8 w-px bg-line md:left-[31px]"
          />

          {STAGES.map((stage, i) => (
            <Reveal
              key={stage}
              as="li"
              delay={i * 100}
              className="relative flex items-center gap-5 py-4 md:gap-8"
            >
              {/*
                The node. Step 1 is filled `accent` and the rest `base` with a
                `line` border -- the reference's own tinted-first-card rule,
                carried over from Process.tsx. `z-10` lifts it off the rail.
              */}
              <span
                aria-hidden="true"
                className={`z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border font-head text-h5 md:h-16 md:w-16 ${
                  i === 0
                    ? 'border-accent bg-accent text-secondary'
                    : 'border-line bg-base text-primary/40'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="font-head text-h4 text-secondary">{stage}</h3>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
