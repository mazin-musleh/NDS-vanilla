---
layout: page
title: "أعضاء هيئة التدريس"
lang: ar
direction: rtl
breadcrumb: ["أعضاء هيئة التدريس"]
hero_title: "أعضاء هيئة التدريس"
hero_description: "قائمة أعضاء هيئة التدريس في كلية الحاسب"
layout_class: cardView
sidemenu: college-sidemenu
---

<section id="facultyList" class="nds-content-section">
    <div class="nds-section-head">
        <h2 class="nds-section-title">أعضاء هيئة التدريس</h2>
        <p class="nds-section-description">أستاذ مشارك</p>
        <div class="nds-section-action">
            <div class="nds-dropmenu">
                <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                    <span class="label">تصفية</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 300px;">
                    <!-- Search Input -->
                    <div class="nds-form-control nds-dropmenu-item" data-no-auto-close>
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <input type="text" placeholder="بحث..." class="nds-search-input">
                        <div class="nds-form-action">
                            <button class="nds-btn nds-subtle voiceInput" type="button" aria-label="إدخال صوتي">
                                <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
                            </button>
                            <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="مسح البحث">
                                <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                            </button>
                        </div>
                    </div>
                    <hr class="nds-dropmenu-divider">
                    <!-- Filter Options -->
                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                        <span class="label">جميع الأعضاء</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                        <span class="label">أستاذ</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                        <span class="label">أستاذ مشارك</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                        <span class="label">أستاذ مساعد</span>
                    </button>
                    <hr class="nds-dropmenu-divider">
                    <button class="nds-btn nds-subtle nds-dropmenu-item">
                        <i class="hgi hgi-stroke hgi-refresh-ccw-02"></i>
                        <span class="label">إعادة تعيين</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-section-content">
        <div class="nds-pagination-content nds-grid" style="--per-page: 12; --max-col: 3; --mid-col: 3; --min-col: 2;">
            <a href="#" class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl nds-image nds-image-border">
                        <img src="{{ 'assets/img/avatar3.png' | relative_url }}" width="158" height="158"
                            alt="صورة عضو هيئة التدريس" loading="lazy">
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. محمد أحمد السالم</h3>
                        <span class="nds-card-subtitle nds-truncate">رئيس قسم</span>
                        <p class="nds-card-description nds-truncate">
                            قسم علوم الحاسب
                            الآلي
                        </p>
                    </div>
                </div>
            </a>
        </div>
        <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
    </div>
</section>