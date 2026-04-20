/**
 * NDS Alert Component
 * Programmatic alert creation API
 *
 * Variants: success, warning, error, info, neutral
 *
 * Usage:
 * NDSAlert.create({
 *     variant: 'info',
 *     title: 'Update Available',
 *     description: 'A new version is available.',
 *     target: '#container',
 *     actions: [
 *         { label: 'Update Now', variant: 'primary', onClick: () => {} },
 *         { label: 'Later', variant: 'subtle', onClick: () => {} }
 *     ]
 * });
 */

(function() {
    'use strict';

    const NDSAlert = {
        /**
         * Create and insert an alert
         * @param {Object} options
         * @param {string} options.variant - 'success', 'warning', 'error', 'info', 'neutral'
         * @param {string} options.title - Alert title (optional)
         * @param {string} options.description - Alert description
         * @param {string|Element} options.target - Target selector or element
         * @param {boolean} options.closable - Show close button (default: true)
         * @param {boolean} options.shadow - Add shadow effect (default: false)
         * @param {boolean} options.color - Add color variant (default: false)
         * @param {string} options.id - Custom ID (optional)
         * @param {boolean} options.prepend - Prepend instead of append (default: false)
         * @param {Array} options.actions - Action buttons array (optional)
         *        Each action: { label, variant, size, onClick, dismiss, href, target }
         * @param {string} options.display - 'default', 'inline', or 'toast' (default: 'default')
         * @param {string} options.position - Toast position: 'top' or 'bottom' (default: 'top')
         * @param {number} options.duration - Auto-dismiss duration in ms, 0 for no auto-dismiss (default: 0)
         * @returns {HTMLElement}
         */
        create(options = {}) {
            const {
                variant = 'info',
                title = '',
                description = '',
                target = null,
                closable = true,
                shadow = false,
                color = false,
                id = null,
                prepend = false,
                actions = [],
                display = 'default',
                position = 'top',
                duration = 0
            } = options;

            const alert = document.createElement('div');
            alert.className = 'nds-alert nds-card';
            NDS.Status.set(alert, variant);
            if (shadow) alert.classList.add('nds-shadow');
            if (color) alert.classList.add('nds-color');
            if (display === 'inline') alert.classList.add('nds-inline');
            if (display === 'toast') alert.classList.add('nds-toast');
            if (id) alert.id = id;
            alert.setAttribute('role', 'alert');

            const iconStyle = display === 'inline' ? '' : ' nds-outline';
            let html = `
                <span class="nds-feedback nds-alert-icon${iconStyle}">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        ${title ? `<span class="nds-alert-title">${NDS.escapeHtml(title)}</span>` : ''}
                        ${description ? `<p class="nds-alert-description">${NDS.escapeHtml(description)}</p>` : ''}
                    </div>
                </div>
            `;

            if (closable || duration > 0) {
                // Add progress class and SVG if toast has auto-dismiss
                const progressClass = (display === 'toast' && duration > 0) ? ' nds-progress' : '';
                const progressStyle = (display === 'toast' && duration > 0) ? ` style="--progress-duration: ${Number(duration)}ms;"` : '';
                const progressSVG = (display === 'toast' && duration > 0) ? `
                    <div class="nds-progress-circle" hidden>
                        <svg width="100%" height="100%" viewBox="0 0 24 24">
                            <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
                            <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
                        </svg>
                    </div>
                ` : '';

                html += `
                    <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close${progressClass}" aria-label="Close"${progressStyle}>
                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        ${progressSVG}
                    </button>
                `;
            }

            alert.innerHTML = html;

            // Build actions via DOM so caller-supplied href/class/target/label never reach the HTML parser,
            // and so target="_blank" always pairs with rel="noopener noreferrer".
            if (actions && actions.length > 0) {
                const actionsWrap = document.createElement('div');
                actionsWrap.className = 'nds-alert-actions';
                actions.forEach((action, index) => {
                    const classes = action.class || `nds-btn nds-${action.variant || 'subtle'} nds-${action.size || 'sm'}`;
                    let el;
                    if (action.href) {
                        el = document.createElement('a');
                        el.setAttribute('href', action.href);
                        if (action.target) {
                            el.setAttribute('target', action.target);
                            el.setAttribute('rel', 'noopener noreferrer');
                        }
                        el.textContent = action.label || '';
                    } else {
                        el = document.createElement('button');
                        const lbl = document.createElement('span');
                        lbl.className = 'nds-label';
                        lbl.textContent = action.label || '';
                        el.appendChild(lbl);
                    }
                    el.className = classes;
                    el.setAttribute('data-action-index', index);
                    actionsWrap.appendChild(el);
                });
                alert.querySelector('.nds-alert-content').appendChild(actionsWrap);
            }

            // Close button handler
            if (closable || duration > 0) {
                alert.querySelector('.nds-alert-close').addEventListener('click', () => {
                    this.dismiss(alert);
                });
            }

            // Action button handlers
            if (actions && actions.length > 0) {
                actions.forEach((action, index) => {
                    const btn = alert.querySelector(`[data-action-index="${index}"]`);
                    if (btn && action.onClick) {
                        btn.addEventListener('click', () => {
                            action.onClick(alert);
                            // Auto dismiss if action.dismiss is true (default: false)
                            if (action.dismiss) {
                                this.dismiss(alert);
                            }
                        });
                    }
                });
            }

            // Insert into target or as toast
            if (display === 'toast') {
                // Find or create the placeholder container for this position
                const placeholder = this._getPlaceholder(position);

                // Top: prepend (newest first), Bottom: append (newest last)
                if (position === 'bottom') {
                    placeholder.appendChild(alert);
                } else {
                    placeholder.prepend(alert);
                }

                // Add entrance animation
                setTimeout(() => alert.setAttribute('data-toast-state', 'show'), 10);

                // Auto-dismiss with duration
                if (duration > 0) {
                    setTimeout(() => {
                        this.dismiss(alert);
                    }, duration);
                }
            } else if (target) {
                const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
                if (targetEl) {
                    if (prepend) {
                        targetEl.prepend(alert);
                    } else {
                        targetEl.appendChild(alert);
                    }
                }
            }

            return alert;
        },

        /**
         * Get or create a toast placeholder container for the given position
         */
        _getPlaceholder(position) {
            // Check for an existing placeholder (user-placed or auto-created)
            let placeholder = document.querySelector(`.nds-alert-placeholder[data-position="${position}"]`);
            if (placeholder) {
                // Ensure it's visible
                placeholder.removeAttribute('hidden');
            } else {
                // Create one automatically
                placeholder = document.createElement('div');
                placeholder.className = 'nds-alert-placeholder';
                placeholder.setAttribute('data-position', position);
                document.body.appendChild(placeholder);
            }

            // Sync top offset to nav bottom
            if (position === 'top' && !placeholder._scrollSync) {
                const nav = document.querySelector('.nds-main-nav');
                if (nav) {
                    const update = () => placeholder.style.setProperty('--_toast-top', nav.getBoundingClientRect().bottom + 'px');
                    update();
                    const sync = () => {
                        if (!placeholder.isConnected) {
                            window.removeEventListener('scroll', throttledSync);
                            placeholder._scrollSync = null;
                            return;
                        }
                        if (window.scrollY < 200) update();
                    };
                    const throttledSync = NDS.rafThrottle(sync);
                    window.addEventListener('scroll', throttledSync, { passive: true });
                    placeholder._scrollSync = throttledSync;
                }
            }

            return placeholder;
        },

        /**
         * Dismiss an alert
         */
        dismiss(alert) {
            const el = typeof alert === 'string' ? document.querySelector(alert) : alert;
            if (el) {
                const placeholder = el.closest('.nds-alert-placeholder');

                // Add exit animation for toasts
                if (el.classList.contains('nds-toast')) {
                    el.setAttribute('data-toast-state', 'hide');
                    setTimeout(() => {
                        el.remove();
                        if (placeholder && !placeholder.children.length) {
                            if (placeholder._scrollSync) {
                                window.removeEventListener('scroll', placeholder._scrollSync);
                                placeholder._scrollSync = null;
                            }
                            placeholder.remove();
                        }
                    }, 300);
                } else {
                    el.remove();
                }
            }
        },

        /**
         * Dismiss all alerts in a container or by ID pattern
         */
        dismissAll(container) {
            const el = typeof container === 'string' ? document.querySelector(container) : container;
            if (el) {
                el.querySelectorAll('.nds-alert').forEach(a => a.remove());
            }
        },

        // Initialize existing alerts
        init() {
            document.querySelectorAll('.nds-alert').forEach(alert => {
                if (alert.hasAttribute('data-nds-alert-init') || alert.closest('code, .code-example')) return;

                const closeBtn = alert.querySelector('.nds-alert-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.dismiss(alert));
                }
                alert.setAttribute('data-nds-alert-init', 'true');
            });
        },
    };

    if (typeof window !== 'undefined') {
        NDS.Alert = NDSAlert;
    }
})();
