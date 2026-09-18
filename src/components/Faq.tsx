import type { ReactNode } from 'react'
import { ChevronDown } from './icons'

/**
 * The site's one FAQ accordion.
 *
 * Design ported from the Folixa reference's nested-accordion widget `cf1cf68`
 * on home section 10, resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css
 * against the global colour tokens in
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
 * Two callers, deliberately: CommonQuestions (the home band) and PostProse (the
 * FAQ section every one of the 19 blog posts ends with). The posts used to
 * render theirs as flat prose -- an h3 question and loose paragraphs, visually
 * indistinguishable from the article around it -- which meant the same kind of
 * content looked like two different things depending on the page.
 *
 * NATIVE <details>, NOT REACT STATE. This is what the reference emits, and it
 * is the only thing compatible with the constraint Reveal.tsx documents: the
 * site is prerendered (`vite build --ssr` -> scripts/prerender.mjs) and
 * scripts/verify-seo.mjs reads the static HTML, so nothing may depend on JS to
 * become visible. Every answer ships in the prerendered markup. That is
 * load-bearing twice over -- for the home band it is the "is it safe" and "side
 * effects" queries the section exists to win, and for a post it is what keeps
 * scripts/verify-posts.mjs passing, since that gate reads the rendered text out
 * of the static HTML and compares it to the capture word for word.
 *
 * The shared `name` gives the exclusive-open behaviour of the reference's
 * `max_items_expended: "one"` with no script. Browsers without it (Safari 16
 * and earlier) simply allow several open at once, which is a graceful fallback,
 * not a break. Do NOT hand-roll aria-expanded/aria-controls --
 * details/summary supply both.
 *
 * Two deliberate departures from the reference:
 *
 *   - No open/close slide. The reference animates the panel over 400ms; native
 *     <details> cannot animate its height without JS, and the no-JS rule above
 *     outranks the transition.
 *   - The panel holds the answer and nothing else. The reference's panel also
 *     carries an inner sub-heading, a divider and a blue check-circle meta line
 *     ("Typically 30 to 45 minutes"), which neither caller has content for.
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

export type FaqItem = {
  /** Anchor id, when the question is a real heading in a document outline. */
  id?: string
  question: ReactNode
  answer: ReactNode
}

type FaqProps = {
  /**
   * Groups the exclusive-open behaviour. Must be unique per accordion on a
   * page -- two accordions sharing a name would behave as one group.
   */
  name: string
  items: FaqItem[]
  /**
   * Injects the reference's "01." numeral ahead of each question.
   *
   * Home only. Six of the nineteen posts (female-hair-loss,
   * fue-hair-transplant-bangalore, fue-vs-direct-hair-implantation,
   * gfc-vs-exosome-vs-qr678-hair-treatment,
   * how-many-grafts-do-i-need-for-hair-transplant, prp-vs-gfc-for-hair-loss)
   * carry "1. " to "8. " inside their published question text, so numbering
   * those again would render "01. 1. Does PCOS..." -- and, because the numeral
   * lands in the DOM's text content, it would also break the word-for-word
   * comparison scripts/verify-posts.mjs makes against the capture.
   *
   * Worth knowing: the old site's own JSON-LD already treated those prefixes as
   * presentational -- every one of the 82 `mainEntity[].name` strings is the
   * body h3 with a leading /^\d+\.\s/ removed. The visible copy is still the
   * capture, though, and is not ours to rewrite from here.
   */
  numbered?: boolean
  /** Heading level inside <summary>. Both callers are h3 today. */
  as?: 'h3' | 'h4'
  className?: string
}

export default function Faq({ name, items, numbered = false, as: Heading = 'h3', className = '' }: FaqProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      {items.map(({ id, question, answer }, i) => (
        <details key={id ?? i} name={name} open={i === 0} className="group">
          <summary className={SUMMARY}>
            <Heading id={id} className={TITLE}>
              {numbered && (
                // The numeral is the reference's, but aria-hidden so assistive
                // tech reads the question alone. Same treatment as Process's
                // step numerals.
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}. </span>
              )}
              {question}
            </Heading>
            {/* jki-angle-down-solid at the reference's 18px and `primary`,
                flipped for the open state -- the same reuse ArrowRight makes
                for the carousel's left arrow. */}
            <ChevronDown className="h-[18px] w-[18px] shrink-0 text-primary transition-transform group-open:rotate-180 motion-reduce:transition-none" />
          </summary>

          <div className={PANEL}>{answer}</div>
        </details>
      ))}
    </div>
  )
}
