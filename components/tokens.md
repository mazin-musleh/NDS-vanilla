---
layout: page
title: Tokens
hero_title: Tokens - National Design System
hero_description: "The CSS custom properties behind NDS: the color palette, size scales, semantic meanings and component tokens that you read and override in your own CSS"
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.2.0"
updated: "1.5.0"
last_edit: "06/10/2026 - 10:10 AM"
---

<section id="tokensOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A token is a CSS custom property that NDS defines at `:root`. The tokens come in four tiers: the palette, the primitives, the semantic tokens and the component tokens. Each tier reads from the one below it, so a change low in the chain reaches everything above it. Dark mode changes the semantic and component tiers only.

Pick another page when:

- you change the brand colors of the whole site: [Themes](../components/themes)
- you style one element of a component: the CSS Custom Properties table in that component's API

</div>
  </div>
</section>

<section id="tokensMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Pick a pack. The preview lists each token with its value and a preview. Turn on Dark mode to see the dark values. A Dark value of `—` means the token has no dark value of its own: a token that reads another token still follows it.

The code is the pack as the NDS CSS declares it. To override tokens, copy it into your stylesheet and keep only the lines you change.

{% comment %} Agents: each pack is generated at build time by _plugins/tokens_data.rb. Read the names and values in _sass/themes/_dga.scss, _sass/tokens/_primitives.scss, _sass/tokens/_semantic.scss and _sass/tokens/_components.scss. {% endcomment %}
{%- assign _dev_target = site.version | remove: "-dev" %}
{%- if site.version != site.latest_release and page.updated == _dev_target %}

<div class="nds-alert nds-card nds-inline" data-status="info" role="alert">
  <span class="nds-feedback nds-alert-icon">
    <span class="nds-feedback-icon">
      <i class="nds-icon" aria-hidden="true"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <div class="nds-alert-text">
      <span class="nds-alert-title">Documentation preview</span>
      <p class="nds-alert-description">This page runs ahead of the current release (v{{ site.latest_release }}). It can list tokens that the published CSS does not have yet.</p>
    </div>
  </div>
</div>
{%- endif %}

<script type="text/html" id="tokens-spacing" data-canon data-generated data-variants="tokensVariantsTable" data-js="tokens-spacing-css">
{{ site.data.tokens.packs.spacing.html }}
</script>
<script type="text/html" id="tokens-spacing-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.spacing.css }}
</script>
<script type="text/html" id="tokens-radius" data-canon data-generated data-js="tokens-radius-css">
{{ site.data.tokens.packs.radius.html }}
</script>
<script type="text/html" id="tokens-radius-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.radius.css }}
</script>
<script type="text/html" id="tokens-typography" data-canon data-generated data-js="tokens-typography-css">
{{ site.data.tokens.packs.typography.html }}
</script>
<script type="text/html" id="tokens-typography-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.typography.css }}
</script>
<script type="text/html" id="tokens-font" data-canon data-generated data-js="tokens-font-css">
{{ site.data.tokens.packs.font.html }}
</script>
<script type="text/html" id="tokens-font-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.font.css }}
</script>
<script type="text/html" id="tokens-shell" data-canon data-generated data-js="tokens-shell-css">
{{ site.data.tokens.packs.shell.html }}
</script>
<script type="text/html" id="tokens-shell-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.shell.css }}
</script>
<script type="text/html" id="tokens-brand" data-canon data-generated data-js="tokens-brand-css">
{{ site.data.tokens.packs.brand.html }}
</script>
<script type="text/html" id="tokens-brand-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.brand.css }}
</script>
<script type="text/html" id="tokens-fixed" data-canon data-generated data-js="tokens-fixed-css">
{{ site.data.tokens.packs.fixed.html }}
</script>
<script type="text/html" id="tokens-fixed-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.fixed.css }}
</script>
<script type="text/html" id="tokens-background" data-canon data-generated data-js="tokens-background-css">
{{ site.data.tokens.packs.background.html }}
</script>
<script type="text/html" id="tokens-background-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.background.css }}
</script>
<script type="text/html" id="tokens-text" data-canon data-generated data-js="tokens-text-css">
{{ site.data.tokens.packs.text.html }}
</script>
<script type="text/html" id="tokens-text-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.text.css }}
</script>
<script type="text/html" id="tokens-border" data-canon data-generated data-js="tokens-border-css">
{{ site.data.tokens.packs.border.html }}
</script>
<script type="text/html" id="tokens-border-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.border.css }}
</script>
<script type="text/html" id="tokens-icon" data-canon data-generated data-js="tokens-icon-css">
{{ site.data.tokens.packs.icon.html }}
</script>
<script type="text/html" id="tokens-icon-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.icon.css }}
</script>
<script type="text/html" id="tokens-controls" data-canon data-generated data-js="tokens-controls-css">
{{ site.data.tokens.packs.controls.html }}
</script>
<script type="text/html" id="tokens-controls-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.controls.css }}
</script>
<script type="text/html" id="tokens-shadow" data-canon data-generated data-js="tokens-shadow-css">
{{ site.data.tokens.packs.shadow.html }}
</script>
<script type="text/html" id="tokens-shadow-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.shadow.css }}
</script>
<script type="text/html" id="tokens-component" data-canon data-generated data-js="tokens-component-css">
{{ site.data.tokens.packs.component.html }}
</script>
<script type="text/html" id="tokens-component-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.component.css }}
</script>

</div>
  </div>
</section>

<section id="tokensVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each pack is a set of tokens. Its preview is a table, a set of color ramps, or a type scale. Its code is the pack's rules from the NDS CSS.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Pack | Spacing (default) (hint: Primitive tokens) | — | — | Gaps, padding and margins, on a 4px grid |
| Pack | Radius (hint: Primitive tokens) | canon `#tokens-radius` | — | Corner radius |
| Pack | Typography (hint: Primitive tokens) | canon `#tokens-typography` | — | Font size (`-FS`), line height (`-LH`) and, for the fluid display sizes, the space below (`-MB`). Use each FS with its LH |
| Pack | Font (hint: Primitive tokens) | canon `#tokens-font` | — | The font family and the four font weights |
| Pack | Layout & shell (hint: Primitive tokens) | canon `#tokens-shell` | — | The page shell sizes, the content width and the transition |
| Pack | Brand colors (hint: Palette tokens) | canon `#tokens-brand` | — | The four brand ramps, which a theme replaces. Read them through a semantic token when one has the meaning |
| Pack | Base, status & alpha (hint: Palette tokens) | canon `#tokens-fixed` | — | Black, white, the white and black alphas, and the status ramps. A theme does not change them |
| Pack | Background (hint: Semantic tokens) | canon `#tokens-background` | — | Surface colors by meaning: page, card, menu, overlay, brand and status fills |
| Pack | Text (hint: Semantic tokens) | canon `#tokens-text` | — | Text colors by meaning: body, display, brand, status, on a colored fill, disabled |
| Pack | Border & focus (hint: Semantic tokens) | canon `#tokens-border` | — | Border colors by meaning, the divider and the focus ring |
| Pack | Icon (hint: Semantic tokens) | canon `#tokens-icon` | — | Icon colors by meaning, with their light fills and rings |
| Pack | Controls (hint: Semantic tokens) | canon `#tokens-controls` | — | The fills that checkbox, radio, switch and slider share |
| Pack | Shadow (hint: Semantic tokens) | canon `#tokens-shadow` | — | Shadows from `xs` to `3xl`, a top shadow and an inset shadow |
| Pack | Component (hint: Component tokens) | canon `#tokens-component` | — | Each component's own tokens, under a comment with its name. Set them to restyle that component alone |
{: #tokensVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tokensBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Palette

The palette tokens are the raw colors, named `--colors-*`. The brand ramps (primary, secondary, tertiary and neutral) are what a theme replaces. Base, the white and black alphas, and the four status hues stay fixed. A palette token has no dark value: `--colors-neutral-100` is the same color in both modes.

### Primitives

The primitives are the sizes: spacing, radius, typography, the page shell, the transition and the font. Each name carries its value: `--spacing-xl` is 16px. Typography sizes come in pairs, a font size (`-FS`) and a line height (`-LH`).

### Semantic Tokens

A semantic token names a meaning, such as `--text-error` or `--background-card`. Its value is a palette token. Most semantic tokens have a dark value.

### Component Tokens

A component token belongs to one component, named `--{component}-{property}-{variant}-{state}`. Its value is a semantic or palette token. Some have a dark value of their own, for the contrast that component needs.

### Knobs

A knob styles one element, such as `--btn-size`. It is undefined by default, and the component falls back to its own value. Set it in the element's `style` or on a class. A knob set on a wrapper reaches every component inside.

### Dark Mode

`data-theme="dark"` on `<html>` switches the semantic and component tokens to their dark values. On any other element, it makes that element a dark area: both tiers are declared again on it, with dark values. Some components also have dark rules of their own. Switching and saving the mode is on the [Themes](../components/themes) page.

### Override Scope

A token that reads another token takes its value where it is declared. The semantic and component tokens are declared at `:root`, so they read the palette there. A palette token set on a wrapper does not change them. On a wrapper, set the token that the component reads.

### Resolution Chain

A painted value goes down a chain from a knob to the palette. Change any token in the chain, and everything above it follows.

<script type="text/html" id="tokens-chain" data-canon data-lang="css" data-preview="none">
/* The primary button fill: knob, component token, palette */
--btn-bg: var(--button-background-primary-default);             /* knob, set by .nds-primary */
--button-background-primary-default: var(--colors-primary-600); /* component token */
--colors-primary-600: #1b8354;                                  /* palette */

/* The checked checkbox fill: component token, semantic token, palette */
--checkbox-primary-checked: var(--controls-primary-checked);    /* component token */
--controls-primary-checked: var(--colors-primary-600);          /* semantic token */
</script>

</div>
  </div>
</section>

<section id="tokensExamples" class="nds-content-section nds-doc-examples">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Examples</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The examples set tokens in a `style` attribute, so the preview shows them. In your project, write the same declarations in your stylesheet.

### Own Element

An element of your own, styled only with tokens. It changes with the mode and needs no dark rule.

<script type="text/html" id="tokens-own-element" data-canon>
<!-- An element of your own, styled only with semantic and primitive tokens -->
<div style="background: var(--background-info-light); border: 1px solid var(--border-info-light); border-radius: var(--radius-md); padding: var(--spacing-xl); color: var(--text-info); font-size: var(--typo-text-sm-FS); line-height: var(--typo-text-sm-LH);">
  Office hours change to 9:00 AM - 3:00 PM during Ramadan.
</div>
</script>

### Wrapper Override

Every primary button inside one element takes another color.

<script type="text/html" id="tokens-scope" data-canon>
<!-- Every primary button inside this element takes the tertiary brand color.
     The four tokens are the button's whole state family -->
<div class="nds-flex" style="--button-background-primary-default: var(--colors-tertiary-600); --button-background-primary-hovered: var(--colors-tertiary-700); --button-background-primary-pressed: var(--colors-tertiary-900); --button-background-primary-selected: var(--colors-tertiary-800);">
  <button type="button" class="nds-btn nds-primary">
    <span class="nds-label">Submit</span>
  </button>
  <button type="button" class="nds-btn nds-primary">
    <span class="nds-label">Save draft</span>
  </button>
</div>
</script>

### One-element Knob

A knob changes one element, and its neighbors keep the default.

<script type="text/html" id="tokens-knob" data-canon>
<!-- A knob changes one element. Here it reads a radius token -->
<div class="nds-flex">
  <button type="button" class="nds-btn nds-primary">
    <span class="nds-label">Default</span>
  </button>
  <button type="button" class="nds-btn nds-primary" style="--btn-radius: var(--radius-full);">
    <span class="nds-label">Rounded</span>
  </button>
</div>
</script>

### Site-wide Override

To change a token on every page, set it in your own stylesheet and load that stylesheet after `nds-main.min.css`. Repeat both NDS selectors. A dark area declares every token again with the NDS values, so a plain `:root` rule does not reach it.

<script type="text/html" id="tokens-override" data-canon data-lang="css" data-preview="none">
/* Light mode. Dark areas match too, which keeps your value there for a token with no dark value */
:root,
[data-theme~="dark"]:not(:root) {
  --background-card: #fffdf5;
}

/* Dark mode and dark areas. This rule comes last, so a dark area takes its value */
:root[data-theme~="dark"],
[data-theme~="dark"]:not(:root) {
  --background-card: #26221a;
}
</script>

</div>
  </div>
</section>

<section id="tokensFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-file-sync"></i>
            <span class="nds-label">Packs From the Source</span>
          </span>
          <p class="nds-item-desc">The build reads each pack from the token source: its names, values, dark values and rules. The packs show what the CSS ships.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-moon-02"></i>
            <span class="nds-label">Dark Values</span>
          </span>
          <p class="nds-item-desc">The semantic and component tiers each have a dark block. A style that reads them changes with the mode and needs no dark rule of its own.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Fluid Typography</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-css">--typo-display-clamp-*</code> and <code class="nds-inline-code lang-css">--typo-text-clamp-*</code> sizes grow with the screen width, between a minimum and a maximum.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-accessibility"></i>
            <span class="nds-label">Font Sizing</span>
          </span>
          <p class="nds-item-desc">Every font size and line height multiplies by <code class="nds-inline-code lang-css">--user-font-scale</code>, which the <a href="../components/accessibility">Accessibility</a> panel sets.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-field"></i>
            <span class="nds-label">Phone Padding</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-css">--nds-viewport-padding</code> is 32px, and half of that below 600px.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-bold"></i>
            <span class="nds-label">Weights per Theme</span>
          </span>
          <p class="nds-item-desc">The themes with a font of their own, Cairo or Readex Pro, set the <code class="nds-inline-code lang-css">--font-weight-*</code> tokens one step lower: 300 to 600.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="tokensPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use an NDS component before you style an element of your own. Tokens are for the CSS you write.
- Write `var(--token)` for every color, size and shadow. Never write a hex value or a pixel size that a token names.
- In your own CSS, pick a semantic token by its meaning. Do not read a component token because its value matches today: it can change with that component.
- Use a palette token only when no semantic token has the meaning. Take every state of a family from the same tier.
- Pair each font size with its line height: `--typo-text-md-FS` with `--typo-text-md-LH`.
- To restyle one component in one place, set its component tokens on a wrapper. Set every state of the family, or the hover color stays the old one.
- Set palette tokens at `:root` only. On a wrapper, they do not reach the tokens that read them.
- To change a token on every page, load your stylesheet after `nds-main.min.css` and repeat both NDS selectors. A sheet that loads first loses, and the override does nothing.
- Give a site-wide override a dark value too. Without one, a token that has an NDS dark value shows that value in dark mode.
- To change the brand colors, use a theme from the [Themes](../components/themes) page: seed colors, or a stylesheet that sets every step of a ramp. Do not change one step of a ramp alone.

</div>
  </div>
</section>

<section id="tokensApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Name Patterns
{: .nds-block-title}

A semantic or component name says what the value is for. It never names a color or a shade number.

| Tier | Pattern | Example |
|---|---|---|
| Semantic | `--{property}-{role}-{modifier}-{state}` | `--text-oncolor-primary`, `--background-error-light` |
| Component | `--{component}-{property}-{variant}-{state}` | `--button-background-primary-hovered` |
{: .nds-table .nds-responsive}

### Name Parts
{: .nds-block-title}

| Part | Meaning |
|---|---|
| `primary`, `secondary`, `tertiary`, `neutral` | The brand and neutral roles |
| `success`, `info`, `warning`, `error` | The status roles. Each has background, text, border and icon tokens |
| `light` | A tint of the base meaning, for soft surfaces and borders |
| `faint` | The lightest tint, one step below `light` |
| `strong` | A deep, stronger form of the base meaning |
| `oncolor` | For an element on a colored or dark fill. It does not change in dark mode. It comes last, before the state |
| `default`, `hovered`, `pressed`, `selected`, `focused`, `disabled`, `checked` | The state. A name with no state is the resting state. `pressed` is the `:active` state |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tokensRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Themes](../components/themes): brand colors from seed colors, dark mode and dark areas.
- [Accessibility](../components/accessibility): the Font Sizing setting behind `--user-font-scale`.
- [Button](../components/button): every button knob, in its API.

</div>
  </div>
</section>
