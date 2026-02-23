---
layout: page
title: OTP Input
hero_title: OTP Input - National Design System
hero_description: One-time password input component for verification codes with automatic focus management, paste support, and RTL-aware keyboard navigation
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- OTP Overview -->
<section id="otpOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">OTP Input</h2>
            <p class="nds-section-description">A group of single-digit inputs for entering verification codes. Supports automatic focus advance, paste distribution, RTL-aware arrow keys, and hidden field sync.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">4-Digit OTP</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-otp-group", "sizeToggle"]'>
                                <span class="label">Small</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-md", ".nds-otp-group", "sizeToggle"]'>
                                <span class="label">Medium</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-otp-group", "sizeToggle"]'>
                                <span class="label">Large</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-2xl);">
                            <fieldset class="nds-form-group nds-otp-group nds-md">
                                <legend><span class="label">Verification Code</span></legend>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<fieldset class="nds-form-group nds-otp-group">
  <legend><span class="label">Verification Code</span></legend>
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
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">6-Digit with Separator</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-otp-group", "sizeToggle"]'>
                                <span class="label">Small</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-md", ".nds-otp-group", "sizeToggle"]'>
                                <span class="label">Medium</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-otp-group", "sizeToggle"]'>
                                <span class="label">Large</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-2xl);">
                            <fieldset class="nds-form-group nds-otp-group nds-md">
                                <legend><span class="label">Verification Code</span></legend>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<fieldset class="nds-form-group nds-otp-group">
  <legend><span class="label">Verification Code</span></legend>
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
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Validation Demo</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
                            <fieldset class="nds-form-group nds-otp-group" id="otp-validate-demo">
                                <legend><span class="label">Verification Code</span></legend>
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
                                <div class="nds-form-footer" data-feedback-target></div>
                            </fieldset>
                            <div style="display: flex; gap: var(--spacing-md);">
                                <button class="nds-btn nds-primary nds-sm" id="otp-validate-btn">
                                    <span class="label">Validate</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-sm" id="otp-clear-btn">
                                    <span class="label">Clear</span>
                                </button>
                            </div>
                            <script>
                                document.addEventListener('DOMContentLoaded', function() {
                                    var otpGroup = document.getElementById('otp-validate-demo');
                                    NDS.Forms.setStatus({ element: otpGroup, status: 'info', message: 'Enter 1234 to test success', permanent: true });
                                    document.getElementById('otp-validate-btn').addEventListener('click', function() {
                                        var value = NDS.OTP.getValue(otpGroup);
                                        NDS.Forms.clearStatus(otpGroup);
                                        if (value.length < 4) {
                                            NDS.Forms.setStatus({ element: otpGroup, status: 'error', message: 'Please enter all 4 digits' });
                                        } else if (value === '1234') {
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-otp-validate-html" id="tab-otp-validate-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-otp-validate-js" id="tab-otp-validate-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-otp-validate-html"
                                    aria-labelledby="tab-otp-validate-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<fieldset class="nds-form-group nds-otp-group" id="otp-validate-demo">
  <legend><span class="label">Verification Code</span></legend>
  <div class="nds-otp">
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code">
      </div>
    </div>
    <!-- ... more inputs ... -->
  </div>
  <input type="hidden" class="nds-otp-value" name="otp-validate">
  <div class="nds-form-footer" data-feedback-target></div>
</fieldset>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-otp-validate-js"
                                    aria-labelledby="tab-otp-validate-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
var otpGroup = document.getElementById('otp-validate-demo');

document.getElementById('otp-validate-btn').addEventListener('click', function() {
    var value = NDS.OTP.getValue(otpGroup);
    NDS.Forms.clearStatus(otpGroup);
    if (value.length < 4) {
        NDS.Forms.setStatus({ element: otpGroup, status: 'error', message: 'Please enter all 4 digits' });
    } else if (value === '1234') {
        NDS.Forms.setStatus({ element: otpGroup, status: 'success', message: 'Code verified successfully' });
    } else {
        NDS.Forms.setStatus({ element: otpGroup, status: 'error', message: 'Invalid verification code' });
    }
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

<!-- JavaScript API -->
<section id="otpAPI" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">JavaScript API</h2>
            <p class="nds-section-description">The OTP controller initializes automatically for all .nds-otp-group elements and provides a public API for programmatic control.</p>
        </div>
        <div class="nds-section-content">

            <h3>Initialization</h3>

            <p>OTP groups are auto-initialized on page load. New groups added dynamically are detected via MutationObserver. No manual setup needed.</p>

            <h3>Public Methods</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>NDS.OTP.getValue(group)</td>
                        <td>Returns the concatenated value of all inputs as a string</td>
                    </tr>
                    <tr>
                        <td>NDS.OTP.setValue(group, value)</td>
                        <td>Distributes digits across inputs and syncs the hidden field</td>
                    </tr>
                    <tr>
                        <td>NDS.OTP.clear(group)</td>
                        <td>Clears all inputs, syncs hidden field, focuses first input, and dispatches nds:otpClear</td>
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
const group = document.querySelector('.nds-otp-group');

// Get the current value
const code = NDS.OTP.getValue(group);

// Set a value programmatically
NDS.OTP.setValue(group, '1234');

// Clear all inputs
NDS.OTP.clear(group);
                    </code>
                </div>
            </div>

            <h3>Custom Events</h3>

            <p>The OTP group dispatches custom events on the .nds-otp-group element. All events bubble and include the current value in event.detail.</p>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Detail</th>
                        <th>When</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>nds:otpChange</td>
                        <td>{ value, filled }</td>
                        <td>Any input value changes. filled is true when all digits are entered.</td>
                    </tr>
                    <tr>
                        <td>nds:otpComplete</td>
                        <td>{ value }</td>
                        <td>All inputs are filled (all digits entered)</td>
                    </tr>
                    <tr>
                        <td>nds:otpClear</td>
                        <td>{ value }</td>
                        <td>Inputs are cleared via NDS.OTP.clear()</td>
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
const group = document.querySelector('.nds-otp-group');

// Listen for completion
group.addEventListener('nds:otpComplete', function(e) {
    console.log('OTP entered:', e.detail.value);
    verifyCode(e.detail.value);
});

// Listen for any change
group.addEventListener('nds:otpChange', function(e) {
    if (e.detail.filled) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', '');
    }
});
                    </code>
                </div>
            </div>

            <h3>Complete Example</h3>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
const group = document.querySelector('.nds-otp-group');

group.addEventListener('nds:otpComplete', async function(e) {
    try {
        const response = await verifyOTP(e.detail.value);
        if (response.success) {
            NDS.Forms.setStatus(group, 'success', 'Code verified successfully');
        } else {
            NDS.Forms.setStatus(group, 'error', 'Invalid code. Please try again.');
            NDS.OTP.clear(group);
        }
    } catch (error) {
        NDS.Forms.setStatus(group, 'error', 'Verification failed. Try again.');
    }
});
                    </code>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Behavior -->
<section id="otpBehavior" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Behavior</h2>
            <p class="nds-section-description">Built-in keyboard and interaction behaviors</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-content-block">
                <h3 class="nds-block-title">Focus Management</h3>
                <p>Typing a digit automatically moves focus to the next input. When all digits are filled, the last input stays focused and the nds:otpComplete event fires.</p>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Keyboard Navigation</h3>
                <p>Arrow Left/Right move between inputs and are RTL-aware — Left moves visually left regardless of text direction. Backspace clears the current input and moves focus back. Delete clears and moves forward.</p>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Paste Support</h3>
                <p>Pasting a multi-digit string into any input distributes the digits across all inputs starting from the first position. Non-numeric characters are stripped automatically.</p>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Hidden Field Sync</h3>
                <p>A hidden input with class nds-otp-value is automatically kept in sync with the concatenated value of all visible inputs. Use this for form submission.</p>
            </div>
        </div>
    </div>
</section>
