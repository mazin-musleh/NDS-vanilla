---
layout: minimal
title: Sign in
lang: en
direction: ltr
layout_class: nds-middle
page_bg: assets/img/riyadhcenter.webp
bg_opacity_top: 60%
bg_opacity_bottom: 90%
exclude_showcase: true
breadcrumb: [["Examples", "/examples"]]
---
{% assign brand_logo = page.brandLogo | default: site.brandLogo %}
{% assign brand_width = page.headerBrandW | default: site.headerBrandW %}
{% assign brand_height = page.headerBrandH | default: site.headerBrandH %}
{% assign site_title = page.siteTitle | default: site.title %}

<section class="nds-content-section nds-ghost nds-flush">
  <div class="nds-section-wrapper">
    <div class="nds-section-body">
      <div class="nds-block nds-flex nds-col" style="--align: center;">
        <!-- Sign in: national SSO first, credentials as the fallback -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-start">
          <div class="nds-card-header nds-rowView">
            <img class="nds-brand-logo" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
            <!-- Language switch: point this at the Arabic URL of the same page -->
            <a href="#" class="nds-btn nds-subtle" hreflang="ar" lang="ar">
              <i class="nds-icon nds-hgi-translation" aria-hidden="true"></i>
              <span class="nds-label">العربية</span>
            </a>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text nds-center">
              <h1 class="nds-card-title">Sign in</h1>
              <p class="nds-card-description">Use your National Single Sign-On account to reach every service on this
                portal.</p>
            </div>

          </div>

          <!-- Actions sit outside .nds-card-content: that is the part that scrolls -->
          <div class="nds-card-actions nds-row">
            <button type="button" class="nds-btn nds-primary nds-lg nds-full" id="nafath-btn">
              <span class="nds-label">Continue with Nafath</span>
            </button>
          </div>

          <div class="nds-divider">or</div>

          <div class="nds-card-actions nds-row">
            <button type="button" class="nds-btn nds-secondary-outline nds-lg nds-full" id="credentials-btn">
              <span class="nds-label">Sign in with National ID</span>
            </button>
          </div>
        </div>

        <!-- National ID and password: its own card, so it can move to its own page -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-credentials" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <form id="credentials-form" class="nds-form" data-ajax>
            <div class="nds-card-content">
              <div class="nds-card-text nds-center">
                <h1 class="nds-card-title">Sign in with National ID</h1>
                <p class="nds-card-description">Enter your National ID and password.</p>
              </div>

              <!-- Form-level error: no close button, so the same alert can be shown again -->
              <div class="nds-alert nds-card nds-color" data-status="error" role="alert" id="credentials-error" hidden>
                <span class="nds-feedback nds-alert-icon nds-outline">
                  <span class="nds-feedback-icon">
                    <i class="nds-icon" aria-hidden="true"></i>
                  </span>
                </span>
                <div class="nds-alert-content">
                  <div class="nds-alert-text">
                    <span class="nds-alert-title">Sign-in failed</span>
                    <p class="nds-alert-description">Check the verification code and try again.</p>
                  </div>
                </div>
              </div>

              <!-- National ID -->
              <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                  <label for="national-id">
                    <span class="nds-label">National ID</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-identity-card" aria-hidden="true"></i>
                  <input type="text" id="national-id" name="national-id" class="nds-input" inputmode="numeric" pattern="[0-9]{10}"
                    maxlength="10" placeholder="10 digits" autocomplete="username" required
                    data-error-message="Enter the 10 digits of your National ID">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                  <label for="signin-password">
                    <span class="nds-label">Password</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                  <input type="password" id="signin-password" name="password" class="nds-input" placeholder="Enter your password"
                    autocomplete="current-password" required>
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                    <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                      <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target>
                  <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                    <span class="nds-feedback-icon">
                      <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                    <span class="nds-feedback-message"><a href="#" class="forgot-password-link">Forgot your password?</a></span>
                  </span>
                </div>
              </div>

              <!-- Verification code (captcha). A real page keeps this container hidden and
                   renders it only after a failed sign-in, and the code is drawn and checked
                   on the server. Rate limiting is the first defence; this is the second. -->

              <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                  <label for="captcha-value">
                    <span class="nds-label">Verification code</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="captcha-value" name="captcha" class="nds-input" inputmode="numeric" pattern="[0-9]{5}"
                    maxlength="5" placeholder="Type the code shown below" autocomplete="off" required
                    data-error-message="Enter the 5 digits shown below">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="nds-btn-group nds-center">
                <span class="nds-btn nds-secondary-outline" style="--btn-padding: 0; --btn-width: 96px;">
                  <!-- Inline SVG, not an <img>: fill="currentColor" keeps it readable in dark mode -->
                  <svg width="88" height="26" role="img" aria-label="Verification code image">
                    <text id="captcha-image" x="44" y="20" text-anchor="middle" font-family="monospace" font-size="19"
                      letter-spacing="4" fill="currentColor"></text>
                  </svg>
                </span>
                <button type="button" class="nds-btn nds-secondary nds-cooldown" id="captcha-refresh" data-cooldown="5"
                  data-cooldown-loading="1" data-cooldown-label="{s}s">
                  <span class="nds-label">New</span>
                </button>
              </div>
            </div>

            <div class="nds-card-actions nds-col">
              <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
                <span class="nds-label">Sign in</span>
              </button>
              <button type="button" class="nds-btn nds-subtle nds-full back-to-start">
                <span class="nds-label">Cancel</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Delivery method: where the one-time code is sent -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-delivery" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text nds-center">
              <h1 class="nds-card-title">Choose how to get your code</h1>
              <p class="nds-card-description">We send a 5-digit code to the method you pick.</p>
            </div>

            <!-- The three choices are the page's content, not its actions -->
            <div class="nds-grid" style="--gap: var(--spacing-md);">
              <button type="button" class="nds-btn nds-secondary-outline nds-col delivery-btn" data-delivery="your mobile app">
                <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                <span class="nds-label">Mobile app</span>
              </button>
              <button type="button" class="nds-btn nds-secondary-outline nds-col delivery-btn" data-delivery="n****@example.gov.sa">
                <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                <span class="nds-label">Email</span>
              </button>
              <button type="button" class="nds-btn nds-secondary-outline nds-col delivery-btn" data-delivery="05** *** 419">
                <i class="nds-icon nds-hgi-notification-02" aria-hidden="true"></i>
                <span class="nds-label">Text message</span>
              </button>
            </div>
          </div>

          <div class="nds-card-actions nds-row">
            <button type="button" class="nds-btn nds-subtle nds-full back-to-start">
              <span class="nds-label">Cancel</span>
            </button>
          </div>
        </div>

        <!-- One-time code -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-otp" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <form id="otp-form" class="nds-form" data-ajax>
            <div class="nds-card-content">
              <div class="nds-card-text nds-center">
                <h1 class="nds-card-title">Enter your code</h1>
                <p class="nds-card-description">We sent a 5-digit code to <strong id="otp-destination">your mobile app</strong>.</p>
              </div>

              <fieldset class="nds-form-group nds-otp-group nds-md nds-center" data-required>
                <legend><span class="nds-label">Verification code</span></legend>
                <div class="nds-otp">
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code"
                        aria-label="Digit 1 of 5">
                    </div>
                  </div>
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 2 of 5">
                    </div>
                  </div>
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 3 of 5">
                    </div>
                  </div>
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 4 of 5">
                    </div>
                  </div>
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 5 of 5">
                    </div>
                  </div>
                </div>
                <input type="hidden" class="nds-otp-value" name="one-time-code">
                <div class="nds-form-footer" data-feedback-target>
                  <!-- Permanent feedback survives validation cycles: it hides while an error
                       shows and comes back when the error clears. A real page never prints
                       the code — this stands in for the message you would receive. -->
                  <span class="nds-feedback nds-outline nds-sm" data-status="info" data-permanent>
                    <span class="nds-feedback-icon">
                      <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                    <span class="nds-feedback-message">Demo code: <strong id="otp-demo-code">—</strong></span>
                  </span>
                </div>
              </fieldset>

              <div class="nds-center">
                <button type="button" class="nds-btn nds-subtle nds-cooldown" id="otp-resend" data-cooldown="30"
                  data-cooldown-loading="1" data-cooldown-label="Resend in {s}s" data-resend-label="Resend"
                  data-sent-title="Code sent" data-sent-message="A new code is on its way.">
                  <span class="nds-label">Resend code</span>
                </button>
              </div>
            </div>

            <div class="nds-card-actions nds-col">
              <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
                <span class="nds-label">Verify</span>
              </button>
              <!-- Cancel returns to whichever card sent the code, so no fixed target -->
              <button type="button" class="nds-btn nds-subtle nds-full" id="otp-cancel">
                <span class="nds-label">Cancel</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Signed in: account home for the rest of the family -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-account" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text nds-center">
              <span class="nds-featured-icon nds-xl nds-circle nds-center" data-status="success">
                <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
              </span>
              <h1 class="nds-card-title">You are signed in</h1>
              <p class="nds-card-description">Welcome back, <strong>Noura Al-Harbi</strong> (1098234571).</p>
            </div>
          </div>

          <div class="nds-card-actions nds-col">
            <a href="{{ '/examples/console-demo/' | relative_url }}" class="nds-btn nds-primary nds-full">
              <span class="nds-label">Go to dashboard</span>
            </a>
            <button type="button" class="nds-btn nds-secondary-outline nds-full" data-goto="password">
              <i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"></i>
              <span class="nds-label">Change password</span>
            </button>
            <button type="button" class="nds-btn nds-secondary-outline nds-full" data-goto="mobile">
              <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
              <span class="nds-label">Update mobile number</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-full" data-goto="out">
              <i class="nds-icon nds-hgi-door-01" aria-hidden="true"></i>
              <span class="nds-label">Sign out</span>
            </button>
          </div>
        </div>

        <!-- Change password -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-change-password" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <form id="password-form" class="nds-form" data-ajax>
            <div class="nds-card-content">
              <div class="nds-card-text nds-center">
                <h1 class="nds-card-title">Change your password</h1>
                <p class="nds-card-description">Pick a password you do not use anywhere else.</p>
              </div>

              <!-- Current password -->
              <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                  <label for="current-password">
                    <span class="nds-label">Current password</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                  <input type="password" id="current-password" name="current-password" class="nds-input"
                    autocomplete="current-password" required>
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                    <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                      <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- New password: nds-password reads the rule chips, minlength feeds the length rule -->
              <div class="nds-form-container nds-password" data-required>
                <div class="nds-form-header">
                  <label for="new-password">
                    <span class="nds-label">New password</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                  <input type="password" id="new-password" name="new-password" class="nds-input" autocomplete="new-password"
                    minlength="10" required aria-describedby="new-password-rules">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                    <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                      <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target>
                  <div class="nds-password-rules" id="new-password-rules">
                    <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">At least 10 characters</span>
                    </span>
                    <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="upper">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">One capital letter (A-Z)</span>
                    </span>
                    <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="lower">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">One small letter (a-z)</span>
                    </span>
                    <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">One number (0-9)</span>
                    </span>
                    <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="special">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">One symbol (! @ # $ %)</span>
                    </span>
                  </div>
                  <span class="nds-password-status" role="status" aria-live="polite"></span>
                </div>
              </div>

              <!-- Retype: data-password-match points at the field above -->
              <div class="nds-form-container nds-password" data-required data-password-match="#new-password">
                <div class="nds-form-header">
                  <label for="retype-password">
                    <span class="nds-label">Retype new password</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                  <input type="password" id="retype-password" name="retype-password" class="nds-input"
                    autocomplete="new-password" required aria-describedby="retype-password-rules">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                    <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                      <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target>
                  <div class="nds-password-rules" id="retype-password-rules">
                    <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="match">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">Matches the new password</span>
                    </span>
                  </div>
                  <span class="nds-password-status" role="status" aria-live="polite"></span>
                </div>
              </div>
            </div>

            <div class="nds-card-actions nds-col">
              <button type="submit" class="nds-btn nds-primary nds-full">
                <span class="nds-label">Update password</span>
              </button>
              <button type="button" class="nds-btn nds-subtle nds-full" data-goto="account">
                <span class="nds-label">Cancel</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Update mobile number -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-mobile" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <form id="mobile-form" class="nds-form" data-ajax>
            <div class="nds-card-content">
              <div class="nds-card-text nds-center">
                <h1 class="nds-card-title">Update your mobile number</h1>
                <p class="nds-card-description">Alerts and one-time codes go to this number. We send a code to the new
                number to confirm it.</p>
              </div>

              <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                  <label for="mobile-number">
                    <span class="nds-label">Mobile number</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                  <input type="tel" id="mobile-number" name="mobile-number" class="nds-input" inputmode="numeric"
                    pattern="05[0-9]{8}" maxlength="10" placeholder="05XXXXXXXX" value="0501234419" autocomplete="tel" required
                    data-error-message="Enter a 10-digit number that starts with 05">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target>
                  <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                    <span class="nds-feedback-icon">
                      <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                    <span class="nds-feedback-message">Saudi mobile numbers start with 05 and have 10 digits</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="nds-card-actions nds-col">
              <button type="submit" class="nds-btn nds-primary nds-full">
                <span class="nds-label">Send code</span>
              </button>
              <button type="button" class="nds-btn nds-subtle nds-full" data-goto="account">
                <span class="nds-label">Cancel</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Signed out -->
        <div class="nds-card nds-shadow nds-stroke" id="signin-out" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text nds-center">
              <h1 class="nds-card-title">Signed out</h1>
            </div>

            <div class="nds-alert nds-card nds-color" data-status="success" role="alert">
              <span class="nds-feedback nds-alert-icon nds-outline">
                <span class="nds-feedback-icon">
                  <i class="nds-icon" aria-hidden="true"></i>
                </span>
              </span>
              <div class="nds-alert-content">
                <div class="nds-alert-text">
                  <span class="nds-alert-title">You signed out safely</span>
                  <p class="nds-alert-description">The sign-in page opens again in <strong id="signout-countdown">10</strong>
                    seconds.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="nds-card-actions nds-row">
            <button type="button" class="nds-btn nds-secondary-outline nds-full back-to-start">
              <span class="nds-label">Sign in again</span>
            </button>
          </div>
        </div>
      </div>

      <div class="nds-block nds-center">
        <!-- The minimal layout ships no site chrome, so the way out is on the page -->
        <a href="{{ '/' | relative_url }}" class="nds-btn nds-subtle">
          <i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i>
          <span class="nds-label">Back to home</span>
        </a>
      </div>
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    var cards = {
      start: document.getElementById('signin-start'),
      credentials: document.getElementById('signin-credentials'),
      delivery: document.getElementById('signin-delivery'),
      otp: document.getElementById('signin-otp'),
      account: document.getElementById('signin-account'),
      password: document.getElementById('signin-change-password'),
      mobile: document.getElementById('signin-mobile'),
      out: document.getElementById('signin-out')
    };
    var credForm = document.getElementById('credentials-form');
    var credError = document.getElementById('credentials-error');
    var captchaInput = document.getElementById('captcha-value');
    var captchaText = document.getElementById('captcha-image');
    var otpForm = document.getElementById('otp-form');
    var otpGroup = otpForm.querySelector('.nds-otp-group');
    var passwordForm = document.getElementById('password-form');
    var mobileForm = document.getElementById('mobile-form');
    var captchaCode = '';
    var expectedCode = '';
    var signoutTimer = null;
    // The OTP card is a hub: sign-in and the mobile-number change both send a
    // code through it. This says which flow is running, so verify and cancel
    // know where to go next.
    var otpFlow = 'signin';

    // Plain [hidden] toggling: no NDS component swaps sibling cards (Panel is a
    // slide-in surface, Stepper only stamps the indicator), so this stays native.
    function show(which) {
      Object.keys(cards).forEach(function (key) {
        cards[key].toggleAttribute('hidden', key !== which);
      });
      if (which !== 'out' && signoutTimer) {
        clearInterval(signoutTimer);
        signoutTimer = null;
      }
    }

    // Visual loading only — the loading class itself guards re-entry so a second
    // click during the wait no-ops without flipping the button to :disabled.
    // Cancel/back paths call cancelLoading() to abort the pending work and clear
    // the button. ponytail: setTimeout stands in for the request; a real page
    // would carry an AbortController and call controller.abort() here.
    var pending = null;
    function withLoading(btn, delay, done) {
      if (!btn) { done(); return; }
      if (btn.classList.contains('nds-loading')) return;
      NDS.State.add(btn, 'loading');
      btn.setAttribute('aria-busy', 'true');
      var record = { btn: btn };
      pending = record;
      record.timer = setTimeout(function () {
        pending = null;
        NDS.State.remove(btn, 'loading');
        btn.removeAttribute('aria-busy');
        done();
      }, delay);
    }
    function cancelLoading() {
      if (!pending) return;
      clearTimeout(pending.timer);
      NDS.State.remove(pending.btn, 'loading');
      pending.btn.removeAttribute('aria-busy');
      pending = null;
    }

    function toast(variant, title, description) {
      return NDS.Alert.create({
        variant: variant,
        title: title,
        description: description,
        display: 'toast',
        position: 'top',
        duration: 4000
      });
    }

    // --- Sign-in card -------------------------------------------------------

    // A real page draws the code server-side. Here it is five random digits.
    function newCaptcha() {
      captchaCode = String(Math.floor(10000 + Math.random() * 90000));
      captchaText.textContent = captchaCode;
    }
    newCaptcha();

    // The cooldown component handles the disabled state and the countdown;
    // this only fetches a fresh code when the countdown starts.
    document.getElementById('captcha-refresh')
      .addEventListener('nds:cooldown:triggered', newCaptcha);

    document.getElementById('credentials-btn').addEventListener('click', function () {
      show('credentials');
      document.getElementById('national-id').focus();
    });

    document.getElementById('nafath-btn').addEventListener('click', function () {
      withLoading(this, 1500, function () { show('account'); });
    });

    credForm.querySelector('.forgot-password-link').addEventListener('click', function (e) {
      e.preventDefault();
      toast('info', 'Password reset', 'A reset link was sent to your registered email.');
    });

    credForm.addEventListener('nds:formValid', function () {
      if (captchaInput.value !== captchaCode) {
        credError.hidden = false;
        captchaInput.value = '';
        // The refresh button owns the regeneration, so drive it rather than calling
        // newCaptcha() here as well — that changed the code twice, once now and once
        // when the countdown started, under a user already retyping it. reset() first
        // because start() is a no-op while a countdown is still running.
        var refresh = document.getElementById('captcha-refresh');
        NDS.CooldownButton.reset(refresh);
        NDS.CooldownButton.start(refresh);
        captchaInput.focus();
        return;
      }
      credError.hidden = true;
      withLoading(credForm.querySelector('button[type="submit"]'), 1500, function () {
        show('delivery');
      });
    });

    // --- Delivery method + one-time code ------------------------------------

    function sendCode(destination) {
      expectedCode = String(Math.floor(10000 + Math.random() * 90000));
      // Empties the boxes, syncs the hidden carrier, and focuses the first box.
      // Call it with the card already visible or the focus has nowhere to land.
      NDS.OTP.clear(otpGroup);
      NDS.Forms.clearStatus(otpGroup);
      if (destination) document.getElementById('otp-destination').textContent = destination;
      document.getElementById('otp-demo-code').textContent = expectedCode;
    }

    document.querySelectorAll('.delivery-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        withLoading(btn, 1000, function () {
          otpFlow = 'signin';
          show('otp');
          sendCode(btn.dataset.delivery);
        });
      });
    });

    document.getElementById('otp-resend')
      .addEventListener('nds:cooldown:triggered', function () { sendCode(); });

    otpForm.addEventListener('nds:formValid', function () {
      if (NDS.OTP.getValue(otpGroup) !== expectedCode) {
        NDS.Forms.setStatus({
          element: otpGroup,
          status: 'error',
          message: 'That code is not right. Try again.'
        });
        return;
      }
      withLoading(otpForm.querySelector('button[type="submit"]'), 1500, function () {
        show('account');
        if (otpFlow !== 'mobile') return;
        toast('success', 'Mobile number saved',
          'Codes now go to ' + document.getElementById('mobile-number').value + '.');
      });
    });

    document.getElementById('otp-cancel').addEventListener('click', function () {
      cancelLoading();
      show(otpFlow === 'mobile' ? 'mobile' : 'start');
    });

    // --- Account actions ----------------------------------------------------

    document.querySelectorAll('[data-goto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        show(btn.dataset.goto);
        if (btn.dataset.goto === 'out') startSignoutCountdown();
      });
    });

    document.querySelectorAll('.back-to-start').forEach(function (btn) {
      btn.addEventListener('click', function () { cancelLoading(); show('start'); });
    });

    // --- Change password ----------------------------------------------------

    // Rules and confirm-match come from nds-password: the chips carry data-rule,
    // the retype container carries data-password-match, and the component blocks
    // submit through setCustomValidity. Nothing to wire here.

    passwordForm.addEventListener('nds:formValid', function () {
      withLoading(passwordForm.querySelector('button[type="submit"]'), 1500, function () {
        // Forms listens for no native reset event, so form.reset() would leave the
        // clear buttons and validation paint stale. Clear each field and re-sync it.
        passwordForm.querySelectorAll('input').forEach(function (input) {
          input.value = '';
          NDS.Forms.syncState(input);
        });
        // Repaint the chips and lift the submit block against the now-empty value.
        passwordForm.querySelectorAll('.nds-password').forEach(NDS.Password.check);
        show('account');
        toast('success', 'Password updated', 'Use the new password the next time you sign in.');
      });
    });

    // --- Update mobile ------------------------------------------------------

    // A new number is only saved once a code sent to it comes back verified,
    // so this hands over to the OTP card instead of saving straight away.
    mobileForm.addEventListener('nds:formValid', function () {
      var value = document.getElementById('mobile-number').value;
      withLoading(mobileForm.querySelector('button[type="submit"]'), 1500, function () {
        otpFlow = 'mobile';
        show('otp');
        sendCode(value);
      });
    });

    // --- Sign out -----------------------------------------------------------

    function startSignoutCountdown() {
      var el = document.getElementById('signout-countdown');
      var left = 10;
      el.textContent = left;
      signoutTimer = setInterval(function () {
        left -= 1;
        el.textContent = left;
        if (left > 0) return;
        clearInterval(signoutTimer);
        signoutTimer = null;
        show('start');
      }, 1000);
    }
  });
</script>
