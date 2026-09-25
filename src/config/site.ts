/**
 * Brand constants -- the single source of truth for every fact about Neo Follicle
 * that does not change from page to page.
 *
 * Every value here is transcribed VERBATIM from the capture in
 * ../../neofollicle-seo-backup. Provenance per group:
 *
 *   BRAND      pages/home/schema.jsonld  -> @id .../#clinic and .../#website
 *   CONTACT    pages/home/schema.jsonld  -> #clinic (address, geo, hours, contactPoint)
 *   SOCIAL     pages/home/raw.html footer markup + #clinic `sameAs`
 *   DOCTOR     pages/home/schema.jsonld  -> .../dr-sandeep-mahapatra-hair-transplant-surgeon/#physician
 *   STATS      pages/home/headings.json  -> the h4 band
 *   COMMERCE   #clinic priceRange + the GST line on 4 treatment pages
 *   LEGAL      pages/home/raw.html footer + pages/contact-us/content.md
 *   ANALYTICS  pages/home/raw.html
 *   SEO        pages/home/meta.json
 *
 * This file is also the source of the site-wide JSON-LD entities (#website,
 * #organization, #clinic, #physician): scripts/seo/entity-graph.mjs builds them
 * from here and scripts/gen-seo.mjs puts that one copy into every page graph,
 * replacing the per-page copies WordPress emitted. Change a fact here and every
 * page's structured data follows. Node imports this file directly (type
 * stripping), so keep it free of non-erasable TypeScript syntax.
 */

// --- brand identity -------------------------------------------------------

export const BRAND = {
  /** og:site_name, and the Organization node's name. */
  name: 'Neo Follicle Hair Transplant',
  /** LocalBusiness / MedicalClinic and WebSite node name. */
  legalName: 'Neo Follicle Hair Transplant Clinic',
  shortName: 'Neo Follicle',

  /** #clinic alternateName, in the captured order. */
  alternateNames: [
    'Neo Follicle Transplant Clinic',
    'Neo Follicle Hair Transplant',
    'Neo Follicle Transplant',
    'Neo Follicle',
  ],

  /** Shared verbatim by the #website and #clinic nodes. */
  description:
    'Neo Follicle Hair Transplant Clinic is a hair transplant and hair loss treatment clinic in Bangalore, founded and led by Dr. Sandeep Mahapatra, Senior Dermatologist and Hair Transplant Surgeon. The clinic offers advanced hair transplant procedures and non-surgical hair restoration treatments for men, women, celebrities, and international patients.',

  medicalSpecialty: 'Dermatology',

  /** #clinic knowsAbout -- the clinic's declared topical authority. */
  knowsAbout: [
    'Hair transplant surgery',
    'Hair restoration',
    'Hair loss treatment',
    'FUE hair transplant',
    'FUT hair transplant',
    'Bio FUE hair transplant',
    'DHI hair transplant',
    'Direct Hair Implantation',
    'Beard transplant',
    'Eyebrow transplant',
    'Female hair transplant',
    'PRP therapy for hair loss',
    'GFC therapy for hair loss',
    'Hairline restoration',
    'Baldness treatment',
    'Alopecia treatment',
    'Cosmetic dermatology',
  ],
} as const

// --- contact --------------------------------------------------------------

export type PostalAddress = {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export type OpeningHours = {
  days: readonly string[]
  opens: string
  closes: string
}

export const CONTACT = {
  /** schema.org telephone format. */
  phone: '+91-9731207940',
  phoneHref: 'tel:+919731207940',
  phoneDisplay: '+91 - 97312 07940',
  /** The exact CTA string used across every captured page. */
  phoneLabel: 'Call # +91 - 97312 07940',

  whatsapp: 'https://wa.me/919731207940',
  email: 'info@neofollicletransplant.com',

  address: {
    streetAddress:
      '1st floor, Scorpio House, Near Marathahalli Bridge, Munnekolala, Landmark Opposite Purvankara Apt, Marathahalli Bridge Service Road',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560037',
    addressCountry: 'IN',
  } satisfies PostalAddress,

  /** Display-formatted break-up of the same address, for footers and contact cards. */
  addressLines: [
    '1st floor, Scorpio House,',
    'Near Marathahalli Bridge, Munnekolala,',
    'Opposite Purvankara Apt, Marathahalli Bridge Service Road,',
    'Bengaluru, Karnataka 560037',
  ],

  geo: { latitude: 12.956429486014592, longitude: 77.70733394232819 },
  mapUrl: 'https://maps.app.goo.gl/jKaWhcfQuKZXRvE48',
  /**
   * The Google Business Profile's own URL (https://www.google.com/maps?cid=...).
   * NOT YET SUPPLIED by the clinic. When set, it becomes the JSON-LD `hasMap`,
   * joins `sameAs`, and replaces mapUrl on every "Get directions" link -- a
   * cid URL ties the site to the GBP entity more firmly than a short link.
   */
  gbpUrl: null as string | null,

  /**
   * Tuesday is deliberately absent -- the clinic is closed. This matches the
   * captured openingHoursSpecification exactly. Do not "complete" the week.
   */
  openingHours: [
    {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '19:00',
    },
  ] satisfies readonly OpeningHours[],
  openingHoursDisplay: 'Mon, Wed – Sun · 10:00 AM – 7:00 PM',
  closedDayDisplay: 'Closed on Tuesday',

  /** #clinic contactPoint availableLanguage. */
  languages: ['English', 'Hindi', 'Kannada'],

  /** #clinic areaServed: City / AdministrativeArea / Country. */
  areaServed: { city: 'Bengaluru', region: 'Karnataka', country: 'India' },

  /**
   * Neighbourhoods the clinic draws from, emitted as `Place` nodes in the
   * #clinic areaServed. Marathahalli and Whitefield are the ones the clinic
   * already names in its own copy; the rest are the adjoining East Bengaluru
   * localities within a short drive.
   */
  localities: [
    'Marathahalli',
    'Whitefield',
    'HAL Old Airport Road',
    'Bellandur',
    'Sarjapur Road',
    'Koramangala',
    'Indiranagar',
    'KR Puram',
    'Brookefield',
    'Mahadevapura',
  ],

  /** ISO 3166-2 region, for the geo.region meta tag. */
  isoRegion: 'IN-KA',
} as const

/** The best "open this clinic on Google Maps" URL we have. */
export const mapLink = (): string => CONTACT.gbpUrl ?? CONTACT.mapUrl

// --- lead capture ---------------------------------------------------------

export const FORMS = {
  /**
   * Google Apps Script web app URL. The script is scripts/apps-script/Code.gs
   * (Sheet row + clinic email per lead); scripts/apps-script/README.md has the
   * deploy steps. Redeploy as a new VERSION of this deployment, not a new
   * deployment, or this URL changes.
   *
   * The POST must be a CORS *simple* request: `text/plain;charset=utf-8` with
   * a JSON.stringify'd body. Apps Script cannot answer an OPTIONS preflight,
   * so an `application/json` content type fails outright. Read it script-side
   * with JSON.parse(e.postData.contents).
   */
  leadEndpoint:
    'https://script.google.com/macros/s/AKfycbwk8voM1hjMtsR7NeQ5--0s07u27lIlXOwm0_OMjGo1eazh1TW8czT9Fh9i6-r93RzG/exec',
} as const

// --- social profiles ------------------------------------------------------

export type SocialProfile = { label: string; href: string }

/**
 * Confirmed social profiles, in their canonical form. The clinic supplied
 * share links carrying tracking parameters (`?trk=...`, `?stkn=...&utm_source=qr`);
 * those are stripped so every link and every `sameAs` names the profile by one
 * stable URL -- search engines consolidate entities on exact URL matches.
 *
 *   footerProfiles -> visitor-facing links
 *   schemaSameAs   -> clinic identity links for structured data
 */
const FACEBOOK = 'https://www.facebook.com/NeoFollicleHairTransplantClinic/'
const INSTAGRAM = 'https://www.instagram.com/neo_follicle_hair_transplant/'
const YOUTUBE = 'https://www.youtube.com/channel/UCpUTXf985LPC2UdBXCfgrXQ'
const LINKEDIN = 'https://www.linkedin.com/company/neo-follicle-hairtransplant/'
const JUSTDIAL = 'https://www.justdial.com/Bangalore/Neo-Follicle'

export const SOCIAL = {
  footerProfiles: [
    { label: 'Facebook', href: FACEBOOK },
    { label: 'LinkedIn', href: LINKEDIN },
    { label: 'YouTube', href: YOUTUBE },
    { label: 'Instagram', href: INSTAGRAM },
  ] satisfies readonly SocialProfile[],

  /**
   * #clinic sameAs. The captured list also carried a Practo listing for a
   * *Cochin (Maradu)* clinic -- a different location. The site describes the
   * Bangalore clinic only, so it is dropped: a sameAs pointing at another
   * address splits the local entity. CONTACT.gbpUrl is prepended when set.
   */
  schemaSameAs: [CONTACT.mapUrl, FACEBOOK, INSTAGRAM, YOUTUBE, LINKEDIN, JUSTDIAL],

  /** Third-party listing pages, split out of sameAs for "find us on" blocks. */
  directories: [{ label: 'JustDial', href: JUSTDIAL }] satisfies readonly SocialProfile[],
} as const

// --- the founding physician ----------------------------------------------

export type Credential = { category: string; name: string; issuer: string }
export type Membership = { name: string; abbreviation: string }

export const DOCTOR = {
  name: 'Dr. Sandeep Mahapatra',
  honorificPrefix: 'Dr.',
  givenName: 'Sandeep',
  familyName: 'Mahapatra',
  /** Trailing slash is load-bearing -- see SEO.trailingSlash. */
  path: '/dr-sandeep-mahapatra-hair-transplant-surgeon/',

  jobTitles: [
    'Senior Consultant Dermatologist',
    'Cosmetic Expert',
    'Hair Transplant Surgeon',
    'Founder, Neo Follicle Transplant Clinic',
  ],
  /** The h5 line rendered under his name on every page. */
  qualificationsLine: 'MBBS, MD (Dermatology)',
  /** The h5 role line, verbatim from pages/home/headings.json. */
  roleLine: 'Senior Consultant Dermatologist, Cosmetic Expert & Hair Transplant Surgeon',
  founderLine: 'Founder, Neo Follicle Transplant Clinic in Marathahalli, Whitefield - Bangalore',

  description:
    'Dr. Sandeep Mahapatra is a Senior Consultant Dermatologist, Cosmetic Expert and Hair Transplant Surgeon in Bangalore. He is the Founder of Neo Follicle Transplant Clinic in Marathahalli, Whitefield, and has over 20 years of experience in dermatology, cosmetic dermatology and advanced hair restoration procedures.',

  medicalSpecialty: 'Dermatology',
  yearsOfExperience: 20,

  /** #physician knowsAbout, in the captured order. */
  knowsAbout: [
    'Dermatology',
    'Cosmetic dermatology',
    'Hair transplant surgery',
    'Hair restoration',
    'Hair loss treatment',
    'FUE hair transplant',
    'FUT hair transplant',
    'DHI hair transplant',
    'Direct hair implantation',
    'Beard restoration',
    'Eyebrow restoration',
    'Female hair transplant',
    'Hairline restoration',
    'PRP therapy for hair loss',
    'Growth factor concentrate therapy',
    'Stem cell therapy for hair loss',
    'Low level laser hair therapy',
    'Scalp micropigmentation',
    'Alopecia treatment',
    'Dermatosurgery',
    'Aesthetic dermatology',
    'Botox',
    'Dermal fillers',
    'Vitiligo surgery',
  ],

  occupation: {
    name: 'Dermatologist and Hair Transplant Surgeon',
    description:
      'Specializes in dermatology, cosmetic dermatology, hair transplantation, hair restoration, PRP therapy, beard restoration, eyebrow restoration and advanced aesthetic procedures.',
  },

  credentials: [
    {
      category: 'Medical Degree',
      name: 'MBBS',
      issuer: 'MGM Medical College & Hospital, Jamshedpur',
    },
    {
      category: 'Postgraduate Medical Degree',
      name: 'MD Dermatology, Venereology & Leprosy',
      issuer: 'Rajendra Institute of Medical Sciences, Ranchi',
    },
    {
      category: 'Professional Certification',
      name: 'Certified DHI Specialist',
      issuer: 'DHI Global, Greece',
    },
    {
      category: 'Professional Certification',
      name: 'Basic and Advanced Botox and Dermal Fillers Certification',
      issuer: 'Allergan',
    },
  ] satisfies readonly Credential[],

  awards: [
    'Gold Medalist in MD Dermatology, Venereology & Leprosy',
    'Honors and Gold Medalist in two subjects during MBBS',
  ],

  memberships: [
    { name: 'Association of Cutaneous Surgeons of India', abbreviation: 'ACSI' },
    { name: 'Indian Association of Hair Restoration Surgeons', abbreviation: 'IAHRS' },
    { name: 'International Society of Dermatology', abbreviation: 'ISD' },
    {
      name: 'Indian Association of Dermatologists, Venereologists and Leprologists',
      abbreviation: 'IADVL',
    },
    { name: 'International Society of Hair Restoration Surgery', abbreviation: 'ISHRS' },
  ] satisfies readonly Membership[],

  /** #physician sameAs -- his professional directory profiles. */
  sameAs: [
    'https://www.practo.com/bangalore/doctor/dr-sandeep-mahapatra-dermatologist-cosmetologist',
    'https://www.linkedin.com/in/dr-sandeep-mahapatra-315411112/',
    'https://www.apollo247.com/doctors/dr-sandeep-mahapatra-4115d6e4-68c2-4cca-8548-66cf7e0bbce1',
    'https://kivihealth.com/iam/sandeep.mahapatra.19945',
    'https://www.justdial.com/Bangalore/Dr-Sandeep-Mahapatra-Neo-Follicle-Transplant-Clinic-Marathahalli-Below-Bridge-Munekollal/080PXX80-XX80-160108114909-B9U9_BZDET',
    'https://www.docindia.org/doctors/bangalore/dr-sandeep-mahapatra-dermatology',
  ],

  image:
    'https://neofollicletransplant.com/wp-content/uploads/2025/05/Dr-Sandeep-Mahapatra-Best-Dermatologist-in-Bangalore.jpg',
} as const

// --- trust stats ----------------------------------------------------------

export type Stat = { value: string; label: string }

/**
 * The h4 band from pages/home/headings.json. Home's wording is canonical --
 * the PRP page renders the fifth stat as '100,000+ PRP / GFC Sessions Completed'.
 */
export const STATS = [
  { value: '20+', label: 'Years of Experience' },
  { value: '10000+', label: 'Hair Transplants Performed' },
  { value: '500+', label: 'International Patients' },
  { value: '6,000,000+', label: 'Hair Follicles Transplanted' },
  { value: '100,000+', label: 'PRP Sessions Completed' },
  { value: '18+', label: 'Hair Transplant Surgeons Trained' },
  { value: '55+', label: 'Skilled Assistants Trained' },
] satisfies readonly Stat[]

// --- pricing --------------------------------------------------------------

export const COMMERCE = {
  currency: 'INR',
  currencySymbol: '₹',

  /**
   * The captured home #clinic node said '₹₹₹' while 119 other nodes said '₹₹'.
   * The entity nodes are now generated once from this value, so the graph is
   * consistent; Service/Offer nodes that restate a price range keep theirs.
   */
  priceRange: '₹₹₹',

  /** Verbatim disclaimer under every non-surgical price grid (4 pages). */
  gstNote: '* 18% GST Applicable on the procedure.',
} as const

// --- legal ----------------------------------------------------------------

export const LEGAL = {
  /**
   * Rendered as a single <p> in the live footer. Two variants exist in the
   * capture -- this is the fuller one, carrying the LLP clause. Use
   * copyrightLine() so the year does not go stale.
   */
  copyrightEntity: 'Neo Follicle Transplant Clinic',
  copyrightSuffix:
    'A Unit of Neofollicle and Neofertility Clinic LLP. All Rights Reserved.',
  /** The year on the captured page, kept for reference. */
  capturedYear: 2025,

  /** From pages/contact-us/content.md. Required on medical marketing pages. */
  disclaimer:
    'Disclaimer Statement : The information published on this website is generic in nature and the results vary from case to case basis. The contents of the website is not meant to replace an in-person consultation. Please follow the advise of your doctor via in-person consultation. This website will not assume any legal responsibility for the patient’s medical condition.',

  /**
   * The captured footer carried a "Website Designed & Maintained By HappiMed"
   * credit. Removed at the client's request -- deliberately not reinstated.
   */
} as const

/** `©2026 Neo Follicle Transplant Clinic. A Unit of ... All Rights Reserved.` */
export const copyrightLine = (year: number = new Date().getFullYear()) =>
  `©${year} ${LEGAL.copyrightEntity}. ${LEGAL.copyrightSuffix}`

// --- analytics ------------------------------------------------------------

export const ANALYTICS = {
  /**
   * The only analytics ID in the entire capture -- present on all 59 pages as
   * both the head script and the noscript iframe. No raw GA4 `G-`, no `AW-`,
   * no Meta Pixel. Injected into every prerendered page by scripts/prerender.mjs
   * (head script + noscript iframe); `npm run dev` stays tag-free.
   */
  gtmId: 'GTM-NCJCP6NZ',
} as const

// --- assets ---------------------------------------------------------------

export const ASSETS = {
  /** Local, in public/. */
  logo: '/logo.svg',
  favicon: '/favicon.svg',

  /** Absolute URLs -- these are what the JSON-LD nodes reference. */
  schemaLogo: 'https://neofollicletransplant.com/wp-content/uploads/2025/03/NFT-LOGO-WITH-BG-02.png',
  schemaFavicon:
    'https://neofollicletransplant.com/wp-content/uploads/2025/03/NFT-Favicon-512.svg',

  clinicImageFull:
    'https://neofollicletransplant.com/wp-content/uploads/2025/04/NFT-Clinic-Reception.jpeg',
  clinicImage:
    'https://neofollicletransplant.com/wp-content/uploads/2025/05/NFT-Clinic-Reception-650-450.jpeg',
  clinicImageAlt: 'Neo Follicle Transplant Clinic reception area in Bangalore',
  clinicImageSize: { width: 650, height: 450 },

  /**
   * Share images. Every page gets a generated 1200x630 card at
   * /og/<slug>.jpg (scripts/gen-og-images.mjs); this is the fallback for a
   * route with no card, e.g. the 404 page.
   */
  ogCardDir: '/og/',
  ogImageSize: { width: 1200, height: 630 },
  defaultOgImage: '/og/home.jpg',

  /** Browser UI colour (manifest + theme-color meta). tailwind `primary`. */
  themeColor: '#3E74D9',
} as const

// --- SEO defaults ---------------------------------------------------------

export const SEO = {
  origin: 'https://neofollicletransplant.com',

  /**
   * og:locale takes the Open Graph underscore form. The capture's bare 'en'
   * is not a valid OG locale; the WebSite node's 'en-IN' is the BCP 47 form.
   */
  locale: 'en_IN',
  inLanguage: 'en-IN',
  htmlLang: 'en',

  defaultTitle: 'Direct Hair Transplant Clinic in Bangalore | Neo Follicle',
  titleTemplate: '%s | Neo Follicle',
  defaultDescription:
    'Get direct hair transplant in Bangalore at Neo Follicle Clinic under Dr. Sandeep Mahapatra. Natural hairline, careful graft handling, and personalized planning.',

  defaultRobots: 'max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  /** The 6 ad landing pages. They also carry NO canonical -- absence is captured state. */
  noindexRobots: 'max-image-preview:large, noindex, follow',

  twitterCard: 'summary_large_image',

  /**
   * P0-PRESERVE. Every canonical in the capture is self-referencing WITH a
   * trailing slash. See neofollicle-seo-backup/reports/seo-audit.md section 6.
   */
  trailingSlash: true,
} as const

/** Absolute URL from a site-relative path. Pass paths with their trailing slash. */
export const absoluteUrl = (path: string) => `${SEO.origin}${path}`

// --- aggregate ------------------------------------------------------------

/**
 * Convenience roll-up. Carries every key the original src/seo/site.ts exposed,
 * so Header/Footer/nav keep compiling. Prefer the specific groups above in new
 * code -- `CONTACT.email` reads better than `SITE.email`.
 */
export const SITE = {
  origin: SEO.origin,
  name: BRAND.name,
  legalName: BRAND.legalName,
  locale: SEO.locale,
  inLanguage: SEO.inLanguage,

  phone: CONTACT.phone,
  phoneHref: CONTACT.phoneHref,
  phoneDisplay: CONTACT.phoneDisplay,
  email: CONTACT.email,

  address: CONTACT.address,
  mapUrl: CONTACT.mapUrl,

  socials: SOCIAL.footerProfiles,

  logo: ASSETS.logo,
  favicon: ASSETS.favicon,
} as const
