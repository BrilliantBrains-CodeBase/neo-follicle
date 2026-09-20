// Which backup original backs each treatment-page image, and what it is called
// once served. Kept apart from gen-treatment-images.mjs so the data modules in
// src/content/treatments/ and the generator cannot drift: the generator writes
// exactly these paths, and `npm run verify:treatmentimg` asserts they exist.
//
// Sources are the images the OLD page actually rendered, read out of
// neofollicle-seo-backup/pages/<slug>/images.json. Nothing here is stock and
// nothing comes from the brief -- four of the five images embedded in
// content/treatments/Neo Follicle Website Content-3.md are third-party
// screenshots (two are captioned "Hairfree & Hairgrow Clinic", a competitor),
// so the brief is treated as copy only.
//
// `review: true` marks a set whose provenance is not clean. See the note on
// female below. Those render behind a FLAGGED FOR CLIENT REVIEW comment at the
// call site, the convention DoctorApproach.tsx already uses.

/** Served path for a treatment image. */
export function treatmentImagePath(slug, name) {
  return `/treatments/${slug}/${name}.webp`
}

const u = (p) => `wp-content/uploads/${p}`

export const TREATMENT_IMAGES = {
  'best-hair-transplant-in-bangalore': {
    hero: { from: u('2025/03/Bald-Man-Aspiring-for-Hair-Transplant.jpg'),
            alt: 'A man reviewing his receding hairline before a hair transplant consultation.' },
    results: [
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-1.jpg'), alt: 'Before and after a direct hair transplant at Neo Follicle.' },
      { from: u('2025/03/NFT-Hair-Transplant-Before-After-Images-2.jpg'), alt: 'Before and after hairline restoration at Neo Follicle.' },
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-3.jpg'), alt: 'Before and after crown density restoration at Neo Follicle.' },
    ],
  },

  'hair-transplant-for-men-in-bangalore': {
    hero: { from: u('2025/03/Bald-Indian-Man.jpg'),
            alt: 'A man with male pattern hair loss at the crown and temples.' },
    results: [
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-1.jpg'), alt: 'Before and after a hair transplant for a receding hairline.' },
      { from: u('2025/03/NFT-Hair-Transplant-Before-After-Images-2.jpg'), alt: 'Before and after frontal density restoration in a male patient.' },
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-3.jpg'), alt: 'Before and after crown restoration in a male patient.' },
    ],
  },

  'hair-transplant-cost-in-bangalore': {
    hero: { from: u('2025/04/NFT-Clinic-Reception.jpeg'),
            alt: 'The reception at Neo Follicle Hair Transplant Clinic, Bangalore.' },
    // One only. The cost brief has no before/after section -- it is a text and
    // table page, as the old one was -- so this single image sits beside the
    // "How We Estimate Cost" list. A second would be an orphan; see
    // verify-treatments.mjs check 4.
    results: [
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-1.jpg'), alt: 'Before and after a hair transplant at Neo Follicle.' },
    ],
  },

  'female-hair-transplant-in-bangalore': {
    hero: { from: u('2026/05/Indian-Woman-with-Baldness.png'),
            alt: 'A woman with a widening part line and thinning along the frontal hairline.' },
    // FLAGGED FOR CLIENT REVIEW. The old female page rendered female-*-1.png,
    // but the beard page rendered the same family without the -1 suffix as
    // filler tiles, so these are not verified as female patients.
    review: true,
    results: [
      { from: u('2026/05/female-2-1.png'), alt: 'Before and after female hair restoration at Neo Follicle.' },
      { from: u('2026/05/female-3-1.png'), alt: 'Before and after part-line density restoration at Neo Follicle.' },
      { from: u('2026/05/female-4-1.png'), alt: 'Before and after female hairline restoration at Neo Follicle.' },
    ],
  },

  'failed-hair-transplant-repair-in-bangalore': {
    hero: { from: u('2025/03/Bald-Indian-Man.jpg'),
            alt: 'A man considering corrective treatment after an earlier hair transplant.' },
    results: [
      { from: u('2025/04/Failed-Hair-Transplant-2.jpg'), alt: 'A previous hair transplant showing poor density before corrective planning.' },
      { from: u('2025/04/Failed-Hair-Tansplant-3.jpg'), alt: 'An unnatural hairline from an earlier transplant, assessed before repair.' },
    ],
  },

  'beard-transplant-in-bangalore': {
    hero: { from: u('2025/03/Indian-Man-with-patchy-beard.jpg'),
            alt: 'A man with patchy beard growth along the cheeks and jawline.' },
    results: [
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-1.jpg'), alt: 'Before and after a beard transplant at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-2.jpg'), alt: 'Before and after patchy beard correction at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-3.jpg'), alt: 'Before and after moustache and goatee restoration at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-4.jpg'), alt: 'Before and after beard density restoration at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-5.jpg'), alt: 'Before and after facial hair restoration at Neo Follicle.' },
    ],
  },

  'eyebrow-restoration-in-bangalore': {
    hero: { from: u('2025/04/Indian-woman-eyebrow-transplant.jpg'),
            alt: 'A woman having her eyebrow shape assessed before restoration.' },
    results: [
      { from: u('2025/04/NFT-Eyebrow-Before-After-1.jpg'), alt: 'Before and after eyebrow restoration at Neo Follicle.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-2.jpg'), alt: 'Before and after restoring over-plucked eyebrows at Neo Follicle.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-3.jpg'), alt: 'Before and after eyebrow density restoration at Neo Follicle.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-4.jpg'), alt: 'Before and after eyebrow shaping and restoration at Neo Follicle.' },
    ],
  },

  'celebrity-hair-transplant': {
    hero: { from: u('2025/04/NFT-Celebrity-Page-Image.jpg'),
            alt: 'Neo Follicle Hair Transplant Clinic, trusted by public figures in Bangalore.' },
    // Real, named, identifiable people -- the photograph must match the name.
    //
    // The brief lists six: Sri Murali, Prem, Rakshith Gowda, Sharan,
    // RJ Mayuraa Raghavendra and Bhuvann Ponnannaa. The capture has a
    // photograph for the first five and NONE for Bhuvann Ponnannaa.
    //
    // The two portraits the capture does hold beyond that list are
    // Pushkara-Mallikarjunaiah-Film-Producer.jpg and
    // NFT-K-M-Chaitanya-Celebrity.jpg. Neither is Bhuvann Ponnannaa, so
    // neither is used to fill the sixth slot -- putting one person's face
    // under another person's name is not a layout decision.
    //
    // FLAGGED FOR CLIENT REVIEW: supply a portrait for Bhuvann Ponnannaa, or
    // confirm whether Pushkara Mallikarjunaiah and K M Chaitanya should be
    // listed here under their own names as the old page had them.
    people: [
      { from: u('2025/03/Sri-Murali-Kannada-Actor.jpg'), name: 'Sri Murali', role: 'Actor' },
      { from: u('2025/03/Prem-Kannada-Actor.jpg'), name: 'Prem', role: 'Actor' },
      { from: u('2025/03/Rakshith-Gowda-Kannada-Actor.jpg'), name: 'Rakshith Gowda', role: 'Actor' },
      { from: u('2025/03/Sharan-Kannada-Actor.jpg'), name: 'Sharan', role: 'Actor' },
      { from: u('2025/03/RJ-Mayuraa-Raghavendra.jpg'), name: 'RJ Mayuraa Raghavendra', role: 'Radio Jockey' },
    ],
  },

  'unshaven-hair-transplant': {
    hero: { from: u('2025/05/Indian-Man-with-Good-Hairs-2.jpg'),
            alt: 'A man with a full hairstyle after an unshaven hair transplant.' },
    results: [
      { from: u('2025/05/Unshaven-Before-After-1.jpg'), alt: 'Before and after an unshaven hair transplant at Neo Follicle.' },
      { from: u('2025/05/Unshaven-Before-After-2.jpg'), alt: 'Before and after unshaven hairline restoration at Neo Follicle.' },
      { from: u('2025/05/Unshaven-Before-After-3.jpg'), alt: 'Before and after an unshaven procedure with minimal visible change.' },
      { from: u('2025/05/Unshaven-Before-After-15-Days.jpg'), alt: 'An unshaven hair transplant fifteen days after the procedure.' },
    ],
  },

  'body-hair-transplant': {
    hero: { from: u('2025/03/Bald-Indian-Man.jpg'),
            alt: 'A man with limited scalp donor hair being assessed for body hair transplantation.' },
    results: [
      { from: u('2025/10/Body-HT-1.png'), alt: 'Body hair assessed as a donor source at Neo Follicle.' },
      { from: u('2025/10/Body-HT-1a.png'), alt: 'Body hair donor planning at Neo Follicle.' },
      { from: u('2025/10/Body-HT-1c.png'), alt: 'Body hair transplantation result at Neo Follicle.' },
    ],
  },

  /* ---- Non-surgical treatments (Content-4, pages 1-9) ----------------------
     Same rule as above: every source is an image the OLD page actually
     rendered, read out of its own images.json. These captures are thinner than
     the surgical ones -- most carry only one or two page-specific photographs
     once the shared chrome (logo, icon set, doctor portrait) is excluded -- so
     several pages here are hero-only by necessity, not by choice.
     FLAGGED FOR CLIENT REVIEW: photography for these nine would materially
     improve them.                                                             */

  'stem-cell-therapy-for-hair-loss-in-bangalore': {
    hero: { from: u('2025/03/Indian-Man-with-Good-Hair-volume.jpg'),
            alt: 'A man with dense hair volume after regenerative hair treatment.' },
    sections: [
      { from: u('2025/04/Hair-Loss-Treatment-Before-After.jpg'), alt: 'Before and after a course of non-surgical hair loss treatment.' },
    ],
  },

  'best-prp-hair-treatment-in-bangalore': {
    hero: { from: u('2025/04/Indian-Woman-with-Thining-Hairs.jpg'),
            alt: 'A woman parting her hair to show thinning across the crown.' },
    sections: [
      { from: u('2025/03/Indian-Man-with-Beard.jpg'), alt: 'A man with a full head of hair and a trimmed beard.' },
    ],
  },

  'gfc-hair-treatment-in-bangalore': {
    hero: { from: u('2025/04/Smiling-Indian-Man-after-GFC-hair-therapy.jpg'),
            alt: 'A man smiling after a course of GFC hair therapy.' },
    results: [
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-1.jpg'), alt: 'Before and after GFC hair therapy at Neo Follicle.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-2.jpg'), alt: 'Before and after GFC therapy showing improved density at Neo Follicle.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-3.jpg'), alt: 'Before and after GFC therapy across the crown at Neo Follicle.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-4.jpg'), alt: 'Before and after GFC therapy along the hairline at Neo Follicle.' },
    ],
  },

  'qr678-hair-treatment-in-bangalore': {
    hero: { from: u('2025/04/Indian-Man-with-Thin-Hair.jpg'),
            alt: 'A man with thinning hair across the frontal scalp.' },
    sections: [
      { from: u('2025/04/Hair-Loss-Before-After.jpg'), alt: 'Before and after a course of medical hair loss treatment.' },
    ],
  },

  'exosome-hair-treatment-in-bangalore': {
    hero: { from: u('2025/04/Indian-Man-with-good-hairs.jpg'),
            alt: 'A man with restored hair density after regenerative treatment.' },
    results: [
      { from: u('2025/04/exosome-before-after-1.jpg'), alt: 'Before and after exosome therapy at Neo Follicle.' },
      { from: u('2025/04/exosome-before-after-2.jpg'), alt: 'Before and after exosome therapy showing improved density at Neo Follicle.' },
      { from: u('2025/04/exosome-before-after-3.jpg'), alt: 'Before and after exosome therapy across the crown at Neo Follicle.' },
    ],
  },

  'low-level-laser-therapy': {
    // FLAGGED FOR CLIENT REVIEW. The capture has no laser-therapy photograph at
    // all; this is the portrait the old page itself used in that slot. A photo
    // of the LLLT device in the clinic is the right fix.
    review: true,
    hero: { from: u('2025/03/Indian-Man-with-Beard.jpg'),
            alt: 'A man with a full head of hair and a trimmed beard.' },
    sections: [
      { from: u('2025/04/Indian-Woman-with-Thining-Hairs.jpg'), alt: 'A woman parting her hair to show early thinning.' },
    ],
  },

  'scalp-micropigmentation-in-bangalore': {
    hero: { from: u('2025/04/Indian-Male-with-good-Hairs.png'),
            alt: 'A man with a closely cropped hairstyle and even scalp coverage.' },
    results: [
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-1.jpg'), alt: 'Before and after scalp micropigmentation at Neo Follicle.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-2.jpg'), alt: 'Before and after scalp micropigmentation across the crown at Neo Follicle.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-3.jpg'), alt: 'Before and after scalp micropigmentation along the hairline at Neo Follicle.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-4.jpg'), alt: 'Before and after scalp micropigmentation showing denser coverage at Neo Follicle.' },
    ],
  },

  'alopecia-areata-treatment-in-bangalore': {
    hero: { from: u('2025/04/Alopecia-in-Men.jpg'),
            alt: 'A patch of hair loss on the scalp, characteristic of alopecia areata.' },
    sections: [
      { from: u('2025/04/Hair-Loss-Treatment-Before-After.jpg'), alt: 'Before and after dermatologist-led hair loss treatment.' },
    ],
  },

  'dandruff-treatment-in-bangalore': {
    hero: { from: u('2025/04/Woman-with-dandruff.jpg'),
            alt: 'A woman examining flaking on her scalp.' },
    sections: [
      { from: u('2025/04/Smiling-Indian-Man-after-GFC-hair-therapy.jpg'), alt: 'A man smiling after a course of scalp treatment.' },
    ],
  },

  /* ---- International patients (Content-5, page 1) ------------------------- */

  'hair-transplant-medical-tourism-in-bangalore': {
    hero: { from: u('2025/05/NFT-Reception.jpeg'),
            alt: 'The reception area at Neo Follicle Hair Transplant Clinic, Bangalore.' },
    sections: [
      { from: u('2025/05/Consulting-Room-1.jpeg'), alt: 'A consulting room at Neo Follicle Hair Transplant Clinic, Bangalore.' },
      { from: u('2025/05/NFT-Procedure-Room-2.jpeg'), alt: 'A procedure room at Neo Follicle Hair Transplant Clinic, Bangalore.' },
    ],
  },

  /* ---- Conditions hub ----------------------------------------------------
     Not a treatment page and not from a brief -- hair-conditions-we-treat is
     the conditions INDEX, and it rides this pipeline because it renders the
     same TreatmentPageData. Sources are the eleven photographs the old page
     actually rendered, read out of
     neofollicle-seo-backup/pages/hair-conditions-we-treat/images.json. The
     page's other ~28 images are the header logo, the six SVG treatment icons
     and the why-choose icon set, none of which is a content photograph.

     `sections` is ordered to match the data module's section order, so the
     index into this array is the index down the page.                        */

  'hair-conditions-we-treat': {
    hero: { from: u('2025/05/Dr-Sandeep-Mahapatra-at-Neo-Follicle-Hair-Transplant-Clinic.jpg'),
            alt: 'Dr. Sandeep Mahapatra at Neo Follicle Hair Transplant Clinic, Bangalore.' },
    sections: [
      { from: u('2026/05/650-X-450-PX-IMAGE-WEBSITE-011-scaled.jpg'), alt: 'A scalp and hair density examination during a diagnostic consultation.' },
      { from: u('2026/05/NFT-Website-Images-2.png'), alt: 'Excessive hair shedding collected after washing.' },
      { from: u('2025/04/Alopecia-in-Men.jpg'), alt: 'A round patch of hair loss on the scalp, characteristic of alopecia areata.' },
      { from: u('2025/04/Woman-with-dandruff.jpg'), alt: 'A woman examining flaking and irritation on her scalp.' },
      { from: u('2026/05/NFT-Website-Images-3.png'), alt: 'A receding hairline with temple recession.' },
      { from: u('2026/05/NFT-Website-Images-4.png'), alt: 'Thinning at the crown with visible scalp.' },
      { from: u('2026/05/NFT-Website-Images-5.png'), alt: 'Uneven beard growth with gaps in density.' },
      { from: u('2025/04/Indian-woman-eyebrow-transplant.jpg'), alt: 'Eyebrow restoration planning for thin, over-plucked brows.' },
      { from: u('2026/05/NFT-Website-Images-6.png'), alt: 'An unnatural hairline from a previous hair transplant, before repair.' },
      { from: u('2026/05/NFT-Website-Images-7.png'), alt: 'Scalp micropigmentation creating the appearance of density on a close-shaved scalp.' },
      { from: u('2025/03/Indian-Man-with-Good-Hair-volume.jpg'), alt: 'A man with restored hair density after a personalised treatment plan.' },
    ],
  },
}
