import { CheckCircle, ClockIcon, Dna, HandHoldingHeart, MapPinIcon } from './icons'
import StatBand from './StatBand'

/**
 * Home credibility bar -- content doc `## Credibility Bar`, the section between
 * SECTION 1 (Hero) and SECTION 2 (About). Specified from the start and tracked
 * as outstanding in home.tsx until now.
 *
 * It exists to give the clinic's headline figures a section of their own. They
 * previously ran as a flat line of text pinned to the bottom of the hero, where
 * they read as a caption to the h1 rather than as evidence. Hero.tsx's
 * TRUST_STRIP has been trimmed to the credentials so the figures are stated
 * once, here.
 *
 * Placement is load-bearing, not just sequence. Counter animates on
 * IntersectionObserver, so a band below the fold counts up when the visitor
 * scrolls to it; the same band inside the hero would fire during page load,
 * against the LCP image Hero.tsx is tuned around.
 *
 * Figures and heading are verbatim from the doc, in the doc's order -- which
 * puts 6,000,000+ third, unlike DoctorStats. The doc's note on the table is
 * "All figures are the clinic's stated record. Do not alter."
 */

/**
 * Glyphs are all existing icons.tsx exports -- no new SVG, and nothing from an
 * icon library, per that file's header. Each one restates its own label rather
 * than decorating it: a clock for years, a tick for completed procedures, a DNA
 * helix for follicles, a map pin for patients who travel in, and the hand-and-
 * heart the site already uses for ongoing care for PRP sessions.
 *
 * The set mixes Font Awesome (CheckCircle, 512 viewBox) with the jki glyphs
 * (1024). Both are square, so a single h-7/h-8 box renders them at the same
 * size; the site already mixes the two families in StickyActionBar.
 */
const FIGURES = [
  { to: 20, label: 'Years of Experience', icon: ClockIcon },
  { to: 10000, label: 'Hair Transplants Performed', icon: CheckCircle },
  { to: 6000000, label: 'Follicles Transplanted', icon: Dna },
  { to: 500, label: 'International Patients', icon: MapPinIcon },
  { to: 100000, label: 'PRP Sessions Completed', icon: HandHoldingHeart },
]

/**
 * The doc writes these labels in caps. Small uppercase labels under large
 * figures is what makes the row read as a credibility bar rather than as more
 * hero text, so the caps are honoured as styling rather than as content.
 *
 * Two steps down from StatBand's 16px default, because uppercase plus 0.08em
 * tracking makes every label materially wider and the longest of these five
 * ("Hair Transplants Performed") has to survive the ~124px tracks of a 2-up
 * grid at a 320px viewport.
 */
const LABEL =
  'font-head text-[13px] font-semibold uppercase leading-[1.4em] tracking-[0.08em] text-line md:text-[14px]'

export default function CredibilityBar() {
  return (
    <StatBand
      heading="Two decades of hair restoration, measured in results."
      figures={FIGURES}
      labelClassName={LABEL}
      dividers
    />
  )
}
