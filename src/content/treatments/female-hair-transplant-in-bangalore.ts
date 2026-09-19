/**
 * PAGE 4 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 407-526). The brief's URL (`/hair-transplant-for-female`) is ignored -- the
 * live route is /female-hair-transplant-in-bangalore/.
 *
 * FLAGGED FOR CLIENT REVIEW: the before/after images. The old female page
 * rendered female-*-1.png, but the beard page rendered the same family without
 * the -1 suffix as filler tiles, so these are not verified as female patients.
 * See the note in scripts/treatment-assets.mjs.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const img = (n: string, alt: string) => ({
  src: `/treatments/female-hair-transplant-in-bangalore/${n}.webp`,
  alt,
  width: 650,
  height: 450,
})

const data: TreatmentPageData = {
  slug: 'female-hair-transplant-in-bangalore',

  hero: {
    eyebrow: 'Female Hair Restoration',
    h1: 'Female Hair Transplant in Bangalore for Natural Hairline & Density Restoration',
    lede: [
      'Hair loss in women can affect confidence just as much as appearance. Whether you’re noticing a widening part line, thinning crown, or a receding frontal hairline, Neo Follicle offers personalized female hair transplant planning designed specifically around female hair loss patterns.',
      'Every treatment is guided by Dr. Sandeep Mahapatra, combining dermatology expertise with natural hairline aesthetics.',
    ],
    image: {
      src: '/treatments/female-hair-transplant-in-bangalore/hero.webp',
      alt: 'A woman with a widening part line and thinning along the frontal hairline.',
      width: 1184,
      height: 864,
    },
    badges: ['Female-Focused Planning', 'Minimal Shaving Where Suitable'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'Common Hair Concerns Women Experience',
      lede: 'Women commonly visit Neo Follicle for concerns such as:',
      points: [
        'Widening part line',
        'Receding frontal hairline',
        'Sparse crown',
        'Hair loss after hormonal changes',
        'Thinning temples',
        'Scar-related hair loss',
      ],
      secondary: {
        heading: 'Every consultation identifies whether the cause is:',
        points: ['Hormonal', 'Genetic', 'Nutritional', 'Stress-related', 'Medical'],
      },
    },
    {
      kind: 'checklist',
      heading: 'Why Female Hair Transplant Is Different',
      lede: 'Unlike male hair restoration, female hair loss often requires preserving existing hair while restoring density. Treatment planning focuses on:',
      points: [
        'Hairline design',
        'Natural density',
        'Minimal shaving where suitable',
        'Existing hair preservation',
        'Long-term planning',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        { title: 'Natural-looking volume restoration' },
        { title: 'Permanent use of your own hair' },
        { title: 'Customized planning' },
        { title: 'Low-maintenance results' },
        { title: 'Minimal downtime' },
        { title: 'Personalized female-focused approach' },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Process',
      steps: [
        { title: 'Consultation', body: 'Your scalp, hair density, and hair loss pattern are evaluated.' },
        { title: 'Hairline Planning', body: 'Designed specifically for feminine facial proportions.' },
        { title: 'Follicle Extraction', body: 'Healthy donor follicles are selected.' },
        { title: 'Implantation', body: 'NFT implanters allow precise placement.' },
        { title: 'Recovery', body: 'Most women return to their routine within a few days.' },
      ],
    },
    {
      kind: 'results',
      // FLAGGED FOR CLIENT REVIEW -- see the provenance note at the top of this file.
      heading: 'Before & After Results',
      images: [
        img('result-1', 'Before and after female hair restoration at Neo Follicle.'),
        img('result-2', 'Before and after part-line density restoration at Neo Follicle.'),
        img('result-3', 'Before and after female hairline restoration at Neo Follicle.'),
      ],
    },
    {
      kind: 'timeline',
      heading: 'Recovery Timeline',
      columns: ['Timeline', 'Recovery'],
      rows: [
        { when: 'First Week', what: 'Healing begins' },
        { when: 'Month 1', what: 'Shedding phase' },
        { when: 'Months 3–4', what: 'New growth' },
        { when: 'Months 9–12', what: 'Full transformation' },
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Will I need to shave my head?',
        answer:
          'Not always. Treatment planning determines whether minimal shaving or unshaven options are suitable.',
      },
      { question: 'Is it painful?', answer: 'The procedure is performed under local anesthesia.' },
      {
        question: 'Can it improve a widening part line?',
        answer: 'Yes, depending on your scalp evaluation.',
      },
      {
        question: 'How long do results last?',
        answer: 'Transplanted follicles are intended to provide long-term growth.',
      },
    ],
  },

  cta: {
    heading: 'Restore Fuller Hair with Personalized Female Hair Restoration',
    ctas: [BOOK, CALL],
  },
}

export default data
