---
layout: minimal
title: تسجيل جديد
lang: ar
direction: rtl
layout_class: nds-middle
exclude_showcase: true
breadcrumb: ["Examples"]
---
{% assign brand_logo = page.brandLogo | default: site.brandLogo %}
{% assign brand_width = page.headerBrandW | default: site.headerBrandW %}
{% assign brand_height = page.headerBrandH | default: site.headerBrandH %}
{% assign brand_name = page.brandName | default: site.brandName %}
{% assign brand_name_color = page.brandNameColor | default: site.brandNameColor %}
{% assign brand_slogan = page.brandSlogan | default: site.brandSlogan %}
{% assign brand_slogan_color = page.brandSloganColor | default: site.brandSloganColor %}
{% assign site_title = page.siteTitle | default: site.title %}



<div class="nds-card nds-shadow nds-stroke registration-card" style="--card-width: 400px;">
  <div class="nds-card-header">
    <img class="nds-brand-logo nds-center" src="{{ brand_logo | relative_url }}" width="{{ brand_width }}"
      height="{{ brand_height }}" alt="{{ site_title }} Logo">
    <div class="nds-stepper nds-radial" id="registration-stepper" data-current="1" data-total="3"
      style="--pc-size:72px;">
      <div class="progress-circle">
        <svg width="64" height="64" viewBox="0 0 24 24">
          <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
          <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3" stroke-dasharray="62.83"
            stroke-dashoffset="62.83" stroke-linecap="round" />
        </svg>
        <div class="progress-info">
          <span class="progress-percentage">
            <span class="progress-number">0</span>
          </span>
          <span class="progress-text"></span>
        </div>
      </div>
      <div class="nds-stepper-step has-line">
        <div class="nds-stepper-base">
          <div class="nds-stepper-circle" data-step-text="1"></div>
        </div>
        <div class="nds-stepper-content">
          <span class="nds-stepper-title">البيانات الأساسية</span>
          <span class="nds-stepper-description">يرجى إدخال بياناتك الأكاديمية للتحقق من هويتك</span>
        </div>
      </div>
      <div class="nds-stepper-step has-line">
        <div class="nds-stepper-base">
          <div class="nds-stepper-circle" data-step-text="2"></div>
        </div>
        <div class="nds-stepper-content">
          <span class="nds-stepper-title">البريد الإلكتروني</span>
          <span class="nds-stepper-description">أدخل بريدك الإلكتروني لإرسال رمز التحقق</span>
        </div>
      </div>
      <div class="nds-stepper-step">
        <div class="nds-stepper-base">
          <div class="nds-stepper-circle" data-step-text="3"></div>
        </div>
        <div class="nds-stepper-content">
          <span class="nds-stepper-title">تأكيد البريد الإلكتروني</span>
          <span class="nds-stepper-description">تم إرسال رمز التحقق إلى بريدك الإلكتروني</span>
        </div>
      </div>
    </div>
  </div>
  <form id="registration-form" class="nds-card-form">
    <!-- Step 1: Basic Information -->
    <div class="nds-card-content registration-step active">
      <div class="nds-card-form">
        <!-- University ID Field -->
        <div class="nds-form-container nds-required">
          <div class="nds-form-header">
            <label for="university-id">
              <span class="label">الرقم الجامعي</span>
            </label>
          </div>
          <div class="nds-form-control">
            <input type="text" id="university-id" class="nds-input" placeholder="" value="" required>
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear input">
                <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
              </button>
            </div>
          </div>
          <div class="nds-form-footer">
            <span class="nds-feedback">
              <span class="nds-feedback-icon nds-outline nds-sm">
                <i class="hgi hgi-solid icon"></i>
              </span>
              <span class="msg"></span>
            </span>
          </div>
        </div>

        <!-- Graduation Year Dropdown -->
        <div class="nds-form-container nds-select nds-required">
          <div class="nds-form-header">
            <label for="graduation-year">
              <span class="label">اختر عام التخرج</span>
            </label>
          </div>
          <div class="nds-form-control">
            <input type="text" id="graduation-year" class="nds-input nds-select-input" placeholder="اختر السنة..."
              readonly required>
            <input type="hidden" name="graduationYearValue" class="nds-select-value">

            <!-- Custom Dropdown Menu -->
            <div class="nds-select-dropdown hidden">
              <div class="select-options">
                <button type="button" class="nds-btn nds-subtle select-option" data-value="">
                  <span class="option-text">اختر السنة...</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="2025">
                  <span class="option-text">2025</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="2024">
                  <span class="option-text">2024</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="2023">
                  <span class="option-text">2023</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="2022">
                  <span class="option-text">2022</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="2021">
                  <span class="option-text">2021</span>
                </button>
              </div>
            </div>
          </div>
          <div class="nds-form-footer">
            <span class="nds-feedback">
              <span class="nds-feedback-icon nds-outline nds-sm">
                <i class="hgi hgi-solid icon"></i>
              </span>
              <span class="msg"></span>
            </span>
          </div>
        </div>

        <!-- Date of Birth Field -->
        <div class="nds-form-container nds-date-picker nds-required">
          <div class="nds-form-header">
            <label for="date-of-birth">
              <span class="label">تاريخ الميلاد</span>
            </label>
          </div>
          <div class="nds-form-control">
            <div class="nds-form-action before">
              <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle" aria-label="Calendar Toggler">
                <i class="hgi hgi-stroke hgi-calendar-03 icon"></i>
              </button>
            </div>
            <input type="text" id="date-of-birth" class="nds-input nds-date-input" placeholder="mm/dd/yyyy"
              data-year-before="40" data-year-after="5" data-hijri-offset="0" required>
          </div>
          <div class="nds-form-footer">
            <span class="nds-feedback">
              <span class="nds-feedback-icon nds-outline nds-sm">
                <i class="hgi hgi-solid icon"></i>
              </span>
              <span class="msg"></span>
            </span>
          </div>
        </div>

        <!-- Where did you hear about us -->
        <div class="nds-form-container nds-select nds-required">
          <div class="nds-form-header">
            <label for="heard-about">
              <span class="label">من أين سمعت عن المنصة؟</span>
            </label>
          </div>
          <div class="nds-form-control">
            <input type="text" id="heard-about" class="nds-input nds-select-input" placeholder="اختر الإجابة..."
              readonly required>
            <input type="hidden" name="heardAboutValue" class="nds-select-value">

            <!-- Custom Dropdown Menu -->
            <div class="nds-select-dropdown hidden">
              <div class="select-options">
                <button type="button" class="nds-btn nds-subtle select-option" data-value="">
                  <span class="option-text">اختر الإجابة...</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="social-media">
                  <span class="option-text">وسائل التواصل الاجتماعي</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="friends">
                  <span class="option-text">الأصدقاء</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="university">
                  <span class="option-text">الجامعة</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="search-engine">
                  <span class="option-text">محركات البحث</span>
                </button>
                <button type="button" class="nds-btn nds-subtle select-option" data-value="other">
                  <span class="option-text">أخرى</span>
                </button>
              </div>
            </div>
          </div>
          <div class="nds-form-footer">
            <span class="nds-feedback">
              <span class="nds-feedback-icon nds-outline nds-sm">
                <i class="hgi hgi-solid icon"></i>
              </span>
              <span class="msg"></span>
            </span>
          </div>
        </div>
      </div>
      <!-- Next Button -->
      <div class="nds-card-actions">
        <button type="button" class="nds-btn nds-primary nds-lg nds-full step-next-btn">
          <span class="label">التالي</span>
        </button>
      </div>

      <!-- Forgot Data Link -->
      <div class="nds-card-footer">
        <span class="forgot-data-text">لا تتذكر بياناتك؟</span>
        <a href="#" class="forgot-data-link">
          لم أتذكر بياناتي
        </a>
      </div>
    </div>

    <!-- Step 2: Email Verification -->
    <div class="nds-card-content registration-step">
      <div class="nds-card-form">
        <!-- Email Field -->
        <div class="nds-form-container nds-required">
          <div class="nds-form-header">
            <label for="email-address">
              <span class="label">البريد الإلكتروني</span>
            </label>
          </div>
          <div class="nds-form-control">
            <div class="nds-form-action before">
              <button type="button" class="nds-btn nds-subtle nds-md" aria-label="Email icon">
                <i class="hgi hgi-stroke hgi-mail-01 icon"></i>
              </button>
            </div>
            <input type="email" id="email-address" class="nds-input" placeholder="" value="" required>
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear input">
                <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
              </button>
            </div>
          </div>
          <div class="nds-form-footer">
            <span class="nds-feedback">
              <span class="nds-feedback-icon nds-outline nds-sm">
                <i class="hgi hgi-solid icon"></i>
              </span>
              <span class="msg"></span>
            </span>
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="nds-card-actions nds-btn-group">
        <button type="button" class="nds-btn nds-secondary-outline nds-lg step-prev-btn">
          <span class="label">السابق</span>
        </button>
        <button type="button" class="nds-btn nds-primary nds-lg nds-full step-next-btn">
          <span class="label">إرسال رمز التحقق</span>
        </button>
      </div>

      <!-- Forgot Data Link -->
      <div class="nds-card-footer">
        <span class="forgot-data-text">لا تتذكر بياناتك؟</span>
        <a href="#" class="forgot-data-link">
          لم أتذكر بياناتي
        </a>
      </div>
    </div>

    <!-- Step 3: Verification Code -->
    <div class="nds-card-content registration-step">
      <div class="nds-card-form">
        <!-- Verification Code Field -->
        <div class="nds-form-container nds-required">
          <div class="nds-form-header">
            <label for="verification-code">
              <span class="label">أدخل رمز التحقق</span>
            </label>
          </div>
          <div class="nds-form-control">
            <input type="text" id="verification-code" class="nds-input" placeholder="" value="" required>
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear input">
                <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
              </button>
            </div>
          </div>
          <div class="nds-form-footer">
            <span class="nds-feedback">
              <span class="nds-feedback-icon nds-info nds-outline nds-sm">
                <i class="hgi hgi-solid icon"></i>
              </span>
              <span class="msg">لم تستلم الرمز؟ <a href="#" class="resend-link">إعادة الإرسال</a></span>
            </span>
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="nds-card-actions nds-btn-group">
        <button type="button" class="nds-btn nds-secondary-outline nds-lg step-prev-btn">
          <span class="label">السابق</span>
        </button>
        <button type="submit" class="nds-btn nds-primary nds-lg nds-full">
          <span class="label">تأكيد التسجيل</span>
        </button>
      </div>

      <!-- Forgot Data Link -->
      <div class="nds-card-footer">
        <span class="forgot-data-text">لا تتذكر بياناتك؟</span>
        <a href="#" class="forgot-data-link">
          لم أتذكر بياناتي
        </a>
      </div>
    </div>
  </form>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.nds-card-content.registration-step');
    const stepperId = 'registration-stepper';
    let currentStep = 1;
    const totalSteps = 3;

    // Show specific step
    function showStep(stepNumber) {
      steps.forEach((step, index) => {
        if (index + 1 === stepNumber) {
          step.classList.remove('hidden');
          step.classList.add('active');
        } else {
          step.classList.add('hidden');
          step.classList.remove('active');
        }
      });
      currentStep = stepNumber;

      // Update NDS stepper using the global API
      if (window.NDSStepper) {
        NDSStepper.goTo(stepperId, stepNumber);
      }
    }

    // Next button handlers
    document.querySelectorAll('.step-next-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        if (currentStep < totalSteps) {
          showStep(currentStep + 1);
        }
      });
    });

    // Previous button handlers
    document.querySelectorAll('.step-prev-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        if (currentStep > 1) {
          showStep(currentStep - 1);
        }
      });
    });

    // Initialize first step
    setTimeout(function () {
      showStep(1);
    }, 100);
  });
</script>