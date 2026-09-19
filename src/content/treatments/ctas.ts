/**
 * The buttons the briefs reuse across all ten pages.
 *
 * Labels are the briefs' own wording. The phone label is written out rather
 * than taken from CONTACT.phoneLabel, which is the captured string
 * "Call # +91 - 97312 07940" -- the briefs drop the hash and the spaced
 * hyphens. Same call DoctorHero makes for its trust badges: where the content
 * doc and the config disagree on wording, the doc wins.
 *
 * `to` paths keep their trailing slash. That is P0 -- see PageSeo.path.
 */
import { CONTACT } from '../../config/site'
import type { Cta } from './types'

export const BOOK: Cta = { label: 'Book Consultation', to: '/contact-us/' }
export const BOOK_PRIVATE: Cta = { label: 'Book Private Consultation', to: '/contact-us/' }
export const ANALYSIS: Cta = { label: 'AI Hair Analysis', to: '/hair-assessment/' }
export const COST: Cta = { label: 'Check Your Hair Transplant Cost', to: '/ai-hair-transplant-cost-calculator/' }
export const CALL: Cta = { label: 'Call +91 97312 07940', href: CONTACT.phoneHref, phone: true }
