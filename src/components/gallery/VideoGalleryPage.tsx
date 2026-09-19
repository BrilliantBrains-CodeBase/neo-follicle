import PageBanner from '../PageBanner'
import Reveal from '../Reveal'
import YouTubeFacade from '../YouTubeFacade'
import { SCROLLER, SLIDE } from '../carousel'
import { CtaRow, Section, SectionHead } from '../treatment/shell'
import GalleryNav, { SECTION_SCROLL_MARGIN } from './GalleryNav'
import GallerySectionHead from './GallerySectionHead'
import data from '../../content/gallery/video-gallery'
import { GALLERY_VIDEOS } from '../../content/gallery/video-gallery.generated'

/**
 * /video-gallery/ -- 45 YouTube videos in the capture's four sections.
 *
 * Structurally the twin of ImageGalleryPage, with two differences.
 *
 *   1. No lightbox. Each tile plays IN PLACE: YouTubeFacade swaps its own
 *      poster for an iframe on click, so the visitor stays on the page. A
 *      modal would add a focus trap and an escape route for no gain, since
 *      there is nothing to see around the player.
 *   2. Nothing is generated from the backup's media files -- there are none.
 *      The capture holds ids and empty titles. Titles and posters come from
 *      video-gallery.generated.ts, written once by gen-video-gallery.mjs.
 *
 * The prerendered HTML contains NO <iframe>: every tile ships as an anchor to
 * youtube.com wrapping a local poster, which is what the page shows with
 * JavaScript off. verify-gallery.mjs asserts the iframe count is zero.
 */
export default function VideoGalleryPage() {
  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Video Gallery' }]}
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

      <GalleryNav sections={data.sections} label="Video gallery sections" placeholder="All topics" />

      {data.sections.map((section, s) => {
        const videos = GALLERY_VIDEOS[section.id] ?? []
        return (
          <Section
            key={section.id}
            id={section.id}
            className={SECTION_SCROLL_MARGIN}
            ground={s % 2 === 0 ? 'base' : 'surface'}
          >
            {/*
              The capture's <h3> "Watch. Learn. Decide with Confidence." sits
              under the h1, not inside a section, so it rides on the first
              section's head rather than being dropped.
            */}
            <GallerySectionHead
              heading={section.heading}
              subheading={s === 0 ? data.subheading : undefined}
              lede={section.lede}
            />
            <ul className={`${SCROLLER} items-start gap-gap-sm md:grid-cols-2 md:gap-8 lg:grid-cols-3`}>
              {videos.map((video, i) => (
                <Reveal as="li" key={video.id} delay={(i % 3) * 100} className={SLIDE}>
                  <div className="flex flex-col gap-3">
                    <YouTubeFacade
                      videoId={video.id}
                      title={video.title}
                      poster={video.poster}
                      mode="inline"
                      loading={s === 0 && i < 3 ? 'eager' : 'lazy'}
                      className="border border-line"
                    />
                    {/* The title is on the page as well as in the poster's alt:
                        a wall of thumbnails with no readable labels is not a
                        gallery anyone can use. */}
                    <p className="font-head text-h6 text-secondary">{video.title}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Section>
        )
      })}

      <Section ground="surface">
        <SectionHead heading={data.cta.heading} lede={data.cta.body} />
        <CtaRow ctas={data.cta.ctas} center />
        <p className="text-center text-body">
          <a
            href={data.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 transition-colors hover:text-primary-dark"
          >
            Explore our YouTube channel
          </a>
        </p>
      </Section>
    </>
  )
}
