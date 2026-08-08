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
