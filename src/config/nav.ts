/**
 * Header and footer navigation.
 *
 * Reproduced from the live header/footer markup in
 * neofollicle-seo-backup/pages/home/raw.html. Labels and order are the
 * original's, not rewritten -- the mega-menu is what carries link equity to
 * ~54 of the 59 pages, so its shape is an SEO asset.
 */
import { SITE } from '../seo/site'

/**
 * The section holding the blog and the press coverage.
 *
 * This is the DROPDOWN's label, not any one page's name -- the section spans
 * two URLs. The ampersand is load-bearing: spelled "and", the extra width plus
 * the dropdown's chevron wraps the header nav onto a second line at every
 * desktop width from 1240px up, taking the bar from 97px to 109px. Measured.
 * That 97px is also the offset STICKY_BELOW_HEADER pins against.
 *
 * NEITHER URL CHANGES. /our-blogs/ is in 01-SEO-MASTER.csv and in the sitemap,
 * so renaming the path would force a redirect and is P0-PRESERVE.
 * /media-coverage/ postdates the capture and is authored in
 * content/seo/media-coverage.json.
 */
export const BLOG_SECTION = 'Media & Blogs'

/** The blog listing. Its own name, since the section no longer means just it. */
export const BLOG_LABEL = 'Blogs'
export const BLOG_SECTION_PATH = '/our-blogs/'

/** The section's other page: third-party coverage. */
export const PRESS_LABEL = 'In the Press'
export const PRESS_PATH = '/media-coverage/'

export type NavLink = { label: string; to: string }
export type NavColumn = { title: string | null; links: NavLink[] }
export type NavItem =
  | { kind: 'link'; label: string; to: string }
  | { kind: 'dropdown'; label: string; columns: NavColumn[] }

export const headerNav: NavItem[] = [
  { kind: 'link', label: 'Home', to: '/' },
  { kind: 'link', label: 'About', to: '/dr-sandeep-mahapatra-hair-transplant-surgeon/' },
  {
    kind: 'dropdown',
    label: 'Our Services',
    columns: [
      {
        title: 'Hair Transplant Services',
        links: [
          { label: 'Direct Hair Transplant in Bangalore', to: '/best-hair-transplant-in-bangalore/' },
          { label: 'Cost of Hair Transplant - Bangalore', to: '/hair-transplant-cost-in-bangalore/' },
          // The original menu pointed this label at best-hair-transplant-in-bangalore
          // as well, a deliberate duplicate. It now has its own page -- the men's
          // brief in content/treatments/ is distinct copy, not a relabelling.
          { label: 'Direct Hair Transplant For Male', to: '/hair-transplant-for-men-in-bangalore/' },
          { label: 'Hair Transplant For Female', to: '/female-hair-transplant-in-bangalore/' },
          { label: 'Failed Hair Transplant Repair', to: '/failed-hair-transplant-repair-in-bangalore/' },
          { label: 'Beard Transplant', to: '/beard-transplant-in-bangalore/' },
          { label: 'Eyebrow Restoration', to: '/eyebrow-restoration-in-bangalore/' },
          { label: 'Celebrity Hair Transplants', to: '/celebrity-hair-transplant/' },
          { label: 'Unshaven Hair Transplant', to: '/unshaven-hair-transplant/' },
          { label: 'Body Hair Transplant', to: '/body-hair-transplant/' },
        ],
      },
      {
        title: 'Hair Loss Treatments',
        links: [
          { label: 'Neo-Follicle Stem Cell Therapy', to: '/stem-cell-therapy-for-hair-loss-in-bangalore/' },
          { label: 'PRP Hair Loss Treatment', to: '/best-prp-hair-treatment-in-bangalore/' },
          { label: 'Growth Factor Concentrate (GFC)', to: '/gfc-hair-treatment-in-bangalore/' },
          { label: 'Neo QR678 Treatment', to: '/qr678-hair-treatment-in-bangalore/' },
          { label: 'Exosome Therapy', to: '/exosome-hair-treatment-in-bangalore/' },
          { label: 'Dutexome Hair Treatment', to: '/dutexome-hair-treatment-in-bangalore/' },
          { label: 'Low Level Laser Hair Therapy', to: '/low-level-laser-therapy/' },
          { label: 'Scalp Hair Micro-pigmentation (MPG)', to: '/scalp-micropigmentation-in-bangalore/' },
          { label: 'Alopecia Treatment', to: '/alopecia-areata-treatment-in-bangalore/' },
          { label: 'Dandruff Solutions', to: '/dandruff-treatment-in-bangalore/' },
        ],
      },
      {
        title: 'International Patients',
        links: [
          { label: 'Hair Transplant Medical Tourism', to: '/hair-transplant-medical-tourism-in-bangalore/' },
        ],
      },
    ],
  },
  {
    kind: 'dropdown',
    label: 'Gallery',
    columns: [
      {
        title: null,
        links: [
          { label: 'Image Gallery', to: '/image-gallery/' },
          { label: 'Video Gallery', to: '/video-gallery/' },
        ],
      },
    ],
  },
  // A dropdown, not a link: the section now has two pages under it -- the blog
  // listing and the press coverage, which moved off /our-blogs/ to its own URL.
  {
    kind: 'dropdown',
    label: BLOG_SECTION,
    columns: [
      {
        title: null,
        links: [
          { label: BLOG_LABEL, to: BLOG_SECTION_PATH },
          { label: PRESS_LABEL, to: PRESS_PATH },
        ],
      },
    ],
  },
]

/** The header's right-hand phone link, shown beside the CTA button. */
export const headerPhone = { label: SITE.phoneDisplay, href: SITE.phoneHref }

/**
 * The header's right-hand CTA button. Points at contact-us -- the conversion
 * page -- rather than an on-page #contact anchor. See the footerNav note below.
 */
export const headerCta = { label: 'Book Consultation', to: '/contact-us/' }

export const footerNav: NavLink[] = [
  // SEO audit P1 fix -- not in the original nav.
  // contact-us is the conversion page: indexable, in the sitemap, declared
  // ContactPage in JSON-LD, and had ZERO inbound internal links because every
  // CTA used an on-page #contact anchor. hair-conditions-we-treat was likewise
  // orphaned. See reports/seo-audit.md section 7. Delete these two lines to
  // restore the original footer exactly.
  { label: 'Contact Us', to: '/contact-us/' },
  { label: 'Hair Conditions We Treat', to: '/hair-conditions-we-treat/' },

  { label: 'Privacy Policy', to: '/privacy-policy/' },
  { label: 'Terms Of Use', to: '/terms-of-use/' },
]

/**
 * The footer's two link columns.
 *
 * Labels are keyword-rich per the internal-linking table in
 * content/home-page/Neo-Follicle-Website-Content.md (07 - LINKING & SEO
 * ACTIONS): anchors carry the query, never "read more". Every target is a real
 * route in src/routes.tsx with its trailing slash -- scripts/verify-seo.mjs
 * check 8 fails the build on any footer href that does not resolve.
 */
export const footerColumns: NavColumn[] = [
  {
    title: 'Services',
    links: [
      { label: 'Hair Transplant for Men', to: '/hair-transplant-for-men-in-bangalore/' },
      { label: 'Female Hair Transplant', to: '/female-hair-transplant-in-bangalore/' },
      { label: 'Beard Transplant', to: '/beard-transplant-in-bangalore/' },
      { label: 'Eyebrow Restoration', to: '/eyebrow-restoration-in-bangalore/' },
      { label: 'Failed Transplant Repair', to: '/failed-hair-transplant-repair-in-bangalore/' },
      { label: 'Unshaven Hair Transplant', to: '/unshaven-hair-transplant/' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Hair Transplant Cost in Bangalore', to: '/hair-transplant-cost-in-bangalore/' },
      { label: 'Dr. Sandeep Mahapatra', to: '/dr-sandeep-mahapatra-hair-transplant-surgeon/' },
      { label: 'Before & After Gallery', to: '/image-gallery/' },
      { label: 'International Patients', to: '/hair-transplant-medical-tourism-in-bangalore/' },
      { label: 'Hair Loss Treatments', to: '/hair-loss-treatment-in-bangalore/' },
      { label: BLOG_LABEL, to: BLOG_SECTION_PATH },
      { label: PRESS_LABEL, to: PRESS_PATH },
    ],
  },
]
