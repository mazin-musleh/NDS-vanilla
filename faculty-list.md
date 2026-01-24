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
exclude_showcase: true
---

<section id="facultyList" class="nds-content-section">
    <div class="nds-section-head">
        <div class="nds-section-action nds-filter" data-filter-target="faculty_list_content" hidden>
            <!-- Direct Search -->
            <div class="nds-search-box">
                <div class="nds-search-content">
                    <div class="nds-form-control">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <input type="text" class="nds-search-input" name="search" placeholder="بحث...">
                        <div class="nds-form-action">
                            <button class="nds-btn nds-subtle voiceInput" type="button" aria-label="إدخال صوتي">
                                <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
                            </button>
                            <button class="nds-btn nds-subtle clear" hidden type="button" aria-label="مسح البحث">
                                <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                            </button>
                        </div>
                    </div>
                    <button class="nds-btn nds-primary nds-search-btn" type="button">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <span class="label">بحث</span>
                    </button>
                </div>
            </div>
            <!-- Filter Dropmenu -->
            <div class="nds-dropmenu">
                <button class="nds-filter-btn nds-btn nds-neutral nds-menu-btn nds-dropmenu-trigger">
                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                    <span class="label">تصفية</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                    <!-- Filter Options -->
                    <div class="nds-dropmenu-item" data-filter-legend="القسم" data-filter="college"
                        data-filter-type="checkbox" data-no-auto-close>
                    </div>
                    <hr class="nds-dropmenu-divider nds-lg">
                    <div class="nds-dropmenu-action nds-grid">
                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear"
                            data-no-auto-close>
                            <span class="label">إعادة تعيين</span>
                        </button>
                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
                            <span class="label">تصفية</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Applied Filters Chips -->
            <div class="nds-filter-applied" hidden></div>
        </div>
    </div>
    <div class="nds-section-content">
        <div id="faculty_list_content" class="nds-pagination-content nds-grid"
            style="--per-page: 12; --max-col: 3; --mid-col: 3; --min-col: 1;" hidden>
            <!-- Card 1 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl nds-image-border">
                        <img src="{{ 'assets/img/avatar3.png' | relative_url }}" width="92" height="92"
                            alt="صورة عضو هيئة التدريس" loading="lazy">
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. محمد أحمد السالم</h3>
                        <span class="nds-card-subtitle nds-truncate">رئيس قسم</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم علوم الحاسب الآلي</p>
                    </div>
                </div>
            </a>
            <!-- Card 2 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. عبدالله خالد العمري</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مشارك</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم نظم المعلومات</p>
                    </div>
                </div>
            </a>
            <!-- Card 3 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl nds-image-border">
                        <img src="{{ 'assets/img/avatar2.png' | relative_url }}" width="92" height="92"
                            alt="صورة عضو هيئة التدريس" loading="lazy">
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. فاطمة سعيد الزهراني</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مساعد</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم هندسة البرمجيات</p>
                    </div>
                </div>
            </a>
            <!-- Card 4 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. أحمد محمد القحطاني</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم علوم الحاسب الآلي</p>
                    </div>
                </div>
            </a>
            <!-- Card 5 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl nds-image-border">
                        <img src="{{ 'assets/img/avatar4.png' | relative_url }}" width="92" height="92"
                            alt="صورة عضو هيئة التدريس" loading="lazy">
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. نورة عبدالرحمن الشهري</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مشارك</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم الذكاء الاصطناعي</p>
                    </div>
                </div>
            </a>
            <!-- Card 6 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. خالد ياسر الغامدي</h3>
                        <span class="nds-card-subtitle nds-truncate">محاضر</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم نظم المعلومات</p>
                    </div>
                </div>
            </a>
            <!-- Card 7 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl nds-image-border">
                        <img src="{{ 'assets/img/avatar5.png' | relative_url }}" width="92" height="92"
                            alt="صورة عضو هيئة التدريس" loading="lazy">
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. سارة حسن المالكي</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مساعد</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم هندسة البرمجيات</p>
                    </div>
                </div>
            </a>
            <!-- Card 8 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. ياسر فهد الدوسري</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم علوم الحاسب الآلي</p>
                    </div>
                </div>
            </a>
            <!-- Card 9 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. هند ناصر العتيبي</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مشارك</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم الذكاء الاصطناعي</p>
                    </div>
                </div>
            </a>
            <!-- Card 10 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. تركي سلمان الحربي</h3>
                        <span class="nds-card-subtitle nds-truncate">محاضر</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم نظم المعلومات</p>
                    </div>
                </div>
            </a>
            <!-- Card 11 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. ريم محمود الشمري</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مساعد</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم هندسة البرمجيات</p>
                    </div>
                </div>
            </a>
            <!-- Card 12 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. بندر عادل المطيري</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم علوم الحاسب الآلي</p>
                    </div>
                </div>
            </a>
            <!-- Card 13 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. لمى خليل السبيعي</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مشارك</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم الذكاء الاصطناعي</p>
                    </div>
                </div>
            </a>
            <!-- Card 14 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. صالح إبراهيم الراشد</h3>
                        <span class="nds-card-subtitle nds-truncate">محاضر</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم نظم المعلومات</p>
                    </div>
                </div>
            </a>
            <!-- Card 15 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. منى عبدالعزيز النجار</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مساعد</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم هندسة البرمجيات</p>
                    </div>
                </div>
            </a>
            <!-- Card 16 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. عمر سعد الجهني</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم علوم الحاسب الآلي</p>
                    </div>
                </div>
            </a>
            <!-- Card 17 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. غادة فيصل البقمي</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مشارك</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم الذكاء الاصطناعي</p>
                    </div>
                </div>
            </a>
            <!-- Card 18 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. زياد حمد الهاجري</h3>
                        <span class="nds-card-subtitle nds-truncate">محاضر</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم نظم المعلومات</p>
                    </div>
                </div>
            </a>
            <!-- Card 19 - Female -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. دانة راشد العنزي</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ مساعد</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم هندسة البرمجيات</p>
                    </div>
                </div>
            </a>
            <!-- Card 20 - Male -->
            <a href="{{ 'faculty.html' | relative_url }}"
                class="pagination-item nds-card nds-stroke nds-user nds-center">
                <div class="nds-card-header">
                    <div class="nds-card-image nds-avatar nds-2xl">
                        <i class="hgi hgi-stroke hgi-user"></i>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">د. مشعل جابر الشريف</h3>
                        <span class="nds-card-subtitle nds-truncate">أستاذ</span>
                        <p class="nds-card-description nds-truncate" data-filter="college">قسم الذكاء الاصطناعي</p>
                    </div>
                </div>
            </a>
        </div>
        <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
    </div>
</section>