/* NDS.FormattedInput — public surface (a .nds-formatted field: the class on the .nds-form-container, with one
 * preset beside it, .nds-phone, .nds-national-id or .nds-iban, or a data-format of its own; the field's input
 * is the one its .nds-form-control holds)
 * Rides: nds-field (its part) · nds-typing (group) · nds-dropmenu (a phone's country picker)
 * Methods:
 *   NDS.FormattedInput.isNationalId(str, country) / .isIban(str)   the checks behind .nds-national-id / .nds-iban;
 *                                     country defaults to SA, and one with no rule passes
 *   NDS.FormattedInput.addIdRule(country, { check(value), digits, length })   a national ID rule for a
 *                                     country ("AE"): check gets the clean value; digits, digits only (else
 *                                     capitals and digits); length, the most characters. Replaces one set before
 * Events:
 *   nds:phone:change            detail {value, countryCode, nationalNumber} — from a .nds-phone field's input,
 *                               when the number it submits changes (typing, a paste, a country pick, a reset)
 * Hooks:
 *   data-format on a .nds-phone field's container, or on each item of its country picker: the
 *   groups it shows (0 a digit: "00 000 0000"); an item without one shows the number as typed
 *   data-format on a .nds-formatted field's container: its slots (0 a digit, A a capital, a a small letter,
 *   * a letter or a digit as typed: "AA-0000")
 *   a hidden input in a .nds-phone field's .nds-prefix: its value is the code the phone submits before its
 *   number ("+966"); a country picker's is the one Dropmenu writes, from the picked item's data-value
 *   data-country on any element, <html> for the site ("AE"): the country a national ID and an IBAN
 *   inside it follow; the nearest wins, SA without one; "any" takes an ID of any country, unchecked
 * Gotchas:
 *   - Layers: NDS.typing shapes the text; Date Picker and Time Picker add a picker menu; this file is a
 *     formatted field with no picker. A type part of the form field: no init() and no loader entry.
 *   - .nds-national-id and .nds-iban stamp setCustomValidity on input (and at init), so the
 *     checksum fails the field through checkValidity like any native rule. A pattern on the same
 *     input is redundant.
 *   - .nds-iban shows groups of four (letters only in the country; an SA one is 22 digits after it), and a .nds-phone or .nds-formatted with a data-format shows its groups: input.value
 *     holds the spaces; a submit and new FormData(form) send the value without them. Inserts go
 *     through this file there, and a maxlength shorter than the format is removed: the format sets the most.
 *   - A .nds-phone with a code drops its leading 0 (not +39/+378/+379) and a pasted
 *     "+966…" (another country its picker lists picks that country), and submits E.164
 *     ("+966551234567"); without one it keeps the number as typed, 0 included, up to 15 digits. The code joins in the formdata event only: input.value keeps the
 *     local number, so code reading it (jQuery serialize(), framework state) gets no code: it
 *     listens for nds:phone:change instead.
 *   - A national ID of a country with no rule keeps capitals and digits and checks nothing; SA's rule ships.
 *     An IBAN starting with a digit gets the country's letters, SA's by default.
 *   - A .nds-phone or a preset-less field with a data-format fails a value that leaves a slot empty ("Incomplete
 *     value"); a pattern on its input adds a rule, checked on the value as shown, separators included.
 *   - NDS.Form.refresh() re-stamps the field: a phone sends nds:phone:change when its number changed
 *     (a full number may pick its country).
 */

(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.getStrings('formatted-input', {
        invalid_national_id: 'Invalid national ID number',
        invalid_iban:        'Invalid IBAN',
        incomplete:          'Incomplete value',
    });

    // Saudi national ID / iqama: 10 digits, first 1 or 2, Luhn check digit.
    function isSaudiId(value) {
        if (!/^[12]\d{9}$/.test(value)) return false;
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            var digit = +value[i];
            if (i % 2 === 0) { digit *= 2; if (digit > 9) digit -= 9; }
            sum += digit;
        }
        return sum % 10 === 0;
    }

    // National ID rules by country: check(value) on the clean value; digits, digits only (else capitals
    // and digits); length, the most characters. A country without one keeps capitals and digits, unchecked.
    var idRules = new Map([['SA', { check: isSaudiId, digits: true, length: 10 }]]);

    function addIdRule(country, rule) {
        country = String(country).toUpperCase();
        if (!/^[A-Z]{2}$/.test(country) || !rule || typeof rule.check !== 'function') {
            console.warn('NDS FormattedInput: addIdRule needs a two-letter country and a check function');
            return;
        }
        idRules.set(country, rule);
        // A field already stamped takes the new rule.
        document.querySelectorAll('.nds-national-id .nds-form-control > input').forEach(function(input) {
            if (getKind(input) === 'national-id' && getCountry(input) === country) stampIdentifier(input, { quiet: true });
        });
    }

    function isNationalId(value, country) {
        var rule = idRules.get(String(country || 'SA').toUpperCase());
        return rule ? !!rule.check(value) : true;
    }

    // The country a field's ID and IBAN follow: the nearest data-country (<html> sets the site's), else SA.
    // ANY: an ID of any country, a passport too, unchecked.
    var warnedCountries = new Set();
    function getCountry(input) {
        var el = input.closest('[data-country]:not([data-country=""])');
        var written = el ? el.getAttribute('data-country') : 'SA', country = written.trim().toUpperCase();
        if (/^[A-Z]{2}$/.test(country) || country === 'ANY') return country;
        if (!warnedCountries.has(written)) {
            warnedCountries.add(written);
            console.warn('NDS FormattedInput: data-country "' + written + '" is not a two-letter country code; using SA');
        }
        return 'SA';
    }

    // IBAN: country + check digits, then mod-97 of the rearranged, letters-to-numbers string === 1.
    function isIban(value) {
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value)) return false;
        var digits = (value.slice(4) + value.slice(0, 4)).replace(/[A-Z]/g, function (char) { return char.charCodeAt(0) - 55; });
        var remainder = 0;
        for (var i = 0; i < digits.length; i++) remainder = (remainder * 10 + +digits[i]) % 97;
        return remainder === 1;
    }

    // The field an input is the text box of: its .nds-formatted container's preset ('phone', 'iban',
    // 'national-id'), else 'formatted'. Null: none.
    var presets = ['phone', 'iban', 'national-id'];
    function getKind(input) {
        var control = input.parentElement;
        if (input.type === 'hidden' || !control || !control.classList.contains('nds-form-control')) return null;
        var container = control.closest('.nds-formatted');
        if (!container) return null;
        return presets.find(function(preset) { return container.classList.contains('nds-' + preset); }) || 'formatted';
    }

    // Groups of four: two letters, two check digits, then up to the longest IBAN (34). A Saudi one is 22 digits after SA.
    var IBAN_FORMAT = 'AA00 **** **** **** **** **** **** **** **';
    var IBAN_FORMATS = Object.freeze({ SA: 'AA00 0000 0000 0000 0000 0000' });
    function getIbanFormat(text) {
        return IBAN_FORMATS[text.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()] || IBAN_FORMAT;
    }

    // text in its slots, dropping only what was just inserted (it ends at the caret): when the letter and digit
    // slots would drop characters already there (a deleted country moves letters onto digit slots), every
    // slot takes either until the value fits again.
    function shapeSlots(text, caret, format, inserted) {
        var shown = NDS.typing.group(text, caret, format), loose = format.replace(/[0Aa]/g, '*');
        var from = caret - (inserted || '').length;
        if (loose === format || shown.dropped.every(function(index) { return index >= from && index < caret; })) return shown;
        return NDS.typing.group(text, caret, loose);
    }

    // The slot format a field shows (NDS.typing.group): an IBAN's groups of four, a .nds-formatted field's
    // data-format, or a phone's, read from the picked country when the field has a country picker. Null: the value as typed.
    function getGroupFormat(input) {
        var kind = getKind(input);
        if (kind === 'iban') return getIbanFormat(input.value);
        if (kind === 'formatted') return input.closest('.nds-form-container').getAttribute('data-format') || null;
        if (kind !== 'phone') return null;
        var source = getPhoneSetup(input).source;
        return (source && source.getAttribute('data-format')) || null;
    }

    // The picked country item: the one whose data-value Dropmenu holds in its hidden input. Before Dropmenu
    // builds that input, the item it will pick first: data-select-value beats a selected item, as there.
    function getPickedItem(picker) {
        var hidden = picker.querySelector('input[type="hidden"]');
        var value = hidden ? hidden.value : picker.getAttribute('data-select-value');
        var items = picker.querySelectorAll('.nds-dropmenu-item');
        return [].find.call(items, function(item) { return value && item.getAttribute('data-value') === value; })
            || [].find.call(items, function(item) { return NDS.state.has(item, 'selected'); });
    }

    function getCountryPicker(input) {
        var control = input.closest('.nds-form-control');
        return control && control.querySelector('.nds-dropmenu[data-select-name]');
    }

    // A dialing code from a value ("+966", "00966", Arabic digits) → "+966". Null: none.
    function readDialCode(value) {
        var digits = NDS.toLatinDigits(value || '').replace(/\D/g, '');
        return digits ? '+' + digits : null;
    }

    // A phone's code and where its data-format lives: with a picker, the picked country item; else the hidden
    // input in its prefix and the field's container.
    function getPhoneSetup(input) {
        var picker = getCountryPicker(input);
        if (picker) {
            var item = getPickedItem(picker);
            return { code: item ? readDialCode(item.getAttribute('data-value')) : null, source: item };
        }
        var control = input.closest('.nds-form-control');
        var hidden = control && control.querySelector('.nds-prefix input[type="hidden"]');
        return { code: hidden ? readDialCode(hidden.value) : null, source: input.closest('.nds-form-container') };
    }

    // A full number ("+971 50…", "00971 50…"): the code it starts with, the field's own or a country its picker
    // lists (the longest that fits), its source, and where the national number starts. Null: no code the field takes.
    function readFullNumber(input, text) {
        var lead = text.match(/^\s*(?:\+|00)\s*/);
        if (!lead) return null;
        var picker = getCountryPicker(input);
        var sources = picker ? picker.querySelectorAll('.nds-dropmenu-item') : [null];
        var best = null;
        [].forEach.call(sources, function(source) {
            var code = source ? readDialCode(source.getAttribute('data-value')) : getPhoneSetup(input).code;
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
        var digits = input.value.replace(/\D/g, ''), code = digits && getPhoneSetup(input).code;
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
    var keepZero = ['+39', '+378', '+379'];

    // The characters keep matches, from index from, and where the caret lands among them; dropZero drops a leading 0.
    function keepCharacters(text, caret, from, keep, dropZero) {
        var kept = '', before = 0;
        for (var i = from; i < text.length; i++) {
            if (!keep.test(text[i]) || (dropZero && !kept && text[i] === '0')) continue;
            kept += text[i];
            if (i < caret) before = kept.length;
        }
        return { text: kept, caret: before };
    }

    // Banking apps copy an IBAN without its country (a Saudi one without SA): a value starting with a digit
    // gets country back, when one is given.
    function formatIban(text, caret, country) {
        text = text.toUpperCase();
        var lead = text.search(/[A-Z0-9]/);
        if (country && country !== 'ANY' && lead >= 0 && /\d/.test(text[lead])) {
            text = text.slice(0, lead) + country + text.slice(lead);
            if (caret > lead) caret += 2;
        }
        return { text: text, caret: caret };
    }

    // A phone's digits, its code and its group format. A phone with a code drops the code of a full number
    // ("+966 55…", "00966 55…"), picking its country when a picker lists it, and its leading zero, the
    // trunk prefix. A paste may bring spaces, dashes or +.
    function formatPhone(input, text, caret, opts) {
        var setup = getPhoneSetup(input), code = setup.code, source = setup.source, from = 0;
        var full = code && readFullNumber(input, text);
        if (full) {
            from = full.from;
            if (full.code !== code) {
                if (!opts.dry) pickCountry(input, full.source);
                source = full.source;
            }
            code = full.code;
        }
        var format = (source && source.getAttribute('data-format')) || null;
        // A whole value with the code but no + ("966551234567"): too long for the field, so the code goes.
        var room = code && format ? format.replace(/[^0A*]/g, '').length : input.maxLength;
        var typed = text.slice(from).replace(/\D/g, '');
        if (code && !full && opts.country && room > 0 && typed.length > room && typed.startsWith(code.slice(1))) {
            for (var seen = 0; seen < code.length - 1; from++) if (/\d/.test(text[from])) seen++;
        }
        var kept = keepCharacters(text, caret, from, /\d/, code && keepZero.indexOf(code) < 0);
        // A separator typed after the last digit reaches the groups, which show it ("55 ").
        var tail = format && kept.text ? text.match(/\D*$/)[0] : '';
        return { text: kept.text + tail, caret: kept.caret + (caret === text.length ? tail.length : 0), code: code, groupFormat: format };
    }

    // A value that leaves a slot of its format empty, or does not fit it, fails as incomplete. Only that message
    // is cleared here: a page's own setCustomValidity stays.
    var stampedIncomplete = new WeakSet();
    function checkFilled(input, value, format) {
        var message = strings.text('incomplete');
        var shape = format && NDS.typing.group(value, 0, format);
        // A letter or digit in the value is a start, even a fixed one ("REF-" with no slot filled).
        var incomplete = !!shape && /[A-Za-z0-9]/.test(NDS.toLatinDigits(value)) && (shape.open > 0 || shape.dropped.length > 0);
        // Its own stamp, not validationMessage: a disabled or readonly field reports none.
        if (incomplete) { input.setCustomValidity(message); stampedIncomplete.add(input); }
        else if (stampedIncomplete.delete(input) && (!input.willValidate || input.validationMessage === message)) input.setCustomValidity('');
    }

    // .nds-phone / .nds-national-id / .nds-iban / .nds-formatted: the value in its shape, then the checksum result, so
    // checkValidity() (blur and submit) fails the field with a localized message. Empty = valid. opts:
    // text and caret, an edit to write in place of the value; inserted, the text that edit typed or pasted
    // (the slots may drop it, never what was there); quiet, write it without an input event;
    // country, a whole value that may lack an IBAN's country (a paste, a first key, the page's own value).
    function stampIdentifier(input, opts) {
        var kind = getKind(input);
        if (!kind) return;
        var iban = kind === 'iban', phone = kind === 'phone', nationalId = kind === 'national-id', generic = kind === 'formatted';
        opts = opts || {};
        var focused = document.activeElement === input, text = opts.text, caret = opts.caret;
        if (text === undefined) {
            text = input.value;
            caret = focused ? input.selectionStart : text.length;
        }
        var country = (iban || nationalId) && getCountry(input), rule = nationalId && idRules.get(country);
        text = NDS.toLatinDigits(text);
        var formatted;
        if (phone) formatted = formatPhone(input, text, caret, opts);
        // The slots keep what fits them, in their case (NDS.typing.group).
        else if (generic) formatted = { text: text, caret: caret, groupFormat: getGroupFormat(input) };
        else if (iban) formatted = formatIban(text, caret, opts.country && country);
        // An ID keeps digits only, or capitals and digits when its rule lets it have letters.
        else formatted = keepCharacters(text.toUpperCase(), caret, 0, rule && rule.digits ? /\d/ : /[A-Z\d]/);
        var format = iban ? getIbanFormat(formatted.text) : formatted.groupFormat || null;
        // The format sets the most characters: Safari's maxlength would stop the groups before the browser asks.
        if (format && input.maxLength >= 0 && input.maxLength < format.length) input.removeAttribute('maxlength');
        // With no format, a maxlength holds: a script write would skip it.
        var most = input.maxLength >= 0 ? input.maxLength : Infinity;
        // A phone holds at most 15 digits, its country code included (E.164).
        if (phone && most === Infinity) most = 15 - (formatted.code ? formatted.code.length - 1 : 0);
        if (rule && rule.length < most) most = rule.length;
        var shown = format ? shapeSlots(formatted.text, formatted.caret, format, opts.inserted)
            : { value: formatted.text.slice(0, most), caret: Math.min(formatted.caret, most) };
        if (opts.dry) return shown;
        if (shown.value !== input.value) {
            if (opts.quiet) input.value = shown.value;
            else NDS.setValue(input, shown.value, { change: false });
        }
        if (focused) try { input.setSelectionRange(shown.caret, shown.caret); } catch (_) {}
        if (phone) reportPhone(input);
        if (phone || generic) { checkFilled(input, shown.value, format); return; }
        var clean = shown.value.replace(/\s/g, '');
        var ok = iban ? isIban(clean) : !rule || !!rule.check(clean);
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
                if (e.isComposing || field.readOnly || !getKind(field)) return;
                var data = e.data || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
                var start = field.selectionStart, value = field.value;
                // An identifier takes every insert here: the browser's maxlength would count a group's spaces,
                // and a numeric field would block a paste with one.
                if (data && /^insert/.test(e.inputType)) {
                    var edit = {
                        text: value.slice(0, start) + data + value.slice(field.selectionEnd), caret: start + data.length,
                        country: !value || /^insertFrom(Paste|Drop)$/.test(e.inputType), inserted: data,
                    };
                    // Already in shape: the browser inserts it, faster than a script write.
                    var shown = stampIdentifier(field, Object.assign({ dry: true }, edit));
                    if (shown.value === edit.text && shown.caret === edit.caret) return;
                    e.preventDefault();
                    stampIdentifier(field, edit);
                    return;
                }
                // A delete that meets a group's space takes the character past it too, as the space comes back.
                // A space at the end, one the user typed, goes alone.
                var back = e.inputType === 'deleteContentBackward', at = back ? start - 1 : start;
                if (getGroupFormat(field) && /^deleteContent(Backward|Forward)$/.test(e.inputType) && start === field.selectionEnd
                    && /[^A-Za-z0-9]/.test(value[at] || '') && value[back ? at - 1 : at + 1] && /[A-Za-z0-9]/.test(value.slice(at))) {
                    e.preventDefault();
                    stampIdentifier(field, { text: back ? value.slice(0, at - 1) + value.slice(start) : value.slice(0, at) + value.slice(at + 2), caret: back ? at - 1 : at });
                }
            },
            // A keyboard composing a word owns its text until it commits (Android): a rewrite then doubles it.
            input: function(e, context) {
                if (context && !e.isComposing) stampIdentifier(context.input, { country: /^insertFrom(Paste|Drop)$/.test(e.inputType), inserted: e.data });
            },
            // A word composed into an empty field takes the country, as one typed does.
            compositionend: function(e, context) {
                if (context) stampIdentifier(context.input, { country: e.data === context.input.value, inserted: e.data });
            },
            // Submit and new FormData(form) send the value without its groups ("SA03 8000 …" → "SA038000…"),
            // and a phone the whole number, its country code first (E.164: "+966551234567").
            // ponytail: a name two fields share keeps what the browser wrote.
            'formdata:capture': function(e) {
                [].forEach.call(e.target.elements || [], function(el) {
                    var kind = el.name && getKind(el);
                    if (!kind || kind === 'national-id' || (kind === 'formatted' && !getGroupFormat(el)) || e.formData.getAll(el.name).length !== 1) return;
                    e.formData.set(el.name, kind === 'phone' ? getPhoneNumber(el).value : el.value.replace(/[^A-Za-z0-9]/g, ''));
                });
            }
        }
    });
    // A new country: the number takes its format.
    document.addEventListener('nds:dropmenu:select', function(e) {
        if (pickingCountry) return;
        var control = e.target.closest('.nds-form-control');
        var input = control && control.querySelector(':scope > input:not([type="hidden"])');
        if (input && getKind(input) === 'phone') stampIdentifier(input);
    });

    NDS.FormattedInput = {
        addIdRule: addIdRule,
        isNationalId: isNationalId,
        isIban: isIban
    };

})();
