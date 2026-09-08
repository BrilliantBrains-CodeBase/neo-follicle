import { Link } from 'react-router-dom'
import { SCROLLER, SLIDE } from './carousel'
import { Plus, Square } from './icons'

/**
 * Home services section -- SECTION 4, Hair Transplant Services.
 *
 * Design ported from the Folixa reference, home section 4 -- Elementor
 * container `b1e2ddb`, its grid `e4c01a3`, its cards `db7b89d`/`188a53a`/
 * `bc2192f` and their icon-box `a407f59`. Every value below is resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css;
 * the visual target is
 * folixa-design-reference/pages/home/sections/04-hair-restoration-treatments.png.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed. Same call as Hero.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 4. Card anchors are the doc's own links, which the doc's internal-
 * linking table (07) asks to be keyword-rich rather than "read more".
 *
 * Four deliberate departures from the reference, all FLAGGED FOR CLIENT REVIEW:
 *
 *   - The reference card carries a title only. Ours adds the doc's description
 *     under it, inside the scrim -- the doc gives every service a paragraph and
 *     dropping it would lose the section's copy entirely.
 *   - The reference grid is 3-up and the doc has seven services. Six sit in the
 *     grid; the seventh (international patients) becomes a full-width row below
 *     it. Its copy is markedly longer and a 3-up grid would orphan it.
 *   - That seventh card's link cell is EMPTY in the doc. It points at
 *     /hair-transplant-medical-tourism-in-bangalore/, the matching real route.
 *   - The CTA's target is likewise not in the doc. It points at the flagship
 *     hair transplant page -- there is no services-index route among the 59 in
 *     src/seo/pages.ts. That duplicates card 1's target, which src/config/nav.ts
 *     already does deliberately for this same page.
 *
 * The eyebrow word "Services" is the reference's, not the doc's -- the doc
 * gives this section no eyebrow label. It makes no claim.
 *
 * Card titles are <h3> carrying the `text-h4` token: the reference's h4 SIZE,
 * but the right outline level under this section's h2 and Hero's single h1
 * (the doc's final recommendation 1).
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` -- same call as Hero and Footer.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:hover:transform-none'

/** The kit's single button geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full items-center justify-center rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

/**
 * The cards' own hover, which is NOT the buttons' float: the reference lifts a
 * card by 3px over 500ms (`--e-con-transform-translateY:-3px`).
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
 * The reference staggers each card's fadeInUp by 100ms. Tailwind has no delay
 * utilities configured, and JIT cannot see a class string built at runtime --
 * so these are literal, indexed by position.
 */
const DELAYS = [
  '',
  '[animation-delay:100ms]',
  '[animation-delay:200ms]',
  '[animation-delay:300ms]',
  '[animation-delay:400ms]',
  '[animation-delay:500ms]',
]

/**
 * SECTION 4's card table, verbatim.
 *
 * TODO: every photo is licensed stock carried over from the live site, NOT a
 * Neo Follicle patient. Alt text describes the image only and claims no result.
 * Replace with clinic photography before launch -- same TODO as Hero's
 * /hero.webp.
 */
const SERVICES = [
  {
    title: 'Hair Transplant for Men',
    copy: 'Receding hairline, frontal baldness and crown thinning with FUE and NFT, planned around baldness grade and donor strength.',
    to: '/best-hair-transplant-in-bangalore/',
    img: '/services/men.webp',
    alt: 'Close-up of a scalp with the hairline and crown marked out before a follicular unit extraction procedure.',
  },
  {
    title: 'Female Hair Transplant',
    copy: 'For thinning, widening partings and female pattern hair loss, planned only after the cause is diagnosed.',
    to: '/female-hair-transplant-in-bangalore/',
    img: '/services/female.webp',
    alt: 'A woman parting her hair to show thinning along the centre parting.',
  },
  {
    title: 'Beard Transplant',
    copy: 'Fill patchy beard, moustache, goatee and sideburns to match natural growth direction.',
    to: '/beard-transplant-in-bangalore/',
    img: '/services/beard.webp',
    alt: 'Profile view of a man with a full, closely trimmed beard.',
  },
  {
    title: 'Eyebrow Restoration',
    copy: 'Rebuild thin, over-plucked or scarred brows with single-hair precision and natural angle.',
    to: '/eyebrow-restoration-in-bangalore/',
    img: '/services/eyebrow.webp',
    alt: 'Close-up of an eyebrow being marked out and treated by a gloved practitioner.',
  },
  {
    title: 'Failed Hair Transplant Repair',
    copy: 'Correct unnatural hairlines, poor density, wrong growth direction and FUT scars from an earlier transplant.',
    to: '/failed-hair-transplant-repair-in-bangalore/',
    img: '/services/repair.webp',
    alt: 'A man looking down and pointing at thinning hair across his crown.',
  },
  {
    title: 'Unshaven & Body Hair Transplant',
    copy: 'Discreet U-FUE with no visible shaving, plus body-to-scalp grafting when scalp donor hair is limited.',
    to: '/unshaven-hair-transplant/',
    img: '/services/unshaven.webp',
    alt: 'Portrait of a man with dense, unshaven hair across the front and sides.',
  },
]

/** The doc's seventh card. Longer copy, and its link cell is empty -- see above. */
const INTERNATIONAL = {
  title: 'Hair Transplant Treatments for International Patients',
  copy: 'Every international case is planned before you fly, scalp assessment, graft count and donor mapping are confirmed on video first. The procedure is then scheduled so it fits inside one trip, with follow-up continuing after you return home.',
  to: '/hair-transplant-medical-tourism-in-bangalore/',
}

/** The reference's white circle badge, `bg-accent` on card hover. */
function Badge() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-secondary transition-colors duration-300 group-hover:bg-accent">
      <Plus className="h-5 w-5" />
    </span>
  )
}

export default function Services() {
  return (
    <section className="bg-line">
      <div className="container flex flex-col gap-gap-mobile py-section-y-mobile md:gap-gap-tablet md:py-section-y-tablet lg:gap-gap lg:py-section-y">
        {/* Header row -- eyebrow + h2 left, subhead + button right, 500px each. */}
        <div className="flex flex-col gap-gap-mobile md:flex-row md:items-start md:justify-between md:gap-gap-tablet lg:gap-gap">
          <div className="flex flex-col gap-4 md:max-w-[500px]">
            {/* On this light ground the mark is `primary` and the label body colour. */}
            <p className="flex items-start gap-2 font-head text-h6 text-body">
              <Square className="mt-[3px] h-[14px] w-[14px] shrink-0 text-primary" />
              Services
            </p>
            <h2 className="font-head text-h2 text-secondary">
              Hair Transplant Procedures in Bangalore
            </h2>
          </div>

          <div className="flex flex-col gap-6 md:max-w-[500px]">
            <p className="text-body text-body">
              Advanced FUE and NFT hair restoration for the hairline, crown, beard, eyebrows and
              corrective cases. Every procedure is planned after a scalp and donor-area evaluation.
            </p>
            <Link
              to="/best-hair-transplant-in-bangalore/"
              className={`${BUTTON} bg-primary text-white hover:bg-primary-dark`}
            >
              View All Hair Transplant Services →
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-gap-sm md:gap-8">
          {/*
            3-up desktop, 2-up tablet -- the reference's `e4c01a3`. Its 1-up
            mobile column stacked six 320px cards into ~2000px of scrolling, so
            below `md` the same six become a swipeable track (carousel.ts).
          */}
          <div className={`${SCROLLER} gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3`}>
            {SERVICES.map((service, i) => (
              <Link
                key={service.to}
                to={service.to}
                className={`group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded p-5 animate-fadeInUp motion-reduce:animate-none md:min-h-[400px] md:p-6 lg:min-h-[500px] ${SLIDE} ${DELAYS[i]} ${CARD_LIFT}`}
              >
                <img
                  src={service.img}
                  alt={service.alt}
                  width={650}
                  height={450}
                  loading="lazy"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div aria-hidden="true" className={`absolute inset-0 -z-10 ${SCRIM}`} />

                <div className="flex items-center justify-between gap-6">
                  <h3 className="font-head text-h4 text-white transition-colors duration-300 group-hover:text-accent">
                    {service.title}
                  </h3>
                  <Badge />
                </div>
                <p className="mt-3 text-body text-line">{service.copy}</p>
              </Link>
            ))}
          </div>

          {/*
            The seventh card, flattened to a full-width row. `bg-secondary` is
            where the cards' scrim terminates, so it reads as the same component
            rather than a new one.
          */}
          <Link
            to={INTERNATIONAL.to}
            className={`group flex flex-col gap-4 rounded bg-secondary p-5 animate-fadeInUp motion-reduce:animate-none md:flex-row md:items-center md:justify-between md:gap-gap-tablet md:p-8 [animation-delay:600ms] ${CARD_LIFT}`}
          >
            <div className="flex flex-col gap-3 md:max-w-[720px]">
              <h3 className="font-head text-h4 text-white transition-colors duration-300 group-hover:text-accent">
                {INTERNATIONAL.title}
              </h3>
              <p className="text-body text-line">{INTERNATIONAL.copy}</p>
            </div>
            <Badge />
          </Link>
        </div>
      </div>
    </section>
  )
}
