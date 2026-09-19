/**
 * The shape of a treatment page.
 *
 * Every page in content/treatments/Neo Follicle Website Content-3.md follows
 * one structure -- hero, a few explanatory blocks, a five-step process, a
 * recovery table, an FAQ accordion and a closing CTA -- with only the copy and
 * the section order changing between them. So a treatment page is DATA here,
 * and src/components/treatment/ renders it.
 *
 * That is a deliberate departure from src/components/doctor/, where every
 * section is its own prop-less component with the copy inline. Ten pages at
 * roughly eight sections each would be about eighty near-identical files under
 * that pattern, and a copy change would mean hunting through them. The doctor
 * page is one page and keeps its own idiom; this is ten.
 *
 * What did NOT change: the copy is still verbatim from the brief, the same rule
 * DoctorHero records. `sections` is ordered, so a page declares only the blocks
 * its brief actually contains rather than filling in a fixed template.
 */

/** A button. Exactly one of `to` (a route) or `href` (tel:, external) is set. */
export type Cta = {
  label: string
  /** Router path. Must carry its trailing slash -- see SEO.trailingSlash. */
  to?: string
  href?: string
  /** Renders the phone glyph ahead of the label. */
  phone?: boolean
}

/**
 * Intrinsic width/height are required, not optional: every <img> on the site
 * carries them so the box is reserved before the file lands. The real numbers
 * are in public/treatments/sizes.json, written by gen-treatment-images.mjs.
 */
export type TreatmentImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type FeatureItem = {
  title: string
  /** Omitted where the brief gives a bare label with no supporting line. */
  body?: string
}

export type ProcessStep = {
  title: string
  body?: string
  /** The brief's sub-bullets, e.g. what a consultation looks at. */
  points?: string[]
}

export type TimelineRow = { when: string; what: string }

export type Person = { name: string; role: string; image: TreatmentImage }

/**
 * A rendered block. `kind` picks the component in
 * src/components/treatment/TreatmentPage.tsx.
 *
 * No section carries a background: TreatmentPage alternates base/surface down
 * the page so the rhythm cannot be got wrong one module at a time.
 */
/**
 * `intro` on featureGrid and checklist is a paragraph of body copy rendered
 * between the section head and the section's own content.
 *
 * It exists because the hero lede is capped at two paragraphs (see
 * TreatmentPageData['hero'] below) and five briefs wrote three. The third in
 * each case is a short closing line -- "Every recommendation is based on
 * medical evaluation, not a standard treatment package" -- which reads as a
 * lead-in to the section that follows the hero. It is moved there rather than
 * dropped: no copy the brief wrote is deleted.
 */
export type TreatmentSection =
  /** Heading, paragraphs, an optional bullet list, optional closing paragraphs. */
  | { kind: 'prose'; heading: string; lede?: string[]; points?: string[]; closing?: string[] }
  /** The reference's icon-box grid, minus the icons. Card 0 is tinted `accent`. */
  | { kind: 'featureGrid'; heading: string; lede?: string; intro?: string; items: FeatureItem[] }
  /** A bullet list beside a photograph, with an optional second list under it. */
  | {
      kind: 'checklist'
      heading: string
      lede?: string
      intro?: string
      points: string[]
      image?: TreatmentImage
      secondary?: { heading: string; points: string[] }
      closing?: string
    }
  /** The five-step sequence, as a vertical timeline. */
  | { kind: 'process'; heading: string; lede?: string; steps: ProcessStep[] }
  /**
   * Before/after photographs.
   *
   * There is no `review` flag here on purpose. Where a set's provenance is not
   * clean it is called out in a FLAGGED FOR CLIENT REVIEW comment at the data
   * module and in scripts/treatment-assets.mjs -- that is a note to us, and
   * rendering it to patients would be worse than not having it.
   */
  | { kind: 'results'; heading: string; lede?: string; images: TreatmentImage[]; points?: string[]; closing?: string }
  /** The recovery table. */
  | { kind: 'timeline'; heading: string; lede?: string; columns: [string, string]; rows: TimelineRow[] }
  /** Celebrity page only. */
  | { kind: 'personalities'; heading: string; lede?: string; people: Person[]; closing?: string }

export type TreatmentPageData = {
  /** Used for the FAQ accordion's `name`, which must be unique per page. */
  slug: string
  hero: {
    /** The small chip above the h1, e.g. "Advanced Restoration". */
    eyebrow: string
    /** The page's ONLY h1. PagePlaceholder is dropped so this stays single. */
    h1: string
    /**
     * One or two paragraphs. The tuple is the cap, deliberately.
     *
     * The hero is an asymmetric card whose right column stretches to the left
     * column's height; a third paragraph pushes that column past any sensible
     * image height and the whole row goes out of proportion. Five briefs wrote
     * three, and their third now lives in the following section's `intro`.
     *
     * Enforced by the TYPE rather than a `.slice(0, 2)` in TreatmentHero so
     * that a third paragraph is a compile error naming the module, not copy
     * silently dropped at runtime.
     */
    lede: [string] | [string, string]
    image: TreatmentImage
    /** The reference's floating stat card, reduced to labels. */
    badges?: string[]
    ctas: Cta[]
  }
  sections: TreatmentSection[]
  faq?: { heading: string; items: { question: string; answer: string }[] }
  cta: { heading: string; body?: string; ctas: Cta[] }
}
