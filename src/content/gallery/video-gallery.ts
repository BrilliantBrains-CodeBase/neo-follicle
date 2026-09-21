/**
 * /video-gallery/ -- the authored half.
 *
 * Headings and ledes are verbatim from the capture
 * (neofollicle-seo-backup/pages/video-gallery/body-text.txt). The videos, their
 * titles and their posters come from video-gallery.generated.ts.
 *
 * The capture renders its four sections in a different order than the JSON-LD
 * lists them; the order here is the page's. hasPart is a set, not a sequence,
 * so only the ids have to match -- see scripts/gallery-assets.mjs.
 *
 * The ledes on sections 1 and 4 are the capture's comma-joined topic lists.
 * They read as lists because they are: the old page printed the topics it
 * covered rather than labelling each video, since its embeds carried no titles.
 * Ours do, so these now work as a summary of what follows.
 */
import { SOCIAL } from '../../config/site'
import { BOOK, ANALYSIS, CALL } from '../treatments/ctas'
import type { VideoGalleryData } from './types'

/** Reads the footer profile rather than restating the URL. */
const YOUTUBE_CHANNEL =
  SOCIAL.footerProfiles.find((p) => p.label === 'YouTube')?.href ??
  'https://www.youtube.com/channel/UCpUTXf985LPC2UdBXCfgrXQ'

const data: VideoGalleryData = {
  h1: 'Explore Our Expert Videos on Hair Transplant & Hair Loss Treatments',
  subheading: 'Watch. Learn. Decide with Confidence.',
  lede:
    'Get detailed answers, patient journeys, and expert tips from Dr. Sandeep Mahapatra - right here ' +
    'on our Neo Follicle Transplant Video Gallery.',

  sections: [
    {
      id: 'hair-transplant-education',
      label: 'Before, During & After',
      heading: 'Real insights into what to expect before, during, and after a hair transplant.',
      lede:
        'Male Pattern Baldness: Causes & Treatment, Female Hair Transplant: What You Should Know, ' +
        'Live Patient Hair Transplant Procedure, Patient Testimonial Stories, Frequently Asked ' +
        'Questions on Hair Transplant, Hairline Design & Graft Planning, Common Mistakes to Avoid ' +
        'After Transplant, Hair Transplant Cost Explained',
    },
    {
      id: 'hair-transplant-journeys',
      label: 'Patient Journeys',
      heading: 'Hair Transplant Journeys',
    },
    {
      id: 'hair-transplant-testimonials',
      label: 'Testimonials',
      heading: 'Hair Transplant Testimonials Videos',
    },
    {
      id: 'non-surgical-hair-loss-treatments',
      label: 'Non-Surgical Treatments',
      heading:
        'Explore non-surgical therapies and advanced solutions for hair thinning and scalp issues',
      lede:
        'PRP Treatment Explained Step-by-Step, GFC (Growth Factor Concentrate) Therapy Overview, ' +
        'Stem Cell Therapy for Hair Loss – What to Expect, Exosome Therapy – Next-Gen Hair ' +
        'Regrowth, Low Level Laser Therapy (LLLT) – How It Works, Scalp Micropigmentation for Bald ' +
        'Patches, Alopecia Areata: Causes & Treatment Options, Dandruff: Causes, Myths & Clinical ' +
        'Treatments',
    },
  ],

  /*
   * The confirmed channel uses the stable /channel/<id> form. Read it from the
   * shared visitor-facing profile list so this CTA cannot drift from the footer
   * or floating social launcher.
   */
  channelUrl: YOUTUBE_CHANNEL,

  cta: {
    heading: 'Still have a question the videos did not answer?',
    body:
      'Every case is different. Book a consultation and Dr. Sandeep Mahapatra will answer it against ' +
      'your own scalp, donor area and grade of hair loss.',
    ctas: [BOOK, ANALYSIS, CALL],
  },
}

export default data
