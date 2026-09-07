import { ClipboardList, Dna, Eye, HandHoldingHeart, Headset, Square } from './icons'
import Reveal from './Reveal'

/**
 * Our Process -- the patient journey band.
 *
 * Design ported from the Folixa reference, home section 6 -- Elementor
 * container `09ebf3b` and its cards `df408ef` (step 1, tinted) and `cfa2976`
 * (the rest). Every value below is resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css;
 * the visual target is
 * folixa-design-reference/pages/home/sections/06-treatment-process.png.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 6, EXCEPT the subhead, which the doc does not supply. It is authored
 * from facts stated elsewhere in the same doc -- SECTION 2 ("He personally
 * evaluates your scalp") and step 5 ("long-term maintenance guidance") -- and
 * makes no outcome claim. FLAGGED FOR CLIENT REVIEW.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Five deliberate departures from the reference:
 *
 *   - Five cards, not four. The reference grid is repeat(4, 1fr); the doc's
 *     journey has five stages and none of them may be dropped, so desktop is
 *     `lg:grid-cols-5`. The cards are correspondingly narrower, so their
 *     padding stays at the reference's mobile 1.25rem on desktop rather than
 *     widening back to 1.5rem.
 *   - A ghosted step numeral beside the icon chip, and card text aligned left
 *     rather than centred. The reference centres one-word titles
 *     ("Consultation", "Recovery"); ours run to two or three lines in a
 *     narrower column, and the doc's own heading promises "Step by Step".
 *     The numerals are aria-hidden -- the <ol> already carries the sequence.
 *   - Card titles are <h3>. The reference emits <h5> for its first card and
 *     <h4> for the other three, which is its own bug. Under this page's single
 *     <h2>, <h3> is the correct level (doc recommendation 1).
 *   - No `capitalize` on the h2, though the reference's global h2 carries it.
 *     Folixa's headings are already title case; ours is not, and the transform
 *     would render "From Consultation To Regrowth, Step By Step". Same call
 *     Hero made for the h1.
 *   - A wider h2 clamp, 660px against the reference's 497px, plus
 *     `text-balance`. See the note at the heading itself.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/**
 * Card geometry, shared by all five. Only the two background colours differ
 * between step 1 and the rest, so those are applied at the call site.
 *
 * The tablet grid is two-up, so the fifth card sits alone on its row. It was
 * tried spanning both columns; at that width the step numeral ends up roughly
 * a screen away from its icon and the card stops matching the other four.
 * A half-width card beside an empty cell reads better.
 */
const CARD = `flex flex-col rounded border border-overlay p-5 md:p-6 lg:p-5 ${FLOAT}`

/** 40px glyph in 16px of padding, radius 8px -- a 72px square. */
const CHIP = 'flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded'

/** SECTION 6 Patient Journey, verbatim. Icon choices are documented in icons.tsx. */
const STEPS = [
  {
    icon: Headset,
    title: 'Consultation & Scalp Evaluation',
    copy: 'Dr. Sandeep examines your hair loss pattern, donor area, scalp condition and medical history.',
  },
  {
    icon: ClipboardList,
    title: 'Diagnosis & Treatment Plan',
    copy: 'You learn the cause, whether you need a transplant or a treatment, the graft count and the expected result.',
  },
  {
    icon: Eye,
    title: 'Hairline Design',
    copy: 'A natural hairline mapped to your face shape, age and long-term appearance.',
  },
  {
    icon: Dna,
    title: 'Graft Extraction & Implantation',
    copy: 'Follicles extracted from the donor area and placed with attention to angle, direction and density.',
  },
  {
    icon: HandHoldingHeart,
    title: 'Recovery & Follow-Up',
    copy: 'Aftercare instructions, review sessions and long-term maintenance guidance.',
  },
]

export default function Process() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/*
            The eyebrow resolves to the plain h6 token here, unlike Hero's,
            which hard-codes 15px and text-accent as a dark-background override.
            The 5px gap is Elementor's icon-list default.
          */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Our Process
          </p>

          {/*
            The reference clamps these two widths on desktop and releases them
            to 100% at 1024 and below. Its h2 clamp is 497px, which suits the
            two words it holds ("Treatment Process"); our heading is seven, and
            at 497px it breaks three lines deep with "by Step" orphaned on the
            last. Widened to two balanced lines instead.
          */}
          <h2 className="text-balance font-head text-h2 lg:max-w-[660px]">
            From Consultation to Regrowth, Step by Step
          </h2>

          <p className="text-body lg:max-w-[534px]">
            Every stage is planned and performed by Dr. Sandeep Mahapatra, from the first scalp
            evaluation to long-term follow-up.
          </p>
        </Reveal>

        <ol className="grid grid-cols-1 gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-5">
          {STEPS.map(({ icon: Icon, title, copy }, i) => (
            <Reveal
              key={title}
              as="li"
              delay={i * 100}
              className={`${CARD} ${i === 0 ? 'bg-accent' : 'bg-base'}`}
            >
              <div className="flex items-center justify-between">
                {/* Step 1's chip is white on the tinted card; the rest are grey
                    on white. The glyph is `secondary` in both -- this section
                    is the kit's one exception to primary-blue icons. */}
                <span className={`${CHIP} ${i === 0 ? 'bg-base' : 'bg-line'}`}>
                  <Icon className="h-10 w-10 text-secondary" />
                </span>
                <span aria-hidden="true" className="font-head text-h4 text-primary/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-6 font-head text-h5 text-secondary">{title}</h3>
              <p className="mt-2 text-body">{copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
