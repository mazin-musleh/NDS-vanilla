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
                            <div class="nds-dropmenu-menu">
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
                <div class="nds-tabs nds-code withDivider">
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
                                  <div class="nds-dropmenu-menu">
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
                            <div class="nds-dropmenu-menu">
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
                <div class="nds-tabs nds-code withDivider">
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
                                    <div class="nds-dropmenu-menu">
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
                            </code>
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
                            <div class="nds-dropmenu-menu">
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
                <div class="nds-tabs nds-code withDivider">
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
                                  <div class="nds-dropmenu-menu">
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
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for using dropmenu components</p>
        </div>
        <div class="nds-section-content">
            <div class="guidelines-grid">
                <div class="guideline-item">
                    <h3>When to Use</h3>
                    <ul>
                        <li>Action menus with multiple options</li>
                        <li>Navigation dropdowns</li>
                        <li>Context menus</li>
                        <li>Settings and preferences</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Accessibility</h3>
                    <ul>
                        <li>Uses proper ARIA attributes (<code>aria-expanded</code>, <code>aria-haspopup</code>)</li>
                        <li>Keyboard navigable (Arrow keys, Enter, Space, Escape)</li>
                        <li>Focus management and visible focus states</li>
                        <li>Screen reader compatible with <code>role="menu"</code></li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Best Practices</h3>
                    <ul>
                        <li>Use icons to improve scannability</li>
                        <li>Group related items with dividers</li>
                        <li>Use destructive style for dangerous actions</li>
                        <li>Keep menu items concise and clear</li>
                        <li>Limit menu items to 7-10 for usability</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Behavior</h3>
                    <ul>
                        <li>Closes on clicking outside the menu</li>
                        <li>Closes on selecting a menu item</li>
                        <li>Closes on pressing Escape key</li>
                        <li>Supports RTL and LTR layouts</li>
                    </ul>
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
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Required Classes</div>
                </div>
                <div class="nds-tabs nds-code withDivider">
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
• .nds-dropmenu-item - Individual menu items (button or anchor)
  └─ Use with .nds-btn .nds-subtle for standard button styling
• .nds-dropmenu-divider - Horizontal divider (hr element)

Optional Modifiers:

• .nds-destructive - For dangerous/destructive actions (red styling)
• .open - Added automatically when menu is open
• .align-left - Menu aligns to left edge of trigger
• .align-right - Menu aligns to right edge of trigger
• .align-center - Menu centers under trigger
• .top - Menu opens upward instead of downward
• .wide - Wider menu (200px min-width)
• .narrow - Narrower menu (120px min-width)
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>