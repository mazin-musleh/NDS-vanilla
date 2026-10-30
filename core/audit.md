---
layout: page
title: Audit
hero_title: Audit - National Design System
hero_description: A check you run on a built page that lists NDS markup and CSS that fail with no error, and every name an NDS release changed
breadcrumb: [["Core", "/components/?shelf=Core"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "28/10/2026 - 01:20 PM"
---

<section id="audit-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The audit reads a page after NDS starts and lists the problems that show no error: a filter that binds to nothing, an icon with no registration, a skip link to a missing id. It also finds each class, attribute, id, custom property and window setting that an NDS release renamed or removed, in the page's markup and in the site's own CSS.

`NDS.init.audit()` runs it and returns the findings as an array, so you and an AI coding agent can read them. The audit is its own bundle. A page loads it only on the first call, so a production page downloads none of it.

Pick another component when:

- you need the list of changed names by release: [Migration](../guides/migration)

</div>
  </div>
</section>

<section id="audit-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Run it in the browser console, or from a test, once the page has loaded.

<script type="text/html" id="audit-run" data-canon data-lang="js" data-preview="none">
const findings = await NDS.init.audit();
const errors = findings.filter(f => f.severity === 'error');
</script>

Run one group or one rule. `quiet` keeps the console clear.

<script type="text/html" id="audit-group" data-canon data-lang="js" data-preview="none">
NDS.audit.run({ group: 'migration', quiet: true });
NDS.audit.run({ rule: ['id-reference', 'skip-link'] });
</script>

Skip markup you cannot change yet, such as a block your CMS writes. Name the rules to skip, or leave the value empty to skip them all.

<script type="text/html" id="audit-ignore" data-canon data-preview="none">
<div class="cms-legacy-block" data-nds-audit-ignore="migration-markup">
  …
</div>
</script>

Add a rule of your own. It runs with the others on every call.

<script type="text/html" id="audit-rule" data-canon data-lang="js" data-preview="none">
NDS.audit.addRule({
  id: 'service-card-link',
  group: 'structure',
  severity: 'error',
  check(ctx) {
    ctx.find('.service-card')
      .filter(card => !card.querySelector('a'))
      .forEach(card => ctx.report(card, 'a service card has no link.', 'Add the service page link to the card.'));
  }
});
</script>

</div>
  </div>
</section>

<section id="audit-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Severity
{: .nds-block-title}

Each finding has a severity. `error` is broken now: a part gets no style or behavior, or shows the wrong text. `warn` works today but is wrong, or goes away at the next major release. `info` is a note: a custom property that NDS never read, or a tip.

### Tips
{: .nds-block-title}

The `practice` group holds tips from the Best Practices of the doc pages, such as a section inside a section. A tip is `info`: its line starts with `tip:`, and it never means that the page is broken. To run the audit without tips, name the other groups: `NDS.audit.run({ group: ['page', 'structure', 'migration', 'i18n'] })`.

### Console Output
{: .nds-block-title}

Each finding prints one line that starts with `[NDS.audit]` and its rule id, then the problem, the fix and a docs link. An error prints as a console error, a warning as a warning. A last line counts the errors, warnings and notes. The element prints with its line, so the console can show it on the page.

### Migration Checks
{: .nds-block-title}

`migration-markup` checks the classes, attributes, ids and inline custom properties on the page, and the window settings NDS read before. `migration-css` checks the site's own CSS. A name used on many elements is one finding, with the count and the first element.

A generic name, such as `sr-only`, counts only inside NDS markup. When the site's own CSS styles that class, the audit treats it as the site's class and skips it.

### Site CSS
{: .nds-block-title}

`migration-css`, `css-order`, `nds-restyle`, `global-element-css` and `token-dark` check only the site's own style sheets, inline `<style>` included. They skip the NDS style sheets, the NDS `<style>` in the head, an event pack's style and any sheet from another origin.

`css-order`, `token-dark`, `unknown-class` and `part-outside` also read the NDS style sheets, to learn the NDS classes and tokens. When those sheets come from another origin, these four check nothing.

### Limits
{: .nds-block-title}

The audit reads the page, not the scripts. An old method name or an event listener in your JavaScript does not show: the release notes list those. An icon name inside a JavaScript string does not show either. The icon check reads the icon style sheet, so run the audit after the page has loaded. The legacy check knows only the common libraries: a clean result does not prove that a page has no other UI library.

</div>
  </div>
</section>

<section id="audit-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided-rows nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-package" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">No Bytes in Production</span>
              <p class="nds-card-description">The audit is a bundle of its own that the first call loads. A page that never calls it downloads none of it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-database" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Findings as Data</span>
              <p class="nds-card-description">The call returns an array of findings. Each one has `rule`, `group`, `severity`, `message`, `fix`, `docs`, `el` (the element) and `count`. A test or an AI coding agent reads it with no console parsing.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-git-compare" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Every Release's Changes</span>
              <p class="nds-card-description">The migration checks know every name that changed since 1.0.0, with today's name and the release that changed it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-paint-brush-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Your CSS Too</span>
              <p class="nds-card-description">Old class names and custom properties in your own style sheets show, with the sheet and the rule that holds them. So do rules on bare elements and token overrides with no dark value.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-alert-02" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Silent Failures</span>
              <p class="nds-card-description">Each structure rule covers a mistake that shows no error, such as a target id that names nothing or a list held in its loading skeleton.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-plug-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Your Own Rules</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-js">NDS.audit.addRule()</code> adds a check for your own markup, and it reports like the built-in ones.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="audit-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Run the audit on each page you build or change. After an NDS upgrade, run it on each page of the site: it sees only the page it runs on.
- Fix the errors first. A warning still works, so it can wait for a later pass.
- Read the returned array in a test or an agent. The console lines are for people.
- Name the rule in `data-nds-audit-ignore`. An empty value hides every rule, including the ones you still need.
- Leave `enableLogging` off in production. It loads the audit and logs every component on each page.

</div>
  </div>
</section>

<section id="audit-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Rules
{: .nds-block-title}

| Rule | Group | Severity | Finds |
|---|---|---|---|
| `lang-dir` | page | warn | No `lang` on `<html>`, or a `dir` that does not match the language |
| `css-missing` | page | error | The NDS main style sheet did not apply |
| `skip-link` | page | warn, error | No skip link, a skip link to a missing id (error), or one that lands on `<main>` |
| `main-flex` | page | warn | A wrapper between `<body>` and `<main>` that stops `<main>` from growing |
| `content-layout-child` | page | warn | An element in `.nds-content-layout` that is not `.nds-content` or `.nds-sidemenu`. An element that renders nothing, such as a `<template>`, passes |
| `sidemenu-missing` | page | warn | `nds-has-sidemenu` on an element with no `.nds-sidemenu` child, or a `hidden` one: the content squeezes into the menu column |
| `alert-as-page` | page | warn | A view whose only visible content, apart from a tab list, a breadcrumb or pagination, is an `.nds-alert` outside a tab panel: a view that cannot show its content (sign in, no permission, not found, a failed load) is a Status Section |
| `content-layout-once` | page | warn | More than one `.nds-content-layout` on the page, or one inside another: the page grid is set once |
| `sidemenu-pair` | page | warn | A `.nds-sidemenu` outside a layout with `nds-has-sidemenu` |
| `legacy-library` | page | warn | A common legacy UI library loaded on the page, such as jQuery, Select2, DataTables, Bootstrap CSS or Font Awesome |
| `bundle-tag` | page | warn | A tag in the page for a bundle the loader adds itself, such as `nds-delegated.min.js` |
| `inline-defer` | page | warn | An inline `<script defer>`: without `src`, `defer` does nothing and the code runs before NDS loads |
| `img-size` | page | warn | An `<img>` whose `width` and `height` give a different shape from the picture, so it stretches or the layout jumps. It skips images that have not loaded, and an SVG with no size of its own |
| `native-date-time` | page | warn | A browser date or time field (`type="date"`, `month`, `week`, `datetime-local`, `time`) where the Date Picker or Time Picker belongs |
| `style-blocked` | page | warn | A knob in a `style` attribute that the page's Content Security Policy blocked, so it never applies. One finding for the page, with the count |
| `toolbar-part` | structure | warn | An `nds-toolbar-*` part (row, start, end, text) outside a `.nds-toolbar`: it still lays out as a bar, but stacked rows touch and the bar loses its gap. One finding per bar |
| `toolbar-search-row` | structure | warn | A search box whose line holds more than one other item. The applied-filters and suggestion lines do not count: they take a line of their own |
| `toolbar-applied` | structure | warn | Applied filters (`.nds-filter-applied`) outside a toolbar, above the search or filter they show, or in the same row as them |
| `toolbar-sizes` | structure | warn | Items on one toolbar line with different heights, such as a 32px `nds-md` button beside a 40px one. It skips hidden items |
| `table-min-width` | structure | warn | On a desktop, a table with an actions column whose `--min-width` is wider than its box, so users scroll sideways to reach a row's actions. Content that widens a table does not count. Phones and tablets are skipped |
| `form-row-align` | structure | warn | Fields side by side whose inputs do not start level, because something above one input pushes it down, such as an Info line under its label or a label on two lines. A message under an input does not count. It skips checkboxes, radios, switches and uploads |
| `i18n-pack` | i18n | error | The language file of the page did not load. A language NDS does not ship is a `warn`, and only when `window.NDS_I18N_LANGS` has no words for it |
| `i18n-override` | i18n | warn | A section or key in `window.NDS_I18N` or `window.NDS_I18N_LANGS` that no NDS component or `getStrings()` call has, so it changes nothing |
| `filter-unclaimed` | structure | error | `data-filter-items` that no filter claimed, so it stays in its skeleton |
| `filter-no-target` | structure | error | A `.nds-filter` with no `data-filter-target` |
| `paged-no-nav` | structure | error | A `.nds-paged-content` with no pagination nav |
| `icon-unregistered` | structure | error | An `nds-hgi-*` icon that is not in the registered set |
| `font-icon-unknown` | structure | error | A font icon (`hgi hgi-stroke hgi-*`) whose name the HGI stroke rounded set lacks, so it shows nothing. It runs once the HGI style sheet has loaded |
| `icon-tag` | structure | error | A UI icon (`nds-icon nds-hgi-*`) on a tag other than `<i>`. The icon styles apply to `<i>` only, so it shows nothing |
| `icon-only-btn` | structure | warn | A button in a field's `.nds-form-action` with an icon, no text and no `nds-icon-only`: it keeps its text padding and renders wider than tall |
| `minimal-action-icon` | structure | error | A button with no icon in an `nds-minimal` action: on phones its label hides and it shows an empty box |
| `prose-section-title` | structure | warn | A heading inside `nds-prose` with `nds-section-title`: it renders at the page title's size, not the text's. Prose already styles a bare `h2` to `h6` |
| `name-on-display` | structure | error | `name` on the text box of a Custom Select or Time Picker, or on an OTP digit box. The form then sends the text it shows, not the value |
| `button-name` | structure | error | A button or link with no name: no text, `aria-label`, `aria-labelledby`, `title` or image `alt`, such as an icon-only button. A screen reader announces it with no words. It skips what a screen reader never reaches, such as an `aria-hidden` loop clone |
| `field-label` | structure | error | A form field with no label: no `<label>`, `aria-label`, `aria-labelledby`, `title` or `placeholder`. A screen reader announces it with no name |
| `img-alt` | structure | error | An `<img>` with no `alt`: a screen reader reads its file name. `alt=""` marks a picture that only decorates |
| `nav-current` | structure | warn | A main nav link to the current page with no `data-state="current"` |
| `id-reference` | structure | error | A `data-*-target`, `data-auto-pagination` or `data-copy-target` value that names no element, read the way its component reads it. An attribute that takes a bare id reports `#list` and names the fix, `list`. An id inside a `<template>` counts as present |
| `aria-controls` | structure | warn | An `aria-controls` id that no element has, inside or outside a `<template>` |
| `id-duplicate` | structure | error | One `id` on two or more elements, outside SVG: a lookup by id reaches only the first |
| `sort-target-owned` | structure | warn | A `data-sort-target` on a list that a filter or a table already sorts |
| `stepper-submit` | structure | warn | `data-stepper-control` on a submit button, where it does nothing |
| `css-order` | page | warn | A site style sheet that styles NDS classes or tokens but loads before the NDS style sheet that declares them, so NDS wins every tie and the override does nothing. A theme right after the critical CSS passes |
| `nds-restyle` | page | warn | A rule in the site's own CSS that restyles NDS classes with no project class, id or `data-*` attribute in its selector. One finding per sheet. It skips a rule that sets only custom properties |
| `global-element-css` | page | warn | A rule in the site's own CSS on bare elements, such as `body`, `h1` or `a`: it reaches every NDS element on the page. One finding per sheet. It skips a rule that sets only custom properties |
| `token-dark` | page | warn | A token override in the site's own CSS that has no dark value where NDS has one, sets only some states of a family, or misses the dark-area selector on a page with dark areas. See [Tokens](../foundations/tokens) |
| `migration-markup` | migration | error, warn, info | A renamed or removed name (error) or a deprecated one (warn) in the markup, or an old window setting |
| `migration-css` | migration | error, warn, info | The same names in the site's own CSS. Setting a custom property that NDS never read is info |
| `badge-text` | migration | warn | A badge count written as text, not in `data-count`. The text joins the button's visible label, so an accessibility checker reports the button's name |
| `unknown-class` | structure | warn | An `nds-` class that no NDS style sheet, doc or script has, so it gets no NDS style or behavior. An old name is left to `migration-markup` |
| `required-part` | structure | error | A part or attribute that a component's script needs to work, missing with no console warning, such as a tab with no panel or a date field outside its `.nds-form-control`. Each component lists these in the `Requires` lines of its script's banner |
| `part-outside` | structure | warn | A component part outside its component, such as `.nds-card-title` with no `.nds-card` around it. It skips a part that NDS also styles on its own |
| `card-link-nested` | practice | info | A link or a button inside a clickable card (`a.nds-card`, `button.nds-card`) |
| `section-nested` | practice | info | A section inside a section. Divide a section body with `.nds-block` |
| `card-actions-place` | practice | info | `.nds-card-actions` inside `.nds-card-content`, not after it |
| `tag-kind-mix` | practice | info | A table column whose one-tag cells mix status tags (`data-status`) and standard tags. A state takes a status tag on every row |
| `dark-nested` | practice | info | `data-theme="dark"` inside a dark area, which is already dark |
| `prose-nested` | practice | info | `.nds-prose` inside `.nds-prose` |
| `loading-field` | practice | info | `nds-loading` on a form field, which has a loading look of its own |
| `voice-secret` | practice | info | Voice input on a password, OTP or read-only field, or on a select |
| `dark-selector` | practice | info | `[data-theme="dark"]` in the site's own CSS, where `[data-theme~="dark"]` also matches a `data-theme` with more than one value |
| `palette-scope` | practice | info | A palette token (`--colors-*`) set below `:root` in the site's own CSS. The tokens built from the palette read it at `:root` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-nds-audit-ignore` | any element | The audit skips the element and everything in it. The value names the rules to skip, separated by spaces or commas. An empty value skips every rule |
{: .nds-table .nds-responsive}

### Configuration
{: .nds-block-title}

| Global | Default | Effect |
|---|---|---|
| `NDS_AUDIT_RULES` | — | An array of rule definitions that every run reads. Use it to set rules in a script that runs before NDS |
| `NDS_INIT_CONFIG.enableLogging` | `false` | Runs the audit once the page has loaded. See [Init](../core/init) |
{: .nds-table .nds-responsive}

### Findings
{: .nds-block-title}

| Field | Holds |
|---|---|
| `rule` | The id of the rule |
| `group` | `page`, `structure`, `i18n` or `migration` |
| `severity` | `error`, `warn` or `info` |
| `message` | The problem |
| `fix` | What to change |
| `docs` | A link to the docs page of the part, when the rule has one |
| `el` | The element, or none for a page-wide finding |
| `count` | How many elements or CSS rules use the name, for a migration finding |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.init.audit()` | Runs every rule and returns the findings. The first call loads the audit and returns a promise of them |
| `NDS.audit.run(options)` | Runs the rules once and returns the findings. `group` and `rule` take a name or an array, and `quiet: true` prints nothing. Before the audit loads, the call loads it and returns a promise |
| `NDS.audit.addRule(definition)` | Adds a rule, or replaces the rule with the same id. It takes `id`, `group`, `severity`, `docs` and `check(ctx)`. Before the audit loads, the call loads it first |
| `NDS.audit.rules` | Every rule, in run order |
| `ctx.find(selector)` | In `check`: the matching elements, without the ones in `<code>` or skipped by `data-nds-audit-ignore` |
| `ctx.report(el, message, fix, severity)` | In `check`: adds a finding. `severity` overrides the rule's own |
{: .nds-table .nds-responsive}

<script type="text/html" id="audit-api-js" data-canon data-lang="js">
// Fail a page test on any error
const findings = await NDS.init.audit();
const errors = findings.filter(f => f.severity === 'error');
if (errors.length) throw new Error(errors.map(f => `${f.rule}: ${f.message} ${f.fix}`).join('\n'));
</script>

The full API is in the banner of `_js/nds-audit.js`.

</div>
  </div>
</section>

<section id="audit-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Migration](../guides/migration): every changed name by release, the list the migration checks read.
- [Init](../core/init): `enableLogging` and the other loader settings.
- [Internationalization](../core/i18n): the language file that `i18n-pack` checks, and the overrides that `i18n-override` checks.

</div>
  </div>
</section>
