/**
 * PAGE 7 of the non-surgical block in content/treatments/Neo Follicle Website
 * Content-4.md (lines 1560-1597), "Scalp Hair Micro-pigmentation (SMP)".
 *
 * URL NOTE: the brief proposes /scalp-micropigmentation-bangalore. Not used --
 * the live route is /scalp-micropigmentation-in-bangalore/.
 *
 * SMP IS COSMETIC, NOT REGROWTH, and the brief's own FAQ says so. That
 * distinction is kept prominent rather than softened -- it is the single most
 * important thing a patient landing here needs to understand.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/scalp-micropigmentation-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (1943 words).
 *
 * The brief alone is about 4% of that, and this URL is indexed and ranking
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
 * 'Best Scalp Micropigmentation in Bangalore'; scripts/verify-seo.mjs does not assert h1.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * anything else is passed explicitly at the call site.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/scalp-micropigmentation-in-bangalore/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'scalp-micropigmentation-in-bangalore',
  hero: {
    eyebrow: 'Cosmetic Scalp Treatment',
    h1: 'Scalp Micropigmentation in Bangalore for the Appearance of Fuller Hair',
    lede: [
      'SMP creates the visual appearance of greater hair density through carefully placed pigments.',
      'It does not regrow hair. It is a cosmetic treatment, planned alongside medical or surgical options rather than in place of them.',
    ],
    image: {
      src: '/treatments/scalp-micropigmentation-in-bangalore/hero.webp',
      alt: 'A man with a closely shaved head while a technician applies scalp micropigmentation with a fine pen.',
      width: 1200,
      height: 1200,
    },
    badges: [
      'Non-Surgical',
      'Immediate Effect',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'checklist',
      heading: 'Who May Benefit?',
      lede: 'Suitable for people wanting:',
      points: [
        'A fuller appearance',
        'Improved scalp coverage',
        'Cosmetic enhancement alongside other treatments',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits',
      lede: 'SMP is cosmetic: it changes how the scalp looks, not how hair grows.',
      items: [
        { title: 'The look of a fuller head of hair', body: 'Suits thinning crowns, receding hairlines, or overall density.' },
        { title: 'Visible after the first session', body: 'Unlike regrowth treatments, the change is immediate.' },
        { title: 'An alternative where surgery does not suit', body: 'An option for people who are not candidates for a transplant.' },
        { title: 'Camouflages scarring', body: 'Can blend FUT scars, injury marks and patchy areas.' },
        { title: 'Works across skin and hair types', body: 'Pigments are mixed to match skin tone and hair colour.' },
        { title: 'Low maintenance', body: 'Once complete, it needs little upkeep compared with a treatment course.' },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      lede: 'Appearance varies with hair loss stage, existing density and skin tone.',
      images: [
        img('result-1', 'Before and after scalp micropigmentation at Neo Follicle.', 512, 512),
        img('result-2', 'Before and after scalp micropigmentation across the crown at Neo Follicle.', 512, 512),
        img('result-3', 'Before and after scalp micropigmentation along the hairline at Neo Follicle.', 512, 512),
        img('result-4', 'Before and after scalp micropigmentation showing denser coverage at Neo Follicle.', 512, 512),
      ],
    },
  ],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Is SMP a hair transplant?',
        answer: 'No. It creates the appearance of greater density.',
      },
      {
        question: 'Will it look like real hair?',
        answer: 'Yes! When done correctly, SMP gives the illusion of natural hair follicles, blending in with your existing hair or giving you the look of a closely shaved head.',
      },
      {
        question: 'How long does scalp micropigmentation last?',
        answer: 'SMP results typically last 4–6 years, depending on your skin type, sun exposure, and aftercare. Occasional touch-ups may be needed to maintain sharpness.',
      },
      {
        question: 'Is SMP painful?',
        answer: 'It feels like light tapping or scratching. Most people rate the discomfort as 2–3 out of 10, and numbing cream can be used if needed.',
      },
      {
        question: 'How many sessions do I need?',
        answer: 'Most clients need 2–3 sessions, spaced 7–14 days apart, to build up pigment layers and achieve the desired look.',
      },
      {
        question: 'Is there any downtime after the procedure?',
        answer: 'No major downtime! You may see slight redness for 1–2 days, but you can resume normal activities the same day.',
      },
      {
        question: 'Can SMP work for women too?',
        answer: 'Absolutely. SMP is ideal for women with visible scalp or thinning hair, as it reduces the contrast between hair and scalp, making hair look denser.',
      },
      {
        question: 'Does SMP cause any damage to the scalp or hair?',
        answer: 'Not at all. It’s a superficial skin treatment, and it won’t affect your natural hair growth or cause any hair loss.',
      },
      {
        question: 'Can I combine SMP with hair transplant or PRP?',
        answer: 'Yes! Many patients use SMP to enhance hair transplant results, cover scars, or create the illusion of fullness between PRP sessions.',
      },
    ],
  },
  cta: {
    heading: 'Explore Scalp Micropigmentation',
    body: 'A consultation confirms whether SMP suits your hair loss stage and goals.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
