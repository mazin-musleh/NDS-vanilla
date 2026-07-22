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

      <!-- Editor with data-dropmenu-portal: toolbar link/image/remove menus
           portal to <body>, escaping this overflow:hidden frame. Drop the
           attribute to see the menus get clipped by the frame instead. -->
      <div style="overflow: hidden; border: 1px solid var(--border-neutral-secondary); border-radius: var(--radius-md); padding: var(--spacing-2xl);">
        <div class="nds-form-container nds-textarea nds-editor" data-dropmenu-portal>
          <div class="nds-form-header">
            <label for="editor-portal-field"><span class="nds-label">محرر داخل إطار مقصوص</span></label>
          </div>
          <div class="nds-form-control">
            <textarea class="nds-textarea" name="editor-portal" id="editor-portal-field" placeholder="اكتب هنا"></textarea>
          </div>
          <div class="nds-form-footer" data-feedback-target hidden></div>
        </div>
      </div>

    </div>
  </div>
</section>
