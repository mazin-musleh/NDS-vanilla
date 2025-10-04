// NDS Unified Initialization System
(() => {
    'use strict';

    // Component registry with dependencies and selectors
    const COMPONENTS = [
        {
            name: 'navigation',
            priority: 1,
            selector: '.nds-main-nav',
            init: () => window.NDSNavController?.init?.(),
            // universal: true
        },
        {
            name: 'forms',
            priority: 2,
            selector: '.nds-form-control',
            init: () => window.NDS?.Forms?.init?.(),
            // universal: true // Always initialize
        },
        {
            name: 'tabs',
            priority: 3,
            selector: '.nds-tabs',
            init: () => window.NDSTabs?.init?.(),
        },
        {
            name: 'accordion',
            priority: 4,
            selector: '.nds-accordion',
            init: () => window.NDSAccordion?.init?.(),
        },
        {
            name: 'stepper',
            priority: 5,
            selector: '.nds-stepper',
            init: () => window.NDSStepper?.init?.(),
        },
        {
            name: 'fileUpload',
            priority: 6,
            selector: '.nds-file-upload',
            init: () => window.NDS?.Forms?.FileUpload?.init?.(),
        },
        {
            name: 'oneRowContent',
            priority: 7,
            selector: '.oneRowContent',
            init: () => window.NDSOneRowContent?.initializeRowScroll?.(),
        },
        {
            name: 'sideMenu',
            priority: 8,
            selector: '.wSideMenu',
            init: () => window.NDSSideMenu?.init?.(),
        },
        {
            name: 'numbers',
            priority: 9,
            selector: '.nds-number-format, .nds-counter-value',
            init: () => {
                // Run both formatting and counter setup regardless of return values
                window.NDSNumbers?.formatThousands?.();
                window.NDSNumbers?.setupCounterAnimations?.();
            },
        },
        {
            name: 'code',
            priority: 10,
            selector: 'code',
            init: () => window.NDSCode?.init?.(),
        },
        {
            name: 'showcase',
            priority: 11,
            selector: '.nds-demo-card, .demo-toggle-btn',
            init: () => window.NDSShowcase?.init?.(),
        },
        {
            name: 'share',
            priority: 12,
            selector: '#nds-sharePageBtn',
            init: () => window.NDSShare?.init?.(),
        },
        {
            name: 'calendar',
            priority: 13,
            selector: '.nds-date-input',
            init: () => window.NDSCalendar?.init?.(),
        },
        {
            name: 'cityWeather',
            priority: 14,
            selector: '#nds-weatherInfo, #nds-cityName',
            init: () => window.NDSCityWeather?.init?.(),
        },
        {
            name: 'timeDate',
            priority: 15,
            selector: '#nds-date, #nds-realTimeClock',
            init: () => window.NDSTimeDate?.init?.(),
        },
        {
            name: 'fontLoading',
            priority: 16,
            selector: null,
            init: () => window.NDSFontLoading?.init?.(),
            universal: true,
        },
        {
            name: 'cookies',
            priority: 17,
            selector: '#ndsCookiesAcceptBtn',
            init: () => window.NDSCookies?.init?.(),
        },
        {
            name: 'rating',
            priority: 18,
            selector: '.nds-rating',
            init: () => window.NDSRating?.initializeRatings?.(),
        },
        {
            name: 'expandable',
            priority: 19,
            selector: '.nds-expandable',
            init: () => window.NDSExpandable?.init?.(),
        },
        {
            name: 'breadcrumb',
            priority: 20,
            selector: '.nds-breadcrumb-nav',
            init: () => window.NDSBreadcrumb?.init?.(),
        },
        {
            name: 'dropmenu',
            priority: 21,
            selector: '.nds-dropmenu',
            init: () => window.NDSDropmenu?.init?.(),
        },
        {
            name: 'pagination',
            priority: 22,
            selector: '.nds-pagination',
            init: () => window.NDSPagination?.init?.(),
        },
        {
            name: 'autoPagination',
            priority: 23,
            selector: '.nds-auto-pagination',
            init: () => window.NDSPagination?.initAuto?.(),
        },
        {
            name: 'ipv',
            priority: 24,
            selector: '.nds-ipv-thumbnail',
            init: () => window.NDSImagePopupViewer?.init?.(),
        },
    ];

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

        // Start initialization chain
        requestAnimationFrame(initNext);
    }

    // Configuration options
    // Merge defaults with optional global/window overrides and HTML data-attributes
    const rootEl = document.documentElement;
    const attrAutoInit = rootEl?.getAttribute('data-nds-auto-init');
    const attrDisableAll = rootEl?.getAttribute('data-nds-disable-all');
    const GLOBAL = (typeof window !== 'undefined' && window.NDSInitConfig) ? window.NDSInitConfig : {};

    const CONFIG = {
        staggerDelay: 3, // ms between component initializations
        enableLogging: true,
        enableTiming: true,
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
