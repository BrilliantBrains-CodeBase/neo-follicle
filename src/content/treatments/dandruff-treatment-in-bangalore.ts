/**
 * PAGE 9 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1637-1690), "Dandruff Solutions".
 *
 * URL NOTE: the brief proposes /dandruff-solutions-bangalore. Not used -- the
 * live route is /dandruff-treatment-in-bangalore/.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/dandruff-treatment-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (1648 words).
 *
 * The brief alone is about 8% of that, and this URL is indexed and ranking
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
 * 'Best Dandruff Treatment in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * anything else is passed explicitly at the call site.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/dandruff-treatment-in-bangalore/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'dandruff-treatment-in-bangalore',
  hero: {
    eyebrow: 'Scalp Health',
    h1: 'Dandruff Solutions in Bangalore for a Healthier Scalp',
    lede: [
      'A healthy scalp creates a stronger foundation for healthier hair.',
      'At Neo Follicle, dandruff treatment begins with understanding what\'s causing your scalp concern before recommending treatment.',
    ],
    image: img('hero', 'A woman examining flaking on her scalp.'),
    badges: [
      'Dermatologist Supervised',
      'Scalp-First',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'checklist',
      heading: 'Common Symptoms',
      lede: 'Patients commonly seek treatment for:',
      points: [
        'Flaking',
        'Itching',
        'Scalp discomfort',
        'Recurring dandruff',
      ],
      image: img('section-1', 'A man smiling after a course of scalp treatment.'),
    },
    {
      kind: 'prose',
      heading: 'Why Scalp Health Matters',
      lede: [
        'Scalp health is considered alongside hair loss because both can influence long-term hair care planning.',
        'Persistent flaking and irritation are worth treating in their own right, and treating them also makes it easier to assess what else is happening on the scalp.',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        {
          title: 'Personalized diagnosis',
        },
        {
          title: 'Scalp-focused treatment',
        },
        {
          title: 'Long-term maintenance guidance',
        },
        {
          title: 'Dermatologist supervision',
        },
      ],
    },
  ],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Can dandruff contribute to scalp discomfort?',
        answer: 'Yes. Your consultation helps determine the underlying cause.',
      },
      {
        question: 'Will treatment be personalized?',
        answer: 'Yes. Recommendations depend on your scalp evaluation.',
      },
      {
        question: 'Why won’t my dandruff go away with regular shampoos?',
        answer: 'Because over-the-counter shampoos only manage surface symptoms. If your dandruff is caused by a fungus, oily scalp, or inflammation, it needs targeted clinical treatment to get long-lasting relief.',
      },
      {
        question: 'What is the main cause of dandruff?',
        answer: 'Dandruff can be caused by seborrheic dermatitis, fungal infections, dry scalp, or product buildup. Our diagnostic process helps identify the exact reason in your case.',
      },
      {
        question: 'Can dandruff cause hair loss?',
        answer: 'Yes, persistent dandruff can weaken hair roots, cause scalp inflammation, and lead to hair thinning or fall if left untreated.',
      },
      {
        question: 'How many sessions do I need?',
        answer: 'Most patients feel better after 1–2 sessions, but we typically recommend a series of 3–6 treatments along with home care to fully control the condition.',
      },
      {
        question: 'Is the treatment safe for color-treated or chemically straightened hair?',
        answer: 'Absolutely. We use gentle, sulfate-free products that are safe for treated hair and won’t damage your hair color or texture.',
      },
      {
        question: 'Do I need to keep coming forever for dandruff treatments?',
        answer: 'Not at all. Once your condition is under control, we guide you on easy-to-follow home care to maintain a healthy scalp.',
      },
      {
        question: 'Can men and women both get treated?',
        answer: 'Yes! Our treatments are customized to individual needs and are suitable for all genders, hair types, and ages.',
      },
      {
        question: 'Is dandruff contagious?',
        answer: 'No, dandruff isn’t contagious. But if it’s caused by a fungal issue like Malassezia, it may spread on your own scalp without proper care.',
      },
    ],
  },
  cta: {
    heading: 'Build Healthier Hair by Starting with a Healthier Scalp',
    body: 'Treatment begins with understanding what is causing the concern.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
