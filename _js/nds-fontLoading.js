// Font Loading Detection
(() => {
    'use strict';

    let fontLoadingState = { isLoaded: false, isChecking: false, callbacks: [] };

    // Font loading detection function
    function waitForFontFile(fontName, callback, timeout = 20000) {
        // If font is already loaded, call callback immediately
        if (fontLoadingState.isLoaded) {
            callback(true);
            return;
        }

        // Add callback to queue
        fontLoadingState.callbacks.push(callback);

        // If already checking, don't start another check
        if (fontLoadingState.isChecking) return;

        fontLoadingState.isChecking = true;
        const startTime = Date.now();

        function markAsLoaded() {
            fontLoadingState.isLoaded = true;
            fontLoadingState.isChecking = false;

            // Add class to body only after font file is confirmed loaded
            document.body.classList.add('hgi-loaded');

            // Execute all queued callbacks
            fontLoadingState.callbacks.forEach(cb => cb(true));
            fontLoadingState.callbacks = [];
        }

        function check() {
            // Check if CSS file with @font-face is loaded
            const cssLoaded = Array.from(document.styleSheets).some(sheet => {
                try {
                    return sheet.href && sheet.href.toLowerCase().includes('hgi');
                } catch (e) {
                    return false;
                }
            });

            // Check Performance API for actual font file loading
            const resources = performance.getEntriesByType('resource');
            const fontFileInPerformance = resources.some(resource => {
                const url = resource.name.toLowerCase();
                return url.includes(fontName.toLowerCase()) &&
                       (url.includes('.woff2') || url.includes('.woff') || url.includes('.ttf') || url.includes('.otf')) &&
                       resource.responseEnd > 0;
            });

            // Font is considered loaded if CSS is loaded (even if font file not in Performance API due to cache)
            if (cssLoaded || fontFileInPerformance) {
                // Wait for document.fonts.ready to ensure font is actually rendered
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
            if (Date.now() - startTime > timeout) {
                fontLoadingState.isChecking = false;

                // Execute all queued callbacks with false
                fontLoadingState.callbacks.forEach(cb => cb(false));
                fontLoadingState.callbacks = [];
                return;
            }

            // Check again in 500ms for slow connections
            setTimeout(check, 500);
        }

        check();
    }

    function initializeFontLoading() {
        waitForFontFile('hgi-stroke-rounded', (loaded) => {
            // Font loading completed - no logging needed
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.waitForFontFile = waitForFontFile;
        
        // Create global font loading API
        window.NDSFontLoading = {
            waitForFontFile,
            getFontLoadingState: () => fontLoadingState,
            init: initializeFontLoading
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { waitForFontFile, getFontLoadingState: () => fontLoadingState };
    }

})();