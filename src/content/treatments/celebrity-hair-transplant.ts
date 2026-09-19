/**
 * PAGE 8 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 811-919). The brief's URL (`/celebrity-hair-transplants`, plural) is ignored
 * -- the live route is singular.
 *
 * SECTION 3 of the brief opens "The original website highlights several
 * well-known personalities associated with Neo Follicle." That is a note to the
 * builder describing where the list came from, not copy, and is not rendered.
 * The brief's closing line for that section ("Their presence reinforces trust
 * without changing the original positioning") is the same, and is also dropped.
 *
 * The brief lists six names. The capture holds a photograph for five of them
 * and none for Bhuvann Ponnannaa, so five are shown -- putting another
 * person's face under his name is not a layout decision. See the
 * FLAGGED FOR CLIENT REVIEW note in scripts/treatment-assets.mjs.
 */
import { BOOK_PRIVATE, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const person = (file: string, name: string, role: string) => ({
  name,
  role,
  image: {
    src: `/treatments/celebrity-hair-transplant/${file}.webp`,
    alt: `${name}, ${role.toLowerCase()}.`,
    width: 650,
    height: 450,
  },
})

const data: TreatmentPageData = {
  slug: 'celebrity-hair-transplant',

  hero: {
    eyebrow: 'Private Hair Restoration',
    h1: 'Trusted Hair Restoration for Public Figures and Performers',
    lede: [
      'Hair restoration isn’t only about appearance—it’s about confidence in front of the camera, on stage, and in everyday life.',
      'Neo Follicle has earned the trust of public figures who value natural-looking results, personalized planning, and privacy throughout their treatment journey.',
      // The brief's third hero paragraph is the next section's `intro`. The
      // hero lede is capped at two -- see the note on `lede` in ./types.
    ],
    image: {
      src: '/treatments/celebrity-hair-transplant/hero.webp',
      alt: 'Neo Follicle Hair Transplant Clinic, trusted by public figures in Bangalore.',
      width: 650,
      height: 450,
    },
    badges: ['Medical Confidentiality', 'Camera-Friendly Density'],
    ctas: [BOOK_PRIVATE, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'Why Public Figures Choose Natural Hair Restoration',
      lede: 'For individuals constantly in front of cameras, the goal isn’t dramatic change overnight. Instead, treatment planning focuses on:',
      intro:
        'Every consultation follows the same doctor-led approach, regardless of whether the patient is a celebrity or visiting for their first consultation.',
      points: [
        'Natural hairlines',
        'Camera-friendly density',
        'Minimal visible recovery',
        'Long-term planning',
        'Personalized care',
      ],
    },
    {
      kind: 'personalities',
      heading: 'Featured Personalities',
      lede: 'Featured names include:',
      people: [
        person('sri-murali', 'Sri Murali', 'Actor'),
        person('prem', 'Prem', 'Actor'),
        person('rakshith-gowda', 'Rakshith Gowda', 'Actor'),
        person('sharan', 'Sharan', 'Actor'),
        person('rj-mayuraa-raghavendra', 'RJ Mayuraa Raghavendra', 'Radio Jockey'),
      ],
    },
    {
      kind: 'checklist',
      heading: 'Every Patient Receives the Same Personalized Approach',
      lede: 'Whether you’re a professional, an entrepreneur, a student, or someone simply wanting to restore confidence, the treatment process remains consistent:',
      points: ['Consultation', 'Diagnosis', 'Planning', 'Procedure', 'Recovery', 'Follow-up'],
    },
    {
      kind: 'checklist',
      heading: 'Why Privacy Matters',
      lede: 'Every consultation emphasizes:',
      points: [
        'Individual treatment planning',
        'Medical confidentiality',
        'Comfortable patient experience',
        'Personalized follow-up',
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Are celebrity treatments different?',
        answer: 'No. Every patient receives personalized planning based on their scalp and goals.',
      },
      {
        question: 'Can recovery remain discreet?',
        answer: 'Treatment planning considers lifestyle and recovery preferences where suitable.',
      },
      {
        question: 'Will the results look natural on camera?',
        answer: 'Natural hairline design remains one of the primary treatment goals.',
      },
    ],
  },

  cta: {
    heading: 'Experience Hair Restoration Built Around You',
    ctas: [BOOK_PRIVATE, CALL],
  },
}

export default data
