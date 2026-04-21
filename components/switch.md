---
layout: page
title: Switch
hero_title: Switch - National Design System
hero_description: Toggle switches for binary choices with clear visual feedback and accessibility support
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Single Switch -->
<section id="switchSingle" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Single Switch</h2>
      <p class="nds-section-description">Standalone toggle for enabling or disabling a single setting</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="nds-label">MD</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-sm", ".nds-switch-container", "sizeToggle"]'>
                      <span class="nds-label">SM</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                      data-toggler='["", ".nds-switch-container", "sizeToggle"]'>
                      <span class="nds-label">MD</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-lg", ".nds-switch-container", "sizeToggle"]'>
                      <span class="nds-label">LG</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-switch", "variantToggle"]'>
                <span class="nds-label">Neutral</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-switch-container", "disabledToggle", "data-state"]'>
                <span class="nds-label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                <span class="nds-label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-switch-container">
                <div class="nds-form-header" data-feedback-target>
                  <label for="demo-switch-single">
                    <span class="nds-label">Enable notifications</span>
                    <span class="nds-info">Receive push notifications for important updates</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <div class="nds-switch">
                    <input type="checkbox" id="demo-switch-single" name="notifications" value="enabled"
                      class="nds-switch-input">
                    <div class="nds-switch-track">
                      <div class="nds-switch-thumb"></div>
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
                  aria-controls="panel-switch-single-1" id="tab-switch-single-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-switch-single-1"
                aria-labelledby="tab-switch-single-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
&lt;div class="nds-form-container nds-switch-container"&gt;
  &lt;div class="nds-form-header" data-feedback-target&gt;
    &lt;label for="switch-1"&gt;
      &lt;span class="nds-label"&gt;Enable notifications&lt;/span&gt;
      &lt;span class="nds-info"&gt;Receive push notifications for important updates&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-switch"&gt;
      &lt;input type="checkbox" id="switch-1" name="notifications" value="enabled" class="nds-switch-input"&gt;
      &lt;div class="nds-switch-track"&gt;
        &lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;
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

<!-- Switch Group -->
<section id="switchGroup" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Switch Group</h2>
      <p class="nds-section-description">Related settings grouped together with column or row layout</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="nds-label">MD</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-sm", ".nds-switch-container", "sizeToggle"]'>
                      <span class="nds-label">SM</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                      data-toggler='["", ".nds-switch-container", "sizeToggle"]'>
                      <span class="nds-label">MD</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-lg", ".nds-switch-container", "sizeToggle"]'>
                      <span class="nds-label">LG</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-switch-group", "disabledToggle", "data-state"]'>
                <span class="nds-label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-rowView", ".nds-switch-group", "layoutToggle"]'>
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
                <fieldset class="nds-form-group nds-switch-group">
                  <legend class="nds-label">Notification preferences</legend>
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="demo-switch1">
                        <span class="nds-label">Email alerts</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="demo-switch1" name="notifications" value="email" class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="demo-switch2">
                        <span class="nds-label">Push notifications</span>
                        <span class="nds-info">Instant alerts on your device</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="demo-switch2" name="notifications" value="push" checked class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="demo-switch3">
                        <span class="nds-label">SMS alerts</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="demo-switch3" name="notifications" value="sms" class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-switch-group-1" id="tab-switch-group-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-switch-group-1"
                aria-labelledby="tab-switch-group-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
&lt;fieldset class="nds-form-group nds-switch-group"&gt;
  &lt;legend class="nds-label"&gt;Notification preferences&lt;/legend&gt;
  &lt;div class="nds-form-container nds-switch-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="switch1"&gt;
        &lt;span class="nds-label"&gt;Email alerts&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-switch"&gt;
        &lt;input type="checkbox" id="switch1" name="notifications" value="email" class="nds-switch-input"&gt;
        &lt;div class="nds-switch-track"&gt;
          &lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-switch-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="switch2"&gt;
        &lt;span class="nds-label"&gt;Push notifications&lt;/span&gt;
        &lt;span class="nds-info"&gt;Instant alerts on your device&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-switch"&gt;
        &lt;input type="checkbox" id="switch2" name="notifications" value="push" checked class="nds-switch-input"&gt;
        &lt;div class="nds-switch-track"&gt;
          &lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-switch-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="switch3"&gt;
        &lt;span class="nds-label"&gt;SMS alerts&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-switch"&gt;
        &lt;input type="checkbox" id="switch3" name="notifications" value="sms" class="nds-switch-input"&gt;
        &lt;div class="nds-switch-track"&gt;
          &lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
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

<!-- Built-in Features -->
<section id="switchFeatures" class="nds-content-section">
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
          <p class="nds-item-desc">Auto-initializes with the forms system. Two-way binding syncs <code class="nds-inline-code lang-html">disabled</code> state between inputs and containers. Use <code class="nds-inline-code lang-html">data-state="disabled"</code> on the group to disable all switches at once.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02"></i>
            <span class="nds-label">Visual Feedback</span>
          </span>
          <p class="nds-item-desc">Ripple effect on hover, thumb stretch on press, and smooth slide animation. Three sizes (SM, MD, LG) with proportional scaling.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Support</span>
          </span>
          <p class="nds-item-desc">Space and Enter keys toggle the switch. Track click, label click, and keyboard all fire the <code class="nds-inline-code lang-js">switchChange</code> event.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Responsive Layout</span>
          </span>
          <p class="nds-item-desc">Column layout by default, row layout with <code class="nds-inline-code lang-html">nds-rowView</code> class. Gaps adjust on mobile for touch-friendly spacing.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="switchGuidelines" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use switches effectively</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Instant on/off actions that take effect immediately without form submission</li>
          <li>Settings pages, preference panels, and feature toggles</li>
          <li>Use <a href="{{ 'components/checkbox' | relative_url }}" class="nds-color">checkboxes</a> when the change requires a submit action to apply</li>
          <li>Use <a href="{{ 'components/radio' | relative_url }}" class="nds-color">radio buttons</a> when choosing between more than two mutually exclusive options</li>
          <li>Always label clearly what state "on" represents</li>
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
// Listen for switch state changes
var switchEl = document.querySelector('.nds-switch');
switchEl.addEventListener('switchChange', function(e) {
  console.log('Checked:', e.detail.checked);
  console.log('Value:', e.detail.value);
  console.log('Input:', e.detail.input);
});

// Toggle programmatically
var input = document.querySelector('.nds-switch-input');
input.checked = !input.checked;
input.dispatchEvent(new Event('change'));
                </code>
              </div>
        </div>
      </div>
    </div>
  </div>
</section>
