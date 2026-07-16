/**
 * NDS Multiselect — UI-only chips + trigger label over a native checkbox
 * group. Checkboxes are the source of truth: each toggle commits
 * immediately, chips reflect the current checked set, and the browser
 * submits the checked checkboxes' name/value pairs directly. No draft
 * state, no hidden inputs, no Apply/commit ceremony.
 *
 * Options can be hand-written markup or populated (data-filter-values
 * precedent): `data-multiselect-options` takes a JSON array (value = label),
 * a {value: label} object, or a nested {legend: {value: label}} object for
 * grouped fieldsets; `data-multiselect-selected` pre-checks values.
 * `instance.populate(options, selected)` does the same at runtime.
 *
 * Commit timing: instant by default. A `[data-multiselect-action="apply"]`
 * footer button switches the field to filter-style staging — toggles inside
 * the open panel stay staged, Apply commits them (chips/event/announce), and
 * closing without Apply reverts the checkboxes to the last applied set. The
 * checkboxes stay the only form carrier in both modes.
 *
 * Event: `nds:multiselect:change` with { name, values, labels } on every
 * commit (each toggle when instant; Apply/chip-removal/reset when staged).
 */

(function () {
    'use strict';

    const STRINGS = {
        en: { none: 'No selection', added: 'Added',     removed: 'Removed',   cleared: 'Selection cleared', applied: 'Applied' },
        ar: { none: 'لا تحديد',     added: 'تمت إضافة', removed: 'تمت إزالة', cleared: 'تم مسح التحديد',    applied: 'تم تطبيق' }
    };
    const S = () => STRINGS[NDS.langKey];

    // Chips are buttons outside .nds-form-action, so the forms disabled hook
    // doesn't reach them — without this they stay tab-focusable (and removable)
    // on a disabled field.
    NDS.State.onAdd('disabled', '.nds-multiselect', el =>
        el.querySelectorAll('.nds-chip').forEach(c => { c.disabled = true; }));
    NDS.State.onRemove('disabled', '.nds-multiselect', el =>
        el.querySelectorAll('.nds-chip').forEach(c => { c.disabled = false; }));

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
            this.menu = this.dropmenu && this.dropmenu.querySelector('.nds-dropmenu-menu');
            this.resetBtn = root.querySelector('[data-multiselect-action="reset"]');
            this.applyBtn = root.querySelector('[data-multiselect-action="apply"]');
            // The Apply button IS the mode switch: present = filter-style
            // staged commit, absent = every toggle commits instantly.
            this.applyMode = !!this.applyBtn;

            if (!this.dropmenu || !this.menu || !this.formControl || !this.chipsEl) {
                console.warn('NDS Multiselect: missing required elements', root);
                return;
            }

            this.name = root.getAttribute('data-multiselect-name') || '';
            this.chipClass = root.getAttribute('data-chip-class') || 'nds-primary nds-sm';
            this.abortController = new AbortController();
            this.valid = true;
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
            // Declarative population — JSON attributes win over any
            // hand-written rows in the menu.
            const optionsAttr = this.root.getAttribute('data-multiselect-options');
            if (optionsAttr) {
                try {
                    const selectedAttr = this.root.getAttribute('data-multiselect-selected');
                    this._buildOptions(JSON.parse(optionsAttr), selectedAttr ? JSON.parse(selectedAttr) : []);
                } catch (err) {
                    console.warn('NDS Multiselect: invalid JSON in data-multiselect-options/-selected', this.root, err);
                }
            }
            this._collectCheckboxes();
            // Last committed values — the revert target when an apply-mode
            // panel closes without Apply.
            this.applied = this.getSelected();
            this.bindEvents();
            this.renderChips();
            this.root.setAttribute('data-nds-multiselect-initialized', 'true');
        }

        // Gather the option checkboxes and mirror data-multiselect-name onto
        // any missing a name, so the form submits an array (name="X[]").
        _collectCheckboxes() {
            this.checkboxes = Array.from(this.menu.querySelectorAll('input[type="checkbox"]'));
            if (this.name) {
                this.checkboxes.forEach(cb => {
                    if (!cb.name) cb.name = this.name + '[]';
                });
            }
        }

        // Normalize the accepted option shapes to [{ legend, options: [[value, label]] }].
        // Array → value doubles as label; flat object → one anonymous group;
        // all-object values → one fieldset per key with the key as legend.
        _normalizeOptions(raw) {
            if (Array.isArray(raw)) {
                return [{ legend: null, options: raw.map(v => [String(v), String(v)]) }];
            }
            const entries = Object.entries(raw);
            const grouped = entries.length && entries.every(([, v]) => v && typeof v === 'object');
            if (grouped) {
                return entries.map(([legend, opts]) => ({ legend, options: Object.entries(opts) }));
            }
            return [{ legend: null, options: entries }];
        }

        // Build the panel content into .nds-dropmenu-scroll (created before the
        // author's footer if absent), replacing whatever rows were there.
        _buildOptions(raw, selected) {
            const groups = this._normalizeOptions(raw);
            let scroll = this.menu.querySelector('.nds-dropmenu-scroll');
            if (!scroll) {
                scroll = document.createElement('div');
                scroll.className = 'nds-dropmenu-scroll';
                this.menu.prepend(scroll);
            }
            scroll.replaceChildren();

            groups.forEach((group, i) => {
                if (i) {
                    const divider = document.createElement('hr');
                    divider.className = 'nds-divider';
                    scroll.appendChild(divider);
                }
                const fieldset = document.createElement('fieldset');
                fieldset.className = 'nds-form-group nds-check-group nds-dropmenu-group';
                fieldset.setAttribute('data-no-auto-close', '');
                if (group.legend) {
                    const legend = document.createElement('legend');
                    legend.className = 'nds-label';
                    legend.textContent = group.legend;
                    fieldset.appendChild(legend);
                }
                group.options.forEach(([value, label]) => {
                    fieldset.appendChild(this._buildOptionRow(String(value), String(label), selected.includes(value)));
                });
                scroll.appendChild(fieldset);
            });
        }

        // One .nds-check-container row — same structure as the canonical
        // hand-written markup (and filter/tables' generated rows).
        _buildOptionRow(value, label, checked) {
            const id = NDS.uniqueId('nds-ms-');

            const container = document.createElement('div');
            container.className = 'nds-form-container nds-check-container';

            const header = document.createElement('div');
            header.className = 'nds-form-header';
            const labelEl = document.createElement('label');
            labelEl.setAttribute('for', id);
            const labelSpan = document.createElement('span');
            labelSpan.className = 'nds-label';
            labelSpan.textContent = label;
            labelEl.appendChild(labelSpan);
            header.appendChild(labelEl);

            const control = document.createElement('div');
            control.className = 'nds-form-control';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id;
            input.className = 'nds-check';
            input.value = value;
            input.dataset.label = label;
            input.checked = checked;
            control.appendChild(input);

            container.append(header, control);
            return container;
        }

        // Runtime population (fetch results, dependent fields). Same shapes as
        // data-multiselect-options; `selected` pre-checks values. Rebuilds the
        // rows and chips without emitting a change event — setup, not input.
        populate(options, selected) {
            this._buildOptions(options, selected || []);
            this._collectCheckboxes();
            this.applied = this.getSelected();
            this.renderChips();
        }

        bindEvents() {
            const { signal } = this.abortController;

            // ── Dropmenu lifecycle ──────────────────────────────────
            this.dropmenu.addEventListener('nds:dropmenu:opened', () => {
                NDS.State.add(this.root, 'focus');
            }, { signal });
            this.dropmenu.addEventListener('nds:dropmenu:closed', () => {
                NDS.State.remove(this.root, 'focus');
                // Apply mode: closing without Apply discards staged toggles.
                // No-op after Apply — it re-syncs `applied` before the close.
                if (this.applyMode) {
                    this.checkboxes.forEach(cb => { cb.checked = this.applied.includes(cb.value); });
                }
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

            // ── Checkbox change (delegated) ─────────────────────────
            // Each toggle commits immediately; chips + a11y summary refresh
            // live. One listener on the menu element survives populate()
            // rebuilding the rows and stays attached while the dropmenu
            // portals the menu to <body>.
            this.menu.addEventListener('change', (e) => {
                if (!e.target.matches('input[type="checkbox"]')) return;
                // Staged in apply mode — the native checkbox state change is
                // what the user perceives; commit happens on Apply.
                if (this.applyMode) return;
                this.renderChips();
                this.announceToggle(e.target);
                this.emitChange();
            }, { signal });

            // ── Surface-delegated open ──────────────────────────────
            // Click anywhere on the field opens the dropmenu. stopPropagation
            // is required because this click bubbles past the dropmenu host and
            // the dropmenu's outside-click handler would close what we just opened.
            const isDelegatedSurface = (target) =>
                !this.dropmenu.contains(target) && !target.closest('.nds-chip');

            this.root.addEventListener('click', (e) => {
                if (!isDelegatedSurface(e.target) || this.isOpen()) return;
                e.stopPropagation();
                // Focus first — a real trigger click focuses via mousedown, a
                // synthetic .click() doesn't. Without it focus stays on <body>
                // and keyboard flow (arrows, Escape-refocus) is dead.
                this.trigger?.focus();
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

            // ── Footer actions (optional) ───────────────────────────
            if (this.resetBtn) {
                this.resetBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.reset();
                }, { signal });
            }
            // No data-no-auto-close on Apply — the dropmenu closes it and
            // hands focus back to the trigger.
            if (this.applyBtn) {
                this.applyBtn.addEventListener('click', () => this.apply(), { signal });
            }

            // ── Submit guard (apply mode) ───────────────────────────
            // A submit racing the open panel (Enter key, requestSubmit, or
            // the async close gap after clicking Submit — the closed event
            // fires deferred) must post/validate the APPLIED set, not staged
            // toggles. Capture phase beats NDS.Forms' submit validation.
            const form = this.applyMode && this.root.closest('form');
            if (form) {
                form.addEventListener('submit', () => {
                    this.checkboxes.forEach(cb => { cb.checked = this.applied.includes(cb.value); });
                    if (this.isOpen()) this.dropmenu.ndsDropmenu?.close();
                }, { signal, capture: true });
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

        // Commit the current checked set: chips, a11y summary, change event.
        // In apply mode this is the Apply button's handler; callable directly
        // in either mode.
        apply() {
            this.applied = this.getSelected();
            this.renderChips();
            const labels = this.applied.map(v => this.labelFor(v));
            NDS.announce(labels.length ? S().applied + ' ' + labels.join(', ') : S().cleared);
            this.emitChange();
        }

        reset() {
            // Apply mode with the panel open: clear the STAGED set only —
            // Apply commits it, closing without Apply restores `applied`.
            if (this.applyMode && this.isOpen()) {
                this.checkboxes.forEach(cb => { cb.checked = false; });
                return;
            }
            const before = this.getSelected();
            this.checkboxes.forEach(cb => {
                if (cb.checked) cb.checked = false;
            });
            this.applied = [];
            this.renderChips();
            if (before.length) {
                NDS.announce(S().cleared);
                this.emitChange();
            }
        }

        removeValue(value) {
            const cb = this.checkboxes.find(c => c.value === value);
            if (!cb || !cb.checked) return;
            // Removing the focused chip would drop focus to <body>; hand it to
            // the chip that takes its slot, or back to the trigger.
            const chips = Array.from(this.chipsEl.children);
            const removedIdx = chips.indexOf(document.activeElement);
            cb.checked = false;
            this.applied = this.applied.filter(v => v !== value);
            this.renderChips();
            if (removedIdx > -1) {
                const remaining = this.chipsEl.children;
                (remaining[Math.min(removedIdx, remaining.length - 1)] || this.trigger)?.focus();
            }
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
            this.chipsEl.replaceChildren();
            selected.forEach(value => { this.chipsEl.appendChild(this.buildChip(value)); });
            NDS.State[selected.length ? 'add' : 'remove'](this.root, 'filled');

            if (this.trigger && this.triggerLabelOriginal) {
                const labels = selected.map(v => this.labelFor(v));
                const summary = labels.length ? labels.join(', ') : S().none;
                NDS.aria.label(this.trigger, this.triggerLabelOriginal + ': ' + summary);
            }
        }

        buildChip(value) {
            return NDS.buildChip(this.labelFor(value), {
                chipClass: this.chipClass,
                data: { multiselectValue: value },
                // Chips built while the field is disabled (init/reinit) — the
                // State hook above only covers runtime toggles.
                disabled: NDS.State.has(this.root, 'disabled'),
                onRemove: (e) => {
                    e.stopPropagation();
                    this.removeValue(value);
                },
            });
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
            const instance = new NDSMultiselect(el);
            // Expando only on successful construction — a bailed root must not hand
            // consumers a half-built instance (populate()/apply() would throw).
            if (instance.valid) el.ndsMultiselect = instance;
        });
    }

    NDS.Multiselect = {
        init: initializeMultiselects,
        reinit: initializeMultiselects,
        create: (element) => new NDSMultiselect(element),
        destroy: (element) => element.ndsMultiselect?.destroy()
    };
})();
