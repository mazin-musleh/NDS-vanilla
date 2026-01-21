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
         *        Each action: { label, variant, size, onClick, dismiss }
         * @param {boolean} options.toast - Display as toast notification (default: false)
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
                toast = false,
                position = 'top',
                duration = 0
            } = options;

            const alert = document.createElement('div');
            alert.className = 'nds-alert nds-card';
            alert.setAttribute('data-status', variant);
            if (shadow) alert.classList.add('nds-shadow');
            if (color) alert.classList.add('nds-color');
            if (toast) alert.classList.add('nds-toast');
            if (id) alert.id = id;
            alert.setAttribute('role', 'alert');

            // Build actions HTML
            let actionsHtml = '';
            if (actions && actions.length > 0) {
                actionsHtml = '<div class="nds-alert-actions">';
                actions.forEach((action, index) => {
                    const btnVariant = action.variant || 'subtle';
                    const btnSize = action.size || 'sm';
                    actionsHtml += `
                        <button class="nds-btn nds-${btnVariant} nds-${btnSize}" data-action-index="${index}">
                            <span class="label">${action.label}</span>
                        </button>
                    `;
                });
                actionsHtml += '</div>';
            }

            let html = `
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon nds-outline">
                        <i class="hgi hgi-solid icon"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    ${title ? `<h4 class="nds-alert-title">${title}</h4>` : ''}
                    ${description ? `<p class="nds-alert-description">${description}</p>` : ''}
                    ${actionsHtml}
                </div>
            `;

            if (closable) {
                // Add progress class and SVG if toast has auto-dismiss
                const progressClass = (toast && duration > 0) ? ' nds-progress' : '';
                const progressStyle = (toast && duration > 0) ? ` style="--progress-duration: ${duration}ms;"` : '';
                const progressSVG = (toast && duration > 0) ? `
                    <div class="nds-progress-circle" hidden>
                        <svg width="100%" height="100%" viewBox="0 0 24 24">
                            <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
                            <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
                        </svg>
                    </div>
                ` : '';

                html += `
                    <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close${progressClass}" aria-label="Close"${progressStyle}>
                        <i class="hgi hgi-stroke hgi-cancel-01"></i>
                        ${progressSVG}
                    </button>
                `;
            }

            alert.innerHTML = html;

            // Close button handler
            if (closable) {
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
            if (toast) {
                // Set position attribute
                alert.setAttribute('data-position', position);

                // Append to body
                document.body.appendChild(alert);

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
         * Dismiss an alert
         */
        dismiss(alert) {
            const el = typeof alert === 'string' ? document.querySelector(alert) : alert;
            if (el) {
                // Add exit animation for toasts
                if (el.classList.contains('nds-toast')) {
                    el.setAttribute('data-toast-state', 'hide');
                    setTimeout(() => {
                        el.remove();
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

        // Convenience methods for each variant
        success(description, options = {}) {
            return this.create({ ...options, variant: 'success', description });
        },

        warning(description, options = {}) {
            return this.create({ ...options, variant: 'warning', description });
        },

        error(description, options = {}) {
            return this.create({ ...options, variant: 'error', description });
        },

        info(description, options = {}) {
            return this.create({ ...options, variant: 'info', description });
        },

        neutral(description, options = {}) {
            return this.create({ ...options, variant: 'neutral', description });
        }
    };

    if (typeof window !== 'undefined') {
        window.NDSAlert = NDSAlert;
    }
})();
