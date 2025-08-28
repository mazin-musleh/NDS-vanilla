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

        function check() {
            // Check Performance API for actual font file loading
            const resources = performance.getEntriesByType('resource');
            const fontLoaded = resources.some(resource => {
                const url = resource.name.toLowerCase();
                return url.includes(fontName.toLowerCase()) && 
                       (url.includes('.woff2') || url.includes('.woff') || url.includes('.ttf') || url.includes('.otf')) &&
                       resource.responseEnd > 0;
            });

            if (fontLoaded) {
                fontLoadingState.isLoaded = true;
                fontLoadingState.isChecking = false;

                // Add class to body only after font file is confirmed loaded
                document.body.classList.add('hgi-loaded');

                // Execute all queued callbacks
                fontLoadingState.callbacks.forEach(cb => cb(true));
                fontLoadingState.callbacks = [];
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

    // Global exposure
    if (typeof window !== 'undefined') {
        window.waitForFontFile = waitForFontFile;
        
        // Create global font loading API
        window.NDSFontLoading = {
            waitForFontFile,
            getFontLoadingState: () => fontLoadingState
        };
    }

    // Auto-initialize font loading for HGI Stroke Rounded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            waitForFontFile('hgi-stroke-rounded', (loaded) => {
                // Font loading completed - no logging needed
            });
        });
    } else {
        setTimeout(() => {
            waitForFontFile('hgi-stroke-rounded', (loaded) => {
                // Font loading completed - no logging needed
            });
        }, 50);
    }

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { waitForFontFile, getFontLoadingState: () => fontLoadingState };
    }

})();