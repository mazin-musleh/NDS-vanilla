---
layout: page
title: Dropmenu
hero_title: Dropmenu - National Design System
hero_description: A toggle-activated menu for presenting actions, navigation links, or filter controls in a compact overlay
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.4.0"
last_edit: "28/06/2026 - 01:27 PM"
---

<!-- Standard Dropmenu -->
<section id="dropmenuStandard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard Dropmenu</h2>
            <p class="nds-section-description">Action menu for tasks like edit, duplicate, share, or delete. Use buttons for items that trigger actions on the current page</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                    <span class="nds-label">Actions</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-edit-02"></i>
                                            <span class="nds-label">Edit</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                            <span class="nds-label">Duplicate</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
                                            <span class="nds-label">Share</span>
                                        </button>
                                        <hr class="nds-divider">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                                            <span class="nds-label">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-standard-1" id="tab-dropmenu-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-standard-1" aria-labelledby="tab-dropmenu-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-dropmenu"&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger"&gt;
    &lt;i class="nds-icon nds-hgi-menu-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Actions&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item"&gt;
        &lt;i class="hgi hgi-stroke hgi-edit-02"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Edit&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item"&gt;
        &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Duplicate&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item"&gt;
        &lt;i class="nds-icon nds-hgi-share-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Share&lt;/span&gt;
      &lt;/button&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive"&gt;
        &lt;i class="hgi hgi-stroke hgi-delete-02"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Delete&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
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
<section id="dropmenuNavigation" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Navigation Dropmenu</h2>
            <p class="nds-section-description">Menu items that navigate to other pages. Use anchor elements when each item is a link rather than an action</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <span class="nds-label">Account</span>
                                    <i class="hgi hgi-stroke hgi-user-circle"></i>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-user-account"></i>
                                            <span class="nds-label">Profile</span>
                                        </a>
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-settings-01"></i>
                                            <span class="nds-label">Settings</span>
                                        </a>
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-help-circle"></i>
                                            <span class="nds-label">Help</span>
                                        </a>
                                        <hr class="nds-divider">
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-logout-01"></i>
                                            <span class="nds-label">Sign out</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-navigation-1" id="tab-dropmenu-navigation-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-navigation-1" aria-labelledby="tab-dropmenu-navigation-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-dropmenu"&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger"&gt;
    &lt;span class="nds-label"&gt;Account&lt;/span&gt;
    &lt;i class="hgi hgi-stroke hgi-user-circle"&gt;&lt;/i&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;a href="#" class="nds-btn nds-subtle nds-dropmenu-item"&gt;
        &lt;i class="hgi hgi-stroke hgi-user-account"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Profile&lt;/span&gt;
      &lt;/a&gt;
      &lt;a href="#" class="nds-btn nds-subtle nds-dropmenu-item"&gt;
        &lt;i class="hgi hgi-stroke hgi-settings-01"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Settings&lt;/span&gt;
      &lt;/a&gt;
      &lt;a href="#" class="nds-btn nds-subtle nds-dropmenu-item"&gt;
        &lt;i class="hgi hgi-stroke hgi-help-circle"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Help&lt;/span&gt;
      &lt;/a&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;a href="#" class="nds-btn nds-subtle nds-dropmenu-item"&gt;
        &lt;i class="hgi hgi-stroke hgi-logout-01"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Sign out&lt;/span&gt;
      &lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
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

<!-- Scrollable Menu with No Auto-Close -->
<section id="dropmenuNoAutoClose" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Scrollable Menu with No Auto-Close</h2>
            <p class="nds-section-description">Use <code class="nds-inline-code lang-html">nds-dropmenu-scroll</code> for scrollable content areas and <code class="nds-inline-code lang-html">data-no-auto-close</code> to keep the menu open when interacting with form controls</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-neutral nds-menu-btn nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-settings-02"></i>
                                    <span class="nds-label">Settings</span>
                                </button>
                                <div class="nds-dropmenu-menu" style="min-width: 220px;" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <fieldset class="nds-dropmenu-group nds-form-group nds-check-group" data-no-auto-close>
                                            <legend class="nds-label">Notifications</legend>
                                            <div class="nds-form-container nds-switch-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-email"><span class="nds-label">Email</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <div class="nds-switch">
                                                        <input type="checkbox" id="setting-email" class="nds-switch-input" checked>
                                                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nds-form-container nds-switch-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-sms"><span class="nds-label">SMS</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <div class="nds-switch">
                                                        <input type="checkbox" id="setting-sms" class="nds-switch-input">
                                                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nds-form-container nds-switch-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-push"><span class="nds-label">Push</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <div class="nds-switch">
                                                        <input type="checkbox" id="setting-push" class="nds-switch-input" checked>
                                                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <hr class="nds-divider">
                                        <fieldset class="nds-dropmenu-group nds-form-group nds-check-group" data-no-auto-close>
                                            <legend class="nds-label">Display</legend>
                                            <div class="nds-form-container nds-check-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-compact"><span class="nds-label">Compact view</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <input type="checkbox" id="setting-compact" class="nds-check">
                                                </div>
                                            </div>
                                            <div class="nds-form-container nds-check-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-icons"><span class="nds-label">Show icons</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <input type="checkbox" id="setting-icons" class="nds-check" checked>
                                                </div>
                                            </div>
                                            <div class="nds-form-container nds-check-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-desc"><span class="nds-label">Show descriptions</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <input type="checkbox" id="setting-desc" class="nds-check" checked>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <hr class="nds-divider">
                                        <fieldset class="nds-dropmenu-group nds-form-group nds-check-group" data-no-auto-close>
                                            <legend class="nds-label">Privacy</legend>
                                            <div class="nds-form-container nds-switch-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-analytics"><span class="nds-label">Analytics</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <div class="nds-switch">
                                                        <input type="checkbox" id="setting-analytics" class="nds-switch-input" checked>
                                                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nds-form-container nds-switch-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-cookies"><span class="nds-label">Cookies</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <div class="nds-switch">
                                                        <input type="checkbox" id="setting-cookies" class="nds-switch-input" checked>
                                                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="nds-form-container nds-switch-container">
                                                <div class="nds-form-header">
                                                    <label for="setting-tracking"><span class="nds-label">Ad tracking</span></label>
                                                </div>
                                                <div class="nds-form-control">
                                                    <div class="nds-switch">
                                                        <input type="checkbox" id="setting-tracking" class="nds-switch-input">
                                                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="nds-dropmenu-footer">
                                        <hr class="nds-divider">
                                        <div class="nds-dropmenu-action nds-grid">
                                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-no-auto-close
                                                onclick="this.closest('.nds-dropmenu-menu').querySelectorAll('input').forEach(c=>c.checked=false)">
                                                <span class="nds-label">Reset</span>
                                            </button>
                                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button">
                                                <span class="nds-label">Save</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-noclose-1" id="tab-dropmenu-noclose-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-noclose-1" aria-labelledby="tab-dropmenu-noclose-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-dropmenu"&gt;
  &lt;button class="nds-btn nds-neutral nds-menu-btn nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-settings-02"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Settings&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" style="min-width: 220px;" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;!-- data-no-auto-close keeps menu open on interaction --&gt;
      &lt;fieldset class="nds-dropmenu-group nds-form-group nds-check-group"
        data-no-auto-close&gt;
        &lt;legend class="nds-label"&gt;Notifications&lt;/legend&gt;
        &lt;div class="nds-form-container nds-switch-container"&gt;
          &lt;div class="nds-form-header"&gt;
            &lt;label for="setting-email"&gt;
              &lt;span class="nds-label"&gt;Email&lt;/span&gt;
            &lt;/label&gt;
          &lt;/div&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;div class="nds-switch"&gt;
              &lt;input type="checkbox" id="setting-email"
                class="nds-switch-input" checked&gt;
              &lt;div class="nds-switch-track"&gt;
                &lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- more switches... --&gt;
      &lt;/fieldset&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;fieldset class="nds-dropmenu-group nds-form-group nds-check-group"
        data-no-auto-close&gt;
        &lt;legend class="nds-label"&gt;Display&lt;/legend&gt;
        &lt;div class="nds-form-container nds-check-container"&gt;
          &lt;div class="nds-form-header"&gt;
            &lt;label for="setting-compact"&gt;
              &lt;span class="nds-label"&gt;Compact view&lt;/span&gt;
            &lt;/label&gt;
          &lt;/div&gt;
          &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" id="setting-compact" class="nds-check"&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- more checkboxes... --&gt;
      &lt;/fieldset&gt;
    &lt;/div&gt;
    &lt;div class="nds-dropmenu-footer"&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;div class="nds-dropmenu-action nds-grid"&gt;
        &lt;button class="nds-btn nds-secondary nds-dropmenu-item"
          type="button" data-no-auto-close&gt;
          &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-primary nds-dropmenu-item"
          type="button"&gt;
          &lt;span class="nds-label"&gt;Save&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
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

<!-- Dropmenu Inside Table -->
<section id="dropmenuInTable" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dropmenu Inside Table</h2>
            <p class="nds-section-description">Row-level action menus inside tables need <code class="nds-inline-code lang-html">data-portal</code> on the wrapper. The menu then moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code> on open (viewport-anchored, <code class="nds-inline-code lang-html">position: fixed</code>) so it escapes the table cell's overflow clipping and stacking context, and it follows the trigger as the page scrolls — no auto-close on scroll. Without <code class="nds-inline-code lang-html">data-portal</code> the default in-place mode would clip behind the row border or hide under an adjacent z-indexed cell.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <table class="nds-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Nora Al-Zahrani</td>
                                        <td>Administrator</td>
                                        <td><span class="nds-tag nds-sm" data-status="success"><span class="nds-label">Active</span></span></td>
                                        <td>
                                            <div class="nds-dropmenu" data-portal>
                                                <button class="nds-btn nds-sm nds-subtle nds-dropmenu-trigger" aria-label="Row actions">
                                                    <i class="hgi hgi-stroke hgi-more-horizontal-circle-01"></i>
                                                </button>
                                                <div class="nds-dropmenu-menu" hidden>
                                                    <div class="nds-dropmenu-scroll">
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                            <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                            <span class="nds-label">Edit</span>
                                                        </button>
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                                            <span class="nds-label">Duplicate</span>
                                                        </button>
                                                        <hr class="nds-divider">
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                            <span class="nds-label">Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Yousef Al-Harbi</td>
                                        <td>Editor</td>
                                        <td><span class="nds-tag nds-sm" data-status="warning"><span class="nds-label">Away</span></span></td>
                                        <td>
                                            <div class="nds-dropmenu" data-portal>
                                                <button class="nds-btn nds-sm nds-subtle nds-dropmenu-trigger" aria-label="Row actions">
                                                    <i class="hgi hgi-stroke hgi-more-horizontal-circle-01"></i>
                                                </button>
                                                <div class="nds-dropmenu-menu" hidden>
                                                    <div class="nds-dropmenu-scroll">
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                            <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                            <span class="nds-label">Edit</span>
                                                        </button>
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                                            <span class="nds-label">Duplicate</span>
                                                        </button>
                                                        <hr class="nds-divider">
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                            <span class="nds-label">Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Layla Al-Qahtani</td>
                                        <td>Viewer</td>
                                        <td><span class="nds-tag nds-sm" data-status="error"><span class="nds-label">Offline</span></span></td>
                                        <td>
                                            <div class="nds-dropmenu" data-portal>
                                                <button class="nds-btn nds-sm nds-subtle nds-dropmenu-trigger" aria-label="Row actions">
                                                    <i class="hgi hgi-stroke hgi-more-horizontal-circle-01"></i>
                                                </button>
                                                <div class="nds-dropmenu-menu" hidden>
                                                    <div class="nds-dropmenu-scroll">
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                            <i class="hgi hgi-stroke hgi-edit-02"></i>
                                                            <span class="nds-label">Edit</span>
                                                        </button>
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                                            <span class="nds-label">Duplicate</span>
                                                        </button>
                                                        <hr class="nds-divider">
                                                        <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                                                            <span class="nds-label">Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-table-1" id="tab-dropmenu-table-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-table-1" aria-labelledby="tab-dropmenu-table-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;table class="nds-table"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Role&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
      &lt;th&gt;&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Nora Al-Zahrani&lt;/td&gt;
      &lt;td&gt;Administrator&lt;/td&gt;
      &lt;td&gt;
        &lt;span class="nds-tag nds-sm" data-status="success"&gt;
          &lt;span class="nds-label"&gt;Active&lt;/span&gt;
        &lt;/span&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;!-- data-portal: escape the table cell's clipping/stacking context
             so the menu can extend beyond the row when opened. --&gt;
        &lt;div class="nds-dropmenu" data-portal&gt;
          &lt;button class="nds-btn nds-sm nds-subtle nds-dropmenu-trigger"
            aria-label="Row actions"&gt;
            &lt;i class="hgi hgi-stroke hgi-more-horizontal-circle-01"&gt;&lt;/i&gt;
          &lt;/button&gt;
          &lt;div class="nds-dropmenu-menu" hidden&gt;
            &lt;div class="nds-dropmenu-scroll"&gt;
              &lt;button class="nds-btn nds-subtle nds-dropmenu-item"&gt;
                &lt;i class="hgi hgi-stroke hgi-edit-02"&gt;&lt;/i&gt;
                &lt;span class="nds-label"&gt;Edit&lt;/span&gt;
              &lt;/button&gt;
              &lt;button class="nds-btn nds-subtle nds-dropmenu-item"&gt;
                &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
                &lt;span class="nds-label"&gt;Duplicate&lt;/span&gt;
              &lt;/button&gt;
              &lt;hr class="nds-divider"&gt;
              &lt;button class="nds-btn nds-subtle nds-dropmenu-item
                nds-destructive"&gt;
                &lt;i class="hgi hgi-stroke hgi-delete-02"&gt;&lt;/i&gt;
                &lt;span class="nds-label"&gt;Delete&lt;/span&gt;
              &lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
    &lt;!-- more rows... --&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
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

<!-- Select Mode Dropmenu -->
<section id="dropmenuSelectMode" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Select Mode</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-select-name</code> to turn a dropmenu into a value picker. Each item needs <code class="nds-inline-code lang-html">data-value</code>; the chosen value is written to a hidden input so the selection ships with a form. The trigger label updates to reflect the current selection.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu" data-select-name="priority" data-select-value="medium">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-toggle-on" aria-hidden="true"></i>
                                    <span class="nds-label">Medium</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="low">
                                            <span class="nds-label">Low</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="medium">
                                            <span class="nds-label">Medium</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="high">
                                            <span class="nds-label">High</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="critical">
                                            <span class="nds-label">Critical</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-select-1" id="tab-dropmenu-select-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-dropmenu-select-js" id="tab-dropmenu-select-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-select-1" aria-labelledby="tab-dropmenu-select-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;!-- data-select-name: field name for the hidden input
     data-select-value: pre-select "medium" on init --&gt;
&lt;div class="nds-dropmenu"
  data-select-name="priority"
  data-select-value="medium"&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-toggle-on" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Medium&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-value="low"&gt;
        &lt;span class="nds-label"&gt;Low&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-value="medium"&gt;
        &lt;span class="nds-label"&gt;Medium&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-value="high"&gt;
        &lt;span class="nds-label"&gt;High&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-value="critical"&gt;
        &lt;span class="nds-label"&gt;Critical&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel"
                                    id="panel-dropmenu-select-js" aria-labelledby="tab-dropmenu-select-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// nds:dropmenu:selected fires on the wrapper when an item is chosen.
// detail: { dropmenu, item, value }
document.querySelector('.nds-dropmenu').addEventListener('nds:dropmenu:selected', (e) =&gt; {
    console.log('Selected:', e.detail.value);
});

// The hidden input also fires a native `change` event so the selection
// integrates with standard form libraries and submit handlers.
</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Delayed-open / Lazy-load Dropmenu -->
<section id="dropmenuDelayed" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Delayed-open (Lazy Load)</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-delay="&lt;ms&gt;"</code> to defer menu content until first open. On the first trigger click the button shows a loading state for the specified delay, fires <code class="nds-inline-code lang-js">nds:dropmenu:prepare</code> so you can populate the menu, then opens. Subsequent opens skip the delay.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu" id="demo-lazy-dropmenu" data-delay="1200">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-list-view" aria-hidden="true"></i>
                                    <span class="nds-label">Load items</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <!-- Populated by nds:dropmenu:prepare handler -->
                                    </div>
                                </div>
                            </div>
                            <script>
                            (function() {
                                var el = document.getElementById('demo-lazy-dropmenu');
                                if (!el) return;
                                el.addEventListener('nds:dropmenu:prepare', function(e) {
                                    var scroll = e.detail.menu.querySelector('.nds-dropmenu-scroll');
                                    if (!scroll || scroll.children.length) return;
                                    ['Dashboard', 'Reports', 'Analytics', 'Settings'].forEach(function(label) {
                                        var btn = document.createElement('button');
                                        btn.className = 'nds-btn nds-subtle nds-dropmenu-item';
                                        btn.innerHTML = '<span class="nds-label">' + label + '</span>';
                                        scroll.appendChild(btn);
                                    });
                                });
                            })();
                            </script>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-delayed-1" id="tab-dropmenu-delayed-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-dropmenu-delayed-js" id="tab-dropmenu-delayed-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dropmenu-delayed-1" aria-labelledby="tab-dropmenu-delayed-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;!-- data-delay="1200": show loading state for 1200ms on first open,
     fire nds:dropmenu:prepare, then open. One-shot; removed after first use. --&gt;
&lt;div class="nds-dropmenu" id="my-lazy-dropmenu" data-delay="1200"&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-list-view" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Load items&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;!-- Populated by nds:dropmenu:prepare handler --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel"
                                    id="panel-dropmenu-delayed-js" aria-labelledby="tab-dropmenu-delayed-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// nds:dropmenu:prepare fires after the loading state, before the menu opens.
// Build and insert items into the menu here.
// detail: { dropmenu, trigger, menu, isOpen }
document.getElementById('my-lazy-dropmenu').addEventListener('nds:dropmenu:prepare', (e) =&gt; {
    const scroll = e.detail.menu.querySelector('.nds-dropmenu-scroll');
    if (scroll.children.length) return; // already populated (fast double-click guard)

    const items = ['Dashboard', 'Reports', 'Analytics', 'Settings'];
    items.forEach(label =&gt; {
        const btn = document.createElement('button');
        btn.className = 'nds-btn nds-subtle nds-dropmenu-item';
        btn.innerHTML = `&lt;span class="nds-label"&gt;${label}&lt;/span&gt;`;
        scroll.appendChild(btn);
    });
});
</code>
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
<section id="dropmenuFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-menu-11"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Dropmenus initialize automatically on page load and can be dynamically reinitialized using <code class="nds-inline-code lang-js">NDS.Dropmenu.reinit()</code> for content added after initial load.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-location-star-01"></i>
                        <span class="nds-label">Smart Positioning</span>
                    </span>
                    <p class="nds-item-desc">Menus stay fully visible regardless of where the trigger sits on the page, flipping direction when near screen edges.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Full keyboard support with arrow keys, Home, End, Tab, Escape, and special handling for input fields inside menus using Alt+Arrow combinations.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-user"></i>
                        <span class="nds-label">Accessibility</span>
                    </span>
                    <p class="nds-item-desc">ARIA roles and states are applied automatically, and animations respect the user's reduced-motion preference.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-settings-02"></i>
                        <span class="nds-label">Data Attributes</span>
                    </span>
                    <p class="nds-item-desc">Menu items with <code class="nds-inline-code lang-html">data-no-auto-close</code> stay open on click, letting users interact with checkboxes, inputs, and filter controls without interruption.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code-circle"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Programmatic control with instance methods <code class="nds-inline-code lang-js">open()</code>, <code class="nds-inline-code lang-js">close()</code>, <code class="nds-inline-code lang-js">toggle()</code>, and custom events for state changes.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="dropmenuGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use dropmenus for action lists when screen space is limited and actions don't need to be immediately visible</li>
                    <li>Use for <strong>contextual actions</strong> that apply to a specific item, like row-level edit, delete, or share</li>
                    <li>Use for <strong>secondary navigation</strong> that doesn't need permanent visibility, like account or settings links</li>
                    <li>Use with <code class="nds-inline-code lang-html">data-no-auto-close</code> for <strong>filter panels</strong> where users select multiple options before closing</li>
                    <li>Group related actions together and use <code class="nds-inline-code lang-html">&lt;hr class="nds-divider"&gt;</code> to separate action groups</li>
                    <li>Keep menus focused with 3-8 items. If you need more, consider restructuring into multiple menus or a different pattern</li>
                    <li>Icons are optional but recommended for faster visual scanning when actions have clear iconic representations</li>
                    <li>Don't use for primary navigation that should always be visible. Use the Header or Side Nav instead</li>
                    <li>Don't use for a single toggle action. A Switch or standalone Button is simpler</li>
                    <li>Don't use for complex multi-step forms. Use a Modal or Drawer for more space</li>

                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-destructive</code></td>
                            <td>Applies destructive (red) styling to a menu item. Place destructive actions last in the menu for visual separation.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-dropmenu-footer</code></td>
                            <td>Sticky footer area that stays visible while the menu content scrolls. Place outside <code class="nds-inline-code lang-html">.nds-dropmenu-scroll</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-dropmenu-action</code></td>
                            <td>Action bar inside the footer for buttons like Clear and Apply. Combine with <code class="nds-inline-code lang-html">nds-grid</code> for side-by-side layout.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-dropmenu-group</code></td>
                            <td>Groups form controls or related items inside the menu with consistent spacing.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Element</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-no-auto-close</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu-item</code></td>
                            <td>Prevents the menu from closing when that item is clicked. Use for checkboxes, inputs, and filter controls that need multiple interactions.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-portal</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Moves the menu to <code class="nds-inline-code lang-html">&lt;body&gt;</code> on open. Use only when the menu must escape an ancestor stacking context (a card or modal with <code class="nds-inline-code lang-html">z-index</code>, a transformed wrapper). The portaled menu uses <code class="nds-inline-code lang-html">position: fixed</code> and tracks its trigger on scroll (rAF-throttled) so it stays anchored without closing.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-anchor-cursor</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Anchors the menu horizontally to the click position, opening it under the cursor like a context menu. Useful for wide triggers where the default trigger-centered placement feels disconnected from the click. Applies to mouse clicks only; keyboard and programmatic opens fall back to trigger-center.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-select-name="&lt;name&gt;"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Turns the dropmenu into a value picker. A hidden <code class="nds-inline-code lang-html">&lt;input name="..."&gt;</code> is appended so the selection ships with the enclosing form. Each selectable item must carry <code class="nds-inline-code lang-html">data-value</code>. Fires <code class="nds-inline-code lang-js">nds:dropmenu:selected</code> on selection.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-select-value="&lt;value&gt;"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Pre-selects the item whose <code class="nds-inline-code lang-html">data-value</code> matches. Takes priority over any <code class="nds-inline-code lang-html">data-state~="selected"</code> pre-rendered on an item. Only meaningful when <code class="nds-inline-code lang-html">data-select-name</code> is also set.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-required</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Adds <code class="nds-inline-code lang-html">required</code> to the hidden input created by <code class="nds-inline-code lang-html">data-select-name</code>, making the field participate in native form validation.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-value="&lt;value&gt;"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu-item</code></td>
                            <td>The submitted value for this item when the dropmenu is in select mode (<code class="nds-inline-code lang-html">data-select-name</code>). Items without <code class="nds-inline-code lang-html">data-value</code> do not trigger selection.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-trigger-label="&lt;text&gt;"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu-item</code></td>
                            <td>Custom short label written to the trigger button when this item is selected. Falls back to the item's <code class="nds-inline-code lang-html">.nds-label</code> text. Useful when the menu row is descriptive ("Saudi Arabia (+966)") but the trigger slot needs something compact ("+966").</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-dropmenu-primary</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu-item</code></td>
                            <td>Marks a menu item as the primary action. When the user presses Enter on a non-actionable menu element (not a button or anchor), the first non-disabled item with this attribute is clicked. Use to provide a default action on Enter inside embedded form controls.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-dropmenu-no-click</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Disables the trigger click handler so the dropmenu can only be opened programmatically (via <code class="nds-inline-code lang-js">instance.open()</code> or <code class="nds-inline-code lang-js">instance.toggle()</code>). Used by components like the date-picker that control open timing themselves.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-dropmenu-no-keys</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Disables the built-in keyboard navigation (ArrowDown/Up, Home, End, Tab) on the trigger and menu. Escape-to-close remains active. Use when a parent component owns its own keyboard handling (for example, a 2D grid like the date-picker's day cells).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-delay="&lt;ms&gt;"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu</code></td>
                            <td>Enables delayed first-open (lazy-load) mode. On first trigger click the trigger shows a loading state for <code class="nds-inline-code lang-html">&lt;ms&gt;</code> milliseconds, fires <code class="nds-inline-code lang-js">nds:dropmenu:prepare</code> so a consumer can populate the menu, then opens. One-shot: the attribute is removed after the first open so subsequent opens are immediate.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Positioning &amp; Portal</h3>
                <p>By default the menu uses <code class="nds-inline-code lang-html">position: absolute</code> anchored to its wrapper. It scrolls with the trigger like a native <code class="nds-inline-code lang-html">&lt;select&gt;</code> — no close-on-scroll, no DOM reparenting. Initial placement is viewport-aware: the menu flips above the trigger when space below is tight, and clamps horizontally so it never overflows the viewport.</p>
                <p>Add <code class="nds-inline-code lang-html">data-portal</code> to the wrapper only when the menu needs to escape an ancestor stacking context (a card or modal with <code class="nds-inline-code lang-html">z-index</code>, a transformed or filtered wrapper). Portaled menus use <code class="nds-inline-code lang-html">position: fixed</code> at <code class="nds-inline-code lang-html">&lt;body&gt;</code> level and follow the trigger on scroll (rAF-throttled) instead of closing.</p>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--menu-padding</code></td>
                            <td>8px</td>
                            <td>Inner padding of the menu container. Set on the <code class="nds-inline-code lang-html">.nds-dropmenu</code> wrapper; JS snapshots the value onto the menu before portaling so it survives a DOM move to <code class="nds-inline-code lang-html">&lt;body&gt;</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--dropmenu-width</code></td>
                            <td><code class="nds-inline-code lang-html">min-content</code></td>
                            <td>Explicit width of the menu. By default the menu sizes to its content. Set to a fixed value (e.g. <code class="nds-inline-code lang-html">240px</code>) to lock the width regardless of content.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--dropmenu-min-width</code></td>
                            <td><code class="nds-inline-code lang-html">max-content</code></td>
                            <td>Minimum width of the menu. Defaults to <code class="nds-inline-code lang-html">max-content</code> so the menu never wraps its widest item. Override inline or via CSS to enforce a fixed floor.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--dropmenu-max-width</code></td>
                            <td><code class="nds-inline-code lang-html">calc(100vw - 16px)</code></td>
                            <td>Maximum width of the menu. Defaults to near-full-viewport to prevent overflow on narrow screens. Override to constrain wide menus.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--dropmenu-slide</code></td>
                            <td>8px</td>
                            <td>Distance the menu slides during open/close animation. The direction reverses automatically when the menu flips above the trigger.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
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

// ── Static helpers ─────────────────────────────────────────
// Walk up from any descendant (including portaled menus) to the wrapper
const wrapper = NDS.Dropmenu.from(someChildElement);

// Get the menu element for a wrapper (portal-aware)
const menu = NDS.Dropmenu.menuOf(wrapper);

// ── Instance methods ───────────────────────────────────────
// Access instance via element.ndsDropmenu
const dropmenu = document.querySelector('.nds-dropmenu');
const instance = dropmenu.ndsDropmenu;

instance.open();    // Open the menu
instance.close();   // Close the menu
instance.toggle();  // Toggle open/closed state
instance.destroy(); // Remove listeners and replace the DOM node (external references will be invalidated)

// ── Events ─────────────────────────────────────────────────
// Listen for state changes
document.addEventListener('nds:dropmenu:opened', (e) =&gt; {
    // e.detail: { dropmenu, trigger, menu, isOpen }
    console.log('Menu opened:', e.detail.dropmenu);
});

document.addEventListener('nds:dropmenu:closed', (e) =&gt; {
    // e.detail: { dropmenu, trigger, menu, isOpen }
    console.log('Menu closed:', e.detail.dropmenu);
});

// Fired when a select-mode item is chosen (data-select-name dropmenu)
document.addEventListener('nds:dropmenu:selected', (e) =&gt; {
    // e.detail: { dropmenu, item, value }
    console.log('Selected value:', e.detail.value, 'Item:', e.detail.item);
});

// Fired during delayed-first-open (data-delay) after the loading state,
// before the menu opens. Populate menu content here.
document.querySelector('.nds-dropmenu').addEventListener('nds:dropmenu:prepare', (e) =&gt; {
    // e.detail: { dropmenu, trigger, menu, isOpen }
    const menu = e.detail.menu;
    // Build and insert items into menu now
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
