/**
 * Moved. The brand config now lives in src/config/site.ts, alongside nav.ts --
 * it outgrew the seo/ folder once it started carrying hours, stats, pricing,
 * legal copy and the doctor entity, none of which are SEO concerns.
 *
 * This re-export exists so existing imports keep working. New code should
 * import the specific group it needs (BRAND, CONTACT, SOCIAL, ...) from
 * ../config/site rather than reaching for the SITE roll-up.
 */
export { SITE } from '../config/site'
