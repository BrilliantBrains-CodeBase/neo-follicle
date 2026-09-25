// Which backup original backs each /image-gallery/ tile, and what it is called
// once served. Kept apart from gen-gallery-images.mjs so the content module and
// the generator cannot drift: the generator writes exactly these paths, and
// verify-gallery.mjs asserts the rendered page references every one of them.
//
// Same shape and same reasoning as treatment-assets.mjs -- the alt sits on the
// same line as its source, so the two can never mis-align. That matters more
// here: this file carries 82 entries, against treatment-assets.mjs's 40-odd.
//
// Sources and ORDER are the images the OLD page actually rendered, read out of
// neofollicle-seo-backup/pages/image-gallery/raw.html in DOM order. Section ids
// are NOT free: each one must equal the fragment of the matching
// ImageGallery.hasPart @id in src/seo/schema/image-gallery.json, because
// verify-gallery.mjs check 7 asserts the rendered <section id> and the graph
// agree. Do not rename one without the other.
//
// EVERY ALT HERE IS AUTHORED. The capture's own alt text is junk -- "Nft ht ba
// 13", "Female (10)", "82" -- and neofollicle-seo-backup/reports/seo-audit.md
// flags it on this page specifically. verify-gallery.mjs check 8 fails the
// build if a captured alt is ever pasted back in, so the junk cannot return by
// accident. Alts describe what is visible in the photograph and nothing more;
// where the "after" panel is the day of surgery rather than a grown-in result,
// the alt says so.
//
// `review: true` marks a section whose provenance or content is not clean.
// gen-gallery-images.mjs counts and prints those on every run. The marker
// string used in the comments below must never reach rendered HTML --
// verify-gallery.mjs check 10 fails the build if it does. These are notes to
// us, never to a patient.

/** Served path for a gallery tile. `variant` is 'thumb' or 'full'. */
export function galleryImagePath(sectionId, n, variant) {
  return `/image-gallery/${sectionId}/${String(n).padStart(2, '0')}-${variant}.webp`
}

/**
 * Served path for a locally-cached video poster.
 *
 * SHARED WITH src/components/PostProse.tsx, which inlines this same shape --
 * it is a .tsx and cannot import a Node script module. verify-gallery.mjs
 * check 14 asserts the two agree, so a change here that is not mirrored there
 * fails the build rather than shipping broken posters on ten blog posts.
 */
export function videoPosterPath(id) {
  return `/video-gallery/${id}.webp`
}

/**
 * A source captured from the old WordPress site, resolved out of
 * neofollicle-seo-backup/media/files/ by resolveUpload().
 */
const u = (p) => `wp-content/uploads/${p}`

/**
 * A source the client supplied directly, resolved from the repo root.
 *
 * The backup tree is a capture of the old site and nothing may be written into
 * it, so a fresh delivery cannot become a `from:`. Entries carry `file:`
 * instead and gen-gallery-images.mjs resolves them against the repo root.
 * Everything downstream -- served paths, derivatives, the generated module --
 * is identical either way.
 */
const f = (p) => `content/gallery/${p}`

/*
 * FLAGGED FOR CLIENT REVIEW -- applies to the whole gallery, raise before launch.
 *
 * 1. PATIENT CONSENT ON UNMASKED FACES -- largely resolved, 25 Sep 2026.
 *    TreatmentGallery.tsx notes that the eyebrow and GFC/PRP composites carry
 *    no eye bars. The real number was far higher: 21 of the hair transplant
 *    images (the R*_BF_* set) showed fully identifiable faces, front and
 *    profile. Those 21 have been REMOVED from this manifest and replaced with
 *    the client's masked delivery -- see the note on hair-transplant-results.
 *
 *    Why it mattered more here than on the home page: there those photos appear
 *    in a ~380px cover-cropped tile, whereas here a visitor can open any tile
 *    full-screen in the lightbox, deliberately, at up to 1200px.
 *
 *    Two things are still open. The eyebrow section's close crops of the eye
 *    region remain unmasked, and R7_BF_2 is still published at
 *    /blog/body/R7_BF_2.webp inside the hair-transplant-recovery-timeline post
 *    through a different pipeline entirely.
 *
 * 2. CLINIC SIGNAGE. TreatmentGallery.tsx reads the backdrop as "NEO FOLLICLE
 *    ... BHUBANESWAR" and flags it as the wrong city for this Bangalore site.
 *    Looking at the full-size files, the banner is a multi-city one reading
 *    BANGALORE COCHIN BHUBANESWAR -- Bangalore included, and first. The concern
 *    is milder than that note implies; worth correcting there.
 *
 * 3. "AFTER" PANELS THAT ARE THE DAY OF SURGERY. Several composites label a
 *    freshly-operated area "After": grafts, scabbing and a surgical cap are
 *    visible, which is a post-operative photo, not a result. They are marked
 *    inline below and their alts say so plainly. Under headings like "From
 *    Patchy to Powerful Beards" these read as the outcome, which they are not.
 *    Ask for grown-in replacements.
 */

export const GALLERY_SECTIONS = [
  {
    id: 'hair-transplant-results',
    /*
     * Twelve masked composites from the original capture, then seven the client
     * delivered in content/gallery/Zoho WorkDrive-8 on 25 Sep 2026. Every image
     * in this section now carries eye bars.
     *
     * THE 21 UNMASKED IMAGES THAT USED TO SIT HERE HAVE BEEN REMOVED. They were
     * seven patients photographed from three angles each -- R1, R2, R3, R4, R5,
     * R7 and R8 (the live page had no R6) -- shown front and profile with no
     * masking at all, and they are the set flagged in note 1 at the top of this
     * file. On a page where any tile opens full-screen in the lightbox at up to
     * 1200px, publishing identifiable patients without confirmed written
     * consent is not a risk worth carrying, and the client's new delivery is
     * masked throughout.
     *
     * To restore them if consent is confirmed, re-add these entries after
     * NFT-HT-BA-7 below, in this order, and write alts for them:
     *
     *   2025/05/R1_BF_1.jpg  2025/05/R1_BF_2.jpg  2025/05/R1_BF_3.jpg
     *   2025/06/R2_BF_1.png  2025/05/R2_BF_2.jpg  2025/05/R2_BF_3.jpg
     *   2025/05/R3_BF_3.jpg  2025/05/R3_BF_2.jpg  2025/05/R3_BF_1.jpg
     *   2025/05/R4_BF_3.jpg  2025/05/R4_BF_2.jpg  2025/05/R4_BF_1.jpg
     *   2025/05/R5_BF_3.jpg  2025/05/R5_BF_2.jpg  2025/05/R5_BF_1.jpg
     *   2025/05/R7_BF_3.jpg  2025/05/R7_BF_2.jpg  2025/05/R7_BF_1.jpg
     *   2025/05/R8_BF_3.jpg  2025/05/R8_BF_2.jpg  2025/05/R8_BF_1.jpg
     *
     * FLAGGED FOR CLIENT REVIEW: removing them here does NOT unpublish them.
     * R7_BF_2 is also served at /blog/body/R7_BF_2.webp inside the
     * hair-transplant-recovery-timeline post, through its own pipeline
     * (gen-blog-images.mjs) and its own manifest. If the consent question is
     * live, that one needs answering too.
     *
     * FLAGGED FOR CLIENT REVIEW: the delivery's 7.jpg is NOT included. Its
     * "Before" panel shows a fuller, styled hairline than its "After", which
     * shows short, sparse, newly-grown hair with the scalp visible -- so under
     * a "Results" heading it reads as hair loss. Either the two panels are
     * swapped or the "after" is an early post-operative stage. The poses differ
     * too much to tell from the file alone. Ask the client which, then either
     * swap the panels or request a later-stage photograph; adding
     * `{ file: f('Zoho WorkDrive-8/7.jpg'), alt: '...' }` below is all it takes.
     */
    images: [
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-1.jpg'), alt: 'Hair transplant before and after: a deeply receding hairline and thinning mid-scalp, then a rebuilt hairline with even density across the front.' },
      { from: u('2025/10/NFT-HT-BA-1.png'), alt: 'Hair transplant before and after: diffuse thinning through the frontal third, then thick dark hair covering the same area.' },
      { from: u('2025/10/NFT-HT-BA-13.png'), alt: 'Hair transplant before and after: a bare frontal scalp with hair remaining only at the sides, then a full restored hairline.' },
      { from: u('2025/10/NFT-HT-BA-12.png'), alt: 'Hair transplant before and after: receding temples either side of a thin central tuft, then a squared-off hairline with density restored at both corners.' },
      { from: u('2025/10/NFT-HT-BA-10.png'), alt: 'Hair transplant before and after: advanced frontal recession exposing the mid-scalp, then a straight, dense hairline.' },
      { from: u('2025/10/NFT-HT-BA-5.png'), alt: 'Hair transplant before and after: thinning across the front and crown, then restored coverage styled with a side parting.' },
      { from: u('2026/05/NFT-Website-Images-Before-After.png'), alt: 'Hair transplant before and after: hair loss at both frontal corners, then a rebuilt hairline framing the forehead evenly.' },
      { from: u('2025/10/NFT-HT-BA-2.png'), alt: 'Hair transplant before and after in an older patient: a bald frontal scalp, then a restored grey hairline matching the surrounding hair.' },
      { from: u('2025/10/NFT-HT-BA-6.png'), alt: 'Hair transplant before and after in an older patient: frontal recession and a thin crown, then restored white-grey coverage.' },
      { from: u('2025/03/NFT-Hair-Trnsplant-Before-After-Image-3.jpg'), alt: 'Hair transplant before and after: a high, receded hairline, then a lowered hairline with dense dark hair behind it.' },
      { from: u('2025/03/NFT-Hair-Transplant-Before-After-Images-2.jpg'), alt: 'Hair transplant before and after: heavy recession at the temples and front, then a full hairline with natural temple points.' },
      { from: u('2025/10/NFT-HT-BA-7.png'), alt: 'Hair transplant before and after viewed from above: a thin, see-through frontal scalp, then dense coverage over the same area.' },

      // Client delivery, 25 Sep 2026. Numbered as supplied; 7.jpg held back (see above).
      { file: f('Zoho WorkDrive-8/1.jpg'), alt: 'Hair transplant before and after, three-quarter view: a receded hairline with thinning above the temple, then restored density along the whole hairline.' },
      { file: f('Zoho WorkDrive-8/2.jpg'), alt: 'Hair transplant before and after, front view: recession at both temples leaving a narrow central tuft, then an even, fully restored hairline.' },
      { file: f('Zoho WorkDrive-8/3.png'), alt: 'Hair transplant before and after: extensive baldness across the front and mid-scalp with only a small forelock remaining, then thick hair with a rebuilt hairline.' },
      { file: f('Zoho WorkDrive-8/4.jpg'), alt: 'Hair transplant before and after, profile view: a bare frontal scalp above the temple, then restored hair framing the side of the hairline.' },
      { file: f('Zoho WorkDrive-8/5.jpg'), alt: 'Hair transplant before and after, front view: a receded hairline with sparse frontal hair, then a lowered hairline with visible density.' },
      { file: f('Zoho WorkDrive-8/6.jpg'), alt: 'Hair transplant before and after: diffuse thinning across the front and mid-scalp with the scalp showing through, then noticeably denser coverage.' },
      { file: f('Zoho WorkDrive-8/8.jpg'), alt: 'Hair transplant before and after seen from above: a thin, see-through frontal scalp, then thick dark hair covering the same area.' },
    ],
  },

  {
    id: 'beard-transplant-results',
    review: true,
    /*
     * FLAGGED FOR CLIENT REVIEW: the ten files named female*.png in this list
     * are NOT female patients. Every one shows a man with a patchy beard before
     * and a grown beard after -- they are beard transplants whose WordPress
     * filenames are simply wrong, and the live page places them correctly under
     * this heading. Do not "fix" this by moving them to Female Hair
     * Restoration; that would put ten photographs of men under a heading about
     * women. The separate female-*-1.png set, which IS female scalp work, sits
     * in female-hair-restoration below. Only the suffix tells them apart.
     *
     * FLAGGED FOR CLIENT REVIEW: entries 3, 5 and 15 label the day of surgery
     * "After" -- fresh grafts, scabbing and a theatre cap are visible. Entry 4's
     * "Before" is a scalp donor area mid-procedure, not a beard at all. See
     * note 3 at the top of this file; the alts below describe what is actually
     * in frame.
     */
    images: [
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-1.jpg'), alt: 'Beard transplant before and after three months: a patchy jawline with bare gaps along the cheek, then an even, connected beard.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-2.jpg'), alt: 'Beard transplant before and after: sparse growth over the cheek and jaw, then a denser beard with a defined cheek line.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-4.jpg'), alt: 'Beard transplant: a bare jawline before the procedure, then the same area immediately afterwards with the newly placed grafts still visible.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-3.jpg'), alt: 'Beard transplant: the scalp donor area during the procedure, then the grown-in beard the transplanted hair produced.' },
      { from: u('2025/03/NFT-Beard-Transplant-Before-After-5.jpg'), alt: 'Beard transplant: a sparse moustache and jawline before the procedure, then the same area immediately afterwards with grafts newly placed.' },

      { from: u('2026/05/female.png'), alt: 'Beard transplant before and after: a jawline marked out for grafting, then a full beard following the planned outline.' },
      { from: u('2026/05/female-1.png'), alt: 'Beard transplant before and after: patchy growth with bare areas under the chin, then a dense, even beard.' },
      { from: u('2026/05/female-2.png'), alt: 'Beard transplant before and after: an almost bare cheek and jaw, then thick beard coverage over the same area.' },
      { from: u('2026/05/female-3.png'), alt: 'Beard transplant before and after: thin, uneven growth along the cheek, then a full beard with a clean cheek line.' },
      { from: u('2026/05/female-4.png'), alt: 'Beard transplant before and after, front view: a sparse moustache and patchy chin, then connected, even facial hair.' },
      { from: u('2026/05/female-5.png'), alt: 'Beard transplant before and after in a younger patient: minimal growth on the cheek, then a dense, defined beard.' },
      { from: u('2026/05/female-6.png'), alt: 'Beard transplant before and after: light, wispy growth along the jaw, then a thick beard with a straight cheek line.' },
      { from: u('2026/05/female-7.png'), alt: 'Beard transplant before and after: bare patches through the cheek and jaw, then continuous beard coverage.' },
      { from: u('2026/05/female-8.png'), alt: 'Beard transplant before and after, front view: a thin moustache and sparse chin, then a full, framed beard.' },
      { from: u('2026/05/female-9.png'), alt: 'Beard transplant before and after: the jawline marked for grafting in theatre, then the grown-in beard along that line.' },
    ],
  },

  {
    id: 'failed-hair-transplant-repair',
    review: true,
    /*
     * FLAGGED FOR CLIENT REVIEW -- the most serious content problem on the page,
     * and the one TreatmentGallery.tsx already raises for the home page.
     *
     * None of these three is a repair RESULT. All three show damage from work
     * done ELSEWHERE, before any corrective procedure, with the clinic's own
     * assessment burned into the image ("Unnatural hairlines, very low density,
     * doll's hair appearance"; "Visible Scars. Pluggy Appearance"). The section
     * heading and lede promise repairs; the photographs show the problem.
     *
     * Three consequences, all handled below:
     *   - the alts say plainly that this is the state BEFORE corrective work,
     *   - each carries a visible `caption` as well, because in a full-screen
     *     lightbox the burned-in text dominates and alt text is invisible to a
     *     sighted visitor,
     *   - the section lede in src/content/gallery/image-gallery.ts is written to
     *     describe what these show rather than claim a result.
     *
     * Entries 1 and 3 are the SAME two photographs of the same patient; 3 has
     * eye bars added and 1 does not. Kept as captured, but if only one ships it
     * should be 3, the masked one. Ask the client for a genuine repair
     * before/after to replace all of this.
     */
    images: [
      {
        from: u('2025/04/Failed-Hair-Transplant-1.jpg'),
        alt: 'A hair transplant performed at another clinic, shown before corrective work: an unnatural hairline with very low density and a pluggy, doll-like appearance.',
        caption: 'Work performed elsewhere, photographed before corrective treatment at Neo Follicle.',
      },
      {
        from: u('2025/04/Failed-Hair-Transplant-2.jpg'),
        alt: 'The back of the scalp after a hair transplant performed at another clinic, before corrective work: a band of visible donor-area scarring across the back of the head.',
        caption: 'Work performed elsewhere, photographed before corrective treatment at Neo Follicle.',
      },
      {
        from: u('2025/04/Failed-Hair-Tansplant-3.jpg'),
        alt: 'The same unnatural, low-density hairline from a transplant performed at another clinic, shown before corrective work.',
        caption: 'Work performed elsewhere, photographed before corrective treatment at Neo Follicle.',
      },
    ],
  },

  {
    id: 'female-hair-restoration',
    /*
     * The female-*-1.png set -- female scalp work. Not to be confused with the
     * female*.png set under beard-transplant-results, which are men. The `-1`
     * suffix is the only thing that separates them; TreatmentGallery.tsx notes
     * the same trap.
     *
     * FLAGGED FOR CLIENT REVIEW: entry 12 labels a freshly-closed hairline
     * incision "After" -- see note 3 at the top of this file.
     */
    images: [
      { from: u('2026/05/female-10-1.png'), alt: 'Female hair restoration before and after seen from above: a widening centre parting with visible scalp, then denser hair closing the parting.' },
      { from: u('2026/05/female-11.png'), alt: 'Female hair restoration before and after: extensive thinning over the crown with the scalp clearly visible, then regrown coverage across the same area.' },
      { from: u('2026/05/female-12.png'), alt: 'Female hair restoration before and after, front view: a sparse frontal hairline set high on the forehead, then a fuller, lower hairline.' },
      { from: u('2026/05/female-2-1.png'), alt: 'Female hair restoration before and after, profile view: recession at the temple with bare skin showing, then restored hair along the same edge.' },
      { from: u('2026/05/female-3-1.png'), alt: 'Female hair restoration before and after seen from above: a thin, receded frontal hairline, then dense curly hair brought forward.' },
      { from: u('2026/05/female-4-1.png'), alt: 'Female hair restoration before and after, profile view: a sparse temple and thin hairline, then fuller coverage framing the face.' },
      { from: u('2026/05/female-5-1.png'), alt: 'Female hair restoration before and after: a high hairline with fine, sparse hair at the front, then a lowered hairline with visible density.' },
      { from: u('2026/05/female-6-1.png'), alt: 'Female hair restoration before and after: a widening parting with thinning along the temple, then thicker hair over the same area.' },
      { from: u('2026/05/female-7-1.png'), alt: 'Female hair restoration: the planned hairline drawn onto a receded frontal scalp, then the restored hairline following that design.' },
      { from: u('2026/05/female-8-1.png'), alt: 'Female hair restoration before and after, front view: a high, thin frontal hairline, then a lowered hairline with fuller density.' },
      { from: u('2026/05/female-9-1.png'), alt: 'Female hair restoration before and after seen from above: a wide centre parting through thinning hair, then a narrower parting with denser hair either side.' },
      { from: u('2026/05/female-12-1.png'), alt: 'Female hairline restoration: a high hairline before the procedure, then the newly lowered hairline immediately afterwards, with the fresh incision line still visible.' },
    ],
  },

  {
    id: 'eyebrow-transplant-results',
    /*
     * TreatmentGallery.tsx flags 82/83/84.png and the NFT-Website-Images-* pair
     * as unclear provenance because the filenames assert nothing. Having looked
     * at them: all five are genuine eyebrow before/afters, consistent with the
     * four properly-named files beside them. The provenance concern can be
     * closed. What remains is note 1 -- these are close crops of the eye
     * region with no masking at all.
     *
     * FLAGGED FOR CLIENT REVIEW: entry 7 labels the day of surgery "After" --
     * the grafts and scabbing along the brow are still visible.
     */
    images: [
      { from: u('2025/04/NFT-Eyebrow-Before-After-1.jpg'), alt: 'Eyebrow transplant before and after: thin, patchy brows with gaps through the body, then full, evenly shaped brows.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-2.jpg'), alt: 'Eyebrow transplant before and after: sparse, faint brows, then dense, clearly defined brows with a natural arch.' },
      { from: u('2026/05/NFT-Website-Images-2-1.png'), alt: 'Eyebrow transplant before and after: thin, over-plucked brows tapering away at the outer ends, then full brows carried through to the tail.' },
      { from: u('2025/04/NFT-Eyebrow-Before-After-3.jpg'), alt: 'Eyebrow transplant before and after: light, wispy brows with little definition, then dark, thick brows with a defined outline.' },
      { from: u('2026/05/NFT-Website-Images-8.png'), alt: 'Eyebrow transplant before and after, close view of one brow: sparse hair along a thin brow line, then a full, shaped brow.' },
      { from: u('2026/05/84.png'), alt: 'Eyebrow transplant before and after in a male patient: thin, sparse brows, then fuller brows with a defined upper edge.' },
      { from: u('2026/05/83.png'), alt: 'Eyebrow transplant: sparse brows before the procedure, then the same brows immediately afterwards with the newly placed grafts still visible.' },
      { from: u('2026/05/82.png'), alt: 'Eyebrow transplant before and after: a thin, sharply arched brow line, then full, softly shaped brows.' },
    ],
  },

  {
    id: 'gfc-prp-therapy-results',
    /*
     * FLAGGED FOR CLIENT REVIEW: entry 2 carries a "PIC·COLLAGE" watermark
     * burned into the composite. Ask for a clean export.
     */
    images: [
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-1.jpg'), alt: 'GFC therapy before and after seen from above: a wide centre parting with scalp showing through, then thicker hair narrowing the same parting.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-2.jpg'), alt: 'GFC therapy before and after: diffuse thinning across the top of the scalp, then denser, darker coverage over the same area.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-3.jpg'), alt: 'GFC therapy before and after: distinct bare patches through the hair, then regrowth filling those patches in.' },
      { from: u('2025/04/NFT-GFC-Therapy-Before-After-4.jpg'), alt: 'GFC therapy before and after seen from above: a thinning crown with the scalp visible, then fuller hair covering it.' },
    ],
  },

  {
    id: 'exosome-therapy-results',
    images: [
      { from: u('2025/04/exosome-before-after-3.jpg'), alt: 'Exosome therapy before and after, profile view: thinning through the temple and front with the scalp showing, then noticeably fuller hair.' },
      { from: u('2025/04/exosome-before-after-2.jpg'), alt: 'Exosome therapy before and after seen from above: diffuse thinning across the crown, then denser hair over the same area.' },
      { from: u('2025/04/exosome-before-after-1.jpg'), alt: 'Exosome therapy before and after, profile view: a receded temple and sparse frontal hair, then improved density along the hairline.' },
    ],
  },

  {
    id: 'scalp-micropigmentation-results',
    review: true,
    /*
     * FLAGGED FOR CLIENT REVIEW: entries 3 and 4 read as hair regrowth rather
     * than pigmentation -- the "after" shows longer, denser hair, not the
     * stippled shading micropigmentation produces. Confirm all four are
     * genuinely SMP cases before publishing them under this heading. The alts
     * below describe the visible change without naming a mechanism.
     */
    images: [
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-1.jpg'), alt: 'Scalp micropigmentation before and after, back of the head: a thinning crown with the scalp showing through short hair, then an even, solid appearance of density.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-2.jpg'), alt: 'Scalp micropigmentation before and after, back of the head: patchy coverage through closely cropped hair, then a uniform hairline and even shading.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-3.jpg'), alt: 'Before and after over the crown: a wide thinning area with the scalp clearly visible, then noticeably fuller coverage.' },
      { from: u('2025/04/Scalp-Micropigmentation-Before-After-4.jpg'), alt: 'Before and after over the crown: scattered bare areas through the hair, then denser, more even coverage.' },
    ],
  },
]

/*
 * /video-gallery/ -- the 45 YouTube videos the old page embedded, in DOM order,
 * grouped by its four <h2> sections.
 *
 * Read out of neofollicle-seo-backup/pages/video-gallery/raw.html. That page
 * holds 49 <lite-youtube> elements but only 45 unique ids: 4e_tF_c8I-Y appears
 * twice, TSYByA6tBns three times and SV78Pjiw4Hk twice. The duplicates are
 * dropped here -- rendering the same video twice on one page was a mistake, not
 * a feature.
 *
 * Section ids must equal the VideoGallery.hasPart @id fragments in
 * src/seo/schema/video-gallery.json, as with the image sections above. Note the
 * graph lists its parts in a different order than the page renders them
 * (journeys first in the graph, education first on the page); hasPart is a set,
 * not a sequence, so only the ids have to exist.
 *
 * There are NO TITLES here on purpose. The capture has none -- every
 * <lite-youtube> carries title="" -- so gen-video-gallery.mjs fetches each
 * video's real title from YouTube's oEmbed endpoint and writes it into
 * src/content/gallery/video-gallery.generated.ts, which is committed. A tile
 * with no title would be a link with no accessible name, so verify-gallery.mjs
 * check 12 fails the build on any empty title.
 */
export const VIDEO_SECTIONS = [
  {
    id: 'hair-transplant-education',
    ids: [
      '7kgXnDopoxA', 'ghHFMtUGbAQ', 'N0KVCpXKNAw', '4e_tF_c8I-Y', 'BaLlkTSgBvw',
      'NuNyAdkIX8o', 'cr0fXLJ4wYI', 'nUylFcLqcSQ', 'TSYByA6tBns', 'bFgicCF2tqc',
      '5_nhQ2JbFOI', 'SV78Pjiw4Hk', 'xIMH6veHZ0Y', '2dOKyHO9REc', 'WcWEpv3SfQk',
    ],
  },
  {
    id: 'hair-transplant-journeys',
    ids: [
      'eAT_93p1-t8', '07BRcWYxO-s', 'T4TSLQGjI-0', '87j1PurAKz0', '7rvCfrBbbkI',
      'or70tASidzQ', 'Fs5Z4K7Mqog', 'e5l-zaY6y4Y', 'QnkL3BO1BXI', '2VBkSwvI8tU',
    ],
  },
  {
    id: 'hair-transplant-testimonials',
    ids: [
      'xMYHaZRt1uY', 'lZiQuZgAWcM', 'LltF5HEgo5o', '6_spuvGGnkw', 'it3xRyWOzKo',
      'c5SZ2NPYFCQ', 'RD9UNdMESlw', 'TDr10zDpXOY', 'MkWEjSM6O9g', '6KrBSviuSlY',
    ],
  },
  {
    id: 'non-surgical-hair-loss-treatments',
    ids: [
      'sOVfxaZKPsM', 'PI8wkQHNTWU', 'KqaS1sV99Xg', 'rn-2r6Abrbs', '8HHSSOUdnQk',
      'Ug5cJwbZAMY', 'iFLKI9JojSQ', 'hhzqfiAucBM', 't7SrbfJbDc4', 'n2r4sGCmBHQ',
    ],
  },
]
