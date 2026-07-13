/**
 * NDS Image Popup Viewer (IPV)
 * View images in a popup overlay with zoom, pan, and pinch-to-zoom.
 */

(function () {
    'use strict';

    // Zoom limits and step factors — shared by buttons, keys, wheel, and pinch.
    const ZOOM = { min: 0.1, max: 10, step: 1.5, wheelIn: 1.1, wheelOut: 0.9 };

    class NDSImagePopupViewer {
        constructor() {
            this.state = {
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

            this.el = {
                overlay: document.getElementById('ndsIpvPopupOverlay'),
                container: document.querySelector('.nds-ipv-popup-container'),
                zoomInfo: document.getElementById('ndsIpvZoomInfo'),
                controls: document.querySelector('.nds-ipv-popup-controls'),
                instructions: document.querySelector('.nds-ipv-instructions'),
                navControls: document.querySelector('.nds-ipv-navigation-controls'),
                imageCounter: document.getElementById('ndsIpvImageCounter'),
                closeBtn: document.querySelector('.nds-ipv-close-btn'),
                prevBtn: document.querySelector('.nds-ipv-prev-btn'),
                nextBtn: document.querySelector('.nds-ipv-next-btn')
            };

            // UI chrome toggled together by setUIHidden().
            this.uiEls = [
                this.el.controls,
                this.el.instructions,
                this.el.zoomInfo,
                this.el.navControls,
                this.el.imageCounter
            ];

            // The live full-size <img>, cached so the transform hot path never
            // re-queries the DOM. Set in loadImage(), cleared in removeImage().
            this.image = null;

            // The container size is stable while the overlay is open; cache its rect
            // so wheel/pinch never call getBoundingClientRect per event. Invalidated
            // on open() and on resize.
            this._containerRect = null;

            // Element focused before opening, restored on close().
            this.lastFocused = null;

            // Tab focus trap — added on open, removed on close (mirrors nds-modal).
            this.trapFocus = NDS.trapFocus(() => this.el.overlay);

            // One controller for every instance-lifetime listener; destroy() detaches all.
            this.abortController = new AbortController();

            // Drop the cached rect whenever the viewport changes size.
            this._offResize = NDS.onResize(() => { this._containerRect = null; });

            this.init();
        }

        init() {
            if (!this.el.overlay) {
                console.warn('NDS Ipv: Popup overlay not found');
                return;
            }

            this.attachThumbnailEvents();
            this.attachControlEvents();
            this.attachGlobalEvents();

            // Localize the injected overlay. English defaults are baked into the
            // markup, so this is fire-and-forget (no flash before the fetch resolves).
            // The dialog's own aria-label can't be reached by apply()'s descendant
            // walk, so set it from the returned data.
            NDS.i18n.load('ipv', this.el.overlay).then((data) => {
                if (data && data.viewerLabel) {
                    this.el.overlay.setAttribute('aria-label', data.viewerLabel);
                }
            });
        }

        // ── Utilities ────────────────────────────────────────────────────
        clamp(val, min, max) {
            return Math.min(Math.max(val, min), max);
        }

        getContainerRect() {
            if (!this._containerRect && this.el.container) {
                this._containerRect = this.el.container.getBoundingClientRect();
            }
            return this._containerRect;
        }

        showSpinner() {
            if (this.el.container) {
                this.el.container.classList.add('nds-loading', 'nds-lg', 'nds-oncolor');
            }
        }

        hideSpinner() {
            if (this.el.container) {
                this.el.container.classList.remove('nds-loading', 'nds-lg', 'nds-oncolor');
            }
        }

        removeImage() {
            if (this.image) {
                this.image.remove();
                this.image = null;
            }
        }

        // ── Transform ────────────────────────────────────────────────────
        updateTransform() {
            if (this.image) {
                this.image.style.transform =
                    `translate(${this.state.translateX}px, ${this.state.translateY}px) scale(${this.state.zoom})`;
            }
            if (this.el.zoomInfo) {
                this.el.zoomInfo.textContent = `${Math.round(this.state.zoom * 100)}%`;
            }
        }

        resetTransform() {
            this.state.zoom = 1;
            this.state.translateX = 0;
            this.state.translateY = 0;
            this.updateTransform();
        }

        // ── Zoom ─────────────────────────────────────────────────────────
        setZoom(zoom) {
            this.state.zoom = this.clamp(zoom, ZOOM.min, ZOOM.max);
        }

        zoomBy(factor) {
            this.setZoom(this.state.zoom * factor);
            this.updateTransform();
        }

        // Zoom toward a point (centerX/centerY are relative to the container's
        // top-left). Shared by wheel and pinch so the math lives in one place.
        zoomAt(centerX, centerY, newZoom) {
            const rect = this.getContainerRect();
            if (!rect || newZoom === this.state.zoom) return;

            const { zoom, translateX, translateY } = this.state;
            const pointX = (centerX - translateX - rect.width / 2) / zoom;
            const pointY = (centerY - translateY - rect.height / 2) / zoom;

            this.state.zoom = newZoom;
            this.state.translateX = centerX - rect.width / 2 - pointX * newZoom;
            this.state.translateY = centerY - rect.height / 2 - pointY * newZoom;
            this.updateTransform();
        }

        // ── UI chrome ────────────────────────────────────────────────────
        setUIHidden(hidden) {
            this.state.isUIHidden = hidden;
            const method = hidden ? 'add' : 'remove';
            this.uiEls.forEach(el => el && el.classList[method]('nds-ipv-ui-hidden'));
        }

        toggleUI() {
            this.setUIHidden(!this.state.isUIHidden);
        }

        // ── Navigation ───────────────────────────────────────────────────
        showPrev() {
            if (this.state.currentIndex > 0) {
                this.state.currentIndex--;
                this.open(this.state.thumbnails[this.state.currentIndex], true);
            }
        }

        showNext() {
            if (this.state.currentIndex < this.state.thumbnails.length - 1) {
                this.state.currentIndex++;
                this.open(this.state.thumbnails[this.state.currentIndex], true);
            }
        }

        updateNavButtons() {
            const { currentIndex, thumbnails } = this.state;
            const total = thumbnails.length;

            if (this.el.prevBtn) this.el.prevBtn.disabled = currentIndex === 0;
            if (this.el.nextBtn) this.el.nextBtn.disabled = currentIndex === total - 1;

            // Hide nav + counter when there's only one image.
            if (this.el.navControls) {
                this.el.navControls.style.display = total <= 1 ? 'none' : 'flex';
            }
            if (this.el.imageCounter) {
                this.el.imageCounter.textContent = `${currentIndex + 1} / ${total}`;
                this.el.imageCounter.style.display = total <= 1 ? 'none' : 'block';
            }
        }

        // ── Image loading ────────────────────────────────────────────────
        loadImage(src, alt) {
            this.removeImage();
            this.showSpinner();

            const img = document.createElement('img');
            img.id = 'ndsIpvPopupImage';
            img.className = 'nds-ipv-popup-image';
            img.alt = alt || '';
            img.src = src;
            img.onload = () => this.hideSpinner();
            img.onerror = () => this.hideSpinner();

            if (this.el.container && this.el.controls) {
                this.el.container.insertBefore(img, this.el.controls);
                this.image = img;
                this.attachImageEvents(img);
            }
        }

        // ── Event handlers ───────────────────────────────────────────────
        // Image listeners are plain (no shared signal): the <img> is replaced on
        // every open, and tying them to the instance signal would pin every
        // previously-viewed image in memory until destroy(). Element removal frees
        // them instead.
        attachImageEvents(img) {
            img.addEventListener('mousedown', (e) => this.handleMouseDown(e));
            img.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            img.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            img.addEventListener('touchend', () => this.handleTouchEnd());
            img.addEventListener('dblclick', () => this.resetTransform());
            img.addEventListener('contextmenu', (e) => e.preventDefault());
        }

        handleMouseDown(e) {
            e.preventDefault();
            this.state.isDragging = true;
            this.state.startX = e.clientX - this.state.translateX;
            this.state.startY = e.clientY - this.state.translateY;
        }

        handleMouseMove(e) {
            if (!this.state.isDragging) return;
            e.preventDefault();
            this.state.translateX = e.clientX - this.state.startX;
            this.state.translateY = e.clientY - this.state.startY;
            this.updateTransform();
        }

        handleMouseUp() {
            this.state.isDragging = false;
        }

        handleWheel(e) {
            e.preventDefault();
            const rect = this.getContainerRect();
            if (!this.image || !rect) return;

            const newZoom = this.clamp(
                this.state.zoom * (e.deltaY > 0 ? ZOOM.wheelOut : ZOOM.wheelIn),
                ZOOM.min, ZOOM.max
            );
            this.zoomAt(e.clientX - rect.left, e.clientY - rect.top, newZoom);
        }

        handleTouchStart(e) {
            if (e.touches.length === 1) {
                this.state.touchStartX = e.touches[0].clientX - this.state.translateX;
                this.state.touchStartY = e.touches[0].clientY - this.state.translateY;
                this.state.isDragging = true;
            } else if (e.touches.length === 2) {
                const [t1, t2] = e.touches;
                this.state.touchDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

                const rect = this.getContainerRect();
                if (rect) {
                    this.state.touchCenterX = (t1.clientX + t2.clientX) / 2 - rect.left;
                    this.state.touchCenterY = (t1.clientY + t2.clientY) / 2 - rect.top;
                }
                this.state.isDragging = false;
            }
        }

        handleTouchMove(e) {
            e.preventDefault();
            if (e.touches.length === 1 && this.state.isDragging) {
                this.state.translateX = e.touches[0].clientX - this.state.touchStartX;
                this.state.translateY = e.touches[0].clientY - this.state.touchStartY;
                this.updateTransform();
            } else if (e.touches.length === 2 && this.state.touchDistance > 0) {
                const [t1, t2] = e.touches;
                const newDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
                const newZoom = this.clamp(
                    this.state.zoom * (newDistance / this.state.touchDistance),
                    ZOOM.min, ZOOM.max
                );
                this.zoomAt(this.state.touchCenterX, this.state.touchCenterY, newZoom);
                this.state.touchDistance = newDistance;
            }
        }

        handleTouchEnd() {
            this.state.isDragging = false;
            this.state.touchDistance = 0;
            this.state.touchCenterX = 0;
            this.state.touchCenterY = 0;
        }

        handleKeydown(e) {
            if (!this.el.overlay || !this.el.overlay.classList.contains('nds-ipv-active')) return;

            const actions = {
                'Escape': () => this.close(),
                '+': () => this.zoomBy(ZOOM.step),
                '=': () => this.zoomBy(ZOOM.step),
                '-': () => this.zoomBy(1 / ZOOM.step),
                '0': () => this.resetTransform(),
                'h': () => this.toggleUI(),
                'H': () => this.toggleUI(),
                'ArrowLeft': () => this.showPrev(),
                'ArrowRight': () => this.showNext()
            };

            const action = actions[e.key];
            if (action) {
                e.preventDefault();
                action();
            }
        }

        // ── Open / close ─────────────────────────────────────────────────
        open(thumb, skipIndexUpdate = false) {
            // Prefer the lazy-load / full-resolution source, fall back to the src.
            const src = thumb.dataset.ipvFull || thumb.dataset.src || thumb.getAttribute('data-src') || thumb.src;

            if (this.el.overlay) {
                this.el.overlay.classList.add('nds-ipv-active');
            }

            // First open (not gallery prev/next): start a fresh modal session.
            if (!skipIndexUpdate) {
                this.state.currentIndex = this.state.thumbnails.indexOf(thumb);
                this._containerRect = null; // recompute against the now-visible overlay

                // Soft dependency — skip the dimming layer if Backdrop isn't bundled.
                if (NDS.Backdrop) {
                    NDS.Backdrop.show({ zIndex: 999, clickToClose: false, escapeClose: false });
                }

                // Move focus into the dialog, trap Tab, and remember where to return.
                this.lastFocused = document.activeElement;
                document.addEventListener('keydown', this.trapFocus);
                if (this.el.closeBtn) this.el.closeBtn.focus();
            }

            this.setUIHidden(false);
            this.resetTransform();
            this.loadImage(src, thumb.getAttribute('alt'));
            this.updateNavButtons();
        }

        close() {
            if (this.el.overlay) {
                this.el.overlay.classList.remove('nds-ipv-active');
                // Soft dependency — only hide the dimming layer if Backdrop is bundled.
                if (NDS.Backdrop) NDS.Backdrop.hide();
            }

            // Release the trap and return focus to the triggering thumbnail.
            document.removeEventListener('keydown', this.trapFocus);
            if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
                this.lastFocused.focus();
            }
            this.lastFocused = null;

            this.removeImage();
            this.hideSpinner();
            // Reset the transform after the fade-out so the next open starts clean.
            setTimeout(() => this.resetTransform(), NDS.transitionSpeed());
        }

        // ── Event attachment ─────────────────────────────────────────────
        attachThumbnailEvents() {
            // Known thumbnails drive prev/next; exclude any inside code examples.
            this.state.thumbnails = Array.from(document.querySelectorAll('.nds-ipv-thumbnail'))
                .filter(thumb => !thumb.closest('code, .code-example'));

            // Make each thumbnail keyboard-operable without changing authored markup.
            this.state.thumbnails.forEach(thumb => {
                if (!thumb.hasAttribute('tabindex')) thumb.tabIndex = 0;
                if (!thumb.hasAttribute('role')) thumb.setAttribute('role', 'button');
            });

            const { signal } = this.abortController;
            const isKnownThumb = (el) => el && this.state.thumbnails.includes(el);

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

        attachControlEvents() {
            const actions = {
                '.nds-ipv-zoom-in-btn': () => this.zoomBy(ZOOM.step),
                '.nds-ipv-zoom-out-btn': () => this.zoomBy(1 / ZOOM.step),
                '.nds-ipv-reset-zoom-btn': () => this.resetTransform(),
                '.nds-ipv-ui-toggle-btn': () => this.toggleUI(),
                '.nds-ipv-close-btn': () => this.close(),
                '.nds-ipv-prev-btn': () => this.showPrev(),
                '.nds-ipv-next-btn': () => this.showNext()
            };

            const { signal } = this.abortController;
            Object.entries(actions).forEach(([sel, fn]) => {
                const btn = this.el.overlay.querySelector(sel);
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        fn();
                    }, { signal });
                }
            });
        }

        attachGlobalEvents() {
            const { signal } = this.abortController;
            if (this.el.overlay) {
                this.el.overlay.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false, signal });
            }
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e), { signal });
            document.addEventListener('mouseup', () => this.handleMouseUp(), { signal });
            document.addEventListener('keydown', (e) => this.handleKeydown(e), { signal });
        }

        destroy() {
            if (this.abortController) this.abortController.abort();
            if (this._offResize) this._offResize();
            document.removeEventListener('keydown', this.trapFocus);
        }

        // Static factory method
        static create() {
            return new NDSImagePopupViewer();
        }
    }

    // Inject the overlay markup once. English strings are baked in alongside
    // data-i18n keys so it renders correctly with no JSON / before NDS.i18n
    // resolves; NDS.i18n.load('ipv', overlay) swaps them per locale at init.
    function createOverlayMarkup() {
        if (document.getElementById('ndsIpvPopupOverlay')) return;

        const overlayHTML = `
            <div class="nds-ipv-popup-overlay" id="ndsIpvPopupOverlay" role="dialog" aria-modal="true" aria-label="Image viewer">
                <div class="nds-ipv-popup-container">
                    <div class="nds-ipv-popup-controls">
                        <button class="nds-ipv-control-btn nds-ipv-zoom-in-btn" title="Zoom In" aria-label="Zoom in" data-i18n-attr="aria-label:zoomIn,title:zoomIn">
                            <i class="nds-icon nds-hgi-zoom-in-area" aria-hidden="true"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-zoom-out-btn" title="Zoom Out" aria-label="Zoom out" data-i18n-attr="aria-label:zoomOut,title:zoomOut">
                            <i class="nds-icon nds-hgi-zoom-out-area" aria-hidden="true"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-reset-zoom-btn" title="Reset Zoom" aria-label="Reset zoom" data-i18n-attr="aria-label:resetZoom,title:resetZoom">
                            <i class="nds-icon nds-hgi-square-arrow-shrink-01" aria-hidden="true"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-ui-toggle-btn" title="Hide UI" aria-label="Toggle controls" data-i18n-attr="aria-label:toggleUI,title:toggleUI">
                            <i class="nds-icon nds-hgi-eye" aria-hidden="true"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-close-btn" title="Close" aria-label="Close" data-i18n-attr="aria-label:close,title:close">
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="nds-ipv-navigation-controls">
                        <button class="nds-ipv-control-btn nds-ipv-prev-btn" title="Previous Image" aria-label="Previous image" data-i18n-attr="aria-label:prevImage,title:prevImage">
                            <i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-next-btn" title="Next Image" aria-label="Next image" data-i18n-attr="aria-label:nextImage,title:nextImage">
                            <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="nds-ipv-image-counter" id="ndsIpvImageCounter">1 / 1</div>

                    <div class="nds-ipv-instructions">
                        <strong data-i18n="instructionsTitle">Controls:</strong><br>
                        <span data-i18n="instructionsScroll">• Scroll to zoom</span><br>
                        <span data-i18n="instructionsDrag">• Drag to pan</span><br>
                        <span data-i18n="instructionsReset">• Double-click to reset</span><br>
                        <span data-i18n="instructionsNav">• Arrow keys to navigate</span><br>
                        <span data-i18n="instructionsToggle">• H key to toggle UI</span><br>
                        <span data-i18n="instructionsClose">• ESC to close</span>
                    </div>

                    <div class="nds-ipv-zoom-info" id="ndsIpvZoomInfo">100%</div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', overlayHTML);
    }

    // Initialization (called by nds-loader.js)
    function initializeIPV() {
        createOverlayMarkup();

        const overlay = document.getElementById('ndsIpvPopupOverlay');
        if (overlay && !overlay.hasAttribute('data-nds-ipv-initialized')) {
            window.ndsIPV = new NDSImagePopupViewer();
            overlay.setAttribute('data-nds-ipv-initialized', 'true');
        }
    }

    // Public API for the unified init system
    NDS.Ipv = {
        init: initializeIPV,
        reinit: initializeIPV,
        create: () => {
            initializeIPV();
            return window.ndsIPV;
        }
    };
})();
