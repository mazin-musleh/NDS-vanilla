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
            this._onScroll = null;

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
                wrap.dataset.status = status;
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
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.isOpen ? this.close() : this.open();
            });
            this.trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    e.stopPropagation();
                    this.close();
                    this.trigger.focus();
                }
            });
        }

        open() {
            if (this.isOpen) return;
            this.isOpen = true;

            // Only one tooltip open at a time
            document.querySelectorAll('.nds-tooltip[data-state~="open"]').forEach(el => {
                if (el !== this.root && el.ndsTooltip) el.ndsTooltip.close();
            });

            addState(this.root, 'open');
            this.balloon.hidden = false;
            this.applyPosition();

            // Close on click outside
            this._onDocClick = (e) => {
                if (this.root.contains(e.target)) return;
                this.close();
            };
            document.addEventListener('click', this._onDocClick);

            // Close on outer scroll — the balloon is position: fixed, so
            // scrolling would leave it detached from the trigger. Ignore
            // scrolls inside the balloon itself.
            this._onScroll = (e) => {
                if (e?.target?.nodeType && this.balloon.contains(e.target)) return;
                this.close();
            };
            document.addEventListener('scroll', this._onScroll, { capture: true, passive: true });

            this.emitEvent('nds:tooltip:opened');
        }

        close() {
            if (!this.isOpen) return;
            this.isOpen = false;

            removeState(this.root, 'open');
            this.balloon.hidden = true;
            this.root.removeAttribute('data-position-vertical');

            if (this._onDocClick) {
                document.removeEventListener('click', this._onDocClick);
                this._onDocClick = null;
            }
            if (this._onScroll) {
                document.removeEventListener('scroll', this._onScroll, { capture: true });
                this._onScroll = null;
            }

            this.emitEvent('nds:tooltip:closed');
        }

        applyPosition() {
            const tr = this.trigger.getBoundingClientRect();
            const doc = document.documentElement;
            const vw = doc.clientWidth, vh = doc.clientHeight;
            const gap = 8, pad = 8;

            const nav = document.querySelector('.nds-main-nav');
            const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
            const topEdge = Math.max(pad, navBottom + 16);

            this.balloon.style.top = '';
            this.balloon.style.left = '';

            const br = this.balloon.getBoundingClientRect();
            const bW = br.width, bH = br.height;

            const spaceBelow = vh - tr.bottom - gap - pad;
            const spaceAbove = tr.top - gap - topEdge;
            const flipUp = spaceBelow < bH && spaceAbove > spaceBelow;

            if (flipUp) this.root.setAttribute('data-position-vertical', 'top');
            else this.root.removeAttribute('data-position-vertical');

            let top = flipUp ? tr.top - bH - gap : tr.bottom + gap;
            top = Math.max(topEdge, Math.min(top, vh - bH - pad));

            let left = tr.left + (tr.width / 2) - (bW / 2);
            left = Math.max(pad, Math.min(left, vw - bW - pad));

            this.balloon.style.top = top + 'px';
            this.balloon.style.left = left + 'px';

            // Arrow points at the trigger center, clamped inside balloon edges
            const triggerCenterX = tr.left + tr.width / 2;
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
