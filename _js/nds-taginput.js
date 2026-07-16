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

    const STRINGS = {
        en: { added: 'Added', removed: 'Removed', editing: 'Editing', duplicate: 'Already added', max: 'Maximum limit', cleared: 'All tags removed', strict: 'Choose from the suggestions' },
        ar: { added: 'تمت إضافة', removed: 'تمت إزالة', editing: 'تعديل', duplicate: 'مضاف مسبقًا', max: 'الحد الأقصى', cleared: 'تمت إزالة جميع الوسوم', strict: 'اختر من الاقتراحات' }
    };
    const S = () => STRINGS[NDS.langKey];

    // Chips are buttons outside .nds-form-action, so the forms disabled hook
    // doesn't reach them (same rationale as the multiselect hook).
    NDS.State.onAdd('disabled', '.nds-taginput', el =>
        el.querySelectorAll('.nds-chip').forEach(c => { c.disabled = true; }));
    NDS.State.onRemove('disabled', '.nds-taginput', el =>
        el.querySelectorAll('.nds-chip').forEach(c => { c.disabled = false; }));

    class NDSTagInput {
        constructor(root) {
            this.root = root;
            // Success signal — the init sweep gates the ndsTagInput expando on
            // it so a bail below never hands consumers a half-built instance.
            this.valid = false;
            if (root.hasAttribute('data-nds-taginput-initialized')) return;

            this.formControl = root.querySelector('.nds-form-control');
            this.input = this.formControl && this.formControl.querySelector(':scope > input:not([type="hidden"])');

            if (!this.formControl || !this.input) {
                console.warn('NDS TagInput: missing required elements', root);
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
            this.bindEvents();
            this.renderChips();
            this.root.setAttribute('data-nds-taginput-initialized', 'true');
        }

        bindEvents() {
            const { signal } = this.abortController;

            // Assist mode — a root carrying data-url is ALSO an NDS.Autocomplete
            // host sharing this input. While its suggestion menu is open, a
            // highlighted suggestion owns Enter (the pick lands through
            // nds:autocomplete:select below), and the mousedown-blur that
            // precedes a suggestion click must not commit the typed fragment.
            const acMenuOpen = () => this.root.hasAttribute('data-url')
                && NDS.State.has(this.formControl, 'open');

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
                } else if (e.key === 'Backspace' && this.input.value === '' && this.tags.length) {
                    // Pop the last tag back into the input for editing
                    // (Gmail-recipient behavior) rather than deleting it.
                    e.preventDefault();
                    const last = this.tags.pop();
                    this.renderChips();
                    this.input.value = last;
                    NDS.announce(S().editing + ' ' + last);
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
            this.root.removeAttribute('data-nds-taginput-initialized');
        }

        getValues() {
            return this.tags.slice();
        }

        // Strict-mode rejection of typed commits — same feedback shape as the
        // duplicate/max rejections in addTag (incl. the macrotask deferral).
        _strictReject() {
            const msg = S().strict;
            setTimeout(() => NDS.Forms?.setStatus?.({ element: this.root, status: 'error', message: msg }), 0);
            NDS.announce(msg);
        }

        addTag(value) {
            // Strip stray separators too (single-value paste, IME edge cases).
            value = String(value).replace(/^[\s,،]+|[\s,،]+$/g, '');
            if (!value) return;
            // Rejections get VISIBLE feedback in the field footer, not just
            // the live-region announce — cleared on the next successful commit.
            // Soft dependency — NDS.Forms ships in the main bundle; the footer
            // feedback no-ops if a consumer bundle excludes it.
            // Deferred a macrotask: when the rejection comes from a typed
            // separator, the forms layer's document-level 'input' listener
            // clears field status after this handler (a microtask would still
            // run between the two listeners) — the status must land once the
            // whole event dispatch has finished.
            if (this.tags.length >= this.maxTags) {
                const msg = S().max + ' ' + this.maxTags;
                setTimeout(() => NDS.Forms?.setStatus?.({ element: this.root, status: 'error', message: msg }), 0);
                NDS.announce(msg);
                return;
            }
            if (this.tags.some(t => t.toLowerCase() === value.toLowerCase())) {
                setTimeout(() => NDS.Forms?.setStatus?.({ element: this.root, status: 'error', message: S().duplicate }), 0);
                NDS.announce(S().duplicate);
                return;
            }
            this.tags.push(value);
            this.renderChips();
            NDS.announce(S().added + ' ' + value);
            this.emitChange();
        }

        removeTag(value) {
            const idx = this.tags.indexOf(value);
            if (idx === -1) return;
            // Focus handoff — removing the focused chip would drop focus to
            // <body>; hand it to the chip in its slot, or back to the input.
            const chips = Array.from(this.formControl.querySelectorAll('.nds-chip'));
            const removedIdx = chips.indexOf(document.activeElement);
            this.tags.splice(idx, 1);
            this.renderChips();
            if (removedIdx > -1) {
                const remaining = this.formControl.querySelectorAll('.nds-chip');
                (remaining[Math.min(removedIdx, remaining.length - 1)] || this.input)?.focus();
            }
            NDS.announce(S().removed + ' ' + value);
            this.emitChange();
        }

        clear() {
            if (!this.tags.length) return;
            this.tags = [];
            this.renderChips();
            NDS.announce(S().cleared);
            this.emitChange();
        }

        // Chips render as direct flex items before the input — no wrapper, so
        // their wrap point is a pure function of field width.
        renderChips() {
            this.formControl.querySelectorAll('.nds-chip').forEach(c => c.remove());
            this.tags.forEach(value => {
                this.formControl.insertBefore(this.buildChip(value), this.input);
            });
            this._syncHiddenInputs();
            // 'filled' is the field's public styling hook (multiselect parity)
            // — consumers style it; no in-repo reader by design.
            NDS.State[this.tags.length ? 'add' : 'remove'](this.root, 'filled');
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
                disabled: NDS.State.has(this.root, 'disabled'),
                onRemove: () => this.removeTag(value),
            });
        }

        emitChange() {
            // Every successful commit clears rejection/validation feedback —
            // the user is actively fixing the field. Soft dependency on
            // NDS.Forms, same as the rejection path.
            NDS.Forms?.clearStatus?.(this.root);
            this.root.dispatchEvent(new CustomEvent('nds:taginput:change', {
                detail: { name: this.name, values: this.getValues() },
                bubbles: true
            }));
        }
    }

    function initializeTagInputs() {
        document.querySelectorAll('.nds-taginput').forEach(el => {
            if (el.closest('code, .code-example')) return;
            if (el.hasAttribute('data-nds-taginput-initialized')) return;
            const instance = new NDSTagInput(el);
            if (instance.valid) el.ndsTagInput = instance;
        });
    }

    NDS.TagInput = {
        init: initializeTagInputs,
        reinit: initializeTagInputs,
        create: (element) => new NDSTagInput(element),
        destroy: (element) => element.ndsTagInput?.destroy()
    };
})();
