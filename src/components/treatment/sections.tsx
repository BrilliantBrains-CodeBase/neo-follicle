/**
 * The seven section kinds a treatment brief draws on. One file rather than
 * seven, because none of them is more than a screenful and they share the
 * `Section`/`SectionHead` shell and the card idioms.
 *
 * Card idioms come from the reference's icon-box grid (pages/treatments-details
 * section 4) and are already ported once in DoctorExpertise/DoctorApproach, so
 * the numbers here match those: 1px `line` border, `rounded`, 2rem padding,
 * and CARD 0 TINTED `accent` -- a system idiom that recurs in three separate
 * places in the capture.
 *
 * No icons. The reference fills these tiles with jkiticon glyphs, but
 * src/components/icons.tsx has nothing that distinguishes "donor area strength"
 * from "hair thickness", and DoctorExpertise already set the precedent of
 * refusing to fake them. The ghosted numeral carries the card instead.
 */
import type {
  Person,
  ProcessStep,
  TimelineRow,
  TreatmentImage,
  TreatmentSection,
} from '../../content/treatments/types'
import { CheckCircle } from '../icons'
import Reveal from '../Reveal'
import { SCROLLER, SLIDE } from '../carousel'
import { FLOAT, Section, SectionHead, Split, type Ground } from './shell'

/**
 * A card's fill against the band it sits on, so a card never disappears into
 * its own ground. Card 0 stays tinted `accent` -- a system idiom that recurs in
 * three separate places in the capture.
 */
const cardFill = (i: number, ground: Ground) =>
  i === 0 ? 'bg-accent' : ground === 'surface' ? 'bg-base' : 'bg-surface'

/**
 * Short labels read as a wrapping chip row, not a one-per-line tick list.
 *
 * The briefs' checklists are mostly two- and three-word symptoms ("Receding
 * hairline", "Crown thinning"). Stacked vertically each one occupied a full
 * line of a narrow column and the section looked empty; as chips they fill the
 * row and the section reads at a glance. This is the reference's own treatment
 * in section 6 "Key Advantages" (container `623ca65`), where the advantages are
 * bordered pills in a 2-up wrap -- and `rounded-pill` (100px) is already in
 * tailwind.config.js for exactly this.
 *
 * The threshold is a measure, not a taste: past roughly forty characters a
 * chip wraps internally and stops reading as a chip, so those fall back to
 * `Points`. All ten briefs were checked against it -- see `usePills`.
 */
const PILL_MAX = 40

/** Every point short enough to stay on one line inside a chip. */
const usePills = (points: string[]) => points.every((point) => point.length <= PILL_MAX)

function Pills({ points, ground }: { points: string[]; ground: Ground }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {points.map((point, i) => (
        <Reveal
          as="li"
          key={point}
          delay={i * 60}
          className={`flex items-center gap-3 rounded-pill border border-line px-5 py-3 font-head text-h6 text-secondary ${
            ground === 'surface' ? 'bg-base' : 'bg-surface'
          }`}
        >
          <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
          {point}
        </Reveal>
      ))}
    </ul>
  )
}

/**
 * A lead-in paragraph between the section head and the section's content.
 *
 * Carries the third hero paragraph on the five pages whose brief wrote one --
 * see the note on `intro` in content/treatments/types.ts. Measure is capped at
 * 68ch, the same bound `closing` uses, so it reads as body copy rather than a
 * second lede.
 */
function Intro({ children }: { children: string }) {
  return (
    <Reveal>
      <p className="max-w-[68ch] text-body">{children}</p>
    </Reveal>
  )
}

/** A bullet list. `CheckCircle` is the reference's benefit tick. */
function Points({ points }: { points: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {points.map((point, i) => (
        <Reveal as="li" key={point} delay={i * 100} className="flex items-start gap-3 text-body">
          <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
          {point}
        </Reveal>
      ))}
    </ul>
  )
}

function Prose({ section, ground }: { section: Extract<TreatmentSection, { kind: 'prose' }>; ground: Ground }) {
  return (
    // Left head, prose right. The body keeps a measure so the lines stay
    // readable (65-75ch), but it is now the RIGHT COLUMN's measure rather than
    // a 760px box floating in the middle of an otherwise empty band.
    <Split ground={ground} head={<SectionHead heading={section.heading} align="left" />}>
      {section.lede?.map((line) => (
        <Reveal key={line}>
          <p className="max-w-[68ch] text-body">{line}</p>
        </Reveal>
      ))}
      {section.points && <Points points={section.points} />}
      {section.closing?.map((line) => (
        <Reveal key={line}>
          <p className="max-w-[68ch] text-body">{line}</p>
        </Reveal>
      ))}
    </Split>
  )
}

function FeatureGrid({
  section,
  ground,
}: {
  section: Extract<TreatmentSection, { kind: 'featureGrid' }>
  ground: Ground
}) {
  return (
    <Section ground={ground}>
      <SectionHead heading={section.heading} lede={section.lede} />
      {section.intro && <Intro>{section.intro}</Intro>}
      {/*
        2-up, and each card is HORIZONTAL -- numeral tile left, text right.
        That is reference section 4's card (`5f6a7c8`), whose icon-box is a
        48px tile beside the title and body.

        It replaces a 3-up grid of tall narrow cards. Most briefs give these
        items a bare label and no `body`, so at one-third width a card was a
        numeral, two wrapped words and a lot of empty box; at half width with
        the numeral inline, the card is the size of its content.
      */}
      <ul className={`${SCROLLER} gap-gap-sm md:grid-cols-2 md:gap-8`}>
        {section.items.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i * 100}
            className={`${SLIDE} flex h-full items-start gap-5 rounded border border-line p-6 md:p-8 ${FLOAT} ${cardFill(
              i,
              ground,
            )}`}
          >
            {/* The tile reads against its own card: white on the tinted first
                card, `line` grey on the rest -- the same pair Process.tsx's
                CHIP uses. aria-hidden; the <ul> already carries the sequence. */}
            <span
              aria-hidden="true"
              className={`grid h-12 w-12 shrink-0 place-items-center rounded font-head text-h6 text-secondary ${
                i === 0 ? 'bg-base' : 'bg-line'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-head text-h5 text-secondary">{item.title}</h3>
              {item.body && <p className="text-body">{item.body}</p>}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

function Checklist({
  section,
  ground,
}: {
  section: Extract<TreatmentSection, { kind: 'checklist' }>
  ground: Ground
}) {
  /*
    The body, shared by both branches below. Short point sets become chips --
    see the note on PILL_MAX. The secondary list stays a tick list whatever the
    outer one does: it sits inside a tinted panel that is already a distinct
    object, and chips inside a chip-coloured box lose their edge.
  */
  const body = (
    <>
      {section.intro && <Intro>{section.intro}</Intro>}

      {usePills(section.points) ? (
        <Pills points={section.points} ground={ground} />
      ) : (
        <Points points={section.points} />
      )}

      {/*
        The panel stays `accent` on BOTH grounds, unlike the cards, which follow
        cardFill. It is a callout inside the column, and the chips beside it
        already take the base/surface step -- tinting the panel the same way
        made it and the chips the same fill, so the callout stopped reading as
        one. `accent` is what distinguishes it, on either band.
      */}
      {section.secondary && (
        <div className="flex flex-col gap-4 rounded border border-line bg-accent p-6">
          <h3 className="font-head text-h5 text-secondary">{section.secondary.heading}</h3>
          <Points points={section.secondary.points} />
        </div>
      )}

      {section.closing && <p className="max-w-[68ch] text-body">{section.closing}</p>}
    </>
  )

  /*
    WITH a photograph, the image/content row already fills the band, so the
    heading stays above it -- but left-aligned, so it shares an edge with the
    column beneath rather than floating over the middle of it.
  */
  if (section.image) {
    return (
      <Section ground={ground}>
        <SectionHead heading={section.heading} lede={section.lede} align="left" />
        <div className="flex flex-col gap-gap-sm md:flex-row md:gap-8">
          <Reveal className="md:w-2/5">
            <img
              src={section.image.src}
              alt={section.image.alt}
              width={section.image.width}
              height={section.image.height}
              loading="lazy"
              className="h-full min-h-[240px] w-full rounded object-cover"
            />
          </Reveal>
          <div className="flex flex-col gap-6 md:w-3/5">{body}</div>
        </div>
      </Section>
    )
  }

  /*
    WITHOUT one -- which is most of them -- this is reference section 6's
    two-column row: heading held left, the list and its panel filling the rest.
    This is the case that used to be a centred heading over `mx-auto
    max-w-[760px]`, and it is the single biggest source of the empty bands.
  */
  return (
    <Split
      ground={ground}
      head={<SectionHead heading={section.heading} lede={section.lede} align="left" />}
    >
      {body}
    </Split>
  )
}

/**
 * The five-step sequence, as a vertical timeline.
 *
 * The brief asks for "Folixa Component: Vertical Timeline". There is no such
 * widget in the capture -- no timeline markup, no connector, no dots anywhere
 * across the 18 pages. What the brief is pointing at is the "What to Expect"
 * panel (treatments-details section 6, container `0f118e1`): a vertical stack
 * of horizontal icon-boxes with 48px `accent` tiles and a 24px icon-to-text gap.
 *
 * So the geometry is that panel's, plus a 1px `line` rule running through the
 * tile centres to make it read as a timeline. The tile holds the step number,
 * for the same reason the cards above hold no icon.
 */
function Process({ section, ground }: { section: Extract<TreatmentSection, { kind: 'process' }>; ground: Ground }) {
  return (
    <Split
      ground={ground}
      head={<SectionHead heading={section.heading} lede={section.lede} align="left" />}
    >
      <ol className="flex w-full flex-col">
        {section.steps.map((step: ProcessStep, i) => (
          <Reveal as="li" key={step.title} delay={i * 100} className="flex gap-6">
            {/* The rule + tile column. The last step's rule is cut so the line
                stops at the final tile rather than trailing into the padding. */}
            <div className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-accent font-head text-h6 text-secondary"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < section.steps.length - 1 && <span aria-hidden="true" className="w-px flex-1 bg-line" />}
            </div>

            <div className={`flex flex-col gap-2 ${i < section.steps.length - 1 ? 'pb-8' : ''}`}>
              <h3 className="font-head text-h5 text-secondary">{step.title}</h3>
              {step.body && <p className="text-body">{step.body}</p>}
              {step.points && (
                <ul className="mt-1 flex flex-col gap-2">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Split>
  )
}

function Results({ section, ground }: { section: Extract<TreatmentSection, { kind: 'results' }>; ground: Ground }) {
  return (
    <Section ground={ground}>
      <SectionHead heading={section.heading} lede={section.lede} />
      <ul className={`${SCROLLER} gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3`}>
        {section.images.map((image: TreatmentImage, i) => (
          <Reveal as="li" key={image.src} delay={i * 100} className={SLIDE}>
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="w-full rounded border border-line object-cover"
            />
          </Reveal>
        ))}
      </ul>
      {/*
        The one `mx-auto` left in this file, and it is deliberate: the head is
        centred here because the 3-up image grid anchors it, so a trailing note
        hard against the left edge would hang off that axis. It is centred
        UNDER a full-width object, which is the case centring is for.
      */}
      {(section.points || section.closing) && (
        <div className="mx-auto flex max-w-[68ch] flex-col gap-6">
          {section.points && <Points points={section.points} />}
          {section.closing && <p className="text-body">{section.closing}</p>}
        </div>
      )}
    </Section>
  )
}

/**
 * The recovery table.
 *
 * A real <table>: the brief gives it as one, it has a header row, and the two
 * columns are a genuine key/value pair. Below `md` the cells stack -- the
 * `md:table-*` classes release it back to a table from the tablet band up.
 */
function Timeline({ section, ground }: { section: Extract<TreatmentSection, { kind: 'timeline' }>; ground: Ground }) {
  return (
    <Split
      ground={ground}
      head={<SectionHead heading={section.heading} lede={section.lede} align="left" />}
    >
      {/* The table now takes the right column's full width instead of a 760px
          box centred in an otherwise empty band, so the `when` and `what`
          columns get room to separate rather than crowding at the middle. */}
      <Reveal className="w-full overflow-hidden rounded border border-line">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-accent">
              {section.columns.map((column) => (
                <th key={column} scope="col" className="p-4 font-head text-h6 text-secondary">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row: TimelineRow, i) => (
              <tr key={row.when} className={i > 0 ? 'border-t border-line' : ''}>
                <th scope="row" className="p-4 text-left font-head text-body-lg font-semibold text-secondary">
                  {row.when}
                </th>
                <td className="p-4 text-body">{row.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Split>
  )
}

/**
 * Celebrity page only.
 *
 * These are real, named, identifiable people, so the photographs carry their
 * names in the alt text and nothing here implies a clinical claim beyond the
 * brief's own wording ("Featured names include").
 */
function Personalities({
  section,
  ground,
}: {
  section: Extract<TreatmentSection, { kind: 'personalities' }>
  ground: Ground
}) {
  return (
    <Section ground={ground}>
      <SectionHead heading={section.heading} lede={section.lede} />
      <ul className={`${SCROLLER} gap-gap-sm md:grid-cols-3 md:gap-8 lg:grid-cols-6`}>
        {section.people.map((person: Person, i) => (
          <Reveal as="li" key={person.name} delay={i * 100} className={`${SLIDE} flex flex-col gap-3 text-center`}>
            <img
              src={person.image.src}
              alt={person.image.alt}
              width={person.image.width}
              height={person.image.height}
              loading="lazy"
              className="aspect-square w-full rounded border border-line object-cover"
            />
            <div>
              <p className="font-head text-h6 text-secondary">{person.name}</p>
              <p className="text-body">{person.role}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      {/* Centred under a full-width grid, as in Results -- the head is centred
          here too, so the note stays on that axis. */}
      {section.closing && <p className="mx-auto max-w-[68ch] text-body">{section.closing}</p>}
    </Section>
  )
}

/** Dispatches on `kind`. Exhaustive -- a new kind is a type error here. */
export default function TreatmentSectionView({
  section,
  ground,
}: {
  section: TreatmentSection
  ground: Ground
}) {
  switch (section.kind) {
    case 'prose':
      return <Prose section={section} ground={ground} />
    case 'featureGrid':
      return <FeatureGrid section={section} ground={ground} />
    case 'checklist':
      return <Checklist section={section} ground={ground} />
    case 'process':
      return <Process section={section} ground={ground} />
    case 'results':
      return <Results section={section} ground={ground} />
    case 'timeline':
      return <Timeline section={section} ground={ground} />
    case 'personalities':
      return <Personalities section={section} ground={ground} />
  }
}
