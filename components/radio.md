---
layout: page
title: Radio Button
hero_title: Radio Button - National Design System
hero_description: Single-selection input controls for mutually exclusive options with clear visual feedback
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.3.0"
last_edit: "28/06/2026 - 01:27 PM"
---

<!-- Radio Button Group -->
<section id="radioGroup" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Radio Button Group</h2>
      <p class="nds-section-description">Mutually exclusive options with shared validation and required state</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="nds-label">SM</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                      data-toggler='["", ".nds-radio-container", "sizeToggle"]'>
                      <span class="nds-label">SM</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-radio-container", "sizeToggle"]'>
                      <span class="nds-label">MD</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-lg", ".nds-radio-container", "sizeToggle"]'>
                      <span class="nds-label">LG</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-radio", "variantToggle"]'>
                <span class="nds-label">Neutral</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                data-toggler='["data-required", ".nds-radio-group", "requiredToggle", "attr"]'>
                <span class="nds-label">Required</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-radio-group", "disabledToggle", "data-state"]'>
                <span class="nds-label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-rowView", ".nds-radio-group", "layoutToggle"]'>
                <span class="nds-label">Row View</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                <span class="nds-label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                <fieldset class="nds-form-group nds-radio-group" data-required>
                  <legend class="nds-label">Select your plan</legend>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="demo-radio1">
                        <span class="nds-label">Basic</span>
                        <span class="nds-info">Core features for individuals</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-radio1" name="plan" value="basic" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="demo-radio2">
                        <span class="nds-label">Professional</span>
                        <span class="nds-info">Advanced tools for teams</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-radio2" name="plan" value="pro" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="demo-radio3">
                        <span class="nds-label">Enterprise</span>
                        <span class="nds-info">Full access with dedicated support</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-radio3" name="plan" value="enterprise" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-footer" data-feedback-target hidden></div>
                </fieldset>
                <div class="nds-flex">
                  <button class="nds-btn nds-primary nds-sm" type="submit">
                    <span class="nds-label">Submit</span>
                  </button>
                  <button class="nds-btn nds-subtle nds-sm" type="button" onclick="this.closest('form').querySelectorAll('input[type=radio]').forEach(r => r.checked = false)">
                    <span class="nds-label">Clear Selection</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided">
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                  aria-controls="panel-radio-group-1" id="tab-radio-group-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
              <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
              </button>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-radio-group-1"
                aria-labelledby="tab-radio-group-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
&lt;fieldset class="nds-form-group nds-radio-group" data-required&gt;
  &lt;legend class="nds-label"&gt;Select your plan&lt;/legend&gt;
  &lt;div class="nds-form-container nds-radio-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="radio1"&gt;
        &lt;span class="nds-label"&gt;Basic&lt;/span&gt;
        &lt;span class="nds-info"&gt;Core features for individuals&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="radio" id="radio1" name="plan" value="basic" class="nds-radio"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-radio-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="radio2"&gt;
        &lt;span class="nds-label"&gt;Professional&lt;/span&gt;
        &lt;span class="nds-info"&gt;Advanced tools for teams&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="radio" id="radio2" name="plan" value="pro" class="nds-radio"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-radio-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="radio3"&gt;
        &lt;span class="nds-label"&gt;Enterprise&lt;/span&gt;
        &lt;span class="nds-info"&gt;Full access with dedicated support&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="radio" id="radio3" name="plan" value="enterprise" class="nds-radio"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
&lt;/fieldset&gt;
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

<!-- Readonly State -->
<section id="radioReadonly" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Readonly State</h2>
      <p class="nds-section-description">Freezes the border color without disabling interaction or graying the tile fill</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-container">
            <div class="state-demo">
              <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                <fieldset class="nds-form-group nds-radio-group">
                  <legend class="nds-label">Preferred contact</legend>
                  <div class="nds-form-container nds-radio-container" data-state="readonly">
                    <div class="nds-form-header">
                      <label for="demo-readonly-radio1">
                        <span class="nds-label">Email</span>
                        <span class="nds-info">Receive updates by email</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-readonly-radio1" name="contact-readonly" value="email" class="nds-radio" checked>
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container" data-state="readonly">
                    <div class="nds-form-header">
                      <label for="demo-readonly-radio2">
                        <span class="nds-label">SMS</span>
                        <span class="nds-info">Receive updates by text message</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-readonly-radio2" name="contact-readonly" value="sms" class="nds-radio">
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided">
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                  aria-controls="panel-radio-readonly-1" id="tab-radio-readonly-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
              <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
              </button>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-radio-readonly-1"
                aria-labelledby="tab-radio-readonly-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <code class="lang-html code">
&lt;div class="nds-form-container nds-radio-container" data-state="readonly"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="radio-readonly1"&gt;
      &lt;span class="nds-label"&gt;Email&lt;/span&gt;
      &lt;span class="nds-info"&gt;Receive updates by email&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;input type="radio" id="radio-readonly1" name="contact" value="email" class="nds-radio" checked&gt;
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
</section>

<!-- Built-in Features -->
<section id="radioFeatures" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
      <p class="nds-section-description">What you get out of the box with zero configuration</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Form Integration</span>
          </span>
          <p class="nds-item-desc">Auto-initializes with the forms system. Two-way binding syncs <code class="nds-inline-code lang-html">disabled</code> and <code class="nds-inline-code lang-html">required</code> states between inputs and containers.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
            <span class="nds-label">Group Validation</span>
          </span>
          <p class="nds-item-desc">Required selection enforced on form submit. Auto-revalidates on change once an error is shown. Call <code class="nds-inline-code lang-js">NDS.Forms.clearStatus()</code> to reset.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02"></i>
            <span class="nds-label">Visual Feedback</span>
          </span>
          <p class="nds-item-desc">Ripple effect on hover, smooth state transitions, and three sizes (SM, MD, LG) with proportional scaling.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Responsive Layout</span>
          </span>
          <p class="nds-item-desc">Column layout by default, row layout with nds-rowView class. Gaps adjust on mobile for touch-friendly spacing.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="radioGuidelines" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use radio buttons effectively</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Selecting exactly one option from a mutually exclusive set</li>
          <li>Use <a href="{{ 'components/checkbox' | relative_url }}" class="nds-color">checkboxes</a> when multiple selections are allowed</li>
          <li>Use a <a href="{{ 'components/forms' | relative_url }}" class="nds-color">select dropdown</a> when there are more than 7 options</li>
          <li>Use <a href="{{ 'components/switch' | relative_url }}" class="nds-color">switches</a> for instant on/off actions without form submission</li>
          <li>Always provide a default selection when possible to avoid empty submissions</li>
          <li>Wrap options in a fieldset with a legend that describes what the user is choosing</li>
        </ul>
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
                <code class="lang-javascript code">
// Validate a radio group manually
var group = document.querySelector('.nds-radio-group');
var result = NDS.Forms.validateRadioGroup(group);
// result: { valid: false, selected: false, message: 'Please select an option' }

// Validate without showing feedback
NDS.Forms.validateRadioGroup(group, { showMessage: false });

// Set status manually (error, success, warning, info)
NDS.Forms.setStatus({ element: group, status: 'error', message: 'Please select an option' });

// Clear validation status
NDS.Forms.clearStatus(group);

// Re-sync chrome after a programmatic .checked assignment
// (updates sibling radio containers and the clear button; no event re-dispatch)
var radio = document.querySelector('#radio1');
radio.checked = true;
NDS.Forms.syncState(radio);
                </code>
              </div>
        </div>
      </div>
      <div class="nds-block">
        <h3 class="nds-block-title">Modifier Classes</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Class</th><th>Target</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td><code class="nds-inline-code lang-html">.nds-radio</code></td><td>Neutral color variant for the checked tile fill</td></tr>
            <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td><code class="nds-inline-code lang-html">.nds-radio-container</code></td><td>Medium size: increases tile and gap proportionally, widens gap ring to 4 px</td></tr>
            <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td><code class="nds-inline-code lang-html">.nds-radio-container</code></td><td>Large size: further increases tile and gap proportionally, widens gap ring to 5 px</td></tr>
            <tr><td><code class="nds-inline-code lang-html">nds-rowView</code></td><td><code class="nds-inline-code lang-html">.nds-radio-group</code></td><td>Arranges radio options horizontally in a row instead of the default column</td></tr>
          </tbody>
        </table>
      </div>
      <div class="nds-block">
        <h3 class="nds-block-title">Data Attributes</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Attribute</th><th>Target</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">data-required</code></td><td><code class="nds-inline-code lang-html">.nds-radio-group</code></td><td>Marks the group as required; a selection is enforced on form submit</td></tr>
            <tr><td><code class="nds-inline-code lang-html">data-error-message</code></td><td><code class="nds-inline-code lang-html">.nds-radio-group</code></td><td>Overrides the default validation error message shown when no option is selected</td></tr>
            <tr><td><code class="nds-inline-code lang-html">data-state~="disabled"</code></td><td><code class="nds-inline-code lang-html">.nds-radio-group</code></td><td>Disables all radio inputs in the group via the forms state hook</td></tr>
            <tr><td><code class="nds-inline-code lang-html">data-state~="readonly"</code></td><td><code class="nds-inline-code lang-html">.nds-radio-container</code></td><td>Freezes the tile border to the disabled color while leaving the input interactive</td></tr>
          </tbody>
        </table>
      </div>
      <div class="nds-block">
        <h3 class="nds-block-title">CSS Custom Properties</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">--radio-tile-bg</code></td><td><code class="nds-inline-code lang-html">--background-default</code></td><td>Background fill of the radio tile (unchecked state)</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--radio-tile-border</code></td><td><code class="nds-inline-code lang-html">--controls-border</code></td><td>Outline ring color of the tile (unchecked state)</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--radio-primary-checked</code></td><td><code class="nds-inline-code lang-html">--controls-primary-checked</code></td><td>Tile fill color when the primary radio is checked</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--radio-primary-hovered</code></td><td><code class="nds-inline-code lang-html">--controls-primary-hovered</code></td><td>Tile fill color on hover of a checked primary radio</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--radio-primary-pressed</code></td><td><code class="nds-inline-code lang-html">--controls-primary-pressed</code></td><td>Tile fill color on press of a checked primary radio</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--radio-neutral-checked</code></td><td><code class="nds-inline-code lang-html">--controls-neutral-checked</code></td><td>Tile fill color when the neutral radio is checked</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--radio-neutral-hovered</code></td><td><code class="nds-inline-code lang-html">--controls-neutral-hovered</code></td><td>Tile fill color on hover of a checked neutral radio</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--radio-neutral-pressed</code></td><td><code class="nds-inline-code lang-html">--controls-neutral-pressed</code></td><td>Tile fill color on press of a checked neutral radio</td></tr>
          </tbody>
        </table>
      </div>
      <div class="nds-block">
        <h3 class="nds-block-title">Validation Attributes</h3>
        <ul>
          <li>Add <code class="nds-inline-code lang-html">data-required</code> to the group to require a selection before form submission</li>
          <li>Add <code class="nds-inline-code lang-html">data-error-message</code> on the group to override the default validation message</li>
          <li>Place a <code class="nds-inline-code lang-html">nds-form-footer</code> with <code class="nds-inline-code lang-html">data-feedback-target</code> inside the group for dynamic feedback placement</li>
          <li>Use <code class="nds-inline-code lang-html">data-state="disabled"</code> on the group to disable all radio buttons at once</li>
        </ul>
      </div>
    </div>
  </div>
</section>
