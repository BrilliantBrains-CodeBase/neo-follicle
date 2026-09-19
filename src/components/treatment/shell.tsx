/**
 * Shared geometry for the treatment sections.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 */
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Cta } from '../../content/treatments/types'
import { Phone } from '../icons'
import Reveal from '../Reveal'

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
export const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** The kit's single button geometry: radius 0.5rem, padding 1rem. */
export const BUTTON =
  `inline-flex w-full items-center justify-center gap-2 rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

/**
 * Section grounds alternate down the page. There is no shadow scale in the kit
 * (every box-shadow resolves to transparent), so this step from `base` to
 * `surface` plus the 1px `line` hairlines is the only depth the design has.
 */
export type Ground = 'base' | 'surface'

export function Section({
  ground,
  id,
  className = '',
  children,
}: {
  ground: Ground
  /**
   * Anchor target. Added for the gallery pages, whose jump-nav links to
   * each section and whose ids are fixed by the hasPart @ids in
   * src/seo/schema/{image,video}-gallery.json. Unused elsewhere.
   */
  id?: string
  /** Extra classes on the <section> itself -- e.g. the anchor scroll margin. */
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`${ground === 'surface' ? 'bg-surface' : 'bg-base'} py-section-y-mobile md:py-section-y-tablet lg:py-section-y ${className}`}
    >
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">{children}</div>
    </section>
  )
}

/**
 * A section's heading block.
 *
 * ALIGNMENT IS PER SECTION, NOT GLOBAL. This used to be unconditionally
 * `items-center text-center`, which -- combined with the `mx-auto max-w-[760px]`
 * cage every body carried -- made all ten pages read as one narrow centred
 * column from the hero to the footer, with the outer third of the container
 * empty on every band.
 *
 * The reference does not do that. Counting `text-align` in its own stylesheets:
 * treatments-details (post-33.css) is 5 centre / 3 left, the treatments page
 * (post-23.css) is 10 centre / 12 start. It centres a heading when a FULL-WIDTH
 * CARD GRID follows and anchors it -- sections 4 "Precision Meets Artistry" and
 * 5 "The FUE Journey" -- and it runs a LEFT-ALIGNED heading in a two-column row
 * when the content beside it is a list or a panel: section 6 "Key Advantages"
 * (container `623ca65`, `--flex-direction:row`).
 *
 * So: `center` for grid sections, `left` inside `Split`. The call sites in
 * sections.tsx name which and why.
 */
export function SectionHead({
  heading,
  lede,
  align = 'center',
}: {
  heading: string
  lede?: string
  align?: 'center' | 'left'
}) {
  const centred = align === 'center'
  return (
    <Reveal className={`flex flex-col gap-4 ${centred ? 'items-center text-center' : 'items-start text-left'}`}>
      {/* The clamps only apply centred. In a Split the column is already the
          measure, and a second cap inside it would wrap the heading early. */}
      <h2 className={`text-balance font-head text-h2 ${centred ? 'lg:max-w-[660px]' : ''}`}>{heading}</h2>
      {lede && <p className={`text-body ${centred ? 'lg:max-w-[534px]' : ''}`}>{lede}</p>}
    </Reveal>
  )
}

/**
 * The two-column band: heading held left, content filling the rest.
 *
 * This is reference section 6's geometry (`623ca65`) and it is what replaces
 * the centred-head-over-narrow-centred-column pattern on every section whose
 * content is a list, a panel, a timeline, a table or an accordion.
 *
 * The left column is `sticky` from `lg` up. The heading then stays with its
 * content through a long list instead of scrolling away, which is what earns
 * the column its width -- otherwise it is just an empty third. `top-28` (7rem)
 * clears the sticky header, which is `min-h-[91px]`. `self-start` is required:
 * a grid item stretches by default and a stretched item cannot stick.
 *
 * `minmax(0,...)` on both tracks, not `380px 1fr` -- a bare `1fr` floors at the
 * content's min-content width, so one long unbroken string in the right column
 * would push the grid wider than the container instead of wrapping.
 */
export function Split({
  ground,
  head,
  children,
}: {
  ground: Ground
  head: ReactNode
  children: ReactNode
}) {
  return (
    <section
      className={`${ground === 'surface' ? 'bg-surface' : 'bg-base'} py-section-y-mobile md:py-section-y-tablet lg:py-section-y`}
    >
      <div className="container grid gap-gap-mobile md:gap-gap-tablet lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-gap">
        <div className="lg:sticky lg:top-28 lg:self-start">{head}</div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </section>
  )
}

/**
 * A CTA. `to` goes through the router; `href` (tel:, external) cannot, so it
 * renders a plain anchor -- the same split DoctorCta makes for its phone link.
 */
export function CtaButton({ cta, className }: { cta: Cta; className: string }) {
  const inner = (
    <>
      {cta.phone && <Phone className="h-5 w-5" />}
      {cta.label}
    </>
  )
  return cta.to ? (
    <Link to={cta.to} className={className}>
      {inner}
    </Link>
  ) : (
    <a href={cta.href} className={className}>
      {inner}
    </a>
  )
}

/**
 * The button row. The first CTA is the primary fill; the rest are outlined.
 * `dark` switches the palette for the two sections that sit on `secondary`.
 */
export function CtaRow({ ctas, dark = false, center = false }: { ctas: Cta[]; dark?: boolean; center?: boolean }) {
  const primary = dark
    ? `${BUTTON} bg-primary text-white hover:bg-white hover:text-secondary`
    : `${BUTTON} bg-primary text-white hover:bg-primary-dark`
  const secondary = dark
    ? `${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`
    : `${BUTTON} border border-line text-secondary hover:border-secondary`

  return (
    <div className={`flex w-full flex-wrap gap-gap-sm md:w-auto ${center ? 'justify-center' : ''}`}>
      {ctas.map((cta, i) => (
        <CtaButton key={cta.label} cta={cta} className={i === 0 ? primary : secondary} />
      ))}
    </div>
  )
}
