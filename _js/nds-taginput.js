/* NDS.Taginput — public surface
 * Rides: nds-autocomplete (a root with data-url shares the input; a picked suggestion commits
 *        as a tag; soft — typing alone works without it)
 *      · nds-forms (field status feedback for duplicate / max / strict rejections; soft)
 * Methods:
 *   NDS.Taginput.init() / .reinit()   scan + initialize .nds-taginput fields
 *   NDS.Taginput.create(el)           instance one field — null when the markup is incomplete
 *   NDS.Taginput.validate(el, opts)   its check → {valid, message, count}; opts {showMessage}
 *   NDS.Taginput.destroy(el)          tear one field down
 *   instance.getValues()              the tags, in order
 *   instance.addTag(value)            commit one tag (rejects duplicates and over-max)
 *   instance.removeTag(value)         remove one tag
 *   instance.clear()                  remove every tag
 * Events (bubble from .nds-taginput):
 *   nds:taginput:change   detail {name, values} — every add and every remove
 * Hooks:
 *   data-taginput-name · data-max-tags · data-strict · data-chip-class
 *   data-taginput-value (stamped on each chip, for consumer and e2e selectors)
 * Gotchas:
 *   - The form carrier is one hidden input per tag, named "<data-taginput-name>[]".
 *     Server-rendered ones seed the chips at init. No name → UI-only, nothing posts.
 *   - data-strict needs data-url: typed text never commits, only picked suggestions and
 *     addTag().
 *   - Backspace on an empty input pops the last tag BACK INTO the input for editing.
 *   - data-state~="readonly" blocks chip removal and the Backspace pop; the methods still work.
 */
/**
 * NDS TagInput — free-text tags committed as removable chips while typing.
 * Enter or comma commits the typed text, Backspace on an empty input removes
 * the last tag, paste splits on commas/newlines, blur commits pending text.
 * Duplicates (case-insensitive) are rejected and announced.
 *
 * Form carrier: one <input type="hidden" name="X[]"> per tag, kept in the
 * form-control. `data-taginput-name` names them (or the name is adopted from
 * server-rendered hidden inputs, which also seed the chips on init — the
 * restore path). No name → UI-only, nothing posts.
 *
 * Assist mode: give the root `data-url` (+ `autocomplete="on"` on the input)
 * and NDS.Autocomplete shares the field — picked suggestions commit as tags
 * via nds:autocomplete:select; typing still commits normally.
 *
 * Event: `nds:taginput:change` with { name, values } on every add/remove.
 */

(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.strings('taginput', {
        added: 'Added {value}',
        removed: 'Removed {value}',
        editing: 'Editing {value}',
        duplicate: 'Already added',
        max: 'Maximum limit {n}',
        cleared: 'All tags removed',
        strict: 'Choose from the suggestions',
        tag_required: 'Please add at least one tag',
    });

    class NdsTaginput {
        constructor(root) {
            this.root = root;
            // Success signal — init() only runs (and registers root.ndsTaginput)
            // when construction succeeds, so a bail below never hands consumers
            // a half-built instance.
            this.valid = false;
            if (root.hasAttribute('data-nds-taginput-initialized')) return;

            this.formControl = root.querySelector('.nds-form-control');
            this.input = this.formControl && this.formControl.querySelector(':scope > input:not([type="hidden"])');

            if (!this.formControl || !this.input) {
                console.warn('NDS Taginput: missing required elements', root);
                return;
            }

            // Name for the hidden carriers: attribute wins, else adopt from a
            // server-rendered hidden input ("skills[]" → "skills").
            const seed = this.formControl.querySelector(':scope > input[type="hidden"]');
            this.name = root.getAttribute('data-taginput-name')
                || (seed ? seed.name.replace(/\[\]$/, '') : '');
            this.maxTags = parseInt(root.getAttribute('data-max-tags'), 10) || Infinity;
            // Strict mode (assist fields only): typed text never commits —
            // only picked suggestions and the programmatic API add tags.
            this.strict = root.hasAttribute('data-strict') && root.hasAttribute('data-url');
            this.chipClass = root.getAttribute('data-chip-class') || 'nds-primary nds-sm';
            this.abortController = new AbortController();
            this.init();
            this.valid = true;
        }

        init() {
            // Server-rendered restore: hidden inputs seed the tag list.
            this.tags = Array.from(
                this.formControl.querySelectorAll(':scope > input[type="hidden"]')
            ).map(h => h.value).filter(Boolean);
            // The page's own tags: what a form reset goes back to.
            this._initialTags = [...this.tags];
            this.bindEvents();
            this.renderChips();
            // Registered here, not in the init sweep, so create() gets the backref
            // destroy() reads — every guard has passed by the time init() runs.
            this.root.ndsTaginput = this;
            this.root.setAttribute('data-nds-taginput-initialized', 'true');
        }

        bindEvents() {
            const { signal } = this.abortController;

            // The browser restores the form after the reset event: wait for it, unless it was cancelled.
            this.root.closest('form')?.addEventListener('reset', (e) => setTimeout(() => {
                if (e.defaultPrevented) return;
                this.tags = [...this._initialTags];
                this.renderChips();
            }), { signal });

            // Assist mode — a root carrying data-url is ALSO an NDS.Autocomplete
            // host sharing this input. While its suggestion menu is open, a
            // highlighted suggestion owns Enter (the pick lands through
            // nds:autocomplete:select below), and the mousedown-blur that
            // precedes a suggestion click must not commit the typed fragment.
            const acMenuOpen = () => this.root.hasAttribute('data-url')
                && NDS.state.has(this.formControl, 'open');

            this.input.addEventListener('keydown', (e) => {
                if (e.isComposing) return;
                if (e.key === 'Enter') {
                    if (acMenuOpen() && this.input.getAttribute('aria-activedescendant')) return;
                    // Empty Enter falls through — the form's normal submit.
                    if (this.input.value.trim() === '') return;
                    e.preventDefault();
                    if (this.strict) { this._strictReject(); return; }
                    this.addTag(this.input.value);
                    this.input.value = '';
                } else if (e.key === 'Backspace' && this.input.value === '' && this.tags.length && !this.isReadonly()) {
                    // Pop the last tag back into the input for editing
                    // (Gmail-recipient behavior) rather than deleting it.
                    e.preventDefault();
                    const last = this.tags.pop();
                    this.renderChips();
                    this.input.value = last;
                    NDS.announce(strings.text('editing', { value: last }));
                    this.emitChange();
                }
            }, { signal });

            // Separators commit as they LAND IN THE VALUE, not on keydown —
            // Latin ',' and Arabic '،' from physical keys, paste, and
            // mobile/IME insertText don't all fire per-key keydown. Text
            // after the last separator stays pending in the input.
            this.input.addEventListener('input', (e) => {
                if (e.isComposing) return;
                // Synthetic input on an assist host is autocomplete's pick
                // notification (committed whole via nds:autocomplete:select
                // below) — never split a picked value on its own commas.
                if (!e.isTrusted && this.root.hasAttribute('data-url')) return;
                const v = this.input.value;
                if (!/[,،\n]/.test(v)) return;
                if (this.strict) { this._strictReject(); return; }
                const parts = v.split(/[,،\n]/);
                const pending = parts.pop();
                parts.forEach(part => this.addTag(part));
                this.input.value = pending.replace(/^\s+/, '');
            }, { signal });

            // Leaving the field commits pending text instead of losing it.
            // Skipped while a suggestion menu is open — the text stays pending.
            // Strict fields never blur-commit (typed text is not a valid tag).
            this.input.addEventListener('blur', () => {
                if (acMenuOpen() || this.strict) return;
                if (this.input.value.trim() !== '') {
                    this.addTag(this.input.value);
                    this.input.value = '';
                }
            }, { signal });

            // Picked suggestion → committed tag. Autocomplete writes the pick
            // into the input first; committing consumes it.
            if (this.root.hasAttribute('data-url')) {
                this.root.addEventListener('nds:autocomplete:select', (e) => {
                    this.addTag(e.detail.text);
                    this.input.value = '';
                }, { signal });
            }

            // Click anywhere on the field puts the caret in the input.
            this.root.addEventListener('click', (e) => {
                if (e.target.closest('.nds-chip') || e.target === this.input) return;
                this.input.focus();
            }, { signal });
        }

        destroy() {
            this.abortController?.abort();
            delete this.root.ndsTaginput;
            this.root.removeAttribute('data-nds-taginput-initialized');
        }

        getValues() {
            return this.tags.slice();
        }

        // Readonly blocks the user only: chips are keyboard-reachable past the
        // readonly CSS, while removeTag()/clear() stay callable from code.
        isReadonly() {
            return NDS.state.has(this.root, 'readonly');
        }

        // Strict-mode rejection of typed commits — same feedback shape as the
        // duplicate/max rejections in addTag (incl. the macrotask deferral).
        _strictReject() {
            const msg = strings.text('strict');
            setTimeout(() => NDS.Form.setStatus(this.root, 'error', { message: msg }), 0);
            NDS.announce(msg);
        }

        addTag(value) {
            // Strip stray separators too (single-value paste, IME edge cases).
            value = String(value).replace(/^[\s,،]+|[\s,،]+$/g, '');
            if (!value) return;
            // Rejections get VISIBLE feedback in the field footer, not just
            // the live-region announce — cleared on the next successful commit.
            // Deferred a macrotask: when the rejection comes from a typed
            // separator, the forms layer's document-level 'input' listener
            // clears field status after this handler (a microtask would still
            // run between the two listeners) — the status must land once the
            // whole event dispatch has finished.
            if (this.tags.length >= this.maxTags) {
                const msg = strings.text('max', { n: this.maxTags });
                setTimeout(() => NDS.Form.setStatus(this.root, 'error', { message: msg }), 0);
                NDS.announce(msg);
                return;
            }
            if (this.tags.some(t => t.toLowerCase() === value.toLowerCase())) {
                // Same macrotask deferral as the max rejection above.
                setTimeout(() => NDS.Form.setStatus(this.root, 'error', { message: strings.text('duplicate') }), 0);
                NDS.announce(strings.text('duplicate'));
                return;
            }
            this.tags.push(value);
            this.renderChips();
            NDS.announce(strings.text('added', { value }));
            this.emitChange();
        }

        removeTag(value) {
            const idx = this.tags.indexOf(value);
            if (idx === -1) return;
            NDS.keepChipFocus(() => this.formControl.querySelectorAll('.nds-chip'), () => {
                this.tags.splice(idx, 1);
                this.renderChips();
            }, this.input);
            NDS.announce(strings.text('removed', { value }));
            this.emitChange();
        }

        clear() {
            if (!this.tags.length) return;
            this.tags = [];
            this.renderChips();
            NDS.announce(strings.text('cleared'));
            this.emitChange();
        }

        // Chips render as direct flex items before the input — no wrapper, so
        // their wrap point is a pure function of field width.
        renderChips() {
            this.formControl.querySelectorAll('.nds-chip').forEach(c => c.remove());
            this.tags.forEach(value => {
                this.formControl.insertBefore(this.buildChip(value), this.input);
            });
            // New chips take the field's disabled.
            NDS.state.apply(this.root, 'disabled');
            this._syncHiddenInputs();
            // 'filled' is the field's public styling hook (multiselect parity)
            // — consumers style it; no in-repo reader by design.
            NDS.state[this.tags.length ? 'add' : 'remove'](this.root, 'filled');
        }

        // Rebuild the hidden carriers to mirror this.tags (also consumes any
        // server-rendered seeds, so restore and runtime share one shape).
        _syncHiddenInputs() {
            this.formControl.querySelectorAll(':scope > input[type="hidden"]').forEach(h => h.remove());
            if (!this.name) return;
            this.tags.forEach(value => {
                const hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.name = this.name + '[]';
                hidden.value = value;
                this.formControl.appendChild(hidden);
            });
        }

        buildChip(value) {
            return NDS.buildChip(value, {
                chipClass: this.chipClass,
                // Public chip-identity hook (data-taginput-value) for
                // consumer/e2e selectors — removal routes through the closure.
                data: { taginputValue: value },
                disabled: NDS.state.has(this.root, 'disabled'),
                onRemove: () => { if (!this.isReadonly()) this.removeTag(value); },
                signal: this.abortController.signal,
            });
        }

        emitChange() {
            // Every successful commit clears rejection/validation feedback —
            // the user is actively fixing the field.
            NDS.Form.clearStatus(this.root);
            this.root.dispatchEvent(new CustomEvent('nds:taginput:change', {
                detail: { name: this.name, values: this.getValues() },
                bubbles: true
            }));
        }
    }

    function initializeTagInputs() {
        document.querySelectorAll('.nds-taginput').forEach(el => {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-taginput-initialized')) return;
            new NdsTaginput(el);
        });
    }

    // The field's check: NDS.validation runs it at submit, validate(el) is its public face.
    // The instance's tags (carriers exist only with a name); before init, the server-rendered carriers.
    // data-max-tags blocks a submit too: tags written in the markup or set by a script skip the add-time check.
    const fieldCheck = (ti) => {
        const count = ti.ndsTaginput ? ti.ndsTaginput.tags.length : ti.querySelectorAll('.nds-form-control > input[type="hidden"]').length;
        const max = parseInt(ti.getAttribute('data-max-tags'), 10);
        const over = max > 0 && count > max;
        const valid = !over && (!NDS.validation.isRequired(ti) || count > 0);
        return { valid, message: valid ? '' : strings.text(over ? 'max' : 'tag_required', { n: max }), empty: count === 0, count };
    };
    NDS.validation.addRule('.nds-taginput[data-required], .nds-taginput.nds-required, .nds-taginput[data-max-tags]',
        (ti) => Object.assign(fieldCheck(ti), { focus: ti.querySelector('.nds-form-control > input:not([type="hidden"])') }),
        // The typing field is empty at submit even with tags: the native pass leaves the field to this rule.
        { owns: (c) => c.classList.contains('nds-taginput'), on: ['nds:taginput:change'] });

    NDS.Taginput = {
        init: initializeTagInputs,
        reinit: initializeTagInputs,
        validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-taginput') || el, opts, fieldCheck),
        // Construction fails (missing required elements, or the root is already
        // initialized) → null, never a dud instance whose every method throws.
        create: (element) => {
            if (element.ndsTaginput) return element.ndsTaginput;
            const inst = new NdsTaginput(element);
            return inst.valid ? inst : null;
        },
        destroy: (element) => element.ndsTaginput?.destroy()
    };
})();
