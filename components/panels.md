---
layout: page
title: Panels
hero_title: Panels - National Design System
hero_description: A panel is a surface that slides in from an edge of the screen, for settings, filters or details the user opens on demand.
breadcrumb: [["Components", "/components"]]
since: "1.5.0"
updated: "1.12.x"
last_edit: "30/09/2026 - 07:54 AM"
lang: en
direction: ltr
---

<section id="panelOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A panel is an `nds-panel` element, usually an `<aside>`, and a button with `data-panel-toggle` that opens it. The panel holds three optional parts: a header (`nds-panel-header`), a body (`nds-panel-body`) and a footer (`nds-panel-footer`). The panel does not style the content you put in the body.

Pick another component when:

- the user must answer a short question before going on: [Modal](../components/modal)
- the content is a list of navigation links: [Drawer](../components/drawer) or [Side Menu](../ui-shell/sidemenu)
- the menu holds a few actions beside its button: [Dropmenu](../components/dropmenu)
- the content switches in place on the page: [Tabs](../components/tabs)

</div>
  </div>
</section>

<section id="panelMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="panel-settings" data-canon data-variants="panelVariantsTable">
<button type="button" class="nds-btn nds-primary nds-lg" data-panel-toggle="settings-panel">
  <span class="nds-label">Open Panel</span>
</button>
<aside id="settings-panel" class="nds-panel" aria-label="Settings" hidden>
  <div class="nds-panel-header">
    <span class="nds-featured-icon nds-circle">
      <i class="hgi hgi-stroke hgi-settings-01"></i>
    </span>
    <div class="nds-panel-text">
      <span class="nds-panel-title">Settings</span>
      <p class="nds-panel-description">Adjust how this page behaves.</p>
    </div>
    <div class="nds-panel-action">
      <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close panel">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
  <div class="nds-panel-body">
    <div class="nds-content-placeholder">
      <span>Swap with content component</span>
      <span>استبدل هذا العنصر بأي عنصر آخر</span>
    </div>
  </div>
  <div class="nds-panel-footer">
    <button type="button" class="nds-btn nds-primary nds-full" data-panel-close>
      <span class="nds-label">Done</span>
    </button>
  </div>
</aside>
</script>
<script type="text/html" id="panel-resize" data-canon>
<div class="nds-btn-group nds-seamless">
  <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-panel-resize="shrink" aria-label="Make panel smaller">
    <i class="nds-icon nds-hgi-minus-sign" aria-hidden="true"></i>
  </button>
  <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-panel-resize="grow" aria-label="Make panel larger">
    <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
  </button>
  <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-panel-close aria-label="Close panel">
    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
  </button>
</div>
</script>
<script type="text/html" id="panel-lazy" data-canon>
<button type="button" class="nds-btn nds-primary nds-lg" data-panel-toggle="details-panel">
  <span class="nds-label">Open Panel</span>
</button>
<template class="nds-panel-template">
  <aside id="details-panel" class="nds-panel" aria-label="Details" hidden>
    <div class="nds-panel-header">
      <span class="nds-featured-icon nds-circle">
        <i class="hgi hgi-stroke hgi-settings-01"></i>
      </span>
      <div class="nds-panel-text">
        <span class="nds-panel-title">Details</span>
        <p class="nds-panel-description">This panel joins the page on the first click.</p>
      </div>
      <div class="nds-panel-action">
        <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close panel">
          <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="nds-panel-body">
      <div class="nds-content-placeholder">
        <span>Swap with content component</span>
        <span>استبدل هذا العنصر بأي عنصر آخر</span>
      </div>
    </div>
    <div class="nds-panel-footer">
      <button type="button" class="nds-btn nds-primary nds-full" data-panel-close>
        <span class="nds-label">Done</span>
      </button>
    </div>
  </aside>
</template>
</script>
    </div>
  </div>
</section>

<section id="panelVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on the `nds-panel` element, except Resizable, which has two rows in the header: make both changes. On a lazy panel, write it on the `nds-panel` inside the `<template>`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Panel (default) | — | — | The panel is in the page from the start |
| Structure | Lazy panel | canon `#panel-lazy` | — | The panel sits in a `<template>` and joins the page on the first click. For a large panel that most users never open |
| Resize | Resizable | canon `#panel-resize` | `.nds-panel-action` | Minus, plus and close buttons in one group make the panel smaller or larger. For content the user may want to see wider |
| Resize | Resizable | remove | `.nds-panel-action > .nds-btn[data-panel-close]` | The group holds its own close button, so the lone one goes |
| Side | End (default) | — | — | Slides in from the end edge of the reading direction: the left in Arabic, the right in English |
| Side | Start | `[data-panel-side="start"]` | `.nds-panel` | Slides in from the start edge of the reading direction |
| Side | Left | `[data-panel-side="left"]` | `.nds-panel` | Always slides in from the left, in every language |
| Side | Right | `[data-panel-side="right"]` | `.nds-panel` | Always slides in from the right, in every language |
| Side | Top | `[data-panel-side="top"]` | `.nds-panel` | A full-width sheet below the header |
| Side | Bottom | `[data-panel-side="bottom"]` | `.nds-panel` | A full-width sheet that rises from the bottom. For actions on a phone |
| Modal | Modal | `[data-panel-modal]` | `.nds-panel` | Dims the page, stops it from scrolling and keeps focus in the panel. For a panel the user must finish first |
| Static | Static | `[data-panel-static]` | `.nds-panel` | Escape and a click outside do not close the panel. For a panel with a form the user could lose |
| Full width | Full width (hint: Top and bottom sheets) | `--panel-content-width: 100%` | `.nds-panel:is([data-panel-side="top"], [data-panel-side="bottom"])` | The sheet's content spans the full width, not the page's content width. For a wide table or a row of media |
{: #panelVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="panelBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Side
{: .nds-block-title}

`data-panel-side` picks the edge the panel slides in from. Start and end follow the reading direction, so an end panel opens on the left in Arabic and on the right in English. Left and right stay on the same edge in every language. A side panel is 420px wide, or the full width of a smaller screen.

### Sheet
{: .nds-block-title}

A top or bottom panel is a sheet: it spans the full width of the screen. The sheet is as tall as its content, up to 60% of the screen, and the body scrolls past that. Its content lines up with the page content at every screen size. Only the two corners that face the page are rounded.

### Modal
{: .nds-block-title}

A panel without `data-panel-modal` leaves the page usable, so the user can see a filter or a setting change the page. `data-panel-modal` is for a panel the user must finish first, such as a checkout step. It dims the page behind the panel and stops it from scrolling. Tab and Shift + Tab then stay inside the panel, and a click on the dimmed page closes it.

### Static
{: .nds-block-title}

`data-panel-static` turns off the two ways a user closes a panel by accident: Escape and a click outside it. The panel closes only from a `data-panel-close` control or a script. A panel that another panel replaces still closes.

### Resize
{: .nds-block-title}

A button with `data-panel-resize="grow"` or `"shrink"` moves the panel one step along four sizes: `sm`, `md` (the default), `lg` and `xl`. A side panel changes its width. A sheet changes its height, and a resizable sheet keeps that height even when its content is shorter. The panel never grows past the screen: the plus button gets `aria-disabled="true"` at the largest size, or sooner when the panel already fills the screen. The minus button gets it at the smallest size. Put the buttons in one `nds-btn-group` inside `nds-panel-action`, with the close button last. Put `data-panel-size` on the panel to start at another size. A `--panel-width` or `--panel-height` you set is the `md` size, and the other sizes scale from it: `sm` is three quarters of it, `lg` a third larger and `xl` three quarters larger.

### Lazy Panel
{: .nds-block-title}

A lazy panel keeps its markup in a `<template class="nds-panel-template">`, so it adds nothing to the page until the first click. The toggle stays outside the template. On that click, the panel joins the page, and NDS starts the components inside it. Put one panel in each template.

</div>
  </div>
</section>

<section id="panelFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-panel</code> on the page starts by itself. The toggle and close buttons work from their attributes, with no script of your own.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Focus Management</span>
          </span>
          <p class="nds-item-desc">Focus moves to the first close button when the panel opens, or to the panel when it has none, and back to the toggle when it closes. Escape and a click outside close the panel.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-transition-left"></i>
            <span class="nds-label">One Panel at a Time</span>
          </span>
          <p class="nds-item-desc">Opening a panel closes the open one first, and waits until it slides out. Two panels never cross.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-anchor-point"></i>
            <span class="nds-label">Header-Aware Position</span>
          </span>
          <p class="nds-item-desc">The panel starts below the sticky header, and moves with it as the top bar scrolls in and out. A tall sheet stops at the header.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Open, close and toggle a panel from a script, check whether it is open, and listen to its events.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="panelPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a panel for content that supports the main task without replacing it: settings, filters, the details of an item, a short form.
- Give every panel an `id`, and give its toggle that `id` in `data-panel-toggle`. A panel without an `id` cannot be opened.
- Give the panel an `aria-label` that names it, and each icon-only button an `aria-label`.
- Ship the panel with `hidden`, so it never shows before the script loads.
- Give every button `type="button"`. In a form, a button without it submits the form.
- Prefer the start and end sides, so the panel follows the reading direction. Use left or right only when the panel must stay on one edge in every language.
- Use a bottom sheet for actions on a phone, and a side panel for settings or filters on a large screen.
- Keep the title in `nds-panel-text`, with an optional `nds-panel-description` below it.
- Do not look up a lazy panel when the page loads: it is not in the page yet. Listen on `document` for `nds:template:ready`, which fires on the panel after it joins the page and its components start.

</div>
  </div>
</section>

<section id="panelApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-panel` | the panel, usually an `<aside>` | The sliding surface |
| `nds-panel-header` | `div` in `.nds-panel` | The top row: an optional featured icon, the text and the header buttons, with a divider below |
| `nds-panel-text` | `div` in `.nds-panel-header` | Holds the title and the description, and fills the free space in the row. A bare `nds-panel-title` also fills it |
| `nds-panel-title` | `span` in `.nds-panel-text` | The panel's title |
| `nds-panel-description` | `p` in `.nds-panel-text` | A short line below the title |
| `nds-panel-action` | `div` in `.nds-panel-header` | Holds the header buttons: the close button, and any beside it, such as a Reset button or the resize group. They sit closer together than the header items |
| `nds-panel-body` | `div` in `.nds-panel` | The content. It scrolls when the content is taller than the panel |
| `nds-panel-footer` | `div` in `.nds-panel` | A row of buttons at the bottom, with a divider above |
| `nds-scroll-more` | `div` in `.nds-panel`, in place of `.nds-panel-body` | A [Scroll More](../components/scroll-more) area fills the same space as the body |
| `nds-panel-template` | `<template>` | Holds a lazy panel |
{: .nds-table .nds-responsive}

On a phone, the header buttons shrink to 32px.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-panel-toggle` | any button on the page | Opens or closes the panel whose `id` is its value. The script sets `aria-expanded` on it |
| `data-panel-close` | any element in the panel | Closes the panel. The first one gets focus when the panel opens |
| `data-panel-resize` | a button in the panel | `grow` makes the panel one size larger, `shrink` one size smaller |
| `data-panel-size` | `.nds-panel` | The size: `sm`, `md` (the default), `lg` or `xl`. The script writes it when the user resizes the panel |
| `data-panel-side` | `.nds-panel` | The edge: `end` (the default), `start`, `left`, `right`, `top` or `bottom` |
| `data-panel-modal` | `.nds-panel` | Dims the page, stops it from scrolling and keeps focus in the panel |
| `data-panel-static` | `.nds-panel` | Escape and a click outside do not close the panel |
| `data-state` | `.nds-panel` | The script writes `open` while the panel is open, `opening` while it slides in and `closing` while it slides out |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the `.nds-panel` element.

| Property | Default | Controls |
|---|---|---|
| `--panel-width` | `420px` | Width of a start, end, left or right panel, at the `md` size. The panel is never wider than the screen |
| `--panel-height` | `60svh` | Most height of a top or bottom sheet, at the `md` size. The sheet also stops at the header |
| `--panel-content-width` | `var(--nds-content-MaxWidth)` | Most width of a sheet's content. `100%` spans the full width, inside the page gutter |
| `--panel-top` | the bottom of the sticky header | Where the panel starts. Any value turns off the header tracking. `0` covers the header too, and needs a `--panel-z` above the header's |
| `--panel-padding` | `var(--spacing-lg)` | Space inside the header, the body and the footer |
| `--panel-gap` | `0` | Space between the header, the body and the footer |
| `--panel-radius` | `0`, `var(--radius-lg)` on a sheet | Corner radius. A sheet rounds only the two corners that face the page |
| `--panel-z` | `999` | Stack order. The main navigation is `1000` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

Each method takes the panel element or its `id`.

| Method | Effect |
|---|---|
| `NDS.Panel.open(panel, { focus })` | Opens the panel. An open panel closes first. For a lazy panel, pass its `id`: the element is not in the page yet. Pass `{ focus: false }` when the page opens it on its own, so focus stays where the user is |
| `NDS.Panel.close(panel)` | Closes the panel |
| `NDS.Panel.toggle(panel)` | Opens or closes the panel |
| `NDS.Panel.isOpen(panel)` | Returns `true` while the panel is open and not closing |
| `NDS.Panel.init()` | Starts every `.nds-panel` on the page that has not started yet. `reinit()` is the same |
| `NDS.Panel.create(panel)` | Starts one panel element |
| `NDS.Panel.destroy(panel)` | Closes the panel at once and removes its listeners |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:panel:opened` | `.nds-panel` | `{ panel }`, after the panel slides in |
| `nds:panel:closed` | `.nds-panel` | `{ panel }`, after the panel slides out. When one panel replaces another, this fires before the new panel's `opened` |
| `nds:panel:resized` | `.nds-panel` | `{ panel, size }`, after a resize button changes the size |
| `nds:template:ready` | `.nds-panel` | `{ id }`, when a lazy panel joins the page |
{: .nds-table .nds-responsive}

<script type="text/html" id="panel-js" data-canon data-lang="js">
document.addEventListener('nds:panel:closed', function (e) {
  if (e.detail.panel.id === 'settings-panel') console.log('Settings closed');
});
NDS.Panel.open('settings-panel');
</script>

The full API is in the banner of `_js/nds-panels.js`.

</div>
  </div>
</section>

<section id="panelRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [FAB](../components/fab): a floating button that opens a panel on the same edge.
- [Accessibility](../components/accessibility): the accessibility settings open in a lazy panel.

</div>
  </div>
</section>
