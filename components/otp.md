---
layout: page
title: OTP Input
hero_title: OTP Input - National Design System
hero_description: One-time password input component for verification codes with automatic focus management, paste support, and RTL-aware keyboard navigation
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- OTP Overview -->
<section id="otpOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">4-Digit OTP</h2>
            <p class="nds-section-description">Standard verification code input with automatic focus advance and hidden field sync</p>
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
                                            data-toggler='["nds-sm", ".nds-otp-group", "sizeToggle"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-otp-group", "sizeToggle"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-otp-group", "sizeToggle"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-2xl);">
                            <fieldset class="nds-form-group nds-otp-group">
                                <legend><span class="nds-label">Verification Code</span></legend>
                                <div class="nds-otp">
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" class="nds-otp-value" name="otp">
                            </fieldset>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-otp-4digit-1" id="tab-otp-4digit-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-otp-4digit-1"
                                    aria-labelledby="tab-otp-4digit-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;fieldset class="nds-form-group nds-otp-group"&gt;
  &lt;legend&gt;&lt;span class="nds-label"&gt;Verification Code&lt;/span&gt;&lt;/legend&gt;
  &lt;div class="nds-otp"&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;input type="hidden" class="nds-otp-value" name="otp"&gt;
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
</section>

<!-- 6-Digit OTP with Separator -->
<section id="otpWithSeparator" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">OTP with Separator</h2>
            <p class="nds-section-description">Use the separator element to visually group digits, commonly used for 6-digit verification codes split into two groups of three.</p>
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
                                            data-toggler='["nds-sm", ".nds-otp-group", "sizeToggle"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-otp-group", "sizeToggle"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-otp-group", "sizeToggle"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-2xl);">
                            <fieldset class="nds-form-group nds-otp-group">
                                <legend><span class="nds-label">Verification Code</span></legend>
                                <div class="nds-otp">
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <span class="nds-otp-separator"></span>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" class="nds-otp-value" name="otp">
                            </fieldset>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-otp-separator-1" id="tab-otp-separator-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-otp-separator-1"
                                    aria-labelledby="tab-otp-separator-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;fieldset class="nds-form-group nds-otp-group"&gt;
  &lt;legend&gt;&lt;span class="nds-label"&gt;Verification Code&lt;/span&gt;&lt;/legend&gt;
  &lt;div class="nds-otp"&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;span class="nds-otp-separator"&gt;&lt;/span&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;input type="hidden" class="nds-otp-value" name="otp"&gt;
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
</section>

<!-- OTP with Validation -->
<section id="otpValidation" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Validation States</h2>
            <p class="nds-section-description">OTP groups support validation states through the standard form data-status attribute. Status is automatically cleared when the user starts typing.</p>
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
                        <div class="state-demo" style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
                            <fieldset class="nds-form-group nds-otp-group" id="otp-validate-demo">
                                <legend><span class="nds-label">Enter code 1234</span></legend>
                                <div class="nds-otp">
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-otp-container">
                                        <div class="nds-form-control">
                                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]">
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" class="nds-otp-value" name="otp-validate">
                                <div class="nds-form-footer" data-feedback-target hidden></div>
                            </fieldset>
                            <div class="nds-flex" style="--justify:center">
                                <button class="nds-btn nds-primary nds-sm" id="otp-validate-btn">
                                    <span class="nds-label">Verify</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-sm" id="otp-clear-btn">
                                    <span class="nds-label">Clear</span>
                                </button>
                            </div>
                            <script>
                                document.addEventListener('DOMContentLoaded', function() {
                                    var otpGroup = document.getElementById('otp-validate-demo');
                                    document.getElementById('otp-validate-btn').addEventListener('click', function() {
                                        var result = NDS.Forms.validateOtpGroup(otpGroup);
                                        if (!result.valid) return;
                                        var value = NDS.OTP.getValue(otpGroup);
                                        if (value === '1234') {
                                            NDS.Forms.setStatus({ element: otpGroup, status: 'success', message: 'Code verified successfully' });
                                        } else {
                                            NDS.Forms.setStatus({ element: otpGroup, status: 'error', message: 'Invalid verification code' });
                                        }
                                    });
                                    document.getElementById('otp-clear-btn').addEventListener('click', function() {
                                        NDS.OTP.clear(otpGroup);
                                        NDS.Forms.clearStatus(otpGroup);
                                    });
                                });
                            </script>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-otp-validate-1" id="tab-otp-validate-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-otp-validate-2" id="tab-otp-validate-2">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-otp-validate-1"
                                    aria-labelledby="tab-otp-validate-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;fieldset class="nds-form-group nds-otp-group" id="my-otp"&gt;
  &lt;legend&gt;&lt;span class="nds-label"&gt;Enter code 1234&lt;/span&gt;&lt;/legend&gt;
  &lt;div class="nds-otp"&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-otp-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;input type="hidden" class="nds-otp-value" name="otp"&gt;
  &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
&lt;/fieldset&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-otp-validate-2"
                                    aria-labelledby="tab-otp-validate-2" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-javascript code">
var otpGroup = document.getElementById('my-otp');

// Verify button click
document.getElementById('verify-btn').addEventListener('click', function() {
    var result = NDS.Forms.validateOtpGroup(otpGroup);
    if (!result.valid) return;
    var value = NDS.OTP.getValue(otpGroup);

    if (value === '1234') {
        NDS.Forms.setStatus({ element: otpGroup, status: 'success', message: 'Code verified successfully' });
    } else {
        NDS.Forms.setStatus({ element: otpGroup, status: 'error', message: 'Invalid verification code' });
    }
});

// Clear button click
document.getElementById('clear-btn').addEventListener('click', function() {
    NDS.OTP.clear(otpGroup);
    NDS.Forms.clearStatus(otpGroup);
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
    </div>
</section>

<!-- Built-in Features -->
<section id="otpFeatures" class="nds-content-section">
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
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Initializes on page load and detects dynamically added groups via MutationObserver. No manual setup needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Arrow keys move between inputs (RTL-aware). Backspace clears and moves back. Delete clears and moves forward. Auto-advances on digit entry.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-clipboard"></i>
                        <span class="nds-label">Paste Support</span>
                    </span>
                    <p class="nds-item-desc">Pasting a multi-digit string distributes digits across all inputs from the first position. Non-numeric characters are stripped automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-link-square-02" aria-hidden="true"></i>
                        <span class="nds-label">Hidden Field Sync</span>
                    </span>
                    <p class="nds-item-desc">A hidden input with <code class="nds-inline-code lang-html">nds-otp-value</code> class stays in sync with the concatenated value for form submission.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-notification-03"></i>
                        <span class="nds-label">Custom Events</span>
                    </span>
                    <p class="nds-item-desc">Fires <code class="nds-inline-code lang-js">nds:otpChange</code> on any input change, <code class="nds-inline-code lang-js">nds:otpComplete</code> when all digits are filled, and <code class="nds-inline-code lang-js">nds:otpClear</code> on clear.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-eye" aria-hidden="true"></i>
                        <span class="nds-label">Accessibility</span>
                    </span>
                    <p class="nds-item-desc">High-contrast mode thickens input borders. Reduced motion disables transitions. <code class="nds-inline-code lang-html">autocomplete="one-time-code"</code> enables autofill on mobile.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="otpGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">When and how to use OTP inputs effectively</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Verification codes sent via SMS, email, or authenticator apps</li>
                    <li>Two-factor authentication flows</li>
                    <li>Use 4 digits for simple codes, 6 digits with a separator for longer codes</li>
                    <li>Add <code class="nds-inline-code lang-html">autocomplete="one-time-code"</code> on the first input for mobile autofill</li>
                    <li>Listen for <code class="nds-inline-code lang-js">nds:otpComplete</code> to auto-submit when all digits are entered</li>
                    <li>For general text input, use <a href="{{ 'components/forms' | relative_url }}" class="nds-color">form fields</a> instead</li>
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
var group = document.querySelector('.nds-otp-group');

// Get the current value
var code = NDS.OTP.getValue(group);

// Set a value programmatically
NDS.OTP.setValue(group, '1234');

// Clear all inputs and focus first
NDS.OTP.clear(group);

// Listen for completion (all digits entered)
group.addEventListener('nds:otpComplete', function(e) {
  console.log('Code:', e.detail.value);
});

// Listen for any change
group.addEventListener('nds:otpChange', function(e) {
  console.log('Value:', e.detail.value, 'Filled:', e.detail.filled);
});

// Validate OTP group manually
var result = NDS.Forms.validateOtpGroup(group);
// result: { valid: true/false, value: '1234', message: '...' }

// Set/clear status
NDS.Forms.setStatus({ element: group, status: 'error', message: 'Invalid code' });
NDS.Forms.clearStatus(group);
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
