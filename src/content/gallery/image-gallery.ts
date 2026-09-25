/**
 * /image-gallery/ -- the authored half.
 *
 * Headings, subheadings and ledes are VERBATIM from the capture
 * (neofollicle-seo-backup/pages/image-gallery/body-text.txt), with two
 * deliberate departures, both noted at their site below. The photographs and
 * their alt text come from image-gallery.generated.ts, written by
 * scripts/gen-gallery-images.mjs out of scripts/gallery-assets.mjs.
 *
 * Section `id`s are not free -- each must equal the fragment of the matching
 * ImageGallery.hasPart @id in src/seo/schema/image-gallery.json, because the
 * nav links to them and verify-gallery.mjs asserts the graph and the DOM
 * agree. The order here is the order the old page rendered.
 */
import { BOOK, ANALYSIS, CALL } from '../treatments/ctas'
import type { ImageGalleryData } from './types'

const data: ImageGalleryData = {
  h1: 'See What’s Possible with Expert Hair Restoration',
  lede:
    'Explore our visual proof of transformation - from hair transplant success stories to advanced ' +
    'treatments. Every image here tells a story of regained confidence.',

  sections: [
    {
      id: 'hair-transplant-results',
      label: 'Hair Transplant',
      heading: 'Hair Transplant Results',
      subheading: 'Natural Hairlines. Fuller Scalps. Real-Life Results.',
      lede:
        'Our most popular procedure - watch how we restore receding hairlines and thinning crowns ' +
        'for men of all ages.',
    },
    {
      id: 'beard-transplant-results',
      label: 'Beard Transplant',
      heading: 'Beard Transplant Results',
      subheading: 'From Patchy to Powerful Beards',
      lede:
        'Discover how we helped men fill patchy beards, define jawlines, and achieve fuller facial ' +
        'hair that grows naturally.',
    },
    {
      id: 'failed-hair-transplant-repair',
      label: 'Failed Transplant Repair',
      heading: 'Failed Hair Transplant Repair',
      subheading: 'Turning Disappointment into Restoration',
      /*
       * DEPARTURE 1 -- this lede is rewritten, and it is the one change on this
       * page that alters a claim rather than a spelling.
       *
       * The capture reads: "These results showcase how Dr. Sandeep Mahapatra
       * has successfully repaired unnatural hairlines, low-density results, and
       * scarring from previous failed transplants performed elsewhere."
       *
       * None of the three photographs under this heading is a repair result.
       * All three show damage from work done at other clinics, before any
       * corrective procedure, with that assessment burned into the image. The
       * captured sentence describes pictures that are not on the page. The
       * replacement says what the images actually are; each one also carries a
       * visible caption saying the same thing. See the block comment on this
       * section in scripts/gallery-assets.mjs -- the standing ask is for a
       * genuine repair before/after, at which point this can revert.
       */
      lede:
        'These are cases that came to us after unsatisfactory work elsewhere - unnatural hairlines, ' +
        'very low density and visible donor-area scarring. Each is shown as it presented, before ' +
        'corrective treatment. Repair planning begins with assessing what can be salvaged and what ' +
        'must be rebuilt.',
    },
    {
      id: 'female-hair-restoration',
      label: 'Eyebrow Transplant',
      heading: 'Female Hair Restoration',
      subheading: 'Gentle, Subtle, and Confidence-Restoring Hair Treatments for Women',
      lede:
        'Explore our before & after results for female pattern thinning, hairline reshaping, and ' +
        'non-surgical solutions.',
    },
    {
      id: 'eyebrow-transplant-results',
      label: 'Eyebrow Transplant',
      heading: 'Eyebrow Transplant Results',
      subheading: 'Beautiful, Balanced, and Bold Brows',
      lede:
        'See how eyebrow transplants create natural symmetry, shape, and definition for both men ' +
        'and women.',
    },
    {
      id: 'gfc-prp-therapy-results',
      label: 'GFC & Exosomes',
      heading: 'GFC / PRP Therapy Results',
      subheading: 'Stronger Roots, Thicker Hair - Thanks to Growth Factor Concentrate',
      lede:
        'Browse visual proof of hair strengthening and density enhancement using our next-gen GFC ' +
        'therapy.',
    },
    {
      id: 'exosome-therapy-results',
      label: 'Exosome Therapy',
      heading: 'Exosome Therapy Results',
      subheading: 'Advanced Cell-Based Healing, Visible Growth',
      lede:
        'Exosome therapy is revolutionizing regenerative hair care. See how our clients regained ' +
        'volume and vitality.',
    },
    {
      id: 'scalp-micropigmentation-results',
      /*
       * DEPARTURE 2 -- the capture's own nav label for this section reads "Scalp
       * Micorpigmentation". That is a plain typo: it appears in no <head>
       * field, and the JSON-LD spells it correctly ("Scalp Micropigmentation
       * Results"), so fixing it cannot desync anything verify-seo checks.
       */
      label: 'Scalp Micropigmentation',
      heading: 'Scalp Micro-Pigmentation Results',
      // The only section the old page gave no subheading and no lede.
    },
  ],

  /*
   * Kept visible, the same call TreatmentGallery makes on the home page. The
   * capture buries an equivalent line in the site-wide footer disclaimer; on a
   * page that is nothing but before/after photographs it belongs beside them.
   */
  disclaimer:
    'Before and after images are shared for patient education and to show treatment possibilities. ' +
    'Results vary from case to case with age, grade of hair loss, donor availability, scalp ' +
    'condition and aftercare. A consultation is required to understand what result is realistic ' +
    'for you.',

  cta: {
    heading: 'See a result here that looks like your own hair loss?',
    body:
      'Bring it to a consultation. Dr. Sandeep Mahapatra will assess your donor area, grade your ' +
      'hair loss and tell you plainly what is achievable in your case.',
    ctas: [BOOK, ANALYSIS, CALL],
  },
}

export default data
