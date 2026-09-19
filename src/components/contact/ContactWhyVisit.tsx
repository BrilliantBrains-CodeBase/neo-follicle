import { Dna, ClipboardList, HandHoldingHeart, MapPinIcon } from '../icons'
import Reveal from '../Reveal'
import { Section, SectionHead } from '../treatment/shell'

/**
 * Content doc PAGE 5 SECTION 4, "Why Visit Neo Follicle?".
 *
 * Design ported from the Folixa reference's APPOINTMENT page, section 6 --
 * Elementor container `5b5fb62`, a 2x2 grid of icon-boxes with the first cell
 * tinted `accent` and the rest `base` over a 1px `line` hairline. Values
 * resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-37.css;
 * the visual target is
 * folixa-design-reference/pages/appointment/sections/06-internationally-accredited.png.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * The heading is centred because a full-width card grid follows and anchors
 * it -- the rule shell.tsx's SectionHead docblock sets out.
 *
 * Deliberate departures from the reference:
 *
 *   - Our four claims, not Folixa's. Its cells ("ISHRS certified facility",
 *     "ARTAS Robotic Technology") are theme-kit copy for a clinic that is not
 *     this one; claiming an accreditation or a device the clinic does not have
 *     on a medical page is not a design decision to port. The doc's four
 *     points replace them one for one.
 *   - The supporting lines are written here. The doc gives the four headings
 *     as a bare bullet list, and an icon-box with no second line reads as an
 *     unfinished card at this size. Each line restates a fact already on the
 *     site rather than introducing a new claim.
 */

const REASONS = [
  {
    icon: HandHoldingHeart,
    title: 'Doctor-led consultations',
    body: 'You are assessed by Dr. Sandeep Mahapatra himself, not handed to a counsellor.',
  },
  {
    icon: ClipboardList,
    title: 'Personalized treatment planning',
    body: 'A plan built around your scalp, your hair loss pattern and your long-term goals.',
  },
  {
    icon: Dna,
    title: 'Hair transplant & non-surgical options',
    body: 'Surgical and regenerative routes under one roof, so the diagnosis picks the treatment.',
  },
  {
    icon: MapPinIcon,
    title: 'Convenient Bangalore location',
    body: 'Off the Marathahalli Bridge service road, minutes from the Outer Ring Road.',
  },
]

export default function ContactWhyVisit() {
  return (
    <Section ground="surface">
      <SectionHead
        heading="Why Visit Neo Follicle?"
        lede="Four things that make the first appointment worth your time."
      />

      <ul className="grid grid-cols-1 gap-gap-sm md:grid-cols-2 lg:gap-6">
        {REASONS.map(({ icon: Icon, title, body }, i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 100}
            className={`flex items-start gap-4 rounded p-5 md:p-6 ${
              i === 0 ? 'bg-accent' : 'border border-line bg-base'
            }`}
          >
            <span
              className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded ${
                i === 0 ? 'bg-base' : 'bg-surface'
              }`}
            >
              <Icon className="h-7 w-7 text-secondary" />
            </span>
            <span className="flex min-w-0 flex-col gap-2">
              <h3 className="font-head text-h5 text-secondary">{title}</h3>
              <p className="text-body">{body}</p>
            </span>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
