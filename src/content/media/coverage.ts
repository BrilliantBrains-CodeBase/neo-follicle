import { CLIPPINGS } from './clippings.generated'
import type { MediaItem, MediaOutlet } from './types'

/**
 * Dr Sandeep Mahapatra's media coverage, May to August 2026.
 *
 * Source: the Neo Follicle Media Coverage Report (v2), which lists 27
 * placements. Every URL here came out of that PDF's own link annotations, so
 * none of them was retyped. Titles are the publications' own headlines as the
 * report gives them; the two exceptions are marked below.
 *
 * 27 PLACEMENTS, 18 ENTRIES. Ten of the 27 are one ANI release -- "Bengaluru
 * sees rising demand for hair restoration" -- picked up by ANI, The Tribune,
 * ThePrint, Business Standard, Latestly, Medicircle, Editorji, BigNewsNetwork,
 * Newswav and East Coast American News between 22 and 24 June. Listing those
 * as ten rows puts the same headline down a column ten times, which reads as
 * padding. They are one entry with ten outlet links instead: see SYNDICATION.
 *
 * Newest first. scripts/verify-media.mjs checks the invariants -- every entry
 * links or has a clipping, no URL appears twice, every clipping asset exists.
 *
 * NOT LINKED WITH rel="nofollow". These are citations of coverage, not paid
 * links being passed off as editorial, and Google's paid-link policy concerns
 * links *into* a site rather than a site's own references outward.
 */

/**
 * The ten outlets that ran the ANI release, in the order the report lists them.
 * ANI itself is the entry's own `href`, as the wire that originated it.
 */
const SYNDICATION: MediaOutlet[] = [
  {
    name: 'The Tribune',
    href: 'https://www.tribuneindia.com/news/business/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants/',
  },
  {
    name: 'ThePrint',
    href: 'https://theprint.in/ani-press-releases/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants/2966415/',
  },
  {
    name: 'Business Standard',
    href: 'https://www.business-standard.com/content/press-releases-ani/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10-000-hair-transplants-126062200400_1.html',
  },
  {
    name: 'Latestly',
    href: 'https://www.latestly.com/agency-news/business-news-bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants-7484437.html',
  },
  {
    name: 'Medicircle',
    href: 'https://medicircle.in/neo-follicle-hair-transplant-crosses-10000-hair-transplant-procedures-and-60000-advanced-tricho-treatments',
  },
  {
    name: 'Editorji',
    href: 'https://www.editorji.com/business-news/hair-solutions-in-bengaluru-neo-follicles-impact-1782110733809',
  },
  {
    name: 'BigNewsNetwork',
    href: 'https://www.bignewsnetwork.com/news/279139005/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants',
  },
  {
    name: 'Newswav',
    href: 'https://newswav.com/article/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10-0-A2606_rFYMHl',
  },
  {
    name: 'East Coast American News',
    href: 'https://www.eastcoastamericannews.com/news/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants20260622120718/',
  },
]

export const MEDIA_COVERAGE: MediaItem[] = [
  /* ---- August 2026 --------------------------------------------------------- */
  {
    date: '2026-08-06',
    publication: 'OnlyMyHealth',
    kind: 'Trend Story',
    title: 'Crocodile dung on face: ancient Greeks used it for glowing skin',
    href: 'https://www.onlymyhealth.com/crocodile-dung-on-face-ancient-greeks-used-for-glowing-skin-12977849365',
  },
  {
    date: '2026-08-04',
    publication: 'Happiest Health',
    kind: 'Expert Interview',
    // AUTHORED TITLE. The report's row reads only "Expert Interview - Digital
    // and Print Edition"; this is the printed feature's own headline, read off
    // the clipping.
    title: "Aiming for a 'clear' verdict: a dermatologist reviews AI skin analysis",
    clipping: {
      ...CLIPPINGS['happiest-health-2026-08'],
      alt: 'Happiest Health magazine, August 2026, page 74 -- a dermatologist reviews an AI skin analysis, with comments from Dr Sandeep Mahapatra',
      caption:
        'Happiest Health, August 2026, page 74. Dr Sandeep Mahapatra reviews an AI skincare verdict, noting that skin type, hydration, pores and pigmentation cannot be assessed accurately from a single photograph, and that a diagnosis comes before a treatment plan.',
    },
  },

  /* ---- July 2026 ----------------------------------------------------------- */
  {
    date: '2026-07-31',
    publication: 'OnlyMyHealth',
    kind: 'Expert Commentary',
    title: 'Hair breakage vs hair loss: dermatologist explains the difference',
    href: 'https://www.onlymyhealth.com/hair-breakage-vs-hair-loss-dermatologist-explains-difference-and-how-to-tell-them-apart-12977848657',
  },
  {
    date: '2026-07-31',
    publication: 'OnlyMyHealth',
    kind: 'Expert Commentary',
    title: 'Does hair fall increase in monsoon? Expert tips to protect hair',
    href: 'https://www.onlymyhealth.com/does-hair-fall-increase-in-monsoon-expert-tips-to-protect-hair-12977848823',
  },
  {
    date: '2026-07-30',
    publication: 'OnlyMyHealth',
    kind: 'Expert Commentary',
    title: 'Does cancer treatment differ by age? Explains oncologist',
    href: 'https://www.onlymyhealth.com/does-cancer-treatment-differ-by-age-explains-oncologist-12977848843',
  },
  {
    date: '2026-07-30',
    publication: 'OnlyMyHealth',
    kind: 'Expert Commentary',
    title: 'Can applying rosemary oil promote hair regrowth? Dermatologist explains',
    href: 'https://www.onlymyhealth.com/can-applying-rosemary-oil-promote-hair-regrowth-dermatologist-explains-12977848659',
  },
  {
    date: '2026-07-30',
    publication: 'OnlyMyHealth',
    kind: 'Expert Commentary',
    title: 'Do tanning-removal soaps really work? Expert explains who should avoid them',
    href: 'https://www.onlymyhealth.com/do-tanning-removal-soaps-really-work-expert-explains-who-should-avoid-them-12977848642',
  },
  {
    date: '2026-07-29',
    publication: 'OnlyMyHealth',
    kind: 'Expert Commentary',
    title: 'Minoxidil for postpartum hair loss: dermatologist shares timeline and alternatives',
    href: 'https://www.onlymyhealth.com/minoxidil-for-postpartum-hair-loss-dermatologist-shares-timeline-and-alternative-12977849211',
  },
  {
    date: '2026-07-14',
    publication: 'Femina',
    kind: 'Expert Interview',
    title: 'Why ceramides deserve a spot in your skincare routine if you have active breakouts',
    href: 'https://www.femina.in/beauty/skin/why-ceramides-deserve-a-spot-in-your-skincare-routine-if-you-have-active-breakouts-290706.html',
  },
  {
    date: '2026-07-07',
    publication: 'Docthub',
    kind: 'Feature',
    title: "Doctors' Day: more than restoring hair, we restore hope",
    href: 'https://news.docthub.com/doctors-day-more-than-restoring-hair-we-restore-hope-N2018',
  },
  {
    date: '2026-07-07',
    publication: 'TheHealthSite Hindi',
    kind: 'Expert Commentary',
    title: 'Can patients with diabetes and high blood pressure undergo a hair transplant?',
    href: 'https://www.thehealthsite.com/hindi/diseases-conditions/can-patients-with-diabetes-and-high-blood-pressure-undergo-a-hair-transplant-in-hindi-1331986/',
  },

  /* ---- June 2026 ----------------------------------------------------------- */
  {
    date: '2026-06-30',
    publication: 'News18',
    kind: 'Exclusive Article',
    title: 'Can distilled water cause hair fall? A hair transplant surgeon busts the viral hair care myth',
    href: 'https://www.news18.com/lifestyle/beauty/can-distilled-water-cause-hair-fall-a-hair-transplant-surgeon-busts-the-viral-hair-care-myth-10181023.html',
  },
  {
    date: '2026-06-22',
    publication: 'ANI',
    kind: 'Press Coverage',
    title: 'Bengaluru sees rising demand for hair restoration: Neo Follicle crosses 10,000 hair transplants',
    href: 'https://aninews.in/news/business/bengaluru-sees-rising-demand-for-hair-restoration-neo-follicle-crosses-10000-hair-transplants20260622120723/',
    syndicatedTo: SYNDICATION,
  },
  {
    date: '2026-06-20',
    publication: 'eSanje',
    kind: 'Press Coverage',
    // AUTHORED TITLE. The report's row reads only "Press release coverage".
    // This renders the Kannada headline, which the clipping's caption expands.
    title: 'Hair loss: milestones in tricho treatment (Kannada, print)',
    clipping: {
      ...CLIPPINGS['esanje-2026-06-20'],
      alt: 'eSanje Kannada daily, Bengaluru edition, 20 June 2026, page 9 -- print coverage of Neo Follicle crossing 10,000 hair transplants',
      caption:
        'eSanje, Bengaluru edition, 20 June 2026, page 9. The Kannada report covers Neo Follicle crossing 10,000 hair transplant procedures and 60,000 advanced tricho treatments, quoting Dr Sandeep Mahapatra that hair restoration today is not only about appearance but about confidence and overall health, delivered through safe, modern and individualised care.',
    },
  },
  {
    date: '2026-06-01',
    publication: 'TALRadio',
    kind: 'Podcast',
    title: 'Hair, Skin and Confidence',
    href: 'https://podcasts.apple.com/in/podcast/talradio/id1536694804?i=1000770572022',
  },

  /* ---- May 2026 ------------------------------------------------------------ */
  {
    date: '2026-05-29',
    publication: 'TheHealthSite Hindi',
    kind: 'Authored Article',
    title: 'Summer sunlight can damage not only the skin but also the scalp',
    href: 'https://www.thehealthsite.com/hindi/beauty/summer-sunlight-can-damage-not-only-the-skin-but-also-the-scalp-know-what-to-do-in-hindi-1326866/',
  },
  {
    date: '2026-05-28',
    publication: 'Sugermint',
    kind: 'Authored Article',
    title: 'Modern hair transplant technologies',
    href: 'https://sugermint.com/modern-hair-transplant-technologies/',
  },
  {
    date: '2026-05-23',
    publication: 'PharmaBiz',
    kind: 'Authored Article',
    title: 'Modern hair restoration and hair transplant technologies',
    href: 'https://pharmabiz.com/NewsDetails.aspx?aid=186080&sid=1',
  },
]
