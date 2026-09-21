/**
 * PAGE 1 of content/treatments/Neo Follicle Website Content-5.md (lines 1-167),
 * "Hair Transplant in Bangalore for International Patients".
 *
 * URL NOTE: the brief gives this page no URL. It is served at the live route
 * /hair-transplant-medical-tourism-in-bangalore/, which is indexed, in the
 * sitemap, linked from the mega-menu's "International Patients" column and from
 * the footer, and whose head verify-seo.mjs asserts against the capture.
 *
 * The other seven pages in Content-5 (gallery, testimonials, the FAQ page,
 * contact, privacy, terms, maintenance) are NOT built here -- they need new
 * components rather than a data module, and two of them would need new routes.
 *
 * IMAGE NOTE: the hero is the client's travel illustration (an airport
 * departures hall with Bangalore signage), from the set in content/Zoho
 * WorkDrive-3/. The two section photographs are still the clinic's own premises
 * from the old page's capture -- a consulting room and a procedure room -- so
 * the page keeps what a patient will actually sit in alongside the picture of
 * the journey. The old reception hero was replaced. The capture also holds
 * QMCH-branded lab and pharmacy photographs; those are a different organisation
 * and are deliberately not used.
 *
 * COST: the live page publishes a region-by-region price comparison table in US
 * dollars. It is not reproduced -- the figures carry no date, and an undated
 * price is the one thing on a medical page that ages badly. The cost ADVANTAGE
 * is kept, without numbers. FLAGGED FOR CLIENT REVIEW.
 *
 * BUILT FROM TWO SOURCES, which is the point of this module:
 *   1. the new brief in content/treatments/, which supplies the section order,
 *      the hero and the headings.
 *   2. neofollicle-seo-backup/pages/hair-transplant-medical-tourism-in-bangalore/
 *      -- the page LIVE ON THE SITE TODAY (2095 words).
 *
 * The brief alone is about 23% of that, and this URL is indexed and ranking
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
 * 'Hair Transplant Medical Tourism in Bangalore, India'; scripts/verify-seo.mjs does not assert h1.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * anything else is passed explicitly at the call site.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/hair-transplant-medical-tourism-in-bangalore/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'hair-transplant-medical-tourism-in-bangalore',
  hero: {
    eyebrow: 'International Patients',
    h1: 'Hair Transplant in Bangalore for International Patients',
    lede: [
      'Planning a hair transplant abroad should feel organized—not overwhelming.',
      'At Neo Follicle Hair Transplant Clinic, international patients receive personalized treatment planning, virtual consultations, travel guidance, and doctor-led care before, during, and after their visit to Bangalore.',
      // The brief's third hero paragraph is the next section's `intro`. The
      // hero lede is capped at two -- see the note on `lede` in ./types.
    ],
    image: {
      src: '/treatments/hair-transplant-medical-tourism-in-bangalore/hero.webp',
      alt: 'A traveller holding a passport and boarding pass in an airport departures hall, with Bangalore and a clinical procedure shown alongside.',
      width: 1200,
      height: 1200,
    },
    badges: [
      '500+ International Patients',
      'Doctor-Led Planning',
      'Virtual Consultations',
      'Same-Day Procedure',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'checklist',
      heading: 'Why Patients Travel to Bangalore',
      lede: 'Patients travel internationally because successful hair restoration depends on much more than the procedure itself. At Neo Follicle, every treatment combines:',
      intro:
        'Whether you\'re travelling from the USA, UK, Europe, Australia, or the Gulf, your journey begins long before your flight—with a personalized consultation from Dr. Sandeep Mahapatra.',
      points: [
        'Dermatology-led diagnosis',
        'Personalized hairline planning',
        'Advanced NFT implanters',
        'Long-term donor preservation',
        'Structured follow-up care',
      ],
      image: img('section-1', 'A consulting room at Neo Follicle Hair Transplant Clinic, Bangalore.', 1200, 816),
      closing: 'Rather than offering identical treatment packages, every recommendation is tailored to your hair loss pattern, donor strength, and long-term restoration goals.',
    },
    {
      kind: 'checklist',
      heading: 'Countries We Serve',
      lede: 'Patients have travelled to Neo Follicle from:',
      points: [
        'United States',
        'United Kingdom',
        'Europe',
        'Australia',
        'Gulf Countries',
        'Other international destinations',
      ],
    },
    {
      kind: 'process',
      heading: 'Your Journey Before You Travel',
      lede: 'Treatment planning begins online, before any flight is booked.',
      steps: [
        {
          title: 'Virtual Consultation',
          body: 'Your journey begins online. Before travelling, we\'ll discuss:',
          points: [
            'Hair loss history',
            'Previous treatments',
            'Donor area',
            'Desired outcome',
            'Travel planning',
          ],
        },
        {
          title: 'Personalized Treatment Plan',
          body: 'Every plan is built around:',
          points: [
            'Hair loss stage',
            'Donor availability',
            'Hairline design',
            'Estimated graft planning',
            'Recovery expectations',
          ],
        },
        {
          title: 'Travel Guidance',
          body: 'We\'ll help you prepare for consultation timing, procedure scheduling, the recovery period and return travel planning. Patients are encouraged to schedule sufficient recovery time before flying home.',
        },
      ],
    },
    {
      kind: 'process',
      heading: 'Procedure Day',
      lede: 'Your clinic visit follows a structured experience.',
      steps: [
        {
          title: 'Arrival',
          body: 'Meet the clinical team, review your treatment plan and confirm your hairline design.',
        },
        {
          title: 'Treatment',
          body: 'Your procedure is performed using Neo Follicle\'s personalized treatment approach.',
        },
        {
          title: 'Recovery',
          body: 'You\'ll receive detailed aftercare instructions before returning to your accommodation.',
        },
      ],
    },
    {
      kind: 'checklist',
      heading: 'Aftercare for International Patients',
      lede: 'Support doesn\'t end when you leave Bangalore. Follow-up guidance includes:',
      points: [
        'Recovery instructions',
        'Hair washing guidance',
        'Progress monitoring',
        'Virtual follow-ups where appropriate',
      ],
      image: img('section-2', 'A procedure room at Neo Follicle Hair Transplant Clinic, Bangalore.', 1200, 900),
      closing: 'This continuity of care helps patients feel supported even after returning home.',
    },
    {
      kind: 'featureGrid',
      heading: 'Why International Patients Choose Neo Follicle',
      items: [
        {
          title: 'Doctor-Led Planning',
        },
        {
          title: 'Personalized Consultations',
        },
        {
          title: 'Advanced NFT Implanters',
        },
        {
          title: 'Structured Recovery Guidance',
        },
        {
          title: 'Long-Term Hair Planning',
        },
        {
          title: 'International Patient Support',
        },
      ],
    },
      {
      kind: 'featureGrid',
      heading: 'Hair Transplant Options Available',
      lede: 'One clinic, several techniques. Which one suits you is decided at consultation, around your hair loss stage, goals and lifestyle.',
      items: [
        { title: 'FUE (Follicular Unit Extraction)', body: 'Individual follicles are extracted from the donor area and implanted where density is needed. No stitches, no linear scar, and a faster recovery.' },
        { title: 'FUT (Follicular Unit Transplantation)', body: 'A thin strip is taken from the back of the scalp and dissected into grafts. Considered where a large area needs covering in one session.' },
        { title: 'NFT Implanters', body: 'Grafts are placed with control over angle, direction and depth, which is what makes a hairline read naturally.' },
      ],
    },
    {
      kind: 'process',
      heading: 'We Take Care of Everything for You',
      lede: 'From the first message to your return home, the arrangements around the procedure are handled with you.',
      steps: [
        { title: 'Virtual Consultation', body: 'Your case is evaluated online and a treatment plan is proposed before you travel.' },
        { title: 'Visa Assistance', body: 'Support with medical visa documentation, invitation letters and approvals.' },
        { title: 'Travel Arrangements', body: 'Help with flights, airport pickup and transport, so arrival in Bangalore is straightforward.' },
        { title: 'Accommodation Support', body: 'Assistance finding somewhere to stay within reach of the clinic for the recovery period.' },
      ],
    },
    {
      kind: 'prose',
      heading: 'The Cost Advantage of Travelling to Bangalore',
      lede: [
        'A hair transplant in Bangalore typically costs a fraction of the equivalent procedure in the USA, Canada, the UK, Germany, Australia or the Gulf — without a corresponding difference in technique or planning.',
      ],
      points: [
        'The procedure itself',
        'Follow-up reviews',
        'Local travel assistance',
        'A post-care kit',
      ],
      closing: [
        'A quoted plan covers each of these, agreed after your scalp assessment rather than as a standard package.',
      ],
    },
    {
      kind: 'checklist',
      heading: 'Our Facilities',
      lede: 'The clinic is set up so that a visit from abroad is spent on treatment rather than logistics.',
      points: [
        'Reception and patient help centre for appointments, billing and enquiries',
        'Comfortable waiting lounges for patients and companions',
        'Private consultation rooms for confidential discussion',
        'Procedure rooms equipped for the full range of techniques offered',
      ],
    },
],
  faq: {
    heading: 'FAQs',
    items: [
      {
        question: 'How long should I stay in Bangalore?',
        answer: 'Your recommended stay depends on your treatment plan and recovery guidance.',
      },
      {
        question: 'Can I consult before travelling?',
        answer: 'Yes. Virtual consultations are available.',
      },
      {
        question: 'Will someone help me plan my visit?',
        answer: 'Yes. Travel guidance forms part of the consultation process.',
      },
      {
        question: 'How soon can I fly home?',
        answer: 'Your doctor will advise you based on your recovery.',
      },
      {
        question: 'Can I continue follow-ups after returning home?',
        answer: 'Yes. Follow-up guidance continues after your visit.',
      },
      {
        question: 'Is it safe to travel to India for hair transplant?',
        answer: 'Yes, India is one of the top destinations for medical tourism. Our clinic follows international safety protocols, and Bangalore is well-connected with global airports and high-quality healthcare.',
      },
      {
        question: 'How many days do I need to stay in Bangalore?',
        answer: 'We recommend 3–5 days: one day for consultation, one for the procedure, and one or two days for recovery and review.',
      },
      {
        question: 'Can I send my photos before coming?',
        answer: 'Absolutely! We offer online pre-assessment. Just send your scalp images, and Dr. Sandeep will recommend graft count, cost, and timeline.',
      },
      {
        question: 'Do you provide visa assistance?',
        answer: 'Yes, we can issue a medical invitation letter to support your visa application if required.',
      },
      {
        question: 'Will someone assist me during my stay?',
        answer: 'Yes, our international care team will help you with airport pickup, hotel guidance, and clinic coordination.',
      },
      {
        question: 'What’s included in the package?',
        answer: 'Your package can include consultation, procedure, post-care kit, medicines, and optional travel support like hotel and transfers.',
      },
      {
        question: 'Is the transplant result permanent?',
        answer: 'Yes, transplanted hair is permanent, natural, and grows for life. We also provide guidance on scalp care post-treatment.',
      },
      {
        question: 'Can I continue follow-up from my country?',
        answer: 'Yes, we offer virtual follow-ups via WhatsApp, email, or video call, even after you return home.',
      },
    ],
  },
  cta: {
    heading: 'Begin Your Hair Restoration Journey Before You Even Travel',
    body: 'Your consultation can start online, long before your flight.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
