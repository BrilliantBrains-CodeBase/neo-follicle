/**
 * PAGE 3 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1358-1418), "Growth Factor Concentrate (GFC)".
 *
 * URL NOTE: the brief proposes /gfc-hair-treatment. Not used -- the live route
 * is /gfc-hair-treatment-in-bangalore/.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/gfc-hair-treatment-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (2220 words).
 *
 * The brief alone is about 7% of that, and this URL is indexed and ranking
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
 * 'Best GFC Hair Treatment in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 *
 * THE COST SECTION IS PORTED WITHOUT ITS NUMBERS. The live page quotes per-
 * session rupee figures with no date on them. What determines the cost is
 * durable and useful; an undated price on a medical page is neither, and
 * /hair-transplant-cost-in-bangalore/ is where pricing belongs. FLAGGED FOR
 * CLIENT REVIEW if the figures should come back.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * anything else is passed explicitly at the call site.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/gfc-hair-treatment-in-bangalore/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'gfc-hair-treatment-in-bangalore',
  hero: {
    eyebrow: 'Regenerative Hair Restoration',
    h1: 'Growth Factor Concentrate (GFC) Hair Treatment in Bangalore',
    lede: [
      'Some hair follicles need support—not replacement.',
      'GFC is offered as part of Neo Follicle\'s personalized regenerative hair restoration approach for selected patients.',
    ],
    image: {
      src: '/treatments/gfc-hair-treatment-in-bangalore/hero.webp',
      alt: 'A clinician injecting a reclining man’s scalp, with insets of a blood sample tube and a hair follicle.',
      width: 1200,
      height: 1200,
    },
    badges: [
      'Concentrated Growth Factors',
      'Non-Surgical',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'prose',
      heading: 'What Is GFC?',
      lede: [
        'Growth Factor Concentrate is discussed as a regenerative treatment option for patients experiencing thinning hair.',
        'It is prepared from your own blood, with the growth factors concentrated before being used as part of a planned course of treatment.',
        'Every recommendation follows a detailed consultation.',
      ],
    },
    {
      kind: 'checklist',
      heading: 'Why GFC Is Different',
      lede: 'Instead of following one standard solution, treatment planning focuses on:',
      points: [
        'Hair density',
        'Follicle health',
        'Hair loss progression',
        'Long-term goals',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      lede: 'What a course of GFC is intended to do.',
      items: [
        { title: 'Reduces hair fall naturally', body: 'Strengthens existing hair roots so excessive shedding settles.' },
        { title: 'Boosts new hair growth', body: 'Activates weak or dormant follicles and encourages fresh regrowth.' },
        { title: 'Improves texture and thickness', body: 'Over a course, hair reads healthier and visibly denser.' },
        { title: 'Fewer sessions than PRP', body: 'GFC is a concentrated preparation, so a course is typically shorter.' },
        { title: 'Completely non-surgical', body: 'Prepared from your own blood, so there is no risk of an allergic reaction.' },
        { title: 'No downtime', body: 'You can return to your daily routine immediately after each session.' },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      lede: 'Results vary with hair loss stage, scalp health and how a patient responds to treatment.',
      images: [
        img('result-1', 'Before and after GFC hair therapy at Neo Follicle.'),
        img('result-2', 'Before and after GFC therapy showing improved density at Neo Follicle.'),
        img('result-3', 'Before and after GFC therapy across the crown at Neo Follicle.'),
        img('result-4', 'Before and after GFC therapy along the hairline at Neo Follicle.'),
      ],
    },
    {
      kind: 'prose',
      heading: 'What Determines GFC Treatment Cost',
      lede: [
        'Cost depends on the plan rather than a single published rate.',
      ],
      points: [
        'The number of sessions required',
        'The stage and extent of hair loss',
        'Whether GFC is combined with other treatments',
      ],
      closing: [
        'The number of sessions is agreed at consultation, so the plan is clear before treatment starts.',
      ],
    },
  ],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Is GFC better than PRP?',
        answer: 'The right treatment depends on your diagnosis.',
      },
      {
        question: 'Can GFC replace surgery?',
        answer: 'Not always. Treatment recommendations depend on your consultation.',
      },
      {
        question: 'Is GFC safe and does it have side effects?',
        answer: 'Yes, it’s completely safe since it uses your own blood. There are no allergic reactions, and side effects are minimal—maybe slight redness or tenderness at the injection site, which usually fades in a few hours.',
      },
      {
        question: 'How many GFC sessions will I need?',
        answer: 'Most patients need 3 to 4 sessions, spaced 3–4 weeks apart. Some opt for maintenance sessions every 6–12 months for long-term support.',
      },
      {
        question: 'When will I start seeing results?',
        answer: 'You may see reduced hair fall in 3–4 weeks, and visible hair regrowth in 2–3 months, with continued improvement in thickness and texture over time.',
      },
      {
        question: 'Can GFC work for both men and women?',
        answer: 'Absolutely! GFC works well for both men and women experiencing hair thinning, shedding, or weak hair roots. It’s a gentle yet powerful solution for all genders.',
      },
      {
        question: 'Will GFC help with bald spots?',
        answer: 'GFC works best on areas with active or weak follicles. It’s not ideal for completely bald patches where follicles are no longer active. In such cases, a hair transplant might be needed.',
      },
      {
        question: 'Is there any downtime after GFC therapy?',
        answer: 'None at all. You can return to work or daily activities immediately after the procedure. Just avoid washing your hair or using styling products for 24 hours.',
      },
      {
        question: 'Can I combine GFC with other treatments like PRP or transplant?',
        answer: 'Yes! Many patients combine GFC with PRP, mesotherapy, or use it post-transplant to support healing and enhance final results.',
      },
      {
        question: 'What are the growth factors associated with GFC therapy?',
        answer: 'GFC therapy works by using a high concentration of natural proteins called growth factors that are extracted from your own blood. These include PDGF (Platelet-Derived Growth Factor), VEGF (Vascular Endothelial Growth Factor), EGF (Epidermal Growth Factor), and IGF (Insulin-like Growth Factor). Together, they help improve blood circulation, stimulate hair follicle activity, reduce inflammation, and create a healthier scalp environment for stronger, thicker hair regrowth—all without using any chemicals or medications.',
      },
    ],
  },
  cta: {
    heading: 'Find Out Whether GFC Is Right for You',
    body: 'Every GFC recommendation follows a detailed consultation.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
