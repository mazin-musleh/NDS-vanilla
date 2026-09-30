---
layout: page
title: Multiselect
hero_title: Multiselect - National Design System
hero_description: A form field whose menu of checkboxes lets the user pick several options, shown in the field as removable chips
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "01/10/2026 - 12:05 AM"
---

<section id="multiselectOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A multiselect is a form field with a [Dropmenu](../components/dropmenu) at its start. The menu holds a group of checkboxes, and each checked option shows in the field as a chip. The checkboxes are the values: the form submits the checked ones, with no hidden inputs.

Pick another component when:

- the user picks one option: a custom select in [Forms](../components/forms)
- the user types free values as chips: [Tag Input](../components/taginput)
- a few options fit on the page with no menu: a checkbox group in [Checkbox](../components/checkbox)

</div>
  </div>
</section>

<section id="multiselectMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="multiselect-grouped" data-canon data-variants="multiselectVariantsTable" data-harness="form" data-demo-width="100%">
<div class="nds-form-container nds-multiselect" data-multiselect-name="interests">
  <div class="nds-form-header">
    <label><span class="nds-label">Interests</span></label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
      <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
        <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
        <span class="nds-label">Select</span>
      </button>
      <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
          <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
            <legend class="nds-label">Technology</legend>
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-header">
                <label for="ms-ai"><span class="nds-label">AI &amp; ML</span></label>
              </div>
              <div class="nds-form-control">
                <input type="checkbox" id="ms-ai" class="nds-check" name="interests[]" value="ai" data-label="AI &amp; ML" checked>
              </div>
            </div>
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-header">
                <label for="ms-cloud"><span class="nds-label">Cloud</span></label>
              </div>
              <div class="nds-form-control">
                <input type="checkbox" id="ms-cloud" class="nds-check" name="interests[]" value="cloud" data-label="Cloud">
              </div>
            </div>
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-header">
                <label for="ms-security"><span class="nds-label">Cybersecurity</span></label>
              </div>
              <div class="nds-form-control">
                <input type="checkbox" id="ms-security" class="nds-check" name="interests[]" value="security" data-label="Cybersecurity">
              </div>
            </div>
          </fieldset>
          <hr class="nds-divider">
          <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
            <legend class="nds-label">Design</legend>
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-header">
                <label for="ms-ux"><span class="nds-label">UX Research</span></label>
              </div>
              <div class="nds-form-control">
                <input type="checkbox" id="ms-ux" class="nds-check" name="interests[]" value="ux" data-label="UX Research" checked>
              </div>
            </div>
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-header">
                <label for="ms-brand"><span class="nds-label">Brand Identity</span></label>
              </div>
              <div class="nds-form-control">
                <input type="checkbox" id="ms-brand" class="nds-check" name="interests[]" value="brand" data-label="Brand Identity">
              </div>
            </div>
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-header">
                <label for="ms-motion"><span class="nds-label">Motion</span></label>
              </div>
              <div class="nds-form-control">
                <input type="checkbox" id="ms-motion" class="nds-check" name="interests[]" value="motion" data-label="Motion">
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
    <span class="nds-multiselect-placeholder">Select options</span>
  </div>
</div>
</script>
<script type="text/html" id="multiselect-json" data-canon>
<div class="nds-form-container nds-multiselect" data-multiselect-name="cities" data-multiselect-options='{"riyadh": "Riyadh", "jeddah": "Jeddah", "dammam": "Dammam", "abha": "Abha", "tabuk": "Tabuk"}' data-multiselect-selected='["riyadh"]'>
  <div class="nds-form-header">
    <label><span class="nds-label">Cities</span></label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
      <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
        <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
        <span class="nds-label">Select</span>
      </button>
      <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll"></div>
      </div>
    </div>
    <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
    <span class="nds-multiselect-placeholder">Select cities</span>
  </div>
</div>
</script>
<script type="text/html" id="multiselect-trigger-solid" data-canon>
<button class="nds-btn nds-secondary nds-menu-btn nds-dropmenu-trigger" type="button">
  <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
  <span class="nds-label">Select</span>
</button>
</script>
<script type="text/html" id="multiselect-footer-reset" data-canon>
<div class="nds-dropmenu-footer">
  <hr class="nds-divider">
  <div class="nds-dropmenu-action">
    <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close>
      <span class="nds-label">Reset</span>
    </button>
  </div>
</div>
</script>
<script type="text/html" id="multiselect-footer-apply" data-canon>
<div class="nds-dropmenu-footer">
  <hr class="nds-divider">
  <div class="nds-dropmenu-action">
    <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply">
      <span class="nds-label">Apply</span>
    </button>
  </div>
</div>
</script>
<script type="text/html" id="multiselect-footer-both" data-canon>
<div class="nds-dropmenu-footer">
  <hr class="nds-divider">
  <div class="nds-dropmenu-action">
    <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close>
      <span class="nds-label">Reset</span>
    </button>
    <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply">
      <span class="nds-label">Apply</span>
    </button>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="multiselectVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A row on `.nds-check-container` changes every option row. A Reset or Apply row inserts its part at the end of `.nds-dropmenu-menu`, after `.nds-dropmenu-scroll`. Search changes two elements: write both.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Manual (default) | — | — | You write one checkbox per option in the menu, in fieldsets with a legend. Use it when the server writes the options |
| Structure | Data-driven | canon `#multiselect-json` | — | An empty menu with the options as JSON in `data-multiselect-options`. The script builds the checkboxes. Use it for options that come from data |
| Menu button (any) | Icon only | `[aria-label="Select"]` | `.nds-dropmenu-trigger:has(.nds-icon)` | A narrow button, for a narrow field. The `aria-label` names the button, and the script adds the chosen options to it. Not with Label only |
| Menu button (any) | Icon only | remove | `.nds-dropmenu-trigger:has(.nds-icon) > .nds-label` | Removes the visible word |
| Menu button (any) | Label only | `[type="button"]` | `.nds-dropmenu-trigger:has(.nds-label)` | The word with no icon. Not with Icon only |
| Menu button (any) | Label only | remove | `.nds-dropmenu-trigger:has(.nds-label) > .nds-icon` | Removes the icon |
| Menu button (any) | Solid | canon `#multiselect-trigger-solid` | `[data-multiselect-dropmenu]` (start) | A filled button that stands out from the field |
| Menu button (any) | Solid | remove | `.nds-dropmenu-trigger.nds-subtle` | Removes the subtle button |
| Menu button (any) | MD | `.nds-md` | `.nds-dropmenu-trigger` | A 32px button with a smaller word and icon |
| Menu options | None (default) | — | — | No buttons and no search. Each check commits at once |
| Menu options | Reset (hint: Unchecks every option) | canon `#multiselect-footer-reset` | `.nds-dropmenu-menu` | A button that unchecks every option. See Reset Button |
| Menu options | Apply (hint: Checks wait until Apply) | canon `#multiselect-footer-apply` | `.nds-dropmenu-menu` | Checks wait in the menu until the user presses Apply. See Apply Button |
| Menu options | Search (hint: Filters the options) | `[data-search]` | `[data-multiselect-dropmenu]` | A search box at the top of the menu hides the options that do not match. Use it for a long list |
| Menu options | Search (hint: Filters the options) | `[data-search-item]` | `.nds-check-container` | Put it on each option row. Data-driven adds it for you |
| Menu options | Reset + Apply | canon `#multiselect-footer-both` | `.nds-dropmenu-menu` | Both buttons in one row. Reset unchecks the options in the menu, and Apply commits them |
| Menu options | Reset + Search | canon `#multiselect-footer-reset` | `.nds-dropmenu-menu` | Reset and the search box |
| Menu options | Reset + Search | `[data-search]` | `[data-multiselect-dropmenu]` | The same |
| Menu options | Reset + Search | `[data-search-item]` | `.nds-check-container` | The same |
| Menu options | Apply + Search | canon `#multiselect-footer-apply` | `.nds-dropmenu-menu` | Apply and the search box |
| Menu options | Apply + Search | `[data-search]` | `[data-multiselect-dropmenu]` | The same |
| Menu options | Apply + Search | `[data-search-item]` | `.nds-check-container` | The same |
| Menu options | Reset + Apply + Search | canon `#multiselect-footer-both` | `.nds-dropmenu-menu` | Both buttons and the search box |
| Menu options | Reset + Apply + Search | `[data-search]` | `[data-multiselect-dropmenu]` | The same |
| Menu options | Reset + Apply + Search | `[data-search-item]` | `.nds-check-container` | The same |
| Chip color | Primary (default) | — | — | Chips in the primary color |
| Chip color | Neutral | `[data-chip-class="nds-neutral nds-sm"]` | `.nds-multiselect` | Chips in the neutral color, for a choice that is not a brand action |
| State | Disabled | `[data-state~="disabled"]` | `.nds-multiselect` | The user cannot open the menu or remove a chip |
| State | Read-only | `[data-state~="readonly"]` | `.nds-multiselect` | The menu opens and shows the options, but the user cannot change them or remove a chip |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #multiselectVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="multiselectBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data-driven Options
{: .nds-block-title}

The script builds the option rows from the JSON in `data-multiselect-options` on `.nds-multiselect`. It puts them in the empty `.nds-dropmenu-scroll`. The JSON is an array of values, where each value is also its label, or an object of `value: label` pairs. An object of objects, `{"Technology": {"ai": "AI & ML"}}`, makes one fieldset per key, with the key as its legend. `data-multiselect-selected` holds an array of the values to check at load. The built rows replace any rows in the menu. `populate()` does the same from code.

### Apply Button
{: .nds-block-title}

With no Apply button, each check commits at once: the chips change and `nds:multiselect:change` fires. A button with `data-multiselect-action="apply"` in the menu makes checks wait. The user checks options in the menu, and Apply commits them. Closing the menu without Apply undoes them. A form submit while the menu is open checks and sends the committed options, not the waiting ones.

### Reset Button
{: .nds-block-title}

A button with `data-multiselect-action="reset"` in the menu unchecks every option. With no Apply button, the reset commits at once. With an Apply button, it unchecks the options in the menu only, and Apply commits the empty set. `data-no-auto-close` keeps the menu open after the click.

### Search
{: .nds-block-title}

`data-search` on the `[data-multiselect-dropmenu]` element adds a search box at the top of the menu. The box hides each row with `data-search-item` whose text does not match. `data-search="20"` adds the box only when the menu holds 20 rows or more. Data-driven builds its rows after the box is set up. So there, use `data-search` with no number, and keep the empty `.nds-dropmenu-scroll` in the menu.

### Validation
{: .nds-block-title}

`data-required`, `data-min-checked` and `data-max-checked` on `.nds-multiselect` count the checked options when the form submits. `data-required` alone means at least one. The error shows on the field. After an error shows, the field checks again on each change and clears the error when the count is right.

### Disabled and Read-only
{: .nds-block-title}

`data-state~="disabled"` on `.nds-multiselect` disables the menu button and every chip. With `data-state~="readonly"`, the menu button still works, so the user can open the menu and see all options. The options, the chips and Reset do not change anything. Code can still change the value with `removeValue()`, `reset()` and `populate()`.

</div>
  </div>
</section>

<section id="multiselectFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-multiselect</code> on the page starts on load, with its dropmenu. The chips for checked options show before the page appears.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Removable Chips</span>
          </span>
          <p class="nds-item-desc">A click on a chip unchecks its option and commits at once, with or without an Apply button. Focus moves to the next chip, or to the menu button after the last one.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-file-validation"></i>
            <span class="nds-label">Native Form Submission</span>
          </span>
          <p class="nds-item-desc">The form submits each checked checkbox by its <code class="nds-inline-code lang-html">name</code> and <code class="nds-inline-code lang-html">value</code>. A checkbox with no name gets <code class="nds-inline-code lang-html">name="{data-multiselect-name}[]"</code>, so the server reads an array.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database-01"></i>
            <span class="nds-label">Saved Values</span>
          </span>
          <p class="nds-item-desc">To show a saved value, write <code class="nds-inline-code lang-html">checked</code> on its options. The field builds their chips when it starts, with no script on the page.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-pointer-01"></i>
            <span class="nds-label">Whole-Field Click</span>
          </span>
          <p class="nds-item-desc">A click anywhere on the field, except on a chip, opens the menu. The menu lines up with the start edge of the field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">In the open menu, the arrow keys move through the options and the menu buttons, and Space checks an option. Escape closes the menu and moves focus back to the menu button.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-voice"></i>
            <span class="nds-label">Screen Reader Support</span>
          </span>
          <p class="nds-item-desc">The menu button's name lists the chosen options, such as "Select: AI &amp; ML, Cloud". A screen reader reads each change, such as "Added Cloud", in English or Arabic.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Menu Placement</span>
          </span>
          <p class="nds-item-desc">In a drawer, a modal or another scroll area that would cut it off, the menu moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code> while it is open.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="multiselectPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Group a long list in fieldsets with a legend, and put an `<hr class="nds-divider">` between the fieldsets. A screen reader reads the legend with each option.
- Add the Apply button when the user checks many options before the result matters, such as a filter. Leave it off a short list.
- Give each checkbox a `data-label`. The chip shows it, and the label can then hold more text than the chip needs.
- Give an icon-only menu button an `aria-label`, such as "Select". The script adds the chosen options to it.
- Keep the placeholder to two to four words. It shows only while no option is checked.
- Add `data-search` for a list longer than about 15 options.
- Say a count rule in the label, such as "Interests (2 to 4)", not in the placeholder.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="multiselectApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-multiselect-menu` | `.nds-dropmenu-menu` | The script adds it when the field starts. Style the menu through this class: it stays on the menu when the menu moves to `<body>` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-multiselect-name` | `.nds-multiselect` | The field name. The script gives it, with `[]` after it, to each checkbox that has no `name`. It is also `name` in the change event |
| `data-multiselect-options` | `.nds-multiselect` | JSON options that the script builds into the menu. See Data-driven Options |
| `data-multiselect-selected` | `.nds-multiselect` | A JSON array of the values to check at load, spelled as in the options. Used only with `data-multiselect-options` |
| `data-chip-class` | `.nds-multiselect` | The classes on each chip. The default is `nds-primary nds-sm`. See [Chips](../components/chips) |
| `data-required`, `data-min-checked`, `data-max-checked` | `.nds-multiselect` | The count rules. See Validation |
| `data-state~="filled"` | `.nds-multiselect` | The script sets it when an option is checked, and removes it when none is. It hides the placeholder. `destroy()` removes it |
| `data-state~="focus"` | `.nds-multiselect` | The script sets it while the menu button has focus or the menu is open, and removes it when both end |
| `data-state~="disabled"`, `data-state~="readonly"` | `.nds-multiselect` | Set it yourself. See Disabled and Read-only |
| `data-multiselect-dropmenu` | the `.nds-dropmenu` element | Marks the dropmenu that holds the options. Without it, the script uses `.nds-form-action.nds-prefix.nds-dropmenu` |
| `data-anchor` | the `.nds-dropmenu` element | Where the menu lines up. The script sets `start` when the element has no `data-anchor`. Write `center` or `end` to change it |
| `data-portal` | the `.nds-dropmenu` element | The menu moves to `<body>` on every open. See [Dropmenu](../components/dropmenu) for this and the other menu attributes |
| `data-search` | the `.nds-dropmenu` element | Adds the search box. See Search |
| `data-multiselect-chips` | `.nds-multiselect-chips` | Marks the element that holds the chips. The script fills it. Without it, the script uses `.nds-multiselect-chips` |
| `data-no-auto-close` | each `<fieldset>`, and the Reset button | A click on it leaves the menu open |
| `data-multiselect-action` | a button in `.nds-dropmenu-footer` | `reset` makes a Reset button, and `apply` an Apply button. See Reset Button and Apply Button |
| `data-label` | each checkbox | The chip text. Without it, the chip shows the option's `.nds-label` text |
| `data-search-item` | each `.nds-check-container` | The search box filters this row. Data-driven adds it when the dropmenu has `data-search` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Multiselect.init()` | Starts every `.nds-multiselect` that has not started. The loader calls it on load. Call it again after you add a field to the page |
| `NDS.Multiselect.reinit()` | The same as `init()` |
| `NDS.Multiselect.create(el)` | Starts one field, and returns its instance. On a field that has started, it returns the same instance |
| `NDS.Multiselect.destroy(el)` | Removes the listeners and the chips. The checked options stay. Call it before you remove the field from the page |
| `el.ndsMultiselect` | The instance of a field that has started |
| `instance.getSelected()` | Returns the values of the checked options, in menu order |
| `instance.apply()` | Commits the checked options: the chips change and the change event fires. The Apply button calls it |
| `instance.reset()` | Unchecks every option and commits. With an Apply button and the menu open, it unchecks them in the menu only |
| `instance.removeValue(value)` | Unchecks one option and commits |
| `instance.populate(options, selected)` | Replaces the options. It takes the shapes that `data-multiselect-options` takes, and an array of values to check. It fires no change event |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:multiselect:change` | `.nds-multiselect`, and it bubbles | `{ name, values, labels }`, after each commit. `name` is `data-multiselect-name`. `values` and `labels` are the checked options, in the same order |
{: .nds-table .nds-responsive}

<script type="text/html" id="multiselect-js" data-canon data-lang="js">
var field = document.querySelector('.nds-multiselect[data-multiselect-name="cities"]');

// Show the count next to the field
field.addEventListener('nds:multiselect:change', function (e) {
  document.querySelector('#city-count').textContent = e.detail.values.length + ' selected';
});

// Load the options from the server, and keep the saved ones checked
NDS.request('/api/cities').then(function (res) {
  field.ndsMultiselect.populate(res.data, ['riyadh']);
});
</script>

The full API is in the banner of `_js/nds-multiselect.js`.

</div>
  </div>
</section>
