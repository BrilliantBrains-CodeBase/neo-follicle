import { Plus } from '../icons'
import { SCROLLER, SLIDE } from '../carousel'
import Reveal from '../Reveal'

/**
 * Content doc SECTION 2, "Treatment Categories".
 * Layout line in the doc: "Instead of a long scrolling page, use premium cards."
 *
 * Design ported from the Folixa reference, home section 4 -- Elementor
 * container `b1e2ddb`, its grid `e4c01a3`, its cards `db7b89d`/`188a53a`/
 * `bc2192f` and their icon-box `a407f59` -- the same object Services.tsx
 * carries on the home page. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css;
 * the visual target is
 * folixa-design-reference/pages/home/sections/04-hair-restoration-treatments.png.
 *
 * Copy is verbatim from the content doc -- the nine titles and their one-line
 * descriptions, nothing more.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * THE CARDS ARE IN-PAGE ANCHORS, NOT OUTBOUND LINKS. FLAGGED FOR CLIENT REVIEW.
 * The doc lists all nine treatments here and then re-introduces the same
 * treatments in SECTION 3 (regenerative), SECTION 4 (surgical) and SECTION 5
 * (scalp health) -- three near-duplicate link sets on one URL. Rather than emit
 * /best-hair-transplant-in-bangalore/ three times from one page, this section
 * is the index: each card jumps to the band that covers it, and that band
 * carries the single outbound link to the treatment's own page. Every link the
 * doc asks for still exists; none of them is duplicated.
 *
 * Two further departures from the reference:
 *
 *   - The reference card carries a title only. Ours adds the doc's description
 *     under it, inside the scrim -- the doc gives every category a line and
 *     dropping it would lose the section's copy entirely. Same call Services
 *     made.
 *   - THREE OF THE NINE CARDS HAVE NO PHOTOGRAPH. FLAGGED FOR CLIENT REVIEW.
 *     public/ holds no image for GFC, QR678 or Exosome therapy, and the doc's
 *     own images are third-party stock that cannot be published here. Those
 *     three run on a flat `bg-secondary` ground instead, which is exactly where
 *     the photo cards' scrim terminates -- so the row still reads as one
 *     component rather than two. Same device Services.tsx used for its seventh
 *     card.
 *
 * Card titles are <h3> carrying the `text-h4` token: the reference's h4 SIZE,
 * but the right outline level under this section's h2 and the hero's single h1.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white`.
 */

/**
 * The cards' hover, which is NOT the buttons' float: the reference lifts a card
 * by 3px over 500ms (`--e-con-transform-translateY:-3px`).
 *
 * The reduced-motion override is `motion-reduce:hover:` and not the bare
 * `motion-reduce:`: a plain `.transform-none` loses to `.hover\:-translate-y:hover`
 * on specificity, so the lift still fired for users who asked for less motion.
 */
const CARD_LIFT =
  'transition duration-500 ease-out hover:-translate-y-[3px] motion-reduce:hover:transform-none'

/** The reference's scrim: transparent to `secondary` (#1A1A1A), top to bottom. */
const SCRIM = 'bg-[linear-gradient(180deg,#02010100_0%,#1A1A1A_100%)]'

/**
 * SECTION 2's nine categories, verbatim, in the doc's order.
 *
 * `to` is the in-page band that covers each one -- see the header note.
 *
 * IMAGE PROVENANCE. Every photo here is already on the site: the six under
 * public/services/ are the home page's service cards (five of them licensed
 * stock carried over from the live site, with /services/female.webp
 * client-supplied), and /gallery/gfc-prp.webp is the image gallery's
 * regenerative-treatment photograph. Nothing new is introduced. Alt text
 * describes the image only and claims no result.
 */
const CATEGORIES = [
  {
    title: 'Hair Transplant',
    copy: 'Permanent restoration for male pattern baldness, receding hairlines, and crown thinning.',
    to: '#surgical',
    img: '/services/men.webp',
    alt: 'Close-up of a scalp with the hairline and crown marked out before a follicular unit extraction procedure.',
  },
  {
    title: 'Female Hair Transplant',
    copy: 'Natural-looking restoration for widening part lines and female hair thinning.',
    to: '#surgical',
    img: '/services/female.webp',
    alt: 'A woman resting in a treatment chair, the recipient area along her hairline dense with freshly placed grafts.',
  },
  {
    title: 'Beard Transplant',
    copy: 'Restore fuller facial hair with natural direction and density.',
    to: '#surgical',
    img: '/services/beard.webp',
    alt: 'Profile view of a man with a full, closely trimmed beard.',
  },
  {
    title: 'Eyebrow Restoration',
    copy: 'Precision-designed eyebrow restoration.',
    to: '#surgical',
    img: '/services/eyebrow.webp',
    alt: 'Close-up of an eyebrow being marked out and treated by a gloved practitioner.',
  },
  {
    title: 'Failed Hair Transplant Repair',
    copy: 'Improve previous transplant results with personalized correction planning.',
    to: '#surgical',
    img: '/services/repair.webp',
    alt: 'A man looking down and pointing at thinning hair across his crown.',
  },
  {
    title: 'PRP Hair Treatment',
    copy: 'Strengthen weak follicles and improve density.',
    to: '#regenerative',
    img: '/gallery/gfc-prp.webp',
    alt: 'A gloved clinician drawing prepared platelet-rich plasma into a syringe beside a centrifuge.',
  },
  { title: 'GFC Therapy', copy: 'Growth-factor treatment for thinning hair.', to: '#regenerative' },
  { title: 'QR678 Therapy', copy: 'Advanced peptide-based treatment.', to: '#regenerative' },
  { title: 'Exosome Therapy', copy: 'Regenerative hair restoration.', to: '#regenerative' },
]

/** The reference's white circle badge, `bg-accent` on card hover. */
function Badge() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-secondary transition-colors duration-300 group-hover:bg-accent">
      <Plus className="h-5 w-5" />
    </span>
  )
}

export default function TreatmentCategories() {
  return (
    <section id="treatments" className="scroll-mt-24 bg-line">
      <div className="container flex flex-col gap-gap-mobile py-section-y-mobile md:gap-gap-tablet md:py-section-y-tablet lg:gap-gap lg:py-section-y">
        {/*
          The doc's own section title is the heading. No eyebrow line above it:
          the doc supplies no second heading for this section, so an eyebrow
          would have to be authored. Same call DoctorExpertise.tsx records.
        */}
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance font-head text-h2 text-secondary lg:max-w-[660px]">
            Treatment Categories
          </h2>
        </Reveal>

        {/*
          3-up desktop, 2-up tablet -- the reference's `e4c01a3`. Its 1-up
          mobile column would stack nine 320px cards into ~3000px of scrolling,
          so below `md` the same nine become a swipeable track (carousel.ts).
        */}
        <ul className={`${SCROLLER} gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3`}>
          {CATEGORIES.map(({ title, copy, to, img, alt }, i) => (
            <Reveal key={title} as="li" delay={i * 100} className={SLIDE}>
              <a
                href={to}
                className={`group relative isolate flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded bg-secondary p-5 md:min-h-[400px] md:p-6 lg:min-h-[440px] ${CARD_LIFT}`}
              >
                {/* The three cards with no photograph keep the flat
                    `bg-secondary` ground above -- see the header note. */}
                {img && (
                  <>
                    <img
                      src={img}
                      alt={alt}
                      width={650}
                      height={450}
                      loading="lazy"
                      className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />
                    <div aria-hidden="true" className={`absolute inset-0 -z-10 ${SCRIM}`} />
                  </>
                )}

                <div className="flex items-center justify-between gap-6">
                  <h3 className="font-head text-h4 text-white transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </h3>
                  <Badge />
                </div>
                <p className="mt-3 text-body text-line">{copy}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
