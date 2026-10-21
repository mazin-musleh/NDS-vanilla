/* NDS.CustomSelect — public surface
 * Rides: nds-dropmenu (open/close, keyboard nav, positioning, top layer, outside-click)
 * Requires:
 *   .nds-select-option needs [data-value] — a pick writes an empty value
 *   form .nds-form-control:has(> .nds-select-input) needs .nds-select-value — the form never gets the picked value
 * Methods:
 *   NDS.CustomSelect.init() / .reinit()    arm the delegated listeners; paint pre-selected labels
 *   NDS.CustomSelect.create(el)            build one select now — pass the input or its form-control
 *   NDS.CustomSelect.validate(el, opts)    its check → {valid, message, value}; opts {showMessage}
 *   NDS.CustomSelect.destroy(el)           undo create() before you discard the field
 *   NDS.CustomSelect.setValue(el, value)   pick by option value; false when no option carries it
 *   NDS.CustomSelect.clear(el)             back to placeholder
 * Events (fire ON the .nds-form-control — this one does NOT bubble):
 *   nds:custom-select:change   detail {value, text} — every pick, by click or by
 *                             setValue()/clear()
 * Hooks:
 *   (none — the field is markup: one .nds-select-option per choice, .nds-select-value the
 *    hidden input that submits, .nds-select-input the readonly display field)
 * Gotchas:
 *   - Read .nds-select-value for the value; the visible input is display-only and its label
 *     is derived from the picked option.
 *   - A select builds on its FIRST FOCUS, not at init — setValue()/clear() work before that.
 */
// NDS Custom Select — styled dropdown over a .nds-select-input
//
// Delegated + lazy (mirrors the voice-input pattern): init() installs two
// document-level listeners and does NO per-select work. A select's dropmenu is
// built on its FIRST focusin — only selects the user actually reaches ever get
// constructed, and construction lands on an interaction rather than any init
// pass. focusin (not click) is the trigger because it fires for BOTH mouse
// (mousedown → focusin → click) and keyboard (Tab → focusin), so keyboard-open
// keeps working; the dropmenu instance is ready before the open gesture, and
// NDS.Dropmenu then owns open/close/keyboard/outside-click/positioning natively.
//
// The only "select" behaviour layered on top of a plain dropmenu: copy the
// picked option's text/value into the input (delegated option-click), mark the
// selected option, and mirror open-state for the arrow. Initial DISPLAY text is
// authored in the input's markup `value` (declarative — there is no load-time
// pass to derive it).
(function () {
    'use strict';

    var documentWired = false;

    // Render a pre-selected value's display label. The hidden `.nds-select-value`
    // is the source of truth (it submits); the visible `.nds-select-input` is a
    // readonly, non-submitting display surface, so its label is DERIVED from the
    // matching option's text — never hand-authored. Display-only: no dropmenu
    // build. No-op once a label is present. init() runs it over every
    // The visible label for an option. Prefers a nested .nds-label inside
    // .nds-option-text (the shape that carries a description alongside the
    // label — reading .textContent would return "Label Description" glued
    // together and leak into the trigger). Falls back to .nds-option-text's
    // own text for the plain-label shape every existing consumer uses.
    function getOptionLabel(option) {
        if (!option) return '';
        var textEl = option.querySelector('.nds-option-text');
        if (!textEl) return '';
        var label = textEl.querySelector('.nds-label');
        return label ? label.textContent : textEl.textContent;
    }

    // select-input on the page, so a pre-filled label paints without waiting
    // for the field's deferred build.
    function restoreDisplay(selectInput) {
        if (!selectInput || selectInput.value || !selectInput.closest) return;
        var formControl = selectInput.closest('.nds-form-control');
        if (!formControl) return;
        var hidden = formControl.querySelector('.nds-select-value');
        var current = hidden ? hidden.value : '';
        if (!current) return;
        var options = formControl.querySelectorAll('.nds-select-option');
        for (var i = 0; i < options.length; i++) {
            if (options[i].dataset.value === current) {
                var label = getOptionLabel(options[i]);
                selectInput.value = label || current;
                return;
            }
        }
    }

    // Build the dropmenu for one select (first focus). Idempotent via the
    // instance it leaves on the form-control.
    function build(selectInput) {
        if (!selectInput || !selectInput.closest) return;
        var formControl = selectInput.closest('.nds-form-control');
        if (!formControl || formControl.ndsCustomSelect || formControl.classList.contains('nds-dropmenu')) return;
        var dropdown = formControl.querySelector('.nds-select-dropdown');
        var options = formControl.querySelectorAll('.nds-select-option');
        if (!dropdown || !options.length) return;

        // Cover a dynamically-added pre-filled select focused before a reinit.
        restoreDisplay(selectInput);

        var hiddenInput = formControl.querySelector('.nds-select-value');
        var formContainer = formControl.closest('.nds-form-container') || formControl;

        // Augment the author markup with NDS.Dropmenu hooks. No
        // data-dropmenu-no-click / -no-keys: the dropmenu's native click-toggle
        // and keyboard nav drive open/close — we don't re-implement them.
        selectInput.classList.add('nds-dropmenu-trigger');
        // role="combobox" so the aria-expanded / aria-haspopup the dropmenu
        // stamps on the trigger are valid on an <input>.
        var ownRole = !selectInput.hasAttribute('role');
        if (ownRole) selectInput.setAttribute('role', 'combobox');
        var wasHidden = dropdown.hidden;
        dropdown.removeAttribute('hidden');
        var optionsContainer = dropdown.querySelector('.nds-select-options');
        if (optionsContainer) optionsContainer.classList.add('nds-dropmenu-scroll');
        options.forEach(function (option) { option.classList.add('nds-dropmenu-item'); });

        // Menu width is set via the dropmenu's own `--dropmenu-min-width` CSS
        // custom property (see _form.scss) — not an inline style here, which
        // the dropmenu wipes via `menu.style.cssText = ''` on close.

        // Mark the initially-selected option (display text is in markup).
        var current = (hiddenInput ? hiddenInput.value : '') || selectInput.value;
        if (current) {
            options.forEach(function (option) {
                if (option.dataset.value === current) NDS.state.add(option, 'selected');
            });
        }

        // Mirror dropmenu open/close onto the form-container so the arrow
        // rotation rule (`.nds-form-container[data-state~="open"]`) keeps working.
        var controller = new AbortController(), signal = controller.signal;
        formControl.addEventListener('nds:dropmenu:opened', function () {
            NDS.state.add(formContainer, 'open');
            (Array.prototype.find.call(options, function (option) { return NDS.state.has(option, 'selected'); }) || options[0]).focus();
        }, { signal: signal });
        formControl.addEventListener('nds:dropmenu:closed', function () {
            NDS.state.remove(formContainer, 'open');
        }, { signal: signal });

        // Readonly CSS stops the pointer only; this stops the keyboard open.
        // Added before the dropmenu's own trigger listener, so it runs first.
        selectInput.addEventListener('keydown', function (e) {
            if (/^(Enter| |ArrowDown|ArrowUp)$/.test(e.key) && NDS.state.has(formContainer, 'readonly')) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }, { signal: signal });

        // Takes back what build() wrote on the author's markup, so a later focus builds again.
        formControl.ndsCustomSelect = {
            destroy: function () {
                controller.abort();
                NDS.Dropmenu.destroy(formControl);
                // The markup ships the list hidden; a select never opened has no close to restore it.
                dropdown.hidden = wasHidden;
                selectInput.classList.remove('nds-dropmenu-trigger');
                if (ownRole) selectInput.removeAttribute('role');
                if (optionsContainer) optionsContainer.classList.remove('nds-dropmenu-scroll');
                options.forEach(function (option) { option.classList.remove('nds-dropmenu-item'); });
                NDS.state.remove(formContainer, 'open');
                delete formControl.ndsCustomSelect;
            }
        };

        // Hand off all behaviour to the dropmenu.
        NDS.Dropmenu.create(formControl, { menu: dropdown, menuClass: 'nds-select-menu' });
    }

    // First focus of a select → build its dropmenu, then let the dropmenu's
    // native click/keyboard handle the open the user is about to perform.
    function handleFocusIn(e) {
        var target = e.target;
        if (!target || !target.closest) return;
        var selectInput = target.closest('.nds-select-input');
        if (!selectInput || selectInput.closest('code')) return;
        build(selectInput);
    }

    // The full write sequence a user pick runs — shared by the delegated
    // click path and the public setValue/clear. `option` null = clear back to
    // placeholder.
    // A hidden input's value IS its attribute, so a form reset cannot bring the first value back: keep it here.
    var initial = new WeakMap();

    // quiet: a form reset, which fires no input, change or select event.
    function setOption(formControl, option, quiet) {
        var selectInput = formControl.querySelector('.nds-select-input');
        if (!selectInput) return false;

        var hiddenInput = formControl.querySelector('.nds-select-value');
        if (hiddenInput && !initial.has(hiddenInput)) initial.set(hiddenInput, hiddenInput.value);
        var value = option ? (option.dataset.value || '') : '';
        var text = option ? (getOptionLabel(option) || value) : '';

        formControl.querySelectorAll('.nds-select-option').forEach(function (item) {
            if (option && item.dataset.value === value) NDS.state.add(item, 'selected');
            else NDS.state.remove(item, 'selected');
        });

        if (quiet) {
            if (hiddenInput) hiddenInput.value = value;
            selectInput.value = text;
            NDS.Form.refresh(selectInput);
            return true;
        }
        // Dispatched input/change run forms' delegated field-state sync.
        // Value field first: the visible field's events then find both written.
        if (hiddenInput) NDS.setValue(hiddenInput, value);
        NDS.setValue(selectInput, text);

        formControl.dispatchEvent(new CustomEvent('nds:custom-select:change', {
            detail: { value: value, text: text }
        }));
        return true;
    }

    // Resolve the owning form-control from what consumers hold: the select
    // input, the form-control, or any container holding one (create()'s
    // tolerance).
    function findFormControl(el) {
        if (!el || !el.closest) return null;
        if (el.classList.contains('nds-select-input')) return el.closest('.nds-form-control');
        var input = el.querySelector && el.querySelector('.nds-select-input');
        return input ? input.closest('.nds-form-control') : null;
    }

    // Delegated option pick → run the shared write sequence. The dropmenu's
    // own item-click handler auto-closes the menu and restores focus.
    function handleOptionClick(e) {
        var target = e.target;
        if (!target || !target.closest) return;
        var option = target.closest('.nds-select-option');
        if (!option) return;
        var formControl = option.closest('.nds-form-control');
        if (!formControl) return;
        setOption(formControl, option);
    }

    function init() {
        // Restore pre-selected labels (idempotent — no-ops once a label is
        // present). Runs on every init/reinit so late content is covered; the
        // listeners install once. Cosmetic only: the submit value is already in
        // the hidden input from markup — this just paints the derived label.
        document.querySelectorAll('.nds-select-input').forEach(restoreDisplay);
        addDocumentListeners();
    }

    // Back to the value the field had before its first pick. Never picked, it still re-labels:
    // the reset emptied the label restoreDisplay wrote.
    function handleReset(form) {
        form.querySelectorAll('.nds-select-value').forEach(function (hidden) {
            var formControl = hidden.closest('.nds-form-control');
            var value = initial.has(hidden) ? initial.get(hidden) : hidden.value, match = null;
            if (!formControl) return;
            formControl.querySelectorAll('.nds-select-option').forEach(function (option) { if (option.dataset.value === value) match = option; });
            setOption(formControl, match, true);
        });
    }

    // A page with no select at load never runs init(), so create() wires these too.
    function addDocumentListeners() {
        if (documentWired) return;
        documentWired = true;
        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('click', handleOptionClick);
        NDS.field.onReset(document, handleReset);
    }

    // The field's check: NDS.validation runs it at submit, validate(el) is its public face.
    var strings = NDS.i18n.getStrings('custom-select', { select_option: 'Please select an option' });
    // The readonly display input is barred from constraint validation: required reads the carrier.
    function checkField(container) {
        var carrier = container.querySelector('.nds-select-value');
        var valid = !NDS.validation.isRequired(container) || !!(carrier && carrier.value.trim());
        return { valid: valid, message: valid ? '' : strings.text('select_option'), empty: true, value: carrier ? carrier.value : '' };
    }
    // The readonly display input opens the menu: it still takes the active and focus states.
    NDS.field.addType('custom-select', { isReadonlyActive: function (input) { return input.classList.contains('nds-select-input'); } });

    // Keyed on the carrier: a native <select> shares the .nds-select shell and stays with the native pass.
    // Re-checked on the carrier's change: a pick writes it and dispatches input and change.
    NDS.validation.addRule('.nds-select[data-required], .nds-select.nds-required', function (customSelect) {
        return customSelect.querySelector('.nds-select-value') ? Object.assign(checkField(customSelect), { focus: customSelect.querySelector('.nds-select-input') }) : null;
    }, { owns: function (container) { return !!container.querySelector('.nds-select-value'); }, on: ['change'] });

    NDS.CustomSelect = {
        init: init,
        reinit: init,
        validate: function (el, opts) { return NDS.Form.validateField(el.closest('.nds-select') || el, checkField, opts); },
        // Programmatic build for a select input (or its form-control).
        create: function (el) {
            if (!el) return;
            var input = (el.classList && el.classList.contains('nds-select-input'))
                ? el
                : (el.querySelector && el.querySelector('.nds-select-input'));
            if (!input) return;
            addDocumentListeners();
            build(input);
        },
        // Undo create(): pass the input, its form-control, or a container holding one.
        destroy: function (el) {
            var formControl = findFormControl(el);
            if (formControl && formControl.ndsCustomSelect) formControl.ndsCustomSelect.destroy();
        },
        // Programmatic pick: the same write sequence as a user click (display
        // label, hidden value, selected markers, input/change events,
        // nds:custom-select:change). Returns false when no option carries the value —
        // display and value are never desynced. Works before the dropmenu is built.
        setValue: function (el, value) {
            var formControl = findFormControl(el);
            if (!formControl) return false;
            var options = formControl.querySelectorAll('.nds-select-option');
            for (var i = 0; i < options.length; i++) {
                if (options[i].dataset.value === String(value)) {
                    return setOption(formControl, options[i]);
                }
            }
            return false;
        },
        // Back to placeholder: both inputs emptied, markers off, same events.
        clear: function (el) {
            var formControl = findFormControl(el);
            if (!formControl) return false;
            return setOption(formControl, null);
        },
    };
})();
