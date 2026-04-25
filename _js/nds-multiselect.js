/**
 * NDS Multiselect Component
 * Multi-option select built on top of an existing prefix .nds-dropmenu.
 *
 * Markup contract:
 *   <div class="nds-form-container nds-multiselect" data-multiselect-name="...">
 *     <div class="nds-form-control">
 *       <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
 *         <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger">…</button>
 *         <div class="nds-dropmenu-menu" hidden>
 *           <div class="nds-dropmenu-scroll">
 *             <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
 *               <legend class="nds-label">Group A</legend>
 *               <div class="nds-form-container nds-check-container">
 *                 <div class="nds-form-header">
 *                   <label for="opt-a1"><span class="nds-label">Option A1</span></label>
 *                 </div>
 *                 <div class="nds-form-control">
 *                   <input type="checkbox" id="opt-a1" class="nds-check"
 *                          value="a1" data-label="Option A1">
 *                 </div>
 *               </div>
 *               …
 *             </fieldset>
 *           </div>
 *           <div class="nds-dropmenu-footer">
 *             <hr class="nds-divider">
 *             <div class="nds-dropmenu-action nds-grid">
 *               <button class="nds-btn nds-secondary nds-dropmenu-item"
 *                       data-multiselect-action="reset" data-no-auto-close>Reset</button>
 *               <button class="nds-btn nds-primary nds-dropmenu-item"
 *                       data-multiselect-action="apply">Apply</button>
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *       <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
 *       <span class="nds-multiselect-placeholder">Select options…</span>
 *     </div>
 *     <div class="nds-form-footer" data-feedback-target hidden></div>
 *   </div>
 *
 * Selection semantics (filter-dropmenu pattern):
 *   - Toggling a checkbox stages the change in the per-instance Draft set.
 *   - Apply commits Draft → Applied; chips render; hidden inputs ship.
 *   - Reset clears the panel (Draft = []); Applied is untouched until Apply.
 *   - Closing the panel without Apply discards the Draft (reset on next open).
 *   - Removing a chip drops the value from both Applied and Draft and fires
 *     `nds:multiselect:change` immediately.
 *
 * Events: dispatches `nds:multiselect:change` with detail
 *   { name, values, labels } whenever Applied changes.
 */

(function () {
    'use strict';

    class NDSMultiselect {
        constructor(root) {
            this.root = root;
            if (root.hasAttribute('data-nds-multiselect-initialized')) return;

            this.dropmenu = root.querySelector('[data-multiselect-dropmenu]')
                || root.querySelector('.nds-form-action.nds-prefix.nds-dropmenu');
            this.formControl = root.querySelector('.nds-form-control');
            this.chipsEl = root.querySelector('[data-multiselect-chips]')
                || root.querySelector('.nds-multiselect-chips');
            this.trigger = this.dropmenu
                && this.dropmenu.querySelector('.nds-dropmenu-trigger');
            this.applyBtn = root.querySelector('[data-multiselect-action="apply"]');
            this.resetBtn = root.querySelector('[data-multiselect-action="reset"]');
            this.checkboxes = Array.from(
                root.querySelectorAll('.nds-dropmenu-menu input[type="checkbox"]')
            );

            if (!this.dropmenu || !this.formControl || !this.chipsEl) {
                console.warn('NDS Multiselect: missing required elements', root);
                return;
            }

            this.name = root.getAttribute('data-multiselect-name') || '';
            this.chipClass = root.getAttribute('data-chip-class') || 'nds-primary nds-sm';

            this.applied = [];
            this.draft = [];

            this._ac = new AbortController();
            this.init();
        }

        init() {
            if (!this.dropmenu.ndsDropmenu) NDS.Dropmenu?.create?.(this.dropmenu);
            this.ensureValuesContainer();
            this.seedFromMarkup();
            this.bindEvents();
            this.renderChips();
            this.renderHiddenInputs();
            this.root.setAttribute('data-nds-multiselect-initialized', 'true');
        }

        // The hidden-input host. Lives inside the form-control so the rendered
        // <input type="hidden"> values ship with any wrapping <form>.
        ensureValuesContainer() {
            let container = this.root.querySelector('.nds-multiselect-values');
            if (!container) {
                container = document.createElement('div');
                container.className = 'nds-multiselect-values';
                this.formControl.appendChild(container);
            }
            this.valuesEl = container;
        }

        seedFromMarkup() {
            this.applied = this.checkboxes
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            this.draft = this.applied.slice();
        }

        bindEvents() {
            const { signal } = this._ac;

            // Mirror the focus/active visual states that nds-forms.js wires up
            // from native input focus/mousedown. Multiselect has no input in
            // the form-control — the interaction happens on the trigger button
            // and the dropmenu panel — so we drive those states manually here.
            // `active` is held only while the pointer is pressed on the
            // trigger (matches forms.js). `focus` stays on while the panel is
            // open so that clicking a checkbox inside doesn't visually blur.
            this.dropmenu.addEventListener('nds:dropmenu:opened', () => {
                NDS.State.add(this.root, 'focus');
                this.openSync();
            }, { signal });
            this.dropmenu.addEventListener('nds:dropmenu:closed', () => {
                NDS.State.remove(this.root, 'focus');
            }, { signal });

            if (this.trigger) {
                this.trigger.addEventListener('mousedown', () => {
                    NDS.State.add(this.root, 'active');
                }, { signal });
                ['mouseup', 'mouseleave'].forEach(evt => {
                    this.trigger.addEventListener(evt, () => {
                        NDS.State.remove(this.root, 'active');
                    }, { signal });
                });
                this.trigger.addEventListener('focus', () => {
                    NDS.State.add(this.root, 'focus');
                }, { signal });
                this.trigger.addEventListener('blur', () => {
                    // Don't clear focus while the panel is open — the user is
                    // interacting with checkboxes/actions inside it.
                    if (!this.isOpen()) NDS.State.remove(this.root, 'focus');
                }, { signal });
            }

            this.checkboxes.forEach(cb => {
                cb.addEventListener('change', () => this.handleCheckboxChange(cb), { signal });
            });

            // Click anywhere on the form-container opens the dropmenu, so
            // the whole field reads as one interactive surface. Exclusions:
            //   - the dropmenu itself (trigger + panel drive their own logic)
            //   - chips (own click removes the value, stopPropagation belt+braces)
            //   - when the panel is already open (avoid toggle-closing on stray clicks)
            // stopPropagation is needed because the dropmenu's document-level
            // outside-click handler would otherwise see this click bubble past
            // the dropmenu (its host form-container isn't inside this.dropmenu)
            // and immediately close the menu we just opened.
            const isDelegatedSurface = (target) =>
                !this.dropmenu.contains(target) && !target.closest('.nds-chip');

            this.root.addEventListener('click', (e) => {
                if (!isDelegatedSurface(e.target)) return;
                if (this.isOpen()) return;
                e.stopPropagation();
                this.trigger?.click();
            }, { signal });

            // Mirror the trigger's press feedback on the whole surface so
            // holding the mouse down anywhere on the field feels the same
            // as pressing the trigger button.
            this.root.addEventListener('mousedown', (e) => {
                if (!isDelegatedSurface(e.target)) return;
                NDS.State.add(this.root, 'active');
            }, { signal });
            ['mouseup', 'mouseleave'].forEach(evt => {
                this.root.addEventListener(evt, () => {
                    NDS.State.remove(this.root, 'active');
                }, { signal });
            });

            if (this.applyBtn) {
                // Tag as the dropmenu's primary action so Enter inside the
                // panel triggers Apply (generic dropmenu behavior).
                this.applyBtn.setAttribute('data-dropmenu-primary', '');
                this.applyBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.apply();
                }, { signal });
            }

            if (this.resetBtn) {
                this.resetBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.reset();
                }, { signal });
            }
        }

        destroy() {
            this._ac?.abort();
            this.root.removeAttribute('data-nds-multiselect-initialized');
        }

        isOpen() {
            return this.dropmenu.matches('[data-state~="open"]');
        }

        // Re-sync the panel's checkbox visuals to the committed Applied set on
        // every open, discarding any uncommitted draft from a previous session.
        openSync() {
            this.draft = this.applied.slice();
            this.checkboxes.forEach(cb => {
                cb.checked = this.applied.includes(cb.value);
            });
        }

        handleCheckboxChange(cb) {
            if (cb.checked) {
                if (!this.draft.includes(cb.value)) this.draft.push(cb.value);
            } else {
                this.draft = this.draft.filter(v => v !== cb.value);
            }
        }

        apply() {
            this.applied = this.draft.slice();
            this.renderChips();
            this.renderHiddenInputs();
            this.emitChange();
        }

        // Reset clears the panel only — Applied stays put until the user Applies.
        reset() {
            this.checkboxes.forEach(cb => { cb.checked = false; });
            this.draft = [];
        }

        removeValue(value) {
            this.applied = this.applied.filter(v => v !== value);
            this.draft = this.draft.filter(v => v !== value);
            const cb = this.checkboxes.find(c => c.value === value);
            if (cb) cb.checked = false;
            this.renderChips();
            this.renderHiddenInputs();
            this.emitChange();
        }

        labelFor(value) {
            const cb = this.checkboxes.find(c => c.value === value);
            if (!cb) return value;
            if (cb.dataset.label) return cb.dataset.label;
            const row = cb.closest('.nds-form-container') || cb.parentElement;
            const label = row && row.querySelector('.nds-form-header .nds-label, .nds-label');
            return label ? label.textContent.trim() : value;
        }

        renderChips() {
            while (this.chipsEl.firstChild) this.chipsEl.removeChild(this.chipsEl.firstChild);
            this.applied.forEach(value => {
                this.chipsEl.appendChild(this.buildChip(value));
            });
            if (this.applied.length) {
                NDS.State.add(this.root, 'filled');
            } else {
                NDS.State.remove(this.root, 'filled');
            }
        }

        buildChip(value) {
            const chip = document.createElement('button');
            chip.className = 'nds-chip ' + this.chipClass;
            chip.type = 'button';
            chip.dataset.multiselectValue = value;

            const icon = document.createElement('i');
            icon.className = 'nds-icon nds-hgi-cancel-01';
            icon.setAttribute('aria-hidden', 'true');

            const label = document.createElement('span');
            label.className = 'nds-label';
            label.textContent = this.labelFor(value);

            chip.append(label, icon);
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.removeValue(value);
            });
            return chip;
        }

        renderHiddenInputs() {
            if (!this.name) return;
            while (this.valuesEl.firstChild) this.valuesEl.removeChild(this.valuesEl.firstChild);
            this.applied.forEach(value => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = this.name + '[]';
                input.value = value;
                this.valuesEl.appendChild(input);
            });
        }

        emitChange() {
            this.root.dispatchEvent(new CustomEvent('nds:multiselect:change', {
                detail: {
                    name: this.name,
                    values: this.applied.slice(),
                    labels: this.applied.map(v => this.labelFor(v))
                },
                bubbles: true
            }));
        }
    }

    function initializeMultiselects() {
        document.querySelectorAll('.nds-multiselect').forEach(el => {
            if (el.closest('code, .code-example')) return;
            if (el.hasAttribute('data-nds-multiselect-initialized')) return;
            el.ndsMultiselect = new NDSMultiselect(el);
        });
    }

    if (typeof window !== 'undefined') {
        window.NDS = window.NDS || {};
        NDS.Multiselect = {
            init: initializeMultiselects,
            reinit: initializeMultiselects,
            create: (element) => new NDSMultiselect(element),
            destroy: (element) => element.ndsMultiselect?.destroy()
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSMultiselect;
    }
})();
