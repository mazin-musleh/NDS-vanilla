/* NDS.FormattedInput — public surface (the .nds-phone, .nds-national-id and .nds-iban fields)
 * Rides: nds-field (its part) · nds-typing (group) · nds-dropmenu (a phone's country picker)
 * Methods:
 *   NDS.FormattedInput.isNationalId(str) / .isIban(str)   the checksum rules behind .nds-national-id / .nds-iban
 * Events:
 *   nds:phone:change            detail {value, countryCode, nationalNumber} — from a .nds-phone input,
 *                               when the number it submits changes (typing, a paste, a country pick, a reset)
 * Hooks:
 *   data-format on a .nds-phone field's container, or on each item of its country picker: the
 *   groups it shows (0 a digit: "00 000 0000"); an item without one shows the number as typed
 *   data-country-code in the same places ("+966"): the code a phone submits before its number
 * Gotchas:
 *   - Layers: NDS.typing shapes the text; Date Picker and Time Picker add a picker menu; this file is a
 *     formatted field with no picker. A type part of the form field: no init() and no loader entry.
 *   - .nds-national-id and .nds-iban stamp setCustomValidity on input (and at init), so the
 *     checksum fails the field through checkValidity like any native rule. A pattern on the same
 *     input is redundant.
 *   - .nds-iban shows groups of four, and a .nds-phone with a data-format its groups: input.value
 *     holds the spaces; a submit and new FormData(form) send the value without them. Inserts go
 *     through this file there, and a maxlength shorter than the format is removed: the format sets the most.
 *   - A .nds-phone with data-country-code drops its leading 0 (not +39/+378/+379) and a pasted
 *     "+966…" (another country its picker lists picks that country), and submits E.164
 *     ("+966551234567"); without one it keeps the number as typed, 0 included, up to 15 digits. The code joins in the formdata event only: input.value keeps the
 *     local number, so code reading it (jQuery serialize(), framework state) gets no code: it
 *     listens for nds:phone:change instead.
 *   - NDS.Form.refresh() re-stamps the field: a phone sends nds:phone:change when its number changed
 *     (a full number may pick its country).
 */

(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.getStrings('formatted-input', {
        invalid_national_id: 'Invalid national ID number',
        invalid_iban:        'Invalid IBAN',
    });

    // Saudi national ID / iqama: 10 digits, first 1 or 2, Luhn check digit.
    function isNationalId(value) {
        if (!/^[12]\d{9}$/.test(value)) return false;
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            var digit = +value[i];
            if (i % 2 === 0) { digit *= 2; if (digit > 9) digit -= 9; }
            sum += digit;
        }
        return sum % 10 === 0;
    }

    // IBAN: country + check digits, then mod-97 of the rearranged, letters-to-numbers string === 1.
    function isIban(value) {
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value)) return false;
        var digits = (value.slice(4) + value.slice(0, 4)).replace(/[A-Z]/g, function (char) { return char.charCodeAt(0) - 55; });
        var rem = 0;
        for (var i = 0; i < digits.length; i++) rem = (rem * 10 + +digits[i]) % 97;
        return rem === 1;
    }

    // Groups of four, up to the longest IBAN (34).
    var IBAN_FORMAT = '**** **** **** **** **** **** **** **** **';

    // The slot format a field shows (NDS.typing.group): an IBAN's groups of four, or a phone's data-format,
    // read from the picked country when the field has a country picker. Null: the value as typed.
    function getGroupFormat(input) {
        if (input.classList.contains('nds-iban')) return IBAN_FORMAT;
        if (!input.classList.contains('nds-phone')) return null;
        var source = getPhoneSource(input);
        return (source && source.getAttribute('data-format')) || null;
    }

    // Where a phone's data-format and data-country-code live: the picked country with a picker, else the field.
    // Before Dropmenu is built, the item it will pick first: data-select-value beats a selected item, as there.
    function getPhoneSource(input) {
        var picker = getCountryPicker(input);
        if (!picker) return input.closest('.nds-form-container');
        var items = picker.querySelectorAll('.nds-dropmenu-item');
        var picked = [].find.call(items, function(item) { return NDS.state.has(item, 'selected'); });
        var named = [].find.call(items, function(item) { return item.getAttribute('data-value') === picker.getAttribute('data-select-value'); });
        return picker.ndsDropmenu ? picked || named : named || picked;
    }

    function getCountryPicker(input) {
        var control = input.closest('.nds-form-control');
        return control && control.querySelector('.nds-dropmenu[data-select-name]');
    }

    // The data-country-code an element carries ("+966"). Null: none.
    function readCountryCode(el) {
        var digits = el && NDS.toLatinDigits(el.getAttribute('data-country-code') || '').replace(/\D/g, '');
        return digits ? '+' + digits : null;
    }

    function getCountryCode(input) {
        return readCountryCode(getPhoneSource(input));
    }

    // A full number ("+971 50…", "00971 50…"): the code it starts with, the field's own or a country its picker
    // lists (the longest that fits), its source, and where the national number starts. Null: no code the field takes.
    function readFullNumber(input, text) {
        var lead = text.match(/^\s*(?:\+|00)\s*/);
        if (!lead) return null;
        var picker = getCountryPicker(input);
        var sources = picker ? picker.querySelectorAll('.nds-dropmenu-item') : [input.closest('.nds-form-container')];
        var best = null;
        [].forEach.call(sources, function(source) {
            var code = readCountryCode(source);
            if (code && text.startsWith(code.slice(1), lead[0].length) && (!best || code.length > best.code.length)) best = { code: code, source: source };
        });
        if (best) {
            var end = lead[0].length + best.code.length - 1;
            best.from = end + text.slice(end).match(/^[\s-]*/)[0].length;
        }
        return best;
    }

    // A full number from another listed country picks that country. Its nds:dropmenu:select must not
    // re-stamp the field with the value this stamp is replacing. Forms runs before Dropmenu at load: the
    // picker is built here, or the code this stamp strips would submit with the default country's.
    var pickingCountry = false;
    function pickCountry(input, item) {
        var picker = getCountryPicker(input);
        var dropmenu = picker && NDS.Dropmenu.create(picker);
        if (!dropmenu) return;
        pickingCountry = true;
        try { dropmenu.setSelection(item); } finally { pickingCountry = false; }
    }

    // The number a phone submits: its country code, then its digits ("+966551234567"). Without a code, the digits
    // alone and a null nationalNumber: a 0 typed there may or may not be a trunk prefix.
    function getPhoneNumber(input) {
        var digits = input.value.replace(/\D/g, ''), code = digits && getCountryCode(input);
        return { value: code ? code + digits : digits, countryCode: code || null, nationalNumber: code ? digits : null };
    }

    // nds:phone:change when the submitted number changes; the first stamp (setup) only records it.
    var phoneNumbers = new WeakMap();
    function reportPhone(input) {
        var number = getPhoneNumber(input), first = !phoneNumbers.has(input);
        if (phoneNumbers.get(input) === number.value) return;
        phoneNumbers.set(input, number.value);
        if (!first) input.dispatchEvent(new CustomEvent('nds:phone:change', { bubbles: true, detail: number }));
    }

    // Countries whose numbers keep their leading 0 after the code (Italy: +39 06 …); elsewhere it is a trunk prefix.
    var KEEP_ZERO = ['+39', '+378', '+379'];

    // .nds-phone / .nds-national-id / .nds-iban: the value in its shape, then the checksum result, so
    // checkValidity() (blur and submit) fails the field with a localized message. Empty = valid. opts:
    // text and caret, an edit to write in place of the value; quiet, write it without an input event;
    // country, a whole value that may lack an IBAN's SA (a paste, a first key, the page's own value).
    function stampIdentifier(input, opts) {
        var iban = input.classList.contains('nds-iban'), phone = input.classList.contains('nds-phone');
        var nationalId = input.classList.contains('nds-national-id');
        if (!iban && !phone && !nationalId) return;
        opts = opts || {};
        var focused = document.activeElement === input, text = opts.text, caret = opts.caret;
        if (text === undefined) {
            text = input.value;
            caret = focused ? input.selectionStart : text.length;
        }
        text = NDS.toLatinDigits(text);
        if (iban) {
            text = text.toUpperCase();
            // Banking apps copy a Saudi IBAN without its SA: a value starting with a digit gets it back.
            var lead = text.search(/[A-Z0-9]/);
            if (opts.country && lead >= 0 && /\d/.test(text[lead])) {
                text = text.slice(0, lead) + 'SA' + text.slice(lead);
                if (caret > lead) caret += 2;
            }
        } else {
            // Digits only (a paste may bring spaces, dashes or +). A phone with a country code drops the code of
            // a full number ("+966 55…", "00966 55…"), picking its country when a picker lists it, and its leading
            // zero, the trunk prefix.
            var code = phone && getCountryCode(input), from = 0;
            var full = code && readFullNumber(input, text);
            if (full) {
                from = full.from;
                if (full.code !== code && !opts.dry) pickCountry(input, full.source);
                code = full.code;
            }
            // A whole value with the code but no + ("966551234567"): too long for the field, so the code goes.
            var shape = code && getGroupFormat(input), room = shape ? shape.replace(/[^0A*]/g, '').length : input.maxLength;
            var typed = text.slice(from).replace(/\D/g, '');
            if (code && !full && opts.country && room > 0 && typed.length > room && typed.startsWith(code.slice(1))) {
                for (var seen = 0; seen < code.length - 1; from++) if (/\d/.test(text[from])) seen++;
            }
            var dropZero = code && KEEP_ZERO.indexOf(code) < 0;
            var digits = '', before = 0;
            for (var i = from; i < text.length; i++) {
                if (!/\d/.test(text[i]) || (dropZero && !digits && text[i] === '0')) continue;
                digits += text[i];
                if (i < caret) before = digits.length;
            }
            text = digits;
            caret = before;
        }
        var format = getGroupFormat(input);
        // The format sets the most characters: Safari's maxlength would stop the groups before the browser asks.
        if (format && input.maxLength >= 0 && input.maxLength < format.length) input.removeAttribute('maxlength');
        // With no format, a maxlength holds: a script write would skip it.
        var most = input.maxLength >= 0 ? input.maxLength : Infinity;
        // A phone holds at most 15 digits, its country code included (E.164).
        if (phone && most === Infinity) most = 15 - (code ? code.length - 1 : 0);
        var shown = format ? NDS.typing.group(text, caret, format) : { value: text.slice(0, most), caret: Math.min(caret, most) };
        if (opts.dry) return shown;
        if (shown.value !== input.value) {
            if (opts.quiet) input.value = shown.value;
            else NDS.setValue(input, shown.value, { change: false });
        }
        if (focused) try { input.setSelectionRange(shown.caret, shown.caret); } catch (_) {}
        if (phone) { reportPhone(input); return; }
        var clean = shown.value.replace(/\s/g, '');
        var ok = iban ? isIban(clean) : isNationalId(clean);
        input.setCustomValidity(clean && !ok ? strings.text(iban ? 'invalid_iban' : 'invalid_national_id') : '');
    }

    // Registered before Form's parts (this file loads first), so its beforeinput runs before Form's digits part.
    NDS.field.addType('formatted', {
        setupInput: function(input) { stampIdentifier(input, { country: true }); },
        refresh: function(input) { stampIdentifier(input, { quiet: true, country: true }); },
        on: {
            beforeinput: function(e, context) {
                if (!context) return;
                var field = context.input;
                if (e.isComposing || field.readOnly || !field.matches('.nds-phone, .nds-national-id, .nds-iban')) return;
                var data = e.data || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
                var start = field.selectionStart, value = field.value;
                // An identifier takes every insert here: the browser's maxlength would count a group's spaces,
                // and a numeric field would block a paste with one.
                if (data && /^insert/.test(e.inputType)) {
                    var edit = {
                        text: value.slice(0, start) + data + value.slice(field.selectionEnd), caret: start + data.length,
                        country: !value || /^insertFrom(Paste|Drop)$/.test(e.inputType),
                    };
                    // Already in shape: the browser inserts it, faster than a script write.
                    var shown = stampIdentifier(field, Object.assign({ dry: true }, edit));
                    if (shown.value === edit.text && shown.caret === edit.caret) return;
                    e.preventDefault();
                    stampIdentifier(field, edit);
                    return;
                }
                // A delete that meets a group's space takes the character past it too, as the space comes back.
                var back = e.inputType === 'deleteContentBackward', at = back ? start - 1 : start;
                if (getGroupFormat(field) && /^deleteContent(Backward|Forward)$/.test(e.inputType) && start === field.selectionEnd
                    && /[^A-Za-z0-9]/.test(value[at] || '') && value[back ? at - 1 : at + 1]) {
                    e.preventDefault();
                    stampIdentifier(field, { text: back ? value.slice(0, at - 1) + value.slice(start) : value.slice(0, at) + value.slice(at + 2), caret: back ? at - 1 : at });
                }
            },
            input: function(e, context) {
                if (context) stampIdentifier(context.input, { country: /^insertFrom(Paste|Drop)$/.test(e.inputType) });
            },
            // Submit and new FormData(form) send the value without its groups ("SA03 8000 …" → "SA038000…"),
            // and a phone the whole number, its country code first (E.164: "+966551234567").
            // ponytail: a name two fields share keeps what the browser wrote.
            'formdata:capture': function(e) {
                [].forEach.call(e.target.elements || [], function(el) {
                    if (!el.name || !el.matches('.nds-phone, .nds-iban') || e.formData.getAll(el.name).length !== 1) return;
                    e.formData.set(el.name, el.classList.contains('nds-phone') ? getPhoneNumber(el).value : el.value.replace(/[^A-Za-z0-9]/g, ''));
                });
            }
        }
    });
    NDS.field.onReset(document, function(form) {
        form.querySelectorAll('.nds-phone, .nds-national-id, .nds-iban').forEach(function(input) { stampIdentifier(input, { country: true }); });
    });
    // A new country: the number takes its format.
    document.addEventListener('nds:dropmenu:select', function(e) {
        if (pickingCountry) return;
        var control = e.target.closest('.nds-form-control');
        var input = control && control.querySelector('input.nds-phone');
        if (input) stampIdentifier(input);
    });

    NDS.FormattedInput = {
        isNationalId: isNationalId,
        isIban: isIban
    };

})();
