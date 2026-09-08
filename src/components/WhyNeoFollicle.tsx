import { useEffect, useState, type CSSProperties } from 'react'
import { TRACK } from './carousel'
import Reveal from './Reveal'
import { Square } from './icons'

/**
 * Home "Why Neo Follicle" section -- SECTION 5, Why Choose Neo Follicle.
 *
 * Design ported from the Folixa reference, home section 5 -- Elementor
 * container `8db5313`, its grid `1896ad8`, its cards `da00fb9`/`a30f629`/
 * `99f22dc` and their text panels `ade6784`/`af87822`/`49a7957`. Every value
 * below is resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css;
 * the visual target is
 * folixa-design-reference/pages/home/sections/05-a-clinic-built-on-results-trust.png.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed. Same call as
 * Hero, About and Services.
 *
 * Copy is verbatim from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 5. Nothing here is authored.
 *
 * THE ONE STRUCTURAL CHANGE. The reference is a static 3-up grid: outer cards
 * are text-then-image on `line` grey, the middle one is image-then-text on
 * `accent` blue. The doc has SIX points, not three. Rather than drop half the
 * copy, the row becomes an auto-sliding carousel carrying all six, and the
 * accent treatment follows whichever card is currently centred -- so at any
 * frame the viewport shows exactly the reference's three-card composition.
 * Card geometry, borders, radii, tints, gaps and type are unchanged.
 *
 * That carousel is transform-driven from `md` up ONLY. Below it the same track
 * becomes a native scroll-snap row (carousel.ts), because a translateX and a
 * scroll container cannot share an element -- the transform would fight the
 * finger. So on mobile: no autoplay, no duplicate slide set, no centred card,
 * no dots; just six cards you swipe. Everything `isMobile` guards below is
 * that switch.
 *
 * Five smaller departures:
 *
 *   - Dot controls are added. The reference has none, but an auto-rotating
 *     carousel needs a way to stop and steer it (WCAG 2.2.2 Pause, Stop, Hide)
 *     and keyboard users need a way in. Rotation also pauses on hover, on
 *     focus-within and while the tab is hidden.
 *   - A subhead is rendered. The reference section has none; the doc supplies
 *     one, so it sits in the heading block at `text-body-lg`.
 *   - Card titles are <h3> carrying the `text-h5` token: the reference's
 *     SIZE (its `dfbf025` typography resolves to exactly the h5 token), but
 *     the right outline level under this section's h2 and Hero's single h1
 *     (the doc's final recommendation 1). Same call Services made.
 *   - No `capitalize` on the h2. DESIGN.md 3 has the kit capitalising h1/h2,
 *     but neither Hero nor Services applies it -- our copy is already title
 *     case and the transform would render "Built On", "Not Pressure". Matching
 *     the sibling sections matters more here than matching the kit.
 *   - Point 5's photo is a real Neo Follicle before/after, but the signage in
 *     frame reads "NEO FOLLICLE ... BHUBANESWAR" while this site is the
 *     Marathahalli, Bangalore clinic. FLAGGED FOR CLIENT REVIEW.
 *
 * IMAGE PROVENANCE, CHANGED. This section used to be the one place on the page
 * where every image was a real Neo Follicle photograph out of
 * neofollicle-seo-backup/media. Five of the six have since been replaced with
 * client-supplied AI-GENERATED renders (Homepage/Why Choose Neo Follicle/).
 * They are not photographs: they depict a likeness of Dr. Sandeep in a clinic
 * that is not his, and the signage rendered into them reads "ADVANCED HAIR
 * RESTORATION", not Neo Follicle. Only point 5 (`results`) is still a real
 * photograph. See the per-image note on POINTS below.
 */

/** Matches the track's transition below; drives the loop's snap-back timing. */
const DURATION_MS = 500

/** How long each card holds the centre before the track advances. */
const INTERVAL_MS = 4000

/**
 * SECTION 5's point table, verbatim.
 *
 * Every `img` is subject-anchored-cropped to the kit's 3:2 and re-encoded to
 * webp at 650x434. Five come from the client's Homepage/Why Choose Neo
 * Follicle/ delivery and are AI-GENERATED, not photographs:
 *
 *   diagnosis   Dermatologist-Led Diagnosis.png
 *   planning    Doctor-Performed Planning (2).png
 *   implanters  FUE and NFT Implanters 1.png
 *   treatments  Surgical & Non-Surgical Options.png
 *   pricing     Transparent, Honest Pricing.png
 *
 * `results` is unchanged and is still a real Neo Follicle photograph, from
 * neofollicle-seo-backup/media/files/wp-content/uploads/2026/08/2-1.png.
 *
 * FLAGGED FOR CLIENT REVIEW, two defects carried in with the AI set:
 *
 *   - `pricing` renders a coat badge reading "Dr. Nitiin P.R. Hache, Hair
 *     Restoration Surgeon" -- a surgeon who does not exist -- and it is legible
 *     at this crop. A fabricated clinician's name on a medical page is the one
 *     thing here that cannot survive launch. Recrop cannot remove it without
 *     losing the subject; the image needs regenerating or replacing.
 *   - Two source filenames do not describe their contents. "Transparent,
 *     Honest Pricing" depicts a hairline-planning consultation and "Surgical &
 *     Non-Surgical Options" depicts surgical hairline marking, so both sit
 *     under card titles they do not illustrate. The titles are the client's own
 *     copy and stay; `alt` below describes what is actually in frame, which is
 *     what alt is for.
 */
const POINTS = [
  {
    title: 'Dermatologist-Led Diagnosis',
    copy: 'Your cause of hair loss is identified first, so you avoid unnecessary procedures.',
    img: '/why/diagnosis.webp',
    alt: 'A dermatologist at a consulting desk showing a patient a tablet with a scalp trichoscopy comparison.',
  },
  {
    title: 'Doctor-Performed Planning',
    copy: 'Dr. Sandeep designs the hairline, density and donor plan for every case personally.',
    img: '/why/planning.webp',
    alt: "A gloved hand marking a new hairline on a patient's forehead with a surgical pen.",
  },
  {
    title: 'FUE and NFT Implanters',
    copy: 'Direct implantation with NFT implanters for controlled angle, direction and density.',
    img: '/why/implanters.webp',
    alt: 'Close-up of densely placed follicular grafts along a recipient area, a fine forceps positioning one more.',
  },
  {
    title: 'Surgical & Non-Surgical Options',
    copy: 'Transplant, PRP, GFC, QR678, exosome, stem cell and laser therapy, all under one roof.',
    img: '/why/treatments.webp',
    alt: "A masked surgeon in scrubs drawing the planned hairline on a patient's scalp before a procedure.",
  },
  {
    title: 'Natural, Permanent Results',
    copy: 'Grafts placed to blend with your natural growth pattern and last long term.',
    img: '/why/results.webp',
    alt: 'Before and after photographs of a Neo Follicle hair transplant patient.',
  },
  {
    title: 'Transparent, Honest Pricing',
    copy: 'Cost shared after evaluation, with no hidden charges and EMI options.',
    img: '/why/pricing.webp',
    alt: 'A clinician talking a patient through before-and-after images on a consulting-room monitor.',
  },
]

/**
 * The reference card `da00fb9`: 1px `line` border, 0.5rem radius, 1rem pad.
 * Direction is applied by the caller -- `flex-col` and `flex-col-reverse` on
 * one element would resolve only by Tailwind's source order.
 */
const CARD = 'flex h-full gap-gap-sm rounded border border-line bg-base p-4'

/** Its text panel `ade6784`: 0.5rem radius, 1.25rem pad, 16px inner gap. */
const PANEL =
  'flex flex-1 flex-col justify-center gap-4 rounded p-gap-sm text-center transition-colors duration-500'

/** Its image widget `00f6d40`: full width, 0.5rem radius. Sources are 3:2. */
const IMAGE = 'aspect-[3/2] w-full rounded object-cover'

function Card({ point, centred }: { point: (typeof POINTS)[number]; centred: boolean }) {
  return (
    // DOM order is always panel-then-image so the title is read first; the
    // reference's centre card shows the image on top, which is a visual flip
    // only -- hence flex-col-reverse rather than reordering the children.
    <div className={`${CARD} ${centred ? 'flex-col-reverse' : 'flex-col'}`}>
      <div className={`${PANEL} ${centred ? 'bg-accent' : 'bg-line'}`}>
        <h3 className="font-head text-h5 text-secondary">{point.title}</h3>
        <p className="text-body">{point.copy}</p>
      </div>
      <img
        src={point.img}
        alt={point.alt}
        width={650}
        height={434}
        loading="lazy"
        decoding="async"
        className={IMAGE}
      />
    </div>
  )
}

export default function WhyNeoFollicle() {
  /** Index of the FIRST visible slide, 0..POINTS.length (see the loop below). */
  const [index, setIndex] = useState(0)
  /** Cards on screen. 3 on the server so the prerendered markup is the desktop one. */
  const [visible, setVisible] = useState(3)
  const [reduced, setReduced] = useState(false)
  const [mounted, setMounted] = useState(false)
  /** False for exactly one frame, to make the loop's snap-back instant. */
  const [animate, setAnimate] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)

  // Layout is CSS-driven (see the basis/translate classes), so this only feeds
  // the arithmetic that decides which card is centred and where a dot jumps to.
  // The queries mirror the `md`/`lg` values in tailwind.config.js.
  useEffect(() => {
    setMounted(true)
    const lg = window.matchMedia('(min-width: 1025px)')
    const md = window.matchMedia('(min-width: 768px)')
    const sync = () => setVisible(lg.matches ? 3 : md.matches ? 2 : 1)
    sync()
    lg.addEventListener('change', sync)
    md.addEventListener('change', sync)
    return () => {
      lg.removeEventListener('change', sync)
      md.removeEventListener('change', sync)
    }
  }, [])

  // The kit's reduced-motion rule (reports/animations.md): replace an
  // animation with its end state, never a shorter one. Here that means the
  // whole carousel collapses to the static grid rendered at the bottom.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  /**
   * At 1-up the track is a native scroll-snap row, not a transform (see the
   * header note). Everything the transform mechanic owns is off below `md`.
   */
  const isMobile = visible === 1

  const running = mounted && !reduced && !isMobile && !hovered && !tabHidden

  useEffect(() => {
    if (!running) return
    const id = setInterval(
      // Never past POINTS.length: that slide is the start of the duplicate set
      // and the effect below is what brings it home.
      () => setIndex((i) => (i >= POINTS.length ? i : i + 1)),
      INTERVAL_MS,
    )
    return () => clearInterval(id)
  }, [running])

  // Seamless loop. Advancing to POINTS.length slides into the duplicate set,
  // which is pixel-identical to index 0 -- so once that slide has finished, we
  // drop the transition and jump back. A timeout rather than `transitionend`,
  // which does not fire if the tab is hidden mid-slide.
  useEffect(() => {
    if (index < POINTS.length) return
    const id = setTimeout(() => {
      setAnimate(false)
      setIndex(0)
    }, DURATION_MS)
    return () => clearTimeout(id)
  }, [index])

  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(id)
  }, [animate])

  /**
   * Which slot carries the accent treatment: the middle one at 3-up, the
   * second at 2-up, the only one at 1-up.
   */
  const centred = index + Math.floor(visible / 2)
  const activeDot = centred % POINTS.length

  /** Put point `k` in the centre slot. */
  const goTo = (k: number) =>
    setIndex((k - Math.floor(visible / 2) + POINTS.length) % POINTS.length)

  /**
   * Duplicates exist only to make the transform's wrap seamless, and only on
   * the client -- the prerendered HTML carries each point, and each <h3>,
   * exactly once. On mobile there is no wrap to hide, and they would land as
   * six extra cards a thumb can actually swipe to, so they are dropped.
   */
  const slides = mounted && !reduced && !isMobile ? [...POINTS, ...POINTS] : POINTS

  const header = (
    <Reveal className="flex flex-col items-center gap-4 text-center md:max-w-[619px]">
      {/* On this light ground the mark is `primary` and the label body colour -- same as Services. */}
      <p className="flex items-start gap-2 font-head text-h6 text-body">
        <Square className="mt-[3px] h-[14px] w-[14px] shrink-0 text-primary" />
        Why Neo Follicle
      </p>
      <h2 className="font-head text-h2 text-secondary">
        A Clinic Built on Diagnosis, Not Pressure
      </h2>
      <p className="text-body-lg">
        The result of a hair transplant depends on planning, graft handling and honest advice.
        Here is where we focus.
      </p>
    </Reveal>
  )

  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col items-center gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {header}

        {reduced ? (
          // The end state: every point at once, in the reference's own grid
          // (`1896ad8` -- 3-up desktop, 2-up tablet, 1-up mobile). Nothing
          // moves, so nothing is centred and there is nothing to steer.
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {POINTS.map((point) => (
              <Card key={point.title} point={point} centred={false} />
            ))}
          </div>
        ) : (
          <Reveal className="w-full">
            {/* Reveal takes no event props, so the pause handlers sit inside. */}
            <div
              className="flex flex-col gap-gap-mobile"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocusCapture={() => setHovered(true)}
              onBlurCapture={() => setHovered(false)}
            >
              {/* The transform needs a clip; the scroll track below `md` is
                  its own, and clipping it here would kill the scroll. */}
              <div className="md:overflow-hidden">
                {/*
                  Layout and travel are pure CSS so the server-rendered markup
                  is correct at every width with no JS. The step is one slide
                  plus one gap, expressed against the track's own width:
                    2-up   50%      + 1rem
                    3-up   33.3333% + 0.6667rem
                  `--i` is the only inline style, and it is a plain number.

                  There is no 1-up step: below `md` this is a scroll-snap row,
                  so it takes carousel.ts's TRACK and no translate at all. TRACK
                  rather than SCROLLER because the travel above is measured
                  against a flex track's own width -- this one never becomes a
                  grid.
                */}
                <div
                  style={{ '--i': index } as CSSProperties}
                  className={`${TRACK} gap-8 ease-out ${
                    animate ? 'transition-transform duration-500' : ''
                  } md:translate-x-[calc(var(--i)_*_(-50%_-_1rem))] lg:translate-x-[calc(var(--i)_*_(-33.3333%_-_0.6667rem))]`}
                >
                  {slides.map((point, slot) => (
                    <div
                      key={`${point.title}-${slot}`}
                      // The second pass exists for the wrap only; it must not
                      // be announced, and it carries no focusable content.
                      aria-hidden={slot >= POINTS.length ? true : undefined}
                      className="w-[85%] shrink-0 snap-start md:w-auto md:basis-[calc((100%_-_2rem)/2)] lg:basis-[calc((100%_-_4rem)/3)]"
                    >
                      {/* Nothing is centred in a free-scrolling track -- the
                          same call the reduced-motion grid above makes. */}
                      <Card point={point} centred={!isMobile && slot === centred} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Steering for the transform only -- below `md` the track is
                  swiped directly and there is nothing for these to drive. */}
              <div className="hidden items-center justify-center gap-3 md:flex">
                {POINTS.map((point, k) => (
                  <button
                    key={point.title}
                    type="button"
                    onClick={() => goTo(k)}
                    aria-label={`Show ${point.title}`}
                    aria-current={activeDot === k ? 'true' : undefined}
                    className={`h-2.5 rounded-pill transition-all duration-300 ${
                      activeDot === k ? 'w-8 bg-primary' : 'w-2.5 bg-line hover:bg-primary/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
