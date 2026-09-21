/**
 * PAGE 2 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 199-278).
 *
 * The brief's URL (`/hair-transplant-cost-bangalore`) is ignored -- the live
 * route is /hair-transplant-cost-in-bangalore/.
 *
 * The brief's SECTION 2 lists six cost factors as bare labels with no
 * supporting copy, so the cards carry titles only. Nothing here quotes a price:
 * the brief deliberately refuses to, and the old page's per-graft range lives
 * in the SEO description, not the body.
 */
import { BOOK, CALL, COST, ANALYSIS } from './ctas'
import type { TreatmentPageData } from './types'

const data: TreatmentPageData = {
  slug: 'hair-transplant-cost-in-bangalore',

  hero: {
    eyebrow: 'Transparent Consultation • Personalized Planning',
    h1: 'Hair Transplant Cost in Bangalore: What Actually Determines the Price?',
    lede: [
      'Instead of asking “What’s the cheapest hair transplant?”, the better question is “What’s the right treatment for my hair loss pattern?”',
      'At Neo Follicle, pricing is discussed after evaluating your scalp, donor strength, graft requirement, and long-term restoration goals.',
    ],
    image: {
      src: '/treatments/hair-transplant-cost-in-bangalore/hero.webp',
      alt: 'A hand holding Indian rupee notes in front of a blurred procedure room, with an invoice on the desk.',
      width: 1200,
      height: 792,
    },
    ctas: [COST, CALL],
  },

  sections: [
    {
      kind: 'featureGrid',
      heading: 'Cost Isn’t One Number',
      lede: 'Hair transplant cost depends on multiple clinical factors rather than a fixed package.',
      items: [
        { title: 'Number of Grafts' },
        { title: 'Baldness Grade' },
        { title: 'Donor Quality' },
        { title: 'Procedure Type' },
        { title: 'Doctor Expertise' },
        { title: 'Clinic Standards' },
      ],
    },
    {
      kind: 'checklist',
      heading: 'How We Estimate Cost',
      lede: 'Your consultation includes:',
      points: ['Scalp examination', 'Donor assessment', 'Hair density evaluation', 'Long-term planning'],
      image: {
        src: '/treatments/hair-transplant-cost-in-bangalore/result-1.webp',
        alt: 'Before and after a hair transplant at Neo Follicle.',
        width: 650,
        height: 450,
      },
      closing: 'Only then is the treatment plan discussed.',
    },
    {
      kind: 'checklist',
      heading: 'Why Comparing Prices Alone Can Be Misleading',
      lede: 'Choosing a clinic based only on price may overlook:',
      points: ['Hairline planning', 'Donor preservation', 'Natural density', 'Long-term strategy'],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      { question: 'Why isn’t there one fixed price?', answer: 'Every patient has different graft requirements.' },
      { question: 'How many grafts will I need?', answer: 'That depends on your scalp evaluation.' },
      {
        question: 'Does higher graft count always mean better results?',
        answer: 'Not necessarily. Proper placement matters more than numbers alone.',
      },
    ],
  },

  cta: {
    heading: 'Get a Personalized Hair Transplant Cost Estimate',
    ctas: [BOOK, ANALYSIS, CALL],
  },
}

export default data
