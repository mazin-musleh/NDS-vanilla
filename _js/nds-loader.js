// NDS Unified Initialization System
(() => {
    'use strict';

    // Component registry with dependencies and selectors
    // Priority is automatically assigned based on array order (first = highest priority)
    // To change initialization order, simply reorder components in this array
    //
    // Standard component API contract:
    //   Factory components (per-element):  init(), reinit(), create(el)
    //   Singleton components (one global): init() + component-specific methods
    //   Utility/API components:            init() + utility methods
    //
    // All components live under the NDS.* namespace (e.g. NDS.Modal, NDS.Accordion)
    // Form sub-systems are grouped: NDS.Forms, NDS.Upload, NDS.OTP
    // Core utilities: NDS.Theme, NDS.debounce, NDS.onDOMAdd, etc.
    // Only exception: window.NDSInitConfig (pre-boot config, set before bundle loads)
    const COMPONENTS = [
        {
            name: 'Main Navigation',
            selector: '.nds-main-nav',
            init: () => NDS.Mainnav?.init?.(),
        },
        {
            name: 'forms',
            selector: '.nds-form-control',
            init: () => NDS.Forms?.init?.(),
        },
        {
            name: 'otp',
            selector: '.nds-otp-group',
            init: () => NDS.OTP?.init?.(),
        },
        {
            name: 'tabs',
            selector: '.nds-tabs',
            init: () => NDS.Tabs?.init?.(),
        },
        {
            name: 'tables',
            selector: '.nds-table',
            init: () => NDS.Tables?.init?.(),
        },
        {
            name: 'accordion',
            selector: '.nds-accordion',
            init: () => NDS.Accordion?.init?.(),
        },
        {
            name: 'stepper',
            selector: '.nds-stepper',
            init: () => NDS.Stepper?.init?.(),
        },
        {
            name: 'swiper',
            selector: '.nds-swiper',
            init: () => NDS.Swiper?.init?.(),
        },
        {
            name: 'upload',
            selector: '.nds-file-upload',
            init: () => NDS.Upload?.init?.(),
        },
        {
            name: 'sidemenu',
            selector: '.nds-sidemenu',
            init: () => NDS.Sidemenu?.init?.(),
        },
        {
            name: 'sideInfo',
            selector: '.nds-sideinfo',
            init: () => NDS.Sideinfo?.init?.(),
        },
        {
            name: 'drawer',
            selector: '.nds-drawer',
            init: () => NDS.Drawer?.init?.(),
        },
        {
            name: 'toc',
            selector: '.nds-toc',
            init: () => NDS.Toc?.init?.(),
        },
        {
            name: 'scrollMore',
            selector: '.nds-scroll-more',
            init: () => NDS.ScrollMore?.init?.(),
        },
        {
            name: 'progress',
            selector: '.nds-progress-circle, .nds-progress-bar',
            init: () => NDS.Progress?.init?.(),
        },
        {
            name: 'numbers',
            selector: '.nds-number-format, .nds-counter-value',
            init: () => NDS.Numbers?.init?.(),
        },
        {
            name: 'code',
            selector: 'code',
            init: () => NDS.Code?.init?.(),
        },
        {
            name: 'copy',
            selector: '.nds-copy',
            init: () => NDS.Copy?.init?.(),
        },
        {
            name: 'showcase',
            selector: '.nds-demo-card, .demo-toggle-btn, .nds-demo-showcase',
            init: () => NDS.Showcase?.init?.(),
        },
        {
            name: 'share',
            selector: '.nds-share',
            init: () => NDS.Share?.init?.(),
        },
        {
            name: 'datePicker',
            selector: '.nds-date-input',
            init: () => NDS.DatePicker?.init?.(),
        },
        {
            name: 'cityWeather',
            selector: '#nds-weatherInfo, #nds-cityName',
            init: () => NDS.CityWeather?.init?.(),
        },
        {
            name: 'timeDate',
            selector: '#nds-date, #nds-realTimeClock',
            init: () => NDS.TimeDate?.init?.(),
        },
        {
            name: 'fontLoading',
            selector: null,
            init: () => NDS.FontLoading?.init?.(),
            universal: true,
        },
        {
            name: 'link',
            selector: null,
            init: () => NDS.Link?.init?.(),
            universal: true,
        },
        {
            name: 'cookies',
            selector: '#ndsCookiesAcceptBtn',
            init: () => NDS.Cookies?.init?.(),
        },
        {
            name: 'rating',
            selector: '.nds-rating',
            init: () => NDS.Rating?.init?.(),
        },
        {
            name: 'expandable',
            selector: '.nds-expandable',
            init: () => NDS.Expandable?.init?.(),
        },
        {
            name: 'breadcrumb',
            selector: '.nds-breadcrumb-nav',
            init: () => NDS.Breadcrumb?.init?.(),
        },
        {
            name: 'dropmenu',
            selector: '.nds-dropmenu',
            init: () => NDS.Dropmenu?.init?.(),
        },
        {
            name: 'tooltip',
            selector: '.nds-tooltip',
            init: () => NDS.Tooltip?.init?.(),
        },
        {
            name: 'multiselect',
            selector: '.nds-multiselect',
            init: () => NDS.Multiselect?.init?.(),
        },
        {
            name: 'autocomplete',
            selector: '.nds-form-container[data-url]',
            init: () => NDS.Autocomplete?.init?.(),
        },
        {
            name: 'pagination',
            selector: '.nds-pagination',
            init: () => { NDS.Pagination?.init?.(); NDS.Pagination?.initAuto?.(); },
        },
        {
            name: 'ipv',
            selector: '.nds-ipv-thumbnail',
            init: () => NDS.Ipv?.init?.(),
        },
        {
            name: 'modal',
            selector: '.nds-modal',
            init: () => NDS.Modal?.init?.(),
        },
        {
            name: 'alert',
            selector: '.nds-alert',
            init: () => NDS.Alert?.init?.(),
        },
        {
            name: 'filter',
            selector: '.nds-filter',
            init: () => NDS.Filter?.init?.(),
        },
        {
            name: 'userFeedback',
            selector: '.nds-user-feedback',
            init: () => NDS.UserFeedback?.init?.(),
        },
        {
            name: 'chart',
            selector: '.nds-chart',
            init: () => NDS.Chart?.init?.(),
        },
        {
            name: 'empty',
            selector: '.nds-empty',
            init: () => NDS.Empty?.init?.(),
        },
        {
            name: 'cooldownButton',
            selector: '.nds-cooldown',
            init: () => NDS.CooldownButton?.init?.(),
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
                    '[hidden].nds-form-group, ' +
                    '[hidden].nds-form-container, ' +
                    '[hidden].nds-form-action, ' +
                    '[hidden].nds-user-feedback, ' +
                    '[hidden].nds-dropmenu-menu, ' +
                    '[hidden].nds-nav-container, ' +
                    '[hidden].nds-swiper, ' +
                    '[hidden].nds-paged-content, ' +
                    '[hidden].nds-footer, ' +
                    '[hidden].nds-sideinfo '
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
    // Note: NDSInitConfig uses window.* because it's set BEFORE the bundle loads (NDS namespace doesn't exist yet)
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
    NDS.Init = {
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
                    // Heuristic: check NDS namespace property referenced in init() string
                    available: !!NDS[
                        component.init.toString().match(/NDS\.(\w+)/)?.[1]
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
