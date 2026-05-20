// NDS Unified Initialization System
(() => {
    'use strict';

    // Component registry. Array order = init order (first runs first).
    // To change initialization order, reorder this array.
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
            name: 'theme',
            selector: '[data-theme-toggle], #ndsThemeToggle',
            init: () => NDS.Theme?.init?.(),
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
            idle: true,
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
            // Targets the three NDS code hooks (block, tabs-wrapped block, inline).
            // Avoids bare `code` so detection doesn't sweep every <code> on docs pages.
            name: 'code',
            selector: '.code-example, .nds-code, code.nds-inline-code',
            init: () => NDS.Code?.init?.(),
        },
        {
            name: 'copy',
            selector: '.nds-copy',
            init: () => NDS.Copy?.init?.(),
            idle: true,
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
            idle: true,
        },
        {
            name: 'datePicker',
            selector: '.nds-date-input',
            init: () => NDS.DatePicker?.init?.(),
            idle: true,
        },
        {
            name: 'fontLoading',
            selector: null,
            init: () => NDS.FontLoading?.init?.(),
            universal: true,
            idle: true,
        },
        {
            name: 'link',
            selector: null,
            init: () => NDS.Link?.init?.(),
            universal: true,
            idle: true,
        },
        {
            name: 'cookies',
            selector: '#ndsCookiesAcceptBtn',
            init: () => NDS.Cookies?.init?.(),
            idle: true,
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
            idle: true,
        },
        {
            name: 'tooltip',
            selector: '.nds-tooltip',
            init: () => NDS.Tooltip?.init?.(),
            idle: true,
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
            idle: true,
        },
        {
            name: 'modal',
            selector: '.nds-modal',
            init: () => NDS.Modal?.init?.(),
            idle: true,
        },
        {
            name: 'alert',
            selector: '.nds-alert',
            init: () => NDS.Alert?.init?.(),
            idle: true,
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
            idle: true,
        },
        {
            name: 'chart',
            selector: '.nds-chart',
            init: () => NDS.Chart?.init?.(),
            idle: true,
        },
        {
            name: 'empty',
            selector: '.nds-empty',
            init: () => NDS.Empty?.init?.(),
        },
        {
            // Eager: enforces single-submit. A click in the idle gap would
            // bypass the cooldown.
            name: 'cooldownButton',
            selector: '.nds-cooldown',
            init: () => NDS.CooldownButton?.init?.(),
        },
        // Topbar widgets — placed last because they're non-critical chrome
        // (clock, hijri date, weather, city). Their network-bound updates
        // are async anyway; ordering them after interactive components
        // (modal, tooltip, filter, pagination…) keeps the early init chain
        // focused on what the user can click.
        {
            name: 'cityWeather',
            selector: '#nds-weatherInfo, #nds-cityName',
            init: () => NDS.CityWeather?.init?.(),
            idle: true,
        },
        {
            name: 'timeDate',
            selector: '#nds-date, #nds-realTimeClock',
            init: () => NDS.TimeDate?.init?.(),
            idle: true,
        },
        {
            // Idle: the panel is display:none until opened, and persisted a11y
            // modes apply early via the FOUC guard — so the wiring can wait out
            // the eager burst.
            name: 'accessibility',
            selector: '[data-accessibility-panel]',
            init: () => NDS.Accessibility?.init?.(),
            idle: true,
        },
    ];

    // Shared MessageChannel for cross-batch yielding — allocated once per page
    // lifetime instead of per initializeNDS() call. Reinitialize-heavy
    // consumers (SPA route changes) would otherwise leak the prior channel +
    // its onmessage handler on every call. FIFO queue handles overlapping
    // init chains (reinit fired while a previous chain is still draining).
    const _yieldChannel = new MessageChannel();
    const _yieldQueue = [];
    _yieldChannel.port1.onmessage = () => {
        const cb = _yieldQueue.shift();
        if (cb) cb();
    };
    const yieldToBrowser = (cb) => {
        _yieldQueue.push(cb);
        _yieldChannel.port2.postMessage(null);
    };

    // rIC fallback for older Safari (<18); behaves like a deferred macrotask
    // with a fake deadline so the loop still drains.
    const scheduleIdle = window.requestIdleCallback ||
        ((cb) => setTimeout(() => cb({ timeRemaining: () => 50, didTimeout: false }), 1));

    function initializeNDS() {
        if (CONFIG.disableAll === true) {
            if (CONFIG.enableLogging) {
                console.warn('[NDS] Initialization disabled (config.disableAll = true)');
            }
            return;
        }
        const startTime = performance.now();

        // Detect which components are on the page. Per-component querySelector
        // is the fast path: it short-circuits at the first match and uses the
        // browser's native class/ID indices for absent selectors — no JS-level
        // matches() loop needed.
        const existingComponents = new Map();
        for (const c of COMPONENTS) {
            if (c.universal) {
                existingComponents.set(c.name, true);
            } else if (c.selector && document.querySelector(c.selector)) {
                existingComponents.set(c.name, true);
            }
        }

        // Source order is priority order (assigned at line 248), and .filter
        // preserves order — no sort needed.
        const toInitialize = COMPONENTS.filter((c) => existingComponents.get(c.name));
        const eagerComponents = toInitialize.filter((c) => !c.idle);
        const idleComponents = toInitialize.filter((c) => c.idle);

        if (CONFIG.enableLogging) {
            console.log(
                `[NDS] Initializing ${toInitialize.length}/${COMPONENTS.length} components ` +
                `(${eagerComponents.length} eager, ${idleComponents.length} idle)`
            );
        }

        const runInit = (component) => {
            try {
                component.init();
                if (CONFIG.enableLogging) {
                    console.log(`[NDS:init] ${component.name}`);
                }
            } catch (error) {
                console.warn(`[NDS:init] ${component.name} failed:`, error);
            }
        };

        // Eager pass: time-sliced. Small inits share a task; a heavy init lands
        // alone. Yields when the per-batch budget is exceeded.
        let eagerIndex = 0;
        function initEagerBatch() {
            const batchStart = performance.now();
            while (
                eagerIndex < eagerComponents.length &&
                performance.now() - batchStart < CONFIG.initBudgetMs
            ) {
                runInit(eagerComponents[eagerIndex++]);
            }
            if (eagerIndex < eagerComponents.length) {
                yieldToBrowser(initEagerBatch);
            } else {
                // Eager pass done — card-revealing components (swiper,
                // pagination) are up. Stamp the body so critical-CSS skeletons
                // hand off to the real, now-styled components.
                document.body.setAttribute('data-nds-loaded', '');
                if (idleComponents.length) {
                    scheduleIdle(drainIdle, { timeout: 2000 });
                } else {
                    logAllDone();
                }
            }
        }

        // Idle pass: drains as many components as fit in each idle slot. The
        // timeout ensures these still run if the page never goes idle.
        let idleIndex = 0;
        function drainIdle(deadline) {
            while (
                idleIndex < idleComponents.length &&
                (deadline.didTimeout || deadline.timeRemaining() > 1)
            ) {
                runInit(idleComponents[idleIndex++]);
            }
            if (idleIndex < idleComponents.length) {
                scheduleIdle(drainIdle, { timeout: 2000 });
            } else {
                logAllDone();
            }
        }

        function logAllDone() {
            if (CONFIG.enableTiming) {
                console.log(
                    `[NDS] All components initialized in ${Math.round(performance.now() - startTime)}ms`
                );
            }
        }

        // Start initialization chain after the next paint so the browser has
        // committed at least one frame before we touch the DOM.
        requestAnimationFrame(initEagerBatch);
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
        // Per-batch budget: eager components init in a tight loop until this
        // many ms elapse, then yield. Keep below ~40 to stay clear of TBT's
        // 50ms long-task threshold even on throttled CPUs.
        initBudgetMs: GLOBAL.initBudgetMs ?? 5,
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
    };

    // Initialize when ready (if enabled). When the bundle runs as a defer script,
    // readyState is 'interactive' and DOMContentLoaded has not yet fired — wait for
    // it so detection + init don't pile onto the bundle's eval task.
    if (CONFIG.autoInitialize) {
        if (document.readyState === 'complete') {
            setTimeout(initializeNDS, 0);
        } else {
            document.addEventListener('DOMContentLoaded', initializeNDS);
        }
    }
})();
