/**
 * The site-wide JSON-LD entities, built once from src/config/site.ts, and the
 * normaliser that fits every page graph around them.
 *
 * WordPress emitted a full copy of #website, #organization, #clinic and
 * #physician into every one of the 60 captured graphs, and several pages added
 * a second node under an @id already in use (a WebPage and a MedicalWebPage
 * both claiming #webpage, a bare Physician beside the Person+Physician, a
 * separate #medicalclinic). Google reads two nodes with one @id as one entity
 * with contradictory properties.
 *
 * normalizeGraph() therefore:
 *   1. flattens every block into one @graph and drops nested @context keys;
 *   2. removes the page's own copies of the site entities and puts in the
 *      config-built ones, so every page states the same facts;
 *   3. drops the WordPress SearchAction (a static site has no ?s= search);
 *   4. repoints #medicalclinic at #clinic;
 *   5. merges nodes that share an @id;
 *   6. swaps image URLs that were already 404 on the live site for working ones.
 *
 * Page-specific nodes (WebPage, Service, MedicalProcedure, FAQPage,
 * BreadcrumbList, BlogPosting, ...) are otherwise passed through untouched.
 */
import { ASSETS, BRAND, COMMERCE, CONTACT, DOCTOR, LEGAL, SEO, SOCIAL, mapLink } from '../../src/config/site.ts'

const O = SEO.origin
const WP = `${O}/wp-content/uploads`

export const ID = {
  website: `${O}/#website`,
  organization: `${O}/#organization`,
  clinic: `${O}/#clinic`,
  physician: `${O}${DOCTOR.path}#physician`,
  logo: `${O}/#logo`,
}

/** Captured @ids that are removed outright, or folded into another @id. */
const DROPPED = new Set([`${O}/#searchaction`])
const ALIASES = {
  [`${O}/#medicalclinic`]: ID.clinic,
  [`${O}/#medical-clinic`]: ID.clinic,
  [`${O}/#dr-sandeep-mahapatra`]: ID.physician,
}

/**
 * Profile URLs as the capture spelled them -> their canonical form in
 * SOCIAL (null = drop). Applied to every string in every graph, so nested
 * publisher/provider copies of the sameAs list are cleaned too.
 */
const URL_MAP = {
  'https://www.instagram.com/neo_follicle_hair_transplant?stkn=dXJxaThrM3Z4NHFq&utm_source=qr':
    SOCIAL.footerProfiles.find((p) => p.label === 'Instagram').href,
  'https://in.linkedin.com/company/neo-follicle-hairtransplant?trk=public_post_follow-view-profile':
    SOCIAL.footerProfiles.find((p) => p.label === 'LinkedIn').href,
  // The Cochin (Maradu) clinic listing -- a different location. See SOCIAL.schemaSameAs.
  'https://www.practo.com/bangalore/clinic/neo-follicle-transplant-clinic-nft-cochin-maradu': null,
}

/**
 * Image URLs the capture references that were already 404 on the live site
 * (checked 2026-09-25), mapped to the closest working image. The mirror
 * script skips these; every other wp-content URL is served from
 * public/wp-content/ at its original path.
 */
export const BROKEN_IMAGE_MAP = {
  [`${WP}/2025/05/Dr-Sandeep-Mahapatra.jpg`]: DOCTOR.image,
  [`${WP}/2025/05/Dr-Sandeep-Mahapatra-Hair-Transplant-Surgeon.jpeg`]: DOCTOR.image,
  [`${WP}/2025/03/GFC-Hair-Treatment-Successful-Result-in-Bangalore-300x208.jpg`]:
    `${O}/treatments/gfc-hair-treatment-in-bangalore/result-1.webp`,
  [`${WP}/2025/03/Hair-loss-treatment-before-after.jpeg`]:
    `${O}/treatments/alopecia-areata-treatment-in-bangalore/hero.webp`,
  [`${WP}/2026/06/the-norwood-scale-stages-of-hair-loss.png`]:
    `${WP}/2026/06/Norwood-Scale-Male-Pattern-Baldness.png`,
}

const ref = (id) => ({ '@id': id })

const postalAddress = () => ({ '@type': 'PostalAddress', ...CONTACT.address })

/** The four site-wide nodes, in graph order. */
export function entityNodes() {
  const hasMap = mapLink()
  const sameAs = CONTACT.gbpUrl ? [CONTACT.gbpUrl, ...SOCIAL.schemaSameAs] : [...SOCIAL.schemaSameAs]

  const website = {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${O}/`,
    name: BRAND.legalName,
    alternateName: BRAND.alternateNames.slice(0, 3),
    description: BRAND.description,
    inLanguage: SEO.inLanguage,
    publisher: ref(ID.clinic),
    about: ref(ID.clinic),
    creator: ref(ID.physician),
  }

  const organization = {
    '@type': 'Organization',
    '@id': ID.organization,
    url: `${O}/`,
    name: BRAND.name,
    legalName: LEGAL.copyrightSuffix.replace(/^A Unit of (.+?)\..*$/, '$1'),
    logo: {
      '@type': 'ImageObject',
      '@id': ID.logo,
      url: ASSETS.schemaLogo,
      contentUrl: ASSETS.schemaLogo,
      caption: BRAND.name,
    },
    image: ref(ID.logo),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    sameAs,
    subOrganization: ref(ID.clinic),
  }

  const clinic = {
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': ID.clinic,
    name: BRAND.legalName,
    alternateName: [...BRAND.alternateNames],
    url: `${O}/`,
    logo: ref(ID.logo),
    image: [ASSETS.clinicImageFull, ASSETS.clinicImage],
    description: BRAND.description,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: COMMERCE.priceRange,
    currenciesAccepted: COMMERCE.currency,
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
    isAcceptingNewPatients: true,
    medicalSpecialty: BRAND.medicalSpecialty,
    knowsAbout: [...BRAND.knowsAbout],
    address: postalAddress(),
    geo: { '@type': 'GeoCoordinates', ...CONTACT.geo },
    hasMap,
    areaServed: [
      { '@type': 'City', name: CONTACT.areaServed.city },
      ...CONTACT.localities.map((name) => ({
        '@type': 'Place',
        name: `${name}, ${CONTACT.areaServed.city}`,
      })),
      { '@type': 'AdministrativeArea', name: CONTACT.areaServed.region },
      { '@type': 'Country', name: CONTACT.areaServed.country },
    ],
    openingHoursSpecification: CONTACT.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT.phone,
        contactType: 'appointment booking',
        availableLanguage: [...CONTACT.languages],
        areaServed: 'IN',
      },
      {
        '@type': 'ContactPoint',
        url: CONTACT.whatsapp,
        contactType: 'WhatsApp appointment booking',
        availableLanguage: [...CONTACT.languages],
        areaServed: 'IN',
      },
    ],
    founder: ref(ID.physician),
    employee: ref(ID.physician),
    parentOrganization: ref(ID.organization),
    sameAs,
  }

  const physician = {
    '@type': ['Person', 'Physician'],
    '@id': ID.physician,
    name: DOCTOR.name,
    honorificPrefix: DOCTOR.honorificPrefix,
    givenName: DOCTOR.givenName,
    familyName: DOCTOR.familyName,
    url: `${O}${DOCTOR.path}`,
    image: DOCTOR.image,
    description: DOCTOR.description,
    jobTitle: [...DOCTOR.jobTitles],
    medicalSpecialty: DOCTOR.medicalSpecialty,
    knowsAbout: [...DOCTOR.knowsAbout],
    worksFor: ref(ID.clinic),
    workLocation: ref(ID.clinic),
    affiliation: ref(ID.clinic),
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: postalAddress(),
    priceRange: COMMERCE.priceRange,
    hasCredential: DOCTOR.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: c.category,
      name: c.name,
      recognizedBy: {
        '@type': /College|Institute/.test(c.issuer) ? 'CollegeOrUniversity' : 'Organization',
        name: c.issuer,
      },
    })),
    memberOf: DOCTOR.memberships.map((m) => ({
      '@type': 'Organization',
      name: m.name,
      alternateName: m.abbreviation,
    })),
    award: [...DOCTOR.awards],
    hasOccupation: {
      '@type': 'Occupation',
      ...DOCTOR.occupation,
      occupationalCategory: DOCTOR.medicalSpecialty,
    },
    sameAs: [...DOCTOR.sameAs],
  }

  return [website, organization, clinic, physician]
}

const ENTITY_IDS = new Set([ID.website, ID.organization, ID.clinic, ID.physician, ID.logo])

/** Rewrites refs and dead image URLs anywhere in a node; drops refs to removed nodes. */
function rewrite(value) {
  if (Array.isArray(value)) {
    return value.map(rewrite).filter((v) => v !== undefined)
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value)
    if (keys.length === 1 && keys[0] === '@id') {
      const id = ALIASES[value['@id']] ?? value['@id']
      return DROPPED.has(id) ? undefined : { '@id': id }
    }
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (k === '@context') continue
      const r = rewrite(v)
      if (r !== undefined && !(Array.isArray(r) && r.length === 0 && Array.isArray(v) && v.length > 0)) out[k] = r
    }
    return out
  }
  if (typeof value === 'string' && BROKEN_IMAGE_MAP[value]) return BROKEN_IMAGE_MAP[value]
  if (typeof value === 'string' && value in URL_MAP) return URL_MAP[value] ?? undefined
  return value
}

/** WebPage subtypes. A merged node keeps the most specific, never plain WebPage beside one. */
const PAGE_SUBTYPES = new Set(['MedicalWebPage', 'ProfilePage', 'AboutPage', 'ContactPage', 'CollectionPage', 'FAQPage'])
const ARTICLE_SUBTYPES = new Set(['BlogPosting', 'NewsArticle'])

function mergeTypes(a, b) {
  let types = [...new Set([...[].concat(a ?? []), ...[].concat(b ?? [])])]
  if (types.some((t) => PAGE_SUBTYPES.has(t))) types = types.filter((t) => t !== 'WebPage')
  if (types.some((t) => ARTICLE_SUBTYPES.has(t))) types = types.filter((t) => t !== 'Article')
  if (types.includes('Physician')) types = types.filter((t) => t !== 'Person').concat('Person')
  return types.length === 1 ? types[0] : types
}

/** Later properties fill gaps; on conflict the richer (later, page-specific) node wins. */
function mergeNodes(a, b) {
  const out = { ...a }
  for (const [k, v] of Object.entries(b)) {
    if (k === '@type') out[k] = mergeTypes(a[k], v)
    else if (out[k] === undefined) out[k] = v
    else if (Array.isArray(out[k]) && Array.isArray(v)) {
      const seen = new Set(out[k].map((x) => JSON.stringify(x)))
      out[k] = [...out[k], ...v.filter((x) => !seen.has(JSON.stringify(x)))]
    } else out[k] = v
  }
  return out
}

/**
 * Captured or authored graph (array of JSON-LD blocks) -> one normalised block.
 * `extraNodes` are appended before dedupe (e.g. a synthesised BreadcrumbList).
 */
export function normalizeGraph(blocks, extraNodes = []) {
  const raw = blocks.flatMap((b) => b['@graph'] ?? [b])
  const nodes = []
  const byId = new Map()

  for (const node of entityNodes()) {
    byId.set(node['@id'], nodes.length)
    nodes.push(node)
  }

  for (const node of [...raw.map(rewrite), ...extraNodes]) {
    const id = node['@id'] ? (ALIASES[node['@id']] ?? node['@id']) : null
    if (id && DROPPED.has(id)) continue
    // The page's own copy of a site entity: the config-built one is authoritative.
    if (id && ENTITY_IDS.has(id)) continue
    if (id && byId.has(id)) {
      const i = byId.get(id)
      nodes[i] = mergeNodes(nodes[i], { ...node, '@id': id })
      continue
    }
    if (id) byId.set(id, nodes.length)
    nodes.push(id ? { ...node, '@id': id } : node)
  }

  // Drop the WordPress SearchAction ref from WebSite, if anything re-added one.
  for (const n of nodes) {
    if (n.potentialAction?.['@type'] === 'SearchAction') delete n.potentialAction
  }

  return [{ '@context': 'https://schema.org', '@graph': nodes }]
}
