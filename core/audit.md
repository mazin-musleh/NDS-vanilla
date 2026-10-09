---
layout: page
title: Audit
hero_title: Audit - National Design System
hero_description: A check you run on a built page that lists NDS markup and CSS that fail with no error, and every name an NDS release changed
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "09/10/2026 - 08:32 PM"
---

<section id="auditOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The audit reads a page after NDS starts and lists the problems that show no error: a filter that binds to nothing, an icon with no registration, a skip link to a missing id. It also finds each class, attribute, id, custom property and window setting that an NDS release renamed or removed, in the page's markup and in the site's own CSS.

`NDS.Init.audit()` runs it and returns the findings as an array, so you and an AI coding agent can read them. The audit is its own bundle. A page loads it only on the first call, so a production page downloads none of it.

Pick another component when:

- you need the list of changed names by release: [Migration](../core/migration)

</div>
  </div>
</section>

<section id="auditMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Run it in the browser console, or from a test, once the page has loaded.

<script type="text/html" id="audit-run" data-canon data-lang="js" data-preview="none">
const findings = await NDS.Init.audit();
const errors = findings.filter(f => f.severity === 'error');
</script>

Run one group or one rule. `quiet` keeps the console clear.

<script type="text/html" id="audit-group" data-canon data-lang="js" data-preview="none">
NDS.Audit.run({ group: 'migration', quiet: true });
NDS.Audit.run({ rule: ['id-reference', 'skip-link'] });
</script>

Skip markup you cannot change yet, such as a block your CMS writes. Name the rules to skip, or leave the value empty to skip them all.

<script type="text/html" id="audit-ignore" data-canon data-preview="none">
<div class="cms-legacy-block" data-nds-audit-ignore="migration-markup">
  …
</div>
</script>

Add a rule of your own. It runs with the others on every call.

<script type="text/html" id="audit-rule" data-canon data-lang="js" data-preview="none">
NDS.Audit.rule({
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

<section id="auditBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Severity
{: .nds-block-title}

Each finding has a severity. `error` is broken now: a part gets no style or behavior, or shows the wrong text. `warn` works today but is wrong, or goes away at the next major release. `info` changes nothing on the page, such as a custom property that NDS never read.

### Console Output
{: .nds-block-title}

Each finding prints one line that starts with `[NDS.Audit]` and its rule id, then the problem, the fix and a docs link. An error prints as a console error, a warning as a warning. A last line counts the errors, warnings and notes. The element prints with its line, so the console can show it on the page.

### Migration Checks
{: .nds-block-title}

`migration-markup` checks the classes, attributes, ids and inline custom properties on the page, and the window settings NDS read before. `migration-css` checks the site's own style sheets, inline `<style>` included. A name used on many elements is one finding, with the count and the first element.

A generic name, such as `sr-only`, counts only inside NDS markup. When the site's own CSS styles that class, the audit treats it as the site's class and skips it. The audit never reads the NDS style sheets, or a sheet from another origin.

### Limits
{: .nds-block-title}

The audit reads the page, not the scripts. An old method name or an event listener in your JavaScript does not show: the release notes list those. An icon name inside a JavaScript string does not show either. The icon check reads the icon style sheet, so run the audit after the page has loaded. The legacy check knows only the common libraries: a clean result does not prove that a page has no other UI library.

</div>
  </div>
</section>

<section id="auditFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-package"></i>
            <span class="nds-label">No Bytes in Production</span>
          </span>
          <p class="nds-item-desc">The audit is a bundle of its own that the first call loads. A page that never calls it downloads none of it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database"></i>
            <span class="nds-label">Findings as Data</span>
          </span>
          <p class="nds-item-desc">The call returns an array with the rule, the severity, the fix and the element of each finding. A test or an AI coding agent reads it with no console parsing.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-git-compare"></i>
            <span class="nds-label">Every Release's Changes</span>
          </span>
          <p class="nds-item-desc">The migration checks know every name that changed since 1.0.0, with today's name and the release that changed it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-brush-01"></i>
            <span class="nds-label">Your CSS Too</span>
          </span>
          <p class="nds-item-desc">Old class names and custom properties in your own style sheets show, with the sheet and the rule that holds them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-alert-02"></i>
            <span class="nds-label">Silent Failures</span>
          </span>
          <p class="nds-item-desc">Each structure rule covers a mistake that shows no error, such as a target id that names nothing or a list held in its loading skeleton.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-01"></i>
            <span class="nds-label">Your Own Rules</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">NDS.Audit.rule()</code> adds a check for your own markup, and it reports like the built-in ones.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="auditPractices" class="nds-content-section nds-doc-practices">
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

<section id="auditApi" class="nds-content-section nds-doc-api">
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
| `content-layout-child` | page | warn | An element in `.nds-content-layout` that is not `.nds-content` or `.nds-sidemenu` |
| `legacy-library` | page | warn | A common legacy UI library loaded on the page, such as jQuery, Select2, DataTables, Bootstrap CSS or Font Awesome |
| `bundle-tag` | page | warn | A tag in the page for a bundle the loader adds itself, such as `nds-delegated.min.js` |
| `inline-defer` | page | warn | An inline `<script defer>`: without `src`, `defer` does nothing and the code runs before NDS loads |
| `i18n-pack` | i18n | error | The language file of the page did not load |
| `filter-unclaimed` | structure | error | `data-filter-items` that no filter claimed, so it stays in its skeleton |
| `filter-no-target` | structure | error | A `.nds-filter` with no `data-filter-target` |
| `paged-no-nav` | structure | error | A `.nds-paged-content` with no pagination nav |
| `icon-unregistered` | structure | error | An `nds-hgi-*` icon that is not in the registered set |
| `nav-current` | structure | warn | A main nav link to the current page with no `data-state="current"` |
| `id-reference` | structure | error | A `data-*-target`, `data-auto-pagination` or `data-copy-target` value that names no element. An id inside a `<template>` counts as present |
| `aria-controls` | structure | warn | An `aria-controls` id that no element has, inside or outside a `<template>` |
| `sort-target-owned` | structure | warn | A `data-sort-target` on a list that a filter or a table already sorts |
| `stepper-submit` | structure | warn | `data-stepper-control` on a submit button, where it does nothing |
| `migration-markup` | migration | error, warn, info | A renamed or removed name (error) or a deprecated one (warn) in the markup, or an old window setting |
| `migration-css` | migration | error, warn, info | The same names in the site's own CSS. Setting a custom property that NDS never read is info |
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
| `NDSInitConfig.enableLogging` | `false` | Runs the audit once the page has loaded. See [Refresh](../core/refresh) |
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
| `NDS.Init.audit()` | Runs every rule and returns the findings. The first call loads the audit and returns a promise of them |
| `NDS.Audit.run(options)` | Runs the rules once and returns the findings. `group` and `rule` take a name or an array, and `quiet: true` prints nothing. Before the audit loads, the call loads it and returns a promise |
| `NDS.Audit.rule(definition)` | Adds a rule, or replaces the rule with the same id. It takes `id`, `group`, `severity`, `docs` and `check(ctx)`. Before the audit loads, the call loads it first |
| `NDS.Audit.rules` | Every rule, in run order |
| `ctx.find(selector)` | In `check`: the matching elements, without the ones in `<code>` or skipped by `data-nds-audit-ignore` |
| `ctx.report(el, message, fix, severity)` | In `check`: adds a finding. `severity` overrides the rule's own |
{: .nds-table .nds-responsive}

<script type="text/html" id="audit-api-js" data-canon data-lang="js">
// Fail a page test on any error
const findings = await NDS.Init.audit();
const errors = findings.filter(f => f.severity === 'error');
if (errors.length) throw new Error(errors.map(f => `${f.rule}: ${f.message} ${f.fix}`).join('\n'));
</script>

The full API is in the banner of `_js/nds-audit.js`.

</div>
  </div>
</section>

<section id="auditRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Migration](../core/migration): every changed name by release, the list the migration checks read.
- [Refresh](../core/refresh): `enableLogging` and the other loader settings.
- [Internationalization](../core/i18n): the language file that `i18n-pack` checks.

</div>
  </div>
</section>
