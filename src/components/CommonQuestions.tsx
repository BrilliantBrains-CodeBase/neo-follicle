import { ChevronDown, Square } from './icons'
import Reveal from './Reveal'

/**
 * Common Questions -- the home page FAQ band.
 *
 * Design ported from the Folixa reference, home section 10 -- Elementor
 * container `ba93984`, its right column `10f154b` and the nested-accordion
 * widget `cf1cf68`. Every value below is resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css,
 * with the global colour tokens read out of
 * folixa-design-reference/tokens/globals-raw.css:
 *
 *   019d18d  #FFFFFF  section background      -> base
 *   c7e169d  #F8FAFC  open/hover title fill,
 *                     and the panel fill      -> surface
 *   ef3ace8  #E5E7EB  item and panel border   -> line
 *
 * The visual target is
 * folixa-design-reference/pages/home/sections/10-answers-about-hair.png.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed. Same call as
 * Hero, About, Services, WhyNeoFollicle and Process.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 12, EXCEPT the subhead, which the doc does not supply. It is
 * authored from the doc's own FAQ topics (cost, safety, suitability, results)
 * and its repeated "a consultation confirms", and makes no outcome claim.
 * FLAGGED FOR CLIENT REVIEW. Same precedent Process set.
 *
 * NATIVE <details>, NOT REACT STATE. This is what the reference emits, and it
 * is the only thing compatible with the constraint Reveal.tsx documents: the
 * site is prerendered (`vite build --ssr` -> scripts/prerender.mjs) and
 * scripts/verify-seo.mjs reads the static HTML, so nothing may depend on JS to
 * become visible. All nine answers ship in the prerendered markup. The doc's
 * SEO recommendation 5 makes that load-bearing -- "is it safe" and "side
 * effects" are the queries this section is meant to win.
 *
 * The shared `name` gives the exclusive-open behaviour of the reference's
 * `max_items_expended: "one"` with no script. Browsers without it (Safari 16
 * and earlier) simply allow several open at once, which is a graceful
 * fallback, not a break. Do NOT hand-roll aria-expanded/aria-controls --
 * details/summary supply both.
 *
 * Two deliberate departures from the reference:
 *
 *   - No open/close slide. The reference animates the panel over 400ms;
 *     native <details> cannot animate its height without JS, and the no-JS
 *     rule above outranks the transition.
 *   - The panel holds the answer and nothing else. The reference's panel also
 *     carries an inner sub-heading, a divider and a blue check-circle meta
 *     line ("Typically 30 to 45 minutes"). The doc supplies none of those for
 *     any of the nine questions, and authoring nine of each would break its
 *     rule 8 ("Use the clinic's actual stats... No invented reviews, results
 *     or guarantees").
 *
 * STRUCTURED DATA -- DO NOT ADD ANY HERE. src/seo/schema/home.json already
 * carries an FAQPage node, and scripts/verify-seo.mjs asserts the emitted
 * graph is byte-identical to the neofollicle-seo-backup capture, so it cannot
 * be edited from this side. Emitting a second FAQPage from this component
 * would put two of them on one URL, which is an SEO defect.
 *
 * That capture holds EIGHT questions carried over from the old site, worded
 * differently from the doc's nine -- "What is the cost of hair transplant in
 * Bangalore?" against the doc's "How much does a hair transplant cost in
 * Bangalore?", and it has no equivalent of the doc's "Is a hair transplant
 * safe, and are there side effects?" at all. So the visible copy now follows
 * the new content doc while the structured data still follows the old site.
 * Google expects FAQPage markup to match the visible answers, so reconciling
 * the two is an outstanding SEO-owner decision, not a code fix.
 * FLAGGED FOR CLIENT REVIEW.
 */

/**
 * Item geometry. Radius 8px is the `rounded` token
 * (--n-accordion-border-radius:8px) and the 1rem padding is
 * --n-accordion-padding. The title fills with `surface` on hover and while
 * open, which is the reference's two rules on `.e-n-accordion-item-title`.
 */
const SUMMARY =
  'flex cursor-pointer list-none items-center justify-between gap-4 rounded border border-line p-4 ' +
  'transition hover:bg-surface group-open:bg-surface [&::-webkit-details-marker]:hidden'

/**
 * The panel. `-mt-2` is the reference's
 * --n-accordion-item-title-distance-from-content:-8px, which tucks the panel
 * under the title's bottom radius; `pt-2` is the panel's own 0.5rem top
 * padding, so the two cancel and the copy sits 8px below the title's baseline
 * box. Borders are 0/1/1/1 and the radius 0 0 8px 8px, per the reference.
 */
const PANEL = '-mt-2 rounded-b border-x border-b border-line bg-surface px-4 pb-4 pt-2'

/**
 * The title's clamp, verbatim from --n-accordion-title-font-size. It sits
 * between the config's `h5` and `h4` tokens and matches neither, so it is
 * written out rather than snapped to the nearest one. Weight 600 and
 * line-height 1.3em come from the widget's own title rule.
 */
const TITLE = 'font-head text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-semibold leading-[1.3] text-secondary'

/** SECTION 12 FAQ, verbatim. Nine questions, in the doc's order. */
const QUESTIONS = [
  {
    q: 'How much does a hair transplant cost in Bangalore?',
    a: 'Pricing is graft-based, from ₹60 to ₹100 per graft. A 2,000-graft procedure works out to roughly ₹1,20,000 to ₹2,00,000. The final cost is shared after a scalp evaluation, with EMI options and no hidden charges.',
  },
  {
    q: 'Is a hair transplant safe, and are there side effects?',
    a: 'Performed under local anaesthesia by a qualified surgeon, it is a safe day-care procedure. Temporary redness, mild swelling or scabbing can occur and settles within a few days. A medical evaluation checks for risks before your procedure.',
  },
  {
    q: 'Who performs the hair transplant at Neo Follicle?',
    a: 'Every case is led by Dr. Sandeep Mahapatra, a senior dermatologist and hair transplant surgeon with 20+ years of experience and 10,000+ transplants performed.',
  },
  {
    q: 'Does every hair loss patient need a transplant?',
    a: 'No. Early thinning, active hair fall, dandruff-related fall and alopecia often respond to GFC, PRP, QR678, medication or scalp treatment. A transplant is advised only when follicles are permanently lost.',
  },
  {
    q: 'Am I a suitable candidate for a hair transplant?',
    a: 'Suitability depends on your baldness grade, donor availability, scalp health, age and expectations. A consultation confirms whether a transplant is right for you.',
  },
  {
    q: 'Can women get a hair transplant?',
    a: 'Yes. Female hair transplant is offered after diagnosing the cause of thinning, with careful hairline and density planning.',
  },
  {
    q: 'Do you offer beard and eyebrow transplants?',
    a: 'Yes, for patchy beards, thin moustaches, and thin, over-plucked or scarred eyebrows.',
  },
  {
    q: 'Where is Neo Follicle located?',
    a: 'Marathahalli, Bangalore, near Marathahalli Bridge, serving Whitefield, Bellandur, Brookefield, Sarjapur Road, HSR Layout, Koramangala and nearby areas. Open 10 am to 8 pm, all days.',
  },
  {
    q: 'Are the results permanent and natural?',
    a: 'Transplanted follicles are taken from permanent donor zones and continue to grow for life. Results are designed to blend with your natural growth, with new growth appearing gradually over 3 to 12 months.',
  },
]

export default function CommonQuestions() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      {/*
        The reference is --flex-direction:row only on desktop; at 1024 and
        below it stacks and both columns go full width. Its gaps and vertical
        padding step 4rem/3rem/2rem and 5rem/4rem/3rem, which are exactly the
        `gap` and `section-y` spacing tokens.
      */}
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:flex-row lg:items-start lg:gap-gap">
        {/*
          The sticky sidebar. The left column pins once it clears the header and
          releases when this flex row ends, so the section's framing stays on
          screen for the length of the accordion. Three things make it work, and
          all three are load-bearing:

            - `lg:items-start` on the row above. A stretched flex item is as
              tall as the row, which leaves sticky no room to travel.
            - The row is taller than this column (nine accordion items against a
              heading block), which is what sticky travels through.
            - Reveal sits INSIDE this node, not on it. `animate-fadeInUp`
              carries a transform, and a transformed element becomes the
              containing block for any sticky descendant -- so sticky and the
              entrance animation cannot share a node.

          The offset clears the sticky header, which is 56px of logo plus
          `py-gutter` plus its 1px bottom border and never shrinks on scroll
          (Header.tsx), then adds 2rem of breathing room.

          `lg:` only. Below it the columns stack, where pinning the heading
          would just cover the accordion.
        */}
        <div className="lg:sticky lg:top-[calc(97px_+_2rem)] lg:flex-1">
          <Reveal className="flex flex-col gap-4">
            {/* Eyebrow resolves to the plain h6 token, as in Process. The 5px
                gap is Elementor's icon-list default. */}
            <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
              <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
              Common Questions
            </p>

            {/* No `capitalize`, though the kit's global h2 carries it -- our copy
                is already title case and the transform would render "In
                Bangalore". Same call every sibling section made. */}
            <h2 className="text-balance font-head text-h2">
              Answers About Hair Transplant in Bangalore
            </h2>

            {/* AUTHORED -- the doc has no FAQ subhead. Built only from the topics
                the nine answers below already cover. FLAGGED FOR CLIENT REVIEW. */}
            <p className="text-body lg:max-w-[440px]">
              Quick answers on cost, safety, suitability and results. What is right for your case is
              confirmed at consultation, after a scalp and donor-area evaluation.
            </p>
          </Reveal>
        </div>

        {/* Right column, --width:55% on desktop and 100% below it. */}
        <Reveal className="flex w-full flex-col gap-4 lg:w-[55%]">
          {QUESTIONS.map(({ q, a }, i) => (
            <details
              key={q}
              /* Shared name = the reference's exclusive `max_items_expended:
                 "one"`, with no script. */
              name="home-faq"
              open={i === 0}
              className="group"
            >
              <summary className={SUMMARY}>
                <h3 className={TITLE}>
                  {/* The numeral is the reference's ("01. Consultation"), but
                      aria-hidden so assistive tech and any text extraction
                      read the question alone. Same treatment as Process's
                      step numerals. */}
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}. </span>
                  {q}
                </h3>
                {/* jki-angle-down-solid at the reference's 18px and `primary`,
                    flipped for the open state -- the same reuse ArrowRight
                    makes for the carousel's left arrow. */}
                <ChevronDown className="h-[18px] w-[18px] shrink-0 text-primary transition-transform group-open:rotate-180 motion-reduce:transition-none" />
              </summary>

              <div className={PANEL}>
                <p className="text-body">{a}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
