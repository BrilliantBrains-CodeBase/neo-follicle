/**
 * Header and footer navigation.
 *
 * Reproduced from the live header/footer markup in
 * neofollicle-seo-backup/pages/home/raw.html. Labels and order are the
 * original's, not rewritten -- the mega-menu is what carries link equity to
 * ~54 of the 59 pages, so its shape is an SEO asset.
 */
import { SITE } from '../seo/site'

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
          // Deliberate duplicate target: the original menu lists
          // best-hair-transplant-in-bangalore twice under two different labels.
          { label: 'Direct Hair Transplant For Male', to: '/best-hair-transplant-in-bangalore/' },
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
  { kind: 'link', label: 'Blogs', to: '/our-blogs/' },
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
      { label: 'Hair Transplant for Men', to: '/best-hair-transplant-in-bangalore/' },
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
      { label: 'Blog', to: '/our-blogs/' },
    ],
  },
]
