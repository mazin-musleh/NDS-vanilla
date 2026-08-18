---
layout: minimal
title: Create your account
lang: en
direction: ltr
# layout + layout_class render the page-level wrapper — it exists only in the built twin under _site/. Copy the full <body> structure from the twin; this file's body is only the inner content.
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
        <!-- Step 1: Account Details -->
        <div class="nds-card nds-shadow nds-stroke" id="registration-step-1">
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <form id="registration-form-1" class="nds-form" data-ajax>
            <div class="nds-card-content">
              <div class="nds-card-text nds-center">
                <h1 class="nds-card-title">Create your account</h1>
                <p class="nds-card-description">Enter your details to get started.</p>
              </div>

              <!-- Full Name -->
              <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                  <label for="full-name">
                    <span class="nds-label">Full name</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="full-name" class="nds-input" placeholder="Your full name" autocomplete="name" required>
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                  <label for="email-address">
                    <span class="nds-label">Email</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                  <input type="email" id="email-address" class="nds-input" placeholder="name@example.gov.sa" autocomplete="email" required>
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Password: the chip carries data-rule, so nds-password checks it live -->
              <div class="nds-form-container nds-password" data-required>
                <div class="nds-form-header">
                  <label for="password">
                    <span class="nds-label">Password</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                  <input type="password" id="password" class="nds-input" placeholder="Create a password" autocomplete="new-password" minlength="8" required aria-describedby="password-rules">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                    <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                      <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target>
                  <div class="nds-password-rules" id="password-rules">
                    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent data-rule="length">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">At least 8 characters</span>
                    </span>
                  </div>
                  <span class="nds-password-status" role="status" aria-live="polite"></span>
                </div>
              </div>

              <!-- Confirm Password: data-password-match points at the field above -->
              <div class="nds-form-container nds-password" data-required data-password-match="#password">
                <div class="nds-form-header">
                  <label for="confirm-password">
                    <span class="nds-label">Confirm password</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                  <input type="password" id="confirm-password" class="nds-input" placeholder="Re-enter your password" autocomplete="new-password" required aria-describedby="confirm-password-rules">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                    <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                      <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target>
                  <div class="nds-password-rules" id="confirm-password-rules">
                    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent data-rule="match">
                      <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                      </span>
                      <span class="nds-feedback-message">Matches the password</span>
                    </span>
                  </div>
                  <span class="nds-password-status" role="status" aria-live="polite"></span>
                </div>
              </div>

              <!-- Terms & Privacy -->
              <div class="nds-form-container nds-check-container" data-required>
                <div class="nds-form-header" data-feedback-target>
                  <label for="accept-terms">
                    <span class="nds-label">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="accept-terms" name="accept-terms" value="accepted" class="nds-check" required>
                </div>
              </div>
            </div>

            <!-- Actions sit outside .nds-card-content: that is the part that scrolls -->
            <div class="nds-card-actions nds-row">
              <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
                <span class="nds-label">Create account</span>
              </button>
            </div>
          </form>

          <p class="nds-note nds-center">
            Already have an account? <a href="{{ '/examples/sign-in/' | relative_url }}">Sign in</a>
          </p>
        </div>

        <!-- Step 2: Verify Email -->
        <div class="nds-card nds-shadow nds-stroke" id="registration-step-2" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <form id="registration-form-2" class="nds-form" data-ajax>
            <div class="nds-card-content">
              <div class="nds-card-text nds-center">
                <h1 class="nds-card-title">Verify your email</h1>
                <p class="nds-card-description">Enter the 4-digit code we just sent you to continue.</p>
              </div>

              <fieldset class="nds-form-group nds-otp-group nds-md nds-center" data-required>
                <legend><span class="nds-label">Verification code</span></legend>
                <div class="nds-otp">
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code" aria-label="Digit 1 of 4">
                    </div>
                  </div>
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 2 of 4">
                    </div>
                  </div>
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 3 of 4">
                    </div>
                  </div>
                  <div class="nds-form-container nds-otp-container">
                    <div class="nds-form-control">
                      <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 4 of 4">
                    </div>
                  </div>
                </div>
                <input type="hidden" class="nds-otp-value" name="verification-code">
                <div class="nds-form-footer" data-feedback-target>
                  <!-- Permanent feedback survives validation cycles: it hides while an error
                       shows and comes back when the error clears. A real page never prints
                       the code — this stands in for the email you would receive. -->
                  <span class="nds-feedback nds-outline nds-sm" data-status="info" data-permanent>
                    <span class="nds-feedback-icon">
                      <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                    <span class="nds-feedback-message">Demo code: <strong id="registration-demo-code">—</strong></span>
                  </span>
                </div>
              </fieldset>

              <p class="nds-note nds-center">Didn't receive the code?</p>
              <div class="nds-center">
                <button type="button" class="nds-btn nds-subtle nds-cooldown" id="registration-resend" data-cooldown="30"
                  data-cooldown-label="Resend in {s}s" data-resend-label="Resend">
                  <span class="nds-label">Resend code</span>
                </button>
              </div>
            </div>

            <div class="nds-card-actions nds-row">
              <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
                <span class="nds-label">Verify</span>
              </button>
              <button type="button" class="nds-btn nds-secondary-outline nds-lg step-prev-btn">
                <span class="nds-label">Back</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Step 3: Success -->
        <div class="nds-card nds-shadow nds-stroke" id="registration-step-3" hidden>
          <div class="nds-card-header">
            <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
              height="{{ brand_height }}" alt="{{ site_title }} Logo">
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text nds-center">
              <span class="nds-featured-icon nds-xl nds-circle nds-center" data-status="success">
                <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
              </span>
              <h1 class="nds-card-title">Account created</h1>
              <p class="nds-card-description">Your email has been verified. You're all set.</p>
            </div>
          </div>

          <div class="nds-card-actions nds-row">
            <a href="{{ '/examples/console-demo/' | relative_url }}" class="nds-btn nds-primary nds-lg nds-full">
              <span class="nds-label">Go to dashboard</span>
            </a>
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
      step1: document.getElementById('registration-step-1'),
      step2: document.getElementById('registration-step-2'),
      step3: document.getElementById('registration-step-3')
    };
    var form1 = document.getElementById('registration-form-1');
    var form2 = document.getElementById('registration-form-2');
    var otpGroup = form2.querySelector('.nds-otp-group');
    var expectedCode = '';
    var demoCode = document.getElementById('registration-demo-code');

    // Plain [hidden] toggling: no NDS component swaps sibling cards (Panel is a
    // slide-in surface, Stepper only stamps the indicator), so this stays native.
    function show(which) {
      Object.keys(cards).forEach(function (key) {
        cards[key].toggleAttribute('hidden', key !== which);
      });
    }

    function sendCode() {
      expectedCode = String(Math.floor(1000 + Math.random() * 9000));
      // Reset OTP inputs so a stale value can't be submitted against a fresh code.
      // Empties the boxes, syncs the hidden carrier, and focuses the first box.
      // Call it with the card already visible or the focus has nowhere to land.
      NDS.OTP.clear(otpGroup);
      NDS.Forms.clearStatus(otpGroup);
      demoCode.textContent = expectedCode;
      // Confirm from the outcome, never from the click. This demo issues the code
      // locally so it cannot fail; against a real endpoint, move this into the
      // response handler and show an error alert from the failure path.
      NDS.Alert.create({
        variant: 'success', title: 'Code sent',
        description: 'A new code is on its way.',
        display: 'toast', position: 'top', duration: 4000
      });
    }

    // Visual loading only — the loading class itself guards re-entry so a second
    // click during the wait no-ops without flipping the button to :disabled.
    // Back/cancel paths call cancelLoading() to abort the pending work and clear
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

    // The confirm field carries data-password-match, so nds-password owns the
    // cross-field check and blocks submit on a mismatch. Nothing to wire here.

    // Step 1 — Create account
    form1.addEventListener('nds:formValid', function () {
      var btn = form1.querySelector('button[type="submit"]');
      withLoading(btn, 1500, function () {
        show('step2');
        sendCode();
      });
    });

    // Step 2 — Verify
    form2.addEventListener('nds:formValid', function () {
      if (NDS.OTP.getValue(otpGroup) !== expectedCode) {
        NDS.Forms.setStatus({
          element: otpGroup,
          status: 'error',
          message: 'Invalid code. Please try again.'
        });
        return;
      }
      var btn = form2.querySelector('button[type="submit"]');
      withLoading(btn, 1500, function () {
        show('step3');
        NDS.Alert.create({
          variant: 'success',
          title: 'Email verified',
          description: 'Your account is ready.',
          display: 'toast',
          position: 'top',
          duration: 3000
        });
      });
    });

    // Back
    form2.querySelectorAll('.step-prev-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { cancelLoading(); show('step1'); });
    });

    // Resend — the cooldown button owns the throttle and the countdown label; the
    // send and its confirmation are yours. Issue the code from its event, never from
    // a bare click handler: a plain link would let the user hammer a real endpoint.
    // The loading state is the page's — against a real endpoint it lasts exactly
    // as long as the request, and the countdown ticks underneath it.
    var resendBtn = document.getElementById('registration-resend');
    resendBtn.addEventListener('nds:cooldown:triggered', function () {
      // withLoading stands in for the request: it holds data-state="loading" for as
      // long as the call runs, then issues the code. The countdown ticks underneath.
      withLoading(resendBtn, 1200, sendCode);
    });
  });
</script>
