/**
 * Ad attribution for lead rows. An ad click lands on an LP with utm_* or gclid,
 * then the visitor navigates to /contact-us/ and the query string is gone --
 * so the params are captured on landing (Layout calls `captureAttribution`)
 * and kept in sessionStorage until the form reads them.
 *
 * Every storage access is wrapped: private windows and blocked site data throw.
 */

const KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const

const STORAGE_KEY = 'nf-attribution'

/** Stores the current URL's params, if it has any. A new ad click overwrites the old one. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const found: Record<string, string> = {}
  for (const key of KEYS) {
    const value = params.get(key)
    if (value) found[key] = value
  }
  if (Object.keys(found).length === 0) return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
  } catch {
    /* storage unavailable -- the lead still goes through, just untagged */
  }
}

export function readAttribution(): Record<string, string> {
  captureAttribution()
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}
