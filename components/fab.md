---
layout: page
title: Floating Action Button
hero_title: Floating Action Button - National Design System
hero_description: A floating action button (FAB) stays at an edge of the screen while the page scrolls, for a main action that the user needs on every part of the page.
breadcrumb: [["Components", "/components"]]
since: "1.5.0"
updated: "1.12.x"
last_edit: "07/10/2026 - 07:15 AM"
lang: en
direction: ltr
---

<section id="fabOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A FAB is a [Button](../components/button), or a button group, with the `nds-fab` class. The script moves it out of the page into a dock at the left, right or bottom edge of the screen. FABs on the same edge stack in one dock. A FAB usually opens a [Panel](../components/panels) with `data-panel-toggle`.

Pick another component when:

- the action belongs to one place in the content: [Button](../components/button)
- the actions fit in a menu beside a button: [Dropmenu](../components/dropmenu)
- the actions sit above a table or a list: [Toolbar](../components/toolbar)

</div>
  </div>
</section>

<section id="fabMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="fab-button" data-canon data-variants="fabVariantsTable" data-preview="run" data-run-label="Add FAB" data-sheet="top">
<button type="button" class="nds-btn nds-fab nds-primary nds-circle nds-icon-only" data-panel-toggle="fab-panel" aria-label="Open panel" hidden>
  <i class="hgi hgi-stroke hgi-menu-01"></i>
</button>
<aside id="fab-panel" class="nds-panel" aria-label="Details" hidden>
  <div class="nds-panel-header">
    <div class="nds-panel-text">
      <span class="nds-panel-title">Details</span>
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
</aside>
</script>
<script type="text/html" id="fab-group" data-canon>
<div class="nds-btn-group nds-fab nds-vertical" hidden>
  <button type="button" class="nds-btn nds-primary nds-icon-only" data-panel-toggle="fab-group-panel" aria-label="Open panel">
    <i class="hgi hgi-stroke hgi-menu-01"></i>
  </button>
  <button type="button" class="nds-btn nds-primary nds-icon-only" aria-label="Copy link">
    <i class="hgi hgi-stroke hgi-link-01"></i>
  </button>
  <button type="button" class="nds-btn nds-primary nds-icon-only" aria-label="Email">
    <i class="hgi hgi-stroke hgi-mail-01"></i>
  </button>
</div>
<aside id="fab-group-panel" class="nds-panel" aria-label="Details" hidden>
  <div class="nds-panel-header">
    <div class="nds-panel-text">
      <span class="nds-panel-title">Details</span>
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
</aside>
</script>
    </div>
  </div>
</section>

<section id="fabVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Variant and Size have two rows. On a single FAB, the class goes on the FAB button. On a group, it goes on each button in the group. Edge sets the side of the panel. The FAB has no `data-fab-pos`, so it docks on the panel's edge.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Button (default) (demo: + size-lg) | — | — | One button. The usual FAB |
| Structure | Group (demo: + subtle) (demo: + size-sm) | canon `#fab-group` | — | Related actions, such as a set of share buttons. The group docks as one item, and the toggle is one of its buttons |
| Edge | End (default) (demo: + vertical) (hint: Follows the reading direction) | — | — | The end edge of the reading direction: the left in Arabic, the right in English |
| Edge | Start (demo: + vertical) (hint: Follows the reading direction) | `[data-panel-side="start"]` | `.nds-panel` | The start edge of the reading direction |
| Edge | Left (demo: + vertical) (hint: Stays on the left in every language) | `[data-panel-side="left"]` | `.nds-panel` | The left edge in every language |
| Edge | Right (demo: + vertical) (hint: Stays on the right in every language) | `[data-panel-side="right"]` | `.nds-panel` | The right edge in every language |
| Edge | Bottom (demo: + horizontal) | `[data-panel-side="bottom"]` | `.nds-panel` | The middle of the bottom edge. The panel is a sheet that rises from the bottom |
| Variant | Primary (default) | `.nds-primary` | `.nds-btn.nds-fab` | The main action on the page |
| Variant | Primary (default) | `.nds-primary` | `.nds-fab > .nds-btn` | The same, on each button of a group |
| Variant | Neutral | `.nds-neutral` | `.nds-btn.nds-fab` | A strong action that is not the brand color |
| Variant | Neutral | `.nds-neutral` | `.nds-fab > .nds-btn` | The same, on each button of a group |
| Variant | Secondary | `.nds-secondary` | `.nds-btn.nds-fab` | A supporting action, with a light fill |
| Variant | Secondary | `.nds-secondary` | `.nds-fab > .nds-btn` | The same, on each button of a group |
| Variant | Secondary outline | `.nds-secondary-outline` | `.nds-btn.nds-fab` | A supporting action, with a border |
| Variant | Secondary outline | `.nds-secondary-outline` | `.nds-fab > .nds-btn` | The same, on each button of a group |
| Variant | Subtle (id: subtle) | `.nds-subtle` | `.nds-btn.nds-fab` | A low-emphasis action, with the page background and a border |
| Variant | Subtle (id: subtle) | `.nds-subtle` | `.nds-fab > .nds-btn` | The same, on each button of a group |
| Size | LG (default) (id: size-lg) | — | — | 56px, 48px on a phone. It needs no class |
| Size | MD | `.nds-md` | `.nds-btn.nds-fab` | 48px, 40px on a phone |
| Size | MD | `.nds-md` | `.nds-fab > .nds-btn` | The same, on each button of a group |
| Size | SM (id: size-sm) | `.nds-sm` | `.nds-btn.nds-fab` | 40px, 32px on a phone |
| Size | SM (id: size-sm) | `.nds-sm` | `.nds-fab > .nds-btn` | The same, on each button of a group |
| Shape | Circle (default) | `.nds-circle` | `.nds-btn.nds-fab` | A round button |
| Shape | Square | — | `.nds-btn.nds-fab` | A button with rounded corners |
| Direction | Vertical (default) (id: vertical) | `.nds-vertical` | `.nds-btn-group` | The buttons stack in a column along a side edge |
| Direction | Horizontal (id: horizontal) | — | `.nds-btn-group` | The buttons sit in a row. For the bottom edge |
| Thumb | Thumb (hint: Sits against the screen edge, square on that side) | `.nds-fab-thumb` | `.nds-fab` | The FAB sits against the screen edge, with square corners on that side. It moves aside when its panel opens from the same edge |
| Gap | None (default) | — | — | The dock's own gap between FABs |
| Gap | SM | `[data-fab-gap="sm"]` | `.nds-fab` | 8px of extra space between the FAB and the one before it |
| Gap | MD | `[data-fab-gap="md"]` | `.nds-fab` | 16px of extra space, to start a new set of FABs |
| Gap | LG | `[data-fab-gap="lg"]` | `.nds-fab` | 32px of extra space, for FABs that do not belong together |
{: #fabVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="fabBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Edge
{: .nds-block-title}

The Edge options set the side of the panel, and the FAB follows it. To place a FAB on an edge of its own, write `data-fab-pos`. `start` and `end` follow the reading direction. `left`, `right` and `bottom` stay on that edge in every language. If its panel is not on the page yet, the FAB reads `data-panel-side` from its toggle button. A FAB with no `data-fab-pos` and no side, or with a top sheet, docks on the end edge.

### Thumb
{: .nds-block-title}

`nds-fab-thumb` puts the FAB against the screen edge. The corners on that side turn square and the border there goes away, so it looks like a tab. When its panel slides in from the same edge, the thumb moves aside with the panel and comes back when the panel closes. On the bottom edge, it sits on the bottom of the screen and rises with the sheet. A thumb with an explicit `data-fab-pos` moves only when that edge is the panel's edge.

### Group
{: .nds-block-title}

A button group with `nds-fab` docks as one item, with one shadow around the whole group. Put `data-panel-toggle` on one of its buttons: the group docks on that panel's edge, and with `nds-fab-thumb` the whole group moves aside. Style it as any button group: the variant and size go on its buttons. Only the outer `nds-fab` docks: a button inside it with `nds-fab` stays in the group.

### Gap
{: .nds-block-title}

`data-fab-gap` adds space between a FAB and the one before it in the dock, on top of the dock's own gap. Use it to split the FABs on one edge into sets, such as the page actions and a chat button. On a side edge the space goes below the FAB, and on the bottom edge to its left. The FAB with the gap is the first of its set, so give it the lowest `data-fab-order` in that set.

</div>
  </div>
</section>

<section id="fabFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The script moves every <code class="nds-inline-code lang-html">nds-fab</code> to its dock after the page shows. There is no dock to write and nothing to call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-maximize-screen"></i>
            <span class="nds-label">Fixed Edge Docks</span>
          </span>
          <p class="nds-item-desc">There are three docks: left, right and the middle of the bottom. A <code class="nds-inline-code lang-html">start</code> or <code class="nds-inline-code lang-html">end</code> FAB lands in the left or the right dock, so two FABs on one edge always share a dock.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-all-direction"></i>
            <span class="nds-label">Direction-Aware Routing</span>
          </span>
          <p class="nds-item-desc">When the page direction changes, a <code class="nds-inline-code lang-html">start</code> or <code class="nds-inline-code lang-html">end</code> FAB moves to the other side, and so does a FAB that follows its panel. A <code class="nds-inline-code lang-html">left</code> or <code class="nds-inline-code lang-html">right</code> FAB stays.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-target-02"></i>
            <span class="nds-label">Panel Following</span>
          </span>
          <p class="nds-item-desc">A FAB with no <code class="nds-inline-code lang-html">data-fab-pos</code> docks on the edge of the panel it opens. Change the panel's side and the FAB follows.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Automatic Stacking</span>
          </span>
          <p class="nds-item-desc">FABs on one edge stack, ordered by <code class="nds-inline-code lang-html">data-fab-order</code>. On a side edge, the lowest number is at the bottom. On the bottom edge, they sit in a row from left to right.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-transition-left"></i>
            <span class="nds-label">Page-End Tuck</span>
          </span>
          <p class="nds-item-desc">Near the end of a page that scrolls, the docks slide out past their edge, so a FAB never covers the footer. They also slide out while a hero fills the bottom of the screen.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-drag-drop"></i>
            <span class="nds-label">Mixed Shapes and Sizes</span>
          </span>
          <p class="nds-item-desc">Circles, thumbs and groups of any size share a dock. The dock lines them up on its edge and keeps each one's size and shape.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-stars"></i>
            <span class="nds-label">Floating Look</span>
          </span>
          <p class="nds-item-desc">A docked FAB is 16px larger than the same button in the page (8px on a phone), and it casts a shadow. Secondary, secondary outline and subtle get a solid fill, so the page does not show through.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">A FAB made by a script docks with one call. <code class="nds-inline-code lang-js">NDS.Fab.destroy()</code> puts a FAB back in its view before an app removes that view.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="fabPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Keep FABs few: one for the main action, such as add, compose, filters or chat. Put more actions in a [Panel](../components/panels) that the FAB opens.
- Write the `hidden` attribute on every FAB. The script removes it once the FAB is in its dock, so the FAB never shows at the place you wrote it.
- Leave out `data-fab-pos` on a FAB that opens a panel, so the FAB stays on the panel's edge.
- Use `start` and `end` so the edge follows the reading direction. Use `left` or `right` only for an action that must stay on one side in every language.
- Give the main action the lowest `data-fab-order`, so it sits nearest the edge.
- Give an icon-only FAB an `aria-label` that names the action.
- Do not write the square corners of a thumb yourself. The dock sets them from its edge, so they stay right when the FAB moves.
- In an app that swaps views, call `NDS.Fab.destroy(view)` or `NDS.Init.destroy(view)` before you remove a view. A FAB lives in a dock on `<body>`, so it stays on the screen after its view is gone.

</div>
  </div>
</section>

<section id="fabApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-fab` | `.nds-btn` or `.nds-btn-group` | Makes it a FAB: the script moves it to its dock |
| `nds-fab-dock` | `div` | A dock. The script makes one for each edge in use, at the end of `<body>`. To place a plain button at an edge, write a dock yourself with `data-fab-dock-pos` and put the button in it. The script moves only buttons with `nds-fab` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-fab-pos` | `.nds-fab` | The edge: `auto` (the default), `start`, `end`, `left`, `right` or `bottom`. See Edge under Behavior |
| `data-fab-order` | `.nds-fab` | The place in the stack. A lower number sits nearer the edge. The default is `0` |
| `data-fab-gap` | `.nds-fab` | Extra space between the FAB and the one before it: `sm` (8px), `md` (16px) or `lg` (32px). See Gap under Behavior |
| `data-panel-toggle` | `.nds-fab`, or a button in a group | The `id` of the [Panel](../components/panels) it opens. The FAB docks on that panel's edge |
| `data-fab-dock-pos` | `.nds-fab-dock` | The edge of a dock you write yourself: `left`, `right` (the default) or `bottom` |
| `data-fab-riding` | `.nds-fab-thumb` | The script writes it while the thumb moves aside for its panel |
| `data-fab-tucked` | `<html>` | The script writes it while the docks slide out, near the page end or over a hero |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

The script makes the docks, so set the dock properties on `:root`, or on a dock you write yourself. Set `--fab-gap` on the FAB.

| Property | Default | Controls |
|---|---|---|
| `--fab-dock-offset` | `calc(var(--nds-viewport-padding) / 2)` | Space between a dock and the screen edges: half the page gutter. On a touch screen, a left or right dock sits twice this far from the bottom, clear of the rounded screen corners |
| `--fab-dock-gap` | `var(--spacing-md)` | Space between FABs in a dock |
| `--fab-gap` | set by `data-fab-gap` | Extra space of a FAB with `data-fab-gap`. Any value replaces the size |
| `--fab-dock-z` | `899` | Stack order of the docks. Panels (`999`) and modals sit above them |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

A FAB in the page docks by itself. Call the API for a FAB that a script makes after the page loads.

| Method | Effect |
|---|---|
| `NDS.Fab.init()` | Docks every `nds-fab` that is not docked yet. `reinit()` is the same |
| `NDS.Fab.register(fab, edge)` | Docks one FAB now and returns its dock. `edge` is optional and replaces the FAB's `data-fab-pos` |
| `NDS.Fab.destroy(fab)` | Puts a FAB back where it was written, hidden again. Pass a container to do this for every FAB written inside it. Returns the count |
| `NDS.Fab.dock(edge)` | Returns the dock at `left`, `right` or `bottom`, and makes it if it is missing |
| `NDS.Fab.resolvePos(fab)` | Returns the edge the FAB docks on: `left`, `right` or `bottom` |
{: .nds-table .nds-responsive}

A FAB fires no events.

<script type="text/html" id="fab-js" data-canon data-lang="js">
// A FAB made after the page loads
var fab = document.createElement('button');
fab.type = 'button';
fab.className = 'nds-btn nds-fab nds-primary nds-circle nds-icon-only';
fab.setAttribute('aria-label', 'Add request');
fab.innerHTML = '<i class="hgi hgi-stroke hgi-plus-sign"></i>';
NDS.Fab.register(fab, 'end');

// Before an app removes a view, put its FABs back in it
NDS.Fab.destroy(view);
</script>

The full API is in the banner of `_js/nds-fab.js`.

</div>
  </div>
</section>

<section id="fabRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Accessibility](../components/accessibility): the button that opens the accessibility panel on every page is a FAB.
- [Panels](../components/panels): the panel a FAB opens, and the edges it slides from.

</div>
  </div>
</section>
