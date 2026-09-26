---
layout: page
title: Dropmenu
hero_title: Dropmenu - National Design System
hero_description: A dropmenu is a button that opens a small menu of actions, links, settings or values beside it.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 09:40 PM"
---

<section id="dropmenuOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A dropmenu is a `nds-dropmenu` wrapper that holds a trigger button (`nds-dropmenu-trigger`) and a menu (`nds-dropmenu-menu`). The menu holds a scroll area (`nds-dropmenu-scroll`) of items (`nds-dropmenu-item`), and an optional footer. Many NDS components open their menus through it: Custom Select, Autocomplete, Multiselect, Pagination, Filter and the date and time pickers.

Pick another component when:

- the choice is a field in a form: [Custom Select](../components/forms#customSelect)
- the menu holds the site's main links: [Main Navigation](../ui-shell/mainnav)
- the content needs more room, or steps: [Modal](../components/modal) or [Drawer](../components/drawer)
- the element shows a short hint on hover: [Tooltip](../components/tooltip)
- the control turns one setting on or off: [Switch](../components/switch)

</div>
  </div>
</section>

<section id="dropmenuMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="dm-actions" data-canon data-variants="dmVariantsTable" data-harness="form">
<div class="nds-dropmenu">
  <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
    <span class="nds-label">Actions</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-edit-02" aria-hidden="true"></i>
        <span class="nds-label">Edit</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-copy-01" aria-hidden="true"></i>
        <span class="nds-label">Duplicate</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-share-01" aria-hidden="true"></i>
        <span class="nds-label">Share</span>
      </button>
      <hr class="nds-divider">
      <button type="button" class="nds-btn nds-subtle nds-destructive nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"></i>
        <span class="nds-label">Delete</span>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="dm-links" data-canon>
<div class="nds-dropmenu">
  <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
    <span class="nds-label">Account</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-user-account" aria-hidden="true"></i>
        <span class="nds-label">Profile</span>
      </a>
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-settings-01" aria-hidden="true"></i>
        <span class="nds-label">Settings</span>
      </a>
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-help-circle" aria-hidden="true"></i>
        <span class="nds-label">Help</span>
      </a>
      <hr class="nds-divider">
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-logout-01" aria-hidden="true"></i>
        <span class="nds-label">Sign out</span>
      </a>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="dm-row" data-canon>
<div class="nds-dropmenu">
  <button type="button" class="nds-btn nds-subtle nds-ellipsis nds-icon-only nds-dropmenu-trigger">
    <span class="nds-label">Actions for request 20481</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>
        <span class="nds-label">View</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-download-01" aria-hidden="true"></i>
        <span class="nds-label">Download</span>
      </button>
      <hr class="nds-divider">
      <button type="button" class="nds-btn nds-subtle nds-destructive nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-cancel-circle" aria-hidden="true"></i>
        <span class="nds-label">Cancel request</span>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="dm-settings" data-canon>
<div class="nds-dropmenu" style="--dropmenu-min-width: 240px;">
  <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
    <span class="nds-label">Notifications</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <fieldset class="nds-dropmenu-group nds-form-group nds-switch-group">
        <legend class="nds-label">Send me</legend>
        <div class="nds-form-container nds-switch-container">
          <div class="nds-form-header">
            <label for="dm-email">
              <span class="nds-label">Email</span>
            </label>
          </div>
          <div class="nds-form-control">
            <div class="nds-switch">
              <input type="checkbox" id="dm-email" name="channels" value="email" class="nds-switch-input" checked>
              <div class="nds-switch-track">
                <div class="nds-switch-thumb"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="nds-form-container nds-switch-container">
          <div class="nds-form-header">
            <label for="dm-sms">
              <span class="nds-label">Text message</span>
            </label>
          </div>
          <div class="nds-form-control">
            <div class="nds-switch">
              <input type="checkbox" id="dm-sms" name="channels" value="sms" class="nds-switch-input">
              <div class="nds-switch-track">
                <div class="nds-switch-thumb"></div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="nds-dropmenu-footer">
      <hr class="nds-divider">
      <div class="nds-dropmenu-action">
        <button type="button" class="nds-btn nds-secondary nds-dropmenu-item" data-no-auto-close>
          <span class="nds-label">Reset</span>
        </button>
        <button type="button" class="nds-btn nds-primary nds-dropmenu-item" data-dropmenu-primary>
          <span class="nds-label">Save</span>
        </button>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="dm-picker" data-canon>
<div class="nds-dropmenu" data-select-name="country">
  <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
    <span class="nds-label">Choose a country</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="SA" data-search-value="السعودية KSA">
        <span class="nds-label">Saudi Arabia</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="AE" data-search-value="الإمارات UAE">
        <span class="nds-label">United Arab Emirates</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="KW" data-search-value="الكويت">
        <span class="nds-label">Kuwait</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="QA" data-search-value="قطر">
        <span class="nds-label">Qatar</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="BH" data-search-value="البحرين">
        <span class="nds-label">Bahrain</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="OM" data-search-value="عمان">
        <span class="nds-label">Oman</span>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="dm-lazy" data-canon>
<div class="nds-dropmenu">
  <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
    <span class="nds-label">Export</span>
  </button>
  <template>
    <div class="nds-dropmenu-menu" hidden>
      <div class="nds-dropmenu-scroll">
        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
          <span class="nds-label">PDF</span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
          <span class="nds-label">Excel</span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-dropmenu-item">
          <span class="nds-label">CSV</span>
        </button>
      </div>
    </div>
  </template>
</div>
</script>
    </div>
  </div>
</section>

<section id="dropmenuVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on the `nds-dropmenu` wrapper, except Center items, which goes on the menu. Search and Required work only with a picker (`data-select-name`).

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Actions (default) | — | — | Actions on the current page |
| Structure | Links | canon `#dm-links` | — | Links to other pages |
| Structure | Row menu | canon `#dm-row` | — | The actions of one table row or card, behind a three-dot button. The hidden label names the row |
| Structure | Settings | canon `#dm-settings` | — | Switches or checkboxes in a group, with a footer of buttons. Copy a checkbox group from [Checkbox](../components/checkbox) and a switch group from [Switch](../components/switch), and add `nds-dropmenu-group` to the `fieldset`. A click on a control never closes the menu |
| Structure | Picker | canon `#dm-picker` | — | A button that picks one value, in a small slot: an input prefix or a per-page count. The value submits with the form. For a form field, use [Custom Select](../components/forms#customSelect) |
| Structure | Lazy menu | canon `#dm-lazy` | — | The menu sits in a `<template>` and is built on the first click, so a long menu adds no markup at page load. Only for a menu that no other component reads: not Filter, Share or Multiselect. Search engines and the browser's find do not see the items until then |
| Anchor | Center (default) | — | — | The menu centers under the trigger |
| Anchor | Start | `[data-anchor="start"]` | `.nds-dropmenu` | The menu lines up with the trigger's start edge. For a wide trigger |
| Anchor | End | `[data-anchor="end"]` | `.nds-dropmenu` | The menu lines up with the trigger's end edge |
| Anchor | Cursor | `[data-anchor-cursor]` | `.nds-dropmenu` | The menu opens under the pointer, like a context menu. A keyboard or script open centers it |
| Portal | Auto (default) | — | — | The menu moves to `<body>` only when an ancestor would clip it |
| Portal | Always | `[data-portal]` | `.nds-dropmenu` | The menu always moves to `<body>` when it opens |
| Portal | Never | `[data-no-portal]` | `.nds-dropmenu` | The menu stays in the wrapper, even where an ancestor clips it. It wins over `data-portal`. Only for CSS or a script that needs the menu inside the wrapper |
| Search | Search | `[data-search]` | `.nds-dropmenu[data-select-name]` | A search box at the top of the menu. For a long list |
| Required | Required | `[data-required]` | `.nds-dropmenu[data-select-name]` | The form does not submit until a value is picked |
| Center items | Center items (hint: For short labels) | `.nds-center` | `.nds-dropmenu-menu` | Centers each item's label. For short values, such as numbers |
| Delay | Delayed open | `[data-delay="800"]` | `.nds-dropmenu` | The first open waits 800 ms, with a spinner on the trigger, while your script fills the menu |
{: #dmVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="dropmenuBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Picker
{: .nds-block-title}

A picker is a dropmenu that chooses one value, like a small select. Add `data-select-name` to the wrapper and `data-value` to each item. The script keeps the picked value in a hidden input, so it submits with the form. The trigger shows the picked item's label, and the wrapper fires `nds:dropmenu:selected`. Use it in a small slot, such as a country code before a phone number or a page-size count beside a table.

### Search
{: .nds-block-title}

`data-search` adds a search box above the items, and it gets focus when the menu opens. The list filters as the user types, and a message shows when nothing matches. The search ignores case and accents, so "cafe" finds "café" and «مطار» finds «المَطار». `data-search-value` adds words an item is also found by, such as its name in another language. Add it to a long list, such as countries. `data-search="20"` adds the box only when the menu has 20 items or more.

### Settings Menu
{: .nds-block-title}

A settings menu holds switches or checkboxes, so the user changes several things before the menu closes. A click on a control never closes the menu. The footer buttons are items: a click on Save closes the menu, and Reset keeps it open with `data-no-auto-close`. Enter on a switch or a checkbox clicks the item with `data-dropmenu-primary`, here Save.

### Anchor
{: .nds-block-title}

The menu centers under its trigger by default. On a wide trigger, such as a full-width button, line the menu up with the start or the end edge instead. `data-anchor-cursor` opens the menu where the user clicked, like a context menu.

### Portal
{: .nds-block-title}

A modal, a scrolling table or a drawer can cut off a menu that opens inside it. The dropmenu checks this each time it opens, with no attribute. When the menu would be cut off, the script moves it to `<body>` and keeps it beside the trigger, above the trigger's layer. Any other menu stays in its wrapper and scrolls with the page. `data-portal` moves the menu every time, and `data-no-portal` never moves it.

### Delayed Open
{: .nds-block-title}

`data-delay` gives your script time to fill a menu the first time it opens, for items that come from a server or cost time to build. On the first click, the trigger shows a spinner for the given milliseconds. Then the dropmenu fires `nds:dropmenu:prepare`, and your script adds the items in that event. Later opens are immediate.

### Lazy Menu
{: .nds-block-title}

A lazy menu keeps its items in a `<template>`, so they are not in the page until the first click builds them. Use it where a page has many menus, such as one in every row of a long table. Other components cannot read a lazy menu, and search engines do not see its items.

</div>
  </div>
</section>

<section id="dropmenuFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-menu-11"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-dropmenu</code> on the page starts by itself. Call <code class="nds-inline-code lang-js">NDS.Dropmenu.reinit()</code> after you add new ones.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-location-star-01"></i>
            <span class="nds-label">Smart Positioning</span>
          </span>
          <p class="nds-item-desc">The menu opens below the trigger, and above it when there is more room there. A menu that fits on neither side shrinks its scroll area, so a search box or a footer stays in view. It never runs past the side of the screen.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The arrow keys open the menu and move between items, and Escape closes it. The API lists every key.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-user"></i>
            <span class="nds-label">Accessibility</span>
          </span>
          <p class="nds-item-desc">The script sets the menu roles and <code class="nds-inline-code lang-html">aria-expanded</code> on the trigger. Focus returns to the trigger when the menu closes. The open animation stops when the user asks for reduced motion.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code-circle"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Open, close and remove a dropmenu from a script, and listen to its events. A component built on it can turn off the trigger click or the keys, and drive the menu itself.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="dropmenuPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a dropmenu for actions or links that do not need to show all the time, such as the actions of one row.
- Keep a menu to 3 to 8 items. Split a longer list into groups, or add a search box.
- Give every button item `type="button"`. In a form, a button without it submits the form.
- Use `<button>` for an action and `<a>` for a link to another page.
- Put a destructive action last, after a divider, and give it `nds-destructive`.
- Give an icon-only trigger a label that names what it acts on, such as "Actions for request 20481". The label is hidden on screen.
- Add `data-no-auto-close` to an item that must keep the menu open, such as a Reset button.
- Do not fix a clipped menu with `overflow` or `z-index`. The menu moves to `<body>` by itself.
- Call `NDS.Dropmenu.destroy()` before you remove a dropmenu from the page, such as a table row you replace.

</div>
  </div>
</section>

<section id="dropmenuApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-menu-btn` | `.nds-dropmenu-trigger` | A chevron after the label. It turns while the menu is open |
| `nds-dropmenu-group` | a `fieldset` or `div` in the menu | Groups related controls, with a bold legend and the same spacing as items |
| `nds-dropmenu-footer` | `div` in `.nds-dropmenu-menu`, after `.nds-dropmenu-scroll` | Holds the footer buttons. It sits outside the scroll area, so it stays in view |
| `nds-dropmenu-action` | `div` in `.nds-dropmenu-footer` | Puts its buttons side by side, each the same width |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-select-name` | `.nds-dropmenu` | Makes the dropmenu a picker. A hidden input with this name holds the picked value, and fires `change` when it changes |
| `data-value` | `.nds-dropmenu-item` | The value the item picks. An item without it picks nothing |
| `data-select-value` | `.nds-dropmenu` | The value picked at load. It wins over an item with `data-state="selected"` |
| `data-trigger-label` | `.nds-dropmenu-item` | A short label for the trigger when the item is picked, such as "+966" for "Saudi Arabia (+966)". The default is the item's `.nds-label` |
| `data-required` | `.nds-dropmenu[data-select-name]` | The form does not submit until a value is picked. The error shows on the field that holds the picker |
| `data-search` | `.nds-dropmenu` | Adds a search box. `data-search="20"` adds it only when the menu has 20 items or more |
| `data-search-empty` | `.nds-dropmenu` | The text shown when nothing matches. The default is "No results" |
| `data-search-value` | `.nds-dropmenu-item` | More words the item is found by |
| `data-search-item` | an item or a row in the menu | `data-search-item` makes a row that is not a `.nds-dropmenu-item` searchable. `data-search-item="false"` keeps an item always in view |
| `data-no-auto-close` | `.nds-dropmenu-item` | A click on the item keeps the menu open |
| `data-dropmenu-primary` | `.nds-dropmenu-item` | Enter on a control that is not a button or a link clicks the first item with this attribute |
| `data-anchor`, `data-anchor-cursor` | `.nds-dropmenu` | Where the menu lines up with the trigger. See Anchor in the builder |
| `data-portal`, `data-no-portal` | `.nds-dropmenu` | Whether the menu moves to `<body>`. See Portal in the builder |
| `data-delay` | `.nds-dropmenu` | The first open waits this many milliseconds and fires `nds:dropmenu:prepare`. The attribute is removed after it, so later opens are immediate |
| `data-dropmenu-no-click` | `.nds-dropmenu` | The trigger does not open the menu. A script opens it |
| `data-dropmenu-no-keys` | `.nds-dropmenu` | Turns off the arrow, Home, End and Tab keys, for a component with its own keyboard. Escape still closes the menu |
| `data-state` | `.nds-dropmenu`, trigger, menu, `.nds-dropmenu-item` | The script writes `open` on the wrapper, the trigger and the menu, and `selected` on the picked item. An item with `active` gets focus first when the menu opens from the keyboard |
{: .nds-table .nds-responsive}

### Keyboard
{: .nds-block-title}

| Key | Where | Effect |
|---|---|---|
| Enter, Space | trigger | Opens or closes the menu, and focuses the first item |
| Arrow Down, Arrow Up | trigger | Opens the menu and focuses the first or the last item. An item with `data-state="active"` gets focus first |
| Arrow Down, Arrow Up | menu | Moves to the next or the previous item |
| Home, End | menu | Moves to the first or the last item |
| Tab, Shift + Tab | menu | Moves through the items. Past the last or the first, the menu closes |
| Escape | trigger, menu | Closes the menu and returns focus to the trigger. In a search box, the first press clears it |
| Alt + Arrow, Ctrl + Home, Ctrl + End | a text field in the menu | Moves between items, since the plain keys stay with the field |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the `.nds-dropmenu` wrapper. They stay with the menu when it moves to `<body>`.

| Property | Default | Controls |
|---|---|---|
| `--dropmenu-width` | `min-content` | Width of the menu |
| `--dropmenu-min-width` | `max-content` | Least width of the menu. The default keeps each item on one line. `100%` makes the menu as wide as the wrapper |
| `--dropmenu-max-width` | `calc(100vw - 16px)` | Most width of the menu |
| `--menu-padding` | `var(--spacing-md)` | Space inside the menu |
| `--dropmenu-slide` | `8px` | How far the menu slides as it opens. It slides the other way when the menu opens above the trigger |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Dropmenu.init()` | Starts every `.nds-dropmenu` on the page that has not started yet. `reinit()` is the same |
| `NDS.Dropmenu.create(wrapper)` | Starts one wrapper and returns its instance |
| `NDS.Dropmenu.destroy(wrapper)` | Removes its listeners. Call it before you remove the wrapper from the page: otherwise its listener on the document keeps the removed wrapper in memory |
| `NDS.Dropmenu.from(el)` | Returns the wrapper of any element in the dropmenu, also when the menu is in `<body>` |
| `NDS.Dropmenu.menuOf(wrapper)` | Returns the menu of a wrapper, also when the menu is in `<body>` |
| `wrapper.ndsDropmenu.open()`, `.close()`, `.toggle()` | Opens or closes the menu |
| `wrapper.ndsDropmenu.destroy()` | The same as `NDS.Dropmenu.destroy(wrapper)` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:dropmenu:opened` | `.nds-dropmenu` | `{ dropmenu, trigger, menu, isOpen }`, after the menu is placed |
| `nds:dropmenu:closed` | `.nds-dropmenu` | `{ dropmenu, trigger, menu, isOpen }` |
| `nds:dropmenu:selected` | `.nds-dropmenu` | `{ dropmenu, item, value }`, when a picker picks a value |
| `nds:dropmenu:prepare` | `.nds-dropmenu` | `{ dropmenu, trigger, menu, isOpen }`, before a delayed first open. Fill the menu here |
{: .nds-table .nds-responsive}

<script type="text/html" id="dm-js" data-canon data-lang="js">
var picker = document.querySelector('[data-select-name="country"]');
picker.addEventListener('nds:dropmenu:selected', function (e) {
  console.log('Country:', e.detail.value);
});
</script>

The full API is in the banner of `_js/nds-dropmenu.js`.

</div>
  </div>
</section>

<section id="dropmenuRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Pagination](../components/pagination): a picker with `data-per-page-target` sets the number of items per page.
- [Forms](../components/forms): a picker in an input prefix, for a phone country code.
- [Contact Us Template](../templates/contact-us-template): the phone field with a country-code picker.
- [Manage Records](../examples/manage-records): a per-page picker beside a table.
- [Search Template](../templates/search-template): the filter menu is a dropmenu with groups and a footer.

</div>
  </div>
</section>
