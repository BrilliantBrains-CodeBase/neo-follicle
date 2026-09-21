/**
 * PAGE 8 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1598-1636), "Alopecia Treatment".
 *
 * URL NOTE: the brief proposes /alopecia-treatment-bangalore. Not used -- the
 * live route is /alopecia-areata-treatment-in-bangalore/.
 *
 * This is the page where diagnosis-before-treatment matters most, because
 * alopecia has several distinct forms. The brief's framing is kept and the
 * live page's diagnostic detail is carried in around it.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/alopecia-areata-treatment-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (1659 words).
 *
 * The brief alone is about 6% of that, and this URL is indexed and ranking
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
 * 'Best Alopecia Areata Treatment in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const data: TreatmentPageData = {
  slug: 'alopecia-areata-treatment-in-bangalore',
  hero: {
    eyebrow: 'Dermatologist-Led Diagnosis',
    h1: 'Alopecia Treatment in Bangalore with Dermatologist-Led Diagnosis',
    lede: [
      'Hair loss caused by alopecia requires understanding the underlying condition before recommending treatment.',
      'Different forms of alopecia behave differently, so the diagnosis comes first and the treatment plan follows from it.',
    ],
    image: {
      src: '/treatments/alopecia-areata-treatment-in-bangalore/hero.webp',
      alt: 'A clinician injecting the thinning crown of a seated man.',
      width: 1200,
      height: 1200,
    },
    badges: [
      'Diagnosis First',
      'Dermatologist-Led',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'checklist',
      heading: 'Why Diagnosis Matters',
      lede: 'Different forms of alopecia require different approaches. Consultation evaluates:',
      points: [
        'Hair loss pattern',
        'Scalp health',
        'Medical history',
        'Individual suitability',
      ],
    },
    {
      kind: 'prose',
      heading: 'Treatment Approach',
      lede: [
        'Rather than offering one universal solution, treatment planning is personalized.',
        'A transplant is not automatically the answer for alopecia. Where the underlying condition is still active, medical management is considered first, and surgical options are discussed only once the picture is stable.',
      ],
    },
      {
      kind: 'featureGrid',
      heading: 'Benefits of Early Alopecia Treatment',
      lede: 'The earlier alopecia is assessed, the more options remain open.',
      items: [
        { title: 'Reduces inflammation around follicles', body: 'Calms the immune response before it causes lasting follicle damage.' },
        { title: 'Restarts the natural growth cycle', body: 'Encourages dormant follicles to re-enter the growing phase.' },
        { title: 'Improves density and patch coverage', body: 'With time and the right care, visible patches can improve.' },
        { title: 'Helps reduce recurrence', body: 'Supportive therapy may lower the chance of future episodes in some cases.' },
        { title: 'Suitable across ages and genders', body: 'The plan is tailored whether the patient is a teenager, an adult or older.' },
      ],
    },
],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Can alopecia always be treated with a transplant?',
        answer: 'Not necessarily. The underlying diagnosis determines treatment planning.',
      },
      {
        question: 'What causes alopecia areata?',
        answer: 'Alopecia Areata is an autoimmune condition where your immune system mistakenly attacks hair follicles. This causes sudden patchy hair loss, though the exact trigger can vary from stress to genetic factors.',
      },
      {
        question: 'Is alopecia areata curable?',
        answer: 'There is no permanent cure, but it is highly treatable. Many patients experience full regrowth with the right combination of therapies and early intervention.',
      },
      {
        question: 'How long does it take to see hair regrowth?',
        answer: 'Visible regrowth often begins within 4–8 weeks of starting treatment. However, full restoration may take a few months depending on the size and number of patches.',
      },
      {
        question: 'Can alopecia areata return after treatment?',
        answer: 'Yes, it can recur. That’s why we focus on both treatment and long-term maintenance, including immune modulation and stress management.',
      },
      {
        question: 'Is the treatment painful?',
        answer: 'Most treatments like PRP or steroid injections cause minimal discomfort, and we use numbing creams when necessary to keep it comfortable.',
      },
      {
        question: 'Can children get treated for alopecia areata?',
        answer: 'Yes, our clinic provides safe and gentle treatment plans for children and teens, tailored to their age and hair health.',
      },
      {
        question: 'What’s the difference between alopecia areata and regular hair fall?',
        answer: 'Alopecia causes round, smooth bald patches, often suddenly, while regular hair fall is more gradual and diffused. Diagnosis through scalp analysis helps confirm the condition.',
      },
      {
        question: 'Can alopecia areata spread to the whole scalp?',
        answer: 'In rare cases, yes—this is called Alopecia Totalis. Early treatment reduces the risk of progression and improves regrowth chances significantly.',
      },
    ],
  },
  cta: {
    heading: 'Get Expert Guidance for Alopecia',
    body: 'Your consultation identifies the form of alopecia before any treatment is recommended.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
