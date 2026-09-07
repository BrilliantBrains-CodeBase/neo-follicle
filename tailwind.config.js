/** Folixa -> Tailwind. Generated from the Elementor Global Kit (post-6.css).
 *  Sizes keep Folixa's original clamp() values, so type stays fluid with no
 *  responsive variants needed. */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    container: { center: true, padding: '1.25rem', screens: { DEFAULT: '1240px' } },
    screens: {
      // Elementor's breakpoints are max-width; these are the min-width equivalents.
      md: '768px',   // above Elementor mobile (max 767px)
      lg: '1025px',  // above Elementor tablet (max 1024px)
      xl: '1240px',
    },
    extend: {
      colors: {
        "primary": "#3E74D9",  // Brand blue. Buttons, links, icons, active states.
        "primary-dark": "#1A4FB2",  // Button/link hover. Deep blue.
        "secondary": "#1A1A1A",  // All headings h1-h6.
        "body": "#444444",  // Body copy, the kit's default text color.
        "accent": "#E2ECFF",  // Pale blue tint. Chips, soft section fills, icon backdrops.
        "surface": "#F8FAFC",  // Off-white alternating section background.
        "line": "#E5E7EB",  // Hairline borders, dividers, card outlines.
        "base": "#FFFFFF",  // White. Page ground, button text, cards.
        "overlay": "#00000033",  // Black 20% - image scrims and overlays.
      },
      fontFamily: {
        head: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        "h1": ["clamp(2.5rem, 1.8rem + 2.25vw, 4rem)", { lineHeight: "1.1em", letterSpacing: "-0.03em", fontWeight: "700" }],
        "h2": ["clamp(2rem, 1.5rem + 2vw, 3.3rem)", { lineHeight: "1.2em", letterSpacing: "-0.03em", fontWeight: "700" }],
        "h3": ["clamp(1.6rem, 1.2rem + 1.5vw, 2.5rem)", { lineHeight: "1.2em", letterSpacing: "-0.03em", fontWeight: "600" }],
        "h4": ["clamp(1.4rem, 1.1rem + 1vw, 1.8rem)", { lineHeight: "1.2em", letterSpacing: "-0.03em", fontWeight: "600" }],
        "h5": ["clamp(1.2rem, 1rem + 0.6vw, 1.35rem)", { lineHeight: "1.2em", letterSpacing: "-0.02em", fontWeight: "600" }],
        "h6": ["clamp(1.05rem, 0.95rem + 0.4vw, 1.125rem)", { lineHeight: "1.2em", letterSpacing: "-0.02em", fontWeight: "500" }],
        "button": ["1.125rem", { lineHeight: "1em", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body": ["1rem", { lineHeight: "1.5em", letterSpacing: "0em", fontWeight: "400" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5em", letterSpacing: "0em", fontWeight: "400" }],
      },
      borderRadius: {
        "sm": "4px",
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "pill": "100px",
        "none": "0",
      },
      spacing: {
        "section-y": "5rem",
        "section-y-tablet": "4rem",
        "section-y-mobile": "3rem",
        "gap": "4rem",
        "gap-tablet": "3rem",
        "gap-mobile": "2rem",
        "gutter": "1.25rem",
        "gap-sm": "1.25rem",
        "gap-xs": "8px",
      },
      transitionDuration: { DEFAULT: '300ms' },
      // Folixa's entire motion system: one entrance animation and one hover lift.
      // Values are verbatim from Elementor's fadeInUp.min.css / e-animation-float.min.css.
      keyframes: {
        fadeInUp: { from: { opacity: '0', transform: 'translate3d(0, 100%, 0)' },
                    to:   { opacity: '1', transform: 'none' } },
      },
      animation: {
        // Elementor runs .animated at 1.25s; delays used on the site are 100-500ms.
        //
        // `backwards`, NOT `both`. Animation declarations outrank normal and
        // :hover rules in the cascade, so a `both` fill made the final keyframe's
        // `transform: none` permanent -- silently killing the hover lift on every
        // element that also carries this class (Hero's video card, the services
        // cards). `backwards` still holds the `from` state through the delay,
        // which is what prevents the flash, and the `to` state is identical to
        // the element's natural styling, so reverting after it ends is a no-op.
        fadeInUp: 'fadeInUp 1.25s backwards',
      },
      transitionTimingFunction: { float: 'ease-out' },
    },
  },
  plugins: [],
}
