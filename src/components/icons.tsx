/**
 * Inline SVG icons. No icon library -- the design system's stated plan is
 * inline SVG, and the app's only runtime dependencies are react + react-router.
 *
 * Provenance:
 *   Phone, Mail, MapPin, Clock  folixa-design-reference/assets/icons/svg/
 *                               (jki-phone1-light, jki-envelope2-light,
 *                                jki-search-location-solid, jki-clock).
 *                               The translate/scale group is part of the glyph
 *                               -- the jki webfont is y-flipped. Do not remove.
 *   Facebook, LinkedIn, Instagram  same folder (fab_*.svg), Font Awesome Free 6.
 *   YouTube  neofollicle-seo-backup/pages/home/raw.html footer, Font Awesome
 *            Free 6.5.1. No jki equivalent was captured.
 *   ChevronDown, MenuBars  folixa-design-reference/assets/icons/svg/
 *            (jki-angle-down-solid, fas_bars). Phone and Close are hand-drawn
 *            to the same weight. These four are the header's set.
 *   Square, Play  folixa-design-reference/pages/home/rendered.html -- Elementor
 *            inlines both as SVG (e-fas-square, e-eicon-play). The hero's set.
 *   Sun       folixa-design-reference/pages/home/rendered.html, element 34f35c4
 *            (e-fas-sun); also folixa-design-reference/assets/icons/svg/fas_sun.svg.
 *   CheckCircle  folixa-design-reference/assets/icons/svg/far_check-circle.svg.
 *            Sun and CheckCircle are the about section's set.
 *   Plus      folixa-design-reference/assets/icons/svg/fas_plus.svg (e-fas-plus).
 *            The services cards' badge glyph.
 *   QuoteLeft  folixa-design-reference/assets/icons/svg/fas_quote-left.svg;
 *            also inlined in pages/home/rendered.html as `e-fas-quote-left`.
 *   ArrowRight  folixa-design-reference/assets/icons/svg/jki-right-arrow-light.svg.
 *            The testimonials carousel's set. Only the RIGHT glyph was
 *            captured -- the kit's left arrow is the same shape mirrored, so
 *            the previous button reuses this one under `rotate-180` rather
 *            than carrying a hand-drawn second path that could drift from it.
 *
 * Font Awesome Free 6 icons are CC BY 4.0.
 */

import type { ReactElement } from 'react'

type IconProps = { className?: string }

export function ChevronDown({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M1011 688Q997 703 976.5 703.5Q956 704 942 690L512 283L82 690Q68 704 47.5 703.5Q27 703 13 688Q-1 673 0.0 653.0Q1 633 15 619L478 180Q485 174 494.0 170.5Q503 167 512 167Q521 167 529.5 170.5Q538 174 546 180L1009 619Q1023 633 1024.0 653.0Q1025 673 1011 688Z" />
      </g>
    </svg>
  )
}

export function Phone({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.03-.24 11.4 11.4 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.44.57 3.56a1 1 0 0 1-.25 1.03l-2.2 2.2Z" />
    </svg>
  )
}

export function MenuBars({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
    </svg>
  )
}

export function Close({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/**
 * The hero's two glyphs, both lifted from
 * folixa-design-reference/pages/home/rendered.html where Elementor had already
 * inlined them as SVG: `e-fas-square` (the eyebrow bullet, Font Awesome Free 6)
 * and `e-eicon-play` (the video card, Elementor's own icon font).
 */
export function Square({ className }: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z" />
    </svg>
  )
}

export function Play({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M838 162C746 71 633 25 500 25 371 25 258 71 163 162 71 254 25 367 25 500 25 633 71 746 163 837 254 929 367 979 500 979 633 979 746 933 838 837 929 746 975 633 975 500 975 367 929 254 838 162M808 192C892 279 933 379 933 500 933 621 892 725 808 808 725 892 621 938 500 938 379 938 279 896 196 808 113 725 67 621 67 500 67 379 108 279 196 192 279 108 383 62 500 62 621 62 721 108 808 192M438 392V642L642 517 438 392Z" />
    </svg>
  )
}

/**
 * The about section's two glyphs.
 *
 * Sun is what the reference puts on the doctor photo card (element 34f35c4). It
 * is decorative theme dressing with no medical meaning -- kept for fidelity, but
 * jki-shield-light and far_check-circle are both better fits if the client wants
 * it swapped. FLAGGED FOR CLIENT REVIEW.
 */
export function Sun({ className }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z" />
    </svg>
  )
}

export function CheckCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
    </svg>
  )
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
  )
}

/**
 * The testimonials carousel's set.
 *
 * ArrowRight keeps its `translate(0,960) scale(1,-1)` group: the jki webfont is
 * y-flipped and that transform is part of the glyph, exactly as on ChevronDown
 * and the contact icons. Do not remove it.
 */
export function QuoteLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
    </svg>
  )
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M690 797q-11 11 -26 11t-26 -11q-11 -10 -11 -25t11 -26l262 -262h-864q-15 0 -25.5 -10.5t-10.5 -25.5t10.5 -25.5t25.5 -10.5h864l-262 -262q-11 -10 -11 -25.5t11 -25.5q11 -11 26 -11t26 11l323 323q11 11 11 26t-11 26l-323 323v0z" />
      </g>
    </svg>
  )
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M809 313q-16 16 -34.5 24.5t-38.5 8.5t-38.5 -8.5t-35.5 -24.5l-68 -68q-4 2 -8.5 4t-8.5 5q-5 2 -10.5 5t-10.5 6q-48 30 -92 70.5t-86 91.5q-20 26 -34 48t-24 44q13 12 25.5 24.5l24.5 24.5q4 5 9 9.5t9 9.5q34 34 34 74.5t-34 74.5l-59 59q-5 5 -10 10.5t-10 10.5 l-20 20l-20 20q-16 16 -34.5 24t-38.5 8t-38.5 -8t-34.5 -24v0h-1l-73 -75q-21 -20 -32.5 -45.5t-14.5 -54.5q-4 -47 6.5 -89t21.5 -71q26 -71 66.5 -138.5t98.5 -137.5q36 -43 75 -80q39 -38 81.5 -71.5t87.5 -61.5q46 -29 95 -52q37 -18 85.5 -35.5t104.5 -21.5h6.5h7.5 q37 0 68.5 13.5t55.5 40.5h1v1q9 10 18.5 19.5l19.5 19.5q7 6 14 13t14 15q16 16 24.5 35t8.5 39t-8.5 39t-25.5 36l-119 119v0zM887 85h-1h1q-7 -7 -13.5 -13t-13.5 -13l-21 -21t-21 -22q-16 -18 -36 -26.5t-45 -8.5h-4.5h-5.5q-48 4 -91.5 19.5t-76.5 31.5q-46 22 -89 49 t-83 58t-77 67t-70 76q-55 67 -93 130t-63 129q-15 40 -20.5 73t-3.5 62q2 19 9 35t21 29l73 74q8 8 16.5 11.5t16.5 3.5q10 0 18.5 -5t13.5 -10v0v0l19.5 -19.5l19.5 -19.5l10.5 -10.5l10.5 -10.5l59 -59q17 -17 17 -33.5t-17 -33.5l-9.5 -9.5l-9.5 -9.5q-13 -14 -26.5 -27 t-27.5 -25q0 -1 -0.5 -1h-0.5q-14 -14 -14 -27t3 -22v-1.5t1 -0.5q11 -28 28 -55.5t41 -58.5h1q44 -55 92 -98.5t100 -76.5q6 -4 13 -7.5l13 -6.5t11.5 -6t10.5 -6l1 -0.5l1 -0.5q6 -3 11 -4.5t11 -1.5q13 0 21.5 6t10.5 9l74 74q6 6 14.5 11t18.5 5t18 -5t13 -10v-1h1 l119 -119q16 -17 16 -34t-16 -34v0zM553 704q43 -8 81 -27.5t69 -50.5q30 -31 50 -69t27 -80q2 -11 10 -17.5t19 -6.5h2h3q12 2 19 12t5 22q-9 51 -33 97t-61 83t-83 61t-97 33q-12 2 -22 -5t-12 -19q-2 -11 4.5 -21t18.5 -12v0zM1023 495q-7 43 -21 83q-13 40 -32.5 77.5 t-44.5 72.5q-26 34 -56 65q-31 30 -65 55q-35 26 -72.5 45t-77.5 33q-40 13 -82 21q-12 2 -22 -5t-12 -19t5 -22t19 -12q76 -13 143.5 -48t122.5 -90q55 -54 90 -122t47 -143q2 -11 10.5 -17.5t18.5 -6.5h3h2q12 2 19 12t5 21v0z" />
      </g>
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M1023 694q0 22 -15 37t-37 15v0v0l-919 -1q-10 0 -19.5 -4t-17.5 -11q-7 -8 -11 -17.5t-4 -19.5l1 -517q0 -10 4 -19.5t11 -17.5q8 -7 17.5 -11t19.5 -4v0v0l919 1q21 0 36.5 15.5t15.5 37.5zM913 694l-401 -279l-402 278zM682 362l238 -184l-816 -1l239 185q9 7 10 17.5 t-5 19.5q-7 9 -17.5 10t-19.5 -5l-258 -200l-1 465l445 -308q4 -2 7.5 -3t7.5 -1t8 1t7 3l444 309l1 -466l-258 200q-9 6 -19.5 5t-17.5 -10t-5.5 -19.5t10.5 -17.5v0z" />
      </g>
    </svg>
  )
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M608 864c-176.352 0-320-143.648-320-320 0-76.64 26.848-146.8 72-202l-255-255 46-46.062 255 255c55.168-45.12 125.36-71.938 202-71.938 176.352 0 320 143.648 320 320s-143.648 320-320 320zM608 800c141.76 0 256-114.24 256-256s-114.24-256-256-256c-141.76 0-256 114.24-256 256s114.24 256 256 256zM608 704c-70.688 0-128-57.312-128-128 0-96 128-224 128-224s128 128 128 224c0 70.688-57.312 128-128 128zM608 640c35.36 0 64-28.64 64-64 0-35.328-28.64-64-64-64s-64 28.672-64 64c0 35.36 28.64 64 64 64z" />
      </g>
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M512 832c-211.75 0-384-172.25-384-384s172.25-384 384-384c211.75 0 384 172.25 384 384s-172.25 384-384 384zM512 768c177.125 0 320-142.875 320-320s-142.875-320-320-320c-177.125 0-320 142.875-320 320s142.875 320 320 320zM480 704v-288h224v64h-160v224z" />
      </g>
    </svg>
  )
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
    </svg>
  )
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 576 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  )
}

/**
 * The process section's five step glyphs, from
 * folixa-design-reference/assets/icons/svg/ (jki-headset-solid,
 * jki-clipboard-list-solid, jki-eye, jki-dna-solid,
 * jki-hand-holding-heart-solid). Same y-flip caveat as the group above.
 *
 * The reference's process band only has four cards, so only Headset,
 * ClipboardList and HandHoldingHeart carry over from it directly. Eye and Dna
 * are picked from the same captured icon set for the two steps our content doc
 * adds. Eye stands in for Hairline Design rather than jki-search-location-solid,
 * which is already in use above as MapPinIcon; Dna replaces the reference's
 * jki-line-chart1-light on the graft step, where a line chart meant nothing.
 */
export function Headset({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M512 864c-193.5 0-352-158.5-352-352v-192c0-41.375 27-76.625 64-90v-6c0-87.875 72.125-160 160-160h41c11.125-19.125 31.375-32 55-32h64c35.25 0 64 28.75 64 64s-28.75 64-64 64h-64c-23.625 0-43.875-12.875-55-32h-41c-53 0-96 43-96 96h64v288h-128c0 158.5 129.5 288 288 288s288-129.5 288-288h-128v-288h96c52.625 0 96 43.375 96 96v192c0 193.5-158.5 352-352 352zM224 448h64v-160h-32c-17.75 0-32 14.25-32 32zM736 448h64v-128c0-17.75-14.25-32-32-32h-32z" />
      </g>
    </svg>
  )
}

export function ClipboardList({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M512 896c-40.32 0-68.795-28.48-82.875-64h-269.125v-800h704v800h-269.125c-14.080 35.52-42.555 64-82.875 64zM512 832c17.6 0 32-14.4 32-32v-32h96v-64h-256v64h96v32c0 17.6 14.4 32 32 32zM224 768h96v-128h384v128h96v-672h-576v672zM288 544v-64h64v64h-64zM416 544v-64h320v64h-320zM288 416v-64h64v64h-64zM416 416v-64h320v64h-320zM288 288v-64h64v64h-64zM416 288v-64h320v64h-320z" />
      </g>
    </svg>
  )
}

export function Eye({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M512 704c-266.75 0-472-235-472-235l-19-21 19-21c0 0 187.125-213.375 436-233 11.875-1.5 23.75-2 36-2s24.125 0.5 36 2c248.875 19.625 436 233 436 233l19 21-19 21c0 0-205.25 235-472 235zM512 640c70.5 0 135.5-19.25 192-45 20.375-33.75 32-72.625 32-115 0-115.625-86.75-210.625-199-223-0.625-0.125-1.375 0.125-2 0-7.625-0.375-15.25-1-23-1-8.5 0-16.75 0.5-25 1-112.25 12.375-199 107.375-199 223 0 41.75 11.25 80.625 31 114h-1c57 26.25 122.75 46 194 46zM512 576c-53 0-96-43-96-96s43-96 96-96c53 0 96 43 96 96s-43 96-96 96zM232 546c-5-21.5-8-43.125-8-66 0-56.125 16-108.625 44-153-80.625 46.625-136.625 102.25-155 121 15.375 15.75 58.25 57.5 119 98zM792 546c60.75-40.5 103.625-82.25 119-98-18.375-18.75-74.375-74.375-155-121 28 44.375 44 96.875 44 153 0 22.875-3 44.75-8 66z" />
      </g>
    </svg>
  )
}

export function Dna({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M192 800c0-96.75 41-172 99-231 46-46.875 101.875-85.375 159-121-133.375-84.25-258-176.375-258-352h64c0 150.25 121 232.25 255 315 31.875-19.625 63-38.75 92-59h-117c-32-19.25-60.25-41.625-89-64h285c1.625-1.625 3.375-3.375 5-5 18.25-18.5 34.375-38.125 47-59h-395c-16-19.25-25.375-41.625-35-64h456c5-19.75 8-40.75 8-64h64c0 96.75-41 172-99 231s-132 104-204 148c-72 44-142 87-192 138s-81 107.75-81 187zM768 800c0-23-3.75-44.125-9-64h-455c9.625-22.375 19-44.75 35-64h393c-14-23.125-31.75-44.125-52-64h-283c28.75-22.375 57-44.75 89-64h118c-19.25-14-39.5-28.125-60-42 19.25-12.75 38.75-22.25 58-35 121.625 80 230 173 230 333z" />
      </g>
    </svg>
  )
}

export function HandHoldingHeart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M464 864c-61.856 0-112-50.144-112-112 0-112 192-208 192-208s192 96 192 208c0 61.856-50.144 112-112 112-31.392 0-59.68-13.012-80-33.812-20.32 20.8-48.608 33.812-80 33.812zM464 800c12.928 0 25.098-5.124 34.25-14.5l17.063-17.5h57.375l17.063 17.5c9.152 9.376 21.322 14.5 34.25 14.5 26.464 0 48-21.536 48-48 0-40.352-67.392-98.427-128-134.875-60.64 36.48-128 94.523-128 134.875 0 26.464 21.536 48 48 48zM615 512.687l-52.375-36.75 83.5-119.125-115.25-79.813-81.375 42.125c37.602 18.931 86.2 43.403 86.375 43.5l0.375 0.25 0.313 0.187c30.798 18.126 46.578 55.504 36.313 91.062v0.062c-12.149 42.046-56.933 66.742-99 54.625h-0.062l-227.563-63.438-150.625-103.5 60.625-247.062 161.438 58.312 228.688-118.375 379.812 262.937-36.375 52.625-348.188-241.063-219.312 113.625-120.875-43.688-33.062 134.938 105.375 72.5 217.812 60.688c8.859 2.56 17.248-2.061 19.813-10.938 2.135-7.396-1.204-14.467-7.188-18.062-1.044-0.54-85.862-43.24-139.437-70.188l-56-28.125 226.937-117.562 199.813 138.375-120.5 171.875z" />
      </g>
    </svg>
  )
}

/** Maps SOCIAL.footerProfiles labels onto their glyphs. */
export const socialIcons: Record<string, (props: IconProps) => ReactElement> = {
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
}
