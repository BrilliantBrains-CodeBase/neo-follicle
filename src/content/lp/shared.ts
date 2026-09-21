/**
 * Content shared by the ad landing pages.
 *
 * best-hair-transplant-clinic-lp and best-hair-transplant-surgeon-in-bangalore-lp
 * are the SAME PAGE with a different emphasis -- the clinic LP leads with the
 * clinic, the surgeon LP leads with Dr. Mahapatra -- and their captures carry
 * an identical ten-question FAQ, an identical five-service list and an
 * identical celebrity row. cost-of-hair-transplant-in-bangalore-lp reuses the
 * FAQ's framing but has its own eight cost questions, which live with that
 * page rather than here.
 *
 * Duplicating any of this per page would mean three copies of the same answers
 * drifting apart the first time one is edited.
 *
 * COPY IS VERBATIM from neofollicle-seo-backup/pages/<slug>/content.md.
 *
 * THESE PAGES ARE ALL `noindex` and carry no canonical -- that captured state
 * is asserted by scripts/verify-seo.mjs. None of them has a FAQPage graph in
 * src/seo/schema/, and none may gain one: the suite asserts exactly 14 FAQPage
 * graphs / 82 questions across the site, all on already-built pages. The FAQ
 * below is rendered for READERS only, which is the right call anyway on a page
 * search engines are told not to index.
 */
import type { LinkCard, Person, TreatmentSection } from '../treatments/types'

/** The ten questions both the clinic and surgeon LPs close with, verbatim. */
export const LP_FAQ: { question: string; answer: string }[] = [
  {
    question: 'Is a hair transplant a permanent solution for baldness?',
    answer:
      'Yes, hair transplants offer a long-term solution. The transplanted hair is taken from areas genetically resistant to hair loss (usually the back of the scalp), making it permanent and natural-looking. However, maintaining overall scalp health post-procedure is still important.',
  },
  {
    question: 'Are hair transplants painful?',
    answer:
      'Most hair transplants are performed under local anesthesia, so the procedure itself is not painful. Patients may experience mild discomfort or tightness in the days following the surgery, which is typically manageable with pain relievers.',
  },
  {
    question: 'How long does it take to see full results after a hair transplant?',
    answer:
      'Hair transplant results are gradual. You may see initial shedding within 2–4 weeks, new hair growth in 3–4 months, and full visible results in 9–12 months. Patience is key as your new hair follicles establish and grow.',
  },
  {
    question: 'Is there any downtime after a hair transplant?',
    answer:
      'Downtime is minimal. Most patients can return to work within 2–5 days after the procedure, depending on the type of technique used. However, strenuous physical activity should be avoided for 10–14 days.',
  },
  {
    question: 'Will the transplanted hair look natural?',
    answer:
      'Yes, when performed by a skilled and experienced surgeon, hair transplants can deliver a very natural look. Modern techniques like Follicular Unit Extraction (FUE) and Direct Hair Implantation (DHI) allow precise placement of hair follicles, matching your natural hair growth pattern and hairline design.',
  },
  {
    question:
      'Can I undergo a hair transplant if I have other medical conditions like diabetes or hypertension?',
    answer:
      "In many cases, yes - but only after proper evaluation. Controlled diabetes and blood pressure are not usually barriers, but it's important to share your medical history with the hair transplant doctor. At Neo Follicle Hair Transplant in Bangalore we conduct a thorough pre-op health screening to ensure you're fit for the procedure.",
  },
  {
    question: 'Will there be any visible scars after a hair transplant?',
    answer:
      'At Neo Follicle, we offer advanced techniques like FUE (Follicular Unit Extraction), scarring is minimal and virtually invisible to the naked eye, even with short hair. However, older methods like FUT (strip method) may leave a linear scar at the donor site. Choosing the right technique and experienced surgeon is key to reducing scarring.',
  },
  {
    question: 'Can a hair transplant fail?',
    answer:
      'While success rates are generally high, a hair transplant can fail due to poor surgical technique, inadequate post-operative care, or underlying health issues. Choosing a qualified and experienced hair transplant surgeon in Bangalore significantly reduces this risk. Following post-surgery instructions is equally important.',
  },
  {
    question: 'What are the risks or side effects of a hair transplant?',
    answer:
      'Hair transplants are generally safe, but like any procedure, they carry some risks. These may include temporary swelling, redness, mild pain, itching, or infection (rare if done in hygienic conditions). These side effects are usually minor and subside within a few days to weeks.',
  },
  {
    question: 'Can I combine a hair transplant with other hair treatments like PRP therapy?',
    answer:
      'Yes, Dr Sandeep Mahapatra recommends combining hair transplant procedures with Platelet-Rich Plasma (PRP) therapy. PRP can help speed up healing, improve graft survival, and boost the growth of existing thinning hair, making it a great complementary treatment.',
  },
]

/**
 * The five services both LPs list. Every target is a built treatment page, so
 * these are link cards -- the LPs were the only pages on the old site that
 * named a service without linking to it.
 */
export const LP_SERVICES: LinkCard[] = [
  {
    title: 'Hair Transplant For Male',
    body: 'Hairline restoration and crown coverage planned around your stage of baldness and donor strength.',
    to: '/hair-transplant-for-men-in-bangalore/',
    linkLabel: 'Male hair transplant',
  },
  {
    title: 'Hair Transplant For Female',
    body: 'For diffuse thinning, a widening partition or reduced density, after the cause is established.',
    to: '/female-hair-transplant-in-bangalore/',
    linkLabel: 'Female hair transplant',
  },
  {
    title: 'Failed Hair Transplant Repair',
    body: 'Corrective planning for poor density, an unnatural hairline, visible scarring or wrong hair direction.',
    to: '/failed-hair-transplant-repair-in-bangalore/',
    linkLabel: 'Failed transplant repair',
  },
  {
    title: 'Beard Transplant',
    body: 'For patchy growth, gaps and scars, designed to your face shape and natural growth direction.',
    to: '/beard-transplant-in-bangalore/',
    linkLabel: 'Beard transplant',
  },
  {
    title: 'Eyebrow Restoration',
    body: 'For thin, over-plucked or scarred brows, planned for natural angle, direction and density.',
    to: '/eyebrow-restoration-in-bangalore/',
    linkLabel: 'Eyebrow restoration',
  },
]

/**
 * The Sandalwood names both LPs carry.
 *
 * The photographs are the ones already generated for
 * /celebrity-hair-transplant/ -- same five people, same sources, so pointing at
 * that set rather than generating a second copy under each LP slug keeps
 * `npm run verify:treatments` check 6 (no orphaned generated images) honest.
 *
 * Five, not six: the capture holds no photograph for Bhuvann Ponnannaa, and
 * putting another person's face under his name is not a layout decision. Same
 * call src/content/treatments/celebrity-hair-transplant.ts records.
 */
const celeb = (file: string, name: string, role: string): Person => ({
  name,
  role,
  image: {
    src: `/treatments/celebrity-hair-transplant/${file}.webp`,
    alt: `${name}, ${role.toLowerCase()}.`,
    width: 650,
    height: 450,
  },
})

export const LP_CELEBRITIES: Person[] = [
  celeb('sri-murali', 'Sri Murali', 'Kannada Actor'),
  celeb('prem', 'Prem', 'Kannada Actor'),
  celeb('rakshith-gowda', 'Rakshith Gowda', 'Kannada Actor'),
  celeb('sharan', 'Sharan', 'Kannada Actor'),
  celeb('rj-mayuraa-raghavendra', 'RJ Mayuraa Raghavendra', 'Radio Jockey'),
]

/** The clinic LP's facilities grid, verbatim from its capture. */
export const LP_FACILITIES: TreatmentSection = {
  kind: 'featureGrid',
  heading: 'Our Facilities - Designed for Patient Care and Comfort',
  items: [
    { title: 'Reception / Patient Help Center' },
    { title: 'Waiting / Reception Lounge' },
    { title: 'Doctor Consultation Room' },
    { title: 'Procedure Room' },
    { title: 'Diagnostics Lab' },
    { title: 'In-house Pharmacy' },
  ],
}
