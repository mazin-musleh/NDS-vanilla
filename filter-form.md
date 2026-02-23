---
layout: page
title: "Filter Form Submission Test"
lang: ar
direction: rtl
breadcrumb: ["اختبار إرسال نموذج التصفية"]
hero_title: "اختبار إرسال نموذج التصفية"
hero_description: "صفحة اختبار لإرسال نماذج التصفية - Form Submission Test Page"
layout_class: cardView
exclude_showcase: true
---

<section id="filterFormTest" class="nds-content-section">
    <div class="nds-section-head">
        <h2>Form Mode Test (GET Method)</h2>
        <p>Server-side filtering: Form submits to server, server returns filtered results</p>
        <p><strong>No client-side filtering</strong> - no cards are hidden with display:none</p>

        <!-- Form Mode Filter with GET Method (Server-side filtering only) -->
        <form class="nds-section-search nds-filter" data-filter-submit data-filter-target="test_results" method="GET"
            action="#">
            <!-- Direct Search with custom name -->
            <div class="nds-search-box">
                <div class="nds-search-content">
                    <div class="nds-form-control">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <input type="text" class="nds-search-input" name="Terms"
                            placeholder="بحث... (custom name: Terms)">
                        <div class="nds-form-action">
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
                <button class="nds-filter-btn nds-btn nds-neutral nds-menu-btn nds-dropmenu-trigger" type="button">
                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                    <span class="label">تصفية</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                    <div class="nds-dropmenu-scroll">
                    <!-- Manual filter inputs (form mode doesn't support auto-generation) -->
                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="department" data-no-auto-close>
                        <legend class="label">القسم</legend>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="dept-cs"><span class="label">قسم علوم الحاسب</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="dept-cs" name="department" value="قسم علوم الحاسب"
                                    class="nds-check">
                            </div>
                        </div>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="dept-eng"><span class="label">قسم الهندسة</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="dept-eng" name="department" value="قسم الهندسة"
                                    class="nds-check">
                            </div>
                        </div>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="dept-bus"><span class="label">قسم إدارة الأعمال</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="dept-bus" name="department" value="قسم إدارة الأعمال"
                                    class="nds-check">
                            </div>
                        </div>
                    </fieldset>
                    <p style="font-size: 12px; padding: 0 16px; color: #666;">Simple: name="department" matches
                        data-filter="department" in cards</p>
                    </div>
                    <div class="nds-dropmenu-footer">
                        <hr class="nds-dropmenu-divider nds-lg">
                        <div class="nds-dropmenu-action nds-grid">
                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear"
                                data-no-auto-close>
                                <span class="label">إعادة تعيين</span>
                            </button>
                            <button class="nds-btn nds-primary nds-dropmenu-item" type="submit">
                                <span class="label">تصفية</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Applied Filters Chips -->
            <div class="nds-filter-applied" hidden></div>
        </form>
    </div>

    <div class="nds-section-content">
        <div id="test_results" class="nds-grid" style="--per-page: 12; --max-col: 3; --mid-col: 3; --min-col: 1;">
            <!-- Test Cards -->
            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">محمد أحمد</h3>
                        <span class="nds-card-subtitle" data-filter="department">قسم علوم الحاسب</span>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">سارة علي</h3>
                        <span class="nds-card-subtitle" data-filter="department">قسم الهندسة</span>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">أحمد خالد</h3>
                        <span class="nds-card-subtitle" data-filter="department">قسم إدارة الأعمال</span>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">فاطمة محمود</h3>
                        <span class="nds-card-subtitle" data-filter="department">قسم علوم الحاسب</span>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">عمر حسن</h3>
                        <span class="nds-card-subtitle" data-filter="department">قسم الهندسة</span>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">نورة سعيد</h3>
                        <span class="nds-card-subtitle" data-filter="department">قسم إدارة الأعمال</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<hr class="nds-divider nds-lg">

<section class="nds-content-section">
    <div class="nds-section-head">
        <h2>Form Mode with POST Method</h2>
        <p>Server-side filtering: Form submits to server, server returns filtered results</p>
        <p><strong>No client-side filtering</strong> - no cards are hidden with display:none</p>

        <!-- Form Mode Filter with POST Method (Server-side filtering only) -->
        <form class="nds-section-action nds-filter" data-filter-submit data-filter-target="test_results_2" method="POST"
            action="#">
            <div class="nds-search-box">
                <div class="nds-search-content">
                    <div class="nds-form-control">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <input type="text" class="nds-search-input" name="q" placeholder="بحث... (custom name: q)">
                        <div class="nds-form-action">
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

            <div class="nds-dropmenu">
                <button class="nds-filter-btn nds-btn nds-neutral nds-menu-btn nds-dropmenu-trigger" type="button">
                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                    <span class="label">تصفية</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                    <div class="nds-dropmenu-scroll">
                    <!-- Manual filter inputs without custom name (uses default) -->
                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="category" data-no-auto-close>
                        <legend class="label">التصنيف</legend>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="cat-elec"><span class="label">Electronics</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="cat-elec" name="category" value="Electronics"
                                    class="nds-check">
                            </div>
                        </div>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="cat-furn"><span class="label">Furniture</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="cat-furn" name="category" value="Furniture"
                                    class="nds-check">
                            </div>
                        </div>
                    </fieldset>
                    <p style="font-size: 12px; padding: 0 16px; color: #666;">Simplified: name="category" (matches
                        data-filter)</p>
                    </div>
                    <div class="nds-dropmenu-footer">
                        <hr class="nds-dropmenu-divider nds-lg">
                        <div class="nds-dropmenu-action nds-grid">
                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear"
                                data-no-auto-close>
                                <span class="label">إعادة تعيين</span>
                            </button>
                            <button class="nds-btn nds-primary nds-dropmenu-item" type="submit">
                                <span class="label">إرسال POST</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nds-filter-applied" hidden></div>
        </form>
    </div>

    <div class="nds-section-content">
        <div id="test_results_2" class="nds-grid" style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">
            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Product A</h3>
                        <span class="nds-card-subtitle" data-filter="category">Electronics</span>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Product B</h3>
                        <span class="nds-card-subtitle" data-filter="category">Furniture</span>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Product C</h3>
                        <span class="nds-card-subtitle" data-filter="category">Electronics</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<hr class="nds-divider nds-lg">

<section class="nds-content-section">
    <div class="nds-section-head">
        <h2>AJAX Mode Test (GET Method)</h2>
        <p>This form uses AJAX mode with GET method - sends AJAX request and injects results into target container</p>
        <p><strong>data-filter-target="test_results_3"</strong> specifies where to load the server's filtered results
        </p>
        <p><strong>Smart parsing:</strong> If server returns a full HTML page, the component automatically extracts the
            target container's content</p>

        <!-- AJAX Mode Filter -->
        <form class="nds-section-action nds-filter" data-filter-submit data-ajax data-filter-target="test_results_3"
            method="GET" action="filter-form.html">
            <div class="nds-search-box">
                <div class="nds-search-content">
                    <div class="nds-form-control">
                        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                        <input type="text" class="nds-search-input" name="search" placeholder="بحث AJAX...">
                        <div class="nds-form-action">
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

            <button class="nds-btn nds-primary" type="submit">
                <span class="label">إرسال AJAX</span>
            </button>

            <div class="nds-filter-applied" hidden></div>
        </form>
    </div>

    <div class="nds-section-content">
        <div id="test_results_3" class="nds-grid" style="--max-col: 3;">
            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">AJAX Test Item 1</h3>
                        <p class="nds-card-subtitle">This card was loaded via AJAX</p>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">AJAX Test Item 2</h3>
                        <p class="nds-card-subtitle">Server returned full HTML page</p>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">AJAX Test Item 3</h3>
                        <p class="nds-card-subtitle">Component extracted #test_results_3 content</p>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">AJAX Test Item 4</h3>
                        <p class="nds-card-subtitle">Then injected into target container</p>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">AJAX Test Item 5</h3>
                        <p class="nds-card-subtitle">✓ AJAX mode working successfully!</p>
                    </div>
                </div>
            </div>

            <div class="nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">AJAX Test Item 6</h3>
                        <p class="nds-card-subtitle">In production, server returns filtered results</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    // AJAX form submission - The nds-filter component now handles AJAX automatically
    // This listener is optional - only for custom handling or logging
    document.addEventListener('nds:filterFormAjax', function (e) {
        console.log('=== AJAX Form Submission Started ===');
        console.log('Criteria:', e.detail.criteria);
        console.log('Form method:', e.detail.form.method);
        console.log('Form action:', e.detail.form.action);
        console.log('Target Container ID:', e.detail.form.getAttribute('data-filter-target'));

        // Build the URL that will be fetched (for GET method)
        if (e.detail.form.method.toUpperCase() === 'GET') {
            const formData = new FormData(e.detail.form);
            const params = new URLSearchParams(formData);
            const url = e.detail.form.action + (e.detail.form.action.includes('?') ? '&' : '?') + params.toString();
            console.log('Will fetch URL:', url);
        }

        // The component will automatically:
        // 1. Build GET URL with query parameters
        // 2. Send fetch request to server
        // 3. Parse full HTML page response
        // 4. Extract target container content
        // 5. Inject into local target container
        // 6. Handle loading states and errors
    });

    // AJAX submission complete
    document.addEventListener('nds:filterFormComplete', function (e) {
        console.log('=== AJAX Submission Complete ===');
        console.log('Success:', e.detail.success);
        console.log('Injected HTML length:', e.detail.html ? e.detail.html.length : 0);
        console.log('Full page HTML length:', e.detail.fullHtml ? e.detail.fullHtml.length : 0);
        console.log('Target container ID:', e.detail.form.getAttribute('data-filter-target'));

        // Visual feedback - add success message to results container
        const targetId = e.detail.form.getAttribute('data-filter-target');
        const targetContainer = document.getElementById(targetId);
        if (targetContainer) {
            // Add a temporary success banner
            const banner = document.createElement('div');
            banner.className = 'nds-card nds-stroke';
            banner.style.backgroundColor = '#e8f5e9';
            banner.style.borderColor = '#4caf50';
            banner.innerHTML = '<div class="nds-card-content"><p><strong>✓ AJAX Success!</strong> Filtered results loaded. Check console for details.</p></div>';
            targetContainer.insertBefore(banner, targetContainer.firstChild);

            // Remove banner after 5 seconds
            setTimeout(() => banner.remove(), 5000);
        }
    });

    // AJAX submission error
    document.addEventListener('nds:filterFormError', function (e) {
        console.error('=== AJAX Submission Error ===');
        console.error('Error:', e.detail.error);

        // Visual feedback - add error message to results container
        const targetId = e.detail.form.getAttribute('data-filter-target');
        const targetContainer = document.getElementById(targetId);
        if (targetContainer) {
            const banner = document.createElement('div');
            banner.className = 'nds-card nds-stroke';
            banner.style.backgroundColor = '#ffebee';
            banner.style.borderColor = '#f44336';
            banner.innerHTML = '<div class="nds-card-content"><p><strong>✗ AJAX Error:</strong> ' + e.detail.error + '</p><p style="font-size: 14px; margin-top: 8px;">Check browser console for details.</p></div>';
            targetContainer.innerHTML = '';
            targetContainer.appendChild(banner);
        }
    });

    // Standard form submission test (GET/POST without AJAX)
    document.addEventListener('nds:filterFormSubmit', function (e) {
        console.log('=== Standard Form Submission ===');
        console.log('Criteria:', e.detail.criteria);
        console.log('Form:', e.detail.form);

        // For demo purposes, prevent actual submission and show alert
        e.preventDefault();
        alert('Form Mode: Form would be submitted!\n\nMethod: ' + e.detail.form.method.toUpperCase() + '\nAction: ' + (e.detail.form.action || 'current page') + '\n\nCriteria: ' + JSON.stringify(e.detail.criteria, null, 2));

        // Remove submitting state
        e.detail.form.removeAttribute('data-state');
    });
</script>

<hr class="nds-divider nds-lg">

<section class="nds-content-section">
    <div class="nds-section-head">
        <h2>Manual Filter Inputs (Recommended for Form Mode)</h2>
        <p>Form submission mode requires manual filter inputs (no auto-generation)</p>

        <form class="nds-section-action nds-filter" data-filter-submit method="GET">
            <div class="nds-dropmenu">
                <button class="nds-filter-btn nds-btn nds-neutral nds-menu-btn nds-dropmenu-trigger" type="button">
                    <i class="hgi hgi-stroke hgi-filter icon"></i>
                    <span class="label">تصفية</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                    <div class="nds-dropmenu-scroll">
                    <!-- Manual filter inputs -->
                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="status" data-no-auto-close>
                        <legend class="label">الحالة</legend>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="status-active"><span class="label">Active</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="status-active" name="status" value="Active"
                                    class="nds-check">
                            </div>
                        </div>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="status-pending"><span class="label">Pending</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="status-pending" name="status" value="Pending"
                                    class="nds-check">
                            </div>
                        </div>

                        <div class="nds-form-container nds-check-container">
                            <div class="nds-form-header">
                                <label for="status-completed"><span class="label">Completed</span></label>
                            </div>
                            <div class="nds-form-control">
                                <input type="checkbox" id="status-completed" name="status" value="Completed"
                                    class="nds-check">
                            </div>
                        </div>
                    </fieldset>
                    </div>
                    <div class="nds-dropmenu-footer">
                        <hr class="nds-dropmenu-divider nds-lg">
                        <div class="nds-dropmenu-action nds-grid">
                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                data-filter-action="clear">
                                <span class="label">إعادة تعيين</span>
                            </button>
                            <button class="nds-btn nds-primary nds-dropmenu-item" type="submit">
                                <span class="label">تصفية</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-filter-applied" hidden></div>
        </form>
    </div>

    <div class="nds-section-content">
        <div class="nds-card nds-stroke">
            <div class="nds-card-content">
                <h3 class="nds-card-title">Manual Filter Demo</h3>
                <p><strong>Form submission mode:</strong> Filters must be manually created (no auto-generation)</p>
                <p><strong>Why?</strong></p>
                <ul>
                    <li>Server-side has the data, not the client</li>
                    <li>Filter options are predefined</li>
                    <li>Simpler and more predictable</li>
                    <li>No dependency on card data</li>
                </ul>
                <p><strong>Note:</strong> Auto-generation only works for client-side filtering
                    (&lt;div class="nds-filter"&gt;)</p>
            </div>
        </div>
    </div>
</section>