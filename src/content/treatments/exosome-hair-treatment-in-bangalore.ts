/**
 * PAGE 5 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1470-1524), "Exosome Therapy".
 *
 * URL NOTE: the brief proposes /exosome-therapy-bangalore. Not used -- the live
 * route is /exosome-hair-treatment-in-bangalore/.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/exosome-hair-treatment-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (1943 words).
 *
 * The brief alone is about 6% of that, and this URL is indexed and ranking
 * now. Shipping it verbatim would have deleted the explanatory sections and
 * every live FAQ. So the brief is the spine and the substantive live copy is
 * carried into it; FAQ items are the brief's first, then the live ones,
 * de-duplicated.
 *
 * Dropped from the capture deliberately: header/footer chrome, the repeated
 * inline "Call #" CTAs, the doctor-credentials block (the doctor page owns it),
 * Google-review screenshots, and the "Our Patients Come from Entire Bangalore"
 * area list -- that last one is keyword stuffing.
 *
 * The <h1> is the BRIEF's, matching the ten surgical pages. The capture's was
 * 'Best Exosome Hair Treatment in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 *
 * THE COST SECTION IS PORTED WITHOUT ITS NUMBERS -- the live page quotes
 * undated per-session rupee figures. What drives the cost is durable; the
 * figures are not, and /hair-transplant-cost-in-bangalore/ owns pricing.
 * FLAGGED FOR CLIENT REVIEW.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * anything else is passed explicitly at the call site.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/exosome-hair-treatment-in-bangalore/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'exosome-hair-treatment-in-bangalore',
  hero: {
    eyebrow: 'Advanced Regenerative Therapy',
    h1: 'Exosome Therapy in Bangalore for Advanced Hair Restoration',
    lede: [
      'Exosome Therapy is considered for selected patients seeking regenerative hair restoration planning under dermatologist supervision.',
    ],
    image: {
      src: '/treatments/exosome-hair-treatment-in-bangalore/hero.webp',
      alt: 'A clinician treating a reclining man’s scalp, with an Exosome Therapy vial and box on the tray beside him.',
      width: 1200,
      height: 1200,
    },
    badges: [
      'Regenerative Signalling',
      'Dermatologist Supervised',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'prose',
      heading: 'What Is Exosome Therapy?',
      lede: [
        'The treatment focuses on regenerative signaling rather than replacing hair directly.',
      ],
      points: [
        'Follicle condition',
        'Hair loss stage',
        'Medical evaluation',
      ],
      closing: [
        'Every recommendation depends on each of these, assessed at consultation.',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      lede: 'What a course of exosome therapy is intended to do.',
      items: [
        { title: 'Stimulates natural regrowth', body: 'Delivers growth signals intended to activate weak or dormant follicles.' },
        { title: 'Reduces thinning and fall', body: 'Supports scalp health and hair roots so daily shedding settles.' },
        { title: 'No blood draw or surgery', body: 'Exosomes come pre-formulated, unlike PRP, which saves time in session.' },
        { title: 'Suitable across hair types', body: 'A non-hormonal approach, planned the same way for men and women.' },
        { title: 'Works alongside a transplant', body: 'Also used after a transplant to support healing and density.' },
        { title: 'Dermatologist supervision', body: 'Every course is planned and reviewed by the treating doctor.' },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Journey',
      steps: [
        {
          title: 'Consultation',
        },
        {
          title: 'Diagnosis',
        },
        {
          title: 'Planning',
        },
        {
          title: 'Treatment',
        },
        {
          title: 'Follow-up',
        },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      lede: 'Results vary with hair loss stage, scalp health and individual response.',
      images: [
        img('result-1', 'Before and after exosome therapy at Neo Follicle.', 1024, 1024),
        img('result-2', 'Before and after exosome therapy showing improved density at Neo Follicle.', 1024, 1024),
        img('result-3', 'Before and after exosome therapy across the crown at Neo Follicle.', 1024, 1024),
      ],
    },
    {
      kind: 'prose',
      heading: 'What Determines Exosome Treatment Cost',
      lede: [
        'Cost depends on the plan rather than a single published rate.',
      ],
      points: [
        'The severity of hair loss',
        'The number of sessions required',
        'Whether exosome therapy is combined with other treatments',
      ],
      closing: [
        'Your consultation sets the number of sessions before treatment begins.',
      ],
    },
  ],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Is Exosome Therapy suitable for advanced baldness?',
        answer: 'Eligibility depends on consultation.',
      },
      {
        question: 'Can it replace a transplant?',
        answer: 'Treatment planning determines the most appropriate approach.',
      },
      {
        question: 'What exactly are exosomes?',
        answer: 'Exosomes are tiny cell messengers derived from stem cells. They carry proteins and growth signals that help repair and regenerate hair follicles - making them ideal for stimulating new hair growth.',
      },
      {
        question: 'How is Exosome different from PRP or GFC?',
        answer: 'Unlike PRP or GFC, exosomes come pre-prepared and contain higher concentrations of growth factors. There’s no need to draw your blood, and results are often faster and more predictable.',
      },
      {
        question: 'Is the Exosome treatment safe?',
        answer: 'Yes. The exosome solution is lab-processed, purified, and rigorously tested for safety. It’s widely used in regenerative medicine and cosmetic treatments with minimal risk.',
      },
      {
        question: 'How many sessions will I need?',
        answer: 'Most people require 1 to 3 sessions, spaced 3–4 weeks apart. The number of sessions depends on your scalp condition and desired outcome.',
      },
      {
        question: 'When will I see visible results?',
        answer: 'You may notice reduced hair fall and better hair texture in about 4–6 weeks. New hair growth generally becomes visible in 2–3 months.',
      },
      {
        question: 'Does Exosome Therapy hurt?',
        answer: 'The injections are very fine and cause minimal discomfort. We can apply a numbing cream to make the experience more comfortable.',
      },
      {
        question: 'Is iExosome Therapy suitable for women too?',
        answer: 'Absolutely! Exosome therapy is ideal for female pattern hair loss, postpartum shedding, or thinning from hormonal changes.',
      },
      {
        question: 'Can I combine Exosome therapy with PRP or other treatments?',
        answer: 'Yes! Exosome therapy can be used on its own or combined with PRP, GFC, or post-transplant therapy for enhanced results.',
      },
    ],
  },
  cta: {
    heading: 'Discover Whether Exosome Therapy Fits Your Hair Restoration Plan',
    body: 'Exosome Therapy is planned under dermatologist supervision after a scalp evaluation.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
