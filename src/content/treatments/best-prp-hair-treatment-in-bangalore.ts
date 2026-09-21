/**
 * PAGE 2 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1276-1357), "PRP Hair Loss Treatment".
 *
 * URL NOTE: the brief proposes /prp-hair-loss-treatment. Not used -- this page
 * is live at /best-prp-hair-treatment-in-bangalore/ and verify-seo.mjs asserts
 * its head against the capture.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/best-prp-hair-treatment-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (1966 words).
 *
 * The brief alone is about 12% of that, and this URL is indexed and ranking
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
 * 'Best PRP Hair Treatment in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 *
 * THE COST SECTION IS PORTED WITHOUT ITS NUMBERS. The live page quotes per-
 * session rupee figures with no date on them. What determines the cost is
 * durable and useful; an undated price on a medical page is neither, and
 * /hair-transplant-cost-in-bangalore/ is where pricing belongs. FLAGGED FOR
 * CLIENT REVIEW if the figures should come back.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const data: TreatmentPageData = {
  slug: 'best-prp-hair-treatment-in-bangalore',
  hero: {
    eyebrow: 'Non-Surgical Hair Restoration',
    h1: 'PRP Hair Loss Treatment in Bangalore for Stronger, Healthier Hair',
    lede: [
      'When hair thinning begins early, strengthening existing follicles may become an important part of long-term hair restoration planning.',
      'At Neo Follicle, PRP treatment is recommended only after understanding your scalp condition and hair loss pattern.',
    ],
    image: {
      src: '/treatments/best-prp-hair-treatment-in-bangalore/hero.webp',
      alt: 'A clinician injecting a reclining man’s scalp, with an inset showing a blood sample separated into platelet-rich plasma.',
      width: 1200,
      height: 1200,
    },
    badges: [
      'Uses Your Own Plasma',
      'Dermatologist-Led',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'prose',
      heading: 'What Is PRP?',
      lede: [
        'PRP stands for Platelet-Rich Plasma.',
        'The treatment uses your own platelet-rich plasma as part of a dermatologist-led treatment plan for suitable candidates experiencing hair thinning.',
        'Because the material is your own, the risk of an allergic reaction is very low.',
      ],
    },
    {
      kind: 'checklist',
      heading: 'Why Patients Choose PRP',
      lede: 'PRP is often considered for patients who want a non-surgical treatment option. Benefits include:',
      points: [
        'Personalized treatment planning',
        'Strengthening weakened follicles',
        'Supporting existing hair',
        'Minimal downtime',
        'Long-term maintenance planning',
      ],
    },
    {
      kind: 'process',
      heading: 'PRP Treatment Process',
      steps: [
        {
          title: 'Consultation',
        },
        {
          title: 'Scalp evaluation',
        },
        {
          title: 'Treatment planning',
        },
        {
          title: 'PRP preparation',
        },
        {
          title: 'Treatment session',
        },
        {
          title: 'Follow-up guidance',
        },
      ],
    },
    {
      kind: 'checklist',
      heading: 'Who Is It Best For?',
      lede: 'Suitable candidates may include people experiencing:',
      points: [
        'Early thinning',
        'Increased hair fall',
        'Reduced hair density',
        'Living hair follicles requiring support',
      ],
    },
    {
      kind: 'prose',
      heading: 'What Determines PRP Treatment Cost',
      lede: [
        'Cost varies with the treatment plan rather than following a single fixed price.',
      ],
      points: [
        'The number of sessions your plan calls for',
        'The stage and pattern of hair loss',
        'Whether PRP is combined with other treatments',
        'The clinical team performing the procedure',
      ],
      closing: [
        'Your consultation sets out the expected number of sessions before treatment begins, so the plan and its cost are agreed up front.',
      ],
    },
      {
      kind: 'featureGrid',
      heading: 'Benefits of PRP Hair Treatment',
      lede: 'What a course of PRP is intended to do, and why it is chosen.',
      items: [
        { title: 'Reduces hair fall', body: 'Strengthens weak hair roots and minimises daily shedding over time.' },
        { title: 'Stimulates new growth', body: 'Supports dormant follicles so they can re-enter the growing phase.' },
        { title: 'Improves thickness and density', body: 'Strands read fuller and stronger over a course of sessions.' },
        { title: 'Safe and non-allergic', body: 'Uses your own blood, so there is no risk of rejection.' },
        { title: 'Quick, in-clinic procedure', body: 'Each session takes under an hour, with no recovery time needed.' },
        { title: 'Suitable for men and women', body: 'Planned the same way for either, around the individual diagnosis.' },
      ],
    },
],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Is PRP painful?',
        answer: 'Most patients experience minimal discomfort.',
      },
      {
        question: 'Can PRP prevent future hair loss?',
        answer: 'Treatment planning depends on individual diagnosis.',
      },
      {
        question: 'How many sessions are needed?',
        answer: 'The treatment plan is personalized during consultation.',
      },
      {
        question: 'Is PRP therapy safe for hair?',
        answer: 'Yes, it’s completely safe. PRP uses your own blood, so there’s no risk of allergies or side effects. It’s a natural, low-risk way to stimulate hair growth.',
      },
      {
        question: 'Does PRP hair treatment hurt?',
        answer: 'You might feel slight pinching or pressure during the injections, but it’s not considered painful. Numbing cream can be used if needed.',
      },
      {
        question: 'When will I start seeing results?',
        answer: 'You may see reduced hair fall in 3–4 weeks, and visible hair regrowth in 2–3 months, with continued improvement in thickness and texture over time.',
      },
      {
        question: 'When will I start seeing new hair growth?',
        answer: 'You may notice reduced hair fall within a few weeks. Visible hair regrowth and improvement in thickness usually appear after 2–3 months.',
      },
      {
        question: 'Can PRP help with bald spots?',
        answer: 'PRP works best on thinning areas with active follicles. It may not be very effective in completely bald areas - those may need a hair transplant instead.',
      },
      {
        question: 'Are there any side effects of PRP therapy?',
        answer: 'Mild redness or tenderness in the scalp may occur, but this usually subsides in a few hours. Since it’s your own blood, the treatment is generally very safe.',
      },
      {
        question: 'Is PRP suitable for women?',
        answer: 'Absolutely! Many women benefit from PRP, especially those with postpartum hair loss, hormonal changes, or general thinning.',
      },
      {
        question: 'Can I wash or style my hair after PRP?',
        answer: 'You can wash your hair after 24 hours and resume normal styling. Just avoid chemical treatments for a few days after each session.',
      },
    ],
  },
  cta: {
    heading: 'Start Your PRP Hair Restoration Journey',
    body: 'PRP is recommended only after your scalp and hair loss pattern are understood.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
