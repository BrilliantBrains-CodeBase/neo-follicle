/**
 * PAGE 6 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1525-1559), "Low Level Laser Hair Therapy".
 *
 * URL NOTE: the brief proposes /low-level-laser-hair-therapy. Not used -- the
 * live route is /low-level-laser-therapy/.
 *
 * THE THINNEST BRIEF OF THE TEN: 84 words against a live page of 1,745. Almost
 * everything below the hero is ported -- how the treatment works, the session
 * pattern, the device types and all seven live FAQs. Without that this page
 * would have been four bullet points and a single-item accordion.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/low-level-laser-therapy/
 *      -- the page LIVE ON THE SITE TODAY (1745 words).
 *
 * The brief alone is about 5% of that, and this URL is indexed and ranking
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
 * 'Best Low Level Laser Therapy in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * anything else is passed explicitly at the call site.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/low-level-laser-therapy/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'low-level-laser-therapy',
  hero: {
    eyebrow: 'Non-Invasive Hair Therapy',
    h1: 'Low Level Laser Hair Therapy in Bangalore',
    lede: [
      'LLLT is a non-invasive treatment option considered for selected patients experiencing hair thinning.',
      'It uses low-powered red light to support scalp circulation and follicle function, with no needles, no incisions and no recovery time.',
    ],
    image: img('hero', 'A man with a full head of hair and a trimmed beard.'),
    badges: [
      'Non-Invasive',
      'No Downtime',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'prose',
      heading: 'How It Works',
      lede: [
        'Treatment focuses on supporting scalp health and follicle function as part of a broader treatment strategy.',
        'Low-powered red light is applied to the scalp to support circulation around the follicle. It works best while follicles are still active, which is why it is considered earlier in a hair loss journey rather than later.',
      ],
    },
    {
      kind: 'process',
      heading: 'What a Course Looks Like',
      lede: 'LLLT is a planned course rather than a single appointment.',
      steps: [
        {
          title: 'Scalp Assessment & Consultation',
          body: 'Thinning areas and scalp health are assessed before sessions are planned.',
        },
        {
          title: 'Red Light Exposure',
          body: 'You sit under a clinic device or wear a laser cap while the light is applied.',
        },
        {
          title: 'Gentle, Painless Stimulation',
          body: 'The session is comfortable; most people feel mild warmth at most.',
        },
        {
          title: 'Regular Sessions',
          body: 'Sessions run on a planned schedule over several months, each one short and with no downtime.',
        },
        {
          title: 'Maintenance',
          body: 'Maintenance sessions are planned afterwards to keep follicles supported.',
        },
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        {
          title: 'Non-invasive',
        },
        {
          title: 'Comfortable treatment',
        },
        {
          title: 'Personalized planning',
        },
        {
          title: 'Minimal downtime',
        },
      ],
    },
    {
      kind: 'checklist',
      heading: 'Types of Low Level Laser Therapy',
      lede: 'Several device types are used, and which one suits you is decided at consultation:',
      points: [
        'Laser combs, brushed through the hair at home',
        'Laser helmets, which cover the whole scalp',
        'Laser caps, worn while going about other activities',
        'Clinic devices, which are more powerful and more focused',
      ],
      image: img('section-1', 'A woman parting her hair to show early thinning.'),
    },
  ],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Does everyone qualify?',
        answer: 'Treatment suitability depends on evaluation.',
      },
      {
        question: 'Is LLLT painful or uncomfortable?',
        answer: 'Not at all! The treatment is completely painless. Most people feel a mild warming or tingling sensation, but it’s relaxing and comfortable.',
      },
      {
        question: 'How soon will I see results?',
        answer: 'Most patients start noticing reduced hair fall within 4–6 weeks, with new hair growth and improved thickness after 3–4 months of consistent sessions.',
      },
      {
        question: 'How many sessions do I need?',
        answer: 'We usually recommend 2–3 sessions per week for at least 3 months, followed by maintenance treatments once a week or biweekly.',
      },
      {
        question: 'Can LLLT be combined with other treatments?',
        answer: 'Absolutely! LLLT works well when combined with PRP, GFC, stem cell therapy, or even post-hair transplant to accelerate growth and healing.',
      },
      {
        question: 'Is LLLT safe for women?',
        answer: 'Yes! LLLT is very effective for women, especially for postpartum, hormonal, or pattern-related hair thinning.',
      },
      {
        question: 'Will I lose hair again if I stop LLLT?',
        answer: 'Just like any ongoing therapy, results can decline if you stop completely. We usually suggest maintenance sessions to keep hair follicles active.',
      },
      {
        question: 'Is it safe for people with sensitive scalps?',
        answer: 'Yes, LLLT is gentle and does not irritate the scalp. It’s great for people who want a non-chemical, non-invasive hair regrowth solution.',
      },
    ],
  },
  cta: {
    heading: 'Explore Non-Invasive Hair Restoration Options',
    body: 'Whether LLLT suits you depends on your scalp evaluation.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
