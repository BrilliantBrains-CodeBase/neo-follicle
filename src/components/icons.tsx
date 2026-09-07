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

/** Maps SOCIAL.footerProfiles labels onto their glyphs. */
export const socialIcons: Record<string, (props: IconProps) => ReactElement> = {
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
}
