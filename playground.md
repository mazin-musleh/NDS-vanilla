---
layout: home
sitemap: false  # internal dev/test page — keep out of the public sitemap
noindex: true   # also tell crawlers not to index it if reached via a link
title: "نظام التصميم الموحد لكود المنصات السعودي"
hero_title: "النظام الوطني للتصميم"
hero_description: "نظام تصميم شامل يُمكِّن من بناء تجارب رقمية حكومية متّسقة وقابلة للوصول وعالية الأداء."
hero_image_pos: 50% 10%
lang: ar
direction: rtl
---

<!-- Internal dev/test scratch page. Drop components here to test in isolation. -->

<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">مساحة الاختبار</h2>
      <p class="nds-section-description">أسقط المكون التالي هنا</p>
    </div>
    <div class="nds-section-body">

      <p>قائمة مباشرة داخل جسم القسم بدون أي غلاف بينهما:</p>
      <ul>
        <li>العنصر الأول في القائمة</li>
        <li>العنصر الثاني في القائمة</li>
        <li>العنصر الثالث في القائمة</li>
      </ul>

      <div class="nds-block">
        <h3 class="nds-block-title">قائمة غير مرتبة مع قائمة فرعية</h3>
        <p>فقرة تمهيدية قبل القائمة لقياس المسافة بين الفقرة والقائمة.</p>
        <ul>
          <li>عنصر عادي في المستوى الأول</li>
          <li>عنصر يحتوي على قائمة فرعية:
            <ul>
              <li>عنصر فرعي أول</li>
              <li>عنصر فرعي ثاني</li>
              <li>عنصر فرعي ثالث يمتد على أكثر من سطر واحد لقياس ارتفاع السطر ومحاذاة النص داخل القائمة الفرعية عند الالتفاف</li>
            </ul>
          </li>
          <li>العنصر الأخير في المستوى الأول</li>
        </ul>
        <p>فقرة بعد القائمة لقياس المسافة السفلية.</p>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">قائمة مرتبة بعلامات من رقمين</h3>
        <ol>
          <li>البند الأول</li>
          <li>البند الثاني</li>
          <li>البند الثالث</li>
          <li>البند الرابع</li>
          <li>البند الخامس</li>
          <li>البند السادس</li>
          <li>البند السابع</li>
          <li>البند الثامن</li>
          <li>البند التاسع</li>
          <li>البند العاشر</li>
          <li>البند الحادي عشر</li>
          <li>البند الثاني عشر</li>
        </ol>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">تداخل على ثلاثة مستويات</h3>
        <ol>
          <li>المستوى الأول
            <ol>
              <li>المستوى الثاني
                <ol>
                  <li>المستوى الثالث</li>
                  <li>المستوى الثالث</li>
                </ol>
              </li>
              <li>المستوى الثاني بعد التداخل</li>
            </ol>
          </li>
          <li>المستوى الأول بعد التداخل</li>
        </ol>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">قائمة مرقمة داخل قائمة نقطية</h3>
        <ul>
          <li>عنصر يحتوي على خطوات مرقمة:
            <ol>
              <li>الخطوة الأولى</li>
              <li>الخطوة الثانية</li>
            </ol>
          </li>
          <li>عنصر بدون تداخل</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">تحقق القائمة المنسدلة المخصصة والإكمال التلقائي</h2>
      <p class="nds-section-description">إرسال فارغ = خطأ على الحقلين المطلوبين. الاختيار يمسح الخطأ. نص مكتوب دون اختيار في حقل الإكمال التلقائي يرفض عند الإرسال</p>
    </div>
    <div class="nds-section-body">

      <form class="nds-form" data-ajax>
        <div class="nds-form-container">
          <div class="nds-form-header">
            <label for="pg-name"><span class="nds-label">الاسم</span></label>
          </div>
          <div class="nds-form-control">
            <input type="text" id="pg-name" class="nds-input" placeholder="اكتب الاسم" required>
          </div>
          <div class="nds-form-footer" data-feedback-target hidden></div>
        </div>

        <div class="nds-form-container nds-select" data-required>
          <div class="nds-form-header">
            <label for="pg-service"><span class="nds-label">الخدمة</span></label>
          </div>
          <div class="nds-form-control">
            <input type="text" id="pg-service" class="nds-input nds-select-input" placeholder="اختر الخدمة" readonly>
            <input type="hidden" name="pg-service-value" class="nds-select-value">
            <div class="nds-select-dropdown" hidden>
              <div class="nds-select-options">
                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="license"><span class="nds-option-text">تجديد رخصة</span></button>
                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="registry"><span class="nds-option-text">سجل تجاري</span></button>
              </div>
            </div>
          </div>
          <div class="nds-form-footer" data-feedback-target hidden></div>
        </div>

        <div class="nds-form-container" data-url="{{ '/docs-assets/data/services-autocomplete.json' | relative_url }}"
          data-name="Title" data-fetch="once" data-strict>
          <div class="nds-form-header">
            <label for="pg-search"><span class="nds-label">الخدمة المرتبطة</span></label>
          </div>
          <div class="nds-form-control">
            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
            <input type="text" id="pg-search" autocomplete="on" placeholder="اكتب ثلاثة أحرف على الأقل">
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="nds-form-footer" data-feedback-target hidden></div>
        </div>

        <div class="nds-form-action">
          <button type="submit" class="nds-btn nds-primary"><span class="nds-label">إرسال</span></button>
        </div>
      </form>

    </div>
  </div>
</section>

<!-- NDS Password: strength rules + confirm-match. LTR for readability while testing. -->
<section class="nds-content-section" dir="ltr" lang="en">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Password component</h2>
      <p class="nds-section-description">Empty submit blocks (required). Weak password blocks (rules). Mismatched confirm blocks (match). Live status paints on the chips.</p>
    </div>
    <div class="nds-section-body">

      <form class="nds-form" data-ajax id="pg-password-form">
        <!-- New password: 5 strength chips, min length 10 -->
        <div class="nds-form-container nds-password" data-required>
          <div class="nds-form-header">
            <label for="pg-new-password"><span class="nds-label">New password</span></label>
          </div>
          <div class="nds-form-control">
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
              </button>
            </div>
            <input type="password" id="pg-new-password" name="new-password" class="nds-input" autocomplete="new-password" minlength="10" required>
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="nds-form-footer" data-feedback-target>
            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
              <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
              <span class="nds-feedback-message">At least 10 characters</span>
            </span>
            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="upper">
              <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
              <span class="nds-feedback-message">One capital letter (A-Z)</span>
            </span>
            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="lower">
              <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
              <span class="nds-feedback-message">One small letter (a-z)</span>
            </span>
            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit">
              <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
              <span class="nds-feedback-message">One number (0-9)</span>
            </span>
            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="special">
              <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
              <span class="nds-feedback-message">One symbol (! @ # $ %)</span>
            </span>
            <!-- Custom rule via data-rule-pattern — no JS behind this one -->
            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="nospace" data-rule-pattern="^\S+$">
              <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
              <span class="nds-feedback-message">No spaces</span>
            </span>
          </div>
        </div>

        <!-- Retype: match mode, points at #pg-new-password -->
        <div class="nds-form-container nds-password" data-required data-password-match="#pg-new-password">
          <div class="nds-form-header">
            <label for="pg-retype-password"><span class="nds-label">Retype new password</span></label>
          </div>
          <div class="nds-form-control">
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
              </button>
            </div>
            <input type="password" id="pg-retype-password" name="retype-password" class="nds-input" autocomplete="new-password" required>
            <div class="nds-form-action">
              <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="nds-form-action">
          <button type="submit" class="nds-btn nds-primary"><span class="nds-label">Submit</span></button>
        </div>
      </form>

      <script>
        document.addEventListener('DOMContentLoaded', function () {
          var form = document.getElementById('pg-password-form');
          form.addEventListener('nds:formValid', function () {
            NDS.Alert.create({
              variant: 'success',
              title: 'Password accepted',
              description: 'All rules passed and both fields match.',
              display: 'toast',
              position: 'top',
              duration: 3000
            });
          });
        });
      </script>

    </div>
  </div>
</section>
