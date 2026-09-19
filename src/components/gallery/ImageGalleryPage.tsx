import { useState } from 'react'
import PageBanner from '../PageBanner'
import Lightbox from '../Lightbox'
import { CtaRow, Section, SectionHead } from '../treatment/shell'
import GalleryNav, { SECTION_SCROLL_MARGIN } from './GalleryNav'
import GallerySectionHead from './GallerySectionHead'
import GalleryGrid from './GalleryGrid'
import data from '../../content/gallery/image-gallery'
import { GALLERY_IMAGES } from '../../content/gallery/image-gallery.generated'

/**
 * /image-gallery/ -- 82 before/after photographs in the capture's eight
 * sections.
 *
 * Assembly only. The copy is in content/gallery/image-gallery.ts, the
 * photographs and their alt text in image-gallery.generated.ts, and the
 * geometry comes from treatment/shell.tsx. The page's own job is three things:
 *
 *   1. give each <section> the id its schema hasPart @id names, plus the
 *      scroll margin that keeps the sticky header off an anchored heading,
 *   2. alternate the section grounds, as TreatmentPage does,
 *   3. own the lightbox's open/close state, because arrowing walks a section's
 *      images and a grid only knows its own tile.
 *
 * The lightbox index is scoped to ONE SECTION. Arrowing off the end of the
 * beard set into a female restoration photograph would be disorienting, and
 * scoping it is what lets the counter read "Beard Transplant Results — 3 of 15".
 *
 * NO JSON-LD HERE. The graph for this page is emitted by scripts/prerender.mjs
 * from src/seo/schema/image-gallery.json and verify-seo.mjs check 6 deep-equals
 * it against the capture. A block from this component would fail that.
 */
export default function ImageGalleryPage() {
  const [open, setOpen] = useState<{ section: number; index: number } | null>(null)
  const current = open === null ? null : data.sections[open.section]
  const currentImages = current ? (GALLERY_IMAGES[current.id] ?? []) : []

  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Image Gallery' }]}
        title={data.h1}
        image="/hero.webp"
      >
        {/*
          PageBanner renders `children` raw -- this is the first call site to
          use the slot, so the styling belongs here rather than in the shared
          component. `text-line` is the same light token the breadcrumb above
          uses, which is what reads against the 0.7 scrim; the default body
          grey does not.
        */}
        <p className="max-w-[70ch] text-balance text-body-lg text-line">{data.lede}</p>
      </PageBanner>

      <GalleryNav sections={data.sections} label="Gallery sections" placeholder="All treatments" />

      {data.sections.map((section, s) => {
        const images = GALLERY_IMAGES[section.id] ?? []
        return (
          <Section
            key={section.id}
            id={section.id}
            className={SECTION_SCROLL_MARGIN}
            // Alternating grounds, starting `base` under the jump-nav. Same
            // rhythm TreatmentPage owns for its sections.
            ground={s % 2 === 0 ? 'base' : 'surface'}
          >
            <GallerySectionHead
              heading={section.heading}
              subheading={section.subheading}
              lede={section.lede}
            />
            <GalleryGrid
              images={images}
              sectionHeading={section.heading}
              eager={s === 0}
              onOpen={(index) => setOpen({ section: s, index })}
            />
          </Section>
        )
      })}

      <Section ground="surface">
        {/* Kept visible, as on the home page's TreatmentGallery. */}
        <p className="mx-auto max-w-[80ch] rounded border border-line bg-base p-5 text-body">
          {data.disclaimer}
        </p>
        <SectionHead heading={data.cta.heading} lede={data.cta.body} />
        <CtaRow ctas={data.cta.ctas} center />
      </Section>

      {open !== null && current && (
        <Lightbox
          images={currentImages}
          index={open.index}
          sectionHeading={current.heading}
          onClose={() => setOpen(null)}
          onIndex={(index) => setOpen({ section: open.section, index })}
        />
      )}
    </>
  )
}
