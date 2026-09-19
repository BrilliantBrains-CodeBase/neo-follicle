/**
 * PAGE 4 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1419-1469), "Neo QR678 Treatment".
 *
 * URL NOTE: the brief proposes /qr678-treatment-bangalore. Not used -- the live
 * route is /qr678-hair-treatment-in-bangalore/.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/qr678-hair-treatment-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (1826 words).
 *
 * The brief alone is about 7% of that, and this URL is indexed and ranking
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
 * 'Best QR678 Neo Treatment in Bangalore'; scripts/verify-seo.mjs does not assert h1.
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
  src: `/treatments/qr678-hair-treatment-in-bangalore/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'qr678-hair-treatment-in-bangalore',
  hero: {
    eyebrow: 'Peptide-Based Hair Therapy',
    h1: 'Neo QR678 Treatment in Bangalore for Advanced Hair Loss Management',
    lede: [
      'QR678 is one of the advanced treatment options considered for suitable patients experiencing hair thinning.',
      'Every recommendation follows personalized evaluation.',
    ],
    image: img('hero', 'A man with thinning hair across the frontal scalp.'),
    badges: [
      'Peptide-Based',
      'Dermatologist-Led',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'prose',
      heading: 'What Is QR678?',
      lede: [
        'The treatment uses a peptide-based approach as part of a broader hair restoration strategy.',
        'It is a non-surgical, injectable course delivered over planned sessions rather than a one-off procedure.',
      ],
    },
    {
      kind: 'checklist',
      heading: 'Who Is It For?',
      lede: 'Patients may be evaluated if they\'re experiencing:',
      points: [
        'Hair thinning',
        'Progressive hair fall',
        'Living follicles requiring support',
      ],
      image: img('section-1', 'Before and after a course of medical hair loss treatment.'),
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      lede: 'What a course of QR678 is intended to do.',
      items: [
        { title: 'Reduces hair fall from the roots', body: 'Helps control shedding by supporting weak and shrinking follicles.' },
        { title: 'Promotes natural regrowth', body: 'Stimulates dormant follicles without surgery or downtime.' },
        { title: 'No blood draw needed', body: 'Unlike PRP, QR678 is pre-formulated, so sessions are quicker.' },
        { title: 'Clinically studied formulation', body: 'A patented preparation, backed by published clinical research.' },
        { title: 'Suitable across hair types', body: 'Planned the same way for men and women, and for any hair texture.' },
        { title: 'Minimal discomfort, no downtime', body: 'A session takes minutes and you can return to your day afterwards.' },
      ],
    },
    {
      kind: 'prose',
      heading: 'What Determines QR678 Treatment Cost',
      lede: [
        'Cost follows the treatment plan rather than a single published rate.',
      ],
      points: [
        'The number of sessions required',
        'The severity and pattern of hair loss',
        'Whether QR678 is combined with other treatments',
      ],
      closing: [
        'Your session count is agreed at consultation, so the plan is clear before treatment begins.',
      ],
    },
  ],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Is QR678 suitable for everyone?',
        answer: 'No. Eligibility depends on consultation.',
      },
      {
        question: 'Can QR678 be combined with other treatments?',
        answer: 'Treatment combinations are discussed individually.',
      },
      {
        question: 'What is QR678 made of?',
        answer: 'QR678 contains a mix of natural growth factors and peptides that are already present in your body. These are lab-prepared and injected into the scalp to stimulate hair follicles and promote hair growth.',
      },
      {
        question: 'How is QR678 different from PRP?',
        answer: 'PRP uses your own blood and requires extraction and spinning. QR678 is pre-formulated, ready-to-use, and more concentrated, leading to faster, more targeted results without the need for a blood draw.',
      },
      {
        question: 'Is QR678 safe?',
        answer: 'Yes! It’s clinically tested, FDA-approved in India, and US-patented. It’s widely used with no reported long-term side effects.',
      },
      {
        question: 'How many sessions will I need?',
        answer: 'Most patients need around 6 to 8 sessions, spaced 2–3 weeks apart, to see noticeable results. Maintenance sessions may be suggested every 6–8 months.',
      },
      {
        question: 'Does the treatment hurt?',
        answer: 'The injections may cause slight discomfort or a tingling sensation, but most patients find it very tolerable. There’s no downtime—you can go back to work right after.',
      },
      {
        question: 'When can I expect to see results?',
        answer: 'You’ll likely see reduced hair fall within a few weeks. Visible hair regrowth and improvement in density generally happen within 2 to 3 months.',
      },
      {
        question: 'Is QR678 effective for women?',
        answer: 'Absolutely. It’s highly effective for female pattern hair loss, postpartum hair fall, and hormonal thinning. Many women choose QR678 for its safety and visible improvement in hair density.',
      },
    ],
  },
  cta: {
    heading: 'Explore QR678 with Expert Guidance',
    body: 'Every QR678 recommendation follows a personalized evaluation.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
