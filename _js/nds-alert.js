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
         * @param {string} options.id - Custom ID (optional)
         * @param {boolean} options.prepend - Prepend instead of append (default: false)
         * @param {Array} options.actions - Action buttons array (optional)
         *        Each action: { label, variant, size, onClick, dismiss }
         * @returns {HTMLElement}
         */
        create(options = {}) {
            const {
                variant = 'info',
                title = '',
                description = '',
                target = null,
                closable = true,
                id = null,
                prepend = false,
                actions = []
            } = options;

            const alert = document.createElement('div');
            alert.className = `nds-alert nds-card nds-${variant}`;
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
                <span class="nds-feedback nds-alert-icon" data-status="${variant}">
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
                html += `
                    <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close">
                        <i class="hgi hgi-stroke hgi-cancel-01"></i>
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

            // Insert into target
            if (target) {
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
            if (el) el.remove();
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

        // Shorthand methods
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
        }
    };

    if (typeof window !== 'undefined') {
        window.NDSAlert = NDSAlert;
    }
})();
