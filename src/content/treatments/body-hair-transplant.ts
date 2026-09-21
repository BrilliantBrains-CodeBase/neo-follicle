/**
 * PAGE 10 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 1024-1155).
 */
import { ANALYSIS, BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/** The three body-hair captures are 512x512, not the 650x450 of every other set. */
const img = (n: string, alt: string) => ({
  src: `/treatments/body-hair-transplant/${n}.webp`,
  alt,
  width: 512,
  height: 512,
})

const data: TreatmentPageData = {
  slug: 'body-hair-transplant',

  hero: {
    eyebrow: 'Advanced Donor Planning',
    h1: 'Body Hair Transplant in Bangalore for Advanced Hair Restoration Planning',
    lede: [
      'When scalp donor hair is limited, body hair may be considered as part of a carefully planned hair restoration strategy.',
      'At Neo Follicle, body hair transplantation is evaluated only after assessing whether it is appropriate for your individual case.',
      // The brief's third hero paragraph is the next section's `intro`. The
      // hero lede is capped at two -- see the note on `lede` in ./types.
    ],
    image: {
      src: '/treatments/body-hair-transplant/hero.webp',
      alt: 'A man with body hair, beside inset close-ups of a body donor area being assessed.',
      width: 1200,
      height: 1200,
    },
    badges: ['Evaluated Case by Case', 'Doctor-Led Donor Planning'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'When Body Hair May Be Considered',
      lede: 'Body hair transplantation may be explored when:',
      intro:
        'Every recommendation is based on medical evaluation—not a standard treatment package.',
      points: [
        'scalp donor availability is limited,',
        'previous procedures have reduced donor strength,',
        'additional restoration planning is required.',
      ],
      secondary: {
        heading: 'Suitability depends on:',
        points: ['Hair texture', 'Growth characteristics', 'Donor availability', 'Restoration goals'],
      },
    },
    {
      kind: 'checklist',
      heading: 'Why Not Every Patient Needs Body Hair',
      lede: 'Body hair differs from scalp hair. Treatment planning evaluates:',
      points: ['Hair thickness', 'Growth cycle', 'Texture', 'Color match', 'Long-term expectations'],
      closing:
        'This helps determine whether body hair is appropriate for your restoration plan.',
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        { title: 'Additional donor planning' },
        { title: 'Personalized evaluation' },
        { title: 'Long-term restoration strategy' },
        { title: 'Doctor-led treatment planning' },
        { title: 'Natural integration where suitable' },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Process',
      steps: [
        { title: 'Consultation', body: 'Scalp and body donor areas are evaluated.' },
        { title: 'Donor Planning', body: 'Suitable donor areas are identified.' },
        { title: 'Follicle Selection', body: 'Healthy follicles are selected carefully.' },
        { title: 'Implantation', body: 'Placement follows natural hair direction and density planning.' },
        { title: 'Recovery', body: 'Aftercare guidance supports healing.' },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      images: [
        img('result-1', 'Body hair assessed as a donor source at Neo Follicle.'),
        img('result-2', 'Body hair donor planning at Neo Follicle.'),
        img('result-3', 'Body hair transplantation result at Neo Follicle.'),
      ],
    },
    {
      kind: 'timeline',
      heading: 'Recovery Timeline',
      columns: ['Timeline', 'Recovery'],
      rows: [
        { when: 'Week 1', what: 'Initial healing' },
        { when: 'Weeks 2–4', what: 'Temporary shedding' },
        { when: 'Months 3–4', what: 'New growth' },
        { when: 'Months 9–12', what: 'Long-term results develop' },
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Can body hair replace scalp hair?',
        answer: 'Suitability depends on your consultation and treatment goals.',
      },
      {
        question: 'Does body hair grow differently?',
        answer: 'Yes. Hair characteristics vary, which is why careful planning is essential.',
      },
      {
        question: 'Is this suitable after previous transplants?',
        answer: 'Some patients with limited scalp donor hair may be evaluated for this approach.',
      },
      {
        question: 'How is donor selection decided?',
        answer:
          'The doctor evaluates texture, growth pattern, and restoration goals before planning treatment.',
      },
    ],
  },

  cta: {
    heading: 'Build a Long-Term Hair Restoration Plan Around Your Donor Strength',
    body: 'Whether scalp donor hair is sufficient or additional planning is needed, every consultation focuses on finding the most appropriate solution for your hair restoration journey.',
    ctas: [BOOK, ANALYSIS, CALL],
  },
}

export default data
