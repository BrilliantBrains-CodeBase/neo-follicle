/**
 * PAGE 5 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 528-603). The brief's URL (`/failed-hair-transplant-repair`) is ignored --
 * the live route keeps its `-in-bangalore` suffix.
 *
 * The brief's SECTION 4 gives the process as a bare numbered list with no
 * supporting copy, so the steps carry titles only.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const img = (n: string, alt: string) => ({
  src: `/treatments/failed-hair-transplant-repair-in-bangalore/${n}.webp`,
  alt,
  width: 650,
  height: 450,
})

const data: TreatmentPageData = {
  slug: 'failed-hair-transplant-repair-in-bangalore',

  hero: {
    eyebrow: 'Corrective Hair Restoration',
    h1: 'Failed Hair Transplant Repair in Bangalore',
    lede: [
      'If you’ve previously undergone a hair transplant that didn’t meet your expectations, the next step isn’t simply adding more grafts—it’s understanding what went wrong.',
      'Neo Follicle evaluates previous transplant work before recommending a personalized repair plan.',
    ],
    image: {
      src: '/treatments/failed-hair-transplant-repair-in-bangalore/hero.webp',
      alt: 'A surgeon in loupes working along a reclining patient’s freshly marked hairline.',
      width: 1200,
      height: 1200,
    },
    badges: ['Previous Work Assessed First', 'Donor Strength Protected'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'When Repair May Be Needed',
      lede: 'Common concerns include:',
      points: [
        'Poor density',
        'Unnatural hairline',
        'Visible gaps',
        'Previous scarring',
        'Donor overharvesting',
        'Unsatisfactory cosmetic outcome',
      ],
      image: img('result-1', 'A previous hair transplant showing poor density before corrective planning.'),
    },
    {
      kind: 'checklist',
      heading: 'How We Plan Repair',
      lede: 'Every repair begins with evaluating:',
      points: [
        'Previous graft placement',
        'Existing density',
        'Donor condition',
        'Scalp health',
        'Future restoration goals',
      ],
      image: img('result-2', 'An unnatural hairline from an earlier transplant, assessed before repair.'),
      closing:
        'Rather than repeating the same approach, the focus is on creating a balanced correction plan.',
    },
    {
      kind: 'process',
      heading: 'Treatment Process',
      steps: [
        { title: 'Consultation' },
        { title: 'Previous transplant assessment' },
        { title: 'Hairline correction planning' },
        { title: 'Density improvement' },
        { title: 'Recovery guidance' },
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Can every failed transplant be corrected?',
        answer: 'Suitability depends on donor availability and previous treatment history.',
      },
      {
        question: 'Will additional grafts always be required?',
        answer: 'Not necessarily. Treatment depends on your evaluation.',
      },
      {
        question: 'How is donor preservation managed?',
        answer: 'Donor strength is carefully assessed before recommending further procedures.',
      },
    ],
  },

  cta: {
    heading: 'Let’s Create a Better Long-Term Hair Restoration Plan',
    ctas: [BOOK, CALL],
  },
}

export default data
