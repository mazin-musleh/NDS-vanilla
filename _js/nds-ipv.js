/**
 * NDS Image Popup Viewer (IPV)
 * Component for viewing images in a popup overlay with zoom, pan, and pinch-to-zoom support
 */

(function() {
    'use strict';

    class NDSImagePopupViewer {
        constructor() {
            // State management
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

            // DOM element cache
            this.el = {
                overlay: document.getElementById('ndsIpvPopupOverlay'),
                container: document.querySelector('.nds-ipv-popup-container'),
                zoomInfo: document.getElementById('ndsIpvZoomInfo'),
                controls: document.querySelector('.nds-ipv-popup-controls'),
                instructions: document.querySelector('.nds-ipv-instructions'),
                navControls: document.querySelector('.nds-ipv-navigation-controls'),
                imageCounter: document.getElementById('ndsIpvImageCounter')
            };

            this.init();
        }

        init() {
            if (!this.el.overlay) {
                console.warn('NDS IPV: Popup overlay not found');
                return;
            }

            this.attachThumbnailEvents();
            this.attachControlEvents();
            this.attachGlobalEvents();
        }

        // Utility functions
        clamp(val, min, max) {
            return Math.min(Math.max(val, min), max);
        }

        getCurrentImage() {
            return document.getElementById('ndsIpvPopupImage');
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
            const img = this.getCurrentImage();
            if (img) img.remove();
        }

        // Transform management
        updateTransform() {
            const img = this.getCurrentImage();
            if (img) {
                img.style.transform = `translate(${this.state.translateX}px, ${this.state.translateY}px) scale(${this.state.zoom})`;
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

        // UI Toggle functionality
        toggleUI() {
            this.state.isUIHidden = !this.state.isUIHidden;
            const method = this.state.isUIHidden ? 'add' : 'remove';
            if (this.el.controls) this.el.controls.classList[method]('nds-ipv-ui-hidden');
            if (this.el.instructions) this.el.instructions.classList[method]('nds-ipv-ui-hidden');
            if (this.el.zoomInfo) this.el.zoomInfo.classList[method]('nds-ipv-ui-hidden');
            if (this.el.navControls) this.el.navControls.classList[method]('nds-ipv-ui-hidden');
            if (this.el.imageCounter) this.el.imageCounter.classList[method]('nds-ipv-ui-hidden');
        }

        resetUI() {
            this.state.isUIHidden = false;
            if (this.el.controls) this.el.controls.classList.remove('nds-ipv-ui-hidden');
            if (this.el.instructions) this.el.instructions.classList.remove('nds-ipv-ui-hidden');
            if (this.el.zoomInfo) this.el.zoomInfo.classList.remove('nds-ipv-ui-hidden');
            if (this.el.navControls) this.el.navControls.classList.remove('nds-ipv-ui-hidden');
            if (this.el.imageCounter) this.el.imageCounter.classList.remove('nds-ipv-ui-hidden');
        }

        // Navigation functionality
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
            const prevBtn = document.querySelector('.nds-ipv-prev-btn');
            const nextBtn = document.querySelector('.nds-ipv-next-btn');

            if (prevBtn) prevBtn.disabled = this.state.currentIndex === 0;
            if (nextBtn) nextBtn.disabled = this.state.currentIndex === this.state.thumbnails.length - 1;

            // Hide nav controls if only one image
            if (this.el.navControls) {
                this.el.navControls.style.display = this.state.thumbnails.length <= 1 ? 'none' : 'flex';
            }

            // Update image counter
            if (this.el.imageCounter) {
                const current = this.state.currentIndex + 1;
                const total = this.state.thumbnails.length;
                this.el.imageCounter.textContent = `${current} / ${total}`;

                // Hide counter if only one image
                this.el.imageCounter.style.display = total <= 1 ? 'none' : 'block';
            }
        }

        // Image loading
        loadImage(src) {
            this.removeImage();
            this.showSpinner();

            const img = document.createElement('img');
            img.id = 'ndsIpvPopupImage';
            img.className = 'nds-ipv-popup-image';
            img.alt = 'Full size image';
            img.src = src;

            img.onload = () => this.hideSpinner();
            img.onerror = () => this.hideSpinner();

            if (this.el.container && this.el.controls) {
                this.el.container.insertBefore(img, this.el.controls);
                this.attachImageEvents(img);
            }
        }

        // Event handlers
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
            const img = this.getCurrentImage();
            if (!img || !this.el.container) return;

            const containerRect = this.el.container.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            const mouseY = e.clientY - containerRect.top;

            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = this.clamp(this.state.zoom * zoomFactor, 0.1, 10);

            if (newZoom !== this.state.zoom) {
                const zoomPointX = (mouseX - this.state.translateX - containerRect.width / 2) / this.state.zoom;
                const zoomPointY = (mouseY - this.state.translateY - containerRect.height / 2) / this.state.zoom;

                this.state.zoom = newZoom;

                this.state.translateX = mouseX - containerRect.width / 2 - zoomPointX * this.state.zoom;
                this.state.translateY = mouseY - containerRect.height / 2 - zoomPointY * this.state.zoom;

                this.updateTransform();
            }
        }

        handleTouchStart(e) {
            if (e.touches.length === 1) {
                this.state.touchStartX = e.touches[0].clientX - this.state.translateX;
                this.state.touchStartY = e.touches[0].clientY - this.state.translateY;
                this.state.isDragging = true;
            } else if (e.touches.length === 2) {
                const [t1, t2] = e.touches;
                this.state.touchDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

                if (this.el.container) {
                    const containerRect = this.el.container.getBoundingClientRect();
                    this.state.touchCenterX = ((t1.clientX + t2.clientX) / 2) - containerRect.left;
                    this.state.touchCenterY = ((t1.clientY + t2.clientY) / 2) - containerRect.top;
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
            } else if (e.touches.length === 2 && this.state.touchDistance > 0 && this.el.container) {
                const [t1, t2] = e.touches;
                const newDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
                const zoomFactor = newDistance / this.state.touchDistance;
                const newZoom = this.clamp(this.state.zoom * zoomFactor, 0.1, 10);

                if (newZoom !== this.state.zoom) {
                    const containerRect = this.el.container.getBoundingClientRect();
                    const zoomPointX = (this.state.touchCenterX - this.state.translateX - containerRect.width / 2) / this.state.zoom;
                    const zoomPointY = (this.state.touchCenterY - this.state.translateY - containerRect.height / 2) / this.state.zoom;

                    this.state.zoom = newZoom;

                    this.state.translateX = this.state.touchCenterX - containerRect.width / 2 - zoomPointX * this.state.zoom;
                    this.state.translateY = this.state.touchCenterY - containerRect.height / 2 - zoomPointY * this.state.zoom;

                    this.updateTransform();
                }

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
                '+': () => { this.state.zoom = this.clamp(this.state.zoom * 1.5, 0.1, 10); this.updateTransform(); },
                '=': () => { this.state.zoom = this.clamp(this.state.zoom * 1.5, 0.1, 10); this.updateTransform(); },
                '-': () => { this.state.zoom = this.clamp(this.state.zoom / 1.5, 0.1, 10); this.updateTransform(); },
                '0': () => this.resetTransform(),
                'h': () => this.toggleUI(),
                'H': () => this.toggleUI(),
                'ArrowLeft': () => this.showPrev(),
                'ArrowRight': () => this.showNext()
            };

            if (actions[e.key]) {
                e.preventDefault();
                actions[e.key]();
            }
        }

        // Main functions
        open(img, skipIndexUpdate = false) {
            // Check for lazy load data attributes first, then ipvFull, then actual src
            const src = img.dataset.ipvFull || img.dataset.src || img.getAttribute('data-src') || img.src;

            if (this.el.overlay) {
                this.el.overlay.classList.add('nds-ipv-active');
                document.body.style.overflow = 'hidden';
            }

            // Update current index if not navigating
            if (!skipIndexUpdate) {
                this.state.currentIndex = this.state.thumbnails.indexOf(img);
            }

            this.resetUI();
            this.resetTransform();
            this.loadImage(src);
            this.updateNavButtons();
        }

        close(event) {
            // Only allow closing via close button, ESC key, or direct function call
            if (event && event.target === this.el.overlay) return;

            if (this.el.overlay) {
                this.el.overlay.classList.remove('nds-ipv-active');
                document.body.style.overflow = 'auto';
            }

            this.removeImage();
            this.hideSpinner();
            setTimeout(() => this.resetTransform(), 300);
        }

        // Event attachment
        attachThumbnailEvents() {
            // Get all thumbnails and store them
            this.state.thumbnails = Array.from(document.querySelectorAll('.nds-ipv-thumbnail')).filter(thumb => {
                return !thumb.closest('code, .code-example');
            });

            this.state.thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => this.open(thumb));
            });
        }

        attachControlEvents() {
            const buttons = {
                '.nds-ipv-zoom-in-btn': () => { this.state.zoom = this.clamp(this.state.zoom * 1.5, 0.1, 10); this.updateTransform(); },
                '.nds-ipv-zoom-out-btn': () => { this.state.zoom = this.clamp(this.state.zoom / 1.5, 0.1, 10); this.updateTransform(); },
                '.nds-ipv-reset-zoom-btn': () => this.resetTransform(),
                '.nds-ipv-ui-toggle-btn': () => this.toggleUI(),
                '.nds-ipv-close-btn': () => this.close(),
                '.nds-ipv-prev-btn': () => this.showPrev(),
                '.nds-ipv-next-btn': () => this.showNext()
            };

            Object.entries(buttons).forEach(([sel, fn]) => {
                const btn = document.querySelector(sel);
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        fn();
                    });
                }
            });
        }

        attachGlobalEvents() {
            if (this.el.overlay) {
                this.el.overlay.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
            }
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            document.addEventListener('mouseup', () => this.handleMouseUp());
            document.addEventListener('keydown', (e) => this.handleKeydown(e));
        }

        // Static factory method
        static create() {
            return new NDSImagePopupViewer();
        }
    }

    // Create overlay markup if it doesn't exist
    function createOverlayMarkup() {
        if (document.getElementById('ndsIpvPopupOverlay')) return;

        const overlayHTML = `
            <div class="nds-ipv-popup-overlay" id="ndsIpvPopupOverlay">
                <div class="nds-ipv-popup-container">
                    <div class="nds-ipv-popup-controls">
                        <button class="nds-ipv-control-btn nds-ipv-zoom-in-btn" title="Zoom In">
                            <i class="hgi hgi-stroke hgi-zoom-in-area"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-zoom-out-btn" title="Zoom Out">
                            <i class="hgi hgi-stroke hgi-zoom-out-area"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-reset-zoom-btn" title="Reset Zoom">
                            <i class="hgi hgi-stroke hgi-square-arrow-shrink-01"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-ui-toggle-btn" title="Hide UI">
                            <i class="hgi hgi-stroke hgi-eye"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-close-btn" title="Close">
                            <i class="hgi hgi-stroke hgi-cancel-01"></i>
                        </button>
                    </div>

                    <div class="nds-ipv-navigation-controls">
                        <button class="nds-ipv-control-btn nds-ipv-prev-btn" title="Previous Image">
                            <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                        </button>
                        <button class="nds-ipv-control-btn nds-ipv-next-btn" title="Next Image">
                            <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                        </button>
                    </div>

                    <div class="nds-ipv-image-counter" id="ndsIpvImageCounter">1 / 1</div>

                    <div class="nds-ipv-instructions">
                        <strong>Controls:</strong><br>
                        • Scroll to zoom<br>
                        • Drag to pan<br>
                        • Double-click to reset<br>
                        • Arrow keys to navigate<br>
                        • H key to toggle UI<br>
                        • ESC to close
                    </div>

                    <div class="nds-ipv-zoom-info" id="ndsIpvZoomInfo">100%</div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', overlayHTML);
    }

    // Initialization function (called by nds-loader.js)
    function initializeIPV() {
        // Create overlay markup automatically
        createOverlayMarkup();

        const overlay = document.getElementById('ndsIpvPopupOverlay');

        if (overlay && !overlay.hasAttribute('data-nds-ipv-initialized')) {
            const ipvInstance = new NDSImagePopupViewer();
            window.ndsIPVInstance = ipvInstance;
            overlay.setAttribute('data-nds-ipv-initialized', 'true');
        }
    }

    // Expose global API for unified init system
    if (typeof window !== 'undefined') {
        window.NDSImagePopupViewer = {
            init: initializeIPV,
            create: () => {
                initializeIPV();
                return window.ndsIPVInstance;
            }
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system
})();
