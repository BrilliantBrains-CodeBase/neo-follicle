/**
 * PAGE 9 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 921-1022).
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const img = (n: string, alt: string) => ({
  src: `/treatments/unshaven-hair-transplant/${n}.webp`,
  alt,
  width: 650,
  height: 450,
})

const data: TreatmentPageData = {
  slug: 'unshaven-hair-transplant',

  hero: {
    eyebrow: 'Discreet Restoration',
    h1: 'Unshaven Hair Transplant in Bangalore',
    lede: [
      'Not everyone wants visible signs of undergoing a hair transplant.',
      'An unshaven hair transplant is designed for suitable patients who want to maintain their existing hairstyle while undergoing personalized hair restoration planning.',
      // The brief's third hero paragraph is the next section's `intro`. The
      // hero lede is capped at two -- see the note on `lede` in ./types.
    ],
    image: {
      src: '/treatments/unshaven-hair-transplant/hero.webp',
      alt: 'A man with a full, styled hairstyle looking down, beside inset close-ups of a hairline and a scalp being examined.',
      width: 1200,
      height: 1200,
    },
    badges: ['Keep Your Existing Hairstyle', 'Suitability Decided Clinically'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'Who May Be Suitable?',
      lede: 'This option may be considered for patients who:',
      intro:
        'Every consultation evaluates whether this approach is appropriate for your hair length, donor area, and graft requirements.',
      points: [
        'want minimal visible change,',
        'have sufficient donor hair,',
        'maintain longer hairstyles,',
        'require personalized planning.',
      ],
      image: img('result-1', 'Before and after an unshaven hair transplant at Neo Follicle.'),
      closing: 'Suitability depends on clinical evaluation rather than preference alone.',
    },
    {
      kind: 'checklist',
      heading: 'Why Treatment Planning Matters',
      lede: 'Instead of recommending one technique for everyone, Neo Follicle evaluates:',
      points: ['Hair length', 'Donor accessibility', 'Graft requirement', 'Hair density', 'Long-term planning'],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        { title: 'Reduced visible lifestyle disruption' },
        { title: 'Personalized planning' },
        { title: 'Natural-looking results' },
        { title: 'Same doctor-led approach' },
        { title: 'Long-term restoration planning' },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Process',
      steps: [
        { title: 'Consultation' },
        { title: 'Donor evaluation' },
        { title: 'Hairline planning' },
        { title: 'Follicle extraction' },
        { title: 'Implantation' },
        { title: 'Recovery guidance' },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      images: [
        img('result-2', 'Before and after unshaven hairline restoration at Neo Follicle.'),
        img('result-3', 'Before and after an unshaven procedure with minimal visible change.'),
        img('result-4', 'An unshaven hair transplant fifteen days after the procedure.'),
      ],
    },
    {
      kind: 'timeline',
      heading: 'Recovery Timeline',
      columns: ['Timeline', 'Recovery'],
      rows: [
        { when: 'First Week', what: 'Healing begins' },
        { when: 'Weeks 2–4', what: 'Temporary shedding' },
        { when: 'Months 3–4', what: 'New growth' },
        { when: 'Months 9–12', what: 'Full results' },
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Does everyone qualify?',
        answer: 'No. Suitability depends on donor access and treatment planning.',
      },
      {
        question: 'Will recovery be less noticeable?',
        answer: 'The approach is designed to minimize visible changes where appropriate.',
      },
      {
        question: 'Will results differ from a regular transplant?',
        answer: 'The focus remains on natural-looking hair restoration.',
      },
    ],
  },

  cta: {
    heading: 'Explore Whether an Unshaven Hair Transplant Is Right for You',
    ctas: [BOOK, CALL],
  },
}

export default data
