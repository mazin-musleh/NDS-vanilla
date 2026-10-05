---
layout: page
title: Themes
hero_title: Themes - National Design System
hero_description: Dark mode, a theme menu, and your own brand colors, from a few seed colors or a stylesheet that overrides the color tokens.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.1.0"
updated: "1.12.x"
last_edit: "05/10/2026 - 10:20 PM"
---

<section id="themesOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Themes set the page's colors: light or dark mode, and a palette. The `data-theme` attribute on `<html>` holds both, as a list of words. `dark` turns on dark mode, and a theme name such as `crimson` picks a palette: `data-theme="dark crimson"`. With no attribute, the page shows the DGA palette in light mode. A dark mode button and a theme menu write the attribute for the user, and save the choice. Dark mode is experimental: it is not checked against the DGA standards yet.

Pick another component when:

- you need the token names to use in your own CSS: [Tokens](../components/tokens)
- one section needs a deep primary or dark background: [Section](../layout/section)

</div>
  </div>
</section>

<section id="themesMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="theme-toggle" data-canon data-screens="none" data-variants="themesVariantsTable">
<button class="nds-btn nds-subtle nds-icon-only" data-theme-toggle aria-pressed="false" aria-label="Toggle dark mode">
  <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
</button>
</script>
<script type="text/html" id="theme-switch" data-canon>
<div class="nds-form-container nds-switch-container" data-theme-toggle>
  <div class="nds-form-header" data-feedback-target>
    <label for="theme-dark-switch">
      <span class="nds-label">Dark mode</span>
      <span class="nds-info">Switch between light and dark colors</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-switch nds-neutral">
      <input type="checkbox" id="theme-dark-switch" class="nds-switch-input" role="switch">
      <div class="nds-switch-track">
        <div class="nds-switch-thumb"></div>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="theme-menu" data-canon>
<div class="nds-dropmenu">
  <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
    <span class="nds-label">Theme</span>
  </button>
  <div class="nds-dropmenu-menu nds-theme-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="">
        <span class="nds-label">Default (DGA)</span>
      </button>
      <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="crimson">
        <span class="nds-label">Crimson</span>
      </button>
      <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="corporate">
        <span class="nds-label">Corporate</span>
      </button>
      <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="sunset">
        <span class="nds-label">Sunset</span>
      </button>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="themesVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The preview controls the real page: a click changes the look of this whole page, as it would on your site.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Button toggle (default) | — | — | The dark mode button. Put it in the [Top Bar](../ui-shell/topbar), so it is on every page |
| Structure | Switch toggle | canon `#theme-switch` | — | Dark mode as a setting, on a settings page |
| Structure | Theme menu | canon `#theme-menu` | — | A menu of themes. Each option names its theme in `data-theme-value`. The empty value is the DGA default |
{: #themesVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="themesBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Theme Menu
{: .nds-block-title}

A click on an option writes its `data-theme-value` into `data-theme` and keeps the `dark` word. A second click on the chosen option goes back to the DGA default. NDS ships three themes: `crimson`, `corporate` (Cairo font) and `sunset` (Readex Pro font). NDS loads a theme's font only when the theme is on.

Each pick also writes `?theme=name` in the address bar, so the user can copy the link. A page that opens with `?theme=name` applies that option, and `?theme=` with no name applies the default. The theme must be an option in a menu on that page.

### Custom Palette
{: .nds-block-title}

Set `data-palette` and the seed colors on `<html>`, and NDS builds the whole palette from them. `--brand-primary` is the only seed you must set. It becomes the 600 step of the primary colors, and NDS builds the other steps, the tints and the dark mode colors from it. Each step keeps the seed's hue, takes its lightness from the DGA scale, and scales the seed's color strength (chroma). The gray scale takes a little of its hue: `--neutral-tint` sets how much.

NDS uses CSS relative colors in OKLCH. Chrome 119, Safari 16.4 and Firefox 128 support them. An older browser shows the DGA palette.

<script type="text/html" id="theme-palette-html" data-canon data-preview="none" data-js="theme-palette-css">
<html lang="ar" dir="rtl" data-palette style="--brand-primary: #7c3aed; --brand-secondary: #ec4899; --neutral-tint: 0.4;">
</script>
<script type="text/html" id="theme-palette-css" data-canon data-lang="css" data-tab-label="CSS">
:root[data-palette] {
  --brand-primary: #7c3aed;
  --brand-secondary: #ec4899;
  --neutral-tint: 0.4;
}
</script>

A theme option with `data-seed-*` in place of a theme name applies a custom palette on click, and saves it. Click the button to see this page in the palette, and click it again to go back to DGA. In a theme menu, the option is one more `nds-dropmenu-item`.

<script type="text/html" id="theme-custom-option" data-canon data-screens="none">
<button class="nds-btn nds-primary" data-theme-value="violet" data-seed-primary="#7c3aed" data-seed-secondary="#ec4899" data-seed-tint="0.4">
  <span class="nds-label">Violet palette</span>
</button>
</script>

### Stylesheet Themes
{: .nds-block-title}

A stylesheet theme is your own CSS file that sets the color tokens at `:root`. Load it with a `<link>` in the `<head>`, after the NDS CSS, so it applies before first paint. Do not load it from a script. The semantic and component tokens follow the colors you set.

<script type="text/html" id="theme-sheet-html" data-canon data-preview="none" data-js="theme-sheet-css">
<link rel="stylesheet" href="assets/themes/my-brand.css">
</script>
<script type="text/html" id="theme-sheet-css" data-canon data-lang="css" data-tab-label="Theme CSS">
/* DGA values shown: replace them with your brand ramp. The status and base colors stay DGA. */
:root {
  /* Primary ramp: your brand color is the 600 step */
  --colors-primary-25:  #f7fdf9;
  --colors-primary-50:  #f3fcf6;
  --colors-primary-100: #dff6e7;
  --colors-primary-200: #b8eacb;
  --colors-primary-300: #88d8ad;
  --colors-primary-400: #54c08a;
  --colors-primary-500: #25935f;
  --colors-primary-600: #1b8354;
  --colors-primary-700: #166a45;
  --colors-primary-800: #14573a;
  --colors-primary-900: #104631;
  --colors-primary-950: #092a1e;
  /* Primary tints: chips, table selection, footer */
  --colors-primary-alpha-10: #1b835419;
  --colors-primary-alpha-20: #1b835433;
  --colors-primary-alpha-30: #1b83544c;
  --colors-primary-alpha-40: #1b835466;
  --colors-primary-alpha-50: #1b83547f;
  --colors-primary-alpha-60: #1b835499;
  --colors-primary-alpha-70: #1b8354b2;
  --colors-primary-alpha-80: #1b8354cc;
  --colors-primary-alpha-90: #1b8354e5;

  /* Secondary ramp */
  --colors-secondary-25:  #fffef7;
  --colors-secondary-50:  #fffef2;
  --colors-secondary-100: #fffce6;
  --colors-secondary-200: #fcf3bd;
  --colors-secondary-300: #fae996;
  --colors-secondary-400: #f7d54d;
  --colors-secondary-500: #f5bd02;
  --colors-secondary-600: #dba102;
  --colors-secondary-700: #b87b02;
  --colors-secondary-800: #945c01;
  --colors-secondary-900: #6e3c00;
  --colors-secondary-950: #472400;

  /* Tertiary ramp: your color is the 500 step */
  --colors-tertiary-25:  #fefcff;
  --colors-tertiary-50:  #f9f5fa;
  --colors-tertiary-100: #f2e9f5;
  --colors-tertiary-200: #e1cce8;
  --colors-tertiary-300: #ccadd9;
  --colors-tertiary-400: #a57bba;
  --colors-tertiary-500: #80519f;
  --colors-tertiary-600: #6d428f;
  --colors-tertiary-700: #532d75;
  --colors-tertiary-800: #3d1d5e;
  --colors-tertiary-900: #281047;
  --colors-tertiary-950: #16072e;
  --colors-tertiary-alpha-10: #80519f19;
  --colors-tertiary-alpha-20: #80519f33;

  /* Neutral ramp: it also has 750 and 850 steps */
  --colors-neutral-25:  #fcfcfd;
  --colors-neutral-50:  #f9fafb;
  --colors-neutral-100: #f3f4f6;
  --colors-neutral-200: #e5e7eb;
  --colors-neutral-300: #d2d6db;
  --colors-neutral-400: #9da4ae;
  --colors-neutral-500: #6c727e;
  --colors-neutral-600: #4d5761;
  --colors-neutral-700: #384250;
  --colors-neutral-750: #2b3643;
  --colors-neutral-800: #1f2a37;
  --colors-neutral-850: #18212f;
  --colors-neutral-900: #111927;
  --colors-neutral-950: #0c111b;

  /* Deep brand surfaces: hero, footer, image overlay */
  --background-primary-strong: var(--colors-primary-900);
  --background-primary-light:  var(--colors-primary-50);
  --img-overlay-color:         var(--colors-primary-950);
}

/* Dark mode fixes. The second selector reaches dark areas. :root:root wins even if this sheet loads before NDS. */
:root:root[data-theme~="dark"],
[data-theme~="dark"]:not(:root) {
  --background-card:   #1f2a37;
  --background-footer: #0c111b;
}
</script>

A theme menu option can load a stylesheet theme too. `data-theme-css` on the option names the CSS file, and `data-theme-js` names a script. Each attribute works on its own: an option can carry one or both. The script loads them when the user picks the option, and removes the stylesheet when the user picks another one. The [event themes](../events/) are stylesheet themes that load from one script tag.

### Dark Areas
{: .nds-block-title #themesDarkArea}

`data-theme="dark"` on any element renders it and everything inside it in dark mode. The rest of the page stays as it is. Put it on a dark surface, such as a deep primary section, the footer or a card on a photo. In the preview, the second card carries it. Status tags keep their status colors. Only the `dark` word works on an element: a theme name works only on `<html>`.

<script type="text/html" id="theme-dark-area" data-canon data-preview="page" data-preview-light data-preview-height="260" data-preview-style="body{padding:24px}">
<div class="nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1;">
  <div class="nds-card nds-stroke">
    <div class="nds-card-header">
      <div class="nds-card-status">
        <span class="nds-tag nds-sm" data-status="success"><span class="nds-label">Approved</span></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Building permit</span>
        <p class="nds-card-description">Request 1184, Riyadh. Valid until 30 June 2027.</p>
      </div>
    </div>
    <div class="nds-card-actions">
      <a href="#" class="nds-btn nds-primary"><span class="nds-label">View permit</span></a>
    </div>
  </div>
  <div class="nds-card nds-stroke" data-theme="dark">
    <div class="nds-card-header">
      <div class="nds-card-status">
        <span class="nds-tag nds-sm" data-status="success"><span class="nds-label">Approved</span></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Building permit</span>
        <p class="nds-card-description">Request 1184, Riyadh. Valid until 30 June 2027.</p>
      </div>
    </div>
    <div class="nds-card-actions">
      <a href="#" class="nds-btn nds-primary"><span class="nds-label">View permit</span></a>
    </div>
  </div>
</div>
</script>

</div>
  </div>
</section>

<section id="themesFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The script listens for clicks on the whole page. A toggle or a theme menu works as soon as it is in the page, with no setup code. The script starts when the page has one at load. On a page with none at load, call <code class="nds-inline-code lang-js">NDS.Init.refresh()</code> after you add the first one.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database"></i>
            <span class="nds-label">Preference Persistence</span>
          </span>
          <p class="nds-item-desc">The script saves the mode and the theme in <code class="nds-inline-code lang-js">localStorage</code>, and every page restores them. The key is <code class="nds-inline-code lang-js">nds-theme</code>, and <code class="nds-inline-code lang-js">nds-palette</code> for a custom palette.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-bucket"></i>
            <span class="nds-label">Zero-Flash</span>
          </span>
          <p class="nds-item-desc">A script in the <a href="../ui-shell/head">head</a> writes the saved mode and theme name before first paint, so the page does not show the wrong colors first. A saved custom palette comes back after first paint, so it can flash on load.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sparkles"></i>
            <span class="nds-label">Circular Reveal Animation</span>
          </span>
          <p class="nds-item-desc">The new colors grow in a circle from the clicked control. Without View Transitions support, or with reduced motion, they change at once.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-moon-02"></i>
            <span class="nds-label">Light and Dark</span>
          </span>
          <p class="nds-item-desc">Every theme and custom palette has a dark mode, and every toggle on the page follows each change.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-link-04"></i>
            <span class="nds-label">Shareable Link</span>
          </span>
          <p class="nds-item-desc">A link with <code class="nds-inline-code lang-html">?theme=</code> opens the page in that theme. See Theme Menu.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Read and change the mode with <code class="nds-inline-code lang-js">NDS.Theme.get()</code>, <code class="nds-inline-code lang-js">set()</code> and <code class="nds-inline-code lang-js">toggle()</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="themesPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Add nothing for the DGA look: it is the default.
- Put the dark mode button in the [Top Bar](../ui-shell/topbar). Use the switch toggle on a settings page.
- Use a custom palette for a brand color with dark mode built for you. Use a stylesheet theme for exact colors, older browsers, or styles beyond color.
- Check the contrast of a custom palette: 4.5:1 for text and 3:1 for controls, on white. The seed is exact, but NDS does not check the steps it builds.
- Change the mode with `NDS.Theme.set()` or `toggle()`, not by writing `data-theme`. They keep the theme name, save the choice and update the toggles.
- Use semantic tokens in your own CSS, such as `--background-card` and `--text-default`. A hard-coded color follows neither dark mode nor the theme.
- Write your own dark rules with `[data-theme~="dark"] .your-class`, never `[data-theme="dark"]`. The attribute can hold a theme name too, and the `~=` rule also matches inside a dark area.
- Put `data-theme="dark"` on the dark surface, not on each component inside it.
- Test every new surface in both modes and in each theme you ship.

</div>
  </div>
</section>

<section id="themesApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-theme` | `<html>` | The mode and the theme, as words: `dark`, a theme name, or both. Light mode has no word. The script writes it when the user picks a mode or a theme. The head script writes the saved value before first paint |
| `data-palette` | `<html>` | Builds the palette from the `--brand-*` seeds. The script sets it when the user picks an option with `data-seed-primary`, and removes it when the user picks another option |
| `data-theme="dark"` | any element except `<html>` | Renders the element and everything inside it in dark mode. A theme name does nothing here |
| `data-theme-toggle` | a button, or a `.nds-switch-container` | Makes it a dark mode toggle. `id="ndsThemeToggle"` does the same |
| `aria-pressed` | a dark mode toggle | Write `false` in the markup. The script sets `true` in dark mode and `false` in light mode, at load and on each change. It also swaps the icon between `nds-hgi-moon-02` and `nds-hgi-sun-03`, and checks the switch in dark mode |
| `data-theme-value` | a theme option: a button, or a `.nds-switch-container` | The theme name the option applies. Leave it empty for the DGA default |
| `aria-current` | a theme option | The script sets `true` on the chosen option and `false` on the others, at load and on each pick. It also checks the switch of the chosen option |
| `data-seed-primary` | a theme option | Makes it a custom palette option, with this primary seed. The script saves the palette |
| `data-seed-secondary`, `data-seed-tertiary`, `data-seed-tint`, `data-seed-font` | a theme option with `data-seed-primary` | Set `--brand-secondary`, `--brand-tertiary`, `--neutral-tint` and `--nds-font-brand` |
| `data-seed-weight-regular`, `-medium`, `-semibold`, `-bold` | a theme option with `data-seed-primary` | Set the four `--font-weight-*` values, for a font that looks lighter or heavier than IBM Plex |
| `data-theme-css` | a theme option | A stylesheet URL. The script adds it as `<link id="nds-theme-stylesheet">` when the user picks the option, and removes it when the user picks another one |
| `data-theme-js` | a theme option | A script URL. The script loads it once, the first time the user picks the option, or at load when it is the saved theme |
{: .nds-table .nds-responsive}

`?theme=name` in the page URL: see Theme Menu.

### CSS Custom Properties
{: .nds-block-title}

Set the `--brand-*` seeds and `--neutral-tint` on `<html>` with `data-palette`. Set the others on `<html>`, or at `:root` in a stylesheet theme.

| Property | Default | Controls |
|---|---|---|
| `--brand-primary` | — | The primary seed: the 600 step of the primary colors |
| `--brand-secondary` | the primary hue + 150° | The secondary seed: the 600 step of the secondary colors |
| `--brand-tertiary` | the primary hue − 30° | The tertiary seed: the 500 step of the tertiary colors |
| `--neutral-tint` | `1` | How much of the primary hue the gray scale takes. `0` is a true gray |
| `--nds-font-brand` | `'IBM Plex Sans Arabic', sans-serif` | The typeface, such as `'Cairo', sans-serif`. Your page loads the font |
| `--font-weight-regular`, `-medium`, `-semibold`, `-bold` | `400`, `500`, `600`, `700` | The four font weights. Corporate and Sunset set `300`, `400`, `500`, `600` |
| `--background-primary-strong` | `var(--colors-primary-900)` | The deep primary surface of the hero and the footer |
| `--background-primary-light` | `var(--colors-primary-50)` | The light primary surface, such as the sub hero. A custom palette sets it to `--background-primary-faint` |
| `--img-overlay-color` | `var(--colors-primary-950)` | The overlay color on hero images. A custom palette sets it to `--colors-neutral-950` |
| `--colors-*` | the DGA palette | The color ramps: primary, secondary, tertiary, neutral and status. Set them in a stylesheet theme for exact colors |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

`NDS.Theme` controls the mode. It works on every page, with or without a toggle. It fires no events.

| Method | Effect |
|---|---|
| `NDS.Theme.get()` | Returns `'dark'` or `'light'` |
| `NDS.Theme.set(mode, el)` | Sets `'dark'` or `'light'`, keeps the theme name, and saves the choice. The reveal grows from the center of `el`, or from the center of the screen without it |
| `NDS.Theme.toggle(el)` | Switches between dark and light, like `set()` |
| `NDS.Theme.init()` | Syncs the toggles and the theme menu, and loads the saved theme. The loader calls it when the page has a toggle or a theme option. It runs once |
{: .nds-table .nds-responsive}

There is no method to pick a theme. To set a palette from code, set the seeds and `data-palette` yourself. NDS does not save it.

<script type="text/html" id="theme-js" data-canon data-lang="js">
NDS.Theme.set('dark');

// A custom palette
var root = document.documentElement;
root.style.setProperty('--brand-primary', '#7c3aed');
root.style.setProperty('--neutral-tint', '0.4');
root.setAttribute('data-palette', '');

// Back to the DGA palette
['--brand-primary', '--brand-secondary', '--brand-tertiary', '--neutral-tint'].forEach(function (p) {
  root.style.removeProperty(p);
});
root.removeAttribute('data-palette');
</script>

The full API is in the banner of `_js/nds-theme.js`.

</div>
  </div>
</section>

<section id="themesRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Top Bar](../ui-shell/topbar): the dark mode button, on every page.
- [Section](../layout/section): the Primary, Gradient and Neutral colors write `data-theme="dark"`.
- [Head](../ui-shell/head): the script that writes the saved theme before first paint.
- [Event themes](../events/): stylesheet themes for national days and seasons.

</div>
  </div>
</section>
