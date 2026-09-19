/**
 * PAGE 1 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1159-1275), "Neo-Follicle Stem Cell Therapy".
 *
 * URL NOTE: the brief proposes /stem-cell-therapy-bangalore. Not used -- this
 * page is live at /stem-cell-therapy-for-hair-loss-in-bangalore/, is indexed
 * and in the sitemap, and scripts/verify-seo.mjs asserts its title,
 * description, canonical and JSON-LD byte-for-byte against the capture.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/stem-cell-therapy-for-hair-loss-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (1933 words).
 *
 * The brief alone is about 19% of that, and this URL is indexed and ranking
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
 * 'Stem Cell Therapy for Hair Loss in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * anything else is passed explicitly at the call site.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/stem-cell-therapy-for-hair-loss-in-bangalore/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'stem-cell-therapy-for-hair-loss-in-bangalore',
  hero: {
    eyebrow: 'Regenerative Hair Restoration',
    h1: 'Stem Cell Hair Therapy in Bangalore for Advanced Hair Regeneration',
    lede: [
      'Hair restoration isn\'t always about replacing lost hair—sometimes it\'s about helping weakened follicles perform better.',
      'At Neo Follicle Hair Transplant Clinic, Stem Cell Hair Therapy is offered as part of a personalized treatment approach for suitable candidates experiencing hair thinning. Every recommendation is based on scalp evaluation, follicle health, and long-term treatment planning under the guidance of Dr. Sandeep Mahapatra.',
    ],
    image: img('hero', 'A man with dense hair volume after regenerative hair treatment.'),
    badges: [
      'Non-Surgical',
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
      heading: 'Why Early Intervention Matters',
      lede: 'Hair follicles don\'t stop functioning overnight. Many follicles gradually weaken before becoming inactive, and early diagnosis may help determine whether regenerative treatments are appropriate before surgical intervention becomes necessary.',
      points: [
        'Hair density',
        'Scalp condition',
        'Follicle activity',
        'Hair loss pattern',
        'Medical history',
      ],
      image: img('section-1', 'Before and after a course of non-surgical hair loss treatment.'),
      closing: 'Every consultation evaluates these before any treatment is recommended.',
    },
    {
      kind: 'prose',
      heading: 'What Is Stem Cell Hair Therapy?',
      lede: [
        'Stem Cell Hair Therapy is a regenerative treatment considered for selected patients experiencing hair thinning.',
        'Instead of simply covering hair loss, treatment planning focuses on supporting existing follicles where appropriate.',
        'Because it uses your own biological material, it is well tolerated, and it is performed without cuts, surgery or stitches.',
      ],
      points: [
        'Follicle condition',
        'Hair loss stage',
        'Scalp health',
        'Individual suitability',
      ],
      closing: [
        'The treatment is discussed only after evaluating each of these.',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      items: [
        {
          title: 'Personalized treatment planning',
        },
        {
          title: 'Non-surgical approach',
        },
        {
          title: 'Supports weakened follicles',
        },
        {
          title: 'Dermatologist-led evaluation',
        },
        {
          title: 'Long-term hair restoration strategy',
        },
        {
          title: 'Minimal disruption to daily routine',
        },
      ],
    },
    {
      kind: 'process',
      heading: 'Treatment Journey',
      steps: [
        {
          title: 'Consultation',
          body: 'A detailed scalp assessment is performed.',
        },
        {
          title: 'Diagnosis',
          body: 'The underlying cause of thinning is evaluated.',
        },
        {
          title: 'Treatment Planning',
          body: 'Suitability for regenerative therapy is discussed.',
        },
        {
          title: 'Treatment Session',
          body: 'The procedure is performed according to your personalized treatment plan. Most patients need between three and six sessions, spaced three to four weeks apart.',
        },
        {
          title: 'Follow-up',
          body: 'Progress is monitored during scheduled reviews, with maintenance sessions planned where appropriate.',
        },
      ],
    },
    {
      kind: 'checklist',
      heading: 'Who Is It Suitable For?',
      lede: 'This treatment may be considered for patients experiencing:',
      points: [
        'Early thinning',
        'Reduced density',
        'Progressive hair fall',
        'Living but weakened follicles',
      ],
      closing: 'Patients with advanced baldness may require different treatment planning.',
    },
      {
      kind: 'prose',
      heading: 'What Determines Stem Cell Therapy Cost',
      lede: [
        'Cost varies with the plan rather than following a single published rate.',
      ],
      points: [
        'The number of sessions required',
        'The extent of the hair loss being treated',
        'The size of the treatment area',
        'How you respond over the course',
      ],
      closing: [
        'Your initial consultation sets out the expected number of sessions, so the plan and its cost are agreed before treatment begins.',
      ],
    },
],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Can Stem Cell Therapy replace a hair transplant?',
        answer: 'Not necessarily. Suitability depends on your consultation.',
      },
      {
        question: 'Is it surgical?',
        answer: 'No. It is considered a non-surgical regenerative treatment.',
      },
      {
        question: 'How is eligibility decided?',
        answer: 'Your scalp, follicles, and hair loss stage are evaluated first.',
      },
      {
        question: 'Is stem cell therapy safe for hair loss?',
        answer: 'Yes, absolutely. Since it uses your own biological material, the risk of side effects or allergic reaction is extremely low. It’s a well-tolerated and safe procedure.',
      },
      {
        question: 'How many sessions will I need?',
        answer: 'Most people need between 3 to 6 sessions, spaced 3–4 weeks apart. The exact number depends on your hair loss stage and how well you respond to the treatment.',
      },
      {
        question: 'How soon can I see results?',
        answer: 'You may notice reduced hair fall and better hair texture in 4–6 weeks. Visible new hair growth typically begins in 2–3 months.',
      },
      {
        question: 'Does the procedure hurt?',
        answer: 'You may feel mild discomfort or a pinching sensation during the injections, but it’s not considered painful. No cuts, no surgery, no stitches.',
      },
      {
        question: 'Will I need maintenance sessions?',
        answer: 'Yes, for best long-term results. Many patients opt for 1–2 maintenance sessions per year after their initial course.',
      },
      {
        question: 'Can women benefit from this therapy too?',
        answer: 'Absolutely! In fact, stem cell therapy is a popular, non-surgical option for women dealing with postpartum hair loss, hormonal thinning, or patterned hair fall.',
      },
    ],
  },
  cta: {
    heading: 'Explore Whether Stem Cell Hair Therapy Is Right for You',
    body: 'Every recommendation begins with a scalp evaluation, not a package.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
