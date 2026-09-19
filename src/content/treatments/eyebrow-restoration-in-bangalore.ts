/**
 * PAGE 7 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 683-809). The brief's URL (`/eyebrow-restoration`) is ignored -- the live
 * route keeps its `-in-bangalore` suffix.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const img = (n: string, alt: string) => ({
  src: `/treatments/eyebrow-restoration-in-bangalore/${n}.webp`,
  alt,
  width: 650,
  height: 450,
})

const data: TreatmentPageData = {
  slug: 'eyebrow-restoration-in-bangalore',

  hero: {
    eyebrow: 'Precision Restoration',
    h1: 'Eyebrow Restoration in Bangalore for Naturally Fuller Brows',
    lede: [
      'Your eyebrows play an important role in facial balance and expression. Whether you’ve experienced thinning due to over-plucking, genetics, scars, or hair loss, eyebrow restoration at Neo Follicle is designed to recreate natural-looking brows with careful attention to direction, angle, and density.',
      'Every treatment is planned by Dr. Sandeep Mahapatra, ensuring that the restored eyebrows complement your facial features rather than appearing artificially dense.',
    ],
    image: img('hero', 'A woman having her eyebrow shape assessed before restoration.'),
    badges: ['Individually Placed Follicles', 'Designed for Facial Symmetry'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'Who Is This Treatment For?',
      lede: 'Eyebrow restoration may be suitable for individuals experiencing:',
      points: [
        'Thin eyebrows',
        'Over-plucked brows',
        'Scar-related eyebrow hair loss',
        'Naturally sparse brows',
        'Uneven eyebrow density',
      ],
      image: img('result-1', 'Before and after eyebrow restoration at Neo Follicle.'),
      closing:
        'During your consultation, the doctor evaluates existing hair growth, eyebrow shape, and your desired outcome before planning treatment.',
    },
    {
      kind: 'checklist',
      heading: 'Why Precision Matters',
      lede: 'Unlike scalp hair restoration, eyebrow transplantation requires extremely precise placement. Every follicle is positioned according to:',
      points: [
        'Natural eyebrow direction',
        'Hair angle',
        'Facial symmetry',
        'Existing eyebrow pattern',
        'Desired fullness',
      ],
      closing: 'This attention to detail helps create soft, natural-looking results.',
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        { title: 'Natural-looking eyebrow shape' },
        { title: 'Personalized design' },
        { title: 'Permanent use of your own hair follicles' },
        { title: 'Improved facial balance' },
        { title: 'Long-term restoration' },
        { title: 'Minimal downtime' },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Process',
      steps: [
        { title: 'Consultation', body: 'Your eyebrow shape and facial proportions are evaluated.' },
        { title: 'Design Planning', body: 'The desired eyebrow outline is planned before treatment begins.' },
        { title: 'Follicle Selection', body: 'Healthy donor follicles are selected from the scalp.' },
        {
          title: 'Implantation',
          body: 'Each follicle is placed individually according to natural eyebrow growth direction.',
        },
        { title: 'Recovery', body: 'Detailed aftercare guidance helps support healing.' },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      images: [
        img('result-2', 'Before and after restoring over-plucked eyebrows at Neo Follicle.'),
        img('result-3', 'Before and after eyebrow density restoration at Neo Follicle.'),
        img('result-4', 'Before and after eyebrow shaping and restoration at Neo Follicle.'),
      ],
    },
    {
      kind: 'timeline',
      heading: 'Recovery Timeline',
      columns: ['Timeline', 'Recovery'],
      rows: [
        { when: 'First Week', what: 'Healing begins' },
        { when: 'Weeks 2–4', what: 'Temporary shedding' },
        { when: 'Months 3–4', what: 'New eyebrow growth' },
        { when: 'Months 9–12', what: 'Final appearance develops' },
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Will the eyebrows look natural?',
        answer: 'Yes. Hair placement follows the natural direction and angle of eyebrow growth.',
      },
      { question: 'Can scars be treated?', answer: 'Suitability depends on individual evaluation.' },
      {
        question: 'Will transplanted eyebrow hair continue growing?',
        answer:
          'Yes. Because the follicles come from your own scalp, ongoing maintenance such as trimming may be required.',
      },
      { question: 'Is the procedure painful?', answer: 'The treatment is performed under local anesthesia.' },
    ],
  },

  cta: {
    heading: 'Restore Naturally Fuller Eyebrows with Personalized Planning',
    body: 'Every eyebrow restoration begins with understanding your facial proportions—not following a standard template.',
    ctas: [BOOK, CALL],
  },
}

export default data
