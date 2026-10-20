---
layout: page
title: Print
hero_title: Print - National Design System
hero_description: How an NDS page prints, and a button that prints one part of the page alone
breadcrumb: [["Utilities", "/components/?shelf=Utilities"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "20/10/2026 - 05:08 PM"
---

<section id="print-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A printed NDS page shows its own content and the site logo. The top bar, the navigation, the footer and the other site parts stay off the paper by themselves. Two attributes control the rest: `data-print-target` on a button prints one element alone, and `data-hidden="print"` keeps an element off the paper.

Pick another component when:

- the user saves a table as a PDF or a spreadsheet file: [Export](../components/export)
- the element must hide on a screen size, not on paper: [Hidden](../utilities/hidden)

</div>
  </div>
</section>

<section id="print-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="print-target" data-canon data-variants="print-variants-table">
<div class="nds-flex nds-col nds-center">
  <div class="nds-card nds-stroke nds-block" id="print-permit">
    <h3 class="nds-block-title">Vehicle Entry Permit</h3>
    <dl class="nds-definition-list nds-table-view">
      <div class="nds-definition-item">
        <dt><span class="nds-label">Permit number</span></dt>
        <dd>VP-2026-04817</dd>
      </div>
      <div class="nds-definition-item">
        <dt><span class="nds-label">Holder</span></dt>
        <dd>Mohammed Al-Harbi</dd>
      </div>
      <div class="nds-definition-item">
        <dt><span class="nds-label">Plate</span></dt>
        <dd>ABC 1234</dd>
      </div>
      <div class="nds-definition-item">
        <dt><span class="nds-label">Valid until</span></dt>
        <dd>17/12/2026</dd>
      </div>
    </dl>
  </div>
  <button type="button" class="nds-btn nds-primary" data-print-target="print-permit">
    <i class="nds-icon nds-hgi-printer"></i>
    <span class="nds-label">Print permit</span>
  </button>
</div>
</script>

<script type="text/html" id="print-hide" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Request REQ-2026-11532</span>
      <p class="nds-card-description">Submitted on 18/10/2026. Under review.</p>
    </div>
  </div>
  <div class="nds-card-actions">
    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-hidden="print">
      <i class="hgi hgi-stroke hgi-share-08"></i>
      <span class="nds-label">Share</span>
    </button>
  </div>
</div>
</script>

    </div>
  </div>
</section>

<section id="print-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Print Target (default) | — | — | A button prints one element alone, such as a permit or a receipt. `data-print-target` names the element's `id` |
| Structure | Hide on Paper | canon `#print-hide` | — | An element that only works on screen, such as a Share button, stays off the paper |
{: #print-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="print-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Print Target
{: #print-target-behavior}

A press on the button opens the browser's print dialog with only the target on the paper. The rest of the page does not print, the site logo included. After the dialog closes, the page is as before. Ctrl+P still prints the whole page.

### Target Layout
{: #print-target-layout}

The target prints at its width on screen, in the middle of the sheet. A target wider than the sheet narrows to fit. A card or section around the target prints no frame, background or spacing.

### Hide on Paper
{: #print-hide-behavior}

`data-hidden="print"` hides the element on paper only. On screen it shows as usual. It adds to the other `data-hidden` tokens: `data-hidden="sm print"` hides the element on phones and on paper.

</div>
  </div>
</section>

<section id="print-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off"></i>
            <span class="nds-label">Site Chrome Off the Paper</span>
          </span>
          <p class="nds-item-desc">The top bar, the main navigation links and buttons, the breadcrumb, the side menu, the footer, the floating buttons, the cookie notice and the page feedback do not print. The site logo prints at the top.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Colors as on Screen</span>
          </span>
          <p class="nds-item-desc">Colors, icons, checkmarks and colored bands print as they look on screen. By default a browser does not print background colors, and NDS paints its icons and checkmarks with one, so NDS tells the browser to print them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-file-01"></i>
            <span class="nds-label">White Paper</span>
          </span>
          <p class="nds-item-desc">The page background does not print, so the sheet stays white around the content.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-moon-02"></i>
            <span class="nds-label">Light Print in Dark Mode</span>
          </span>
          <p class="nds-item-desc">A page in dark mode, and every dark area on a page, prints in light colors, then returns to dark. A print target that has its own <code class="nds-inline-code lang-html">data-theme="dark"</code> keeps its dark look.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-printer"></i>
            <span class="nds-label">No Script to Write</span>
          </span>
          <p class="nds-item-desc">One click listener serves every <code class="nds-inline-code lang-html">data-print-target</code> button. It starts only on a page that has one.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="print-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Show the document on the page before the user prints it, as the sample above does. The user then sees what they will get.
- Set the paper size in your own stylesheet when the document needs one, such as `@page { size: A4; }`. NDS sets no paper size.
- Design the printed document yourself. NDS has no document layout, because each organization has its own.
- Put everything the document needs inside the target: logo, title, details, stamp. Nothing outside it prints.
- Give the print button a label that names the document, such as "Print permit".
- Add `data-hidden="print"` to controls inside a printed area that do nothing on paper, such as a Share or Copy button.

</div>
  </div>
</section>

<section id="print-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-print-target` | A button | Names the `id` of the element to print alone. A press opens the print dialog with only that element on the paper. A value that names no element does nothing, and the audit reports it |
| `data-hidden="print"` | Any element | Hides the element on paper only. It adds to the other `data-hidden` tokens |
| `data-nds-print-skip` | Every element outside the target | The script sets it before the print dialog opens, and removes it after the dialog closes. On paper the element is hidden. Do not write it yourself |
| `data-nds-print-self` | The target | The script sets it before the print dialog opens, with `--nds-print-width`: the target's width on screen. It removes both after the dialog closes. On paper the target keeps that width, narrows to fit the sheet, and sits in its middle. Do not write it yourself |
| `data-nds-print-path` | Every parent of the target | The script sets it before the print dialog opens, and removes it after the dialog closes. On paper the parent has no background, border, shadow, padding or margin. Do not write it yourself |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Print.init()` | Listens for clicks on every `data-print-target` button. The loader calls it on a page that has one. For a button added after the page loads, call `NDS.init.mount()` on its container |
| `NDS.Print.print(target)` | Prints one element alone, the same as the button. `target` is an element, an `id` or a selector. Returns `false` when it names no element |
{: .nds-table .nds-responsive}

Print fires no events. To print the whole page from your script, call the browser's `window.print()`.

<script type="text/html" id="print-api-js" data-canon data-lang="js">
loadReceipt(requestId).then(function () {
  NDS.Print.print('receipt');
});
</script>

The full API is in the banner of `_js/nds-print.js`. The print rules are in `_sass/_utilities.scss`.

</div>
  </div>
</section>
