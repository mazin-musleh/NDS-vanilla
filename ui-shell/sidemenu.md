---
layout: page
title: Side Menu
hero_title: Side Menu - National Design System
hero_description: The menu beside the content that links the pages of one part of the site, in groups that open and close.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "07/10/2026 - 03:20 PM"
---

<section id="sidemenuOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The side menu is a column of links on the start side of the content. It holds the pages of one part of the site, such as a documentation set or an admin console. A link can open a group of links, and a group can hold groups of its own. The list is a [Drawer](../components/drawer), and the side menu adds the column and a button that opens the menu on small screens.

The side menu is a page shell part. The preview shows it in a frame of its own, so it does not clash with this page's own side menu.

Pick another component when:

- the steps of one task must go in order: [Stepper](../components/stepper)
- the views are parts of the same page: [Tabs](../components/tabs)
- the links go to the headings of one long page: [Table of Contents](../components/toc)
- the list is not the site's menu: [Drawer](../components/drawer)

The main links of the site belong in the [Main Navigation](../ui-shell/mainnav), and the links at the end of the page in the [Footer](../ui-shell/footer).

</div>
  </div>
</section>

<section id="sidemenuMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="sidemenu-canon" data-canon data-preview="page" data-preview-height="520" data-variants="sidemenuVariantsTable">
<div class="nds-content-layout nds-has-sidemenu">
  <aside class="nds-sidemenu" aria-label="Sidebar">
    <button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" hidden>
      <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
      <span class="nds-label nds-truncate">Side menu</span>
    </button>
    <nav class="nds-drawer nds-divided">
      <div class="nds-scroll-more nds-divided">
        <ul class="nds-drawer-list nds-scroll-more-content">
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-label">Overview</span>
            </a>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
              <span class="nds-label">Passports</span>
              <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">3</span></span>
            </button>
            <ul>
              <li data-state="active">
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Renew a Passport</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Issue a Passport</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Report a Lost Passport</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
              <span class="nds-label">Visas</span>
              <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">2</span></span>
            </button>
            <ul>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Visit Visa</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Work Visa</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-label">Contact Us</span>
            </a>
          </li>
        </ul>
        <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more">
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </aside>
  <div class="nds-content" id="main-content">
    <section class="nds-content-section">
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h2 class="nds-section-title">Renew a Passport</h2>
          <p class="nds-section-description">Renew your passport online, with no visit to an office.</p>
        </div>
      </div>
    </section>
  </div>
</div>
</script>
<script type="text/html" id="sidemenu-grouped" data-canon>
<div class="nds-content-layout nds-has-sidemenu">
  <aside class="nds-sidemenu" aria-label="Sidebar">
    <button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" hidden>
      <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
      <span class="nds-label nds-truncate">Side menu</span>
    </button>
    <nav class="nds-drawer nds-divided">
      <div class="nds-scroll-more nds-divided">
        <ul class="nds-drawer-list nds-scroll-more-content">
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-label">Overview</span>
            </a>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
              <span class="nds-label">Services</span>
              <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">5</span></span>
            </button>
            <ul>
              <li>
                <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
                  <span class="nds-label">Passports</span>
                  <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">3</span></span>
                </button>
                <ul>
                  <li data-state="active">
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">Renew a Passport</span>
                    </a>
                  </li>
                  <li>
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">Issue a Passport</span>
                    </a>
                  </li>
                  <li>
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">Report a Lost Passport</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
                  <span class="nds-label">Visas</span>
                  <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">2</span></span>
                </button>
                <ul>
                  <li>
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">Visit Visa</span>
                    </a>
                  </li>
                  <li>
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">Work Visa</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-label">Contact Us</span>
            </a>
          </li>
        </ul>
        <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more">
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </aside>
  <div class="nds-content" id="main-content">
    <section class="nds-content-section">
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h2 class="nds-section-title">Renew a Passport</h2>
          <p class="nds-section-description">Renew your passport online, with no visit to an office.</p>
        </div>
      </div>
    </section>
  </div>
</div>
</script>
<script type="text/html" id="sidemenu-more" data-canon>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Family Visit</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Hajj and Umrah</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Residence Permits</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Exit and Re-entry</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Final Exit</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Transfer of Services</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Travel Documents</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Newborn Registration</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Change of Profession</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Appointments</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Fees and Payments</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Office Locations</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Sponsorship Transfer</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Visa Extension</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Absher Accounts</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Digital ID</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Vehicle Registration</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Driving Licenses</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Traffic Violations</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Civil Records</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Marriage Registration</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Death Registration</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Complaints</span>
  </a>
</li>
<li>
  <a class="nds-btn nds-subtle nds-indicator" href="#">
    <span class="nds-label">Frequently Asked Questions</span>
  </a>
</li>
</script>
    </div>
  </div>
</section>

<section id="sidemenuParts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `.nds-content-layout.nds-has-sidemenu` | The side menu, then `.nds-content`. Without `nds-has-sidemenu`, the layout hides the side menu. See [Page Layout](../layout/page-layout) | Yes |
| `aside.nds-sidemenu` | The menu button and the drawer. Give it an `aria-label`. One per page | Yes |
| `button.nds-sidemenu-toggle` | The button that opens the menu below 960px: an icon and a `.nds-label`. Write it with `hidden` and an `aria-label` | Yes |
| `nav.nds-drawer` | The list: a `.nds-scroll-more` with the `ul.nds-drawer-list` and the show more button. See [Drawer](../components/drawer) | Yes |
| `li` with an `a.nds-btn` | One link | Yes |
| `li` with a `button.nds-btn` and a `ul` | A group: the button opens the `ul` under it. A group can hold groups | No |
| `span.nds-tag` | The number of links in a group, counting the links in its own groups. It sits in the group's button | No |
| `.nds-content` | The page sections, right after the side menu, with `id="main-content"` for the skip link | Yes |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sidemenuVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Small screens options change the menu below 960px only.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Two levels (default) | — | — | Links and groups of links. Fits most sites |
| Structure | Three levels | canon `#sidemenu-grouped` | — | Groups inside a group. Use it only when one group holds many pages |
| Small screens | Slide-in (default) (hint: Below 960px, the menu slides in from the side) | — | — | Below 960px, the menu slides in from the side over the page. Fits a long list |
| Small screens | Top bar (hint: Below 960px, a bar above the content opens the menu) | `.nds-top` | `.nds-sidemenu` | Below 960px, a bar above the content shows the current page, and the menu drops down from it. Fits a short list |
| Peek button | Peek (default) (hint: The button hides at the screen edge until the mouse comes near) | `.nds-peek` | `.nds-sidemenu-toggle:not(.nds-top .nds-sidemenu-toggle)` | In slide-in mode, the button stays mostly hidden at the screen edge. Not in top bar mode |
| Peek button | Full button (hint: The button stays in full view) | — | `.nds-sidemenu-toggle:not(.nds-top .nds-sidemenu-toggle)` | The button stays in full view at the screen edge |
| Lined | Lined (hint: A line beside each open group) | `.nds-lined` | `.nds-drawer` | A line beside each open group, so the levels are easy to see |
| Many links | Many links (hint: The list does not fit, so the show more arrow appears) | canon `#sidemenu-more` | `.nds-drawer-list` | 24 more links. Shows how the list scrolls when it is taller than the screen |
{: #sidemenuVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sidemenuBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Slide-in Mode
{: .nds-block-title}

Below 960px, the side menu moves off screen, and the menu button shows at the screen edge. A press on the button slides the menu in over the page.

### Top Bar Mode
{: .nds-block-title}

`nds-top` on the `aside` shows a bar above the content below 960px. The bar shows the name of the current page, or of the first link when no page is current. A press scrolls the bar to the top of the screen and drops the menu down from it, over the content.

### Peek Button
{: .nds-block-title}

In slide-in mode, `nds-peek` on the menu button keeps it mostly hidden at the screen edge, so it does not cover the content. It shows for a moment when the page loads, and comes out when the mouse moves near it. Without `nds-peek`, the button always shows in full.

</div>
  </div>
</section>

<section id="sidemenuFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto Start</span>
          </span>
          <p class="nds-item-desc">The script starts when <code class="nds-inline-code lang-html">.nds-sidemenu</code> is on the page. It shows the menu button and writes the current page's name in its label.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-target-01"></i>
            <span class="nds-label">Current Page</span>
          </span>
          <p class="nds-item-desc">The groups above the current page's link open when the page loads, so the link is in view.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-unfold-less"></i>
            <span class="nds-label">One Open Group</span>
          </span>
          <p class="nds-item-desc">A group that opens closes the other open group at the same level, so the list stays short.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-pin"></i>
            <span class="nds-label">Sticky Menu</span>
          </span>
          <p class="nds-item-desc">The menu stays in view below the main navigation while the page scrolls: the column on a desktop, and the bar in top bar mode.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mouse-scroll-01"></i>
            <span class="nds-label">Overflow Detection</span>
          </span>
          <p class="nds-item-desc">A list taller than the screen scrolls in place, and the show more arrow appears at its bottom.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Backdrop Overlay</span>
          </span>
          <p class="nds-item-desc">Below 960px, the open menu dims the page behind it, and the page does not scroll.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cancel-circle"></i>
            <span class="nds-label">Close Triggers</span>
          </span>
          <p class="nds-item-desc">A second press on the menu button, Escape, a click outside the menu, or a change of the screen width closes it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="sidemenuPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put one side menu on a page. The script uses the first one it finds.
- Mark the current page's `li` with `data-state="active"`. It highlights the link, opens its groups, and names the top bar.
- Name each group by what its pages share. Do not mix pages of other topics in one group.
- Use two levels for most sites. A third level hides pages two clicks deep.
- Pick Top bar for a short list, and Slide-in for a long one that people scroll.
- Do not write color classes on the menu button. Each mode styles it.
- On a page with no side menu, remove the `aside` and `nds-has-sidemenu` together.

</div>
  </div>
</section>

<section id="sidemenuApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state` | `aside.nds-sidemenu` in slide-in mode | The script sets `open` when the menu opens, adds `closing` when it closes, and removes both after the close |
| `hidden` | `button.nds-sidemenu-toggle` | Write it in the markup. The script removes it when it starts |
| `aria-expanded` | `button.nds-sidemenu-toggle` | The script writes `false` when it starts and the attribute is missing. It sets `true` when the menu opens, and `false` after the close |
| `data-state="open"` | `button.nds-sidemenu-toggle` | The script sets it when the menu opens, and removes it after the close |
| `hidden` | The menu button's `.nds-label` | The script sets it in slide-in mode, and removes it in top bar mode. Leave the label's text to the script: it writes the current page's name in it |
| `data-state` | `nav.nds-drawer` in top bar mode | The script sets `open` when the menu opens, adds `closing` when it closes, and removes both after the close |
| `data-state="active"` | The current page's `li` | Set it yourself. The drawer opens every group above it when it starts |
| `aria-expanded` | A group's `button` | Write `false` in the markup. The drawer sets `true` when the group opens, and `false` when it closes. See [Drawer](../components/drawer) |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--nds-sidemenu-width` | `260px` | The width of the side menu and of its layout column. Set it on `:root` |
| `--nds-sidemenu-toggle-height` | `56px` | The height of the top bar. Set it on `:root` |
| `--toggle-pos` | `40svh` | How far below the main navigation the slide-in menu button sits. Set it on `button.nds-sidemenu-toggle` |
| `--drawer-max-height` | The screen height less the main navigation, or `60svh` in top bar mode | The height of the list before it scrolls. Set it on `aside.nds-sidemenu`. The open slide-in menu fits the list to the screen and ignores it |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Sidemenu.init()` | Starts the side menu. It runs on page load. A second call stops the running side menu and starts it again. It does not start the drawer: for new markup, call `NDS.Init.refresh()` instead, which starts both. See [Refresh](../core/refresh) |
| `NDS.Sidemenu.destroy()` | Closes the menu and removes every listener. The markup stays, and `init()` starts it again |
{: .nds-table .nds-responsive}

The side menu fires no events. The drawer fires `nds:drawer:shown` after a group opens, and `nds:drawer:hidden` after it closes: see [Drawer](../components/drawer).

<script type="text/html" id="sidemenu-js" data-canon data-lang="js" data-preview="none">
// A framework rendered a new side menu after the NDS script ran:
// start the side menu and its drawer
NDS.Init.refresh(document.querySelector('.nds-content-layout'));

// Know which group opened
document.querySelector('.nds-sidemenu').addEventListener('nds:drawer:shown', (e) => {
  console.log(e.detail.item);
});

// A framework removes the side menu: release it first
NDS.Sidemenu.destroy();
</script>

The full API is in the banner of `_js/nds-sidemenu.js`.

</div>
  </div>
</section>

<section id="sidemenuRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Page Layout](../layout/page-layout): the content layout, and the console page with a side menu.
- [Drawer](../components/drawer): the list inside the side menu, and its other classes.
- [Faculty](../examples/faculty): a page with the side menu in top bar mode.
- [Header](../ui-shell/header), [Main Navigation](../ui-shell/mainnav) and [Footer](../ui-shell/footer): the other parts of the page shell.

</div>
  </div>
</section>
