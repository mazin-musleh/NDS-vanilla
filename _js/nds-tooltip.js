/* NDS.Tooltip — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Tooltip.init() / .reinit()   scan + initialize .nds-tooltip
 *   NDS.Tooltip.create(el)           instance one tooltip
 *   instance.open() / .close()       show or hide the balloon
 *   instance.destroy()               detach and un-stamp
 * Events (bubble from the .nds-tooltip):
 *   nds:tooltip:opened   detail {tooltip, trigger, balloon, isOpen}
 *   nds:tooltip:closed   detail {tooltip, trigger, balloon, isOpen}
 * Hooks:
 *   data-tooltip-title · data-tooltip-message   build the balloon from attributes
 *   title                                       fallback message when data-tooltip-message
 *                                               is absent; stripped at init
 *   data-tooltip-status                         chip status, default "help"
 *   data-tooltip-hover                          opt in to hover; the value is the open
 *                                               delay in ms (bare attribute = 120). A tap
 *                                               toggles a text term only; on a link/button
 *                                               it runs the action and closes the balloon
 *   written by the component: data-position-vertical="top" on the root and the balloon
 *                             when the balloon flips above the trigger
 * Gotchas:
 *   - Two ways to author it: write .nds-tooltip-trigger + .nds-tooltip-balloon yourself,
 *     or give the root data-tooltip-title / data-tooltip-message and let the component
 *     build the missing parts. Markup you wrote always wins.
 *   - Only ONE tooltip is open at a time; opening one closes the other.
 *   - While open the balloon is portaled to <body>, so a closest() walk from inside it
 *     does not reach the tooltip root. It is put back on close.
 *   - The instance lives on the root as el.ndsTooltip.
 */
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

    // Only one tooltip is open at a time — track it module-locally so open()
    // doesn't need to sweep the DOM by attribute selector.
    let _openTooltip = null;

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
            // (this._onDocClick, this._offScroll) sit outside this AbortController
            // because they're already torn down by close() per open/close
            // cycle, so adding a signal would duplicate the bookkeeping
            // close() already does.
            this.abortController = new AbortController();

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
            // `title` opt-in: with no data-tooltip-message the native title is
            // the message. Stripped so it can't double up with the balloon
            // (native covers the pre-init gap).
            const nativeTitle = this.root.getAttribute('title');
            if (nativeTitle && !this.root.dataset.tooltipMessage) {
                this.root.dataset.tooltipMessage = nativeTitle;
                this.root.removeAttribute('title');
            }

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
                NDS.aria.hidden(i, true);
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
                NDS.aria.label(trigger, title || 'More info');
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
            // Hover mode is OPT-IN via data-tooltip-hover on the root; the
            // value is the open delay in ms (bare attr = 120) — a pointer-
            // intent filter only; keyboard focus and touch tap always open
            // immediately. Default stays click-toggle.
            this._hoverMode = this.root.hasAttribute('data-tooltip-hover');
            const delay = parseInt(this.root.dataset.tooltipHover, 10);
            this._hoverDelay = Number.isNaN(delay) ? 120 : delay;
            this.balloon.setAttribute('role', 'tooltip');
            const id = this.balloon.id || NDS.uniqueId('nds-tooltip-');
            this.balloon.id = id;

            const existing = this.trigger.getAttribute('aria-describedby');
            if (!existing || !existing.split(/\s+/).includes(id)) {
                this.trigger.setAttribute('aria-describedby',
                    existing ? `${existing} ${id}` : id);
            }

            // A text trigger (span root) has no native activation — Enter/Space
            // are handled in bindEvents(). Hover mode opens on focus instead.
            this._isTextTrigger = !this.trigger.matches('a, button, input, select, textarea');
            if (this._isTextTrigger && !this.trigger.hasAttribute('tabindex')) {
                this.trigger.setAttribute('tabindex', '0');
            }
            if (this._isTextTrigger && !this._hoverMode && !this.trigger.hasAttribute('role')) {
                this.trigger.setAttribute('role', 'button');
            }
            // A link/button root owns its data-state (a nav toggle's open look),
            // so the balloon's open stamp stays off it there.
            this._rootIsControl = this.trigger === this.root && !this._isTextTrigger;

            this.bindEvents();

            this.root.ndsTooltip = this;
            this.root.setAttribute('data-nds-tooltip-initialized', 'true');
        }

        bindEvents() {
            const { signal } = this.abortController;

            if (this._hoverMode) {
                // Mouse: hover owns the balloon. The grace timer lets the pointer
                // travel from trigger into the (portaled, adjacent) balloon.
                // One timer serves both directions — a pending delayed open and a
                // pending grace close are mutually exclusive.
                const hoverOpen = (e) => {
                    if (e.pointerType !== 'mouse') return;
                    clearTimeout(this._hoverTimer);
                    if (this.isOpen) return;
                    if (this._hoverDelay) this._hoverTimer = setTimeout(() => this.open(), this._hoverDelay);
                    else this.open();
                };
                const hoverClose = (e) => {
                    if (e.pointerType !== 'mouse') return;
                    // Always clears first — this also cancels a still-pending
                    // delayed open when the pointer leaves during the wait.
                    clearTimeout(this._hoverTimer);
                    if (!this.isOpen) return;
                    this._hoverTimer = setTimeout(() => this.close(), 120);
                };
                this.trigger.addEventListener('pointerenter', hoverOpen, { signal });
                this.trigger.addEventListener('pointerleave', hoverClose, { signal });
                this.balloon.addEventListener('pointerenter', (e) => {
                    if (e.pointerType === 'mouse') clearTimeout(this._hoverTimer);
                }, { signal });
                this.balloon.addEventListener('pointerleave', hoverClose, { signal });

                this.trigger.addEventListener('click', (e) => {
                    // Only touch taps on a text term toggle. Every click on a
                    // link/button lets the action proceed and gets the balloon out
                    // of its way — a tap must not hijack a nav action or a link.
                    // Mouse clicks, keyboard-synthesized clicks (pointerType "") and
                    // MouseEvent clicks in browsers without pointer-typed click
                    // (pointerType undefined) on a term do nothing, so the balloon
                    // stays as it is.
                    if (e.pointerType !== 'touch' || !this._isTextTrigger) {
                        if (!this._isTextTrigger) this.close();
                        return;
                    }
                    e.preventDefault();
                    this.isOpen ? this.close() : this.open();
                }, { signal });

                // Sighted keyboard users: show on visible focus, drop on blur.
                this.trigger.addEventListener('focus', () => {
                    if (this.trigger.matches(':focus-visible')) this.open();
                }, { signal });
                this.trigger.addEventListener('blur', () => this.close(), { signal });
            } else {
                // Default: click-toggle for every input type.
                this.trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.isOpen ? this.close() : this.open();
                }, { signal });
            }

            this.trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    e.stopPropagation();
                    this.close();
                    this.trigger.focus();
                } else if (this._isTextTrigger && !this._hoverMode && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    this.isOpen ? this.close() : this.open();
                }
            }, { signal });
        }

        open() {
            if (this.isOpen) return;
            this.isOpen = true;

            // Only one tooltip open at a time
            if (_openTooltip && _openTooltip !== this) _openTooltip.close();
            _openTooltip = this;

            // Portal first so subsequent measurement happens in <body>'s
            // containing block, free of any container-type/transform ancestor.
            NDS.portal(this.balloon);

            if (!this._rootIsControl) addState(this.root, 'open');
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
            if (_openTooltip === this) _openTooltip = null;

            if (!this._rootIsControl) removeState(this.root, 'open');
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
            clearTimeout(this._hoverTimer);
            if (this.isOpen) this.close();
            if (this.abortController) { this.abortController.abort(); this.abortController = null; }
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
