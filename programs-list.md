---
layout: page
title: "البرامج الأكاديمية"
lang: ar
direction: rtl
breadcrumb: ["البرامج الأكاديمية"]
hero_title: "البرامج الأكاديمية"
hero_description: "قائمة البرامج الأكاديمية المتاحة في الجامعة"
layout_class: cardView
sidemenu: college-sidemenu
---

<section id="programsList" class="nds-content-section">
    <div class="nds-section-head">
        <div class="nds-section-action">
            <div class="nds-dropmenu">
                <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                    <span class="label">تصفية</span>
                </button>
                <div class="nds-filter nds-dropmenu-menu" data-filter-target="programs_list_content"
                    style="min-width: 300px;">
                    <!-- Search Input -->
                    <div class="nds-form-control nds-dropmenu-item" data-filter="search" data-no-auto-close>
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
                    <hr class="nds-dropmenu-divider nds-lg">
                    <!-- Filter by Program Type -->
                    <fieldset class="nds-dropmenu-item nds-check-group" data-filter="tags" data-no-auto-close>
                        <legend class="label">نوع البرنامج</legend>
                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="filter-bachelor">
                                    <span class="label">بكالوريوس</span>
                                </label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="filter-bachelor" name="filter-type" value="بكالوريوس"
                                    class="nds-check">
                            </div>
                        </div>
                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="filter-master">
                                    <span class="label">ماجستير</span>
                                </label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="filter-master" name="filter-type" value="ماجستير"
                                    class="nds-check">
                            </div>
                        </div>
                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="filter-phd">
                                    <span class="label">دكتوراه</span>
                                </label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="filter-phd" name="filter-type" value="دكتوراه"
                                    class="nds-check">
                            </div>
                        </div>
                    </fieldset>
                    <hr class="nds-dropmenu-divider nds-lg">
                    <div class="nds-dropmenu-action nds-grid">
                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear"
                            data-no-auto-close>
                            <span class="label">إعادة تعيين</span>
                        </button>
                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                            data-filter-action="apply">
                            <span class="label">تصفية</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-section-content">
        <div id="programs_list_content" class="nds-pagination-content nds-grid"
            style="--per-page: 12; --max-col: 3; --mid-col: 2; --min-col: 1;">

            <!-- Program 1 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">علوم الحاسب الآلي</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 2 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">نظم المعلومات</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 3 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">هندسة البرمجيات</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 4 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الذكاء الاصطناعي</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 5 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الأمن السيبراني</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 6 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">إدارة الأعمال</h3>
                        <span class="nds-card-description nds-truncate">كلية إدارة الأعمال</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 7 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">المحاسبة</h3>
                        <span class="nds-card-description nds-truncate">كلية إدارة الأعمال</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 8 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">التسويق</h3>
                        <span class="nds-card-description nds-truncate">كلية إدارة الأعمال</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 9 - ماجستير -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">علوم الحاسب الآلي</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label">ماجستير</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 10 - ماجستير -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الذكاء الاصطناعي</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label">ماجستير</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 11 - ماجستير -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الأمن السيبراني</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label">ماجستير</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 12 - ماجستير -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">إدارة الأعمال التنفيذية</h3>
                        <span class="nds-card-description nds-truncate">كلية إدارة الأعمال</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label">ماجستير</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 13 - ماجستير -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">المالية</h3>
                        <span class="nds-card-description nds-truncate">كلية إدارة الأعمال</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label">ماجستير</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 14 - ماجستير -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الهندسة الكهربائية</h3>
                        <span class="nds-card-description nds-truncate">كلية الهندسة</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-green nds-sm">
                            <span class="label">ماجستير</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 15 - دكتوراه -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">علوم الحاسب الآلي</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-yellow nds-sm">
                            <span class="label">دكتوراه</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 16 - دكتوراه -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الذكاء الاصطناعي</h3>
                        <span class="nds-card-description nds-truncate">كلية الحاسب وتقنية المعلومات</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-yellow nds-sm">
                            <span class="label">دكتوراه</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 17 - دكتوراه -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">إدارة الأعمال</h3>
                        <span class="nds-card-description nds-truncate">كلية إدارة الأعمال</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-yellow nds-sm">
                            <span class="label">دكتوراه</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 18 - دكتوراه -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الهندسة الميكانيكية</h3>
                        <span class="nds-card-description nds-truncate">كلية الهندسة</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-yellow nds-sm">
                            <span class="label">دكتوراه</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 19 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الهندسة المدنية</h3>
                        <span class="nds-card-description nds-truncate">كلية الهندسة</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Program 20 - بكالوريوس -->
            <a href="{{ 'program.html' | relative_url }}" class="pagination-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title nds-truncate">الهندسة الكهربائية</h3>
                        <span class="nds-card-description nds-truncate">كلية الهندسة</span>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="label">بكالوريوس</span>
                        </span>
                    </div>
                </div>
            </a>

        </div>
        <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
    </div>
</section>
