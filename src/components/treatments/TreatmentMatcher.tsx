import Reveal from '../Reveal'

/**
 * Content doc SECTION 6, "Which Treatment is Right for You?".
 * The doc's instruction: "Keep the comparison table. This remains highly
 * valuable for AEO."
 *
 * Because it is an AEO asset, the table ships in the PRERENDERED HTML -- no
 * filtering, no JS, no progressive disclosure. scripts/prerender.mjs renders
 * this to static markup and scripts/verify-seo.mjs reads that file; a table
 * assembled on the client would be invisible to both, and to the extractive
 * search results this section exists to win.
 *
 * DO NOT ADD STRUCTURED DATA HERE. src/seo/schema/hair-loss-treatment-in-
 * bangalore.json is asserted byte-for-byte against the neofollicle-seo-backup
 * capture by verify-seo.mjs, so it cannot be extended from this side, and a
 * second JSON-LD graph emitted from a component would be an SEO defect. Same
 * rule CommonQuestions.tsx records.
 *
 * Design: the Folixa kit has no table widget anywhere in the capture -- the
 * reference site carries none on any of its 18 pages -- so this is built from
 * the kit's own primitives rather than ported: `line` hairline borders, the
 * `surface` alternating fill the section grounds already use, `font-head` at
 * the h6 token for the column heads, radius 0.5rem on the wrapper. Nothing
 * off-token.
 *
 * Copy is verbatim from the content doc: two column heads and six rows.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * One deliberate departure worth recording: below `md` the table SCROLLS
 * HORIZONTALLY inside its own wrapper rather than collapsing into stacked
 * cards. A two-column comparison stops being a comparison the moment the two
 * columns are no longer side by side, and this table's whole value is reading
 * concern against recommendation on one line. The wrapper is the only thing
 * that scrolls -- the page itself never gains a horizontal scrollbar.
 */

/** SECTION 6's table, verbatim, in the doc's order. */
const ROWS = [
  { concern: 'Early Thinning', direction: 'PRP, GFC, QR678, Dutexome' },
  { concern: 'Active Hair Fall', direction: 'Medical Diagnosis' },
  { concern: 'Receding Hairline', direction: 'Hair Transplant' },
  { concern: 'Crown Baldness', direction: 'Hair Transplant + Support' },
  { concern: 'Female Thinning', direction: 'Diagnosis-first Treatment' },
  { concern: 'Beard Gaps', direction: 'Beard Transplant' },
]

export default function TreatmentMatcher() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      {/*
        Two-column: heading held left, table filling the rest. The table used to
        sit in a 760px box centred under a centred heading, which left the outer
        third of the band empty and crowded the two columns together. The left
        column is sticky from `lg` so the heading stays with the rows -- same
        geometry as Split in src/components/treatment/shell.tsx, inlined here
        because these overview sections share no shell.
      */}
      <div className="container grid gap-gap-mobile md:gap-gap-tablet lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-gap">
        {/*
          The doc's own section title is the heading. No eyebrow line above it:
          the doc supplies no second heading for this section, so an eyebrow
          would have to be authored. Same call DoctorExpertise.tsx records.
        */}
        <Reveal className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-head text-h2 text-secondary">
            Which Treatment is Right for You?
          </h2>
        </Reveal>

        <Reveal>
          {/*
            `overflow-x-auto` is scoped to this wrapper, never the page. The
            `-mx-gutter ... px-gutter` pair lets the scrollable region bleed
            through the container's padding on mobile so the right-hand column
            is not clipped flush against the screen edge -- the same device
            carousel.ts uses for its card tracks.
          */}
          <div className="-mx-gutter overflow-x-auto px-gutter md:mx-0 md:px-0">
            <table className="w-full min-w-[440px] border-collapse overflow-hidden rounded border border-line text-left">
              <caption className="sr-only">
                Hair loss concerns and the treatment direction recommended for each
              </caption>
              <thead>
                <tr className="bg-secondary">
                  <th
                    scope="col"
                    className="p-5 font-head text-h6 font-medium text-white md:w-1/2 md:p-6"
                  >
                    Concern
                  </th>
                  <th
                    scope="col"
                    className="p-5 font-head text-h6 font-medium text-white md:w-1/2 md:p-6"
                  >
                    Recommended Direction
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(({ concern, direction }, i) => (
                  <tr
                    key={concern}
                    className={`border-t border-line ${i % 2 === 0 ? 'bg-base' : 'bg-surface'}`}
                  >
                    {/* A row header, not a cell: the concern is what identifies
                        the row, which is what lets a screen reader announce the
                        recommendation with its subject. */}
                    <th
                      scope="row"
                      className="p-5 text-left font-head text-h6 font-medium text-secondary md:p-6"
                    >
                      {concern}
                    </th>
                    <td className="p-5 text-body text-body md:p-6">{direction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
