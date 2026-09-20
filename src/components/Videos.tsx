import { Link } from 'react-router-dom'
import { SCROLLER, SLIDE } from './carousel'
import { Square } from './icons'
import Reveal from './Reveal'
import YouTubeFacade from './YouTubeFacade'
import { BUTTON, Section } from './treatment/shell'
import data from '../content/gallery/video-gallery'
import { GALLERY_VIDEOS } from '../content/gallery/video-gallery.generated'

/**
 * Home video band -- three videos off the channel, linking to /video-gallery/.
 *
 * NOT IN THE CONTENT DOC. content/home-page/Neo-Follicle-Website-Content.md has
 * no video section; this was asked for separately. So every string below is
 * either the /video-gallery/ capture's own copy or names a destination, and
 * none of it makes a claim the doc does not already carry. FLAGGED FOR CLIENT
 * REVIEW as authored placement, not authored claims.
 *
 * Nothing here is new machinery. The tiles are YouTubeFacade in `inline` mode,
 * the same component /video-gallery/ uses, so the prerendered HTML still
 * contains NO <iframe> -- each tile ships as an anchor to the watch page
 * wrapping a local poster, and scripts/verify-gallery.mjs's zero-iframe
 * assertion holds for this page too. The shell is `Section` from
 * treatment/shell, whose container is identical to the one Insights and
 * Process hand-roll, and the mobile track is the shared SCROLLER/SLIDE pair.
 *
 * `ground="surface"`: TreatmentGallery above and CommonQuestions below are both
 * `bg-base`, and the kit's only depth cue is the base/surface step (shell.tsx).
 * Same call Insights made for the same reason.
 */

/**
 * Three videos, curated to track the doc's own promise: diagnose, then design,
 * then the result.
 *
 *   7kgXnDopoxA  Dr. Sandeep on male pattern hair loss   -- diagnosis
 *   cr0fXLJ4wYI  Hairline marking                        -- SECTION 6 step 3
 *   xMYHaZRt1uY  A patient's own account                 -- outcome
 *
 * They are deliberately drawn from three different gallery sections
 * (education, education, testimonials) so the band reads as a sample of the
 * channel rather than a slice of one playlist.
 *
 * Resolved against GALLERY_VIDEOS rather than restated, so the titles and
 * posters stay whatever gen-video-gallery.mjs last wrote. An id that stops
 * existing drops out of the row instead of rendering a broken tile -- see the
 * filter in FEATURED.
 */
const FEATURED_IDS = ['7kgXnDopoxA', 'cr0fXLJ4wYI', 'xMYHaZRt1uY']

const BY_ID = new Map(Object.values(GALLERY_VIDEOS).flat().map((v) => [v.id, v]))

const FEATURED = FEATURED_IDS.map((id) => BY_ID.get(id)).filter((v) => v !== undefined)

/**
 * The lede is the capture's own, minus its closing location clause ("right
 * here on our Neo Follicle Transplant Video Gallery"), which is true on
 * /video-gallery/ and false here. Same trim Insights applies to the guides'
 * meta descriptions.
 */
const LEDE = 'Get detailed answers, patient journeys, and expert tips from Dr. Sandeep Mahapatra.'

export default function Videos() {
  return (
    <Section ground="surface">
      <Reveal className="flex flex-col items-center gap-4 text-center">
        {/* The same eyebrow Process and Insights use: 14px mark, h6 token. */}
        <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
          <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
          Video Gallery
        </p>

        {/*
          `data.subheading` is the capture's <h3> on /video-gallery/, verbatim.
          It is an <h2> here because this is a top-level band under Hero's
          single <h1> (the doc's final recommendation 1).
        */}
        <h2 className="text-balance font-head text-h2 text-secondary lg:max-w-[660px]">
          {data.subheading}
        </h2>

        <p className="text-body lg:max-w-[534px]">{LEDE}</p>
      </Reveal>

      <ul className={`${SCROLLER} items-start gap-gap-sm md:grid-cols-3 md:gap-8`}>
        {FEATURED.map((video, i) => (
          <Reveal as="li" key={video.id} delay={i * 100} className={SLIDE}>
            <div className="flex flex-col gap-3">
              <YouTubeFacade
                videoId={video.id}
                title={video.title}
                poster={video.poster}
                mode="inline"
                className="border border-line"
              />
              {/* Titled on the page as well as in the poster's alt, for the
                  reason VideoGalleryPage states: thumbnails with no readable
                  label are not a gallery anyone can use. */}
              <p className="font-head text-h6 text-secondary">{video.title}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="flex justify-center">
        <Link to="/video-gallery/" className={`${BUTTON} bg-primary text-white hover:bg-primary-dark`}>
          View the Full Video Gallery →
        </Link>
      </div>
    </Section>
  )
}
