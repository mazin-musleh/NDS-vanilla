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
      <h2 class="nds-section-title">nds-editor</h2>
      <p class="nds-section-description">محرر نصوص منسقة يعتمد contenteditable مع حقل نموذج مرآة. المثيل الأول فارغ وإلزامي، والثاني مُعبّأ مسبقًا لاختبار الاستعادة وتعدد المثيلات.</p>
    </div>
    <div class="nds-section-body">

    <form class="nds-flex nds-col" onsubmit="event.preventDefault(); const fd = new FormData(this); console.log('form submit →', Object.fromEntries(fd));">

      <div class="nds-form-container nds-textarea nds-editor" data-required>
        <div class="nds-form-header">
          <label id="story-label" for="story"><span class="nds-label">القصة</span></label>
        </div>

        <div class="nds-toolbar">
          <div class="nds-bar-start">
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="undo" aria-label="تراجع"><i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="redo" aria-label="إعادة"><i class="hgi hgi-stroke hgi-arrow-turn-forward" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold"      aria-pressed="false" aria-label="غامق"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic"    aria-pressed="false" aria-label="مائل"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="تسطير"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="strike"    aria-pressed="false" aria-label="يتوسطه خط"><i class="hgi hgi-stroke hgi-text-strikethrough" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="clear" aria-label="مسح التنسيق"><i class="hgi hgi-stroke hgi-text-clear" aria-hidden="true"></i></button>
            </div>
            <div class="nds-dropmenu" data-nds-editor-link-dropmenu>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="link" aria-pressed="false" aria-label="إدراج رابط"><i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i></button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll nds-editor-link-form">
                  <div class="nds-form-container nds-input">
                    <div class="nds-form-header"><label><span class="nds-label">الرابط</span></label></div>
                    <div class="nds-form-control">
                      <input type="url" class="nds-input" placeholder="https://" autocomplete="off" data-nds-editor-link-url />
                    </div>
                  </div>
                  <div class="nds-editor-link-actions">
                    <button type="button" class="nds-btn nds-secondary-outline" data-nds-editor-link-unlink hidden><span class="nds-label">إزالة الرابط</span></button>
                    <button type="button" class="nds-btn nds-primary" data-nds-editor-link-confirm data-dropmenu-primary><span class="nds-label">إدراج</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h1" aria-pressed="false" aria-label="عنوان 1"><i class="hgi hgi-stroke hgi-heading-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h2" aria-pressed="false" aria-label="عنوان 2"><i class="hgi hgi-stroke hgi-heading-02" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h3" aria-pressed="false" aria-label="عنوان 3"><i class="hgi hgi-stroke hgi-heading-03" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="قائمة نقطية"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="قائمة رقمية"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group" data-nds-editor-block-ops hidden></div>
            <div class="nds-btn-group" data-nds-editor-block-controls hidden>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-up" aria-label="نقل لأعلى"><i class="hgi hgi-stroke hgi-arrow-up-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-down" aria-label="نقل لأسفل"><i class="hgi hgi-stroke hgi-arrow-down-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-primary nds-destructive nds-md nds-icon-only" data-block-cmd="delete" aria-label="حذف المكون"><i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="nds-bar-end">
            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="عرض مصدر HTML"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
          </div>
        </div>

        <div class="nds-form-control">
          <div class="nds-editor-editable is-empty"
               contenteditable="true"
               role="textbox"
               aria-multiline="true"
               aria-labelledby="story-label"
               data-placeholder="اكتب هنا…"><p><br></p></div>
          <textarea class="nds-textarea nds-editor-source" name="story" id="story" tabindex="-1" required></textarea>
        </div>
      </div>

      <div class="nds-form-container nds-textarea nds-editor">
        <div class="nds-form-header">
          <label id="report-label" for="report"><span class="nds-label">التقرير</span></label>
        </div>

        <div class="nds-toolbar">
          <div class="nds-bar-start">
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="undo" aria-label="تراجع"><i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="redo" aria-label="إعادة"><i class="hgi hgi-stroke hgi-arrow-turn-forward" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold"      aria-pressed="false" aria-label="غامق"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic"    aria-pressed="false" aria-label="مائل"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="تسطير"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="strike"    aria-pressed="false" aria-label="يتوسطه خط"><i class="hgi hgi-stroke hgi-text-strikethrough" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="clear" aria-label="مسح التنسيق"><i class="hgi hgi-stroke hgi-text-clear" aria-hidden="true"></i></button>
            </div>
            <div class="nds-dropmenu" data-nds-editor-link-dropmenu>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="link" aria-pressed="false" aria-label="إدراج رابط"><i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i></button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll nds-editor-link-form">
                  <div class="nds-form-container nds-input">
                    <div class="nds-form-header"><label><span class="nds-label">الرابط</span></label></div>
                    <div class="nds-form-control">
                      <input type="url" class="nds-input" placeholder="https://" autocomplete="off" data-nds-editor-link-url />
                    </div>
                  </div>
                  <div class="nds-editor-link-actions">
                    <button type="button" class="nds-btn nds-secondary-outline" data-nds-editor-link-unlink hidden><span class="nds-label">إزالة الرابط</span></button>
                    <button type="button" class="nds-btn nds-primary" data-nds-editor-link-confirm data-dropmenu-primary><span class="nds-label">إدراج</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h1" aria-pressed="false" aria-label="عنوان 1"><i class="hgi hgi-stroke hgi-heading-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h2" aria-pressed="false" aria-label="عنوان 2"><i class="hgi hgi-stroke hgi-heading-02" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h3" aria-pressed="false" aria-label="عنوان 3"><i class="hgi hgi-stroke hgi-heading-03" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="قائمة نقطية"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="قائمة رقمية"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group" data-nds-editor-block-ops hidden></div>
            <div class="nds-btn-group" data-nds-editor-block-controls hidden>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-up" aria-label="نقل لأعلى"><i class="hgi hgi-stroke hgi-arrow-up-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-down" aria-label="نقل لأسفل"><i class="hgi hgi-stroke hgi-arrow-down-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-primary nds-destructive nds-md nds-icon-only" data-block-cmd="delete" aria-label="حذف المكون"><i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="nds-bar-end">
            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="عرض مصدر HTML"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
          </div>
        </div>

        <div class="nds-form-control">
          <div class="nds-editor-editable"
               contenteditable="true"
               role="textbox"
               aria-multiline="true"
               aria-labelledby="report-label"
               data-placeholder="اكتب هنا…"><p><br></p></div>
          <textarea class="nds-textarea nds-editor-source" name="report" id="report" tabindex="-1">
<h2>تقرير الحالة</h2>
<p>هذا نص تجريبي يحتوي على <a href="https://nds.gov.sa" rel="noopener noreferrer">رابط تجريبي</a> ضمن فقرة، مع نص <strong>غامق</strong> ونص <em>مائل</em>.</p>
<p>فقرة ختامية بعد المكون المدرج.</p>
          </textarea>
        </div>
      </div>

      <div class="nds-form-container nds-textarea nds-editor" data-state="readonly">
        <div class="nds-form-header">
          <label id="notes-label" for="notes"><span class="nds-label">ملاحظات المراجعة (للقراءة فقط)</span></label>
        </div>

        <div class="nds-toolbar">
          <div class="nds-bar-start">
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="undo" aria-label="تراجع"><i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="redo" aria-label="إعادة"><i class="hgi hgi-stroke hgi-arrow-turn-forward" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold"      aria-pressed="false" aria-label="غامق"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic"    aria-pressed="false" aria-label="مائل"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="تسطير"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="strike"    aria-pressed="false" aria-label="يتوسطه خط"><i class="hgi hgi-stroke hgi-text-strikethrough" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="clear" aria-label="مسح التنسيق"><i class="hgi hgi-stroke hgi-text-clear" aria-hidden="true"></i></button>
            </div>
            <div class="nds-dropmenu" data-nds-editor-link-dropmenu>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="link" aria-pressed="false" aria-label="إدراج رابط"><i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i></button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll nds-editor-link-form">
                  <div class="nds-form-container nds-input">
                    <div class="nds-form-header"><label><span class="nds-label">الرابط</span></label></div>
                    <div class="nds-form-control">
                      <input type="url" class="nds-input" placeholder="https://" autocomplete="off" data-nds-editor-link-url />
                    </div>
                  </div>
                  <div class="nds-editor-link-actions">
                    <button type="button" class="nds-btn nds-secondary-outline" data-nds-editor-link-unlink hidden><span class="nds-label">إزالة الرابط</span></button>
                    <button type="button" class="nds-btn nds-primary" data-nds-editor-link-confirm data-dropmenu-primary><span class="nds-label">إدراج</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h1" aria-pressed="false" aria-label="عنوان 1"><i class="hgi hgi-stroke hgi-heading-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h2" aria-pressed="false" aria-label="عنوان 2"><i class="hgi hgi-stroke hgi-heading-02" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h3" aria-pressed="false" aria-label="عنوان 3"><i class="hgi hgi-stroke hgi-heading-03" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="قائمة نقطية"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="قائمة رقمية"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group" data-nds-editor-block-ops hidden></div>
            <div class="nds-btn-group" data-nds-editor-block-controls hidden>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-up" aria-label="نقل لأعلى"><i class="hgi hgi-stroke hgi-arrow-up-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-down" aria-label="نقل لأسفل"><i class="hgi hgi-stroke hgi-arrow-down-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-primary nds-destructive nds-md nds-icon-only" data-block-cmd="delete" aria-label="حذف المكون"><i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="nds-bar-end">
            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="عرض مصدر HTML"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
          </div>
        </div>

        <div class="nds-form-control">
          <div class="nds-editor-editable"
               contenteditable="false"
               role="textbox"
               aria-multiline="true"
               aria-readonly="true"
               aria-labelledby="notes-label"
               data-placeholder="اكتب هنا…"><p><br></p></div>
          <textarea class="nds-textarea nds-editor-source" name="notes" id="notes" tabindex="-1" readonly>
<p>هذه الملاحظات <strong>للقراءة فقط</strong> — المحتوى قابل للتحديد والنسخ دون تعديل، وعرض المصدر متاح.</p>
          </textarea>
        </div>
      </div>

      <div class="nds-form-container nds-textarea nds-editor">
        <div class="nds-form-header">
          <label id="composed-label" for="composed"><span class="nds-label">مستند بالمكونات (تجربة إدراج الكتل)</span></label>
        </div>

        <div class="nds-toolbar">
          <div class="nds-bar-start">
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="undo" aria-label="تراجع"><i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="redo" aria-label="إعادة"><i class="hgi hgi-stroke hgi-arrow-turn-forward" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold"      aria-pressed="false" aria-label="غامق"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic"    aria-pressed="false" aria-label="مائل"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="تسطير"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="strike"    aria-pressed="false" aria-label="يتوسطه خط"><i class="hgi hgi-stroke hgi-text-strikethrough" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="clear" aria-label="مسح التنسيق"><i class="hgi hgi-stroke hgi-text-clear" aria-hidden="true"></i></button>
            </div>
            <div class="nds-dropmenu" data-nds-editor-link-dropmenu>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="link" aria-pressed="false" aria-label="إدراج رابط"><i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i></button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll nds-editor-link-form">
                  <div class="nds-form-container nds-input">
                    <div class="nds-form-header"><label><span class="nds-label">الرابط</span></label></div>
                    <div class="nds-form-control">
                      <input type="url" class="nds-input" placeholder="https://" autocomplete="off" data-nds-editor-link-url />
                    </div>
                  </div>
                  <div class="nds-editor-link-actions">
                    <button type="button" class="nds-btn nds-secondary-outline" data-nds-editor-link-unlink hidden><span class="nds-label">إزالة الرابط</span></button>
                    <button type="button" class="nds-btn nds-primary" data-nds-editor-link-confirm data-dropmenu-primary><span class="nds-label">إدراج</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h1" aria-pressed="false" aria-label="عنوان 1"><i class="hgi hgi-stroke hgi-heading-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h2" aria-pressed="false" aria-label="عنوان 2"><i class="hgi hgi-stroke hgi-heading-02" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h3" aria-pressed="false" aria-label="عنوان 3"><i class="hgi hgi-stroke hgi-heading-03" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="قائمة نقطية"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="قائمة رقمية"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
            </div>
            <div class="nds-dropmenu" data-nds-editor-insert-dropmenu>
              <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="insert" aria-label="إدراج مكون"><i class="hgi hgi-stroke hgi-add-01" aria-hidden="true"></i></button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll"></div>
              </div>
            </div>
            <div class="nds-btn-group" data-nds-editor-block-ops hidden></div>
            <div class="nds-btn-group" data-nds-editor-block-controls hidden>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-up" aria-label="نقل لأعلى"><i class="hgi hgi-stroke hgi-arrow-up-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-down" aria-label="نقل لأسفل"><i class="hgi hgi-stroke hgi-arrow-down-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-primary nds-destructive nds-md nds-icon-only" data-block-cmd="delete" aria-label="حذف المكون"><i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="nds-bar-end">
            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="عرض مصدر HTML"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
          </div>
        </div>

        <div class="nds-form-control">
          <div class="nds-editor-editable is-empty"
               contenteditable="true"
               role="textbox"
               aria-multiline="true"
               aria-labelledby="composed-label"
               data-placeholder="اكتب هنا وأدرج مكونات من زر الإدراج…"><p><br></p></div>
          <textarea class="nds-textarea nds-editor-source" name="composed" id="composed" tabindex="-1"></textarea>
        </div>
      </div>

      <div>
        <button type="submit" class="nds-btn nds-primary"><span class="nds-label">إرسال (يسجل في وحدة التحكم)</span></button>
      </div>
    </form>

    </div>
  </div>
</section>
