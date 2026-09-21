/**
 * PAGE 3 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 280-405), headed "SECTION 1 - Hero (Treatment Details Template)".
 *
 * This brief carries no URL. The old mega-menu pointed both "Direct Hair
 * Transplant in Bangalore" and "Direct Hair Transplant For Male" at
 * /best-hair-transplant-in-bangalore/, so this copy had no page of its own.
 * It now has /hair-transplant-for-men-in-bangalore/ -- a new route, added to
 * neofollicle-seo-backup/01-SEO-MASTER.csv with its own hand-written title,
 * description and JSON-LD graph, and src/config/nav.ts re-pointed to it.
 */
import { ANALYSIS, BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const img = (n: string, alt: string) => ({
  src: `/treatments/hair-transplant-for-men-in-bangalore/${n}.webp`,
  alt,
  width: 650,
  height: 450,
})

const data: TreatmentPageData = {
  slug: 'hair-transplant-for-men-in-bangalore',

  hero: {
    eyebrow: 'Male Hair Restoration',
    h1: 'Direct Hair Transplant for Men in Bangalore',
    lede: [
      'A receding hairline or thinning crown can gradually change the way you look - and how you feel. At Neo Follicle Hair Transplant Clinic, every male hair transplant is planned around your current hair loss pattern and future hair loss progression, ensuring natural-looking results rather than an artificially dense appearance.',
      'Led by Dr. Sandeep Mahapatra, each procedure focuses on preserving the donor area while restoring density where it matters most.',
    ],
    image: {
      src: '/treatments/hair-transplant-for-men-in-bangalore/hero.webp',
      alt: 'A surgeon in loupes placing grafts along a reclining man’s hairline, with a scalp image on the monitor behind.',
      width: 1200,
      height: 1200,
    },
    badges: ['Doctor-Led Planning', 'Donor Preservation'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'Understanding Male Pattern Hair Loss',
      lede: 'Male hair loss often develops gradually rather than overnight. The most common concerns include:',
      points: [
        'Receding hairline',
        'Frontal baldness',
        'Crown thinning',
        'Temple recession',
        'Advanced male pattern baldness',
      ],
      secondary: {
        heading: 'Before recommending treatment, your consultation evaluates:',
        points: [
          'Baldness grade',
          'Donor strength',
          'Hair thickness',
          'Future hair loss risk',
          'Long-term restoration goals',
        ],
      },
      closing: 'This personalized approach helps create a result that continues to look natural over time.',
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits of Male Hair Transplant',
      lede: 'Instead of promising unrealistic transformations, our focus is on achieving balanced, long-term results.',
      items: [
        { title: 'Natural-looking hairline restoration' },
        { title: 'Improved frontal density' },
        { title: 'Crown restoration where suitable' },
        { title: 'Permanent use of your own healthy hair follicles' },
        { title: 'Personalized planning based on facial proportions' },
        { title: 'Long-term donor preservation' },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Process',
      steps: [
        { title: 'Consultation', body: 'Your hair loss pattern is evaluated before discussing treatment.' },
        {
          title: 'Hairline Design',
          body: 'The hairline is designed according to:',
          points: ['Age', 'Face shape', 'Existing hair pattern', 'Future hair loss planning'],
        },
        { title: 'Follicle Extraction', body: 'Healthy follicles are carefully extracted from the donor area.' },
        {
          title: 'Implantation',
          body: 'DHI or NFT implanters help place each graft at the correct angle, direction, and depth.',
        },
        {
          title: 'Recovery',
          body: 'Patients receive detailed aftercare guidance before returning home the same day.',
        },
      ],
    },
    {
      kind: 'timeline',
      heading: 'Recovery Timeline',
      columns: ['Timeline', 'What to Expect'],
      rows: [
        { when: 'Week 1', what: 'Initial healing' },
        { when: 'Weeks 2–4', what: 'Temporary shedding' },
        { when: 'Month 3', what: 'New growth begins' },
        { when: 'Months 6–8', what: 'Visible density improves' },
        { when: 'Months 9–12', what: 'Final results develop' },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      images: [
        img('result-1', 'Before and after a hair transplant for a receding hairline.'),
        img('result-2', 'Before and after frontal density restoration in a male patient.'),
        img('result-3', 'Before and after crown restoration in a male patient.'),
      ],
    },
    {
      kind: 'checklist',
      heading: 'Who Is This Treatment Best For?',
      lede: 'This treatment may be suitable for men experiencing:',
      points: [
        'Receding hairline',
        'Frontal baldness',
        'Crown thinning',
        'Stable male pattern baldness',
        'Good donor hair availability',
      ],
      closing:
        'Some patients may benefit from PRP, GFC, or other medical treatments alongside long-term hair restoration planning.',
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Is a male hair transplant permanent?',
        answer: 'Healthy donor follicles are selected because of their long-term resistance.',
      },
      {
        question: 'When will I see results?',
        answer: 'New growth usually begins after a few months, with fuller results developing over time.',
      },
      {
        question: 'Will my hairline look natural?',
        answer:
          'Yes. Hairline planning is customized according to facial proportions rather than following a fixed template.',
      },
      {
        question: 'Does every man with hair loss need surgery?',
        answer:
          'No. Your consultation determines whether medical treatment or a transplant is more appropriate.',
      },
    ],
  },

  cta: {
    heading: 'Restore Your Hair with a Personalized Treatment Plan',
    body: 'Every consultation focuses on understanding your scalp - not selling you a procedure.',
    ctas: [BOOK, ANALYSIS, CALL],
  },
}

export default data
