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

    var _initDone = false;

    // Render a pre-selected value's display label. The hidden `.nds-select-value`
    // is the source of truth (it submits); the visible `.nds-select-input` is a
    // readonly, non-submitting display surface, so its label is DERIVED from the
    // matching option's text — never hand-authored. Display-only: no dropmenu
    // build. No-op once a label is present. Forms invokes this from its critical
    // per-input init (it already iterates every select-input), so a pre-filled
    // label paints at first paint rather than after a deferred build.
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
                var t = options[i].querySelector('.nds-option-text');
                selectInput.value = t ? t.textContent : current;
                return;
            }
        }
    }

    // Build the dropmenu for one select (first focus). Idempotent via the
    // .nds-dropmenu class we stamp here.
    function build(selectInput) {
        if (!selectInput || !selectInput.closest) return;
        var formControl = selectInput.closest('.nds-form-control');
        if (!formControl || formControl.classList.contains('nds-dropmenu')) return;
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
        formControl.classList.add('nds-dropmenu');
        selectInput.classList.add('nds-dropmenu-trigger');
        // role="combobox" so the aria-expanded / aria-haspopup the dropmenu
        // stamps on the trigger are valid on an <input>.
        selectInput.setAttribute('role', 'combobox');
        dropdown.classList.add('nds-dropmenu-menu');
        dropdown.removeAttribute('hidden');
        var optionsContainer = dropdown.querySelector('.nds-select-options');
        if (optionsContainer) optionsContainer.classList.add('nds-dropmenu-scroll');
        options.forEach(function (o) { o.classList.add('nds-dropmenu-item'); });

        // Menu width is set via the dropmenu's own `--dropmenu-min-width` CSS
        // custom property (see _forms.scss) — not an inline style here, which
        // the dropmenu wipes via `menu.style.cssText = ''` on close.

        // Mark the initially-selected option (display text is in markup).
        var current = (hiddenInput ? hiddenInput.value : '') || selectInput.value;
        if (current) {
            options.forEach(function (o) {
                if (o.dataset.value === current) NDS.State.add(o, 'selected');
            });
        }

        // Mirror dropmenu open/close onto the form-container so the arrow
        // rotation rule (`.nds-form-container[data-state~="open"]`) keeps working.
        formControl.addEventListener('nds:dropmenu:opened', function () {
            NDS.State.add(formContainer, 'open');
            if (options[0]) options[0].focus();
        });
        formControl.addEventListener('nds:dropmenu:closed', function () {
            NDS.State.remove(formContainer, 'open');
        });

        // Hand off all behaviour to the dropmenu.
        NDS.Dropmenu.create(formControl);
    }

    // First focus of a select → build its dropmenu, then let the dropmenu's
    // native click/keyboard handle the open the user is about to perform.
    function onFocusIn(e) {
        var t = e.target;
        if (!t || !t.closest) return;
        var selectInput = t.closest('.nds-select-input');
        if (!selectInput || selectInput.closest('code, .code-example')) return;
        build(selectInput);
    }

    // Delegated option pick → set the input text + hidden value. The dropmenu's
    // own item-click handler auto-closes the menu and restores focus.
    function onOptionClick(e) {
        var t = e.target;
        if (!t || !t.closest) return;
        var option = t.closest('.nds-select-option');
        if (!option) return;
        var formControl = option.closest('.nds-form-control');
        if (!formControl) return;
        var selectInput = formControl.querySelector('.nds-select-input');
        if (!selectInput) return;

        var hiddenInput = formControl.querySelector('.nds-select-value');
        var value = option.dataset.value || '';
        var optionText = option.querySelector('.nds-option-text');
        var text = optionText ? optionText.textContent : value;

        selectInput.value = text;
        if (hiddenInput) hiddenInput.value = value;

        formControl.querySelectorAll('.nds-select-option').forEach(function (o) {
            if (o.dataset.value === value) NDS.State.add(o, 'selected');
            else NDS.State.remove(o, 'selected');
        });

        // Dispatched input/change run forms' delegated field-state sync.
        NDS.triggerEvents(selectInput);
        if (hiddenInput) NDS.triggerEvents(hiddenInput);

        formControl.dispatchEvent(new CustomEvent('selectChange', {
            detail: { value: value, text: text }
        }));
    }

    function init() {
        // Restore pre-selected labels (idempotent — no-ops once a label is
        // present). Runs on every init/reinit so late content is covered; the
        // listeners install once. Cosmetic only: the submit value is already in
        // the hidden input from markup — this just paints the derived label.
        document.querySelectorAll('.nds-select-input').forEach(restoreDisplay);
        if (_initDone) return;
        _initDone = true;
        document.addEventListener('focusin', onFocusIn);
        document.addEventListener('click', onOptionClick);
    }

    NDS.CustomSelect = {
        init: init,
        reinit: init,
        // Programmatic build for a select input (or its form-control).
        create: function (el) {
            if (!el) return;
            var input = (el.classList && el.classList.contains('nds-select-input'))
                ? el
                : (el.querySelector && el.querySelector('.nds-select-input'));
            if (input) build(input);
        },
    };
})();
