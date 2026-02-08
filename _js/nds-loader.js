// NDS Unified Initialization System
(() => {
    'use strict';

    // Component registry with dependencies and selectors
    // Priority is automatically assigned based on array order (first = highest priority)
    // To change initialization order, simply reorder components in this array
    const COMPONENTS = [
        {
            name: 'navigation',
            selector: '.nds-main-nav',
            init: () => window.NDSNavController?.init?.(),
        },
        {
            name: 'forms',
            selector: '.nds-form-control',
            init: () => window.NDS?.Forms?.init?.(),
        },
        {
            name: 'tabs',
            selector: '.nds-tabs',
            init: () => window.NDSTabs?.init?.(),
        },
        {
            name: 'tables',
            selector: '.nds-table',
            init: () => window.NDSTables?.init?.(),
        },
        {
            name: 'accordion',
            selector: '.nds-accordion',
            init: () => window.NDSAccordion?.init?.(),
        },
        {
            name: 'stepper',
            selector: '.nds-stepper',
            init: () => window.NDSStepper?.init?.(),
        },
        {
            name: 'swiper',
            selector: '.nds-swiper',
            init: () => window.NDSSwiper?.init?.(),
        },
        {
            name: 'fileUpload',
            selector: '.nds-file-upload',
            init: () => window.NDS?.Forms?.FileUpload?.init?.(),
        },
        {
            name: 'sidemenu',
            selector: '.wSideMenu',
            init: () => window.NDSSideMenu?.init?.(),
        },
        {
            name: 'sideInfo',
            selector: '.nds-sideInfo',
            init: () => window.NDSSideInfo?.init?.(),
        },
        {
            name: 'drawer',
            selector: '.nds-drawer',
            init: () => window.NDSDrawer?.init?.(),
        },
        {
            name: 'numbers',
            selector: '.nds-number-format, .nds-counter-value',
            init: () => {
                // Run both formatting and counter setup regardless of return values
                window.NDSNumbers?.formatThousands?.();
                window.NDSNumbers?.setupCounterAnimations?.();
            },
        },
        {
            name: 'code',
            selector: 'code',
            init: () => window.NDSCode?.init?.(),
        },
        {
            name: 'showcase',
            selector: '.nds-demo-card, .demo-toggle-btn',
            init: () => window.NDSShowcase?.init?.(),
        },
        {
            name: 'share',
            selector: '#nds-sharePageBtn',
            init: () => window.NDSShare?.init?.(),
        },
        {
            name: 'calendar',
            selector: '.nds-date-input',
            init: () => window.NDSCalendar?.init?.(),
        },
        {
            name: 'cityWeather',
            selector: '#nds-weatherInfo, #nds-cityName',
            init: () => window.NDSCityWeather?.init?.(),
        },
        {
            name: 'timeDate',
            selector: '#nds-date, #nds-realTimeClock',
            init: () => window.NDSTimeDate?.init?.(),
        },
        {
            name: 'fontLoading',
            selector: null,
            init: () => window.NDSFontLoading?.init?.(),
            universal: true,
        },
        {
            name: 'cookies',
            selector: '#ndsCookiesAcceptBtn',
            init: () => window.NDSCookies?.init?.(),
        },
        {
            name: 'rating',
            selector: '.nds-rating',
            init: () => window.NDSRating?.initializeRatings?.(),
        },
        {
            name: 'expandable',
            selector: '.nds-expandable',
            init: () => window.NDSExpandable?.init?.(),
        },
        {
            name: 'breadcrumb',
            selector: '.nds-breadcrumb-nav',
            init: () => window.NDSBreadcrumb?.init?.(),
        },
        {
            name: 'dropmenu',
            selector: '.nds-dropmenu',
            init: () => window.NDSDropmenu?.init?.(),
        },
        {
            name: 'autocomplete',
            selector: '.nds-form-container[data-url]',
            init: () => window.NDSAutocomplete?.init?.(),
        },
        {
            name: 'pagination',
            selector: '.nds-pagination-nav, .nds-pagination',
            init: () => window.NDSPagination?.init?.(),
        },
        {
            name: 'autoPagination',
            selector: '.nds-auto-pagination',
            init: () => window.NDSPagination?.initAuto?.(),
        },
        {
            name: 'ipv',
            selector: '.nds-ipv-thumbnail',
            init: () => window.NDSImagePopupViewer?.init?.(),
        },
        {
            name: 'modal',
            selector: '.nds-modal',
            init: () => window.NDSModal?.init?.(),
        },
        {
            name: 'alert',
            selector: '.nds-alert',
            init: () => window.NDSAlert?.init?.(),
        },
        {
            name: 'filter',
            selector: '.nds-filter',
            init: () => window.NDSFilter?.init?.(),
        },
        {
            name: 'userFeedback',
            selector: '.nds-user-feedback',
            init: () => window.NDSUserFeedback?.init?.(),
        },
    ].map((component, index) => ({
        ...component,
        priority: index + 1  // Auto-assign priority based on array order
    }));

    function initializeNDS() {
        if (CONFIG.disableAll === true) {
            if (CONFIG.enableLogging) {
                console.warn('[NDS] Initialization disabled (config.disableAll = true)');
            }
            return;
        }
        const startTime = performance.now();

        // PERFORMANCE: Single DOM query sweep with batched existence checks
        const existingComponents = new Map();

        // Build one comprehensive selector for all components
        const allSelectors = COMPONENTS
            .filter((c) => c.selector && !c.universal)
            .map((c) => c.selector)
            .join(', ');

        if (allSelectors) {
            const allElements = document.querySelectorAll(allSelectors);

            // Check which components have elements
            COMPONENTS.forEach((component) => {
                if (component.universal) {
                    existingComponents.set(component.name, true);
                } else if (component.selector) {
                    if (component.name === 'code') {
                        // For code component, check directly for code elements
                        const hasElements = document.querySelectorAll('code').length > 0;
                        existingComponents.set(component.name, hasElements);
                    } else {
                        // For other components, filter out elements inside code blocks
                        const filteredElements = Array.from(allElements).filter(
                            (el) => !el.closest('code')
                        );
                        const hasElements = filteredElements.some((el) =>
                            el.matches(component.selector)
                        );
                        existingComponents.set(component.name, hasElements);
                    }
                }
            });
        } else {
            // Only universal components
            COMPONENTS.forEach((component) => {
                existingComponents.set(
                    component.name,
                    component.universal || false
                );
            });
        }

        // PERFORMANCE: Sort by priority and initialize
        const toInitialize = COMPONENTS
            .filter((component) => existingComponents.get(component.name))
            .sort((a, b) => a.priority - b.priority);

        if (CONFIG.enableLogging) {
            console.log(
                `[NDS] Initializing ${toInitialize.length}/${COMPONENTS.length} components`
            );
        }

        // Staggered initialization to keep the main thread responsive
        let index = 0;
        function initNext() {
            if (index >= toInitialize.length) {
                // All components initialized - now batch remove hidden attributes
                batchRemoveHidden();

                if (CONFIG.enableTiming) {
                    const endTime = performance.now();
                    console.log(
                        `[NDS] All components initialized in ${Math.round(
                            endTime - startTime
                        )}ms`
                    );
                }
                return;
            }

            const component = toInitialize[index++];
            try {
                component.init();
                if (CONFIG.enableLogging) {
                    console.log(`[NDS:init] ${component.name}`);
                }
            } catch (error) {
                console.warn(`[NDS:init] ${component.name} failed:`, error);
            }

            // Stagger next component to avoid blocking the main thread
            if (index < toInitialize.length) {
                setTimeout(initNext, CONFIG.staggerDelay);
            } else {
                initNext(); // Finish immediately
            }
        }

        // Batch removal of hidden attributes - single reflow instead of multiple
        function batchRemoveHidden() {
            const batchStart = performance.now();

            requestAnimationFrame(() => {
                const collectStart = performance.now();

                // Collect all NDS components with hidden attribute
                // Note: .nds-swiper-slide excluded - swiper controls slide visibility to prevent CLS
                const hiddenElements = document.querySelectorAll(
                    '[hidden].nds-tabs, ' +
                    '[hidden].nds-drawer, ' +
                    '[hidden].nds-breadcrumb-nav, ' +
                    '[hidden].nds-user-feedback, ' +
                    '[hidden].nds-dropmenu-menu, ' +
                    '[hidden].nds-nav-container, ' +
                    '[hidden].nds-swiper, ' +
                    '[hidden].nds-pagination-content, ' +
                    '[hidden].nds-footer, ' +
                    '[hidden].nds-sideInfo '
                );

                const collectEnd = performance.now();
                const removeStart = performance.now();

                // Remove all hidden attributes in one batch - triggers single reflow
                hiddenElements.forEach(el => el.removeAttribute('hidden'));

                const removeEnd = performance.now();
                const batchEnd = performance.now();

                // Performance logging
                if (CONFIG.enableTiming && hiddenElements.length > 0) {
                    console.group(`[NDS:Performance] Batch Reveal (${hiddenElements.length} elements)`);
                    console.log(`  Collection time: ${(collectEnd - collectStart).toFixed(2)}ms`);
                    console.log(`  Removal time: ${(removeEnd - removeStart).toFixed(2)}ms`);
                    console.log(`  Total batch time: ${(batchEnd - batchStart).toFixed(2)}ms`);
                    console.groupEnd();
                } else if (CONFIG.enableLogging && hiddenElements.length > 0) {
                    console.log(`[NDS] Revealed ${hiddenElements.length} hidden components in ${(batchEnd - batchStart).toFixed(2)}ms`);
                }
            });
        }

        // Start initialization chain
        requestAnimationFrame(initNext);
    }

    // Configuration options
    // Merge defaults with optional global/window overrides and HTML data-attributes
    // To enable performance monitoring, set window.NDSInitConfig = { enableTiming: true, enableLogging: true }
    const rootEl = document.documentElement;
    const attrAutoInit = rootEl?.getAttribute('data-nds-auto-init');
    const attrDisableAll = rootEl?.getAttribute('data-nds-disable-all');
    const GLOBAL = (typeof window !== 'undefined' && window.NDSInitConfig) ? window.NDSInitConfig : {};

    const CONFIG = {
        staggerDelay: 3, // ms between component initializations
        enableLogging: GLOBAL.enableLogging ?? false,
        enableTiming: GLOBAL.enableTiming ?? false,
        // When false, prevents automatic initialization on DOM ready
        autoInitialize: GLOBAL.autoInitialize ?? (attrAutoInit != null ? attrAutoInit !== 'false' : true),
        // When true, disables initializing any component (manual calls still respected if caller overrides)
        disableAll: GLOBAL.disableAll ?? (attrDisableAll != null ? attrDisableAll === 'true' : false),
    };

    // Expose global API immediately
    window.NDSInit = {
        initialize: initializeNDS,
        components: COMPONENTS,
        config: CONFIG,

        // Utility methods
        reinitialize: () => {
            console.log('[NDS] Reinitializing...');
            initializeNDS();
        },

        initializeComponent: (name) => {
            const component = COMPONENTS.find((c) => c.name === name);
            if (component) {
                try {
                    component.init();
                    console.log(`[NDS:init] ${name} reinitialized`);
                } catch (error) {
                    console.warn(
                        `[NDS:init] ${name} reinitialization failed:`,
                        error
                    );
                }
            } else {
                console.warn(`[NDS:init] Component '${name}' not found`);
            }
        },

        getStatus: () => {
            const status = {};
            COMPONENTS.forEach((component) => {
                const elements = component.selector
                    ? document.querySelectorAll(component.selector).length
                    : component.universal
                    ? 'universal'
                    : 0;
                status[component.name] = {
                    priority: component.priority,
                    elements: elements,
                    // Heuristic: check top-level window object referenced in init() string
                    available: !!window[
                        component.init.toString().match(/window\.(\w+)/)?.[1]
                    ],
                };
            });
            return status;
        },
    };

    // Initialize when ready (if enabled)
    if (CONFIG.autoInitialize) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeNDS);
        } else {
            initializeNDS();
        }
    }
})();
