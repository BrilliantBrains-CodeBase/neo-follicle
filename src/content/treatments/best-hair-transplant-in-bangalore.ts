/**
 * PAGE 1 of content/treatments/Neo Follicle Website Content-3.md (lines 1-197),
 * the main direct hair transplant page.
 *
 * The h1 drops the brief's "Page 1 - " prefix, a numbering artefact.
 *
 * SECTION 8 of the brief ends with "This section strengthens GEO by directly
 * answering a common AI-search question." That is a note to the builder, not
 * copy, and is not rendered -- the same call DoctorApproach makes about its
 * own trailing note.
 *
 * The brief's SECTION 6 and 7 embed five images. Four of them are third-party:
 * two are captioned "Hairfree & Hairgrow Clinic" (a competitor) and one comes
 * from an unrelated blog. None is used. The gallery below is Neo Follicle's own
 * before/after capture -- see scripts/treatment-assets.mjs.
 */
import { ANALYSIS, BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const img = (n: string, alt: string) => ({
  src: `/treatments/best-hair-transplant-in-bangalore/${n}.webp`,
  alt,
  width: 650,
  height: 450,
})

const data: TreatmentPageData = {
  slug: 'best-hair-transplant-in-bangalore',

  hero: {
    eyebrow: 'Advanced Restoration',
    h1: 'Direct Hair Transplant in Bangalore for Natural-Looking Hair Restoration',
    lede: [
      'Permanent hair restoration isn’t about creating more hair - it’s about restoring your own hair in the right place, at the right angle, and with a plan that looks natural today and years from now.',
      'At Neo Follicle Hair Transplant Clinic, every direct hair transplant is personally planned by Dr. Sandeep Mahapatra, combining dermatology-led diagnosis, advanced NFT implanters, and long-term donor preservation to create natural-looking results for men and women experiencing hair loss.',
      // The brief's third hero paragraph is the next section's `intro`. The
      // hero lede is capped at two -- see the note on `lede` in ./types.
    ],
    image: {
      src: '/treatments/best-hair-transplant-in-bangalore/hero.webp',
      alt: 'A surgeon in magnifying loupes implanting grafts along a reclining patient’s hairline in a clinic procedure room.',
      width: 1200,
      height: 1200,
    },
    badges: ['Same-Day Procedure', 'Doctor-Led Planning', 'Natural Hairline Design', 'DHI-Certified Surgeon'],
    ctas: [BOOK, ANALYSIS, CALL],
  },

  sections: [
    {
      kind: 'featureGrid',
      heading: 'Why Patients Choose Neo Follicle',
      lede: 'Instead of comparing clinics by price alone, patients choose Neo Follicle because every treatment follows a diagnosis-first approach.',
      intro:
        'Whether you’re noticing a receding hairline, thinning crown, or advanced male pattern baldness, your treatment begins with understanding your scalp - not selling you a procedure.',
      items: [
        { title: '20+ Years Experience', body: 'Dermatology-backed expertise in hair restoration.' },
        { title: '10,000+ Hair Transplants', body: 'Extensive experience across different hair loss patterns.' },
        { title: 'Natural Hairline Design', body: 'Every graft is planned for realistic density and direction.' },
        { title: 'Personalized Treatment Plans', body: 'Based on scalp condition and donor strength.' },
        { title: 'Medical + Surgical Expertise', body: 'PRP, GFC, QR678 and transplant planning under one roof.' },
        { title: 'Long-Term Hair Planning', body: 'Focus on preserving future donor availability.' },
        {
          title: 'DHI-Certified Technique',
          body: 'Direct Hair Implantation available alongside FUE and NFT, performed by a DHI Global (Greece)-certified surgeon.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'What Is a Direct Hair Transplant?',
      lede: [
        'A direct hair transplant is a procedure that moves healthy hair follicles from the donor area - usually the back of the scalp - to areas affected by thinning or baldness.',
        'At Neo Follicle, treatment planning considers:',
      ],
      points: [
        'Hair loss pattern',
        'Donor area strength',
        'Hair thickness',
        'Future hair loss risk',
        'Desired density',
        'Face shape',
      ],
      closing: [
        'Rather than chasing the highest graft count, the focus is on creating a balanced hairline that continues to look natural over time.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Techniques We Offer: FUE, DHI and NFT',
      lede: [
        'Direct Hair Implantation (DHI) is an implanter-assisted technique where extracted grafts are placed directly into the recipient area, giving control over angle, depth, direction and density.',
        'At Neo Follicle it’s offered alongside FUE and the clinic’s NFT implanter method - Dr. Sandeep, a DHI Global (Greece)-certified specialist, recommends the technique based on your case, not a fixed package.',
      ],
    },
    {
      kind: 'checklist',
      heading: 'Who Is a Good Candidate?',
      lede: 'You may be a suitable candidate if you’re experiencing:',
      points: [
        'Receding hairline',
        'Frontal baldness',
        'Crown thinning',
        'Male pattern baldness',
        'Stable hair loss',
        'Good donor hair availability',
      ],
      closing:
        'Some patients may benefit from medical treatments before considering surgery, which is why consultation always comes first.',
    },
    {
      kind: 'process',
      heading: 'The Neo Follicle Hair Transplant Process',
      steps: [
        {
          title: 'Consultation',
          body: 'Your journey begins with understanding:',
          points: ['Hair loss history', 'Scalp health', 'Donor availability', 'Long-term expectations'],
        },
        {
          title: 'Hairline Planning',
          body: 'Hairline design considers:',
          points: ['Face proportions', 'Age', 'Existing hair pattern', 'Future hair loss'],
        },
        {
          title: 'Graft Extraction',
          body: 'Healthy follicles are carefully extracted from the donor area while preserving surrounding hair.',
        },
        {
          title: 'Implantation',
          body: 'Using DHI or NFT implanters, depending on the plan, each follicle is placed according to its natural angle, direction, and depth.',
        },
        {
          title: 'Recovery',
          body: 'Most patients return home the same day with detailed aftercare instructions.',
        },
      ],
    },
    {
      kind: 'results',
      heading: 'Before & After Results',
      lede: 'Real results depend on:',
      images: [
        img('result-1', 'Before and after a direct hair transplant at Neo Follicle.'),
        img('result-2', 'Before and after hairline restoration at Neo Follicle.'),
        img('result-3', 'Before and after crown density restoration at Neo Follicle.'),
      ],
      points: ['Donor quality', 'Hair thickness', 'Baldness stage', 'Scalp health', 'Recovery'],
      closing: 'No unrealistic promises.',
    },
    {
      kind: 'timeline',
      heading: 'Recovery Timeline',
      columns: ['Timeline', 'What Happens'],
      rows: [
        { when: 'First Week', what: 'Healing begins' },
        { when: 'Weeks 2–4', what: 'Temporary shedding' },
        { when: 'Months 3–4', what: 'New growth appears' },
        { when: 'Months 6–8', what: 'Density improves' },
        { when: 'Months 9–12', what: 'Full results develop' },
      ],
    },
    {
      kind: 'prose',
      heading: 'Why Long-Term Planning Matters',
      lede: [
        'Many people think a hair transplant solves hair loss forever.',
        'The reality is that transplanted follicles are planned alongside your future hair loss pattern.',
        'This is why donor preservation plays such an important role in treatment planning.',
      ],
    },
  ],

  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'Is a direct hair transplant permanent?',
        answer: 'Healthy donor follicles are chosen because of their long-term resistance.',
      },
      {
        question: 'How long does recovery take?',
        answer: 'Most patients resume normal routines within a few days.',
      },
      { question: 'Will it look natural?', answer: 'Hairline design focuses on natural angles and density.' },
      {
        question: 'Does every patient need surgery?',
        answer: 'No. Some patients may benefit from PRP, GFC, QR678, or other treatments first.',
      },
      {
        question: 'How is the number of grafts decided?',
        answer: 'It depends on donor strength, baldness grade, and treatment goals.',
      },
    ],
  },

  cta: {
    heading: 'Restore Your Hair with Expert Planning',
    body: 'Every hair transplant at Neo Follicle begins with a detailed consultation - not a standard package.',
    ctas: [BOOK, ANALYSIS, CALL],
  },
}

export default data
