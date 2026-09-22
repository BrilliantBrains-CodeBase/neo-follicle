// Which backup original backs each treatment-page image, and what it is called
// once served. Kept apart from gen-treatment-images.mjs so the data modules in
// src/content/treatments/ and the generator cannot drift: the generator writes
// exactly these paths, and `npm run verify:treatmentimg` asserts they exist.
//
// TWO KINDS OF SOURCE, and the split is deliberate:
//
//   `local`  a file committed under content/. Every treatment HERO is one of
//            these: the client-supplied illustration set in
//            content/Zoho WorkDrive-3/, one per mega-menu entry. It replaced the
//            heroes first picked from the old site, which were stock portraits
//            reused across pages (one man appeared as the hero of three
//            different treatments) and did not depict the treatment. They look
//            AI-generated -- garbled printed text, invented product labels --
//            so alt text describes what is drawn and claims no result.
//
//   `from`   an image the OLD page actually rendered, read out of
//            neofollicle-seo-backup/pages/<slug>/images.json. Every BEFORE/AFTER
//            `results` set stays on this path: those are the clinic's real
//            patient photographs, which a generated illustration must never
//            stand in for. The conditions index also stays here -- it needs a
//            photograph per condition, and the illustration set is per treatment.
//
// Nothing comes from the briefs -- four of the five images embedded in
// content/treatments/Neo Follicle Website Content-3.md are third-party
// screenshots (two are captioned "Hairfree & Hairgrow Clinic", a competitor),
// so the briefs are treated as copy only.
//
// `review: true` marks a set whose provenance is not clean. See the note on
// female below. Those render behind a FLAGGED FOR CLIENT REVIEW comment at the
// call site, the convention DoctorApproach.tsx already uses.

/** Served path for a treatment image. */
export function treatmentImagePath(slug, name) {
  return `/treatments/${slug}/${name}.webp`
}

const u = (p) => `wp-content/uploads/${p}`

/** A file in the client's illustration set. Committed, so the generator is reproducible. */
const z = (f) => `content/Zoho WorkDrive-3/${f}`

export const TREATMENT_IMAGES = {
  'best-hair-transplant-in-bangalore': {
    hero: { local: z('Direct Hair Transplant in Bangalore.png'),
            alt: 'A surgeon in magnifying loupes implanting grafts along a reclining patient’s hairline in a clinic procedure room.' },
    results: [
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-1.jpg'), alt: 'Before and after a direct hair transplant at Neo Follicle.' },
      { from: u('2025/03/NFT-Hair-Transplant-Before-After-Images-2.jpg'), alt: 'Before and after hairline restoration at Neo Follicle.' },
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-3.jpg'), alt: 'Before and after crown density restoration at Neo Follicle.' },
    ],
  },

  'hair-transplant-for-men-in-bangalore': {
    hero: { local: z('Direct Hair Transplant For Male.png'),
            alt: 'A surgeon in loupes placing grafts along a reclining man’s hairline, with a scalp image on the monitor behind.' },
    results: [
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-1.jpg'), alt: 'Before and after a hair transplant for a receding hairline.' },
      { from: u('2025/03/NFT-Hair-Transplant-Before-After-Images-2.jpg'), alt: 'Before and after frontal density restoration in a male patient.' },
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-3.jpg'), alt: 'Before and after crown restoration in a male patient.' },
    ],
  },

  'hair-transplant-cost-in-bangalore': {
    hero: { local: z('Cost of Hair Transplant - Bangalore.png'),
            // CROPPED, the one crop in this file. The frame's bottom third holds a
            // cheque with real bank logos and the start of ANOTHER clinic's name, a
            // calculator reading a specific price, and invoice line items. That is a
            // price on the page whose message is that cost is not one number, plus
            // third-party marks. Keeping the top 66% keeps the hand, the rupee notes
            // and the procedure room, and drops all of it. Source is untouched.
            crop: { left: 0, top: 0, width: 3375, height: 2227 },
            alt: 'A hand holding Indian rupee notes in front of a blurred procedure room, with an invoice on the desk.' },
    // One only. The cost brief has no before/after section -- it is a text and
    // table page, as the old one was -- so this single image sits beside the
    // "How We Estimate Cost" list. A second would be an orphan; see
    // verify-treatments.mjs check 4.
    results: [
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-1.jpg'), alt: 'Before and after a hair transplant at Neo Follicle.' },
    ],
  },

  'female-hair-transplant-in-bangalore': {
    hero: { local: z('Hair Transplant For Female.png'),
            alt: 'A surgeon in loupes placing grafts along a reclining woman’s hairline.' },
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
    hero: { local: z('Failed Hair Transplant Repair.png'),
            alt: 'A surgeon in loupes working along a reclining patient’s freshly marked hairline.' },
    results: [
      { from: u('2025/04/Failed-Hair-Transplant-2.jpg'), alt: 'A previous hair transplant showing poor density before corrective planning.' },
      { from: u('2025/04/Failed-Hair-Tansplant-3.jpg'), alt: 'An unnatural hairline from an earlier transplant, assessed before repair.' },
    ],
  },

  'beard-transplant-in-bangalore': {
    hero: { local: z('Beard Transplant.png'),
            alt: 'A man reclining in a treatment chair while a clinician marks a beard line along his jaw.' },
    results: [
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-1.jpg'), alt: 'Before and after a beard transplant at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-2.jpg'), alt: 'Before and after patchy beard correction at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-3.jpg'), alt: 'Before and after moustache and goatee restoration at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-4.jpg'), alt: 'Before and after beard density restoration at Neo Follicle.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-5.jpg'), alt: 'Before and after facial hair restoration at Neo Follicle.' },
    ],
  },

  'eyebrow-restoration-in-bangalore': {
    hero: { local: z('Eyebrow Restoration.png'),
            alt: 'A woman with defined eyebrows beside close-up insets of an eyebrow being treated.' },
    results: [
      { from: u('2025/04/NFT-Eyebrow-Before-After-1.jpg'), alt: 'Before and after eyebrow restoration at Neo Follicle.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-2.jpg'), alt: 'Before and after restoring over-plucked eyebrows at Neo Follicle.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-3.jpg'), alt: 'Before and after eyebrow density restoration at Neo Follicle.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-4.jpg'), alt: 'Before and after eyebrow shaping and restoration at Neo Follicle.' },
    ],
  },

  'celebrity-hair-transplant': {
    hero: { local: z('Celebrity Hair Transplants.png'),
            alt: 'A montage of well-groomed men with full, styled hair, with an inset showing the back of a head before and after treatment.' },
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
    hero: { local: z('Unshaven Hair Transplant.png'),
            alt: 'A man with a full, styled hairstyle looking down, beside inset close-ups of a hairline and a scalp being examined.' },
    results: [
      { from: u('2025/05/Unshaven-Before-After-1.jpg'), alt: 'Before and after an unshaven hair transplant at Neo Follicle.' },
      { from: u('2025/05/Unshaven-Before-After-2.jpg'), alt: 'Before and after unshaven hairline restoration at Neo Follicle.' },
      { from: u('2025/05/Unshaven-Before-After-3.jpg'), alt: 'Before and after an unshaven procedure with minimal visible change.' },
      { from: u('2025/05/Unshaven-Before-After-15-Days.jpg'), alt: 'An unshaven hair transplant fifteen days after the procedure.' },
    ],
  },

  'body-hair-transplant': {
    hero: { local: z('Body Hair Transplant.png'),
            alt: 'A man with body hair, beside inset close-ups of a body donor area being assessed.' },
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
    hero: { local: z('Neo-Follicle Stem Cell Therapy.png'),
            alt: 'A clinician injecting a reclining man’s scalp, with inset illustrations of stem cells and a hair follicle.' },
  },

  'best-prp-hair-treatment-in-bangalore': {
    hero: { local: z('PRP Hair Loss Treatment.png'),
            alt: 'A clinician injecting a reclining man’s scalp, with an inset showing a blood sample separated into platelet-rich plasma.' },
  },

  'gfc-hair-treatment-in-bangalore': {
    hero: { local: z('Growth Factor Concentrate (GFC).png'),
            alt: 'A clinician injecting a reclining man’s scalp, with insets of a blood sample tube and a hair follicle.' },
    results: [
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-1.jpg'), alt: 'Before and after GFC hair therapy at Neo Follicle.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-2.jpg'), alt: 'Before and after GFC therapy showing improved density at Neo Follicle.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-3.jpg'), alt: 'Before and after GFC therapy across the crown at Neo Follicle.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-4.jpg'), alt: 'Before and after GFC therapy along the hairline at Neo Follicle.' },
    ],
  },

  'qr678-hair-treatment-in-bangalore': {
    hero: { local: z('Neo QR678 Treatment.png'),
            alt: 'A clinician injecting a reclining man’s scalp, with an inset of a vial of QR678.' },
  },

  'exosome-hair-treatment-in-bangalore': {
    hero: { local: z('Exosome Therapy.png'),
            alt: 'A clinician treating a reclining man’s scalp, with an Exosome Therapy vial and box on the tray beside him.' },
    results: [
      { from: u('2025/04/exosome-before-after-1.jpg'), alt: 'Before and after exosome therapy at Neo Follicle.' },
      { from: u('2025/04/exosome-before-after-2.jpg'), alt: 'Before and after exosome therapy showing improved density at Neo Follicle.' },
      { from: u('2025/04/exosome-before-after-3.jpg'), alt: 'Before and after exosome therapy across the crown at Neo Follicle.' },
    ],
  },

  'dutexome-hair-treatment-in-bangalore': {
    // No old-site page or client-supplied treatment photograph exists for this
    // new service. This source was generated specifically for the page, with
    // no product label, logo, outcome claim or invented clinic signage.
    hero: { local: 'content/treatments/images/dutexome-hero.png',
            alt: 'A clinician using a microneedling pen on the thinning scalp of a reclining patient in a dermatology clinic.' },
  },

  'low-level-laser-therapy': {
    hero: { local: z('Low Level Laser Hair Therapy.png'),
            alt: 'A reclining man having his scalp treated under a red-light therapy device.' },
  },

  'scalp-micropigmentation-in-bangalore': {
    hero: { local: z('Scalp Hair Micro-pigmentation (MPG).png'),
            alt: 'A man with a closely shaved head while a technician applies scalp micropigmentation with a fine pen.' },
    results: [
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-1.jpg'), alt: 'Before and after scalp micropigmentation at Neo Follicle.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-2.jpg'), alt: 'Before and after scalp micropigmentation across the crown at Neo Follicle.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-3.jpg'), alt: 'Before and after scalp micropigmentation along the hairline at Neo Follicle.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-4.jpg'), alt: 'Before and after scalp micropigmentation showing denser coverage at Neo Follicle.' },
    ],
  },

  'alopecia-areata-treatment-in-bangalore': {
    hero: { local: z('Alopecia Treatment.png'),
            alt: 'A clinician injecting the thinning crown of a seated man.' },
  },

  'dandruff-treatment-in-bangalore': {
    // FLAGGED FOR CLIENT REVIEW. The illustration set has no Dandruff Solutions
    // image (19 files for 20 mega-menu entries), so this page keeps the old-site
    // hero it had. It is the only treatment page still on one.
    hero: { from: u('2025/04/Woman-with-dandruff.jpg'),
            alt: 'A woman examining flaking on her scalp.' },
  },

  /* ---- International patients (Content-5, page 1) ------------------------- */

  'hair-transplant-medical-tourism-in-bangalore': {
    hero: { local: z('Hair Transplant Medical Tourism.png'),
            alt: 'A traveller holding a passport and boarding pass in an airport departures hall, with Bangalore and a clinical procedure shown alongside.' },
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
