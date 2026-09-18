import { Square } from '../icons'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 4, "Our Philosophy" / "Why Patients Choose Neo Follicle".
 * Layout line in the doc: "Background: Soft cream section".
 *
 * Design ported from the Folixa reference, about page section 6 -- Elementor
 * container `00e3c2e`, its three-card mosaic `3d20e9b` with panels `15c1c54`
 * (outer cards grey, middle card near-black with white text) and the
 * asymmetric mission/vision row `190ff98`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css;
 * the visual target is folixa-design-reference/pages/about/sections/06-*.png.
 *
 * Copy is verbatim from the content doc. Nothing here is authored: the answer
 * panel is the doc's own three sentences in the doc's own order, with the
 * doc's question moved above them rather than below.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Four deliberate departures from the reference:
 *
 *   - The ground is the `surface` token, not a literal cream. The doc asks for
 *     "soft cream"; the kit has no cream, and inventing one would be the only
 *     off-token colour on the site. `surface` (#F8FAFC) is the kit's own
 *     section-separating step and is what every other tinted band here uses.
 *   - The heading is an <h2>. The doc marks it `#`, as it also does SECTION 1
 *     and SECTION 9. Only the hero may carry the h1.
 *   - The doc's question is rendered as a <p>, not a heading. It is a
 *     pull-quote, and a page with one h1 should not gain an outline entry for
 *     a rhetorical question. Same call About.tsx made for its photo-card line.
 *   - `margin-top: -2rem` on the reference's second row is dropped. It tucks
 *     that row under the one above, which works when both are bordered cards
 *     of equal weight; here the second row is a photograph beside a panel and
 *     the overlap reads as a mistake.
 *
 * IMAGE PROVENANCE, and why there is only one image in this section.
 * The content doc supplies eight images. Four are not publishable and are
 * excluded:
 *   - image3: AI-generated, and carries a real third-party brand mark (a
 *     "FOUR SEASONS" logo on the wall) plus garbled text on the monitor.
 *   - image6 and image7: graphic post-operative close-ups of an unidentified
 *     person, with no evidence of patient consent. image7 is also 399x407,
 *     below any usable size.
 *   - image8: a before/after results grid with "Before / Day1 / 2 Weeks ..."
 *     burned into the pixels. Burned-in text is the exact defect Process.tsx
 *     rejected an image for -- it crops unpredictably, duplicates the page's
 *     own copy, and is invisible to screen readers and translation. It is also
 *     a treatment-outcome claim attributed to no verified patient.
 * Of the four that remain, three are used once each on this page. The fourth
 * (image2, a PRP injection) is 500x500; every remaining slot on the page is a
 * wide band, and filling one would mean upscaling it to roughly 1240px. It is
 * left out rather than shipped soft. A larger copy would be usable.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** SECTION 4 "We focus on:", verbatim, full stops included. */
const FOCUS = ['The right diagnosis.', 'The right treatment.', 'The right timing.']

export default function DoctorPhilosophy() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* The 5px gap is Elementor's icon-list default. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Our Philosophy
          </p>

          <h2 className="text-balance font-head text-h2 lg:max-w-[660px]">
            Why Patients Choose Neo Follicle
          </h2>

          <p className="text-body lg:max-w-[534px]">Many clinics focus only on graft numbers.</p>
        </Reveal>

        {/*
          The three focus points. The reference tints the middle card of its
          three-card mosaic near-black with white text; kept, because it makes
          the row read as one object rather than three repeats.
        */}
        <ul className="grid gap-gap-sm md:grid-cols-3 md:gap-8">
          {FOCUS.map((item, i) => (
            <Reveal
              key={item}
              as="li"
              delay={i * 100}
              className={`flex flex-col items-center justify-center gap-4 rounded border border-line p-8 text-center ${FLOAT} ${
                i === 1 ? 'bg-secondary' : 'bg-base'
              }`}
            >
              <span aria-hidden="true" className="font-head text-h4 text-primary/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className={`font-head text-h5 ${i === 1 ? 'text-white' : 'text-secondary'}`}>
                {item}
              </p>
            </Reveal>
          ))}
        </ul>

        {/* The reference's asymmetric second row: 1fr image, 1.5fr panel. */}
        <div className="flex flex-col gap-gap-sm md:flex-row md:gap-8">
          <Reveal className="md:w-2/5">
            {/* FLAGGED FOR CLIENT REVIEW -- stock, not Neo Follicle. See the
                header note. Depicts the doc's diagnosis-first argument. */}
            <img
              src="/about/philosophy.webp"
              alt="A dermatologist using a trichoscope on a seated patient while reviewing the magnified scalp image on a tablet."
              width={1200}
              height={670}
              loading="lazy"
              className="h-full min-h-[240px] w-full rounded object-cover"
            />
          </Reveal>

          {/*
            The doc names this question as the one the section answers, and the
            three sentences under it are the doc's answer, in the doc's order.
            Question above answer, rather than the doc's order of answer then
            question, so the pairing is explicit to a reader and to an
            extractive search result. The question is a <p>, not a heading --
            see the header note.
          */}
          <Reveal delay={100} className="flex flex-col gap-4 rounded bg-base p-8 md:w-3/5">
            <p className="border-l-2 border-primary pl-5 font-head text-h5 text-secondary">
              &ldquo;Will every patient need a hair transplant?&rdquo;
            </p>
            <p className="text-body">Sometimes that means recommending a hair transplant.</p>
            <p className="text-body">Sometimes it means helping you avoid one&mdash;for now.</p>
            <p className="text-body">
              Every recommendation is based on your scalp evaluation rather than a standardized
              package.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
