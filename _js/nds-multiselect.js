/**
 * NDS Multiselect — UI-only chips + trigger label over a native checkbox
 * group. Checkboxes are the source of truth: each toggle commits
 * immediately, chips reflect the current checked set, and the browser
 * submits the checked checkboxes' name/value pairs directly. No draft
 * state, no hidden inputs, no Apply/commit ceremony.
 *
 * Event: `nds:multiselect:change` with { name, values, labels } on every
 * checkbox toggle.
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
            this.abortController = new AbortController();
            this.init();
        }

        init() {
            // Multiselect menus read as an extension of the field, so line them
            // up with the field's start edge instead of the default centered
            // anchor. Author can override with data-anchor="center|end".
            if (!this.dropmenu.hasAttribute('data-anchor')) {
                this.dropmenu.setAttribute('data-anchor', 'start');
            }
            // Soft dependency — NDS.Dropmenu ships in the main bundle (present
            // during the critical pass), so this normally runs; the guard just keeps
            // the unbuilt-but-functional fallback if it's ever absent.
            if (NDS.Dropmenu && !this.dropmenu.ndsDropmenu) NDS.Dropmenu.create(this.dropmenu);
            this.triggerLabelOriginal = (
                this.trigger?.querySelector('.nds-label')?.textContent || ''
            ).trim();
            // If author provided data-multiselect-name, mirror it onto each
            // option checkbox so the form submits an array (name="X[]").
            if (this.name) {
                this.checkboxes.forEach(cb => {
                    if (!cb.name) cb.name = this.name + '[]';
                });
            }
            this.bindEvents();
            this.renderChips();
            this.root.setAttribute('data-nds-multiselect-initialized', 'true');
        }

        bindEvents() {
            const { signal } = this.abortController;

            // ── Dropmenu lifecycle ──────────────────────────────────
            this.dropmenu.addEventListener('nds:dropmenu:opened', () => {
                NDS.State.add(this.root, 'focus');
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
            // Each toggle commits immediately; chips + a11y summary refresh live.
            this.checkboxes.forEach(cb => {
                cb.addEventListener('change', () => {
                    this.renderChips();
                    this.announceToggle(cb);
                    this.emitChange();
                }, { signal });
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

            // ── Reset button (optional) ─────────────────────────────
            // Unchecks every option and fires each checkbox's own change event,
            // so chips/announce/emit all flow through the standard handler.
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

        getSelected() {
            return this.checkboxes.filter(cb => cb.checked).map(cb => cb.value);
        }

        reset() {
            const before = this.getSelected();
            this.checkboxes.forEach(cb => {
                if (cb.checked) cb.checked = false;
            });
            this.renderChips();
            if (before.length) {
                NDS.announce(S().cleared);
                this.emitChange();
            }
        }

        removeValue(value) {
            const cb = this.checkboxes.find(c => c.value === value);
            if (!cb || !cb.checked) return;
            cb.checked = false;
            this.renderChips();
            NDS.announce(S().removed + ' ' + this.labelFor(value));
            this.emitChange();
        }

        announceToggle(cb) {
            const s = S();
            NDS.announce((cb.checked ? s.added : s.removed) + ' ' + this.labelFor(cb.value));
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
            const selected = this.getSelected();
            while (this.chipsEl.firstChild) this.chipsEl.removeChild(this.chipsEl.firstChild);
            selected.forEach(value => { this.chipsEl.appendChild(this.buildChip(value)); });
            NDS.State[selected.length ? 'add' : 'remove'](this.root, 'filled');

            if (this.trigger && this.triggerLabelOriginal) {
                const labels = selected.map(v => this.labelFor(v));
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

        emitChange() {
            const values = this.getSelected();
            this.root.dispatchEvent(new CustomEvent('nds:multiselect:change', {
                detail: {
                    name: this.name,
                    values: values,
                    labels: values.map(v => this.labelFor(v))
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
