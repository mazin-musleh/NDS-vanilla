---
layout: minimal
title: Create your account
lang: en
direction: ltr
layout_class: nds-middle
hero_image: assets/img/riyadhcenter.webp
bg_opacity_top: 60%
bg_opacity_bottom: 90%
exclude_showcase: true
breadcrumb: ["Examples"]
---
{% assign brand_logo = page.brandLogo | default: site.brandLogo %}
{% assign brand_width = page.headerBrandW | default: site.headerBrandW %}
{% assign brand_height = page.headerBrandH | default: site.headerBrandH %}
{% assign site_title = page.siteTitle | default: site.title %}

<!-- Step 1: Account Details -->
<div class="nds-card nds-shadow nds-stroke" id="registration-step-1" style="--card-width: 400px;">
  <div class="nds-card-header">
    <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
      height="{{ brand_height }}" alt="{{ site_title }} Logo">
  </div>
  <form id="registration-form-1" class="nds-form" data-ajax>
    <div class="nds-card-content">
      <div class="nds-card-text nds-center">
        <h3 class="nds-card-title">Create your account</h3>
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

      <!-- Password -->
      <div class="nds-form-container" data-required>
        <div class="nds-form-header">
          <label for="password">
            <span class="nds-label">Password</span>
          </label>
        </div>
        <div class="nds-form-control">
          <div class="nds-form-action">
            <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
              <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
            </button>
          </div>
          <input type="password" id="password" class="nds-input" placeholder="Create a password" autocomplete="new-password" minlength="8" required>
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
            <span class="nds-feedback-message">At least 8 characters</span>
          </span>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="nds-form-container" data-required>
        <div class="nds-form-header">
          <label for="confirm-password">
            <span class="nds-label">Confirm password</span>
          </label>
        </div>
        <div class="nds-form-control">
          <div class="nds-form-action">
            <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
              <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
            </button>
          </div>
          <input type="password" id="confirm-password" class="nds-input" placeholder="Re-enter your password" autocomplete="new-password" required>
          <div class="nds-form-action">
            <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
              <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
          </div>
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

      <div class="nds-card-actions nds-row">
        <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
          <span class="nds-label">Create account</span>
        </button>
      </div>

      <div class="nds-card-footer nds-center">
        <span>Already have an account?</span>
        <a href="#" class="login-link">Log in</a>
      </div>
    </div>
  </form>
</div>

<!-- Log in: alternate entry -->
<div class="nds-card nds-shadow nds-stroke" id="registration-login" style="--card-width: 400px;" hidden>
  <div class="nds-card-header">
    <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
      height="{{ brand_height }}" alt="{{ site_title }} Logo">
  </div>
  <form id="login-form" class="nds-form" data-ajax>
    <div class="nds-card-content">
      <div class="nds-card-text nds-center">
        <h3 class="nds-card-title">Welcome back</h3>
        <p class="nds-card-description">Sign in to access your account.</p>
      </div>

      <!-- Email -->
      <div class="nds-form-container" data-required>
        <div class="nds-form-header">
          <label for="login-email">
            <span class="nds-label">Email</span>
          </label>
        </div>
        <div class="nds-form-control">
          <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
          <input type="email" id="login-email" class="nds-input" placeholder="name@example.gov.sa" autocomplete="email" required>
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
          <label for="login-password">
            <span class="nds-label">Password</span>
          </label>
        </div>
        <div class="nds-form-control">
          <div class="nds-form-action">
            <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
              <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
            </button>
          </div>
          <input type="password" id="login-password" class="nds-input" placeholder="Enter your password" autocomplete="current-password" required>
          <div class="nds-form-action">
            <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
              <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="nds-center">
        <a href="#" class="forgot-password-link">Forgot password?</a>
      </div>

      <div class="nds-card-actions nds-row">
        <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
          <span class="nds-label">Log in</span>
        </button>
      </div>

      <div class="nds-card-footer nds-center">
        <span>Don't have an account?</span>
        <a href="#" class="signup-link">Sign up</a>
      </div>
    </div>
  </form>
</div>

<!-- Forgot password -->
<div class="nds-card nds-shadow nds-stroke" id="registration-forgot" style="--card-width: 400px;" hidden>
  <div class="nds-card-header">
    <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
      height="{{ brand_height }}" alt="{{ site_title }} Logo">
  </div>
  <form id="forgot-form" class="nds-form" data-ajax>
    <div class="nds-card-content">
      <div class="nds-card-text nds-center">
        <h3 class="nds-card-title">Reset your password</h3>
        <p class="nds-card-description">Enter your email and we'll send you a link to reset your password.</p>
      </div>

      <!-- Email -->
      <div class="nds-form-container" data-required>
        <div class="nds-form-header">
          <label for="forgot-email">
            <span class="nds-label">Email</span>
          </label>
        </div>
        <div class="nds-form-control">
          <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
          <input type="email" id="forgot-email" class="nds-input" placeholder="name@example.gov.sa" autocomplete="email" required>
          <div class="nds-form-action">
            <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear input">
              <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="nds-card-actions nds-row">
        <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
          <span class="nds-label">Send reset link</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg back-to-login-btn">
          <span class="nds-label">Back to login</span>
        </button>
      </div>
    </div>
  </form>
</div>

<!-- Step 2: Verify Email -->
<div class="nds-card nds-shadow nds-stroke" id="registration-step-2" style="--card-width: 400px;" hidden>
  <div class="nds-card-header">
    <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
      height="{{ brand_height }}" alt="{{ site_title }} Logo">
  </div>
  <form id="registration-form-2" class="nds-form" data-ajax>
    <div class="nds-card-content">
      <div class="nds-card-text nds-center">
        <h3 class="nds-card-title">Verify your email</h3>
        <p class="nds-card-description">Enter the 4-digit code we just sent you to continue.</p>
      </div>

      <fieldset class="nds-form-group nds-otp-group nds-md nds-center" data-required>
        <legend><span class="nds-label">Verification code</span></legend>
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
        <input type="hidden" class="nds-otp-value" name="verification-code">
      </fieldset>

      <p class="nds-card-description nds-center">
        Didn't receive the code? <a href="#" class="resend-link">Resend</a>
      </p>

      <div class="nds-card-actions nds-row">
        <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
          <span class="nds-label">Verify</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg step-prev-btn">
          <span class="nds-label">Back</span>
        </button>
      </div>
    </div>
  </form>
</div>

<!-- Step 3: Success -->
<div class="nds-card nds-shadow nds-stroke" id="registration-step-3" style="--card-width: 400px;" hidden>
  <div class="nds-card-header">
    <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
      height="{{ brand_height }}" alt="{{ site_title }} Logo">
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text nds-center">
      <span class="nds-featured-icon nds-xl nds-circle nds-center" data-status="success">
        <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
      </span>
      <h3 class="nds-card-title">Account created</h3>
      <p class="nds-card-description">Your email has been verified. You're all set.</p>
    </div>

    <div class="nds-card-actions nds-row">
      <a href="{{ '/examples/console-demo/' | relative_url }}" class="nds-btn nds-primary nds-lg nds-full">
        <span class="nds-label">Go to dashboard</span>
      </a>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    var cards = {
      step1: document.getElementById('registration-step-1'),
      step2: document.getElementById('registration-step-2'),
      step3: document.getElementById('registration-step-3'),
      login: document.getElementById('registration-login'),
      forgot: document.getElementById('registration-forgot')
    };
    var form1 = document.getElementById('registration-form-1');
    var form2 = document.getElementById('registration-form-2');
    var loginForm = document.getElementById('login-form');
    var forgotForm = document.getElementById('forgot-form');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirm-password');
    var otpGroup = form2.querySelector('.nds-otp-group');
    var otpHidden = form2.querySelector('.nds-otp-value');
    var expectedCode = '';
    var codeToast = null;

    function show(which) {
      Object.keys(cards).forEach(function (key) {
        cards[key].toggleAttribute('hidden', key !== which);
      });
    }

    function sendCode() {
      expectedCode = String(Math.floor(1000 + Math.random() * 9000));
      // Reset OTP inputs so a stale value can't be submitted against a fresh code.
      otpGroup.querySelectorAll('.nds-otp-container input').forEach(function (i) { i.value = ''; });
      if (otpHidden) otpHidden.value = '';
      NDS.Forms.clearStatus(otpGroup);
      if (!NDS.Alert) return;
      if (codeToast) NDS.Alert.dismiss(codeToast);
      codeToast = NDS.Alert.create({
        variant: 'info',
        title: 'Your verification code',
        description: expectedCode,
        display: 'toast',
        position: 'top'
      });
    }

    function withLoading(btn, delay, done) {
      if (!btn) { done(); return; }
      btn.dataset.state = 'loading';
      setTimeout(function () {
        btn.removeAttribute('data-state');
        done();
      }, delay);
    }

    // Cross-field check: confirm password must match password.
    confirmPassword.addEventListener('input', function () {
      confirmPassword.setCustomValidity(
        confirmPassword.value && confirmPassword.value !== password.value
          ? 'Passwords do not match'
          : ''
      );
    });
    password.addEventListener('input', function () {
      if (confirmPassword.value) {
        confirmPassword.setCustomValidity(
          confirmPassword.value !== password.value ? 'Passwords do not match' : ''
        );
      }
    });

    // Step 1 — Create account
    form1.addEventListener('nds:formValid', function () {
      var btn = form1.querySelector('button[type="submit"]');
      withLoading(btn, 1500, function () {
        sendCode();
        show('step2');
      });
    });

    // Step 2 — Verify
    form2.addEventListener('nds:formValid', function () {
      var entered = (otpHidden && otpHidden.value) || '';
      if (entered !== expectedCode) {
        NDS.Forms.setStatus({
          element: otpGroup,
          status: 'error',
          message: 'Invalid code. Please try again.'
        });
        return;
      }
      var btn = form2.querySelector('button[type="submit"]');
      withLoading(btn, 1500, function () {
        if (codeToast && NDS.Alert) {
          NDS.Alert.dismiss(codeToast);
          codeToast = null;
        }
        show('step3');
        if (NDS.Alert) {
          NDS.Alert.create({
            variant: 'success',
            title: 'Email verified',
            description: 'Your account is ready.',
            display: 'toast',
            position: 'top',
            duration: 3000
          });
        }
      });
    });

    // Login — redirects to the console on success
    loginForm.addEventListener('nds:formValid', function () {
      var btn = loginForm.querySelector('button[type="submit"]');
      withLoading(btn, 1500, function () {
        window.location.href = '{{ "/examples/console-demo/" | relative_url }}';
      });
    });

    // Back
    form2.querySelectorAll('.step-prev-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { show('step1'); });
    });

    // Resend
    form2.querySelectorAll('.resend-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        sendCode();
      });
    });

    // Step 1 "Log in" link → login card
    cards.step1.querySelectorAll('.login-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        show('login');
      });
    });

    // Login card "Sign up" link → step 1
    cards.login.querySelectorAll('.signup-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        show('step1');
      });
    });

    // Login card "Forgot password?" → forgot card
    cards.login.querySelectorAll('.forgot-password-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        show('forgot');
      });
    });

    // Forgot card "Back to login"
    cards.forgot.querySelectorAll('.back-to-login-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { show('login'); });
    });

    // Forgot submit — toast + return to login
    forgotForm.addEventListener('nds:formValid', function () {
      var btn = forgotForm.querySelector('button[type="submit"]');
      withLoading(btn, 1500, function () {
        if (NDS.Alert) {
          NDS.Alert.create({
            variant: 'success',
            title: 'Reset link sent',
            description: 'Check your email for instructions.',
            display: 'toast',
            position: 'top',
            duration: 4000
          });
        }
        forgotForm.reset();
        show('login');
      });
    });
  });
</script>
