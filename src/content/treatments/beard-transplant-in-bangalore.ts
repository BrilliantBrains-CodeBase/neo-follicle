/**
 * PAGE 6/7 of content/treatments/Neo Follicle Website Content-3.md (lines
 * 605-681). The brief heads the same page twice, "PAGE 6 - Beard Transplant"
 * and then "Page 7 - Beard Transplant in Bangalore..."; it is one page's copy
 * duplicated, merged here.
 *
 * The h1 drops the brief's "Page 7 - " prefix, which is a numbering artefact of
 * the document, not copy.
 *
 * The brief's URL (`/beard-transplant`) is ignored. The live route is
 * /beard-transplant-in-bangalore/ and changing it would force a redirect --
 * see the note in src/seo/pages.ts. The brief is copy; pages.ts is routing.
 *
 * SECTION 6 of the brief is the FAQ and SECTION 7 the closing CTA, so the
 * numbered sections below stop at 5. The before/after gallery is not in the
 * brief but the old page carried one and the capture holds five real Neo
 * Follicle beard results, so it is restored here with no invented claims.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const img = (n: string, alt: string) => ({
  src: `/treatments/beard-transplant-in-bangalore/${n}.webp`,
  alt,
  width: 650,
  height: 450,
})

const data: TreatmentPageData = {
  slug: 'beard-transplant-in-bangalore',

  hero: {
    eyebrow: 'Facial Hair Restoration',
    h1: 'Beard Transplant in Bangalore for Natural Facial Hair Restoration',
    lede: [
      'Whether you’re dealing with patchy growth, uneven density, or beard gaps, Neo Follicle offers personalized beard restoration designed around natural facial hair direction and density.',
    ],
    image: {
      src: '/treatments/beard-transplant-in-bangalore/hero.webp',
      alt: 'A man reclining in a treatment chair while a clinician marks a beard line along his jaw.',
      width: 1200,
      height: 1200,
    },
    badges: ['Doctor-Led Planning', 'Natural Beard Design'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'checklist',
      heading: 'Who Is It For?',
      lede: 'Suitable for:',
      points: ['Patchy beard', 'Thin moustache', 'Uneven facial hair', 'Scar-related facial hair loss'],
      image: img('result-1', 'Before and after a beard transplant at Neo Follicle.'),
    },
    {
      kind: 'checklist',
      heading: 'Treatment Planning',
      lede: 'Planning considers:',
      points: [
        'Beard growth direction',
        'Hair texture',
        'Facial proportions',
        'Desired density',
        'Donor availability',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        { title: 'Natural beard appearance' },
        { title: 'Personalized density' },
        { title: 'Permanent use of your own follicles' },
        { title: 'Balanced facial aesthetics' },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Process',
      steps: [
        { title: 'Consultation' },
        { title: 'Beard design' },
        { title: 'Donor extraction' },
        { title: 'Implantation' },
        { title: 'Recovery' },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      images: [
        img('result-2', 'Before and after patchy beard correction at Neo Follicle.'),
        img('result-3', 'Before and after moustache and goatee restoration at Neo Follicle.'),
        img('result-4', 'Before and after beard density restoration at Neo Follicle.'),
        img('result-5', 'Before and after facial hair restoration at Neo Follicle.'),
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Will the beard grow naturally?',
        answer: 'The transplanted follicles continue growing like your existing hair.',
      },
      { question: 'Can scars be treated?', answer: 'Suitability depends on your consultation.' },
      {
        question: 'How long before I see results?',
        answer: 'Growth develops gradually over several months.',
      },
    ],
  },

  cta: {
    heading: 'Build a Fuller, Natural-Looking Beard',
    ctas: [BOOK, CALL],
  },
}

export default data
