---
layout: page
title: Copy
hero_title: Copy - National Design System
hero_description: A script that copies text to the clipboard when the user clicks a button, then shows a checkmark
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "03/10/2026 - 10:12 PM"
---

<section id="copyOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Copy works on any button with `nds-copy`. The button copies the text in its `data-copy` attribute, or the text of another element on the page. After the copy, the button shows a checkmark for 2 seconds, and a screen reader announces a message.

Pick another component when:

- the text is a code sample: [Code](../components/code)
- the user shares the page link to a social network: [Share](../utilities/share)

</div>
  </div>
</section>

<section id="copyMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="copy-button" data-canon data-variants="copyVariantsTable">
<button type="button" class="nds-btn nds-secondary-outline nds-copy" data-copy="REF-2026-04-19-7A3F">
  <i class="nds-icon nds-hgi-copy-01"></i>
  <span class="nds-label">Copy reference</span>
</button>
</script>

<script type="text/html" id="copy-icon-only" data-canon>
<dl class="nds-definition-list">
  <div class="nds-definition-item">
    <dt>Reference Number</dt>
    <dd class="nds-item-action">
      <span class="nds-label">REF-2026-04-19-7A3F</span>
      <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy" data-copy="REF-2026-04-19-7A3F" aria-label="Copy reference number">
        <i class="nds-icon nds-hgi-copy-01"></i>
      </button>
    </dd>
  </div>
</dl>
</script>

<script type="text/html" id="copy-target" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-content">
    <div class="nds-card-text">
      <p class="nds-card-description">Application reference</p>
      <span class="nds-card-title" id="copy-target-ref">REF-2026-04-19-7A3F</span>
    </div>
  </div>
  <div class="nds-card-actions">
    <button type="button" class="nds-btn nds-secondary-outline nds-sm nds-copy" data-copy-target="#copy-target-ref">
      <i class="nds-icon nds-hgi-copy-01"></i>
      <span class="nds-label">Copy reference</span>
    </button>
  </div>
</div>
</script>

    </div>
  </div>
</section>

<section id="copyVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Label Swap and Announcement go on the copy button. Label Swap needs a `.nds-label` in the button, so it is off on Icon Only.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Button (default) | — | — | A button with a label that copies a fixed text from `data-copy` |
| Structure | Icon Only | canon `#copy-icon-only` | — | A small button next to the value it copies, in a list of details |
| Structure | From Element | canon `#copy-target` | — | The button copies the text of another element, named by `data-copy-target` |
| Label Swap | Label Swap (hint: The label reads "Copied" after the copy) | `[data-copy-label="Copied"]` | `.nds-copy:not(.nds-icon-only)` | The label reads "Copied" for 2 seconds after the copy |
| Announcement | Announcement (hint: What a screen reader says after the copy) | `[data-copy-announce="Reference number copied"]` | `.nds-copy` | The text a screen reader announces after the copy. Without it, the script announces `data-copy-label`, then "Copied" («تم النسخ» on an Arabic page) |
{: #copyVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="copyBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### From Element
{: #copyFromElement}

`data-copy-target` holds a CSS selector. At each click, the script copies the text of the first element that matches, without spaces at the start and end. Use it for a value that changes after the page loads, or a value that is already on the page.

### Label Swap
{: #copyLabelSwap}

`data-copy-label` replaces the text of the button's `.nds-label` while the checkmark shows. Then the script puts the old text back. On a button with no `.nds-label`, only the screen reader says the text.

</div>
  </div>
</section>

<section id="copyFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Automatic Start</span>
          </span>
          <p class="nds-item-desc">One click listener on the page serves every <code class="nds-inline-code lang-html">.nds-copy</code>, including the buttons you add later. You write no script.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-target-02"></i>
            <span class="nds-label">Text Order</span>
          </span>
          <p class="nds-item-desc">The script copies the first text it finds: <code class="nds-inline-code lang-html">data-copy</code>, then <code class="nds-inline-code lang-html">data-copy-target</code>, then the code of a surrounding <code class="nds-inline-code lang-html">.nds-code</code> block. In a code block with tabs, it copies the code of the open tab.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tick-01"></i>
            <span class="nds-label">Success Feedback</span>
          </span>
          <p class="nds-item-desc">The icon changes to a checkmark for 2 seconds. During that time, the button takes no clicks.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-voice"></i>
            <span class="nds-label">Screen Reader Announcement</span>
          </span>
          <p class="nds-item-desc">The shared live region announces each copy, so a screen reader user gets the same confirmation.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">HTTP Fallback</span>
          </span>
          <p class="nds-item-desc">When the browser blocks the Clipboard API, such as on a test server without HTTPS, the script copies through a hidden text box.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Script Control</span>
          </span>
          <p class="nds-item-desc">Your own script can copy a text, or show the checkmark on a button, with <code class="nds-inline-code lang-js">NDS.Copy</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="copyPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Give an icon-only button an `aria-label` that names the value, such as "Copy reference number". "Copy" alone does not tell a screen reader user what is copied.
- Show the value next to an icon-only button, so the user sees what is copied.
- Add `data-copy-announce` when many copy buttons sit together and the label must not change, such as a list of codes. The screen reader then says which value was copied.
- Add a copy button only to values that users copy: reference numbers, codes, phone numbers, email addresses. Do not add one to every row of a long list.
- In a [Dropmenu](../components/dropmenu) item, add `data-no-auto-close`. Without it, the menu closes before the user sees the checkmark.

</div>
  </div>
</section>

<section id="copyApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

The script reads these attributes on `.nds-copy` and on the elements that match a `bind()` selector.

| Attribute | Element | Effect |
|---|---|---|
| `data-copy` | `.nds-copy` | The text to copy. The script reads it first. An empty value copies nothing |
| `data-copy-target` | `.nds-copy` | A CSS selector. The script copies the text of the first match. It reads it only when `data-copy` is absent |
| `data-copy-label` | `.nds-copy` with a `.nds-label` | The label text while the checkmark shows |
| `data-copy-announce` | `.nds-copy` | The text the live region announces after the copy. Default: `data-copy-label`, then "Copied" («تم النسخ» on an Arabic page) |
| `data-status="success"` | `.nds-copy` | The script sets it after a copy, and removes it after `duration`. While it is set, `.nds-copy` and `.nds-btn` show the success color, and `.nds-copy` takes no clicks |
| `aria-disabled="true"` | `.nds-copy` | The script sets and removes it with `data-status` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Copy.init()` | Listens for clicks on every `.nds-copy`. The loader calls it |
| `NDS.Copy.bind(selector, options)` | Listens for clicks on your own selector, including elements added later. A second call with the same selector replaces the first. Add `nds-btn` to the elements for the success color |
| `NDS.Copy.writeText(text)` | Writes the text to the clipboard. Returns a promise of `true` or `false`. Empty text returns `false` |
| `NDS.Copy.flash(button, options)` | Shows the checkmark, the label swap and the announcement, with no copy. A call during a flash does nothing. It does not call `onRestore` |
| `NDS.Copy.copyFrom(button, options)` | Finds the button's text, copies it, and shows the checkmark. Returns a promise of `true` or `false` |
{: .nds-table .nds-responsive}

`bind()`, `flash()` and `copyFrom()` take these options:

| Option | Default | Effect |
|---|---|---|
| `duration` | `2000` | The time in ms that the button shows the checkmark |
| `onRestore` | — | A function the script calls when the button returns to normal |
{: .nds-table .nds-responsive}

Copy fires no events. Use the promise from `writeText()` or `copyFrom()`.

<script type="text/html" id="copy-api-js" data-canon data-lang="js">
var button = document.querySelector('#copy-request-link');
var link = location.origin + '/requests/' + requestId;

NDS.Copy.writeText(link).then(function (ok) {
  if (ok) NDS.Copy.flash(button, { duration: 3000 });
});
</script>

The full API is in the banner of `_js/nds-copy.js`.

</div>
  </div>
</section>

<section id="copyRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Contact Us Template](../templates/contact-us-template): copy buttons next to the phone numbers and the email address.
- [Code](../components/code): the copy button in the action bar of a code block.
- [Share](../utilities/share): the Copy Link item in the share menu.
- [Alert](../components/alert): an alert action with `copy` or `copyTarget` becomes a copy button.

</div>
  </div>
</section>
