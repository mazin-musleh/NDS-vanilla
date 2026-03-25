---
layout: page
title: Dropmenu
hero_title: Dropmenu - National Design System
hero_description: Dropdown menu component with smart positioning, keyboard navigation, and full accessibility support
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Standard Dropmenu -->
<section id="dropmenuStandard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard Dropmenu</h2>
            <p class="nds-section-description">Dropdown menu for actions with optional icons and configurable button styles</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn selected"
                                data-toggler='["", ".nds-dropmenu-item i", "iconVisibility"]'>
                                <span class="label">With icons</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["hidden", ".nds-dropmenu-item i", "iconVisibility"]'>
                                <span class="label">No icons</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-menu-01"></i>
                                    <span class="label">Actions</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-edit-02"></i>
                                            <span class="label">Edit</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                            <span class="label">Duplicate</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-share-01"></i>
                                            <span class="label">Share</span>
                                        </button>
                                        <hr class="nds-divider">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                                            <span class="label">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-standard-1" id="tab-dropmenu-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-standard-1" aria-labelledby="tab-dropmenu-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-dropmenu">
  <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
    <i class="hgi hgi-stroke hgi-menu-01"></i>
    <span class="label">Actions</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <button class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-edit-02"></i>
        <span class="label">Edit</span>
      </button>
      <button class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-copy-01"></i>
        <span class="label">Duplicate</span>
      </button>
      <button class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-share-01"></i>
        <span class="label">Share</span>
      </button>
      <hr class="nds-divider">
      <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
        <i class="hgi hgi-stroke hgi-delete-02"></i>
        <span class="label">Delete</span>
      </button>
    </div>
  </div>
</div>
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Navigation Dropmenu -->
<section id="dropmenuNavigation" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Navigation Dropmenu</h2>
            <p class="nds-section-description">Dropdown menu using anchor tags for navigation links</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <span class="label">Account</span>
                                    <i class="hgi hgi-stroke hgi-user-circle"></i>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-user-account"></i>
                                            <span class="label">Profile</span>
                                        </a>
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-settings-01"></i>
                                            <span class="label">Settings</span>
                                        </a>
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-help-circle"></i>
                                            <span class="label">Help</span>
                                        </a>
                                        <hr class="nds-divider">
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-logout-01"></i>
                                            <span class="label">Sign out</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-navigation-1" id="tab-dropmenu-navigation-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-navigation-1" aria-labelledby="tab-dropmenu-navigation-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-dropmenu">
  <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
    <span class="label">Account</span>
    <i class="hgi hgi-stroke hgi-user-circle"></i>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-user-account"></i>
        <span class="label">Profile</span>
      </a>
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-settings-01"></i>
        <span class="label">Settings</span>
      </a>
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-help-circle"></i>
        <span class="label">Help</span>
      </a>
      <hr class="nds-divider">
      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-logout-01"></i>
        <span class="label">Sign out</span>
      </a>
    </div>
  </div>
</div>
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Prevent Auto-Close -->
<section id="dropmenuNoAutoClose" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Prevent Auto-Close</h2>
            <p class="nds-section-description">Keep the menu open when interacting with form controls using data-no-auto-close</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                                    <span class="label">Filter</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden style="min-width: 220px;">
                                    <div class="nds-dropmenu-scroll">
                                        <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-no-auto-close>
                                                <legend class="label">Status</legend>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-active">
                                                            <span class="label">Active</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-active" class="nds-check" checked>
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-pending">
                                                            <span class="label">Pending</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-pending" class="nds-check">
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-complete">
                                                            <span class="label">Complete</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-complete" class="nds-check">
                                                    </div>
                                                </div>
                                            </fieldset>
                                        <hr class="nds-divider">
                                        <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-no-auto-close>
                                                <legend class="label">Priority</legend>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-high">
                                                            <span class="label">High</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-high" class="nds-check">
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-medium">
                                                            <span class="label">Medium</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-medium" class="nds-check">
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-low">
                                                            <span class="label">Low</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-low" class="nds-check">
                                                    </div>
                                                </div>
                                            </fieldset>
                                        <hr class="nds-divider">
                                        <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-no-auto-close>
                                                <legend class="label">Category</legend>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-design">
                                                            <span class="label">Design</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-design" class="nds-check">
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-development">
                                                            <span class="label">Development</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-development" class="nds-check">
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-check-container">
                                                    <div class="nds-form-header">
                                                        <label for="filter-marketing">
                                                            <span class="label">Marketing</span>
                                                        </label>
                                                    </div>
                                                    <div class="nds-form-control">
                                                        <input type="checkbox" id="filter-marketing" class="nds-check">
                                                    </div>
                                                </div>
                                            </fieldset>
                                    </div>
                                    <div class="nds-dropmenu-footer">
                                        <hr class="nds-divider">
                                        <div class="nds-dropmenu-action nds-grid">
                                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-no-auto-close
                                                onclick="this.closest('.nds-dropmenu-menu').querySelectorAll('input[type=checkbox]').forEach(c=>c.checked=false)">
                                                <span class="label">Clear</span>
                                            </button>
                                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button">
                                                <span class="label">Apply</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-noclose-1" id="tab-dropmenu-noclose-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-noclose-1" aria-labelledby="tab-dropmenu-noclose-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-dropmenu">
  <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
    <i class="hgi hgi-stroke hgi-filter icon"></i>
    <span class="label">Filter</span>
  </button>
  <div class="nds-dropmenu-menu" hidden style="min-width: 220px;">
    <div class="nds-dropmenu-scroll">
      <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-no-auto-close>
          <legend class="label">Status</legend>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-active"><span class="label">Active</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-active" class="nds-check" checked>
            </div>
          </div>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-pending"><span class="label">Pending</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-pending" class="nds-check">
            </div>
          </div>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-complete"><span class="label">Complete</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-complete" class="nds-check">
            </div>
          </div>
      </fieldset>
      <hr class="nds-divider">
      <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-no-auto-close>
          <legend class="label">Priority</legend>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-high"><span class="label">High</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-high" class="nds-check">
            </div>
          </div>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-medium"><span class="label">Medium</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-medium" class="nds-check">
            </div>
          </div>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-low"><span class="label">Low</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-low" class="nds-check">
            </div>
          </div>
      </fieldset>
      <hr class="nds-divider">
      <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-no-auto-close>
          <legend class="label">Category</legend>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-design"><span class="label">Design</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-design" class="nds-check">
            </div>
          </div>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-development"><span class="label">Development</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-development" class="nds-check">
            </div>
          </div>
          <div class="nds-form-container nds-check-container">
            <div class="nds-form-header">
              <label for="filter-marketing"><span class="label">Marketing</span></label>
            </div>
            <div class="nds-form-control">
              <input type="checkbox" id="filter-marketing" class="nds-check">
            </div>
          </div>
      </fieldset>
    </div>
    <div class="nds-dropmenu-footer">
      <hr class="nds-divider">
      <div class="nds-dropmenu-action nds-grid">
        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-no-auto-close
          onclick="this.closest('.nds-dropmenu-menu').querySelectorAll('input[type=checkbox]').forEach(c=>c.checked=false)">
          <span class="label">Clear</span>
        </button>
        <button class="nds-btn nds-primary nds-dropmenu-item" type="button">
          <span class="label">Apply</span>
        </button>
      </div>
    </div>
  </div>
</div>
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="dropmenuFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-menu-11 icon"></i>
                        <span class="label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Dropmenus initialize automatically on page load and can be dynamically reinitialized using <code class="nds-inline-code lang-js">NDS.Dropmenu.reinit()</code> for content added after initial load.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-location-star-01 icon"></i>
                        <span class="label">Smart Positioning</span>
                    </span>
                    <p class="nds-item-desc">Automatically detects viewport boundaries and adjusts vertical and horizontal positioning to keep menus fully visible.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard icon"></i>
                        <span class="label">Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Full keyboard support with arrow keys, Home, End, Tab, Escape, and special handling for input fields inside menus using Alt+Arrow combinations.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-user icon"></i>
                        <span class="label">Accessibility</span>
                    </span>
                    <p class="nds-item-desc">Complete ARIA implementation with <code class="nds-inline-code lang-html">aria-expanded</code>, <code class="nds-inline-code lang-html">aria-haspopup</code>, <code class="nds-inline-code lang-html">role="menu"</code>, and reduced motion support.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-settings-02 icon"></i>
                        <span class="label">Data Attributes</span>
                    </span>
                    <p class="nds-item-desc">Menu items with <code class="nds-inline-code lang-html">data-no-auto-close</code> stay open on click, letting users interact with checkboxes, inputs, and filter controls without interruption.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code-circle icon"></i>
                        <span class="label">JavaScript API</span>
                    </span>
                    <p class="nds-item-desc">Programmatic control with instance methods <code class="nds-inline-code lang-js">open()</code>, <code class="nds-inline-code lang-js">close()</code>, <code class="nds-inline-code lang-js">toggle()</code>, and custom events for state changes.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="dropmenuGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use dropmenus for action lists when screen space is limited and actions don't need to be immediately visible</li>
                    <li>Use <strong>button elements</strong> with <code class="nds-inline-code lang-html">.nds-dropmenu-item</code> for actions that trigger JavaScript functions or modify state</li>
                    <li>Use <strong>anchor elements</strong> with <code class="nds-inline-code lang-html">.nds-dropmenu-item</code> for navigation links that take users to different pages</li>
                    <li>Group related actions together and use <code class="nds-inline-code lang-html">&lt;hr class="nds-divider"&gt;</code> to separate action groups</li>
                    <li>Place destructive actions last in the menu with the <code class="nds-inline-code lang-html">.nds-destructive</code> class for visual separation</li>
                    <li>Keep menus focused with 3-8 items. If you need more, consider restructuring into multiple menus or a different pattern</li>
                    <li>Icons are optional but recommended for faster visual scanning when actions have clear iconic representations</li>

                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Auto-initialization ────────────────────────────────────
// Dropmenus initialize automatically on page load

// ── Reinitialization ───────────────────────────────────────
// Call after dynamically adding new dropmenus to the page
NDS.Dropmenu.reinit();

// ── Manual creation ────────────────────────────────────────
const element = document.querySelector('.nds-dropmenu');
const instance = NDS.Dropmenu.create(element);

// ── Instance methods ───────────────────────────────────────
// Access instance via element.ndsDropmenuInstance
const dropmenu = document.querySelector('.nds-dropmenu');
const instance = dropmenu.ndsDropmenuInstance;

instance.open();    // Open the menu
instance.close();   // Close the menu
instance.toggle();  // Toggle open/closed state
instance.destroy(); // Remove listeners and clean up

// ── Events ─────────────────────────────────────────────────
// Listen for state changes
document.addEventListener('nds:dropmenu:opened', (e) => {
    // e.detail: { dropmenu, trigger, menu, isOpen }
    console.log('Menu opened:', e.detail.dropmenu);
});

document.addEventListener('nds:dropmenu:closed', (e) => {
    // e.detail: { dropmenu, trigger, menu, isOpen }
    console.log('Menu closed:', e.detail.dropmenu);
});

// ── Keyboard navigation ────────────────────────────────────
// Trigger button:
//   Enter/Space: toggle menu
//   ArrowDown: open and focus first item
//   ArrowUp: open and focus last item
//
// Inside menu:
//   ArrowDown/Up: navigate items
//   Home/End: jump to first/last item
//   Tab/Shift+Tab: navigate focusable elements
//   Escape: close menu and return focus to trigger
//
// Inside input fields:
//   Alt+ArrowDown/Up: navigate menu items
//   Ctrl+Home/End: jump to first/last item
                        </code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
