/**
 * NDS Multiselect — multi-option select built on top of .nds-dropmenu.
 *
 * Semantics: toggling stages into Draft; Apply commits Draft → Applied;
 * Reset clears Draft only; closing without Apply discards Draft; removing
 * a chip drops from both sets immediately.
 *
 * Event: `nds:multiselect:change` with { name, values, labels } on commit.
 */

(function () {
    'use strict';

    const STRINGS = {
        en: { none: 'No selection', added: 'Added',     removed: 'Removed',   cleared: 'Selection cleared' },
        ar: { none: 'لا تحديد',     added: 'تمت إضافة', removed: 'تمت إزالة', cleared: 'تم مسح التحديد' }
    };
    const S = () => STRINGS[NDS.langKey];

    class NDSMultiselect {
        constructor(root) {
            this.root = root;
            if (root.hasAttribute('data-nds-multiselect-initialized')) return;

            this.dropmenu = root.querySelector('[data-multiselect-dropmenu]')
                || root.querySelector('.nds-form-action.nds-prefix.nds-dropmenu');
            this.formControl = root.querySelector('.nds-form-control');
            this.chipsEl = root.querySelector('[data-multiselect-chips]')
                || root.querySelector('.nds-multiselect-chips');
            this.trigger = this.dropmenu && this.dropmenu.querySelector('.nds-dropmenu-trigger');
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
            this.abortController = new AbortController();
            this.init();
        }

        init() {
            if (!this.dropmenu.ndsDropmenu) NDS.Dropmenu.create(this.dropmenu);
            this.triggerLabelOriginal = (
                this.trigger?.querySelector('.nds-label')?.textContent || ''
            ).trim();
            this.ensureValuesContainer();
            this.seedFromMarkup();
            this.bindEvents();
            this.renderChips();
            this.renderHiddenInputs();
            this.root.setAttribute('data-nds-multiselect-initialized', 'true');
        }

        // Hidden-input host lives inside form-control so values post with any wrapping <form>.
        ensureValuesContainer() {
            let container = this.root.querySelector('.nds-multiselect-values');
            if (!container) {
                container = document.createElement('div');
                container.className = 'nds-multiselect-values';
                this.formControl.appendChild(container);
            }
            this.valuesEl = container;
        }

        // Seed Applied from (1) pre-existing hidden inputs (server-rendered restore),
        // (2) pre-checked checkboxes. Orphan values are dropped.
        seedFromMarkup() {
            const validValues = new Set(this.checkboxes.map(cb => cb.value));
            const seeded = [];

            if (this.name) {
                const escaped = CSS.escape(this.name);
                this.formControl.querySelectorAll(
                    `input[type="hidden"][name="${escaped}[]"], input[type="hidden"][name="${escaped}"]`
                ).forEach(h => {
                    if (h.value && validValues.has(h.value) && !seeded.includes(h.value)) {
                        seeded.push(h.value);
                    }
                    h.remove();
                });
            }

            this.checkboxes.forEach(cb => {
                if (cb.checked && !seeded.includes(cb.value)) seeded.push(cb.value);
            });

            this.applied = seeded;
            this.draft = seeded.slice();
            this._syncCheckboxes();
        }

        // Mirror this.applied onto the DOM checkboxes — called whenever the
        // committed selection changes shape (seed, panel re-open).
        _syncCheckboxes() {
            this.checkboxes.forEach(cb => { cb.checked = this.applied.includes(cb.value); });
        }

        bindEvents() {
            const { signal } = this.abortController;

            // ── Dropmenu lifecycle ──────────────────────────────────
            this.dropmenu.addEventListener('nds:dropmenu:opened', () => {
                NDS.State.add(this.root, 'focus');
                this.openSync();
            }, { signal });
            this.dropmenu.addEventListener('nds:dropmenu:closed', () => {
                NDS.State.remove(this.root, 'focus');
            }, { signal });

            // ── Trigger interaction states ──────────────────────────
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
                    // Keep focus state while the panel is open — user is in the panel.
                    if (!this.isOpen()) NDS.State.remove(this.root, 'focus');
                }, { signal });
            }

            // ── Checkbox change ─────────────────────────────────────
            this.checkboxes.forEach(cb => {
                cb.addEventListener('change', () => this.handleCheckboxChange(cb), { signal });
            });

            // ── Surface-delegated open ──────────────────────────────
            // Click anywhere on the field opens the dropmenu. stopPropagation
            // is required because this click bubbles past the dropmenu host and
            // the dropmenu's outside-click handler would close what we just opened.
            const isDelegatedSurface = (target) =>
                !this.dropmenu.contains(target) && !target.closest('.nds-chip');

            this.root.addEventListener('click', (e) => {
                if (!isDelegatedSurface(e.target) || this.isOpen()) return;
                e.stopPropagation();
                this.trigger?.click();
            }, { signal });

            this.root.addEventListener('mousedown', (e) => {
                if (!isDelegatedSurface(e.target)) return;
                NDS.State.add(this.root, 'active');
            }, { signal });
            ['mouseup', 'mouseleave'].forEach(evt => {
                this.root.addEventListener(evt, () => {
                    NDS.State.remove(this.root, 'active');
                }, { signal });
            });

            // ── Action buttons ──────────────────────────────────────
            if (this.applyBtn) {
                // Tag as dropmenu's primary action so Enter inside the panel triggers Apply.
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
            this.abortController?.abort();
            NDS.aria.label(this.trigger, '');
            this.root.removeAttribute('data-nds-multiselect-initialized');
        }

        isOpen() {
            return NDS.State.has(this.dropmenu, 'open');
        }

        // Re-sync panel to Applied on every open — discards uncommitted draft from prior session.
        openSync() {
            this.draft = this.applied.slice();
            this._syncCheckboxes();
        }

        handleCheckboxChange(cb) {
            if (cb.checked) {
                if (!this.draft.includes(cb.value)) this.draft.push(cb.value);
            } else {
                this.draft = this.draft.filter(v => v !== cb.value);
            }
        }

        apply() {
            const before = new Set(this.applied);
            this.applied = this.draft.slice();
            this.renderChips();
            this.renderHiddenInputs();
            this.emitChange();

            const added   = this.applied.filter(v => !before.has(v));
            const removed = [...before].filter(v => !this.applied.includes(v));
            const s = S();
            const parts = [];
            if (added.length)   parts.push(s.added   + ' ' + added  .map(v => this.labelFor(v)).join(', '));
            if (removed.length) parts.push(s.removed + ' ' + removed.map(v => this.labelFor(v)).join(', '));
            if (parts.length) NDS.announce(parts.join('. '));
            else if (before.size > 0 && this.applied.length === 0) NDS.announce(s.cleared);
        }

        // Reset clears the panel only — Applied stays put until Apply.
        reset() {
            this.checkboxes.forEach(cb => { cb.checked = false; });
            this.draft = [];
        }

        removeValue(value) {
            const label = this.labelFor(value);
            this.applied = this.applied.filter(v => v !== value);
            this.draft = this.draft.filter(v => v !== value);
            const cb = this.checkboxes.find(c => c.value === value);
            if (cb) cb.checked = false;
            this.renderChips();
            this.renderHiddenInputs();
            this.emitChange();
            NDS.announce(S().removed + ' ' + label);
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
            this.applied.forEach(value => { this.chipsEl.appendChild(this.buildChip(value)); });
            NDS.State[this.applied.length ? 'add' : 'remove'](this.root, 'filled');

            if (this.trigger && this.triggerLabelOriginal) {
                const labels = this.applied.map(v => this.labelFor(v));
                const summary = labels.length ? labels.join(', ') : S().none;
                NDS.aria.label(this.trigger, this.triggerLabelOriginal + ': ' + summary);
            }
        }

        buildChip(value) {
            const chip = document.createElement('button');
            chip.className = 'nds-chip ' + this.chipClass;
            chip.type = 'button';
            chip.dataset.multiselectValue = value;

            const icon = document.createElement('i');
            icon.className = 'nds-icon nds-hgi-cancel-01';
            NDS.aria.hidden(icon, true);

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
