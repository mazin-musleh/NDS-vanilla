---
layout: page
title: Dropmenu
hero_title: Dropmenu Component - National Design System
hero_description: Unified dropdown menu component for consistent dropdown patterns with accessibility support
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Basic Dropmenu -->
<section id="basicDropmenu" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Dropmenu</h2>
            <p class="nds-section-description">Standard dropdown menu with multiple items</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Dropmenu with Icons</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
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
                                    <hr class="nds-dropmenu-divider">
                                    <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                        <i class="hgi hgi-stroke hgi-delete-02"></i>
                                        <span class="label">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-basic-1" id="tab-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
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
                                      <hr class="nds-dropmenu-divider">
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

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Simple Dropmenu (No Icons)</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-dropmenu">
                            <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                <span class="label">Options</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                                        <span class="label">Option 1</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                                        <span class="label">Option 2</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                                        <span class="label">Option 3</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-simple-1" id="tab-simple-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-simple-1"
                            aria-labelledby="tab-simple-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-dropmenu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                        <span class="label">Options</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                <span class="label">Option 1</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                <span class="label">Option 2</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item">
                                                <span class="label">Option 3</span>
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
</section>

<!-- Dropmenu with Links -->
<section id="linksDropmenu" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dropmenu with Links</h2>
            <p class="nds-section-description">Dropdown menu using anchor tags for navigation</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Navigation Dropmenu</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
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
                                        <i class="hgi hgi-stroke hgi-user-01"></i>
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
                                    <hr class="nds-dropmenu-divider">
                                    <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                        <i class="hgi hgi-stroke hgi-log-out-01"></i>
                                        <span class="label">Sign out</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-links-1" id="tab-links-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-links-1"
                            aria-labelledby="tab-links-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-dropmenu">
                                  <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <span class="label">Account</span>
                                    <i class="hgi hgi-stroke hgi-user-circle"></i>
                                  </button>
                                  <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                        <i class="hgi hgi-stroke hgi-user-01"></i>
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
                                      <hr class="nds-dropmenu-divider">
                                      <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                        <i class="hgi hgi-stroke hgi-log-out-01"></i>
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
</section>

<!-- Component Structure -->
<section id="componentStructure" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Component Structure</h2>
            <p class="nds-section-description">Required classes and structure</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Required Classes</div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-structure-1" id="tab-structure-1">
                                <span class="nds-tab-label">Structure</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-structure-1"
                            aria-labelledby="tab-structure-1">
                            <code class="lang-text code">
Required Classes:

• .nds-dropmenu - Container wrapper
• .nds-dropmenu-trigger - Button to open/close menu
  └─ Use with .nds-btn .nds-subtle for standard styling
• .nds-dropmenu-menu - Dropdown menu container
• .nds-dropmenu-scroll - Scrollable container for menu items
• .nds-dropmenu-item - Individual menu items (button or anchor)
  └─ Use with .nds-btn .nds-subtle for standard button styling
• .nds-dropmenu-divider - Horizontal divider (hr element)
• .nds-dropmenu-footer - Footer container for action buttons
  └─ Contains divider + .nds-dropmenu-action

Optional Modifiers:

• .nds-destructive - For dangerous/destructive actions (red styling)
• .open - Added automatically when menu is open
• .align-left - Menu aligns to left edge of trigger
• .align-right - Menu aligns to right edge of trigger
• .align-center - Menu centers under trigger
• .top - Menu opens upward instead of downward
• .wide - Wider menu (200px min-width)
• .narrow - Narrower menu (120px min-width)

Data Attributes:

• data-no-auto-close - Prevent menu from closing when item is clicked
  └─ Use on items that should keep the menu open (filters, settings)
                            </code>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Prevent Auto-Close -->
<section id="preventAutoClose" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Prevent Auto-Close</h2>
            <p class="nds-section-description">Keep the menu open when clicking certain items using data-no-auto-close. Common use case: filter dropdowns with search, checkboxes, and action buttons.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Filter Menu (No Auto-Close)</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
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
                            <div class="nds-filter nds-dropmenu-menu" style="min-width: 300px;">
                                <div class="nds-dropmenu-scroll">
                                <!-- Search Input -->
                                <div class="nds-form-control nds-dropmenu-item" data-filter="search" data-no-auto-close>
                                    <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                                    <input type="text" placeholder="Search..." class="nds-search-input">
                                    <div class="nds-form-action">
                                        <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear search">
                                            <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                        </button>
                                    </div>
                                </div>
                                <hr class="nds-dropmenu-divider nds-lg">
                                <!-- Filter Options -->
                                <fieldset class="nds-dropmenu-item nds-check-group" data-filter="tags" data-no-auto-close>
                                    <legend class="label">Filter by category</legend>
                                    <div class="nds-form-container nds-check-container">
                                        <div class="nds-form-header">
                                            <label for="demo-cat1">
                                                <span class="label">Category 1</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <input type="checkbox" id="demo-cat1" name="demo-cat" value="category1" class="nds-check">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-check-container">
                                        <div class="nds-form-header">
                                            <label for="demo-cat2">
                                                <span class="label">Category 2</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <input type="checkbox" id="demo-cat2" name="demo-cat" value="category2" class="nds-check">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-check-container">
                                        <div class="nds-form-header">
                                            <label for="demo-cat3">
                                                <span class="label">Category 3</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <input type="checkbox" id="demo-cat3" name="demo-cat" value="category3" class="nds-check">
                                        </div>
                                    </div>
                                </fieldset>
                                </div>
                                <div class="nds-dropmenu-footer">
                                    <hr class="nds-dropmenu-divider nds-lg">
                                    <!-- Action Buttons -->
                                    <div class="nds-dropmenu-action nds-grid">
                                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear" data-no-auto-close>
                                            <span class="label">Clear</span>
                                        </button>
                                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
                                            <span class="label">Apply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-noclose-1" id="tab-noclose-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-noclose-1"
                            aria-labelledby="tab-noclose-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<div class="nds-dropmenu">
  <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
    <i class="hgi hgi-stroke hgi-filter icon"></i>
    <span class="label">Filter</span>
  </button>
  <div class="nds-filter nds-dropmenu-menu" data-filter-target="target-container-id" style="min-width: 300px;">
    <div class="nds-dropmenu-scroll">
      <!-- Search Input -->
      <div class="nds-form-control nds-dropmenu-item" data-filter="search" data-no-auto-close>
        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
        <input type="text" placeholder="Search..." class="nds-search-input">
        <div class="nds-form-action">
          <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear search">
            <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
          </button>
        </div>
      </div>
      <hr class="nds-dropmenu-divider nds-lg">
      <!-- Filter Options -->
      <fieldset class="nds-dropmenu-item nds-check-group" data-filter="tags" data-no-auto-close>
        <legend class="label">Filter by category</legend>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-header">
            <label for="cat1"><span class="label">Category 1</span></label>
          </div>
          <div class="nds-form-control">
            <input type="checkbox" id="cat1" name="cat" value="category1" class="nds-check">
          </div>
        </div>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-header">
            <label for="cat2"><span class="label">Category 2</span></label>
          </div>
          <div class="nds-form-control">
            <input type="checkbox" id="cat2" name="cat" value="category2" class="nds-check">
          </div>
        </div>
      </fieldset>
    </div>
    <div class="nds-dropmenu-footer">
      <hr class="nds-dropmenu-divider nds-lg">
      <!-- Action Buttons -->
      <div class="nds-dropmenu-action nds-grid">
        <!-- Clear: keeps menu open (data-no-auto-close) -->
        <button class="nds-btn nds-secondary nds-dropmenu-item" data-filter-action="clear" data-no-auto-close>
          <span class="label">Clear</span>
        </button>
        <!-- Apply: closes menu (no data-no-auto-close) -->
        <button class="nds-btn nds-primary nds-dropmenu-item" data-filter-action="apply">
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
</section>

<!-- JavaScript API -->
<section id="dropmenuAPI" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">JavaScript API</h2>
            <p class="nds-section-description">Programmatic control and event handling</p>
        </div>
        <div class="nds-section-content">

            <h3>Overview</h3>

            <p>The <strong>NDSDropmenu</strong> component auto-initializes on page load. You can also manually create instances and control dropmenus programmatically.</p>

            <h3>Initialization</h3>

            <p>Dropmenus are automatically initialized when the page loads. For dynamically added content, call <strong>NDSDropmenu.reinit()</strong> to initialize new dropmenus.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Auto-initialization happens on page load

// Reinitialize after adding new dropmenus dynamically
NDSDropmenu.reinit();

// Manually create a dropmenu instance
const element = document.querySelector('.nds-dropmenu');
const instance = NDSDropmenu.create(element);
                </code>
                </div>
            </div>

            <h3>Methods</h3>

            <p>Each dropmenu instance exposes the following methods:</p>

            <table class="nds-table nds-responsive" style="--min-width:600px;">
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>open()</td>
                        <td>Opens the dropdown menu</td>
                    </tr>
                    <tr>
                        <td>close()</td>
                        <td>Closes the dropdown menu</td>
                    </tr>
                    <tr>
                        <td>toggle()</td>
                        <td>Toggles the dropdown menu open/closed state</td>
                    </tr>
                    <tr>
                        <td>destroy()</td>
                        <td>Removes event listeners and cleans up the instance</td>
                    </tr>
                </tbody>
            </table>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Get the dropmenu instance
const dropmenu = document.querySelector('.nds-dropmenu');
const instance = dropmenu.ndsDropmenuInstance;

// Programmatic control
instance.open();   // Open the menu
instance.close();  // Close the menu
instance.toggle(); // Toggle open/close

// Clean up when removing from DOM
instance.destroy();
                </code>
                </div>
            </div>

            <h3>Events</h3>

            <p>Dropmenus dispatch custom events that you can listen for:</p>

            <table class="nds-table nds-responsive" style="--min-width:600px;">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Description</th>
                        <th>Detail Properties</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>nds:dropmenu:opened</td>
                        <td>Fired when the menu opens</td>
                        <td>dropmenu, trigger, menu, isOpen</td>
                    </tr>
                    <tr>
                        <td>nds:dropmenu:closed</td>
                        <td>Fired when the menu closes</td>
                        <td>dropmenu, trigger, menu, isOpen</td>
                    </tr>
                </tbody>
            </table>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Listen for dropmenu events
document.addEventListener('nds:dropmenu:opened', (e) => {
    console.log('Menu opened:', e.detail.dropmenu);
    console.log('Trigger:', e.detail.trigger);
});

document.addEventListener('nds:dropmenu:closed', (e) => {
    console.log('Menu closed:', e.detail.dropmenu);
});

// Listen on a specific dropmenu
const dropmenu = document.querySelector('#my-dropmenu');
dropmenu.addEventListener('nds:dropmenu:opened', (e) => {
    // Handle this specific menu opening
});
                </code>
                </div>
            </div>

            <h3>Data Attributes</h3>

            <table class="nds-table nds-responsive" style="--min-width:600px;">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Element</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>data-no-auto-close</td>
                        <td>.nds-dropmenu-item or child elements</td>
                        <td>Prevents menu from closing when this item is clicked. Useful for filter checkboxes, settings toggles, or any interactive content that shouldn't dismiss the menu.</td>
                    </tr>
                    <tr>
                        <td>data-nds-dropmenu-initialized</td>
                        <td>.nds-dropmenu</td>
                        <td>Automatically added after initialization. Prevents duplicate initialization.</td>
                    </tr>
                </tbody>
            </table>

            <h3>Keyboard Navigation</h3>

            <p>The dropmenu component supports full keyboard navigation for accessibility:</p>

            <table class="nds-table nds-responsive" style="--min-width:600px;">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Enter / Space</td>
                        <td>Toggle menu open/close (on trigger), activate item (in menu)</td>
                    </tr>
                    <tr>
                        <td>Escape</td>
                        <td>Close the menu and return focus to trigger</td>
                    </tr>
                    <tr>
                        <td>Arrow Down</td>
                        <td>Open menu (on trigger), move to next item (in menu)</td>
                    </tr>
                    <tr>
                        <td>Arrow Up</td>
                        <td>Open menu and focus last item (on trigger), move to previous item (in menu)</td>
                    </tr>
                    <tr>
                        <td>Home</td>
                        <td>Move to first menu item</td>
                    </tr>
                    <tr>
                        <td>End</td>
                        <td>Move to last menu item</td>
                    </tr>
                    <tr>
                        <td>Tab</td>
                        <td>Navigate between focusable elements in the menu</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</section>