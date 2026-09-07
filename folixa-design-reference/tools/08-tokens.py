#!/usr/bin/env python3
"""Translate the Elementor Global Kit (post-6.css) into Vite/Tailwind-ready tokens.

Elementor names globals by opaque hash. We resolve each hash to the semantic role
it actually plays, proven from the h1-h6 / button bindings in the same file.
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
kit  = (ROOT / "tokens/globals-raw.css").read_text()

# --- colors: hash -> semantic name (roles verified from kit bindings) ---
COLOR_ROLE = {
    "primary":   ("primary",      "Brand blue. Buttons, links, icons, active states."),
    "e5665f6":   ("primary-dark", "Button/link hover. Deep blue."),
    "secondary": ("secondary",    "All headings h1-h6."),
    "text":      ("body",         "Body copy, the kit's default text color."),
    "accent":    ("accent",       "Pale blue tint. Chips, soft section fills, icon backdrops."),
    "c7e169d":   ("surface",      "Off-white alternating section background."),
    "ef3ace8":   ("line",         "Hairline borders, dividers, card outlines."),
    "019d18d":   ("base",         "White. Page ground, button text, cards."),
    "f8a5795":   ("overlay",      "Black 20% - image scrims and overlays."),
}
# --- typography: hash -> semantic name (proven from h1..h6 + button bindings) ---
TYPE_ROLE = {
    "972b0e2": ("h1",      "Page/hero title"),
    "92920f8": ("h2",      "Section title"),
    "87861d3": ("h3",      "Sub-section title"),
    "6cd0e45": ("h4",      "Block title"),
    "dfbf025": ("h5",      "Card title"),
    "5b17955": ("h6",      "Eyebrow / label / small card title"),
    "3c1b31e": ("button",  "Buttons and nav links"),
    "68449bf": ("body",    "Default body copy"),
    "e5a9501": ("body-lg", "Lead paragraph / intro copy"),
}

def grab(pat):
    return {m.group(1): m.group(2).strip()
            for m in re.finditer(pat, kit)}

raw_colors = grab(r'--e-global-color-([a-z0-9_]+):([^;]+);')
raw_type   = {}
for m in re.finditer(r'--e-global-typography-([a-z0-9_]+)-([a-z-]+):([^;]+);', kit):
    raw_type.setdefault(m.group(1), {})[m.group(2)] = m.group(3).strip()

colors = {}
for h, (name, note) in COLOR_ROLE.items():
    if h in raw_colors:
        colors[name] = {"value": raw_colors[h], "elementor": f"--e-global-color-{h}", "usage": note}

typography = {}
for h, (name, note) in TYPE_ROLE.items():
    p = raw_type.get(h, {})
    typography[name] = {
        "fontFamily":    p.get("font-family", "").strip('"'),
        "fontSize":      p.get("font-size"),
        "fontWeight":    p.get("font-weight"),
        "lineHeight":    p.get("line-height"),
        "letterSpacing": p.get("letter-spacing"),
        "textTransform": p.get("text-transform", "none"),
        "elementor":     f"--e-global-typography-{h}",
        "usage":         note,
    }

tokens = {
    "source": "https://preview.raddito.net/folixa/ - Elementor Global Kit (post-6.css)",
    "colors": colors,
    "typography": typography,
    "fontFamily": {
        "head": ["Manrope", "system-ui", "sans-serif"],
        "body": ["Inter", "system-ui", "sans-serif"],
    },
    # weights actually referenced by the kit
    "fontWeights": {"Manrope": [500, 600, 700], "Inter": [400]},
    "layout": {
        "containerMaxWidth": {"desktop": "1240px", "tablet": "1024px", "mobile": "767px"},
        "breakpoints": {"tablet": "1024px", "mobile": "767px"},
        "widgetSpacing": "20px",
    },
    "radius":  {"sm": "4px", "DEFAULT": "0.5rem", "lg": "1rem", "pill": "100px", "none": "0"},
    # Confirmed rhythm, read off the section containers at all three breakpoints:
    # section padding-y and inner gap both step down one notch per breakpoint,
    # while horizontal padding stays a constant 1.25rem.
    "spacing": {"section-y": "5rem", "section-y-tablet": "4rem", "section-y-mobile": "3rem",
                "gap": "4rem", "gap-tablet": "3rem", "gap-mobile": "2rem",
                "gutter": "1.25rem", "gap-sm": "1.25rem", "gap-xs": "8px"},
    "rhythm": {
        "desktop": {"sectionPaddingY": "5rem", "gap": "4rem", "paddingX": "1.25rem"},
        "tablet":  {"sectionPaddingY": "4rem", "gap": "3rem", "paddingX": "1.25rem"},
        "mobile":  {"sectionPaddingY": "3rem", "gap": "2rem", "paddingX": "1.25rem"},
    },
    "effects": {
        "imageRadius": "0.5rem",
        "transitionDuration": "0.3s",
        "boxShadow": "none - every shadow in the kit is rgba(0,0,0,0); the design is flat",
    },
    "button": {
        "background": "#3E74D9", "hoverBackground": "#1A4FB2", "color": "#FFFFFF",
        "radius": "0.5rem", "padding": "1rem 1.5rem",
        "typography": "button (Manrope 500 / 1.125rem / 1em / -0.01em)",
    },
}

(ROOT/"tokens/tokens.json").write_text(json.dumps(tokens, indent=2) + "\n")

# ---------- tokens.css ----------
css = ["/* Folixa design tokens - generated from Elementor Global Kit post-6.css */",
       ":root {", "  /* color */"]
for n, d in colors.items():
    css.append(f"  --color-{n}: {d['value']};")
css.append("\n  /* type */")
css.append('  --font-head: "Manrope", system-ui, sans-serif;')
css.append('  --font-body: "Inter", system-ui, sans-serif;')
for n, d in typography.items():
    if d["fontSize"]:
        css.append(f"  --text-{n}: {d['fontSize']};")
        css.append(f"  --text-{n}-lh: {d['lineHeight']};")
        css.append(f"  --text-{n}-ls: {d['letterSpacing']};")
        css.append(f"  --text-{n}-fw: {d['fontWeight']};")
css.append("\n  /* layout */")
css.append("  --container: 1240px;")
for n, v in tokens["radius"].items():
    css.append(f"  --radius-{n.lower()}: {v};")
for n, v in tokens["spacing"].items():
    css.append(f"  --space-{n}: {v};")
css.append("  --transition: 0.3s;")
css.append("}")
(ROOT/"tokens/tokens.css").write_text("\n".join(css) + "\n")

# ---------- tailwind.config.js ----------
def q(s): return json.dumps(s)
tw = [
"/** Folixa -> Tailwind. Generated from the Elementor Global Kit (post-6.css).",
" *  Sizes keep Folixa's original clamp() values, so type stays fluid with no",
" *  responsive variants needed. */",
"export default {",
"  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],",
"  theme: {",
"    container: { center: true, padding: '1.25rem', screens: { DEFAULT: '1240px' } },",
"    screens: {",
"      // Elementor's breakpoints are max-width; these are the min-width equivalents.",
"      md: '768px',   // above Elementor mobile (max 767px)",
"      lg: '1025px',  // above Elementor tablet (max 1024px)",
"      xl: '1240px',",
"    },",
"    extend: {",
"      colors: {",
]
for n, d in colors.items():
    tw.append(f"        {q(n)}: {q(d['value'])},  // {d['usage']}")
tw += ["      },",
"      fontFamily: {",
"        head: ['Manrope', 'system-ui', 'sans-serif'],",
"        body: ['Inter', 'system-ui', 'sans-serif'],",
"      },",
"      fontSize: {"]
for n, d in typography.items():
    if not d["fontSize"]:
        continue
    tw.append(f"        {q(n)}: [{q(d['fontSize'])}, {{ lineHeight: {q(d['lineHeight'] or '1.5em')}, "
              f"letterSpacing: {q(d['letterSpacing'] or '0em')}, fontWeight: {q(d['fontWeight'] or '400')} }}],")
tw += ["      },",
"      borderRadius: {"]
for n, v in tokens["radius"].items():
    tw.append(f"        {q(n)}: {q(v)},")
tw += ["      },",
"      spacing: {"]
for n, v in tokens["spacing"].items():
    tw.append(f"        {q(n)}: {q(v)},")
tw += ["      },",
"      transitionDuration: { DEFAULT: '300ms' },",
"      // Folixa's entire motion system: one entrance animation and one hover lift.",
"      // Values are verbatim from Elementor's fadeInUp.min.css / e-animation-float.min.css.",
"      keyframes: {",
"        fadeInUp: { from: { opacity: '0', transform: 'translate3d(0, 100%, 0)' },",
"                    to:   { opacity: '1', transform: 'none' } },",
"      },",
"      animation: {",
"        // Elementor runs .animated at 1.25s; delays used on the site are 100-500ms.",
"        fadeInUp: 'fadeInUp 1.25s both',",
"      },",
"      transitionTimingFunction: { float: 'ease-out' },",
"    },",
"  },",
"  plugins: [],",
"}",
]
(ROOT/"tokens/tailwind.config.js").write_text("\n".join(tw) + "\n")
print(f"colors={len(colors)} typography={len(typography)} -> tokens.json / tokens.css / tailwind.config.js")
