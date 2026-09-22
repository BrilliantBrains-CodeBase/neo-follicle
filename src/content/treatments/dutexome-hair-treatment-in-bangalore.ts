/**
 * New treatment page supplied in "Dutexome Hair Treatment - Neo Follicle Page
 * content.md". Unlike the migrated treatment pages, this one has no legacy
 * page to merge: a live-domain search and URL-map check found no Dutexome URL.
 *
 * Repeated inline phone prompts are represented by the shared hero and closing
 * CTA rows. The long doctor-stat block is represented by the site's shared
 * doctor attribution/footer, while the page-specific medical review and safety
 * caveats remain visible below.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

const data: TreatmentPageData = {
  slug: 'dutexome-hair-treatment-in-bangalore',
  hero: {
    eyebrow: 'DHT-Blocking & Regenerative Care',
    h1: 'Best Dutexome Hair Treatment in Bangalore',
    lede: [
      'A clinically formulated option for selected patients experiencing androgenetic alopecia or diffuse hair thinning.',
      'Neo Follicle uses the genuine Mesoestetic c.prof 231 Dutexome Solution in a doctor-led treatment plan tailored to your scalp and stage of hair loss.',
    ],
    image: {
      src: '/treatments/dutexome-hair-treatment-in-bangalore/hero.webp',
      alt: 'A clinician using a microneedling pen on the thinning scalp of a reclining patient in a dermatology clinic.',
      width: 1200,
      height: 1200,
    },
    badges: [
      'Doctor-Led Protocol',
      'Genuine c.prof 231',
    ],
    ctas: [
      BOOK,
      CALL,
    ],
  },
  sections: [
    {
      kind: 'prose',
      heading: 'What Is Dutexome Hair Treatment?',
      lede: [
        'Dutexome refers to the Dutexome Solution (clinical code c.prof 231) by Mesoestetic Pharma Group, Spain, a professional, CE-marked mesotherapy formulation used for androgenetic alopecia and diffuse hair thinning.',
        'At Neo Follicle, the solution is delivered into the scalp using a controlled microneedling technique, allowing even application across the treated area while combining the regenerative response of micro-injury with direct delivery of its active ingredients.',
      ],
      points: [
        'Dutasteride (0.05%) works locally at the scalp to inhibit the 5-alpha-reductase enzyme involved in converting testosterone into DHT, the hormone primarily associated with pattern hair loss.',
        'Plant-based aloe vera exosomes carry signalling cargo intended to support communication between cells around the hair root.',
        'Copper tripeptide supports the follicular environment and scalp tissue quality.',
        'Biotin and B-complex vitamins provide building blocks used in keratin production.',
      ],
      closing: [
        'This is a newer-generation formulation. Early clinical data is encouraging, but published evidence is still developing. Dr. Sandeep will explain what current evidence does and does not show during your consultation.',
      ],
    },
    {
      kind: 'checklist',
      heading: 'Who Is Dutexome Treatment Ideal For?',
      lede: 'Dutexome is intended for patients who are thinning rather than completely bald, where follicles remain active and may still respond to treatment.',
      points: [
        'Men and women with early to moderate androgenetic alopecia (pattern hair loss)',
        'Patients with diffuse hair thinning where follicles are still active',
        'People who want to address DHT-driven hair loss without a daily oral tablet',
        'Patients seeking a combined regenerative and DHT-blocking approach',
        'Anyone the doctor evaluates as having sufficient follicular activity to respond',
      ],
      secondary: {
        heading: 'Who Should Avoid This Treatment',
        points: [
          'People with completely bald areas where no active follicles remain',
          'Anyone seeking a substitute for hair transplant in advanced baldness',
          'People who are pregnant, breastfeeding or trying to conceive',
        ],
      },
      closing: 'Suitability is confirmed through a scalp evaluation and medical history review before treatment begins.',
    },
    {
      kind: 'process',
      heading: 'How Does Dutexome Treatment Work?',
      lede: 'A two-part approach: block DHT locally and support the follicular environment.',
      steps: [
        {
          title: 'Consultation & Scalp Evaluation',
          body: 'Dr. Sandeep evaluates your hair loss pattern, scalp condition and medical history, including screening for pregnancy, breastfeeding and other contraindications.',
        },
        {
          title: 'Dutexome Application',
          body: 'The Dutexome Solution is delivered into areas of active thinning through controlled microneedling.',
        },
        {
          title: 'Personalized Session Plan',
          body: 'The number of sessions and interval between them depends on your hair loss stage, scalp condition and response. Your plan is set at consultation rather than following a one-size-fits-all protocol.',
        },
        {
          title: 'Monitoring & Follow-Up',
          body: 'Progress is reviewed at follow-up visits, and the protocol may be adjusted according to how your scalp and hair respond.',
        },
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Benefits of Dutexome Hair Treatment',
      items: [
        {
          title: 'Targets DHT at the follicle level',
          body: 'Works locally to reduce the hormone most associated with pattern hair loss, without a daily oral tablet.',
        },
        {
          title: 'Combines hormonal and regenerative action',
          body: 'Pairs DHT inhibition with exosome and peptide-based follicle support in a single formulation.',
        },
        {
          title: 'Minimally invasive delivery',
          body: 'Administered through microneedling with no surgery or blood draw required.',
        },
        {
          title: 'Genuine Mesoestetic formulation',
          body: 'Uses the authentic c.prof 231 Dutexome Solution rather than a generic substitute.',
        },
        {
          title: 'Doctor-led protocol',
          body: 'Planned and monitored by Dr. Sandeep Mahapatra around your hair loss pattern and response.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Dutexome Treatment Cost in Bangalore',
      lede: [
        'The cost of Dutexome treatment depends on your hair loss stage, scalp condition and the number of sessions your treatment plan requires.',
        'Because this is a precision-dosed formulation, your session plan and cost estimate are discussed after Dr. Sandeep assesses your scalp and hair loss pattern.',
      ],
      closing: [
        'You will know what the recommended plan includes and why before treatment begins.',
      ],
    },
    {
      kind: 'featureGrid',
      heading: 'Why Neo Follicle Clinic for Dutexome Therapy?',
      lede: 'Experienced hands, genuine product and personalized care.',
      items: [
        {
          title: 'Experienced & trusted expert',
          body: 'Dr. Sandeep Mahapatra brings extensive experience across hair transplant, stem cell therapy, PRP, GFC, QR678 and other hair restoration options.',
        },
        {
          title: 'Genuine Mesoestetic sourcing',
          body: 'The clinic uses authentic Mesoestetic c.prof 231 Dutexome Solution, not a generic or unverified alternative.',
        },
        {
          title: 'Customized treatment plans',
          body: 'Session count, interval and technique are planned around your specific hair loss pattern.',
        },
        {
          title: 'Doctor-led safety screening',
          body: 'Medical history and contraindications, including pregnancy and breastfeeding, are reviewed before any session.',
        },
        {
          title: 'Convenient Bangalore location',
          body: 'Treatment takes place at Neo Follicle in Marathahalli, near Whitefield, Bangalore.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Written & Reviewed by Dr. Sandeep Mahapatra',
      lede: [
        'This page has been written and medically reviewed under the guidance of Dr. Sandeep Mahapatra, Senior Dermatologist and Hair Transplant Surgeon at Neo Follicle Hair Transplant Clinic, Bangalore.',
        'The information is for patient education and does not replace an in-person consultation, diagnosis or personalized treatment plan. Suitability depends on your hair loss pattern, scalp condition, medical history and long-term restoration goals.',
      ],
      closing: [
        'Last reviewed: August 2026.',
      ],
    },
  ],
  faq: {
    heading: 'FAQs - Dutexome Hair Treatment in Bangalore',
    items: [
      {
        question: 'What is Dutexome made of?',
        answer: 'Dutexome (Mesoestetic c.prof 231) combines 0.05% dutasteride with plant-based exosomes, copper tripeptide, biotin and B-complex vitamins, delivered into the scalp through microneedling.',
      },
      {
        question: 'How is Dutexome different from QR678 or GFC?',
        answer: 'QR678 and GFC deliver growth factors intended to support follicles. Dutexome combines a regenerative approach with locally applied dutasteride, addressing DHT-driven pattern hair loss while supporting the follicular environment.',
      },
      {
        question: 'Is Dutexome the same as taking dutasteride tablets?',
        answer: 'No. Dutexome applies dutasteride directly to the scalp at a low concentration rather than as a daily oral tablet. It is intended to reduce systemic exposure compared with oral treatment, but some absorption may still occur, so your full medical history must be reviewed.',
      },
      {
        question: 'Is Dutexome safe?',
        answer: 'It uses a CE-marked professional formulation from Mesoestetic. As with any dutasteride-containing product, it is not suitable during pregnancy or breastfeeding. Dr. Sandeep reviews your medical history and contraindications before recommending treatment.',
      },
      {
        question: 'How many sessions will I need?',
        answer: 'The number of sessions depends on your hair loss stage and scalp condition. Dr. Sandeep will recommend a personalized session plan after your scalp evaluation.',
      },
      {
        question: 'Does the treatment hurt?',
        answer: 'Because this is a microneedling-based procedure, you may feel mild discomfort or tingling during the session, similar to other mesotherapy treatments offered at the clinic.',
      },
      {
        question: 'Can I combine Dutexome with other treatments?',
        answer: 'This is decided case by case based on your hair loss pattern and any other treatments, such as PRP, GFC or post-transplant care, that you may be undergoing.',
      },
      {
        question: 'Is Dutexome effective for women?',
        answer: 'Dutasteride-based treatments require careful individual evaluation for women, particularly in relation to pregnancy status. Dr. Sandeep will assess suitability during consultation.',
      },
    ],
  },
  cta: {
    heading: 'Find Out Whether Dutexome Fits Your Hair Restoration Plan',
    body: 'Every recommendation begins with a scalp evaluation, safety screening and personalized discussion with the doctor.',
    ctas: [
      BOOK,
      CALL,
    ],
  },
}

export default data
