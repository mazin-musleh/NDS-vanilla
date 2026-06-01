// Font Loading Detection
(() => {
    'use strict';

    // Track loaded fonts with their callbacks
    const loadedFonts = new Set();
    const fontStates = new Map(); // Map of fontName -> { isChecking: boolean, callbacks: [] }

    // Helper: Get current loaded fonts from data attribute
    function getLoadedFonts() {
        const attr = document.body.getAttribute('data-font-loaded');
        return attr ? attr.split(' ').filter(f => f) : [];
    }

    // Helper: Add font to data attribute
    function addFontToAttribute(fontName) {
        const currentFonts = getLoadedFonts();
        if (!currentFonts.includes(fontName)) {
            currentFonts.push(fontName);
            document.body.setAttribute('data-font-loaded', currentFonts.join(' '));
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

            // Add font to data-font-loaded attribute
            addFontToAttribute(fontName);

            currentState.isChecking = false;

            // Execute all queued callbacks
            currentState.callbacks.forEach(cb => cb(true));
            currentState.callbacks = [];
        }

        // Notify callers a check ended without a confirmed load, WITHOUT flipping
        // the gate. data-font-loaded gates icon reveal: an unloaded HGI font
        // falls back to CJK glyphs, so on error/timeout the safe state is hidden,
        // never "reveal anyway".
        function fail() {
            const currentState = fontStates.get(fontName);
            if (!currentState) return;
            currentState.isChecking = false;
            currentState.callbacks.forEach(cb => cb(false));
            currentState.callbacks = [];
        }

        // Resolve via the Font Loading API — event-driven, no polling.
        if (document.fonts && document.fonts.load && document.fonts.ready) {
            const spec = '1em "' + fontName + '"';
            let settled = false;

            // Stamp ONLY when a real @font-face for this family has actually loaded.
            // We can't gate on document.fonts.check(): when no face matches yet — e.g.
            // the icon stylesheet is deferred and hasn't applied — check() returns true
            // *vacuously* ("nothing to load"), which would flip the reveal gate before
            // the font exists and flash CJK-fallback glyphs. Scanning for a loaded face
            // is the unambiguous signal.
            const hasLoadedFace = () => {
                let ok = false;
                document.fonts.forEach((f) => { if (f.family === fontName && f.status === 'loaded') ok = true; });
                return ok;
            };
            const onDone = () => {
                if (settled || !hasLoadedFace()) return;
                settled = true;
                clearTimeout(timer);
                document.fonts.removeEventListener('loadingdone', onDone);
                markAsLoaded();
            };
            const timer = setTimeout(() => {
                if (settled) return;
                settled = true;
                document.fonts.removeEventListener('loadingdone', onDone);
                fail();
            }, timeout);

            // The icons' own usage starts the download once the (possibly deferred)
            // face applies; `loadingdone` fires when it completes. load() kicks the
            // already-present case; the immediate onDone() catches an already-loaded
            // font (whose loadingdone may have fired before we subscribed).
            document.fonts.addEventListener('loadingdone', onDone);
            document.fonts.load(spec).catch(() => {});
            document.fonts.load('bold ' + spec).catch(() => {});
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

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.waitForFontFile = waitForFontFile;

        // Listen for pageshow to handle bfcache restoration (live server navigation)
        window.addEventListener('pageshow', handlePageShow);

        // Create global font loading API
        NDS.FontLoading = {
            waitForFontFile,
            getFontLoadingState: () => ({
                loadedFonts: Array.from(loadedFonts),
                fontStates: Object.fromEntries(fontStates),
                dataAttribute: document.body.getAttribute('data-font-loaded')
            }),
            init: initializeFontLoading,
            getLoadedFonts,
            isFontLoaded
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            waitForFontFile,
            getFontLoadingState: () => ({
                loadedFonts: Array.from(loadedFonts),
                fontStates: Object.fromEntries(fontStates)
            }),
            getLoadedFonts,
            isFontLoaded
        };
    }

})();
