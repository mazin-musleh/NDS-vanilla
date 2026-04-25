---
layout: page
title: Persona
hero_title: Persona - National Design System
hero_description: An identity block that presents a person's name, role, and supporting detail with an optional avatar and action row. Use it in navigation menus, profile pages, team directories, or wherever a person's context and available actions need to appear together.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Overview -->
<section id="personaOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Persona</h2>
            <p class="nds-section-description">Three size tiers scale the avatar and all text slots together. The centered layout modifier suits profile card contexts. Add an action row only when account or contact actions are directly relevant.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-persona", "personaSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-persona", "personaSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-persona", "personaSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-colView", ".nds-persona", "personaLayout"]'>
                                <span class="nds-label">Column</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-persona", "personaAlign"]'>
                                <span class="nds-label">Centered</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-persona">
                                <div class="nds-avatar">
                                    <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                                </div>
                                <div class="nds-persona-info">
                                    <span class="nds-persona-name">Ahmed Mohammed</span>
                                    <span class="nds-persona-role nds-truncate">System Administrator</span>
                                    <span class="nds-persona-desc">ahmed@example.gov.sa</span>
                                </div>
                                <hr class="nds-divider">
                                <div class="nds-persona-action">
                                    <a href="#" class="nds-btn nds-subtle nds-dropdown-item">
                                        <i class="nds-icon nds-hgi-identity-card" aria-hidden="true"></i>
                                        <span class="nds-label">Portal</span>
                                    </a>
                                    <a href="#" class="nds-btn nds-subtle nds-dropdown-item">
                                        <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                        <span class="nds-label">Change Password</span>
                                    </a>
                                    <a href="#" class="nds-btn nds-subtle nds-dropdown-item">
                                        <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                                        <span class="nds-label">Change Number</span>
                                    </a>
                                    <a href="#" class="nds-btn nds-subtle nds-destructive nds-dropdown-item">
                                        <i class="nds-icon nds-hgi-door-01" aria-hidden="true"></i>
                                        <span class="nds-label">Logout</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-persona-overview-1" id="tab-persona-overview-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-persona-overview-1"
                                    aria-labelledby="tab-persona-overview-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-persona"&gt;
  &lt;div class="nds-avatar"&gt;
    &lt;i class="nds-icon nds-icon-avatar" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/div&gt;
  &lt;div class="nds-persona-info"&gt;
    &lt;span class="nds-persona-name"&gt;Ahmed Mohammed&lt;/span&gt;
    &lt;span class="nds-persona-role nds-truncate"&gt;System Administrator&lt;/span&gt;
    &lt;span class="nds-persona-desc"&gt;ahmed@example.gov.sa&lt;/span&gt;
  &lt;/div&gt;
  &lt;hr class="nds-divider"&gt;
  &lt;div class="nds-persona-action"&gt;
    &lt;a href="#" class="nds-btn nds-subtle nds-dropdown-item"&gt;
      &lt;i class="nds-icon nds-hgi-identity-card" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Portal&lt;/span&gt;
    &lt;/a&gt;
    &lt;a href="#" class="nds-btn nds-subtle nds-dropdown-item"&gt;
      &lt;i class="nds-icon nds-hgi-lock-password" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Change Password&lt;/span&gt;
    &lt;/a&gt;
    &lt;a href="#" class="nds-btn nds-subtle nds-dropdown-item"&gt;
      &lt;i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Change Number&lt;/span&gt;
    &lt;/a&gt;
    &lt;a href="#" class="nds-btn nds-subtle nds-destructive nds-dropdown-item"&gt;
      &lt;i class="nds-icon nds-hgi-door-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Logout&lt;/span&gt;
    &lt;/a&gt;
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

<!-- With Details -->
<section id="personaDetails" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">With Details</h2>
            <p class="nds-section-description">Swap the action row for a <a class="nds-color" href="{{ 'components/definition-list' | relative_url }}">Definition List</a> to present contact fields, attributes, or metadata. Suits profile cards and team directory tiles where viewing identity matters more than acting on it.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-persona", "personaDetailsSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-persona", "personaDetailsSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-persona", "personaDetailsSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-colView", ".nds-persona", "personaDetailsLayout"]'>
                                <span class="nds-label">Column</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-persona", "personaDetailsAlign"]'>
                                <span class="nds-label">Centered</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-persona">
                                <div class="nds-avatar">
                                    <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                                </div>
                                <div class="nds-persona-info">
                                    <span class="nds-persona-name">Ahmed Mohammed</span>
                                    <span class="nds-persona-role nds-truncate">System Administrator</span>
                                    <span class="nds-persona-desc">ahmed@example.gov.sa</span>
                                </div>
                                <hr class="nds-divider">
                                <dl class="nds-definition-list nds-divided nds-grid" style="flex: 1 100%; --max-col:2; --mid-col:2; --min-col:1;">
                                    <div class="nds-definition-item">
                                        <dt>
                                            <i class="hgi hgi-stroke hgi-building-02"></i>
                                            <span class="nds-label">Department</span>
                                        </dt>
                                        <dd>Digital Services</dd>
                                    </div>
                                    <div class="nds-definition-item">
                                        <dt>
                                            <i class="hgi hgi-stroke hgi-id"></i>
                                            <span class="nds-label">Employee ID</span>
                                        </dt>
                                        <dd>DGA-4827</dd>
                                    </div>
                                    <div class="nds-definition-item">
                                        <dt>
                                            <i class="hgi hgi-stroke hgi-location-01"></i>
                                            <span class="nds-label">Location</span>
                                        </dt>
                                        <dd>Riyadh</dd>
                                    </div>
                                    <div class="nds-definition-item">
                                        <dt>
                                            <i class="hgi hgi-stroke hgi-calendar-01"></i>
                                            <span class="nds-label">Joined</span>
                                        </dt>
                                        <dd>March 2021</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-persona-details-1" id="tab-persona-details-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-persona-details-1"
                                    aria-labelledby="tab-persona-details-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-persona"&gt;
  &lt;div class="nds-avatar"&gt;
    &lt;i class="nds-icon nds-icon-avatar" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/div&gt;
  &lt;div class="nds-persona-info"&gt;
    &lt;span class="nds-persona-name"&gt;Ahmed Mohammed&lt;/span&gt;
    &lt;span class="nds-persona-role nds-truncate"&gt;System Administrator&lt;/span&gt;
    &lt;span class="nds-persona-desc"&gt;ahmed@example.gov.sa&lt;/span&gt;
  &lt;/div&gt;
  &lt;hr class="nds-divider"&gt;
  &lt;dl class="nds-definition-list nds-divided nds-grid" style="flex: 1 100%; --max-col:2; --mid-col:2; --min-col:1;"&gt;
    &lt;div class="nds-definition-item"&gt;
      &lt;dt&gt;
        &lt;i class="hgi hgi-stroke hgi-building-02"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Department&lt;/span&gt;
      &lt;/dt&gt;
      &lt;dd&gt;Digital Services&lt;/dd&gt;
    &lt;/div&gt;
    &lt;div class="nds-definition-item"&gt;
      &lt;dt&gt;
        &lt;i class="hgi hgi-stroke hgi-id"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Employee ID&lt;/span&gt;
      &lt;/dt&gt;
      &lt;dd&gt;DGA-4827&lt;/dd&gt;
    &lt;/div&gt;
    &lt;div class="nds-definition-item"&gt;
      &lt;dt&gt;
        &lt;i class="hgi hgi-stroke hgi-location-01"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Location&lt;/span&gt;
      &lt;/dt&gt;
      &lt;dd&gt;Riyadh&lt;/dd&gt;
    &lt;/div&gt;
    &lt;div class="nds-definition-item"&gt;
      &lt;dt&gt;
        &lt;i class="hgi hgi-stroke hgi-calendar-01"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Joined&lt;/span&gt;
      &lt;/dt&gt;
      &lt;dd&gt;March 2021&lt;/dd&gt;
    &lt;/div&gt;
  &lt;/dl&gt;
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

<!-- Built-in Features -->
<section id="personaFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-expand"></i>
                        <span class="nds-label">Three Display Sizes</span>
                    </span>
                    <p class="nds-item-desc">Default, medium, and small tiers scale the avatar and all three text slots together, letting you match the component to any layout density from a full profile page to a compact navigation dropmenu.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-variable"></i>
                        <span class="nds-label">CSS Token Overrides</span>
                    </span>
                    <p class="nds-item-desc">Every visual slot exposes a public CSS custom property (such as <code class="nds-inline-code lang-html">--persona-name-color</code>) so you can reskin a single line without touching the size variants or writing new SCSS.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-user-circle"></i>
                        <span class="nds-label">Avatar Size Inheritance</span>
                    </span>
                    <p class="nds-item-desc">The wrapper sets <code class="nds-inline-code lang-html">--avatar-size</code> via CSS custom-property inheritance so any child <code class="nds-inline-code lang-html">.nds-avatar</code> automatically matches the size tier, while explicit size modifiers on the avatar element still win.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-settings-02"></i>
                        <span class="nds-label">Optional Action Row</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">.nds-persona-action</code> with any buttons or links and the row fills the full width below the divider automatically, with each button sized to fit its label.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-hierarchy"></i>
                        <span class="nds-label">Centered Alignment</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-center</code> to the <code class="nds-inline-code lang-html">.nds-persona</code> wrapper to switch to a column layout with all content centered: avatar, text block, divider, and action row stack vertically with center alignment.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-contact"></i>
                        <span class="nds-label">Flexible Description Slot</span>
                    </span>
                    <p class="nds-item-desc">The <code class="nds-inline-code lang-html">.nds-persona-desc</code> field accepts any short secondary identifier: an email address, department, job code, location, or any other supporting label.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="personaGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the default size for standalone profile sections, account pages, and team directory cards where space allows the full 80px avatar</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-md</code> for mid-density contexts like sidebars, drawer panels, or list items where the full avatar is too prominent</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-sm</code> when embedding the persona in navigation dropmenus or narrow card tiles; this is the same size used in the main navigation user dropdown</li>
                    <li>Do not use persona for a plain byline or author credit where only a name is needed. A simple heading with a short <code class="nds-inline-code lang-html">nds-description</code> line is sufficient; the full persona structure adds visual weight that may not be warranted</li>
                    <li>Include an <a class="nds-color" href="{{ 'components/avatar' | relative_url }}">Avatar</a> when the user's visual identity adds recognition value; omit it when only the text fields matter, such as in a compact action panel</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-center</code> to the wrapper for greeting blocks and profile hero cards where a vertical, centered layout suits the design; keep the default row layout in list and navigation contexts</li>
                    <li>Only include <code class="nds-inline-code lang-html">.nds-persona-action</code> when account or contact actions are contextually relevant. A display-only team directory tile generally does not need action buttons</li>
                    <li>Keep <code class="nds-inline-code lang-html">.nds-persona-desc</code> to one short line. At <code class="nds-inline-code lang-html">nds-sm</code> size the field renders at <code class="nds-inline-code lang-html">text-xs</code>, leaving very little room; prefer a concise identifier over free-form text</li>
                    <li>Override only the token you need via a CSS custom property rather than writing additional SCSS. For example, <code class="nds-inline-code lang-html">--persona-name-color: var(--text-brand)</code> highlights the name on a themed surface without affecting the other slots</li>
                    <li>Place a divider (<code class="nds-inline-code lang-html">hr.nds-divider</code>) between the info block and the action row. Without it, actions appear directly adjacent to the last text field, reducing visual separation between identity and actions</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Medium size: 64px avatar and type scale one step smaller across name, role, and desc slots</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Small size: 48px avatar and type scale two steps smaller across all text slots</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-colView</code></td><td>Stacks all content vertically (flex-direction: column) while keeping start alignment</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Stacks all content vertically and centers everything: avatar, info, divider, and action row align to the middle</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--persona-name-FS</code></td><td><code class="nds-inline-code lang-html">--typo-text-xl-FS</code></td><td>Name font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-name-LH</code></td><td><code class="nds-inline-code lang-html">--typo-text-xl-LH</code></td><td>Name line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-name-color</code></td><td><code class="nds-inline-code lang-html">--text-default</code></td><td>Name text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-role-FS</code></td><td><code class="nds-inline-code lang-html">--typo-text-lg-FS</code></td><td>Role font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-role-LH</code></td><td><code class="nds-inline-code lang-html">--typo-text-lg-LH</code></td><td>Role line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-role-color</code></td><td><code class="nds-inline-code lang-html">--text-primary-paragraph</code></td><td>Role text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-desc-FS</code></td><td><code class="nds-inline-code lang-html">--typo-text-md-FS</code></td><td>Desc font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-desc-LH</code></td><td><code class="nds-inline-code lang-html">--typo-text-md-LH</code></td><td>Desc line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--persona-desc-color</code></td><td><code class="nds-inline-code lang-html">--text-secondary-paragraph</code></td><td>Desc text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--avatar-size</code></td><td><code class="nds-inline-code lang-html">80px</code></td><td>Avatar diameter; cascades via inheritance to any child <code class="nds-inline-code lang-html">.nds-avatar</code></td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
