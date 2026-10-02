---
layout: page
title: Drawer
hero_title: Drawer - National Design System
hero_description: A vertical list of links and buttons, with submenus that open in place
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "02/10/2026 - 09:37 PM"
---

<section id="drawerOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A drawer is a vertical list of links and buttons. An item can hold a submenu: a nested list that opens in place under it. The same list also holds flat links, or notification rows with a title and a description.

Pick another component when:

- the list is the site's main navigation: [Main Navigation](../ui-shell/mainnav)
- the list is the site's main side menu, which collapses to a rail: [Side Menu](../ui-shell/sidemenu)
- the menu opens from one button, over the page: [Dropmenu](../components/dropmenu)
- each item opens a panel of content, not a list of links: [Accordion](../components/accordion)
- the surface slides in over the page: [Panels](../components/panels)

</div>
  </div>
</section>

<section id="drawerMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="drawer-nested" data-canon data-variants="drawerVariantsTable">
<nav class="nds-drawer" aria-label="Service menu">
  <ul class="nds-drawer-list">
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-home-01" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Dashboard</span>
      </a>
    </li>
    <li>
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-file-01" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Requests</span>
      </button>
      <ul>
        <li>
          <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
            <span class="nds-label">Licenses</span>
          </button>
          <ul>
            <li>
              <a href="#" class="nds-btn nds-subtle nds-indicator">
                <span class="nds-label">New license</span>
              </a>
            </li>
            <li data-state="active">
              <a href="#" class="nds-btn nds-subtle nds-indicator">
                <span class="nds-label">Renew a license</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-label">Appointments</span>
          </a>
        </li>
      </ul>
    </li>
    <li>
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-settings-01" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Settings</span>
      </button>
      <ul>
        <li>
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-label">Profile</span>
          </a>
        </li>
        <li>
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-label">Security</span>
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-help-circle" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Help</span>
      </a>
    </li>
  </ul>
</nav>
</script>
<script type="text/html" id="drawer-links" data-canon>
<nav class="nds-drawer" aria-label="Quick links">
  <ul class="nds-drawer-list">
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-link-02" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Services portal</span>
        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-link-02" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Laws and regulations</span>
        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-link-02" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Open data</span>
        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-link-02" aria-hidden="true"></i>
        </span>
        <span class="nds-label">Contact directory</span>
        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</nav>
</script>
<script type="text/html" id="drawer-rich" data-canon>
<nav class="nds-drawer" aria-label="Notifications">
  <ul class="nds-drawer-list">
    <li data-status="success">
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
        </span>
        <span class="nds-drawer-item">
          <span class="nds-drawer-item-head">
            <span class="nds-tag nds-sm" data-status="success">
              <span class="nds-label">Approved</span>
            </span>
            <span class="nds-label nds-truncate">License approved</span>
          </span>
          <span class="nds-description">The licensing authority reviewed and approved your business license application.</span>
        </span>
      </a>
    </li>
    <li data-status="warning">
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-alert-02" aria-hidden="true"></i>
        </span>
        <span class="nds-drawer-item">
          <span class="nds-drawer-item-head">
            <span class="nds-tag nds-sm" data-status="warning">
              <span class="nds-label">Due</span>
            </span>
            <span class="nds-label nds-truncate">Payment overdue</span>
          </span>
          <span class="nds-description">The annual registration fee of 1,200 SAR is past due. Pay it to keep the service active.</span>
        </span>
      </a>
    </li>
    <li data-status="info">
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-mail-01" aria-hidden="true"></i>
        </span>
        <span class="nds-drawer-item">
          <span class="nds-drawer-item-head">
            <span class="nds-tag nds-sm" data-status="info">
              <span class="nds-label">New</span>
            </span>
            <span class="nds-label nds-truncate">New message</span>
          </span>
          <span class="nds-description">The Ministry of Commerce sent a message about your trade license renewal.</span>
        </span>
      </a>
    </li>
  </ul>
</nav>
</script>
<script type="text/html" id="drawer-scroll" data-canon>
<nav class="nds-drawer" aria-label="Service centers" style="--drawer-max-height: 200px;">
  <div class="nds-scroll-more">
    <ul class="nds-drawer-list nds-scroll-more-content">
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Riyadh</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Jeddah</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Makkah</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Madinah</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Dammam</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Tabuk</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Abha</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label">Hail</span>
        </a>
      </li>
    </ul>
    <button type="button" class="nds-btn nds-subtle nds-md nds-show-more">
      <span class="nds-label">Show more</span>
      <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
    </button>
  </div>
</nav>
</script>
    </div>
  </div>
</section>

<section id="drawerVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The current page's `<li>` carries `data-state="active"`. To open a submenu at load, see `data-state="open"` under Data Attributes. Every option goes on `.nds-drawer`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Nested menu (default) | — | — | Items with submenus, for a side menu or a menu of service pages |
| Structure | Quick links | canon #drawer-links | — | A flat list of links, each with an arrow, for a side column or a card |
| Structure | Notifications | canon #drawer-rich | — | Rows with an icon, a tag, a title and a description line, for notifications or recent activity |
| Structure | Scrolling list | canon #drawer-scroll | — | A long list held to a set height, with a Show more button. Set the height with `--drawer-max-height` |
| Size | MD (default) | — | — | For most lists |
| Size | LG | `.nds-lg` | `.nds-drawer` | Taller items and a deeper submenu indent, for a menu that is the page's main content |
| Divided | Divided | `.nds-divided` | `.nds-drawer` | A line between the top-level items. Use it when rows have two lines, such as a description or a date |
| Lined | Lined (hint: A line along each submenu shows its depth) | `.nds-lined` | `.nds-drawer:has(.nds-menu-btn)` | A vertical line along each submenu, which shows the depth of a long tree |
| Card | Card | `.nds-card` | `.nds-drawer` | A card background and rounded corners, so the drawer sits in a grid of cards |
| Stroke | Stroke | `.nds-stroke` | `.nds-drawer.nds-card` | A border around the card |
| Always open | Always open (hint: Several submenus stay open at once) | `[data-state~="always-open"]` | `.nds-drawer:has(.nds-menu-btn)` | Several submenus stay open at once. Without it, opening a submenu closes the open one next to it |
{: #drawerVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="drawerBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Submenu Toggle
{: .nds-block-title}

An item opens its submenu when its toggle is a `<button>` or a link with `href="#"`. A link to a real page goes to that page on click, so a click does not open its submenu. That submenu opens only on the path to the active item, or when the markup opens it. Use a link when the parent item is also a page.

### One Open Branch
{: .nds-block-title}

By default, one submenu is open at each level. When a person opens a submenu, the open one next to it closes, so the tree stays short. The markup can open several submenus at load. They stay open until a person opens another submenu at the same level.

### Always Open
{: .nds-block-title}

`data-state="always-open"` on `.nds-drawer` lets each submenu open and close on its own, at every level. Submenus stay open until the person closes them. Pick it when people move between the branches of a tree and want to keep them in view.

### Scrolling List
{: .nds-block-title}

A [Scroll More](../components/scroll-more) wrapper around the list holds the drawer to `--drawer-max-height`. While the list overflows, its end fades and the Show more button shows. The button scrolls the list. At the end, it turns to scroll back up.

</div>
  </div>
</section>

<section id="drawerFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every drawer on the page starts by itself. The script finds each item with a submenu and gives its toggle an arrow.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Accordion Submenus</span>
          </span>
          <p class="nds-item-desc">Submenus slide open and closed. They nest to any depth, and each level works the same way.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-move-02"></i>
            <span class="nds-label">Active Path</span>
          </span>
          <p class="nds-item-desc">The item marked <code class="nds-inline-code lang-html">data-state="active"</code> shows the line beside it, and every submenu above it opens. This happens before the page shows, so people land with the current page in view.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-inbox"></i>
            <span class="nds-label">Empty State</span>
          </span>
          <p class="nds-item-desc">A list that can run out of items takes <code class="nds-inline-code lang-html">nds-empty</code>. The <a href="../components/empty">Empty</a> component shows a placeholder while the list holds no items, and removes it when one arrives.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-access"></i>
            <span class="nds-label">Screen Readers</span>
          </span>
          <p class="nds-item-desc">The script keeps <code class="nds-inline-code lang-html">aria-expanded</code> on each toggle in step with its submenu.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">JavaScript API</span>
          </span>
          <p class="nds-item-desc">Open or close a submenu from code, start and stop a drawer, and listen for an event when a submenu has opened or closed.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="drawerPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Give the `<nav>` an `aria-label` that names the menu. A page often has more than one `nav`, and the label tells them apart.
- Put `data-state="active"` only on the current page's `<li>`, never on the items above it.
- Use a `<button type="button">` for an item that only opens a submenu.
- Keep trees to two or three levels. A deeper tree is hard to scan, and often means the section should be split into pages.
- Keep labels short. A label wraps to a new line when it is too long.
- In a Notifications row, put `data-status` on the `<li>` and on the tag. The status on the `<li>` colors the icon. The tag does not take it from the `<li>`.
- Use Divided when rows have two lines. Leave it off a list of short links, where the lines only add noise.
- After you add a drawer to the page, call `NDS.Drawer.reinit()`. After you change the items of a drawer that started, call `NDS.Drawer.destroy(drawer)`, then `NDS.Drawer.create(drawer)`.

</div>
  </div>
</section>

<section id="drawerApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-fit` | `.nds-drawer` inside `.nds-grid` | The drawer fills the height of its grid row, and the items share the height. Use it with `nds-card` to match the cards next to it. It has no effect outside `.nds-grid` |
| `nds-oncolor` | `.nds-drawer` | Lighter divider lines, for a drawer on a colored surface. Put `nds-oncolor` on each button too, so the text reads on the surface |
| `nds-divided` | a submenu `<ul>` | A line between the items of that submenu |
| `nds-empty` | `.nds-drawer-list` | Shows a placeholder while the list holds no items. Set the text and the icon with `data-empty-message` and `data-empty-icon`. See [Empty](../components/empty) |
| `nds-truncate` | `.nds-label` | Cuts the label to the number of lines in `--drawer-truncate`, with an ellipsis |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state="active"` | `<li>` | Marks the current page. Its line shows, and every submenu above it opens at load |
| `data-state="open"` | `<li>` and its submenu `<ul>` | Opens the submenu at load, before the script runs. Set it on both, with `aria-expanded="true"` on the toggle button. The script keeps it in step: `opening` and `closing` during the slide, `open` while the submenu is open |
| `data-status` | `<li>` | `success`, `info`, `warning`, `error` or `neutral`. Colors the featured icon in the row |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set them on `.nds-drawer`, in its `style` attribute.

| Property | Default | Controls |
|---|---|---|
| `--drawer-gap` | `0px` | Space between the items |
| `--drawer-indent` | `var(--spacing-xl)`, `var(--spacing-2xl)` with `nds-lg` | Indent of each submenu |
| `--drawer-divider` | `var(--divider-color)` | Color of the `nds-divided` and `nds-lined` lines |
| `--drawer-indicator` | `transparent` | Color of the line on submenu items that are not active or hovered |
| `--drawer-indicator-width` | `5px` | Width of the line beside each item |
| `--drawer-lined-width` | `1px` | Width of the `nds-lined` line |
| `--drawer-lined-block` | `0px` | Space cut from the top and the bottom of the `nds-lined` line |
| `--drawer-truncate` | `1` | Number of lines a `nds-truncate` label shows |
| `--drawer-transition` | `var(--nds-transition)` | Timing of the submenu slide |
| `--drawer-max-height` | `400px` | Height limit of a Scrolling list |
| `--drawer-btn-height` | `fit-content`, `100%` with `nds-fit` | Height of each item |
| `--drawer-btn-gap` | `var(--spacing-md)` | Space between the icon, the label and the end of each item |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Drawer.init()` | Starts every drawer on the page that has not started yet. `reinit()` is the same |
| `NDS.Drawer.create(drawer)` | Starts one drawer. It does nothing on a drawer that has started |
| `NDS.Drawer.toggle(button)` | Opens or closes the submenu of this toggle button. Pass the button, not the `<li>` |
| `NDS.Drawer.destroy(drawer)` | Removes the listeners. The markup and the open submenus stay as they are |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:drawer:shown` | `.nds-drawer`, after a submenu opens, and it bubbles | `item` (the `<li>`), `drawer` |
| `nds:drawer:hidden` | `.nds-drawer`, after a submenu closes, and it bubbles | `item` (the `<li>`), `drawer` |
{: .nds-table .nds-responsive}

The events fire when a person or `toggle()` opens or closes a submenu. They do not fire for the submenus that open at load.

<script type="text/html" id="drawer-api-js" data-canon data-lang="js">
var drawer = document.querySelector('.nds-drawer');
drawer.addEventListener('nds:drawer:shown', function (e) {
  console.log('Opened', e.detail.item);
});
NDS.Drawer.toggle(drawer.querySelector('.nds-menu-btn'));
</script>

The full API is in the banner of `_js/nds-drawer.js`.

</div>
  </div>
</section>

<section id="drawerRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Table of Contents](../components/toc): holds a lined drawer that the script fills from the page's headings.
- [Side Menu](../ui-shell/sidemenu): the site's side menu is a divided, lined drawer.
- [Main Navigation](../ui-shell/mainnav): the notifications menu uses Notifications rows in a Scrolling list.
- [Content template](../templates/content-template): uses a lined drawer as the page's table of contents.

</div>
  </div>
</section>
