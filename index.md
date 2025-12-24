---
layout: home
title: "National Design System for Saudi Arabia"
hero_title: "National Design System for Saudi Arabia"
hero_description: "A comprehensive design system empowering consistent, accessible, and high-performance digital
government experiences across the Kingdom."
#hero_image: /assets/img/riyadhcenter.webp
hero_image_pos: 50% 10%
lang: en
direction: ltr
---

<!-- About the System -->
<section id="aboutSystem" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">About the Design System</h2>
            <p class="nds-section-description">The National Design System for Saudi Arabia
                is a living documentation and component library built to standardize digital government services. It
                provides reusable components, design tokens, accessibility guidelines, and interaction patterns that
                ensure consistency across all government digital touchpoints.</p>
        </div>
        <div class="nds-section-content">
            <a href="{{ '/components/button.html' | relative_url }}" class="nds-btn nds-primary"
                aria-label="Explore Components">
                <span class="label">Explore Components</span>
                <i class="hgi hgi-stroke hgi-arrow-right" aria-hidden="true"></i>
            </a>
            <button class="nds-btn nds-primary nds-loading">
                <span class="label">Loading Button</span>
            </button>
        </div>
    </div>
</section>

<section id="AlumaniMap" class="nds-content-section nds-blue">
    <style>
        @media (min-width: 991.98px) {
            #AlumaniMap .nds-section-content-container {
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
            }

            #AlumaniMap .nds-section-content-container .nds-section-head .nds-section-action {
                position: relative;
            }
        }

        @media (max-width: 991.98px) {

            #AlumaniMap .nds-section-content-container .nds-section-head {
                text-align: center;
            }
        }

        #AlumaniMap .total-graduates {
            display: inline-block;
            direction: ltr;
            font-size: var(--nds-text-clamp-xl-FS);

        }

        #AlumaniMap .nds-worldmap {
            position: relative;
            margin-inline: auto;
        }

        #AlumaniMap .nds-worldmap svg {
            display: block;
            width: 100%;
            height: auto;
        }

        #AlumaniMap .nds-worldmap path {
            fill: var(--alpha-white-30);
            stroke: transparent;
            stroke-width: .6;
            vector-effect: non-scaling-stroke;
            transition: fill .15s ease, stroke .15s ease;
            cursor: pointer;
        }

        /* Heat map intensity levels based on graduate values */
        #AlumaniMap .nds-worldmap path.heat-0 {
            fill: var(--alpha-white-10);
        }

        #AlumaniMap .nds-worldmap path.heat-1 {
            fill: var(--alpha-white-20);
        }

        #AlumaniMap .nds-worldmap path.heat-2 {
            fill: var(--alpha-white-30);
        }

        #AlumaniMap .nds-worldmap path.heat-3 {
            fill: var(--alpha-white-40);
        }

        #AlumaniMap .nds-worldmap path.heat-4 {
            fill: var(--alpha-white-50);
        }

        #AlumaniMap .nds-worldmap path.heat-5 {
            fill: var(--alpha-white-60);
        }

        #AlumaniMap .nds-worldmap path.heat-6 {
            fill: var(--alpha-white-70);
        }

        #AlumaniMap .nds-worldmap g:hover path,
        #AlumaniMap .nds-worldmap path:hover,
        #AlumaniMap .nds-worldmap path.is-hover {
            fill: var(--background-secondary);
            stroke: transparent;
        }

        #AlumaniMap .map-tip {
            position: absolute;
            top: 0;
            left: 0;
            right: auto;
            bottom: auto;
            direction: rtl;
            transform: translate(10px, 10px);
            color: var(--text-default);
            padding: .45rem .6rem;
            border: 1px solid rgba(0, 0, 0, .12);
            border-radius: .6rem;
            background: rgba(255, 255, 255, .95);
            box-shadow: 0 10px 30px rgba(0, 0, 0, .12);
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity .12s ease;
        }

        html[dir=ltr] #AlumaniMap .map-tip {
            direction: ltr;
        }

        #AlumaniMap .map-tip.is-show {
            opacity: 1;
        }

        /* Heat map legend */
        #AlumaniMap .heat-legend {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: var(--spacing-md);
            margin-top: var(--spacing-lg);
            padding: var(--spacing-md);
        }

        #AlumaniMap .heat-legend-title {
            font-size: var(--nds-text-sm-FS);
            font-weight: 600;
            color: var(--text-primary-default);
            margin-inline-start: var(--spacing-md);
        }

        #AlumaniMap .heat-legend-scale {
            display: flex;
            gap: var(--spacing-xs);
            align-items: center;
        }

        #AlumaniMap .heat-legend-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
        }

        #AlumaniMap .heat-legend-box {
            width: 32px;
            height: 20px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }

        #AlumaniMap .heat-legend-label {
            font-size: var(--nds-text-xs-FS);
            color: var(--text-primary-default);
            white-space: nowrap;
        }

        #AlumaniMap .nds-table-wrapper {
            border-radius: var(--radius-md);
            overflow: clip;
        }

        #AlumaniMap .nds-table.nds-center.nds-sortable th.sortable .sort-header {
            justify-content: center;
        }
    </style>
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">خريطة الخريجين</h2>
            <p class="nds-section-description">
                <span class="total-graduates nds-number-format">+112000</span>
                <span class="since-graduates">(خريج منذ عام 1964)</span>
            </p>
            <div class="nds-section-action">
                <button class="nds-btn nds-secondary-outline nds-oncolor nds-center"
                    data-modal-target="modal-graduates">
                    <span class="label">قائمة الخريجين</span>
                </button>
            </div>
        </div>
        <div class="nds-section-content">
            <div class="map-wrap">
                <div class="nds-worldmap" data-map-src="{{ '/assets/img/world-map.min.svg' | relative_url }}"
                    data-meta-url="{{ '/assets/js/graduates-map.json' | relative_url }}">
                    <div id="mapTip" class="map-tip" role="status" aria-live="polite" hidden>
                        <span class="textIcon"><i class="hgi hgi-stroke hgi-location-03"></i><strong
                                data-tip="name"></strong></span>
                        <div class="tip-row" data-tip-row="value" hidden>
                            <span class="textIcon">
                                <i class="hgi hgi-stroke hgi-student"></i>
                                <strong class="tip-k">الخريجين:</strong>
                                <span data-tip="value"></span>
                            </span>
                        </div>
                    </div>
                </div>


                <div class="nds-modal-backdrop" id="modal-graduates">
                    <div class="nds-modal nds-card nds-stroke nds-modal-lg" role="dialog"
                        aria-labelledby="modal-graduates-title" aria-hidden="true">
                        <div class="nds-card-header">
                            <span class="nds-featured-icon nds-brand nds-lg nds-circle">
                                <i class="hgi hgi-stroke hgi-globe icon"></i>
                            </span>
                            <button class="nds-modal-close nds-btn nds-subtle" aria-label="إغلاق">
                                <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                            </button>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h3 class="nds-card-title" id="modal-graduates-title">قائمة الخريجين حسب الدولة</h3>
                                <p class="nds-card-description">جدول يعرض عدد الخريجين لكل دولة</p>
                            </div>
                            <div class="nds-table-wrapper" style="max-height: 500px; overflow-y: auto;">
                                <table class="nds-table nds-sortable nds-center" id="graduates-table">
                                    <thead>
                                        <tr>
                                            <th class="nds-center">#</th>
                                            <th class="sortable">
                                                <button class="nds-btn sort-header">
                                                    <span class="label">الدولة</span>
                                                    <i class="hgi hgi-stroke hgi-arrow-up-down sort-icon"></i>
                                                </button>
                                            </th>
                                            <th class="sortable sorted-desc">
                                                <button class="nds-btn sort-header">
                                                    <span class="label">عدد الخريجين</span>
                                                    <i class="hgi hgi-stroke hgi-arrow-up-down sort-icon"></i>
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="graduates-table-body">
                                        <!-- Populated by JavaScript when modal opens -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <button class="nds-btn nds-primary nds-lg" data-modal-close="">
                                <span class="label">إغلاق</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="heat-legend">
                    <span class="heat-legend-title">كثافة الخريجين:</span>
                    <div class="heat-legend-scale">
                        <div class="heat-legend-item">
                            <span class="heat-legend-label">لا يوجد</span>
                            <div class="heat-legend-box" style="background: var(--alpha-white-10);"></div>
                        </div>
                        <div class="heat-legend-item">
                            <div class="heat-legend-box" style="background: var(--alpha-white-20);"></div>
                        </div>
                        <div class="heat-legend-item">
                            <div class="heat-legend-box" style="background: var(--alpha-white-30);"></div>
                        </div>
                        <div class="heat-legend-item">
                            <div class="heat-legend-box" style="background: var(--alpha-white-40);"></div>
                        </div>
                        <div class="heat-legend-item">
                            <div class="heat-legend-box" style="background: var(--alpha-white-50);"></div>
                        </div>
                        <div class="heat-legend-item">
                            <div class="heat-legend-box" style="background: var(--alpha-white-60);"></div>
                        </div>
                        <div class="heat-legend-item">
                            <div class="heat-legend-box" style="background: var(--alpha-white-70);"></div>
                            <span class="heat-legend-label">الأعلى</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        (async () => {
            const tip = document.getElementById("mapTip");

            const showTip = () => { tip.hidden = false; tip.classList.add("is-show"); };
            const hideTip = () => { tip.classList.remove("is-show"); tip.hidden = true; };

            document.querySelectorAll("[data-map-src]").forEach(async host => {
                const src = host.dataset.mapSrc;
                if (!src) return;

                // 🔹 LOAD META FROM JSON FILE
                let META = {};
                const metaUrl = host.dataset.metaUrl;
                if (metaUrl) {
                    try {
                        META = await fetch(metaUrl).then(r => r.json());
                    } catch (e) {
                        console.warn("Failed to load meta:", metaUrl);
                    }
                }

                // 🔹 LOAD SVG
                const svgText = await (await fetch(src)).text();
                // Insert SVG before any existing children (preserve map-tip)
                host.insertAdjacentHTML('afterbegin', svgText);

                const svg = host.querySelector("svg");
                if (!svg) return;
                svg.querySelectorAll("title").forEach(t => t.remove());

                // 🔹 CALCULATE HEAT LEVELS AND APPLY CLASSES
                // Find max value for scaling (excluding Saudi Arabia as it's an outlier)
                const values = Object.values(META).map(m => m.value || 0).filter(v => v < 47000);
                const maxValue = Math.max(...values);

                // Define breakpoints for heat levels (6 levels)
                const getHeatLevel = (value) => {
                    if (value === 0) return 0;
                    if (value < maxValue * 0.1) return 1;
                    if (value < maxValue * 0.25) return 2;
                    if (value < maxValue * 0.5) return 3;
                    if (value < maxValue * 0.75) return 4;
                    if (value < maxValue) return 5;
                    return 6; // For Saudi Arabia and highest values
                };

                // Apply heat classes to all country paths
                svg.querySelectorAll("g[id], path[id]").forEach(el => {
                    const id = (el.id || "").toLowerCase();
                    const meta = META[id];
                    const value = meta?.value || 0;
                    const heatLevel = getHeatLevel(value);

                    if (el.tagName === "g") {
                        // For groups, apply to all paths inside
                        el.querySelectorAll("path").forEach(path => {
                            path.classList.add(`heat-${heatLevel}`);
                        });
                    } else {
                        // For individual paths
                        el.classList.add(`heat-${heatLevel}`);
                    }
                });

                // 🔹 SCALE-SAFE TOOLTIP POSITIONING
                const moveTip = (ev) => {
                    const rect = svg.getBoundingClientRect();

                    let x = ev.clientX - rect.left + 12;
                    let y = ev.clientY - rect.top + 12;

                    const tw = tip.offsetWidth || 0;
                    const th = tip.offsetHeight || 0;
                    const pad = 8;

                    x = Math.max(pad, Math.min(x, rect.width - tw - pad));
                    y = Math.max(pad, Math.min(y, rect.height - th - pad));

                    tip.style.transform = `translate(${x}px, ${y}px)`;
                };

                // 🔹 DETECT PAGE LANGUAGE
                const isArabic = document.documentElement.lang === 'ar' ||
                    document.documentElement.getAttribute('lang') === 'ar' ||
                    document.documentElement.dir === 'rtl';

                // 🔹 FILL TOOLTIP FROM META
                const fillTooltip = (meta, id) => {
                    tip.querySelectorAll("[data-tip]").forEach(node => {
                        const key = node.dataset.tip;
                        let val;

                        if (key === "name") {
                            // Use Arabic or English based on page language
                            val = meta ? (isArabic ? (meta.name || meta.name_en) : meta.name_en) : id.toUpperCase();
                        } else {
                            val = meta?.[key] ?? "";
                        }

                        node.textContent =
                            typeof val === "number" ? val.toLocaleString() : String(val);
                    });

                    tip.querySelectorAll("[data-tip-row]").forEach(row => {
                        const key = row.dataset.tipRow;
                        row.hidden = !(meta && meta[key] != null && meta[key] !== "");
                    });
                };

                // ✅ Helpers: resolve ISO id from either path[id] or parent g[id]
                const getCountryNode = (el) => el.closest("g[id], path[id]");
                const getCountryId = (el) => {
                    const node = getCountryNode(el);
                    if (!node) return null;
                    return (node.id || "").toLowerCase();
                };

                // ✅ Bind on all country shapes:
                // - path[id] (single path country)
                // - g[id] (multi-path country)
                // - path inside a g[id] (hit targets)
                const targets = svg.querySelectorAll("g[id], path[id], g[id] path");

                targets.forEach(el => {
                    // Use the closest country group/path for styling
                    const onEnter = (ev) => {
                        const id = getCountryId(ev.target);
                        if (!id) return;

                        const countryNode = getCountryNode(ev.target);
                        const meta = META[id];

                        countryNode.classList.add("is-hover");
                        fillTooltip(meta, id);
                        showTip();
                        moveTip(ev);
                    };

                    const onMove = (ev) => {
                        const id = getCountryId(ev.target);
                        if (!id) return;
                        moveTip(ev);
                    };

                    const onLeave = (ev) => {
                        const countryNode = getCountryNode(ev.target);
                        if (countryNode) countryNode.classList.remove("is-hover");
                        hideTip();
                    };

                    el.addEventListener("mouseenter", onEnter);
                    el.addEventListener("mousemove", onMove);
                    el.addEventListener("mouseleave", onLeave);
                });
            });
        })();

        // 🔹 POPULATE GRADUATES TABLE IN MODAL (only when modal opens)
        (async () => {
            const modalButton = document.querySelector('[data-modal-target="modal-graduates"]');
            const tableBody = document.getElementById('graduates-table-body');
            const graduatesTable = document.getElementById('graduates-table');
            const metaUrl = "{{ '/assets/js/graduates-map.json' | relative_url }}";
            let isTablePopulated = false;

            if (!modalButton || !tableBody || !graduatesTable) return;

            // Populate table only when modal is opened
            modalButton.addEventListener('click', async () => {
                // Only populate once
                if (isTablePopulated) return;

                // Detect if page is Arabic or not (check at modal open time)
                const isArabic = document.documentElement.lang === 'ar' ||
                    document.documentElement.getAttribute('lang') === 'ar' ||
                    document.documentElement.dir === 'rtl';

                // Add loading state to table
                graduatesTable.classList.add('nds-loading');

                try {
                    // Fetch the data
                    const META = await fetch(metaUrl).then(r => r.json());

                    // Convert to array, filter out 0 values, and sort by value (descending)
                    const countries = Object.values(META)
                        .filter(country => country.value > 0)
                        .sort((a, b) => b.value - a.value);

                    // Populate table rows
                    countries.forEach((country, index) => {
                        const row = document.createElement('tr');

                        // Row number
                        const numberCell = document.createElement('td');
                        numberCell.textContent = index + 1;
                        row.appendChild(numberCell);

                        // Country name (use Arabic or English based on page language)
                        const nameCell = document.createElement('td');
                        nameCell.textContent = isArabic ? (country.name || country.name_en) : country.name_en;
                        row.appendChild(nameCell);

                        // Graduate count (with thousands separator)
                        const valueCell = document.createElement('td');
                        valueCell.textContent = country.value.toLocaleString();
                        row.appendChild(valueCell);

                        tableBody.appendChild(row);
                    });

                    isTablePopulated = true;

                    // Initialize table sorting after populating data
                    setTimeout(() => {
                        if (window.NDSTables && graduatesTable) {
                            window.NDSTables.create(graduatesTable);
                        }

                        // Remove loading state from table
                        graduatesTable.classList.remove('nds-loading');
                    }, 100);

                } catch (error) {
                    console.error('Failed to load graduates data:', error);
                    const errorMessage = isArabic ? 'فشل تحميل البيانات' : 'Failed to load data';
                    tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;">${errorMessage}</td></tr>`;

                    // Remove loading state from table even on error
                    graduatesTable.classList.remove('nds-loading');
                }
            }, { once: true });
        })();
    </script>


</section>

<!-- System Capabilities -->
<section id="capabilities" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">System Capabilities</h2>
            <p class="nds-section-description">Built with modern web standards and optimized for performance,
                accessibility, and developer experience.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-capabilities-grid">
                <div class="nds-capability-card">
                    <i class="hgi hgi-stroke hgi-responsive nds-capability-icon"></i>
                    <h3>Responsive Design</h3>
                    <p>Mobile-first components that adapt seamlessly across all devices and screen sizes with optimized
                        breakpoints.</p>
                </div>
                <div class="nds-capability-card">
                    <i class="hgi hgi-stroke hgi-language nds-capability-icon"></i>
                    <h3>RTL/LTR Support</h3>
                    <p>Native support for Arabic (RTL) and English (LTR) with automatic text direction and layout
                        mirroring.</p>
                </div>
                <div class="nds-capability-card">
                    <i class="hgi hgi-stroke hgi-accessibility nds-capability-icon"></i>
                    <h3>Accessibility First</h3>
                    <p>WCAG 2.1 AA compliant components with keyboard navigation, screen reader support, and semantic
                        markup.</p>
                </div>
                <div class="nds-capability-card">
                    <i class="hgi hgi-stroke hgi-performance nds-capability-icon"></i>
                    <h3>Performance Optimized</h3>
                    <p>Lightweight, tree-shakeable components with CSS custom properties and hardware-accelerated
                        animations.</p>
                </div>
                <div class="nds-capability-card">
                    <i class="hgi hgi-stroke hgi-theme nds-capability-icon"></i>
                    <h3>Theming System</h3>
                    <p>Comprehensive design token system supporting light/dark modes and custom government agency
                        branding.</p>
                </div>
                <div class="nds-capability-card">
                    <i class="hgi hgi-stroke hgi-development nds-capability-icon"></i>
                    <h3>Developer Friendly</h3>
                    <p>Clear documentation, copy-paste code examples, and integration guides for popular frameworks.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Technology Stack -->
<section id="technology" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built with Modern Technology</h2>
            <p class="nds-section-description">Leveraging cutting-edge web technologies to deliver a robust and
                maintainable design system.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-tech-stack">
                <div class="nds-tech-category">
                    <h3>Frontend</h3>
                    <ul class="nds-tech-list">
                        <li>Jekyll 4.4.1 (Static Site Generation)</li>
                        <li>SCSS with CSS Custom Properties</li>
                        <li>Vanilla JavaScript (ES6+)</li>
                        <li>IBM Plex Sans Arabic Typography</li>
                    </ul>
                </div>
                <div class="nds-tech-category">
                    <h3>Architecture</h3>
                    <ul class="nds-tech-list">
                        <li>Component-Based Design</li>
                        <li>Design Token System</li>
                        <li>Responsive Breakpoint Strategy</li>
                        <li>Progressive Enhancement</li>
                    </ul>
                </div>
                <div class="nds-tech-category">
                    <h3>Performance</h3>
                    <ul class="nds-tech-list">
                        <li>Hardware-Accelerated Animations</li>
                        <li>Optimized Asset Loading</li>
                        <li>Minimal JavaScript Footprint</li>
                        <li>CSS-First Approach</li>
                    </ul>
                </div>
                <div class="nds-tech-category">
                    <h3>Quality</h3>
                    <ul class="nds-tech-list">
                        <li>WCAG 2.1 AA Compliance</li>
                        <li>Cross-Browser Testing</li>
                        <li>Semantic HTML Structure</li>
                        <li>Automated Accessibility Checks</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>