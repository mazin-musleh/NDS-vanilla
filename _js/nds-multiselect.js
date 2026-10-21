/* NDS.Multiselect — public surface
 * Rides: nds-dropmenu (top layer, positioning, search, auto-close knobs; soft — works without it)
 *      · nds-forms (required + min/max validation, disabled state)
 * Methods:
 *   NDS.Multiselect.init() / .reinit()   scan + initialize .nds-multiselect fields
 *   NDS.Multiselect.create(el)           instance one field (reuses an existing instance)
 *   NDS.Multiselect.validate(el, opts)   its check → {valid, message, checked, min, max}; opts {showMessage}
 *   NDS.Multiselect.destroy(el)          tear one field down
 *   instance.renderOptions(options, selected) rebuild the option set at runtime
 *   instance.getSelected()               the picked values
 *   instance.commit() / .reset()         commit the menu's picks / clear them
 *   instance.removeValue(value)          unpick one value
 * Events (bubble from .nds-multiselect):
 *   nds:multiselect:change   detail {name, values, labels} — on every commit
 * Hooks:
 *   data-multiselect-name · data-multiselect-options · data-multiselect-selected
 *   data-multiselect-action="apply|reset" · data-multiselect-dropmenu · data-multiselect-chips
 *   data-chip-class
 * Gotchas:
 *   - The checkboxes are the form carrier — no hidden inputs; read them, not the chips.
 *   - Default commit is instant; a [data-multiselect-action="apply"] button switches the
 *     field to staged mode, where closing without Apply reverts the checkboxes.
 */

/**
 * NDS Multiselect — UI-only chips + trigger label over a native checkbox
 * group. Checkboxes are the source of truth: each toggle commits
 * immediately (unless an Apply button stages them), chips reflect the
 * checked set, and the browser submits the checked checkboxes' name/value
 * pairs directly. No hidden inputs.
 *
 * Options can be hand-written markup or populated (data-filter-values
 * precedent): `data-multiselect-options` takes a JSON array (value = label),
 * a {value: label} object, or a nested {legend: {value: label}} object for
 * grouped fieldsets; `data-multiselect-selected` pre-checks values.
 * `instance.renderOptions(options, selected)` does the same at runtime.
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

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('multiselect', {
        none: '{label}: No selection',
        added: 'Added {value}',
        removed: 'Removed {value}',
        cleared: 'Selection cleared',
        applied: 'Applied {value}',
    });

    class NdsMultiselect {
        constructor(root) {
            this._root = root;
            if (root.hasAttribute('data-nds-multiselect-initialized')) return;

            this._dropmenu = root.querySelector('[data-multiselect-dropmenu]')
                || root.querySelector('.nds-form-action.nds-prefix.nds-dropmenu');
            this._formControl = root.querySelector('.nds-form-control');
            this._chipsElement = root.querySelector('[data-multiselect-chips]')
                || root.querySelector('.nds-multiselect-chips');
            this._trigger = this._dropmenu && this._dropmenu.querySelector('.nds-dropmenu-trigger');
            this._menu = this._dropmenu && this._dropmenu.querySelector('.nds-dropmenu-menu');
            this._resetButton = root.querySelector('[data-multiselect-action="reset"]');
            this._applyButton = root.querySelector('[data-multiselect-action="apply"]');
            // The Apply button IS the mode switch: present = filter-style
            // staged commit, absent = every toggle commits instantly.
            this._applyMode = !!this._applyButton;

            if (!this._dropmenu || !this._menu || !this._formControl || !this._chipsElement) {
                console.warn('NDS Multiselect: missing required elements', root);
                return;
            }
            // Rule: every owned menu names itself.
            this._ownMenuClass = !this._menu.classList.contains('nds-multiselect-menu');
            this._menu.classList.add('nds-multiselect-menu');

            this._name = root.getAttribute('data-multiselect-name') || '';
            this._chipClass = root.getAttribute('data-chip-class') || 'nds-primary nds-sm';
            this.abortController = new AbortController();
            this._valid = true;
            this.init();
        }

        init() {
            // Multiselect menus read as an extension of the field, so line them
            // up with the field's start edge instead of the default centered
            // anchor. Author can override with data-anchor="center|end".
            // Written here, not through Dropmenu.create's options: the page sweep may have built the menu already.
            this._ownAnchor = !this._dropmenu.hasAttribute('data-anchor');
            if (this._ownAnchor) this._dropmenu.setAttribute('data-anchor', 'start');
            // destroy() takes the menu down only when this built it.
            this._ownDropmenu = !this._dropmenu.ndsDropmenu;
            if (this._ownDropmenu) NDS.Dropmenu.create(this._dropmenu);
            // An icon-only trigger names itself in aria-label: read it, and give it back on destroy().
            this._triggerAriaOriginal = this._trigger?.getAttribute('aria-label') || '';
            this._triggerLabelOriginal = (
                this._trigger?.querySelector('.nds-label')?.textContent || this._triggerAriaOriginal
            ).trim();
            // Declarative population — JSON attributes win over any
            // hand-written rows in the menu.
            const optionsJson = this._root.getAttribute('data-multiselect-options');
            if (optionsJson) {
                try {
                    const selectedJson = this._root.getAttribute('data-multiselect-selected');
                    this._buildOptions(JSON.parse(optionsJson), selectedJson ? JSON.parse(selectedJson) : []);
                } catch (error) {
                    console.warn('NDS Multiselect: invalid JSON in data-multiselect-options/-selected', this._root, error);
                }
            }
            this._collectCheckboxes();
            // Last committed values — the revert target when an apply-mode
            // panel closes without Apply.
            this._applied = this.getSelected();
            this._addEventListeners();
            this._renderChips();
            // A narrow field wraps the trigger onto its own top row, a shape only
            // layout can see; CSS rounds the trigger's corners for it.
            this._offStacked = NDS.onElementResize(this._formControl, () => {
                const stacked = this._dropmenu.offsetHeight < this._formControl.clientHeight - 1;
                return () => this._formControl.toggleAttribute('data-multiselect-stacked', stacked);
            });
            this._root.setAttribute('data-nds-multiselect-initialized', 'true');
            // Registered here (not the sweep) so create()-made instances get the
            // expando too — init() only runs on successful construction.
            this._root.ndsMultiselect = this;
        }

        // Gather the option checkboxes and mirror data-multiselect-name onto
        // any missing a name, so the form submits an array (name="X[]").
        _collectCheckboxes() {
            this._checkboxes = Array.from(this._menu.querySelectorAll('input[type="checkbox"]'));
            if (this._name) {
                this._checkboxes.forEach(checkbox => {
                    if (!checkbox.name) checkbox.name = this._name + '[]';
                });
            }
        }

        // Normalize the accepted option shapes to [{ legend, options: [[value, label]] }].
        // Array → value doubles as label; flat object → one anonymous group;
        // all-object values → one fieldset per key with the key as legend.
        _normalizeOptions(raw) {
            if (Array.isArray(raw)) {
                return [{ legend: null, options: raw.map(value => [String(value), String(value)]) }];
            }
            const entries = Object.entries(raw);
            const grouped = entries.length && entries.every(([, value]) => value && typeof value === 'object');
            if (grouped) {
                return entries.map(([legend, opts]) => ({ legend, options: Object.entries(opts) }));
            }
            return [{ legend: null, options: entries }];
        }

        // Build the panel content into .nds-dropmenu-scroll (created before the
        // author's footer if absent), replacing whatever rows were there.
        _buildOptions(raw, selected) {
            const groups = this._normalizeOptions(raw);
            let scroll = this._menu.querySelector('.nds-dropmenu-scroll');
            if (!scroll) {
                scroll = document.createElement('div');
                scroll.className = 'nds-dropmenu-scroll';
                this._menu.prepend(scroll);
            }
            scroll.replaceChildren();

            groups.forEach((group, i) => {
                if (i) {
                    const divider = document.createElement('hr');
                    divider.className = 'nds-divider';
                    scroll.appendChild(divider);
                }
                const fieldset = document.createElement('fieldset');
                fieldset.className = 'nds-form-group nds-checkbox-group nds-dropmenu-group';
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

        // One .nds-checkbox row — same structure as the canonical
        // hand-written markup (and filter/tables' generated rows).
        _buildOptionRow(value, label, checked) {
            const id = NDS.getUniqueId('nds-ms-');

            const container = document.createElement('div');
            container.className = 'nds-form-container nds-checkbox';
            if (this._dropmenu.hasAttribute('data-search')) {
                container.setAttribute('data-search-item', '');
            }

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
            input.className = 'nds-checkbox-input';
            input.value = value;
            input.dataset.label = label;
            // The default too: a form reset brings the pre-selected values back.
            input.defaultChecked = checked;
            control.appendChild(input);

            container.append(header, control);
            return container;
        }

        // Runtime population (fetch results, dependent fields). Same shapes as
        // data-multiselect-options; `selected` pre-checks values. Rebuilds the
        // rows and chips without emitting a change event — setup, not input.
        renderOptions(options, selected) {
            this._buildOptions(options, selected || []);
            this._collectCheckboxes();
            this._applied = this.getSelected();
            this._renderChips();
        }

        _addEventListeners() {
            const { signal } = this.abortController;

            // ── Dropmenu lifecycle ──────────────────────────────────
            this._dropmenu.addEventListener('nds:dropmenu:opened', () => {
                NDS.state.add(this._root, 'focus');
            }, { signal });
            this._dropmenu.addEventListener('nds:dropmenu:closed', () => {
                // A close by Escape hands focus back to the trigger, which keeps the focus state.
                if (document.activeElement !== this._trigger) NDS.state.remove(this._root, 'focus');
                // Apply mode: closing without Apply discards staged toggles.
                // No-op after Apply — it re-syncs `applied` before the close.
                if (this._applyMode) this._dropStaged();
            }, { signal });

            // ── Trigger interaction states ──────────────────────────
            if (this._trigger) {
                this._trigger.addEventListener('mousedown', () => {
                    NDS.state.add(this._root, 'active');
                }, { signal });
                ['mouseup', 'mouseleave'].forEach(eventName => {
                    this._trigger.addEventListener(eventName, () => {
                        NDS.state.remove(this._root, 'active');
                    }, { signal });
                });
                this._trigger.addEventListener('focus', () => {
                    NDS.state.add(this._root, 'focus');
                }, { signal });
                this._trigger.addEventListener('blur', () => {
                    // Keep focus state while the panel is open — user is in the panel.
                    if (!this._isOpen()) NDS.state.remove(this._root, 'focus');
                }, { signal });
            }

            // ── Checkbox change (delegated) ─────────────────────────
            // Each toggle commits immediately; chips + a11y summary refresh
            // live. One listener on the menu element survives renderOptions()
            // rebuilding the rows.
            this._menu.addEventListener('change', (e) => {
                if (!e.target.matches('input[type="checkbox"]')) return;
                // Staged in apply mode — the native checkbox state change is
                // what the user perceives; commit happens on Apply.
                if (this._applyMode) return;
                this._renderChips();
                this._announceToggle(e.target);
                this._dispatchChange();
            }, { signal });

            // ── Surface-delegated open ──────────────────────────────
            // Click anywhere on the field opens the dropmenu. stopPropagation
            // is required because this click bubbles past the dropmenu host and
            // the dropmenu's outside-click handler would close what we just opened.
            const isDelegatedSurface = (target) =>
                !this._dropmenu.contains(target) && !target.closest('.nds-chip');

            this._root.addEventListener('click', (e) => {
                if (!isDelegatedSurface(e.target) || this._isOpen()) return;
                e.stopPropagation();
                // Focus first — a real trigger click focuses via mousedown, a
                // synthetic .click() doesn't. Without it focus stays on <body>
                // and keyboard flow (arrows, Escape-refocus) is dead.
                this._trigger?.focus();
                this._trigger?.click();
            }, { signal });

            this._root.addEventListener('mousedown', (e) => {
                if (!isDelegatedSurface(e.target)) return;
                NDS.state.add(this._root, 'active');
            }, { signal });
            ['mouseup', 'mouseleave'].forEach(eventName => {
                this._root.addEventListener(eventName, () => {
                    NDS.state.remove(this._root, 'active');
                }, { signal });
            });

            // ── Footer actions (optional) ───────────────────────────
            if (this._resetButton) {
                this._resetButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this._isReadonly()) return;
                    this.reset();
                }, { signal });
            }
            // No data-no-auto-close on Apply — the dropmenu closes it and
            // hands focus back to the trigger.
            if (this._applyButton) {
                this._applyButton.addEventListener('click', () => this.commit(), { signal });
            }

            // A form reset ticks the boxes back without a change event.
            NDS.field.onReset(this._root.closest('form'), () => {
                this._applied = this.getSelected();
                this._renderChips();
            }, { signal });

            // ── Submit guard (apply mode) ───────────────────────────
            // A submit racing the open panel (Enter key, requestSubmit, or
            // the async close gap after clicking Submit — the closed event
            // fires deferred) must post/validate the APPLIED set, not staged
            // toggles. Capture phase beats NDS.Form's submit validation.
            const form = this._applyMode && this._root.closest('form');
            if (form) {
                form.addEventListener('submit', () => {
                    this._dropStaged();
                    if (this._isOpen()) this._dropmenu.ndsDropmenu?.close();
                }, { signal, capture: true });
            }
        }

        destroy() {
            this.abortController?.abort();
            this._offStacked?.();
            this._formControl.removeAttribute('data-multiselect-stacked');
            // Chips hold their own remove listeners; create() rebuilds them.
            this._chipsElement.replaceChildren();
            NDS.state.remove(this._root, 'filled');
            NDS.aria.label(this._trigger, this._triggerAriaOriginal);
            // The checkbox names stay: they carry the field's value to the form.
            if (this._ownDropmenu) NDS.Dropmenu.destroy(this._dropmenu);
            if (this._ownAnchor) this._dropmenu.removeAttribute('data-anchor');
            if (this._ownMenuClass) this._menu.classList.remove('nds-multiselect-menu');
            this._root.removeAttribute('data-nds-multiselect-initialized');
            delete this._root.ndsMultiselect;
        }

        _isOpen() {
            return NDS.state.has(this._dropmenu, 'open');
        }

        // Readonly blocks the user only: chips and Reset are keyboard-reachable
        // past the readonly CSS, while removeValue()/reset() stay callable from code.
        _isReadonly() {
            return NDS.state.has(this._root, 'readonly');
        }

        getSelected() {
            return this._checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        }

        // Commit the current checked set: chips, a11y summary, change event.
        // In apply mode this is the Apply button's handler; callable directly
        // in either mode.
        commit() {
            this._applied = this.getSelected();
            this._renderChips();
            const labels = this._applied.map(value => this._getLabel(value));
            NDS.announce(labels.length ? strings.text('applied', { value: labels.join(', ') }) : strings.text('cleared'));
            this._dispatchChange();
        }

        reset() {
            // Apply mode with the panel open: clear the STAGED set only —
            // Apply commits it, closing without Apply restores `applied`.
            if (this._applyMode && this._isOpen()) {
                this._checkboxes.forEach(checkbox => { checkbox.checked = false; });
                return;
            }
            const before = this.getSelected();
            this._checkboxes.forEach(checkbox => {
                if (checkbox.checked) checkbox.checked = false;
            });
            this._applied = [];
            this._renderChips();
            if (before.length) {
                NDS.announce(strings.text('cleared'));
                this._dispatchChange();
            }
        }

        // Apply mode: the boxes go back to the applied set.
        _dropStaged() {
            this._checkboxes.forEach(checkbox => { checkbox.checked = this._applied.includes(checkbox.value); });
        }

        removeValue(value) {
            const checkbox = this._checkboxes.find(item => item.value === value);
            // Apply mode: a chip is an applied value, whatever its box shows while staged.
            if (!checkbox || !(this._applyMode ? this._applied.includes(value) : checkbox.checked)) return;
            NDS.keepChipFocus(() => this._chipsElement.children, () => {
                checkbox.checked = false;
                this._applied = this._applied.filter(item => item !== value);
                // Staged toggles drop, as on a close: the chips and the event show the applied set.
                if (this._applyMode) this._dropStaged();
                this._renderChips();
            }, this._trigger);
            NDS.announce(strings.text('removed', { value: this._getLabel(value) }));
            this._dispatchChange();
        }

        _announceToggle(checkbox) {
            NDS.announce(strings.text(checkbox.checked ? 'added' : 'removed', { value: this._getLabel(checkbox.value) }));
        }

        _getLabel(value) {
            const checkbox = this._checkboxes.find(item => item.value === value);
            if (!checkbox) return value;
            if (checkbox.dataset.label) return checkbox.dataset.label;
            const row = checkbox.closest('.nds-form-container') || checkbox.parentElement;
            const label = row && row.querySelector('.nds-form-header .nds-label, .nds-label');
            return label ? label.textContent.trim() : value;
        }

        _renderChips() {
            const selected = this.getSelected();
            this._chipsElement.replaceChildren();
            selected.forEach(value => { this._chipsElement.appendChild(this._buildChip(value)); });
            // New chips take the field's disabled.
            NDS.state.refresh(this._root, 'disabled');
            NDS.state[selected.length ? 'add' : 'remove'](this._root, 'filled');

            if (this._trigger && this._triggerLabelOriginal) {
                const labels = selected.map(value => this._getLabel(value));
                if (labels.length) NDS.aria.label(this._trigger, this._triggerLabelOriginal + ': ' + labels.join(', '));
                else strings.set(this._trigger, 'aria-label', 'none', { label: this._triggerLabelOriginal });
            }
        }

        _buildChip(value) {
            return NDS.buildChip(this._getLabel(value), {
                chipClass: this._chipClass,
                data: { multiselectValue: value },
                disabled: NDS.state.has(this._root, 'disabled'),
                signal: this.abortController.signal,
                onRemove: (e) => {
                    e.stopPropagation();
                    if (this._isReadonly()) return;
                    this.removeValue(value);
                },
            });
        }

        _dispatchChange() {
            const values = this.getSelected();
            this._root.dispatchEvent(new CustomEvent('nds:multiselect:change', {
                detail: {
                    name: this._name,
                    values: values,
                    labels: values.map(value => this._getLabel(value))
                },
                bubbles: true
            }));
        }
    }

    function setupMultiselects() {
        document.querySelectorAll('.nds-multiselect').forEach(el => {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-multiselect-initialized')) return;
            new NdsMultiselect(el);
        });
    }

    // The field's check: NDS.validation runs it at submit, validate(el) is its public face.
    // The option checkboxes are the source of truth, scoped to the nested menu.
    const checkField = (ms) => {
        const menu = ms.querySelector('.nds-dropmenu-menu');
        return NDS.validation.checkCount(ms, menu ? menu.querySelectorAll('input[type="checkbox"]') : []);
    };
    NDS.validation.addRule('.nds-multiselect[data-required], .nds-multiselect.nds-required, .nds-multiselect[data-min-checked], .nds-multiselect[data-max-checked]',
        (ms) => Object.assign(checkField(ms), { focus: ms.querySelector('.nds-dropmenu-trigger') }),
        // Its commit event, not the boxes' change: a chip removal or a reset unchecks with no change event.
        { on: ['nds:multiselect:change'] });

    NDS.Multiselect = {
        init: setupMultiselects,
        reinit: setupMultiselects,
        validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-multiselect') || el, checkField, opts),
        create: (element) => {
            if (element.ndsMultiselect) return element.ndsMultiselect;
            const instance = new NdsMultiselect(element);
            return instance._valid ? instance : null;
        },
        destroy: (element) => element.ndsMultiselect?.destroy()
    };
})();
