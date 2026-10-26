/* NDS.Ipv — public surface
 * Rides: nds-backdrop (dims the page behind the overlay)
 * Methods:
 *   NDS.Ipv.init() / .reinit()   wire the thumbnails (the overlay builds on first open);
 *                                a repeat call gives later thumbnails tabindex + role
 *   NDS.Ipv.open(thumb)          open the viewer on a thumbnail element
 *   NDS.Ipv.close()
 *   NDS.Ipv.next() / .prev()     move to the next or previous image in the gallery
 *   NDS.Ipv.resetZoom()          reset the zoom and the position
 *   NDS.Ipv.toggleControls()     what the eye button does
 *   NDS.Ipv.destroy()            detach every listener and remove the overlay; init() builds anew
 * Events:
 *   (none)
 * Hooks:
 *   .nds-ipv-thumbnail   class on any image that should open in the viewer
 *   data-ipv-full        the full-size URL for that thumbnail (falls back to data-src,
 *                        then the img's own src)
 *   data-ipv-gallery     a gallery name: the arrows page through the thumbnails with the
 *                        same name; thumbnails without one form one gallery together
 * Gotchas:
 *   - One viewer serves the whole page, like Backdrop: it is private, and the namespace
 *     methods drive it.
 *   - The overlay (#nds-ipv-popup-overlay) is built by the component on the FIRST open —
 *     a page where no thumbnail is clicked carries zero overlay DOM and none of the
 *     document-level listeners.
 */
/**
 * NDS Image Popup Viewer (IPV)
 * View images in a popup overlay with zoom, pan, and pinch-to-zoom.
 */

(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them. The overlay markup carries
    // the same words as data-i18n markers.
    NDS.i18n.getStrings('ipv', {
        viewerLabel: 'Image viewer',
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
        resetZoom: 'Reset zoom',
        toggleUI: 'Toggle controls',
        close: 'Close',
        prevImage: 'Previous image',
        nextImage: 'Next image',
        instructionsTitle: 'Controls:',
        instructionsScroll: '• Scroll to zoom',
        instructionsDrag: '• Drag to pan',
        instructionsReset: '• Double-click to reset',
        instructionsNav: '• Arrow keys to navigate',
        instructionsToggle: '• H key to toggle UI',
        instructionsClose: '• ESC to close',
    });

    // Zoom limits and step factors — shared by buttons, keys, wheel, and pinch.
    const zoomLimits = { min: 0.1, max: 10, step: 1.5, wheelIn: 1.1, wheelOut: 0.9 };

    // The page's one viewer, built by init().
    let viewer = null;

    class NdsIpv {
        constructor() {
            this._state = {
                zoom: 1,
                isDragging: false,
                startX: 0,
                startY: 0,
                translateX: 0,
                translateY: 0,
                isUIHidden: false,
                touchDistance: 0,
                touchStartX: 0,
                touchStartY: 0,
                touchCenterX: 0,
                touchCenterY: 0,
                currentIndex: 0,
                thumbnails: []
            };

            // Overlay elements are cached by _ensureOverlay() on the first open —
            // until then the page carries no overlay DOM at all.
            this._elements = {};

            // The live full-size <img>, cached so the transform hot path never
            // re-queries the DOM. Set in _loadImage(), cleared in _removeImage().
            this._image = null;

            // The container size is stable while the overlay is open; cache its rect
            // so wheel/pinch never call getBoundingClientRect per event. Invalidated
            // on open() and on resize.
            this._containerRect = null;

            // Element focused before opening, restored on close().
            this._lastFocused = null;

            // Tab focus trap. It lives for one open, on openAbortController.
            this._trapFocus = NDS.trapFocus(() => this._elements.overlay);

            // One controller for every instance-lifetime listener; destroy() detaches all.
            this.abortController = new AbortController();

            // Drop the cached rect whenever the viewport changes size.
            this._offResize = NDS.onResize(() => { this._containerRect = null; });

            this.init();
        }

        init() {
            this._addThumbnailListeners();
        }

        // Build + wire the overlay on the first open. Deferring the control and
        // document-level listeners with it means a no-click session pays for
        // neither the ~50 overlay nodes nor a mousemove handler.
        _ensureOverlay() {
            if (this._elements.overlay) return;
            buildOverlayMarkup();

            this._elements = {
                overlay: document.getElementById('nds-ipv-popup-overlay'),
                container: document.querySelector('.nds-ipv-popup-container'),
                zoomInfo: document.getElementById('nds-ipv-zoom-info'),
                controls: document.querySelector('.nds-ipv-popup-controls'),
                navControls: document.querySelector('.nds-ipv-navigation-controls'),
                imageCounter: document.getElementById('nds-ipv-image-counter'),
                closeBtn: document.querySelector('.nds-ipv-close-btn'),
                prevBtn: document.querySelector('.nds-ipv-prev-btn'),
                nextBtn: document.querySelector('.nds-ipv-next-btn')
            };

            this._addControlListeners();
            this._addGlobalListeners();
        }

        // ── Utilities ────────────────────────────────────────────────────
        _clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }

        _getContainerRect() {
            if (!this._containerRect && this._elements.container) {
                this._containerRect = this._elements.container.getBoundingClientRect();
            }
            return this._containerRect;
        }

        _showSpinner() {
            if (this._elements.container) {
                this._elements.container.classList.add('nds-loading', 'nds-lg', 'nds-oncolor');
            }
        }

        _hideSpinner() {
            if (this._elements.container) {
                this._elements.container.classList.remove('nds-loading', 'nds-lg', 'nds-oncolor');
            }
        }

        _removeImage() {
            if (this._image) {
                this._image.remove();
                this._image = null;
            }
        }

        // ── Transform ────────────────────────────────────────────────────
        _syncTransform() {
            if (this._image) {
                this._image.style.transform =
                    `translate(${this._state.translateX}px, ${this._state.translateY}px) scale(${this._state.zoom})`;
            }
            if (this._elements.zoomInfo) {
                this._elements.zoomInfo.textContent = `${Math.round(this._state.zoom * 100)}%`;
            }
        }

        _resetTransform() {
            this._state.zoom = 1;
            this._state.translateX = 0;
            this._state.translateY = 0;
            this._syncTransform();
        }

        // ── Zoom ─────────────────────────────────────────────────────────
        _setZoom(zoom) {
            this._state.zoom = this._clamp(zoom, zoomLimits.min, zoomLimits.max);
        }

        _zoomBy(factor) {
            this._setZoom(this._state.zoom * factor);
            this._syncTransform();
        }

        // Zoom toward a point (centerX/centerY are relative to the container's
        // top-left). Shared by wheel and pinch so the math lives in one place.
        _zoomAt(centerX, centerY, newZoom) {
            const rect = this._getContainerRect();
            if (!rect || newZoom === this._state.zoom) return;

            const { zoom, translateX, translateY } = this._state;
            const pointX = (centerX - translateX - rect.width / 2) / zoom;
            const pointY = (centerY - translateY - rect.height / 2) / zoom;

            this._state.zoom = newZoom;
            this._state.translateX = centerX - rect.width / 2 - pointX * newZoom;
            this._state.translateY = centerY - rect.height / 2 - pointY * newZoom;
            this._syncTransform();
        }

        // ── UI chrome ────────────────────────────────────────────────────
        _setUiHidden(hidden) {
            this._state.isUIHidden = hidden;
            this._elements.overlay.classList.toggle('nds-ipv-ui-hidden', hidden);
            // Focus on a control the hidden UI took away goes to the button that brings it back.
            const focused = document.activeElement;
            if (hidden && this._elements.overlay.contains(focused) && !focused.getClientRects().length) {
                this._elements.overlay.querySelector('.nds-ipv-ui-toggle-btn')?.focus();
            }
        }

        _toggleUi() {
            this._setUiHidden(!this._state.isUIHidden);
        }

        // ── Navigation ───────────────────────────────────────────────────
        _showPrev() {
            if (this._state.currentIndex > 0) {
                this._state.currentIndex--;
                this.open(this._state.thumbnails[this._state.currentIndex], true);
            }
        }

        _showNext() {
            if (this._state.currentIndex < this._state.thumbnails.length - 1) {
                this._state.currentIndex++;
                this.open(this._state.thumbnails[this._state.currentIndex], true);
            }
        }

        _syncNavButtons() {
            const { currentIndex, thumbnails } = this._state;
            const total = thumbnails.length;
            const focused = document.activeElement;

            if (this._elements.prevBtn) this._elements.prevBtn.disabled = currentIndex === 0;
            if (this._elements.nextBtn) this._elements.nextBtn.disabled = currentIndex === total - 1;
            // A disabled button drops focus: the other one, or Close, takes it.
            if (focused?.disabled && (focused === this._elements.prevBtn || focused === this._elements.nextBtn)) {
                const other = focused === this._elements.prevBtn ? this._elements.nextBtn : this._elements.prevBtn;
                (other && !other.disabled ? other : this._elements.closeBtn)?.focus();
            }

            // Hide nav + counter when there's only one image.
            if (this._elements.navControls) this._elements.navControls.hidden = total <= 1;
            if (this._elements.imageCounter) {
                this._elements.imageCounter.textContent = `${currentIndex + 1} / ${total}`;
                this._elements.imageCounter.hidden = total <= 1;
            }
        }

        // ── Image loading ────────────────────────────────────────────────
        _loadImage(src, alt) {
            this._removeImage();
            this._showSpinner();

            const img = document.createElement('img');
            img.id = 'nds-ipv-popup-image';
            img.className = 'nds-ipv-popup-image';
            img.alt = alt || '';
            img.src = src;
            // A replaced image still loads: only the shown one ends the spinner.
            img.onload = img.onerror = () => { if (this._image === img) this._hideSpinner(); };

            if (this._elements.container && this._elements.controls) {
                this._elements.container.insertBefore(img, this._elements.controls);
                this._image = img;
                this._addImageListeners(img);
            }
        }

        // ── Event handlers ───────────────────────────────────────────────
        // Image listeners are plain (no shared signal): the <img> is replaced on
        // every open, and tying them to the instance signal would pin every
        // previously-viewed image in memory until destroy(). Element removal frees
        // them instead.
        _addImageListeners(img) {
            img.addEventListener('mousedown', (e) => this._handleMouseDown(e));
            img.addEventListener('touchstart', (e) => this._handleTouchStart(e), { passive: false });
            img.addEventListener('touchmove', (e) => this._handleTouchMove(e), { passive: false });
            img.addEventListener('touchend', () => this._handleTouchEnd());
            img.addEventListener('dblclick', () => this._resetTransform());
        }

        _handleMouseDown(e) {
            e.preventDefault();
            this._state.isDragging = true;
            this._state.startX = e.clientX - this._state.translateX;
            this._state.startY = e.clientY - this._state.translateY;
        }

        _handleMouseMove(e) {
            if (!this._state.isDragging) return;
            e.preventDefault();
            this._state.translateX = e.clientX - this._state.startX;
            this._state.translateY = e.clientY - this._state.startY;
            this._syncTransform();
        }

        _handleMouseUp() {
            this._state.isDragging = false;
        }

        _handleWheel(e) {
            e.preventDefault();
            const rect = this._getContainerRect();
            if (!this._image || !rect) return;

            const newZoom = this._clamp(
                this._state.zoom * (e.deltaY > 0 ? zoomLimits.wheelOut : zoomLimits.wheelIn),
                zoomLimits.min, zoomLimits.max
            );
            this._zoomAt(e.clientX - rect.left, e.clientY - rect.top, newZoom);
        }

        _handleTouchStart(e) {
            if (e.touches.length === 1) {
                this._state.touchStartX = e.touches[0].clientX - this._state.translateX;
                this._state.touchStartY = e.touches[0].clientY - this._state.translateY;
                this._state.isDragging = true;
            } else if (e.touches.length === 2) {
                const [t1, t2] = e.touches;
                this._state.touchDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

                const rect = this._getContainerRect();
                if (rect) {
                    this._state.touchCenterX = (t1.clientX + t2.clientX) / 2 - rect.left;
                    this._state.touchCenterY = (t1.clientY + t2.clientY) / 2 - rect.top;
                }
                this._state.isDragging = false;
            }
        }

        _handleTouchMove(e) {
            e.preventDefault();
            if (e.touches.length === 1 && this._state.isDragging) {
                this._state.translateX = e.touches[0].clientX - this._state.touchStartX;
                this._state.translateY = e.touches[0].clientY - this._state.touchStartY;
                this._syncTransform();
            } else if (e.touches.length === 2 && this._state.touchDistance > 0) {
                const [t1, t2] = e.touches;
                const newDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
                const newZoom = this._clamp(
                    this._state.zoom * (newDistance / this._state.touchDistance),
                    zoomLimits.min, zoomLimits.max
                );
                this._zoomAt(this._state.touchCenterX, this._state.touchCenterY, newZoom);
                this._state.touchDistance = newDistance;
            }
        }

        _handleTouchEnd() {
            this._state.isDragging = false;
            this._state.touchDistance = 0;
            this._state.touchCenterX = 0;
            this._state.touchCenterY = 0;
        }

        _handleKeyDown(e) {
            if (!this._elements.overlay || !this._elements.overlay.classList.contains('nds-ipv-active')) return;

            const actions = {
                'Escape': () => this.close(),
                '+': () => this._zoomBy(zoomLimits.step),
                '=': () => this._zoomBy(zoomLimits.step),
                '-': () => this._zoomBy(1 / zoomLimits.step),
                '0': () => this._resetTransform(),
                'h': () => this._toggleUi(),
                'H': () => this._toggleUi(),
                // Arrows follow the screen: prev sits at inline-start, which is right in RTL.
                'ArrowLeft': () => (NDS.isRtl ? this._showNext() : this._showPrev()),
                'ArrowRight': () => (NDS.isRtl ? this._showPrev() : this._showNext())
            };

            const action = actions[e.key];
            if (action) {
                e.preventDefault();
                action();
            }
        }

        // ── Open / close ─────────────────────────────────────────────────
        open(thumb, skipIndexUpdate = false) {
            this._ensureOverlay();

            // Prefer the lazy-load / full-resolution source, fall back to the src.
            const src = thumb.dataset.ipvFull || thumb.dataset.src || thumb.src;

            if (this._elements.overlay) {
                this._elements.overlay.classList.add('nds-ipv-active');
            }

            // First open (not gallery prev/next): start a fresh modal session.
            if (!skipIndexUpdate) {
                this._state.thumbnails = this._collectThumbnails(thumb);
                this._state.currentIndex = this._state.thumbnails.indexOf(thumb);
                this._containerRect = null; // recompute against the now-visible overlay

                NDS.Backdrop.show({ zIndex: 999, clickToClose: false, escapeClose: false });

                // Move focus into the dialog, trap Tab, and remember where to return.
                this._lastFocused = document.activeElement;
                this.openAbortController?.abort();
                this.openAbortController = new AbortController();
                document.addEventListener('keydown', this._trapFocus, { signal: this.openAbortController.signal });
                if (this._elements.closeBtn) this._elements.closeBtn.focus();
            }

            this._setUiHidden(false);
            this._resetTransform();
            this._loadImage(src, thumb.getAttribute('alt'));
            this._syncNavButtons();
        }

        close() {
            if (this._elements.overlay) {
                this._elements.overlay.classList.remove('nds-ipv-active');
                NDS.Backdrop.hide();
            }

            // Release the trap and return focus to the triggering thumbnail.
            this.openAbortController?.abort();
            if (this._lastFocused && typeof this._lastFocused.focus === 'function') {
                this._lastFocused.focus();
            }
            this._lastFocused = null;

            this._removeImage();
            this._hideSpinner();
            // Reset the transform after the fade-out so the next open starts clean.
            setTimeout(() => this._resetTransform(), NDS.transitionSpeed());
        }

        // ── Event attachment ─────────────────────────────────────────────
        // Thumbnails on the page now, minus any inside code examples; with a thumb,
        // only its gallery. Read at open, so a thumbnail added after init joins
        // the gallery with no reinit.
        _collectThumbnails(thumb) {
            const all = Array.from(document.querySelectorAll('.nds-ipv-thumbnail'))
                .filter(thumbnail => !thumbnail.closest('code'));
            return thumb ? all.filter(thumbnail => thumbnail.dataset.ipvGallery === thumb.dataset.ipvGallery) : all;
        }

        // Make each thumbnail keyboard-operable without changing authored markup.
        // Deferred: thumbnails already paint correctly without JS (this is an
        // a11y-only enhancement), so a gallery page with many images doesn't
        // pay this as one blocking task.
        _enhanceThumbnails() {
            NDS.onIdle(() => {
                this._collectThumbnails().forEach(thumb => {
                    if (!thumb.hasAttribute('tabindex')) thumb.tabIndex = 0;
                    if (!thumb.hasAttribute('role')) thumb.setAttribute('role', 'button');
                });
            });
        }

        _addThumbnailListeners() {
            this._enhanceThumbnails();

            const { signal } = this.abortController;
            const isKnownThumb = (el) => el && !el.closest('code');

            // One delegated handler each for click and Enter/Space (O(1) wiring).
            document.addEventListener('click', (e) => {
                const thumb = e.target.closest('.nds-ipv-thumbnail');
                if (isKnownThumb(thumb)) this.open(thumb);
            }, { signal });

            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
                const thumb = e.target.closest('.nds-ipv-thumbnail');
                if (isKnownThumb(thumb)) {
                    e.preventDefault();
                    this.open(thumb);
                }
            }, { signal });
        }

        _addControlListeners() {
            const actions = {
                '.nds-ipv-zoom-in-btn': () => this._zoomBy(zoomLimits.step),
                '.nds-ipv-zoom-out-btn': () => this._zoomBy(1 / zoomLimits.step),
                '.nds-ipv-reset-zoom-btn': () => this._resetTransform(),
                '.nds-ipv-ui-toggle-btn': () => this._toggleUi(),
                '.nds-ipv-close-btn': () => this.close(),
                '.nds-ipv-prev-btn': () => this._showPrev(),
                '.nds-ipv-next-btn': () => this._showNext()
            };

            const { signal } = this.abortController;
            Object.entries(actions).forEach(([selector, fn]) => {
                const btn = this._elements.overlay.querySelector(selector);
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        fn();
                    }, { signal });
                }
            });
        }

        _addGlobalListeners() {
            const { signal } = this.abortController;
            if (this._elements.overlay) {
                this._elements.overlay.addEventListener('wheel', (e) => this._handleWheel(e), { passive: false, signal });
            }
            document.addEventListener('mousemove', (e) => this._handleMouseMove(e), { signal });
            document.addEventListener('mouseup', () => this._handleMouseUp(), { signal });
            document.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
        }

        destroy() {
            if (this._elements.overlay && this._elements.overlay.classList.contains('nds-ipv-active')) this.close();
            this.abortController.abort();
            this._offResize();
            this.openAbortController?.abort();
            if (this._elements.overlay) this._elements.overlay.remove();
            this._elements = {};
            // Free the slot so init() can build a fresh viewer.
            if (viewer === this) viewer = null;
        }
    }

    // Inject the overlay markup once. Its English sits beside data-i18n markers, which core
    // translates when the overlay joins the page.
    function buildOverlayMarkup() {
        if (document.getElementById('nds-ipv-popup-overlay')) return;

        const overlayHtml = `
            <div class="nds-ipv-popup-overlay" id="nds-ipv-popup-overlay" data-theme="dark" role="dialog" aria-modal="true" aria-label="Image viewer" data-i18n-aria-label="ipv.viewerLabel">
                <div class="nds-ipv-popup-container">
                    <div class="nds-ipv-popup-controls">
                        <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-ipv-control-btn nds-ipv-zoom-in-btn" title="Zoom in" aria-label="Zoom in" data-i18n-aria-label="ipv.zoomIn" data-i18n-title="ipv.zoomIn">
                            <i class="nds-icon nds-hgi-zoom-in-area" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-ipv-control-btn nds-ipv-zoom-out-btn" title="Zoom out" aria-label="Zoom out" data-i18n-aria-label="ipv.zoomOut" data-i18n-title="ipv.zoomOut">
                            <i class="nds-icon nds-hgi-zoom-out-area" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-ipv-control-btn nds-ipv-reset-zoom-btn" title="Reset zoom" aria-label="Reset zoom" data-i18n-aria-label="ipv.resetZoom" data-i18n-title="ipv.resetZoom">
                            <i class="nds-icon nds-hgi-square-arrow-shrink-01" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-ipv-control-btn nds-ipv-ui-toggle-btn" title="Toggle controls" aria-label="Toggle controls" data-i18n-aria-label="ipv.toggleUI" data-i18n-title="ipv.toggleUI">
                            <i class="nds-icon nds-hgi-eye" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-ipv-control-btn nds-ipv-close-btn" title="Close" aria-label="Close" data-i18n-aria-label="ipv.close" data-i18n-title="ipv.close">
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="nds-ipv-navigation-controls">
                        <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-ipv-control-btn nds-ipv-prev-btn" title="Previous image" aria-label="Previous image" data-i18n-aria-label="ipv.prevImage" data-i18n-title="ipv.prevImage">
                            <i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-ipv-control-btn nds-ipv-next-btn" title="Next image" aria-label="Next image" data-i18n-aria-label="ipv.nextImage" data-i18n-title="ipv.nextImage">
                            <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="nds-ipv-image-counter" id="nds-ipv-image-counter">1 / 1</div>

                    <div class="nds-ipv-instructions" data-hidden="sm">
                        <strong data-i18n="ipv.instructionsTitle">Controls:</strong><br>
                        <span data-i18n="ipv.instructionsScroll">• Scroll to zoom</span><br>
                        <span data-i18n="ipv.instructionsDrag">• Drag to pan</span><br>
                        <span data-i18n="ipv.instructionsReset">• Double-click to reset</span><br>
                        <span data-i18n="ipv.instructionsNav">• Arrow keys to navigate</span><br>
                        <span data-i18n="ipv.instructionsToggle">• H key to toggle UI</span><br>
                        <span data-i18n="ipv.instructionsClose">• ESC to close</span>
                    </div>

                    <div class="nds-ipv-zoom-info" id="nds-ipv-zoom-info">100%</div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', overlayHtml);
    }

    // Initialization (called by nds-loader.js). The overlay builds lazily in
    // the instance's first open, so the singleton guard is the instance itself.
    // A repeat call gives thumbnails added since then keyboard access.
    function setupIpv() {
        if (viewer) viewer._enhanceThumbnails();
        else viewer = new NdsIpv();
    }

    NDS.Ipv = {
        init: setupIpv,
        reinit: setupIpv,
        open: (thumb) => { if (!viewer) setupIpv(); viewer.open(thumb); },
        close: () => viewer?.close(),
        next: () => viewer?._showNext(),
        prev: () => viewer?._showPrev(),
        resetZoom: () => viewer?._resetTransform(),
        toggleControls: () => viewer?._toggleUi(),
        destroy: () => viewer?.destroy(),
    };
})();
