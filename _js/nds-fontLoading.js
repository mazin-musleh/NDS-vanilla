// Font Loading Detection
(() => {
    'use strict';

    // Track loaded fonts with their callbacks
    const loadedFonts = new Set();
    const fontStates = new Map(); // Map of fontName -> { isChecking: boolean, callbacks: [] }

    // Helper: Get current loaded fonts from data attribute
    function getLoadedFonts() {
        const attr = document.documentElement.getAttribute('data-nds-fonts-loaded');
        return attr ? attr.split(' ').filter(f => f) : [];
    }

    // Helper: Add font to data attribute
    function addFontToAttribute(fontName) {
        const currentFonts = getLoadedFonts();
        if (!currentFonts.includes(fontName)) {
            currentFonts.push(fontName);
            document.documentElement.setAttribute('data-nds-fonts-loaded', currentFonts.join(' '));
            loadedFonts.add(fontName);
        }
    }

    // Helper: Check if font is already marked as loaded
    function isFontLoaded(fontName) {
        return loadedFonts.has(fontName) || getLoadedFonts().includes(fontName);
    }

    // Font loading detection function
    function waitForFontFile(fontName, callback, timeout = 15000) {
        // If font is already loaded, call callback immediately
        if (isFontLoaded(fontName)) {
            callback(true);
            return;
        }

        // Initialize state for this font if not exists
        if (!fontStates.has(fontName)) {
            fontStates.set(fontName, { isChecking: false, callbacks: [] });
        }

        const state = fontStates.get(fontName);

        // Add callback to queue
        state.callbacks.push(callback);

        // If already checking, don't start another check
        if (state.isChecking) return;

        state.isChecking = true;

        function markAsLoaded() {
            const currentState = fontStates.get(fontName);
            if (!currentState || isFontLoaded(fontName)) return; // Prevent double-marking

            // Add font to data-nds-fonts-loaded attribute
            addFontToAttribute(fontName);

            currentState.isChecking = false;

            // Execute all queued callbacks
            currentState.callbacks.forEach(cb => cb(true));
            currentState.callbacks = [];
        }

        // Notify callers a check ended without a confirmed load, WITHOUT flipping
        // the gate. data-nds-fonts-loaded gates icon reveal: an unloaded HGI font
        // falls back to CJK glyphs, so on error/timeout the safe state is hidden,
        // never "reveal anyway".
        function fail() {
            const currentState = fontStates.get(fontName);
            if (!currentState) return;
            currentState.isChecking = false;
            currentState.callbacks.forEach(cb => cb(false));
            currentState.callbacks = [];
        }

        // Resolve via the Font Loading API — promise + event, no polling.
        if (document.fonts && document.fonts.load && 'ready' in document.fonts) {
            const spec = '1em "' + fontName + '"';
            let settled = false;

            // WebKit serializes a CSS-declared face's family WITH its quotes
            // ('"hgi-stroke-rounded"'), so a bare compare never matched on Safari and
            // the gate expired into fail() — icons blank on every iPhone.
            const family = (f) => f.family.replace(/^["']|["']$/g, '');

            // Stamp ONLY when a real @font-face for this family has actually loaded.
            // We can't gate on document.fonts.check(): when no face matches yet — e.g.
            // the icon stylesheet is deferred and hasn't applied — check() returns true
            // *vacuously* ("nothing to load"), which would flip the reveal gate before
            // the font exists and flash CJK-fallback glyphs. Scanning for a loaded face
            // is the unambiguous signal.
            const hasLoadedFace = () => {
                let ok = false;
                document.fonts.forEach((f) => { if (family(f) === fontName && f.status === 'loaded') ok = true; });
                return ok;
            };
            // A face for this family the browser is actively fetching. The budget
            // has to measure THIS, not wall-clock from init: the @font-face sheet
            // rides behind main CSS to stay out of the LCP window, so on a slow
            // link most of a fixed budget burns before the download can start, and
            // the timeout then kills the listener before the font can land.
            const hasPendingFace = () => {
                let pending = false;
                document.fonts.forEach((f) => { if (family(f) === fontName && f.status === 'loading') pending = true; });
                return pending;
            };
            // A registered face the browser never started fetching. Happens when
            // every glyph of this family starts hidden (e.g. inside an unselected
            // tab panel): the fetch only starts at first paint, so no load event
            // ever fires and the window below would expire into a permanent fail.
            const hasIdleFace = () => {
                let idle = false;
                document.fonts.forEach((f) => { if (family(f) === fontName && f.status === 'unloaded') idle = true; });
                return idle;
            };

            let timer;
            const teardown = () => {
                clearTimeout(timer);
                document.fonts.removeEventListener('loadingdone', onDone);
                document.fonts.removeEventListener('loading', onLoading);
            };
            const settle = () => {
                if (settled) return;
                settled = true;
                teardown();
                markAsLoaded();
            };
            const onDone = () => {
                if (hasLoadedFace()) settle();
            };
            // Primary signal: load() resolves with the faces it matched once they load
            // (an empty list while the deferred sheet hasn't applied — never stamp on
            // that). Safari has no dependable loadingdone, so the event is the backup.
            // Waits on each face's own promise in case an engine resolves early.
            const kick = () => {
                document.fonts.load(spec).then((faces) => {
                    if (!faces.length) return;
                    return Promise.all(faces.map((f) => f.loaded)).then(settle);
                }).catch(() => {});
                document.fonts.load('bold ' + spec).catch(() => {});
            };
            state.kick = kick;
            // Re-arm once our own face is genuinely in flight, so the budget covers
            // the download instead of the wait for the deferred sheet. Bounded by
            // the fetch itself: 'loaded' stamps, 'error' stops re-arming and the
            // last window expires into fail().
            const onLoading = () => {
                if (settled || !hasPendingFace()) return;
                arm();
            };
            function arm() {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    if (settled) return;
                    // Idle face at expiry: the deferred sheet applied but no
                    // glyph painted, so the init-time load() ran before the face
                    // existed and nothing since has started the fetch. Force it
                    // (load() fetches even for hidden glyphs) and wait one more
                    // window. Bounded: after the kick the face is loading/
                    // loaded/error — never 'unloaded' — so this fires at most
                    // once per face.
                    if (hasIdleFace()) {
                        kick();
                        arm();
                        return;
                    }
                    // Not settled: a download that finishes after the window still
                    // stamps through kick()'s promise — a confirmed load, not a
                    // reveal-anyway. Safari fires no `loading` event to re-arm on.
                    teardown();
                    fail();
                }, timeout);
            }

            // The icons' own usage starts the download once the (possibly deferred)
            // face applies; kick() settles on the promise, `loadingdone` on the event.
            // The immediate onDone() catches an already-loaded font (whose loadingdone
            // may have fired before we subscribed).
            document.fonts.addEventListener('loadingdone', onDone);
            document.fonts.addEventListener('loading', onLoading);
            arm();
            kick();
            onDone();
        } else {
            // No Font Loading API (pre-2016 browser): the CJK-fallback boundary
            // can't be detected, so reveal rather than hide icons indefinitely.
            markAsLoaded();
        }
    }

    function initializeFontLoading() {
        // Load multiple icon fonts
        const fontsToLoad = ['hgi-stroke-rounded'/* , 'hgi-solid-rounded' */];

        fontsToLoad.forEach(fontName => {
            waitForFontFile(fontName, () => {
                // Font loading completed - no logging needed
            });
        });
    }

    // Handle bfcache (back-forward cache) restoration
    function handlePageShow(event) {
        // Check if page was restored from bfcache (back/forward navigation)
        if (event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
            // Sync state with DOM data attribute
            const loadedFontsFromDOM = getLoadedFonts();

            // Sync loadedFonts Set with DOM
            loadedFontsFromDOM.forEach(font => {
                if (!loadedFonts.has(font)) {
                    loadedFonts.add(font);
                }
            });

            // Check if fonts in memory are missing from DOM
            loadedFonts.forEach(font => {
                if (!loadedFontsFromDOM.includes(font)) {
                    // Font was loaded but attribute is missing - re-add it
                    addFontToAttribute(font);
                }
            });

            // If no fonts loaded at all, restart font loading
            if (loadedFonts.size === 0 && loadedFontsFromDOM.length === 0) {
                // Clear all states and restart
                fontStates.clear();
                initializeFontLoading();
            }
        }
    }

    // Listen for pageshow to handle bfcache restoration (live server navigation)
    window.addEventListener('pageshow', handlePageShow);

    // Global font loading API (called by nds-loader.js unified system)
    // Start the fetch for every tracked family. The loader calls this when the icon
    // sheet applies: a face whose glyphs all start hidden (every HGI icon inside a
    // display:none screen) never fetches on its own, and would otherwise sit
    // unstamped until the idle-face window above expires.
    function load() {
        fontStates.forEach((state) => state.kick?.());
    }

    NDS.FontLoading = {
        waitForFontFile,
        init: initializeFontLoading,
        load,
        getLoadedFonts,
        isFontLoaded
    };

})();
