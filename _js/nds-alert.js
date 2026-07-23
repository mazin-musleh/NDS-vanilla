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
         * @param {boolean} options.shadow - Add shadow effect (default: true for toasts, false otherwise)
         * @param {boolean} options.color - Add color variant (default: false)
         * @param {string} options.id - Custom ID (optional)
         * @param {boolean} options.prepend - Prepend instead of append (default: false)
         * @param {Array} options.actions - Action buttons array (optional)
         *        Each action: { label, variant, size, onClick, dismiss, href, target, copy, copyTarget }
         *        copy: text to copy to the clipboard on click (uses NDS.Copy: checkmark
         *        flash + aria-live announce come free)
         *        copyTarget: CSS selector; copies that element's textContent instead
         *        (ignored when copy is also set)
         * @param {string} options.display - 'default', 'inline', or 'toast' (default: 'default')
         * @param {string} options.position - Toast position: '{top|bottom}' plus optional inline side
         *        '-start'/'-end'/'-left'/'-right', e.g. 'top-start', 'bottom-left' (default: 'top' = inline-end)
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
                shadow = options.display === 'toast',
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
            if (display === 'toast') alert.classList.add('nds-toast', 'nds-stroke');
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
                    <div class="nds-progress-circle">
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
                    // NDS.safeUrl rejects javascript:/data: payloads → null downgrades the action to a plain button.
                    const validatedHref = NDS.safeUrl(action.href);
                    if (validatedHref) {
                        el = document.createElement('a');
                        el.setAttribute('href', validatedHref);
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
                    if (action.copy || action.copyTarget) {
                        el.classList.add('nds-copy');
                        if (action.copy) el.setAttribute('data-copy', action.copy);
                        else el.setAttribute('data-copy-target', action.copyTarget);
                        const ico = document.createElement('i');
                        ico.className = 'nds-icon nds-hgi-copy-01';
                        ico.setAttribute('aria-hidden', 'true');
                        el.prepend(ico);
                    }
                    el.setAttribute('data-action-index', index);
                    actionsWrap.appendChild(el);
                });
                alert.querySelector('.nds-alert-content').appendChild(actionsWrap);
                // Late-created copy actions need the delegated .nds-copy binding even on
                // pages that had no copy button at loader scan time (bind is idempotent).
                // Soft dependency — NDS.Copy ships in the extras bundle; copy actions
                // no-op until it loads / if a consumer bundle excludes it.
                if (actions.some(a => a.copy || a.copyTarget)) NDS.Copy?.init?.();
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
                    if (btn && (action.onClick || action.dismiss)) {
                        btn.addEventListener('click', () => {
                            if (action.onClick) action.onClick(alert);
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
                if (position.startsWith('bottom')) {
                    placeholder.appendChild(alert);
                } else {
                    placeholder.prepend(alert);
                }

                // Add entrance animation
                NDS.afterPaint(() => NDS.State.add(alert, 'toast-show'));

                // Auto-dismiss with duration; hover pauses, click pins the pause
                // (touch has no hover — tap keeps the toast until closed)
                if (duration > 0) {
                    let timer = null, remaining = duration, start = 0, pinned = false;
                    const run = () => {
                        start = Date.now();
                        timer = setTimeout(() => this.dismiss(alert), remaining);
                    };
                    const pause = () => {
                        if (!timer) return;
                        clearTimeout(timer);
                        timer = null;
                        remaining -= Date.now() - start;
                        NDS.State.add(alert, 'paused');
                    };
                    const resume = () => {
                        if (pinned || timer) return;
                        NDS.State.remove(alert, 'paused');
                        run();
                    };
                    alert.addEventListener('mouseenter', pause);
                    alert.addEventListener('focusin', pause);
                    alert.addEventListener('click', () => {
                        pinned = true;
                        pause();
                        // Countdown cancelled for good — dropping nds-progress hides the whole ring
                        alert.querySelector('.nds-alert-close').classList.remove('nds-progress');
                    });
                    alert.addEventListener('mouseleave', resume);
                    alert.addEventListener('focusout', resume);
                    run();
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
            if (position.startsWith('top') && !placeholder._scrollSync) {
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
                    NDS.State.set(el, 'toast-hide');
                    // Removal tracks the CSS fade via the token-sourced duration
                    // (reduced-motion / token bumps stay in sync automatically).
                    NDS.onTransitionEnd(el, () => {
                        el.remove();
                        if (placeholder && !placeholder.children.length) {
                            if (placeholder._scrollSync) {
                                window.removeEventListener('scroll', placeholder._scrollSync);
                                placeholder._scrollSync = null;
                            }
                            placeholder.remove();
                        }
                    });
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
                el.querySelectorAll('.nds-alert').forEach(a => this.dismiss(a));
            }
        },

        // Initialize existing alerts
        init() {
            document.querySelectorAll('.nds-alert').forEach(alert => {
                if (alert.hasAttribute('data-nds-alert-initialized') || alert.closest('code, .code-example')) return;

                const closeBtn = alert.querySelector('.nds-alert-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.dismiss(alert));
                }
                alert.setAttribute('data-nds-alert-initialized', 'true');
            });
        },
    };

    if (typeof window !== 'undefined') {
        NDS.Alert = NDSAlert;
    }
})();
