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
            name: 'Mainnav',
            selector: '.nds-main-nav',
            init: () => NDS.Mainnav?.init?.(),
        },
        {
            // Deferred: the saved theme is stamped pre-paint by the inline FOUC
            // script (head-inline-scripts.html) and critical-inline CSS paints the
            // [data-theme="dark"] body/hero bg, so first paint is correct with no JS.
            // init() only syncs toggle-widget UI (icon/checkbox/aria) and wires the
            // toggle — no page-color repaint; theme application fires on interaction.
            name: 'Theme',
            selector: '[data-theme-toggle], #ndsThemeToggle',
            init: () => NDS.Theme?.init?.(),
        },
        {
            // Critical: init un-hides [hidden] FOUC-guard form wrappers and reveals
            // the .nds-clear button on pre-filled fields — first-paint writes that
            // CLS if deferred (forms have no own skeleton; the content-layout gate
            // hides them until reveal). Init is cold (no layout reads).
            name: 'Forms',
            selector: '.nds-form-control',
            init: () => NDS.Forms?.init?.(),
            critical: true,
        },
        {
            // Deferred but stays in MAIN (no bundle): init() restores pre-selected
            // labels, which are JS-derived from the option text. A delegated/extras
            // bundle loads after the critical pass, so a pre-filled select would flash
            // empty until then on slow links — keep the code in main so the restore
            // runs on the local idle pass. Each select's NDS.Dropmenu builds lazily
            // on first focusin; forms doesn't reach in, so no critical→deferred dependency.
            name: 'CustomSelect',
            selector: '.nds-select-input',
            init: () => NDS.CustomSelect?.init?.(),
        },
        {
            // Deferred: input wiring fires on user typing — no first-paint
            // visual. The input[autofocus] restore is opt-in; pages that
            // ship autofocus on an OTP input will see the restore delayed
            // by one idle slot. Acceptable for the common case.
            name: 'OTP',
            selector: '.nds-otp-group',
            init: () => NDS.OTP?.init?.(),
        },
        {
            name: 'Tabs',
            selector: '.nds-tabs',
            init: () => NDS.Tabs?.init?.(),
        },
        {
            // Deferred: init reparents the table into .nds-table-wrapper (the
            // overflow-x scroll container) + wires sort/select. The reparent is
            // layout-neutral (wrapper adds overflow only, no box-size change), so
            // it forces no reflow and measured ~0 CLS in the delegated bundle —
            // safe to load late. Sort/select clicks in the pre-bundle gap no-op
            // and recover on the next click.
            name: 'Tables',
            selector: '.nds-table',
            init: () => NDS.Tables?.init?.(),
        },
        {
            // Critical: auto-expand state would CLS if deferred (panels
            // paint collapsed-by-default then expand on init).
            name: 'Accordion',
            selector: '.nds-accordion',
            init: () => NDS.Accordion?.init?.(),
            critical: true,
        },
        {
            // Critical: steps ship with no data-state; syncStepStates() stamps
            // current/completed/upcoming at init and CSS turns those into the step
            // highlight + connector fill (radial display:none's non-current steps).
            // Deferral paints every step active, then recolors post-reveal = flash/CLS.
            name: 'Stepper',
            selector: '.nds-stepper',
            init: () => NDS.Stepper?.init?.(),
            critical: true,
        },
        {
            // Critical: the skeleton collapses multi-slide swipers to slide 1
            // until init writes --slides; deferral would re-expand the track
            // post-reveal (CLS). Hero swipers are above-the-fold LCP.
            name: 'Swiper',
            selector: '.nds-swiper',
            init: () => NDS.Swiper?.init?.(),
            critical: true,
        },
        {
            name: 'Upload',
            selector: '.nds-file-upload',
            init: () => NDS.Upload?.init?.(),
        },
        {
            // Deferred + self-contained: the Web Speech engine + button live in
            // nds-voice-input.js, consumed by nothing else. Interaction-driven
            // (recognition starts on click), so a late wire lands before the click.
            name: 'VoiceInput',
            selector: '.nds-voice-input',
            init: () => NDS.VoiceInput?.init?.(),
        },
        {
            // Critical: init un-hides the [hidden] mobile toggle and fills its
            // collapsed label from the server-rendered active item. Deferral = toggle
            // CLS + a hidden nav affordance until the idle pass.
            name: 'Sidemenu',
            selector: '.nds-sidemenu',
            init: () => NDS.Sidemenu?.init?.(),
            critical: true,
        },
        {
            // Critical: the hero-aside variant paints the panel at a -180px
            // placeholder (--nds-sideinfo-top fallback); init's first updatePosition
            // writes the measured hero-head offset. Deferral lands that correction
            // post-reveal = vertical jump of an above-the-fold aside (CLS). Cold-init
            // (first measure rides the onElementResize initial callback).
            name: 'Sideinfo',
            selector: '.nds-sideinfo',
            init: () => NDS.Sideinfo?.init?.(),
            critical: true,
        },
        {
            // Critical: initActiveStates expands the active-page path at init so
            // the current page is visible without a manual expand (ease of
            // use). The server marks the active leaf but paints its ancestors
            // collapsed, so deferral would pop the path open post-paint
            // (CLS) and hide the active item. Init is cold (no layout reads).
            name: 'Drawer',
            selector: '.nds-drawer',
            init: () => NDS.Drawer?.init?.(),
            critical: true,
        },
        {
            // Critical: data-toc-source TOCs build their list from page headings at
            // init (populate → replaceChildren), a structural height change that
            // CLSs if it lands after the critical pass — and the list count is
            // arbitrary, so no CSS skeleton can reserve the slot. Ships in main so
            // it wires in the first burst; init does no layout reads (the measuring
            // pass is deferred to onIdle), so it adds no forced reflow.
            name: 'Toc',
            selector: '.nds-toc',
            init: () => NDS.Toc?.init?.(),
            critical: true,
        },
        {
            // Critical: the overflow affordance (has-more edge-mask + sticky
            // show-more button) is applied via the onElementResize initial
            // callback, which the critical pass front-loads. Deferral would pop
            // it in post-reveal (CLS) for above-the-fold overflow content (e.g.
            // tab bars in nds-tabs). Init is cold — no synchronous layout reads
            // (the first measure runs in the ResizeObserver callback).
            name: 'ScrollMore',
            selector: '.nds-scroll-more',
            init: () => NDS.ScrollMore?.init?.(),
            critical: true,
        },
        {
            // Deferred: progress animations are cosmetic on-scroll work.
            name: 'Progress',
            selector: '.nds-progress-circle, .nds-progress-bar',
            init: () => NDS.Progress?.init?.(),
        },
        {
            // Deferred: counter animations are cosmetic on-scroll work.
            name: 'Numbers',
            selector: '.nds-number-format, .nds-counter-value',
            init: () => NDS.Numbers?.init?.(),
        },
        {
            // Targets the three NDS code hooks (block, tabs-wrapped block, inline).
            // Avoids bare `code` so detection doesn't sweep every <code> on docs pages.
            name: 'Code',
            selector: '.code-example, .nds-code, code.nds-inline-code',
            init: () => NDS.Code?.init?.(),
            critical: true,
        },
        {
            name: 'Copy',
            selector: '.nds-copy',
            init: () => NDS.Copy?.init?.(),
        },
        // Note: showcase is intentionally NOT registered here. Like accessibility,
        // it ships as its own defer bundle (nds-showcase.min.js) and self-boots.
        // The loader's init is decoupled from DOMContentLoaded, so registering it
        // would risk init() running before that sibling bundle has executed.
        {
            name: 'Share',
            selector: '.nds-share',
            init: () => NDS.Share?.init?.(),
        },
        {
            // Detection-only: presence of a [data-export] button loads the
            // extras bundle; export's init wires the delegated click handler.
            name: 'Export',
            selector: '[data-export]',
            init: () => NDS.Export?.init?.(),
        },
        {
            name: 'DatePicker',
            selector: '.nds-date-input',
            init: () => NDS.DatePicker?.init?.(),
        },
        {
            name: 'FontLoading',
            selector: null,
            init: () => NDS.FontLoading?.init?.(),
            universal: true,
        },
        {
            // Critical: NDS.Link.init() tags external links with no layout reads
            // (guards are hostname/classList only), so it forces no reflow and is
            // safe before first paint — above-the-fold external badges are present
            // on the first frame (no pop-in CLS). NOTE: keep it layout-read-free;
            // an earlier getBoundingClientRect viewport-partition forced a full
            // page layout here (~110ms@6.6x on index) and had to be removed.
            name: 'Link',
            selector: null,
            init: () => NDS.Link?.init?.(),
            universal: true,
            critical: true,
        },
        {
            name: 'Cookies',
            selector: '#ndsCookiesAcceptBtn',
            init: () => NDS.Cookies?.init?.(),
        },
        {
            // Deferred + self-contained: nothing consumes NDS.Rating and the stars
            // paint from markup/CSS — click-to-rate wiring lands before interaction.
            name: 'Rating',
            selector: '.nds-rating',
            init: () => NDS.Rating?.init?.(),
        },
        {
            // Deferred: the collapsed clamp is pure CSS (_utilities.scss base
            // max-height/overflow, server-rendered + in main), so the box paints
            // correctly with no JS. init() is registration-only; the height read +
            // "show more" button + 'expandable' stamp run from the ResizeObserver's
            // first delivery (post-reveal in either tier) and are layout-neutral
            // (absolute button + paint-only mask) — no expand↔collapse height swap.
            name: 'Expandable',
            selector: '.nds-expandable',
            init: () => NDS.Expandable?.init?.(),
        },
        {
            // Critical: server renders all crumbs; init() collapses 6+ into an
            // ellipsis dropdown via replaceChildren (horizontal restructure, no layout
            // reads). Deferral paints the full breadcrumb, then collapses it
            // post-reveal = horizontal CLS. Skeleton reserves only row height.
            name: 'Breadcrumb',
            selector: '.nds-breadcrumb-nav',
            init: () => NDS.Breadcrumb?.init?.(),
            critical: true,
        },
        {
            name: 'Dropmenu',
            selector: '.nds-dropmenu',
            init: () => NDS.Dropmenu?.init?.(),
        },
        {
            name: 'Tooltip',
            selector: '.nds-tooltip',
            init: () => NDS.Tooltip?.init?.(),
        },
        {
            // Critical: pre-selected chips are JS-built at init (server markup
            // ships the chip track empty) and grow the field height, which has
            // no reserved space in CSS — deferral would inject them post-reveal
            // (CLS). The empty case is stable, but registration can't know which.
            name: 'Multiselect',
            selector: '.nds-multiselect',
            init: () => NDS.Multiselect?.init?.(),
            critical: true,
        },
        {
            // Deferred: results fetch on user typing — no first-paint visual.
            name: 'Autocomplete',
            selector: '.nds-form-container[data-url]',
            init: () => NDS.Autocomplete?.init?.(),
        },
        {
            // Critical: init now reads --per-page inline-first (no forced recalc)
            // and generates the collapsed list directly, so it no longer needs a
            // settled idle layout; the skeleton CSS still reserves the slot until
            // data-paged-initialized, so no CLS. Registered before filter so
            // filter's Pagination.refresh runs after pagination is up.
            name: 'Pagination',
            selector: '.nds-pagination',
            init: () => { NDS.Pagination?.init?.(); NDS.Pagination?.initAuto?.(); },
            critical: true,
        },
        {
            name: 'Ipv',
            selector: '.nds-ipv-thumbnail',
            init: () => NDS.Ipv?.init?.(),
        },
        {
            name: 'Modal',
            selector: '.nds-modal',
            init: () => NDS.Modal?.init?.(),
        },
        {
            name: 'Alert',
            selector: '.nds-alert',
            init: () => NDS.Alert?.init?.(),
        },
        {
            // Critical: init is cheap now (scoped surface lookups + deferred option
            // builds) and filtering controls visible content, so wiring it before
            // first paint keeps URL-active filters and interactions ready. Drives
            // pagination via Pagination.refresh; pagination is critical and
            // registered above, so it inits first.
            // Gate on [data-filter-target] (not .nds-filter): a filter is defined
            // by its target link, so it must init even when there's no .nds-filter
            // dropdown (e.g. a search-only filter).
            name: 'Filter',
            selector: '[data-filter-target]',
            init: () => NDS.Filter?.init?.(),
            critical: true,
        },
        {
            name: 'UserFeedback',
            selector: '.nds-user-feedback',
            init: () => NDS.UserFeedback?.init?.(),
        },
        {
            name: 'Chart',
            selector: '.nds-chart',
            init: () => NDS.Chart?.init?.(),
        },
        {
            // Critical: init() BUILDS the placeholder DOM (icon + message) into empty
            // containers — it isn't server-rendered. Deferral injects it post-reveal = CLS.
            name: 'Empty',
            selector: '.nds-empty',
            init: () => NDS.Empty?.init?.(),
            critical: true,
        },
        {
            // Critical: enforces single-submit. A click in the deferred gap would
            // bypass the cooldown.
            name: 'CooldownButton',
            selector: '.nds-cooldown',
            init: () => NDS.CooldownButton?.init?.(),
            critical: true,
        },
        // Topbar widgets — placed last because they're non-critical chrome
        // (digital stamp, clock, hijri date, weather, city). Their updates are
        // interaction- or network-bound anyway; ordering them after interactive
        // components (modal, tooltip, filter, pagination…) keeps the early init
        // chain focused on what the user can click.
        {
            // Standalone trust-banner disclosure. First paint is correct with JS
            // deleted (panel ships [hidden]; CSS owns the expand), so it rides the
            // delegated bundle. Decoupled from Mainnav — mutual exclusion with the
            // nav comes from each surface's own outside-click handler.
            name: 'DigitalStamp',
            selector: '.nds-digitalStamp-tab',
            init: () => NDS.DigitalStamp?.init?.(),
        },
        {
            name: 'CityWeather',
            selector: '#nds-weatherInfo, #nds-cityName',
            init: () => NDS.CityWeather?.init?.(),
        },
        {
            name: 'TimeDate',
            selector: '#nds-date, #nds-realTimeClock',
            init: () => NDS.TimeDate?.init?.(),
        },
        // Note: accessibility is intentionally NOT registered here. The
        // optional assets/js/nds-accessibility.min.js bundle self-boots via
        // its own IIFE — arms on localStorage-saved prefs (apply on load) or
        // on FAB click (lazy init). Loader has zero references; the bundle
        // can be omitted entirely without touching core.
    ];

    // Cross-batch yielding. Prefers scheduler.yield() (Chrome 129+) so the
    // browser can preempt for input/paint between batches; falls back to a
    // shared MessageChannel — allocated once per page lifetime instead of
    // per initializeNDS() call so reinit-heavy consumers (SPA route changes)
    // don't leak channels. FIFO queue handles overlapping init chains
    // (reinit fired while a previous chain is still draining).
    const _yieldChannel = new MessageChannel();
    const _yieldQueue = [];
    _yieldChannel.port1.onmessage = () => {
        const cb = _yieldQueue.shift();
        if (cb) cb();
    };
    const yieldToBrowser = (typeof scheduler !== 'undefined' && scheduler.yield)
        ? (cb) => scheduler.yield().then(cb)
        : (cb) => { _yieldQueue.push(cb); _yieldChannel.port2.postMessage(null); };

    // rIC fallback for older Safari (<18). Deadline counts down a real 5ms
    // slot so drainIdle yields like native rIC instead of running every
    // idle component in one macrotask. Fidelity gap: unlike native rIC this
    // fires ~immediately (setTimeout 1ms), NOT at true idle — so on those
    // engines deferred components init right after the critical pass, competing with
    // the post-load window (the 5ms slot still caps each task). The {timeout}
    // arg is ignored (didTimeout stays false): setTimeout always fires, so no
    // timeout-forced run is needed.
    const scheduleIdle = window.requestIdleCallback ||
        ((cb) => {
            const start = performance.now();
            setTimeout(() => cb({
                didTimeout: false,
                timeRemaining: () => Math.max(0, 5 - (performance.now() - start))
            }), 1);
        });

    // Asset base + version derived from the loader's own <script>. nds-loader.js
    // is bundled last into nds-main.min.js, so during this IIFE's synchronous
    // eval document.currentScript IS the main bundle's element. Captured here at
    // eval time — currentScript is null inside the async callbacks below. Sibling
    // bundles reuse main's origin (so they pass a consumer's CSP 'self'/host
    // allowlist for free — no new origin) and its ?ver= cache-bust. Fallbacks:
    // find the main script by src, then a window.NDSAssetBase override.
    const SELF = document.currentScript ||
        [...document.scripts].find((s) => /nds-main(\.min)?\.js/.test(s.src));
    const ASSET = (() => {
        if (SELF && SELF.src) {
            const u = new URL(SELF.src, location.href);
            return { dir: u.href.slice(0, u.href.lastIndexOf('/') + 1), ver: u.search };
        }
        return { dir: window.NDSAssetBase || '', ver: '' };
    })();
    const bundleUrl = (file) => ASSET.dir + file + ASSET.ver;

    // Injected (non-main) bundles + the namespaces each ships, generated by the
    // build from the actual bundle file lists and prepended to this bundle as
    // window.__NDS_BUNDLES = { delegated: { file, ns:[...] }, extras: {...} }.
    // Bundle membership (location) is owned entirely by the build — the loader and
    // the component registry never hardcode it. Each injected bundle loads after
    // the critical pass (never a render-blocking <script defer>), so its download
    // never gates the reveal.
    const MAP = window.__NDS_BUNDLES || {};
    // namespace → bundle name, for the lazy stubs + the partition's location lookup.
    const nsToBundle = {};
    for (const b in MAP) for (const ns of (MAP[b].ns || [])) nsToBundle[ns] = b;

    // Trusted Types passthrough for script.src — a TrustedScriptURL sink when
    // require-trusted-types-for 'script' is enforced and no default policy exists.
    // Same-origin, known filenames only. try/catch: a consumer's trusted-types
    // directive may not allowlist this policy name (then we fall back to a string,
    // which their default policy handles, or the assignment throws and the bundle
    // is simply skipped — inits no-op via ?.).
    let _ttPolicy;
    if (window.trustedTypes && trustedTypes.createPolicy) {
        try {
            _ttPolicy = trustedTypes.createPolicy('nds', { createScriptURL: (u) => u });
        } catch (e) { /* policy name not allowed — fall back to plain string */ }
    }

    // Loads an injected bundle once and resolves when it's ready. Idempotent —
    // returns the in-flight/settled promise on repeat calls, so the auto-load
    // (when a present component needs it, see below) and the public
    // NDS.loadBundle() (for content injected after load) share one fetch.
    // Resolves on load OR error so callers never hang; a missing/blocked bundle
    // leaves inits as ?. no-ops. Skips injection when a <script> for the bundle
    // already exists — a consumer under a no-injection CSP can self-host it with
    // their own nonce/integrity and the loader still drives init. Propagates
    // main's nonce so it passes nonce-only policies without 'strict-dynamic'.
    // Usage for dynamic content: await NDS.loadBundle('extras'); NDS.Chart.init();
    const _bundlePromises = {};
    function loadBundle(name) {
        if (_bundlePromises[name]) return _bundlePromises[name];
        const file = MAP[name] && MAP[name].file;
        if (!file || !ASSET.dir) return (_bundlePromises[name] = Promise.resolve());
        if ([...document.scripts].some((s) => s.src && s.src.includes(file))) {
            return (_bundlePromises[name] = Promise.resolve());
        }
        _bundlePromises[name] = new Promise((resolve) => {
            const url = bundleUrl(file);
            const s = document.createElement('script');
            s.src = _ttPolicy ? _ttPolicy.createScriptURL(url) : url;
            s.fetchPriority = 'low';
            if (SELF && SELF.nonce) s.nonce = SELF.nonce;
            s.onload = resolve;
            s.onerror = () => {
                console.warn(`[NDS] bundle '${name}' failed to load (${url})`);
                resolve();
            };
            document.head.appendChild(s);
        });
        return _bundlePromises[name];
    }

    // Transparent lazy stubs: expose each injected namespace BEFORE its bundle
    // loads, so existing public usage (e.g. NDS.Chart.create(...)) keeps working
    // unchanged — the call triggers the right bundle (resolved from the build
    // manifest; nothing is hardcoded in consumer code) and runs once it's ready.
    // The bundle overwrites the stub when it executes, so every post-load call is
    // the native, synchronous object; the stub only bridges calls made before the
    // bundle arrives. A method invoked while stubbed returns a Promise (resolves
    // after load) — fine for fire-and-forget calls. If the bundle is missing the
    // call no-ops with a warning (the __ndsStub guard stops it recursing).
    for (const ns in nsToBundle) {
        if (NDS[ns]) continue;
        const bundle = nsToBundle[ns];
        NDS[ns] = new Proxy({ __ndsStub: true }, {
            get(target, prop) {
                if (prop === '__ndsStub') return true;
                if (prop === 'then' || typeof prop === 'symbol') return undefined;
                return (...args) => loadBundle(bundle).then(() => {
                    const real = NDS[ns];
                    if (real && !real.__ndsStub && typeof real[prop] === 'function') {
                        return real[prop](...args);
                    }
                    console.warn(`[NDS] ${ns}.${String(prop)}() unavailable — bundle '${bundle}' missing`);
                });
            },
        });
    }

    function initializeNDS() {
        if (CONFIG.disableAll === true) {
            if (CONFIG.enableLogging) {
                console.warn('[NDS] Initialization disabled (config.disableAll = true)');
            }
            return;
        }
        const startTime = performance.now();

        // Partition buckets. The init-loop closures capture these bindings; all
        // are assigned (below) before initCriticalBatch runs. Injected-bundle
        // groups init in their own pass once each bundle loads — see
        // initCriticalBatch.
        let criticalComponents, deferredComponents, injectedGroups;

        const runInit = (component) => {
            const start = CONFIG.enableTiming ? performance.now() : 0;
            try {
                component.init();
                if (CONFIG.enableLogging) {
                    const timing = CONFIG.enableTiming
                        ? ` ${(performance.now() - start).toFixed(1)}ms`
                        : '';
                    console.log(`[NDS:init] ${component.name}${timing}`);
                }
            } catch (error) {
                console.warn(`[NDS:init] ${component.name} failed:`, error);
            }
        };

        // Critical pass (the reveal checklist): time-sliced. Small inits share a
        // task; a heavy init lands alone. Yields when the per-batch budget is
        // exceeded.
        let criticalIndex = 0;
        function initCriticalBatch() {
            const batchStart = performance.now();
            while (
                criticalIndex < criticalComponents.length &&
                performance.now() - batchStart < CONFIG.initBudgetMs
            ) {
                runInit(criticalComponents[criticalIndex++]);
            }
            if (criticalIndex < criticalComponents.length) {
                yieldToBrowser(initCriticalBatch);
            } else {
                // Checklist complete — card-revealing components (swiper,
                // pagination) are up. Stamp the body so critical-CSS skeletons
                // hand off to the real, now-styled components: this is the reveal.
                document.body.setAttribute('data-nds-loaded', '');

                // Deferred components whose code is already in main drain in idle
                // slots immediately — never gated on an injected-bundle fetch.
                if (deferredComponents.length) drainList(deferredComponents, logAllDone);
                else logAllDone();

                // Injected-bundle components init in their own pass once that
                // bundle arrives, so a (low-priority) download never delays the
                // main idle drain above. loadBundle resolves on load OR error
                // (missing/blocked bundle → inits no-op via ?.).
                for (const name in injectedGroups) {
                    const group = injectedGroups[name];
                    loadBundle(name).then(() => drainList(group));
                }
            }
        }

        // Idle-slot drain: runs a component list across idle slots, as many as
        // fit each slot. Self-schedules until the list is exhausted; the timeout
        // ensures it still runs if the page never goes idle. Shared by the
        // deferred list and each injected-bundle group (each gets its own index/onDone).
        function drainList(list, onDone) {
            let i = 0;
            function drain(deadline) {
                while (
                    i < list.length &&
                    (deadline.didTimeout || deadline.timeRemaining() > 1)
                ) {
                    runInit(list[i++]);
                }
                if (i < list.length) scheduleIdle(drain, { timeout: 2000 });
                else if (onDone) onDone();
            }
            scheduleIdle(drain, { timeout: 2000 });
        }

        function logAllDone() {
            if (CONFIG.enableTiming) {
                console.log(
                    `[NDS] All components initialized in ${Math.round(performance.now() - startTime)}ms`
                );
            }
        }

        // Run detection + the critical pass directly — no rAF. The page is CSS-
        // hidden behind the critical-CSS skeleton until the critical pass stamps
        // data-nds-loaded, so there's nothing visible to protect with a pre-
        // paint frame: the rAF only pushed the reveal back a frame and froze
        // init entirely in a hidden tab (rAF never fires for a hidden document,
        // so a background-opened tab would never initialize). We already run off
        // the eval/DCL task via the setTimeout(0) kickoff below; detection's
        // per-component querySelector (fast path: short-circuits at first match)
        // joins the first critical batch's wall clock.
        // Source order (registry above) is priority order; push preserves it.
        criticalComponents = [];
        deferredComponents = [];
        injectedGroups = {};
        for (const c of COMPONENTS) {
            const present = c.universal || (c.selector && document.querySelector(c.selector));
            if (!present) continue;
            if (c.critical) {
                criticalComponents.push(c);                          // on the checklist → ships in main
                continue;
            }
            const bundle = nsToBundle[c.name];                   // location from the build manifest
            if (bundle) (injectedGroups[bundle] ||= []).push(c); // deferred → injected bundle
            else deferredComponents.push(c);                     // deferred → already in main
        }

        // Kick off each needed bundle now so its (low-priority) download
        // overlaps the critical pass. loadBundle is idempotent; its components
        // init in a per-bundle pass once it lands (see initCriticalBatch) — the
        // fetch never gates the reveal.
        for (const name in injectedGroups) loadBundle(name);

        if (CONFIG.enableLogging) {
            const names = Object.keys(injectedGroups);
            const injected = names.reduce((n, name) => n + injectedGroups[name].length, 0);
            const total = criticalComponents.length + deferredComponents.length + injected;
            const detail = names.map((name) => `${name}:${injectedGroups[name].length}`);
            console.log(
                `[NDS] Initializing ${total}/${COMPONENTS.length} components ` +
                `(${criticalComponents.length} critical, ${deferredComponents.length} deferred` +
                `${detail.length ? ', ' + detail.join(', ') : ''})`
            );
        }

        initCriticalBatch();
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
        // Per-batch budget: critical components init in a tight loop until this
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

    // On-demand bundle loader for content injected after page load:
    //   await NDS.loadBundle('extras'); NDS.Chart.init();
    // Cheaper than re-running NDS.Init.initialize() (no full re-sweep / re-tag).
    NDS.loadBundle = loadBundle;
    // Back-compat shim for consumers of the built bundle still calling the old
    // extras-specific API.
    NDS.loadExtras = () => loadBundle('extras');

    // Expose global API immediately
    NDS.Init = {
        initialize: initializeNDS,
        components: COMPONENTS,
        config: CONFIG,
    };

    // Initialize when ready (if enabled). main runs as a defer script, so when
    // this executes the DOM is already fully parsed (readyState 'interactive') —
    // we do NOT wait for DOMContentLoaded, because DCL also waits for every OTHER
    // defer script (showcase, accessibility, page custom_js) to download + execute,
    // which would let them gate the reveal. Kicking off via a macrotask starts the
    // reveal off main alone, off main's eval task. Only the rare sync-in-<head>
    // case (readyState 'loading', DOM not yet parsed) waits for DCL.
    if (CONFIG.autoInitialize) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeNDS);
        } else {
            setTimeout(initializeNDS, 0);
        }
    }
})();
