---
layout: page
title: Main Navigation
hero_title: Main Navigation - National Design System
hero_description: The bar at the top of every page with the brand, the main links, dropdown menus and the action buttons.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="mainnav-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The main navigation is the bar below the top bar. On the start side, the brand links to the home page. Next to it, the primary links take people to the main pages of the site, and a dropdown groups the pages under one link. On the end side, the actions hold search, language and the other site tools.

The main navigation is a page shell part. The preview shows it in a frame of its own, so it does not clash with this page's own main navigation.

The [Header](../ui-shell/header) shows how the main navigation sits with the top bar. The links at the end of the page belong in the [Footer](../ui-shell/footer), and the links inside one section in the [Side Menu](../ui-shell/sidemenu).

</div>
  </div>
</section>

<section id="mainnav-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="mainnav-canon" data-canon data-form data-preview="page" data-preview-height="440" data-variants="mainnav-variants-table">
<nav class="nds-main-nav nds-content-wrapper" id="nds-main-nav" aria-label="Primary navigation">
  <div class="nds-nav-container">
    <a href="../" class="nds-brand">
      <img class="nds-brand-logo" src="../assets/img/palm_swords.svg" width="40" height="40" loading="lazy" alt="National Portal logo">
      <span class="nds-brand-name">National Portal
        <span class="nds-brand-slogan">All services in one place</span>
      </span>
    </a>
    <ul class="nds-nav-minimal" hidden>
      <li class="nds-nav-toggler nds-nav-item">
        <button class="nds-nav-link nds-btn nds-subtle nds-indicator" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nds-nav-collapse">
          <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
    <div class="nds-nav-collapse" id="nds-nav-collapse" hidden>
      <div class="nds-nav-collapse-content">
        <ul class="nds-nav-primary">
          <li class="nds-nav-item">
            <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator" data-state="current" aria-current="page">
              <span class="nds-label">Home</span>
            </a>
          </li>
          <li class="nds-nav-item">
            <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
              <span class="nds-label">About</span>
            </a>
          </li>
          <li class="nds-nav-item">
            <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Contact</span>
            </a>
          </li>
          <li class="nds-nav-item nds-has-menu">
            <a href="#" class="nds-nav-link nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
              <span class="nds-label">Services</span>
            </a>
            <div class="nds-nav-menu" hidden>
              <div class="nds-nav-menu-content nds-content-wrapper">
                <div class="nds-nav-columns">
                  <div class="nds-nav-column">
                    <div class="nds-nav-title">Individuals</div>
                    <div class="nds-nav-list">
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Renew an ID card</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Book an appointment</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Track a request</span>
                      </a>
                    </div>
                  </div>
                  <div class="nds-nav-column">
                    <div class="nds-nav-title">Businesses</div>
                    <div class="nds-nav-list">
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Register a company</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Renew a license</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Pay fees</span>
                      </a>
                    </div>
                  </div>
                  <div class="nds-nav-column">
                    <div class="nds-nav-title">Regions</div>
                    <div class="nds-nav-list nds-multi-col">
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Riyadh</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Makkah</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Madinah</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Eastern Province</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Asir</span>
                      </a>
                      <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
                        <span class="nds-label">Tabuk</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="nds-nav-item nds-show-more">
          <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator nds-full" title="Show More" aria-label="Show more">
            <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
          </a>
        </div>
        <ul class="nds-nav-actions">
          <li class="nds-nav-item nds-has-menu nds-icon-only nds-search nds-pinned">
            <button class="nds-nav-link nds-btn nds-subtle nds-indicator nds-tooltip" data-tooltip-hover="500" title="Search" aria-expanded="false"><i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i><span class="nds-label" data-hidden="sm md sr">Search</span></button>
            <div class="nds-nav-menu" hidden>
              <div class="nds-nav-menu-content">
                <div class="nds-content-wrapper">
                  <form class="nds-form-container nds-search-box" role="search" method="get" action="#">
                    <div class="nds-search-content">
                      <div class="nds-form-control">
                        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                        <input id="main-search" type="text" class="nds-search-input" name="q" placeholder="Search..." aria-label="Search">
                        <div class="nds-form-action">
                          <button type="button" class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search">
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <button type="submit" class="nds-btn nds-primary nds-search-btn">
                        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                        <span class="nds-label" data-hidden="sm sr">Search</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </li>
          <li class="nds-nav-item nds-icon-only" id="nav-language">
            <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator nds-tooltip" data-tooltip-hover="500" title="العربية" lang="ar"><i class="nds-icon nds-hgi-translation" aria-hidden="true"></i><span class="nds-label" data-hidden="sm md sr">العربية</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</script>
<script type="text/html" id="mainnav-columns" data-canon>
<li class="nds-nav-item nds-has-menu">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
    <span class="nds-label">Services</span>
  </a>
  <div class="nds-nav-menu" hidden>
    <div class="nds-nav-menu-content nds-content-wrapper">
      <div class="nds-nav-columns">
        <div class="nds-nav-column">
          <div class="nds-nav-title">Individuals</div>
          <div class="nds-nav-list">
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Renew an ID card</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Book an appointment</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Track a request</span>
            </a>
          </div>
        </div>
        <div class="nds-nav-column">
          <div class="nds-nav-title">Businesses</div>
          <div class="nds-nav-list">
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Register a company</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Renew a license</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Pay fees</span>
            </a>
          </div>
        </div>
        <div class="nds-nav-column">
          <div class="nds-nav-title">Regions</div>
          <div class="nds-nav-list nds-multi-col">
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Riyadh</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Makkah</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Madinah</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Eastern Province</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Asir</span>
            </a>
            <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
              <span class="nds-label">Tabuk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>
</script>
<script type="text/html" id="mainnav-rows" data-canon>
<li class="nds-nav-item nds-has-menu">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
    <span class="nds-label">Media Center</span>
  </a>
  <div class="nds-nav-menu" hidden>
    <div class="nds-nav-menu-content nds-content-wrapper">
      <div class="nds-nav-row">
        <div class="nds-nav-list">
          <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
            <span class="nds-label">News</span>
          </a>
          <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
            <span class="nds-label">Events</span>
          </a>
          <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
            <span class="nds-label">Photos</span>
          </a>
          <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
            <span class="nds-label">Videos</span>
          </a>
          <a class="nds-btn nds-subtle nds-nav-menu-item" href="#">
            <span class="nds-label">Reports</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</li>
</script>
<script type="text/html" id="mainnav-more" data-canon>
<li class="nds-nav-item">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
    <span class="nds-label">Open Data</span>
  </a>
</li>
<li class="nds-nav-item">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
    <span class="nds-label">Careers</span>
  </a>
</li>
<li class="nds-nav-item">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
    <span class="nds-label">Tenders</span>
  </a>
</li>
<li class="nds-nav-item">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
    <span class="nds-label">Partners</span>
  </a>
</li>
<li class="nds-nav-item">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
    <span class="nds-label">Questions and Answers</span>
  </a>
</li>
<li class="nds-nav-item">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator">
    <span class="nds-label">Privacy Policy</span>
  </a>
</li>
</script>
<script type="text/html" id="mainnav-search" data-canon data-form>
<li class="nds-nav-item nds-has-menu nds-icon-only nds-search nds-pinned">
  <button class="nds-nav-link nds-btn nds-subtle nds-indicator nds-tooltip" data-tooltip-hover="500" title="Search" aria-expanded="false"><i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i><span class="nds-label" data-hidden="sm md sr">Search</span></button>
  <div class="nds-nav-menu" hidden>
    <div class="nds-nav-menu-content">
      <div class="nds-content-wrapper">
        <form class="nds-form-container nds-search-box" role="search" method="get" action="#">
          <div class="nds-search-content">
            <div class="nds-form-control">
              <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
              <input id="main-search" type="text" class="nds-search-input" name="q" placeholder="Search..." aria-label="Search">
              <div class="nds-form-action">
                <button type="button" class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search">
                  <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="nds-btn nds-primary nds-search-btn">
              <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
              <span class="nds-label" data-hidden="sm sr">Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</li>
</script>
<script type="text/html" id="mainnav-notifications" data-canon>
<li class="nds-nav-item nds-has-menu nds-icon-only" id="nav-notifications">
  <button class="nds-nav-link nds-btn nds-subtle nds-indicator nds-tooltip" data-tooltip-hover="500" title="Notifications" aria-expanded="false"><i class="nds-icon nds-hgi-notification-02" aria-hidden="true"><span class="nds-badge">2</span></i><span class="nds-label" data-hidden="sm md sr">Notifications</span></button>
  <div class="nds-nav-menu nds-fit" hidden>
    <div class="nds-nav-menu-content">
      <div class="nds-nav-column">
        <nav class="nds-drawer" style="--drawer-max-height: 40svh; min-width: 40vw; max-width: 100%;">
          <div class="nds-scroll-more nds-divided">
            <ul class="nds-drawer-list nds-scroll-more-content">
              <li>
                <a href="#" class="nds-btn nds-subtle nds-indicator">
                  <span class="nds-featured-icon nds-sm">
                    <i class="nds-icon nds-hgi-checkmark-circle-01" aria-hidden="true"></i>
                  </span>
                  <span class="nds-drawer-item">
                    <span class="nds-drawer-item-head">
                      <span class="nds-tag nds-xs" data-status="success">
                        <span class="nds-label">Approved</span>
                      </span>
                      <span class="nds-label nds-truncate">License renewed</span>
                    </span>
                    <span class="nds-description">Your business license is renewed until next year.</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" class="nds-btn nds-subtle nds-indicator">
                  <span class="nds-featured-icon nds-sm">
                    <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                  </span>
                  <span class="nds-drawer-item">
                    <span class="nds-drawer-item-head">
                      <span class="nds-tag nds-xs" data-status="warning">
                        <span class="nds-label">Due soon</span>
                      </span>
                      <span class="nds-label nds-truncate">Appointment tomorrow</span>
                    </span>
                    <span class="nds-description">Your appointment at the Riyadh service center is tomorrow at 10:00 AM.</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <hr class="nds-divider">
        <a href="#" class="nds-btn nds-subtle nds-full">
          <i class="nds-icon nds-hgi-notification-02" aria-hidden="true"></i>
          <span class="nds-label">View all notifications</span>
        </a>
      </div>
    </div>
  </div>
</li>
</script>
<script type="text/html" id="mainnav-guest" data-canon>
<li class="nds-nav-item nds-icon-only" id="nav-guest">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator nds-tooltip" data-tooltip-hover="500" title="Sign in"><i class="nds-icon nds-icon-avatar" aria-hidden="true"></i><span class="nds-label" data-hidden="sm md sr">Sign in</span></a>
</li>
</script>
<script type="text/html" id="mainnav-user" data-canon>
<li class="nds-nav-item nds-has-menu nds-icon-only" id="nav-user">
  <button class="nds-nav-link nds-btn nds-subtle nds-lg nds-indicator nds-tooltip" data-tooltip-hover="500" title="Ahmed" aria-expanded="false"><span class="nds-avatar"><img src="../docs-assets/img/avatar3.webp" alt="Ahmed" class="nds-icon" loading="lazy"></span><span class="nds-label" data-hidden="sm md sr">Ahmed</span></button>
  <div class="nds-nav-menu nds-fit" hidden>
    <div class="nds-nav-menu-content">
      <div class="nds-nav-column">
        <div class="nds-persona nds-sm">
          <div class="nds-persona-info">
            <span class="nds-persona-name">Ahmed Mohammed</span>
            <span class="nds-persona-role nds-truncate">Business owner</span>
            <span class="nds-persona-desc">ahmed@example.sa</span>
          </div>
          <hr class="nds-divider">
          <div class="nds-persona-action">
            <a href="#" class="nds-btn nds-subtle nds-nav-menu-item">
              <i class="nds-icon nds-hgi-identity-card" aria-hidden="true"></i>
              <span class="nds-label">My account</span>
            </a>
            <a href="#" class="nds-btn nds-subtle nds-nav-menu-item">
              <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
              <span class="nds-label">Change password</span>
            </a>
            <a href="#" class="nds-btn nds-subtle nds-destructive nds-nav-menu-item">
              <i class="nds-icon nds-hgi-door-01" aria-hidden="true"></i>
              <span class="nds-label">Sign out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>
</script>
<script type="text/html" id="mainnav-language" data-canon>
<li class="nds-nav-item nds-icon-only" id="nav-language">
  <a href="#" class="nds-nav-link nds-btn nds-subtle nds-indicator nds-tooltip" data-tooltip-hover="500" title="العربية" lang="ar"><i class="nds-icon nds-hgi-translation" aria-hidden="true"></i><span class="nds-label" data-hidden="sm md sr">العربية</span></a>
</li>
</script>
<script type="text/html" id="mainnav-cta" data-canon>
<li class="nds-nav-item nds-nav-cta" id="nav-cta">
  <a href="#" class="nds-btn nds-primary" title="Apply now"><span class="nds-label">Apply now</span></a>
</li>
</script>
    </div>
  </div>
</section>

<section id="mainnav-parts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `nav.nds-main-nav` | The whole bar. Add `nds-content-wrapper` to keep its content at the page width. One per page | Yes |
| `.nds-nav-container` | The brand, the menu button and the drawer, in that order | Yes |
| `a.nds-brand` | The logo (`img.nds-brand-logo`) and `.nds-brand-name`, with `.nds-brand-slogan` inside the name. It links to the home page | Yes |
| `ul.nds-nav-minimal` | The menu button (`li.nds-nav-toggler`), and the pinned actions below 960px. It ships `hidden` | Yes |
| `#nds-nav-collapse.nds-nav-collapse` | The drawer: one `.nds-nav-collapse-content` with the links, the show more button and the actions. It ships `hidden`. The script finds it by this id | Yes |
| `ul.nds-nav-primary` | The primary links, one `li.nds-nav-item` each | Yes |
| `li.nds-nav-item.nds-has-menu` | A link that opens a menu: the trigger `a.nds-nav-link.nds-menu-btn`, then `.nds-nav-menu` > `.nds-nav-menu-content` | No |
| `.nds-nav-columns` or `.nds-nav-row` | The menu's content. `.nds-nav-columns` holds titled columns (`.nds-nav-column` with a `.nds-nav-title` and a `.nds-nav-list`); `.nds-nav-row` holds one row of links (one `.nds-nav-list`) | With a dropdown |
| `a.nds-nav-menu-item` | One link in a menu | With a dropdown |
| `.nds-show-more` | The arrow that scrolls the links when they do not fit. Write it right after `.nds-nav-primary` | Yes |
| `ul.nds-nav-actions` | The actions, one `li.nds-nav-item` each. An action is a link, a button, or a dropdown with its own content | No |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="mainnav-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The canon carries the Services dropdown, the search action and the language action. Each dropdown and each action is one part: **Dropdowns** and **Actions** add or remove them, and the parts keep the table order. **Many links** adds six links, so the links do not fit and the show more arrow appears.

**Pinned on Small Screens** adds `nds-pinned` to that action's `li`. The option is off while its action is off.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Brand | Logo and name (default) | — | — | The logo, the site name and the slogan |
| Brand | Without slogan | `remove` | `.nds-brand-slogan` | The logo and the name, with no slogan. Pick it when the name says enough |
| Brand | Logo only | `remove` | `.nds-brand-name` | Only the logo. Pick it when the logo carries the site name. Keep the logo's `alt` text |
| Dropdowns (any) | Columns (default) | canon `#mainnav-columns` | `.nds-nav-primary` | A menu of titled columns, `.nds-nav-columns`. Pick it to group many pages by topic. `nds-multi-col` spreads one long list over 3 columns |
| Dropdowns (any) | Row list | canon `#mainnav-rows` | `.nds-nav-primary` | A menu of one row of links, `.nds-nav-row`. Pick it for a short flat list |
| Many links | Many links (hint: The links do not fit, so the show more arrow appears) | canon `#mainnav-more` | `.nds-nav-primary` | Six more links. Shows how the bar scrolls the links that do not fit |
| Actions (any) | Search (default) | canon `#mainnav-search` | `.nds-nav-actions` | A search box that opens below the bar |
| Actions (any) | Notifications | canon `#mainnav-notifications` | `.nds-nav-actions` | A small `nds-fit` menu of messages, with a count badge |
| Actions (any) | Guest (limit: 1 account) | canon `#mainnav-guest` | `.nds-nav-actions` | The sign-in link, for a visitor who is not signed in. Show Guest or User, never both |
| Actions (any) | User (limit: 1 account) | canon `#mainnav-user` | `.nds-nav-actions` | The signed-in person's avatar, with a small `nds-fit` menu of account links |
| Actions (any) | Language (default) | canon `#mainnav-language` | `.nds-nav-actions` | A link to the page in the other language. Its label is the other language's name |
| Actions (any) | Call to action | canon `#mainnav-cta` | `.nds-nav-actions` | A filled button for the one task the site steers people to, such as an application. Its label shows at every width. Use one at most |
| Pinned on Small Screens (any) | Search (default) (hint: Stays in the bar below 960px) | `.nds-pinned` | `.nds-search` | Search stays in the bar below 960px |
| Pinned on Small Screens (any) | Notifications (hint: Stays in the bar below 960px) | `.nds-pinned` | `#nav-notifications` | Notifications stay in the bar below 960px |
| Pinned on Small Screens (any) | Guest (hint: Stays in the bar below 960px) | `.nds-pinned` | `#nav-guest` | Sign in stays in the bar below 960px |
| Pinned on Small Screens (any) | User (hint: Stays in the bar below 960px) | `.nds-pinned` | `#nav-user` | The avatar stays in the bar below 960px |
| Pinned on Small Screens (any) | Language (hint: Stays in the bar below 960px) | `.nds-pinned` | `#nav-language` | Language stays in the bar below 960px |
| Pinned on Small Screens (any) | Call to action (hint: Stays in the bar below 960px) | `.nds-pinned` | `#nav-cta` | The button stays in the bar below 960px, first in the row |
{: #mainnav-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="mainnav-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Dropdowns
{: .nds-block-title}

A click on a dropdown link opens its menu, and closes any other open menu. A second click, a click outside the menu, or Escape closes it. On a desktop, a primary menu spans the page width below the bar. In the drawer, it opens in place, under its link.

### Small Menus
{: .nds-block-title}

`nds-fit` on `.nds-nav-menu` makes the menu as wide as its content, centered under its link. The script moves the menu sideways when it would cross the screen edge. Use it for an action's menu, such as notifications or an account.

### Pinned Actions
{: .nds-block-title}

Below 960px, the actions move into the drawer, in one row at its bottom. An action with `nds-pinned` stays in the bar next to the menu button instead. The script moves it into `.nds-nav-minimal`, and back to its place above 960px.

</div>
  </div>
</section>

<section id="mainnav-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The script starts when <code class="nds-inline-code lang-html">.nds-main-nav</code> is on the page. Links and actions added or removed later are picked up with no call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Responsive Drawer</span>
          </span>
          <p class="nds-item-desc">Below 960px, the links and the actions fold into a drawer that slides open under the bar. The menu button opens and closes it. When the bar is full, the brand text shrinks first, so the menu button always stays on screen.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mouse-scroll-01"></i>
            <span class="nds-label">Overflow Detection</span>
          </span>
          <p class="nds-item-desc">Links that do not fit scroll in place, and the show more arrow appears. Each press of the arrow shows the next links. At the end, it goes back to the first ones.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-drag-drop"></i>
            <span class="nds-label">Drag and Wheel Scrolling</span>
          </span>
          <p class="nds-item-desc">On a desktop, links that do not fit scroll with a mouse drag, and the mouse wheel scrolls them sideways.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-navigation-03"></i>
            <span class="nds-label">Same-Page Links</span>
          </span>
          <p class="nds-item-desc">A link to a section of the same page closes the open menus, then scrolls to the section.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Backdrop Overlay</span>
          </span>
          <p class="nds-item-desc">An open menu or drawer dims the page behind it. A click on the dimmed page closes it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Reduced Motion</span>
          </span>
          <p class="nds-item-desc">When the user asks for reduced motion, menus and the drawer open and close with no animation, and scrolls jump.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="mainnav-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put the main navigation in `header`, after the top bar. See [Header](../ui-shell/header).
- Keep 3 to 8 primary links. More links scroll, and people miss the ones they cannot see.
- Use a dropdown to group pages under one link. Do not put a dropdown inside a menu: menus have one level.
- Do not put a key task only inside a menu. Give it a primary link or an action.
- Mark the current page's link with `data-state="current"` and `aria-current="page"`. The highlight comes only from `data-state`, and screen readers read only `aria-current`.
- Pin only the actions people need on a small screen, such as search, language and the account. Pinned actions crowd the bar next to the menu button.
- Keep a call to action's label to one or two words. On a small screen, a pinned one takes its room from the brand.
- Do not move a pinned action with your own script. The script moves it, and puts it back where you wrote it.
- Give every icon-only action a `title`. It is the tooltip, and the action's name.
- Set `width` and `height` on the logo, so the bar does not move when the logo loads.
- A page with no header still needs a language switch. The [Sign In](../examples/sign-in) example puts it in the card header, next to the logo.

</div>
  </div>
</section>

<section id="mainnav-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-oncolor` | `a.nds-brand` | In dark mode, shows the logo in white |
| `nds-icon-only` | An action's `li` | Shows only the icon. The label stays for screen readers |
| `nds-menu-btn` | A dropdown's trigger link | The arrow that turns when the menu opens. See [Button](../components/button) |
| `nds-multi-col` | A `.nds-nav-list` in a menu | Spreads the links over 3 columns, and 2 below 960px |
| `nds-fit` | `.nds-nav-menu` | Makes the menu as wide as its content. See Small Menus under Behavior |
| `nds-nav-cta` | An action's `li` | Makes the action's button 32px high, for a call to action written as `nds-btn nds-primary`. A pinned one comes first in the bar |
| `nds-minimal` | `nav.nds-main-nav` | The script sets it below 960px and removes it above. Key your own drawer styles on it |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-nav-open` | `nav.nds-main-nav` | The script sets it while the drawer or a menu is open, and removes it once all have closed. While it is set, the bar does not clip what spills past it |
| `hidden` | `ul.nds-nav-minimal` | Write it in the markup. The script removes it below 960px, and sets it again above |
| `aria-expanded` | The menu button | Write `false` in the markup. The script sets `true` when the drawer opens, and `false` when it closes |
| `data-state="open"` | `li.nds-nav-toggler` | The script sets it when the drawer opens, and removes it when the drawer closes |
| `hidden` | `#nds-nav-collapse` | Write it in the markup. The script removes it when it starts |
| `data-state` | `#nds-nav-collapse` | The script sets `open` and `opening` when the drawer opens, then `opened`. It adds `closing` when the drawer closes, and removes all of them after the close |
| `data-state` | `ul.nds-nav-primary` | The script sets `has-more` while the links do not fit, `at-start` at the start of the scroll, and `at-end` at its end |
| `data-state="current"` | A primary `a.nds-nav-link` | Set it yourself on the current page's link. It is the only attribute that highlights it. `NDS.Init.audit()` reports a current-page link without it |
| `aria-current="page"` | A primary `a.nds-nav-link` | Set it yourself, with `data-state="current"`. It names the current page for screen readers, and changes no style |
| `data-state` | `li.nds-has-menu` | The script sets `open` and `opening` when the menu opens, then `opened`. It adds `closing` when the menu closes, and removes all of them after the close |
| `aria-expanded` | A dropdown's trigger | Write `false` in the markup. The script writes it when it is missing, sets `true` when the menu opens, and `false` when it closes |
| `data-state="open"` | A dropdown's trigger | The script sets it when the menu opens, and removes it when the menu closes. Never write it: the current page is `current` |
| `hidden` | `.nds-nav-menu` | Write it in the markup. The script removes it when the menu opens, and sets it again after the menu closes |
| `data-modal-target` | A nav link | Opens the [Modal](../components/modal) with that id. Any modal that opens closes the open menus and the drawer |
| `data-nav-actions-open` | `.nds-nav-collapse-content` | The script sets it while an action's menu is open in the drawer. The drawer's corners square off, and the links shrink to make room |
| `data-nav-actions-empty` | `.nds-nav-collapse-content` | The script sets it while the actions row is empty or missing, and the show more arrow moves down to the drawer's bottom edge |
| `data-nav-empty` | `ul.nds-nav-actions` | The script sets it while the row holds no action, such as below 960px when every action is pinned. The row is hidden while it is set |
| `data-hidden="sm md sr"` | An action's `.nds-label` | Hides the label below 960px. Screen readers still read it. Leave it off an `nds-nav-cta` label. See [Hidden](../utilities/hidden) |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--nds-nav-height` | `72px` | The height of the bar. Sticky parts on the page sit below it |
| `--nds-minimal-nav-bp` | `960px` | The width below which the drawer takes over. Set it on `:root`. The script reads it once, when the page loads |
| `--nds-minimal-nav-item-height` | `40px` | The height of each link in the drawer |
| `--nds-brand-width` | `auto` | The width of the brand. Set it on `a.nds-brand` |
| `--brand-logo-height` | `40px` | The height of the logo. Set it on `a.nds-brand` or the logo |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Mainnav.init()` | Starts the main navigation. It runs on page load, and a second call does nothing |
| `NDS.Mainnav.reinit()` | Finds the main navigation again and starts it. Call it when the nav itself is new: rendered after the NDS script ran, or replaced by a route change. `NDS.Init.refresh()` calls it too |
| `NDS.Mainnav.destroy()` | Removes every listener and observer, and the backdrop. The markup stays, and `reinit()` starts it again |
| `NDS.Mainnav.open()` | Opens the drawer |
| `NDS.Mainnav.close()` | Closes the drawer |
| `NDS.Mainnav.toggle()` | Opens or closes the drawer |
| `NDS.Mainnav.openMenu(trigger)` | Opens the menu of the `li.nds-has-menu` that holds `trigger`, and closes any other open menu |
| `NDS.Mainnav.closeMenus()` | Closes every open menu |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:mainnav:opened` | `#nds-nav-collapse` or an `li.nds-has-menu` | None. Fires when the drawer or the menu starts to open. It bubbles, so one listener on the nav hears both |
| `nds:mainnav:closed` | The same element | None. Fires after the drawer or the menu has closed |
{: .nds-table .nds-responsive}

<script type="text/html" id="mainnav-js" data-canon data-lang="js" data-preview="none">
// A framework rendered the header after the NDS script ran
NDS.Mainnav.reinit();

// Open the drawer from a link in the page
document.querySelector('#menu-link').addEventListener('click', (e) => {
  e.preventDefault();
  NDS.Mainnav.open();
});

// Pause a video while the drawer or a menu is open
const nav = document.querySelector('.nds-main-nav');
nav.addEventListener('nds:mainnav:opened', () => video.pause());
nav.addEventListener('nds:mainnav:closed', () => video.play());

// A framework removes the header: release the nav first
NDS.Mainnav.destroy();
</script>

The full API is in the banner of `_js/nds-mainnav.js`.

</div>
  </div>
</section>

<section id="mainnav-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Header](../ui-shell/header), [Top Bar](../ui-shell/topbar) and [Footer](../ui-shell/footer): the other parts of the page shell.
- [Side Menu](../ui-shell/sidemenu): the links inside one section of the site.
- [Home Page Template](../templates/home-template): the main navigation in a complete page.
- [Sign In](../examples/sign-in): a page with no header, and its language switch.

</div>
  </div>
</section>
