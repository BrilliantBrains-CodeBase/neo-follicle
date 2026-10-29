/**
 * Lead and contact tracking through the GTM dataLayer.
 *
 * Why: GA4 recorded ONE key event in 90 days (Jul-Oct 2026, ~17,000 sessions).
 * The site never pushed to the dataLayer, and the GTM container has no GA4
 * event tags, so no form submit, call or WhatsApp tap reached GA4. This module
 * is the site half; docs/seo-audit/gtm/ is the container half (5 GA4 event
 * tags to import).
 *
 * Events are pushed whether or not GTM has loaded yet. scripts/prerender.mjs
 * defers GTM for some visitors, and anything pushed before it boots waits in
 * window.dataLayer and is processed the moment it does, so nothing is lost.
 *
 * No personal data, ever: name, phone and email never enter the dataLayer
 * (GA4's terms forbid PII). Only the form id, the chosen service, the page and
 * where on the page the link sat.
 */

type DataLayerEvent = { event: string } & Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/** dataLayer event names. The GTM import maps each to a GA4 event. */
export const NF_EVENTS = {
  lead: 'nf_generate_lead',
  call: 'nf_click_to_call',
  whatsapp: 'nf_whatsapp_click',
  email: 'nf_email_click',
  directions: 'nf_directions_click',
} as const

function push(event: DataLayerEvent) {
  if (typeof window === 'undefined') return // prerender
  ;(window.dataLayer = window.dataLayer ?? []).push(event)
}

/**
 * Where on the page a link sat, so GA4 can compare the header button with the
 * hero, the sticky bar and the footer. An explicit `data-track-location` on an
 * ancestor wins.
 */
function linkLocation(el: Element): string {
  const tagged = el.closest<HTMLElement>('[data-track-location]')
  if (tagged?.dataset.trackLocation) return tagged.dataset.trackLocation
  if (el.closest('header')) return 'header'
  if (el.closest('footer')) return 'footer'
  if (el.closest('form')) return 'form'
  if (el.closest('main > section:first-of-type')) return 'hero'
  return 'body'
}

/**
 * A confirmed lead. Call ONLY after the Apps Script endpoint has answered
 * `ok: true`, so failed or rejected submissions never count.
 */
export function trackLead(formId: string, service?: string) {
  push({
    event: NF_EVENTS.lead,
    form_id: formId || '(not set)',
    service: service || '(not set)',
    page_path: window.location.pathname,
  })
}

const WHATSAPP = /(^|\/\/)(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\/|^whatsapp:/i
const MAPS = /maps\.app\.goo\.gl|goo\.gl\/maps|google\.[a-z.]+\/maps/i

let installed = false

/**
 * One delegated listener covers every tel:, WhatsApp, mailto and Maps link on
 * every page, including the sticky bar and anything React renders later.
 * Capture phase and passive, so it can never delay the dialer or navigation.
 * Call once, before hydration (src/main.tsx).
 */
export function initContactClickTracking() {
  if (typeof document === 'undefined' || installed) return
  installed = true

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as Element | null
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') ?? ''
      const base = {
        link_url: href.slice(0, 200),
        link_text: (a.textContent ?? '').trim().slice(0, 100),
        link_location: linkLocation(a),
        page_path: window.location.pathname,
      }
      if (href.startsWith('tel:')) push({ event: NF_EVENTS.call, ...base })
      else if (WHATSAPP.test(href)) push({ event: NF_EVENTS.whatsapp, ...base })
      else if (href.startsWith('mailto:')) push({ event: NF_EVENTS.email, ...base, link_url: 'mailto:(redacted)' })
      else if (MAPS.test(href)) push({ event: NF_EVENTS.directions, ...base })
    },
    { capture: true, passive: true },
  )
}
