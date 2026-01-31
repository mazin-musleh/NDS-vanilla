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

        // Trigger font loading with high priority if API available
        if (document.fonts && document.fonts.load) {
            // Load multiple weights to ensure download starts
            const fontSpecs = [
                '1em "' + fontName + '"',
                'bold 1em "' + fontName + '"',
                '16px "' + fontName + '"'
            ];

            fontSpecs.forEach(spec => {
                document.fonts.load(spec).catch(() => {
                    // Ignore errors
                });
            });
        }

        // Wait for actual font file to load using polling
        waitForActualFontFile(fontName, markAsLoaded, timeout);
    }

    // Wait for actual font file to be downloaded
    function waitForActualFontFile(fontName, markAsLoaded, timeout) {
        const startTime = Date.now();
        let checkCount = 0;

        function check() {
            checkCount++;
            const elapsed = Date.now() - startTime;

            // Check 1: CSS file with @font-face is loaded
            const cssLoaded = Array.from(document.styleSheets).some(sheet => {
                try {
                    return sheet.href && sheet.href.toLowerCase().includes('hgi');
                } catch (e) {
                    return false;
                }
            });

            // Check 2: Actual font file in Performance API (works on first load)
            const resources = performance.getEntriesByType('resource');
            const fontFileLoaded = resources.some(resource => {
                const url = resource.name.toLowerCase();
                return url.includes(fontName.toLowerCase()) &&
                       (url.includes('.woff2') || url.includes('.woff') || url.includes('.ttf') || url.includes('.otf')) &&
                       resource.responseEnd > 0;
            });

            // Check 3: Font Loading API verification (works for cached fonts)
            const fontApiReady = document.fonts && document.fonts.check &&
                                document.fonts.check('1em "' + fontName + '"');

            // Font is loaded if: (CSS loaded AND font file loaded) OR (CSS loaded AND font API confirms on cached)
            if (cssLoaded && (fontFileLoaded || fontApiReady)) {
                // Double-check with fonts.ready if available
                if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(() => {
                        markAsLoaded();
                    }).catch(() => {
                        markAsLoaded(); // Still mark as loaded even if error
                    });
                } else {
                    markAsLoaded();
                }
                return;
            }

            // Check if timeout exceeded
            if (elapsed > timeout) {
                const state = fontStates.get(fontName);
                if (state) {
                    state.isChecking = false;
                    state.callbacks.forEach(cb => cb(false));
                    state.callbacks = [];
                }
                return;
            }

            // Adaptive polling: faster initially, slower over time for slow connections
            let nextCheckDelay;
            if (elapsed < 1000) {
                nextCheckDelay = 50; // Check every 50ms for first second (fast connections)
            } else if (elapsed < 3000) {
                nextCheckDelay = 100; // Check every 100ms for next 2 seconds
            } else if (elapsed < 8000) {
                nextCheckDelay = 250; // Check every 250ms for next 5 seconds
            } else {
                nextCheckDelay = 500; // Check every 500ms for remaining time (slow connections)
            }

            setTimeout(check, nextCheckDelay);
        }

        check();
    }

    function initializeFontLoading() {
        // Load multiple icon fonts
        const fontsToLoad = ['hgi-stroke-rounded', 'hgi-solid-rounded'];

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
        window.NDSFontLoading = {
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