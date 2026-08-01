#!/usr/bin/env python3
"""Generate nds-theme/theme.json from the DGA token values (source of truth:
_sass/themes/_dga.scss + _sass/tokens/_primitives.scss in NDS-vanilla).

Run from the repo root:  python3 nds-theme/scripts/generate-theme-json.py
Output: nds-theme/theme.json  (then validate with: node -e "JSON.parse(require('fs').readFileSync('nds-theme/theme.json'))")
"""
import json, os

OUT = os.path.join(os.path.dirname(__file__), "..", "theme.json")

# ── DGA palette (from _sass/themes/_dga.scss) ──────────────────────────────
PRIMARY = {"25":"#f7fdf9","50":"#f3fcf6","100":"#dff6e7","200":"#b8eacb","300":"#88d8ad","400":"#54c08a","500":"#25935f","600":"#1b8354","700":"#166a45","800":"#14573a","900":"#104631","950":"#092a1e"}
SECONDARY = {"25":"#fffef7","50":"#fffef2","100":"#fffce6","200":"#fcf3bd","300":"#fae996","400":"#f7d54d","500":"#f5bd02","600":"#dba102","700":"#b87b02","800":"#945c01","900":"#6e3c00","950":"#472400"}
TERTIARY = {"25":"#fefcff","50":"#f9f5fa","100":"#f2e9f5","200":"#e1cce8","300":"#ccadd9","400":"#a57bba","500":"#80519f","600":"#6d428f","700":"#532d75","800":"#3d1d5e","900":"#281047","950":"#16072e"}
NEUTRAL = {"25":"#fcfcfd","50":"#f9fafb","100":"#f3f4f6","200":"#e5e7eb","300":"#d2d6db","400":"#9da4ae","500":"#6c727e","600":"#4d5761","700":"#384250","750":"#2b3643","800":"#1f2a37","850":"#18212f","900":"#111927","950":"#0c111b"}
BLUE = {"25":"#f5faff","50":"#eff8ff","100":"#d1e9ff","200":"#b2ddff","300":"#84caff","400":"#53b0fd","500":"#2e90fa","600":"#156fee","700":"#175cd3","800":"#1849a9","900":"#194084","950":"#102a56"}
GREEN = {"25":"#f6fef9","50":"#ecfdf3","100":"#dcfae6","200":"#abefc6","300":"#75dfa6","400":"#47cd89","500":"#17b169","600":"#069454","700":"#067647","800":"#085d3a","900":"#074c30","950":"#053321"}
YELLOW = {"25":"#fffcf5","50":"#fffaeb","100":"#fef0c7","200":"#fedf89","300":"#fec84b","400":"#fdb022","500":"#f79009","600":"#dc6803","700":"#b54707","800":"#93370c","900":"#7a2e0e","950":"#4e1d09"}
RED = {"25":"#fffbfa","50":"#fef3f2","100":"#fee4e2","200":"#fecdca","300":"#fca19b","400":"#f97066","500":"#f04437","600":"#d92c20","700":"#b42318","800":"#912018","900":"#7a2619","950":"#54150c"}

def ramp(name, family, rungs=None):
    out = []
    for rung, hexv in family.items():
        if rungs is None or rung in rungs:
            out.append({"name": f"{name} {rung}", "slug": f"{name.lower()}-{rung.lower()}", "color": hexv})
    return out

palette = []
palette += ramp("Primary", PRIMARY)
palette += ramp("Secondary", SECONDARY)
palette += ramp("Tertiary", TERTIARY)
palette += ramp("Neutral", NEUTRAL)
palette += ramp("Blue", BLUE)
palette += ramp("Green", GREEN)
palette += ramp("Yellow", YELLOW)
palette += ramp("Red", RED)
palette += [{"name": "Base White", "slug": "base-white", "color": "#ffffff"},
            {"name": "Base Black", "slug": "base-black", "color": "#161616"}]

gradients = [{
    "name": "Primary Gradient",
    "slug": "primary-gradient",
    "gradient": "linear-gradient(135deg, #104631 0%, #1b8354 100%)",
}]

# ── Typography (fluid clamps from _sass/tokens/_primitives.scss) ───────────
def fluid(name, min_px, max_px):
    return {"name": name, "slug": name.lower().replace(" ", "-"),
            "size": f"clamp({min_px}px, {_vw(min_px, max_px)}, {max_px}px)",
            "fluid": {"min": f"{min_px}px", "max": f"{max_px}px"}}

def _vw(lo, hi):
    # approx vw term matching the source clamps
    return f"{round((hi - lo) / 1200 * 100, 2)}vw"

font_sizes = [
    fluid("Display 2XL", 48, 72), fluid("Display XL", 40, 60), fluid("Display LG", 32, 48),
    fluid("Display MD", 24, 36), fluid("Display SM", 20, 30), fluid("Display XS", 18, 24),
    fluid("Text XL", 16, 20), fluid("Text LG", 14, 18), fluid("Text MD", 12, 16),
    fluid("Text SM", 10, 14), fluid("Text XS", 8, 12), fluid("Text 2XS", 8, 10),
]

ARABIC_RANGE = "U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC4, U+10EFC-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E, U+1EE80-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1"
LATIN_RANGE = "U+0000, U+000D, U+0020-007E, U+00A0-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+2030, U+2039-203A, U+2044, U+20AC, U+2122, U+2212, U+FB01-FB02"

def face(weight, src, unicode_range):
    return {"fontFamily": "IBM Plex Sans Arabic", "fontWeight": weight,
            "fontStyle": "normal", "fontDisplay": "swap",
            "src": [f"file:./assets/fonts/{src}"], "unicodeRange": unicode_range}

ibm_faces = [
    face("300 400", "IBMPlexSansArabic-Regular.woff2", ARABIC_RANGE),
    face("500", "IBMPlexSansArabic-Medium.woff2", ARABIC_RANGE),
    face("600", "IBMPlexSansArabic-SemiBold.woff2", ARABIC_RANGE),
    face("700", "IBMPlexSansArabic-Bold.woff2", ARABIC_RANGE),
    face("300 400", "IBMPlexSans-Regular-Latin1.woff2", LATIN_RANGE),
    face("500", "IBMPlexSans-Medium-Latin1.woff2", LATIN_RANGE),
    face("600", "IBMPlexSans-SemiBold-Latin1.woff2", LATIN_RANGE),
    face("700", "IBMPlexSans-Bold-Latin1.woff2", LATIN_RANGE),
]

# ── Spacing (4px grid rungs from _sass/tokens/_primitives.scss) ────────────
SPACING = {"xs": 4, "sm": 6, "md": 8, "lg": 12, "xl": 16, "2xl": 20, "3xl": 24,
           "4xl": 32, "5xl": 40, "6xl": 48, "7xl": 64, "8xl": 80, "9xl": 96,
           "10xl": 128, "11xl": 160}
spacing_sizes = [{"name": f"Spacing {s}", "slug": s, "size": f"{v}px"} for s, v in SPACING.items()]

# ── Custom (semantic/app-shell) tokens ─────────────────────────────────────
custom = {
    "nds": {
        "navHeight": "72px",
        "sidemenuWidth": "260px",
        "sideinfoWidth": "400px",
        "viewportPadding": "32px",
        "contentMaxWidth": "1280px",
        "radiusSm": "4px",
        "radiusMd": "8px",
        "radiusLg": "16px",
        "transitionSpeed": "0.2s",
    }
}

theme = {
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        "appearanceTools": True,
        "color": {
            "defaultPalette": False,
            "defaultGradients": False,
            "palette": palette,
            "gradients": gradients,
        },
        "typography": {
            "fluid": True,
            "fontFamilies": [{
                "fontFamily": '"IBM Plex Sans Arabic", sans-serif',
                "slug": "ibm-plex-sans-arabic",
                "name": "IBM Plex Sans Arabic",
                "fontFace": ibm_faces,
            }],
            "fontSizes": font_sizes,
        },
        "spacing": {"spacingSizes": spacing_sizes},
        "layout": {"contentSize": "1280px", "wideSize": "1600px"},
        "custom": custom,
    },
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--neutral-50)",
            "text": "var(--wp--preset--color--neutral-900)",
        },
        "typography": {
            "fontFamily": "var(--wp--preset--font-family--ibm-plex-sans-arabic)",
            "fontSize": "var(--wp--preset--font-size--text-md)",
            "lineHeight": "1.6",
        },
        "elements": {
            "heading": {"color": "var(--wp--preset--color--neutral-800)", "typography": {"fontWeight": "700", "lineHeight": "1.25"}},
            "link": {"color": "var(--wp--preset--color--primary-600)", "textDecoration": "none", ":hover": {"color": "var(--wp--preset--color--primary-700)", "textDecoration": "underline"}},
            "button": {"color": "var(--wp--preset--color--base-white)", "backgroundColor": "var(--wp--preset--color--primary-600)", "borderRadius": "var(--wp--custom--nds--radius-md)"},
        },
        "blocks": {
            "core/button": {"borderRadius": "var(--wp--custom--nds--radius-md)"},
            "core/separator": {"color": "var(--wp--preset--color--neutral-200)"},
        },
        "css": ":root { color-scheme: light; }",
    },
    "templateParts": [
        {"name": "header", "title": "Header", "area": "header"},
        {"name": "topbar", "title": "Top Bar", "area": "header"},
        {"name": "mainnav", "title": "Main Navigation", "area": "header"},
        {"name": "footer", "title": "Footer", "area": "footer"},
        {"name": "post-meta", "title": "Post Meta", "area": "uncategorized"},
        {"name": "cookie-popup", "title": "Cookie Popup", "area": "uncategorized"},
        {"name": "accessibility", "title": "Accessibility Panel", "area": "uncategorized"},
        {"name": "user-feedback", "title": "User Feedback", "area": "uncategorized"},
    ],
    "customTemplates": [
        {"name": "template-service", "title": "Service", "postTypes": ["page"]},
        {"name": "template-faq", "title": "FAQ", "postTypes": ["page"]},
        {"name": "template-contact", "title": "Contact", "postTypes": ["page"]},
        {"name": "template-form", "title": "Multi-step Form", "postTypes": ["page"]},
        {"name": "template-kpis", "title": "KPIs Dashboard", "postTypes": ["page"]},
        {"name": "template-help", "title": "Help & Support", "postTypes": ["page"]},
        {"name": "template-about", "title": "About Entity", "postTypes": ["page"]},
        {"name": "template-e-participation", "title": "e-Participation", "postTypes": ["page"]},
        {"name": "template-social", "title": "Social Media", "postTypes": ["page"]},
        {"name": "template-search", "title": "Search Landing", "postTypes": ["page"]},
    ],
}

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(theme, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"wrote {OUT} ({os.path.getsize(OUT)} bytes, {len(palette)} palette entries)")
