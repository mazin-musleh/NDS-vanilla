---
layout: page
title: Side Menu
hero_title: Side Menu - National Design System
hero_description: The menu beside the content that links the pages of one part of the site, in groups that open and close.
breadcrumb: [["UI Shell", "/components/?shelf=UI%20Shell"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "2.0.x"
last_edit: "19/11/2026 - 11:54 PM"
---

<section id="sidemenu-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The side menu is a column of links on the start side of the content. It holds the pages of one part of the site, such as a documentation set or an admin console. A link can open a group of links, and a group can hold groups of its own. The list is a [Drawer](../components/drawer), and the side menu adds the column and a button that opens the menu on small screens. A search box above the links can filter a long menu.

The side menu is a page shell part. The preview shows it in a frame of its own, so it does not clash with this page's own side menu.

Pick another component when:

- the steps of one task must go in order: [Stepper](../components/stepper)
- the views are parts of the same page: [Tabs](../components/tabs)
- the links go to the headings of one long page: [Table of Contents](../components/toc)
- the list is not the site's menu: [Drawer](../components/drawer)

The main links of the site belong in the [Main Navigation](../ui-shell/main-nav), and the links at the end of the page in the [Footer](../ui-shell/footer).

</div>
  </div>
</section>

<section id="sidemenu-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="sidemenu-canon" data-canon data-preview="page" data-preview-height="520" data-variants="sidemenu-variants-table">
<div class="nds-content-layout nds-has-sidemenu">
  <aside class="nds-sidemenu" aria-label="Sidebar" data-i18n-aria-label="sidemenu.sidebar">
    <button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" data-i18n-aria-label="sidemenu.sidebar_menu" hidden>
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
        <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
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
  <aside class="nds-sidemenu" aria-label="Sidebar" data-i18n-aria-label="sidemenu.sidebar">
    <button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" data-i18n-aria-label="sidemenu.sidebar_menu" hidden>
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
        <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
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
<script type="text/html" id="sidemenu-rail" data-canon>
<div class="nds-content-layout nds-has-sidemenu nds-rail nds-full-width">
  <aside class="nds-sidemenu" aria-label="Sidebar" data-i18n-aria-label="sidemenu.sidebar">
    <nav class="nds-drawer nds-divided">
      <button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" data-i18n-aria-label="sidemenu.sidebar_menu" hidden>
        <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
        <span class="nds-label nds-truncate">Side menu</span>
      </button>
      <div class="nds-scroll-more nds-divided">
        <ul class="nds-drawer-list nds-scroll-more-content">
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-home-01" aria-hidden="true"></i>
              <span class="nds-label">Overview</span>
            </a>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
              <i class="hgi hgi-stroke hgi-passport-01" aria-hidden="true"></i>
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
              <i class="hgi hgi-stroke hgi-airplane-01" aria-hidden="true"></i>
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
              <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
              <span class="nds-label">Appointments</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-credit-card" aria-hidden="true"></i>
              <span class="nds-label">Payments</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-file-01" aria-hidden="true"></i>
              <span class="nds-label">Documents</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-task-01" aria-hidden="true"></i>
              <span class="nds-label">Requests</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-message-01" aria-hidden="true"></i>
              <span class="nds-label">Messages</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-notification-01" aria-hidden="true"></i>
              <span class="nds-label">Notifications from Government Agencies</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-chart-histogram" aria-hidden="true"></i>
              <span class="nds-label">Reports</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>
              <span class="nds-label">Dependents</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-settings-01" aria-hidden="true"></i>
              <span class="nds-label">Settings</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-headset" aria-hidden="true"></i>
              <span class="nds-label">Contact Us</span>
            </a>
          </li>
        </ul>
        <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
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

<section id="sidemenu-parts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `.nds-content-layout.nds-has-sidemenu` | The side menu, then `.nds-content`. Without `nds-has-sidemenu`, the layout hides the side menu. See [Page Layout](../layout/page-layout) | Yes |
| `aside.nds-sidemenu` | The menu button and the drawer. Give it an `aria-label`. One per page | Yes |
| `button.nds-sidemenu-toggle` | The button that opens the menu below 960px, and folds it on a desktop in rail mode: an icon and a `.nds-label`. Write it with `hidden` and an `aria-label`. In rail mode it is the first child of `nav.nds-drawer` | Yes |
| `nav.nds-drawer` | The list: a `.nds-scroll-more` with the `ul.nds-drawer-list` and the show more button. See [Drawer](../components/drawer) | Yes |
| `li` with an `a.nds-btn` | One link | Yes |
| `i` in a top-level link or group button | The link's icon, before its `.nds-label`. In rail mode the folded menu shows only this icon | In rail mode |
| `li` with a `button.nds-btn` and a `ul` | A group: the button opens the `ul` under it. A group can hold groups | No |
| `span.nds-tag` | The number of links in a group, counting the links in its own groups. It sits in the group's button | No |
| `.nds-content` | The page sections, right after the side menu, with `id="main-content"` for the skip link | Yes |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sidemenu-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Small screens options change the menu below 960px only. A rail is the slide-in menu there, so Top bar is off with it.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Two levels (default) | — | — | Links and groups of links. Fits most sites |
| Structure | Three levels | canon `#sidemenu-grouped` | — | Groups inside a group. Use it only when one group holds many pages |
| Structure | Rail (hint: The menu folds to its icons) | canon `#sidemenu-rail` | — | `nds-rail` and `nds-full-width` on the layout. On a desktop, the menu button folds the menu to its icons. Below 960px, it is the slide-in menu. Give every top-level link an icon. Fits an app or admin console |
| Small screens | Slide-in (default) (hint: Below 960px, the menu slides in from the side) | — | — | Below 960px, the menu slides in from the side over the page. Fits a long list |
| Small screens | Top bar (hint: Below 960px, a bar above the content opens the menu) | `.nds-top` | `.nds-sidemenu:not(.nds-rail > .nds-sidemenu)` | Below 960px, a bar above the content shows the current page, and the menu drops down from it. Fits a short list |
| Peek button | Peek (default) (hint: The button hides at the screen edge until the mouse comes near) | `.nds-peek` | `.nds-sidemenu-toggle:not(.nds-top .nds-sidemenu-toggle)` | In slide-in mode, the button stays mostly hidden at the screen edge. Not in top bar mode |
| Peek button | Full button (hint: The button stays in full view) | — | `.nds-sidemenu-toggle:not(.nds-top .nds-sidemenu-toggle)` | The button stays in full view at the screen edge |
| Lined | Lined (hint: A line beside each open group) | `.nds-lined` | `.nds-drawer` | A line beside each open group, so the levels are easy to see |
| Search | Search (hint: A search box above the links) | `[data-search]` | `.nds-drawer` | A search box that filters the links and opens each group with a match. For a long menu. See [Drawer](../components/drawer) for its options |
| Many links | Many links (hint: The list does not fit, so the show more arrow appears) | canon `#sidemenu-more` | `.nds-drawer-list:not(.nds-rail .nds-drawer-list)` | 24 more links. Shows how the list scrolls when it is taller than the screen. Not with Rail: its list is long already, and these links have no icons |
{: #sidemenu-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sidemenu-behavior" class="nds-content-section nds-doc-behavior">
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

### Rail Mode
{: .nds-block-title}

On a desktop, `nds-rail` on the `.nds-content-layout` puts the menu button at the top of the menu. A press folds the menu to its icons, and the content column grows with it. A second press opens it again. The browser keeps the choice for the next page. A top-level name stays on one line, and a long one ends in an ellipsis. A folded icon, or a cut-off name, shows the full name in a tooltip on hover or keyboard focus. The current page's icon shows as a primary button while the menu is folded. A press on a group's icon opens the menu, then that group. A fold closes an open group first. Its icon stays marked only when the current page is in the group. When the menu opens again, that group opens after it. A press while the menu slides waits until the slide ends.

Below 960px, a rail is the slide-in menu, with its menu button at the screen edge. Peek works as it does in slide-in mode.

### Search
{: .nds-block-title}

`data-search` on `nav.nds-drawer` adds a search box above the links. The menu filters as the user types: a matching link stays, and each group with a match opens. Clearing the box opens the groups that were open before. Its options are on the [Drawer](../components/drawer) page.

</div>
  </div>
</section>

<section id="sidemenu-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Auto Start</span>
              <p class="nds-card-description">The script starts when <code class="nds-inline-code lang-html">.nds-sidemenu</code> is on the page. It shows the menu button and writes the current page's name in its label.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-target-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Current Page</span>
              <p class="nds-card-description">The groups above the current page's link open when the page loads, so the link is in view.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-unfold-less" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Open Group</span>
              <p class="nds-card-description">A group that opens closes the other open group at the same level, so the list stays short.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-pin" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Sticky Menu</span>
              <p class="nds-card-description">The menu stays in view below the main navigation while the page scrolls: the column on a desktop, and the bar in top bar mode.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-mouse-scroll-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Overflow Detection</span>
              <p class="nds-card-description">A list taller than the screen scrolls in place, and the show more arrow appears at its bottom.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-layers-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Backdrop Overlay</span>
              <p class="nds-card-description">Below 960px, the open menu dims the page behind it, and the page does not scroll.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-cancel-circle" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Close Triggers</span>
              <p class="nds-card-description">A second press on the menu button, Escape, a click outside the menu, or a change of the screen width closes it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-tap-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Wide Tap Area</span>
              <p class="nds-card-description">On a phone or tablet, the menu button takes a tap up to 48px from the screen edge. It draws 40px wide.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="sidemenu-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put one side menu on a page. The script uses the first one it finds.
- Mark the current page's `li` with `data-state="active"`. It highlights the link, opens its groups, names the top bar, and tells screen readers the link is the current page. On a page that changes view without a load, move the mark to the new `li`: the menu follows.
- Name each group by what its pages share. Do not mix pages of other topics in one group.
- Use two levels for most sites. A third level hides pages two clicks deep.
- Pick Top bar for a short list, and Slide-in for a long one that people scroll.
- Pick Rail for an app or a console that people use for a long time, where the content needs the width.
- Write `nds-full-width` on a rail's layout. On a wide screen, a layout with a max width turns the space the fold frees into empty margin.
- In rail mode, give every top-level link and group an icon. A folded link with no icon is an empty button.
- Add Search to a menu of about 20 links or more, as this site's menu has.
- Do not write color classes on the menu button. Each mode styles it.
- On a page with no side menu, remove the `aside` and `nds-has-sidemenu` together.

</div>
  </div>
</section>

<section id="sidemenu-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-sidemenu-collapsed` | `.nds-content-layout.nds-rail` | Write it to start the menu folded on a desktop. The script sets it when the user folds the menu, and removes it when the user opens it. The user's last choice, kept in `localStorage` as `nds-sidemenu-collapsed`, wins over the markup |
| `nds-tooltip`, `data-tooltip-message`, `data-tooltip-hover` | A top-level link or group button in rail mode on a desktop | On hover or focus, when the menu is folded or the name is cut off, the script makes the button a [Tooltip](../components/tooltip) that shows the full name. It removes them when the menu slides, and when the name fits again |
| `data-state` | `aside.nds-sidemenu` in rail mode on a desktop | The script sets `open opening` when the menu starts to open, removes `opening` as it slides, and adds `opened` at the end. A fold adds `closing`, and removes every token at the end. A folded menu has none |
| `data-state` | `aside.nds-sidemenu` in slide-in mode, and in rail mode below 960px | The script sets `open` when the menu opens, adds `closing` when it closes, and removes both after the close |
| `hidden` | `button.nds-sidemenu-toggle` | Write it in the markup. The script removes it when it starts |
| `aria-expanded` | `button.nds-sidemenu-toggle` | The script writes `false` when it starts and the attribute is missing. It sets `true` when the menu opens, and `false` after the close. In rail mode on a desktop, it is `true` while the menu is not folded |
| `data-state="open"` | `button.nds-sidemenu-toggle` | The script sets it when the slide-in or top bar menu opens, and removes it after the close |
| `hidden` | The menu button's `.nds-label` | The script sets it in slide-in and rail modes, and removes it in top bar mode. Leave the label's text to the script: it writes the current page's name in it |
| `data-state` | `nav.nds-drawer` in top bar mode | The script sets `open` when the menu opens, adds `closing` when it closes, and removes both after the close |
| `data-state="active"` | The current page's `li` | Set it yourself. The drawer opens every group above it, and follows the mark when it moves. It writes `aria-current="page"` on the `li`'s link and moves it with the mark. It keeps an `aria-current` you wrote |
| `aria-expanded` | A group's `button` | Write `false` in the markup. The drawer sets `true` when the group opens, and `false` when it closes. See [Drawer](../components/drawer) |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--nds-sidemenu-width` | `260px` | The width of the side menu and of its layout column. Set it on `:root` |
| `--nds-sidemenu-rail-width` | `56px` | The width of the folded menu and of its layout column in rail mode on a desktop. Set it on `:root` |
| `--nds-sidemenu-toggle-height` | `56px` | The height of the top bar. Set it on `:root` |
| `--toggle-pos` | `40svh` | How far below the main navigation the slide-in menu button sits. Set it on `button.nds-sidemenu-toggle` |
| `--drawer-max-height` | The screen height less the main navigation and `--spacing-3xl`, or `--spacing-xl` with `nds-compact` or card view on a desktop. `60svh` in top bar mode | The height of the list before it scrolls. Set it on `aside.nds-sidemenu`. The open slide-in menu fits the list to the screen and ignores it |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Sidemenu.init()` | Starts the side menu. It runs on page load. A second call stops the running side menu and starts it again. It does not start the drawer: for new markup, call `NDS.init.refresh()` instead, which starts both. See [Init](../core/init) |
| `NDS.Sidemenu.destroy()` | Closes the menu, removes every listener, and hides the toggle button again. The markup stays, and `init()` starts it again |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:sidemenu:expanded` | `.nds-sidemenu` in rail mode, after the menu opens, and it bubbles | — |
| `nds:sidemenu:collapsed` | `.nds-sidemenu` in rail mode, after the menu folds, and it bubbles | — |
{: .nds-table .nds-responsive}

The events fire on a desktop, when a person opens or folds the menu. They do not fire at load or when the screen width crosses 960px. The slide-in and top bar modes fire no events, and neither does a rail below 960px. The drawer fires `nds:drawer:shown` after a group opens, and `nds:drawer:hidden` after it closes: see [Drawer](../components/drawer).

<script type="text/html" id="sidemenu-js" data-canon data-lang="js" data-preview="none">
// A framework rendered a new side menu after the NDS script ran:
// start the side menu and its drawer
NDS.init.refresh(document.querySelector('.nds-content-layout'));

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

<section id="sidemenu-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Page Layout](../layout/page-layout): the content layout, and the console page with a side menu.
- [Drawer](../components/drawer): the list inside the side menu, and its other classes.
- [Academic Program](../examples/program): a page with the side menu in top bar mode.
- [Header](../ui-shell/header), [Main Navigation](../ui-shell/main-nav) and [Footer](../ui-shell/footer): the other parts of the page shell.

</div>
  </div>
</section>
