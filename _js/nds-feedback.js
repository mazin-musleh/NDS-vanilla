/**
 * NDS Feedback Component
 * Programmatic feedback message creation API
 *
 * Status variants: error, success, warning, info, neutral
 *
 * Usage:
 * NDSFeedback.create({
 *     message: 'This field is required',
 *     status: 'error',
 *     target: '#email',
 *     position: 'after',
 *     size: 'sm',
 *     style: 'outline'
 * });
 *
 * // Icon-only feedback
 * NDSFeedback.create({
 *     status: 'error',
 *     target: '#field',
 *     size: 'md',
 *     style: 'outline'
 * });
 *
 * // Permanent feedback (tips/hints that persist)
 * NDSFeedback.create({
 *     message: 'This is a tip',
 *     status: 'neutral',
 *     target: '#container',
 *     permanent: true
 * });
 *
 * // When new non-permanent feedback is created, permanent feedback is hidden (not dismissed)
 * // When non-permanent feedback is dismissed, permanent feedback is restored automatically
 * // When new permanent feedback is created, it replaces the existing permanent feedback
 */

(function() {
    'use strict';

    const NDSFeedback = {
        /**
         * Create and insert a feedback element
         * @param {Object} options
         * @param {string} options.message - Feedback message text (optional, can be icon-only)
         * @param {string} options.status - 'error', 'success', 'warning', 'info', 'neutral' (default: 'neutral')
         * @param {string|Element} options.target - Target selector or element
         * @param {string} options.position - 'before', 'after', 'prepend', 'append' (default: 'append')
         * @param {string} options.size - 'sm', 'md', 'lg' (default: 'sm')
         * @param {string} options.style - '', 'ring', 'outline' (default: 'outline')
         * @param {boolean} options.showIcon - Show/hide icon (default: true)
         * @param {string} options.id - Custom ID (optional)
         * @param {string} options.className - Additional CSS classes (optional)
         * @param {string} options.ariaLive - 'polite' or 'assertive' (default: 'polite')
         * @param {boolean} options.permanent - Persist across status changes (default: false)
         * @param {Function} options.onDismiss - Callback when dismissed (optional)
         * @param {Function} options.onCreate - Callback after creation (optional)
         * @returns {HTMLElement}
         */
        create(options = {}) {
            const {
                message = '',
                status = 'neutral',
                target = null,
                position = 'append',
                size = 'sm',
                style = 'outline',
                showIcon = true,
                id = null,
                className = '',
                ariaLive = null,
                permanent = false,
                onDismiss = null,
                onCreate = null
            } = options;

            // Map simple size/style to CSS classes
            const sizeClass = size ? `nds-${size}` : 'nds-sm';
            const styleClass = style ? `nds-${style}` : '';

            // Create feedback element with size and style classes on parent
            const feedback = document.createElement('span');
            const feedbackClasses = ['nds-feedback', sizeClass, styleClass, className].filter(c => c).join(' ');
            feedback.className = feedbackClasses;
            if (id) feedback.id = id;
            feedback.setAttribute('data-status', status);
            if (permanent) feedback.setAttribute('data-permanent', '');

            // Set ARIA attributes
            const role = (status === 'error' || status === 'warning') ? 'alert' : 'status';
            const live = ariaLive || (status === 'error' ? 'assertive' : 'polite');
            feedback.setAttribute('role', role);
            feedback.setAttribute('aria-live', live);

            // Store onDismiss callback if provided
            if (onDismiss) {
                feedback._onDismiss = onDismiss;
            }

            // Build HTML structure
            let html = '';

            // Icon (only has nds-feedback-icon class, size/style are on parent)
            if (showIcon) {
                html += `
                    <span class="nds-feedback-icon">
                        <i class="hgi hgi-stroke icon"></i>
                    </span>
                `;
            }

            // Message (optional - can be icon-only)
            if (message) {
                html += `<span class="nds-feedback-message">${message}</span>`;
            }

            feedback.innerHTML = html;

            // Attach to target
            if (target) {
                this._attachToTarget(feedback, target, position);
            }

            // Dispatch create event
            const event = new CustomEvent('nds:feedbackCreate', {
                detail: { feedback, options },
                bubbles: true
            });
            document.dispatchEvent(event);

            // Call onCreate callback
            if (onCreate && typeof onCreate === 'function') {
                onCreate(feedback);
            }

            return feedback;
        },

        /**
         * Dismiss a feedback element
         * @param {string|HTMLElement} feedback - Feedback selector or element
         * @returns {boolean} Success
         */
        dismiss(feedback) {
            const el = typeof feedback === 'string' ? document.querySelector(feedback) : feedback;
            if (!el) return false;

            // Store target element before removal
            const targetWasHidden = el._targetWasHidden;
            const parent = el.parentNode;

            // Dispatch dismiss event
            const event = new CustomEvent('nds:feedbackDismiss', {
                detail: { feedback: el },
                bubbles: true
            });
            document.dispatchEvent(event);

            // Call onDismiss callback if stored
            if (el._onDismiss && typeof el._onDismiss === 'function') {
                el._onDismiss();
            }

            // Restore hidden permanent feedback elements
            if (el._hiddenPermanent && el._hiddenPermanent.length > 0) {
                el._hiddenPermanent.forEach(permanentFeedback => {
                    if (permanentFeedback && permanentFeedback.parentNode) {
                        permanentFeedback.removeAttribute('hidden');
                    }
                });
            }

            // Remove from DOM
            el.remove();

            // If target was hidden and there are no more non-permanent feedback elements, hide target again
            if (targetWasHidden && parent) {
                const remainingFeedback = parent.querySelectorAll('.nds-feedback:not([data-permanent])');
                if (remainingFeedback.length === 0) {
                    parent.setAttribute('hidden', '');
                }
            }

            return true;
        },

        /**
         * Dismiss all feedback elements in a container
         * @param {string|HTMLElement} container - Container selector or element
         */
        dismissAll(container) {
            const el = typeof container === 'string' ? document.querySelector(container) : container;
            if (!el) return;

            el.querySelectorAll('.nds-feedback').forEach(feedback => {
                if (feedback.closest('code, .code-example')) return;
                if (feedback.hasAttribute('data-permanent')) {
                    feedback.removeAttribute('hidden');
                    return;
                }
                this.dismiss(feedback);
            });
        },

        /**
         * Initialize existing feedback elements in DOM
         * Enhances hardcoded HTML feedback with interactive features
         */
        init() {
            const feedbackElements = document.querySelectorAll('.nds-feedback');
            if (feedbackElements.length === 0) return;

            feedbackElements.forEach(feedback => {
                // Skip already initialized, code examples
                if (feedback.hasAttribute('data-nds-feedback-init') || feedback.closest('code, .code-example')) {
                    return;
                }

                // Mark as initialized
                feedback.setAttribute('data-nds-feedback-init', 'true');
            });
        },

        /**
         * Internal: Attach feedback to target element
         * @private
         */
        _attachToTarget(feedback, target, position) {
            const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
            if (!targetEl) {
                console.warn('NDSFeedback: target element not found', target);
                return false;
            }

            const hiddenPermanent = [];
            const newIsPermanent = feedback.hasAttribute('data-permanent');

            // Handle existing feedback from target area before adding new one
            if (position === 'prepend' || position === 'append') {
                targetEl.querySelectorAll('.nds-feedback').forEach(existingFeedback => {
                    if (!existingFeedback.closest('code, .code-example')) {
                        if (existingFeedback.hasAttribute('data-permanent') && !newIsPermanent) {
                            existingFeedback.setAttribute('hidden', '');
                            hiddenPermanent.push(existingFeedback);
                        } else {
                            existingFeedback._hiddenPermanent = null;
                            this.dismiss(existingFeedback);
                        }
                    }
                });
            } else {
                const parent = targetEl.parentNode;
                if (parent) {
                    parent.querySelectorAll('.nds-feedback').forEach(existingFeedback => {
                        if (!existingFeedback.closest('code, .code-example')) {
                            if (existingFeedback.parentNode === parent) {
                                if (existingFeedback.hasAttribute('data-permanent') && !newIsPermanent) {
                                    existingFeedback.setAttribute('hidden', '');
                                    hiddenPermanent.push(existingFeedback);
                                } else {
                                    existingFeedback._hiddenPermanent = null;
                                    this.dismiss(existingFeedback);
                                }
                            }
                        }
                    });
                }
            }

            // Store references to hidden permanent feedback on the new feedback element
            if (hiddenPermanent.length > 0) {
                feedback._hiddenPermanent = hiddenPermanent;
            }

            // Remove hidden attribute from target if it exists (for progressive enhancement)
            // Store if target was hidden so we can restore it later
            if (targetEl.hasAttribute('hidden')) {
                feedback._targetWasHidden = true;
                targetEl.removeAttribute('hidden');
            }

            switch(position) {
                case 'before':
                    targetEl.parentNode.insertBefore(feedback, targetEl);
                    break;
                case 'after':
                    targetEl.parentNode.insertBefore(feedback, targetEl.nextSibling);
                    break;
                case 'prepend':
                    targetEl.insertBefore(feedback, targetEl.firstChild);
                    break;
                case 'append':
                default:
                    targetEl.appendChild(feedback);
                    break;
            }

            return true;
        }
    };

    // Export to window
    if (typeof window !== 'undefined') {
        NDS.Feedback = NDSFeedback;
    }
})();
