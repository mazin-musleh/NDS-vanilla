---
layout: page
title: Dropmenu
hero_title: Dropmenu - National Design System
hero_description: A toggle-activated menu for presenting actions, navigation links, or filter controls in a compact overlay
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
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
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                <div class="nds-dropmenu-menu" hidden style="min-width: 220px;">
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
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
  &lt;div class="nds-dropmenu-menu" hidden style="min-width: 220px;"&gt;
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
            <p class="nds-section-description">Row-level action menus work inside tables without being clipped by the table's rounded corners or overflow boundary. The menu auto-detects the clipping ancestor and switches to viewport-anchored positioning; scroll or resize dismisses the menu.</p>
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
                                            <div class="nds-dropmenu">
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
                                            <div class="nds-dropmenu">
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
                                            <div class="nds-dropmenu">
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
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-dropmenu-table-1" id="tab-dropmenu-table-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
        &lt;div class="nds-dropmenu"&gt;
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

<!-- Built-in Features -->
<section id="dropmenuFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
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
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-no-auto-close</code></td>
                            <td>Set on a <code class="nds-inline-code lang-html">.nds-dropmenu-item</code> to prevent the menu from closing when that item is clicked. Use for checkboxes, inputs, and filter controls that need multiple interactions.</td>
                        </tr>
                    </tbody>
                </table>
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
                            <td>Inner padding of the menu container</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--dropmenu-min-width</code></td>
                            <td>150px</td>
                            <td>Minimum width of the menu. Override inline or via CSS to fit your content.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--dropmenu-slide</code></td>
                            <td>8px</td>
                            <td>Distance the menu slides during open/close animation</td>
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
