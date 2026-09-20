/**
 * /hair-conditions-we-treat/ -- the conditions INDEX.
 *
 * NO BRIEF EXISTS FOR THIS PAGE. content/ covers the home page, the doctor
 * page, the treatments overview and the ten treatment pages, and says nothing
 * about this one. The sole source is the live capture at
 * neofollicle-seo-backup/pages/hair-conditions-we-treat/ (3,034 words,
 * content.md + headings.json), so unlike the treatment modules -- which are a
 * brief carrying live copy -- this is capture only, and the copy below is the
 * live page's, verbatim.
 *
 * WHY THIS PAGE MATTERS MORE THAN ITS TRAFFIC SUGGESTS. It is indexable, in
 * the sitemap, and was ORPHANED on the live site -- reports/seo-audit.md
 * section 7 lists it as the P1 internal-linking fix, alongside contact-us.
 * src/config/nav.ts now links it from the footer. Its job is to be a hub: it
 * names eleven conditions and six treatment routes, and nearly every one of
 * them already has its own built page. That is what the new `linkGrid` section
 * kind is for -- see the note on it in ./types.ts.
 *
 * IT RIDES THE TREATMENT PIPELINE BUT IS NOT A TREATMENT PAGE. It renders
 * TreatmentPageData because its shape is the same -- hero, blocks, closing CTA
 * -- and reusing that renderer is what keeps it in the site's rhythm for free
 * (TreatmentPage alternates base/surface down the page). Its images live under
 * public/treatments/hair-conditions-we-treat/ for the same reason; the mapping
 * is in scripts/treatment-assets.mjs.
 *
 * NO FAQ. The capture has no FAQ section and src/seo/schema/ has no FAQPage
 * graph for this slug. scripts/verify-seo.mjs asserts exactly 14 FAQPage
 * graphs / 82 questions across the site, so inventing one here would fail the
 * build -- and inventing the schema to match would be worse.
 *
 * DROPPED FROM THE CAPTURE DELIBERATELY: header/footer chrome, the repeated
 * inline "Call # +91 - 97312 07940" CTA that follows every single block (the
 * page CTA and the sticky action bar already carry it), the doctor-credentials
 * and stats block (the doctor page owns it, and DoctorStats/StatBand render it
 * there), and the "Written & Reviewed by" byline.
 *
 * THE "At A Glance" CLINIC TABLE is also dropped. It is a WordPress spec table
 * -- Clinic Name / Specialty / Location / Lead Doctor -- restating the
 * LocalBusiness JSON-LD that src/seo/schema/hair-conditions-we-treat.json
 * already carries for machines. Rendering it to patients is chrome.
 */
import { BOOK, CALL } from './ctas'
import type { TreatmentPageData } from './types'

/**
 * Intrinsic sizes are the real ones from public/treatments/sizes.json, written
 * by scripts/gen-treatment-images.mjs. 650x450 is this set's common size --
 * section-1 is the one exception and passes its own.
 */
const img = (n: string, alt: string, width = 650, height = 450) => ({
  src: `/treatments/hair-conditions-we-treat/${n}.webp`,
  alt,
  width,
  height,
})

const data: TreatmentPageData = {
  slug: 'hair-conditions-we-treat',

  hero: {
    eyebrow: 'Hair & Scalp Conditions',
    h1: 'Hair Conditions We Treat in Bangalore',
    lede: [
      'Hair loss is not the same for everyone. Some people notice gradual thinning, some develop bald patches, some experience sudden hair fall, while others struggle with dandruff, scalp irritation, or poor hair density.',
      'At Neo Follicle Transplant Clinic, Bangalore, we focus on identifying the root cause of your hair or scalp problem before recommending treatment. Led by Dr. Sandeep Mahapatra, Senior Dermatologist and Hair Transplant Surgeon, our clinic offers medical, non-surgical, and hair restoration solutions based on your condition, stage of hair loss, scalp health, age, lifestyle, and expectations.',
    ],
    image: img('hero', 'Dr. Sandeep Mahapatra at Neo Follicle Hair Transplant Clinic, Bangalore.'),
    badges: ['Dermatologist-led diagnosis', 'Medical, non-surgical & surgical options', 'Marathahalli, Bangalore'],
    ctas: [BOOK, CALL],
  },

  sections: [
    {
      kind: 'prose',
      heading: 'What Hair Conditions Does Neo Follicle Treat?',
      lede: [
        'Neo Follicle Transplant Clinic treats a wide range of hair and scalp conditions, including male pattern baldness, female pattern hair loss, alopecia areata, sudden hair fall, dandruff, scalp irritation, receding hairline, thinning crown, patchy beard growth, low hair density, and hair transplant repair cases.',
        'Treatment may include medical therapy, PRP, GFC, QR678, exosome therapy, low-level laser therapy, scalp micropigmentation, dandruff treatment, alopecia treatment, or hair transplant surgery depending on the diagnosis.',
      ],
    },

    /*
      The capture's three-column table -- Condition / Common Signs / Possible
      Treatment Options -- as link cards. Nine rows in, nine cards out; `meta`
      is the signs column and `body` the options column, both verbatim.

      The "Patchy Beard Growth" row's third cell repeats its second in the
      capture ("Uneven or thin beard density" twice), which is a copy-paste
      error on the live page. The duplicate is dropped rather than rendered
      twice -- see `body` below.
    */
    {
      kind: 'linkGrid',
      heading: 'Hair Conditions We Treat — At a Glance',
      lede: 'A quick overview of common hair and scalp problems evaluated at Neo Follicle Transplant Clinic.',
      items: [
        {
          title: 'Male Pattern Baldness',
          meta: 'Receding hairline, crown thinning, bald patches',
          body: 'Medicines, PRP, GFC, QR678, hair transplant',
          to: '/male-pattern-hair-loss/',
          linkLabel: 'Male pattern hair loss',
        },
        {
          title: 'Female Pattern Hair Loss',
          meta: 'Hair thinning, widening partition, low density',
          body: 'Medical treatment, PRP, GFC, QR678, exosomes',
          to: '/female-hair-loss/',
          linkLabel: 'Female hair loss',
        },
        {
          title: 'Alopecia Areata',
          meta: 'Round bald patches on scalp or beard',
          body: 'Dermatology evaluation, medical treatment, advanced therapies',
          to: '/alopecia-areata-treatment-in-bangalore/',
          linkLabel: 'Alopecia areata treatment',
        },
        {
          title: 'Sudden Hair Fall',
          meta: 'Excessive hair shedding, hair on pillow or comb',
          body: 'Diagnosis, blood tests if needed, medicines, nutrition correction',
          to: '/hair-loss-treatment-in-bangalore/',
          linkLabel: 'Hair loss treatments',
        },
        {
          title: 'Dandruff & Scalp Flaking',
          meta: 'Itching, flakes, oily scalp, irritation',
          body: 'Anti-dandruff treatment, scalp care, dermatology guidance',
          to: '/dandruff-treatment-in-bangalore/',
          linkLabel: 'Dandruff treatment',
        },
        {
          title: 'Receding Hairline',
          meta: 'Forehead hairline moving backward',
          body: 'Hairline design, medical treatment, hair transplant',
          to: '/hair-transplant-for-receding-hairline/',
          linkLabel: 'Receding hairline',
        },
        {
          title: 'Crown Hair Thinning',
          meta: 'Visible scalp on the crown area',
          body: 'PRP, GFC, QR678, hair transplant if needed',
          to: '/best-hair-transplant-in-bangalore/',
          linkLabel: 'Hair transplant in Bangalore',
        },
        {
          title: 'Patchy Beard Growth',
          meta: 'Uneven or thin beard density',
          to: '/beard-transplant-in-bangalore/',
          linkLabel: 'Beard transplant',
        },
        {
          title: 'Failed Hair Transplant',
          meta: 'Poor density, unnatural hairline, visible scars',
          body: 'Corrective hair transplant, repair planning',
          to: '/failed-hair-transplant-repair-in-bangalore/',
          linkLabel: 'Failed transplant repair',
        },
      ],
    },

    {
      kind: 'prose',
      heading: 'Why Hair Conditions Need Proper Diagnosis',
      lede: [
        'Hair fall, baldness, and scalp issues can look similar, but their causes may be very different.',
        'Many patients start using shampoos, oils, supplements, or online remedies without knowing why they are losing hair. This can delay the right treatment and allow the condition to progress.',
        'Hair loss may happen due to genetics, hormonal changes, stress, nutritional deficiencies, dandruff, autoimmune conditions, medications, lifestyle factors, or scalp inflammation. In some patients, more than one factor may be responsible.',
        'That is why a proper hair and scalp consultation is important. At Neo Follicle Hair Transplant Clinic, we assess your pattern of hair loss, scalp condition, hair density, family history, medical history, and treatment goals before recommending the next step.',
      ],
      image: img(
        'section-1',
        'A scalp and hair density examination during a diagnostic consultation.',
        1200,
        831,
      ),
    },

    /* ---- The eleven condition blocks, in the capture's order -------------- */

    {
      kind: 'prose',
      heading: 'Male Pattern Baldness Treatment in Bangalore',
      lede: [
        'Male pattern baldness, also called androgenetic alopecia, is one of the most common causes of hair loss in men. It usually begins with a receding hairline, thinning at the crown, or gradual loss of density on the top of the scalp.',
        'In early stages, medical treatments and regenerative therapies may help slow progression and improve hair quality. In advanced stages, hair transplant may be considered to restore the hairline and improve coverage.',
        'At Neo Follicle, the treatment plan is based on the stage of baldness, donor area strength, age, hairline expectations, and long-term maintenance needs.',
      ],
      link: { label: 'Explore Male Hair Loss Treatment', to: '/male-pattern-hair-loss/' },
    },

    {
      kind: 'prose',
      heading: 'Female Hair Loss & Hair Thinning Treatment',
      lede: [
        'Hair loss in women can be emotionally distressing because it often affects confidence, styling, and self-image. Female hair loss may appear as diffuse thinning, widening of the central partition, reduced ponytail volume, or visible scalp.',
        'The causes may include hormonal changes, thyroid imbalance, iron deficiency, stress, post-pregnancy changes, PCOS, menopause, crash dieting, or genetic tendency.',
        'At Neo Follicle, female hair loss is evaluated carefully before treatment is recommended. The goal is to identify the cause, stabilise hair fall, improve scalp health, and support better hair density wherever possible.',
      ],
      link: { label: 'Explore Hair Transplant for Female', to: '/female-hair-transplant-in-bangalore/' },
    },

    {
      kind: 'prose',
      heading: 'Alopecia Areata Treatment in Bangalore',
      lede: [
        'Alopecia areata is a condition where the immune system affects the hair follicles, leading to sudden patchy hair loss. It may appear as one or more round bald patches on the scalp, beard, eyebrows, or body.',
        'This condition requires dermatological evaluation because treatment depends on the size, location, duration, and progression of the patches. Some patients may recover well with timely medical care, while others may require a longer treatment and monitoring plan.',
        'Neo Follicle offers diagnosis and treatment guidance for alopecia areata with a dermatologist-led approach.',
      ],
      image: img('section-3', 'A round patch of hair loss on the scalp, characteristic of alopecia areata.'),
      link: { label: 'Explore Alopecia Areata Treatment', to: '/alopecia-areata-treatment-in-bangalore/' },
    },

    {
      kind: 'prose',
      heading: 'Sudden Hair Fall Treatment in Bangalore',
      lede: [
        'Sudden hair fall can be alarming. Patients may notice more hair on the pillow, bathroom floor, comb, or while washing hair. In many cases, this type of shedding may be related to stress, illness, surgery, fever, crash dieting, post-pregnancy changes, iron deficiency, thyroid issues, or lifestyle disturbances.',
        'This condition is often manageable when the trigger is identified early. The treatment may include correcting deficiencies, improving nutrition, reducing scalp inflammation, using appropriate medicines, and monitoring regrowth.',
        'At Neo Follicle Hair Transplant Clinic, we help patients understand whether their hair fall is temporary, progressive, or part of a larger hair loss condition.',
      ],
      image: img('section-2', 'Excessive hair shedding collected after washing.'),
      link: { label: 'Explore Hair Loss Treatments', to: '/hair-loss-treatment-in-bangalore/' },
    },

    {
      kind: 'prose',
      heading: 'Dandruff, Itchy Scalp & Scalp Flaking Treatment',
      lede: [
        'Dandruff is not just a cosmetic concern. In some patients, it may be associated with itching, scalp inflammation, oily scalp, flaking, redness, and increased hair fall. Recurrent dandruff may also indicate seborrheic dermatitis or other scalp conditions.',
        'Using random anti-dandruff shampoos may give temporary relief, but persistent dandruff needs proper scalp evaluation. Treatment depends on the severity, scalp type, recurrence pattern, and associated symptoms.',
        'Neo Follicle Hair Transplant Clinic provides dermatologist-guided dandruff and scalp care treatment to reduce symptoms and improve scalp health.',
      ],
      image: img('section-4', 'A woman examining flaking and irritation on her scalp.'),
      link: { label: 'Explore Dandruff Treatment', to: '/dandruff-treatment-in-bangalore/' },
    },

    {
      kind: 'prose',
      heading: 'Receding Hairline Treatment in Bangalore',
      lede: [
        'A receding hairline is often one of the earliest visible signs of patterned hair loss. It can make the forehead look broader and may change the overall facial appearance.',
        'Treatment depends on whether the hairline recession is early, moderate, or advanced. In some cases, medicines and regenerative treatments may help maintain existing hair. In other cases, hair transplant may be required to recreate a natural-looking hairline.',
        'At Neo Follicle Hair Transplant Clinic, hairline restoration is planned carefully with attention to age, face shape, donor hair availability, future hair loss pattern, and natural density.',
      ],
      image: img('section-5', 'A receding hairline with temple recession.'),
      link: { label: 'Explore Receding Hairline Treatment', to: '/hair-transplant-for-receding-hairline/' },
    },

    {
      kind: 'prose',
      heading: 'Crown Hair Thinning Treatment in Bangalore',
      lede: [
        'Crown thinning can progress slowly and may not be noticed until the scalp becomes clearly visible from the back or top. It is commonly associated with male pattern baldness but may also occur in women.',
        'The treatment plan depends on the density of existing hair, the size of the thinning area, scalp visibility, and the progression of hair loss. Early intervention may help preserve existing hair. In advanced cases, hair transplant may be planned to improve coverage.',
        'Neo Follicle Hair Transplant Clinic evaluates crown thinning with both short-term improvement and long-term maintenance in mind.',
      ],
      image: img('section-6', 'Thinning at the crown with visible scalp.'),
      link: { label: 'Explore Hair Transplant Options', to: '/best-hair-transplant-in-bangalore/' },
    },

    {
      kind: 'prose',
      heading: 'Patchy Beard & Low Beard Density Treatment',
      lede: [
        'Some men naturally have low beard density, while others may have patchy beard growth due to genetics, alopecia areata, scars, burns, acne marks, or previous injury.',
        'Depending on the cause, treatment may include medical management or beard transplant. In beard transplant, hair follicles are usually taken from the donor area of the scalp and implanted into the beard region to improve density and shape.',
        'At Neo Follicle Hair Transplant Clinic, beard restoration is planned according to face shape, beard design, density requirement, and natural direction of hair growth.',
      ],
      image: img('section-7', 'Uneven beard growth with gaps in density.'),
      link: { label: 'Explore Beard Restoration Options', to: '/beard-transplant-in-bangalore/' },
    },

    {
      kind: 'prose',
      heading: 'Eyebrow Thinning & Eyebrow Hair Loss Treatment',
      lede: [
        'Eyebrows play an important role in facial expression and appearance. Eyebrow hair loss may occur due to over-plucking, scars, burns, alopecia areata, aging, medical conditions, or naturally thin eyebrow growth.',
        'Treatment depends on the cause and the amount of restoration required. In selected cases, eyebrow restoration may be considered to improve shape and density.',
        'At Neo Follicle Hair Transplant Clinic, eyebrow restoration is planned with attention to natural direction, angle, density, and facial balance.',
      ],
      image: img('section-8', 'Eyebrow restoration planning for thin, over-plucked brows.'),
      link: { label: 'Explore Eyebrow Restoration', to: '/eyebrow-restoration-in-bangalore/' },
    },

    {
      kind: 'prose',
      heading: 'Failed Hair Transplant Repair in Bangalore',
      lede: [
        'A failed or unsatisfactory hair transplant can affect both appearance and confidence.',
        'Common concerns include an unnatural hairline, poor graft survival, low density, pluggy-looking hair, wrong hair direction, visible scars, or overharvested donor area.',
        'Repair planning needs experience because the donor area may already be limited.',
        'At Neo Follicle Hair Transplant Clinic, corrective planning focuses on what can be realistically improved, how to use available donor hair carefully, and how to create a more natural-looking outcome.',
      ],
      image: img('section-9', 'An unnatural hairline from a previous hair transplant, before repair.'),
      link: {
        label: 'Explore Repair of Failed Hair Transplant',
        to: '/failed-hair-transplant-repair-in-bangalore/',
      },
    },

    {
      kind: 'prose',
      heading: 'Scalp Micropigmentation for Visible Scalp & Low Density Look',
      lede: [
        'Scalp micropigmentation is a cosmetic technique that uses micro-pigments to create the appearance of hair follicles on the scalp.',
        'It may help patients with visible scalp, low density appearance, scars, or those who prefer a close-shaved look.',
        'It is not a hair growth treatment, but it can improve the visual impression of density in suitable cases.',
        'It may also be considered along with hair transplant planning in selected patients.',
      ],
      image: img(
        'section-10',
        'Scalp micropigmentation creating the appearance of density on a close-shaved scalp.',
      ),
      link: { label: 'Explore Scalp Micropigmentation', to: '/scalp-micropigmentation-in-bangalore/' },
    },

    /* ---- Treatment routes, then how a plan is chosen ---------------------- */

    /*
      The capture renders these six as icon cards, each with its own "Explore
      ..." link, and every target is a built page -- so this is a linkGrid, not
      the featureGrid the icons would suggest. The six SVG icons are dropped:
      they are `noun-*-FFF2F2.svg` stock glyphs whose fills are tuned to the old
      page's pink tint, and FeatureGrid carries no icons on any other page
      either (see the note on the featureGrid kind in ./types.ts).
    */
    {
      kind: 'linkGrid',
      heading: 'Hair Loss Treatment Options at Neo Follicle',
      lede: 'Your treatment plan may include medical, regenerative, non-surgical, or surgical options depending on your diagnosis.',
      intro:
        'Every hair condition does not need a hair transplant. Similarly, every case of hair loss cannot be solved with medicines or shampoos alone. The right treatment depends on the cause, stage, donor area, scalp condition, and patient expectations.',
      items: [
        {
          title: 'Medical Hair Loss Treatment',
          body: 'Medicines may be recommended to control hair fall, improve scalp health, and slow down progressive hair loss.',
          to: '/hair-loss-treatment-in-bangalore/',
          linkLabel: 'Explore Hair Loss Treatments',
        },
        {
          title: 'PRP Hair Treatment',
          body: "PRP uses platelet-rich plasma prepared from the patient's own blood to support hair growth and follicle activity.",
          to: '/best-prp-hair-treatment-in-bangalore/',
          linkLabel: 'Explore PRP Hair Treatment',
        },
        {
          title: 'GFC Hair Treatment',
          body: 'GFC therapy uses growth factors to support hair strengthening and hair density improvement in suitable patients.',
          to: '/gfc-hair-treatment-in-bangalore/',
          linkLabel: 'Explore GFC Hair Treatment',
        },
        {
          title: 'QR678 Hair Treatment',
          body: 'QR678 is an injectable hair growth therapy used for selected hair loss conditions after doctor evaluation.',
          to: '/qr678-hair-treatment-in-bangalore/',
          linkLabel: 'Explore QR678 Hair Treatment',
        },
        {
          title: 'Exosome Hair Treatment',
          body: 'Exosome-based treatment may be considered in suitable cases as part of an advanced hair restoration plan.',
          to: '/exosome-hair-treatment-in-bangalore/',
          linkLabel: 'Explore Exosome Hair Treatment',
        },
        {
          title: 'Hair Transplant Surgery',
          body: "Hair transplant may be advised when bald areas need permanent restoration using the patient's own donor hair.",
          to: '/best-hair-transplant-in-bangalore/',
          linkLabel: 'Explore Hair Transplant Procedure',
        },
      ],
    },

    /*
      The capture's green-tick list. `checklist` rather than `prose`, because
      here the source genuinely IS a list -- nine ✅ items -- and its longest
      entry runs past PILL_MAX, so Checklist renders it as ticks rather than
      chips. The ✅ glyphs themselves are dropped; CheckCircle is the site's
      own tick and carries the primary colour.
    */
    {
      kind: 'checklist',
      heading: 'How We Choose the Right Treatment for Your Hair',
      lede: 'Your treatment is planned after understanding your condition, not by using a one-size-fits-all approach.',
      intro: 'During consultation, the doctor may evaluate:',
      points: [
        'Pattern and stage of hair loss',
        'Duration of hair fall',
        'Scalp condition',
        'Hair density and miniaturisation',
        'Family history of baldness',
        'Previous treatments taken',
        'Medical history and lifestyle factors',
        'Donor area strength, if transplant is being considered',
        'Your expectations and long-term goals',
      ],
      image: img('section-11', 'A man with restored hair density after a personalised treatment plan.'),
      closing:
        'Based on this evaluation, you may be advised medical treatment, scalp treatment, regenerative therapy, hair transplant, or a combination plan.',
    },

    {
      kind: 'featureGrid',
      heading: 'Why Choose Neo Follicle for Hair & Scalp Conditions?',
      lede: 'A dermatologist-led clinic focused on diagnosis, natural-looking restoration, and long-term hair health.',
      intro:
        'The clinic is led by Dr. Sandeep Mahapatra, Senior Dermatologist and Hair Transplant Surgeon, who brings medical expertise in both skin and hair-related conditions. This is important because many hair problems are connected to scalp health, inflammation, dermatological conditions, hormonal factors, and medical history.',
      items: [
        {
          title: 'Experienced & Trusted Expert',
          body: 'Dr. Sandeep Mahapatra brings years of expertise in Hair Transplant, Stem Cell Therapy, PRP, and more.',
        },
        {
          title: 'State-of-the-Art Implanters',
          body: 'Advanced FUE and Implanter techniques for scar-free precision.',
        },
        {
          title: 'Customized Treatment Plans',
          body: 'Every patient is unique, and so is our approach.',
        },
        {
          title: 'Natural & Permanent Results',
          body: 'Our hair restoration procedures ensure a fuller, thicker, and undetectable hairline with lasting effects.',
        },
        {
          title: 'Safe, Painless, and Affordable',
          body: 'Treatment is planned around your comfort, with clear costs explained before you begin.',
        },
        {
          title: 'Convenient Location',
          body: 'Marathahalli, Whitefield — Bangalore, with appointments by call, WhatsApp or online enquiry.',
        },
      ],
    },
  ],

  cta: {
    heading: 'Get Your Hair Condition Evaluated by an Expert',
    body: 'Whether it is hair fall, thinning, bald patches, dandruff or a previous transplant that did not work, the first step is a proper diagnosis. Book a hair and scalp consultation for a clear, honest plan.',
    ctas: [BOOK, CALL],
  },
}

export default data
