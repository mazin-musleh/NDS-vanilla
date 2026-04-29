/**
 * NDS Tooltip Component
 * Viewport-aware fixed-position tooltip. Click the trigger to toggle;
 * click outside, scroll, or Escape to dismiss.
 *
 * Markup modes:
 *   - Explicit: author writes out `.nds-tooltip-trigger` + `.nds-tooltip-balloon`.
 *   - Declarative: author adds `data-tooltip-title` and/or `data-tooltip-message`
 *     to `.nds-tooltip`; JS generates the trigger chip and balloon contents.
 *     Optional `data-tooltip-status` (default "help") sets the chip status.
 *     Any existing `.nds-tooltip-trigger` or `.nds-tooltip-balloon` child is
 *     kept as-is; only missing parts are generated.
 */

(function() {
    'use strict';

    const { add: addState, remove: removeState } = NDS.State;

    class NDSTooltip {
        constructor(root) {
            this.root = root;
            if (root.hasAttribute('data-nds-tooltip-initialized')) return;

            this.autoMarkup();

            this.trigger = root.querySelector('.nds-tooltip-trigger') || root;
            this.balloon = root.querySelector('.nds-tooltip-balloon');

            if (!this.balloon) {
                console.warn('NDS Tooltip: no .nds-tooltip-balloon and no data-tooltip-title/message to build one');
                return;
            }

            this.isOpen = false;
            this._onDocClick = null;
            this._offScroll = null;
            // One AbortController per instance — every addEventListener in
            // bindEvents() passes its signal so destroy() can detach all
            // trigger listeners atomically. Open-lifecycle subscriptions
            // (this._onDocClick, this._offScroll) sit outside this AC
            // because they're already torn down by close() per open/close
            // cycle, so adding a signal would duplicate the bookkeeping
            // close() already does.
            this._ac = new AbortController();

            this.init();
        }

        /** Build trigger chip and/or balloon from `data-tooltip-*` attrs
         *  when they're missing in source. Existing markup wins.
         *
         *  When the root has its own content (e.g. `<span class="nds-tooltip">
         *  National ID</span>`), that content IS the trigger — no chip is
         *  inserted. Only an empty root gets the auto-generated chip button.
         */
        autoMarkup() {
            const { tooltipTitle: title, tooltipMessage: message } = this.root.dataset;
            if (!title && !message) return;

            const status = this.root.dataset.tooltipStatus || 'help';

            const hasTrigger = this.root.querySelector('.nds-tooltip-trigger');
            const hasBalloon = this.root.querySelector('.nds-tooltip-balloon');

            // Any non-whitespace child (text or element, excluding the balloon
            // we may be about to skip) means the root itself is the trigger.
            const hasOwnContent = Array.from(this.root.childNodes).some(node => {
                if (node.nodeType === Node.TEXT_NODE) return node.nodeValue.trim().length > 0;
                if (node.nodeType === Node.ELEMENT_NODE) return !node.matches('.nds-tooltip-balloon');
                return false;
            });

            const buildChip = () => {
                const wrap = document.createElement('span');
                wrap.className = 'nds-feedback nds-sm';
                NDS.Status.set(wrap, status);
                const icon = document.createElement('span');
                icon.className = 'nds-feedback-icon';
                const i = document.createElement('i');
                i.className = 'nds-icon';
                i.setAttribute('aria-hidden', 'true');
                icon.appendChild(i);
                wrap.appendChild(icon);
                return wrap;
            };

            // Only generate a chip trigger when root is empty AND has no
            // explicit `.nds-tooltip-trigger` already.
            if (!hasTrigger && !hasOwnContent) {
                const trigger = document.createElement('button');
                trigger.type = 'button';
                trigger.className = 'nds-tooltip-trigger';
                trigger.setAttribute('aria-label', title || 'More info');
                trigger.appendChild(buildChip());
                this.root.prepend(trigger);
            }

            if (!hasBalloon) {
                const balloon = document.createElement('div');
                balloon.className = 'nds-tooltip-balloon';
                balloon.hidden = true;

                // Leading icon chip only when there's also a title — a pure
                // message-only tooltip stays clean (just the text).
                if (title) balloon.appendChild(buildChip());

                const body = document.createElement('span');
                body.className = 'nds-tooltip-body';
                if (title) {
                    const t = document.createElement('span');
                    t.className = 'nds-tooltip-title';
                    t.textContent = title;
                    body.appendChild(t);
                }
                if (message) {
                    const p = document.createElement('p');
                    p.className = 'nds-tooltip-message';
                    p.textContent = message;
                    body.appendChild(p);
                }
                balloon.appendChild(body);

                this.root.appendChild(balloon);
            }
        }

        init() {
            this.balloon.setAttribute('role', 'tooltip');
            const id = this.balloon.id || NDS.uniqueId('nds-tooltip-');
            this.balloon.id = id;

            const existing = this.trigger.getAttribute('aria-describedby');
            if (!existing || !existing.split(/\s+/).includes(id)) {
                this.trigger.setAttribute('aria-describedby',
                    existing ? `${existing} ${id}` : id);
            }

            if (!this.trigger.matches('a, button, input, select, textarea, [tabindex]')) {
                this.trigger.setAttribute('tabindex', '0');
            }

            this.bindEvents();

            this.root.ndsTooltip = this;
            this.root.setAttribute('data-nds-tooltip-initialized', 'true');
        }

        bindEvents() {
            const { signal } = this._ac;
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.isOpen ? this.close() : this.open();
            }, { signal });
            this.trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    e.stopPropagation();
                    this.close();
                    this.trigger.focus();
                }
            }, { signal });
        }

        open() {
            if (this.isOpen) return;
            this.isOpen = true;

            // Only one tooltip open at a time
            document.querySelectorAll('.nds-tooltip[data-state~="open"]').forEach(el => {
                if (el !== this.root && el.ndsTooltip) el.ndsTooltip.close();
            });

            // Portal first so subsequent measurement happens in <body>'s
            // containing block, free of any container-type/transform ancestor.
            NDS.portal(this.balloon);

            addState(this.root, 'open');
            this.balloon.hidden = false;
            this.applyPosition();

            // Close on click outside — portal-aware: while open the balloon
            // lives at <body> level, so events from inside it don't bubble
            // through `this.root`. Treat clicks inside the balloon as inside.
            this._onDocClick = (e) => {
                if (this.root.contains(e.target)) return;
                if (this.balloon.contains(e.target)) return;
                this.close();
            };
            document.addEventListener('click', this._onDocClick);

            // Close on outer scroll — the balloon is position: fixed, so
            // scrolling would leave it detached from the trigger.
            // NDS.onOutsideScroll ignores scrolls inside the balloon itself.
            this._offScroll = NDS.onOutsideScroll(this.balloon, () => this.close());

            this.emitEvent('nds:tooltip:opened');
        }

        close() {
            if (!this.isOpen) return;
            this.isOpen = false;

            removeState(this.root, 'open');
            this.balloon.hidden = true;
            this.root.removeAttribute('data-position-vertical');
            this.balloon.removeAttribute('data-position-vertical');

            if (this._onDocClick) {
                document.removeEventListener('click', this._onDocClick);
                this._onDocClick = null;
            }
            if (this._offScroll) { this._offScroll(); this._offScroll = null; }

            // Restore the balloon to its original location so author markup
            // queries (e.g. `tooltip.querySelector('.nds-tooltip-balloon')`)
            // still resolve while closed.
            NDS.unportal(this.balloon);

            this.emitEvent('nds:tooltip:closed');
        }

        applyPosition() {
            const gap = 8, pad = 8;

            // Reset inline placement so the balloon's natural size can be
            // measured before re-placing.
            this.balloon.style.top = '';
            this.balloon.style.left = '';

            // NDS.flipPosition returns raw space values + topEdge using the
            // sticky mainnav as the top boundary. Clamp topEdge to `pad` for
            // pages without the nav and subtract our own gap/pad from the
            // raw space values. Recompute spaceAbove from triggerRect rather
            // than reusing p.spaceAbove because p.spaceAbove uses the
            // unclamped p.topEdge (which is 0 when no nav is present).
            const p = NDS.flipPosition(this.trigger, this.balloon);
            const topEdge = Math.max(pad, p.topEdge);
            const bW = p.menuRect.width, bH = p.menuRect.height;
            const spaceBelow = p.spaceBelow - gap - pad;
            const spaceAbove = p.triggerRect.top - gap - topEdge;
            const flipUp = spaceBelow < bH && spaceAbove > spaceBelow;

            if (flipUp) {
                this.root.setAttribute('data-position-vertical', 'top');
                this.balloon.setAttribute('data-position-vertical', 'top');
            } else {
                this.root.removeAttribute('data-position-vertical');
                this.balloon.removeAttribute('data-position-vertical');
            }

            let top = flipUp ? p.triggerRect.top - bH - gap : p.triggerRect.bottom + gap;
            top = Math.max(topEdge, Math.min(top, p.viewportHeight - bH - pad));

            let left = p.triggerRect.left + (p.triggerRect.width / 2) - (bW / 2);
            left = Math.max(pad, Math.min(left, p.viewportWidth - bW - pad));

            NDS.placeFixed(this.balloon, top, left);

            // Arrow points at the trigger center, clamped inside balloon edges
            const triggerCenterX = p.triggerRect.left + p.triggerRect.width / 2;
            const arrowHalf = 5;
            const arrowInlineStart = Math.max(
                12,
                Math.min(triggerCenterX - left - arrowHalf, bW - 12 - arrowHalf * 2)
            );
            this.balloon.style.setProperty('--_arrow-inline-start', `${arrowInlineStart}px`);
        }

        emitEvent(name) {
            this.root.dispatchEvent(new CustomEvent(name, {
                detail: {
                    tooltip: this.root,
                    trigger: this.trigger,
                    balloon: this.balloon,
                    isOpen: this.isOpen
                },
                bubbles: true
            }));
        }

        // Drain open-lifecycle subscriptions before tearing the instance
        // down. close() releases this._onDocClick (document click listener)
        // and this._offScroll (NDS.onOutsideScroll) and unportals the
        // balloon. Without the close() drain, destroy-while-open would
        // strand the document listener and the pooled scroll subscriber for
        // the page lifetime.
        destroy() {
            if (this.isOpen) this.close();
            if (this._ac) { this._ac.abort(); this._ac = null; }
            this.root.removeAttribute('data-nds-tooltip-initialized');
            delete this.root.ndsTooltip;
        }
    }

    function initializeTooltips() {
        document.querySelectorAll('.nds-tooltip').forEach(el => {
            if (el.closest('code, .code-example')) return;
            if (el.hasAttribute('data-nds-tooltip-initialized')) return;
            new NDSTooltip(el);
        });
    }

    NDS.Tooltip = {
        init: initializeTooltips,
        reinit: initializeTooltips,
        create: (el) => new NDSTooltip(el)
    };
})();
